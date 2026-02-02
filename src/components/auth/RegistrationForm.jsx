import React, { useState } from 'react';
import { ArrowLeft, CheckSquare, Square } from 'lucide-react';
import { authService } from '../../services/auth';
import './RegistrationForm.css';

const RegistrationForm = ({ role, onBack }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const [agreed, setAgreed] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    // Rate limiting / Debounce simulation (simple manual flag, for more robust use a library like lodash)
    const [isRateLimited, setIsRateLimited] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isRateLimited) return;

        // Basic Validation
        if (!email || !password) {
            setError('All fields are required.');
            return;
        }
        // if (!agreed) {
        //     setError('You must agree to the Terms of Service.');
        //     return;
        // }
        if (password.length < 8) {
            setError('Password must be at least 8 characters.');
            return;
        }

        setIsLoading(true);
        setError('');

        // Scalable Handler
        try {
            const response = await authService.registerWithEmail({ email, password, role });
            console.log('Registration Success:', response);
            alert(`Welcome ${role}! Registration successful.`);
            // Navigate to next steps...
        } catch (err) {
            setError(err.message || 'Registration failed.');
        } finally {
            setIsLoading(false);
            // Simple rate limit reset
            setIsRateLimited(true);
            setTimeout(() => setIsRateLimited(false), 2000);
        }
    };

    const handleGoogleLogin = () => {
        authService.loginWithGoogle();
    };

    return (
        <div className="registration-form animate-fade-in">
            <button onClick={onBack} className="back-button">
                <ArrowLeft size={16} /> Choose a different role
            </button>

            <h3 className="form-title">Sign up as a {role} today!</h3>

            {/* <div className="agreement-checkbox">
                <button
                    type="button"
                    className="checkbox-custom"
                    onClick={() => setAgreed(!agreed)}
                >
                    {agreed ? <CheckSquare size={20} color="var(--primary)" /> : <Square size={20} color="#cbd5e1" />}
                </button>
                <span className="agreement-text">
                    By checking this box, I agree to the <a href="#" className="link-primary">Terms of Service</a> and <a href="#" className="link-primary">Privacy Policy</a>.
                </span>
            </div> */}

            <button className="btn-google" onClick={handleGoogleLogin}>
                <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" width={20} />
                Continue with Google
            </button>

            <div className="divider">
                <span>Or sign up with email</span>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>
                        Email
                        <span className="required-label">required</span>
                    </label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="form-input"
                        disabled={isLoading}
                    />
                </div>

                <div className="form-group">
                    <label>
                        Password
                        <span className="required-label">required</span>
                    </label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="At least 8 characters"
                        className="form-input"
                        disabled={isLoading}
                    />
                </div>

                {error && <p className="error-message">{error}</p>}

                <button type="submit" className="btn-submit" disabled={isLoading}>
                    {isLoading ? 'Signing up...' : 'Sign up'}
                </button>
            </form>

            <p className="role-footer">
                Already have an account? <a href="/login" className="link-primary">Log in</a>
            </p>
        </div>
    );
};

export default RegistrationForm;
