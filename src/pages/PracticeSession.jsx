import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../services/api';
import '../styles/PracticeSession.css';

// Simple Whiteboard Component
const Whiteboard = ({ onClose }) => {
    const canvasRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [context, setContext] = useState(null);
    const [color, setColor] = useState('#000000');
    const [brushSize, setBrushSize] = useState(3);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        // Handle resizing
        canvas.width = canvas.parentElement.offsetWidth;
        canvas.height = canvas.parentElement.offsetHeight;

        const ctx = canvas.getContext('2d');
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.strokeStyle = color;
        ctx.lineWidth = brushSize;
        setContext(ctx);

        // Clean up
        return () => { };
    }, []);

    useEffect(() => {
        if (context) {
            context.strokeStyle = color;
            context.lineWidth = brushSize;
        }
    }, [color, brushSize, context]);

    const startDrawing = ({ nativeEvent }) => {
        const { offsetX, offsetY } = nativeEvent;
        context.beginPath();
        context.moveTo(offsetX, offsetY);
        setIsDrawing(true);
    };

    const finishDrawing = () => {
        context.closePath();
        setIsDrawing(false);
    };

    const draw = ({ nativeEvent }) => {
        if (!isDrawing) return;
        const { offsetX, offsetY } = nativeEvent;
        context.lineTo(offsetX, offsetY);
        context.stroke();
    };

    const clearCanvas = () => {
        const canvas = canvasRef.current;
        context.clearRect(0, 0, canvas.width, canvas.height);
    };

    return (
        <div className="whiteboard-container">
            <div className="whiteboard-toolbar">
                <div className="wb-tools">
                    <input type="color" value={color} onChange={(e) => setColor(e.target.value)} title="Pen Color" />
                    <input
                        type="range"
                        min="1"
                        max="10"
                        value={brushSize}
                        onChange={(e) => setBrushSize(e.target.value)}
                        title="Brush Size"
                    />
                    <button onClick={() => setColor('#ffffff')} className="tool-btn eraser" title="Eraser">🧴</button>
                    <button onClick={clearCanvas} className="tool-btn" title="Clear All">🗑️</button>
                </div>
                <button onClick={onClose} className="close-wb-btn">✖ Close Whiteboard</button>
            </div>
            <div className="canvas-wrapper">
                <canvas
                    ref={canvasRef}
                    onMouseDown={startDrawing}
                    onMouseUp={finishDrawing}
                    onMouseMove={draw}
                    onMouseLeave={finishDrawing}
                />
            </div>
        </div>
    );
};

