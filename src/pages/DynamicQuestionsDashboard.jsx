import { useState, useEffect } from 'react';
import QuestionTemplatesList from '../components/questionUpload/QuestionTemplatesList';
import QuestionTemplateForm from '../components/questionUpload/QuestionTemplateForm';
import TemplatePreview from '../components/questionUpload/TemplatePreview';
import GeneratedQuestionsList from '../components/questionUpload/GeneratedQuestionsList';
import TopicArrangement from '../components/questionUpload/TopicArrangement';
import SEO from '../components/common/SEO';
import { api } from '../services/api';
import '../styles/DynamicQuestionsDashboard.css';

const DynamicQuestionsDashboard = () => {
    // Auth State
    const [isAuthenticated, setIsAuthenticated] = useState(api.isAuthenticated());
    const [authLoading, setAuthLoading] = useState(false);
    const [credentials, setCredentials] = useState({
        username: 'admin@learners.com', // Pre-filled based on user request
        password: 'admin123'
    });

    // Dashboard State
    const [activeTab, setActiveTab] = useState('templates');
    const [viewMode, setViewMode] = useState('list'); // 'list', 'edit', 'create'
    const [selectedTemplate, setSelectedTemplate] = useState(null);
    const [previewTemplate, setPreviewTemplate] = useState(null);
    const [selectedJobId, setSelectedJobId] = useState(null);

    // --- Auth Handlers ---

    const handleLogin = async (e) => {
        e.preventDefault();
        setAuthLoading(true);
        try {
            await api.login(credentials.username, credentials.password);
            setIsAuthenticated(true);
        } catch (err) {
            alert('Login failed: ' + err.message);
        } finally {
            setAuthLoading(false);
        }
    };

    const handleLogout = () => {
        api.logout();
        setIsAuthenticated(false);
    };

    // --- Template Handlers ---

    const handleEditTemplate = (template) => {
        setSelectedTemplate(template);
        setViewMode(template ? 'edit' : 'create');
    };

    const handleSaveTemplate = () => {
        setViewMode('list');
        setSelectedTemplate(null);
    };

    const handleCancelEdit = () => {
        setViewMode('list');
        setSelectedTemplate(null);
    };

    const handlePreviewTemplate = (template) => {
        setPreviewTemplate(template);
    };

    const handleClosePreview = () => {
        setPreviewTemplate(null);
    };

    // --- Generation Handlers ---

    const handleJobCreated = (job) => {
        // Optional: switch tab or notify
    };

    const handleQuestionsGenerated = (jobId) => {
        setSelectedJobId(jobId);
        setActiveTab('questions');
    };

    if (!isAuthenticated) {
        return (
            <div className="dashboard-container center-content">
                <SEO title="Login - Dynamic Questions" />
                <div className="login-box" style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
                    <h2>Admin Login</h2>
                    <p>Please log in to access the dashboard.</p>
                    <form onSubmit={handleLogin}>
                        <div className="form-group">
                            <label>Email</label>
                            <input
                                type="email"
                                value={credentials.username}
                                onChange={e => setCredentials({ ...credentials, username: e.target.value })}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input
                                type="password"
                                value={credentials.password}
                                onChange={e => setCredentials({ ...credentials, password: e.target.value })}
                                required
                            />
                        </div>
                        <button type="submit" disabled={authLoading} className="save-btn" style={{ width: '100%' }}>
                            {authLoading ? 'Logging in...' : 'Login'}
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="dashboard-container">
            <SEO title="Dynamic Questions Dashboard" description="Manage templates and generate questions" />

            <div className="list-header">
                <h1>Dynamic Questions Dashboard</h1>
                <button onClick={handleLogout} className="cancel-btn">Logout</button>
            </div>

            <div className="dashboard-nav">
                <button
                    className={`nav-tab ${activeTab === 'templates' ? 'active' : ''}`}
                    onClick={() => setActiveTab('templates')}
                >
                    Templates
                </button>
                <button
                    className={`nav-tab ${activeTab === 'arrange' ? 'active' : ''}`}
                    onClick={() => setActiveTab('arrange')}
                >
                    Arrange
                </button>
                <button
                    className={`nav-tab ${activeTab === 'questions' ? 'active' : ''}`}
                    onClick={() => setActiveTab('questions')}
                >
                    Questions
                </button>
            </div>

            <div className="dashboard-content">
                {activeTab === 'templates' && (
                    <>
                        {viewMode === 'list' && (
                            <QuestionTemplatesList
                                onEdit={handleEditTemplate}
                                onPreview={handlePreviewTemplate}
                            />
                        )}
                        {(viewMode === 'create' || viewMode === 'edit') && (
                            <QuestionTemplateForm
                                template={selectedTemplate}
                                onSave={handleSaveTemplate}
                                onCancel={handleCancelEdit}
                                onPreview={handlePreviewTemplate}
                            />
                        )}
                    </>
                )}

                {activeTab === 'arrange' && (
                    <TopicArrangement />
                )}

                {activeTab === 'questions' && (
                    <GeneratedQuestionsList jobId={selectedJobId} />
                )}
            </div>

            {previewTemplate && (
                <TemplatePreview
                    template={previewTemplate}
                    onClose={handleClosePreview}
                />
            )}
        </div>
    );
};

export default DynamicQuestionsDashboard;
