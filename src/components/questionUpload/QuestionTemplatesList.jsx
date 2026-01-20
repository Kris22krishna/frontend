import { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { Edit, Trash2, Eye, Plus } from 'lucide-react';
import PropTypes from 'prop-types';

const QuestionTemplatesList = ({ onEdit, onPreview }) => {
    const [templates, setTemplates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchTemplates = async () => {
        try {
            setLoading(true);
            const data = await api.getQuestionTemplates();
            setTemplates(data.templates || []);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTemplates();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this template?')) return;
        try {
            await api.deleteQuestionTemplate(id);
            setTemplates(templates.filter(t => t.template_id !== id));
        } catch (err) {
            alert('Failed to delete: ' + err.message);
        }
    };

    if (loading) return <div>Loading templates...</div>;
    if (error) return <div className="error-message">Error: {error}</div>;

    return (
        <div className="templates-list-container">
            <div className="list-header">
                <h3>Available Templates</h3>
                <button className="create-btn" onClick={() => onEdit(null)}>
                    <Plus size={16} /> New Template
                </button>
            </div>

            {templates.length === 0 ? (
                <p>No templates found. Create one to get started.</p>
            ) : (
                <div className="template-grid">
                    {templates.map(template => (
                        <div key={template.template_id} className="template-card">
                            <div className="template-info">
                                <h4>{template.module} - {template.topic}</h4>
                                <span className="template-id">Grades: {(Array.isArray(template.grade_level) ? template.grade_level : [template.grade_level]).join(', ')} | ID: {template.template_id}</span>
                            </div>
                            <div className="template-actions">
                                <button onClick={() => onPreview(template)} title="Preview">
                                    <Eye size={18} />
                                </button>
                                <button onClick={() => onEdit(template)} title="Edit">
                                    <Edit size={18} />
                                </button>
                                <button onClick={() => handleDelete(template.template_id)} title="Delete" className="delete-btn">
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

QuestionTemplatesList.propTypes = {
    onEdit: PropTypes.func.isRequired,
    onPreview: PropTypes.func.isRequired
};

export default QuestionTemplatesList;
