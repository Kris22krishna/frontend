import { useState, useEffect } from 'react';
import { api } from '../../services/api';
import PropTypes from 'prop-types';

const COMPONENT_DEFAULT = {
    grade_level: "1",
    module: "",
    category: "",
    topic: "",
    subtopic: "",
    format: "",
    difficulty: "medium",
    type: "mcq",
    dynamic_question: "",
    logical_answer: "",
    status: "draft"
};

const QuestionTemplateForm = ({ template, onSave, onCancel, onPreview }) => {
    const [formData, setFormData] = useState(COMPONENT_DEFAULT);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (template) {
            // Destructure to avoid passing internal fields if we ever send this back whole
            // But for state, we just copy specific fields we care about
            setFormData({
                grade_level: (template.grade_level || [1]).join(', '),
                module: template.module || '',
                category: template.category || '',
                topic: template.topic || '',
                subtopic: template.subtopic || '',
                format: template.format || '',
                difficulty: template.difficulty || 'medium',
                type: template.type || 'mcq',
                dynamic_question: template.dynamic_question || '',
                logical_answer: template.logical_answer || '',
                status: template.status || 'draft'
            });
        }
    }, [template]);

    const handleChange = (e) => {
        const value = e.target.type === 'number' ? parseInt(e.target.value) : e.target.value;
        setFormData({ ...formData, [e.target.name]: value });
    };

    const saveTemplate = async () => {
        const payload = {
            ...formData,
            // Ensure grade_level is an array of integers
            grade_level: formData.grade_level.toString().split(',').map(g => parseInt(g.trim())).filter(g => !isNaN(g))
        };

        if (template && template.template_id) {
            return await api.updateQuestionTemplate(template.template_id, payload);
        } else {
            return await api.createQuestionTemplate(payload);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            await saveTemplate();
            onSave();
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handlePreviewClick = async () => {
        setLoading(true);
        setError(null);
        try {
            // Save first to get valid ID or update content
            const savedTemplate = await saveTemplate();
            console.log("DEBUG: savedTemplate used for preview:", savedTemplate);
            // Trigger preview with the saved template data (including the ID)
            // If Create, api returns the new object with ID. If Update, likewise.
            // OnPreview callback expects the template object.
            onPreview(savedTemplate);
        } catch (err) {
            setError("Cannot preview: " + err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleGenerateClick = async () => {
        setLoading(true);
        setError(null);
        try {
            // 1. Save Template first
            const savedTemplate = await saveTemplate();

            // 2. Prompt for count
            const countStr = window.prompt("How many questions would you like to generate?", "10");
            if (!countStr) {
                setLoading(false);
                return; // User cancelled
            }

            const count = parseInt(countStr);
            if (isNaN(count) || count <= 0) {
                alert("Please enter a valid number greater than 0.");
                setLoading(false);
                return;
            }

            // 3. Call Generation API
            await api.createGenerationJob(savedTemplate.template_id, count);

            alert(`Successfully started generation of ${count} questions!`);

            // Optional: Call onSave to refresh parent list or just stay here
            onSave();
        } catch (err) {
            setError("Generation failed: " + err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="template-form-container">
            <h3>{template ? 'Edit Template' : 'Create New Template'}</h3>
            {error && <div className="error-message" style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}

            <form onSubmit={handleSubmit} className="form-grid">
                {/* --- Classification --- */}
                <div className="form-section">
                    <h4>Classification</h4>
                    <div className="form-row">
                        <div className="form-group half">
                            <label>Grade Level</label>
                            <input
                                type="text"
                                name="grade_level"
                                value={formData.grade_level}
                                onChange={handleChange}
                                placeholder="e.g. 1, 2, 3"
                                required
                            />
                        </div>
                        <div className="form-group half">
                            <label>Module</label>
                            <input
                                type="text"
                                name="module"
                                value={formData.module}
                                onChange={handleChange}
                                placeholder="e.g. Math Skill"
                                required
                            />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group half">
                            <label>Category</label>
                            <input
                                type="text"
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                placeholder="e.g. Fundamentals"
                                required
                            />
                        </div>
                        <div className="form-group half">
                            <label>Topic</label>
                            <input
                                type="text"
                                name="topic"
                                value={formData.topic}
                                onChange={handleChange}
                                placeholder="e.g. Addition"
                                required
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Subtopic</label>
                        <input
                            type="text"
                            name="subtopic"
                            value={formData.subtopic}
                            onChange={handleChange}
                            placeholder="e.g. Two digit addition"
                            required
                        />
                    </div>
                </div>

                {/* --- Configuration --- */}
                <div className="form-section">
                    <h4>Configuration</h4>
                    <div className="form-row">
                        <div className="form-group half">
                            <label>Question Type</label>
                            <select name="type" value={formData.type} onChange={handleChange}>
                                <option value="mcq">MCQ</option>
                                <option value="user_input">User Input</option>
                                <option value="image_based">Image Based</option>
                                <option value="code_based">Code Based</option>
                            </select>
                        </div>
                        <div className="form-group half">
                            <label>Difficulty</label>
                            <select name="difficulty" value={formData.difficulty} onChange={handleChange}>
                                <option value="easy">Easy</option>
                                <option value="medium">Medium</option>
                                <option value="hard">Hard</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Display Format (Text Template)</label>
                        <input
                            type="text"
                            name="format"
                            value={formData.format}
                            onChange={handleChange}
                            placeholder="What is {{a}} + {{b}}?"
                            required
                        />
                        <small>Use {'{{variable}}'} syntax for dynamic values.</small>
                    </div>
                    <div className="form-group">
                        <label>Status</label>
                        <select name="status" value={formData.status} onChange={handleChange}>
                            <option value="draft">Draft</option>
                            <option value="active">Active</option>
                            <option value="archived">Archived</option>
                        </select>
                    </div>
                </div>

                {/* --- Logic --- */}
                <div className="form-section full-width">
                    <h4>Logic (Python)</h4>
                    <div className="form-group">
                        <label>Dynamic Question Generator</label>
                        <textarea
                            name="dynamic_question"
                            value={formData.dynamic_question}
                            onChange={handleChange}
                            rows={15}
                            className="code-editor"
                            placeholder="Python code to generate variables..."
                            required
                        />
                        <small>Must return a dictionary.</small>
                    </div>
                    <div className="form-group">
                        <label>Logical Answer Validator</label>
                        <textarea
                            name="logical_answer"
                            value={formData.logical_answer}
                            onChange={handleChange}
                            rows={5}
                            className="code-editor"
                            placeholder="Python code to calculate answer (e.g. return a + b)"
                            required
                        />
                        <small>Return the correct answer value.</small>
                    </div>
                </div>

                <div className="form-actions">
                    <button type="button" onClick={onCancel} className="cancel-btn">Cancel</button>
                    <button type="button" onClick={handlePreviewClick} className="cancel-btn" style={{ background: '#17a2b8', color: 'white', marginRight: '10px' }}>
                        Save & Preview
                    </button>
                    <button type="button" onClick={handleGenerateClick} className="cancel-btn" style={{ background: '#28a745', color: 'white', marginRight: '10px' }}>
                        Generate Questions
                    </button>
                    <button type="submit" disabled={loading} className="save-btn">
                        {loading ? 'Saving...' : 'Save Template'}
                    </button>
                </div>
            </form>
        </div>
    );
};

QuestionTemplateForm.propTypes = {
    template: PropTypes.object,
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    onPreview: PropTypes.func.isRequired
};

export default QuestionTemplateForm;
