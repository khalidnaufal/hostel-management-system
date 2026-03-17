import React, { useState, useRef, useEffect } from 'react';
import { Mail, Phone, BookOpen, Edit2, Check, X, Camera, Loader2, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../services/supabase';

const Field = ({ label, field, value, editing, onChange, readOnly }) => (
    <div>
        <p style={{ margin: '0 0 4px', fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            {label}
        </p>
        {editing && !readOnly ? (
            <input
                value={value || ''}
                onChange={e => onChange(field, e.target.value)}
                style={{
                    width: '100%', padding: '8px 12px',
                    border: '1.5px solid var(--primary)',
                    borderRadius: 'var(--radius-md)', fontSize: '0.9rem',
                    outline: 'none', boxSizing: 'border-box',
                    background: '#F5F3FF', color: 'var(--text-main)',
                    fontFamily: 'inherit',
                }}
            />
        ) : (
            <p style={{ margin: 0, fontWeight: 500, fontSize: '0.9rem' }}>{value || 'Not provided'}</p>
        )}
    </div>
);

const MyProfile = () => {
    const { student, authUser } = useAuth();
    const [draft, setDraft]   = useState({});
    const [editing, setEditing] = useState(false);
    const [saving, setSaving]   = useState(false);
    const [saved, setSaved]     = useState(false);
    const [error, setError]     = useState('');
    const [photo, setPhoto]     = useState(() => localStorage.getItem('studentPhoto') || null);
    const [dragging, setDragging] = useState(false);
    const fileInputRef = useRef(null);

    // Sync draft with real profile on load
    useEffect(() => {
        if (student) setDraft({ ...student });
    }, [student]);

    const handlePhotoChange = (file) => {
        if (!file || !file.type.startsWith('image/')) return;
        const reader = new FileReader();
        reader.onload = (e) => {
            const dataUrl = e.target.result;
            setPhoto(dataUrl);
            localStorage.setItem('studentPhoto', dataUrl);
            window.dispatchEvent(new Event('storage'));
        };
        reader.readAsDataURL(file);
    };

    const handleFileInput = (e) => handlePhotoChange(e.target.files[0]);
    const handleDrop = (e) => { e.preventDefault(); setDragging(false); handlePhotoChange(e.dataTransfer.files[0]); };
    const handleChange = (field, value) => setDraft(prev => ({ ...prev, [field]: value }));

    const handleSave = async () => {
        setSaving(true);
        setError('');
        try {
            const { error: updateError } = await supabase
                .from('students')
                .update({
                    full_name:  draft.full_name,
                    phone:      draft.phone,
                    course:     draft.course,
                    // any other fields can be added here
                })
                .eq('auth_user_id', authUser.id);

            if (updateError) throw updateError;
            
            setEditing(false);
            setSaved(true);
            setTimeout(() => setSaved(false), 2500);
        } catch (err) {
            setError(err.message || 'Failed to update profile');
        } finally {
            setSaving(false);
        }
    };

    const handleCancel = () => { setDraft({ ...student }); setEditing(false); setError(''); };

    if (!student && !authUser) return null;

    return (
        <div className="page">
            <div className="page-header">
                <h2>👤 My Profile</h2>
                <div style={{ display: 'flex', gap: 10 }}>
                    {editing ? (
                        <>
                            <button className="btn" onClick={handleSave} disabled={saving} style={{ background: '#10B981' }}>
                                {saving ? <Loader2 size={15} className="spin" /> : <Check size={15} />} Save Changes
                            </button>
                            <button className="btn" onClick={handleCancel} disabled={saving} style={{ background: 'transparent', color: 'var(--text-muted)', border: '1px solid var(--border)', boxShadow: 'none' }}>
                                <X size={15} /> Cancel
                            </button>
                        </>
                    ) : (
                        <button className="btn" onClick={() => setEditing(true)}>
                            <Edit2 size={15} /> Edit Profile
                        </button>
                    )}
                </div>
            </div>

            {saved && (
                <div style={{ background: '#D1FAE5', color: '#065F46', padding: '12px 20px', borderRadius: 'var(--radius-md)', marginBottom: 20, fontWeight: 500, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Check size={16} /> Profile updated successfully!
                </div>
            )}
            
            {error && (
                <div style={{ background: '#FEF2F2', color: '#DC2626', padding: '12px 20px', borderRadius: 'var(--radius-md)', marginBottom: 20, fontWeight: 500, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: 8 }}>
                    <AlertCircle size={16} /> {error}
                </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
                {/* Profile Card */}
                <div style={{ background: 'var(--surface)', borderRadius: 'var(--radius-lg)', padding: 28, border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)', textAlign: 'center', height: 'fit-content' }}>

                    {/* Avatar with upload */}
                    <div
                        style={{ position: 'relative', width: 96, height: 96, margin: '0 auto 16px', cursor: 'pointer' }}
                        onDragOver={e => { e.preventDefault(); setDragging(true); }}
                        onDragLeave={() => setDragging(false)}
                        onDrop={handleDrop}
                        onClick={() => fileInputRef.current.click()}
                    >
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            capture="user"
                            onChange={handleFileInput}
                            style={{ display: 'none' }}
                        />

                        {photo ? (
                            <img src={photo} alt="Profile" style={{ width: 96, height: 96, borderRadius: '50%', objectFit: 'cover', border: dragging ? '3px dashed var(--primary)' : '3px solid #EEF2FF', transition: 'border 0.2s' }} />
                        ) : (
                            <div style={{ width: 96, height: 96, borderRadius: '50%', background: 'linear-gradient(135deg, #4F46E5, #7C3AED)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '2.5rem', fontWeight: 700, border: '3px solid transparent' }}>
                                {(draft.full_name || 'S')[0]}
                            </div>
                        )}

                        <div style={{ position: 'absolute', bottom: 0, right: 0, width: 28, height: 28, borderRadius: '50%', background: 'var(--primary)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 6px rgba(0,0,0,0.2)', border: '2px solid #fff' }}>
                            <Camera size={14} />
                        </div>
                    </div>

                    <h3 style={{ margin: '0 0 4px', fontSize: '1.1rem', fontWeight: 700 }}>{draft.full_name}</h3>
                    <p style={{ margin: '0 0 12px', color: 'var(--text-muted)', fontSize: '0.85rem' }}>{draft.student_id}</p>
                    <span className="badge info" style={{ fontSize: '0.75rem' }}>{draft.course}</span>

                    <div style={{ marginTop: 24, borderTop: '1px solid var(--border)', paddingTop: 20, textAlign: 'left' }}>
                        {[
                            { icon: <Mail size={14} />, value: draft.email },
                            { icon: <Phone size={14} />, value: draft.phone },
                        ].map((item, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', color: 'var(--text-muted)', fontSize: '0.85rem', borderBottom: i < 1 ? '1px solid var(--border)' : 'none' }}>
                                <span style={{ flexShrink: 0 }}>{item.icon}</span>
                                <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.value || 'Not set'}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Details */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                    <div style={{ background: 'var(--surface)', borderRadius: 'var(--radius-lg)', padding: 28, border: editing ? '1.5px solid var(--primary)' : '1px solid var(--border)', boxShadow: 'var(--shadow-sm)', transition: 'border-color 0.2s' }}>
                        <h3 style={{ margin: '0 0 20px', fontSize: '1rem', fontWeight: 700 }}>Personal Information</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
                            <Field label="Full Name"     field="full_name"   value={draft.full_name}   editing={editing} onChange={handleChange} />
                            <Field label="Email Address" field="email"       value={draft.email}       readOnly />
                            <Field label="Phone Number"  field="phone"       value={draft.phone}       editing={editing} onChange={handleChange} />
                            <Field label="Course"        field="course"      value={draft.course}      editing={editing} onChange={handleChange} />
                            <Field label="Student ID"    field="student_id"  value={draft.student_id}  readOnly />
                            <Field label="Room Number"   field="room_number" value={draft.room_number} readOnly />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;
