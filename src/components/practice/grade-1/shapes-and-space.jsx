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

const SizeVisual = ({ data }) => {
    const { aSize, bSize, orientation = 'vertical' } = data;
    const isHorizontal = orientation === 'horizontal';

    return (
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="size-visual" style={{ border: 'none', background: 'transparent', display: 'flex', gap: '30px', alignItems: 'flex-end', justifyContent: 'center', height: '140px' }}>
            <div style={{ display: 'flex', flexDirection: isHorizontal ? 'column' : 'row', gap: '20px', alignItems: isHorizontal ? 'flex-start' : 'flex-end' }}>
                <div style={{ display: 'flex', flexDirection: isHorizontal ? 'row' : 'column', alignItems: 'center', gap: '8px' }}>
                    <motion.div
                        initial={isHorizontal ? { width: 0 } : { height: 0 }}
                        animate={isHorizontal ? { width: aSize } : { height: aSize }}
                        style={{
                            width: isHorizontal ? `${aSize}px` : '40px',
                            height: isHorizontal ? '40px' : `${aSize}px`,
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            borderRadius: '12px',
                            boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
                        }}
                    />
                    <span style={{ fontWeight: 'bold', color: '#4A5568' }}>A</span>
                </div>
                <div style={{ display: 'flex', flexDirection: isHorizontal ? 'row' : 'column', alignItems: 'center', gap: '8px' }}>
                    <motion.div
                        initial={isHorizontal ? { width: 0 } : { height: 0 }}
                        animate={isHorizontal ? { width: bSize } : { height: bSize }}
                        style={{
                            width: isHorizontal ? `${bSize}px` : '40px',
                            height: isHorizontal ? '40px' : `${bSize}px`,
                            background: 'linear-gradient(135deg, #FAD961 0%, #F76B1C 100%)',
                            borderRadius: '12px',
                            boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
                        }}
                    />
                    <span style={{ fontWeight: 'bold', color: '#4A5568' }}>B</span>
                </div>
            </div>
        </motion.div>
    );
};

