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
const TermsVisual = ({ type, data }) => {
    const s = "#31326F", f = "#4FB7B320", l = "#FF6B6B";

    if (type === 'tree_diagram') {
        return (
            <svg width="200" height="120" viewBox="0 0 200 120">
                <text x="100" y="20" fontSize="14" fill={s} textAnchor="middle" fontWeight="bold">5xy + 10</text>

                {/* Branches to Terms */}
                <line x1="100" y1="30" x2="60" y2="60" stroke={s} strokeWidth="1" />
                <line x1="100" y1="30" x2="140" y2="60" stroke={s} strokeWidth="1" />

                <text x="60" y="80" fontSize="12" fill={l} textAnchor="middle" fontWeight="bold">5xy</text>
                <text x="140" y="80" fontSize="12" fill={l} textAnchor="middle" fontWeight="bold">10</text>

                <text x="100" y="110" fontSize="10" fill={s} textAnchor="middle">Terms</text>
            </svg>
        );
    }

    // Maybe a table visual? Not strictly needed if text is clear.
    return null;
};

/* ─── Main Component ─── */
const TermsFactors = () => {
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

    const SKILL_ID = "1095";
    const SKILL_NAME = "Class 7 - Algebraic Expressions - Terms and Factors";

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
        // ── Subtopic 2.1: Terms of an Expression ──
        const termsPool = [
            () => ({
                text: `<p>Identify the terms in the expression: \\(x + 5\\).</p>`,
                correctAnswer: "\\(x\\) and \\(5\\)",
                options: shuffle(["\\(x\\) and \\(5\\)", "\\(x\\) only", "\\(5\\) only", "\\(5x\\)"]),
                solution: `<p>The parts of an expression separated by + or - are terms. Here, \\(x\\) and \\(5\\).</p>`
            }),
            () => ({
                text: `<p>Identify the terms in the expression: \\(4x - 3y\\).</p>`,
                correctAnswer: "\\(4x\\) and \\(-3y\\)",
                options: shuffle(["\\(4x\\) and \\(-3y\\)", "\\(4x\\) and \\(3y\\)", "\\(4, x, 3, y\\)", "\\(4x - 3y\\)"]),
                solution: `<p>The terms are \\(4x\\) and \\(-3y\\) (include the sign).</p>`
            }),
            () => ({
                text: `<p>How many terms are in \\(a^2 + b^2 - 2ab + 5\\)?</p>`,
                correctAnswer: "4",
                options: shuffle(["4", "3", "2", "5"]),
                solution: `<p>The terms are \\(a^2\\), \\(b^2\\), \\(-2ab\\), and \\(5\\). Count = 4.</p>`
            }),
            () => ({
                text: `<p>Identify terms in: \\(xy + yz + zx\\).</p>`,
                correctAnswer: "\\(xy, yz, zx\\)",
                options: shuffle(["\\(xy, yz, zx\\)", "\\(x, y, z\\)", "\\(3\\)", "\\(xy + yz\\)"]),
                solution: `<p>There are three terms separated by plus signs.</p>`
            }),
            () => ({
                text: `<p>What are the terms of \\(1 - a - b\\)?</p>`,
                correctAnswer: "\\(1, -a, -b\\)",
                options: shuffle(["\\(1, -a, -b\\)", "\\(1, a, b\\)", "\\(-a, -b\\)", "\\(1, -ab\\)"]),
                solution: `<p>Don't forget the negative signs! Terms are \\(1\\), \\(-a\\), \\(-b\\).</p>`
            })
        ];

        // ── Subtopic 2.2: Factors of a Term ──
        const factorsPool = [
            () => ({
                text: `<p>What are the factors of term \\(5xy\\)?</p>`,
                visual: { type: 'tree_diagram' },
                correctAnswer: "5, x, and y",
                options: shuffle(["5, x, and y", "5 and xy", "5x and y", "None"]),
                solution: `<p>Factors are numbers and variables multiplied. \\(5 \times x \times y\\).</p>`
            }),
            () => ({
                text: `<p>What are the factors of \\(-ab\\)?</p>`,
                correctAnswer: "-1, a, b",
                options: shuffle(["-1, a, b", "a, b", "1, a, b", "-a, b"]),
                solution: `<p>\\(-ab = -1 \times a \times b\\).</p>`
            }),
            () => ({
                text: `<p>Identify the factors of \\(4x^2\\).</p>`,
                correctAnswer: "4, x, x",
                options: shuffle(["4, x, x", "4, x", "2, x", "4x, x"]),
                solution: `<p>\\(4x^2 = 4 \times x \times x\\). (Tree diagram would show these branches).</p>`
            }),
            () => ({
                text: `<p>Find factors of the term \\(10pq\\).</p>`,
                correctAnswer: "10, p, q",
                options: shuffle(["10, p, q", "1, 0, p, q", "10p, q", "10, pq"]),
                solution: `<p>The factors are \\(10\\), \\(p\\), and \\(q\\).</p>`
            }),
            () => ({
                text: `<p>Factors of \\(-5z\\)?</p>`,
                correctAnswer: "-5, z",
                options: shuffle(["-5, z", "5, z", "-1, 5, z", "-5z"]),
                solution: `<p>Numerical factor is -5, algebraic factor is z.</p>`
            })
        ];

        // Pick: 5 from terms, 5 from factors -> 10 Total
        const selected = [
            ...pickRandom(termsPool, 5).map(fn => fn()),
            ...pickRandom(factorsPool, 5).map(fn => fn()),
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
                <div className="header-left"><span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#31326F' }}>Terms & Factors</span></div>
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
                            {cq.visual && <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}><TermsVisual {...cq.visual} /></div>}
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

export default TermsFactors;
