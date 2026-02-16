import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, LogIn, Sparkles } from 'lucide-react';
import { authService } from '../../services/auth';
import RegistrationForm from './RegistrationForm';
import '../../styles/AuthStyles.css';

const LoginPromptModal = ({ isOpen, onClose, onLoginSuccess }) => {
    const navigate = useNavigate();
    const [mode, setMode] = useState('PROMPT'); // PROMPT, LOGIN, SIGNUP
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (isOpen) {
            setMode('PROMPT');
            setError('');
            setIdentifier('');
            setPassword('');
        }
    }, [isOpen]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        try {
            const response = await authService.loginWithEmail(identifier, password);
            // api.js usually sets token, but let's ensure auth-change is dispatched
            window.dispatchEvent(new Event('auth-change'));

            if (onLoginSuccess) {
                onLoginSuccess(response);
            }
            onClose();
        } catch (err) {
            console.error('Login Error:', err);
            setError(err.message || 'Login failed. Please check your credentials.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        setIsLoading(true);
        setError('');
        try {
            const response = await authService.loginWithGoogle();
            window.dispatchEvent(new Event('auth-change'));

            if (onLoginSuccess) {
                onLoginSuccess(response);
            }
            onClose();
        } catch (err) {
            console.error('Google Login Error:', err);
            setError('Google login failed.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleRegistrationSuccess = (response) => {
        // RegistrationForm sets token and dispatches event.
        if (onLoginSuccess) onLoginSuccess(response);
        onClose();
    };

    if (!isOpen) return null;

    const modalWidth = mode === 'SIGNUP' ? '600px' : '400px';

    return (
        <div className="modal-overlay" style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
            backdropFilter: 'blur(3px)'
        }}>
            <div className="modal-content" style={{
                backgroundColor: 'white',
                padding: '2rem',
                borderRadius: '16px',
                width: '90%',
                maxWidth: modalWidth,
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                position: 'relative',
                textAlign: 'center',
                maxHeight: '90vh',
                overflowY: 'auto',
                transition: 'max-width 0.3s ease'
            }}>
                <button
                    onClick={onClose}
                    style={{
                        position: 'absolute',
                        top: '1rem',
                        right: '1rem',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        color: '#64748b',
                        zIndex: 10
                    }}
                >
                    <X size={24} />
                </button>

                {mode === 'PROMPT' && (
                    <>
                        <div style={{
                            backgroundColor: '#eff6ff',
                            width: '64px',
                            height: '64px',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 1.5rem',
                            color: '#3b82f6'
                        }}>
                            <LogIn size={32} />
                        </div>

                        <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1e293b', marginBottom: '0.5rem' }}>
                            Log in to Practice
                        </h3>

                        <p style={{ color: '#64748b', marginBottom: '2rem', lineHeight: '1.5' }}>
                            To access practice questions and track your progress, you need to be logged in.
                        </p>

                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <button
                                onClick={onClose}
                                style={{
                                    flex: 1,
                                    padding: '0.75rem',
                                    borderRadius: '8px',
                                    border: '1px solid #e2e8f0',
                                    backgroundColor: 'white',
                                    color: '#64748b',
                                    fontWeight: '600',
                                    cursor: 'pointer'
                                }}
                            >
                                Maybe Later
                            </button>
                            <button
                                onClick={() => setMode('LOGIN')}
                                style={{
                                    flex: 1,
                                    padding: '0.75rem',
                                    borderRadius: '8px',
                                    border: 'none',
                                    backgroundColor: '#3b82f6',
                                    color: 'white',
                                    fontWeight: '600',
                                    cursor: 'pointer',
                                    boxShadow: '0 4px 6px -1px rgba(59, 130, 246, 0.5)'
                                }}
                            >
                                Log In Now
                            </button>
                        </div>
                    </>
                )}

                {mode === 'LOGIN' && (
                    <div className="auth-card-inner" style={{ textAlign: 'left' }}>
                        <h2 className="auth-title" style={{ textAlign: 'center', marginBottom: '0.5rem' }}>Log in</h2>
                        <p className="auth-subtitle" style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Enter your details to access your account</p>

                        <button className="auth-btn-google" onClick={handleGoogleLogin} disabled={isLoading} style={{ width: '100%', marginBottom: '1.5rem' }}>
                            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" width={20} style={{ marginRight: '10px' }} />
                            Continue with Google
                        </button>

                        <div className="auth-divider" style={{ marginBottom: '1.5rem' }}>
                            <span>Or log in with email</span>
                        </div>

                        <form onSubmit={handleLogin}>
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
                                    autoFocus
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

                            {error && <p className="error-message" style={{ color: '#ef4444', fontSize: '0.9rem', marginBottom: '1rem' }}>{error}</p>}

                            <button type="submit" className="auth-btn-primary" disabled={isLoading}>
                                {isLoading ? 'Logging in...' : 'Log in'}
                            </button>
                        </form>

                        <p className="auth-footer" style={{ marginTop: '1.5rem', textAlign: 'center' }}>
                            Don't have an account? <button onClick={() => setMode('SIGNUP')} className="auth-link" style={{ background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>Sign up</button>
                        </p>
                    </div>
                )}

                {mode === 'SIGNUP' && (
                    <div className="signup-wrapper">
                        {/* Pass onBack to return to LOGIN mode */}
                        <RegistrationForm
                            role="student"
                            onBack={() => setMode('LOGIN')}
                            onSuccess={handleRegistrationSuccess}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default LoginPromptModal;
