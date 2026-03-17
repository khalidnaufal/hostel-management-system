import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../services/supabase';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [student, setStudent]     = useState(null);  // student record from `students` table
  const [authUser, setAuthUser]   = useState(null);  // Supabase auth user
  const [loading, setLoading]     = useState(true);

  // ─── Fetch student profile row from DB ───────────────────────────
  const fetchStudentProfile = async (userId) => {
    const { data, error } = await supabase
      .from('students')
      .select('*')
      .eq('auth_user_id', userId)
      .single();
    if (!error && data) setStudent(data);
    else setStudent(null);
  };

  // ─── Listen to Supabase Auth session ─────────────────────────────
  useEffect(() => {
    // Get current session on mount
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setAuthUser(session.user);
        fetchStudentProfile(session.user.id);
      }
      setLoading(false);
    });

    // Subscribe to auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (session?.user) {
          setAuthUser(session.user);
          await fetchStudentProfile(session.user.id);
        } else {
          setAuthUser(null);
          setStudent(null);
        }
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  // ─── Sign Up ──────────────────────────────────────────────────────
  const signUp = async ({ email, password, fullName, studentId, phone, course }) => {
    // 1) Create auth user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
        // You can add emailRedirectTo here if needed
      },
    });

    if (authError) throw authError;

    // 2) Insert into students table
    const { error: dbError } = await supabase.from('students').insert([{
      auth_user_id : authData.user.id,
      full_name    : fullName,
      student_id   : studentId,
      email,
      phone,
      course,
    }]);

    if (dbError) throw dbError;

    return authData;
  };

  // ─── Sign In ──────────────────────────────────────────────────────
  const signIn = async ({ email, password }) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data;
  };

  // ─── Sign Out ─────────────────────────────────────────────────────
  const signOut = async () => {
    await supabase.auth.signOut();
    // Also clear legacy localStorage flags
    localStorage.removeItem('isStudentAuthenticated');
  };

  return (
    <AuthContext.Provider value={{ student, authUser, loading, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
};
