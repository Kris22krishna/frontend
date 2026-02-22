import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, X, Eye, ChevronRight, ChevronLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { api } from '../../../../services/api';
import { LatexText } from '../../../LatexText';
import mascotImg from '../../../../assets/mascot.png';
import '../../../../pages/juniors/JuniorPracticeSession.css';

const SKILL_ID = 12200;
const SKILL_NAME = 'Matrices — Full Chapter Assessment';

const MatricesChapterTest = () => {
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
        const rand = (a, b) => Math.floor(Math.random() * (b - a + 1)) + a;
        const shuffle = arr => [...new Set(arr)].sort(() => Math.random() - 0.5);
        const qs = [];

        // ─── Topic 1: Matrix & Order (5 Qs) ───
        (() => { const r = rand(2, 4), c = rand(2, 5); qs.push({ text: `What is the order of a matrix with ${r} rows and ${c} columns?`, options: shuffle([`$${r}\\times${c}$`, `$${c}\\times${r}$`, `$${r}\\times${r}$`, `$${c}\\times${c}$`]), correctAnswer: `$${r}\\times${c}$`, solution: `Order = rows × cols = $${r}\\times${c}$.`, difficulty_level: 'Easy' }); })();
        (() => { const r = rand(2, 4), c = rand(2, 5), n = r * c; qs.push({ text: `A matrix of order $${r}\\times${c}$ has how many elements?`, options: shuffle([`${n}`, `${n + r}`, `${r + c}`, `${n - 1}`]), correctAnswer: `${n}`, solution: `Elements = $${r}\\times${c} = ${n}$.`, difficulty_level: 'Easy' }); })();
        (() => { const f = rand(0, 1) ? { l: '$a_{ij}=i+j$', fn: (i, j) => i + j } : { l: '$a_{ij}=2i-j$', fn: (i, j) => 2 * i - j }; const c = [[f.fn(1, 1), f.fn(1, 2)], [f.fn(2, 1), f.fn(2, 2)]]; const cs = `$\\begin{bmatrix}${c[0][0]}&${c[0][1]}\\\\${c[1][0]}&${c[1][1]}\\end{bmatrix}$`; qs.push({ text: `Construct 2×2 where ${f.l}. Result:`, options: shuffle([cs, `$\\begin{bmatrix}${c[0][1]}&${c[0][0]}\\\\${c[1][1]}&${c[1][0]}\\end{bmatrix}$`, `$\\begin{bmatrix}${c[0][0] + 1}&${c[0][1]}\\\\${c[1][0]}&${c[1][1] + 1}\\end{bmatrix}$`, `$\\begin{bmatrix}${c[1][0]}&${c[1][1]}\\\\${c[0][0]}&${c[0][1]}\\end{bmatrix}$`]), correctAnswer: cs, solution: `Substitute i,j from 1 to 2.`, difficulty_level: 'Medium' }); })();
        qs.push({ text: 'If a matrix has 13 elements, possible orders are:', options: shuffle(['$1\\times13$ and $13\\times1$', '$1\\times13$ only', '$13\\times13$', 'Not possible']), correctAnswer: '$1\\times13$ and $13\\times1$', solution: '13 is prime: only factor pairs (1,13) and (13,1).', difficulty_level: 'Medium' });
        qs.push({ text: 'Number of $3\\times3$ matrices with entries 0 or 1:', options: shuffle(['$512$', '$81$', '$27$', '$18$']), correctAnswer: '$512$', solution: '$2^9 = 512$.', difficulty_level: 'Hard' });

        // ─── Topic 2: Types (5 Qs) ───
        qs.push({ text: 'A matrix with one row is called:', options: shuffle(['Row matrix', 'Column matrix', 'Square matrix', 'Null matrix']), correctAnswer: 'Row matrix', solution: '$1\\times n$ → row matrix.', difficulty_level: 'Easy' });
        qs.push({ text: 'A scalar matrix becomes identity when $k=$:', options: shuffle(['$1$', '$0$', '$-1$', '$2$']), correctAnswer: '$1$', solution: 'All diag entries = 1, rest 0 → identity.', difficulty_level: 'Easy' });
        qs.push({ text: 'If $A+B=B$ for all $B$, then $A$ is:', options: shuffle(['Zero matrix', 'Identity matrix', '$B$ itself', 'Inverse of $B$']), correctAnswer: 'Zero matrix', solution: '$A = B-B = O$.', difficulty_level: 'Medium' });
        qs.push({ text: '$A=[a_{ij}]_{m\\times n}$ is square if:', options: shuffle(['$m=n$', '$m>n$', '$m<n$', '$m+n=1$']), correctAnswer: '$m=n$', solution: 'Rows = columns → square.', difficulty_level: 'Easy' });
        (() => { const k = rand(2, 6); qs.push({ text: `$\\begin{bmatrix}${k}&0&0\\\\0&${k}&0\\\\0&0&${k}\\end{bmatrix}$ is:`, options: shuffle([`Scalar matrix (k=${k})`, 'Identity matrix', 'Zero matrix', 'Non-scalar diagonal']), correctAnswer: `Scalar matrix (k=${k})`, solution: `All diag = ${k}, rest 0 → scalar.`, difficulty_level: 'Easy' }); })();

        // ─── Topic 3: Equality (5 Qs) ───
        qs.push({ text: 'Two matrices are equal if:', options: shuffle(['Same order and corresponding elements equal', 'Same number of elements', 'Same trace', 'Same determinant']), correctAnswer: 'Same order and corresponding elements equal', solution: 'Both conditions must hold.', difficulty_level: 'Easy' });
        (() => { const x = rand(2, 7); qs.push({ text: `If $\\begin{bmatrix}3x\\end{bmatrix}=\\begin{bmatrix}${3 * x}\\end{bmatrix}$, $x=$:`, options: shuffle([`$${x}$`, `$${x + 1}$`, `$${3 * x}$`, `$${x - 1}$`]), correctAnswer: `$${x}$`, solution: `$3x=${3 * x}\\Rightarrow x=${x}$.`, difficulty_level: 'Easy' }); })();
        (() => { const a = rand(1, 5), b = rand(1, 5); qs.push({ text: `If $2a+b=${2 * a + b}$ and $a-2b=${a - 2 * b}$, find $a$:`, options: shuffle([`$${a}$`, `$${a + 1}$`, `$${b}$`, `$${a - 1}$`]), correctAnswer: `$${a}$`, solution: `Solving: $a=${a}$.`, difficulty_level: 'Medium' }); })();
        qs.push({ text: 'A $2\\times3$ matrix can be equal to:', options: shuffle(['Only another $2\\times3$ matrix', 'Any $3\\times2$', 'Any with 6 elements', '$2\\times2$ if last col zero']), correctAnswer: 'Only another $2\\times3$ matrix', solution: 'Order must match.', difficulty_level: 'Easy' });
        (() => { const k = rand(2, 5); qs.push({ text: `$k^2=${k * k}$ gives $k=$:`, options: shuffle([`$\\pm${k}$`, `$${k}$`, `$${-k}$`, `$${k * k}$`]), correctAnswer: `$\\pm${k}$`, solution: `$k=\\pm\\sqrt{${k * k}}=\\pm${k}$.`, difficulty_level: 'Medium' }); })();

        // ─── Topic 4: Operations (5 Qs) ───
        (() => { const A = [[rand(1, 4), rand(1, 4)], [rand(1, 4), rand(1, 4)]]; const B = [[rand(1, 4), rand(1, 4)], [rand(1, 4), rand(1, 4)]]; const S = A.map((r, i) => r.map((v, j) => v + B[i][j])); const c = `$\\begin{bmatrix}${S[0][0]}&${S[0][1]}\\\\${S[1][0]}&${S[1][1]}\\end{bmatrix}$`; qs.push({ text: `$A+B=?$ where $A=\\begin{bmatrix}${A[0][0]}&${A[0][1]}\\\\${A[1][0]}&${A[1][1]}\\end{bmatrix}$, $B=\\begin{bmatrix}${B[0][0]}&${B[0][1]}\\\\${B[1][0]}&${B[1][1]}\\end{bmatrix}$`, options: shuffle([c, `$\\begin{bmatrix}${S[0][0] + 1}&${S[0][1]}\\\\${S[1][0]}&${S[1][1] + 1}\\end{bmatrix}$`, `$\\begin{bmatrix}${S[0][1]}&${S[0][0]}\\\\${S[1][1]}&${S[1][0]}\\end{bmatrix}$`, `$\\begin{bmatrix}${A[0][0] * B[0][0]}&${A[0][1] * B[0][1]}\\\\${A[1][0] * B[1][0]}&${A[1][1] * B[1][1]}\\end{bmatrix}$`]), correctAnswer: c, solution: 'Add corresponding elements.', difficulty_level: 'Easy' }); })();
        (() => { const A = [[rand(1, 4), rand(1, 4)], [rand(1, 4), rand(1, 4)]]; const R = A.map(r => r.map(v => 3 * v)); const c = `$\\begin{bmatrix}${R[0][0]}&${R[0][1]}\\\\${R[1][0]}&${R[1][1]}\\end{bmatrix}$`; qs.push({ text: `$3A=?$ where $A=\\begin{bmatrix}${A[0][0]}&${A[0][1]}\\\\${A[1][0]}&${A[1][1]}\\end{bmatrix}$`, options: shuffle([c, `$\\begin{bmatrix}${R[0][0] + 1}&${R[0][1]}\\\\${R[1][0]}&${R[1][1]}\\end{bmatrix}$`, `$\\begin{bmatrix}${A[0][0]}&${A[0][1]}\\\\${A[1][0]}&${A[1][1]}\\end{bmatrix}$`, `$\\begin{bmatrix}${R[1][0]}&${R[1][1]}\\\\${R[0][0]}&${R[0][1]}\\end{bmatrix}$`]), correctAnswer: c, solution: 'Multiply each element by 3.', difficulty_level: 'Easy' }); })();
        (() => { const A = [[rand(1, 3), rand(1, 3)], [rand(1, 3), rand(1, 3)]]; const B = [[rand(1, 3), rand(1, 3)], [rand(1, 3), rand(1, 3)]]; const AB = [[A[0][0] * B[0][0] + A[0][1] * B[1][0], A[0][0] * B[0][1] + A[0][1] * B[1][1]], [A[1][0] * B[0][0] + A[1][1] * B[1][0], A[1][0] * B[0][1] + A[1][1] * B[1][1]]]; const c = `$\\begin{bmatrix}${AB[0][0]}&${AB[0][1]}\\\\${AB[1][0]}&${AB[1][1]}\\end{bmatrix}$`; qs.push({ text: `$AB=?$ for $A=\\begin{bmatrix}${A[0][0]}&${A[0][1]}\\\\${A[1][0]}&${A[1][1]}\\end{bmatrix}$, $B=\\begin{bmatrix}${B[0][0]}&${B[0][1]}\\\\${B[1][0]}&${B[1][1]}\\end{bmatrix}$`, options: shuffle([c, `$\\begin{bmatrix}${AB[0][0] + 1}&${AB[0][1]}\\\\${AB[1][0]}&${AB[1][1] + 1}\\end{bmatrix}$`, `$\\begin{bmatrix}${A[0][0] * B[0][0]}&${A[0][1] * B[0][1]}\\\\${A[1][0] * B[1][0]}&${A[1][1] * B[1][1]}\\end{bmatrix}$`, `$\\begin{bmatrix}${AB[1][0]}&${AB[1][1]}\\\\${AB[0][0]}&${AB[0][1]}\\end{bmatrix}$`]), correctAnswer: c, solution: 'Use dot product: row of A × col of B.', difficulty_level: 'Hard' }); })();
        qs.push({ text: 'Is $AB=BA$ always?', options: shuffle(['No', 'Yes', 'Only for square', 'Only for diagonal']), correctAnswer: 'No', solution: 'Matrix mult is not commutative.', difficulty_level: 'Easy' });
        qs.push({ text: '$A(B+C)=$', options: shuffle(['$AB+AC$', '$A+BC$', '$AB+C$', '$BA+CA$']), correctAnswer: '$AB+AC$', solution: 'Distributive property.', difficulty_level: 'Medium' });

        // ─── Topic 5: Transpose (5 Qs) ───
        (() => { const r = rand(2, 3), c = rand(3, 4); qs.push({ text: `If $A$ is $${r}\\times${c}$, order of $A'$ is:`, options: shuffle([`$${c}\\times${r}$`, `$${r}\\times${c}$`, `$${r}\\times${r}$`, `$${c}\\times${c}$`]), correctAnswer: `$${c}\\times${r}$`, solution: `Transpose swaps: $${r}\\times${c}\\to${c}\\times${r}$.`, difficulty_level: 'Easy' }); })();
        qs.push({ text: '$(A\')\'=$', options: shuffle(['$A$', '$A\'$', '$I$', '$O$']), correctAnswer: '$A$', solution: 'Double transpose returns original.', difficulty_level: 'Easy' });
        qs.push({ text: '$(AB)\'=$', options: shuffle(['$B\'A\'$', '$A\'B\'$', '$(BA)\'$', '$AB$']), correctAnswer: '$B\'A\'$', solution: 'Reversal law.', difficulty_level: 'Medium' });
        qs.push({ text: '$A+A\'$ is always:', options: shuffle(['Symmetric', 'Skew-symmetric', 'Diagonal', 'Zero']), correctAnswer: 'Symmetric', solution: '$(A+A\')\'=A\'+A=A+A\'$.', difficulty_level: 'Hard' });
        qs.push({ text: '$A-A\'$ is always:', options: shuffle(['Skew-symmetric', 'Symmetric', 'Diagonal', 'Identity']), correctAnswer: 'Skew-symmetric', solution: '$(A-A\')\'=A\'-A=-(A-A\')$.', difficulty_level: 'Hard' });

        // ─── Topic 6: Invertible (5 Qs) ───
        qs.push({ text: 'A matrix is invertible if:', options: shuffle(['$|A|\\neq0$', '$|A|=0$', '$A$ is symmetric', '$A$ is square']), correctAnswer: '$|A|\\neq0$', solution: 'Non-zero determinant required.', difficulty_level: 'Easy' });
        (() => { const a = rand(1, 4), b = rand(1, 4), c2 = rand(1, 4), d = rand(1, 4); const det = a * d - b * c2; qs.push({ text: `$|A|=?$ for $A=\\begin{bmatrix}${a}&${b}\\\\${c2}&${d}\\end{bmatrix}$`, options: shuffle([`$${det}$`, `$${a * d + b * c2}$`, `$${a + d}$`, `$${det + 1}$`]), correctAnswer: `$${det}$`, solution: `$${a}(${d})-${b}(${c2})=${det}$.`, difficulty_level: 'Easy' }); })();
        qs.push({ text: '$(AB)^{-1}=$', options: shuffle(['$B^{-1}A^{-1}$', '$A^{-1}B^{-1}$', '$(BA)^{-1}$', '$AB$']), correctAnswer: '$B^{-1}A^{-1}$', solution: 'Reversal law for inverse.', difficulty_level: 'Medium' });
        qs.push({ text: '$A\\cdot\\text{adj}(A)=$', options: shuffle(['$|A|\\cdot I$', '$A^{-1}$', '$I$', '$O$']), correctAnswer: '$|A|\\cdot I$', solution: 'Fundamental property of adjoint.', difficulty_level: 'Hard' });
        qs.push({ text: 'To solve $AX=B$ using inverse: $X=$', options: shuffle(['$A^{-1}B$', '$BA^{-1}$', '$AB^{-1}$', '$B^{-1}A$']), correctAnswer: '$A^{-1}B$', solution: 'Pre-multiply by $A^{-1}$: $X=A^{-1}B$.', difficulty_level: 'Medium' });

        // Shuffle all 30
        setQuestions(qs.sort(() => Math.random() - 0.5));
    }, []);

    // ─── Session & Timer ───
    useEffect(() => {
        if (isFinished) return;
        const uid = sessionStorage.getItem('userId') || localStorage.getItem('userId');
        if (uid && !sessionId) api.createPracticeSession(uid, SKILL_ID).then(s => { if (s?.session_id) setSessionId(s.session_id); }).catch(console.error);
        const timer = setInterval(() => setTimeElapsed(p => p + 1), 1000);
        const onVis = () => { if (document.hidden) { accumulatedTime.current += Date.now() - questionStartTime.current; isTabActive.current = false; } else { questionStartTime.current = Date.now(); isTabActive.current = true; } };
        document.addEventListener('visibilitychange', onVis);
        return () => { clearInterval(timer); document.removeEventListener('visibilitychange', onVis); };
    }, [sessionId, isFinished]);

    const formatTime = s => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;

    const recordAttempt = async (q, sel, correct) => {
        const uid = sessionStorage.getItem('userId') || localStorage.getItem('userId');
        if (!uid) return;
        let t = accumulatedTime.current; if (isTabActive.current) t += Date.now() - questionStartTime.current;
        const sec = Math.max(0, Math.round(t / 1000));
        api.recordAttempt({ user_id: parseInt(uid), session_id: sessionId, skill_id: SKILL_ID, template_id: null, difficulty_level: q.difficulty_level || 'Medium', question_text: q.text, correct_answer: q.correctAnswer, student_answer: sel || '', is_correct: correct, solution_text: q.solution || '', time_spent_seconds: sec }).catch(console.error);
    };

    const handleQuestionComplete = () => {
        if (!selectedOption || !questions[qIndex]) return;
        const q = questions[qIndex]; const right = selectedOption === q.correctAnswer;
        let t = accumulatedTime.current; if (isTabActive.current) t += Date.now() - questionStartTime.current;
        const sec = Math.max(0, Math.round(t / 1000));
        const updated = { ...answers, [qIndex]: { selectedOption, isCorrect: right, timeSpent: sec, isSkipped: false } };
        setAnswers(updated); recordAttempt(q, selectedOption, right);
        if (fromReview) { setFromReview(false); setShowReview(true); return; }
        if (qIndex < questions.length - 1) { setQIndex(p => p + 1); accumulatedTime.current = 0; questionStartTime.current = Date.now(); }
        else { const sk = questions.map((_, i) => i).filter(i => !updated[i] || updated[i].isSkipped); if (sk.length > 0) setShowReview(true); else handleFinalSubmit(); }
    };

    const handleSkip = () => {
        let t = accumulatedTime.current; if (isTabActive.current) t += Date.now() - questionStartTime.current;
        const sec = Math.max(0, Math.round(t / 1000));
        setAnswers(p => ({ ...p, [qIndex]: { selectedOption: 'Skipped', isCorrect: false, timeSpent: sec, isSkipped: true } }));
        recordAttempt(questions[qIndex], 'Skipped', false);
        if (fromReview) { setFromReview(false); setShowReview(true); return; }
        handleNext();
    };

    const handleNext = () => { if (qIndex < questions.length - 1) { setQIndex(p => p + 1); accumulatedTime.current = 0; questionStartTime.current = Date.now(); } else { const sk = questions.map((_, i) => i).filter(i => !answers[i] || answers[i].isSkipped); if (sk.length > 0) setShowReview(true); else handleFinalSubmit(); } };
    const handlePrev = () => { if (qIndex > 0) setQIndex(p => p - 1); };

    const handleFinalSubmit = async () => {
        if (sessionId) await api.finishSession(sessionId).catch(console.error);
        const uid = sessionStorage.getItem('userId') || localStorage.getItem('userId');
        if (uid) {
            const tc = Object.values(answers).filter(v => v.isCorrect).length;
            await api.createReport({ title: SKILL_NAME, type: 'practice', score: (tc / questions.length) * 100, parameters: { skill_id: SKILL_ID, skill_name: SKILL_NAME, total_questions: questions.length, correct_answers: tc, timestamp: new Date().toISOString(), time_taken_seconds: timeElapsed }, user_id: parseInt(uid) }).catch(console.error);
        }
        setIsFinished(true); setShowReview(false);
    };

    useEffect(() => { const s = answers[qIndex]; if (s && !s.isSkipped) setSelectedOption(s.selectedOption); else setSelectedOption(null); }, [qIndex]);

    if (questions.length === 0) return <div>Loading...</div>;

    // ─── Results Screen ───
    if (isFinished) {
        const attempted = Object.values(answers).filter(a => !a.isSkipped).length;
        const correct = Object.values(answers).filter(a => a.isCorrect).length;
        const wrong = attempted - correct;
        const skipped = Object.values(answers).filter(a => a.isSkipped).length;
        const pct = Math.round((correct / questions.length) * 100);

        return (
            <div className="junior-practice-page raksha-theme p-3 sm:p-8 pb-24" style={{ fontFamily: '"Open Sans", sans-serif', backgroundColor: '#F8FAFC', minHeight: '100vh', overflowY: 'auto' }}>
                <div className="max-w-3xl mx-auto w-full">
                    <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-xl border-2 border-[#4FB7B3]/20 my-4 sm:my-8">
                        <div className="text-center mb-6 sm:mb-8">
                            <img src={mascotImg} alt="Mascot" className="w-16 h-16 sm:w-24 sm:h-24 mx-auto mb-3 sm:mb-4 object-contain" />
                            <h2 className="text-2xl sm:text-3xl font-bold text-[#31326F] mb-1 sm:mb-2">{pct >= 80 ? '🏆 Outstanding!' : pct >= 50 ? '📊 Good Effort!' : '📝 Keep Studying!'}</h2>
                            <p className="text-sm sm:text-base text-gray-500">{SKILL_NAME}</p>
                            <div style={{ fontSize: '3rem', fontWeight: 900, color: pct >= 80 ? '#059669' : pct >= 50 ? '#D97706' : '#DC2626', marginTop: 8 }}>{pct}%</div>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 mb-6 sm:mb-8">
                            <div className="bg-blue-50 p-2 sm:p-4 rounded-xl text-center border border-blue-100"><div className="text-blue-500 font-bold text-xs sm:text-sm mb-1 uppercase">Time</div><div className="text-lg sm:text-2xl font-black text-[#31326F]">{formatTime(timeElapsed)}</div></div>
                            <div className="bg-green-50 p-2 sm:p-4 rounded-xl text-center border border-green-100"><div className="text-green-500 font-bold text-xs sm:text-sm mb-1 uppercase">Correct</div><div className="text-lg sm:text-2xl font-black text-[#31326F]">{correct}</div></div>
                            <div className="bg-red-50 p-2 sm:p-4 rounded-xl text-center border border-red-100"><div className="text-red-500 font-bold text-xs sm:text-sm mb-1 uppercase">Wrong</div><div className="text-lg sm:text-2xl font-black text-[#31326F]">{wrong}</div></div>
                            <div className="bg-gray-50 p-2 sm:p-4 rounded-xl text-center border border-gray-100"><div className="text-gray-500 font-bold text-xs sm:text-sm mb-1 uppercase">Skipped</div><div className="text-lg sm:text-2xl font-black text-[#31326F]">{skipped}</div></div>
                        </div>
                        <div className="space-y-4 sm:space-y-6">
                            <h3 className="text-lg sm:text-xl font-bold text-[#31326F] border-b pb-2">Detailed Report</h3>
                            {questions.map((q, idx) => {
                                const ans = answers[idx] || { isSkipped: true, selectedOption: 'Not Attempted', isCorrect: false, timeSpent: 0 };
                                return (
                                    <div key={idx} className="p-4 sm:p-6 rounded-xl border-2 border-gray-100 bg-white shadow-sm">
                                        <div className="flex justify-between items-start gap-2 mb-3">
                                            <div className="flex items-center gap-3"><span className="w-7 h-7 rounded-full bg-[#31326F] text-white flex items-center justify-center font-bold text-xs">{idx + 1}</span><span className="text-xs text-gray-500 font-semibold">Time: {ans.timeSpent}s</span></div>
                                            {ans.isSkipped ? <span className="px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 font-bold text-xs uppercase">Skipped</span> : ans.isCorrect ? <span className="px-2 py-0.5 rounded-full bg-green-100 text-green-600 font-bold text-xs uppercase">Correct</span> : <span className="px-2 py-0.5 rounded-full bg-red-100 text-red-600 font-bold text-xs uppercase">Wrong</span>}
                                        </div>
                                        <div className="text-sm text-[#31326F] mb-3 font-medium"><LatexText text={q.text} /></div>
                                        <div className="grid grid-cols-2 gap-2 text-xs mb-2">
                                            <div className="p-2 rounded-lg bg-gray-50 border"><span className="text-gray-400 block text-xs">Your Answer:</span><span className={ans.isCorrect ? 'text-green-600 font-bold' : 'text-red-500 font-bold'}><LatexText text={ans.selectedOption} /></span></div>
                                            <div className="p-2 rounded-lg bg-green-50 border border-green-100"><span className="text-green-400 block text-xs">Correct:</span><span className="text-green-700 font-bold"><LatexText text={q.correctAnswer} /></span></div>
                                        </div>
                                        <div className="p-2 rounded-lg bg-amber-50 border border-amber-100 text-xs italic text-[#31326F]"><span className="font-bold not-italic text-amber-700">Explanation: </span><LatexText text={q.solution} /></div>
                                    </div>
                                );
                            })}
                        </div>
                        <div className="mt-8 flex justify-center"><button className="bg-[#31326F] text-white w-full sm:w-auto px-12 py-3 sm:py-4 rounded-xl font-black text-lg hover:scale-105 active:scale-95 transition-all shadow-xl" onClick={() => navigate(-1)}>Done</button></div>
                    </motion.div>
                </div>
            </div>
        );
    }

    // ─── Review Screen ───
    if (showReview) {
        const skippedIdx = questions.map((_, i) => i).filter(i => !answers[i] || answers[i].isSkipped);
        return (
            <div className="junior-practice-page raksha-theme p-3 sm:p-8" style={{ fontFamily: '"Open Sans", sans-serif', backgroundColor: '#F8FAFC', minHeight: '100vh' }}>
                <div className="max-w-3xl mx-auto w-full">
                    <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="bg-white rounded-2xl p-6 sm:p-10 shadow-xl border-2 border-[#4FB7B3]/20 my-4 sm:my-8">
                        <div className="text-center mb-6"><div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3"><Eye className="text-amber-600" size={36} /></div><h2 className="text-2xl font-bold text-[#31326F] mb-2">Review Your Test</h2><p className="text-gray-500 text-lg">You have <span className="font-bold text-amber-600">{skippedIdx.length}</span> unanswered question{skippedIdx.length > 1 ? 's' : ''}.</p></div>
                        <div className="mb-6"><p className="text-sm font-semibold text-gray-400 uppercase mb-3">Tap to answer</p><div className="grid grid-cols-5 sm:grid-cols-6 gap-2">{skippedIdx.map(idx => (<button key={idx} onClick={() => { setQIndex(idx); setShowReview(false); setFromReview(true); }} className="aspect-square rounded-xl border-2 border-amber-200 bg-amber-50 text-[#31326F] font-bold text-lg hover:bg-amber-100 active:scale-95 transition-all flex items-center justify-center shadow-sm">Q{idx + 1}</button>))}</div></div>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <button onClick={() => { setQIndex(questions.length - 1); setShowReview(false); }} className="px-8 py-3 rounded-xl border-2 border-[#31326F] text-[#31326F] font-bold text-lg hover:bg-gray-50">Go Back</button>
                            <button onClick={handleFinalSubmit} className="px-8 py-3 rounded-xl bg-[#31326F] text-white font-black text-lg hover:scale-105 active:scale-95 shadow-xl flex items-center gap-2 justify-center">Submit Anyway <Check size={22} /></button>
                        </div>
                    </motion.div>
                </div>
            </div>
        );
    }

    // ─── Question Screen (STRICT: no hints, no explanation) ───
    const cq = questions[qIndex];
    return (
        <div className="junior-practice-page" style={{ fontFamily: '"Open Sans", sans-serif' }}>
            <header className="junior-practice-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 2rem' }}>
                <div className="header-left"></div>
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-max"><div className="bg-white/90 backdrop-blur-md px-3 py-1.5 sm:px-6 sm:py-2 rounded-full border-2 border-[#4FB7B3]/30 text-[#31326F] font-black text-sm sm:text-xl shadow-lg whitespace-nowrap">Chapter Test: {qIndex + 1} / {questions.length}</div></div>
                <div className="header-right"><div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl border-2 border-[#4FB7B3]/30 text-[#31326F] font-bold text-lg shadow-md">{formatTime(timeElapsed)}</div></div>
            </header>
            <main className="practice-content-wrapper">
                <div className="practice-board-container" style={{ gridTemplateColumns: '1fr', maxWidth: 800, margin: '0 auto' }}>
                    <div className="practice-left-col" style={{ width: '100%' }}>
                        <div className="question-card-modern" style={{ paddingLeft: '2rem' }}>
                            <div className="question-header-modern"><h2 className="question-text-modern" style={{ fontSize: 'clamp(1rem, 2vw, 1.6rem)', maxHeight: 'none', fontWeight: 500, textAlign: 'left', overflow: 'visible' }}><LatexText text={cq.text} /></h2></div>
                            <div className="interaction-area-modern"><div className="options-grid-modern">{cq.options.map((o, i) => (<button key={i} className={`option-btn-modern ${selectedOption === o ? 'selected' : ''}`} style={{ fontWeight: 500 }} onClick={() => setSelectedOption(o)}><LatexText text={o} /></button>))}</div></div>
                        </div>
                    </div>
                </div>
            </main>
            <footer className="junior-bottom-bar">
                <div className="desktop-footer-controls">
                    <button className="bg-red-50 text-red-500 px-6 py-2 rounded-xl border-2 border-red-100 font-bold" onClick={async () => { if (sessionId) await api.finishSession(sessionId).catch(console.error); navigate(-1); }}>Exit Test</button>
                    <div className="bottom-center"></div>
                    <div className="nav-buttons-group">
                        <button className="nav-pill-next-btn bg-gray-200 text-gray-700 border-2 border-gray-300" onClick={handlePrev} disabled={qIndex === 0} style={{ opacity: qIndex === 0 ? 0.5 : 1 }}><ChevronLeft size={28} strokeWidth={3} /> Prev</button>
                        <button className="nav-pill-next-btn bg-gray-500 text-white border-2 border-gray-600" onClick={handleSkip}>Skip <ChevronRight size={28} strokeWidth={3} /></button>
                        <button className="nav-pill-next-btn" onClick={handleQuestionComplete} disabled={!selectedOption}>{qIndex < questions.length - 1 ? <>Next <ChevronRight size={28} strokeWidth={3} /></> : <>Done <Check size={28} strokeWidth={3} /></>}</button>
                    </div>
                </div>
                <div className="mobile-footer-controls">
                    <button className="bg-red-50 text-red-500 p-2 rounded-lg border border-red-100" onClick={async () => { if (sessionId) await api.finishSession(sessionId).catch(console.error); navigate(-1); }}><X size={20} /></button>
                    <div className="nav-buttons-group">
                        <button className="nav-pill-next-btn bg-gray-200 text-gray-700 p-2 border border-gray-300" onClick={handlePrev} disabled={qIndex === 0} style={{ opacity: qIndex === 0 ? 0.5 : 1, minWidth: 'auto' }}><ChevronLeft size={20} /></button>
                        <button className="nav-pill-next-btn bg-gray-500 text-white p-2 border border-gray-600" onClick={handleSkip}>Skip</button>
                        <button className="nav-pill-next-btn" onClick={handleQuestionComplete} disabled={!selectedOption}>{qIndex < questions.length - 1 ? 'Next' : 'Done'}</button>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default MatricesChapterTest;
