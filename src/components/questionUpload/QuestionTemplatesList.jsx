import { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { Edit, Trash2, Eye, Plus } from 'lucide-react';
import PropTypes from 'prop-types';

const QuestionTemplatesList = ({ onEdit, onPreview }) => {
    const [templates, setTemplates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const LIMIT = 15;

    const [selectedGrade, setSelectedGrade] = useState('');

    const fetchTemplates = async (currentPage, gradeFilter) => {
        try {
            setLoading(true);
            const offset = (currentPage - 1) * LIMIT;

            // Build filter object
            const filters = { limit: LIMIT, offset };
            if (gradeFilter) filters.grade = gradeFilter;

            // Revert to fetching "all" matches (up to reasonable limit) and paging client side
            const allData = await api.getQuestionTemplates({ limit: 1000, grade: gradeFilter });
            const allTemplates = allData.templates || [];

            setTotalCount(allTemplates.length);
            setTotalPages(Math.ceil(allTemplates.length / LIMIT) || 1);
            const startIndex = (currentPage - 1) * LIMIT;
            const endIndex = startIndex + LIMIT;
            setTemplates(allTemplates.slice(startIndex, endIndex));

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTemplates(page, selectedGrade);
    }, [page, selectedGrade]);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setPage(newPage);
        }
    };

    const handleGradeChange = (e) => {
        setSelectedGrade(e.target.value);
        setPage(1); // Reset to first page
    };

    const handleDelete = async (template) => {
        if (!window.confirm('Are you sure you want to delete this template?')) return;
        try {
            await api.deleteQuestionTemplate(template.template_id, template.is_v2);
            // Refresh current page
            fetchTemplates(page, selectedGrade);
        } catch (err) {
            alert('Failed to delete: ' + err.message);
        }
    };

    if (loading) return <div>Loading templates...</div>;
    if (error) return <div className="error-message">Error: {error}</div>;

    return (
        <div className="templates-list-container">
            <div className="list-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                    <h3>Available Templates <span style={{ fontSize: '0.8em', color: '#666', fontWeight: 'normal' }}>({totalCount})</span></h3>
                    <select
                        value={selectedGrade}
                        onChange={handleGradeChange}
                        style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                    >
                        <option value="">All Grades</option>
                        {[...Array(12)].map((_, i) => (
                            <option key={i + 1} value={i + 1}>Class {i + 1}</option>
                        ))}
                    </select>
                </div>
                <button className="create-btn" onClick={() => onEdit(null)}>
                    <Plus size={16} /> New Template
                </button>
            </div>

            {templates.length === 0 ? (
                <p>No templates found. Create one to get started.</p>
            ) : (
                <>
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
                                    <button onClick={() => handleDelete(template)} title="Delete" className="delete-btn">
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination Controls */}
                    {totalPages > 1 && (
                        <div className="pagination-controls" style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginTop: '20px', alignItems: 'center' }}>
                            <button
                                onClick={() => handlePageChange(page - 1)}
                                disabled={page === 1}
                                style={{ padding: '8px 16px', cursor: page === 1 ? 'not-allowed' : 'pointer', opacity: page === 1 ? 0.5 : 1 }}
                            >
                                Previous
                            </button>
                            <span>Page {page} of {totalPages}</span>
                            <button
                                onClick={() => handlePageChange(page + 1)}
                                disabled={page === totalPages}
                                style={{ padding: '8px 16px', cursor: page === totalPages ? 'not-allowed' : 'pointer', opacity: page === totalPages ? 0.5 : 1 }}
                            >
                                Next
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

QuestionTemplatesList.propTypes = {
    onEdit: PropTypes.func.isRequired,
    onPreview: PropTypes.func.isRequired
};

export default QuestionTemplatesList;
