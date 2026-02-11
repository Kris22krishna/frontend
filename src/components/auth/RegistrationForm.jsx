import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../services/auth';
import '../../styles/AuthStyles.css'; // Use shared styles


const RegistrationForm = ({ role = 'student', onBack }) => {
    const [selectedRole, setSelectedRole] = useState(role.toLowerCase());
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [grade, setGrade] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [showConfirm, setShowConfirm] = useState(false);
    const [isRateLimited, setIsRateLimited] = useState(false);
    const [predictedUsername, setPredictedUsername] = useState('');
    const navigate = useNavigate();

    const roles = ['Student', 'Parent', 'Mentor', 'Guest'];
    const grades = [
        'Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 'Grade 6',
        'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'
    ];



    const handleValidate = async (e) => {
        e.preventDefault();
        if (isRateLimited) return;
        setIsLoading(true);

        if (!email || !password || !name) {
            setError('Please fill in all required fields.');
            setIsLoading(false);
            return;
        }
        if (password.length < 8) {
            setError('Password must be at least 8 characters.');
            setIsLoading(false);
            return;
        }
        if (selectedRole === 'student' && !grade) {
            setError('Please select your grade.');
            setIsLoading(false);
            return;
        }
        if (selectedRole !== 'student' && !phoneNumber) {
            setError('Phone number is required for this role.');
            setIsLoading(false);
            return;
        }

        try {
            const result = await authService.checkEmail(email);
            if (result && !result.available) {
                setError('This email is already registered. Please log in.');
                setIsLoading(false);
                return;
            }

            // Predict Username
            const uname = await authService.predictUsername(name, selectedRole);
            setPredictedUsername(uname || 'Error');

        } catch (err) {
            console.error("Validation error:", err);
        }

        setError('');
        setIsLoading(false);
        setShowConfirm(true);
    };

    const handleFinalSubmit = async () => {
        if (isRateLimited) return;
        setIsLoading(true);
        setError('');

        try {
            const response = await authService.registerWithEmail({
                email,
                password,
                role: selectedRole,
                name, // Changed from username
                phoneNumber,
                grade: selectedRole === 'student' ? grade : undefined
            });
            console.log('Registration Success:', response);

            // Auto-login after registration
            await authService.loginWithEmail(email, password);

            // Redirect to specific dashboard based on role
            const dashboardMap = {
                'student': '/student-dashboard',
                'mentor': '/mentor-dashboard',
                'parent': '/parent-dashboard',
                'guest': '/guest-dashboard'
            };

            const targetPath = dashboardMap[selectedRole] || '/';
            navigate(targetPath);

        } catch (err) {
            console.error("Registration Error:", err);
            setError(err.message || (typeof err === 'string' ? err : 'Registration failed.'));
            setShowConfirm(false); // Go back to form on error
        } finally {
            setIsLoading(false);
            setIsRateLimited(true);
            setTimeout(() => setIsRateLimited(false), 2000);
        }
    };

    if (showConfirm) {
        return (
            <div className="registration-form">
                <h2 className="auth-title">Quick Check</h2>
                <div className="confirmation-summary" style={{ textAlign: 'left', margin: '20px 0', padding: '15px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                    <p style={{ marginBottom: '10px' }}><strong>Full Name:</strong> {name}</p>
                    <p style={{ marginBottom: '10px' }}><strong>Role:</strong> {roles.find(r => r.toLowerCase() === selectedRole)}</p>
                    <p style={{ marginBottom: '10px' }}><strong>Email:</strong> {email}</p>
                    <p style={{ marginBottom: '10px' }}><strong>Phone:</strong> {phoneNumber || 'N/A'}</p>
                    {selectedRole === 'student' && <p style={{ marginBottom: '10px' }}><strong>Grade:</strong> {grade}</p>}

                    <div style={{ marginTop: '15px', padding: '10px', background: '#e0f2fe', borderRadius: '6px', border: '1px solid #bae6fd' }}>
                        <p style={{ color: '#0369a1', fontSize: '0.9rem' }}>
                            <strong>Your Personal Login ID:</strong><br />
                            <span style={{ fontSize: '1.2rem', fontWeight: 'bold', fontFamily: 'monospace' }}>{predictedUsername}</span>
                            <br />
                            <span style={{ fontSize: '0.8rem', opacity: 0.8 }}>(This unique ID will be assigned to you)</span>
                        </p>
                    </div>
                </div>

                <div className="auth-buttons" style={{ display: 'flex', gap: '10px' }}>
                    <button
                        type="button"
                        className="auth-btn-primary"
                        onClick={() => setShowConfirm(false)}
                        disabled={isLoading}
                        style={{ flex: 1, margin: 0 }}
                    >
                        Edit Details
                    </button>
                    <button
                        type="button"
                        className="auth-btn-primary"
                        onClick={handleFinalSubmit}
                        disabled={isLoading}
                        style={{ flex: 1, margin: 0 }}
                    >
                        {isLoading ? 'Creating...' : 'Confirm & Register'}
                    </button>
                </div>
                {error && <p className="error-message" style={{ color: '#ef4444', fontSize: '0.9rem', marginTop: '1rem' }}>{error}</p>}
            </div>
        );
    }

    return (
        <div className="registration-form">
            <h2 className="auth-title">Create Account</h2>

            {/* Role Selection Row */}
            <div className="role-selection-group">
                {roles.map((r) => (
                    <button
                        key={r}
                        type="button"
                        className={`role-btn ${selectedRole === r.toLowerCase() ? 'active' : ''}`}
                        onClick={() => setSelectedRole(r.toLowerCase())}
                    >
                        {r}
                    </button>
                ))}
            </div>

            <form onSubmit={handleValidate}>
                <div className="auth-form-group">
                    <label className="auth-label">Full Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="auth-input"
                        placeholder="John Doe"
                        required
                        disabled={isLoading}
                    />
                </div>

                {/* Grade Selection - Only for Students */}
                {selectedRole === 'student' && (
                    <div className="auth-form-group">
                        <label className="auth-label">Grade *</label>
                        <select
                            value={grade}
                            onChange={(e) => setGrade(e.target.value)}
                            className="auth-input"
                            required
                            disabled={isLoading}
                            style={{ cursor: 'pointer' }}
                        >
                            <option value="">Select your grade</option>
                            {grades.map((g) => (
                                <option key={g} value={g}>{g}</option>
                            ))}
                        </select>
                    </div>
                )}

                <div className="auth-form-group">
                    <label className="auth-label">Phone Number {selectedRole !== 'student' && '*'}</label>
                    <input
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="auth-input"
                        placeholder="+1 (555) 000-0000"
                        required={selectedRole !== 'student'}
                        disabled={isLoading}
                    />
                </div>

                <div className="auth-form-group">
                    <label className="auth-label">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="auth-input"
                        placeholder="name@example.com"
                        required
                        disabled={isLoading}
                    />
                </div>

                <div className="auth-form-group">
                    <label className="auth-label">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="auth-input"
                        placeholder="At least 8 characters"
                        required
                        disabled={isLoading}
                    />
                </div>

                {error && <p className="error-message" style={{ color: '#ef4444', fontSize: '0.9rem', marginTop: '0.5rem' }}>{error}</p>}

                <button type="submit" className="auth-btn-primary" disabled={isLoading}>
                    Next
                </button>
            </form>

            <p className="auth-footer">
                Already have an account? <a href="/login" className="auth-link">Log in</a>
            </p>
        </div>
    );
};

export default RegistrationForm;

