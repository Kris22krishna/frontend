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

/* ─── Visual: Mirror Line Identification ─── */
const MirrorLineVisual = ({ type }) => {
    const s = "#31326F", f = "#4FB7B320", l = "#FF6B6B";

    if (type === 'correct') {
        return (
            <svg width="140" height="140" viewBox="0 0 100 100">
                <path d="M50,10 L90,50 L50,90 L10,50 Z" fill={f} stroke={s} strokeWidth="2" />
                <line x1="50" y1="5" x2="50" y2="95" stroke={l} strokeWidth="2" strokeDasharray="5,5" />
                <text x="50" y="98" textAnchor="middle" fontSize="8" fill={l}>Symmetric</text>
            </svg>
        );
    }
    if (type === 'incorrect') {
        return (
            <svg width="140" height="140" viewBox="0 0 100 100">
                <rect x="20" y="30" width="60" height="40" fill={f} stroke={s} strokeWidth="2" />
                <line x1="20" y1="30" x2="80" y2="70" stroke={l} strokeWidth="2" strokeDasharray="5,5" />
                <text x="50" y="90" textAnchor="middle" fontSize="8" fill={l}>Not Symmetric</text>
            </svg>
        );
    }
    return null;
};

/* ─── Visual: Mirror Reflection (Letter R) ─── */
const MirrorReflectionR = () => {
    const s = "#31326F", m = "#FF6B6B";
    return (
        <svg width="200" height="120" viewBox="0 0 200 100">
            {/* Original R */}
            <text x="60" y="70" textAnchor="middle" fontSize="60" fontFamily="sans-serif" fontWeight="bold" fill={s}>R</text>
            <text x="60" y="95" textAnchor="middle" fontSize="10" fill={s}>Original</text>

            {/* Mirror Line */}
            <line x1="100" y1="10" x2="100" y2="90" stroke={m} strokeWidth="2" strokeDasharray="5,3" />

            {/* Reflected R */}
            <g transform="scale(-1, 1) translate(-200, 0)">
                <text x="60" y="70" textAnchor="middle" fontSize="60" fontFamily="sans-serif" fontWeight="bold" fill={s} opacity="0.6">R</text>
            </g>
            <text x="140" y="95" textAnchor="middle" fontSize="10" fill={s} opacity="0.6">Image</text>
        </svg>
    );
};

/* ─── Visual: Half Butterfly (Completing Figure) ─── */
const HalfButterflyVisual = () => {
    const s = "#31326F", f = "#4FB7B320", l = "#FF6B6B";
    return (
        <svg width="160" height="140" viewBox="0 0 120 100">
            {/* Left Half (Solid) */}
            <path d="M60,20 Q30,0 30,30 Q30,50 60,50 Q30,50 30,80 Q30,100 60,90 Z"
                fill={f} stroke={s} strokeWidth="2" />

            {/* Mirror Line */}
            <line x1="60" y1="10" x2="60" y2="95" stroke={l} strokeWidth="2" strokeDasharray="5,5" />

            {/* Right Half (Dotted/Ghost) */}
            <path d="M60,20 Q90,0 90,30 Q90,50 60,50 Q90,50 90,80 Q90,100 60,90 Z"
                fill="none" stroke={s} strokeWidth="1" strokeDasharray="3,3" opacity="0.5" />

            <text x="60" y="105" textAnchor="middle" fontSize="8" fill={s}>Complete the Image</text>
        </svg>
    );
};

/* ─── Visual: Paper Folding (Holes) ─── */
const PaperFoldingVisual = ({ holes }) => {
    const s = "#31326F", f = "#FFFFFF", p = "#E0E0E0";
    if (holes === 1) {
        return (
            <svg width="140" height="140" viewBox="0 0 100 100">
                <rect x="20" y="20" width="60" height="60" fill={f} stroke={s} strokeWidth="2" />
                <line x1="50" y1="20" x2="50" y2="80" stroke={s} strokeWidth="1" strokeDasharray="3,3" />
                {/* Folded view suggestion */}
                <path d="M20,20 L50,20 L50,80 L20,80 Z" fill={p} opacity="0.3" />
                <circle cx="35" cy="35" r="3" fill="#000" />
                {/* Unfolded hole */}
                <circle cx="65" cy="35" r="3" fill="#000" opacity="0.5" stroke={s} strokeWidth="0.5" strokeDasharray="2,2" />
            </svg>
        );
    }
    if (holes === 2) {
        // Folded twice (center hole)
        return (
            <svg width="140" height="140" viewBox="0 0 100 100">
                <rect x="20" y="20" width="60" height="60" fill={f} stroke={s} strokeWidth="2" />
                <line x1="50" y1="20" x2="50" y2="80" stroke={s} strokeWidth="1" strokeDasharray="3,3" />
                <line x1="20" y1="50" x2="80" y2="50" stroke={s} strokeWidth="1" strokeDasharray="3,3" />
                <circle cx="50" cy="50" r="4" fill="#000" />
            </svg>
        );
    }
    return null;
};

