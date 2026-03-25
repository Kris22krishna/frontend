import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Timer, Star, ChevronLeft, RefreshCw, FileText, Check, X, Eye, ChevronRight, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../../../../contexts/AuthContext';
import { api } from '../../../../services/api';
import Navbar from '../../../Navbar';
import { TOPIC_CONFIGS } from '../../../../lib/topicConfig';
import { LatexText } from '../../../LatexText';
import ExplanationModal from '../../../ExplanationModal';
import StickerExit from '../../../StickerExit';
import avatarImg from '../../../../assets/avatar.png';
import '../../../../pages/juniors/class-1/Grade1Practice.css';

// ─── SVG Footprint Renderers ───
const FootprintSVG = ({ type, scale = 1 }) => {
    const s = 80 * scale;
    switch (type) {
        case 'paw-small': // Cat, Rabbit
            return (
                <svg width={s} height={s} viewBox="0 0 80 80">
                    <ellipse cx="40" cy="52" rx="14" ry="16" fill="#8B6914" />
                    <circle cx="24" cy="30" r="7" fill="#8B6914" />
                    <circle cx="40" cy="24" r="7" fill="#8B6914" />
                    <circle cx="56" cy="30" r="7" fill="#8B6914" />
                </svg>
            );
        case 'paw-medium': // Dog
            return (
                <svg width={s} height={s} viewBox="0 0 80 80">
                    <ellipse cx="40" cy="50" rx="16" ry="18" fill="#5C4033" />
                    <ellipse cx="22" cy="28" r="8" fill="#5C4033" />
                    <ellipse cx="40" cy="22" r="8" fill="#5C4033" />
                    <ellipse cx="58" cy="28" r="8" fill="#5C4033" />
                    <ellipse cx="15" cy="42" r="6" fill="#5C4033" />
                </svg>
            );
        case 'paw-large': // Tiger, Bear
            return (
                <svg width={s} height={s} viewBox="0 0 80 80">
                    <ellipse cx="40" cy="48" rx="20" ry="22" fill="#3E2723" />
                    <ellipse cx="18" cy="22" r="10" fill="#3E2723" />
                    <ellipse cx="40" cy="14" r="10" fill="#3E2723" />
                    <ellipse cx="62" cy="22" r="10" fill="#3E2723" />
                    {/* Claw marks */}
                    <line x1="16" y1="12" x2="12" y2="4" stroke="#3E2723" strokeWidth="3" strokeLinecap="round" />
                    <line x1="40" y1="4" x2="40" y2="-3" stroke="#3E2723" strokeWidth="3" strokeLinecap="round" />
                    <line x1="64" y1="12" x2="68" y2="4" stroke="#3E2723" strokeWidth="3" strokeLinecap="round" />
                </svg>
            );
        case 'hoof': // Horse, Cow
            return (
                <svg width={s} height={s} viewBox="0 0 80 80">
                    <path d="M24 60 Q20 30 30 18 Q40 10 50 18 Q60 30 56 60 Z" fill="#4A3728" />
                    <line x1="40" y1="20" x2="40" y2="55" stroke="#fef3c7" strokeWidth="3" />
                </svg>
            );
        case 'bird-claw': // Bird, Hen, Duck
            return (
                <svg width={s} height={s} viewBox="0 0 80 80">
                    {/* Three forward toes */}
                    <line x1="40" y1="30" x2="20" y2="65" stroke="#D84315" strokeWidth="4" strokeLinecap="round" />
                    <line x1="40" y1="30" x2="40" y2="70" stroke="#D84315" strokeWidth="4" strokeLinecap="round" />
                    <line x1="40" y1="30" x2="60" y2="65" stroke="#D84315" strokeWidth="4" strokeLinecap="round" />
                    {/* Back toe */}
                    <line x1="40" y1="30" x2="40" y2="15" stroke="#D84315" strokeWidth="3" strokeLinecap="round" />
                    <circle cx="40" cy="30" r="4" fill="#D84315" />
                </svg>
            );
        case 'webbed-foot': // Duck
            return (
                <svg width={s} height={s} viewBox="0 0 80 80">
                    <line x1="40" y1="25" x2="18" y2="65" stroke="#E65100" strokeWidth="4" strokeLinecap="round" />
                    <line x1="40" y1="25" x2="40" y2="70" stroke="#E65100" strokeWidth="4" strokeLinecap="round" />
                    <line x1="40" y1="25" x2="62" y2="65" stroke="#E65100" strokeWidth="4" strokeLinecap="round" />
                    {/* Webbing between toes */}
                    <path d="M18 65 Q30 55 40 70" fill="#FFCC80" stroke="#E65100" strokeWidth="2" />
                    <path d="M40 70 Q50 55 62 65" fill="#FFCC80" stroke="#E65100" strokeWidth="2" />
                    <circle cx="40" cy="25" r="4" fill="#E65100" />
                </svg>
            );
        case 'elephant': // Elephant
            return (
                <svg width={s} height={s} viewBox="0 0 80 80">
                    <circle cx="40" cy="42" r="28" fill="#607D8B" />
                    <circle cx="40" cy="42" r="22" fill="#78909C" />
                    {/* Toenail marks */}
                    <circle cx="24" cy="22" r="5" fill="#455A64" />
                    <circle cx="40" cy="17" r="5" fill="#455A64" />
                    <circle cx="56" cy="22" r="5" fill="#455A64" />
                </svg>
            );
        case 'monkey-hand': // Monkey
            return (
                <svg width={s} height={s} viewBox="0 0 80 80">
                    <ellipse cx="40" cy="55" rx="16" ry="12" fill="#795548" />
                    {/* Five fingers spread out */}
                    <ellipse cx="18" cy="32" rx="5" ry="10" fill="#795548" transform="rotate(-20 18 32)" />
                    <ellipse cx="28" cy="22" rx="4" ry="12" fill="#795548" transform="rotate(-10 28 22)" />
                    <ellipse cx="40" cy="18" rx="4" ry="14" fill="#795548" />
                    <ellipse cx="52" cy="22" rx="4" ry="12" fill="#795548" transform="rotate(10 52 22)" />
                    <ellipse cx="62" cy="32" rx="5" ry="10" fill="#795548" transform="rotate(20 62 32)" />
                </svg>
            );
        default:
            return <div style={{ fontSize: '60px' }}>🐾</div>;
    }
};

