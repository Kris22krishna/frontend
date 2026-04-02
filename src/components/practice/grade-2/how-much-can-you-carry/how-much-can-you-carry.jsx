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
    if (type === 'compare') {
        const { objectA, objectB } = data;
        return (
            <div style={{ display: 'flex', justifyContent: 'center', gap: '80px', width: '100%', padding: '40px', background: 'white', borderRadius: '30px', boxShadow: '0 10px 25px rgba(0,0,0,0.05)' }}>
                <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}>
                    <div style={{ fontSize: '70px', filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.1))' }}>
                        {objectA.emoji}
                    </div>
                    <span style={{ fontWeight: 900, color: '#31326F', fontSize: '1.2rem' }}>{objectA.name}</span>
                </motion.div>
                <div style={{ display: 'flex', alignItems: 'center', fontSize: '2rem', color: '#94a3b8', fontWeight: 900 }}>VS</div>
                <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}>
                    <div style={{ fontSize: '70px', filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.1))' }}>
                        {objectB.emoji}
                    </div>
                    <span style={{ fontWeight: 900, color: '#31326F', fontSize: '1.2rem' }}>{objectB.name}</span>
                </motion.div>
            </div>
        );
    }

    if (type === 'weight-compare') {
        const { w1, w2, obj1, obj2 } = data;
        return (
            <div style={{ display: 'flex', justifyContent: 'center', gap: '50px', width: '100%', padding: '40px', background: 'white', borderRadius: '30px', boxShadow: '0 10px 25px rgba(0,0,0,0.05)' }}>
                <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}>
                    {obj1 && (
                        <>
                            <div style={{ fontSize: '70px', filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.1))' }}>
                                {obj1.emoji}
                            </div>
                            <span style={{ fontWeight: 900, color: '#31326F', fontSize: '1.2rem' }}>{obj1.name}</span>
                        </>
                    )}
                    <div style={{ padding: '15px 30px', background: '#e2e8f0', borderRadius: '15px', color: '#1e293b', fontSize: '1.5rem', fontWeight: 900, borderBottom: '6px solid #cbd5e1' }}>
                        {w1} kg
                    </div>
                </motion.div>
                <div style={{ display: 'flex', alignItems: 'center', fontSize: '2rem', color: '#94a3b8', fontWeight: 900 }}>VS</div>
                <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} transition={{ delay: 0.2 }} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}>
                    {obj2 && (
                        <>
                            <div style={{ fontSize: '70px', filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.1))' }}>
                                {obj2.emoji}
                            </div>
                            <span style={{ fontWeight: 900, color: '#31326F', fontSize: '1.2rem' }}>{obj2.name}</span>
                        </>
                    )}
                    <div style={{ padding: '15px 30px', background: '#e2e8f0', borderRadius: '15px', color: '#1e293b', fontSize: '1.5rem', fontWeight: 900, borderBottom: '6px solid #cbd5e1' }}>
                        {w2} kg
                    </div>
                </motion.div>
            </div>
        );
    }

    if (type === 'estimate') {
        const { objectType, emoji } = data;
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', padding: '40px', background: '#fff7ed', borderRadius: '30px', border: '3px solid #ffedd5' }}>
                <motion.div
                    initial={{ rotate: -5 }} animate={{ rotate: 5 }} transition={{ repeat: Infinity, repeatType: 'reverse', duration: 2 }}
                    style={{ filter: 'drop-shadow(0 15px 15px rgba(251, 146, 60, 0.2))', fontSize: '80px' }}
                >
                    {emoji}
                </motion.div>
            </div>
        );
    }

    return null;
};

