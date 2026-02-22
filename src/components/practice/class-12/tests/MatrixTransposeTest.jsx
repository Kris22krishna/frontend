import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Eye, ChevronRight, ChevronLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { api } from '../../../../services/api';
import { LatexText } from '../../../LatexText';
import ExplanationModal from '../../../ExplanationModal';
import InteractiveMatrixBuilder from '../components/InteractiveMatrixBuilder';
import '../../../../pages/juniors/JuniorPracticeSession.css';

const SKILL_ID = 12214;
const SKILL_NAME = 'Matrices — Topic 5: Transpose of Matrix';

const MatrixTransposeTest = () => {
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

        // Q1: Transpose definition
        (() => { const A = [[rand(1, 5), rand(1, 5), rand(1, 5)], [rand(1, 5), rand(1, 5), rand(1, 5)]]; const AT = A[0].map((_, c) => A.map(r => r[c])); const c = `$\\begin{bmatrix}${AT[0][0]}&${AT[0][1]}\\\\${AT[1][0]}&${AT[1][1]}\\\\${AT[2][0]}&${AT[2][1]}\\end{bmatrix}$`; const w1 = `$\\begin{bmatrix}${A[0][0]}&${A[0][1]}&${A[0][2]}\\\\${A[1][0]}&${A[1][1]}&${A[1][2]}\\end{bmatrix}$`; qs.push({ text: `Find $A'$ (transpose) of $A = \\begin{bmatrix}${A[0][0]}&${A[0][1]}&${A[0][2]}\\\\${A[1][0]}&${A[1][1]}&${A[1][2]}\\end{bmatrix}$.`, matrix: A, options: shuffle([c, w1, `$\\begin{bmatrix}${AT[2][0]}&${AT[2][1]}\\\\${AT[1][0]}&${AT[1][1]}\\\\${AT[0][0]}&${AT[0][1]}\\end{bmatrix}$`, `$\\begin{bmatrix}${AT[0][1]}&${AT[0][0]}\\\\${AT[1][1]}&${AT[1][0]}\\\\${AT[2][1]}&${AT[2][0]}\\end{bmatrix}$`]), correctAnswer: c, solution: 'Transpose swaps rows and columns: $(A\')_{ij} = a_{ji}$. A $2 \\times 3$ becomes $3 \\times 2$.', difficulty_level: 'Easy' }); })();

        // Q2: (A')' = A
        qs.push({ text: '$(A\')\'$ equals:', options: shuffle(['$A$', '$A\'$', '$I$', '$O$']), correctAnswer: '$A$', solution: 'Transposing twice returns the original matrix: $(A\')\'= A$.', difficulty_level: 'Easy' });

        // Q3: Order of transpose
        (() => { const r = rand(2, 4), c2 = rand(2, 5); qs.push({ text: `If $A$ is $${r} \\times ${c2}$, what is the order of $A'$?`, options: shuffle([`$${c2} \\times ${r}$`, `$${r} \\times ${c2}$`, `$${r} \\times ${r}$`, `$${c2} \\times ${c2}$`]), correctAnswer: `$${c2} \\times ${r}$`, solution: `Transpose swaps dimensions: $m \\times n \\to n \\times m$. So $${r} \\times ${c2} \\to ${c2} \\times ${r}$.`, difficulty_level: 'Easy' }); })();

        // Q4: (A+B)' = A' + B'
        qs.push({ text: '$(A + B)\'$ equals:', options: shuffle(['$A\' + B\'$', '$A\'B\'$', '$B\'A\'$', '$(AB)\'$']), correctAnswer: '$A\' + B\'$', solution: 'Transpose distributes over addition: $(A+B)\' = A\' + B\'$.', difficulty_level: 'Medium' });

        // Q5: (kA)' = kA'
        qs.push({ text: '$(kA)\'$ equals:', options: shuffle(['$kA\'$', '$k\'A$', '$kA$', '$A\'k\'$']), correctAnswer: '$kA\'$', solution: 'Scalar can be taken out: $(kA)\' = kA\'$.', difficulty_level: 'Easy' });

        // Q6: (AB)' = B'A'
        qs.push({ text: '$(AB)\'$ equals:', options: shuffle(['$B\'A\'$', '$A\'B\'$', '$(BA)\'$', '$AB$']), correctAnswer: '$B\'A\'$', solution: 'The reversal law: $(AB)\' = B\'A\'$.', difficulty_level: 'Medium' });

        // Q7: Symmetric matrix check
        (() => { const a = rand(1, 5), b = rand(1, 5), c2 = rand(1, 5); const M = [[a, b, c2], [b, a, b], [c2, b, a]]; qs.push({ text: 'Is the matrix shown symmetric ($A = A\'$)?', matrix: M, options: shuffle(['Yes, it is symmetric', 'No, it is skew-symmetric', 'No, it is neither', 'Cannot determine']), correctAnswer: 'Yes, it is symmetric', solution: `A matrix is symmetric if $a_{ij} = a_{ji}$. Here every element above the diagonal equals the element below: confirmed symmetric.`, difficulty_level: 'Medium' }); })();

        // Q8: Skew-symmetric
        (() => { const a = rand(1, 5), b = rand(1, 5); const M = [[0, a, -b], [-a, 0, b], [b, -b, 0]]; qs.push({ text: 'The matrix shown is:', matrix: M, options: shuffle(['Skew-symmetric', 'Symmetric', 'Neither', 'Identity']), correctAnswer: 'Skew-symmetric', solution: 'A skew-symmetric matrix has $A\' = -A$, which means $a_{ij} = -a_{ji}$ and diagonal entries are 0.', difficulty_level: 'Medium' }); })();

        // Q9: A + A' is always
        qs.push({ text: 'For any square matrix $A$, $A + A\'$ is always:', options: shuffle(['Symmetric', 'Skew-symmetric', 'Diagonal', 'Zero']), correctAnswer: 'Symmetric', solution: 'Let $B = A + A\'$. Then $B\' = A\' + A = B$. So $B$ is symmetric.', difficulty_level: 'Hard' });

        // Q10: A - A' is always
        qs.push({ text: 'For any square matrix $A$, $A - A\'$ is always:', options: shuffle(['Skew-symmetric', 'Symmetric', 'Diagonal', 'Identity']), correctAnswer: 'Skew-symmetric', solution: 'Let $C = A - A\'$. Then $C\' = A\' - A = -(A - A\') = -C$. So $C$ is skew-symmetric.', difficulty_level: 'Hard' });

        setQuestions(qs);
    }, []);

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
    return (<div className="junior-practice-page" style={{ fontFamily: '"Open Sans",sans-serif' }}><header className="junior-practice-header" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) auto minmax(0,1fr)', alignItems: 'center', padding: '0 2rem', gap: '1rem' }}><div style={{ fontSize: '1rem', fontWeight: 'bold', color: '#31326F', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{SKILL_NAME}</div><div><div className="bg-white/90 backdrop-blur-md px-3 py-1.5 sm:px-6 sm:py-2 rounded-full border-2 border-[#4FB7B3]/30 text-[#31326F] font-black text-sm sm:text-xl shadow-lg whitespace-nowrap">Q {qIndex + 1}/{questions.length}</div></div><div style={{ justifySelf: 'end' }}><div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl border-2 border-[#4FB7B3]/30 text-[#31326F] font-bold text-lg shadow-md">{formatTime(timeElapsed)}</div></div></header><main className="practice-content-wrapper"><div className="practice-board-container" style={{ gridTemplateColumns: '1fr', maxWidth: 800, margin: '0 auto' }}><div className="practice-left-col" style={{ width: '100%' }}><div className="question-card-modern" style={{ paddingLeft: '2rem' }}><div className="question-header-modern"><h2 className="question-text-modern" style={{ fontSize: 'clamp(1rem,2vw,1.6rem)', maxHeight: 'none', fontWeight: 500, textAlign: 'left', overflow: 'visible', color: '#2D3748' }}><LatexText text={cq.text} /></h2></div>{cq.matrix && <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}><InteractiveMatrixBuilder rows={cq.matrix.length} cols={cq.matrix[0].length} values={cq.matrix.map(r => r.map(String))} compact={cq.matrix.length > 3} /></div>}<div className="interaction-area-modern"><div className="options-grid-modern">{cq.options.map((o, i) => (<button key={i} className={`option-btn-modern ${selectedOption === o ? 'selected' : ''} ${isSubmitted && o === cq.correctAnswer ? 'correct' : ''} ${isSubmitted && selectedOption === o && !isCorrect ? 'wrong' : ''}`} style={{ fontWeight: 500 }} onClick={() => !isSubmitted && setSelectedOption(o)} disabled={isSubmitted}><LatexText text={o} /></button>))}</div>{isSubmitted && isCorrect && <div style={{ display: 'flex', justifyContent: 'center', width: '100%', marginTop: '2rem' }}><motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="feedback-mini correct">{feedbackMessage}</motion.div></div>}</div></div></div></div></main><ExplanationModal isOpen={showExplanationModal} isCorrect={isCorrect} correctAnswer={cq.correctAnswer} explanation={cq.solution} onClose={() => setShowExplanationModal(false)} /><footer className="junior-bottom-bar"><div className="desktop-footer-controls"><button className="bg-red-50 text-red-500 px-6 py-2 rounded-xl border-2 border-red-100 font-bold" onClick={() => navigate(-1)}>Exit</button><div className="bottom-center">{isSubmitted && <button className="view-explanation-btn" onClick={() => setShowExplanationModal(true)}><Eye size={20} /> View Explanation</button>}</div><div className="bottom-right" style={{ display: 'flex', gap: 10 }}><button className="nav-pill-next-btn bg-gray-200 text-gray-600" onClick={handlePrev} disabled={qIndex === 0} style={{ opacity: qIndex === 0 ? 0.5 : 1 }}><ChevronLeft size={28} strokeWidth={3} /> Prev</button>{isSubmitted ? <button className="nav-pill-next-btn" onClick={handleNext}>{qIndex < questions.length - 1 ? <>Next <ChevronRight size={28} strokeWidth={3} /></> : <>Done <Check size={28} strokeWidth={3} /></>}</button> : <button className="nav-pill-submit-btn" onClick={handleCheck} disabled={!selectedOption}>Submit <Check size={28} strokeWidth={3} /></button>}</div></div><div className="mobile-footer-controls"><div className="mobile-footer-right"><button className="nav-pill-next-btn bg-gray-200 text-gray-600 p-2" onClick={handlePrev} disabled={qIndex === 0} style={{ minWidth: 'auto', opacity: qIndex === 0 ? 0.5 : 1 }}><ChevronLeft size={20} /></button>{isSubmitted && <button className="view-explanation-btn" onClick={() => setShowExplanationModal(true)}><Eye size={18} /></button>}{isSubmitted ? <button className="nav-pill-next-btn" onClick={handleNext}>{qIndex < questions.length - 1 ? 'Next' : 'Done'}</button> : <button className="nav-pill-submit-btn" onClick={handleCheck} disabled={!selectedOption}>Submit</button>}</div></div></footer></div>);
};

export default MatrixTransposeTest;
