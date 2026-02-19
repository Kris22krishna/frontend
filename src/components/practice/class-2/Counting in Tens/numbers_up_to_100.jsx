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
        <div className="flex flex-wrap justify-center gap-6 p-4 bg-white rounded-2xl shadow-inner min-h-[200px] w-full items-center">
            {/* Tens Bundles */}
            <div className="flex flex-wrap gap-4 justify-center">
                {[...Array(tens)].map((_, i) => (
                    <motion.div
                        key={`ten-${i}`}
                        initial={{ scale: 0, rotate: -10 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="relative flex flex-col items-center"
                    >
                        <div className="flex gap-0.5 bg-amber-100 p-1 rounded-sm border-2 border-amber-300 relative">
                            {[...Array(10)].map((_, j) => (
                                <div key={j} className="w-1.5 h-12 bg-amber-400 rounded-full border-b-2 border-amber-600"></div>
                            ))}
                            {/* String tying the bundle */}
                            <div className="absolute top-1/2 left-0 w-full h-1 bg-red-500 -translate-y-1/2 opacity-80"></div>
                        </div>
                        <span className="text-xs font-bold text-amber-700 mt-1">10</span>
                    </motion.div>
                ))}
            </div>

            {ones > 0 && <div className="h-16 w-1 bg-gray-200 rounded-full mx-2"></div>}

            {/* Ones Sticks */}
            <div className="flex flex-wrap gap-2 justify-center">
                {[...Array(ones)].map((_, i) => (
                    <motion.div
                        key={`one-${i}`}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: (tens * 0.1) + (i * 0.1) }}
                        className="w-1.5 h-12 bg-amber-400 rounded-full border-b-2 border-amber-600"
                    ></motion.div>
                ))}
            </div>
        </div>
    );
};

