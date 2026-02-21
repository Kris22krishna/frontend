import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, X, Eye, ChevronRight, ChevronLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { api } from '../../../../services/api';
import { LatexText } from '../../../LatexText';
import ExplanationModal from '../../../ExplanationModal';
import InteractiveMatrixBuilder from '../components/InteractiveMatrixBuilder';
import '../../../../pages/juniors/JuniorPracticeSession.css';

const SKILL_ID = 12203;
const SKILL_NAME = 'Matrices — Topic 2: Types of Matrices';

const MatrixTypesTest = () => {
    const navigate = useNavigate();
    const [questions, setQuestions] = useState([]);
    const [qIndex, setQIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [showExplanationModal, setShowExplanationModal] = useState(false);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [feedbackMessage, setFeedbackMessage] = useState('');
    const [sessionId, setSessionId] = useState(null);
    const questionStartTime = useRef(Date.now());
    const accumulatedTime = useRef(0);
    const isTabActive = useRef(true);
    const [answers, setAnswers] = useState({});
    const [isFinished, setIsFinished] = useState(false);
    const CORRECT_MSGS = ['✨ Amazing! ✨', '🌟 Brilliant! 🌟', '🎉 Correct! 🎉', '🚀 Super! 🚀', '💎 Spot on! 💎'];

    useEffect(() => {
        const rand = (a, b) => Math.floor(Math.random() * (b - a + 1)) + a;
        const shuffle = arr => [...new Set(arr)].sort(() => Math.random() - 0.5);
        const qs = [];

        // Q1: Square matrix condition
        qs.push({ text: '$A = [a_{ij}]_{m \\times n}$ is a square matrix if:', options: shuffle(['$m = n$', '$m > n$', '$m < n$', '$m + n = 1$']), correctAnswer: '$m = n$', solution: 'A matrix is square when the number of rows equals the number of columns ($m = n$).', difficulty_level: 'Easy' });

        // Q2: Identify row matrix
        (() => { const n = rand(3, 5); const vals = [Array.from({ length: n }, () => rand(-9, 9))]; qs.push({ text: 'What type is the matrix shown below?', matrix: vals, options: shuffle(['Row matrix', 'Column matrix', 'Square matrix', 'Zero matrix']), correctAnswer: 'Row matrix', solution: `A $1 \\times ${n}$ matrix (single row) is a row matrix.`, difficulty_level: 'Easy' }); })();

        // Q3: Identity matrix
        (() => { const I3 = [[1, 0, 0], [0, 1, 0], [0, 0, 1]]; qs.push({ text: 'The matrix shown is an example of:', matrix: I3, options: shuffle(['Identity matrix', 'Zero matrix', 'Scalar matrix (k≠1)', 'Diagonal matrix (non-identity)']), correctAnswer: 'Identity matrix', solution: 'An identity matrix has 1s on the main diagonal and 0s everywhere else.', difficulty_level: 'Easy' }); })();

        // Q4: Diagonal matrix
        (() => { const d = [rand(2, 8), rand(1, 7), rand(3, 9)]; const M = [[d[0], 0, 0], [0, d[1], 0], [0, 0, d[2]]]; qs.push({ text: 'The matrix shown is a:', matrix: M, options: shuffle(['Diagonal matrix', 'Identity matrix', 'Zero matrix', 'Row matrix']), correctAnswer: 'Diagonal matrix', solution: 'All non-diagonal entries are 0, with diagonal entries not all equal to 1. This is a diagonal matrix.', difficulty_level: 'Easy' }); })();

        // Q5: Scalar matrix
        (() => { const k = rand(2, 6); const M = [[k, 0, 0], [0, k, 0], [0, 0, k]]; qs.push({ text: 'The matrix shown is a:', matrix: M, options: shuffle([`Scalar matrix (k=${k})`, 'Identity matrix', 'Zero matrix', 'Diagonal matrix (non-scalar)']), correctAnswer: `Scalar matrix (k=${k})`, solution: `A scalar matrix is a diagonal matrix where all diagonal entries are equal to the same scalar $k = ${k}$.`, difficulty_level: 'Medium' }); })();

        // Q6: Scalar matrix becomes identity when k=1
        qs.push({ text: 'A scalar matrix becomes the identity matrix when the scalar $k$ equals:', options: shuffle(['$1$', '$0$', '$-1$', '$2$']), correctAnswer: '$1$', solution: 'When $k = 1$, every diagonal entry is 1 and off-diagonal entries are 0, which is the definition of $I$.', difficulty_level: 'Easy' });

        // Q7: Column matrix identification
        (() => { const n = rand(3, 4); const vals = Array.from({ length: n }, () => [rand(-5, 10)]); qs.push({ text: 'Identify the type of matrix shown:', matrix: vals, options: shuffle(['Column matrix', 'Row matrix', 'Square matrix', 'Null matrix']), correctAnswer: 'Column matrix', solution: `A matrix with order $${n} \\times 1$ (single column) is a column matrix.`, difficulty_level: 'Easy' }); })();

        // Q8: Zero matrix
        (() => { const r = rand(2, 3), c = rand(2, 3); const M = Array.from({ length: r }, () => Array.from({ length: c }, () => 0)); qs.push({ text: 'The matrix shown is called a:', matrix: M, options: shuffle(['Zero (Null) matrix', 'Identity matrix', 'Scalar matrix', 'Diagonal matrix']), correctAnswer: 'Zero (Null) matrix', solution: 'A matrix with all entries equal to 0 is called a zero (null) matrix.', difficulty_level: 'Easy' }); })();

        // Q9: Point as matrix
        qs.push({ text: 'The point $P(0, 1)$ can be represented as a matrix of type:', options: shuffle(['Column matrix ($2 \\times 1$)', 'Row matrix ($1 \\times 2$)', 'Both are valid', 'Square matrix ($2 \\times 2$)']), correctAnswer: 'Both are valid', solution: 'A point $(x, y)$ can be written as a row matrix $\\begin{bmatrix} x & y \\end{bmatrix}$ or column matrix $\\begin{bmatrix} x \\\\ y \\end{bmatrix}$.', difficulty_level: 'Medium' });

        // Q10: Find A if A + B = B
        qs.push({ text: 'If $A + B = B$ for all matrices $B$ of the same order, then $A$ is:', options: shuffle(['Zero matrix', 'Identity matrix', '$B$ itself', 'Inverse of $B$']), correctAnswer: 'Zero matrix', solution: '$A + B = B \\Rightarrow A = B - B = O$. So $A$ must be the zero matrix (additive identity).', difficulty_level: 'Medium' });

        setQuestions(qs);
    }, []);

    // ─── Session & Timer (same boilerplate) ───
    useEffect(() => { if (isFinished) return; const uid = sessionStorage.getItem('userId') || localStorage.getItem('userId'); if (uid && !sessionId) api.createPracticeSession(uid, SKILL_ID).then(s => { if (s?.session_id) setSessionId(s.session_id) }).catch(console.error); const t = setInterval(() => setTimeElapsed(p => p + 1), 1000); const v = () => { if (document.hidden) { accumulatedTime.current += Date.now() - questionStartTime.current; isTabActive.current = false } else { questionStartTime.current = Date.now(); isTabActive.current = true } }; document.addEventListener('visibilitychange', v); return () => { clearInterval(t); document.removeEventListener('visibilitychange', v) }; }, [sessionId, isFinished]);
    const formatTime = s => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;
    const recordAttempt = async (q, sel, cor) => { const uid = sessionStorage.getItem('userId') || localStorage.getItem('userId'); if (!uid) return; let t = accumulatedTime.current; if (isTabActive.current) t += Date.now() - questionStartTime.current; const sec = Math.max(0, Math.round(t / 1000)); api.recordAttempt({ user_id: parseInt(uid), session_id: sessionId, skill_id: SKILL_ID, template_id: null, difficulty_level: q.difficulty_level || 'Medium', question_text: q.text, correct_answer: q.correctAnswer, student_answer: sel || '', is_correct: cor, solution_text: q.solution || '', time_spent_seconds: sec }).catch(console.error) };
    const handleCheck = () => { if (!selectedOption) return; const q = questions[qIndex]; const r = selectedOption === q.correctAnswer; setIsCorrect(r); setIsSubmitted(true); if (r) setFeedbackMessage(CORRECT_MSGS[Math.floor(Math.random() * CORRECT_MSGS.length)]); else setShowExplanationModal(true); setAnswers(p => ({ ...p, [qIndex]: { selectedOption, isCorrect: r } })); recordAttempt(q, selectedOption, r) };
    const handleNext = async () => { if (qIndex < questions.length - 1) { setQIndex(p => p + 1); accumulatedTime.current = 0; questionStartTime.current = Date.now() } else await handleFinalSubmit() };
    const handlePrev = () => { if (qIndex > 0) setQIndex(p => p - 1) };
    const handleFinalSubmit = async () => { if (sessionId) await api.finishSession(sessionId).catch(console.error); const uid = sessionStorage.getItem('userId') || localStorage.getItem('userId'); if (uid) { const tc = Object.values(answers).filter(v => v.isCorrect).length; await api.createReport({ title: SKILL_NAME, type: 'practice', score: (tc / questions.length) * 100, parameters: { skill_id: SKILL_ID, skill_name: SKILL_NAME, total_questions: questions.length, correct_answers: tc, timestamp: new Date().toISOString(), time_taken_seconds: timeElapsed }, user_id: parseInt(uid) }).catch(console.error) } setIsFinished(true) };
    useEffect(() => { const s = answers[qIndex]; if (s) { setSelectedOption(s.selectedOption); setIsCorrect(s.isCorrect); setIsSubmitted(true) } else { setSelectedOption(null); setIsCorrect(false); setIsSubmitted(false) } }, [qIndex, answers]);
    useEffect(() => { setShowExplanationModal(false) }, [qIndex]);

    if (questions.length === 0) return <div>Loading...</div>;
    if (isFinished) { const correct = Object.values(answers).filter(a => a.isCorrect).length; const wrong = Object.values(answers).filter(a => !a.isCorrect).length; return (<div className="junior-practice-page raksha-theme p-3 sm:p-8 pb-24" style={{ fontFamily: '"Open Sans",sans-serif', backgroundColor: '#F8FAFC', minHeight: '100vh', overflowY: 'auto' }}><div className="max-w-3xl mx-auto w-full"><motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="bg-white rounded-2xl p-4 sm:p-8 shadow-xl border-2 border-[#4FB7B3]/20 my-4 sm:my-8"><div className="text-center mb-6"><div style={{ fontSize: '3rem', marginBottom: 8 }}>{correct >= 7 ? '🏆' : '📝'}</div><h2 className="text-2xl sm:text-3xl font-bold text-[#31326F] mb-2">{correct >= 7 ? 'Excellent!' : 'Keep Practicing!'}</h2><p className="text-sm text-gray-500">{SKILL_NAME}</p></div><div className="grid grid-cols-3 gap-2 mb-6"><div className="bg-blue-50 p-2 rounded-xl text-center border border-blue-100"><div className="text-blue-500 font-bold text-xs uppercase">Time</div><div className="text-lg font-black text-[#31326F]">{formatTime(timeElapsed)}</div></div><div className="bg-green-50 p-2 rounded-xl text-center border border-green-100"><div className="text-green-500 font-bold text-xs uppercase">Correct</div><div className="text-lg font-black text-[#31326F]">{correct}</div></div><div className="bg-red-50 p-2 rounded-xl text-center border border-red-100"><div className="text-red-500 font-bold text-xs uppercase">Wrong</div><div className="text-lg font-black text-[#31326F]">{wrong}</div></div></div><div className="space-y-4"><h3 className="text-lg font-bold text-[#31326F] border-b pb-2">Detailed Report</h3>{questions.map((q, idx) => { const ans = answers[idx] || { isCorrect: false, selectedOption: 'N/A' }; return (<div key={idx} className="p-4 rounded-xl border-2 border-gray-100 bg-white shadow-sm"><div className="flex justify-between items-center mb-2"><span className="w-7 h-7 rounded-full bg-[#31326F] text-white flex items-center justify-center font-bold text-xs">{idx + 1}</span><span className={`px-2 py-0.5 rounded-full font-bold text-xs uppercase ${ans.isCorrect ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>{ans.isCorrect ? 'Correct' : 'Wrong'}</span></div><div className="text-sm text-[#31326F] mb-2"><LatexText text={q.text} /></div>{q.matrix && <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 8 }}><InteractiveMatrixBuilder rows={q.matrix.length} cols={q.matrix[0].length} values={q.matrix.map(r => r.map(String))} compact animateEntrance={false} /></div>}<div className="grid grid-cols-2 gap-2 text-xs mb-2"><div className="p-2 rounded-lg bg-gray-50 border"><span className="text-gray-400 block text-xs">Your Answer:</span><span className={ans.isCorrect ? 'text-green-600 font-bold' : 'text-red-500 font-bold'}><LatexText text={ans.selectedOption} /></span></div><div className="p-2 rounded-lg bg-green-50 border border-green-100"><span className="text-green-400 block text-xs">Correct:</span><span className="text-green-700 font-bold"><LatexText text={q.correctAnswer} /></span></div></div><div className="p-2 rounded-lg bg-amber-50 border border-amber-100 text-xs italic text-[#31326F]"><span className="font-bold not-italic text-amber-700">Explanation: </span><LatexText text={q.solution} /></div></div>) })}</div><div className="mt-8 flex justify-center"><button className="bg-[#31326F] text-white px-12 py-3 rounded-xl font-black text-lg hover:scale-105 active:scale-95 transition-all shadow-xl" onClick={() => navigate(-1)}>Done</button></div></motion.div></div></div>) }

    const cq = questions[qIndex];
    return (<div className="junior-practice-page" style={{ fontFamily: '"Open Sans",sans-serif' }}><header className="junior-practice-header" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) auto minmax(0,1fr)', alignItems: 'center', padding: '0 2rem', gap: '1rem' }}><div style={{ fontSize: '1rem', fontWeight: 'bold', color: '#31326F', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{SKILL_NAME}</div><div><div className="bg-white/90 backdrop-blur-md px-3 py-1.5 sm:px-6 sm:py-2 rounded-full border-2 border-[#4FB7B3]/30 text-[#31326F] font-black text-sm sm:text-xl shadow-lg whitespace-nowrap">Q {qIndex + 1}/{questions.length}</div></div><div style={{ justifySelf: 'end' }}><div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl border-2 border-[#4FB7B3]/30 text-[#31326F] font-bold text-lg shadow-md">{formatTime(timeElapsed)}</div></div></header><main className="practice-content-wrapper"><div className="practice-board-container" style={{ gridTemplateColumns: '1fr', maxWidth: 800, margin: '0 auto' }}><div className="practice-left-col" style={{ width: '100%' }}><div className="question-card-modern" style={{ paddingLeft: '2rem' }}><div className="question-header-modern"><h2 className="question-text-modern" style={{ fontSize: 'clamp(1rem,2vw,1.6rem)', maxHeight: 'none', fontWeight: 500, textAlign: 'left', overflow: 'visible', color: '#2D3748' }}><LatexText text={cq.text} /></h2></div>{cq.matrix && <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}><InteractiveMatrixBuilder rows={cq.matrix.length} cols={cq.matrix[0].length} values={cq.matrix.map(r => r.map(String))} compact={cq.matrix.length > 3 || cq.matrix[0].length > 3} /></div>}<div className="interaction-area-modern"><div className="options-grid-modern">{cq.options.map((o, i) => (<button key={i} className={`option-btn-modern ${selectedOption === o ? 'selected' : ''} ${isSubmitted && o === cq.correctAnswer ? 'correct' : ''} ${isSubmitted && selectedOption === o && !isCorrect ? 'wrong' : ''}`} style={{ fontWeight: 500 }} onClick={() => !isSubmitted && setSelectedOption(o)} disabled={isSubmitted}><LatexText text={o} /></button>))}</div>{isSubmitted && isCorrect && <div style={{ display: 'flex', justifyContent: 'center', width: '100%', marginTop: '2rem' }}><motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="feedback-mini correct">{feedbackMessage}</motion.div></div>}</div></div></div></div></main><ExplanationModal isOpen={showExplanationModal} isCorrect={isCorrect} correctAnswer={cq.correctAnswer} explanation={cq.solution} onClose={() => setShowExplanationModal(false)} /><footer className="junior-bottom-bar"><div className="desktop-footer-controls"><button className="bg-red-50 text-red-500 px-6 py-2 rounded-xl border-2 border-red-100 font-bold" onClick={() => navigate(-1)}>Exit</button><div className="bottom-center">{isSubmitted && <button className="view-explanation-btn" onClick={() => setShowExplanationModal(true)}><Eye size={20} /> View Explanation</button>}</div><div className="bottom-right" style={{ display: 'flex', gap: 10 }}><button className="nav-pill-next-btn bg-gray-200 text-gray-600" onClick={handlePrev} disabled={qIndex === 0} style={{ opacity: qIndex === 0 ? 0.5 : 1 }}><ChevronLeft size={28} strokeWidth={3} /> Prev</button>{isSubmitted ? <button className="nav-pill-next-btn" onClick={handleNext}>{qIndex < questions.length - 1 ? <>Next <ChevronRight size={28} strokeWidth={3} /></> : <>Done <Check size={28} strokeWidth={3} /></>}</button> : <button className="nav-pill-submit-btn" onClick={handleCheck} disabled={!selectedOption}>Submit <Check size={28} strokeWidth={3} /></button>}</div></div><div className="mobile-footer-controls"><div className="mobile-footer-right"><button className="nav-pill-next-btn bg-gray-200 text-gray-600 p-2" onClick={handlePrev} disabled={qIndex === 0} style={{ minWidth: 'auto', opacity: qIndex === 0 ? 0.5 : 1 }}><ChevronLeft size={20} /></button>{isSubmitted && <button className="view-explanation-btn" onClick={() => setShowExplanationModal(true)}><Eye size={18} /></button>}{isSubmitted ? <button className="nav-pill-next-btn" onClick={handleNext}>{qIndex < questions.length - 1 ? 'Next' : 'Done'}</button> : <button className="nav-pill-submit-btn" onClick={handleCheck} disabled={!selectedOption}>Submit</button>}</div></div></footer></div>);
};

export default MatrixTypesTest;
