import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Students from './pages/Students';
import Rooms from './pages/Rooms';
import Complaints from './pages/Complaints';
import Payments from './pages/Payments';

// Components
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import StudentSidebar from './components/StudentSidebar';

// Student pages
import StudentSignup from './pages/student/StudentSignup';
import StudentDashboard from './pages/student/StudentDashboard';
import MyRoom from './pages/student/MyRoom';
import PayFees from './pages/student/PayFees';
import MessMenu from './pages/student/MessMenu';
import RaiseComplaint from './pages/student/RaiseComplaint';
import Notices from './pages/student/Notices';
import MyProfile from './pages/student/MyProfile';

// ─── Route Guards ────────────────────────────────────────────────
const PrivateRoute = () => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

const StudentPrivateRoute = () => {
  const { authUser, loading } = useAuth();
  
  if (loading) return (
    <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F3F4F6' }}>
      <div style={{ width: 40, height: 40, border: '3px solid #E5E7EB', borderTopColor: '#4F46E5', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );

  return authUser ? <Outlet /> : <Navigate to="/login" />;
};

// ─── Layouts ────────────────────────────────────────────────────
const AdminLayout = () => (
  <div className="admin-layout">
    <Sidebar />
    <div className="main-content">
      <Header />
      <div className="page-content">
        <Outlet />
      </div>
    </div>
  </div>
);

const StudentLayout = () => {
  const { student, authUser } = useAuth();

  return (
    <div className="admin-layout">
      <StudentSidebar />
      <div className="main-content">
        <div style={{
          height: 72,
          background: 'var(--surface)',
          borderBottom: '1px solid var(--border)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0 40px',
          position: 'sticky',
          top: 0,
          zIndex: 40,
        }}>
          <h2 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 600 }}>Student Portal</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 36, height: 36, background: 'linear-gradient(135deg, #4F46E5, #7C3AED)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: '0.9rem' }}>
              {(student?.full_name || authUser?.user_metadata?.full_name || 'S')[0]}
            </div>
            <div>
              <p style={{ margin: 0, fontSize: '0.875rem', fontWeight: 600 }}>
                {student?.full_name || authUser?.user_metadata?.full_name || 'Student'}
              </p>
              <p style={{ margin: 0, fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                {student?.student_id || 'HMS Student'} · Room {student?.room_number || 'N/A'}
              </p>
            </div>
          </div>
        </div>
        <div className="page-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

// ─── App ────────────────────────────────────────────────────────
function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/student/signup" element={<StudentSignup />} />

          {/* Admin Protected (Legacy local storage auth) */}
          <Route element={<PrivateRoute />}>
            <Route element={<AdminLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/students" element={<Students />} />
              <Route path="/rooms" element={<Rooms />} />
              <Route path="/complaints" element={<Complaints />} />
              <Route path="/payments" element={<Payments />} />
            </Route>
          </Route>

          {/* Student Protected (Supabase Auth) */}
          <Route element={<StudentPrivateRoute />}>
            <Route element={<StudentLayout />}>
              <Route path="/student/dashboard" element={<StudentDashboard />} />
              <Route path="/student/room" element={<MyRoom />} />
              <Route path="/student/fees" element={<PayFees />} />
              <Route path="/student/mess" element={<MessMenu />} />
              <Route path="/student/complaint" element={<RaiseComplaint />} />
              <Route path="/student/notices" element={<Notices />} />
              <Route path="/student/profile" element={<MyProfile />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
