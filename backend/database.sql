-- 1. Create the Students Table (Updated for Supabase Auth sync)
CREATE TABLE public.students (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    auth_user_id UUID UNIQUE, -- Linked to Supabase Auth.uid()
    full_name TEXT NOT NULL,
    student_id TEXT NOT NULL UNIQUE,
    email TEXT NOT NULL UNIQUE,
    phone TEXT NOT NULL,
    course TEXT NOT NULL,
    room_number TEXT,
    fee_status TEXT DEFAULT 'Pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Create the Rooms Table
CREATE TABLE public.rooms (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    room_number TEXT NOT NULL UNIQUE,
    capacity INTEGER NOT NULL DEFAULT 2,
    occupancy INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Create the Complaints Table
CREATE TABLE public.complaints (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    student_id TEXT NOT NULL, -- Logical ID linking to student_id or UUID
    description TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'Pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    CONSTRAINT check_complaint_status CHECK (status IN ('Pending', 'Resolved', 'In Progress'))
);

-- 4. Create the Payments Table
CREATE TABLE public.payments (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    student_id TEXT NOT NULL,
    amount NUMERIC NOT NULL,
    status TEXT NOT NULL DEFAULT 'Pending',
    payment_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    CONSTRAINT check_payment_status CHECK (status IN ('Pending', 'Paid'))
);

-- ─── Triggers for Updated At ─────────────────────────────────────────

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW(); 
   RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_students_updated_at BEFORE UPDATE ON public.students FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_rooms_updated_at BEFORE UPDATE ON public.rooms FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_complaints_updated_at BEFORE UPDATE ON public.complaints FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_payments_updated_at BEFORE UPDATE ON public.payments FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- ─── Row Level Security (RLS) ────────────────────────────────────────

-- Enable RLS on Students table
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;

-- Policy: Student can read their own profile
CREATE POLICY "StudentProfileRead" ON public.students
FOR SELECT USING (auth.uid() = auth_user_id);

-- Policy: Student can complete signup (insert)
CREATE POLICY "StudentSignUpInsert" ON public.students
FOR INSERT WITH CHECK (auth.uid() = auth_user_id);

-- Policy: Student can update their own profile
CREATE POLICY "StudentProfileUpdate" ON public.students
FOR UPDATE USING (auth.uid() = auth_user_id);
