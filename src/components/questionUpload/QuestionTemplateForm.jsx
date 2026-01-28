import { useState, useEffect } from 'react';
import { api } from '../../services/api';
import PropTypes from 'prop-types';

const COMPONENT_DEFAULT = {
    skill_id: "",
    grade: "",
    category: "",
    skill_name: "",
    type: "MCQ",
    format: 1,
    difficulty: "Easy",
    question_template: "",
    answer_template: "",
    solution_template: ""
};

const QuestionTemplateForm = ({ template, onSave, onCancel, onPreview }) => {
    const [formData, setFormData] = useState(COMPONENT_DEFAULT);
    const [loading, setLoading] = useState(false);
    const [fetchingSkill, setFetchingSkill] = useState(false);
    const [error, setError] = useState(null);
    const [skillError, setSkillError] = useState(null);

    useEffect(() => {
        if (template) {
            setFormData({
                skill_id: template.skill_id || '',
                grade: template.grade || '',
                category: template.category || '',
                skill_name: template.skill_name || '',
                type: template.type || 'MCQ',
                format: template.format || 1,
                difficulty: template.difficulty || 'Easy',
                question_template: template.question_template || '',
                answer_template: template.answer_template || '',
                solution_template: template.solution_template || ''
            });
        }
    }, [template]);

    const handleChange = (e) => {
        const value = e.target.type === 'number' ? parseInt(e.target.value) : e.target.value;
        setFormData({ ...formData, [e.target.name]: value });
    };

    const fetchSkillDetails = async () => {
        if (!formData.skill_id) {
            setSkillError("Please enter a Skill ID");
            return;
        }

        setFetchingSkill(true);
        setSkillError(null);

        try {
            const response = await api.getSkillById(formData.skill_id);
            if (response) {
                setFormData(prev => ({
                    ...prev,
                    grade: response.grade || '',
                    category: response.topic || '',
                    skill_name: response.skill_name || ''
                }));
            }
        } catch (err) {
            setSkillError("Skill not found. Please check the ID.");
            setFormData(prev => ({
                ...prev,
                grade: '',
                category: '',
                skill_name: ''
            }));
        } finally {
            setFetchingSkill(false);
        }
    };

    const loadExample = () => {
        const exampleQuestionTemplate = `# Define vars -> question, answer, solution, options (optional)
import random

a = random.randint(1, 10)
b = random.randint(1, 10)
ans = a + b

question = f"<div className='question-container'><p>What is {a} + {b}?</p></div>"`;

        const exampleAnswerTemplate = `# Use variables from Question Template
# answer variable is already set generally, but you can override specifically if needed
# basically just return nothing if you set 'answer' above, or format it here.
answer = ans`;

        const exampleSolutionTemplate = `# Explain logic
solution = f"""
<div className="solution">
    <p>To add {a} and {b}:</p>
    <p>{a} + {b} = {ans}</p>
</div>
"""`;

        setFormData(prev => ({
            ...prev,
            skill_id: 1, // Dummy ID
            grade: 5,
            category: "Mathematics",
            skill_name: "Addition Practice",
            type: "MCQ",
            format: 1,
            difficulty: "Easy",
            question_template: exampleQuestionTemplate,
            answer_template: exampleAnswerTemplate,
            solution_template: exampleSolutionTemplate
        }));
    };

    const getPayload = () => {
        return {
            skill_id: parseInt(formData.skill_id) || 0,
            grade: parseInt(formData.grade) || 0,
            category: formData.category || "",
            skill_name: formData.skill_name || "",
            type: formData.type || "MCQ",
            format: parseInt(formData.format) || 1,
            difficulty: formData.difficulty || "Easy",
            question_template: formData.question_template || "",
            answer_template: formData.answer_template || "",
            solution_template: formData.solution_template || ""
        };
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation
        if (!formData.skill_id) return setError("Skill ID is required");
        if (!formData.grade) return setError("Grade is required");
        if (!formData.category) return setError("Category is required");
        if (!formData.skill_name) return setError("Skill Name is required");

        setLoading(true);
        setError(null);
        try {
            const payload = getPayload();
            console.log("Submitting payload to parent:", payload);
            await onSave(payload);
        } catch (err) {
            console.error("Save error:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handlePreviewClick = async () => {
        // Use current form data directly
        const payload = {
            skill_id: parseInt(formData.skill_id) || 0,
            grade: parseInt(formData.grade) || 0,
            category: formData.category || 'Preview',
            skill_name: formData.skill_name || 'Preview',
            type: formData.type,
            format: parseInt(formData.format),
            difficulty: formData.difficulty,
            question_template: formData.question_template,
            answer_template: formData.answer_template,
            solution_template: formData.solution_template,
            is_v2: true // Important for TemplatePreview to know which API to use
        };

        // Pass the payload to the parent/dashboard, which renders TemplatePreview.
        // TemplatePreview will handle the API call and loading state.
        onPreview(payload);
    };

    return (
        <div className="template-form-container">
            {/* Header with Load Example button */}
            <div className="form-header">
                <h3>{template ? 'Edit Template' : 'Create New Template'}</h3>
                <button type="button" onClick={loadExample} className="load-example-btn">
                    <span className="icon">↻</span> Load Example
                </button>
            </div>

            {error && <div className="error-message" style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}

            <form onSubmit={handleSubmit} className="form-grid">
                {/* --- Skill Configuration --- */}
                <div className="form-section skill-config-section">
                    <div className="section-header">
                        <span className="section-icon">#</span>
                        <h4>Skill Configuration</h4>
                    </div>

                    <div className="form-group">
                        <label>Skill ID</label>
                        <input
                            type="number"
                            name="skill_id"
                            value={formData.skill_id}
                            onChange={handleChange}
                            onBlur={fetchSkillDetails}
                            placeholder="Enter skill ID"
                            required
                        />
                        <small className="helper-text">Enter ID and click outside to fetch details.</small>
                        {fetchingSkill && <small className="info-text">Fetching skill details...</small>}
                        {skillError && <small className="error-text">{skillError}</small>}
                    </div>

                    <div className="form-row three-cols">
                        <div className="form-group third">
                            <label><span className="field-icon">◈</span> Grade</label>
                            <input
                                type="number"
                                name="grade"
                                value={formData.grade}
                                onChange={handleChange}
                                placeholder="Grade Level"
                                required
                            />
                        </div>
                        <div className="form-group third">
                            <label><span className="field-icon">☐</span> Category</label>
                            <input
                                type="text"
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                placeholder="Category"
                                required
                            />
                        </div>
                        <div className="form-group third">
                            <label><span className="field-icon">T</span> Skill Name</label>
                            <input
                                type="text"
                                name="skill_name"
                                value={formData.skill_name}
                                onChange={handleChange}
                                placeholder="Skill Name"
                                required
                            />
                        </div>
                    </div>
                </div>

                {/* --- Question Type and Difficulty --- */}
                <div className="form-row two-cols">
                    <div className="form-group half">
                        <label>Question Type</label>
                        <select name="type" value={formData.type} onChange={handleChange}>
                            <option value="MCQ">MCQ</option>
                            <option value="User Input">User Input</option>
                            <option value="Image Based">Image Based</option>
                            <option value="Code Based">Code Based</option>
                        </select>
                    </div>
                    <div className="form-group half">
                        <label><span className="field-icon">‖</span> Difficulty</label>
                        <select name="difficulty" value={formData.difficulty} onChange={handleChange}>
                            <option value="Easy">Easy</option>
                            <option value="Medium">Medium</option>
                            <option value="Hard">Hard</option>
                        </select>
                    </div>
                </div>

                {/* --- Code Templates --- */}
                <div className="form-section code-templates-section">
                    <div className="section-header">
                        <span className="section-icon">&lt;&gt;</span>
                        <h4>Code Templates (Python)</h4>
                        <button type="button" onClick={handlePreviewClick} className="run-preview-btn" disabled={loading}>
                            <span>▷</span> Run Preview
                        </button>
                    </div>

                    <div className="form-group">
                        <label>Question Template<small>(Python script. Set `question` variable.)</small></label>
                        <textarea
                            name="question_template"
                            value={formData.question_template}
                            onChange={handleChange}
                            rows={10}
                            className="code-editor"
                            placeholder="# Import random, math... \n# Set 'question' = HTML string"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Answer Template<small>(Python script. Shared scope. Set `answer` variable.)</small></label>
                        <textarea
                            name="answer_template"
                            value={formData.answer_template}
                            onChange={handleChange}
                            rows={5}
                            className="code-editor"
                            placeholder="# Set 'answer' variable"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Solution Template<small>(Python script. Shared scope. Set `solution` variable.)</small></label>
                        <textarea
                            name="solution_template"
                            value={formData.solution_template}
                            onChange={handleChange}
                            rows={5}
                            className="code-editor"
                            placeholder="# Set 'solution' = HTML string"
                            required
                        />
                    </div>
                </div>

                <div className="form-actions">
                    <button type="button" onClick={onCancel} className="cancel-btn">Cancel</button>
                    <button type="submit" disabled={loading} className="save-btn">
                        {loading ? 'Creating...' : 'Create Template'}
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
