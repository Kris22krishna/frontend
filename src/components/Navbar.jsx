import React from 'react';
import { Link } from 'react-router-dom';
import { Activity } from 'lucide-react';
import './Navbar.css';
import logo from '../assets/logo.jpg';

const Navbar = () => {
    return (
        <nav className="navbar glass">
            <div className="navbar-content">
                <Link to="/" className="logo">
                    <img src={logo} alt="Learners Logo" className="navbar-logo-img" />
                    <span>Skill100.AI</span>
                </Link>
                {/* Left: Logo - Already there */}

                {/* Center: Navigation Links */}
                <div className="nav-center hidden-mobile">
                    <Link to="/" className="nav-link-item">Home</Link>
                    <Link to="/features" className="nav-link-item">Features</Link>
                    <Link to="/pricing" className="nav-link-item">Pricing</Link>
                    <Link to="/about" className="nav-link-item">About</Link>
                </div>

                {/* Right: Actions */}
                <div className="nav-actions">
                    <button className="btn-ghost">Sign In</button>
                    <button className="btn-primary">Get Started</button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
