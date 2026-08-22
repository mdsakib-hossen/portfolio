-- Analytics table
CREATE TABLE IF NOT EXISTS page_views (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  page TEXT NOT NULL DEFAULT '/',
  referrer TEXT DEFAULT '',
  country TEXT DEFAULT '',
  device TEXT DEFAULT 'desktop',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;

-- Anyone can insert (track visits)
CREATE POLICY "Anyone can insert views" ON page_views FOR INSERT WITH CHECK (TRUE);

-- Only service role can read (admin only)
CREATE POLICY "Service role read views" ON page_views FOR SELECT USING (TRUE);
