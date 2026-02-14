import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import './Navbar.css';
import logo from '../assets/logo.jpg';
// import { api } from '../services/api'; // No longer needed directly for auth state
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
    // Consume AuthContext
    const { isAuthenticated, user, logout } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Derived state
    const userType = user?.role; // Ensure user object has role

    const navigate = useNavigate();
    const location = useLocation();
    const isTransparent = location.pathname === '/internship';

    // Close menu on navigation
    useEffect(() => {
        setIsMenuOpen(false);
    }, [location.pathname]);

    const handleLogout = async () => {
        await logout();
        toast.success("Logged out successfully! Hope to see you again soon 👋", {
            duration: 4000,
            style: {
                background: '#333',
                color: '#fff',
            },
        });
        navigate('/');
    };

    const getPortalPath = () => {
        if (!userType) return '/guest-dashboard';

        switch (userType) {
            case 'parent': return '/parent-dashboard';
            case 'student': return '/student-dashboard';
            case 'teacher': return '/teacher-dashboard';
            case 'admin': return '/admin';
            case 'uploader': return '/uploader-dashboard';
            case 'assessment_uploader': return '/assessment-uploader-dashboard';
            default: return '/guest-dashboard';
        }
    };

    const isActive = (path) => {
        if (path === '/') return location.pathname === '/';
        return location.pathname.startsWith(path);
    };

    return (
        <nav className={`navbar ${isTransparent ? 'navbar-transparent' : ''}`}>
            <div className="navbar-content">
                <Link to="/" className="logo">
                    {!isTransparent && <img src={logo} alt="skill100.ai Logo" className="navbar-logo-img" />}
                    <span>Skill100.AI</span>
                </Link>

                <div className="nav-center hidden-mobile">
                    <Link to="/" className={`nav-link-item ${isActive('/') ? 'active' : ''}`}>Home</Link>
                    <Link to="/rapid-math" className={`nav-link-item ${isActive('/rapid-math') ? 'active' : ''}`}>Rapid Math</Link>
                    {isAuthenticated && (
                        <Link to={getPortalPath()} className={`nav-link-item portal-link ${isActive(getPortalPath()) ? 'active' : ''}`}>Portal</Link>
                    )}
                </div>

                <div className="nav-actions">
                    <div className="nav-auth-desktop hidden-mobile">
                        {!isAuthenticated ? (
                            <>
                                <Link to="/login" className="btn-login">Login</Link>
                                <Link to="/register" className="btn-primary">Sign Up</Link>
                            </>
                        ) : (
                            <button onClick={handleLogout} className="btn-primary">Logout</button>
                        )}
                    </div>

                    <button
                        className="menu-toggle show-mobile"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Mobile Dropdown Menu */}
                {isMenuOpen && (
                    <div className="mobile-dropdown show-mobile">
                        <Link to="/" className="mobile-dropdown-item">Home</Link>
                        <Link to="/rapid-math" className={`mobile-dropdown-item ${isActive('/rapid-math') ? 'active' : ''}`}>
                            Rapid Math
                        </Link>
                        {isAuthenticated ? (
                            <>
                                <Link to={getPortalPath()} className="mobile-dropdown-item portal-link">Portal</Link>
                                <button onClick={handleLogout} className="mobile-dropdown-item logout-btn">Logout</button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="mobile-dropdown-item">Login</Link>
                                <Link to="/register" className="mobile-dropdown-item signup-btn">Sign Up</Link>
                            </>
                        )}
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
