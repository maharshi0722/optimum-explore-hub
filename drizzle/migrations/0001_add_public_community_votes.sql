CREATE TABLE public.community_votes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  submission_id uuid NOT NULL REFERENCES public.community_submissions(id) ON DELETE CASCADE,
  voter_key text NOT NULL,
  vote smallint NOT NULL CHECK (vote IN (-1, 1)),
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT community_votes_voter_key_length CHECK (char_length(voter_key) BETWEEN 16 AND 100),
  CONSTRAINT community_votes_unique_voter_per_submission UNIQUE (submission_id, voter_key)
);
GRANT SELECT, INSERT, UPDATE ON public.community_votes TO anon;
GRANT SELECT, INSERT, UPDATE ON public.community_votes TO authenticated;
GRANT ALL ON public.community_votes TO service_role;
ALTER TABLE public.community_votes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view community votes" ON public.community_votes FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Anyone can cast community votes" ON public.community_votes FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Anyone can change their community vote" ON public.community_votes FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
CREATE INDEX community_votes_submission_idx ON public.community_votes (submission_id);