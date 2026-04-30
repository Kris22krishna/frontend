import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../services/auth';
import { trackSignUp, setUserId } from '@/lib/gtag';
import '../../styles/AuthStyles.css'; // Use shared styles


const RegistrationForm = ({ role = 'student', parentId = null, onBack, onSuccess }) => {
    const [selectedRole, setSelectedRole] = useState(role.toLowerCase() === 'teacher' ? 'mentor' : role.toLowerCase());
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [countryCode, setCountryCode] = useState('+91');
    const [grade, setGrade] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [showConfirm, setShowConfirm] = useState(false);
    const [isRateLimited, setIsRateLimited] = useState(false);
    const [predictedUsername, setPredictedUsername] = useState('');
    const [customUsername, setCustomUsername] = useState('');
    const [isUsernameAvailable, setIsUsernameAvailable] = useState(true);
    const [hasEmail, setHasEmail] = useState(null);
    const navigate = useNavigate();

    const roles = [
        { display: 'Student', value: 'student' },
        { display: 'Teacher', value: 'mentor' }
    ];
    const grades = [
        'Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 'Grade 6',
        'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'
    ];
    const normalizeUsername = (value) => {
        const trimmed = value.trim();
        const prefixMatch = trimmed.match(/^([a-zA-Z]\d+-)(.*)$/);
        if (!prefixMatch) return trimmed;
        return `${prefixMatch[1].toLowerCase()}${prefixMatch[2]}`;
    };

    const handleUsernameChange = (e) => {
        const val = normalizeUsername(e.target.value);
        setCustomUsername(val);
        if (window.usernameTimeout) clearTimeout(window.usernameTimeout);
        window.usernameTimeout = setTimeout(async () => {
            if (val.length >= 3) {
                try {
                    const res = await authService.checkUsername(val);
                    setIsUsernameAvailable(res.available);
                } catch {
                    setIsUsernameAvailable(false);
                }
            } else {
                setIsUsernameAvailable(true);
            }
        }, 500);
    };



    const handleValidate = async (e) => {
        e.preventDefault();
        if (isRateLimited) return;
        setIsLoading(true);

        if (!name.trim()) {
            setError('Full name is required.');
            setIsLoading(false);
            return;
        }

        if (!password) {
            setError('Password is required.');
            setIsLoading(false);
            return;
        }

        if (password.length < 8) {
            setError('Password must be at least 8 characters.');
            setIsLoading(false);
            return;
        }

        if (selectedRole === 'student') {
            if (!grade) {
                setError('Please select your grade.');
                setIsLoading(false);
                return;
            }
            if (hasEmail === null) {
                setError('Please select if you have an email address.');
                setIsLoading(false);
                return;
            }
            if (hasEmail && !email) {
                setError('Please enter your email address.');
                setIsLoading(false);
                return;
            }
        } else {
            if (!phoneNumber) {
                setError('Phone number is required.');
                setIsLoading(false);
                return;
            }
            if (phoneNumber.length !== 10) {
                setError('Please enter a valid 10-digit phone number.');
                setIsLoading(false);
                return;
            }
            if (!email) {
                setError('Email is required.');
                setIsLoading(false);
                return;
            }
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                setError('Please enter a valid email address.');
                setIsLoading(false);
                return;
            }
        }

        if ((selectedRole !== 'student' || hasEmail) && email) {
            try {
                const result = await authService.checkEmail(email);
                if (result && !result.available) {
                    setError('This email is already registered. Please log in.');
                    setIsLoading(false);
                    return;
                }
            } catch (err) {
                console.error("Email check error:", err);
            }
        }

        try {
            const uname = await authService.predictUsername(name, selectedRole);
            setPredictedUsername(uname ? normalizeUsername(uname) : 'Error');
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
            const username = normalizeUsername(customUsername || predictedUsername);
            const registrationData = {
                username,
                email,
                password,
                role: selectedRole,
                name,
                phoneNumber: selectedRole !== 'student' ? `${countryCode}${phoneNumber}` : phoneNumber,
                grade: selectedRole === 'student' ? grade : undefined
            };

            // Add parent_user_id if creating student from parent dashboard
            if (selectedRole === 'student' && parentId) {
                registrationData.parent_user_id = parentId;
            }

            const response = await authService.registerWithEmail(registrationData);
            console.log('Registration Success:', response);

            // Track signup event
            trackSignUp('email');
            if (response.id) {
                setUserId(response.id);
            }

            // Auto-login using token from registration response
            if (!parentId) {
                // Registration successful -> Cookie set -> wait for auth-change or force check
                // dispatchEvent logic is handled in api.js register
                // But if we need to ensure login if register didn't auto-login (depends on backend implementation)
                // Backend register DOES login (sets cookie).
                // So we just need to wait a moment or just redirect.
                // The auth-change event should update state.
            }

            // Redirect to specific dashboard based on role
            const dashboardMap = {
                'student': '/student-dashboard',
                'mentor': '/mentor-dashboard',
                'parent': '/parent-dashboard',
                'guest': '/guest-dashboard'
            };

            if (onSuccess) {
                onSuccess(response);
            } else {
                if (parentId) {
                    navigate('/parent-dashboard');
                } else {
                    if (selectedRole === 'student' && grade) {
                        // const gradeNum = parseInt(grade.replace(/\D/g, ''), 10);
                        // if (!isNaN(gradeNum)) {
                        //     if (gradeNum >= 1 && gradeNum <= 4) {
                        //         navigate(`/junior/grade/${gradeNum}`);
                        //         return;
                        //     } else if (gradeNum >= 5 && gradeNum <= 7) {
                        //         navigate(`/middle/grade/${gradeNum}`);
                        //         return;
                        //     } else if (gradeNum >= 8) {
                        //         navigate(`/senior/grade/${gradeNum}`);
                        //         return;
                        //     }
                        // }
                        navigate('/student-dashboard');
                    } else {
                        const targetPath = dashboardMap[selectedRole] || '/';
                        navigate(targetPath);
                    }
                }
            }



        } catch (err) {
            console.error("Registration Error:", err);
            const message = err.message || (typeof err === 'string' ? err : 'Registration failed.');
            const lowerMessage = message.toLowerCase();
            const isUsernameError = lowerMessage.includes('username is')
                || lowerMessage.includes('username already')
                || lowerMessage.includes('username exists')
                || lowerMessage.includes('username taken');
            setError(
                isUsernameError
                    ? `${message}. The s100- prefix stays lowercase, but uppercase letters after it are allowed.`
                    : message
            );
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
                    <p style={{ marginBottom: '10px' }}><strong>Role:</strong> {roles.find(r => r.value === selectedRole)?.display || selectedRole}</p>

                    {email && <p style={{ marginBottom: '10px' }}><strong>Email:</strong> {email}</p>}

                    {selectedRole !== 'student' && <p style={{ marginBottom: '10px' }}><strong>Phone:</strong> {phoneNumber || 'N/A'}</p>}

                    {selectedRole === 'student' && <p style={{ marginBottom: '10px' }}><strong>Grade:</strong> {grade}</p>}

                    <div style={{ marginTop: '15px', padding: '10px', background: '#e0f2fe', borderRadius: '6px', border: '1px solid #bae6fd' }}>
                        <div style={{ color: '#0369a1', fontSize: '0.9rem' }}>
                            <strong>Your Personal Login ID:</strong><br />
                            <input 
                                type="text" 
                                value={customUsername !== '' ? customUsername : predictedUsername} 
                                onChange={handleUsernameChange}
                                className="auth-input"
                                style={{
                                    marginTop: '5px',
                                    fontWeight: 'bold', 
                                    fontFamily: 'monospace', 
                                    borderColor: !isUsernameAvailable ? 'red' : undefined,
                                    width: '100%'
                                }}
                            />
                            {!isUsernameAvailable && <span style={{color: 'red', display: 'block', marginTop: '4px'}}>Username is taken.</span>}
                            <span style={{ fontSize: '0.8rem', opacity: 0.8, display: 'block', marginTop: '4px' }}>(The s100- prefix stays lowercase; uppercase letters are allowed after it)</span>
                            {customUsername !== '' && customUsername !== predictedUsername && (
                                <div style={{ marginTop: '8px', fontSize: '0.85rem' }}>
                                    <span style={{ color: '#475569' }}>Generated suggestion: </span>
                                    <button 
                                        type="button" 
                                        onClick={() => {
                                            setCustomUsername(predictedUsername);
                                            setIsUsernameAvailable(true);
                                        }} 
                                        style={{ 
                                            background: '#bae6fd', 
                                            border: 'none', 
                                            color: '#0369a1', 
                                            cursor: 'pointer', 
                                            padding: '2px 8px', 
                                            borderRadius: '4px',
                                            fontWeight: '500'
                                        }}
                                    >
                                        {predictedUsername}
                                    </button>
                                </div>
                            )}
                        </div>
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
                        disabled={isLoading || !isUsernameAvailable}
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
                        key={r.value}
                        type="button"
                        className={`role-btn ${selectedRole === r.value ? 'active' : ''}`}
                        onClick={() => setSelectedRole(r.value)}
                    >
                        {r.display}
                    </button>
                ))}
            </div>

            <form onSubmit={handleValidate}>
                <div className="auth-form-group">
                    <label className="auth-label">Full Name *</label>
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

                {/* Phone Number - Not for Student */}
                {selectedRole !== 'student' && (
                    <div className="auth-form-group">
                        <label className="auth-label">Phone Number *</label>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <select 
                                value={countryCode} 
                                onChange={(e) => setCountryCode(e.target.value)}
                                className="auth-input"
                                style={{ width: '125px', padding: '0.5rem', cursor: 'pointer' }}
                            >
                                <option value="+91">+91 (IN)</option>
                                <option value="+1">+1 (US/CA)</option>
                                <option value="+44">+44 (UK)</option>
                                <option value="+61">+61 (AU)</option>
                                <option value="+81">+81 (JP)</option>
                                <option value="+49">+49 (DE)</option>
                                <option value="+33">+33 (FR)</option>
                                <option value="+39">+39 (IT)</option>
                                <option value="+86">+86 (CN)</option>
                                <option value="+55">+55 (BR)</option>
                                <option value="+52">+52 (MX)</option>
                                <option value="+34">+34 (ES)</option>
                                <option value="+27">+27 (ZA)</option>
                                <option value="+971">+971 (AE)</option>
                                <option value="+65">+65 (SG)</option>
                                <option value="+64">+64 (NZ)</option>
                            </select>
                            <input
                                type="tel"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                                className="auth-input"
                                placeholder="00000 00000"
                                required
                                disabled={isLoading}
                                style={{ flex: 1 }}
                            />
                        </div>
                    </div>
                )}

                {/* Email - Toggle for Student */}
                <div className="auth-form-group">
                    {selectedRole === 'student' ? (
                        <>
                            <label className="auth-label" style={{ marginBottom: '10px', display: 'block' }}>
                                Do you have an email address?
                            </label>
                            <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
                                <button
                                    type="button"
                                    onClick={() => setHasEmail(true)}
                                    className={hasEmail === true ? "auth-btn-primary" : "auth-btn-secondary"}
                                    style={{
                                        flex: 1,
                                        padding: '10px',
                                        margin: 0,
                                        backgroundColor: hasEmail === true ? undefined : '#f8fafc',
                                        color: hasEmail === true ? undefined : '#334155',
                                        border: hasEmail === true ? undefined : '1px solid #e2e8f0',
                                        cursor: 'pointer'
                                    }}
                                >
                                    Yes
                                </button>
                                <button
                                    type="button"
                                    onClick={() => { setHasEmail(false); setEmail(''); }}
                                    className={hasEmail === false ? "auth-btn-primary" : "auth-btn-secondary"}
                                    style={{
                                        flex: 1,
                                        padding: '10px',
                                        margin: 0,
                                        backgroundColor: hasEmail === false ? undefined : '#f8fafc',
                                        color: hasEmail === false ? undefined : '#334155',
                                        border: hasEmail === false ? undefined : '1px solid #e2e8f0',
                                        cursor: 'pointer'
                                    }}
                                >
                                    No
                                </button>
                            </div>

                            {hasEmail === true && (
                                <div style={{ animation: 'fadeIn 0.3s' }}>
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
                            )}

                            {hasEmail === false && (
                                <div style={{ padding: '12px', background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '6px', color: '#166534', fontSize: '0.95rem', animation: 'fadeIn 0.3s' }}>
                                    No worries! We will create a username for you :))
                                </div>
                            )}
                        </>
                    ) : (
                        <>
                            <label className="auth-label">Email *</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="auth-input"
                                placeholder="name@example.com"
                                required
                                disabled={isLoading}
                            />
                        </>
                    )}
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