// ─── Animal Footprint Data ───
const ANIMALS = [
    { name: 'Dog', emoji: '🐕', fpType: 'paw-medium', size: 3, hint: '4 toe pads and a big heel pad' },
    { name: 'Cat', emoji: '🐱', fpType: 'paw-small', size: 2, hint: '3 small round toe pads, no claws' },
    { name: 'Elephant', emoji: '🐘', fpType: 'elephant', size: 10, hint: 'Very large, round like a plate' },
    { name: 'Bird', emoji: '🐦', fpType: 'bird-claw', size: 1, hint: '3 thin toes pointing forward' },
    { name: 'Horse', emoji: '🐴', fpType: 'hoof', size: 7, hint: 'U-shaped hoof print' },
    { name: 'Hen', emoji: '🐔', fpType: 'bird-claw', size: 1, hint: '3 pointy toes and 1 back toe' },
    { name: 'Bear', emoji: '🐻', fpType: 'paw-large', size: 8, hint: 'Very big paw with sharp claw marks' },
    { name: 'Rabbit', emoji: '🐰', fpType: 'paw-small', size: 2, hint: '3 small pads, tiny and soft' },
    { name: 'Tiger', emoji: '🐯', fpType: 'paw-large', size: 6, hint: 'Big paw with claw scratch marks' },
    { name: 'Cow', emoji: '🐄', fpType: 'hoof', size: 5, hint: 'Split hoof shaped like a U' },
    { name: 'Duck', emoji: '🦆', fpType: 'webbed-foot', size: 1, hint: 'Toes connected by webbing' },
    { name: 'Monkey', emoji: '🐵', fpType: 'monkey-hand', size: 3, hint: '5 fingers spread out like a hand' },
];

