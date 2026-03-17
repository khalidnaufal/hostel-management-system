import React from 'react';
import { BedDouble, CreditCard, MessageSquarePlus, Bell } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const StatCard = ({ icon, label, value, color, bg }) => (
    <div className="stat-card">
        <div className="stat-content">
            <h3>{label}</h3>
            <h2 style={{ fontSize: '1.75rem' }}>{value}</h2>
        </div>
        <div className="stat-icon" style={{ backgroundColor: bg, color }}>
            {icon}
        </div>
    </div>
);

const StudentDashboard = () => {
    const { student, authUser } = useAuth();
    
    // Fallbacks for display
    const displayName = student?.full_name || authUser?.user_metadata?.full_name || 'Student';
    const studentId  = student?.student_id || 'ST-XXXX-XXX';
    const roomNumber = student?.room_number || 'N/A';
    const feeStatus  = student?.fee_status || 'Pending';

    return (
        <div className="page">
            <div className="page-header">
                <div>
                    <h2>Welcome back, {displayName.split(' ')[0]} 👋</h2>
                    <p style={{ color: 'var(--text-muted)', margin: 0, marginTop: 4 }}>
                        Here's a quick overview of your hostel status
                    </p>
                </div>
                <span className="badge info" style={{ fontSize: '0.85rem', padding: '8px 16px', borderRadius: '10px' }}>
                    Student ID: {studentId}
                </span>
            </div>

            <div className="dashboard-grid">
                <StatCard
                    icon={<BedDouble size={26} />}
                    label="My Room"
                    value={roomNumber !== 'N/A' ? `Room ${roomNumber}` : 'Not Assigned'}
                    color="#4F46E5"
                    bg="#EEF2FF"
                />
                <StatCard
                    icon={<CreditCard size={26} />}
                    label="Fee Status"
                    value={feeStatus === 'Paid' ? 'Paid' : 'Pending'}
                    color={feeStatus === 'Paid' ? '#065F46' : '#92400E'}
                    bg={feeStatus === 'Paid' ? '#D1FAE5' : '#FEF3C7'}
                />
                <StatCard
                    icon={<MessageSquarePlus size={26} />}
                    label="Active Complaints"
                    value={0} // Mocked for now, can be linked to a complaints table count later
                    color="#DC2626"
                    bg="#FEE2E2"
                />
                <StatCard
                    icon={<Bell size={26} />}
                    label="New Notices"
                    value={3} // Mocked
                    color="#D97706"
                    bg="#FEF3C7"
                />
            </div>

            {/* Recent Activity */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
                {/* Recent Notices */}
                <div style={{ background: 'var(--surface)', borderRadius: 'var(--radius-lg)', padding: 24, border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}>
                    <h3 style={{ margin: '0 0 16px', fontSize: '1rem', fontWeight: 700 }}>📢 Latest Notices</h3>
                    {[
                        { title: 'Hostel Day Celebration', date: 'Mar 20', tag: 'Event' },
                        { title: 'Water Supply Maintenance', date: 'Mar 18', tag: 'Maintenance' },
                        { title: 'Fee Last Date Reminder', date: 'Mar 17', tag: 'Fee' },
                    ].map((n, i) => (
                        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: i < 2 ? '1px solid var(--border)' : 'none' }}>
                            <div>
                                <p style={{ margin: 0, fontWeight: 500, fontSize: '0.9rem' }}>{n.title}</p>
                                <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-muted)' }}>{n.date}</p>
                            </div>
                            <span className="badge info" style={{ fontSize: '0.7rem' }}>{n.tag}</span>
                        </div>
                    ))}
                </div>

                {/* My Complaints */}
                <div style={{ background: 'var(--surface)', borderRadius: 'var(--radius-lg)', padding: 24, border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}>
                    <h3 style={{ margin: '0 0 16px', fontSize: '1rem', fontWeight: 700 }}>📝 Recent Complaints</h3>
                    <div style={{ textAlign: 'center', padding: '20px 0', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                        No active complaints. Great!
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentDashboard;
