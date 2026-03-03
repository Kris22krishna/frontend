import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home } from 'lucide-react';
import '../../ticking-clocks.css';

// ─── DATA SECTIONS ─────────────────────────────────────────────────────────

const TERMS = [
    {
        name: 'Hour Hand',
        color: '#d97706',
        icon: '🕐',
        def: 'The short, thick hand on a clock that points to the current hour. It moves slowly — it takes 12 hours to go all the way around!',
        examples: ['Points to 3 → It is 3 o\'clock', 'Points between 4 and 5 → It is past 4'],
        inUse: 'When the hour hand points to 7 and the minute hand points to 12, it is exactly 7:00.',
        memory: 'SHORT hand = HOUR. Think: "Hour" is a short word, so the short hand shows it!'
    },
    {
        name: 'Minute Hand',
        color: '#0284c7',
        icon: '🕑',
        def: 'The long, thin hand on a clock that points to the current minute. It moves faster — it goes all the way around in just 1 hour (60 minutes)!',
        examples: ['Points to 12 → 0 minutes (o\'clock)', 'Points to 6 → 30 minutes (half past)'],
        inUse: 'When the minute hand points to 3, it means 15 minutes past the hour.',
        memory: 'LONG hand = MINUTE. "Minute" is a longer word, so the longer hand shows it!'
    },
    {
        name: 'Second Hand',
        color: '#dc2626',
        icon: '⏱️',
        def: 'The thinnest, fastest hand on a clock. It counts seconds — 60 seconds make 1 minute. You can see it moving if you watch closely!',
        examples: ['Ticks 60 times = 1 minute', 'Ticks 3600 times = 1 hour'],
        inUse: 'The second hand helps us time short events like a 100-meter race.',
        memory: 'It comes SECOND in thickness (thinnest) and counts SECONDS!'
    },
    {
        name: 'Quarter Past',
        color: '#7c3aed',
        icon: '🕒',
        def: 'When the minute hand is at 3 (15 minutes past the hour). The clock face is divided into 4 quarters, and one quarter has passed.',
        examples: ['Quarter past 2 = 2:15', 'Quarter past 8 = 8:15'],
        inUse: 'School starts at quarter past 8, which means 8:15 AM.',
        memory: 'A quarter of a circle = 15 minutes. Minute hand at 3 = quarter past!'
    },
    {
        name: 'Half Past',
        color: '#059669',
        icon: '🕕',
        def: 'When the minute hand is at 6 (30 minutes past the hour). Exactly half of the hour has passed — the minute hand is halfway around!',
        examples: ['Half past 4 = 4:30', 'Half past 12 = 12:30'],
        inUse: 'Lunch break starts at half past 12, which means 12:30 PM.',
        memory: 'Half the clock = half the hour = 30 minutes. Minute hand at 6!'
    },
    {
        name: 'Quarter To',
        color: '#be185d',
        icon: '🕘',
        def: 'When the minute hand is at 9 (15 minutes BEFORE the next hour). Only a quarter of the hour remains!',
        examples: ['Quarter to 5 = 4:45', 'Quarter to 10 = 9:45'],
        inUse: 'The bell rings at quarter to 3, which means 2:45 PM.',
        memory: 'Minute hand at 9 = quarter TO the next hour. 15 minutes left!'
    },
    {
        name: 'AM (Ante Meridiem)',
        color: '#f59e0b',
        icon: '🌅',
        def: 'The time period from 12:00 midnight to 11:59 in the morning. AM stands for "Ante Meridiem" which means "before noon" in Latin.',
        examples: ['6:00 AM = Early morning', '11:30 AM = Late morning'],
        inUse: 'School starts at 8:00 AM — that\'s in the morning!',
        memory: 'AM = "After Midnight" or "Ante Meridiem" — it\'s the morning hours!'
    },
    {
        name: 'PM (Post Meridiem)',
        color: '#6366f1',
        icon: '🌆',
        def: 'The time period from 12:00 noon to 11:59 at night. PM stands for "Post Meridiem" which means "after noon" in Latin.',
        examples: ['2:00 PM = Afternoon', '8:00 PM = Evening/Night'],
        inUse: 'Dinner is at 8:00 PM — that\'s in the evening!',
        memory: 'PM = "Past Midday" or "Post Meridiem" — it\'s the afternoon/evening hours!'
    },
    {
        name: 'Leap Year',
        color: '#0d9488',
        icon: '📅',
        def: 'A special year that has 366 days instead of 365. February gets an extra day (29th). This happens every 4 years to keep our calendar in sync with Earth\'s orbit around the Sun.',
        examples: ['2020, 2024, 2028 are leap years', 'February has 29 days in a leap year'],
        inUse: 'People born on February 29 celebrate their "real" birthday only every 4 years!',
        memory: 'Divide the year by 4. If it divides evenly with no remainder, it\'s a leap year!'
    },
    {
        name: 'Duration',
        color: '#ea580c',
        icon: '⏳',
        def: 'The amount of time that passes between a start time and an end time. It tells us HOW LONG something lasted.',
        examples: ['Movie: 2:00 PM to 4:30 PM = 2 hours 30 minutes', 'Nap: 3:00 PM to 4:00 PM = 1 hour'],
        inUse: 'Parv started homework at 4:00 PM and finished at 5:30 PM. Duration = 1 hour 30 minutes.',
        memory: 'Duration = End Time − Start Time. How long did it last?'
    },
];