const NumbersUpTo100 = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const skillId = queryParams.get('skillId') || '1010';

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
        return { topicName: 'Counting in Tens', skillName: 'Numbers up to 100' };
    };

    const { topicName, skillName } = getTopicInfo();

    const generateQuestions = () => {
        const questions = [];
        for (let i = 0; i < TOTAL_QUESTIONS; i++) {
            let tens, ones, questionText, target, explanation;

            if (i < 3) {
                // Focus on pure tens
                tens = (i + 1) * 2;
                ones = 0;
                target = (tens * 10).toString();
                questionText = `How many sticks are there in total? (Each bundle has 10 sticks)`;
                explanation = `Each bundle has 10 sticks. \nThere are ${tens} bundles, so: \n$${tens} \\times 10 = ${target}$ sticks.`;
            } else if (i < 7) {
                // Mixed tens and ones
                tens = Math.floor(Math.random() * 8) + 1;
                ones = Math.floor(Math.random() * 9) + 1;
                target = (tens * 10 + ones).toString();
                questionText = `Count the sticks. How many are there in total?`;
                explanation = `There are ${tens} bundles of ten ($${tens}0$) and ${ones} single sticks. \n$${tens}0 + ${ones} = ${target}$.`;
            } else {
                // Large numbers
                tens = Math.floor(Math.random() * 5) + 4;
                ones = Math.floor(Math.random() * 9);
                target = (tens * 10 + ones).toString();
                questionText = `Observe the bundles and sticks. What is the total count?`;
                explanation = `Counting bundles: $${tens}$ tens = $${tens}0$. \nCounting units: ${ones}. \nTotal: $${tens}0 + ${ones} = ${target}$.`;
            }

            const options = [target];
            while (options.length < 4) {
                const offSet = Math.random() > 0.5 ? 10 : 1;
                const wrong = (parseInt(target) + (Math.random() > 0.5 ? offSet : -offSet)).toString();
                if (wrong !== target && parseInt(wrong) > 0 && parseInt(wrong) <= 100 && !options.includes(wrong)) {
                    options.push(wrong);
                }
            }

            questions.push({
                text: questionText,
                options: options.sort((a, b) => parseInt(a) - parseInt(b)),
                correct: target,
                explanation: explanation,
                visualData: { tens, ones }
            });
        }
        return questions;
    };

    useEffect(() => {
        const init = async () => {
            const qs = generateQuestions();
            setSessionQuestions(qs);
            try {
                const session = await api.createPracticeSession(user?.id, 'numbers-up-to-100');
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

    // Restore answer state when qIndex changes
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

    // Decouple modal from answer state
    useEffect(() => {
        setShowExplanationModal(false);
    }, [qIndex]);

    const handleOptionSelect = (option) => {
        if (isAnswered) return;
        const isCorrect = option === sessionQuestions[qIndex].correct;
        setSelectedOption(option);
        setIsAnswered(true);

        if (isCorrect) setScore(s => s + 1);

        setAnswers(prev => ({
            ...prev,
            [qIndex]: { selectedOption: option, isCorrect }
        }));

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
                        session_id: sessionId,
                        user_id: user?.id,
                        score: score,
                        total_questions: TOTAL_QUESTIONS,
                        time_spent: timer,
                        answers: formattedAnswers
                    });
                }
            } catch (e) { console.error(e); }
        }
    };

    const handlePrevious = () => {
        if (qIndex > 0) setQIndex(v => v - 1);
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
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="g1-question-card g1-results-card">
                        <div className="g1-trophy-container">🏆</div>
                        <h2 className="g1-question-text">Quest Completed!</h2>
                        <div className="results-stats">
                            <div className="g1-stat-badge">
                                <Star color="#FFD700" fill="#FFD700" />
                                <span className="g1-stat-value">{score}/{TOTAL_QUESTIONS}</span>
                            </div>
                            <div className="g1-stat-badge">
                                <Timer color="#4ECDC4" />
                                <span className="g1-stat-value">{formatTime(timer)}</span>
                            </div>
                        </div>
                        <div className="g1-next-action">
                            <button className="g1-primary-btn" onClick={() => navigate('/junior/grade/2')}>
                                Back to Map <ArrowRight />
                            </button>
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
                <div className="blob blob-3"></div>
            </div>

            <div className="g1-practice-container">
                <div className="g1-header-nav">
                    <button className="g1-back-btn" onClick={handlePrevious} disabled={qIndex === 0}>
                        <ChevronLeft size={20} /> Prev
                    </button>

                    <div className="g1-timer-badge">
                        <Timer size={18} />
                        {formatTime(timer)}
                    </div>

                    <div className="px-4 py-1.5 bg-white rounded-2xl shadow-sm font-black text-[#31326F]">
                        {qIndex + 1} / {TOTAL_QUESTIONS}
                    </div>
                </div>

                <div className="g1-progress-container">
                    <div className="g1-progress-fill" style={{ width: `${((qIndex + 1) / TOTAL_QUESTIONS) * 100}%` }}></div>
                </div>

                <div className="g1-topic-skill-header text-center mb-6">
                    <span className="g1-topic-name text-blue-500 font-bold uppercase tracking-wider">{topicName}</span>
                    <h1 className="g1-skill-name text-3xl font-black text-[#31326F] mt-1">{skillName}</h1>
                </div>

                <motion.div key={qIndex} initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="g1-question-card relative">
                    <div className="mb-6">
                        <h2 className="text-xl lg:text-2xl font-bold text-[#31326F] leading-snug">
                            <LatexText text={currentQ.text} />
                        </h2>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-8 items-center">
                        <div className="g1-visual-area min-h-[250px] flex items-center justify-center bg-gray-50 rounded-3xl p-4">
                            <BundleVisual tens={currentQ.visualData.tens} ones={currentQ.visualData.ones} />
                        </div>

                        <div className="g1-options-side">
                            <div className="grid grid-cols-2 gap-4">
                                {currentQ.options.map((opt, i) => (
                                    <button
                                        key={i}
                                        className={`g1-option-btn h-20 text-2xl font-black rounded-3xl transition-all
                                            ${selectedOption === opt ? (opt === currentQ.correct ? 'bg-green-500 text-white shadow-green-200' : 'bg-red-500 text-white shadow-red-200') : 'bg-white hover:bg-blue-50 text-[#31326F] border-2 border-gray-100 shadow-sm'}
                                            ${isAnswered && opt === currentQ.correct ? 'border-green-500' : ''}
                                        `}
                                        onClick={() => handleOptionSelect(opt)}
                                        disabled={isAnswered}
                                    >
                                        {opt}
                                    </button>
                                ))}
                            </div>

                            <div className="mt-8 flex justify-center">
                                <AnimatePresence>
                                    {isAnswered && (
                                        <motion.button
                                            initial={{ y: 20, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            className="g1-primary-btn w-full py-4 text-xl shadow-xl flex items-center justify-center gap-2"
                                            onClick={handleNext}
                                        >
                                            {qIndex === TOTAL_QUESTIONS - 1 ? 'Finish Quest 🏆' : 'Next Challenge 🚀'}
                                            <ArrowRight />
                                        </motion.button>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>

                    {/* Mini feedback mascot */}
                    <AnimatePresence>
                        {isAnswered && answers[qIndex]?.isCorrect && (
                            <motion.div
                                initial={{ scale: 0, rotate: 20 }}
                                animate={{ scale: 1, rotate: 0 }}
                                className="absolute -top-10 -right-4 lg:-right-10 w-24 h-24 z-10"
                            >
                                <img src={mascotImg} alt="Mascot" className="w-full h-full object-contain drop-shadow-lg" />
                                <div className="absolute -top-4 -left-10 bg-white px-3 py-1 rounded-full shadow-md border-2 border-green-400 rotate-[-10deg]">
                                    <span className="text-xs font-black text-green-600">Great Job!</span>
                                </div>
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

export default NumbersUpTo100;
