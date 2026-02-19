import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Timer, Trophy, Star, ChevronLeft, ArrowRight, Home } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../../../contexts/AuthContext';
import { api } from '../../../../services/api';
import Navbar from '../../../Navbar';
import { TOPIC_CONFIGS } from '../../../../lib/topicConfig';
import { LatexText } from '../../../LatexText';
import ExplanationModal from '../../../ExplanationModal';
import mascotImg from '../../../../assets/mascot.png';
import '../../grade-1/Grade1Practice.css';

const TOTAL_QUESTIONS = 10;

const BundleVisual = ({ tens, ones }) => {
    return (
        <div className="flex flex-wrap justify-center gap-6 p-4 bg-white rounded-2xl shadow-inner min-h-[180px] w-full items-center">
            <div className="flex flex-wrap gap-4 justify-center">
                {[...Array(tens)].map((_, i) => (
                    <motion.div key={`ten-${i}`} initial={{ scale: 0 }} animate={{ scale: 1 }} className="relative flex flex-col items-center">
                        <div className="flex gap-0.5 bg-amber-100 p-1 rounded-sm border-2 border-amber-300 relative">
                            {[...Array(10)].map((_, j) => <div key={j} className="w-1 h-10 bg-amber-400 rounded-full"></div>)}
                            <div className="absolute top-1/2 left-0 w-full h-1 bg-red-400 rotate-2 opacity-80"></div>
                        </div>
                    </motion.div>
                ))}
            </div>
            {ones > 0 && <div className="h-12 w-0.5 bg-gray-200"></div>}
            <div className="flex flex-wrap gap-1 justify-center">
                {[...Array(ones)].map((_, i) => (
                    <motion.div key={`one-${i}`} initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="w-1 h-10 bg-amber-400 rounded-full shadow-sm"></motion.div>
                ))}
            </div>
        </div>
    );
};