// ─── Shape Tracing Data ───
const TRACE_OBJECTS = [
    { obj: 'Coin', emoji: '🪙', shape: 'Circle', shapeEmoji: '⭕' },
    { obj: 'Eraser', emoji: '🧽', shape: 'Rectangle', shapeEmoji: '🟩' },
    { obj: 'Sandwich', emoji: '🥪', shape: 'Triangle', shapeEmoji: '🔺' },
    { obj: 'Biscuit', emoji: '🍪', shape: 'Circle', shapeEmoji: '⭕' },
    { obj: 'Book', emoji: '📕', shape: 'Rectangle', shapeEmoji: '🟩' },
    { obj: 'Pizza Slice', emoji: '🍕', shape: 'Triangle', shapeEmoji: '🔺' },
    { obj: 'Plate', emoji: '🍽️', shape: 'Circle', shapeEmoji: '⭕' },
    { obj: 'Phone', emoji: '📱', shape: 'Rectangle', shapeEmoji: '🟩' },
    { obj: 'Carrot', emoji: '🥕', shape: 'Triangle', shapeEmoji: '🔺' },
    { obj: 'Bangles', emoji: '💍', shape: 'Circle', shapeEmoji: '⭕' },
    { obj: 'Door', emoji: '🚪', shape: 'Rectangle', shapeEmoji: '🟩' },
    { obj: 'Clock', emoji: '🕐', shape: 'Circle', shapeEmoji: '⭕' },
    { obj: 'Ice Cream Cone', emoji: '🍦', shape: 'Triangle', shapeEmoji: '🔺' },
    { obj: 'Matchbox', emoji: '📦', shape: 'Rectangle', shapeEmoji: '🟩' },
    { obj: 'Watermelon Slice', emoji: '🍉', shape: 'Triangle', shapeEmoji: '🔺' },
];

// ─── DynamicVisual Component ───
const DynamicVisual = ({ type, data }) => {
    if (type === 'match-footprint') {
        const { animal } = data;
        return (
            <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                padding: '30px 40px', background: '#fef3c7', borderRadius: '30px', border: '3px solid #fbbf24',
                minHeight: '220px', gap: '12px'
            }}>
                <motion.div
                    initial={{ rotate: -5 }} animate={{ rotate: 5 }}
                    transition={{ repeat: Infinity, repeatType: 'reverse', duration: 2 }}
                    style={{ filter: 'drop-shadow(0 8px 12px rgba(0,0,0,0.15))' }}
                >
                    <FootprintSVG type={animal.fpType} scale={1.2} />
                </motion.div>
                <div style={{
                    background: 'rgba(255,255,255,0.8)', borderRadius: '15px', padding: '10px 20px',
                    textAlign: 'center', maxWidth: '280px'
                }}>
                    <span style={{ fontWeight: 700, color: '#92400e', fontSize: '0.95rem' }}>
                        💡 Hint: {animal.hint}
                    </span>
                </div>
                <span style={{ fontWeight: 600, color: '#b45309', fontSize: '0.85rem' }}>
                    Size: {animal.size <= 2 ? '🔹 Tiny' : animal.size <= 4 ? '🔸 Small' : animal.size <= 7 ? '🟠 Medium' : '🔴 Big'}
                </span>
            </motion.div>
        );
    }

    if (type === 'compare-footprint') {
        const { animalA, animalB } = data;
        return (
            <div style={{
                display: 'flex', justifyContent: 'center', gap: '40px', width: '100%', padding: '30px',
                background: '#ecfdf5', borderRadius: '30px', border: '3px solid #6ee7b7'
            }}>
                <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                    <div style={{ fontSize: `${Math.min(40 + animalA.size * 6, 80)}px` }}>{animalA.emoji}</div>
                    <span style={{ fontWeight: 900, color: '#31326F', fontSize: '1.1rem' }}>{animalA.name}</span>
                    <div style={{ filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))' }}>
                        <FootprintSVG type={animalA.fpType} scale={0.6 + (animalA.size * 0.06)} />
                    </div>
                </motion.div>
                <div style={{ display: 'flex', alignItems: 'center', fontSize: '2rem', color: '#94a3b8', fontWeight: 900 }}>VS</div>
                <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} transition={{ delay: 0.2 }} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                    <div style={{ fontSize: `${Math.min(40 + animalB.size * 6, 80)}px` }}>{animalB.emoji}</div>
                    <span style={{ fontWeight: 900, color: '#31326F', fontSize: '1.1rem' }}>{animalB.name}</span>
                    <div style={{ filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))' }}>
                        <FootprintSVG type={animalB.fpType} scale={0.6 + (animalB.size * 0.06)} />
                    </div>
                </motion.div>
            </div>
        );
    }

    if (type === 'shape-trace') {
        const { object } = data;
        return (
            <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                padding: '40px', background: '#ede9fe', borderRadius: '30px', border: '3px solid #c4b5fd',
                minHeight: '200px', gap: '15px'
            }}>
                <div style={{ fontSize: '90px', filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.1))' }}>
                    {object.emoji}
                </div>
                <span style={{ fontWeight: 700, color: '#5b21b6', fontSize: '1.1rem' }}>
                    Trace around this {object.obj}!
                </span>
            </motion.div>
        );
    }

    return null;
};

