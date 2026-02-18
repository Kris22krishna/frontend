import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import SEO from '../components/common/SEO';
import '../styles/DynamicQuestionsDashboard.css';

const UploaderLogin = () => {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({ username: '', accessCode: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            console.log('--- Starting Uploader Login ---');
            const data = await api.uploaderLogin(credentials.username, credentials.accessCode);
            console.log('--- Login API Success ---', data);

            // Verify Storage
            const storedToken = sessionStorage.getItem('access_token');
            const storedType = sessionStorage.getItem('userType');
            console.log('--- Checking Storage immediately after login ---');
            console.log('Token Exists:', !!storedToken);
            console.log('User Type:', storedType);

            if (!storedToken) {
                throw new Error("Login succeeded but token not stored!");
            }

            // Navigate
            console.log('--- Navigating to Dashboard ---');
            navigate('/uploader-dashboard');
        } catch (err) {
            console.error('--- Login Failed ---', err);
            setError(err.message || 'Login failed.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <SEO title="Uploader Login - skill100.ai" />
            <div className="login-card">
                <div className="login-header">
                    <h1 className="brand-title">skill100.ai</h1>
                    <p className="login-subtitle">Uploader Portal Access</p>
                </div>

                {error && (
                    <div style={{
                        background: '#fee2e2',
                        color: '#ef4444',
                        padding: '12px',
                        borderRadius: '8px',
                        marginBottom: '20px',
                        fontSize: '0.9rem',
                        textAlign: 'center'
                    }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="form-grid" style={{ gap: '20px' }}>
                    <div className="form-group">
                        <label>Username</label>
                        <input
                            type="text"
                            value={credentials.username}
                            onChange={e => setCredentials({ ...credentials, username: e.target.value })}
                            required
                            placeholder="Enter your username"
                        />
                    </div>
                    <div className="form-group">
                        <label>Access Code</label>
                        <input
                            type="password"
                            value={credentials.accessCode}
                            onChange={e => setCredentials({ ...credentials, accessCode: e.target.value })}
                            required
                            placeholder="••••••••"
                        />
                    </div>
                    <div style={{ color: '#666', fontSize: '10px', marginTop: '10px' }}>
                        Debug: {credentials.username ? `User: ${credentials.username}` : ''}
                    </div>
                    <button type="submit" disabled={loading} className="save-btn" style={{ width: '100%', marginTop: '10px' }}>
                        {loading ? 'Verifying...' : 'Login'}
                    </button>
                    <button type="button" onClick={() => {
                        alert(
                            "Storage Check:\n" +
                            "Token: " + (sessionStorage.getItem('access_token') ? 'Yes' : 'No') + "\n" +
                            "UserType: " + sessionStorage.getItem('userType')
                        );
                    }} style={{ background: 'transparent', border: 'none', color: '#999', fontSize: '10px', marginTop: '5px', cursor: 'pointer' }}>
                        Check Storage
                    </button>
                </form>
            </div>
        </div>
    );
};
export default UploaderLogin;
