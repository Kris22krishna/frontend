import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../services/api';
import '../styles/PracticeSession.css';

const PracticeSession = () => {
    const { templateId } = useParams();
    const [questions, setQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userAnswer, setUserAnswer] = useState('');
    const [feedback, setFeedback] = useState(null); // { type: 'success' | 'error', message: '' }
    const [showSolution, setShowSolution] = useState(false);

    useEffect(() => {
        fetchQuestions();
    }, [templateId]);

    const fetchQuestions = async () => {
        setLoading(true);
        try {
            // Fetch questions for this template
            const data = await api.getGeneratedQuestions({ templateId, limit: 20 });
            setQuestions(data.questions || []);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleCheckAnswer = () => {
        const currentQuestion = questions[currentIndex];
        if (!currentQuestion) return;

        // Simple string comparison for now. 
        // In a real app, logic depends on question type (MCQ vs text).
        // Assuming text input for generic match.
        const correct = currentQuestion.answer_value?.toString().trim().toLowerCase();
        const user = userAnswer.toString().trim().toLowerCase();

        if (user === correct) {
            setFeedback({ type: 'success', message: 'Correct!' });
        } else {
            setFeedback({ type: 'error', message: 'Incorrect. Try again.' });
        }
    };

    const handleNext = () => {
        if (currentIndex < questions.length - 1) {
            setCurrentIndex(currentIndex + 1);
            setUserAnswer('');
            setFeedback(null);
            setShowSolution(false);
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
            setUserAnswer('');
            setFeedback(null);
            setShowSolution(false);
        }
    };

    if (loading) return <div className="practice-container loading">Loading practice session...</div>;
    if (error) return <div className="practice-container error">Error: {error}</div>;
    if (questions.length === 0) return (
        <div className="practice-container empty">
            <h2>No practice questions available.</h2>
            <p>Please ask your administrator to generate questions for Template ID: {templateId}</p>
        </div>
    );

    const question = questions[currentIndex];

    return (
        <div className="practice-container">
            <div className="practice-header">
                <h2>Practice Session</h2>
                <div className="progress-indicator">
                    Question {currentIndex + 1} of {questions.length}
                </div>
            </div>

            <div className="question-card">
                <div className="question-text" dangerouslySetInnerHTML={{ __html: question.question_html }} />

                <div className="answer-section">
                    <input
                        type="text"
                        value={userAnswer}
                        onChange={(e) => setUserAnswer(e.target.value)}
                        placeholder="Enter your answer"
                        className="answer-input"
                        onKeyDown={(e) => e.key === 'Enter' && handleCheckAnswer()}
                    />
                    <button onClick={handleCheckAnswer} className="check-btn">Check</button>
                </div>

                {feedback && (
                    <div className={`feedback ${feedback.type}`}>
                        {feedback.message}
                        {feedback.type === 'error' && (
                            <button onClick={() => setShowSolution(!showSolution)} className="show-solution-btn">
                                {showSolution ? 'Hide Solution' : 'Show Solution'}
                            </button>
                        )}
                    </div>
                )}

                {showSolution && (
                    <div className="solution-display">
                        <strong>Correct Answer:</strong> {question.answer_value}
                    </div>
                )}
            </div>

            <div className="navigation-controls">
                <button onClick={handlePrev} disabled={currentIndex === 0} className="nav-btn">Previous</button>
                <button onClick={handleNext} disabled={currentIndex === questions.length - 1} className="nav-btn">Next</button>
            </div>
        </div>
    );
};

export default PracticeSession;
