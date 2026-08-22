-- =======================================================
-- MEDIDHISUBBAIAH TRUST SUPABASE DATABASE SCHEMA
-- Execute this script in your Supabase SQL Editor:
-- Supabase Project: https://plbdgerejabjrrqttlba.supabase.co
-- =======================================================

-- 1. Create Events Table
CREATE TABLE IF NOT EXISTS public.events (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    category TEXT,
    date TEXT,
    time TEXT,
    location TEXT,
    status TEXT DEFAULT 'Upcoming',
    description TEXT,
    image_url TEXT,
    total_seats INTEGER DEFAULT 100,
    seats_registered INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Create Media & News Table
CREATE TABLE IF NOT EXISTS public.news (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    date TEXT,
    category TEXT,
    short_description TEXT,
    content TEXT,
    author TEXT,
    read_time TEXT,
    thumbnail TEXT,
    pdf_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Create Photo & Video Gallery Table
CREATE TABLE IF NOT EXISTS public.gallery (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    category TEXT,
    type TEXT DEFAULT 'image',
    image_url TEXT,
    video_url TEXT,
    duration TEXT,
    date TEXT,
    location TEXT,
    caption TEXT,
    is_pdf_work BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Create Services & Causes Table
CREATE TABLE IF NOT EXISTS public.services (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    category TEXT,
    short_description TEXT,
    full_description TEXT,
    icon TEXT,
    image TEXT,
    raised TEXT,
    goal TEXT,
    progress INTEGER DEFAULT 0,
    features JSONB DEFAULT '[]'::jsonb,
    beneficiaries TEXT,
    duration TEXT,
    location TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Create Contact Inquiries Table
CREATE TABLE IF NOT EXISTS public.inquiries (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    phone TEXT,
    email TEXT,
    subject TEXT,
    message TEXT,
    submitted_at TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Create Service Applications Table
CREATE TABLE IF NOT EXISTS public.service_applications (
    id TEXT PRIMARY KEY,
    service_id TEXT,
    service_title TEXT,
    full_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT,
    city TEXT,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Create Donations Log Table
CREATE TABLE IF NOT EXISTS public.donations (
    id TEXT PRIMARY KEY,
    donor_name TEXT,
    amount NUMERIC,
    phone TEXT,
    pan_number TEXT,
    utr_reference TEXT,
    cause TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =======================================================
-- ENABLE ROW LEVEL SECURITY & PUBLIC POLICIES (Full Access)
-- =======================================================

ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.news ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.donations ENABLE ROW LEVEL SECURITY;

-- Allow all operations for Anon & Authenticated users
DROP POLICY IF EXISTS "Public access events" ON public.events;
CREATE POLICY "Public access events" ON public.events FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public access news" ON public.news;
CREATE POLICY "Public access news" ON public.news FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public access gallery" ON public.gallery;
CREATE POLICY "Public access gallery" ON public.gallery FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public access services" ON public.services;
CREATE POLICY "Public access services" ON public.services FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public access inquiries" ON public.inquiries;
CREATE POLICY "Public access inquiries" ON public.inquiries FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public access service_applications" ON public.service_applications;
CREATE POLICY "Public access service_applications" ON public.service_applications FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public access donations" ON public.donations;
CREATE POLICY "Public access donations" ON public.donations FOR ALL USING (true) WITH CHECK (true);

-- =======================================================
-- INITIAL SEED DATA (Medidhisubbaiah Trust)
-- =======================================================

INSERT INTO public.events (id, title, category, date, time, location, status, description, image_url, total_seats, seats_registered)
VALUES
('1', 'Mega Free Vocational Training Graduation & Certificate Distribution', 'Skill Development', '2026-09-15', '10:00 AM - 01:30 PM', 'Hotel Chitturi Heritage, Tanuku', 'Registration Open', 'Grand convocation ceremony honoring 300+ women completing free tailoring and maggam work training.', 'assets/gallery/trust_work_page_01.jpg', 350, 42),
('2', 'Emergency Voluntary Blood Donation Camp & Awareness Meet', 'Healthcare', '2026-09-28', '08:30 AM - 02:00 PM', 'Trust Community Center, Nizampet', 'Registration Open', 'Join our noble life-saving blood donation drive in association with Red Cross Blood Bank.', 'https://images.unsplash.com/photo-1615461066841-6116e61058f4?auto=format&fit=crop&w=800&q=80', 200, 88),
('3', 'Annual Free Sports Tournament & Sports Kit Distribution for Youth', 'Youth & Sports', '2026-10-12', '07:30 AM - 05:00 PM', 'Tanuku Municipal Stadium', 'Upcoming', 'Inter-mandal cricket, kabaddi, and athletics meet promoting rural youth sports talent with free jerseys.', 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=800&q=80', 500, 120)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.news (id, title, date, category, short_description, content, author, read_time, thumbnail)
VALUES
('1', 'Medidhisubbaiah Trust Expands Free Tailoring Center to Empower 500 More Rural Women', '2026-08-10', 'Skill Development', 'With new industrial sewing machines and master trainers, the Trust expands its flagship tailoring curriculum.', 'Medidhisubbaiah Trust has announced the major expansion of its Free Tailoring and Garment Making Center. The initiative introduces 20 brand-new computerized sewing and overlock machines, allowing the trust to train an additional 500 women per year.\n\nThe program includes comprehensive modules in pattern drafting, blouse stitching, kidswear design, and basic boutique management. Trainees are also connected with local garment boutiques and textile merchants for direct job placement and order fulfillment.', 'Trust Editorial Desk', '4 min read', 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=800&q=80'),
('2', 'Emergency Blood Donor Registry Crosses 1,000 Verified Donors Milestone', '2026-07-22', 'Healthcare', 'The Trust''s 24/7 blood helpline has successfully arranged critical blood units for over 350 emergency cases.', 'The 24/7 Voluntary Blood Donor Network of Medidhisubbaiah Trust reached a significant milestone this month with over 1,000 verified volunteer donors registered across rare and common blood groups.\n\nIn coordination with district medical centers and emergency response teams, the network helps connect patients in urgent need with voluntary donors in less than 20 minutes on average.', 'Health Committee', '3 min read', 'https://images.unsplash.com/photo-1615461066841-6116e61058f4?auto=format&fit=crop&w=800&q=80'),
('3', '1,200 Students Receive Free Educational Bags and Stationery Kits for New Academic Year', '2026-06-18', 'Education', 'Children across eight government primary and high schools received durable school bags, notebooks, and learning materials.', 'As schools resumed for the new academic calendar, Medidhisubbaiah Trust completed its annual Free School Kit Distribution drive. Over 1,200 students from underprivileged backgrounds were provided with high quality backpacks, notebooks, pens, geometry boxes, and examination pads.', 'Education Wing', '3 min read', 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80'),
('4', 'Summer Chalivendram Kiosks Serve Over 1.5 Lakh Citizens Across High-Traffic Hubs', '2026-05-30', 'Public Welfare', 'The 3-month summer drinking water and buttermilk service concluded successfully.', 'With temperatures soaring past 42°C during peak summer, Medidhisubbaiah Trust operated 8 dedicated Chalivendram centers across major transit and market hubs serving cool clay pot water and freshly churned buttermilk.', 'Public Relations', '2 min read', 'https://images.unsplash.com/photo-1559827291-72ee739d0d9a?auto=format&fit=crop&w=800&q=80')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.gallery (id, title, category, type, image_url, video_url, duration, date, location, caption)
VALUES
('100', 'Official Program Live Video — Free Tailoring & Muggam Work Convocations', 'Video Documentation', 'video', 'assets/gallery/trust_activity_video_thumb.jpg', 'assets/gallery/trust_activity_video.mp4', '1:22', '2026-08-22', 'Hotel Chitturi Heritage, Tanuku', 'Live video documentation showing trainees, master faculty, guest dignitaries, certificate distribution, and vocational skill activities across Tanuku, Mogultur, Narsapuram & Tadepalligudam.'),
('1', 'Grand Keynote & Certificate Distribution Inauguration', 'Certificate Distribution', 'image', 'assets/gallery/trust_work_page_01.jpg', NULL, NULL, '2026-08-10', 'Hotel Chitturi Heritage, Tanuku', 'Dr. Kishore Kumar Garu inaugurating Certificate Distribution Ceremony for Free Tailoring & Muggam Work batches.'),
('2', 'Mega Graduation Convocation - Women Beneficiaries', 'Certificate Distribution', 'image', 'assets/gallery/trust_work_page_02.jpg', NULL, NULL, '2026-08-10', 'Tanuku, West Godavari', 'Grand convocation group photograph of women trainees holding their official certificates.'),
('3', 'Tanuku & Mogultur Batch Certificate Distribution', 'Certificate Distribution', 'image', 'assets/gallery/trust_work_page_03.jpg', NULL, NULL, '2026-08-10', 'Hotel Chitturi Heritage, Tanuku', 'Dignitaries presenting vocational credentials to successful trainees from Tanuku and Mogultur mandals.')
ON CONFLICT (id) DO NOTHING;
