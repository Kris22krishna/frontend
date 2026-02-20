import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, X, Eye, ChevronRight, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../../../services/api';
import LatexContent from '../../../LatexContent';
import ExplanationModal from '../../../ExplanationModal';
import mascotImg from '../../../../assets/mascot.png';
import '../../../../pages/juniors/JuniorPracticeSession.css';

const CORRECT_MESSAGES = ["✨ Amazing!", "🌟 Brilliant!", "🎉 Correct!", "🚀 Super!", "💎 Excellent!"];

/* ─── SVG Visuals ─── */
const FindingValueVisual = ({ type, data }) => {
    // Maybe a visual for substitution? 
    // e.g. Box with x=2, putting it into x+5
    if (type === 'substitution_box') {
        return (
            <svg width="200" height="100" viewBox="0 0 200 100">
                <rect x="20" y="20" width="50" height="50" rx="5" fill="#4FB7B320" stroke="#31326F" strokeWidth="2" />
                <text x="45" y="50" fontSize="16" fill="#31326F" textAnchor="middle" fontWeight="bold">x=2</text>

                <path d="M80,45 L110,45" stroke="#FF6B6B" strokeWidth="2" markerEnd="url(#arrow)" />
                <defs><marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#FF6B6B" /></marker></defs>

                <rect x="120" y="20" width="60" height="50" rx="5" fill="#31326F10" stroke="#31326F" strokeWidth="2" />
                <text x="150" y="50" fontSize="16" fill="#31326F" textAnchor="middle" fontWeight="bold">10 - x</text>
            </svg>
        );
    }
    return null;
};

