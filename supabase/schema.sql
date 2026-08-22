-- =============================================
-- Portfolio Admin Panel — Database Schema
-- Supabase SQL Editor এ এটা run করো
-- =============================================

-- 1. Profile table
CREATE TABLE IF NOT EXISTS profile (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL DEFAULT 'Md. Sakib Hossen',
  title TEXT DEFAULT 'Software Developer · Competitive Programmer · AI/ML Learner',
  email TEXT DEFAULT 'mdsakibhassan632@gmail.com',
  location TEXT DEFAULT 'Rajshahi, Bangladesh',
  photo_url TEXT DEFAULT '',
  github TEXT DEFAULT 'https://github.com/mdsakib-hossen',
  linkedin TEXT DEFAULT 'https://www.linkedin.com/in/mdsakib-hossen',
  facebook TEXT DEFAULT 'https://www.facebook.com/share/17rPGzDWHM/',
  about_en TEXT DEFAULT '',
  about_bn TEXT DEFAULT '',
  resume_url TEXT DEFAULT '',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Projects table
CREATE TABLE IF NOT EXISTS projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  subtitle_en TEXT DEFAULT '',
  subtitle_bn TEXT DEFAULT '',
  description_en TEXT DEFAULT '',
  description_bn TEXT DEFAULT '',
  tags TEXT[] DEFAULT '{}',
  live_url TEXT DEFAULT '',
  github_url TEXT DEFAULT '',
  image_url TEXT DEFAULT '',
  award TEXT DEFAULT '',
  status_en TEXT DEFAULT 'In Development',
  status_bn TEXT DEFAULT 'নির্মাণাধীন',
  status_type TEXT DEFAULT 'dev',
  color TEXT DEFAULT 'from-purple-600 to-pink-600',
  sort_order INT DEFAULT 0,
  is_visible BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Achievements table
CREATE TABLE IF NOT EXISTS achievements (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  icon TEXT DEFAULT '🏆',
  title_en TEXT NOT NULL,
  title_bn TEXT DEFAULT '',
  org TEXT DEFAULT '',
  year TEXT DEFAULT '',
  image_url TEXT DEFAULT '',
  color TEXT DEFAULT 'from-purple-600 to-purple-400',
  sort_order INT DEFAULT 0,
  is_visible BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Blog posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title_en TEXT NOT NULL,
  title_bn TEXT DEFAULT '',
  excerpt_en TEXT DEFAULT '',
  excerpt_bn TEXT DEFAULT '',
  content_en TEXT DEFAULT '',
  content_bn TEXT DEFAULT '',
  cover_image TEXT DEFAULT '',
  tags TEXT[] DEFAULT '{}',
  read_time TEXT DEFAULT '5',
  is_published BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Contact messages table
CREATE TABLE IF NOT EXISTS messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Skills table
CREATE TABLE IF NOT EXISTS skills (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  category_en TEXT NOT NULL,
  category_bn TEXT DEFAULT '',
  icon TEXT DEFAULT '💻',
  color TEXT DEFAULT 'from-purple-600 to-purple-400',
  border TEXT DEFAULT 'border-purple-500/30',
  items TEXT[] DEFAULT '{}',
  sort_order INT DEFAULT 0
);

-- =============================================
-- Insert default data
-- =============================================

INSERT INTO profile (name, title, email, location, github, linkedin, facebook, about_en, about_bn)
VALUES (
  'Md. Sakib Hossen',
  'Software Developer · Competitive Programmer · AI/ML Learner',
  'mdsakibhassan632@gmail.com',
  'Rajshahi, Bangladesh',
  'https://github.com/mdsakib-hossen',
  'https://www.linkedin.com/in/mdsakib-hossen',
  'https://www.facebook.com/share/17rPGzDWHM/',
  'Computer Science & Technology student at Bangladesh Polytechnic Institute, Rajshahi. Passionate about Competitive Programming, Software Development, and Artificial Intelligence. Currently training with XPSC at Phitron and serving as Shohoj Coding Campus Ambassador.',
  'Bangladesh Polytechnic Institute, রাজশাহীতে Computer Science & Technology পড়ছি। Competitive Programming আর real-world software বানানো নিয়ে আমার গভীর আগ্রহ।'
) ON CONFLICT DO NOTHING;

-- Enable RLS
ALTER TABLE profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;

-- Public read policies
CREATE POLICY "Public read profile" ON profile FOR SELECT USING (TRUE);
CREATE POLICY "Public read projects" ON projects FOR SELECT USING (is_visible = TRUE);
CREATE POLICY "Public read achievements" ON achievements FOR SELECT USING (is_visible = TRUE);
CREATE POLICY "Public read blog" ON blog_posts FOR SELECT USING (is_published = TRUE);
CREATE POLICY "Public read skills" ON skills FOR SELECT USING (TRUE);
CREATE POLICY "Public insert messages" ON messages FOR INSERT WITH CHECK (TRUE);

-- Service role full access (for admin)
CREATE POLICY "Service role all profile" ON profile FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role all projects" ON projects FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role all achievements" ON achievements FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role all blog" ON blog_posts FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role all messages" ON messages FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role all skills" ON skills FOR ALL USING (auth.role() = 'service_role');
