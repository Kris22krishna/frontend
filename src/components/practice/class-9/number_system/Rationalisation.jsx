import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Check } from 'lucide-react';
import { LatexText } from '../../../LatexText';
import PracticeReportModal from '../../PracticeReportModal';
import { useSessionLogger } from '@/hooks/useSessionLogger';
import { NODE_IDS } from '@/lib/curriculumIds';
import './NumberSystem.css';

const Rationalisation = () => {
    const navigate = useNavigate();
    const [qIndex, setQIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [showExplanationModal, setShowExplanationModal] = useState(false);
    const [showReportModal, setShowReportModal] = useState(false);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [feedbackMessage, setFeedbackMessage] = useState("");
    const [questions, setQuestions] = useState([]);

    const { startSession, logAnswer, finishSession } = useSessionLogger();
    const nodeId = NODE_IDS.g9MathNSRationalisation;
    const [answers, setAnswers] = useState({});

    const generateQuestions = () => {
        const createQuestion = (id, text, options, answer, solution) => ({
            id, text, options: options.sort(() => Math.random() - 0.5), correctAnswer: answer, solution
        });

        return [
            createQuestion(1,
                "Rationalise the denominator of $\\frac{1}{\\sqrt{2}}$.",
                ["$\\frac{\\sqrt{2}}{2}$", "$\\sqrt{2}$", "$\\frac{1}{2}$", "$2$"],
                "$\\frac{\\sqrt{2}}{2}$",
                "Multiply both numerator and denominator by $\\sqrt{2}$: $\\frac{1 \\times \\sqrt{2}}{\\sqrt{2} \\times \\sqrt{2}} = \\frac{\\sqrt{2}}{2}$."
            ),
            createQuestion(2,
                "What is the rationalising factor for $\\sqrt{7}$?",
                ["$\\sqrt{7}$", "$7$", "$\\frac{1}{7}$", "$\\sqrt{14}$"],
                "$\\sqrt{7}$",
                "A rationalising factor is a number that, when multiplied by a surd, makes it rational. $\\sqrt{7} \\times \\sqrt{7} = 7$, which is rational."
            ),
            createQuestion(3,
                "Rationalise: $\\frac{1}{\\sqrt{5}}$",
                ["$\\frac{\\sqrt{5}}{5}$", "$5\\sqrt{5}$", "$\\frac{5}{\\sqrt{5}}$", "$\\sqrt{5}$"],
                "$\\frac{\\sqrt{5}}{5}$",
                "Multiply numerator and denominator by $\\sqrt{5}$: $\\frac{1 \\times \\sqrt{5}}{\\sqrt{5} \\times \\sqrt{5}} = \\frac{\\sqrt{5}}{5}$."
            ),
            createQuestion(4,
                "Rationalise the denominator of $\\frac{1}{2+\\sqrt{3}}$.",
                ["$2-\\sqrt{3}$", "$2+\\sqrt{3}$", "$\\frac{2-\\sqrt{3}}{7}$", "$\\frac{1}{2-\\sqrt{3}}$"],
                "$2-\\sqrt{3}$",
                "Multiply by the conjugate $(2-\\sqrt{3})$: $\\frac{1(2-\\sqrt{3})}{(2+\\sqrt{3})(2-\\sqrt{3})} = \\frac{2-\\sqrt{3}}{2^2 - (\\sqrt{3})^2} = \\frac{2-\\sqrt{3}}{4-3} = 2-\\sqrt{3}$."
            ),
            createQuestion(5,
                "Rationalise the denominator of $\\frac{1}{\\sqrt{5}-\\sqrt{2}}$.",
                ["$\\frac{\\sqrt{5}+\\sqrt{2}}{3}$", "$\\frac{\\sqrt{5}-\\sqrt{2}}{3}$", "$\\sqrt{5}+\\sqrt{2}$", "$\\frac{\\sqrt{5}+\\sqrt{2}}{7}$"],
                "$\\frac{\\sqrt{5}+\\sqrt{2}}{3}$",
                "Multiply by the conjugate $(\\sqrt{5}+\\sqrt{2})$: $\\frac{\\sqrt{5}+\\sqrt{2}}{(\\sqrt{5}-\\sqrt{2})(\\sqrt{5}+\\sqrt{2})} = \\frac{\\sqrt{5}+\\sqrt{2}}{5-2} = \\frac{\\sqrt{5}+\\sqrt{2}}{3}$."
            ),
            createQuestion(6,
                "If $\\frac{1}{3+\\sqrt{8}} = a - \\sqrt{8}$, what is the value of $a$?",
                ["$3$", "$1$", "$-3$", "$8$"],
                "$3$",
                "Rationalise: $\\frac{3-\\sqrt{8}}{(3+\\sqrt{8})(3-\\sqrt{8})} = \\frac{3-\\sqrt{8}}{9-8} = 3-\\sqrt{8}$. Comparing with $a-\\sqrt{8}$, we get $a=3$."
            ),
            createQuestion(7,
                "Simplify: $\\frac{2}{3\\sqrt{3}}$ by rationalising.",
                ["$\\frac{2\\sqrt{3}}{9}$", "$\\frac{\\sqrt{3}}{3}$", "$\\frac{2}{3}$", "$\\frac{2\\sqrt{3}}{3}$"],
                "$\\frac{2\\sqrt{3}}{9}$",
                "Multiply numerator and denominator by $\\sqrt{3}$: $\\frac{2 \\times \\sqrt{3}}{3\\sqrt{3} \\times \\sqrt{3}} = \\frac{2\\sqrt{3}}{3 \\times 3} = \\frac{2\\sqrt{3}}{9}$."
            ),
            createQuestion(8,
                "Identify the conjugate of $5 - 2\\sqrt{6}$.",
                ["$5+2\\sqrt{6}$", "$-5-2\\sqrt{6}$", "$5-2\\sqrt{6}$", "None of these"],
                "$5+2\\sqrt{6}$",
                "The conjugate of $a - b$ is $a + b$. So, the conjugate of $5 - 2\\sqrt{6}$ is $5 + 2\\sqrt{6}$."
            ),
            createQuestion(9,
                "Find $a$ and $b$ if $\\frac{3+\\sqrt{7}}{3-\\sqrt{7}} = a + b\\sqrt{7}$.",
                ["$a=8, b=3$", "$a=8, b=\\sqrt{7}$", "$a=16, b=6$", "$a=8, b=6$"],
                "$a=8, b=3$",
                "Rationalise: $\\frac{(3+\\sqrt{7})^2}{9-7} = \\frac{9+7+6\\sqrt{7}}{2} = \\frac{16+6\\sqrt{7}}{2} = 8 + 3\\sqrt{7}$. So $a=8, b=3$."
            ),
            createQuestion(10,
                "Rationalise the denominator: $\\frac{1}{7+3\\sqrt{5}}$.",
                ["$\\frac{7-3\\sqrt{5}}{4}$", "$\\frac{7+3\\sqrt{5}}{4}$", "$\\frac{7-3\\sqrt{5}}{94}$", "$7-3\\sqrt{5}$"],
                "$\\frac{7-3\\sqrt{5}}{4}$",
                "Multiply by $(7-3\\sqrt{5})$: $\\frac{7-3\\sqrt{5}}{49 - (3\\sqrt{5})^2} = \\frac{7-3\\sqrt{5}}{49 - 45} = \\frac{7-3\\sqrt{5}}{4}$."
            )
        ];
    };

    useEffect(() => {
        setQuestions(generateQuestions());
        startSession({ nodeId, sessionType: 'practice' });
    }, []);

    useEffect(() => {
        const savedAnswer = answers[qIndex];
        if (savedAnswer) {
            setSelectedOption(savedAnswer.selectedOption);
            setIsCorrect(savedAnswer.isCorrect);
            setIsSubmitted(true);
        } else {
            setSelectedOption(null);
            setIsCorrect(false);
            setIsSubmitted(false);
        }
    }, [qIndex, answers]);

    useEffect(() => {
        let timer;
        if (!showReportModal) {
            timer = setInterval(() => setTimeElapsed(p => p + 1), 1000);
        }
        return () => clearInterval(timer);
    }, [showReportModal]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const handleCheck = () => {
        if (!selectedOption) return;
        const currentQ = questions[qIndex];
        const isRight = selectedOption === currentQ.correctAnswer;
        setIsCorrect(isRight);
        setIsSubmitted(true);
        setFeedbackMessage(isRight ? "Well done!" : "Not quite. Check the steps above.");

        setAnswers(prev => ({
            ...prev,
            [qIndex]: { selectedOption, isCorrect: isRight }
        }));

        logAnswer({
            question_index: qIndex,
            answer_json: {
                question_text: currentQ.text,
                selected_option: selectedOption,
                correct_answer: currentQ.correctAnswer,
                difficulty: qIndex < 3 ? 'Easy' : qIndex < 7 ? 'Medium' : 'Hard'
            },
            is_correct: isRight ? 1 : 0
        });
    };

    const handleNext = () => {
        if (qIndex < questions.length - 1) {
            setQIndex(prev => prev + 1);
        } else {
            finishSession({
                totalQuestions: questions.length,
                questionsAnswered: Object.keys(answers).length,
                answersPayload: answers
            });
            setShowReportModal(true);
        }
    };

    if (questions.length === 0) return <div>Loading...</div>;
    const currentQuestion = questions[qIndex];

    return (
        <div className="junior-practice-page">
            <header className="junior-practice-header">
                <div style={{ fontWeight: '800', color: '#1E293B', fontSize: '1.2rem' }}>Number System</div>
                <div style={{ background: '#F1F5F9', padding: '0.5rem 1.5rem', borderRadius: '9999px', fontWeight: '700' }}>
                    Q {qIndex + 1} / {questions.length}
                </div>
                <div style={{ fontWeight: '700', color: '#64748B' }}>{formatTime(timeElapsed)}</div>
            </header>

            <main className="practice-content-wrapper">
                <div className="practice-board-container">
                    <div className="question-card-modern">
                        <div className="question-text-modern">
                            <h2 style={{ fontWeight: '800', marginBottom: '1rem', color: '#334155' }}>Rationalisation</h2>
                            <LatexText text={currentQuestion.text} />
                        </div>
                        <div className="options-grid-modern">
                            {currentQuestion.options.map((option, idx) => (
                                <button
                                    key={idx}
                                    className={`option-btn-modern ${selectedOption === option ? 'selected' : ''} ${isSubmitted && option === currentQuestion.correctAnswer ? 'correct' : ''} ${isSubmitted && selectedOption === option && !isCorrect ? 'wrong' : ''}`}
                                    onClick={() => !isSubmitted && setSelectedOption(option)}
                                    disabled={isSubmitted}
                                >
                                    <LatexText text={option} />
                                </button>
                            ))}
                        </div>
                        {isSubmitted && (
                            <div style={{ marginTop: '2rem', padding: '1.5rem', background: '#F8FAFC', borderRadius: '1rem', border: '1px solid #E2E8F0' }}>
                                <h4 style={{ fontWeight: '800', color: '#1E293B', marginBottom: '0.5rem' }}>Explanation:</h4>
                                <LatexText text={currentQuestion.solution} />
                            </div>
                        )}
                    </div>
                </div>
            </main>

            <footer className="junior-bottom-bar">
                <div className="desktop-footer-controls">
                    <button className="nav-pill-next-btn" style={{ background: '#64748B' }} onClick={() => navigate(-1)}>Exit</button>
                    {isSubmitted ? (
                        <button className="nav-pill-next-btn" onClick={handleNext}>
                            {qIndex === questions.length - 1 ? "Finish" : "Next"} <ChevronRight />
                        </button>
                    ) : (
                        <button className="nav-pill-submit-btn" onClick={handleCheck} disabled={!selectedOption}>
                            Submit <Check />
                        </button>
                    )}
                </div>
            </footer>

            <PracticeReportModal
                isOpen={showReportModal}
                stats={{
                    timeTaken: formatTime(timeElapsed),
                    correctAnswers: Object.values(answers).filter(val => val.isCorrect).length,
                    totalQuestions: questions.length
                }}
                onContinue={() => navigate(-1)}
            />
        </div>
    );
};

export default Rationalisation;
