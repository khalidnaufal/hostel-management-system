import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, Loader2, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './Login.css';

const Login = () => {
    const [activeTab,    setActiveTab]    = useState('admin');
    const [identifier,   setIdentifier]   = useState('');   // email or username
    const [password,     setPassword]     = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error,        setError]        = useState('');
    const [loading,      setLoading]      = useState(false);
    const navigate  = useNavigate();
    const { signIn } = useAuth();

    const resetForm = () => { setIdentifier(''); setPassword(''); setError(''); setLoading(false); };

    /* ─── Admin login (unchanged — hardcoded) ─────────────────────── */
    const handleAdminLogin = (e) => {
        e.preventDefault();
        setError('');
        if (identifier === 'user123' && password === 'impelsys@123') {
            localStorage.setItem('isAuthenticated', 'true');
            navigate('/dashboard');
        } else {
            setError('Invalid admin username or password');
        }
    };

    /* ─── Student login via Supabase Auth ─────────────────────────── */
    const handleStudentLogin = async (e) => {
        e.preventDefault();
        setError('');
        if (!identifier || !password) { setError('Please fill in all fields'); return; }

        setLoading(true);
        try {
            await signIn({ email: identifier, password });
            navigate('/student/dashboard');
        } catch (err) {
            setError('Invalid credentials. Please check your email and password.');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = activeTab === 'admin' ? handleAdminLogin : handleStudentLogin;

    return (
        <div className="login-container">
            <div className="login-card">
                <h2 className="login-title">HMS<span style={{ color: 'var(--primary)' }}>Pro</span></h2>
                <p className="login-subtitle">Hostel Management System</p>

                {/* Tab Switcher */}
                <div className="login-tabs">
                    <button
                        className={`login-tab ${activeTab === 'admin' ? 'active' : ''}`}
                        onClick={() => { setActiveTab('admin'); resetForm(); }}
                    >
                        Admin Login
                    </button>
                    <button
                        className={`login-tab ${activeTab === 'student' ? 'active' : ''}`}
                        onClick={() => { setActiveTab('student'); resetForm(); }}
                    >
                        Student Login
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="identifier">
                            {activeTab === 'admin' ? 'Username' : 'Email Address'}
                        </label>
                        <input
                            type={activeTab === 'admin' ? 'text' : 'email'}
                            id="identifier"
                            placeholder={activeTab === 'admin' ? 'Enter admin username' : 'Enter your email'}
                            value={identifier}
                            onChange={(e) => { setIdentifier(e.target.value); setError(''); }}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <div className="password-input-wrapper">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                placeholder="Enter password"
                                value={password}
                                onChange={(e) => { setPassword(e.target.value); setError(''); }}
                                required
                            />
                            <button
                                type="button"
                                className="password-toggle-btn"
                                onClick={() => setShowPassword(!showPassword)}
                                aria-label={showPassword ? 'Hide password' : 'Show password'}
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>

                    {error && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#FEF2F2', color: '#DC2626', padding: '10px 14px', borderRadius: 8, marginBottom: 16, fontSize: '0.85rem', fontWeight: 500 }}>
                            <AlertCircle size={16} style={{ flexShrink: 0 }} />
                            {error}
                        </div>
                    )}

                    <button type="submit" className="login-submit-btn" disabled={loading}>
                        {loading
                            ? <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                                <Loader2 size={18} style={{ animation: 'spin 0.8s linear infinite' }} />
                                Signing in…
                              </span>
                            : activeTab === 'admin' ? 'Login as Admin' : 'Login as Student'
                        }
                    </button>
                </form>

                {/* Sign Up link (only for students) */}
                {activeTab === 'student' && (
                    <div style={{ textAlign: 'center', marginTop: 16 }}>
                        <p style={{ color: '#6B7280', fontSize: '0.875rem', margin: 0 }}>
                            New student?{' '}
                            <Link to="/student/signup" style={{ color: 'var(--primary)', fontWeight: 600, textDecoration: 'none' }}>
                                Create an account →
                            </Link>
                        </p>
                    </div>
                )}

                <button className="back-home-btn" onClick={() => navigate('/')}>
                    ← Back to Hub
                </button>
            </div>
        </div>
    );
};

export default Login;
