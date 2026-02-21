import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, X, Eye, ChevronRight, ChevronLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { api } from '../../../../services/api';
import { LatexText } from '../../../LatexText';
import ExplanationModal from '../../../ExplanationModal';
import InteractiveMatrixBuilder from '../components/InteractiveMatrixBuilder';
import '../../../../pages/juniors/JuniorPracticeSession.css';

const SKILL_ID = 12201;
const SKILL_NAME = 'Matrices — Topic 1: Matrix & Order';

const MatrixOrderTest = () => {
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
    const [showReview, setShowReview] = useState(false);
    const [fromReview, setFromReview] = useState(false);

    const CORRECT_MESSAGES = ['✨ Amazing! ✨', '🌟 Brilliant! 🌟', '🎉 Correct! 🎉', '🚀 Super! 🚀', '💎 Spot on! 💎'];

    useEffect(() => {
        const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
        const shuffle = arr => [...new Set(arr)].sort(() => Math.random() - 0.5);
        const qs = [];

        // Q1: Order of a given matrix
        (() => {
            const r = rand(2, 4), c = rand(2, 5);
            const vals = Array.from({ length: r }, () => Array.from({ length: c }, () => rand(-9, 9)));
            qs.push({
                text: `What is the order of the following matrix?`,
                matrix: vals,
                options: shuffle([`$${r} \\times ${c}$`, `$${c} \\times ${r}$`, `$${r} \\times ${r}$`, `$${c} \\times ${c}$`]),
                correctAnswer: `$${r} \\times ${c}$`,
                solution: `The matrix has ${r} rows and ${c} columns, so its order is $${r} \\times ${c}$.`,
                difficulty_level: 'Easy'
            });
        })();

        // Q2: Number of elements
        (() => {
            const r = rand(2, 4), c = rand(2, 5);
            const n = r * c;
            qs.push({
                text: `A matrix of order $${r} \\times ${c}$ has how many elements?`,
                options: shuffle([`${n}`, `${n + r}`, `${r + c}`, `${n - 1}`]),
                correctAnswer: `${n}`,
                solution: `Number of elements = rows × columns = $${r} \\times ${c} = ${n}$.`,
                difficulty_level: 'Easy'
            });
        })();

        // Q3: Identify element aij
        (() => {
            const vals = Array.from({ length: 3 }, () => Array.from({ length: 4 }, () => rand(-9, 20)));
            const ri = rand(0, 2), ci = rand(0, 3);
            const el = vals[ri][ci];
            qs.push({
                text: `In the matrix shown, what is $a_{${ri + 1}${ci + 1}}$?`,
                matrix: vals,
                highlightCells: [[ri, ci]],
                showIndices: true,
                options: shuffle([`${el}`, `${el + rand(1, 5)}`, `${vals[(ri + 1) % 3][ci]}`, `${vals[ri][(ci + 1) % 4]}`]),
                correctAnswer: `${el}`,
                solution: `$a_{${ri + 1}${ci + 1}}$ is the element in row ${ri + 1}, column ${ci + 1}, which is $${el}$.`,
                difficulty_level: 'Easy'
            });
        })();

        // Q4: Construct 2×2 from aij = i + j
        (() => {
            const formula = rand(0, 2);
            const formulas = [
                { label: '$a_{ij} = i + j$', fn: (i, j) => i + j },
                { label: '$a_{ij} = 2i - j$', fn: (i, j) => 2 * i - j },
                { label: '$a_{ij} = i \\times j$', fn: (i, j) => i * j },
            ];
            const f = formulas[formula];
            const correct = [[f.fn(1, 1), f.fn(1, 2)], [f.fn(2, 1), f.fn(2, 2)]];
            const correctStr = `$\\begin{bmatrix} ${correct[0][0]} & ${correct[0][1]} \\\\ ${correct[1][0]} & ${correct[1][1]} \\end{bmatrix}$`;
            const wrong1 = `$\\begin{bmatrix} ${correct[0][1]} & ${correct[0][0]} \\\\ ${correct[1][1]} & ${correct[1][0]} \\end{bmatrix}$`;
            const wrong2 = `$\\begin{bmatrix} ${correct[0][0] + 1} & ${correct[0][1]} \\\\ ${correct[1][0]} & ${correct[1][1] + 1} \\end{bmatrix}$`;
            const wrong3 = `$\\begin{bmatrix} ${correct[1][0]} & ${correct[1][1]} \\\\ ${correct[0][0]} & ${correct[0][1]} \\end{bmatrix}$`;
            qs.push({
                text: `Construct a $2 \\times 2$ matrix where ${f.label}.`,
                options: shuffle([correctStr, wrong1, wrong2, wrong3]),
                correctAnswer: correctStr,
                solution: `Substituting $i$ and $j$ from 1 to 2: the result is ${correctStr}.`,
                difficulty_level: 'Medium'
            });
        })();

        // Q5: Possible orders for n elements
        (() => {
            const n = [6, 8, 12, 18, 24][rand(0, 4)];
            const factors = [];
            for (let i = 1; i <= n; i++) if (n % i === 0) factors.push(`$${i} \\times ${n / i}$`);
            const count = factors.length;
            qs.push({
                text: `If a matrix has ${n} elements, how many different orders are possible?`,
                options: shuffle([`${count}`, `${count + 1}`, `${count - 1}`, `${n}`]),
                correctAnswer: `${count}`,
                solution: `The number of possible orders equals the number of factor pairs of ${n}. These are: ${factors.join(', ')}. Total = ${count}.`,
                difficulty_level: 'Medium'
            });
        })();

        // Q6: Which element position
        (() => {
            const r = 3, c = 3;
            const vals = Array.from({ length: r }, () => Array.from({ length: c }, () => rand(1, 15)));
            const target = vals[1][2];
            qs.push({
                text: `In the matrix shown, the element ${target} at position row 2, column 3 is denoted as:`,
                matrix: vals,
                highlightCells: [[1, 2]],
                options: shuffle([`$a_{23}$`, `$a_{32}$`, `$a_{22}$`, `$a_{33}$`]),
                correctAnswer: `$a_{23}$`,
                solution: `An element in row $i$, column $j$ is denoted $a_{ij}$. Row 2, Column 3 → $a_{23}$.`,
                difficulty_level: 'Easy'
            });
        })();

        // Q7: Construct 3×4 from aij = |3i + j| / 2 (pick one element)
        (() => {
            const fn = (i, j) => Math.abs(3 * i + j) / 2;
            const ri = rand(1, 3), ci = rand(1, 4);
            const val = fn(ri, ci);
            qs.push({
                text: `For a $3 \\times 4$ matrix where $a_{ij} = \\frac{1}{2}|3i + j|$, find $a_{${ri}${ci}}$.`,
                options: shuffle([`$${val}$`, `$${val + 0.5}$`, `$${val + 1}$`, `$${Math.abs(val - 1)}$`]),
                correctAnswer: `$${val}$`,
                solution: `$a_{${ri}${ci}} = \\frac{1}{2}|3(${ri}) + ${ci}| = \\frac{1}{2}|${3 * ri + ci}| = ${val}$.`,
                difficulty_level: 'Medium'
            });
        })();

        // Q8: Row matrix or column matrix?
        (() => {
            const isRow = rand(0, 1);
            const size = rand(3, 5);
            const vals = Array.from({ length: size }, () => rand(-5, 10));
            const matrix = isRow ? [vals] : vals.map(v => [v]);
            const order = isRow ? `$1 \\times ${size}$` : `$${size} \\times 1$`;
            qs.push({
                text: `What type of matrix is the one shown below?`,
                matrix: matrix,
                options: shuffle(['Row matrix', 'Column matrix', 'Square matrix', 'Zero matrix']),
                correctAnswer: isRow ? 'Row matrix' : 'Column matrix',
                solution: `The matrix has order ${order}. A matrix with ${isRow ? 'one row' : 'one column'} is called a ${isRow ? 'row' : 'column'} matrix.`,
                difficulty_level: 'Easy'
            });
        })();

        // Q9: Number of elements is 13 — possible orders
        (() => {
            const n = 13;
            qs.push({
                text: `If a matrix has 13 elements, what are the possible orders?`,
                options: shuffle([
                    '$1 \\times 13$ and $13 \\times 1$',
                    '$1 \\times 13$, $13 \\times 1$, and $13 \\times 13$',
                    'No matrix is possible',
                    '$1 \\times 13$ only'
                ]),
                correctAnswer: '$1 \\times 13$ and $13 \\times 1$',
                solution: `13 is prime, so its only factor pairs are $(1, 13)$ and $(13, 1)$.`,
                difficulty_level: 'Medium'
            });
        })();

        // Q10: Number of possible 3×3 matrices with entries 0 or 1
        (() => {
            qs.push({
                text: 'The number of all possible matrices of order $3 \\times 3$ with each entry 0 or 1 is:',
                options: shuffle(['$512$', '$81$', '$27$', '$18$']),
                correctAnswer: '$512$',
                solution: `Each of the $3 \\times 3 = 9$ entries can be 0 or 1. Total = $2^9 = 512$.`,
                difficulty_level: 'Hard'
            });
        })();

        setQuestions(qs);
    }, []);

    // ─── Session & Timer ───
    useEffect(() => {
        if (isFinished) return;
        const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId');
        if (userId && !sessionId) {
            api.createPracticeSession(userId, SKILL_ID).then(s => { if (s?.session_id) setSessionId(s.session_id); }).catch(console.error);
        }
        const timer = setInterval(() => setTimeElapsed(p => p + 1), 1000);
        const onVis = () => { if (document.hidden) { accumulatedTime.current += Date.now() - questionStartTime.current; isTabActive.current = false; } else { questionStartTime.current = Date.now(); isTabActive.current = true; } };
        document.addEventListener('visibilitychange', onVis);
        return () => { clearInterval(timer); document.removeEventListener('visibilitychange', onVis); };
    }, [sessionId, isFinished]);

    const formatTime = s => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;

    const recordAttempt = async (q, sel, correct) => {
        const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId');
        if (!userId) return;
        let t = accumulatedTime.current; if (isTabActive.current) t += Date.now() - questionStartTime.current;
        const sec = Math.max(0, Math.round(t / 1000));
        api.recordAttempt({ user_id: parseInt(userId), session_id: sessionId, skill_id: SKILL_ID, template_id: null, difficulty_level: q.difficulty_level || 'Medium', question_text: q.text, correct_answer: q.correctAnswer, student_answer: sel || '', is_correct: correct, solution_text: q.solution || '', time_spent_seconds: sec }).catch(console.error);
    };

    const handleCheck = () => {
        if (!selectedOption) return;
        const q = questions[qIndex];
        const right = selectedOption === q.correctAnswer;
        setIsCorrect(right); setIsSubmitted(true);
        if (right) setFeedbackMessage(CORRECT_MESSAGES[Math.floor(Math.random() * CORRECT_MESSAGES.length)]);
        else setShowExplanationModal(true);
        setAnswers(p => ({ ...p, [qIndex]: { selectedOption, isCorrect: right } }));
        recordAttempt(q, selectedOption, right);
    };

    const handleNext = async () => {
        if (qIndex < questions.length - 1) { setQIndex(p => p + 1); accumulatedTime.current = 0; questionStartTime.current = Date.now(); }
        else { await handleFinalSubmit(); }
    };
    const handlePrev = () => { if (qIndex > 0) setQIndex(p => p - 1); };

    const handleFinalSubmit = async () => {
        if (sessionId) await api.finishSession(sessionId).catch(console.error);
        const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId');
        if (userId) {
            const totalCorrect = Object.values(answers).filter(v => v.isCorrect).length;
            await api.createReport({ title: SKILL_NAME, type: 'practice', score: (totalCorrect / questions.length) * 100, parameters: { skill_id: SKILL_ID, skill_name: SKILL_NAME, total_questions: questions.length, correct_answers: totalCorrect, timestamp: new Date().toISOString(), time_taken_seconds: timeElapsed }, user_id: parseInt(userId) }).catch(console.error);
        }
        setIsFinished(true);
    };

    useEffect(() => {
        const saved = answers[qIndex];
        if (saved) { setSelectedOption(saved.selectedOption); setIsCorrect(saved.isCorrect); setIsSubmitted(true); }
        else { setSelectedOption(null); setIsCorrect(false); setIsSubmitted(false); }
    }, [qIndex, answers]);
    useEffect(() => { setShowExplanationModal(false); }, [qIndex]);

    if (questions.length === 0) return <div>Loading...</div>;

    if (isFinished) {
        const correct = Object.values(answers).filter(a => a.isCorrect).length;
        const wrong = Object.values(answers).filter(a => !a.isCorrect).length;
        return (
            <div className="junior-practice-page raksha-theme p-3 sm:p-8 pb-24 sm:pb-32" style={{ fontFamily: '"Open Sans", sans-serif', backgroundColor: '#F8FAFC', minHeight: '100vh', overflowY: 'auto' }}>
                <div className="max-w-3xl mx-auto w-full">
                    <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-xl border-2 border-[#4FB7B3]/20 my-4 sm:my-8">
                        <div className="text-center mb-6 sm:mb-8">
                            <div style={{ fontSize: '3rem', marginBottom: 8 }}>{correct >= 7 ? '🏆' : '📝'}</div>
                            <h2 className="text-2xl sm:text-3xl font-bold text-[#31326F] mb-1 sm:mb-2">{correct >= 7 ? 'Excellent!' : 'Keep Practicing!'}</h2>
                            <p className="text-sm sm:text-base text-gray-500">{SKILL_NAME}</p>
                        </div>
                        <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-6 sm:mb-8">
                            <div className="bg-blue-50 p-2 sm:p-4 rounded-xl text-center border border-blue-100">
                                <div className="text-blue-500 font-bold text-xs sm:text-sm mb-1 uppercase">Time</div>
                                <div className="text-lg sm:text-2xl font-black text-[#31326F]">{formatTime(timeElapsed)}</div>
                            </div>
                            <div className="bg-green-50 p-2 sm:p-4 rounded-xl text-center border border-green-100">
                                <div className="text-green-500 font-bold text-xs sm:text-sm mb-1 uppercase">Correct</div>
                                <div className="text-lg sm:text-2xl font-black text-[#31326F]">{correct}</div>
                            </div>
                            <div className="bg-red-50 p-2 sm:p-4 rounded-xl text-center border border-red-100">
                                <div className="text-red-500 font-bold text-xs sm:text-sm mb-1 uppercase">Wrong</div>
                                <div className="text-lg sm:text-2xl font-black text-[#31326F]">{wrong}</div>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <h3 className="text-lg font-bold text-[#31326F] border-b pb-2">Detailed Report</h3>
                            {questions.map((q, idx) => {
                                const ans = answers[idx] || { isCorrect: false, selectedOption: 'N/A' };
                                return (
                                    <div key={idx} className="p-4 rounded-xl border-2 border-gray-100 bg-white shadow-sm">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="w-7 h-7 rounded-full bg-[#31326F] text-white flex items-center justify-center font-bold text-xs">{idx + 1}</span>
                                            <span className={`px-2 py-0.5 rounded-full font-bold text-xs uppercase ${ans.isCorrect ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>{ans.isCorrect ? 'Correct' : 'Wrong'}</span>
                                        </div>
                                        <div className="text-sm text-[#31326F] mb-2"><LatexText text={q.text} /></div>
                                        {q.matrix && (
                                            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 8 }}>
                                                <InteractiveMatrixBuilder rows={q.matrix.length} cols={q.matrix[0].length} values={q.matrix.map(r => r.map(String))} compact highlightCells={q.highlightCells || []} showIndices={q.showIndices} animateEntrance={false} />
                                            </div>
                                        )}
                                        <div className="grid grid-cols-2 gap-2 text-xs mb-2">
                                            <div className="p-2 rounded-lg bg-gray-50 border"><span className="text-gray-400 block text-xs">Your Answer:</span><span className={ans.isCorrect ? 'text-green-600 font-bold' : 'text-red-500 font-bold'}><LatexText text={ans.selectedOption} /></span></div>
                                            <div className="p-2 rounded-lg bg-green-50 border border-green-100"><span className="text-green-400 block text-xs">Correct:</span><span className="text-green-700 font-bold"><LatexText text={q.correctAnswer} /></span></div>
                                        </div>
                                        <div className="p-2 rounded-lg bg-amber-50 border border-amber-100 text-xs italic text-[#31326F]"><span className="font-bold not-italic text-amber-700">Explanation: </span><LatexText text={q.solution} /></div>
                                    </div>
                                );
                            })}
                        </div>
                        <div className="mt-8 flex justify-center">
                            <button className="bg-[#31326F] text-white px-12 py-3 rounded-xl font-black text-lg hover:scale-105 active:scale-95 transition-all shadow-xl" onClick={() => navigate(-1)}>Done</button>
                        </div>
                    </motion.div>
                </div>
            </div>
        );
    }

    const currentQ = questions[qIndex];

    return (
        <div className="junior-practice-page" style={{ fontFamily: '"Open Sans", sans-serif' }}>
            <header className="junior-practice-header" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) auto minmax(0,1fr)', alignItems: 'center', padding: '0 2rem', gap: '1rem' }}>
                <div style={{ fontSize: '1rem', fontWeight: 'bold', color: '#31326F', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{SKILL_NAME}</div>
                <div><div className="bg-white/90 backdrop-blur-md px-3 py-1.5 sm:px-6 sm:py-2 rounded-full border-2 border-[#4FB7B3]/30 text-[#31326F] font-black text-sm sm:text-xl shadow-lg whitespace-nowrap">Q {qIndex + 1} / {questions.length}</div></div>
                <div style={{ justifySelf: 'end' }}><div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl border-2 border-[#4FB7B3]/30 text-[#31326F] font-bold text-lg shadow-md">{formatTime(timeElapsed)}</div></div>
            </header>

            <main className="practice-content-wrapper">
                <div className="practice-board-container" style={{ gridTemplateColumns: '1fr', maxWidth: 800, margin: '0 auto' }}>
                    <div className="practice-left-col" style={{ width: '100%' }}>
                        <div className="question-card-modern" style={{ paddingLeft: '2rem' }}>
                            <div className="question-header-modern">
                                <h2 className="question-text-modern" style={{ fontSize: 'clamp(1rem, 2vw, 1.6rem)', maxHeight: 'none', fontWeight: 500, textAlign: 'left', overflow: 'visible', color: '#2D3748' }}>
                                    <LatexText text={currentQ.text} />
                                </h2>
                            </div>

                            {/* Interactive Matrix */}
                            {currentQ.matrix && (
                                <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
                                    <InteractiveMatrixBuilder
                                        rows={currentQ.matrix.length}
                                        cols={currentQ.matrix[0].length}
                                        values={currentQ.matrix.map(r => r.map(String))}
                                        highlightCells={currentQ.highlightCells || []}
                                        showIndices={currentQ.showIndices || false}
                                        compact={currentQ.matrix.length > 3 || currentQ.matrix[0].length > 3}
                                    />
                                </div>
                            )}

                            <div className="interaction-area-modern">
                                <div className="options-grid-modern">
                                    {currentQ.options.map((opt, idx) => (
                                        <button
                                            key={idx}
                                            className={`option-btn-modern ${selectedOption === opt ? 'selected' : ''} ${isSubmitted && opt === currentQ.correctAnswer ? 'correct' : ''} ${isSubmitted && selectedOption === opt && !isCorrect ? 'wrong' : ''}`}
                                            style={{ fontWeight: 500 }}
                                            onClick={() => !isSubmitted && setSelectedOption(opt)}
                                            disabled={isSubmitted}
                                        >
                                            <LatexText text={opt} />
                                        </button>
                                    ))}
                                </div>
                                {isSubmitted && isCorrect && (
                                    <div style={{ display: 'flex', justifyContent: 'center', width: '100%', marginTop: '2rem' }}>
                                        <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="feedback-mini correct">{feedbackMessage}</motion.div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <ExplanationModal isOpen={showExplanationModal} isCorrect={isCorrect} correctAnswer={currentQ.correctAnswer} explanation={currentQ.solution} onClose={() => setShowExplanationModal(false)} />

            <footer className="junior-bottom-bar">
                <div className="desktop-footer-controls">
                    <button className="bg-red-50 text-red-500 px-6 py-2 rounded-xl border-2 border-red-100 font-bold" onClick={() => navigate(-1)}>Exit</button>
                    <div className="bottom-center">{isSubmitted && <button className="view-explanation-btn" onClick={() => setShowExplanationModal(true)}><Eye size={20} /> View Explanation</button>}</div>
                    <div className="bottom-right" style={{ display: 'flex', gap: 10 }}>
                        <button className="nav-pill-next-btn bg-gray-200 text-gray-600" onClick={handlePrev} disabled={qIndex === 0} style={{ opacity: qIndex === 0 ? 0.5 : 1 }}><ChevronLeft size={28} strokeWidth={3} /> Prev</button>
                        {isSubmitted ? <button className="nav-pill-next-btn" onClick={handleNext}>{qIndex < questions.length - 1 ? <>Next <ChevronRight size={28} strokeWidth={3} /></> : <>Done <Check size={28} strokeWidth={3} /></>}</button> : <button className="nav-pill-submit-btn" onClick={handleCheck} disabled={!selectedOption}>Submit <Check size={28} strokeWidth={3} /></button>}
                    </div>
                </div>
                <div className="mobile-footer-controls">
                    <div className="mobile-footer-right">
                        <button className="nav-pill-next-btn bg-gray-200 text-gray-600 p-2" onClick={handlePrev} disabled={qIndex === 0} style={{ minWidth: 'auto', opacity: qIndex === 0 ? 0.5 : 1 }}><ChevronLeft size={20} /></button>
                        {isSubmitted && <button className="view-explanation-btn" onClick={() => setShowExplanationModal(true)}><Eye size={18} /></button>}
                        {isSubmitted ? <button className="nav-pill-next-btn" onClick={handleNext}>{qIndex < questions.length - 1 ? 'Next' : 'Done'}</button> : <button className="nav-pill-submit-btn" onClick={handleCheck} disabled={!selectedOption}>Submit</button>}
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default MatrixOrderTest;
