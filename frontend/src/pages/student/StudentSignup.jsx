import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Mail, Phone, BookOpen, Key, Loader2, AlertCircle, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import './StudentSignup.css';

const StudentSignup = () => {
    const [form, setForm] = useState({ fullName: '', studentId: '', email: '', phone: '', course: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { signUp } = useAuth();

    const handleChange = (e) => { 
        setForm({ ...form, [e.target.name]: e.target.value }); 
        if (error) setError(''); 
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        
        // Final frontend check
        if (form.password.length < 6) { setError('Password must be 6+ characters'); return; }

        setLoading(true);
        try {
            console.log('Attempting signup for:', form.email);
            const { user } = await signUp({
                email:      form.email.trim(),
                password:   form.password,
                fullName:   form.fullName.trim(),
                studentId:  form.studentId.trim(),
                phone:      form.phone.trim(),
                course:     form.course.trim(),
            });

            // If we have a user object, we are logged in!
            if (user) {
                console.log('Signup success, navigating...');
                localStorage.setItem('isStudentAuthenticated', 'true');
                // Use window.location as fallback if navigate is being blocked
                window.location.href = '/student/dashboard';
            } else {
                setError('Account created, please check if email confirmation is required.');
                setLoading(false);
            }
        } catch (err) {
            console.error('Full Signup Error Details:', err);
            // Translate common errors
            if (err.message.includes('already registered')) {
                setError('Email already exists! Please try Logging In.');
            } else if (err.message.includes('unique constraint')) {
                setError('Student ID or Username is already taken.');
            } else {
                setError(err.message || 'Signup failed. Please check your network.');
            }
            setLoading(false);
        }
    };

    return (
        <div className="signup-ultra-page">
            <div className="signup-ultra-card animate-in">
                <div className="signup-ultra-header">
                    <div className="ultra-logo"><Sparkles size={16} /> HMS<b>Pro</b></div>
                    <h2>Join Portal</h2>
                    <p>Create your profile to access all features.</p>
                </div>

                <form onSubmit={handleSubmit} className="signup-ultra-form">
                    <div className="ultra-group">
                        <label><User size={14} /> Full Name</label>
                        <input name="fullName" placeholder="Rahul Sharma" value={form.fullName} onChange={handleChange} required />
                    </div>

                    <div className="ultra-row">
                        <div className="ultra-group">
                            <label><BookOpen size={14} /> ID</label>
                            <input name="studentId" placeholder="ID" value={form.studentId} onChange={handleChange} required />
                        </div>
                        <div className="ultra-group">
                            <label><BookOpen size={14} /> Course</label>
                            <input name="course" placeholder="Course" value={form.course} onChange={handleChange} required />
                        </div>
                    </div>

                    <div className="ultra-group">
                        <label><Mail size={14} /> Official Email</label>
                        <input type="email" name="email" placeholder="email@college.edu" value={form.email} onChange={handleChange} required />
                    </div>

                    <div className="ultra-row">
                        <div className="ultra-group">
                            <label><Phone size={14} /> Phone</label>
                            <input name="phone" placeholder="+91..." value={form.phone} onChange={handleChange} required />
                        </div>
                        <div className="ultra-group">
                            <label><Key size={14} /> Pass</label>
                            <input type="password" name="password" placeholder="6+ chars" value={form.password} onChange={handleChange} required />
                        </div>
                    </div>

                    {error && <div className="ultra-error"><AlertCircle size={14} /> {error}</div>}

                    <button type="submit" className="ultra-btn" disabled={loading}>
                        {loading ? <Loader2 className="spin" size={20} /> : 'Create Account Now →'}
                    </button>
                </form>

                <div className="ultra-footer">
                    Already a member? <Link to="/login" style={{ fontWeight: 800 }}>Sign In</Link>
                </div>
            </div>
        </div>
    );
};

export default StudentSignup;
