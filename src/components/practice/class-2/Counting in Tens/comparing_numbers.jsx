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

const ComparisonVisual = ({ left, right }) => {
    return (
        <div className="flex justify-between items-center gap-4 w-full px-4 lg:px-12 py-8 bg-slate-50 rounded-3xl border-4 border-white shadow-inner">
            <div className="flex flex-col items-center gap-4 flex-1">
                <div className="text-5xl font-black text-rose-500 bg-white w-full py-6 rounded-2xl shadow-sm text-center border-2 border-rose-100">
                    {left}
                </div>
            </div>

            <div className="bg-slate-200 w-12 h-12 flex items-center justify-center rounded-full font-bold text-slate-400">?</div>

            <div className="flex flex-col items-center gap-4 flex-1">
                <div className="text-5xl font-black text-blue-500 bg-white w-full py-6 rounded-2xl shadow-sm text-center border-2 border-blue-100">
                    {right}
                </div>
            </div>
        </div>
    );
};

const ComparingNumbers = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const skillId = queryParams.get('skillId') || '1013';

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
        return { topicName: 'Counting in Tens', skillName: 'Comparing numbers' };
    };

    const { topicName, skillName } = getTopicInfo();

    const generateQuestions = () => {
        const questions = [];
        for (let i = 0; i < TOTAL_QUESTIONS; i++) {
            let left = Math.floor(Math.random() * 90) + 10;
            let right = Math.floor(Math.random() * 90) + 10;

            // Ensure some variety including equality
            if (i % 5 === 0) right = left;

            let questionText, target, options, explanation;

            if (i % 2 === 0) {
                questionText = `Which symbol goes in the circle? \n $${left}$ ○ $${right}$`;
                target = left > right ? '>' : (left < right ? '<' : '=');
                options = ['>', '<', '='];
                explanation = `$${left}$ is ${left > right ? 'greater than' : (left < right ? 'less than' : 'equal to')} $${right}$.`;
            } else {
                questionText = left > right ? `Which number is GREATER?` : `Which number is SMALLER?`;
                target = left > right ? left.toString() : left.toString(); // Wait, logic fix below
                if (left === right) {
                    questionText = `Are these numbers equal?`;
                    target = 'Yes';
                    options = ['Yes', 'No'];
                    explanation = `Both numbers are same ($${left}$), so they are equal.`;
                } else {
                    const isGreaterQ = Math.random() > 0.5;
                    questionText = isGreaterQ ? `Which number is GREATER?` : `Which number is SMALLER?`;
                    target = isGreaterQ ? (left > right ? left : right).toString() : (left < right ? left : right).toString();
                    options = [left.toString(), right.toString()];
                    explanation = isGreaterQ
                        ? `$${target}$ is greater because it has more Tens/Ones.`
                        : `$${target}$ is smaller because it has fewer Tens/Ones.`;
                }
            }

            questions.push({
                text: questionText,
                options: options,
                correct: target,
                explanation: explanation,
                visualData: { left, right }
            });
        }
        return questions;
    };

    useEffect(() => {
        const init = async () => {
            const qs = generateQuestions();
            setSessionQuestions(qs);
            try {
                const session = await api.createPracticeSession(user?.id, 'comparing-numbers');
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
        if (saved) { setSelectedOption(saved.selectedOption); setIsAnswered(true); }
        else { setSelectedOption(null); setIsAnswered(false); }
    }, [qIndex, answers]);

    useEffect(() => { setShowExplanationModal(false); }, [qIndex]);

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
        if (qIndex < TOTAL_QUESTIONS - 1) { setQIndex(v => v + 1); }
        else {
            setShowResults(true);
            try {
                if (sessionId) {
                    await api.finishSession(sessionId);
                    const formattedAnswers = Object.values(answers).map((data, idx) => ({
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

    const formatTime = (s) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;

    if (sessionQuestions.length === 0) return <div className="grade1-practice-page"><div className="g1-loading-blob" /></div>;

    if (showResults) {
        return (
            <div className="grade1-practice-page">
                <Navbar />
                <div className="g1-results-container">
                    <div className="g1-practice-container">
                        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="g1-question-card g1-results-card">
                            <div className="g1-trophy-container">🌈</div>
                            <h2 className="g1-question-text">Quest Complete!</h2>
                            <div className="results-stats">
                                <div className="g1-stat-badge"><Star color="#FFD700" fill="#FFD700" /><span className="g1-stat-value">{score}/{TOTAL_QUESTIONS}</span></div>
                                <div className="g1-stat-badge"><Timer color="#4ECDC4" /><span className="g1-stat-value">{formatTime(timer)}</span></div>
                            </div>
                            <button className="g1-primary-btn mt-8" onClick={() => navigate(`/junior/grade/2/topic/${topicName}`)}>Return Home <ArrowRight /></button>
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
                <div className="blob blob-1" style={{ background: '#FFF1F2' }}></div>
                <div className="blob blob-2" style={{ background: '#EFF6FF' }}></div>
            </div>

            <div className="g1-practice-container">
                <div className="g1-header-nav">
                    <div className="flex gap-2">
                        <button className="g1-back-btn" onClick={() => qIndex > 0 && setQIndex(qIndex - 1)} disabled={qIndex === 0}><ChevronLeft /> Back</button>
                        <button className="g1-back-btn text-red-500 border-red-100 hover:bg-red-50" onClick={() => navigate(`/junior/grade/2/topic/${topicName}`)}><X size={20} /> Quit</button>
                    </div>
                    <div className="g1-timer-badge"><Timer size={18} /> {formatTime(timer)}</div>
                    <div className="px-4 py-1.5 bg-white rounded-2xl shadow-sm font-black text-rose-900">{qIndex + 1} / {TOTAL_QUESTIONS}</div>
                </div>

                <div className="g1-progress-container"><div className="g1-progress-fill bg-rose-400" style={{ width: `${((qIndex + 1) / TOTAL_QUESTIONS) * 100}%` }}></div></div>

                <div className="text-center mb-6">
                    <span className="text-rose-400 font-bold uppercase tracking-widest text-xs">{topicName}</span>
                    <h1 className="text-3xl font-black text-slate-800">{skillName}</h1>
                </div>

                <motion.div key={qIndex} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="g1-question-card relative pt-12">
                    <h2 className="text-2xl font-bold text-slate-700 text-center mb-8 h-16"><LatexText text={currentQ.text} /></h2>

                    <ComparisonVisual {...currentQ.visualData} />

                    <div className="flex flex-wrap justify-center gap-4 mt-12 pb-8">
                        {currentQ.options.map((opt, i) => (
                            <button
                                key={i}
                                className={`min-w-[120px] h-24 text-4xl font-black rounded-[32px] shadow-lg transition-all border-b-8
                                    ${selectedOption === opt ? (opt === currentQ.correct ? 'bg-green-500 text-white border-green-700' : 'bg-rose-500 text-white border-rose-700') : 'bg-white text-slate-700 border-slate-200 hover:translate-y-[-4px] hover:border-b-[12px]'}
                                 `}
                                onClick={() => handleOptionSelect(opt)}
                                disabled={isAnswered}
                            >
                                <LatexText text={opt} />
                            </button>
                        ))}
                    </div>

                    <AnimatePresence>
                        {isAnswered && (
                            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="flex justify-center">
                                <button className="g1-primary-btn w-full max-w-md py-5 text-xl bg-slate-900 shadow-2xl" onClick={handleNext}>
                                    {qIndex === TOTAL_QUESTIONS - 1 ? 'Finish Quest 🏆' : 'Next Challenge 🚀'} <ArrowRight />
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <AnimatePresence>
                        {isAnswered && answers[qIndex]?.isCorrect && (
                            <motion.div initial={{ scale: 0, rotate: -20 }} animate={{ scale: 1, rotate: 0 }} className="absolute -top-10 -left-6 lg:-left-12 w-28 h-28 hidden lg:block">
                                <img src={mascotImg} alt="Mascot" className="w-full h-full object-contain" />
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

export default ComparingNumbers;