const PracticeSession = () => {
    const { templateId } = useParams();
    const [questions, setQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userAnswer, setUserAnswer] = useState('');
    const [feedback, setFeedback] = useState(null); // { type: 'success' | 'error', message: '' }
    const [showSolution, setShowSolution] = useState(false);
    const [finished, setFinished] = useState(false);
    const [skillMetadata, setSkillMetadata] = useState(null);
    const [showWhiteboard, setShowWhiteboard] = useState(false);

    useEffect(() => {
        fetchQuestions();
    }, [templateId]);

    // Helper to extract options from legacy text format like "Question? A) Option1 B) Option2"
    const parseQuestion = (sample, idx) => {
        let questionHtml = sample.question_html;
        let options = sample.options || (sample.variables_used?.options) || [];
        let questionType = sample.question_type || (sample.variables_used?.question_type);

        // Auto-detect legacy MCQ format if no explicit options provided
        if ((!options || options.length === 0) && (questionHtml.includes('A)') || questionHtml.includes('a)'))) {
            // Try to extract options using regex for patterns like " A) " or " a) "
            // Matches A) ... B) ... C) ... D) ... until end of string or next option
            const optionRegex = /(?:^|\s|<br>)(?=[A-D]\)|\s[A-D]\))([A-D])\)\s*(.*?)(?=\s[A-D]\)|$)/gi;

            const matches = [...questionHtml.matchAll(optionRegex)];

            if (matches.length >= 2) {
                options = matches.map(m => m[2].trim());
                questionType = 'MCQ';

                // Remove options from question text to clean it up
                // We split by the first option occurrence
                const splitIdx = questionHtml.search(/(?:^|\s|<br>)(?=[A-D]\)|\s[A-D]\))/i);
                if (splitIdx !== -1) {
                    questionHtml = questionHtml.substring(0, splitIdx).trim();
                }
            }
        }

        return {
            generated_question_id: `dynamic-${idx}`,
            question_html: questionHtml,
            answer_value: sample.answer_value,
            variables_used: sample.variables_used,
            solution_html: sample.solution_html,
            question_type: questionType || 'user_input',
            options: options || []
        };
    };

    const fetchQuestions = async () => {
        setLoading(true);
        try {
            // First try to fetch questions by SKILL ID (since we linked from syllabus)
            // The templateId param is actually a skillId in this context
            const skillData = await api.getPracticeQuestionsBySkill(templateId, 10);

            if (skillData && skillData.preview_samples && skillData.preview_samples.length > 0) {
                const dynamicQuestions = skillData.preview_samples.map((sample, idx) => parseQuestion(sample, idx));
                setQuestions(dynamicQuestions);

                if (skillData.template_metadata) {
                    setSkillMetadata(skillData.template_metadata);
                }

                setLoading(false);
                return;
            }

            // Fallback: Try to get pre-generated questions (Legacy behavior)
            const data = await api.getGeneratedQuestions({ templateId, limit: 20, random: true });

            if (data.questions && data.questions.length > 0) {
                setQuestions(data.questions);
            } else {
                // No pre-generated questions, try legacy public practice endpoint (treating param as actual template ID)
                try {
                    const practiceData = await api.getPracticeQuestions(templateId, 10);
                    if (practiceData.preview_samples && practiceData.preview_samples.length > 0) {
                        const dynamicQuestions = practiceData.preview_samples.map((sample, idx) => parseQuestion(sample, idx));
                        setQuestions(dynamicQuestions);
                    } else {
                        setQuestions([]);
                    }
                } catch (e) {
                    setQuestions([]);
                }
            }
        } catch (err) {
            console.error("Error fetching practice questions:", err);
            // Don't set global error immediately, as we might want to show empty state/fallback
            setQuestions([]);
        } finally {
            setLoading(false);
        }
    };

    const handleCheckAnswer = () => {
        const currentQuestion = questions[currentIndex];
        if (!currentQuestion) return;

        // Normalize answers
        const correctRaw = currentQuestion.answer_value?.toString().trim();
        const correct = correctRaw?.toLowerCase();
        const user = userAnswer.toString().trim().toLowerCase();

        // Smart Check for MCQ
        let isCorrect = user === correct;

        // If it's an MCQ and direct match failed, try matching option index/letter
        if (!isCorrect && (currentQuestion.question_type === 'MCQ' || currentQuestion.options?.length > 0)) {
            // Find index of selected option
            const selectedIdx = currentQuestion.options.findIndex(opt => opt.toString() === userAnswer);

            if (selectedIdx !== -1) {
                // Check if correct answer is a letter (A, B, C, D) matching this index
                const letter = String.fromCharCode(97 + selectedIdx); // 'a', 'b', 'c'...
                if (correct === letter) {
                    isCorrect = true;
                }
                // Also check 1-based index (1, 2, 3...)
                if (correct === (selectedIdx + 1).toString()) {
                    isCorrect = true;
                }
            }
        }

        if (isCorrect) {
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

    // ... prev/next handlers ...

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
            <p>We couldn't find any practice content for this topic yet.</p>
        </div>
    );

    const question = questions[currentIndex];
    const isLastQuestion = currentIndex === questions.length - 1;

    const handleFinish = () => {
        setFinished(true);
    };

    if (finished) {
        return (
            <div className="practice-container">
                <div className="finish-screen" style={{
                    textAlign: 'center',
                    padding: '60px 20px'
                }}>
                    <div style={{ fontSize: '64px', marginBottom: '20px' }}>🎉</div>
                    <h2 style={{ color: '#10b981', marginBottom: '16px' }}>Practice Complete!</h2>
                    <p style={{ color: '#64748b', marginBottom: '32px' }}>
                        You have completed all {questions.length} questions.
                    </p>
                    <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
                        <button
                            onClick={() => {
                                setFinished(false);
                                setCurrentIndex(0);
                                setUserAnswer('');
                                setFeedback(null);
                            }}
                            className="nav-btn"
                            style={{ background: '#4f46e5', color: '#fff' }}
                        >
                            Practice Again
                        </button>
                        <button
                            onClick={() => window.history.back()}
                            className="nav-btn"
                        >
                            Back to Topics
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // Helper to check if an option is correct
    const isOptionCorrect = (option, index) => {
        if (!question) return false;

        // Normalize
        const correctRaw = question.answer_value?.toString().trim();
        const correct = correctRaw?.toLowerCase();
        const optStr = option?.toString().trim().toLowerCase();

        // Direct match
        if (correct === optStr) return true;

        // Letter match (if answer is 'A', 'B' etc)
        const letter = String.fromCharCode(97 + index); // 'a', 'b'...
        if (correct === letter) return true;

        // Index match (if answer is '1', '2' etc)
        if (correct === (index + 1).toString()) return true;

        return false;
    };

    return (
        <div className="zen-layout">
            <div className="practice-container">
                {/* Header Section */}
                <div className="practice-header-redesigned">
                    <div className="header-top">
                        <button onClick={() => window.history.back()} className="back-btn-simple">
                            ← Back
                        </button>
                        <div className="session-info">
                            {skillMetadata && (
                                <>
                                    <span className="badge grade-badge">Grade {skillMetadata.grade}</span>
                                    <span className="badge topic-badge">{skillMetadata.category}</span>
                                </>
                            )}
                        </div>
                    </div>

                    <div className="header-main">
                        <div className="title-section">
                            <h1>{skillMetadata ? skillMetadata.skill_name : 'Practice Session'}</h1>
                            <p className="subtitle">
                                {skillMetadata ? `Topic: ${skillMetadata.topic || skillMetadata.category}` : 'Master your skills'}
                            </p>
                        </div>
                        <div className="header-actions">
                            <div className="progress-circle">
                                <span className="current">{currentIndex + 1}</span>
                                <span className="total">/{questions.length}</span>
                            </div>
                            <button
                                className={`wb-toggle-btn ${showWhiteboard ? 'active' : ''}`}
                                onClick={() => setShowWhiteboard(!showWhiteboard)}
                            >
                                ✏️ Whiteboard
                            </button>
                        </div>
                    </div>
                </div>

                {/* Main Content Split */}
                <main className={`zen-main ${showWhiteboard ? 'split-view' : 'center-view'}`}>

                    {/* Left Panel: Question */}
                    <div className="zen-left-panel">
                        <div className="zen-card">
                            <div className="zen-question-content">
                                <div className="zen-question-text" dangerouslySetInnerHTML={{ __html: question.question_html }} />
                            </div>

                            <div className="zen-interaction-area">
                                {question.question_type === 'MCQ' || question.question_type === 'mcq' && question.options && question.options.length > 0 ? (
                                    <div className="zen-options-grid">
                                        {question.options.map((option, idx) => {
                                            const isCorrect = isOptionCorrect(option, idx);
                                            const isSelected = userAnswer === option;

                                            let btnClass = 'zen-option-btn';
                                            if (isSelected) btnClass += ' selected';

                                            if (feedback) {
                                                if (isCorrect) {
                                                    btnClass += ' correct';
                                                } else if (isSelected && !isCorrect) {
                                                    btnClass += ' wrong';
                                                }
                                            }

                                            return (
                                                <button
                                                    key={idx}
                                                    className={btnClass}
                                                    onClick={() => !feedback && setUserAnswer(option)}
                                                    disabled={!!feedback}
                                                >
                                                    <div className="zen-option-key">{String.fromCharCode(65 + idx)}</div>
                                                    <div className="zen-option-val">{option}</div>
                                                </button>
                                            );
                                        })}
                                    </div>
                                ) : (
                                    <div className="zen-input-wrapper">
                                        <input
                                            type="text"
                                            value={userAnswer}
                                            onChange={(e) => setUserAnswer(e.target.value)}
                                            placeholder="Type your answer..."
                                            className="zen-text-input"
                                            onKeyDown={(e) => e.key === 'Enter' && !feedback && handleCheckAnswer()}
                                            disabled={!!feedback}
                                        />
                                    </div>
                                )}

                                <div className="zen-actions">
                                    {!feedback && (
                                        <button onClick={handleCheckAnswer} className="zen-btn primary" disabled={!userAnswer}>
                                            Check Answer
                                        </button>
                                    )}

                                    {feedback && (
                                        <div className={`zen-feedback animated-pop ${feedback.type}`}>
                                            <div className="feedback-content">
                                                <span className="feedback-icon">{feedback.type === 'success' ? '✅' : '❌'}</span>
                                                <span className="feedback-msg">{feedback.message}</span>
                                            </div>
                                            {feedback.type === 'error' && (
                                                <button onClick={() => setShowSolution(!showSolution)} className="zen-link-btn">
                                                    {showSolution ? 'Hide Explanation' : 'View Explanation'}
                                                </button>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {showSolution && (
                                <div className="solution-display" style={{ marginTop: '20px', padding: '15px', background: '#fff3cd', borderRadius: '8px' }}>
                                    <h4>Explanation</h4>
                                    {question.solution_html ? (
                                        <div dangerouslySetInnerHTML={{ __html: question.solution_html }} />
                                    ) : (
                                        <div>
                                            <strong>Correct Answer:</strong> {question.answer_value}
                                        </div>
                                    )}
                                </div>
                            )}

                            <div className="zen-card-footer">
                                <button onClick={handlePrev} disabled={currentIndex === 0} className="zen-nav-btn">
                                    ← Prev
                                </button>

                                <button
                                    className={`zen-wb-toggle ${showWhiteboard ? 'active' : ''}`}
                                    onClick={() => setShowWhiteboard(!showWhiteboard)}
                                >
                                    {showWhiteboard ? 'Hide Notebook' : 'Show Notebook'}
                                </button>

                                {isLastQuestion ? (
                                    <button onClick={handleFinish} className="zen-nav-btn finish">
                                        Finish
                                    </button>
                                ) : (
                                    <button onClick={handleNext} className="zen-nav-btn primary-action">
                                        Next →
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Whiteboard */}
                    {showWhiteboard && (
                        <div className="zen-right-panel">
                            <Whiteboard onClose={() => setShowWhiteboard(false)} />
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default PracticeSession;
