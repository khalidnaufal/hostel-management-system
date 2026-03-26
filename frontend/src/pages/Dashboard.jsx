import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Users, BedDouble, AlertCircle, CreditCard } from 'lucide-react';
import Skeleton from '../components/Skeleton';

const Dashboard = () => {
    const [stats, setStats] = useState({
        students: 0,
        rooms: 0,
        complaints: 0,
        payments: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            setLoading(true);
            try {
                const [studentsRes, roomsRes, complaintsRes, paymentsRes] = await Promise.all([
                    api.get('/students').catch(() => ({ data: [] })),
                    api.get('/rooms').catch(() => ({ data: [] })),
                    api.get('/complaints').catch(() => ({ data: [] })),
                    api.get('/payments').catch(() => ({ data: [] }))
                ]);

                setStats({
                    students: studentsRes.data.length || 0,
                    rooms: roomsRes.data.length || 0,
                    complaints: complaintsRes.data.length || 0,
                    payments: paymentsRes.data.length || 0
                });
            } catch (error) {
                console.error('Error fetching dashboard stats:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    return (
        <div className="page">
            <div className="page-header">
                <h2>Dashboard Overview</h2>
            </div>
            
            <div className="dashboard-grid">
                <div className="stat-card">
                    <div className="stat-content">
                        <h3>Total Students</h3>
                        {loading ? <Skeleton width="60px" height="32px" /> : <h2>{stats.students}</h2>}
                    </div>
                    <div className="stat-icon" style={{ backgroundColor: '#EEF2FF', color: '#4F46E5' }}>
                        <Users size={28} />
                    </div>
                </div>
                
                <div className="stat-card">
                    <div className="stat-content">
                        <h3>Total Rooms</h3>
                        {loading ? <Skeleton width="60px" height="32px" /> : <h2>{stats.rooms}</h2>}
                    </div>
                    <div className="stat-icon" style={{ backgroundColor: '#D1FAE5', color: '#10B981' }}>
                        <BedDouble size={28} />
                    </div>
                </div>
                
                <div className="stat-card">
                    <div className="stat-content">
                        <h3>Complaints</h3>
                        {loading ? <Skeleton width="60px" height="32px" /> : <h2>{stats.complaints}</h2>}
                    </div>
                    <div className="stat-icon" style={{ backgroundColor: '#FEF3C7', color: '#D97706' }}>
                        <AlertCircle size={28} />
                    </div>
                </div>
                
                <div className="stat-card">
                    <div className="stat-content">
                        <h3>Payments</h3>
                        {loading ? <Skeleton width="60px" height="32px" /> : <h2>{stats.payments}</h2>}
                    </div>
                    <div className="stat-icon" style={{ backgroundColor: '#F3E8FF', color: '#9333EA' }}>
                        <CreditCard size={28} />
                    </div>
                </div>
            </div>
            
            <div className="dashboard-charts">
                {/* Placeholder for future charts */}
            </div>
        </div>
    );
};

export default Dashboard;
