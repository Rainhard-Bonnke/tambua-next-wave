DROP POLICY IF EXISTS "No direct client insert on inquiry submissions" ON public.inquiry_submissions;

CREATE POLICY "Public can submit inquiries"
ON public.inquiry_submissions
FOR INSERT
TO anon, authenticated
WITH CHECK (inquiry_type IN ('booking', 'contact'));