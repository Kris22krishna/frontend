import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Timer, Star, ChevronLeft, RefreshCw, FileText, Check, X, Eye, ChevronRight, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../../../contexts/AuthContext';
import { api } from '../../../../services/api';
import Navbar from '../../../Navbar';
import { TOPIC_CONFIGS } from '../../../../lib/topicConfig';
import { LatexText } from '../../../LatexText';
import ExplanationModal from '../../../ExplanationModal';
import StickerExit from '../../../StickerExit';
import mascotImg from '../../../../assets/mascot.png';
import avatarImg from '../../../../assets/avatar.png';
import '../../../../pages/juniors/class-1/Grade1Practice.css';

const DynamicVisual = ({ type, data }) => {
    if (type === 'bundle') {
        const { tens, ones } = data;
        return (
            <div className="flex flex-wrap justify-center gap-6 p-4 bg-white rounded-2xl shadow-inner min-h-[200px] w-full items-center">
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
                                <div className="absolute top-1/2 left-0 w-full h-1 bg-red-500 -translate-y-1/2 opacity-80"></div>
                            </div>
                            <span className="text-xs font-bold text-amber-700 mt-1">10</span>
                        </motion.div>
                    ))}
                </div>
                {ones > 0 && <div className="h-16 w-1 bg-gray-200 rounded-full mx-2"></div>}
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
    }

    if (type === 'expanded') {
        const { num, tens, ones, hideOne = false, hideNum = false, hideExpanded = false } = data;
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
    }

    if (type === 'compare') {
        const { left, right } = data;
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
    }

    return null;
};

