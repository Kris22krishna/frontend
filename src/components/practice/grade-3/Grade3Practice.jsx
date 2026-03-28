import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from '../../../components/Navbar';
import WhatsInAName from './whats-in-a-name';
import ToyJoy from './toy-joy';
import DoubleCentury from './double-century';
import VacationNaniMaa from './vacation-nani-maa';
import FunWithShapesCh3 from './fun-with-shapes-ch3';
import HouseOfHundreds1 from './house-of-hundreds-1';
import FillingAndLifting from './filling-and-lifting';
import GiveAndTakeCh12 from './give-and-take-ch12';
import SurajkundFair from './surajkund-fair';
import './Grade3Practice.css';

const CHAPTERS = [
    {
        id: 1,
        num: 'Chapter 1',
        title: "What's in a Name?",
        emoji: '🔢',
        skills: 7,
        cardClass: 'g3-chapter-card-1',
        desc: 'Numbers, Place Value & Ordering',
        component: WhatsInAName,
    },
    {
        id: 2,
        num: 'Chapter 2',
        title: 'Toy Joy',
        emoji: '🪀',
        skills: 8,
        cardClass: 'g3-chapter-card-2',
        desc: 'Addition, Subtraction & Word Problems',
        component: ToyJoy,
    },
    {
        id: 3,
        num: 'Chapter 3',
        title: 'Double Century',
        emoji: '💯',
        skills: 7,
        cardClass: 'g3-chapter-card-3',
        desc: 'Numbers 100–200 & Patterns',
        component: DoubleCentury,
    },
    {
        id: 4,
        num: 'Chapter 4',
        title: 'Vacation with My Nani Maa',
        emoji: '🏡',
        skills: 6,
        cardClass: 'g3-chapter-card-4',
        desc: 'Lengths, Distances & Measurement',
        component: VacationNaniMaa,
    },
    {
        id: 5,
        num: 'Chapter 5',
        title: 'Fun with Shapes',
        emoji: '🔷',
        skills: 8,
        cardClass: 'g3-chapter-card-5',
        desc: 'Shapes, Symmetry & Patterns',
        component: FunWithShapesCh3,
    },
    {
        id: 6,
        num: 'Chapter 6',
        title: 'House of Hundreds – I',
        emoji: '🏠',
        skills: 9,
        cardClass: 'g3-chapter-card-6',
        desc: 'Hundreds Chart & Number Sequences',
        component: HouseOfHundreds1,
    },
    {
        id: 11,
        num: 'Chapter 7',
        title: 'Filling and Lifting',
        emoji: '⚖️',
        skills: 6,
        cardClass: 'g3-chapter-card-7',
        desc: 'Capacity, Weight & Estimation',
        component: FillingAndLifting,
    },
    {
        id: 12,
        num: 'Chapter 8',
        title: 'Give and Take',
        emoji: '🧮',
        skills: 8,
        cardClass: 'g3-chapter-card-8',
        desc: 'Addition & Subtraction Mastery',
        component: GiveAndTakeCh12,
    },
    {
        id: 14,
        num: 'Chapter 9',
        title: 'The Surajkund Fair',
        emoji: '🎪',
        skills: 7,
        cardClass: 'g3-chapter-card-9',
        desc: 'Money, Coins & Transactions',
        component: SurajkundFair,
    },
];

const FLOAT_EMOJIS = ['🌟', '🎈', '🌈', '⭐', '🎉', '🍭', '🦋', '🌸', '🎊', '💫'];

const FloatingEmojis = () => (
    <div className="g3-floating-emojis" aria-hidden="true">
        {FLOAT_EMOJIS.map((emoji, i) => (
            <span
                key={i}
                className="g3-emoji-float"
                style={{
                    left: `${8 + (i * 9)}%`,
                    animationDuration: `${14 + i * 3}s`,
                    animationDelay: `${-i * 2}s`,
                    fontSize: `${1.4 + (i % 3) * 0.6}rem`,
                }}
            >
                {emoji}
            </span>
        ))}
    </div>
);

const Grade3Practice = () => {
    const [activeChapter, setActiveChapter] = useState(null);
    const [, setHoveredId] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    // Auto-open chapter when arriving via ?chapterId= (from JuniorSubtopics)
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const chapterId = params.get('chapterId');
        if (chapterId) {
            const chapter = CHAPTERS.find(c => String(c.id) === String(chapterId));
            if (chapter) setActiveChapter(chapter);
        }
    }, [location.search]);

    // Render active chapter
    if (activeChapter) {
        const ChapterComp = activeChapter.component;
        const handleBack = () => {
            setActiveChapter(null);
            // Remove chapterId param so back button shows hub
            navigate('/junior/grade/3/math-practice', { replace: true });
        };
        return <ChapterComp onBack={handleBack} />;
    }

    const completedCount = 0; // Could hook into localStorage progress

    return (
        <div className="grade3-practice-page">
            <Navbar />
            <div className="g3-bg-blobs" aria-hidden="true">
                <div className="g3-blob g3-blob-1" />
                <div className="g3-blob g3-blob-2" />
                <div className="g3-blob g3-blob-3" />
                <div className="g3-blob g3-blob-4" />
            </div>
            <FloatingEmojis />

            <div className="g3-practice-container">
                {/* Nav */}
                <div className="g3-header-nav">
                    <button className="g3-back-btn" onClick={() => navigate(-1)}>
                        ← Back
                    </button>
                    <div className="g3-grade-badge">
                        ⭐ Grade 3 Math
                    </div>
                </div>

                {/* Hero Header */}
                <div className="g3-hub-header">
                    <span className="g3-hub-mascot" role="img" aria-label="rocket">🚀</span>
                    <h1 className="g3-hub-title">Grade 3 Math Adventures!</h1>
                    <p className="g3-hub-subtitle">
                        Pick a chapter and start your learning journey ✨
                    </p>
                </div>

                {/* Progress Strip */}
                <div className="g3-progress-strip">
                    <span className="g3-progress-label">📚 Chapters explored</span>
                    <div className="g3-progress-bar-track">
                        <div
                            className="g3-progress-bar-fill"
                            style={{ width: `${(completedCount / CHAPTERS.length) * 100}%` }}
                        />
                    </div>
                    <span className="g3-progress-count">
                        {completedCount} / {CHAPTERS.length}
                    </span>
                </div>

                {/* Chapter Cards Grid */}
                <div className="g3-chapters-grid">
                    {CHAPTERS.map(ch => (
                        <div
                            key={ch.id}
                            className={`g3-chapter-card ${ch.cardClass}`}
                            onClick={() => setActiveChapter(ch)}
                            onMouseEnter={() => setHoveredId(ch.id)}
                            onMouseLeave={() => setHoveredId(null)}
                            role="button"
                            tabIndex={0}
                            aria-label={`${ch.num}: ${ch.title}`}
                            onKeyDown={e => e.key === 'Enter' && setActiveChapter(ch)}
                        >
                            <span className="g3-chapter-sparkles" aria-hidden="true">✨</span>
                            <span className="g3-chapter-num-badge">{ch.num}</span>
                            <span className="g3-chapter-emoji-wrap" role="img" aria-hidden="true">
                                {ch.emoji}
                            </span>
                            <h3 className="g3-chapter-title">{ch.title}</h3>
                            <p style={{ fontSize: '0.8rem', color: '#777', margin: '0', fontWeight: 600 }}>
                                {ch.desc}
                            </p>
                            <div className="g3-chapter-meta">
                                <span className="g3-skill-pill">🎯 {ch.skills} Skills</span>
                                <span className="g3-start-arrow">→</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Grade3Practice;
