CREATE TABLE public.community_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  contributor_name text NOT NULL,
  work_title text NOT NULL,
  category text NOT NULL,
  x_url text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT community_submissions_contributor_name_length CHECK (char_length(trim(contributor_name)) BETWEEN 2 AND 80),
  CONSTRAINT community_submissions_work_title_length CHECK (char_length(trim(work_title)) BETWEEN 2 AND 120),
  CONSTRAINT community_submissions_category_allowed CHECK (category IN ('Art', 'Build', 'Technical', 'Video')),
  CONSTRAINT community_submissions_x_url_valid CHECK (char_length(x_url) <= 500 AND x_url ~* '^https://(www\.)?(x\.com|twitter\.com)/[^[:space:]]+$')
);
GRANT SELECT, INSERT ON public.community_submissions TO anon;
GRANT SELECT, INSERT ON public.community_submissions TO authenticated;
GRANT ALL ON public.community_submissions TO service_role;
ALTER TABLE public.community_submissions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view community submissions" ON public.community_submissions FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Anyone can add community submissions" ON public.community_submissions FOR INSERT TO anon, authenticated WITH CHECK (true);
ALTER PUBLICATION supabase_realtime ADD TABLE public.community_submissions;