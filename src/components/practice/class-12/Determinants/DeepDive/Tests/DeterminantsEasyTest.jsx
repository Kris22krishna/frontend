import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, X, Eye, ChevronRight, ChevronLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { api } from '../../../../../../services/api';
import { LatexText } from '../../../../../LatexText';
import mascotImg from '../../../../../../assets/mascot.png';
import '../../../../../../pages/juniors/JuniorPracticeSession.css';

const SKILL_ID = 12210;
const SKILL_NAME = 'Determinants — Easy Test';

const DeterminantsEasyTest = () => {
    const navigate = useNavigate();
    const [questions, setQuestions] = useState([]);
    const [qIndex, setQIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [sessionId, setSessionId] = useState(null);
    const questionStartTime = useRef(Date.now());
    const accumulatedTime = useRef(0);
    const isTabActive = useRef(true);
    const [answers, setAnswers] = useState({});
    const [isFinished, setIsFinished] = useState(false);
    const [showReview, setShowReview] = useState(false);
    const [fromReview, setFromReview] = useState(false);

    useEffect(() => {
        const shuffle = arr => [...arr].sort(() => Math.random() - 0.5);
        const qs = [
            { text: 'Evaluate $\\begin{vmatrix} 7 & 1 \\\\ 5 & 2 \\end{vmatrix}$', options: shuffle(['$9$', '$14$', '$3$', '$11$']), correctAnswer: '$9$', solution: '$7 \\times 2 - 1 \\times 5 = 14 - 5 = 9$.', difficulty_level: 'Easy' },
            { text: 'Evaluate $\\begin{vmatrix} 3 & 4 \\\\ 6 & 8 \\end{vmatrix}$', options: shuffle(['$0$', '$24$', '$-24$', '$48$']), correctAnswer: '$0$', solution: '$3 \\times 8 - 4 \\times 6 = 24 - 24 = 0$.', difficulty_level: 'Easy' },
            { text: 'Expand along first row: $\\begin{vmatrix} 2 & 0 & 1 \\\\ 3 & 4 & 5 \\\\ 1 & 0 & 6 \\end{vmatrix}$', options: shuffle(['$44$', '$38$', '$24$', '$52$']), correctAnswer: '$44$', solution: '$2(24-0) - 0(18-5) + 1(0-4) = 48 - 4 = 44$.', difficulty_level: 'Medium' },
            { text: 'Find the minor $M_{11}$ of $\\begin{bmatrix} 1 & 2 & 3 \\\\ 4 & 5 & 6 \\\\ 7 & 8 & 9 \\end{bmatrix}$', options: shuffle(['$-3$', '$3$', '$-12$', '$12$']), correctAnswer: '$-3$', solution: '$M_{11} = \\begin{vmatrix} 5 & 6 \\\\ 8 & 9 \\end{vmatrix} = 45 - 48 = -3$.', difficulty_level: 'Easy' },
            { text: 'Find the cofactor of $a_{12}$ in $\\begin{bmatrix} 2 & 3 \\\\ 4 & 5 \\end{bmatrix}$', options: shuffle(['$-4$', '$4$', '$-5$', '$5$']), correctAnswer: '$-4$', solution: '$A_{12} = (-1)^{1+2} \\times 4 = -4$.', difficulty_level: 'Easy' },
            { text: 'Does $\\begin{bmatrix} 1 & 3 \\\\ 2 & 6 \\end{bmatrix}$ have an inverse?', options: shuffle(['No', 'Yes', 'Only if square', 'Cannot determine']), correctAnswer: 'No', solution: '$|A| = 6 - 6 = 0$. Singular, no inverse.', difficulty_level: 'Easy' },
            { text: 'Evaluate $\\begin{vmatrix} 4 & 2 & 1 \\\\ 0 & 3 & 5 \\\\ 0 & 0 & 2 \\end{vmatrix}$', options: shuffle(['$24$', '$12$', '$6$', '$0$']), correctAnswer: '$24$', solution: 'Upper triangular: $4 \\times 3 \\times 2 = 24$.', difficulty_level: 'Easy' },
            { text: 'Find area of triangle with vertices $(0,0)$, $(1,2)$, $(2,4)$', options: shuffle(['$0$', '$2$', '$4$', '$1$']), correctAnswer: '$0$', solution: 'Points are collinear, area $= 0$.', difficulty_level: 'Easy' },
            { text: 'If $|A| = -2$, find $|2A|$ for $2 \\times 2$ matrix', options: shuffle(['$-4$', '$-8$', '$4$', '$8$']), correctAnswer: '$-8$', solution: '$|2A| = 2^2 \\times (-2) = -8$.', difficulty_level: 'Medium' },
            { text: 'If $|A| = 5$ and $|B| = -3$, find $|AB|$', options: shuffle(['$-15$', '$15$', '$2$', '$8$']), correctAnswer: '$-15$', solution: '$|AB| = |A| \\cdot |B| = 5 \\times (-3) = -15$.', difficulty_level: 'Easy' },
            { text: 'Find value of $k$: $\\begin{vmatrix} 1 & k \\\\ 2 & 4 \\end{vmatrix} = 0$', options: shuffle(['$2$', '$4$', '$1$', '$8$']), correctAnswer: '$2$', solution: '$4 - 2k = 0 \\Rightarrow k = 2$.', difficulty_level: 'Easy' },
            { text: 'Solve: $x + y = 3$, $2x + y = 5$', options: shuffle(['$x=2, y=1$', '$x=1, y=2$', '$x=3, y=0$', '$x=0, y=3$']), correctAnswer: '$x=2, y=1$', solution: 'Subtracting: $x = 2$, then $y = 1$.', difficulty_level: 'Medium' },
            { text: 'Evaluate $\\begin{vmatrix} 0 & 1 & 2 \\\\ 3 & 4 & 5 \\\\ 6 & 7 & 8 \\end{vmatrix}$', options: shuffle(['$0$', '$1$', '$-1$', '$3$']), correctAnswer: '$0$', solution: '$R_3 - R_2 = R_2 - R_1$ (arithmetic progression), so determinant $= 0$.', difficulty_level: 'Medium' },
            { text: 'If $|A| = 4$ for $3 \\times 3$, find $|\\text{adj } A|$', options: shuffle(['$16$', '$4$', '$64$', '$8$']), correctAnswer: '$16$', solution: '$|\\text{adj } A| = |A|^{n-1} = 4^2 = 16$.', difficulty_level: 'Medium' },
            { text: 'Condition for matrix to be non-singular:', options: shuffle(['$|A| \\neq 0$', '$|A| = 0$', '$A = I$', '$A$ is diagonal']), correctAnswer: '$|A| \\neq 0$', solution: 'Non-singular = non-zero determinant = invertible.', difficulty_level: 'Easy' },
        ];
        setQuestions(qs.sort(() => Math.random() - 0.5));
    }, []);

    useEffect(() => {
        (async () => { try { const r = await api.post('/practice/start-session', { skill_id: SKILL_ID, skill_name: SKILL_NAME }); if (r.data?.session_id) setSessionId(r.data.session_id); } catch { } })();
        return () => { if (sessionId) api.post('/practice/end-session', { session_id: sessionId }).catch(() => { }); };
    }, []);

    useEffect(() => {
        const onVis = () => { if (document.hidden) { accumulatedTime.current += Date.now() - questionStartTime.current; isTabActive.current = false; } else { questionStartTime.current = Date.now(); isTabActive.current = true; } };
        document.addEventListener('visibilitychange', onVis);
        return () => document.removeEventListener('visibilitychange', onVis);
    }, []);

    useEffect(() => {
        const id = setInterval(() => setTimeElapsed(t => t + 1), 1000);
        return () => clearInterval(id);
    }, []);

    useEffect(() => {
        if (answers[qIndex]) { setSelectedOption(answers[qIndex].selectedOption); } else { setSelectedOption(null); }
    }, [qIndex, answers]);

    const isSubmitted = !!answers[qIndex];
    const isCorrect = answers[qIndex]?.isCorrect;
    const q = questions[qIndex];
    if (!q) return <div style={{ textAlign: 'center', padding: 60, color: '#64748b' }}>Loading questions…</div>;

    const handleSelect = opt => { if (!isSubmitted) setSelectedOption(opt); };
    const handleCheck = async () => {
        if (selectedOption === null || isSubmitted) return;
        const isRight = selectedOption === q.correctAnswer;
        const elapsed = accumulatedTime.current + (isTabActive.current ? Date.now() - questionStartTime.current : 0);
        setAnswers(prev => ({ ...prev, [qIndex]: { selectedOption, isCorrect: isRight } }));
        try { await api.post('/practice/submit-answer', { session_id: sessionId, skill_id: SKILL_ID, question_index: qIndex, question_text: q.text, selected_answer: selectedOption, correct_answer: q.correctAnswer, is_correct: isRight, time_taken_ms: elapsed, difficulty_level: q.difficulty_level }); } catch { }
        accumulatedTime.current = 0; questionStartTime.current = Date.now();
    };

    const handlePrev = () => { if (qIndex > 0) setQIndex(i => i - 1); };
    const handleNext = () => {
        if (qIndex + 1 < questions.length) { setQIndex(i => i + 1); }
        else { setIsFinished(true); if (sessionId) api.post('/practice/end-session', { session_id: sessionId, score: Object.values(answers).filter(a => a.isCorrect).length, total: questions.length }).catch(() => { }); }
    };

    const totalCorrect = Object.values(answers).filter(a => a.isCorrect).length;
    const totalAnswered = Object.keys(answers).length;
    const pct = questions.length ? Math.round((totalCorrect / questions.length) * 100) : 0;

    if (isFinished) {
        return (
            <div className="practice-session-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '80vh', padding: 24 }}>
                <div style={{ background: '#fff', borderRadius: 24, padding: '40px 48px', maxWidth: 500, width: '100%', textAlign: 'center', boxShadow: '0 10px 40px rgba(0,0,0,0.06)' }}>
                    <img src={mascotImg} alt="mascot" style={{ width: 80, marginBottom: 16 }} />
                    <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 28, fontWeight: 900, marginBottom: 8 }}>{pct >= 80 ? '🏆 Excellent!' : pct >= 50 ? '🌟 Good Job!' : '💪 Keep Practicing!'}</h2>
                    <p style={{ color: '#64748b', fontSize: 18, marginBottom: 24 }}>Score: <strong style={{ color: '#3b82f6' }}>{totalCorrect} / {questions.length}</strong> ({pct}%)</p>
                    <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                        <button onClick={() => { setQIndex(0); setAnswers({}); setIsFinished(false); setSelectedOption(null); setQuestions(q => [...q].sort(() => Math.random() - 0.5)); }} style={{ padding: '12px 28px', borderRadius: 12, background: '#3b82f6', color: '#fff', border: 'none', fontWeight: 800, cursor: 'pointer' }}>Try Again</button>
                        <button onClick={() => { setShowReview(true); setIsFinished(false); setQIndex(0); setFromReview(true); }} style={{ padding: '12px 28px', borderRadius: 12, background: '#f1f5f9', color: '#334155', border: '1px solid #e2e8f0', fontWeight: 800, cursor: 'pointer' }}>Review Answers</button>
                        <button onClick={() => navigate('/senior/grade/12/determinants')} style={{ padding: '12px 28px', borderRadius: 12, background: '#f1f5f9', color: '#334155', border: '1px solid #e2e8f0', fontWeight: 800, cursor: 'pointer' }}>Back to Determinants</button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="practice-session-container">
            <div className="practice-session-header">
                <button className="back-button" onClick={() => navigate('/senior/grade/12/determinants')}><ChevronLeft size={18} /> Back</button>
                <div className="session-info">
                    <span className="skill-name">{SKILL_NAME}</span>
                    <span className="timer">{Math.floor(timeElapsed / 60)}:{String(timeElapsed % 60).padStart(2, '0')}</span>
                </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 6, margin: '12px auto', maxWidth: 600 }}>
                {questions.map((_, i) => {
                    const a = answers[i]; let bg = '#e2e8f0'; let c = '#64748b';
                    if (a) { bg = a.isCorrect ? '#bbf7d0' : '#fecaca'; c = a.isCorrect ? '#166534' : '#991b1b'; }
                    if (i === qIndex) { bg = '#3b82f6'; c = '#fff'; }
                    return <button key={i} onClick={() => setQIndex(i)} style={{ width: 32, height: 32, borderRadius: 8, background: bg, color: c, border: 'none', fontWeight: 800, fontSize: 13, cursor: 'pointer' }}>{i + 1}</button>;
                })}
            </div>

            <div className="question-card" style={{ maxWidth: 700, margin: '0 auto' }}>
                <div className="question-number">Question {qIndex + 1} of {questions.length}</div>
                <div className="question-text"><LatexText text={q.text} /></div>
                <div className="options-grid">
                    {q.options.map((opt, oi) => {
                        let cls = 'option-button';
                        if (isSubmitted) { if (opt === q.correctAnswer) cls += ' correct'; else if (opt === selectedOption) cls += ' incorrect'; }
                        else if (opt === selectedOption) cls += ' selected';
                        return <motion.button key={oi} className={cls} onClick={() => handleSelect(opt)} disabled={isSubmitted} whileTap={{ scale: 0.97 }}><LatexText text={opt} /></motion.button>;
                    })}
                </div>

                {isSubmitted && (
                    <motion.div className={`feedback-mini ${isCorrect ? 'correct' : 'incorrect'}`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                        {isCorrect ? <><Check size={16} /> Correct!</> : <><X size={16} /> Incorrect</>}
                        {isCorrect && <img src={mascotImg} alt="" style={{ width: 28, marginLeft: 8 }} />}
                    </motion.div>
                )}

                {isSubmitted && q.solution && (
                    <motion.div className="explanation-box" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <Eye size={14} style={{ marginRight: 6 }} /><LatexText text={q.solution} />
                    </motion.div>
                )}

                <div className="navigation-buttons">
                    <button className="nav-btn prev" onClick={handlePrev} disabled={qIndex === 0}><ChevronLeft size={16} /> Prev</button>
                    {!isSubmitted ? (
                        <button className="nav-btn check" onClick={handleCheck} disabled={selectedOption === null}>Check <Check size={16} /></button>
                    ) : (
                        <button className="nav-btn next" onClick={handleNext}>{qIndex + 1 >= questions.length ? 'Finish' : 'Next'} <ChevronRight size={16} /></button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DeterminantsEasyTest;