const FIVE_RULES = [
    {
        num: 1,
        title: 'The 60-Minute Rule',
        rule: '1 hour = 60 minutes and 1 minute = 60 seconds. These are the building blocks of time!',
        emoji: '⏰',
        color: '#d97706',
        detail: 'Just like 100 paise make 1 rupee, 60 minutes make 1 hour. The minute hand completes one full round of the clock in exactly 60 minutes.',
        examples: ['1 hour = 60 minutes', '2 hours = 120 minutes', '½ hour = 30 minutes', '¼ hour = 15 minutes'],
        tip: 'To convert hours to minutes, multiply by 60. To convert minutes to hours, divide by 60!'
    },
    {
        num: 2,
        title: 'The 12-Hour Cycle',
        rule: 'A clock shows 12 hours, but a day has 24 hours. The hour hand goes around TWICE in one full day!',
        emoji: '🔄',
        color: '#0284c7',
        detail: 'From 12:00 midnight to 12:00 noon is AM (12 hours). From 12:00 noon to 12:00 midnight is PM (another 12 hours). That\'s why we say 2:00 AM (night) and 2:00 PM (afternoon) — same number, different time!',
        examples: ['12:00 AM = Midnight', '12:00 PM = Noon', '6:00 AM = Morning', '6:00 PM = Evening'],
        tip: 'The same clock positions repeat twice a day — AM and PM help us tell which one!'
    },
    {
        num: 3,
        title: 'Days in Months',
        rule: '30 days hath September, April, June, and November. All the rest have 31, except February which has 28 (or 29 in a leap year).',
        emoji: '📆',
        color: '#059669',
        detail: 'This rhyme is over 500 years old and still the best way to remember! You can also use the knuckle trick: make two fists side by side. Knuckles = 31 days, valleys = 30 days (except February).',
        examples: ['January = 31', 'February = 28 or 29', 'April = 30', 'July = 31'],
        tip: 'The knuckle trick: Jan(31), Feb(28/29), Mar(31), Apr(30), May(31), Jun(30), Jul(31), Aug(31)...'
    },
    {
        num: 4,
        title: 'The Leap Year Rule',
        rule: 'A year is a leap year if it is divisible by 4. But century years (like 1900, 2100) must be divisible by 400.',
        emoji: '🐸',
        color: '#7c3aed',
        detail: 'Earth takes 365.25 days to orbit the Sun. That extra 0.25 day adds up! Every 4 years we add an extra day (Feb 29) to keep our calendar accurate. Without leap years, after 100 years our calendar would be off by 25 days!',
        examples: ['2024 ÷ 4 = 606 → Leap Year ✓', '2023 ÷ 4 = 505.75 → Not a Leap Year ✗', '1900 ÷ 400 = 4.75 → Not a Leap Year ✗', '2000 ÷ 400 = 5 → Leap Year ✓'],
        tip: 'Quick check: if the last two digits of the year are divisible by 4, it\'s likely a leap year!'
    },
    {
        num: 5,
        title: 'Duration Formula',
        rule: 'Duration = End Time − Start Time. To find how long something lasted, subtract the start from the end.',
        emoji: '🧮',
        color: '#ea580c',
        detail: 'If you need to borrow: think of 1 hour = 60 minutes. For example, 3:15 PM − 1:45 PM: borrow 1 hour from 3 to make it 2 hours 75 minutes, then subtract to get 1 hour 30 minutes.',
        examples: ['10:00 AM to 12:30 PM = 2 hr 30 min', '4:45 PM to 6:15 PM = 1 hr 30 min'],
        tip: 'When minutes at end are smaller than start, borrow 1 hour (= 60 min) from the hours!'
    }
];

