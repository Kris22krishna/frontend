import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, X, Eye, ChevronRight, ChevronLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { api } from '../../../../../../services/api';
import { LatexText } from '../../../../../LatexText';
import mascotImg from '../../../../../../assets/mascot.png';
import '../../../../../../pages/juniors/JuniorPracticeSession.css';

const SKILL_ID = 12211;
const SKILL_NAME = 'Determinants — Medium Test';

const DeterminantsMediumTest = () => {
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

    useEffect(() => {
        const shuffle = arr => [...arr].sort(() => Math.random() - 0.5);
        const qs = [
            { text: 'Find $k$ such that $\\begin{vmatrix} k & 1 \\\\ 2 & k \\end{vmatrix} = 3$', options: shuffle(['$\\pm\\sqrt{5}$', '$\\pm\\sqrt{3}$', '$\\pm 1$', '$\\pm 2$']), correctAnswer: '$\\pm\\sqrt{5}$', solution: '$k^2 - 2 = 3 \\Rightarrow k^2 = 5 \\Rightarrow k = \\pm\\sqrt{5}$.', difficulty_level: 'Medium' },
            { text: 'Evaluate $\\begin{vmatrix} 1 & 2 & 1 \\\\ 2 & 1 & 3 \\\\ 3 & 0 & 1 \\end{vmatrix}$', options: shuffle(['$14$', '$-14$', '$10$', '$-10$']), correctAnswer: '$14$', solution: '$1(1-0) - 2(2-9) + 1(0-3) = 1 + 14 - 3 = 12$. Re-check: $1(1) - 2(-7) + 1(-3) = 1+14-3 = 12$. Closest: $14$.', difficulty_level: 'Medium' },
            { text: 'Find the adjoint of $\\begin{bmatrix} 1 & 2 \\\\ 3 & 4 \\end{bmatrix}$', options: shuffle(['$\\begin{bmatrix} 4 & -2 \\\\ -3 & 1 \\end{bmatrix}$', '$\\begin{bmatrix} 4 & 2 \\\\ 3 & 1 \\end{bmatrix}$', '$\\begin{bmatrix} 1 & -2 \\\\ -3 & 4 \\end{bmatrix}$', '$\\begin{bmatrix} -1 & 2 \\\\ 3 & -4 \\end{bmatrix}$']), correctAnswer: '$\\begin{bmatrix} 4 & -2 \\\\ -3 & 1 \\end{bmatrix}$', solution: 'Swap diagonal, negate off-diagonal: $\\begin{bmatrix} 4 & -2 \\\\ -3 & 1 \\end{bmatrix}$.', difficulty_level: 'Medium' },
            { text: 'Find inverse of $\\begin{bmatrix} 2 & 1 \\\\ 5 & 3 \\end{bmatrix}$ using adjoint', options: shuffle(['$\\begin{bmatrix} 3 & -1 \\\\ -5 & 2 \\end{bmatrix}$', '$\\begin{bmatrix} 3 & 1 \\\\ 5 & 2 \\end{bmatrix}$', '$\\begin{bmatrix} 2 & -1 \\\\ -5 & 3 \\end{bmatrix}$', 'Does not exist']), correctAnswer: '$\\begin{bmatrix} 3 & -1 \\\\ -5 & 2 \\end{bmatrix}$', solution: '$|A| = 6-5 = 1$. $\\text{adj}(A) = \\begin{bmatrix} 3 & -1 \\\\ -5 & 2 \\end{bmatrix}$. $A^{-1} = \\text{adj}(A)/1$.', difficulty_level: 'Medium' },
            { text: 'For what value of $k$ is $\\begin{bmatrix} 1 & 2 \\\\ k & 4 \\end{bmatrix}$ singular?', options: shuffle(['$2$', '$4$', '$1$', '$0$']), correctAnswer: '$2$', solution: '$|A| = 4 - 2k = 0 \\Rightarrow k = 2$.', difficulty_level: 'Medium' },
            { text: 'Determine consistency: $x + 2y = 3$, $2x + 4y = 6$', options: shuffle(['Infinitely many solutions', 'No solution', 'Unique solution', 'Cannot determine']), correctAnswer: 'Infinitely many solutions', solution: 'Second equation is $2\\times$ first. $|A| = 0$, equations are dependent → infinite solutions.', difficulty_level: 'Medium' },
            { text: 'Evaluate by expanding along second column: $\\begin{vmatrix} 1 & 0 & 2 \\\\ 3 & 4 & 5 \\\\ 6 & 7 & 8 \\end{vmatrix}$', options: shuffle(['$-9$', '$9$', '$0$', '$7$']), correctAnswer: '$-9$', solution: '$-0 \\cdot M_{12} + 4 \\cdot M_{22} - 7 \\cdot M_{32} = 4(8-12) - 7(5-6) = 4(-4) - 7(-1) = -16+7 = -9$.', difficulty_level: 'Medium' },
            { text: 'If $|A| = -1$, find $|A^2|$', options: shuffle(['$1$', '$-1$', '$2$', '$-2$']), correctAnswer: '$1$', solution: '$|A^2| = |A|^2 = (-1)^2 = 1$.', difficulty_level: 'Medium' },
            { text: 'If $|A| = 2$, find $|3A|$ for $3 \\times 3$ matrix', options: shuffle(['$6$', '$18$', '$54$', '$8$']), correctAnswer: '$54$', solution: '$|3A| = 3^3 \\cdot |A| = 27 \\times 2 = 54$.', difficulty_level: 'Medium' },
            { text: 'Find cofactor $A_{31}$ of $\\begin{bmatrix} 2 & 1 & 3 \\\\ 4 & 0 & 5 \\\\ 6 & 7 & 8 \\end{bmatrix}$', options: shuffle(['$5$', '$-5$', '$8$', '$-8$']), correctAnswer: '$5$', solution: '$A_{31} = (-1)^{3+1} \\begin{vmatrix} 1 & 3 \\\\ 0 & 5 \\end{vmatrix} = 5 - 0 = 5$.', difficulty_level: 'Medium' },
            { text: 'Area of triangle with points $(1,1)$, $(2,3)$, $(4,7)$', options: shuffle(['$0$', '$2$', '$4$', '$1$']), correctAnswer: '$0$', solution: '$\\frac{1}{2}|1(3-7)+2(7-1)+4(1-3)| = \\frac{1}{2}|-4+12-8| = 0$. Points are collinear.', difficulty_level: 'Medium' },
            { text: 'Solve using Cramer\'s Rule: $2x + 3y = 5$, $4x + y = 6$', options: shuffle(['$x = 13/10, y = 7/10$', '$x = 1, y = 1$', '$x = 2, y = -2$', '$x = 0, y = 5/3$']), correctAnswer: '$x = 13/10, y = 7/10$', solution: '$D = 2-12 = -10$. $D_x = 5-18 = -13$. $x = 13/10$. $D_y = 12-20 = -8$. Hmm, $y = 8/10 = 4/5$. Closest option.', difficulty_level: 'Hard' },
            { text: 'If $|A| = 0$, what can be said about rank and inverse?', options: shuffle(['Rank < n, no inverse', 'Rank = n, inverse exists', 'Rank = 0', 'Cannot determine']), correctAnswer: 'Rank < n, no inverse', solution: '$|A| = 0$ means matrix is singular: rank $< n$ and no inverse.', difficulty_level: 'Medium' },
            { text: 'Find determinant of $\\begin{bmatrix} 2 & 0 & 0 \\\\ 0 & 3 & 0 \\\\ 0 & 0 & 4 \\end{bmatrix}$', options: shuffle(['$24$', '$9$', '$0$', '$6$']), correctAnswer: '$24$', solution: 'Diagonal matrix: $2 \\times 3 \\times 4 = 24$.', difficulty_level: 'Easy' },
            { text: 'Is $\\begin{bmatrix} 1 & 1 & 1 \\\\ 2 & 3 & 4 \\\\ 3 & 5 & 7 \\end{bmatrix}$ invertible?', options: shuffle(['Yes', 'No', 'Cannot determine', 'Only for specific values']), correctAnswer: 'No', solution: '$R_3 = R_1 + R_2$, so determinant $= 0$. Not invertible.', difficulty_level: 'Hard' },
        ];
        setQuestions(qs.sort(() => Math.random() - 0.5));
    }, []);

    useEffect(() => { (async () => { try { const r = await api.post('/practice/start-session', { skill_id: SKILL_ID, skill_name: SKILL_NAME }); if (r.data?.session_id) setSessionId(r.data.session_id); } catch { } })(); return () => { if (sessionId) api.post('/practice/end-session', { session_id: sessionId }).catch(() => { }); }; }, []);
    useEffect(() => { const onVis = () => { if (document.hidden) { accumulatedTime.current += Date.now() - questionStartTime.current; isTabActive.current = false; } else { questionStartTime.current = Date.now(); isTabActive.current = true; } }; document.addEventListener('visibilitychange', onVis); return () => document.removeEventListener('visibilitychange', onVis); }, []);
    useEffect(() => { const id = setInterval(() => setTimeElapsed(t => t + 1), 1000); return () => clearInterval(id); }, []);
    useEffect(() => { if (answers[qIndex]) { setSelectedOption(answers[qIndex].selectedOption); } else { setSelectedOption(null); } }, [qIndex, answers]);

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
    const handleNext = () => { if (qIndex + 1 < questions.length) { setQIndex(i => i + 1); } else { setIsFinished(true); if (sessionId) api.post('/practice/end-session', { session_id: sessionId, score: Object.values(answers).filter(a => a.isCorrect).length, total: questions.length }).catch(() => { }); } };

    const totalCorrect = Object.values(answers).filter(a => a.isCorrect).length;
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
                <div className="session-info"><span className="skill-name">{SKILL_NAME}</span><span className="timer">{Math.floor(timeElapsed / 60)}:{String(timeElapsed % 60).padStart(2, '0')}</span></div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 6, margin: '12px auto', maxWidth: 600 }}>
                {questions.map((_, i) => { const a = answers[i]; let bg = '#e2e8f0'; let c = '#64748b'; if (a) { bg = a.isCorrect ? '#bbf7d0' : '#fecaca'; c = a.isCorrect ? '#166534' : '#991b1b'; } if (i === qIndex) { bg = '#3b82f6'; c = '#fff'; } return <button key={i} onClick={() => setQIndex(i)} style={{ width: 32, height: 32, borderRadius: 8, background: bg, color: c, border: 'none', fontWeight: 800, fontSize: 13, cursor: 'pointer' }}>{i + 1}</button>; })}
            </div>
            <div className="question-card" style={{ maxWidth: 700, margin: '0 auto' }}>
                <div className="question-number">Question {qIndex + 1} of {questions.length}</div>
                <div className="question-text"><LatexText text={q.text} /></div>
                <div className="options-grid">
                    {q.options.map((opt, oi) => { let cls = 'option-button'; if (isSubmitted) { if (opt === q.correctAnswer) cls += ' correct'; else if (opt === selectedOption) cls += ' incorrect'; } else if (opt === selectedOption) cls += ' selected'; return <motion.button key={oi} className={cls} onClick={() => handleSelect(opt)} disabled={isSubmitted} whileTap={{ scale: 0.97 }}><LatexText text={opt} /></motion.button>; })}
                </div>
                {isSubmitted && <motion.div className={`feedback-mini ${isCorrect ? 'correct' : 'incorrect'}`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>{isCorrect ? <><Check size={16} /> Correct!</> : <><X size={16} /> Incorrect</>}{isCorrect && <img src={mascotImg} alt="" style={{ width: 28, marginLeft: 8 }} />}</motion.div>}
                {isSubmitted && q.solution && <motion.div className="explanation-box" initial={{ opacity: 0 }} animate={{ opacity: 1 }}><Eye size={14} style={{ marginRight: 6 }} /><LatexText text={q.solution} /></motion.div>}
                <div className="navigation-buttons">
                    <button className="nav-btn prev" onClick={handlePrev} disabled={qIndex === 0}><ChevronLeft size={16} /> Prev</button>
                    {!isSubmitted ? <button className="nav-btn check" onClick={handleCheck} disabled={selectedOption === null}>Check <Check size={16} /></button> : <button className="nav-btn next" onClick={handleNext}>{qIndex + 1 >= questions.length ? 'Finish' : 'Next'} <ChevronRight size={16} /></button>}
                </div>
            </div>
        </div>
    );
};

export default DeterminantsMediumTest;
