
-- Roles
CREATE TYPE public.app_role AS ENUM ('admin', 'owner', 'user');

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL STABLE SECURITY DEFINER SET search_path = public
AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

CREATE POLICY "users read own roles" ON public.user_roles
  FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "admins manage roles" ON public.user_roles
  FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Rooms
CREATE TYPE public.room_status AS ENUM ('available', 'waitlist', 'occupied');

CREATE TABLE public.rooms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  sqft INTEGER,
  amenities JSONB NOT NULL DEFAULT '[]'::jsonb,
  photos JSONB NOT NULL DEFAULT '[]'::jsonb,
  status room_status NOT NULL DEFAULT 'available',
  notes TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.rooms ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read rooms" ON public.rooms FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "admins manage rooms" ON public.rooms FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Inquiries
CREATE TABLE public.inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  kind TEXT NOT NULL DEFAULT 'contact', -- contact | tour | room | admissions
  design TEXT, -- heritage | heirloom
  source_path TEXT,
  room_slug TEXT,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  relation TEXT,
  preferred_date DATE,
  preferred_time TEXT,
  message TEXT,
  handled BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anyone can submit inquiry" ON public.inquiries FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "admins read inquiries" ON public.inquiries FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "admins update inquiries" ON public.inquiries FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Testimonials
CREATE TABLE public.testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  quote TEXT NOT NULL,
  author TEXT NOT NULL,
  relation TEXT,
  published BOOLEAN NOT NULL DEFAULT true,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read testimonials" ON public.testimonials FOR SELECT TO anon, authenticated
  USING (published = true);
CREATE POLICY "admins manage testimonials" ON public.testimonials FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Blog
CREATE TABLE public.blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  excerpt TEXT,
  body TEXT NOT NULL DEFAULT '',
  hero_url TEXT,
  published BOOLEAN NOT NULL DEFAULT false,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read published posts" ON public.blog_posts FOR SELECT TO anon, authenticated
  USING (published = true);
CREATE POLICY "admins manage posts" ON public.blog_posts FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Site settings (single row)
CREATE TABLE public.site_settings (
  id INTEGER PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  business_name TEXT NOT NULL,
  tagline TEXT,
  dshs_license TEXT,
  year_opened INTEGER,
  phone TEXT,
  email TEXT,
  address_line TEXT,
  city TEXT,
  state TEXT,
  zip TEXT,
  service_area TEXT,
  hours TEXT,
  facebook_url TEXT,
  google_maps_url TEXT,
  calendly_url TEXT,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read settings" ON public.site_settings FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "admins update settings" ON public.site_settings FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Seed: site settings
INSERT INTO public.site_settings (id, business_name, tagline, dshs_license, year_opened, phone, email, address_line, city, state, zip, service_area, hours, google_maps_url)
VALUES (1,
  'Skagit Valley Care Home',
  'A safe, caring home in the heart of Mount Vernon',
  'AFH-XXXXXX (Placeholder)',
  2019,
  '(360) 555-0142',
  'hello@skagitvalleycarehome.com',
  '1242 Orchard Lane',
  'Mount Vernon', 'WA', '98273',
  'Mount Vernon, Burlington, Sedro-Woolley, Anacortes, and surrounding Skagit County',
  'Tours available daily, 9am – 5pm by appointment',
  'https://maps.google.com/?q=Mount+Vernon+WA'
);

-- Seed: rooms
INSERT INTO public.rooms (slug, name, description, sqft, amenities, status, sort_order) VALUES
('room-cedar',    'The Cedar Room',    'A bright, south-facing private suite with a garden view and a generous reading nook.', 180, '["Private bath","Garden view","Queen bed","TV mount","Wi-Fi","Closet"]'::jsonb, 'available', 1),
('room-willow',   'The Willow Room',   'A warm corner room with original wood floors and a hand-built window seat.',          165, '["Shared bath","Window seat","Twin bed","Wi-Fi","Closet"]'::jsonb,                'waitlist',  2),
('room-spruce',   'The Spruce Room',   'A quiet ground-floor room with easy access to the back porch and herb garden.',        175, '["Private bath","Ground floor","Twin bed","Wi-Fi","Walk-in closet"]'::jsonb,      'available', 3),
('room-meadow',   'The Meadow Room',   'A serene room overlooking the meadow, with morning light and a built-in bookshelf.',   170, '["Shared bath","Meadow view","Queen bed","Wi-Fi","Bookshelf"]'::jsonb,            'occupied',  4),
('room-orchard',  'The Orchard Room',  'A tucked-away room with views of the apple orchard and a private writing desk.',       160, '["Shared bath","Orchard view","Twin bed","TV mount","Wi-Fi"]'::jsonb,             'available', 5),
('room-cascade',  'The Cascade Room',  'Our largest suite with a private bath, a sitting alcove, and skyline views.',          210, '["Private bath","Sitting alcove","Queen bed","TV mount","Wi-Fi","Walk-in closet"]'::jsonb, 'waitlist', 6);

-- Seed: testimonials
INSERT INTO public.testimonials (quote, author, relation, sort_order) VALUES
('The peace of mind knowing my mother is in a home, not a building, changed everything for our family. She isn''t a patient; she''s a neighbor.', 'Eleanor P.', 'Daughter', 1),
('From the moment we walked in we felt welcome. The caregivers know my father by name, his stories, his favorite jam. It''s a real home.',       'Daniel R.', 'Son', 2),
('We toured five places. This was the only one that felt like family. Mom is gardening again for the first time in two years.',                   'Margaret H.', 'Daughter', 3);

-- Seed: blog
INSERT INTO public.blog_posts (slug, title, excerpt, body, published, published_at) VALUES
('what-is-an-adult-family-home',
 'What Is an Adult Family Home? How It Differs from a Nursing Home',
 'A plain-language guide to adult family homes in Washington State — what they are, who they serve, and how they differ from larger facilities.',
 'Adult Family Homes (AFHs) are licensed residential homes that care for up to six adults who need help with daily living...',
 true, now()),
('how-to-choose-a-care-home-skagit',
 'How to Choose the Right Care Home in Skagit County',
 'Five questions every family should ask before placing a loved one in an adult family home in Mount Vernon or the surrounding area.',
 'Choosing a care home is one of the most personal decisions a family can make. Here is what to look for...',
 true, now()),
('10-questions-to-ask-on-a-tour',
 '10 Questions to Ask When Touring an Adult Family Home',
 'A printable list of the most important questions to ask on a tour — about staffing, safety, food, activities, and licensing.',
 'Touring an adult family home is your best chance to see how a place truly operates. Bring these ten questions...',
 true, now());

-- updated_at trigger
CREATE OR REPLACE FUNCTION public.touch_updated_at() RETURNS TRIGGER
LANGUAGE plpgsql AS $$ BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;
CREATE TRIGGER rooms_touch BEFORE UPDATE ON public.rooms FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();
CREATE TRIGGER settings_touch BEFORE UPDATE ON public.site_settings FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();