const VOCAB_QUIZ = [
    {
        question: "Which hand on a clock is the shortest?",
        options: ["Minute Hand", "Second Hand", "Hour Hand", "They are all the same"],
        correct: 2,
        explanation: "The hour hand is the shortest and thickest hand on the clock. It points to the current hour."
    },
    {
        question: "How many minutes are in one hour?",
        options: ["30 minutes", "100 minutes", "60 minutes", "24 minutes"],
        correct: 2,
        explanation: "One hour equals exactly 60 minutes. The minute hand takes 60 minutes to go all the way around the clock."
    },
    {
        question: "What does 'Quarter Past 3' mean?",
        options: ["3:30", "3:45", "3:15", "3:00"],
        correct: 2,
        explanation: "Quarter past means 15 minutes after the hour. So quarter past 3 = 3:15."
    },
    {
        question: "What does AM stand for?",
        options: ["After Morning", "Ante Meridiem", "At Midnight", "All Morning"],
        correct: 1,
        explanation: "AM stands for 'Ante Meridiem,' a Latin phrase meaning 'before noon.' It covers 12:00 midnight to 11:59 morning."
    },
    {
        question: "How many days does February have in a leap year?",
        options: ["28 days", "29 days", "30 days", "31 days"],
        correct: 1,
        explanation: "In a leap year, February gets an extra day — 29 days instead of the usual 28."
    },
    {
        question: "Which of these is a leap year?",
        options: ["2023", "2025", "2024", "2022"],
        correct: 2,
        explanation: "2024 ÷ 4 = 606 (no remainder). Since it's divisible by 4, 2024 is a leap year!"
    },
    {
        question: "What is 'Half Past 6'?",
        options: ["6:15", "6:45", "6:30", "6:00"],
        correct: 2,
        explanation: "Half past means 30 minutes after the hour. The minute hand is at 6, exactly halfway around the clock."
    },
    {
        question: "How many months have exactly 30 days?",
        options: ["4 months", "6 months", "7 months", "5 months"],
        correct: 0,
        explanation: "Four months have 30 days: September, April, June, and November. Remember the rhyme!"
    },
    {
        question: "What is 'Quarter To 5'?",
        options: ["5:15", "4:45", "5:45", "4:15"],
        correct: 1,
        explanation: "Quarter to means 15 minutes BEFORE the next hour. So quarter to 5 = 4:45."
    },
    {
        question: "If a movie starts at 2:00 PM and ends at 4:30 PM, how long is it?",
        options: ["2 hours", "2 hours 30 minutes", "3 hours", "1 hour 30 minutes"],
        correct: 1,
        explanation: "Duration = End − Start. 4:30 PM − 2:00 PM = 2 hours 30 minutes."
    }
];

// ─── MAIN COMPONENT ────────────────────────────────────────────────────────