const DynamicVisual = ({ type, data }) => {
    if (type === 'shape') {
        const { shape, color } = data;
        return (
            <motion.div
                initial={{ scale: 0.5, rotate: -10 }}
                animate={{ scale: 1, rotate: 0 }}
                className="g1-visual-item"
            >
                <svg width="100%" height="100%" style={{ maxWidth: '300px', maxHeight: '300px', filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.1))' }} viewBox="0 0 100 100">
                    {shape === 'circle' && <circle cx="50" cy="50" r="42" fill={color} />}
                    {shape === 'square' && <rect x="8" y="8" width="84" height="84" fill={color} />}
                    {shape === 'triangle' && <polygon points="50,5 95,90 5,90" fill={color} />}
                    {shape === 'rectangle' && <rect x="5" y="25" width="90" height="50" fill={color} />}
                    {shape === 'oval' && <ellipse cx="50" cy="50" rx="45" ry="30" fill={color} />}
                </svg>
            </motion.div>
        );
    }
    if (type === 'position') {
        const { pos } = data;
        
        // Dynamic shadow logic for larger scale
        const shadowX = pos === 'outside' ? 35 : (pos === 'far' ? 270 : (pos === 'near' ? 150 : 140));
        const shadowScale = pos === 'far' ? 0.4 : (pos === 'near' ? 1.5 : 1.2);
        const shadowOpacity = pos === 'top' ? 0.3 : 0.6;

        return (
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="position-visual" style={{ border: "none" }}>
                <svg width="100%" height="100%" style={{ maxWidth: '400px' }} viewBox="0 0 300 240">
                    <defs>
                        <radialGradient id="soccerGradient" cx="30%" cy="30%" r="50%">
                            <stop offset="0%" stopColor="#FF8E8E" />
                            <stop offset="70%" stopColor="#FF6B6B" />
                            <stop offset="100%" stopColor="#E55B5B" />
                        </radialGradient>
                        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                            <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
                            <feOffset dx="2" dy="2" result="offsetblur" />
                            <feComponentTransfer><feFuncA type="linear" slope="0.3"/></feComponentTransfer>
                            <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
                        </filter>
                    </defs>
                    
                    {/* Ground plane */}
                    <ellipse cx="150" cy="190" rx="130" ry="30" fill="#EDF2F7" opacity="0.4" />
                    
                    {/* Dynamic Shadow on Ground */}
                    <motion.ellipse 
                        animate={{ cx: shadowX, rx: 25 * shadowScale, opacity: shadowOpacity }} 
                        cy="220" rx={25 * shadowScale} ry={8 * shadowScale} 
                        fill="#A0AEC0" 
                    />
                    
                    {/* box (Gift Box Style) - Scaled Up */}
                    <g filter="url(#shadow)">
                        {/* Side face */}
                        <path d="M 210 80 L 255 50 L 255 130 L 210 160 Z" fill="#B190D4" stroke="#6B46C1" strokeWidth="1.5" />
                        {/* Top face */}
                        <path d="M 70 80 L 115 50 L 255 50 L 210 80 Z" fill="#E2D1F3" stroke="#6B46C1" strokeWidth="1.5" />
                        {/* Front face */}
                        <rect x="70" y="80" width="140" height="80" fill="#C9A9E9" stroke="#6B46C1" strokeWidth="1.5" rx="3" />
                        
                        {/* Ribbon (Yellow) */}
                        <rect x="125" y="80" width="30" height="80" fill="#FFE66D" opacity="0.9" />
                        <rect x="70" y="110" width="140" height="20" fill="#FFE66D" opacity="0.9" />
                        <path d="M 125 80 L 170 50 L 200 50 L 155 80 Z" fill="#FFE66D" opacity="0.9" />
                        <path d="M 210 110 L 255 80 L 255 100 L 210 130 Z" fill="#FFE66D" opacity="0.9" />
                    </g>

                    {/* Ball rendering logic - Scaled Up (r=22) */}
                    {/* Top Ball */}
                    {pos === 'top' && (
                        <motion.g initial={{ y: -40 }} animate={{ y: 0 }} filter="url(#shadow)">
                            <circle cx="160" cy="50" r="22" fill="url(#soccerGradient)" />
                            <path d="M 160 37 L 168 43 L 165 52 L 155 52 L 152 43 Z" fill="#1f2937" opacity="0.8" />
                        </motion.g>
                    )}
                    
                    {/* Bottom Ball */}
                    {pos === 'bottom' && (
                        <motion.g initial={{ y: 40 }} animate={{ y: 0 }} filter="url(#shadow)">
                            <circle cx="140" cy="195" r="22" fill="url(#soccerGradient)" />
                            <path d="M 140 182 L 148 188 L 145 197 L 135 197 L 132 188 Z" fill="#1f2937" opacity="0.8" />
                        </motion.g>
                    )}

                    {/* Inside Ball */}
                    {pos === 'inside' && (
                        <g>
                            <motion.g initial={{ scale: 0 }} animate={{ scale: 1 }}>
                                <circle cx="140" cy="120" r="22" fill="url(#soccerGradient)" opacity="0.8" />
                                <path d="M 140 107 L 148 113 L 145 122 L 135 122 L 132 113 Z" fill="#1f2937" opacity="0.6" />
                            </motion.g>
                            {/* Semi-transparent front to show inside */}
                            <rect x="70" y="80" width="140" height="80" fill="rgba(201, 169, 233, 0.4)" stroke="#6B46C1" strokeWidth="1.5" rx="3" style={{ pointerEvents: 'none' }} />
                        </g>
                    )}

                    {/* Outside Ball */}
                    {pos === 'outside' && (
                        <motion.g initial={{ x: -40 }} animate={{ x: 0 }} filter="url(#shadow)">
                            <circle cx="35" cy="120" r="22" fill="url(#soccerGradient)" />
                            <path d="M 35 107 L 43 113 L 40 122 L 30 122 L 27 113 Z" fill="#1f2937" opacity="0.8" />
                        </motion.g>
                    )}

                    {/* Near Ball */}
                    {pos === 'near' && (
                        <motion.g initial={{ scale: 1.2, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} filter="url(#shadow)">
                            <circle cx="150" cy="210" r="25" fill="url(#soccerGradient)" />
                            <path d="M 150 195 L 160 203 L 157 215 L 143 215 L 140 203 Z" fill="#1f2937" opacity="0.8" />
                        </motion.g>
                    )}

                    {/* Far Ball */}
                    {pos === 'far' && (
                        <motion.g initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 0.6, opacity: 1 }} opacity="0.7">
                            <circle cx="270" cy="40" r="22" fill="url(#soccerGradient)" />
                            <path d="M 270 27 L 278 33 L 275 42 L 265 42 L 262 33 Z" fill="#1f2937" opacity="0.8" />
                        </motion.g>
                    )}
                </svg>
            </motion.div>
        );
    }
    if (type === 'size') {
        return <SizeVisual data={data} />;
    }
    return null;
};

