import React, { useState } from 'react';
import '../styles/AuthStyles.css';
import { ArrowLeft, Sparkles, BarChart3, Atom } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../services/auth';

const LoginPage = () => {
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [resultNeededRole, setResultNeededRole] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!identifier || !password) {
            setError('Please enter both identifier (email/username) and password.');
            return;
        }

        setIsLoading(true);
        setError('');

        try {
            console.log("Attempting login with:", identifier);
            const response = await authService.loginWithEmail(identifier, password);
            console.log('Login Service Response:', response);

            handleLoginSuccess(response);

        } catch (err) {
            console.error('Login Failed Detailed:', err);
            // Handle object errors from API
            const msg = err.detail || err.message || (typeof err === 'string' ? err : 'Login failed. Please check your credentials.');
            setError(msg);
        } finally {
            setIsLoading(false);
        }
    };

    const handleLoginSuccess = (response) => {
        // Redirect based on role
        const userType = response.role || response.user_type || 'student'; // Fallback
        console.log("Detected User Type:", userType);

        if (userType === 'student') {
            const grade = response.grade || response.class_name;
            if (grade) {
                const gradeNum = parseInt(grade.toString().replace(/\D/g, ''), 10);
                if (!isNaN(gradeNum)) {
                    if (gradeNum >= 1 && gradeNum <= 4) {
                        navigate(`/junior/grade/${gradeNum}`);
                        return;
                    } else if (gradeNum >= 5 && gradeNum <= 7) {
                        navigate(`/middle/grade/${gradeNum}`);
                        return;
                    } else if (gradeNum >= 8) {
                        navigate(`/senior/grade/${gradeNum}`);
                        return;
                    }
                }
            }
            // If grade logic fails or no grade present
            console.log("Redirecting to default student dashboard");
            navigate('/student-dashboard');
        } else {
            const dashboardMap = {
                'teacher': '/teacher-dashboard',
                'parent': '/parent-dashboard',
                'guest': '/guest-dashboard',
                'mentor': '/mentor-dashboard',
                'admin': '/admin'
            };
            const targetPath = dashboardMap[userType] || '/';
            console.log("Redirecting to:", targetPath);
            navigate(targetPath);
        }
    };

    const handleGoogleLogin = async () => {
        setIsLoading(true);
        setError('');
        try {
            const response = await authService.loginWithGoogle();
            console.log('Google Login Result:', response);

            if (response.needs_role) {
                console.log("New user detected, asking for role...");
                setResultNeededRole(response);
                setIsLoading(false);
                return;
            }

            handleLoginSuccess(response);
        } catch (err) {
            console.error('Google Login Failed:', err);
            setError('Google login failed. Please try again.');
            setIsLoading(false);
        }
    };

    const handleRoleSelection = async (selectedRole) => {
        if (!resultNeededRole || !resultNeededRole.googleUser) {
            setError("Session invalid. Please try logging in again.");
            setResultNeededRole(null);
            return;
        }

        setIsLoading(true);
        try {
            console.log("Completing registration with role:", selectedRole);
            const response = await authService.loginWithGoogle(selectedRole, resultNeededRole.googleUser);
            handleLoginSuccess(response);
        } catch (err) {
            console.error('Google Registration Failed:', err);
            setError('Failed to create account with selected role.');
        } finally {
            setIsLoading(false);
            setResultNeededRole(null);
        }
    };

    return (
        <div className="auth-page">
            {/* Left Section - Decoration */}
            <div className="auth-hero-section">
                <div className="auth-hero-content">
                    <h1 className="auth-hero-title">
                        Welcome Back to <br />
                        <span className="highlight-text">skill100.ai</span>
                    </h1>
                    <p className="auth-hero-subtitle">
                        Continue your journey to excellence.
                    </p>
                </div>
                {/* Floating Icons */}
                <BarChart3 size={40} className="auth-float-icon af-1" strokeWidth={1.5} />
                <Atom size={40} className="auth-float-icon af-2" strokeWidth={1.5} />
                <Sparkles size={32} className="auth-float-icon af-3" strokeWidth={1.5} />
            </div>

            {/* Right Section - Login Form */}
            <div className="auth-form-section">
                <div className="auth-card animate-fade-in">
                    <Link to="/" className="back-link">
                        <ArrowLeft size={18} /> Back to Home
                    </Link>

                    <h2 className="auth-title">Log in</h2>
                    <p className="auth-subtitle">Enter your details to access your account</p>

                    <button className="auth-btn-google" onClick={handleGoogleLogin} disabled={isLoading}>
                        <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" width={20} />
                        Continue with Google
                    </button>

                    <div className="auth-divider">
                        <span>Or log in with email</span>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="auth-form-group">
                            <label className="auth-label">Email or Username</label>
                            <input
                                type="text"
                                className="auth-input"
                                placeholder="name@example.com or username"
                                value={identifier}
                                onChange={(e) => setIdentifier(e.target.value)}
                                required
                                disabled={isLoading}
                            />
                        </div>

                        <div className="auth-form-group">
                            <label className="auth-label">Password</label>
                            <input
                                type="password"
                                className="auth-input"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                disabled={isLoading}
                            />
                        </div>

                        {error && <p className="error-message" style={{ color: '#ef4444', fontSize: '0.9rem', marginTop: '0.5rem' }}>{error}</p>}

                        <button type="submit" className="auth-btn-primary" disabled={isLoading}>
                            {isLoading ? 'Logging in...' : 'Log in'}
                        </button>
                    </form>


                    <p className="auth-footer">
                        Don't have an account? <Link to="/register" className="auth-link">Sign up</Link>
                    </p>
                </div>
            </div>

            {/* Role Selection Modal */}
            {resultNeededRole && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in">
                    <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl transform transition-all scale-100 border border-gray-100">
                        <div className="text-center mb-8">
                            <div className="mx-auto w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                                <Sparkles className="text-blue-600" size={32} />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">Choose your Role</h3>
                            <p className="text-gray-500">How will you be using skill100.ai?</p>
                        </div>

                        <div className="grid grid-cols-1 gap-3 mb-6">
                            {[
                                { id: 'student', label: 'Student', desc: 'I want to learn and practice', icon: '🎓' },
                                { id: 'parent', label: 'Parent', desc: 'I want to track my child\'s progress', icon: '👨‍👩‍👧‍👦' },
                                { id: 'mentor', label: 'Mentor', desc: 'I want to guide students', icon: '👨‍🏫' },
                                { id: 'guest', label: 'Guest', desc: 'I\'m just exploring', icon: '👀' }
                            ].map((role) => (
                                <button
                                    key={role.id}
                                    onClick={() => handleRoleSelection(role.id)}
                                    className="flex items-center p-4 rounded-xl border border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 group text-left w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    disabled={isLoading}
                                >
                                    <span className="text-2xl mr-4 group-hover:scale-110 transition-transform">{role.icon}</span>
                                    <div>
                                        <div className="font-semibold text-gray-900 group-hover:text-blue-700">{role.label}</div>
                                        <div className="text-sm text-gray-500">{role.desc}</div>
                                    </div>
                                    <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-blue-600">
                                        →
                                    </div>
                                </button>
                            ))}
                        </div>

                        <div className="text-center">
                            <button
                                onClick={() => setResultNeededRole(null)}
                                className="text-sm text-gray-500 hover:text-gray-700 underline"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
export default LoginPage;
