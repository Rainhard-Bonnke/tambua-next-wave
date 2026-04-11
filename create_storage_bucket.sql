-- Create storage bucket for images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('safaris', 'safaris', true)
ON CONFLICT (id) DO NOTHING;

-- Create storage policies
CREATE POLICY "Public can view images" ON storage.objects FOR SELECT TO anon, authenticated USING (bucket_id = 'safaris');
CREATE POLICY "Admins can upload images" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'safaris' AND public.is_admin(auth.uid()));
CREATE POLICY "Admins can update images" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'safaris' AND public.is_admin(auth.uid()));
CREATE POLICY "Admins can delete images" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'safaris' AND public.is_admin(auth.uid()));
