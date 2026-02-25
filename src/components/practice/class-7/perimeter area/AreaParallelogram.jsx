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
const ParallelogramVisual = ({ type, data }) => {
    const s = "#31326F", f = "#4FB7B320", l = "#FF6B6B";

    // Subtopic 1.1: Conversion
    if (type === 'conversion') {
        return (
            <svg width="280" height="120" viewBox="-10 0 260 100">
                {/* Original Parallelogram */}
                <path d="M20,80 L80,80 L100,20 L40,20 Z" fill={f} stroke={s} strokeWidth="2" />
                <line x1="40" y1="20" x2="40" y2="80" stroke={l} strokeWidth="1.5" strokeDasharray="4" />
                <path d="M40,75 L45,75 L45,80" fill="none" stroke={l} strokeWidth="1" />

                <text x="60" y="95" fontSize="10" fill={s} textAnchor="middle">Base</text>
                <text x="18" y="55" fontSize="10" fill={l} textAnchor="middle">Height</text>

                {/* Arrow */}
                <path d="M110,50 L130,50" stroke={s} strokeWidth="2" markerEnd="url(#arrow)" />
                <defs><marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill={s} /></marker></defs>

                {/* Converted Rectangle */}
                <rect x="150" y="20" width="60" height="60" fill={f} stroke={s} strokeWidth="2" />
                <text x="180" y="95" fontSize="10" fill={s} textAnchor="middle">Base</text>
                <text x="225" y="55" fontSize="10" fill={s} textAnchor="middle">Height</text>
            </svg>
        );
    }

    // Subtopic 1.2: Base and Height ID
    if (type === 'base_height') {
        return (
            <svg width="240" height="160" viewBox="0 0 220 150">
                <path d="M30,120 L170,120 L200,30 L60,30 Z" fill={f} stroke={s} strokeWidth="2" />
                <text x="25" y="138" fontSize="13" fontWeight="bold" fill={s}>A</text>
                <text x="175" y="138" fontSize="13" fontWeight="bold" fill={s}>B</text>
                <text x="205" y="27" fontSize="13" fontWeight="bold" fill={s}>C</text>
                <text x="53" y="27" fontSize="13" fontWeight="bold" fill={s}>D</text>

                {/* Perpendicular DE from D to AB */}
                <line x1="60" y1="30" x2="60" y2="120" stroke={l} strokeWidth="2" strokeDasharray="5" />
                <rect x="60" y="108" width="10" height="10" fill="none" stroke={l} strokeWidth="1" />
                <text x="50" y="135" fontSize="11" fill={l} textAnchor="middle">E</text>

                {/* Perpendicular BF from B to AD extended? No, simpler version */}
                {data?.showBF && (
                    <>
                        <line x1="160" y1="120" x2="50" y2="30" stroke="transparent" /> {/* Just to scale */}
                    </>
                )}
            </svg>
        );
    }

    // Subtopic 1.3: Simple dimensioned
    if (type === 'dimensions') {
        const { base, height, slant } = data;
        return (
            <svg width="200" height="140" viewBox="0 0 200 120">
                <path d="M50,100 L150,100 L170,20 L70,20 Z" fill={f} stroke={s} strokeWidth="2" />
                <line x1="70" y1="20" x2="70" y2="100" stroke={l} strokeWidth="1.5" strokeDasharray="4" />
                <rect x="70" y="90" width="10" height="10" fill="none" stroke={l} strokeWidth="1" />

                <text x="100" y="115" fontSize="12" fill={s} textAnchor="middle">{base}</text>
                <text x="65" y="60" fontSize="12" fill={l} textAnchor="end">{height}</text>
                {slant && <text x="165" y="60" fontSize="12" fill={s} textAnchor="start">{slant}</text>}
            </svg>
        );
    }

    // Subtopic 1.4: Comparison
    if (type === 'comparison') {
        return (
            <svg width="220" height="120" viewBox="0 0 220 120">
                {/* Para 1 */}
                <path d="M10,80 L60,80 L70,30 L20,30 Z" fill={f} stroke={s} strokeWidth="1.5" />
                <text x="35" y="95" fontSize="10" fill={s} textAnchor="middle">Base Same</text>
                {/* Para 2 - more slanted */}
                <path d="M100,80 L150,80 L180,30 L130,30 Z" fill={f} stroke={s} strokeWidth="1.5" />
                <text x="125" y="95" fontSize="10" fill={s} textAnchor="middle">Base Same</text>

                <line x1="10" y1="30" x2="180" y2="30" stroke="#ccc" strokeDasharray="2" />
                <text x="190" y="30" fontSize="10" fill="#999">Same Height</text>
            </svg>
        );
    }

    return null;
};

