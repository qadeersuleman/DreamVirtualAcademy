-- ==============================================================================
-- DREAMS VIRTUAL ACADEMY (DVA) - COMPLETE DATABASE SCHEMA UPGRADE
-- Run this in your Supabase Project: SQL Editor -> New Query -> Run
-- ==============================================================================

-- 1. Create / Update Student Profiles Table
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    dva_name TEXT,
    email TEXT,
    phone TEXT,
    district TEXT DEFAULT 'Sukkur',
    target_exam TEXT DEFAULT 'STS / JST / SPSC',
    avatar_url TEXT DEFAULT '/images/profile.png',
    streak_days INT DEFAULT 1,
    xp_points INT DEFAULT 100,
    role TEXT DEFAULT 'student' CHECK (role IN ('student', 'teacher', 'admin')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public profiles are readable by authenticated users"
    ON public.profiles FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "Users can update their own profile"
    ON public.profiles FOR UPDATE
    TO authenticated
    USING (auth.uid() = id)
    WITH CHECK (auth.uid() = id);

-- 2. Automatic Profile Creation Trigger on User Signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
    INSERT INTO public.profiles (id, dva_name, email, phone, avatar_url, role)
    VALUES (
        new.id,
        COALESCE(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'dva_name', split_part(new.email, '@', 1)),
        new.email,
        COALESCE(new.raw_user_meta_data->>'phone', ''),
        COALESCE(new.raw_user_meta_data->>'avatar_url', '/images/profile.png'),
        'student'
    )
    ON CONFLICT (id) DO UPDATE
    SET 
        dva_name = EXCLUDED.dva_name,
        email = EXCLUDED.email,
        updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 3. Enhance / Verify Tests Table
CREATE TABLE IF NOT EXISTS public.tests (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    subject VARCHAR(100) NOT NULL DEFAULT 'General Science',
    mcqs INT NOT NULL DEFAULT 15,
    time_limit INT NOT NULL DEFAULT 15, -- in minutes
    difficulty_percentage INT NOT NULL DEFAULT 70,
    category VARCHAR(100) NOT NULL DEFAULT 'STBB',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

ALTER TABLE public.tests ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read on tests" ON public.tests;
CREATE POLICY "Allow public read on tests" ON public.tests
    FOR SELECT USING (true);

-- 4. Enhance / Verify Questions Table
CREATE TABLE IF NOT EXISTS public.questions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    test_id INT REFERENCES public.tests(id) ON DELETE CASCADE,
    question_text TEXT NOT NULL,
    options TEXT[] NOT NULL,
    correct_answer INT NOT NULL, -- 0-based index
    difficulty VARCHAR(50) CHECK (difficulty IN ('easy', 'medium', 'hard')) NOT NULL DEFAULT 'medium',
    subject VARCHAR(100) DEFAULT 'Science',
    explanation TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read on questions" ON public.questions;
CREATE POLICY "Allow public read on questions" ON public.questions
    FOR SELECT USING (true);

-- 5. Enhance / Verify User Attempts Table (For Live Dashboard Analytics)
CREATE TABLE IF NOT EXISTS public.user_attempts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    test_id INT REFERENCES public.tests(id) ON DELETE SET NULL,
    subject VARCHAR(100) DEFAULT 'General Science',
    score INT NOT NULL,
    total_questions INT NOT NULL,
    difficulty VARCHAR(50) NOT NULL DEFAULT 'medium',
    completed_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Ensure subject column exists if user_attempts was already created
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='user_attempts' AND column_name='subject') THEN
        ALTER TABLE public.user_attempts ADD COLUMN subject VARCHAR(100) DEFAULT 'General Science';
    END IF;
END $$;

ALTER TABLE public.user_attempts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow insert for authenticated users" ON public.user_attempts;
CREATE POLICY "Allow insert for authenticated users" ON public.user_attempts
    FOR INSERT TO authenticated
    WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Allow read own attempts" ON public.user_attempts;
CREATE POLICY "Allow read own attempts" ON public.user_attempts
    FOR SELECT TO authenticated
    USING (auth.uid() = user_id);

-- Speed up dashboard stats calculation
CREATE INDEX IF NOT EXISTS idx_user_attempts_user_id ON public.user_attempts(user_id);
CREATE INDEX IF NOT EXISTS idx_user_attempts_completed_at ON public.user_attempts(completed_at DESC);

-- 6. Course Enrollments / Admissions Table (For /courses modal)
CREATE TABLE IF NOT EXISTS public.course_enrollments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    dva_name TEXT NOT NULL,
    dva_phone TEXT NOT NULL,
    dva_age TEXT,
    dva_district TEXT NOT NULL,
    dva_course_id TEXT NOT NULL,
    dva_course_title TEXT NOT NULL,
    dva_price TEXT NOT NULL,
    payment_method TEXT DEFAULT 'EasyPaisa',
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

ALTER TABLE public.course_enrollments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can create their own enrollment" ON public.course_enrollments
    FOR INSERT TO public
    WITH CHECK (true);

CREATE POLICY "Users can view their own enrollments" ON public.course_enrollments
    FOR SELECT TO authenticated
    USING (auth.uid() = user_id);

-- 7. Seed Initial Mock Tests (Science, Chemistry, Physics, Math, Computer)
INSERT INTO public.tests (id, title, subject, mcqs, time_limit, difficulty_percentage, category)
VALUES 
    (1, 'General Science (Class 6-8)', 'Science', 15, 15, 65, 'STBB'),
    (2, 'Mathematics & General Problem Solving', 'Mathematics', 15, 20, 75, 'STS / IBA'),
    (3, 'Chemistry Mastery (Classes 9th-12th)', 'Chemistry', 15, 15, 80, 'Board Prep'),
    (4, 'Physics Fundamentals & Numericals', 'Physics', 15, 15, 75, 'STBB / Matric'),
    (5, 'Computer Basics & IT Skills', 'Computer Basics', 15, 15, 60, 'JST / STS')
ON CONFLICT (id) DO UPDATE 
SET title = EXCLUDED.title, subject = EXCLUDED.subject;

-- Reset sequence to prevent collision
SELECT setval(pg_get_serial_sequence('tests', 'id'), (SELECT MAX(id) FROM tests));

