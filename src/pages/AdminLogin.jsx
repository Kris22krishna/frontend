import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SEO from '../components/common/SEO';
import '../styles/AdminLogin.css'; // We'll create this
import { api } from '../services/api';

const AdminLogin = () => {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.login(credentials.username, credentials.password);
            // alert('Login Successful'); 
            navigate('/admin'); // Redirect to dashboard
        } catch (error) {
            console.error(error);
            alert(error.message || 'Invalid credentials');
        }
    };

    return (
        <div className="admin-login-container">
            <SEO title="Admin Login" description="Restricted access for administrators" />
            <div className="login-card">
                <h1>Admin Portal</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={credentials.username}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={credentials.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" className="login-btn">Login</button>
                    <a href="/" className="back-link">Back to Home</a>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
