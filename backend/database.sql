-- 🚀 HARD RESET & FIX SCRIPT
-- Run this if you see "column does not exist" or other SQL errors.

-- 1. Drop existing objects to ensure a fresh, correct schema
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();
DROP TABLE IF EXISTS public.complaints CASCADE;
DROP TABLE IF EXISTS public.payments CASCADE;
DROP TABLE IF EXISTS public.students CASCADE;
DROP TABLE IF EXISTS public.rooms CASCADE;

-- 2. Re-enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 3. Create the Rooms Table
CREATE TABLE public.rooms (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    room_number TEXT NOT NULL UNIQUE,
    capacity INTEGER NOT NULL DEFAULT 2,
    occupancy INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Create the Students Table
CREATE TABLE public.students (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    auth_user_id UUID UNIQUE, 
    full_name TEXT NOT NULL,
    student_id TEXT NOT NULL UNIQUE,
    username TEXT NOT NULL,
    email TEXT,
    phone TEXT,
    course TEXT,
    room_number TEXT REFERENCES public.rooms(room_number) ON DELETE SET NULL,
    fee_status TEXT DEFAULT 'Pending' CHECK (fee_status IN ('Pending', 'Paid')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Create the Trigger Function
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.students (auth_user_id, full_name, email, student_id, username, phone, course)
  VALUES (
    NEW.id, 
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'Student'), 
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'student_id', 'ST-' || floor(random() * 90000 + 10000)),
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'phone', 'N/A'),
    COALESCE(NEW.raw_user_meta_data->>'course', 'N/A')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 6. Re-create the Trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- 7. Create the Complaints Table
CREATE TABLE public.complaints (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    student_id TEXT REFERENCES public.students(student_id) ON DELETE CASCADE,
    description TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'Pending' CHECK (status IN ('Pending', 'Resolved', 'In Progress')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 8. Create the Payments Table
CREATE TABLE public.payments (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    student_id TEXT REFERENCES public.students(student_id) ON DELETE CASCADE,
    amount NUMERIC NOT NULL,
    status TEXT NOT NULL DEFAULT 'Pending' CHECK (status IN ('Pending', 'Paid')),
    payment_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 9. Enable Row Level Security (RLS)
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.complaints ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rooms ENABLE ROW LEVEL SECURITY;

-- 10. Final Security Policies
CREATE POLICY "StudentProfileSelf" ON public.students FOR ALL USING (auth.uid() = auth_user_id);
CREATE POLICY "RoomsRead" ON public.rooms FOR SELECT TO authenticated USING (true);
CREATE POLICY "StudentComplaints" ON public.complaints FOR ALL USING (EXISTS (SELECT 1 FROM public.students WHERE auth_user_id = auth.uid() AND student_id = public.complaints.student_id));
CREATE POLICY "StudentPayments" ON public.payments FOR SELECT USING (EXISTS (SELECT 1 FROM public.students WHERE auth_user_id = auth.uid() AND student_id = public.payments.student_id));
