import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { BookOpen, ChevronRight, Check, X, Info, ChevronLeft, Eye, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../../../services/api';
import { LatexText } from '../../../LatexText';
import mascotImg from '../../../../assets/mascot.png';
import ExplanationModal from '../../../ExplanationModal';
import PracticeReportModal from '../../PracticeReportModal';
import '../../../../pages/juniors/JuniorPracticeSession.css';

const AlgebraicMethods = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [qIndex, setQIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [showExplanationModal, setShowExplanationModal] = useState(false);
    const [showReportModal, setShowReportModal] = useState(false);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [feedbackMessage, setFeedbackMessage] = useState("");
    const [questions, setQuestions] = useState([]);

    // Logging states
    const [sessionId, setSessionId] = useState(null);
    const questionStartTime = useRef(Date.now());
    const accumulatedTime = useRef(0);
    const isTabActive = useRef(true);

    // Extract Skill ID from URL
    const SKILL_ID = parseInt(location.pathname.split('/').pop(), 10) || 10051;

    // Skill Metadata
    const SKILL_METADATA = {
        10051: { name: "Check whether a given ordered pair is a solution" },
        10052: { name: "Solve equations using substitution (no word problems)" },
        10053: { name: "Solve word problems using substitution" },
        10054: { name: "Solve equations using elimination (no word problems)" },
        10055: { name: "Solve word problems using elimination" }
    };
    const SKILL_NAME = SKILL_METADATA[SKILL_ID]?.name || "Algebraic Methods";
    const [answers, setAnswers] = useState({});

    const generateQuestions = () => {
        const newQuestions = [];
        const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

        const createQuestion = (id, text, options, answer, solution) => ({
            id, text, options: options.sort(() => Math.random() - 0.5), correctAnswer: answer, solution
        });

        // Skill 10051: Check whether a given ordered pair is a solution
        if (SKILL_ID === 10051) {
            // EASY 1 & 2: Simple Integers
            newQuestions.push(createQuestion(1, `Is (2, 1) a solution to $x + y = 3$ and $x - y = 1$?`, [`Yes`, `No`], `Yes`, `2+1=3 (True), 2-1=1 (True). Yes.`));
            newQuestions.push(createQuestion(2, `Is (1, 3) a solution to $2x + y = 5$ and $x + y = 4$?`, [`Yes`, `No`], `Yes`, `2(1)+3=5 (True), 1+3=4 (True). Yes.`));

            // MEDIUM 1 & 2: One equation fails
            newQuestions.push(createQuestion(3, `Is (4, 0) a solution to $x + y = 4$ and $x - y = 2$?`, [`No`, `Yes`], `No`, `4+0=4 (True), but 4-0 = 4 != 2 (False). No.`));
            newQuestions.push(createQuestion(4, `Check if (2, -1) solves $3x - y = 7$ and $2x + 3y = 1$?`, [`Yes`, `No`], `Yes`, `3(2)-(-1) = 7 (True), 2(2)+3(-1) = 4-3=1 (True). Yes.`));

            // HARD 1: Fractions or larger numbers
            newQuestions.push(createQuestion(5, `Is $(\\frac{1}{2}, \\frac{1}{3})$ a solution to $2x + 3y = 2$ and $4x - 6y = 0$?`, [`Yes`, `No`], `Yes`, `$2(\\frac{1}{2})+3(\\frac{1}{3})=1+1=2$ (True). $4(\\frac{1}{2})-6(\\frac{1}{3})=2-2=0$ (True). Yes.`));
        }

        // Skill 10052: Substitution (Numeric)
        else if (SKILL_ID === 10052) {
            // EASY 1: x + y = c
            newQuestions.push(createQuestion(1, `Solve by substitution: $x + y = 4$ and $x - y = 0$.`, [`x=2, y=2`, `x=4, y=0`, `x=3, y=1`, `x=0, y=4`], `x=2, y=2`, `From 2nd eq: $x=y$. In 1st: $2x=4 \\Rightarrow x=2$.`));
            // EASY 2: y = mx
            newQuestions.push(createQuestion(2, `Solve: $y = 3x$ and $x + y = 8$.`, [`x=2, y=6`, `x=1, y=3`, `x=3, y=9`, `x=0, y=0`], `x=2, y=6`, `Substitute $y=3x$: $x+3x=8 \\Rightarrow 4x=8 \\Rightarrow x=2$.`));

            // MEDIUM 1: Standard
            newQuestions.push(createQuestion(3, `Solve by substitution: $x + 2y = -1$ and $2x - 3y = 12$.`, [`x=3, y=-2`, `x=2, y=3`, `x=-3, y=2`, `x=1, y=0`], `x=3, y=-2`, `From 1st: $x = -1 - 2y$. Subst to 2nd: $2(-1-2y) - 3y = 12 \\Rightarrow -2 - 4y - 3y = 12 \\Rightarrow -7y = 14$.`));
            // MEDIUM 2: Standard
            newQuestions.push(createQuestion(4, `Solve: $7x - 15y = 2$ and $x + 2y = 3$.`, [`$x=\\dfrac{49}{29}, y=\\dfrac{19}{29}$`, `$x=1, y=1$`, `$x=2, y=0$`, `$x=3, y=0$`], `$x=\\dfrac{49}{29}, y=\\dfrac{19}{29}$`, `From 2nd: $x = 3 - 2y$. Subst: $7(3-2y) - 15y = 2 \\Rightarrow 21 - 14y - 15y = 2$.`));

            // HARD 1: Decimal or Roots
            newQuestions.push(createQuestion(5, `Solve: $\\sqrt{2}x + \\sqrt{3}y = 0$ and $\\sqrt{3}x - \\sqrt{8}y = 0$.`, [`x=0, y=0`, `x=1, y=1`, `x=2, y=3`, `x=sqrt(3), y=sqrt(2)`], `x=0, y=0`, `Homogeneous system with irrational coeffs. Only trivial solution (0,0).`));
        }

        // Skill 10053: Substitution (Word Problems)
        else if (SKILL_ID === 10053) {
            // EASY 1: Difference
            newQuestions.push(createQuestion(1, `Diff between two numbers is 26. One is 3 times the other. Find them.`, [`39, 13`, `26, 13`, `30, 10`, `40, 14`], `39, 13`, `$x-y=26, x=3y$.`));
            // EASY 2: Supplement Angles
            newQuestions.push(createQuestion(2, `The larger of two supplementary angles exceeds the smaller by 18 degrees. Find them.`, [`99, 81`, `100, 80`, `90, 90`, `110, 70`], `99, 81`, `$x+y=180, x-y=18$.`));

            // MEDIUM 1: Taxi Charge
            newQuestions.push(createQuestion(3, `Taxi charge for 10km is ₹105. For 15km is ₹155. Find fixed charge.`, [`₹5`, `₹10`, `₹15`, `₹0`], `₹5`, `$x+10y=105, x+15y=155$. Subs $x = 105-10y$.`));
            // MEDIUM 2: Age Problem
            newQuestions.push(createQuestion(4, `Jacob will be 3 times as old as his son in 5 years. 5 years ago, he was 7 times as old. Find present ages.`, [`Jacob 40, Son 10`, `Jacob 30, Son 10`, `Jacob 45, Son 15`, `Jacob 35, Son 5`], `Jacob 40, Son 10`, `$x+5 = 3(y+5)$, $x-5 = 7(y-5)$.`));

            // HARD 1: Fraction
            newQuestions.push(createQuestion(5, `A fraction becomes $\\frac{9}{11}$ if 2 is added to both num & den. If 3 is added to both, it becomes $\\frac{5}{6}$. Find it.`, [`$\\frac{7}{9}$`, `$\\frac{9}{7}$`, `$\\frac{3}{5}$`, `$\\frac{5}{3}$`], `$\\frac{7}{9}$`, `$\\frac{x+2}{y+2}=\\frac{9}{11}$, $\\frac{x+3}{y+3}=\\frac{5}{6}$. Solve by sub.`));
        }

        // Skill 10054: Elimination (Numeric)
        else if (SKILL_ID === 10054) {
            // EASY 1: Direct Add
            newQuestions.push(createQuestion(1, `Use elimination: $x + y = 5$ and $x - y = 3$.`, [`x=4, y=1`, `x=3, y=2`, `x=5, y=0`, `x=2, y=3`], `x=4, y=1`, `Add equations: $2x=8 \\Rightarrow x=4$.`));
            // EASY 2: Direct Subtract
            newQuestions.push(createQuestion(2, `Use elimination: $3x + 4y = 10$ and $2x + 4y = 6$.`, [`x=4, y=-0.5`, `x=2, y=1`, `x=4, y=1`, `x=4, y=2`], `x=4, y=-0.5`, `Subtract: $(3x-2x) = 10-6 \\Rightarrow x=4$. Subst back.`));

            // MEDIUM 1: Multiply One
            newQuestions.push(createQuestion(3, `Solve: $3x - 5y = 4$ and $9x - 2y = 7$.`, [`$x=\\dfrac{9}{13}, y=-\\dfrac{5}{13}$`, `$x=1, y=1$`, `$x=2, y=4$`, `$x=0, y=0$`], `$x=\\dfrac{9}{13}, y=-\\dfrac{5}{13}$`, `Multiply 1st eq by 3: $9x-15y=12$. Subtract from 2nd.`));
            // MEDIUM 2: Multiply Both
            newQuestions.push(createQuestion(4, `Solve: $2x + 3y = 8$ and $4x + 6y = 7$.`, [`No solution`, `x=1, y=2`, `x=4, y=0`, `Infinite`], `No solution`, `Multiply 1st by 2: $4x+6y=16$. Contradicts $4x+6y=7$.`));

            // HARD 1: Variable in Denom
            newQuestions.push(createQuestion(5, `Solve: $\\dfrac{2}{x} + \\dfrac{3}{y} = 13$ and $\\dfrac{5}{x} - \\dfrac{4}{y} = -2$.`, [`$x=\\dfrac{1}{2}, y=\\dfrac{1}{3}$`, `$x=2, y=3$`, `$x=1, y=1$`, `$x=4, y=5$`], `$x=\\dfrac{1}{2}, y=\\dfrac{1}{3}$`, `Let $u=\\frac{1}{x}, v=\\frac{1}{y}$. $2u+3v=13, 5u-4v=-2$. Solve for u,v then x,y.`));
        }

        // Skill 10055: Elimination (Word Problems)
        else if (SKILL_ID === 10055) {
            // EASY 1: Sum/Diff
            newQuestions.push(createQuestion(1, `If we add 1 to num and subtract 1 from den, a fraction reduces to 1. It becomes $\\frac{1}{2}$ if we add 1 to den. Find it.`, [`$\\frac{3}{5}$`, `$\\frac{4}{5}$`, `$\\frac{2}{3}$`, `$\\frac{5}{7}$`], `$\\frac{3}{5}$`, `$\\frac{x+1}{y-1}=1$, $\\frac{x}{y+1}=\\frac{1}{2}$.`));
            // EASY 2: 2-Digit Number
            newQuestions.push(createQuestion(2, `Sum of digits of 2-digit number is 9. Also 9 times this number is twice the reversed number. Find it.`, [`18`, `81`, `27`, `72`], `18`, `$x+y=9, 9(10x+y) = 2(10y+x)$.`));

            // MEDIUM 1: Meena/Bank
            newQuestions.push(createQuestion(3, `Meena withdrew ₹2000. She got ₹50 and ₹100 notes only (25 total). Find notes count.`, [`10 of ₹50, 15 of ₹100`, `15 of ₹50, 10 of ₹100`, `20 of ₹50, 5 of ₹100`, `12 of ₹50, 13 of ₹100`], `10 of ₹50, 15 of ₹100`, `$x+y=25, 50x+100y=2000$.`));
            // MEDIUM 2: Library
            newQuestions.push(createQuestion(4, `Lending library definition charge for 3 days and addl charge. Saritha paid ₹27 for 7 days. Susy paid ₹21 for 5 days.`, [`Fixed ₹15, per day ₹3`, `Fixed ₹10, per day ₹4`, `Fixed ₹12, per day ₹2`, `Fixed ₹20, per day ₹2`], `Fixed ₹15, per day ₹3`, `$x+4y=27, x+2y=21$.`));

            // HARD 1: Upstream/Downstream (or Work/Time)
            // Ritu can row downstream 20km in 2h, upstream 4km in 2h.
            newQuestions.push(createQuestion(5, `Ritu can row downstream 20 km in 2 hours, and upstream 4 km in 2 hours. Find her speed in still water and speed of current.`, [`6 km/h, 4 km/h`, `8 km/h, 2 km/h`, `10 km/h, 5 km/h`, `4 km/h, 2 km/h`], `6 km/h, 4 km/h`, `Down: $u+v = \\frac{20}{2}=10$. Up: $u-v = \\frac{4}{2}=2$. Add: $2u=12 \\Rightarrow u=6$.`));
        }

        return newQuestions;
    };



    useEffect(() => {
        setQuestions(generateQuestions());
    }, [SKILL_ID]);

    // Restore state when qIndex changes
    useEffect(() => {
        const savedAnswer = answers[qIndex];
        if (savedAnswer) {
            setSelectedOption(savedAnswer.selectedOption);
            setIsCorrect(savedAnswer.isCorrect);
            setIsSubmitted(true);
        } else {
            setSelectedOption(null);
            setIsCorrect(false);
            setIsSubmitted(false);
        }
    }, [qIndex, answers]);

    const CORRECT_MESSAGES = ["Good job!", "Excellent!", "Perfect!", "Well done!"];
    useEffect(() => {
        const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId');
        if (userId && !sessionId) {
            api.createPracticeSession(String(userId).includes("-") ? 1 : parseInt(userId, 10), SKILL_ID).then(sess => {
                if (sess && sess.session_id) setSessionId(sess.session_id);
            });
        }
        let timer;
        if (!showReportModal) {
            timer = setInterval(() => setTimeElapsed(p => p + 1), 1000);
        }
        return () => clearInterval(timer);
    }, [SKILL_ID, showReportModal]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const handleCheck = () => {
        if (!selectedOption) return;
        const currentQ = questions[qIndex];
        const isRight = selectedOption === currentQ.correctAnswer;
        setIsCorrect(isRight);
        setIsSubmitted(true);
        if (isRight) setFeedbackMessage(CORRECT_MESSAGES[Math.floor(Math.random() * CORRECT_MESSAGES.length)]);
        else setShowExplanationModal(true);
        setAnswers(prev => ({
            ...prev,
            [qIndex]: {
                selectedOption: selectedOption,
                isCorrect: isRight
            }
        }));

        const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId');
        if (userId) {
            let t = accumulatedTime.current;
            if (isTabActive.current) t += Date.now() - questionStartTime.current;
            const sec = Math.max(0, Math.round(t / 1000));
            api.recordAttempt({
                difficulty_level: qIndex < 3 ? 'Easy' : qIndex < 6 ? 'Medium' : 'Hard',
                user_id: String(userId).includes("-") ? 1 : parseInt(userId, 10), session_id: sessionId, skill_id: SKILL_ID,
                question_text: currentQ.text, correct_answer: currentQ.correctAnswer,
                student_answer: selectedOption, is_correct: isRight, solution_text: currentQ.solution,
                time_spent_seconds: sec
            }).catch(console.error);
        }
    };

    const handlePrevious = () => {
        if (qIndex > 0) {
            setQIndex(prev => prev - 1);
            accumulatedTime.current = 0;
            questionStartTime.current = Date.now();
        }
    };

    const handleNext = async () => {
        if (qIndex < questions.length - 1) {
            setQIndex(p => p + 1);
            accumulatedTime.current = 0;
            questionStartTime.current = Date.now();
        } else {
            if (sessionId) await api.finishSession(sessionId).catch(console.error);
            const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId');
            if (userId) {
                const totalCorrect = Object.values(answers).filter(val => val.isCorrect === true).length;
                await api.createReport({
                    title: SKILL_NAME,
                    type: 'practice',
                    score: (totalCorrect / questions.length) * 100,
                    parameters: {
                        skill_id: SKILL_ID,
                        skill_name: SKILL_NAME,
                        total_questions: questions.length,
                        correct_answers: totalCorrect,
                        timestamp: new Date().toISOString(),
                        time_taken_seconds: timeElapsed
                    },
                    user_id: String(userId, 10).includes("-") ? 1 : parseInt(userId, 10, 10)
                }).catch(console.error);
            }
            setShowReportModal(true);
        }
    };

    if (questions.length === 0) return <div>Loading...</div>;
    const currentQuestion = questions[qIndex];

    return (
        <div className="junior-practice-page" style={{ fontFamily: '"Open Sans", sans-serif' }}>
            <header className="junior-practice-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 2rem' }}>
                <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#31326F' }}>
                    {SKILL_NAME}
                </div>
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-max">
                    <div className="bg-white/90 backdrop-blur-md px-3 py-1.5 sm:px-6 sm:py-2 rounded-full border-2 border-[#4FB7B3]/30 text-[#31326F] font-black text-sm sm:text-xl shadow-lg whitespace-nowrap">
                        Question {qIndex + 1} / {questions.length}
                    </div>
                </div>
                <div className="header-right">
                    <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl border-2 border-[#4FB7B3]/30 text-[#31326F] font-bold text-lg shadow-md flex items-center gap-2">
                        {formatTime(timeElapsed)}
                    </div>
                </div>
            </header>

            <main className="practice-content-wrapper" style={{ alignItems: "flex-start", paddingTop: "1rem" }}>
                <div className="practice-board-container" style={{ gridTemplateColumns: '1fr', maxWidth: '800px', margin: '0 auto' }}>
                    <div className="practice-left-col" style={{ width: "100%", minWidth: 0, height: "100%", display: "flex", flexDirection: "column", justifyContent: "flex-start" }}>
                        <div className="question-card-modern" style={{ padding: "2rem", flex: "none", minHeight: "auto", height: "fit-content", display: "flex", flexDirection: "column", justifyContent: "flex-start", margin: "0" }}>
                            <div className="question-header-modern" style={{ flexShrink: 0, marginBottom: "0.5rem" }}>
                                <h2 className="question-text-modern" style={{ fontSize: 'clamp(1rem, 2vw, 1.6rem)', maxHeight: 'none', fontWeight: '500', textAlign: 'left', justifyContent: 'flex-start', overflow: 'visible', color: '#2D3748' }}>
                                    <LatexText text={currentQuestion.text} />
                                </h2>
                            </div>
                            <div className="interaction-area-modern" style={{ marginTop: "1.5rem", flex: "none" }}>
                                <div className="options-grid-modern">
                                    {currentQuestion.options.map((option, idx) => (
                                        <button
                                            key={idx}
                                            className={`option-btn-modern ${selectedOption === option ? 'selected' : ''} ${isSubmitted && option === currentQuestion.correctAnswer ? 'correct' : ''} ${isSubmitted && selectedOption === option && !isCorrect ? 'wrong' : ''}`}
                                            style={{ fontWeight: '500' }}
                                            onClick={() => !isSubmitted && setSelectedOption(option)}
                                            disabled={isSubmitted}
                                        >
                                            <LatexText text={option} />
                                        </button>
                                    ))}
                                    {isSubmitted && isCorrect && (
                                        <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="feedback-mini correct" style={{ marginTop: '20px', gridColumn: '1 / -1', justifySelf: 'center', textAlign: 'center', width: '100%' }}>
                                            {feedbackMessage}
                                        </motion.div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <ExplanationModal isOpen={showExplanationModal} isCorrect={isCorrect} correctAnswer={currentQuestion.correctAnswer} explanation={currentQuestion.solution} onClose={() => setShowExplanationModal(false)} />

            <PracticeReportModal 
                isOpen={showReportModal} 
                stats={{
                    timeTaken: formatTime(timeElapsed),
                    correctAnswers: Object.values(answers).filter(val => val.isCorrect === true).length,
                    totalQuestions: questions.length
                }} 
                onContinue={() => navigate(-1)} 
            />

            <footer className="junior-bottom-bar">
                <div className="desktop-footer-controls">
                    <div className="bottom-left">
                        <button className="bg-red-50 text-red-500 px-6 py-2 rounded-xl border-2 border-red-100 font-bold" onClick={() => navigate(-1)}>Exit</button>
                    </div>
                    <div className="bottom-center">
                        {isSubmitted && <button className="view-explanation-btn" onClick={() => setShowExplanationModal(true)}><Eye size={20} /> VIEW EXPLANATION</button>}
                    </div>
                    <div className="bottom-right">
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <button
                                className="nav-pill-next-btn bg-gray-200 text-gray-600"
                                onClick={handlePrevious}
                                disabled={qIndex === 0}
                                style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '0.5rem 1rem', borderRadius: '9999px', fontWeight: 'bold' }}
                            >
                                <ChevronLeft size={28} strokeWidth={3} />
                                Prev
                            </button>
                            {isSubmitted ?
                                <button className="nav-pill-next-btn" onClick={handleNext}>{qIndex === questions.length - 1 ? "Finish" : "Next"} {qIndex === questions.length - 1 ? null : <ChevronRight />}</button> :
                                <button className="nav-pill-submit-btn" onClick={handleCheck} disabled={!selectedOption}>Submit <Check /></button>
                            }
                        </div>
                    </div>
                </div>
                <div className="mobile-footer-controls" style={{ justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                    <div className="mobile-footer-left">
                        <button className="bg-red-50 text-red-500 px-3 py-2 rounded-xl border-2 border-red-100 font-bold" style={{ fontSize: '0.8rem', display: 'flex', alignItems: 'center' }} onClick={() => navigate(-1)}>
                            Exit
                        </button>
                    </div>
                    <div className="mobile-footer-center" style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
                        {isSubmitted && <button className="view-explanation-btn" style={{ fontSize: '0.7rem', padding: '0.3rem 0.5rem' }} onClick={() => setShowExplanationModal(true)}><Eye size={14} /> VIEW EXPLANATION</button>}
                    </div>
                    <div className="mobile-footer-right" style={{ display: 'flex', gap: '5px' }}>
                        <button
                            className="nav-pill-next-btn bg-gray-200 text-gray-600"
                            onClick={handlePrevious}
                            disabled={qIndex === 0}
                            style={{ display: 'flex', alignItems: 'center', padding: '0.4rem 0.8rem', borderRadius: '9999px', fontWeight: 'bold', fontSize: '0.8rem' }}
                        >
                            <ChevronLeft size={16} strokeWidth={3} /> Prev
                        </button>
                        {isSubmitted ? (
                            <button className="nav-pill-next-btn" style={{ display: 'flex', alignItems: 'center', padding: '0.4rem 0.8rem', borderRadius: '9999px', fontWeight: 'bold', fontSize: '0.8rem' }} onClick={handleNext}>{qIndex === questions.length - 1 ? "Finish" : "Next"} {qIndex === questions.length - 1 ? null : <ChevronRight size={16} strokeWidth={3} />}</button>
                        ) : (
                            <button className="nav-pill-submit-btn" style={{ display: 'flex', alignItems: 'center', padding: '0.4rem 0.8rem', borderRadius: '9999px', fontWeight: 'bold', fontSize: '0.8rem' }} onClick={handleCheck} disabled={!selectedOption}>Submit <Check size={16} strokeWidth={3} /></button>
                        )}
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default AlgebraicMethods;
