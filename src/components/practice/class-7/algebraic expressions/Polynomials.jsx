import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, X, Eye, ChevronRight, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../../../services/api';
import { useSessionLogger } from '@/hooks/useSessionLogger';
import LatexContent from '../../../LatexContent';
import ExplanationModal from '../../../ExplanationModal';
import mascotImg from '../../../../assets/mascot.png';
import '../../../../pages/middle/class-7/Class7PracticeLayout.css';

const CORRECT_MESSAGES = ["✨ Amazing!", "🌟 Brilliant!", "🎉 Correct!", "🚀 Super!", "💎 Excellent!"];

/* ─── SVG Visuals ─── */
const PolynomialsVisual = ({ type, data }) => {
    // Maybe visual showing blocks? e.g. Monomial = 1 block, Binomial = 2 blocks?
    // Let's keep it simple for now.
    return null;
};

/* ─── Main Component ─── */
const Polynomials = () => {
    const navigate = useNavigate();
    const [questions, setQuestions] = useState([]);
    const [qIndex, setQIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [showReport, setShowReport] = useState(false);
    const [finalTime, setFinalTime] = useState(0);
    const [showExplanationModal, setShowExplanationModal] = useState(false);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [feedbackMessage, setFeedbackMessage] = useState("");
    const [answers, setAnswers] = useState({});
    const [sessionId, setSessionId] = useState(null);
    const questionStartTime = useRef(Date.now());
    const accumulatedTime = useRef(0);
    const isTabActive = useRef(true);

    const SKILL_ID = "1098";
    const { startSession, logAnswer, finishSession } = useSessionLogger();
    const v4AnswersPayload = useRef([]);
    const v4IsFinishedRef = useRef(false);
    const SKILL_NAME = "Class 7 - Algebraic Expressions - Types of Expressions";

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
        // ── Subtopic 4.1: Monomials ──
        const monomialsPool = [
            () => ({
                text: `<p>Classify the expression \\(7xy\\) as Monomial, Binomial, or Trinomial.</p>`,
                correctAnswer: "Monomial",
                options: shuffle(["Monomial", "Binomial", "Trinomial", "None"]),
                solution: `<p>It has only ONE term \\(7xy\\). So, it is a <b>Monomial</b>.</p>`
            }),
            () => ({
                text: `<p>Classify \\(100\\).</p>`,
                correctAnswer: "Monomial",
                options: shuffle(["Monomial", "Binomial", "Trinomial", "Constant"]),
                solution: `<p>It has only ONE term (a constant). So, it is a <b>Monomial</b>.</p>`
            }),
            () => ({
                text: `<p>Which of the following is a Monomial?</p>`,
                correctAnswer: "\\(4p^2q\\)",
                options: shuffle(["\\(4p^2q\\)", "\\(p+q\\)", "\\(2x-3y\\)", "\\(a+b+c\\)"]),
                solution: `<p>\\(4p^2q\\) is a single term.</p>`
            }),
            () => ({
                text: `<p>Classify: \\(-9\\).</p>`,
                correctAnswer: "Monomial",
                options: shuffle(["Monomial", "Binomial", "Trinomial", "Variable"]),
                solution: `<p>A constant is a monomial.</p>`
            })
        ];

        // ── Subtopic 4.2: Binomials and Trinomials ──
        const biTriPool = [
            () => ({
                text: `<p>Classify \\(x + y - xy\\).</p>`,
                correctAnswer: "Trinomial",
                options: shuffle(["Trinomial", "Binomial", "Monomial", "Polynomial"]),
                solution: `<p>It has THREE unlike terms: \\(x\\), \\(y\\), and \\(-xy\\). So, it is a <b>Trinomial</b>.</p>`
            }),
            () => ({
                text: `<p>Classify \\(z^2 - 3z + 8\\).</p>`,
                correctAnswer: "Trinomial",
                options: shuffle(["Trinomial", "Binomial", "Monomial", "Quadratic"]),
                solution: `<p>It has THREE terms. So, it is a <b>Trinomial</b>.</p>`
            }),
            () => ({
                text: `<p>Classify \\(a^2 + b^2\\).</p>`,
                correctAnswer: "Binomial",
                options: shuffle(["Binomial", "Monomial", "Trinomial", "Polynomial"]),
                solution: `<p>It has TWO terms. So, it is a <b>Binomial</b>.</p>`
            }),
            () => ({
                text: `<p>Classify \\(4p^2q - 4pq^2\\).</p>`,
                correctAnswer: "Binomial",
                options: shuffle(["Binomial", "Monomial", "Trinomial", "Equation"]),
                solution: `<p>It has TWO unlike terms. So, it is a <b>Binomial</b>.</p>`
            }),
            () => ({
                text: `<p>Which is a Trinomial?</p>`,
                correctAnswer: "\\(x+y+z\\)",
                options: shuffle(["\\(x+y+z\\)", "\\(xy+z\\)", "\\(x+y\\)", "\\(xyz\\)"]),
                solution: `<p>\\(x+y+z\\) has three terms.</p>`
            })
        ];

        // ── Subtopic 4.3: General Polynomials ──
        const polyPool = [
            () => ({
                text: `<p>Classify \\(ab - a - b\\).</p>`,
                correctAnswer: "Trinomial",
                options: shuffle(["Trinomial", "Binomial", "Monomial", "Quadrinomial"]),
                solution: `<p>Three terms → <b>Trinomial</b>.</p>`
            }),
            () => ({
                text: `<p>Classify \\(1 + x + x^2 + x^3\\).</p>`,
                correctAnswer: "Polynomial",
                options: shuffle(["Polynomial", "Trinomial", "Binomial", "Monomial"]),
                solution: `<p>It has four terms. Any expression with one or more terms is a polynomial, but specifically this is a polynomial (often called quadrinomial, but general term is Polynomial).</p>`
            }),
            () => ({
                text: `<p>Is \\(7mn\\) a polynomial?</p>`,
                correctAnswer: "Yes",
                options: shuffle(["Yes", "No", "Only if m,n are integers", "Only if >1 term"]),
                solution: `<p>Yes, a monomial is also a polynomial (a polynomial with 1 term).</p>`
            }),
            () => ({
                text: `<p>How many terms in \\(3x^2 - 2x + 5y - 7\\)?</p>`,
                correctAnswer: "4",
                options: shuffle(["4", "3", "2", "5"]),
                solution: `<p>4 distinct terms. It is a Polynomial.</p>`
            })
        ];

        // Pick: 3 from mono, 4 from bi/tri, 3 from poly -> 10 questions
        const selected = [
            ...pickRandom(monomialsPool, 3).map(fn => fn()),
            ...pickRandom(biTriPool, 4).map(fn => fn()),
            ...pickRandom(polyPool, 3).map(fn => fn()),
        ];

        setQuestions(selected);
    }, []);

    useEffect(() => {
        const uid = sessionStorage.getItem('userId') || localStorage.getItem('userId');
        if (uid && !sessionId) api.createPracticeSession(uid, SKILL_ID).then(s => s && setSessionId(s.session_id)).catch(console.error);
        startSession({ nodeId: 'a4071012-0006-0000-0000-000000000000', sessionType: 'practice' });
        v4AnswersPayload.current = [];
        v4IsFinishedRef.current = false;
        const timer = setInterval(() => setTimeElapsed(p => p + 1), 1000);
        const hv = () => { if (document.hidden) { accumulatedTime.current += Date.now() - questionStartTime.current; isTabActive.current = false; } else { questionStartTime.current = Date.now(); isTabActive.current = true; } };
        document.addEventListener("visibilitychange", hv);
        return () => { clearInterval(timer); document.removeEventListener("visibilitychange", hv); };
    }, [sessionId]);

    const recordAttempt = async (q, sel, cor) => {
        const uid = sessionStorage.getItem('userId') || localStorage.getItem('userId');
        if (!uid) return;
        let t = accumulatedTime.current; if (isTabActive.current) t += Date.now() - questionStartTime.current;
        try { await api.recordAttempt({ user_id: parseInt(uid), session_id: sessionId, skill_id: SKILL_ID, difficulty_level: 'Medium', question_text: String(q.text), correct_answer: String(q.correctAnswer), student_answer: String(sel), is_correct: cor, solution_text: String(q.solution), time_spent_seconds: Math.max(0, Math.round(t / 1000)) });
        const _v4t = Date.now() - questionStartTime.current;
        v4AnswersPayload.current.push({
            question_index: typeof qIndex !== 'undefined' ? qIndex : 0,
            answer_json: JSON.stringify({ selected: selectedOption }),
            is_correct: isRight !== undefined ? isRight : (typeof isCorrect !== 'undefined' ? isCorrect : false),
            marks_awarded: (isRight !== undefined ? isRight : false) ? 1 : 0,
            marks_possible: 1,
            time_taken_ms: _v4t > 0 ? _v4t : 0,
        }); } catch (e) { console.error(e); }
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
            if (!v4IsFinishedRef.current) {
                v4IsFinishedRef.current = true;
                finishSession({ answers_payload: v4AnswersPayload.current });
            }
            if (sessionId) await api.finishSession(sessionId).catch(console.error);
            const uid = sessionStorage.getItem('userId') || localStorage.getItem('userId');
            if (uid) {
                const c = Object.values(answers).filter(v => v.isCorrect).length;
                await api.createReport({
                uid: parseInt(uid),
                category: 'Practice',
                reportData: {
                    skill_id: SKILL_ID, skill_name: SKILL_NAME, total_questions: questions.length, correct_answers: c, time_taken_seconds: timeElapsed,
                    score: (c / questions.length) * 100,
                    type: 'Practice'
                }
            }).catch(console.error);
            }
            setFinalTime(timeElapsed);
            setShowReport(true);
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

    
    if (showReport) {
        return (
            <div className="junior-practice-page raksha-theme" style={{ fontFamily: '"Open Sans", sans-serif', padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: '#f8f9fa' }}>
                <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} style={{ background: 'white', padding: '3rem', borderRadius: '24px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', textAlign: 'center', maxWidth: '500px', width: '100%' }}>
                    <h1 style={{ fontSize: '2.5rem', color: '#31326F', marginBottom: '1rem', fontWeight: 'bold' }}>Practice Complete! 🎉</h1>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', margin: '2rem 0' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 1.5rem', background: '#f8f9fa', borderRadius: '16px', fontSize: '1.2rem' }}>
                            <span style={{ color: '#666', fontWeight: '600' }}>Time Taken:</span>
                            <span style={{ color: '#31326F', fontWeight: 'bold', fontSize: '1.4rem' }}>{Math.floor(finalTime / 60)}:{(finalTime % 60).toString().padStart(2, '0')}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 1.5rem', background: '#f0fdf4', borderRadius: '16px', fontSize: '1.2rem' }}>
                            <span style={{ color: '#16a34a', fontWeight: '600' }}>Correct Answers:</span>
                            <span style={{ color: '#15803d', fontWeight: 'bold', fontSize: '1.4rem' }}>{Object.values(answers).filter((v) => v.isCorrect).length} / {questions.length}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 1.5rem', background: '#fef2f2', borderRadius: '16px', fontSize: '1.2rem' }}>
                            <span style={{ color: '#dc2626', fontWeight: '600' }}>Wrong Answers:</span>
                            <span style={{ color: '#b91c1c', fontWeight: 'bold', fontSize: '1.4rem' }}>{questions.length - Object.values(answers).filter((v) => v.isCorrect).length} / {questions.length}</span>
                        </div>
                    </div>
                    <button onClick={() => navigate(-1)} style={{ width: '100%', padding: '1rem', background: '#31326F', color: 'white', border: 'none', borderRadius: '16px', fontSize: '1.2rem', fontWeight: 'bold', cursor: 'pointer', marginTop: '1rem', boxShadow: '0 4px 12px rgba(49, 50, 111, 0.2)' }} onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'} onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                        Continue
                    </button>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="junior-practice-page raksha-theme" style={{ fontFamily: '"Open Sans", sans-serif' }}>
            <header className="junior-practice-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 2rem' }}>
                <div className="header-left"><span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#31326F' }}>Polynomials</span></div>
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
                        <div className="c7-question-card" style={{ paddingLeft: '2rem' }}>
                            <div className="c7-question-header">
                                <h2 className="c7-question-text" style={{ fontSize: 'clamp(1rem, 2vw, 1.6rem)', maxHeight: 'none', fontWeight: '500', textAlign: 'left', justifyContent: 'flex-start', overflow: 'visible' }}><LatexContent html={cq.text} /></h2>
                            </div>
                            {cq.visual && <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}><PolynomialsVisual {...cq.visual} /></div>}
                            <div className="c7-interaction-area">
                                <div className="c7-options-grid">
                                    {cq.options.map((opt, i) => (
                                        <button key={i} className={`c7-option-btn ${selectedOption === opt ? 'selected' : ''} ${isSubmitted && opt === cq.correctAnswer ? 'correct' : ''} ${isSubmitted && selectedOption === opt && !isCorrect ? 'wrong' : ''}`} onClick={() => !isSubmitted && setSelectedOption(opt)} disabled={isSubmitted}><LatexContent html={opt} /></button>
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

export default Polynomials;
