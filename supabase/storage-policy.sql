-- Storage policies for portfolio bucket
-- Supabase SQL Editor এ এটা run করো

-- Allow public read
CREATE POLICY "Public read portfolio bucket"
ON storage.objects FOR SELECT
USING (bucket_id = 'portfolio');

-- Allow anyone to upload (we'll secure later with admin panel)
CREATE POLICY "Allow uploads to portfolio bucket"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'portfolio');

-- Allow updates
CREATE POLICY "Allow updates in portfolio bucket"
ON storage.objects FOR UPDATE
USING (bucket_id = 'portfolio');

-- Allow deletes
CREATE POLICY "Allow deletes in portfolio bucket"
ON storage.objects FOR DELETE
USING (bucket_id = 'portfolio');