// ─── Error Boundary ───
class ErrorBoundary extends React.Component {
    constructor(props) { super(props); this.state = { hasError: false, error: null }; }
    static getDerivedStateFromError(error) { return { hasError: true, error }; }
    render() {
        if (this.state.hasError) {
            return (
                <div style={{ padding: '40px', textAlign: 'center' }}>
                    <h2>Something went wrong 😢</h2>
                    <p style={{ color: '#666' }}>{this.state.error?.message}</p>
                    <button onClick={() => window.location.reload()} style={{ padding: '10px 30px', borderRadius: '12px', border: 'none', background: '#4ECDC4', color: 'white', fontWeight: 700, cursor: 'pointer', marginTop: '15px' }}>
                        Reload
                    </button>
                </div>
            );
        }
        return this.props.children;
    }
}

// ─── Main Component ───
const Grade2Footprints = () => {
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
        return { topicName: 'Footprints', skillName: 'Practice' };
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

    // ─── Skill 1017: Matching Footprints ───
    const generateMatchingQuestions = () => {
        const shuffled = [...ANIMALS].sort(() => 0.5 - Math.random());
        const questions = [];
        for (let i = 0; i < totalQuestions; i++) {
            const animal = shuffled[i % shuffled.length];
            // Only offer animals with DIFFERENT footprint types as wrong answers
            const otherAnimals = ANIMALS.filter(a => a.name !== animal.name && a.fpType !== animal.fpType)
                .sort(() => 0.5 - Math.random()).slice(0, 2);
            const options = [animal.name, ...otherAnimals.map(a => a.name)].sort(() => 0.5 - Math.random());

            questions.push({
                text: `Whose footprint is this? 🐾`,
                options,
                correct: animal.name,
                type: 'match-footprint',
                visualData: { animal },
                explanation: `This is the footprint of a ${animal.name} ${animal.emoji}. Hint: ${animal.hint}.`
            });
        }
        return questions;
    };

    // ─── Skill 1018: Comparing Footprint Sizes ───
    const generateComparingQuestions = () => {
        const questions = [];
        let pairs = [];
        for (let i = 0; i < ANIMALS.length; i++) {
            for (let j = i + 1; j < ANIMALS.length; j++) {
                if (ANIMALS[i].size !== ANIMALS[j].size) {
                    pairs.push({ a: ANIMALS[i], b: ANIMALS[j] });
                }
            }
        }
        pairs = pairs.sort(() => 0.5 - Math.random());

        const numBigger = Math.random() > 0.5 ? Math.floor(totalQuestions / 2) : Math.ceil(totalQuestions / 2);
        const biggerFlags = Array(totalQuestions).fill(false).fill(true, 0, numBigger).sort(() => Math.random() - 0.5);

        for (let i = 0; i < totalQuestions; i++) {
            const pair = pairs[i % pairs.length];
            const askingBigger = biggerFlags[i];
            const isSwapped = Math.random() > 0.5;
            const animalA = isSwapped ? pair.b : pair.a;
            const animalB = isSwapped ? pair.a : pair.b;

            questions.push({
                text: askingBigger ? `Which animal has a BIGGER footprint? 🐾` : `Which animal has a SMALLER footprint? 🐾`,
                options: [animalA.name, animalB.name],
                correct: askingBigger
                    ? (animalA.size > animalB.size ? animalA.name : animalB.name)
                    : (animalA.size < animalB.size ? animalA.name : animalB.name),
                type: 'compare-footprint',
                visualData: { animalA, animalB },
                explanation: askingBigger
                    ? `A ${animalA.size > animalB.size ? animalA.name : animalB.name} has bigger footprints because it is a larger animal.`
                    : `A ${animalA.size < animalB.size ? animalA.name : animalB.name} has smaller footprints because it is a smaller animal.`
            });
        }
        return questions;
    };

    // ─── Skill 1019: Shape Tracing ───
    const generateShapeTracingQuestions = () => {
        const shuffled = [...TRACE_OBJECTS].sort(() => 0.5 - Math.random());
        const allShapes = ['Circle', 'Rectangle', 'Triangle'];
        const questions = [];

        for (let i = 0; i < totalQuestions; i++) {
            const obj = shuffled[i % shuffled.length];
            const wrongShapes = allShapes.filter(s => s !== obj.shape)
                .sort(() => 0.5 - Math.random()).slice(0, 2);
            const options = [obj.shape, ...wrongShapes].sort(() => 0.5 - Math.random());

            questions.push({
                text: `If you trace around a ${obj.obj}, what shape will you get? ${obj.emoji}`,
                options,
                correct: obj.shape,
                type: 'shape-trace',
                visualData: { object: obj },
                explanation: `When you trace around a ${obj.obj} ${obj.emoji}, you get a ${obj.shape} ${obj.shapeEmoji}.`
            });
        }
        return questions;
    };

    // ─── Question Router ───
    const generateQuestions = (selectedSkill) => {
        if (selectedSkill === '1017') return generateMatchingQuestions();
        if (selectedSkill === '1018') return generateComparingQuestions();
        if (selectedSkill === '1019') return generateShapeTracingQuestions();

        // MIXED For Test — generate extra, deduplicate, then slice
        const pool = [
            ...generateMatchingQuestions(),
            ...generateComparingQuestions(),
            ...generateShapeTracingQuestions()
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

    // ─── Core Template Logic ───
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

    useEffect(() => { setShowExplanationModal(false); }, [qIndex]);

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
        try { if (sessionId) await api.finishSession(sessionId); } catch (e) { console.error(e); }
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

        try {
            const uid = user?.user_id || user?.id || sessionStorage.getItem('userId') || localStorage.getItem('userId');
            const qData = sessionQuestions[qIndex] || {};
            const skId = typeof skillId !== 'undefined' ? skillId : '0';
            if (uid && sessionId) {
                api.recordAttempt({
                    user_id: parseInt(uid, 10), session_id: sessionId,
                    skill_id: parseInt(skId, 10) || 0, template_id: null,
                    difficulty_level: 'Medium',
                    question_text: String(qData.text || ''),
                    correct_answer: String(qData.correct || ''),
                    student_answer: String(option),
                    is_correct: isCorrect,
                    solution_text: String(qData.explanation || ''),
                    time_spent_seconds: timer
                }).catch(err => console.error("Auto-log failed:", err));
            }
        } catch (err) { console.error("Auto-log error:", err); }

        if (isCorrect) setScore(s => s + 1);

        setAnswers(prev => ({
            ...prev,
            [qIndex]: {
                selectedOption: option, isCorrect,
                type: sessionQuestions[qIndex].type,
                visualData: sessionQuestions[qIndex].visualData,
                questionText: sessionQuestions[qIndex].text,
                correctAnswer: sessionQuestions[qIndex].correct,
                explanation: sessionQuestions[qIndex].explanation || "Here is the explanation."
            }
        }));

        if (!isTest && !isRight) {
            setShowExplanationModal(true);
        } else {
            setIsAutoAdvancing(true);
            setTimeout(() => { handleNext(); setIsAutoAdvancing(false); }, 800);
        }
    };

    const handleSkip = () => {
        if (isAnswered) return;
        setAnswers(prev => ({
            ...prev,
            [qIndex]: {
                selectedOption: 'Skipped', isCorrect: false,
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
                        uid: user?.id || 'unknown', category: 'Practice',
                        reportData: {
                            skill_id: skillId, skill_name: skillName,
                            score: Math.round((score / totalQuestions) * 100),
                            total_questions: totalQuestions, correct_answers: score,
                            time_spent: timer, timestamp: new Date().toISOString(),
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
                    <div className="exit-container"><StickerExit onClick={handleExit} /></div>
                </header>
                <main className="results-content">
                    <div className="results-hero-section">
                        <img src={avatarImg} alt="Mascot" style={{ width: '120px', height: '120px', margin: '0 auto 20px' }} />
                        <h2 style={{ fontSize: '2.5rem', fontWeight: 400, color: '#31326F', fontFamily: 'Nunito, sans-serif' }}>Adventure Complete! 🎉</h2>
                        <div className="stars-container">
                            {[1, 2, 3].map(i => (
                                <motion.div key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i * 0.2 }} className="star-wrapper">
                                    <Star size={60} fill={percentage >= (i * 33) ? "#FFD700" : "#EDF2F7"} color={percentage >= (i * 33) ? "#F6AD55" : "#CBD5E0"} />
                                </motion.div>
                            ))}
                        </div>
                        <div className="results-stats-grid">
                            <div className="stat-card"><span className="stat-label">Correct</span><span className="stat-value-large">{score}/{totalQuestions}</span></div>
                            <div className="stat-card"><span className="stat-label">Time</span><span className="stat-value-large">{formatTime(timer)}</span></div>
                            <div className="stat-card"><span className="stat-label">Accuracy</span><span className="stat-value-large">{percentage}%</span></div>
                            <div className="stat-card"><span className="stat-label">Score</span><span className="stat-value-large">{score * 10}</span></div>
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
                                        <motion.div key={idx} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="quest-log-item">
                                            <div className={`log-number ${!ans.isCorrect ? 'wrong' : ''}`}>{idx + 1}</div>
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
                                                {ans.isCorrect ? <Check size={32} color="#4FB7B3" strokeWidth={3} /> : <X size={32} color="#FF6B6B" strokeWidth={3} />}
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
                                    <motion.div key={idx} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: idx * 0.1 }}
                                        style={{ width: '50px', height: '50px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', background: ans.isCorrect ? '#C6F6D5' : '#FED7D7', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                                        {ans.isCorrect ? '✅' : '❌'}
                                    </motion.div>
                                ))}
                            </div>
                            <p style={{ fontSize: '1.3rem', fontWeight: 400, color: '#4A5568', marginBottom: '10px' }}>
                                {percentage >= 80 ? '🌟 Amazing work! Keep it up!' : percentage >= 60 ? '💪 Good effort! Keep practicing!' : '🌱 Nice try! Practice makes perfect!'}
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
                    <div className="g1-timer-badge"><Timer size={18} />{formatTime(timer)}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px', flex: 1, minWidth: 0 }}>
                        <span style={{ fontWeight: 400, color: '#666', fontSize: '1rem', background: 'white', padding: '8px 15px', borderRadius: '15px', boxShadow: '0 4px 10px rgba(0,0,0,0.05)', whiteSpace: 'nowrap' }}>
                            Q {qIndex + 1}/{totalQuestions}
                        </span>
                        <span style={{ fontWeight: 400, color: '#2D3436', fontSize: '1rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            <LatexText text={skillName} />
                        </span>
                    </div>
                    {isTest && !isAnswered && (
                        <button className="g1-skip-btn" onClick={handleSkip} style={{ marginLeft: '15px' }}>Skip Quest ⏭️</button>
                    )}
                    <div className="exit-practice-sticker" style={{ marginLeft: 'auto' }}><StickerExit onClick={handleExit} /></div>
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
                                    <button key={i}
                                        className={`g1-option-btn
                                            ${selectedOption === opt ? (isTest ? 'selected-test' : (isAnswered ? (opt === currentQ.correct ? 'selected-correct' : 'selected-wrong') : 'selected-test')) : ''}
                                            ${!isTest && isAnswered && opt === currentQ.correct ? 'revealed-correct' : ''}
                                        `}
                                        onClick={() => handleOptionSelect(opt)}
                                        disabled={isAnswered}
                                    >
                                        <LatexText text={opt} />
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
                                    Check Answer <ChevronRight size={24} />
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

const Grade2FootprintsWithBoundary = () => (
    <ErrorBoundary><Grade2Footprints /></ErrorBoundary>
);

export default Grade2FootprintsWithBoundary;
