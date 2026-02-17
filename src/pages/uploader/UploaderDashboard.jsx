import { useState, useEffect } from 'react';
import QuestionTemplatesList from '../../components/questionUpload/QuestionTemplatesList';
import QuestionTemplateForm from '../../components/questionUpload/QuestionTemplateForm';
import TemplatePreview from '../../components/questionUpload/TemplatePreview';
import GeneratedQuestionsList from '../../components/questionUpload/GeneratedQuestionsList';
import TopicArrangement from '../../components/questionUpload/TopicArrangement';
import SEO from '../../components/common/SEO';
import Navbar from '../../components/Navbar';
import { api } from '../../services/api';
import '../../styles/DynamicQuestionsDashboard.css'; // Reusing existing styles

const UploaderDashboard = () => {
    // Auth State
    const [isAuthenticated, setIsAuthenticated] = useState(!!sessionStorage.getItem('access_token'));
    const userType = sessionStorage.getItem('userType');

    // Dashboard State
    const [activeTab, setActiveTab] = useState('templates');
    const [viewMode, setViewMode] = useState('list');
    const [selectedTemplate, setSelectedTemplate] = useState(null);
    const [previewTemplate, setPreviewTemplate] = useState(null);
    const [selectedJobId, setSelectedJobId] = useState(null);

    const [errorState, setErrorState] = useState(null);

    // Redirect if not uploader or not authenticated
    useEffect(() => {
        // Double check auth on mount
        const token = sessionStorage.getItem('access_token');
        const type = sessionStorage.getItem('userType');

        console.log('--- Uploader Dashboard Mount ---');
        console.log('Token:', token ? 'Yes' : 'No');
        console.log('User Type:', type);

        if (!token) {
            console.error('Core Auth Failure: No Token');
            setErrorState('No authentication token found. Please login again.');
            // window.location.href = '/uploader-login'; // Disabled for debugging
        } else if (type !== 'uploader') {
            // If admin tries to access, maybe let them?
            if (type === 'admin') return;
            console.error('Core Auth Failure: Wrong Role', type);
            setErrorState(`Invalid role: ${type}. Expected: uploader.`);
            // window.location.href = '/admin'; // Disabled for debugging
        }
    }, []);


    const handleLogout = () => {
        api.logout();
        setIsAuthenticated(false);
        window.location.href = '/uploader-login';
    };

    // --- Template Handlers ---
    const handleEditTemplate = (template) => {
        setSelectedTemplate(template);
        setViewMode('edit');
    };

    const handleCreateTemplate = () => {
        setSelectedTemplate(null);
        setViewMode('create');
    };

    const handleSaveTemplate = async (data) => {
        try {
            if (selectedTemplate) {
                await api.updateQuestionTemplate(selectedTemplate.template_id, data);
            } else {
                await api.createQuestionTemplate(data);
            }
            setViewMode('list');
            setSelectedTemplate(null);
        } catch (error) {
            alert('Error saving template: ' + error.message);
        }
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

    // --- Navigation Items ---
    const navItems = [
        { id: 'templates', label: 'Templates', icon: '📝' },
        { id: 'arrange', label: 'Arrangement', icon: '🔢' },
        { id: 'questions', label: 'Questions', icon: '❓' }
    ];

    // if (!isAuthenticated) return null; // Or loading spinner

    // Debug Error View
    if (errorState) {
        return (
            <div style={{ padding: '50px', textAlign: 'center' }}>
                <h1>Access Denied</h1>
                <p style={{ color: 'red' }}>{errorState}</p>
                <button onClick={() => window.location.href = '/uploader-login'}>Go to Login</button>
            </div>
        );
    }

    if (!isAuthenticated) return (
        <div style={{ padding: '50px', textAlign: 'center' }}>
            <h2>Loading Dashboard...</h2>
            <p>(If this persists, check console logs)</p>
        </div>
    );

    return (
        <>
            <Navbar />
            <div className="admin-layout" style={{ paddingTop: '80px' }}>
                <SEO title="Uploader Dashboard - skill100.ai" description="Question Upload Panel" />

                {/* Sidebar */}
                <aside className="admin-sidebar">
                    <div className="sidebar-header">
                        <div className="sidebar-brand">
                            <div className="brand-icon">⚡</div>
                            <div className="brand-text">
                                <h1 style={{
                                    fontSize: '1.25rem',
                                    fontWeight: 'bold',
                                    background: 'linear-gradient(to right, #00C9FF, #92FE9D)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent'
                                }}>
                                    skill100.ai
                                </h1>
                            </div>
                        </div>
                    </div>
                    <nav className="sidebar-nav">
                        <div className="nav-group">
                            <div className="nav-group-label">Question Generation</div>
                            <div className="nav-group-children">
                                {navItems.map(item => (
                                    <button
                                        key={item.id}
                                        className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
                                        onClick={() => setActiveTab(item.id)}
                                    >
                                        <span className="nav-icon">{item.icon}</span>
                                        {item.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </nav>
                    <div className="sidebar-footer">
                        <button onClick={handleLogout} className="logout-btn">
                            <span className="nav-icon">🚪</span> Logout
                        </button>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="admin-main">
                    <header className="admin-header">
                        <h3>{navItems.find(i => i.id === activeTab)?.label}</h3>
                        <div className="user-profile" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <div className="user-info" style={{ fontWeight: 'bold' }}>
                                {sessionStorage.getItem('userName') || 'Uploader'}
                            </div>
                            <div className="avatar-placeholder" style={{
                                width: '32px', height: '32px', borderRadius: '50%',
                                background: '#3498db', color: 'white',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: '14px'
                            }}>
                                {(sessionStorage.getItem('userName') || 'U')[0].toUpperCase()}
                            </div>
                        </div>
                    </header>

                    <div className="admin-content-area">
                        {activeTab === 'templates' && (
                            <>
                                {viewMode === 'list' && (
                                    <QuestionTemplatesList
                                        onEdit={handleEditTemplate}
                                        onPreview={handlePreviewTemplate}
                                        onCreate={handleCreateTemplate} // Pass create handler if list has button
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
                </main>

                {previewTemplate && (
                    <TemplatePreview
                        template={previewTemplate}
                        onClose={handleClosePreview}
                    />
                )}
            </div>
        </>
    );
};

export default UploaderDashboard;
