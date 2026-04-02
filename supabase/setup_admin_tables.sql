-- Run this in your Supabase SQL Editor to create tables for Safaris and Destinations

-- Safaris Table
CREATE TABLE IF NOT EXISTS public.safaris (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    location TEXT NOT NULL,
    duration TEXT NOT NULL,
    price INTEGER NOT NULL,
    rating NUMERIC DEFAULT 5.0,
    reviews INTEGER DEFAULT 0,
    image TEXT NOT NULL,
    description TEXT NOT NULL,
    highlights TEXT[] NOT NULL DEFAULT '{}',
    category TEXT NOT NULL,
    stripe_price_id TEXT
);

-- Destinations Table
CREATE TABLE IF NOT EXISTS public.destinations (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    country TEXT NOT NULL,
    description TEXT NOT NULL,
    image TEXT NOT NULL,
    safari_count INTEGER DEFAULT 0
);

-- Turn on RLS
ALTER TABLE public.safaris ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.destinations ENABLE ROW LEVEL SECURITY;

-- Create policies for Safaris
CREATE POLICY "Enable read access for all users" ON public.safaris FOR SELECT USING (true);
CREATE POLICY "Enable all access for admins" ON public.safaris FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  )
);

-- Create policies for Destinations
CREATE POLICY "Enable read access for all users" ON public.destinations FOR SELECT USING (true);
CREATE POLICY "Enable all access for admins" ON public.destinations FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  )
);

-- Set up storage for uploading photos
INSERT INTO storage.buckets (id, name, public) VALUES ('safaris', 'safaris', true) ON CONFLICT DO NOTHING;

CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING (bucket_id = 'safaris');
CREATE POLICY "Admin Upload" ON storage.objects FOR INSERT WITH CHECK (
  bucket_id = 'safaris' AND EXISTS (
    SELECT 1 FROM public.profiles
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  )
);
CREATE POLICY "Admin Update" ON storage.objects FOR UPDATE USING (
  bucket_id = 'safaris' AND EXISTS (
    SELECT 1 FROM public.profiles
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  )
);
CREATE POLICY "Admin Delete" ON storage.objects FOR DELETE USING (
  bucket_id = 'safaris' AND EXISTS (
    SELECT 1 FROM public.profiles
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  )
);
