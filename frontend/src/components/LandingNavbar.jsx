import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './LandingNavbar.css';

const LandingNavbar = () => {
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/login');
    };

    return (
        <nav className="landing-navbar">
            <div className="landing-navbar-left">
                {/* Placeholder for University Logo */}
                <div className="logo-placeholder"></div>
                <span className="university-text">HMS</span>
            </div>
            <div className="landing-navbar-right">
                <Link to="/">Home</Link>
                <a href="#slcm">SLCM</a>
                <a href="#contact">Contact Us</a>
                <button className="login-btn" onClick={handleLogin}>Login</button>
            </div>
        </nav>
    );
};

export default LandingNavbar;