/* ─── Main Component ─── */
const FindingValue = () => {
    const navigate = useNavigate();
    const [questions, setQuestions] = useState([]);
    const [qIndex, setQIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [showExplanationModal, setShowExplanationModal] = useState(false);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [feedbackMessage, setFeedbackMessage] = useState("");
    const [answers, setAnswers] = useState({});
    const [sessionId, setSessionId] = useState(null);
    const questionStartTime = useRef(Date.now());
    const accumulatedTime = useRef(0);
    const isTabActive = useRef(true);

    const SKILL_ID = "1099";
    const SKILL_NAME = "Class 7 - Algebraic Expressions - Finding Value";

    /* ─── Helper: pick N random items from an array ─── */
    const pickRandom = (arr, n) => {
        const shuffled = [...arr].sort(() => Math.random() - 0.5);
        return shuffled.slice(0, n);
    };

    /* ─── Helper: Shuffle options ensuring no duplicates ─── */
    const shuffle = (array) => {
        return [...new Set(array)].sort(() => Math.random() - 0.5);
    };

    useEffect(() => {
        // ── Subtopic 5.1: Simple Expressions (One variable) ──
        const simplePool = [
            () => ({
                text: `<p>Find the value of \\(x + 4\\) for \\(x = 2\\).</p>`,
                correctAnswer: "6",
                options: shuffle(["6", "2", "8", "4"]),
                solution: `<p>Substitute \\(x = 2\\): <br/>\\(2 + 4 = 6\\).</p>`
            }),
            () => ({
                text: `<p>Find the value of \\(10 - x\\) for \\(x = 2\\).</p>`,
                visual: { type: 'substitution_box' },
                correctAnswer: "8",
                options: shuffle(["8", "12", "-8", "20"]),
                solution: `<p>Substitute \\(x = 2\\): <br/>\\(10 - 2 = 8\\).</p>`
            }),
            () => ({
                text: `<p>Find the value of \\(19 - 5x^2\\) for \\(x = 2\\).</p>`,
                correctAnswer: "-1",
                options: shuffle(["-1", "9", "39", "-21"]),
                solution: `<p>Substitute \\(x = 2\\): <br/>\\(5(2)^2 = 5(4) = 20\\). <br/>\\(19 - 20 = -1\\).</p>`
            }),
            () => ({
                text: `<p>Find the value of \\(100 - 10x^3\\) for \\(x = 2\\).</p>`,
                correctAnswer: "20",
                options: shuffle(["20", "80", "-60", "90"]),
                solution: `<p>Substitute \\(x = 2\\): <br/>\\(10(2)^3 = 10(8) = 80\\). <br/>\\(100 - 80 = 20\\).</p>`
            }),
            () => ({
                text: `<p>Find value of \\(3x - 5\\) if \\(x = 0\\).</p>`,
                correctAnswer: "-5",
                options: shuffle(["-5", "5", "3", "0"]),
                solution: `<p>Substitute \\(x = 0\\): <br/>\\(3(0) - 5 = 0 - 5 = -5\\).</p>`
            })
        ];

        // ── Subtopic 5.2: Complex Expressions (Multiple variables or powers) ──
        const complexPool = [
            () => ({
                text: `<p>Find the value of \\(n^2 - 2n\\) for \\(n = -2\\).</p>`,
                correctAnswer: "8",
                options: shuffle(["8", "0", "4", "-8"]),
                solution: `<p>Substitute \\(n = -2\\): <br/>\\((-2)^2 - 2(-2)\\) <br/>= \\(4 - (-4)\\) <br/>= \\(4 + 4 = 8\\).</p>`
            }),
            () => ({
                text: `<p>Find the value of \\(a^2 + 2ab + b^2\\) for \\(a = 3, b = 2\\).</p>`,
                correctAnswer: "25",
                options: shuffle(["25", "13", "19", "36"]),
                solution: `<p>Substitute \\(a = 3, b = 2\\): <br/>\\(3^2 + 2(3)(2) + 2^2\\) <br/>= \\(9 + 12 + 4\\) <br/>= \\(25\\).</p>`
            }),
            () => ({
                text: `<p>Find the value of \\(a^3 - b^3\\) for \\(a = 1, b = -1\\).</p>`,
                correctAnswer: "2",
                options: shuffle(["2", "0", "-2", "1"]),
                solution: `<p>Substitute \\(a = 1, b = -1\\): <br/>\\(1^3 - (-1)^3\\) <br/>= \\(1 - (-1)\\) <br/>= \\(1 + 1 = 2\\).</p>`
            }),
            () => ({
                text: `<p>Find the value of \\(2a - 2b\\) for \\(a = -1, b = -2\\).</p>`,
                correctAnswer: "2",
                options: shuffle(["2", "-6", "-2", "6"]),
                solution: `<p>Substitute \\(a = -1, b = -2\\): <br/>\\(2(-1) - 2(-2)\\) <br/>= \\(-2 - (-4)\\) <br/>= \\(-2 + 4 = 2\\).</p>`
            }),
            () => ({
                text: `<p>Evaluate \\(p^2 + q^2\\) if \\(p=5, q=-5\\).</p>`,
                correctAnswer: "50",
                options: shuffle(["50", "0", "25", "10"]),
                solution: `<p>\\(5^2 + (-5)^2 = 25 + 25 = 50\\).</p>`
            })
        ];

        // Pick 5 from each -> 10 questions
        const selected = [
            ...pickRandom(simplePool, 5).map(fn => fn()),
            ...pickRandom(complexPool, 5).map(fn => fn()),
        ];

        setQuestions(selected);
    }, []);

    useEffect(() => {
        const uid = sessionStorage.getItem('userId') || localStorage.getItem('userId');
        if (uid && !sessionId) api.createPracticeSession(uid, SKILL_ID).then(s => s && setSessionId(s.session_id)).catch(console.error);
        const timer = setInterval(() => setTimeElapsed(p => p + 1), 1000);
        const hv = () => { if (document.hidden) { accumulatedTime.current += Date.now() - questionStartTime.current; isTabActive.current = false; } else { questionStartTime.current = Date.now(); isTabActive.current = true; } };
        document.addEventListener("visibilitychange", hv);
        return () => { clearInterval(timer); document.removeEventListener("visibilitychange", hv); };
    }, [sessionId]);

    const recordAttempt = async (q, sel, cor) => {
        const uid = sessionStorage.getItem('userId') || localStorage.getItem('userId');
        if (!uid) return;
        let t = accumulatedTime.current; if (isTabActive.current) t += Date.now() - questionStartTime.current;
        try { await api.recordAttempt({ user_id: parseInt(uid), session_id: sessionId, skill_id: SKILL_ID, difficulty_level: 'Medium', question_text: String(q.text), correct_answer: String(q.correctAnswer), student_answer: String(sel), is_correct: cor, solution_text: String(q.solution), time_spent_seconds: Math.max(0, Math.round(t / 1000)) }); } catch (e) { console.error(e); }
    };

    const handleCheck = () => {
        if (!selectedOption || !questions[qIndex]) return;
        const right = selectedOption === questions[qIndex].correctAnswer;
        setIsCorrect(right); setIsSubmitted(true);
        if (right) setFeedbackMessage(CORRECT_MESSAGES[Math.floor(Math.random() * CORRECT_MESSAGES.length)]);
        else setShowExplanationModal(true);
        setAnswers(prev => ({ ...prev, [qIndex]: { selectedOption, isCorrect: right } }));
        recordAttempt(questions[qIndex], selectedOption, right);
    };

    const handleNext = async () => {
        if (qIndex < questions.length - 1) {
            setQIndex(prev => prev + 1);
            accumulatedTime.current = 0; questionStartTime.current = Date.now();
        } else {
            if (sessionId) await api.finishSession(sessionId).catch(console.error);
            const uid = sessionStorage.getItem('userId') || localStorage.getItem('userId');
            if (uid) {
                const c = Object.values(answers).filter(v => v.isCorrect).length;
                await api.createReport({ title: SKILL_NAME, type: 'practice', score: (c / questions.length) * 100, parameters: { skill_id: SKILL_ID, skill_name: SKILL_NAME, total_questions: questions.length, correct_answers: c, time_taken_seconds: timeElapsed }, user_id: parseInt(uid) }).catch(console.error);
            }
            navigate(-1);
        }
    };

    useEffect(() => {
        const saved = answers[qIndex];
        if (saved) { setSelectedOption(saved.selectedOption); setIsCorrect(saved.isCorrect); setIsSubmitted(true); }
        else { setSelectedOption(null); setIsCorrect(false); setIsSubmitted(false); }
        setShowExplanationModal(false);
    }, [qIndex]);

    if (questions.length === 0) return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', color: '#31326F' }}>Loading questions...</div>;
    const cq = questions[qIndex];

    return (
        <div className="junior-practice-page raksha-theme" style={{ fontFamily: '"Open Sans", sans-serif' }}>
            <header className="junior-practice-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 2rem' }}>
                <div className="header-left"><span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#31326F' }}>Finding Value</span></div>
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-max">
                    <div className="bg-white/90 backdrop-blur-md px-3 py-1.5 sm:px-6 sm:py-2 rounded-full border-2 border-[#4FB7B3]/30 text-[#31326F] font-black text-sm sm:text-xl shadow-lg whitespace-nowrap">Question {qIndex + 1} / {questions.length}</div>
                </div>
                <div className="header-right">
                    <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl border-2 border-[#4FB7B3]/30 text-[#31326F] font-bold text-lg shadow-md flex items-center gap-2">{Math.floor(timeElapsed / 60)}:{(timeElapsed % 60).toString().padStart(2, '0')}</div>
                </div>
            </header>

            <main className="practice-content-wrapper">
                <div className="practice-board-container" style={{ gridTemplateColumns: '1fr', maxWidth: '800px', margin: '0 auto' }}>
                    <div className="practice-left-col" style={{ width: '100%' }}>
                        <div className="question-card-modern" style={{ paddingLeft: '2rem' }}>
                            <div className="question-header-modern">
                                <h2 className="question-text-modern" style={{ fontSize: 'clamp(1rem, 2vw, 1.6rem)', maxHeight: 'none', fontWeight: '500', textAlign: 'left', justifyContent: 'flex-start', overflow: 'visible' }}><LatexContent html={cq.text} /></h2>
                            </div>
                            {cq.visual && <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}><FindingValueVisual {...cq.visual} /></div>}
                            <div className="interaction-area-modern">
                                <div className="options-grid-modern">
                                    {cq.options.map((opt, i) => (
                                        <button key={i} className={`option-btn-modern ${selectedOption === opt ? 'selected' : ''} ${isSubmitted && opt === cq.correctAnswer ? 'correct' : ''} ${isSubmitted && selectedOption === opt && !isCorrect ? 'wrong' : ''}`} onClick={() => !isSubmitted && setSelectedOption(opt)} disabled={isSubmitted}><LatexContent html={opt} /></button>
                                    ))}
                                </div>
                                <AnimatePresence>{isSubmitted && isCorrect && (
                                    <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="feedback-mini correct" style={{ marginTop: '20px' }}><div className="flex items-center gap-3"><img src={mascotImg} alt="Mascot" className="w-12 h-12 object-contain" /><span>{feedbackMessage}</span></div></motion.div>
                                )}</AnimatePresence>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <ExplanationModal isOpen={showExplanationModal} isCorrect={isCorrect} correctAnswer={cq.correctAnswer} explanation={cq.solution} onClose={() => setShowExplanationModal(false)} />

            <footer className="junior-bottom-bar" style={{ position: 'fixed', bottom: 0 }}>
                <div className="desktop-footer-controls">
                    <div className="bottom-left"><button className="bg-red-50 text-red-500 px-6 py-2 rounded-xl border-2 border-red-100 font-bold hover:bg-red-100 transition-colors flex items-center gap-2" onClick={() => navigate(-1)}>Exit</button></div>
                    <div className="bottom-center">{isSubmitted && <button className="view-explanation-btn" onClick={() => setShowExplanationModal(true)}><Eye size={20} /> View Explanation</button>}</div>
                    <div className="bottom-right">
                        <div className="nav-buttons-group">
                            <button className="nav-pill-next-btn bg-gray-200 text-gray-600" onClick={() => setQIndex(i => Math.max(0, i - 1))} disabled={qIndex === 0}><ChevronLeft size={28} strokeWidth={3} /> Prev</button>
                            {isSubmitted ? (
                                <button className="nav-pill-next-btn" onClick={handleNext}>{qIndex < questions.length - 1 ? (<>Next <ChevronRight size={28} strokeWidth={3} /></>) : (<>Done <Check size={28} strokeWidth={3} /></>)}</button>
                            ) : (
                                <button className="nav-pill-submit-btn" onClick={handleCheck} disabled={!selectedOption}>Submit <Check size={28} strokeWidth={3} /></button>
                            )}
                        </div>
                    </div>
                </div>
                <div className="mobile-footer-controls">
                    <div className="flex items-center gap-2">
                        <button className="bg-red-50 text-red-500 p-2 rounded-lg border border-red-100" onClick={() => navigate(-1)}><X size={20} /></button>
                        {isSubmitted && <button className="view-explanation-btn" onClick={() => setShowExplanationModal(true)}><Eye size={18} /> Explain</button>}
                    </div>
                    <div className="mobile-footer-right" style={{ width: 'auto' }}>
                        <div className="nav-buttons-group">
                            <button className="nav-pill-next-btn bg-gray-200 text-gray-600 p-2" onClick={() => setQIndex(i => Math.max(0, i - 1))} disabled={qIndex === 0}><ChevronLeft size={20} /></button>
                            {isSubmitted ? (<button className="nav-pill-next-btn" onClick={handleNext}>{qIndex < questions.length - 1 ? "Next" : "Done"}</button>) : (<button className="nav-pill-submit-btn" onClick={handleCheck} disabled={!selectedOption}>Submit</button>)}
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default FindingValue;
