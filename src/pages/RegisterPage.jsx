import React from 'react';
import '../styles/AuthStyles.css';
import { ArrowLeft, Sparkles, BarChart3, Atom } from 'lucide-react';
import { Link } from 'react-router-dom';
import RegistrationForm from '../components/auth/RegistrationForm';

const RegisterPage = () => {
    const [role, setRole] = React.useState('student');
    const [parentId, setParentId] = React.useState(null);

    React.useEffect(() => {
        // Read URL parameters
        const params = new URLSearchParams(window.location.search);
        const urlRole = params.get('role');
        const urlParentId = params.get('parent_id');

        if (urlRole) setRole(urlRole);
        if (urlParentId) setParentId(parseInt(urlParentId, 10));
    }, []);

    return (
        <div className="auth-page">
            {/* Left Section - Decoration */}
            <div className="auth-hero-section">
                <div className="auth-hero-content">
                    <h1 className="auth-hero-title">
                        Join the <br />
                        <span className="highlight-text">Community</span>
                    </h1>
                    <p className="auth-hero-subtitle">
                        Start your personalized learning journey today.
                    </p>
                </div>
                {/* Floating Icons */}
                <BarChart3 size={40} className="auth-float-icon af-1" strokeWidth={1.5} />
                <Atom size={40} className="auth-float-icon af-2" strokeWidth={1.5} />
                <Sparkles size={32} className="auth-float-icon af-3" strokeWidth={1.5} />
            </div>

            {/* Right Section - Form */}
            <div className="auth-form-section">
                <div className="auth-card animate-fade-in">
                    <Link to="/" className="back-link">
                        <ArrowLeft size={18} /> Back to Home
                    </Link>

                    <RegistrationForm role={role} parentId={parentId} onBack={() => { }} />
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
