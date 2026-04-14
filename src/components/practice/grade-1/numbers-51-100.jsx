import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Home, ArrowRight, Timer, Trophy, Star, ChevronLeft, RefreshCw, FileText, Check, X, Eye, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSessionLogger } from '@/hooks/useSessionLogger';
import { NODE_IDS } from '@/lib/curriculumIds';
import Navbar from '../../Navbar';
import { TOPIC_CONFIGS } from '../../../lib/topicConfig';
import { LatexText } from '../../LatexText';
import ExplanationModal from '../../ExplanationModal';
import StickerExit from '../../StickerExit';
import mascotImg from '../../../assets/mascot.png';
import avatarImg from '../../../assets/avatar.png';
import '../../../pages/juniors/class-1/Grade1Practice.css';

const DynamicVisual = ({ type, data, isAnswered }) => {
    if (type === 'comparison') {
        const { n1, n2, color1, color2 } = data;
        const renderBlocks = (num, color) => {
            const tens = Math.floor(num / 10);
            const ones = num % 10;
            return (
                <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-end', justifyContent: 'center', minHeight: '80px', flexWrap: 'wrap' }}>
                    <div style={{ display: 'flex', gap: '2px', flexWrap: 'wrap', justifyContent: 'center', maxWidth: '120px' }}>
                        {Array.from({ length: tens }).map((_, i) => (
                            <div key={i} style={{ display: 'flex', flexDirection: 'column-reverse', gap: '1px', background: color + '15', padding: '1.5px', borderRadius: '3px', border: `1px solid ${color}30` }}>
                                {Array.from({ length: 10 }).map((_, j) => (
                                    <div key={j} style={{ width: '10px', height: '4px', backgroundColor: color, borderRadius: '1px' }}></div>
                                ))}
                            </div>
                        ))}
                    </div>
                    {ones > 0 && (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 10px)', gap: '2px', paddingBottom: '2px' }}>
                            {Array.from({ length: ones }).map((_, i) => (
                                <div key={i} style={{ width: '10px', height: '10px', backgroundColor: color, borderRadius: '2px', opacity: 0.9 }}></div>
                            ))}
                        </div>
                    )}
                </div>
            );
        };

        return (
            <div style={{ display: 'flex', gap: '20px', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="g1-compare-item" style={{ textAlign: 'center', flex: 1 }}>
                    <div style={{ fontSize: '1.4rem', fontWeight: 800, color: color1, marginBottom: '12px', fontFamily: 'Nunito' }}>
                        Group A {isAnswered && <span style={{ fontSize: '1.1rem', opacity: 0.8 }}>({n1})</span>}
                    </div>
                    {renderBlocks(n1, color1)}
                </motion.div>
                <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#CBD5E1', fontFamily: 'Nunito' }}>VS</div>
                <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="g1-compare-item" style={{ textAlign: 'center', flex: 1 }}>
                    <div style={{ fontSize: '1.4rem', fontWeight: 800, color: color2, marginBottom: '12px', fontFamily: 'Nunito' }}>
                        Group B {isAnswered && <span style={{ fontSize: '1.1rem', opacity: 0.8 }}>({n2})</span>}
                    </div>
                    {renderBlocks(n2, color2)}
                </motion.div>
            </div>
        );
    }

    const { num, color, seq, step } = data;

    if (type === 'skip') {
        return (
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="g1-pattern-visual">
                <div className="g1-pattern-belt">
                    {seq.map((n, i) => (
                        <motion.div
                            key={i}
                            initial={{ y: 10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: i * 0.1 }}
                            className="g1-pattern-slot"
                        >
                            <div className="g1-pattern-item" style={{ background: color, color: '#fff', fontWeight: 400, fontSize: 'clamp(1.4rem, 4vw, 1.8rem)' }}>
                                {n}
                            </div>
                            {i < seq.length - 1 && <div className="g1-pattern-arrow" style={{ opacity: 0 }}>+{step}</div>}
                        </motion.div>
                    ))}
                    <motion.div
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: seq.length * 0.1 }}
                        className="g1-pattern-slot"
                    >
                        <div className="g1-pattern-target">?</div>
                    </motion.div>
                </div>
            </motion.div>
        );
    }

    const hundreds = Math.floor(num / 100);
    const tens = Math.floor((num % 100) / 10);
    const ones = num % 10;

    return (
        <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="g1-place-value-table-container" style={{ width: '100%', maxWidth: '500px', margin: '0 auto' }}>
            <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(3, 1fr)', 
                gap: '2px', 
                background: '#E2E8F0', 
                border: '3px solid #E2E8F0', 
                borderRadius: '20px',
                overflow: 'hidden',
                boxShadow: '0 10px 25px rgba(0,0,0,0.08)'
            }}>
                {/* Header Row */}
                <div style={{ background: '#F8FAFC', padding: '12px', textAlign: 'center', borderBottom: '2px solid #E2E8F0' }}>
                    <div style={{ fontSize: '0.8rem', fontWeight: 900, color: '#64748B', textTransform: 'uppercase', letterSpacing: '1px' }}>Hundreds</div>
                </div>
                <div style={{ background: '#F8FAFC', padding: '12px', textAlign: 'center', borderBottom: '2px solid #E2E8F0', borderLeft: '2px solid #E2E8F0', borderRight: '2px solid #E2E8F0' }}>
                    <div style={{ fontSize: '0.8rem', fontWeight: 900, color: '#0891B2', textTransform: 'uppercase', letterSpacing: '1px' }}>Tens</div>
                </div>
                <div style={{ background: '#F8FAFC', padding: '12px', textAlign: 'center', borderBottom: '2px solid #E2E8F0' }}>
                    <div style={{ fontSize: '0.8rem', fontWeight: 900, color: '#EC4899', textTransform: 'uppercase', letterSpacing: '1px' }}>Ones</div>
                </div>

                {/* Content Row */}
                <div style={{ background: 'white', padding: '20px 10px', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '120px' }}>
                    {hundreds > 0 ? (
                        <div style={{ fontSize: '2.4rem', fontWeight: 900, color: '#CBD5E1' }}>{hundreds}</div>
                    ) : (
                        <div style={{ width: '40px', height: '40px', borderRadius: '50%', border: '2px dashed #E2E8F0' }}></div>
                    )}
                </div>
                <div style={{ background: 'white', padding: '20px 10px', display: 'flex', flexWrap: 'wrap', gap: '4px', justifyContent: 'center', alignItems: 'flex-end', minHeight: '120px', borderLeft: '2px solid #F1F5F9', borderRight: '2px solid #F1F5F9' }}>
                    {tens > 0 ? Array.from({ length: tens }).map((_, i) => (
                        <motion.div
                            key={i}
                            initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: i * 0.05 }}
                            style={{ display: 'flex', flexDirection: 'column-reverse', gap: '1px', padding: '2px', border: '1.5px solid #CBD5E1', borderRadius: '5px', background: 'white' }}
                        >
                            {Array.from({ length: 10 }).map((_, j) => (
                                <div key={j} style={{ width: '10px', height: '5px', backgroundColor: color, borderRadius: '1px' }}></div>
                            ))}
                        </motion.div>
                    )) : (
                        <div style={{ width: '40px', height: '40px', borderRadius: '50%', border: '2px dashed #E2E8F0' }}></div>
                    )}
                </div>
                <div style={{ background: 'white', padding: '20px 10px', display: 'flex', flexWrap: 'wrap', gap: '3px', justifyContent: 'center', alignItems: 'center', minHeight: '120px' }}>
                    {ones > 0 ? (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 12px)', gap: '3px' }}>
                            {Array.from({ length: ones }).map((_, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: (tens * 0.05) + (i * 0.05) }}
                                    style={{ width: '12px', height: '12px', backgroundColor: color, borderRadius: '2px', opacity: 0.9 }}
                                />
                            ))}
                        </div>
                    ) : (
                        <div style={{ width: '40px', height: '40px', borderRadius: '50%', border: '2px dashed #E2E8F0' }}></div>
                    )}
                </div>
            </div>
            
            <AnimatePresence>
                {isAnswered && (
                    <motion.div 
                        initial={{ y: 10, opacity: 0 }} 
                        animate={{ y: 0, opacity: 1 }}
                        style={{ marginTop: '20px', textAlign: 'center' }}
                    >
                        <div style={{ display: 'inline-flex', gap: '12px', padding: '10px 24px', background: 'white', borderRadius: '100px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', border: '1px solid #F1F5F9' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <span style={{ fontSize: '1.4rem', fontWeight: 900, color: '#0891B2' }}>{tens}</span>
                                <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#64748B' }}>Tens</span>
                            </div>
                            <div style={{ width: '1px', background: '#E2E8F0' }}></div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <span style={{ fontSize: '1.4rem', fontWeight: 900, color: '#EC4899' }}>{ones}</span>
                                <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#64748B' }}>Ones</span>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

const SKILL_ID_MAP = {
    '1101': NODE_IDS.g1MathNumbers51100Counting,
    '1102': NODE_IDS.g1MathNumbers51100Writing,
    '1103': NODE_IDS.g1MathNumbers51100Names,
    '1104': NODE_IDS.g1MathNumbers51100Comparison,
    '1105': NODE_IDS.g1MathNumbers51100Skip,
    '1106': NODE_IDS.g1MathNumbers51100Mixed,
};

const Numbers51to100 = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { startSession, logAnswer, finishSession } = useSessionLogger();

    const queryParams = new URLSearchParams(location.search);
    const skillId = queryParams.get('skillId');
    const isTest = skillId === '1106';
    const totalQuestions = isTest ? 10 : 5;

    const [qIndex, setQIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [showResults, setShowResults] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const [timer, setTimer] = useState(0);
    const [answers, setAnswers] = useState({});
    const [sessionQuestions, setSessionQuestions] = useState([]);
    const [showExplanationModal, setShowExplanationModal] = useState(false);

    const getTopicInfo = () => {
        const grade1Config = TOPIC_CONFIGS['1'];
        for (const [topicName, skills] of Object.entries(grade1Config)) {
            const skill = skills.find(s => s.id === skillId);
            if (skill) return { topicName, skillName: skill.name };
        }
        return { topicName: 'Numbers 51-100', skillName: 'Mathematics' };
    };

    const { topicName, skillName } = getTopicInfo();

    const getNextSkill = () => {
        const { grade } = '1';
        const gradeConfig = TOPIC_CONFIGS[grade];
        const topics = Object.keys(gradeConfig);
        let currentTopicIdx = -1;
        let currentSkillIdx = -1;
        for (let i = 0; i < topics.length; i++) {
            const skills = gradeConfig[topics[i]];
            const idx = skills.findIndex(s => s.id === skillId);
            if (idx !== -1) { currentTopicIdx = i; currentSkillIdx = idx; break; }
        }
        if (currentTopicIdx === -1) return null;
        const currentTopicSkills = gradeConfig[topics[currentTopicIdx]];
        if (currentSkillIdx < currentTopicSkills.length - 1) {
            return { ...currentTopicSkills[currentSkillIdx + 1], topicName: topics[currentTopicIdx] };
        }
        if (currentTopicIdx < topics.length - 1) {
            const nextTopicName = topics[currentTopicIdx + 1];
            const nextTopicSkills = gradeConfig[nextTopicName];
            if (nextTopicSkills.length > 0) return { ...nextTopicSkills[0], topicName: nextTopicName };
        }
        return null;
    };

    const generateQuestions = (selectedSkill) => {
        const questions = [];
        const colors = ['#FF6B6B', '#4ECDC4', '#FFE66D', '#98D8C8', '#C9A9E9'];
        const numberWords = (n) => {
            const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
            const teens = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
            const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
            if (n === 100) return 'One Hundred';
            if (n < 10) return ones[n];
            if (n < 20) return teens[n - 10];
            const t = Math.floor(n / 10);
            const o = n % 10;
            return o === 0 ? tens[t] : `${tens[t]} ${ones[o]}`;
        };

        const makeOptions = (correct, isWords = false) => {
            const opts = new Set([correct]);
            const offsets = [1, -1, 10, -10, 5, -5, 2, -2];
            
            if (isWords) {
                // Determine the numeric value of the correct answer for offset calculations
                let correctNum;
                if (typeof correct === 'number') correctNum = correct;
                else {
                    // Reverse lookup or just use random for words if we don't have the number
                    // Actually, for writing/names, we know the number
                }

                for (const off of offsets) {
                    if (opts.size >= 4) break;
                    // Note: this assumes we know the numeric value elsewhere or pass it
                }
                // Simplified for this component's needs
                while (opts.size < 4) {
                    const v = Math.floor(Math.random() * 50) + 51;
                    const word = numberWords(v);
                    if (!opts.has(word)) opts.add(word);
                }
            } else {
                for (const off of offsets) {
                    if (opts.size >= 4) break;
                    const v = correct + off;
                    if (v >= 51 && v <= 100) opts.add(v);
                }
                while (opts.size < 4) {
                    const v = Math.floor(Math.random() * 50) + 51;
                    opts.add(v);
                }
            }
            return [...opts].sort(() => 0.5 - Math.random());
        };

        // Create pools for unique numbers
        const countPool = Array.from({ length: 50 }, (_, k) => k + 51).sort(() => 0.5 - Math.random());
        const writePool = Array.from({ length: 50 }, (_, k) => k + 51).sort(() => 0.5 - Math.random());
        const namesPool = Array.from({ length: 50 }, (_, k) => k + 51).sort(() => 0.5 - Math.random());
        
        // Create comparison pool (shuffled pairs)
        const allPairs = [];
        for (let a = 51; a <= 100; a++) {
            for (let b = 51; b <= 100; b++) {
                if (a !== b) allPairs.push([a, b]);
            }
        }
        const comparisonPool = allPairs.sort(() => 0.5 - Math.random());

        let countIdx = 0;
        let writeIdx = 0;
        let namesIdx = 0;
        let comparisonIdx = 0;

        for (let i = 0; i < totalQuestions; i++) {
            let typeToGen = 'counting';
            if (isTest) {
                const types = ['counting', 'writing', 'names', 'comparison', 'skip'];
                typeToGen = types[i % types.length];
            } else if (selectedSkill === '1101' || !selectedSkill) {
                typeToGen = 'counting';
            } else if (selectedSkill === '1102') {
                typeToGen = 'writing';
            } else if (selectedSkill === '1103') {
                typeToGen = 'names';
            } else if (selectedSkill === '1104') {
                typeToGen = 'comparison';
            } else if (selectedSkill === '1105') {
                typeToGen = 'skip';
            } else {
                typeToGen = 'counting';
            }

            const color1 = colors[i % colors.length];
            if (typeToGen === 'counting') {
                const num = countPool[countIdx % countPool.length];
                countIdx++;
                questions.push({
                    text: `How many ones are there in total?`,
                    options: makeOptions(num),
                    correct: num,
                    type: 'counting',
                    visualData: { num, color: color1 },
                    explanation: `We count ${num} ones in total.`
                });
            } else if (typeToGen === 'writing') {
                const num = writePool[writeIdx % writePool.length];
                writeIdx++;
                questions.push({
                    text: `How do you write ${num} in words?`,
                    options: makeOptions(numberWords(num), true),
                    correct: numberWords(num),
                    type: 'writing',
                    visualData: { num, color: color1 },
                    explanation: `${num} is ${numberWords(num)}.`
                });
            } else if (typeToGen === 'names') {
                const num = namesPool[namesIdx % namesPool.length];
                namesIdx++;
                questions.push({
                    text: `Which number is ${numberWords(num)}?`,
                    options: makeOptions(num),
                    correct: num,
                    type: 'names',
                    visualData: { num, color: color1 },
                    explanation: `${numberWords(num)} is written as ${num}.`
                });
            } else if (typeToGen === 'comparison') {
                const pair = comparisonPool[comparisonIdx % comparisonPool.length];
                comparisonIdx++;
                const n1 = pair[0];
                const n2 = pair[1];
                const isGreater = Math.random() > 0.5;
                const correct = isGreater ? (n1 > n2 ? 'Group A' : 'Group B') : (n1 < n2 ? 'Group A' : 'Group B');
                questions.push({
                    text: `Which group has ${isGreater ? 'MORE' : 'FEWER'} blocks?`,
                    options: ['Group A', 'Group B'],
                    correct: correct,
                    type: 'comparison',
                    visualData: { n1, n2, color1: '#FF6B6B', color2: '#4ECDC4' },
                    explanation: `${correct} is the answer because it has ${isGreater ? Math.max(n1, n2) : Math.min(n1, n2)} blocks.`
                });
            } else if (typeToGen === 'skip') {
                const steps = [2, 5, 10];
                const step = steps[Math.floor(Math.random() * steps.length)];
                // Broaden the range for variety
                const start = Math.floor(Math.random() * 40) + 51; 
                let seq = [start, start + step, start + step * 2];
                // Ensure the target is within bounds
                while (seq[2] + step > 100) {
                    const newStart = Math.floor(Math.random() * 40) + 51;
                    seq = [newStart, newStart + step, newStart + step * 2];
                }
                const correct = seq[2] + step;
                questions.push({
                    text: `Next number in pattern?`,
                    options: makeOptions(correct),
                    correct,
                    type: 'skip',
                    visualData: { seq, step, color: color1 },
                    explanation: `The pattern skips by ${step}. Next is ${correct}.`
                });
            }
        }
        return questions;
    };

    useEffect(() => {
        const qs = generateQuestions(skillId);
        setSessionQuestions(qs);
        const nodeId = SKILL_ID_MAP[skillId] || NODE_IDS.g1MathNumbers51100Mixed;
        startSession({ nodeId, sessionType: isTest ? 'assessment' : 'practice' });
    }, [skillId, isTest, startSession]);

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
        navigate('/junior/grade/1');
    };

    const handleOptionSelect = (option) => {
        if (isAnswered) return;
        setSelectedOption(option);
    };

    const handleSubmit = () => {
        if (isAnswered || selectedOption === null) return;
        const option = selectedOption;
        const currentQ = sessionQuestions[qIndex];
        const isCorrect = option == currentQ.correct;

        setIsAnswered(true);
        if (isCorrect) setScore(s => s + 1);

        const answerData = {
            question_text: currentQ.text,
            selected: option,
            correct: currentQ.correct,
            isCorrect
        };

        logAnswer({
            question_index: qIndex,
            answer_json: answerData,
            is_correct: isCorrect ? 1 : 0
        });

        setAnswers(prev => ({
            ...prev,
            [qIndex]: {
                selectedOption: option,
                isCorrect,
                type: currentQ.type,
                visualData: currentQ.visualData,
                questionText: currentQ.text,
                correctAnswer: currentQ.correct,
                explanation: currentQ.explanation || "Detailed explanation is coming soon!"
            }
        }));

        if (!isTest) {
            setShowExplanationModal(true);
        } else {
            setTimeout(() => {
                handleNext();
            }, 800);
        }
    };

    const handleNext = async () => {
        if (qIndex < totalQuestions - 1) {
            setQIndex(v => v + 1);
        } else {
            finishSession({
                totalQuestions,
                questionsAnswered: Object.keys(answers).length,
                answersPayload: answers
            });
            setShowResults(true);
        }
    };

    const handleSkip = () => {
        if (isAnswered) return;
        const currentQ = sessionQuestions[qIndex];
        
        logAnswer({
            question_index: qIndex,
            answer_json: { question_text: currentQ.text, selected: 'Skipped', correct: currentQ.correct, isCorrect: false },
            is_correct: 0
        });

        setAnswers(prev => ({
            ...prev,
            [qIndex]: {
                selectedOption: 'Skipped',
                isCorrect: false,
                type: currentQ.type,
                visualData: currentQ.visualData,
                questionText: currentQ.text,
                correctAnswer: currentQ.correct,
                explanation: "This question was skipped. " + currentQ.explanation
            }
        }));
        handleNext();
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
                            <RefreshCw size={24} /> Start New Quest
                        </button>
                        <button className="action-btn-large back-topics-btn" onClick={() => navigate('/junior/grade/1')}>
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
                        <button className="g1-skip-btn" onClick={handleSkip}>
                            Skip Quest ⏭️
                        </button>
                    )}

                    <div className="exit-practice-sticker" style={{ marginLeft: 'auto' }}>
                        <StickerExit onClick={handleExit} />
                    </div>
                </div>
                <div className="g1-topic-header-compact" style={{ textAlign: 'center', margin: '5px 0', fontSize: '0.8rem', color: '#64748B', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 400 }}>{topicName}</div>
                <motion.div key={qIndex} initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="g1-question-card">
                    <h2 className="g1-question-text"><LatexText text={currentQ.text} /></h2>
                    <div className="g1-content-split">
                        <div className="g1-visual-area">
                            <DynamicVisual type={currentQ.type} data={currentQ.visualData} isAnswered={isAnswered} />
                        </div>

                        <div className="g1-quiz-side">
                            <div className="g1-options-grid">
                                {currentQ.options.map((opt, i) => (
                                    <button
                                        key={i}
                                        className={`g1-option-btn 
                                            ${selectedOption === opt ? (isTest ? 'selected-test' : (isAnswered ? (opt === currentQ.correct ? 'selected-correct' : 'selected-wrong') : 'selected-test')) : ''}
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


                    {/* --- INJECTED FOOTER V2 --- */}
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
                                    {isTest ? 'Next' : 'Check Answer'} <ChevronRight size={24} />
                                </button>
                            ) : (
                                <button className="g1-nav-btn next-btn" onClick={handleNext}>
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
                onNext={() => {
                    setShowExplanationModal(false);
                    handleNext();
                }}
            />
        </div>
    );
};

export default Numbers51to100;
