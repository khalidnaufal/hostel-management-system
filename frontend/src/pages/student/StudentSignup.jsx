import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Eye, EyeOff, User, IdCard, Mail, Phone, BookOpen,
  Lock, CheckCircle, AlertCircle, ArrowRight, Loader2
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import './StudentSignup.css';

/* ─── Field config ────────────────────────────────────────────────── */
const FIELDS = [
  { id: 'fullName',   label: 'Full Name',           type: 'text',     icon: User,     placeholder: 'e.g. Mohammed Fayaz VP',        half: false },
  { id: 'studentId',  label: 'Student ID',           type: 'text',     icon: IdCard,   placeholder: 'e.g. ST-2024-001',              half: true  },
  { id: 'email',      label: 'Email Address',        type: 'email',    icon: Mail,     placeholder: 'e.g. student@college.edu',       half: true  },
  { id: 'phone',      label: 'Phone Number',         type: 'tel',      icon: Phone,    placeholder: 'e.g. +91 98765 43210',           half: true  },
  { id: 'course',     label: 'Course / Department',  type: 'text',     icon: BookOpen, placeholder: 'e.g. B.Tech Computer Science',   half: true  },
  { id: 'password',   label: 'Password',             type: 'password', icon: Lock,     placeholder: 'Minimum 8 characters',           half: true  },
  { id: 'confirmPwd', label: 'Confirm Password',     type: 'password', icon: Lock,     placeholder: 'Re-enter password',              half: true  },
];

/* ─── Validation ─────────────────────────────────────────────────── */
const validate = (form) => {
  const errs = {};
  if (!form.fullName.trim())                        errs.fullName   = 'Full name is required';
  if (!form.studentId.trim())                       errs.studentId  = 'Student ID is required';
  if (!/^\S+@\S+\.\S+$/.test(form.email))          errs.email      = 'Enter a valid email address';
  if (!/^\+?[\d\s\-]{7,15}$/.test(form.phone))     errs.phone      = 'Enter a valid phone number';
  if (!form.course.trim())                          errs.course     = 'Course/Department is required';
  if (form.password.length < 8)                     errs.password   = 'Password must be at least 8 characters';
  if (form.password !== form.confirmPwd)            errs.confirmPwd = 'Passwords do not match';
  return errs;
};

