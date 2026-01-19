import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SEO from '../components/common/SEO';
import '../styles/AdminLogin.css'; // We'll create this

const AdminLogin = () => {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Placeholder authentication logic
        if (credentials.username === 'admin' && credentials.password === 'admin') {
            alert('Login Successful');
            navigate('/admin/dashboard'); // Or wherever
        } else {
            alert('Invalid credentials');
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