const Grade2CountingInTens = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const queryParams = new URLSearchParams(location.search);
    const skillId = queryParams.get('skillId');
    const isTest = skillId ? (skillId.includes('TEST') || skillId.startsWith('11')) : false;
    const totalQuestions = isTest ? 10 : 5;

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
    const [isAutoAdvancing, setIsAutoAdvancing] = useState(false);

    const getTopicInfo = () => {
        const grade2Config = TOPIC_CONFIGS['2'];
        if (!grade2Config) return { topicName: 'Practice', skillName: 'Mathematics' };

        for (const [topicName, skills] of Object.entries(grade2Config)) {
            const skill = skills.find(s => s.id === skillId);
            if (skill) return { topicName, skillName: skill.name };
        }
        return { topicName: 'Counting in Tens', skillName: 'Practice' };
    };

    const { topicName, skillName } = getTopicInfo();
    const getNextSkill = () => {
        const grade2Config = TOPIC_CONFIGS['2'];
        if (!grade2Config) return null;

        const topics = Object.keys(grade2Config);
        let currentTopicIdx = -1;
        let currentSkillIdx = -1;

        for (let i = 0; i < topics.length; i++) {
            const skills = grade2Config[topics[i]];
            const idx = skills.findIndex(s => s.id === skillId);
            if (idx !== -1) {
                currentTopicIdx = i;
                currentSkillIdx = idx;
                break;
            }
        }

        if (currentTopicIdx === -1) return null;

        const currentTopicSkills = grade2Config[topics[currentTopicIdx]];

        if (currentSkillIdx < currentTopicSkills.length - 1) {
            return {
                ...currentTopicSkills[currentSkillIdx + 1],
                topic: topics[currentTopicIdx]
            };
        }

        if (currentTopicIdx < topics.length - 1) {
            const nextTopicSkills = grade2Config[topics[currentTopicIdx + 1]];
            if (nextTopicSkills.length > 0) {
                return {
                    ...nextTopicSkills[0],
                    topic: topics[currentTopicIdx + 1]
                };
            }
        }

        return null;
    };

    const generateNumbersUpTo100Questions = () => {
        const questions = [];
        for (let i = 0; i < totalQuestions; i++) {
            let tens, ones, questionText, target, explanation;
            if (i < 2) {
                tens = (i + 1) * 2;
                ones = 0;
                target = (tens * 10).toString();
                questionText = `How many sticks are there in total? (Each bundle has 10 sticks)`;
                explanation = `Each bundle has 10 sticks. \nThere are ${tens} bundles, so: \n$${tens} \\times 10 = ${target}$ sticks.`;
            } else if (i < 4) {
                tens = Math.floor(Math.random() * 8) + 1;
                ones = Math.floor(Math.random() * 9) + 1;
                target = (tens * 10 + ones).toString();
                questionText = `Count the sticks. How many are there in total?`;
                explanation = `There are ${tens} bundles of ten ($${tens}0$) and ${ones} single sticks. \n$${tens}0 + ${ones} = ${target}$.`;
            } else {
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
                type: 'bundle',
                visualData: { tens, ones },
                explanation: explanation
            });
        }
        return questions;
    };

    const generatePlaceValueQuestions = () => {
        const questions = [];
        for (let i = 0; i < totalQuestions; i++) {
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
                type: 'bundle',
                visualData: { tens, ones, num },
                explanation: explanation
            });
        }
        return questions;
    };

    const generateExpandedFormQuestions = () => {
        const questions = [];
        for (let i = 0; i < totalQuestions; i++) {
            const num = Math.floor(Math.random() * 89) + 10;
            const tens = Math.floor(num / 10);
            const ones = num % 10;
            const tensVal = tens * 10;
            let questionText, target, explanation;

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
                type: 'expanded',
                visualData: { num, tens, ones, hideOne: (i % 3 === 2), hideNum: (i % 3 === 1), hideExpanded: (i % 3 === 0) },
                explanation: explanation
            });
        }
        return questions;
    };

    const generateComparingQuestions = () => {
        const questions = [];
        for (let i = 0; i < totalQuestions; i++) {
            let left = Math.floor(Math.random() * 90) + 10;
            let right = Math.floor(Math.random() * 90) + 10;
            if (i % 5 === 0) right = left;

            let questionText, target, options, explanation;
            if (i % 2 === 0) {
                questionText = `Which symbol goes in the circle? \n $${left}$ ○ $${right}$`;
                target = left > right ? '>' : (left < right ? '<' : '=');
                options = ['>', '<', '='];
                explanation = `$${left}$ is ${left > right ? 'greater than' : (left < right ? 'less than' : 'equal to')} $${right}$.`;
            } else {
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
                type: 'compare',
                visualData: { left, right },
                explanation: explanation
            });
        }
        return questions;
    };

    const generateQuestions = (selectedSkill) => {
        if (selectedSkill === '1010') return generateNumbersUpTo100Questions();
        if (selectedSkill === '1011') return generatePlaceValueQuestions();
        if (selectedSkill === '1012') return generateExpandedFormQuestions();
        if (selectedSkill === '1013') return generateComparingQuestions();

        // MIXED For Test — generate extra, deduplicate, then slice
        const pool = [
            ...generateNumbersUpTo100Questions(),
            ...generatePlaceValueQuestions(),
            ...generateExpandedFormQuestions(),
            ...generateComparingQuestions()
        ].sort(() => 0.5 - Math.random());
        const seen = new Set();
        const unique = pool.filter(q => {
            const key = q.text + '||' + q.correct;
            if (seen.has(key)) return false;
            seen.add(key);
            return true;
        });
        return unique.slice(0, totalQuestions);
    };

    useEffect(() => {
        const init = async () => {
            const userId = user?.user_id || user?.id;
            if (!userId) return;
            const qs = generateQuestions(skillId);
            setSessionQuestions(qs);
            try {
                const parsedSkillId = parseInt(skillId) || 0;
                const session = await api.createPracticeSession(userId, parsedSkillId);
                setSessionId(session?.session_id);
            } catch (e) { console.error(e); }
        };
        init();
    }, [user, skillId]);

    useEffect(() => {
        let interval;
        if (!showResults && sessionQuestions.length > 0) {
            interval = setInterval(() => setTimer(v => v + 1), 1000);
        }
        return () => clearInterval(interval);
    }, [showResults, sessionQuestions]);

    useEffect(() => {
        setShowExplanationModal(false);
    }, [qIndex]);

    useEffect(() => {
        if (answers[qIndex]) {
            setSelectedOption(answers[qIndex].selectedOption);
            setIsAnswered(true);
        } else {
            setSelectedOption(null);
            setIsAnswered(false);
        }
    }, [qIndex, answers]);

    const handleExit = async () => {
        try {
            if (sessionId) {
                await api.finishSession(sessionId);
            }
        } catch (e) {
            console.error("Error finishing session:", e);
        }
        navigate('/junior/grade/2');
    };

    const handleOptionSelect = (option) => {
        if (isAnswered) return;
        setSelectedOption(option);
    };

    const handleSubmit = () => {
        if (isAnswered || selectedOption === null) return;
        const option = selectedOption;

        setIsAnswered(true);
        const isCorrect = option === sessionQuestions[qIndex].correct;

        // Auto-log
        try {
            const uid = user?.user_id || user?.id || sessionStorage.getItem('userId') || localStorage.getItem('userId');
            const qData = sessionQuestions[qIndex] || {};
            const skId = typeof skillId !== 'undefined' ? skillId : '0';
            const currentTimer = typeof timer !== 'undefined' ? timer : 0;

            if (uid && sessionId) {
                api.recordAttempt({
                    user_id: parseInt(uid, 10),
                    session_id: sessionId,
                    skill_id: parseInt(skId, 10) || 0,
                    template_id: null,
                    difficulty_level: 'Medium',
                    question_text: String(qData.text || ''),
                    correct_answer: String(qData.correct || qData.correctAnswer || ''),
                    student_answer: String(option),
                    is_correct: isCorrect,
                    solution_text: String(qData.explanation || qData.solution || ''),
                    time_spent_seconds: currentTimer
                }).catch(err => console.error("Auto-log failed:", err));
            }
        } catch (err) {
            console.error("Auto-log error:", err);
        }

        if (isCorrect) {
            setScore(s => s + 1);
        }

        setAnswers(prev => ({
            ...prev,
            [qIndex]: {
                selectedOption: option,
                isCorrect,
                type: sessionQuestions[qIndex].type,
                visualData: sessionQuestions[qIndex].visualData,
                questionText: sessionQuestions[qIndex].text,
                correctAnswer: sessionQuestions[qIndex].correct,
                explanation: sessionQuestions[qIndex].explanation || "Detailed explanation is coming soon! Feel free to ask your teacher for help in the meantime. 💡"
            }
        }));

        if (!isTest && !isCorrect) {
            setShowExplanationModal(true);
        } else if (isTest) {
            handleNext();
        } else {
            setIsAutoAdvancing(true);
            setTimeout(() => {
                handleNext();
                setIsAutoAdvancing(false);
            }, 800);
        }
    };

    const handleSkip = () => {
        if (isAnswered) return;
        setAnswers(prev => ({
            ...prev,
            [qIndex]: {
                selectedOption: 'Skipped',
                isCorrect: false,
                type: sessionQuestions[qIndex].type,
                visualData: sessionQuestions[qIndex].visualData,
                questionText: sessionQuestions[qIndex].text,
                correctAnswer: sessionQuestions[qIndex].correct,
                explanation: "This question was skipped. " + sessionQuestions[qIndex].explanation
            }
        }));
        handleNext();
    };

    const handleNext = async () => {
        if (qIndex < totalQuestions - 1) {
            setQIndex(v => v + 1);
        } else {
            setShowResults(true);
            try {
                if (sessionId) {
                    await api.finishSession(sessionId);
                    await api.createReport({
                        uid: user?.id || 'unknown',
                        category: 'Practice',
                        reportData: {
                            skill_id: skillId,
                            skill_name: skillName,
                            score: Math.round((score / totalQuestions) * 100),
                            total_questions: totalQuestions,
                            correct_answers: score,
                            time_spent: timer,
                            timestamp: new Date().toISOString(),
                            answers: Object.values(answers).filter(a => a !== undefined)
                        }
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
        const percentage = Math.round((score / totalQuestions) * 100);
        return (
            <div className="grade1-practice-page results-view overflow-y-auto">
                <Navbar />
                <header className="results-header">
                    <h1 className="results-title">Adventure Report</h1>
                    <div className="exit-container">
                        <StickerExit onClick={handleExit} />
                    </div>
                </header>

                <main className="results-content">
                    <div className="results-hero-section">
                        <img src={avatarImg} alt="Mascot" style={{ width: '120px', height: '120px', margin: '0 auto 20px' }} />
                        <h2 style={{ fontSize: '2.5rem', fontWeight: 400, color: '#31326F', fontFamily: 'Nunito, sans-serif' }}>Adventure Complete! 🎉</h2>

                        <div className="stars-container">
                            {[1, 2, 3].map(i => (
                                <motion.div
                                    key={i}
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: i * 0.2 }}
                                    className="star-wrapper"
                                >
                                    <Star
                                        size={60}
                                        fill={percentage >= (i * 33) ? "#FFD700" : "#EDF2F7"}
                                        color={percentage >= (i * 33) ? "#F6AD55" : "#CBD5E0"}
                                    />
                                </motion.div>
                            ))}
                        </div>

                        <div className="results-stats-grid">
                            <div className="stat-card">
                                <span className="stat-label">Correct</span>
                                <span className="stat-value-large">{score}/{totalQuestions}</span>
                            </div>
                            <div className="stat-card">
                                <span className="stat-label">Time</span>
                                <span className="stat-value-large">{formatTime(timer)}</span>
                            </div>
                            <div className="stat-card">
                                <span className="stat-label">Accuracy</span>
                                <span className="stat-value-large">{percentage}%</span>
                            </div>
                            <div className="stat-card">
                                <span className="stat-label">Score</span>
                                <span className="stat-value-large">{score * 10}</span>
                            </div>
                        </div>
                    </div>

                    {isTest ? (
                        <div className="detailed-breakdown">
                            <h3 className="breakdown-title">Quest Log 📜</h3>
                            <div className="quest-log-list">
                                {sessionQuestions.map((q, idx) => {
                                    const ans = answers[idx];
                                    if (!ans) return null;
                                    return (
                                        <motion.div
                                            key={idx}
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            className="quest-log-item"
                                        >
                                            <div className={`log-number ${!ans.isCorrect ? 'wrong' : ''}`}>
                                                {idx + 1}
                                            </div>
                                            <div className="log-content">
                                                <div className="log-question">
                                                    <LatexText text={ans.questionText} />
                                                    {ans.visualData && (
                                                        <div className="log-visual-area" style={{ marginTop: '10px', display: 'flex', justifyContent: 'center' }}>
                                                            <DynamicVisual type={ans.type} data={ans.visualData} />
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="log-answers">
                                                    <div className={`log-answer-box ${ans.isCorrect ? 'correct-box' : 'wrong-box'}`}>
                                                        <span className="log-label">Your Answer</span>
                                                        <span className="log-value">{ans.selectedOption}</span>
                                                    </div>
                                                    {!ans.isCorrect && (
                                                        <div className="log-answer-box correct-box">
                                                            <span className="log-label">Correct Answer</span>
                                                            <span className="log-value">{ans.correctAnswer}</span>
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="log-explanation">
                                                    <span className="log-label" style={{ color: '#4C51BF' }}>Explain? 💡</span>
                                                    <LatexText text={ans.explanation} />
                                                </div>
                                            </div>
                                            <div className="log-icon">
                                                {ans.isCorrect ? (
                                                    <Check size={32} color="#4FB7B3" strokeWidth={3} />
                                                ) : (
                                                    <X size={32} color="#FF6B6B" strokeWidth={3} />
                                                )}
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </div>
                    ) : (
                        <div className="practice-summary" style={{ textAlign: 'center', padding: '20px 0' }}>
                            <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '20px' }}>
                                {Object.values(answers).map((ans, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ delay: idx * 0.1 }}
                                        style={{
                                            width: '50px', height: '50px', borderRadius: '50%',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            fontSize: '1.5rem',
                                            background: ans.isCorrect ? '#C6F6D5' : '#FED7D7',
                                            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                                        }}
                                    >
                                        {ans.isCorrect ? '✅' : '❌'}
                                    </motion.div>
                                ))}
                            </div>
                            <p style={{ fontSize: '1.3rem', fontWeight: 400, color: '#4A5568', marginBottom: '10px' }}>
                                {percentage >= 80 ? '🌟 Amazing work! Keep it up!' :
                                    percentage >= 60 ? '💪 Good effort! Keep practicing!' :
                                        '🌱 Nice try! Practice makes perfect!'}
                            </p>
                        </div>
                    )}

                    <div className="results-actions">
                        <button className="action-btn-large play-again-btn" onClick={() => window.location.reload()}>
                            <RefreshCw size={24} /> Retake Test
                        </button>

                        {getNextSkill() && (
                            <button className="action-btn-large next-skill-btn" onClick={() => {
                                const next = getNextSkill();
                                navigate(`/junior/grade/2/${next.route}?skillId=${next.id}`);
                                window.location.reload();
                            }}>
                                Next Skill <ArrowRight size={24} />
                            </button>
                        )}

                        <button className="action-btn-large back-topics-btn" onClick={() => navigate('/junior/grade/2')}>
                            <FileText size={24} /> Back to Topics
                        </button>
                    </div>
                </main>
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

                    <div className="g1-timer-badge">
                        <Timer size={18} />
                        {formatTime(timer)}
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px', flex: 1, minWidth: 0 }}>
                        <span style={{ fontWeight: 400, color: '#666', fontSize: '1rem', background: 'white', padding: '8px 15px', borderRadius: '15px', boxShadow: '0 4px 10px rgba(0,0,0,0.05)', whiteSpace: 'nowrap' }}>
                            Q {qIndex + 1}/{totalQuestions}
                        </span>
                        <span style={{ fontWeight: 400, color: '#2D3436', fontSize: '1rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            <LatexText text={skillName} />
                        </span>
                    </div>

                    {isTest && !isAnswered && (
                        <button className="g1-skip-btn" onClick={handleSkip} style={{ marginLeft: '15px' }}>
                            Skip Quest ⏭️
                        </button>
                    )}

                    <div className="exit-practice-sticker" style={{ marginLeft: 'auto' }}>
                        <StickerExit onClick={handleExit} />
                    </div>
                </div>

                <div className="g1-progress-container" style={{ margin: '0 0 10px 0' }}>
                    <div className="g1-progress-fill" style={{ width: `${((qIndex + 1) / totalQuestions) * 100}%` }}></div>
                </div>
                <div className="g1-topic-header-compact" style={{ textAlign: 'center', margin: '5px 0', fontSize: '0.8rem', color: '#64748B', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 400 }}>{topicName}</div>
                <motion.div key={qIndex} initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="g1-question-card">
                    <h2 className="g1-question-text"><LatexText text={currentQ.text} /></h2>

                    <div className="g1-content-split">
                        <div className="g1-visual-area">
                            <DynamicVisual type={currentQ.type} data={currentQ.visualData} />
                        </div>

                        <div className="g1-quiz-side">
                            <div className="g1-options-grid">
                                {currentQ.options.map((opt, i) => (
                                    <button
                                        key={i}
                                        className={`g1-option-btn
                                            ${selectedOption === opt.toString() || selectedOption === opt ? (isTest ? 'selected-test' : (isAnswered ? (opt === currentQ.correct ? 'selected-correct' : 'selected-wrong') : 'selected-test')) : ''}
                                            ${!isTest && isAnswered && opt === currentQ.correct ? 'revealed-correct' : ''}
                                        `}
                                        onClick={() => handleOptionSelect(opt)}
                                        disabled={isAnswered}
                                    >
                                        <LatexText text={opt.toString()} />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="g1-navigation-footer">
                        <button className="g1-nav-btn prev-btn" onClick={() => { if (qIndex > 0) setQIndex(qIndex - 1); }} disabled={qIndex === 0}>
                            <ChevronLeft size={24} /> Prev
                        </button>

                        <div>
                            {isAnswered && !isTest && !answers[qIndex]?.isCorrect && (
                                <button className="g1-nav-btn steps-btn" onClick={() => setShowExplanationModal(true)}>
                                    <Eye size={24} /> Steps
                                </button>
                            )}

                            {!isAnswered ? (
                                <button className="g1-nav-btn submit-btn" onClick={handleSubmit} disabled={selectedOption === null}>
                                    {isTest ? (qIndex === totalQuestions - 1 ? 'Finish Test' : 'Next Question') : 'Check Answer'} <ChevronRight size={24} />
                                </button>
                            ) : (
                                <button className="g1-nav-btn next-btn" onClick={handleNext} disabled={isAutoAdvancing}>
                                    {qIndex === totalQuestions - 1 ? (isTest ? 'Finish Test' : 'Finish') : 'Next Question'} <ChevronRight size={24} />
                                </button>
                            )}
                        </div>
                    </div>
                </motion.div>
            </div>

            <ExplanationModal
                isOpen={showExplanationModal}
                isCorrect={answers[qIndex]?.isCorrect}
                correctAnswer={currentQ.correct}
                explanation={currentQ.explanation}
                onClose={() => setShowExplanationModal(false)}
                onNext={() => setShowExplanationModal(false)}
            />
        </div>
    );
};

export default Grade2CountingInTens;