export default function TickingClocksTerminology() {
    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState('terms');
    const [selectedIdx, setSelectedIdx] = useState(0);
    const [selectedRuleIdx, setSelectedRuleIdx] = useState(0);

    const [quizIdx, setQuizIdx] = useState(0);
    const [quizSelected, setQuizSelected] = useState(null);
    const [quizAnswered, setQuizAnswered] = useState(false);
    const [quizTotalScore, setQuizTotalScore] = useState(0);
    const [quizFinished, setQuizFinished] = useState(false);

    const activeTerm = TERMS[selectedIdx];
    const activeRule = FIVE_RULES[selectedRuleIdx];
    const activeQuiz = VOCAB_QUIZ[quizIdx];

    const resetQuiz = () => {
        setQuizIdx(0);
        setQuizSelected(null);
        setQuizAnswered(false);
        setQuizTotalScore(0);
        setQuizFinished(false);
    };

    const handleQuizSelect = (optIdx) => {
        if (quizAnswered) return;
        setQuizSelected(optIdx);
        setQuizAnswered(true);
        if (optIdx === activeQuiz.correct) setQuizTotalScore(s => s + 1);
    };

    const nextQuiz = () => {
        if (quizIdx + 1 < VOCAB_QUIZ.length) {
            setQuizIdx(i => i + 1);
            setQuizSelected(null);
            setQuizAnswered(false);
        } else {
            setQuizFinished(true);
        }
    };

    return (
        <div className="tc-terminology-page">
            <style>{`
                .tc-details-anim {
                    animation: tcSlideIn 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                }
                @keyframes tcSlideIn {
                    from { opacity: 0; transform: translateX(20px); }
                    to { opacity: 1; transform: translateX(0); }
                }
                .tc-term-btn {
                    display: flex; align-items: center; gap: 10px;
                    padding: 10px 14px; border-radius: 12px;
                    border: 1.5px solid rgba(0,0,0,0.06);
                    cursor: pointer; transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
                    text-align: left; font-family: 'Outfit', sans-serif;
                    position: relative; overflow: hidden; background: #fff;
                }
                .tc-term-btn:hover { transform: translateY(-2px); box-shadow: 0 6px 15px rgba(0,0,0,0.08); }
                .tc-term-btn.active { transform: translateY(-1px); box-shadow: 0 8px 20px rgba(0,0,0,0.1); z-index: 2; }
                @media (max-width: 1024px) {
                    .tc-lexicon-grid { grid-template-columns: 1fr !important; }
                    .tc-selector { max-width: 600px; margin: 0 auto 16px; }
                }
            `}</style>

            <nav className="tc-nav">
                <button className="tc-nav-back" onClick={() => navigate('/ticking-clocks')}>← Back to Ticking Clocks</button>
                <div className="tc-nav-links">
                    <button className="tc-nav-link" onClick={() => navigate('/ticking-clocks/introduction')}>🌟 Introduction</button>
                    <button className="tc-nav-link tc-nav-link--active" onClick={() => navigate('/ticking-clocks/terminology')}>📖 Terminology</button>
                    <button className="tc-nav-link" onClick={() => navigate('/ticking-clocks/skills')}>🎯 Skills</button>
                </div>
            </nav>

            <div style={{ maxWidth: 1100, margin: '20px auto 20px', padding: '0 24px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: 20 }}>
                    <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '2.8rem', fontWeight: 900, color: 'var(--tc-text)', margin: '0 0 8px' }}>
                        Time & Calendar <span style={{ background: 'linear-gradient(135deg, var(--tc-amber), var(--tc-orange))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Vocabulary</span>
                    </h1>
                    <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--tc-muted)', letterSpacing: 0.5 }}>
                        {activeTab === 'quiz' ? 'Test your knowledge with 10 interactive questions!' : `Select any ${activeTab === 'terms' ? 'term' : 'rule'} below to explore details.`}
                    </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 16 }}>
                    <button className={`tc-tab ${activeTab === 'terms' ? 'active' : ''}`} onClick={() => setActiveTab('terms')}>📚 Terminology</button>
                    <button className={`tc-tab ${activeTab === 'rules' ? 'active' : ''}`} onClick={() => setActiveTab('rules')}>📏 5 Golden Rules</button>
                    <button className={`tc-tab ${activeTab === 'quiz' ? 'active' : ''}`} onClick={() => setActiveTab('quiz')}>🧪 Test Prep</button>
                </div>

                {activeTab !== 'quiz' ? (
                    <div className="tc-lexicon-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 360px) 1fr', gap: 16, alignItems: 'start' }}>
                        <aside className="tc-selector" style={{
                            background: 'rgba(255,255,255,0.7)', padding: '14px', borderRadius: 20, border: '1px solid rgba(0,0,0,0.05)',
                            display: 'grid', gridTemplateColumns: activeTab === 'terms' ? '1fr 1fr' : '1fr', gap: 10, backdropFilter: 'blur(10px)'
                        }}>
                            {activeTab === 'terms' ? (
                                TERMS.map((term, i) => {
                                    const isActive = selectedIdx === i;
                                    return (
                                        <button key={i} className={`tc-term-btn ${isActive ? 'active' : ''}`} onClick={() => setSelectedIdx(i)}
                                            style={{
                                                background: isActive ? `linear-gradient(135deg, ${term.color}, ${term.color}dd)` : `linear-gradient(135deg, ${term.color}15, ${term.color}05)`,
                                                borderColor: isActive ? term.color : `${term.color}20`,
                                            }}
                                        >
                                            <div style={{ width: 36, height: 36, borderRadius: 10, background: isActive ? 'rgba(255,255,255,0.3)' : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, boxShadow: isActive ? 'none' : '0 2px 5px rgba(0,0,0,0.05)', transition: 'all 0.2s', position: 'relative', zIndex: 1 }}>{term.icon}</div>
                                            <span style={{ fontWeight: 800, fontSize: 14, color: isActive ? '#fff' : 'var(--tc-text)', position: 'relative', zIndex: 1 }}>{term.name}</span>
                                        </button>
                                    );
                                })
                            ) : (
                                FIVE_RULES.map((rule, i) => {
                                    const isActive = selectedRuleIdx === i;
                                    return (
                                        <button key={i} className={`tc-term-btn ${isActive ? 'active' : ''}`} onClick={() => setSelectedRuleIdx(i)}
                                            style={{
                                                background: isActive ? `linear-gradient(135deg, ${rule.color}, ${rule.color}dd)` : `linear-gradient(135deg, ${rule.color}15, ${rule.color}05)`,
                                                borderColor: isActive ? rule.color : `${rule.color}20`, padding: '12px 16px'
                                            }}
                                        >
                                            <div style={{ width: 36, height: 36, borderRadius: 10, background: isActive ? 'rgba(255,255,255,0.3)' : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, color: isActive ? '#fff' : rule.color, fontWeight: 900, position: 'relative', zIndex: 1 }}>{rule.num}</div>
                                            <div style={{ display: 'flex', flexDirection: 'column', position: 'relative', zIndex: 1 }}>
                                                <span style={{ fontWeight: 800, fontSize: 16, color: isActive ? '#fff' : 'var(--tc-text)', lineHeight: 1 }}>Rule {rule.num}</span>
                                                <span style={{ fontSize: 11, fontWeight: 700, color: isActive ? 'rgba(255,255,255,0.8)' : 'var(--tc-muted)', textTransform: 'uppercase', letterSpacing: 0.5, marginTop: 4 }}>{rule.title}</span>
                                            </div>
                                        </button>
                                    );
                                })
                            )}
                        </aside>

                        <main className="tc-details-anim" key={activeTab === 'terms' ? selectedIdx : selectedRuleIdx} style={{
                            background: '#ffffff', borderRadius: 20, padding: '20px 28px', boxShadow: '0 8px 24px rgba(0,0,0,0.03)',
                            border: `2px solid ${(activeTab === 'terms' ? activeTerm : activeRule).color}15`, minHeight: 330
                        }}>
                            {activeTab === 'terms' ? (
                                <>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                                        <div style={{ width: 44, height: 44, borderRadius: 12, background: `${activeTerm.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>{activeTerm.icon}</div>
                                        <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 28, fontWeight: 900, color: activeTerm.color, margin: 0 }}>{activeTerm.name}</h2>
                                    </div>
                                    <p style={{ fontSize: 17, color: 'var(--tc-text)', lineHeight: 1.6, margin: '0 0 24px' }}>{activeTerm.def}</p>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 20 }}>
                                        <div>
                                            <h4 style={{ textTransform: 'uppercase', fontSize: 11, letterSpacing: 1, color: activeTerm.color, marginBottom: 10 }}>Examples</h4>
                                            <div style={{ background: `${activeTerm.color}05`, padding: 16, borderRadius: 16, border: `1px solid ${activeTerm.color}10` }}>
                                                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                                    {activeTerm.examples.map((ex, j) => (
                                                        <code key={j} style={{ background: '#fff', border: `1px solid ${activeTerm.color}20`, color: activeTerm.color, padding: '4px 10px', borderRadius: 8, fontSize: 14 }}>{ex}</code>
                                                    ))}
                                                </div>
                                                <div style={{ marginTop: 12, fontSize: 13, color: 'var(--tc-muted)', fontStyle: 'italic' }}>{activeTerm.inUse}</div>
                                            </div>
                                        </div>
                                        <div>
                                            <h4 style={{ textTransform: 'uppercase', fontSize: 11, letterSpacing: 1, color: 'var(--tc-sky)', marginBottom: 10 }}>Master Hint</h4>
                                            <div style={{ background: 'rgba(2,132,199,0.05)', padding: 16, borderRadius: 16, border: '1px solid rgba(2,132,199,0.1)' }}>
                                                <p style={{ margin: 0, fontSize: 15, color: 'var(--tc-muted)', lineHeight: 1.6 }}><span style={{ fontWeight: 800, color: 'var(--tc-sky)' }}>💡 Hint: </span>{activeTerm.memory}</p>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                                        <div style={{ width: 44, height: 44, borderRadius: 12, background: `${activeRule.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, color: activeRule.color, fontWeight: 900 }}>{activeRule.emoji}</div>
                                        <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 28, fontWeight: 900, color: activeRule.color, margin: 0 }}>Rule {activeRule.num}: {activeRule.title}</h2>
                                    </div>
                                    <div style={{ background: `${activeRule.color}08`, padding: '16px 20px', borderRadius: 12, borderLeft: `5px solid ${activeRule.color}`, marginBottom: 20 }}>
                                        <p style={{ fontSize: 18, fontWeight: 700, color: activeRule.color, margin: 0 }}>{activeRule.rule}</p>
                                    </div>
                                    <p style={{ fontSize: 17, color: 'var(--tc-text)', lineHeight: 1.6, margin: '0 0 24px' }}>{activeRule.detail}</p>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 20 }}>
                                        <div>
                                            <h4 style={{ textTransform: 'uppercase', fontSize: 11, letterSpacing: 1, color: activeRule.color, marginBottom: 10 }}>Practical Examples</h4>
                                            <div style={{ background: '#f8fafc', padding: 16, borderRadius: 16, border: '1px solid rgba(0,0,0,0.04)' }}>
                                                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                                    {activeRule.examples.map((ex, j) => (
                                                        <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                                            <div style={{ width: 6, height: 6, borderRadius: '50%', background: activeRule.color }} />
                                                            <span style={{ fontSize: 15, background: '#fff', padding: '3px 8px', borderRadius: 6, color: 'var(--tc-text)', fontWeight: 600 }}>{ex}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <h4 style={{ textTransform: 'uppercase', fontSize: 11, letterSpacing: 1, color: 'var(--tc-teal)', marginBottom: 10 }}>Survival Tip</h4>
                                            <div style={{ background: 'rgba(13,148,136,0.05)', padding: 16, borderRadius: 16, border: '1px solid rgba(13,148,136,0.1)' }}>
                                                <p style={{ margin: 0, fontSize: 15, color: 'var(--tc-muted)', lineHeight: 1.6 }}><span style={{ fontWeight: 800, color: 'var(--tc-teal)' }}>🛡️ Pro Tip: </span>{activeRule.tip}</p>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}
                        </main>
                    </div>
                ) : (
                    <div className="tc-details-anim tc-quiz-container">
                        {!quizFinished ? (
                            <>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
                                    <div>
                                        <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--tc-amber)', textTransform: 'uppercase', letterSpacing: 1 }}>Question {quizIdx + 1} of 10</div>
                                        <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 24, fontWeight: 800, color: 'var(--tc-text)', margin: 0 }}>Vocabulary Check</h3>
                                    </div>
                                    <div style={{ width: 70, height: 70, borderRadius: '50%', border: '5px solid #f1f5f9', borderTopColor: 'var(--tc-amber)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, fontWeight: 900, color: 'var(--tc-amber)' }}>{quizIdx + 1}/10</div>
                                </div>
                                <div style={{ fontSize: 22, fontWeight: 600, color: 'var(--tc-text)', lineHeight: 1.5, marginBottom: 28 }}>{activeQuiz.question}</div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 28 }}>
                                    {activeQuiz.options.map((opt, oi) => {
                                        let bCol = 'rgba(0,0,0,0.05)';
                                        let bgCol = '#fff';
                                        let txtCol = 'var(--tc-text)';
                                        if (quizAnswered) {
                                            if (oi === activeQuiz.correct) { bCol = 'var(--tc-teal)'; bgCol = 'rgba(13,148,136,0.05)'; txtCol = 'var(--tc-teal)'; }
                                            else if (oi === quizSelected) { bCol = 'var(--tc-wrong)'; bgCol = 'rgba(239,68,68,0.05)'; txtCol = 'var(--tc-wrong)'; }
                                        } else if (quizSelected === oi) { bCol = 'var(--tc-amber)'; bgCol = 'rgba(217,119,6,0.05)'; }
                                        return (
                                            <button key={oi} onClick={() => handleQuizSelect(oi)} disabled={quizAnswered} style={{ padding: '16px 24px', borderRadius: 14, border: `3px solid ${bCol}`, background: bgCol, color: txtCol, fontWeight: quizSelected === oi ? 800 : 600, fontSize: 17, cursor: quizAnswered ? 'default' : 'pointer', transition: 'all 0.2s', textAlign: 'left' }}>
                                                {opt}
                                            </button>
                                        );
                                    })}
                                </div>
                                {quizAnswered && (
                                    <div style={{ background: 'rgba(217,119,6,0.05)', padding: 16, borderRadius: 12, border: '1px solid rgba(217,119,6,0.2)', marginBottom: 24 }}>
                                        <p style={{ margin: 0, fontSize: 14, color: 'var(--tc-muted)', lineHeight: 1.6 }}><strong style={{ color: 'var(--tc-amber)' }}>Solution: </strong>{activeQuiz.explanation}</p>
                                    </div>
                                )}
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <button onClick={nextQuiz} disabled={!quizAnswered} className="tc-btn-primary" style={{ padding: '12px 40px', background: quizAnswered ? 'var(--tc-amber)' : '#f1f5f9', color: quizAnswered ? '#fff' : '#94a3b8', borderRadius: 100, border: 'none', cursor: quizAnswered ? 'pointer' : 'not-allowed' }}>{quizIdx + 1 === 10 ? 'Finish Test' : 'Next Question →'}</button>
                                </div>
                            </>
                        ) : (
                            <div style={{ textAlign: 'center', padding: '20px 0' }}>
                                <div style={{ fontSize: 60, marginBottom: 16 }}>{quizTotalScore >= 8 ? '🏆' : quizTotalScore >= 5 ? '🌟' : '💪'}</div>
                                <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 32, fontWeight: 900, marginBottom: 8 }}>Test Complete!</h2>
                                <p style={{ color: 'var(--tc-muted)', fontSize: 18, marginBottom: 32 }}>Your Vocabulary Score: <span style={{ color: 'var(--tc-amber)', fontWeight: 900 }}>{quizTotalScore} / 10</span></p>
                                <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
                                    <button className="tc-btn-primary" onClick={resetQuiz}>Try Again</button>
                                    <button className="tc-btn-secondary" onClick={() => navigate('/ticking-clocks/skills')}>Go to Skills 🎯</button>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                <div style={{ marginTop: 16, textAlign: 'center' }}>
                    <button className="tc-btn-primary" onClick={() => navigate('/ticking-clocks/skills')} style={{ padding: '10px 28px', fontSize: 13 }}>Ready to Practice! 🎯</button>
                </div>
            </div>
        </div>
    );
}
