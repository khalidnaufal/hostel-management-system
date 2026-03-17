import React from 'react';
import { Bell } from 'lucide-react';

const notices = [
    {
        id: 1, title: 'Hostel Day Celebration 🎉', date: 'March 20, 2025', tag: 'Event',
        description: 'Annual Hostel Day celebration will be held on March 20th in the main courtyard. All students are encouraged to participate in cultural events and competitions.',
        tagClass: 'info',
    },
    {
        id: 2, title: 'Water Supply Maintenance', date: 'March 18, 2025', tag: 'Maintenance',
        description: 'Due to scheduled maintenance work, water supply will be interrupted from 9 AM to 1 PM on March 18. Students are advised to store water in advance.',
        tagClass: 'warning',
    },
    {
        id: 3, title: 'Fee Payment Last Date Reminder', date: 'March 10, 2025', tag: 'Fee',
        description: 'This is a reminder that the last date for monthly fee payment is March 10, 2025. A late fee of ₹200 will be charged after the due date.',
        tagClass: 'danger',
    },
    {
        id: 4, title: 'New Wi-Fi Password Updated', date: 'March 5, 2025', tag: 'General',
        description: 'The hostel Wi-Fi password has been updated for security. Please visit the hostel office or check your registered email for the new credentials.',
        tagClass: 'success',
    },
    {
        id: 5, title: 'Mess Survey – Share Your Feedback', date: 'March 1, 2025', tag: 'Feedback',
        description: 'We are conducting a mess quality survey for all residents. Please fill out the form available at the hostel office and help us improve your dining experience.',
        tagClass: 'info',
    },
];

const Notices = () => {
    return (
        <div className="page">
            <div className="page-header">
                <h2>📢 Notices & Announcements</h2>
                <span className="badge warning" style={{ fontSize: '0.85rem', padding: '8px 16px' }}>
                    {notices.length} Notices
                </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {notices.map((notice, i) => (
                    <div
                        key={notice.id}
                        style={{
                            background: 'var(--surface)',
                            borderRadius: 'var(--radius-lg)',
                            padding: '24px 28px',
                            border: '1px solid var(--border)',
                            boxShadow: 'var(--shadow-sm)',
                            display: 'flex',
                            gap: 20,
                            transition: 'all 0.2s',
                            cursor: 'default',
                        }}
                        onMouseEnter={e => { e.currentTarget.style.transform = 'translateX(4px)'; e.currentTarget.style.boxShadow = 'var(--shadow-md)'; }}
                        onMouseLeave={e => { e.currentTarget.style.transform = 'translateX(0)'; e.currentTarget.style.boxShadow = 'var(--shadow-sm)'; }}
                    >
                        <div style={{
                            width: 44, height: 44, background: '#EEF2FF', borderRadius: 'var(--radius-md)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            color: '#4F46E5', flexShrink: 0,
                        }}>
                            <Bell size={20} />
                        </div>
                        <div style={{ flex: 1 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                                <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 700 }}>{notice.title}</h3>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0, marginLeft: 16 }}>
                                    <span className={`badge ${notice.tagClass}`} style={{ fontSize: '0.7rem' }}>{notice.tag}</span>
                                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{notice.date}</span>
                                </div>
                            </div>
                            <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                                {notice.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Notices;
