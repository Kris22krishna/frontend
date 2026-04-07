import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Home, ArrowRight, Timer, Trophy, Star, ChevronLeft, RefreshCw, FileText, Check, X, Eye, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSessionLogger } from '@/hooks/useSessionLogger';
import { NODE_IDS } from '@/lib/curriculumIds';
import Navbar from '@/components/Navbar';
import { TOPIC_CONFIGS } from '@/lib/topicConfig';
import { LatexText } from '@/components/LatexText';
import ExplanationModal from '@/components/ExplanationModal';
import StickerExit from '@/components/StickerExit';
import mascotImg from '@/assets/mascot.png';
import avatarImg from '@/assets/avatar.png';
import '@/pages/juniors/class-1/Grade1Practice.css';

const DynamicVisual = ({ type, data }) => {
    if (type === 'counting' || type === 'names' || type === 'tens-ones') {
        const { num, color } = data;
        const tens = Math.floor(num / 10);
        const ones = num % 10;
        return (
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="g1-tens-visual">
                <div style={{ display: 'flex', gap: 'clamp(5px, 3vw, 20px)', alignItems: 'flex-end', justifyContent: 'center' }}>
                    {/* Ten Bars */}
                    {Array.from({ length: tens }).map((_, bIdx) => (
                        <motion.div
                            key={bIdx}
                            initial={{ height: 0 }} animate={{ height: 'auto' }}
                            style={{ display: 'flex', flexDirection: 'column-reverse', gap: '3px', padding: '8px', border: '3px solid #CBD5E0', borderRadius: '15px', background: 'white' }}
                        >
                            {Array.from({ length: 10 }).map((_, i) => (
                                <div key={i} style={{ width: '30px', height: '18px', backgroundColor: color, borderRadius: '4px' }}></div>
                            ))}
                            <div style={{ fontSize: '14px', fontWeight: 400, textAlign: 'center', color: '#666', marginBottom: '8px', fontFamily: 'Nunito, sans-serif' }}>TENS</div>
                        </motion.div>
                    ))}
                    {/* Ones */}
                    {ones > 0 && (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 25px)', gap: '5px' }}>
                            {Array.from({ length: ones }).map((_, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i * 0.1 }}
                                    style={{ width: '30px', height: '18px', backgroundColor: color, borderRadius: '4px', opacity: 0.8 }}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </motion.div>
        );
    }
    if (type === 'comparison') {
        const { n1, n2, color1, color2 } = data;
        return (
            <div style={{ display: 'flex', gap: 'clamp(20px, 8vw, 50px)', alignItems: 'center', justifyContent: 'center' }}>
                <div className="g1-compare-box" style={{ background: color1 + '15', padding: '25px', borderRadius: '30px', textAlign: 'center' }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: 700, color: color1, marginBottom: '15px', fontFamily: 'Nunito, sans-serif' }}>Group A</div>
                    <div style={{ display: 'flex', gap: '4px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column-reverse', gap: '2px' }}>
                            {Array.from({ length: 10 }).map((_, i) => (
                                <div key={i} style={{ width: '12px', height: '8px', backgroundColor: color1, borderRadius: '2px' }}></div>
                            ))}
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '12px', gap: '2px' }}>
                            {Array.from({ length: Math.max(0, n1 - 10) }).map((_, i) => (
                                <div key={i} style={{ width: '12px', height: '8px', backgroundColor: color1, borderRadius: '2px', opacity: 0.7 }}></div>
                            ))}
                        </div>
                    </div>
                </div>
                <div style={{ fontSize: '2.5rem', fontWeight: 400, color: '#CBD5E0' }}>VS</div>
                <div className="g1-compare-box" style={{ background: color2 + '15', padding: '25px', borderRadius: '30px', textAlign: 'center' }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: 700, color: color2, marginBottom: '15px', fontFamily: 'Nunito, sans-serif' }}>Group B</div>
                    <div style={{ display: 'flex', gap: '4px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column-reverse', gap: '2px' }}>
                            {Array.from({ length: 10 }).map((_, i) => (
                                <div key={i} style={{ width: '12px', height: '8px', backgroundColor: color2, borderRadius: '2px' }}></div>
                            ))}
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '12px', gap: '2px' }}>
                            {Array.from({ length: Math.max(0, n2 - 10) }).map((_, i) => (
                                <div key={i} style={{ width: '12px', height: '8px', backgroundColor: color2, borderRadius: '2px', opacity: 0.7 }}></div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    return null;
};

const SKILL_ID_MAP = {
    '501': NODE_IDS.g1MathNumbers1020Counting,
    '502': NODE_IDS.g1MathNumbers1020TensOnes,
    '503': NODE_IDS.g1MathNumbers1020Comparison,
    '504': NODE_IDS.g1MathNumbers1020Mixed,
};

const Numbers10to20 = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { startSession, logAnswer, finishSession } = useSessionLogger();

    const queryParams = new URLSearchParams(location.search);
    const skillId = queryParams.get('skillId');
    const isTest = skillId === '504';
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
        for (const gradeKey of Object.keys(TOPIC_CONFIGS)) {
            const gradeConfig = TOPIC_CONFIGS[gradeKey];
            for (const [topicName, skills] of Object.entries(gradeConfig)) {
                const skill = skills.find(s => s.id === skillId);
                if (skill) return { topicName, skillName: skill.name, grade: gradeKey };
            }
        }
        return { topicName: 'Numbers 10-20', skillName: 'Mathematics', grade: '1' };
    };

    const getNextSkill = () => {
        const { grade } = getTopicInfo();
        const gradeConfig = TOPIC_CONFIGS[grade];
        const topics = Object.keys(gradeConfig);
        let currentTopicIdx = -1;
        let currentSkillIdx = -1;
        for (let i = 0; i < topics.length; i++) {
            const skills = gradeConfig[topics[i]];
            const idx = skills.findIndex(s => s.id === skillId);
            if (idx !== -1) {
                currentTopicIdx = i;
                currentSkillIdx = idx;
                break;
            }
        }
        if (currentTopicIdx === -1) return null;
        const currentTopicSkills = gradeConfig[topics[currentTopicIdx]];
        if (currentSkillIdx < currentTopicSkills.length - 1) {
            return { ...currentTopicSkills[currentSkillIdx + 1], topicName: topics[currentTopicIdx] };
        }
        if (currentTopicIdx < topics.length - 1) {
            const nextTopicName = topics[currentTopicIdx + 1];
            const nextTopicSkills = gradeConfig[nextTopicName];
            if (nextTopicSkills.length > 0) return { ...nextTopicSkills[0], topicName: nextTopicName, route: nextTopicSkills[0].route };
        }
        return null;
    };

    const generateQuestions = useCallback((selectedSkill) => {
        const questions = [];
        const colors = ['#FF6B6B', '#4ECDC4', '#FFE66D', '#98D8C8', '#C9A9E9'];
        const names = { 10: 'Ten', 11: 'Eleven', 12: 'Twelve', 13: 'Thirteen', 14: 'Fourteen', 15: 'Fifteen', 16: 'Sixteen', 17: 'Seventeen', 18: 'Eighteen', 19: 'Nineteen', 20: 'Twenty' };
        for (let i = 0; i < totalQuestions; i++) {
            let question = {};
            const color1 = colors[i % colors.length];
            const color2 = colors[(i + 1) % colors.length];
            let typeToGen = 'counting';
            if (isTest) {
                if (i < 4) typeToGen = 'counting';
                else if (i < 7) typeToGen = 'tens-ones';
                else typeToGen = 'comparison';
            } else {
                if (selectedSkill === '501' || !selectedSkill) typeToGen = 'counting';
                else if (selectedSkill === '502') typeToGen = 'tens-ones';
                else typeToGen = 'comparison';
            }
            if (typeToGen === 'counting') {
                const count = Math.floor(Math.random() * 11) + 10;
                const isWord = Math.random() > 0.5;
                const optionsSet = new Set();
                if (isWord) {
                    optionsSet.add(names[count]);
                    while (optionsSet.size < 3) {
                        const randomCount = Math.floor(Math.random() * 11) + 10;
                        optionsSet.add(names[randomCount]);
                    }
                } else {
                    optionsSet.add(count);
                    optionsSet.add(count + 1);
                    optionsSet.add(count - 1);
                    // Ensure unique and within range
                    while (optionsSet.size < 3) {
                        optionsSet.add(Math.floor(Math.random() * 11) + 10);
                    }
                }
                
                question = {
                    text: isWord ? "What is the number name for this number?" : "How many are there in total?",
                    options: Array.from(optionsSet).sort(() => 0.5 - Math.random()),
                    correct: isWord ? names[count] : count,
                    type: 'counting',
                    visualData: { num: count, color: color1 },
                    explanation: `Count one ten-bar and then the single blocks. This gives us ${count}.`
                };
            } else if (typeToGen === 'tens-ones') {
                const num = Math.floor(Math.random() * 11) + 10;
                const tens = Math.floor(num / 10);
                const ones = num % 10;
                const optionsSet = new Set([`${tens} Ten, ${ones} Ones`]);
                
                // Swap digits fallback
                if (tens !== ones) {
                    optionsSet.add(`${ones} Ten, ${tens} Ones`);
                }
                
                // Add more distractors until we have 3 unique
                while (optionsSet.size < 3) {
                    const rTens = Math.floor(Math.random() * 2) + 1; // 1 or 2
                    const rOnes = Math.floor(Math.random() * 10);
                    optionsSet.add(`${rTens} Ten, ${rOnes} Ones`);
                }

                question = {
                    text: `How many Tens and Ones make ${num}?`,
                    options: Array.from(optionsSet).sort(() => 0.5 - Math.random()),
                    correct: `${tens} Ten, ${ones} Ones`,
                    type: 'tens-ones',
                    visualData: { num, color: color1 },
                    explanation: `${num} is made of ${tens} group of ten and ${ones} single blocks.`
                };
            } else {
                const n1 = Math.floor(Math.random() * 11) + 10;
                let n2 = Math.floor(Math.random() * 11) + 10;
                if (n1 === n2) n2 = 15;
                const isGreater = Math.random() > 0.5;
                const correctAns = isGreater ? (n1 > n2 ? 'Group A' : 'Group B') : (n1 < n2 ? 'Group A' : 'Group B');
                question = {
                    text: `Which group has ${isGreater ? 'MORE' : 'FEWER'} blocks?`,
                    options: ['Group A', 'Group B'],
                    correct: correctAns,
                    type: 'comparison',
                    visualData: { n1, n2, color1, color2 },
                    explanation: `Group A has ${n1} and Group B has ${n2}. ${correctAns} clearly has ${isGreater ? 'more' : 'fewer'} blocks.`
                };
            }
            questions.push(question);
        }
        return questions;
    }, [isTest, totalQuestions]);

    const { topicName, skillName } = getTopicInfo();

    useEffect(() => {
        const qs = generateQuestions(skillId);
        setSessionQuestions(qs);
        const nodeId = SKILL_ID_MAP[skillId] || NODE_IDS.g1MathNumbers1020Mixed;
        startSession({ nodeId, sessionType: isTest ? 'assessment' : 'practice' });
    }, [skillId, isTest, startSession, generateQuestions]);

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

    const handleExit = () => {
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
        const isCorrect = option === currentQ.correct;

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
                        <button className="action-btn-large retake-skill-btn" onClick={() => window.location.reload()}>
                            <RefreshCw size={24} /> Retake Skill
                        </button>

                        {getNextSkill() && (
                            <button className="action-btn-large next-skill-btn" onClick={() => {
                                const next = getNextSkill();
                                navigate(`/junior/grade/1/${next.route}?skillId=${next.id}`);
                                window.location.reload();
                            }}>
                                Next Skill <ArrowRight size={24} />
                            </button>
                        )}

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

                    {isTest && (
                        <button
                            className="g1-skip-btn"
                            onClick={handleSkip}
                            disabled={isAnswered}
                            style={{
                                marginLeft: '10px',
                                background: '#EDF2F7',
                                color: '#4A5568',
                                padding: '8px 15px',
                                borderRadius: '15px',
                                fontWeight: 400,
                                fontSize: '0.9rem',
                                border: 'none',
                                cursor: isAnswered ? 'not-allowed' : 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '5px'
                            }}
                        >
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

export default Numbers10to20;
