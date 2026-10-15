ALTER TABLE public.community_submissions
  ADD COLUMN upvote_count integer NOT NULL DEFAULT 0,
  ADD COLUMN downvote_count integer NOT NULL DEFAULT 0;
REVOKE ALL ON TABLE public.community_votes FROM anon, authenticated;
CREATE OR REPLACE FUNCTION public.update_community_vote_totals()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE public.community_submissions
    SET upvote_count = upvote_count + CASE WHEN NEW.vote = 1 THEN 1 ELSE 0 END,
        downvote_count = downvote_count + CASE WHEN NEW.vote = -1 THEN 1 ELSE 0 END
    WHERE id = NEW.submission_id;
  ELSIF TG_OP = 'UPDATE' THEN
    UPDATE public.community_submissions
    SET upvote_count = GREATEST(0, upvote_count - CASE WHEN OLD.vote = 1 THEN 1 ELSE 0 END + CASE WHEN NEW.vote = 1 THEN 1 ELSE 0 END),
        downvote_count = GREATEST(0, downvote_count - CASE WHEN OLD.vote = -1 THEN 1 ELSE 0 END + CASE WHEN NEW.vote = -1 THEN 1 ELSE 0 END)
    WHERE id = NEW.submission_id;
  END IF;
  RETURN NEW;
END;
$$;
CREATE TRIGGER community_votes_update_totals
AFTER INSERT OR UPDATE ON public.community_votes
FOR EACH ROW EXECUTE FUNCTION public.update_community_vote_totals();
CREATE OR REPLACE FUNCTION public.cast_community_vote(_submission_id uuid, _voter_key text, _vote smallint)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF _vote NOT IN (-1, 1) THEN RAISE EXCEPTION 'Invalid vote'; END IF;
  IF _voter_key !~ '^[a-f0-9-]{36}$' THEN RAISE EXCEPTION 'Invalid voter key'; END IF;
  INSERT INTO public.community_votes (submission_id, voter_key, vote)
  VALUES (_submission_id, _voter_key, _vote)
  ON CONFLICT (submission_id, voter_key)
  DO UPDATE SET vote = EXCLUDED.vote, created_at = now()
  WHERE public.community_votes.vote <> EXCLUDED.vote;
END;
$$;
CREATE OR REPLACE FUNCTION public.get_community_voter_marks(_voter_key text)
RETURNS TABLE (submission_id uuid, vote smallint)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT v.submission_id, v.vote
  FROM public.community_votes AS v
  WHERE _voter_key ~ '^[a-f0-9-]{36}$'
    AND v.voter_key = _voter_key;
$$;
REVOKE ALL ON FUNCTION public.update_community_vote_totals() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.cast_community_vote(uuid, text, smallint) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.get_community_voter_marks(text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.cast_community_vote(uuid, text, smallint) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.get_community_voter_marks(text) TO anon, authenticated;
ALTER PUBLICATION supabase_realtime ADD TABLE public.community_votes;