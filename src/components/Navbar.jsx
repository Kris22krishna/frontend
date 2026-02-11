import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';
import logo from '../assets/logo.jpg';
import { api } from '../services/api';

const Navbar = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userType, setUserType] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const checkAuth = () => {
            const isAuth = api.isAuthenticated();
            const storedUserType = localStorage.getItem('userType');
            setIsAuthenticated(isAuth);
            setUserType(storedUserType);
        };

        // Check on mount and location change
        checkAuth();

        // Listen for custom auth-change event
        window.addEventListener('auth-change', checkAuth);

        return () => {
            window.removeEventListener('auth-change', checkAuth);
        };
    }, [location]);

    const handleLogout = () => {
        api.logout();
        setIsAuthenticated(false);
        setUserType(null);
        navigate('/login');
    };

    const getPortalPath = () => {
        switch (userType) {
            case 'parent':
                return '/parent-dashboard';
            case 'student':
                return '/student-dashboard';
            case 'teacher':
                return '/teacher-dashboard';
            case 'admin':
                return '/admin';
            case 'uploader':
                return '/uploader-dashboard';
            case 'assessment_uploader':
                return '/assessment-uploader-dashboard';
            default:
                return '/guest-dashboard';
        }
    };

    const isActive = (path) => {
        if (path === '/') {
            return location.pathname === '/';
        }
        return location.pathname.startsWith(path);
    };

    return (
        <nav className="navbar glass">
            <div className="navbar-content">
                <Link to="/" className="logo">
                    <img src={logo} alt="skill100.ai Logo" className="navbar-logo-img" />
                    <span>skill100.ai</span>
                </Link>

                {/* Center: Navigation Links */}
                <div className="nav-center hidden-mobile">
                    <Link to="/" className={`nav-link-item ${isActive('/') ? 'active' : ''}`}>Home</Link>
                    <Link to="/practice" className={`nav-link-item ${isActive('/practice') || location.pathname.includes('/grade/') ? 'active' : ''}`}>Practice</Link>
                    <Link to="/rapid-math" className={`nav-link-item ${isActive('/rapid-math') ? 'active' : ''}`}>Rapid Math</Link>
                    {isAuthenticated && (
                        <Link to={getPortalPath()} className={`nav-link-item portal-link ${isActive(getPortalPath()) ? 'active' : ''}`}>Portal</Link>
                    )}
                </div>

                {/* Right: Actions */}
                <div className="nav-actions">
                    {isAuthenticated ? (
                        <button onClick={handleLogout} className="btn-primary">
                            Logout
                        </button>
                    ) : (
                        <>
                            <Link to="/login" className="btn-ghost">Login</Link>
                            <Link to="/register" className="btn-primary">Sign Up</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
