-- Safaris table
CREATE TABLE public.safaris (
  id text PRIMARY KEY,
  title text NOT NULL,
  location text NOT NULL,
  duration text NOT NULL,
  price integer NOT NULL,
  rating numeric(3,2) NOT NULL DEFAULT 5.0,
  reviews integer NOT NULL DEFAULT 0,
  image text,
  description text NOT NULL,
  highlights text[] DEFAULT '{}',
  category text NOT NULL DEFAULT 'Wildlife Safari',
  stripe_price_id text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.safaris ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view safaris" ON public.safaris FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Admins can manage safaris" ON public.safaris FOR ALL TO authenticated USING (public.is_admin(auth.uid()));

-- Destinations table
CREATE TABLE public.destinations (
  id text PRIMARY KEY,
  name text NOT NULL,
  country text NOT NULL,
  description text NOT NULL,
  image text,
  images text[] DEFAULT '{}',
  safari_count integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.destinations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view destinations" ON public.destinations FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Admins can manage destinations" ON public.destinations FOR ALL TO authenticated USING (public.is_admin(auth.uid()));

-- Blogs table
CREATE TABLE public.blogs (
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

ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view blogs" ON public.blogs FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Admins can manage blogs" ON public.blogs FOR ALL TO authenticated USING (public.is_admin(auth.uid()));

-- Indexes for performance
CREATE INDEX idx_safaris_category ON public.safaris(category);
CREATE INDEX idx_safaris_created_at ON public.safaris(created_at DESC);
CREATE INDEX idx_destinations_country ON public.destinations(country);
CREATE INDEX idx_destinations_created_at ON public.destinations(created_at DESC);
CREATE INDEX idx_blogs_category ON public.blogs(category);
CREATE INDEX idx_blogs_created_at ON public.blogs(created_at DESC);