/* ─── Main Component ─── */
const AreaParallelogram = () => {
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

    const SKILL_ID = "1090"; // Local ID
    const SKILL_NAME = "Class 7 - Perimeter and Area - Area of Parallelogram";

    const pickRandom = (arr, n) => {
        const shuffled = [...arr].sort(() => Math.random() - 0.5);
        return shuffled.slice(0, n);
    };

    useEffect(() => {
        const shuffle = arr => [...arr].sort(() => Math.random() - 0.5);

        // 🔹 Subtopic 1.1: Concept
        const conceptPool = [
            () => ({
                text: `<p>If you cut a triangle from one side of a parallelogram and move it to the other side, what shape is formed?</p>`,
                visual: { type: 'conversion' },
                correctAnswer: "Rectangle",
                options: shuffle(["Rectangle", "Square", "Trapezium", "Circle"]),
                solution: `<p>Moving the triangular part creates a <b>Rectangle</b> with the same base and height, showing that Area = Base × Height.</p>`
            }),
            () => ({
                text: `<p>Why is the area of a parallelogram \\( b \\times h \\)?</p>`,
                correctAnswer: "It is equal in area to a rectangle of base b and height h",
                options: shuffle(["It is equal in area to a rectangle of base b and height h", "It is half a rectangle", "It depends on slant height", "No specific reason"]),
                solution: `<p>A parallelogram can be rearranged into a rectangle with the same base and height.</p>`
            })
        ];

        // 🔹 Subtopic 1.2: Base and Height
        const baseHeightPool = [
            () => ({
                text: `<p>In parallelogram ABCD, if DE is perpendicular to AB, then AB is the ______.</p>`,
                visual: { type: 'base_height' },
                correctAnswer: "Base",
                options: shuffle(["Base", "Height", "Diagonal", "Hypotenuse"]),
                solution: `<p>The side to which the perpendicular (height) is drawn is called the <b>Base</b>.</p>`
            }),
            () => ({
                text: `<p>In the same figure, line segment DE represents the ______ corresponding to base AB.</p>`,
                visual: { type: 'base_height' },
                correctAnswer: "Height",
                options: shuffle(["Height", "Base", "Side", "Perimeter"]),
                solution: `<p>The perpendicular distance between parallel sides is the <b>Height</b>.</p>`
            })
        ];

        // 🔹 Subtopic 1.3: Formula (b x h)
        const formulaPool = [
            () => ({
                text: `<p>Find the area of a parallelogram with base = 4 cm and height = 3 cm.</p>`,
                visual: { type: 'dimensions', data: { base: '4 cm', height: '3 cm' } },
                correctAnswer: "12 cm²",
                options: shuffle(["12 cm²", "7 cm²", "14 cm²", "6 cm²"]),
                solution: `<p>Area = Base × Height = \\( 4 \\times 3 = 12 \\text{ cm}^2 \\).</p>`
            }),
            () => ({
                text: `<p>If the area is 24 cm² and base is 4 cm, find the height.</p>`,
                visual: { type: 'dimensions', data: { base: '4 cm', height: '?' } },
                correctAnswer: "6 cm",
                options: shuffle(["6 cm", "8 cm", "12 cm", "96 cm"]),
                solution: `<p>Height = Area ÷ Base = \\( 24 \\div 4 = 6 \\text{ cm} \\).</p>`
            }),
            () => ({
                text: `<p>Find the area: Base = 8 cm, Height = 3.5 cm.</p>`,
                correctAnswer: "28 cm²",
                options: shuffle(["28 cm²", "24.5 cm²", "11.5 cm²", "32 cm²"]),
                solution: `<p>Area = \\( 8 \\times 3.5 = 28 \\text{ cm}^2 \\).</p>`
            })
        ];

        // 🔹 Subtopic 1.4: Area vs Perimeter
        const comparisonPool = [
            () => ({
                text: `<p>Two parallelograms have the same base and height. Do they have equal area?</p>`,
                visual: { type: 'comparison' },
                correctAnswer: "Yes",
                options: shuffle(["Yes", "No", "Depends on slant", "Only if congruent"]),
                solution: `<p><b>Yes</b>. Area depends only on base and height (\\( A = b \\times h \\)).</p>`
            }),
            () => ({
                text: `<p>Two parallelograms have equal area. Do they necessarily have equal perimeters?</p>`,
                correctAnswer: "No",
                options: shuffle(["No", "Yes", "Always", "If angles are same"]),
                solution: `<p><b>No</b>. You can change the slant (and thus perimeter) without changing base or height (area).</p>`
            })
        ];

        // 🔹 Subtopic 1.5: Numerical Problems
        const numericalPool = [
            () => ({
                text: `<p>Area of a parallelogram is 246 cm² and base is 20 cm. Find the height.</p>`,
                correctAnswer: "12.3 cm",
                options: shuffle(["12.3 cm", "123 cm", "1.23 cm", "12 cm"]),
                solution: `<p>Height = \\( 246 \\div 20 = 12.3 \\text{ cm} \\).</p>`
            }),
            () => ({
                text: `<p>ABCD is a parallelogram. AB = 7.2 cm and perpendicular from C on AB is 4.5 cm. Find its area.</p>`,
                correctAnswer: "32.4 cm²",
                options: shuffle(["32.4 cm²", "32.4 cm", "11.7 cm²", "28.8 cm²"]),
                solution: `<p>Area = \\( 7.2 \\times 4.5 = 32.4 \\text{ cm}^2 \\).</p>`
            })
        ];

        // Selection: 2 from Concept, 2 from BaseHeight, 3 from Formula, 1 from Comparison, 2 from Numerical
        const selected = [
            ...pickRandom(conceptPool, 2).map(fn => fn()),
            ...pickRandom(baseHeightPool, 2).map(fn => fn()),
            ...pickRandom(formulaPool, 3).map(fn => fn()),
            ...pickRandom(comparisonPool, 1).map(fn => fn()),
            ...pickRandom(numericalPool, 2).map(fn => fn())
        ];

        setQuestions(selected);
    }, []);

    // Session Management
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
                <div className="header-left"><span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#31326F' }}>Area of Parallelogram</span></div>
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
                            {cq.visual && <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}><ParallelogramVisual {...cq.visual} /></div>}
                            <div className="interaction-area-modern">
                                <div className="options-grid-modern">
                                    {cq.options.map((opt, i) => (
                                        <button key={i} className={`option-btn-modern ${selectedOption === opt ? 'selected' : ''} ${isSubmitted && opt === cq.correctAnswer ? 'correct' : ''} ${isSubmitted && selectedOption === opt && !isCorrect ? 'wrong' : ''}`} onClick={() => !isSubmitted && setSelectedOption(opt)} disabled={isSubmitted}><LatexContent html={opt} /></button>
                                    ))}
                                </div>
                                <AnimatePresence>{isSubmitted && isCorrect && (
                                    <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="feedback-mini correct" style={{ marginTop: '20px' }}><div className="flex items-center gap-3 justify-center"><img src={mascotImg} alt="Mascot" className="w-12 h-12 object-contain" /><span>{feedbackMessage}</span></div></motion.div>
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

export default AreaParallelogram;
