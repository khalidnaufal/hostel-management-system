import React, { useState } from 'react';
import { User, Mail, Phone, BookOpen, Edit2 } from 'lucide-react';

const profileData = {
    name: 'Arjun Sharma',
    studentId: 'ST-2024-001',
    course: 'B.Tech Computer Science',
    department: 'Engineering',
    year: '2nd Year',
    email: 'arjun.sharma@student.edu',
    phone: '+91 98765 43210',
    dob: '2003-05-12',
    parentName: 'Rajesh Sharma',
    parentPhone: '+91 98234 56789',
    address: 'Flat 5, Lakeview Apartments, Pune, Maharashtra - 411021',
    roomNumber: '100',
    joinedOn: 'July 2024',
};

const MyProfile = () => {
    const [editing, setEditing] = useState(false);

    return (
        <div className="page">
            <div className="page-header">
                <h2>👤 My Profile</h2>
                <button
                    className="btn"
                    onClick={() => setEditing(!editing)}
                    style={{ background: editing ? 'var(--secondary)' : 'var(--primary)' }}
                >
                    <Edit2 size={15} />
                    {editing ? 'Save Changes' : 'Edit Profile'}
                </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 24 }}>
                {/* Profile Card */}
                <div style={{ background: 'var(--surface)', borderRadius: 'var(--radius-lg)', padding: 28, border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)', textAlign: 'center', height: 'fit-content' }}>
                    {/* Avatar */}
                    <div style={{ width: 96, height: 96, borderRadius: '50%', background: 'linear-gradient(135deg, #4F46E5, #7C3AED)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', color: '#fff', fontSize: '2.5rem', fontWeight: 700 }}>
                        {profileData.name[0]}
                    </div>
                    <h3 style={{ margin: '0 0 4px', fontSize: '1.1rem', fontWeight: 700 }}>{profileData.name}</h3>
                    <p style={{ margin: '0 0 12px', color: 'var(--text-muted)', fontSize: '0.85rem' }}>{profileData.studentId}</p>
                    <span className="badge info" style={{ fontSize: '0.75rem' }}>{profileData.course}</span>

                    <div style={{ marginTop: 24, borderTop: '1px solid var(--border)', paddingTop: 20, textAlign: 'left' }}>
                        {[
                            { icon: <Mail size={14} />, value: profileData.email },
                            { icon: <Phone size={14} />, value: profileData.phone },
                            { icon: <BookOpen size={14} />, value: `${profileData.year} · ${profileData.department}` },
                        ].map((item, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', color: 'var(--text-muted)', fontSize: '0.85rem', borderBottom: i < 2 ? '1px solid var(--border)' : 'none' }}>
                                <span style={{ flexShrink: 0 }}>{item.icon}</span>
                                <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.value}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Details */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                    {/* Personal Details */}
                    <div style={{ background: 'var(--surface)', borderRadius: 'var(--radius-lg)', padding: 28, border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}>
                        <h3 style={{ margin: '0 0 20px', fontSize: '1rem', fontWeight: 700 }}>Personal Information</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                            {[
                                { label: 'Full Name', value: profileData.name },
                                { label: 'Date of Birth', value: new Date(profileData.dob).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' }) },
                                { label: 'Email Address', value: profileData.email },
                                { label: 'Phone Number', value: profileData.phone },
                                { label: 'Course', value: profileData.course },
                                { label: 'Year', value: profileData.year },
                            ].map((field, i) => (
                                <div key={i}>
                                    <p style={{ margin: '0 0 4px', fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{field.label}</p>
                                    {editing
                                        ? <input defaultValue={field.value} style={{ width: '100%', padding: '8px 12px', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box' }} />
                                        : <p style={{ margin: 0, fontWeight: 500, fontSize: '0.9rem' }}>{field.value}</p>
                                    }
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Parent Details */}
                    <div style={{ background: 'var(--surface)', borderRadius: 'var(--radius-lg)', padding: 28, border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}>
                        <h3 style={{ margin: '0 0 20px', fontSize: '1rem', fontWeight: 700 }}>Parent / Guardian</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                            {[
                                { label: 'Parent Name', value: profileData.parentName },
                                { label: 'Parent Phone', value: profileData.parentPhone },
                                { label: 'Home Address', value: profileData.address },
                                { label: 'Hostel Room', value: `Room ${profileData.roomNumber}` },
                            ].map((field, i) => (
                                <div key={i}>
                                    <p style={{ margin: '0 0 4px', fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{field.label}</p>
                                    {editing
                                        ? <input defaultValue={field.value} style={{ width: '100%', padding: '8px 12px', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box' }} />
                                        : <p style={{ margin: 0, fontWeight: 500, fontSize: '0.9rem' }}>{field.value}</p>
                                    }
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;