const PlaceValueTensOnes = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const skillId = queryParams.get('skillId') || '1011';

    const [qIndex, setQIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [showResults, setShowResults] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const [timer, setTimer] = useState(0);
    const [answers, setAnswers] = useState({});
    const [sessionQuestions, setSessionQuestions] = useState([]);
    const [sessionId, setSessionId] = useState(null);
    const [showExplanationModal, setShowExplanationModal] = useState(false);

    const getTopicInfo = () => {
        const grade2Config = TOPIC_CONFIGS['2'];
        for (const [topicName, skills] of Object.entries(grade2Config)) {
            const skill = skills.find(s => s.id === skillId);
            if (skill) return { topicName, skillName: skill.name };
        }
        return { topicName: 'Counting in Tens', skillName: 'Place value (Tens and Ones)' };
    };

    const { topicName, skillName } = getTopicInfo();

    const generateQuestions = () => {
        const questions = [];
        for (let i = 0; i < TOTAL_QUESTIONS; i++) {
            const num = Math.floor(Math.random() * 89) + 10;
            const tens = Math.floor(num / 10);
            const ones = num % 10;

            let questionText, target, type, explanation;

            if (i % 3 === 0) {
                type = 'count-tens';
                questionText = `In the number $${num}$, which digit is in the TENS place?`;
                target = tens.toString();
                explanation = `In $${num}$, the number on the left is the Tens. So, there are $${tens}$ Tens.`;
            } else if (i % 3 === 1) {
                type = 'count-ones';
                questionText = `In the number $${num}$, which digit is in the ONES place?`;
                target = ones.toString();
                explanation = `In $${num}$, the number on the right is the Ones. So, there are $${ones}$ Ones.`;
            } else {
                type = 'make-number';
                questionText = `What number is made of $${tens}$ Tens and $${ones}$ Ones?`;
                target = num.toString();
                explanation = `$${tens}$ Tens = $${tens}0$ \n$${ones}$ Ones = $${ones}$ \n$${tens}0 + ${ones} = ${num}$.`;
            }

            const options = [target];
            while (options.length < 4) {
                let wrong;
                if (type === 'make-number') {
                    wrong = (num + (Math.random() > 0.5 ? 10 : (Math.random() > 0.5 ? 1 : -1))).toString();
                } else {
                    wrong = Math.floor(Math.random() * 10).toString();
                }
                if (wrong !== target && !options.includes(wrong) && parseInt(wrong) >= 0) {
                    options.push(wrong);
                }
            }

            questions.push({
                text: questionText,
                options: options.sort((a, b) => parseInt(a) - parseInt(b)),
                correct: target,
                explanation: explanation,
                visualData: { tens, ones, num }
            });
        }
        return questions;
    };

    useEffect(() => {
        const init = async () => {
            const qs = generateQuestions();
            setSessionQuestions(qs);
            try {
                const session = await api.createPracticeSession(user?.id, 'place-value-tens-ones');
                setSessionId(session?.session_id);
            } catch (e) { console.error(e); }
        };
        init();
    }, [user]);

    useEffect(() => {
        let interval;
        if (!showResults && sessionQuestions.length > 0) {
            interval = setInterval(() => setTimer(v => v + 1), 1000);
        }
        return () => clearInterval(interval);
    }, [showResults, sessionQuestions]);

    useEffect(() => {
        const saved = answers[qIndex];
        if (saved) {
            setSelectedOption(saved.selectedOption);
            setIsAnswered(true);
        } else {
            setSelectedOption(null);
            setIsAnswered(false);
        }
    }, [qIndex, answers]);

    useEffect(() => {
        setShowExplanationModal(false);
    }, [qIndex]);

    const handleOptionSelect = (option) => {
        if (isAnswered) return;
        const isCorrect = option === sessionQuestions[qIndex].correct;
        setSelectedOption(option);
        setIsAnswered(true);
        if (isCorrect) setScore(s => s + 1);
        setAnswers(prev => ({ ...prev, [qIndex]: { selectedOption: option, isCorrect } }));
        setShowExplanationModal(true);
    };

    const handleNext = async () => {
        if (qIndex < TOTAL_QUESTIONS - 1) {
            setQIndex(v => v + 1);
        } else {
            setShowResults(true);
            try {
                if (sessionId) {
                    await api.finishSession(sessionId);
                    const formattedAnswers = Object.entries(answers).map(([idx, data]) => ({
                        question: sessionQuestions[idx].text,
                        selected: data.selectedOption,
                        correct: sessionQuestions[idx].correct,
                        isCorrect: data.isCorrect
                    }));
                    await api.createReport({
                        session_id: sessionId, user_id: user?.id, score: score,
                        total_questions: TOTAL_QUESTIONS, time_spent: timer, answers: formattedAnswers
                    });
                }
            } catch (e) { console.error(e); }
        }
    };

    const formatTime = (s) => {
        const mins = Math.floor(s / 60);
        const secs = s % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    if (sessionQuestions.length === 0) return <div className="grade1-practice-page"><div className="g1-loading-blob" /></div>;

    if (showResults) {
        return (
            <div className="grade1-practice-page">
                <Navbar />
                <div className="g1-practice-container">
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="g1-question-card g1-results-card">
                        <div className="g1-trophy-container">🏆</div>
                        <h2 className="g1-question-text">Amazing Progress!</h2>
                        <div className="results-stats">
                            <div className="g1-stat-badge"><Star color="#FFD700" fill="#FFD700" /><span className="g1-stat-value">{score}/{TOTAL_QUESTIONS}</span></div>
                            <div className="g1-stat-badge"><Timer color="#4ECDC4" /><span className="g1-stat-value">{formatTime(timer)}</span></div>
                        </div>
                        <div className="g1-next-action">
                            <button className="g1-primary-btn" onClick={() => navigate('/junior/grade/2')}>Back to Map <ArrowRight /></button>
                        </div>
                    </motion.div>
                </div>
            </div>
        );
    }

    const currentQ = sessionQuestions[qIndex];

    return (
        <div className="grade1-practice-page">
            <div className="g1-bg-blobs">
                <div className="blob blob-1"></div>
                <div className="blob blob-2"></div>
            </div>

            <div className="g1-practice-container">
                <div className="g1-header-nav">
                    <button className="g1-back-btn" onClick={() => qIndex > 0 && setQIndex(qIndex - 1)} disabled={qIndex === 0}><ChevronLeft size={20} /> Prev</button>
                    <div className="g1-timer-badge"><Timer size={18} />{formatTime(timer)}</div>
                    <div className="px-4 py-1 bg-white rounded-xl shadow-sm font-black text-[#31326F]">{qIndex + 1} / {TOTAL_QUESTIONS}</div>
                </div>

                <div className="g1-progress-container">
                    <div className="g1-progress-fill" style={{ width: `${((qIndex + 1) / TOTAL_QUESTIONS) * 100}%` }}></div>
                </div>

                <div className="text-center mb-6">
                    <span className="text-blue-400 font-bold uppercase tracking-wider text-sm">{topicName}</span>
                    <h1 className="text-2xl lg:text-3xl font-black text-[#31326F]">{skillName}</h1>
                </div>

                <motion.div key={qIndex} initial={{ x: 30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="g1-question-card relative overflow-visible">
                    <div className="mb-6">
                        <h2 className="text-xl lg:text-2xl font-bold text-[#31326F]"><LatexText text={currentQ.text} /></h2>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-8">
                        <div className="bg-blue-50/50 rounded-3xl p-6 flex flex-col items-center justify-center min-h-[250px]">
                            <BundleVisual tens={currentQ.visualData.tens} ones={currentQ.visualData.ones} />
                            <div className="mt-4 text-center">
                                <div className="text-4xl font-black text-[#31326F] bg-white px-8 py-2 rounded-2xl shadow-sm border-2 border-blue-100">
                                    {currentQ.visualData.num}
                                </div>
                                <div className="flex gap-4 mt-2 font-bold text-gray-500">
                                    <span>TENS</span>
                                    <span>ONES</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col justify-center gap-4">
                            <div className="grid grid-cols-2 gap-4">
                                {currentQ.options.map((opt, i) => (
                                    <button
                                        key={i}
                                        className={`g1-option-btn h-20 text-2xl font-black rounded-2xl
                                            ${selectedOption === opt ? (opt === currentQ.correct ? 'bg-green-500 text-white shadow-green-200' : 'bg-red-500 text-white shadow-red-200') : 'bg-white text-[#31326F] border-2 border-gray-100'}
                                            ${isAnswered && opt === currentQ.correct ? 'border-green-500 ring-2 ring-green-200' : ''}
                                        `}
                                        onClick={() => handleOptionSelect(opt)}
                                        disabled={isAnswered}
                                    >
                                        {opt}
                                    </button>
                                ))}
                            </div>
                            {isAnswered && (
                                <motion.button initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="g1-primary-btn py-4 text-xl shadow-xl flex items-center justify-center gap-2 mt-4" onClick={handleNext}>
                                    {qIndex === TOTAL_QUESTIONS - 1 ? 'Finish Quest 🏆' : 'Next Challenge 🚀'}<ArrowRight />
                                </motion.button>
                            )}
                        </div>
                    </div>

                    <AnimatePresence>
                        {isAnswered && answers[qIndex]?.isCorrect && (
                            <motion.div initial={{ scale: 0, y: 20 }} animate={{ scale: 1, y: 0 }} className="absolute -top-12 -right-8 w-28 h-28 hidden lg:block">
                                <img src={mascotImg} alt="Mascot" className="w-full h-full object-contain drop-shadow-xl" />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>

            <ExplanationModal
                isOpen={showExplanationModal}
                isCorrect={answers[qIndex]?.isCorrect}
                correctAnswer={currentQ.correct}
                explanation={currentQ.explanation}
                onClose={() => setShowExplanationModal(false)}
                onNext={handleNext}
            />
        </div>
    );
};

export default PlaceValueTensOnes;