const SKILL_ID_MAP = {
    '101': NODE_IDS.g1MathShapesSpaceIdentify,
    '102': NODE_IDS.g1MathShapesSpacePosition,
    '103': NODE_IDS.g1MathShapesSpaceSize,
    '104': NODE_IDS.g1MathShapesSpaceMixed,
};

const ShapesAndSpace = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { startSession, logAnswer, finishSession } = useSessionLogger();

    const queryParams = new URLSearchParams(location.search);
    const skillId = queryParams.get('skillId');
    const isTest = skillId === '104';
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
    const [isTransitioning, setIsTransitioning] = useState(false);
    const qIndexRef = React.useRef(0);
    const nextTimeoutRef = React.useRef(null);

    useEffect(() => { qIndexRef.current = qIndex; }, [qIndex]);

    const getTopicInfo = () => {
        const grade1Config = TOPIC_CONFIGS['1'];
        for (const gradeKey of Object.keys(TOPIC_CONFIGS)) {
            const gradeConfig = TOPIC_CONFIGS[gradeKey];
            for (const [topicName, skills] of Object.entries(gradeConfig)) {
                const skill = skills.find(s => s.id === skillId);
                if (skill) return { topicName, skillName: skill.name, grade: gradeKey };
            }
        }
        return { topicName: 'Shapes and Space', skillName: 'Mathematics', grade: '1' };
    };

    const { topicName, skillName } = getTopicInfo();

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
            return {
                ...currentTopicSkills[currentSkillIdx + 1],
                topicName: topics[currentTopicIdx]
            };
        }

        if (currentTopicIdx < topics.length - 1) {
            const nextTopicName = topics[currentTopicIdx + 1];
            const nextTopicSkills = gradeConfig[nextTopicName];
            if (nextTopicSkills.length > 0) {
                return {
                    ...nextTopicSkills[0],
                    topicName: nextTopicName
                };
            }
        }

        return null;
    };

    const generateQuestions = (selectedSkill) => {
        const questions = [];
        const colors = ['#FF6B6B', '#4ECDC4', '#FFE66D', '#98D8C8', '#C9A9E9'].sort(() => 0.5 - Math.random());

        const shapesPool = ['circle', 'square', 'triangle', 'rectangle', 'oval'].sort(() => 0.5 - Math.random());
        const posPool = [
            { q: 'Where is the ball located?', a: 'top' },
            { q: 'Where is the ball located?', a: 'inside' },
            { q: 'Where is the ball located?', a: 'bottom' },
            { q: 'Where is the ball located?', a: 'outside' },
            { q: 'Where is the ball located?', a: 'near' },
            { q: 'Where is the ball located?', a: 'far' }
        ].sort(() => 0.5 - Math.random());
        const sizePool = [
            { q: 'Which bar is HIGHER?', a: 'A', aSize: 120, bSize: 60, orient: 'vertical', exp: 'Bar A has a greater height than Bar B.' },
            { q: 'Which bar is SMALLER?', a: 'B', aSize: 100, bSize: 40, orient: 'vertical', exp: 'Bar B is significantly shorter than Bar A.' },
            { q: 'Which bar is BIGGER?', a: 'A', aSize: 130, bSize: 70, orient: 'vertical', exp: 'Bar A is the larger one among the two.' },
            { q: 'Which bar is LONGER?', a: 'A', aSize: 160, bSize: 80, orient: 'horizontal', exp: 'Bar A extends much further horizontally.' },
            { q: 'Which bar is SHORTER?', a: 'B', aSize: 150, bSize: 60, orient: 'horizontal', exp: 'Bar B is not as long as Bar A.' },
            { q: 'Which one is TALLER?', a: 'A', aSize: 130, bSize: 50, orient: 'vertical', exp: 'Looking at the vertical height, A is taller.' }
        ].sort(() => 0.5 - Math.random());

        for (let i = 0; i < totalQuestions; i++) {
            let question = {};
            let typeToGen = 'shape';
            if (isTest) {
                if (i < 4) typeToGen = 'shape';
                else if (i < 7) typeToGen = 'position';
                else typeToGen = 'size';
            } else if (selectedSkill === '101' || !selectedSkill) {
                typeToGen = 'shape';
            } else if (selectedSkill === '102') {
                typeToGen = 'position';
            } else if (selectedSkill === '103') {
                typeToGen = 'size';
            }

            if (typeToGen === 'shape') {
                const target = shapesPool[i % shapesPool.length];
                const otherOptions = shapesPool.filter(s => s !== target);
                question = {
                    text: `What shape is this?`,
                    options: [target, ...otherOptions.sort(() => 0.5 - Math.random()).slice(0, 3)].sort(() => 0.5 - Math.random()),
                    correct: target,
                    type: 'shape',
                    visualData: { shape: target, color: colors[i % colors.length] },
                    explanation: `This object has the characteristics of ${target === 'oval' ? 'an' : 'a'} ${target.toUpperCase()}.`
                };
            } else if (typeToGen === 'position') {
                const item = posPool[i % posPool.length];
                const pool = ['top', 'bottom', 'inside', 'outside', 'near', 'far'];
                const otherOptions = pool.filter(p => p !== item.a);
                question = {
                    text: item.q,
                    options: [item.a, ...otherOptions.sort(() => 0.5 - Math.random()).slice(0, 3)].sort(() => 0.5 - Math.random()),
                    correct: item.a,
                    type: 'position',
                    visualData: { pos: item.a },
                    explanation: `The ball is positioned ${item.a.toUpperCase()} in this visual representation.`
                };
            } else if (typeToGen === 'size') {
                const item = sizePool[i % sizePool.length];
                question = {
                    text: item.q,
                    options: ['A', 'B'],
                    correct: item.a,
                    type: 'size',
                    visualData: { aSize: item.aSize, bSize: item.bSize, orientation: item.orient },
                    explanation: item.exp
                };
            }
            questions.push(question);
        }
        return questions;
    };

    useEffect(() => {
        const qs = generateQuestions(skillId);
        setSessionQuestions(qs);
        const nodeId = SKILL_ID_MAP[skillId] || NODE_IDS.g1MathShapesSpaceMixed;
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
        setIsTransitioning(false);
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
            handleNext();
        }
    };

    const handleNext = async () => {
        if (showResults || isTransitioning) return;

        if (nextTimeoutRef.current) {
            clearTimeout(nextTimeoutRef.current);
            nextTimeoutRef.current = null;
        }

        const currentIndex = qIndexRef.current;
        if (currentIndex < totalQuestions - 1) {
            setIsTransitioning(true);
            setQIndex(prev => prev + 1);
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
                        <h2 style={{ fontSize: '2.5rem', fontWeight: 900, color: '#31326F', fontFamily: 'Fredoka, cursive' }}>Adventure Complete! 🎉</h2>

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
                                                        <span className="log-value">{typeof ans.selectedOption === 'string' ? ans.selectedOption.charAt(0).toUpperCase() + ans.selectedOption.slice(1) : ans.selectedOption}</span>
                                                    </div>
                                                    {!ans.isCorrect && (
                                                        <div className="log-answer-box correct-box">
                                                            <span className="log-label">Correct Answer</span>
                                                            <span className="log-value">{typeof ans.correctAnswer === 'string' ? ans.correctAnswer.charAt(0).toUpperCase() + ans.correctAnswer.slice(1) : ans.correctAnswer}</span>
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
                            <p style={{ fontSize: '1.3rem', fontWeight: 700, color: '#4A5568', marginBottom: '10px' }}>
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
    if (!currentQ) return null;

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

                <div className="g1-progress-container" style={{ margin: '0 0 10px 0' }}>
                    <div className="g1-progress-fill" style={{ width: `${((qIndex + 1) / totalQuestions) * 100}%` }}></div>
                </div>
                <div className="g1-topic-header-compact" style={{ textAlign: 'center', margin: '5px 0', fontSize: '0.8rem', color: '#64748B', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 400 }}>{topicName}</div>
                <motion.div key={qIndex} initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="g1-question-card">
                    <h2 className="g1-question-text"><LatexText text={currentQ.text} /></h2>

                    <div className="g1-content-split">
                        <div className="g1-visual-area" style={{ border: "none", background: "transparent" }}>
                            <DynamicVisual key={qIndex} type={currentQ.type} data={currentQ.visualData} />
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
                                        <LatexText text={opt.charAt(0).toUpperCase() + opt.slice(1)} />
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
                                    {isTest ? (qIndex === totalQuestions - 1 ? 'Finish Test' : 'Next Question') : 'Check Answer'} <ChevronRight size={24} />
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
                correctAnswer={typeof currentQ.correct === 'string' ? currentQ.correct.charAt(0).toUpperCase() + currentQ.correct.slice(1) : currentQ.correct}
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

export default ShapesAndSpace;