const MirrorReflectionSymmetry = () => {
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

    const SKILL_ID = 1086;
    const SKILL_NAME = "Class 7 - Symmetry - Mirror Reflection";

    const pickRandom = (arr, n) => {
        const shuffled = [...arr].sort(() => Math.random() - 0.5);
        return shuffled.slice(0, n);
    };

    useEffect(() => {
        const shuffle = arr => [...arr].sort(() => Math.random() - 0.5);

        // ── Subtopic 3.1 POOL: Mirror Line (pick 3) ──
        const linePool = [
            () => ({
                text: `<p>A line that divides a figure into two identical halves, like a mirror image, is called a:</p>`,
                correctAnswer: "Mirror Line (Line of Symmetry)",
                options: shuffle(["Mirror Line (Line of Symmetry)", "Diagonal", "Perimeter", "Radius"]),
                solution: `<p>A <b>Mirror Line</b> acts as the axis of symmetry, dividing the figure into two matching halves.</p>`
            }),
            () => ({
                text: `<p>Is the dotted line in this figure a valid mirror line?</p>`,
                visual: <MirrorLineVisual type="correct" />,
                correctAnswer: "Yes",
                options: ["Yes", "No", "Only for the top half", "Can't say"],
                solution: `<p>Yes, the dotted line passes through the center and divides the kite shape into two identical mirror halves.</p>`
            }),
            () => ({
                text: `<p>Is the dotted line in this rectangle a valid mirror line?</p>`,
                visual: <MirrorLineVisual type="incorrect" />,
                correctAnswer: "No",
                options: ["No", "Yes", "Maybe", "Only if it is a square"],
                solution: `<p>No, a diagonal is NOT a line of symmetry for a general rectangle (unless it is a square), because the folding does not overlap exactly.</p>`
            })
        ];

        // ── Subtopic 3.2 POOL: Mirror Image / Reversal (pick 3) ──
        const reversalPool = [
            () => ({
                text: `<p>When an object is placed before a mirror, the image undergoes:</p>`,
                correctAnswer: "Lateral Inversion (Left-Right Reversal)",
                options: shuffle(["Lateral Inversion (Left-Right Reversal)", "Vertical Inversion (Upside Down)", "Rotation", "Expansion"]),
                solution: `<p>The image in a plane mirror is <b>laterally inverted</b>, meaning left becomes right and right becomes left.</p>`
            }),
            () => ({
                text: `<p>Which of these letters will look both <b>Upright</b> and <b>Identical</b> to the original in a vertical mirror?</p>`,
                correctAnswer: "M",
                options: shuffle(["M", "P", "R", "L"]),
                solution: `<p>The letter <b>M</b> has a vertical line of symmetry, so its mirror image looks exactly the same.</p>`
            }),
            () => ({
                text: `<p>What happens to the letter <b>R</b> in a mirror?</p>`,
                visual: <MirrorReflectionR />,
                correctAnswer: "It gets laterally inverted",
                options: shuffle(["It gets laterally inverted", "It becomes upside down", "It remains unchanged", "It disappears"]),
                solution: `<p>As shown, the letter <b>R</b> is reversed left-to-right (lateral inversion).</p>`
            })
        ];

        // ── Subtopic 3.3 POOL: Completing Figures (pick 2) ──
        const completePool = [
            () => ({
                text: `<p>If one half of a butterfly is drawn on one side of a mirror line, the other half will be:</p>`,
                visual: <HalfButterflyVisual />,
                correctAnswer: "A symmetrical reflection of the first half",
                options: shuffle(["A symmetrical reflection of the first half", "A rotation of the first half", "Different shape", "Upside down"]),
                solution: `<p>To complete the figure, you draw the mirror image of the given half across the axis of symmetry.</p>`
            }),
            () => ({
                text: `<p>To complete a figure using a mirror line, corresponding points on the image must be:</p>`,
                correctAnswer: "Equidistant from the mirror line",
                options: shuffle(["Equidistant from the mirror line", "Farther away", "Closer to the line", "Randomly placed"]),
                solution: `<p>In reflection, the image point is at the same distance behind the mirror as the object point is in front.</p>`
            })
        ];

        // ── Subtopic 3.4 POOL: Folding Activity (pick 2) ──
        const foldingPool = [
            () => ({
                text: `<p>A paper is folded once and a hole is punched. When unfolded, how many holes will you see?</p>`,
                visual: <PaperFoldingVisual holes={1} />,
                correctAnswer: "2",
                options: ["1", "2", "4", "3"],
                solution: `<p>Folding once creates 2 layers. Punching 1 hole goes through both layers, so unfolding shows <b>2</b> symmetric holes.</p>`
            }),
            () => ({
                text: `<p>A square paper is folded twice (quarters) and a hole is punched at the center corner. When unfolded, where is the hole?</p>`,
                visual: <PaperFoldingVisual holes={2} />,
                correctAnswer: "One hole at the center",
                options: shuffle(["One hole at the center", "4 holes at corners", "2 holes in middle", "No hole"]),
                solution: `<p>If punched exactly at the folded corner corresponding to the center, it creates one single hole at the center of the unfolded square.</p>`
            })
        ];

        // Pick 10 questions total
        const selected = [
            ...pickRandom(linePool, 3).map(fn => fn()),
            ...pickRandom(reversalPool, 3).map(fn => fn()),
            ...pickRandom(completePool, 2).map(fn => fn()),
            ...pickRandom(foldingPool, 2).map(fn => fn()),
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
                <div className="header-left"><span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#31326F' }}>Mirror Symmetry</span></div>
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
                            {cq.visual && <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>{cq.visual}</div>}
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

export default MirrorReflectionSymmetry;
