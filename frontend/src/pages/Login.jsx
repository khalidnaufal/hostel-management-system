import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import './Login.css';

const Login = () => {
    const [activeTab, setActiveTab] = useState('admin');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        setError('');

        if (activeTab === 'admin') {
            if (username === 'user123' && password === 'impelsys@123') {
                localStorage.setItem('isAuthenticated', 'true');
                navigate('/dashboard');
            } else {
                setError('Invalid username or password');
            }
        } else {
            if (username === 'student123' && password === 'impelsys@123') {
                localStorage.setItem('isStudentAuthenticated', 'true');
                navigate('/student/dashboard');
            } else {
                setError('Invalid student credentials');
            }
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h2 className="login-title">HMS<span style={{ color: 'var(--primary)' }}>Pro</span></h2>
                <p className="login-subtitle">Hostel Management System</p>

                {/* Tab Switcher */}
                <div className="login-tabs">
                    <button
                        className={`login-tab ${activeTab === 'admin' ? 'active' : ''}`}
                        onClick={() => { setActiveTab('admin'); setError(''); }}
                    >
                        Admin Login
                    </button>
                    <button
                        className={`login-tab ${activeTab === 'student' ? 'active' : ''}`}
                        onClick={() => { setActiveTab('student'); setError(''); }}
                    >
                        Student Login
                    </button>
                </div>

                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            placeholder={activeTab === 'admin' ? 'Enter admin username' : 'Enter student username'}
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <div className="password-input-wrapper">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                placeholder="Enter password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <button
                                type="button"
                                className="password-toggle-btn"
                                onClick={() => setShowPassword(!showPassword)}
                                aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>

                    {error && <p className="error-message">{error}</p>}

                    <button type="submit" className="login-submit-btn">
                        {activeTab === 'admin' ? 'Login as Admin' : 'Login as Student'}
                    </button>
                </form>

                <button className="back-home-btn" onClick={() => navigate('/')}>
                    ← Back to Hub
                </button>
            </div>
        </div>
    );
};

export default Login;
