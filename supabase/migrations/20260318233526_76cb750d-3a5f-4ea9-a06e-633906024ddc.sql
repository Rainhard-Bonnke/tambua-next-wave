-- Create submission type enum
CREATE TYPE public.inquiry_type AS ENUM ('booking', 'contact');

-- Create inquiry submissions table
CREATE TABLE public.inquiry_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  inquiry_type public.inquiry_type NOT NULL,
  full_name TEXT NOT NULL CHECK (char_length(trim(full_name)) BETWEEN 2 AND 100),
  email TEXT NOT NULL CHECK (char_length(trim(email)) BETWEEN 5 AND 255),
  phone TEXT CHECK (phone IS NULL OR char_length(trim(phone)) <= 50),
  subject TEXT CHECK (subject IS NULL OR char_length(trim(subject)) <= 150),
  message TEXT CHECK (message IS NULL OR char_length(trim(message)) <= 3000),
  safari_id TEXT CHECK (safari_id IS NULL OR char_length(trim(safari_id)) <= 100),
  safari_title TEXT CHECK (safari_title IS NULL OR char_length(trim(safari_title)) <= 200),
  preferred_date DATE,
  guests TEXT CHECK (guests IS NULL OR char_length(trim(guests)) <= 20),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'synced', 'sync_failed')),
  google_sync_attempted_at TIMESTAMPTZ,
  google_sync_error TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Helpful indexes
CREATE INDEX idx_inquiry_submissions_type_created_at ON public.inquiry_submissions (inquiry_type, created_at DESC);
CREATE INDEX idx_inquiry_submissions_status_created_at ON public.inquiry_submissions (status, created_at DESC);
CREATE INDEX idx_inquiry_submissions_email ON public.inquiry_submissions (email);

-- Enable RLS
ALTER TABLE public.inquiry_submissions ENABLE ROW LEVEL SECURITY;

-- Block direct access from clients; only edge functions using service role should handle writes/reads.
CREATE POLICY "No direct client select on inquiry submissions"
ON public.inquiry_submissions
FOR SELECT
TO authenticated
USING (false);

CREATE POLICY "No direct client insert on inquiry submissions"
ON public.inquiry_submissions
FOR INSERT
TO authenticated
WITH CHECK (false);

CREATE POLICY "No direct client update on inquiry submissions"
ON public.inquiry_submissions
FOR UPDATE
TO authenticated
USING (false)
WITH CHECK (false);

CREATE POLICY "No direct client delete on inquiry submissions"
ON public.inquiry_submissions
FOR DELETE
TO authenticated
USING (false);