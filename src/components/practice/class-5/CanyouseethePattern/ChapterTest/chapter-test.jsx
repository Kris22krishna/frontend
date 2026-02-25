import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { RefreshCw, Check, Eye, ChevronRight, ChevronLeft, X, Star, FastForward } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../../../../services/api';
import LatexContent from '../../../../LatexContent';
import mascotImg from '../../../../../assets/mascot.png';
import '../../../../../pages/juniors/JuniorPracticeSession.css';

const ChapterTest = () => {
    const { grade } = useParams();
    const navigate = useNavigate();
    const [qIndex, setQIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isCorrect, setIsCorrect] = useState(false);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [shuffledOptions, setShuffledOptions] = useState([]);
    const [showResults, setShowResults] = useState(false);

    const [sessionId, setSessionId] = useState(null);
    const questionStartTime = useRef(Date.now());
    const accumulatedTime = useRef(0);
    const isTabActive = useRef(true);
    const SKILL_ID = 2000;
    const SKILL_NAME = "Chapter Test: Can You See the Pattern?";

    const TOTAL_QUESTIONS = 15;
    const [sessionQuestions, setSessionQuestions] = useState([]);
    const [answers, setAnswers] = useState({});

    useEffect(() => {
        const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId');
        if (userId && !sessionId) {
            api.createPracticeSession(userId, SKILL_ID).then(sess => {
                if (sess && sess.session_id) setSessionId(sess.session_id);
            }).catch(err => console.error("Failed to start session", err));
        }

        const handleVisibilityChange = () => {
            if (document.hidden) {
                accumulatedTime.current += Date.now() - questionStartTime.current;
                isTabActive.current = false;
            } else {
                questionStartTime.current = Date.now();
                isTabActive.current = true;
            }
        };
        document.addEventListener("visibilitychange", handleVisibilityChange);

        const generateQuestions = () => {
            const qs = [];
            // --- PATTERN RECOGNITION (5 QS) ---
            qs.push({
                text: "What is the next number in this sequence of triangular numbers: $1, 3, 6, 10, \\dots$?",
                correctAnswer: "15",
                options: ["12", "15", "18", "20"],
                solution: "Triangular numbers represent the number of dots in an equilateral triangle. The pattern is formed by adding consecutive integers: <br/>1st: $1$<br/>2nd: $1 + 2 = 3$<br/>3rd: $3 + 3 = 6$<br/>4th: $6 + 4 = 10$<br/>5th: $10 + 5 = 15$. <br/>Therefore, the next number is found by adding the next integer, which is 5."
            });
            qs.push({
                text: "Identify the pattern to find the next term: $2, 6, 18, 54, \\dots$?",
                correctAnswer: "162",
                options: ["162", "108", "150", "120"],
                solution: "This is a geometric sequence where each term is found by multiplying the previous term by a constant factor (common ratio). Let's check the ratio: <br/>$6 \\div 2 = 3$<br/>$18 \\div 6 = 3$<br/>$54 \\div 18 = 3$.<br/>Since the common ratio is 3, the next term is $54 \\times 3 = 162$."
            });
            qs.push({
                text: "A square tile is turned $45^\\circ$ clockwise, then $90^\\circ$ clockwise, then $45^\\circ$ clockwise again. What is the total angle of rotation?",
                correctAnswer: "$180^\\circ$",
                options: ["$90^\\circ$", "$180^\\circ$", "$135^\\circ$", "$360^\\circ$"],
                solution: "To find the total rotation, we simply sum up all individual clockwise turns: <br/>$45^\\circ + 90^\\circ + 45^\\circ = 180^\\circ$.<br/>A rotation of $180^\\circ$ is equivalent to a half-turn, meaning the tile will appear upside down relative to its starting position."
            });
            qs.push({
                text: "In a $3 \\times 3$ grid, each row sums to 20. If Row 3 has $(?, 4, 9)$, what is '?'?",
                correctAnswer: "7",
                options: ["5", "7", "9", "10"],
                solution: "This problem uses algebraic reasoning within a grid pattern. We are given that the sum of the row is 20. <br/>Row Sum = $? + 4 + 9 = 20$<br/>$? + 13 = 20$<br/>$? = 20 - 13$<br/>$? = 7$.<br/>Checking the work: $7 + 4 + 9 = 11 + 9 = 20$, which is correct."
            });
            qs.push({
                text: "Which rule describes this sequence: $101, 202, 303, 404, \\dots$?",
                correctAnswer: "Add 101",
                options: ["Add 101", "Add 100", "Multiply by 2", "Add 1"],
                solution: "Let's find the difference between consecutive terms:<br/>$202 - 101 = 101$<br/>$303 - 202 = 101$<br/>$404 - 303 = 101$.<br/>Since the difference is constant, the rule is to <b>add 101</b> to each term to get the next one. This is also called an arithmetic progression."
            });

            // --- NUMBER PROPERTIES (5 QS) ---
            qs.push({
                text: "Using properties of operations, $56 \\times 99$ is equivalent to:",
                correctAnswer: "$56 \\times (100 - 1)$",
                options: ["$56 \\times (100 - 1)$", "$56 \\times 100 + 1$", "$56 \\times 90 + 9$", "$56 \\times 100 - 56$"],
                solution: "The <b>Distributive Property</b> allows us to break down a difficult multiplication into two easier ones. <br/>$56 \\times 99$ can be written as $56 \\times (100 - 1)$. <br/>In the next step, you would calculate $(56 \\times 100) - (56 \\times 1)$, which is $5600 - 56 = 5544$. This is much easier than multiplying by 99 directly."
            });
            qs.push({
                text: "In the number 4,444, how many times greater is the 4 in the hundreds place than the 4 in the tens place?",
                correctAnswer: "10 times",
                options: ["10 times", "100 times", "5 times", "1,000 times"],
                solution: "In our base-10 number system, each place value is exactly 10 times larger than the place to its immediate right. <br/>- The 4 in the hundreds place represents 400.<br/>- The 4 in the tens place represents 40.<br/>$400 \div 40 = 10$.<br/>Therefore, it is exactly 10 times greater."
            });
            qs.push({
                text: "Identify which of the following is a number palindrome:",
                correctAnswer: "10101",
                options: ["10101", "12312", "11221", "404040"],
                solution: "A palindrome is a sequence that reads the same forward and backward. <br/>- <b>10101</b>: Forward: 1-0-1-0-1 | Backward: 1-0-1-0-1. (Match!)<br/>- 11221: Forward: 1-1-2-2-1 | Backward: 1-2-2-1-1. (Mismatch)<br/>Palindromes are symmetric around their center digit."
            });
            qs.push({
                text: "What is the sum of the first three square numbers?",
                correctAnswer: "14",
                options: ["9", "14", "10", "15"],
                solution: "A square number is the result of multiplying a number by itself.<br/>1st square: $1 \times 1 = 1$<br/>2nd square: $2 \times 2 = 4$<br/>3rd square: $3 \times 3 = 9$<br/>Total Sum = $1 + 4 + 9 = 14$.<br/>Note: Square numbers can be visualized as dots arranged in a perfect square grid."
            });
            qs.push({
                text: "Which property states that $a + b = b + a$?",
                correctAnswer: "Commutative Property",
                options: ["Commutative Property", "Associative Property", "Distributive Property", "Identity Property"],
                solution: "The <b>Commutative Property of Addition</b> states that changing the order of the numbers does not change the result. For example, $5 + 3$ gives the same sum as $3 + 5$. Think of 'commuting' as 'moving around'—the numbers can move, but the answer stays the same."
            });

            // --- LOGICAL REASONING (5 QS) ---
            qs.push({
                text: "If a secret number is doubled and then 5 is added, the result is 25. What is the number?",
                correctAnswer: "10",
                options: ["10", "15", "20", "5"],
                solution: "To find the original number, we perform the inverse (opposite) operations in reverse order: <br/>1. The last step was 'add 5', so we subtract 5: $25 - 5 = 20$.<br/>2. The first step was 'doubled', so we divide by 2: $20 \div 2 = 10$.<br/>Verification: $(10 \times 2) + 5 = 20 + 5 = 25$. Correct!"
            });
            qs.push({
                text: "Rule: 'If even, divide by 2. If odd, add 1'. Starting with 15, what is the result after 2 steps?",
                correctAnswer: "8",
                options: ["8", "16", "7", "9"],
                solution: "We must follow the rule carefully step-by-step: <br/><b>Step 1</b>: 15 is ODD, so we add 1. $15 + 1 = 16$.<br/><b>Step 2</b>: 16 is EVEN, so we divide by 2. $16 \div 2 = 8$.<br/>The final result after two operations is 8."
            });
            qs.push({
                text: "In a number tower, a block is the sum of the two below it. If the base blocks are $(5, 10, 5)$, what is at the top?",
                correctAnswer: "30",
                options: ["20", "25", "30", "40"],
                solution: "Let's build the tower level by level from the bottom up:<br/>Level 1 (Base): [5, 10, 5]<br/>Level 2: [5+10, 10+5] = [15, 15]<br/>Level 3 (Top): [15+15] = 30.<br/>Working with towers requires keeping track of each pairwise sum carefully."
            });
            qs.push({
                text: "Solve $195 + 155$ mentally by 'breaking apart' or compensation.",
                correctAnswer: "350",
                options: ["350", "340", "360", "345"],
                solution: "Compensation involves moving a small amount from one number to another to make them 'friendly' or rounded. <br/>1. Take 5 from 155 and give it to 195.<br/>2. Now you have $200 + 150$.<br/>3. $200 + 150 = 350$.<br/>Alternatively, $(190 + 5) + (150 + 5) = 190 + 150 + 10 = 340 + 10 = 350$."
            });
            qs.push({
                text: "Strategy: Double and Halve. $25 \times 12$ is equivalent to $50 \times ?$",
                correctAnswer: "6",
                options: ["6", "12", "24", "4"],
                solution: "The <b>Double and Halve</b> strategy works because if you multiply one factor by 2 and divide the other by 2, the total product remains unchanged ($2 \times 0.5 = 1$).<br/>- Double 25 $\rightarrow$ 50.<br/>- Halve 12 $\rightarrow$ 6.<br/>So, $25 \times 12$ is the same as $50 \times 6$, which is 300. This makes long multiplication much simpler to do mentally."
            });

            return qs;
        };

        setSessionQuestions(generateQuestions());

        return () => {
            document.removeEventListener("visibilitychange", handleVisibilityChange);
        };
    }, []);

    useEffect(() => {
        if (showResults) return;
        const timer = setInterval(() => {
            setTimeElapsed(prev => prev + 1);
        }, 1000);
        return () => clearInterval(timer);
    }, [showResults]);

    useEffect(() => {
        if (sessionQuestions.length > 0) {
            const qData = sessionQuestions[qIndex];
            setCurrentQuestion(qData);
            setShuffledOptions([...qData.options].sort(() => Math.random() - 0.5));
            const previousAnswer = answers[qIndex];
            if (previousAnswer) {
                setSelectedOption(previousAnswer.selected);
            } else {
                setSelectedOption(null);
            }
        }
    }, [qIndex, sessionQuestions]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const recordQuestionAttempt = async (question, selected, isCorrect, isSkipped = false) => {
        const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId');
        if (!userId) return;
        let timeSpent = accumulatedTime.current;
        if (isTabActive.current) timeSpent += Date.now() - questionStartTime.current;
        const seconds = Math.round(timeSpent / 1000);

        try {
            await api.recordAttempt({
                user_id: parseInt(userId, 10),
                session_id: sessionId,
                skill_id: SKILL_ID,
                difficulty_level: 'Mixed',
                question_text: String(question.text || ''),
                correct_answer: String(question.correctAnswer || ''),
                student_answer: isSkipped ? "Skipped" : String(selected || ''),
                is_correct: isCorrect,
                solution_text: String(question.solution || ''),
                time_spent_seconds: seconds >= 0 ? seconds : 0
            });
        } catch (e) {
            console.error("Failed to record attempt", e);
        }
    };

    const handleNext = async () => {
        if (!selectedOption) return;

        const isRight = selectedOption === currentQuestion.correctAnswer;
        setAnswers(prev => ({ ...prev, [qIndex]: { isCorrect: isRight, selected: selectedOption, isSkipped: false } }));
        recordQuestionAttempt(currentQuestion, selectedOption, isRight);

        proceedToNext();
    };

    const handleSkip = async () => {
        setAnswers(prev => ({ ...prev, [qIndex]: { isCorrect: false, selected: "Skipped", isSkipped: true } }));
        recordQuestionAttempt(currentQuestion, "Skipped", false, true);
        proceedToNext();
    };

    const proceedToNext = async () => {
        if (qIndex < TOTAL_QUESTIONS - 1) {
            setQIndex(prev => prev + 1);
            accumulatedTime.current = 0;
            questionStartTime.current = Date.now();
        } else {
            finalizeAssessment();
        }
    };

    const finalizeAssessment = async () => {
        const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId');
        if (userId) {
            // Re-calculate based on state since answers might not have the last update yet in async flow
            // But state updates are queued, so we should be careful. 
            // In assessment flow, we can just let showResults calculate from the latest answers state.
        }
        if (sessionId) await api.finishSession(sessionId).catch(console.error);
        setShowResults(true);

        const userIdInt = parseInt(userId, 10);
        if (userIdInt) {
            const results = Object.values(answers);
            const totalCorrect = results.filter(r => r.isCorrect).length;
            api.createReport({
                title: SKILL_NAME,
                type: 'practice',
                score: (totalCorrect / TOTAL_QUESTIONS) * 100,
                parameters: {
                    skill_id: SKILL_ID,
                    skill_name: SKILL_NAME,
                    total_questions: TOTAL_QUESTIONS,
                    correct_answers: totalCorrect,
                    time_taken_seconds: timeElapsed
                },
                user_id: userIdInt
            }).catch(err => console.error("Failed to create report", err));
        }
    }

    const handlePrevious = () => {
        if (qIndex > 0) setQIndex(prev => prev - 1);
    };

    if (!currentQuestion && !showResults) return <div className="flex justify-center items-center h-screen text-[#31326F] font-bold tracking-widest text-2xl uppercase italic animate-pulse">Initializing Assessment...</div>;

    if (showResults) {
        const score = Object.values(answers).filter(val => val.isCorrect).length;
        const percentage = Math.round((score / TOTAL_QUESTIONS) * 100);

        return (
            <div className="junior-practice-page results-view overflow-y-auto" style={{ fontFamily: '"Open Sans", sans-serif' }}>
                <header className="junior-practice-header results-header relative">
                    <button onClick={() => navigate(-1)} className="back-topics-top absolute top-8 right-8 px-10 py-4 bg-white/20 hover:bg-white/30 text-white rounded-2xl font-black text-xl transition-all flex items-center gap-3 z-50 border-4 border-white/30 shadow-2xl backdrop-blur-sm">Back to Topics</button>
                    <div className="sun-timer-container">
                        <div className="sun-timer"><div className="sun-rays"></div><span className="timer-text">Done!</span></div>
                    </div>
                    <div className="title-area"><h1 className="results-title">Chapter Mastery Report</h1></div>
                </header>
                <main className="practice-content results-content max-w-5xl mx-auto w-full px-4">
                    <div className="results-hero-section flex flex-col items-center mb-8">
                        <h2 className="text-4xl font-black text-[#31326F] mb-1">Assessment Complete! ✨</h2>
                        <div className="stars-container flex gap-4 my-6">
                            {[1, 2, 3].map(i => (
                                <motion.div key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i * 0.2 }} className={`star-wrapper ${percentage >= (i * 33) ? 'active' : ''}`}>
                                    <Star size={60} fill={percentage >= (i * 33) ? "#FFD700" : "#EDF2F7"} color={percentage >= (i * 33) ? "#F6AD55" : "#CBD5E0"} />
                                </motion.div>
                            ))}
                        </div>
                        <div className="results-stats-grid grid grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-3xl">
                            <div className="stat-card bg-white p-6 rounded-3xl shadow-sm border-2 border-[#E0FBEF] text-center">
                                <span className="block text-xs font-black uppercase tracking-widest text-[#4FB7B3] mb-1">Correct</span>
                                <span className="text-3xl font-black text-[#31326F]">{score}/{TOTAL_QUESTIONS}</span>
                            </div>
                            <div className="stat-card bg-white p-6 rounded-3xl shadow-sm border-2 border-[#E0FBEF] text-center">
                                <span className="block text-xs font-black uppercase tracking-widest text-[#4FB7B3] mb-1">Time</span>
                                <span className="text-3xl font-black text-[#31326F]">{formatTime(timeElapsed)}</span>
                            </div>
                            <div className="stat-card bg-white p-6 rounded-3xl shadow-sm border-2 border-[#E0FBEF] text-center">
                                <span className="block text-xs font-black uppercase tracking-widest text-[#4FB7B3] mb-1">Accuracy</span>
                                <span className="text-3xl font-black text-[#31326F]">{percentage}%</span>
                            </div>
                            <div className="stat-card bg-white p-6 rounded-3xl shadow-sm border-2 border-[#E0FBEF] text-center">
                                <span className="block text-xs font-black uppercase tracking-widest text-[#4FB7B3] mb-1">Score</span>
                                <span className="text-3xl font-black text-[#31326F]">{score * 10} pts</span>
                            </div>
                        </div>
                    </div>

                    <div className="detailed-breakdown w-full mb-12">
                        <h3 className="text-2xl font-black text-[#31326F] mb-6 px-4">Detailed Answer Key 📜</h3>
                        <div className="space-y-4">
                            {sessionQuestions.map((q, idx) => {
                                const ans = answers[idx];
                                if (!ans) return null;
                                return (
                                    <div key={idx} className={`p-6 rounded-[2rem] border-4 ${ans.isCorrect ? 'border-[#E0FBEF] bg-white' : 'border-red-50 bg-white'} relative`}>
                                        <div className="flex items-start gap-4">
                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-white shrink-0 ${ans.isCorrect ? 'bg-[#4FB7B3]' : 'bg-red-400'}`}>{idx + 1}</div>
                                            <div className="flex-1">
                                                <div className="text-lg font-bold text-[#31326F] mb-4"><LatexContent html={q.text} /></div>
                                                <div className="grid md:grid-cols-2 gap-4 mb-4">
                                                    <div className="answer-box p-4 rounded-2xl bg-gray-50 border-2 border-gray-100">
                                                        <span className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Your Selection</span>
                                                        <span className={`text-lg font-black ${ans.isCorrect ? 'text-[#4FB7B3]' : 'text-red-500'}`}><LatexContent html={ans.selected} /></span>
                                                    </div>
                                                    {!ans.isCorrect && (
                                                        <div className="answer-box p-4 rounded-2xl bg-[#E0FBEF] border-2 border-[#4FB7B3]/20">
                                                            <span className="block text-[10px] font-black uppercase tracking-widest text-[#4FB7B3] mb-1">Correct Answer</span>
                                                            <span className="text-lg font-black text-[#31326F]"><LatexContent html={q.correctAnswer} /></span>
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="explanation-box p-4 rounded-2xl bg-blue-50/50 border-2 border-blue-100">
                                                    <span className="block text-[10px] font-black uppercase tracking-widest text-blue-400 mb-1">Detailed Solution 💡</span>
                                                    <div className="text-sm font-medium text-gray-600 leading-relaxed"><LatexContent html={q.solution} /></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="results-actions flex flex-col md:flex-row justify-center gap-4 py-8 border-t-4 border-dashed border-gray-100">
                        <button className="magic-pad-btn play-again px-12 py-4 rounded-2xl bg-[#31326F] text-white font-black text-xl shadow-xl hover:-translate-y-1 transition-all" onClick={() => window.location.reload()}><RefreshCw size={24} /> Restart Test</button>
                        <button className="px-12 py-4 rounded-2xl border-4 border-[#31326F] text-[#31326F] font-black text-xl hover:bg-gray-50 transition-all flex items-center justify-center gap-3" onClick={() => navigate(-1)}>Back to Topics</button>
                    </div>
                </main>
            </div>
        );
    }

    return (
        <div className="junior-practice-page village-theme" style={{ fontFamily: '"Open Sans", sans-serif' }}>
            <header className="junior-practice-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 2rem' }}>
                <div className="header-left"></div>
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-max">
                    <div className="bg-white/90 backdrop-blur-md px-3 py-1.5 sm:px-6 sm:py-2 rounded-full border-2 border-[#4FB7B3]/30 text-[#31326F] font-black text-sm sm:text-xl shadow-lg whitespace-nowrap">Chapter Test | Q{qIndex + 1} / {TOTAL_QUESTIONS}</div>
                </div>
                <div className="header-right"><div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl border-2 border-[#4FB7B3]/30 text-[#31326F] font-bold text-lg shadow-md flex items-center gap-2">{formatTime(timeElapsed)}</div></div>
            </header>
            <main className="practice-content-wrapper">
                <div className="practice-board-container" style={{ gridTemplateColumns: '1fr', maxWidth: '800px', margin: '0 auto' }}>
                    <div className="practice-left-col" style={{ width: '100%' }}>
                        <AnimatePresence mode="wait">
                            <motion.div key={qIndex} initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -50, opacity: 0 }} transition={{ duration: 0.4, ease: "easeOut" }} style={{ height: '100%', width: '100%' }}>
                                <div className="question-card-modern" style={{ paddingLeft: '2rem' }}>
                                    <div className="question-header-modern"><h2 className="question-text-modern" style={{ fontFamily: '"Open Sans", sans-serif', fontSize: '2.5rem', fontWeight: '400', textAlign: 'center' }}><LatexContent html={currentQuestion.text} /></h2></div>
                                    <div className="interaction-area-modern">
                                        <div className="options-grid-modern">
                                            {shuffledOptions.map((option, idx) => (
                                                <button key={idx} className={`option-btn-modern ${selectedOption === option ? 'selected' : ''}`} onClick={() => setSelectedOption(option)} style={{ fontFamily: '"Open Sans", sans-serif', fontWeight: '400', fontSize: '2.5rem' }}><LatexContent html={option} /></button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </main>
            <footer className="junior-bottom-bar">
                <div className="desktop-footer-controls">
                    <div className="bottom-left"><button className="bg-red-50 text-red-500 px-6 py-2 rounded-xl border-2 border-red-100 font-bold hover:bg-red-100 transition-colors flex items-center gap-2" onClick={() => navigate(-1)}>Exit Session</button></div>
                    <div className="bottom-center"></div>
                    <div className="bottom-right">
                        <div className="nav-buttons-group">
                            {qIndex > 0 && <button className="nav-pill-next-btn" onClick={handlePrevious}><ChevronLeft size={28} strokeWidth={3} /> Prev</button>}
                            {!selectedOption && qIndex < TOTAL_QUESTIONS - 1 && (
                                <button className="bg-gray-50 text-gray-400 px-8 py-4 rounded-full border-2 border-gray-200 font-black flex items-center gap-2 hover:bg-gray-100 transition-all" onClick={handleSkip}>Skip <FastForward size={20} /></button>
                            )}
                            <button className="nav-pill-submit-btn" onClick={handleNext} disabled={!selectedOption}>{qIndex < TOTAL_QUESTIONS - 1 ? <>Next Question <ChevronRight size={28} strokeWidth={3} /></> : <>Finish Assessment <Check size={28} strokeWidth={3} /></>}</button>
                        </div>
                    </div>
                </div>
            </footer >
        </div>
    );
};

export default ChapterTest;