const Grade2HowMuchCanYouCarry = () => {
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
        return { topicName: 'How Much Can You Carry?', skillName: 'Practice' };
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

    const generateComparingWeightsQuestions = () => {
        const questions = [];
        const groceries = [
            { name: 'Rice Sack', emoji: '🌾' },
            { name: 'Sugar Bag', emoji: '🍚' },
            { name: 'Wheat Sack', emoji: '🍞' },
            { name: 'Jaggery Bag', emoji: '🍬' },
            { name: 'Salt Packet', emoji: '🧂' },
            { name: 'Dal Bag', emoji: '🍲' }
        ];

        // Generate all 15 unique combinations of 2 items
        let pairs = [];
        for (let i = 0; i < groceries.length; i++) {
            for (let j = i + 1; j < groceries.length; j++) {
                pairs.push({ item1: groceries[i], item2: groceries[j] });
            }
        }

        // Shuffle the unique combinations
        pairs = pairs.sort(() => 0.5 - Math.random());

        // Ensure 3 heavier and 2 lighter (or 2 heavier and 3 lighter) for perfect balance
        const numHeavier = Math.random() > 0.5 ? Math.floor(totalQuestions / 2) : Math.ceil(totalQuestions / 2);
        const heavierFlags = Array(totalQuestions).fill(false).fill(true, 0, numHeavier).sort(() => Math.random() - 0.5);

        for (let i = 0; i < totalQuestions; i++) {
            const pair = pairs[i % pairs.length];
            const isSwapped = Math.random() > 0.5;
            let g1 = isSwapped ? pair.item2 : pair.item1;
            let g2 = isSwapped ? pair.item1 : pair.item2;

            const w1 = Math.floor(Math.random() * 20) + 5;
            let w2 = Math.floor(Math.random() * 20) + 5;
            while (w1 === w2) w2 = Math.floor(Math.random() * 20) + 5;

            const askingHeavier = heavierFlags[i];

            questions.push({
                text: askingHeavier ? `Which bag is HEAVIER?` : `Which bag is LIGHTER?`,
                options: [`${g1.name} (${w1} kg)`, `${g2.name} (${w2} kg)`].sort(() => 0.5 - Math.random()),
                correct: askingHeavier ? (w1 > w2 ? `${g1.name} (${w1} kg)` : `${g2.name} (${w2} kg)`) : (w1 < w2 ? `${g1.name} (${w1} kg)` : `${g2.name} (${w2} kg)`),
                type: 'weight-compare',
                visualData: { w1, w2, obj1: g1, obj2: g2 },
                explanation: askingHeavier ? `${Math.max(w1, w2)}kg is a bigger number than ${Math.min(w1, w2)}kg, so it is heavier.` : `${Math.min(w1, w2)}kg is a smaller number than ${Math.max(w1, w2)}kg, so it is lighter.`
            });
        }
        return questions;
    };

    const generateHeavierLighterQuestions = () => {
        const questions = [];
        const pairs = [
            { h: { name: 'Elephant', emoji: '🐘', w: 1000 }, l: { name: 'Mouse', emoji: '🐭', w: 1 } },
            { h: { name: 'Watermelon', emoji: '🍉', w: 50 }, l: { name: 'Apple', emoji: '🍎', w: 5 } },
            { h: { name: 'School Bus', emoji: '🚌', w: 5000 }, l: { name: 'Bicycle', emoji: '🚲', w: 50 } },
            { h: { name: 'Brick', emoji: '🧱', w: 30 }, l: { name: 'Feather', emoji: '🪶', w: 1 } },
            { h: { name: 'Pumpkin', emoji: '🎃', w: 40 }, l: { name: 'Leaf', emoji: '🍃', w: 1 } },
            { h: { name: 'Big Stone', emoji: '🪨', w: 60 }, l: { name: 'Balloon', emoji: '🎈', w: 2 } }
        ];

        const shuffledPairs = [...pairs].sort(() => Math.random() - 0.5);

        // Ensure 3 heavier and 2 lighter (or 2 heavier and 3 lighter) for perfect balance
        const numHeavier = Math.random() > 0.5 ? Math.floor(totalQuestions / 2) : Math.ceil(totalQuestions / 2);
        const heavierFlags = Array(totalQuestions).fill(false).fill(true, 0, numHeavier).sort(() => Math.random() - 0.5);

        for (let i = 0; i < totalQuestions; i++) {
            const pair = shuffledPairs[i % shuffledPairs.length];
            const askingHeavier = heavierFlags[i];

            const isReverse = Math.random() > 0.5;
            const objA = isReverse ? pair.l : pair.h;
            const objB = isReverse ? pair.h : pair.l;

            questions.push({
                text: askingHeavier ? `Which one is HEAVIER?` : `Which one is LIGHTER?`,
                options: [objA.name, objB.name],
                correct: askingHeavier ? (objA.w > objB.w ? objA.name : objB.name) : (objA.w < objB.w ? objA.name : objB.name),
                type: 'compare',
                visualData: { objectA: objA, objectB: objB },
                explanation: `A ${pair.h.name} is much heavier than a ${pair.l.name}.`
            });
        }
        return questions;
    };

    const generateEstimatingQuestions = () => {
        const scenarios = [
            { obj: 'School Bag', heaviness: 'Heavy', hint: 'It has many books inside!', emoji: '🎒' },
            { obj: 'Pencil Box', heaviness: 'Light', hint: 'It only holds pens and pencils.', emoji: '✏️' },
            { obj: 'Water Bottle', heaviness: 'Heavy', hint: 'It is full of water!', emoji: '💧' },
            { obj: 'Tiffin Box', heaviness: 'Heavy', hint: 'Full of yummy food!', emoji: '🍱' },
            { obj: 'Eraser', heaviness: 'Light', hint: 'It is small and easy to hold.', emoji: '🧽' },
            { obj: 'Textbook', heaviness: 'Heavy', hint: 'It has thick pages and feels solid.', emoji: '📓' },
            { obj: 'Crayon', heaviness: 'Light', hint: 'It is very small and thin.', emoji: '🖍️' },
            { obj: 'Laptop', heaviness: 'Heavy', hint: 'A machine with battery and screen.', emoji: '💻' },
            { obj: 'Paper Sheet', heaviness: 'Light', hint: 'It floats in the wind!', emoji: '📄' },
            { obj: 'Teacher Desk', heaviness: 'Heavy', hint: 'You cannot move it easily.', emoji: '🪑' },
            { obj: 'Chalk', heaviness: 'Light', hint: 'It breaks easily and feels weightless.', emoji: '🤍' },
            { obj: 'Chair', heaviness: 'Heavy', hint: 'Furniture made of wood or metal.', emoji: '🪑' },
            { obj: 'Ruler', heaviness: 'Light', hint: 'A thin strip of plastic or wood.', emoji: '📏' },
            { obj: 'Dustbin', heaviness: 'Heavy', hint: 'Holds a lot of trash.', emoji: '🗑️' },
            { obj: 'Paintbrush', heaviness: 'Light', hint: 'Thin and easy to hold.', emoji: '🖌️' }
        ].sort(() => 0.5 - Math.random());

        const questions = [];
        for (let i = 0; i < totalQuestions; i++) {
            const scenario = scenarios[i % scenarios.length];
            // Fix grammar: "a Eraser" -> "an Eraser"
            const article = /^[aeiou]/i.test(scenario.obj) ? 'an' : 'a';

            questions.push({
                text: `Is ${article} ${scenario.obj} usually HEAVY or LIGHT?`,
                options: ['Heavy', 'Light'],
                correct: scenario.heaviness,
                type: 'estimate',
                visualData: { objectType: scenario.obj, emoji: scenario.emoji },
                hint: scenario.hint,
                explanation: `${article.charAt(0).toUpperCase() + article.slice(1)} ${scenario.obj} often feels ${scenario.heaviness.toLowerCase()} because of what it holds or what it is made of.`
            });
        }
        return questions;
    };

    const generateQuestions = (selectedSkill) => {
        if (selectedSkill === '1007') return generateComparingWeightsQuestions();
        if (selectedSkill === '1008') return generateHeavierLighterQuestions();
        if (selectedSkill === '1009') return generateEstimatingQuestions();

        // MIXED For Test — generate extra, deduplicate, then slice
        const pool = [
            ...generateComparingWeightsQuestions(),
            ...generateHeavierLighterQuestions(),
            ...generateEstimatingQuestions()
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
                    {currentQ.hint && (
                        <p style={{ color: '#9a3412', fontStyle: 'italic', marginBottom: '20px', textAlign: 'center', marginTop: '-10px' }}>💡 Hint: {currentQ.hint}</p>
                    )}

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
                                        <LatexText text={opt.toString().charAt(0).toUpperCase() + opt.toString().slice(1)} />
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

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }
    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }
    componentDidCatch(error, errorInfo) {
        this.setState({ errorInfo });
        console.error("Component Error Caught:", error, errorInfo);
    }
    render() {
        if (this.state.hasError) {
            return (
                <div style={{ padding: '20px', background: 'red', color: 'white', overflow: 'auto' }}>
                    <h2>Something went wrong in this component:</h2>
                    <pre style={{ whiteSpace: 'pre-wrap' }}>{this.state.error && this.state.error.toString()}</pre>
                    <pre style={{ whiteSpace: 'pre-wrap' }}>{this.state.errorInfo && this.state.errorInfo.componentStack}</pre>
                </div>
            );
        }
        return this.props.children;
    }
}

const ExportComponent = () => (
    <ErrorBoundary>
        <Grade2HowMuchCanYouCarry />
    </ErrorBoundary>
);

export default ExportComponent;
