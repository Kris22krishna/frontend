import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Timer, Trophy, Star, ChevronLeft, ArrowRight, Home, X } from 'lucide-react';
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

const ExpandedVisual = ({ num, tens, ones, hideOne = false, hideNum = false, hideExpanded = false }) => {
    return (
        <div className="flex flex-col items-center gap-8 p-6 bg-white rounded-3xl shadow-sm border-2 border-dashed border-indigo-100 w-full">
            <div className="text-6xl font-black text-indigo-600 bg-indigo-50 px-10 py-4 rounded-3xl shadow-inner">
                {hideNum ? '?' : num}
            </div>
            {!hideExpanded && (
                <div className="flex items-center gap-4 text-4xl font-black text-gray-400">
                    <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="text-amber-500">
                        {tens * 10}
                    </motion.div>
                    <span>+</span>
                    <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="text-emerald-500">
                        {hideOne ? '?' : ones}
                    </motion.div>
                </div>
            )}
        </div>
    );
};

const ExpandedForm = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const skillId = queryParams.get('skillId') || '1012';

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
        return { topicName: 'Counting in Tens', skillName: 'Expanded form' };
    };

    const { topicName, skillName } = getTopicInfo();

    const generateQuestions = () => {
        const questions = [];
        for (let i = 0; i < TOTAL_QUESTIONS; i++) {
            const num = Math.floor(Math.random() * 89) + 10;
            const tens = Math.floor(num / 10);
            const ones = num % 10;
            const tensVal = tens * 10;

            let questionText, target, explanation, showVisual = true;

            if (i % 3 === 0) {
                questionText = `What is the expanded form of $${num}$?`;
                target = `$${tensVal} + ${ones}$`;
                explanation = `$${num}$ has $${tens}$ Tens ($${tensVal}$) and $${ones}$ Ones ($${ones}$). \nSo, expanded form is $${tensVal} + ${ones}$.`;
            } else if (i % 3 === 1) {
                questionText = `Which number is $${tensVal} + ${ones}$?`;
                target = num.toString();
                explanation = `Adding $${tensVal}$ and $${ones}$ gives $${num}$.`;
            } else {
                questionText = `Fill in the blank: $${num} = ${tensVal} + ?$`;
                target = ones.toString();
                explanation = `We have $${tensVal}$ already. We need $${ones}$ more to make $${num}$.`;
            }

            const options = [target];
            while (options.length < 4) {
                let wrong;
                const offset = Math.floor(Math.random() * 3) + 1;
                const sign = Math.random() > 0.5 ? 1 : -1;

                if (i % 3 === 0) {
                    const wTens = (tens + (sign * offset)) * 10;
                    const wOnes = (ones + (Math.random() > 0.5 ? 1 : -1));
                    const finalTens = wTens >= 0 && wTens <= 90 ? wTens : (tens === 10 ? 20 : 10);
                    const finalOnes = wOnes >= 0 && wOnes <= 9 ? wOnes : (ones === 5 ? 6 : 5);
                    wrong = `$${finalTens} + ${finalOnes}$`;
                } else if (i % 3 === 1) {
                    wrong = (num + (sign * (offset * 10 + (Math.random() > 0.5 ? 1 : 0)))).toString();
                } else {
                    wrong = (ones + (sign * offset)).toString();
                }

                if (wrong !== target && !options.includes(wrong) && !wrong.includes('-') && parseInt(wrong) !== 0) {
                    options.push(wrong);
                }
            }

            questions.push({
                text: questionText,
                options: options.sort(),
                correct: target,
                explanation: explanation,
                visualData: {
                    num,
                    tens,
                    ones,
                    hideOne: (i % 3 === 2),
                    hideNum: (i % 3 === 1),
                    hideExpanded: (i % 3 === 0)
                }
            });
        }
        return questions;
    };

    useEffect(() => {
        const init = async () => {
            const qs = generateQuestions();
            setSessionQuestions(qs);
            try {
                const session = await api.createPracticeSession(user?.id, 'expanded-form');
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
                <div className="g1-results-container">
                    <div className="g1-practice-container">
                        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="g1-question-card g1-results-card">
                            <div className="g1-trophy-container">🌟</div>
                            <h2 className="g1-question-text">Superstar!</h2>
                            <div className="results-stats">
                                <div className="g1-stat-badge"><Star color="#FFD700" fill="#FFD700" /><span className="g1-stat-value">{score}/{TOTAL_QUESTIONS}</span></div>
                                <div className="g1-stat-badge"><Timer color="#4ECDC4" /><span className="g1-stat-value">{formatTime(timer)}</span></div>
                            </div>
                            <div className="g1-next-action">
                                <button className="g1-primary-btn" onClick={() => navigate(`/junior/grade/2/topic/${topicName}`)}>Back to Map <ArrowRight /></button>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        );
    }

    const currentQ = sessionQuestions[qIndex];

    return (
        <div className="grade1-practice-page">
            <div className="g1-bg-blobs">
                <div className="blob blob-1" style={{ background: '#EEF2FF' }}></div>
                <div className="blob blob-2" style={{ background: '#F5F3FF' }}></div>
            </div>

            <div className="g1-practice-container">
                <div className="g1-header-nav">
                    <div className="flex gap-2">
                        <button className="g1-back-btn" onClick={() => qIndex > 0 && setQIndex(qIndex - 1)} disabled={qIndex === 0}><ChevronLeft /> Back</button>
                        <button className="g1-back-btn text-red-500 border-red-100 hover:bg-red-50" onClick={() => navigate(`/junior/grade/2/topic/${topicName}`)}><X size={20} /> Quit</button>
                    </div>
                    <div className="g1-timer-badge"><Timer size={18} /> {formatTime(timer)}</div>
                    <div className="px-4 py-1.5 bg-white rounded-2xl shadow-sm font-black text-indigo-900">{qIndex + 1} / {TOTAL_QUESTIONS}</div>
                </div>

                <div className="g1-progress-container"><div className="g1-progress-fill bg-indigo-500" style={{ width: `${((qIndex + 1) / TOTAL_QUESTIONS) * 100}%` }}></div></div>

                <div className="text-center mb-8">
                    <span className="text-indigo-400 font-bold uppercase tracking-widest text-xs">{topicName}</span>
                    <h1 className="text-3xl font-black text-indigo-900">{skillName}</h1>
                </div>

                <motion.div key={qIndex} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="g1-question-card relative">
                    <h2 className="text-2xl font-bold text-indigo-900 mb-8 text-center"><LatexText text={currentQ.text} /></h2>

                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <ExpandedVisual {...currentQ.visualData} />

                        <div className="grid grid-cols-1 gap-4">
                            {currentQ.options.map((opt, i) => (
                                <button
                                    key={i}
                                    className={`g1-option-btn py-6 text-2xl font-black rounded-3xl transition-all
                                        ${selectedOption === opt ? (opt === currentQ.correct ? 'bg-indigo-600 text-white' : 'bg-red-500 text-white') : 'bg-white text-indigo-900 border-2 border-indigo-50 hover:bg-indigo-50'}
                                    `}
                                    onClick={() => handleOptionSelect(opt)}
                                    disabled={isAnswered}
                                >
                                    <LatexText text={opt} />
                                </button>
                            ))}
                            {isAnswered && (
                                <button className="g1-primary-btn py-5 text-xl font-black rounded-3xl mt-4 flex items-center justify-center gap-3 bg-indigo-900" onClick={handleNext}>
                                    {qIndex === TOTAL_QUESTIONS - 1 ? 'Finish Quest 🏆' : 'Next Step 🚀'} <ArrowRight />
                                </button>
                            )}
                        </div>
                    </div>

                    <AnimatePresence>
                        {isAnswered && answers[qIndex]?.isCorrect && (
                            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute -top-12 -right-8 w-32 h-32">
                                <img src={mascotImg} alt="Mascot" className="w-full h-full object-contain" />
                                <div className="absolute top-0 right-0 bg-white p-2 rounded-full shadow-lg border-2 border-indigo-400"><Star fill="#FCD34D" color="#FCD34D" size={20} /></div>
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

export default ExpandedForm;