/* ─── Component ──────────────────────────────────────────────────── */
const StudentSignup = () => {
  const navigate  = useNavigate();
  const { signUp } = useAuth();

  const [form, setForm] = useState({
    fullName: '', studentId: '', email: '', phone: '',
    course: '', password: '', confirmPwd: '',
  });
  const [errors,        setErrors]        = useState({});
  const [showPwd,       setShowPwd]       = useState(false);
  const [showConfirm,   setShowConfirm]   = useState(false);
  const [loading,       setLoading]       = useState(false);
  const [serverError,   setServerError]   = useState('');
  const [success,       setSuccess]       = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm(prev => ({ ...prev, [id]: value }));
    if (errors[id]) setErrors(prev => ({ ...prev, [id]: '' }));
    setServerError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setLoading(true);
    try {
      await signUp({
        email:     form.email,
        password:  form.password,
        fullName:  form.fullName,
        studentId: form.studentId,
        phone:     form.phone,
        course:    form.course,
      });
      setSuccess(true);
      setTimeout(() => navigate('/student/dashboard'), 1800);
    } catch (err) {
      setServerError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  /* ── strength bar ── */
  const pwdStrength = (() => {
    const p = form.password;
    let s = 0;
    if (p.length >= 8)           s++;
    if (/[A-Z]/.test(p))         s++;
    if (/[0-9]/.test(p))         s++;
    if (/[^A-Za-z0-9]/.test(p)) s++;
    return s; // 0-4
  })();
  const strengthLabel = ['', 'Weak', 'Fair', 'Good', 'Strong'];
  const strengthColor = ['', '#EF4444', '#F59E0B', '#10B981', '#4F46E5'];

  return (
    <div className="signup-bg">
      {/* Animated blobs */}
      <div className="blob blob-1" />
      <div className="blob blob-2" />
      <div className="blob blob-3" />

      <div className="signup-wrapper">
        {/* ─ Left panel ─ */}
        <div className="signup-left">
          <div className="signup-logo">
            <span className="logo-text">HMS<span className="logo-accent">Pro</span></span>
            <span className="logo-badge">Student Portal</span>
          </div>
          <h1 className="signup-hero-title">
            Your hostel,<br />
            <span className="signup-hero-accent">one app away.</span>
          </h1>
          <p className="signup-hero-sub">
            Register to manage your room, fees, complaints, and stay connected with your hostel community.
          </p>
          <ul className="signup-features">
            {['Real-time room status', 'Fee payment tracking', 'Complaint management', 'Daily mess menu', 'Notice board'].map(f => (
              <li key={f}><CheckCircle size={16} className="feat-icon" />{f}</li>
            ))}
          </ul>
        </div>

        {/* ─ Right panel: form card ─ */}
        <div className="signup-card">
          {success ? (
            <div className="success-screen">
              <div className="success-icon-wrap">
                <CheckCircle size={52} color="#10B981" />
              </div>
              <h2>Account Created!</h2>
              <p>Welcome aboard. Redirecting you to your dashboard…</p>
              <div className="success-loader"><Loader2 size={20} className="spin" /></div>
            </div>
          ) : (
            <>
              <div className="signup-card-header">
                <h2>Create Student Account</h2>
                <p>Already have an account? <Link to="/login" className="signin-link">Sign in</Link></p>
              </div>

              {serverError && (
                <div className="alert alert-error">
                  <AlertCircle size={16} />
                  <span>{serverError}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate className="signup-form">
                <div className="form-grid">
                  {FIELDS.map(({ id, label, type, icon: Icon, placeholder, half }) => {
                    const isPwd     = id === 'password';
                    const isConfirm = id === 'confirmPwd';
                    const showTgl   = isPwd ? showPwd : showConfirm;
                    const setTgl    = isPwd ? setShowPwd : setShowConfirm;
                    const inputType = (isPwd || isConfirm)
                      ? (showTgl ? 'text' : 'password')
                      : type;

                    return (
                      <div key={id} className={`sf-group ${half ? 'half' : 'full'} ${errors[id] ? 'has-error' : ''}`}>
                        <label htmlFor={id}>{label}</label>
                        <div className="sf-input-wrap">
                          <Icon size={16} className="sf-icon" />
                          <input
                            id={id}
                            type={inputType}
                            placeholder={placeholder}
                            value={form[id]}
                            onChange={handleChange}
                            autoComplete="off"
                          />
                          {(isPwd || isConfirm) && (
                            <button type="button" className="eye-btn" onClick={() => setTgl(p => !p)}>
                              {showTgl ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                          )}
                        </div>
                        {errors[id] && <span className="field-error">{errors[id]}</span>}

                        {/* strength bar only for password */}
                        {isPwd && form.password && (
                          <div className="strength-wrap">
                            <div className="strength-bar">
                              {[1,2,3,4].map(n => (
                                <div
                                  key={n}
                                  className="strength-seg"
                                  style={{ background: n <= pwdStrength ? strengthColor[pwdStrength] : '#E5E7EB' }}
                                />
                              ))}
                            </div>
                            <span className="strength-label" style={{ color: strengthColor[pwdStrength] }}>
                              {strengthLabel[pwdStrength]}
                            </span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                <button type="submit" className="signup-submit" disabled={loading}>
                  {loading
                    ? <><Loader2 size={18} className="spin" /> Creating Account…</>
                    : <><span>Create Account</span><ArrowRight size={18} /></>
                  }
                </button>

                <p className="terms-note">
                  By registering, you agree to the hostel's terms and conditions.
                </p>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentSignup;
