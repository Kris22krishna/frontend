import { useState, useEffect } from 'react';
import { api } from '../../services/api';
import PropTypes from 'prop-types';

const GeneratedQuestionsList = ({ jobId }) => {
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchQuestions = async () => {
            setLoading(true);
            try {
                const data = await api.getGeneratedQuestions({ jobId });
                setQuestions(data.questions || []);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchQuestions();
    }, [jobId]); // Re-fetch when jobId changes or on mount

    if (loading) return <div>Loading questions...</div>;
    if (error) return <div className="error-message">Error: {error}</div>;

    return (
        <div className="generated-questions-container">
            <h3>Generated Questions {jobId ? `(Job: ${jobId})` : '(All)'}</h3>

            {questions.length === 0 ? (
                <p>No questions found.</p>
            ) : (
                <div className="questions-list">
                    {questions.map((q) => (
                        <div key={q.generated_question_id} className="question-item">
                            <div className="question-header">
                                <span className="question-id">#{q.generated_question_id}</span>
                                <span className="question-template">Template: {q.template_id}</span>
                            </div>
                            <div className="question-content">
                                <div dangerouslySetInnerHTML={{ __html: q.question_html }} />
                                <div className="answer-section">
                                    <strong>Answer:</strong> {q.answer_value}
                                </div>
                                <details>
                                    <summary>Variables Used</summary>
                                    <pre>{JSON.stringify(q.variables_used, null, 2)}</pre>
                                </details>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

GeneratedQuestionsList.propTypes = {
    jobId: PropTypes.string
};

export default GeneratedQuestionsList;
