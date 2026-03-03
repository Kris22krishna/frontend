import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, X, Eye, ChevronRight, ChevronLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { api } from '../../../../../../services/api';
import { LatexText } from '../../../../../LatexText';
import mascotImg from '../../../../../../assets/mascot.png';
import '../../../../../../pages/juniors/JuniorPracticeSession.css';

const SKILL_ID = 12212;
const SKILL_NAME = 'Determinants — Hard Test';

const DeterminantsHardTest = () => {
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
            { text: 'If two rows of a determinant are identical, its value is:', options: shuffle(['$0$', '$1$', '$-1$', 'Depends on matrix']), correctAnswer: '$0$', solution: 'Swapping identical rows changes sign but not value, so $|A| = -|A|$, hence $|A| = 0$.', difficulty_level: 'Hard' },
            { text: '$|A^T| = ?$', options: shuffle(['$|A|$', '$-|A|$', '$1/|A|$', '$|A|^2$']), correctAnswer: '$|A|$', solution: 'Transpose does not change the determinant: $|A^T| = |A|$.', difficulty_level: 'Hard' },
            { text: 'If $|A| = 2$, find $|A^{-1}|$', options: shuffle(['$2$', '$-2$', '$1/2$', '$-1/2$']), correctAnswer: '$1/2$', solution: '$|A^{-1}| = 1/|A| = 1/2$.', difficulty_level: 'Hard' },
            { text: '$|AB| = ?$', options: shuffle(['$|A| + |B|$', '$|A| \\cdot |B|$', '$|A| - |B|$', '$|A|/|B|$']), correctAnswer: '$|A| \\cdot |B|$', solution: 'Product rule: $|AB| = |A| \\cdot |B|$.', difficulty_level: 'Hard' },
            { text: 'Find inverse of $\\begin{bmatrix} 1 & 2 & 3 \\\\ 0 & 1 & 4 \\\\ 5 & 6 & 0 \\end{bmatrix}$. First, $|A| = ?$', options: shuffle(['$1$', '$-1$', '$0$', '$2$']), correctAnswer: '$1$', solution: '$1(0-24) - 2(0-20) + 3(0-5) = -24+40-15 = 1$.', difficulty_level: 'Hard' },
            { text: 'Solve: $x + y + z = 6$, $2x + 3y + z = 14$, $x + 2y + 3z = 14$. Find $x$:', options: shuffle(['$1$', '$2$', '$3$', '$4$']), correctAnswer: '$1$', solution: 'Using Cramer\'s rule or substitution: $x = 1, y = 2, z = 3$.', difficulty_level: 'Hard' },
            { text: 'If $|A| = 0$, then $\\text{adj}(A)$ is:', options: shuffle(['Invertible', 'Singular', 'Identity', 'Undefined']), correctAnswer: 'Singular', solution: '$|\\text{adj}(A)| = |A|^{n-1} = 0$. So adj(A) is also singular.', difficulty_level: 'Hard' },
            { text: '$\\begin{vmatrix} a & b \\\\ c & d \\end{vmatrix} \\cdot \\begin{vmatrix} d & -b \\\\ -c & a \\end{vmatrix} = ?$', options: shuffle(['$(ad-bc)^2$', '$ad-bc$', '$0$', '$1$']), correctAnswer: '$(ad-bc)^2$', solution: 'Each determinant equals $\\pm(ad-bc)$. Product $= (ad-bc)(ad-bc) = (ad-bc)^2$.', difficulty_level: 'Hard' },
            { text: '$|kA| = k^n|A|$. This proves:', options: shuffle(['$|2A| = 2|A|$', '$|kA| = k|A|$ always', '$|kA| = k^n|A|$ for n×n', '$|A+B| = |A|+|B|$']), correctAnswer: '$|kA| = k^n|A|$ for n×n', solution: 'Each of the $n$ rows gets multiplied by $k$, contributing a factor of $k$ each.', difficulty_level: 'Hard' },
            { text: '$\\begin{vmatrix} 1 & 2 & 3 \\\\ 2 & 4 & 6 \\\\ 1 & 1 & 1 \\end{vmatrix} = ?$', options: shuffle(['$0$', '$6$', '$-6$', '$12$']), correctAnswer: '$0$', solution: '$R_2 = 2R_1$, so determinant $= 0$.', difficulty_level: 'Medium' },
            { text: 'If $A^2 = I$, possible values of $|A|$ are:', options: shuffle(['Only $1$', 'Only $-1$', '$1$ or $-1$', '$0$']), correctAnswer: '$1$ or $-1$', solution: '$|A^2| = |I| \\Rightarrow |A|^2 = 1 \\Rightarrow |A| = \\pm 1$.', difficulty_level: 'Hard' },
            { text: 'Inverse using adjoint for general $2 \\times 2$: $A^{-1} = ?$', options: shuffle(['$\\frac{1}{ad-bc}\\begin{bmatrix} d & -b \\\\ -c & a \\end{bmatrix}$', '$\\frac{1}{ad+bc}\\begin{bmatrix} d & b \\\\ c & a \\end{bmatrix}$', '$(ad-bc)\\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix}$', 'Does not exist']), correctAnswer: '$\\frac{1}{ad-bc}\\begin{bmatrix} d & -b \\\\ -c & a \\end{bmatrix}$', solution: '$A^{-1} = \\frac{1}{|A|}\\text{adj}(A) = \\frac{1}{ad-bc}\\begin{bmatrix} d & -b \\\\ -c & a \\end{bmatrix}$.', difficulty_level: 'Hard' },
            { text: 'Determinant of triangular matrix equals:', options: shuffle(['Sum of all elements', 'Product of diagonal entries', 'Sum of diagonal entries', '$0$']), correctAnswer: 'Product of diagonal entries', solution: 'For any triangular matrix, $|A| = a_{11} \\cdot a_{22} \\cdot \\ldots \\cdot a_{nn}$.', difficulty_level: 'Hard' },
            { text: 'If $|A| = 3$ for $4 \\times 4$ matrix, $|\\text{adj } A| = ?$', options: shuffle(['$9$', '$27$', '$81$', '$3$']), correctAnswer: '$27$', solution: '$|\\text{adj } A| = |A|^{n-1} = 3^{4-1} = 3^3 = 27$.', difficulty_level: 'Hard' },
            { text: 'Zero-sum property: elements of row $i$ times cofactors of row $k$ ($i \\neq k$) equals:', options: shuffle(['$|A|$', '$0$', '$1$', '$-|A|$']), correctAnswer: '$0$', solution: '$\\sum_j a_{ij}A_{kj} = 0$ when $i \\neq k$. This is the zero-sum property of cofactors.', difficulty_level: 'Hard' },
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

export default DeterminantsHardTest;
