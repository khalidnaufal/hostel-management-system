-- 🚀 RUN THIS TO SYNC AUTH USERS WITH THE STUDENTS TABLE
-- This fixes the issue where you have users in Auth but they aren't logic in the portal yet.

INSERT INTO public.students (auth_user_id, full_name, email, student_id, username, phone, course)
SELECT 
    id AS auth_user_id, 
    COALESCE(raw_user_meta_data->>'full_name', 'HMS Student') AS full_name,
    email,
    COALESCE(raw_user_meta_data->>'student_id', 'ST-' || floor(random() * 90000 + 10000)) AS student_id,
    email AS username,
    COALESCE(raw_user_meta_data->>'phone', 'N/A') AS phone,
    COALESCE(raw_user_meta_data->>'course', 'N/A') AS course
FROM auth.users
ON CONFLICT (auth_user_id) DO NOTHING;

-- This command "pushes" everyone in your Auth tab into your Students table.
-- After running this, the Portal will immediately see your profile!
