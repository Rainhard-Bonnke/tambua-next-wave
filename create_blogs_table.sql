-- Create blogs table
CREATE TABLE IF NOT EXISTS public.blogs (
  id text PRIMARY KEY,
  title text NOT NULL,
  excerpt text NOT NULL,
  image text,
  date text NOT NULL,
  category text NOT NULL,
  read_time text NOT NULL,
  content text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Public can view blogs" ON public.blogs FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Admins can manage blogs" ON public.blogs FOR ALL TO authenticated USING (public.is_admin(auth.uid()));

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_blogs_category ON public.blogs(category);
CREATE INDEX IF NOT EXISTS idx_blogs_created_at ON public.blogs(created_at DESC);
