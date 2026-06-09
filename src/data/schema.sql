-- Schema for Mock Tests and Quizzes

-- 1. Create Tests Table
CREATE TABLE IF NOT EXISTS tests (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    mcqs INT NOT NULL,
    time_limit INT NOT NULL, -- in minutes
    difficulty_percentage INT NOT NULL, -- e.g., 70 for 70% average difficulty
    category VARCHAR(100) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 2. Create Questions Table
CREATE TABLE IF NOT EXISTS questions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    test_id INT REFERENCES tests(id) ON DELETE CASCADE,
    question_text TEXT NOT NULL,
    options TEXT[] NOT NULL, -- Array of answers
    correct_answer INT NOT NULL, -- 0-based index of correct option
    difficulty VARCHAR(50) CHECK (difficulty IN ('easy', 'medium', 'hard')) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 3. Create User Attempts Table
CREATE TABLE IF NOT EXISTS user_attempts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL, -- Links to auth.users in Supabase
    test_id INT REFERENCES tests(id) ON DELETE CASCADE,
    score INT NOT NULL,
    total_questions INT NOT NULL,
    difficulty VARCHAR(50) NOT NULL,
    completed_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE tests ENABLE ROW LEVEL SECURITY;
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_attempts ENABLE ROW LEVEL SECURITY;

-- Create Policies
-- Tests are readable by everyone
CREATE POLICY "Allow public read on tests" ON tests
    FOR SELECT USING (true);

-- Questions are readable by everyone (or only authenticated users if desired)
CREATE POLICY "Allow public read on questions" ON questions
    FOR SELECT USING (true);

-- User attempts: users can insert their own attempts, and read only their own
CREATE POLICY "Allow insert for authenticated users" ON user_attempts
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Allow read own attempts" ON user_attempts
    FOR SELECT USING (auth.uid() = user_id);
