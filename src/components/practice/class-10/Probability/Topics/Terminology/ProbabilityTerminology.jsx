import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../probability.css';
import MathRenderer from '../../../../../MathRenderer';
import { useSessionLogger } from '@/hooks/useSessionLogger';
import { NODE_IDS } from '@/lib/curriculumIds';

const TERMS = [
    {
        name: 'Random Experiment',
        color: '#6366f1',
        icon: '🎲',
        visualEmoji: '🎲',
        def: 'An experiment or a process for which the outcome cannot be predicted with certainty.',
        formula: '$\\text{e.g., Tossing a coin}$',
        example: 'Rolling a die without knowing which face will land up.',
        memory: 'Random = "Unpredictable Result"'
    },
    {
        name: 'Outcome',
        color: '#0891b2',
        icon: '🎯',
        visualEmoji: '🎯',
        def: 'A possible result of a random experiment.',
        formula: '$\\text{e.g., Getting a "Head"}$',
        example: 'When tossing a coin, "Head" is one outcome and "Tail" is the other.',
        memory: 'Outcome = "What comes out!"'
    },
    {
        name: 'Sample Space',
        color: '#f59e0b',
        icon: '📦',
        visualEmoji: '📦',
        def: 'The set of all possible outcomes of a random experiment.',
        formula: '$S = \\{H, T\\}$',
        example: 'For a die, $S = \\{1, 2, 3, 4, 5, 6\\}$.',
        memory: 'Space = "Everything possible"'
    },
    {
        name: 'Event',
        color: '#10b981',
        icon: '🏷️',
        visualEmoji: '🏷️',
        def: 'A collection of some outcomes of a random experiment. It is a subset of the sample space.',
        formula: '$E \\subseteq S$',
        example: 'Getting an even number on a die ($E = \\{2, 4, 6\\}$).',
        memory: 'Event = "What we want to happen"'
    },
    {
        name: 'Equally Likely Occurrences',
        color: '#ec4899',
        icon: '⚖️',
        visualEmoji: '⚖️',
        def: 'Outcomes that have the exact same chance of occurring.',
        formula: '$P(O_1) = P(O_2) = \\dots$',
        example: 'A fair coin gives Head and Tail with equal likelihood (50-50).',
        memory: 'Equally Likely = "Fair Game"'
    },
    {
        name: 'Theoretical Probability',
        color: '#8b5cf6',
        icon: '📐',
        visualEmoji: '📐',
        def: 'The ratio of the number of favorable outcomes to the total number of possible outcomes.',
        formula: '$P(E) = \\frac{\\text{Favorable}}{\\text{Total}}$',
        example: '$P(\\text{Head}) = \\frac{1}{2}$',
        memory: 'Probability = Want / Total'
    },
    {
        name: 'Sure Event',
        color: '#f43f5e',
        icon: '💯',
        visualEmoji: '💯',
        def: 'An event that is certain to happen. Its probability is always 1.',
        formula: '$P(E) = 1$',
        example: 'Rolling a number less than 7 on a standard 6-sided die.',
        memory: 'Sure = "100% Guarantee"'
    },
    {
        name: 'Impossible Event',
        color: '#06b6d4',
        icon: '🚫',
        visualEmoji: '🚫',
        def: 'An event that cannot possibly happen. Its probability is always 0.',
        formula: '$P(E) = 0$',
        example: 'Rolling an 8 on a standard 6-sided die.',
        memory: 'Impossible = "0 Chance"'
    },
    {
        name: 'Complementary Event',
        color: '#be185d',
        icon: '🔄',
        visualEmoji: '🔄',
        def: 'The event "$E$ does NOT occur", denoted as $\\bar{E}$.',
        formula: '$P(E) + P(\\bar{E}) = 1$',
        example: 'If $P(\\text{Rain}) = 0.3$, then $P(\\text{No Rain}) = 0.7$.',
        memory: 'Complement = "The Opposite"'
    },
    {
        name: 'Deck of Cards',
        color: '#eab308',
        icon: '🃏',
        visualEmoji: '🃏',
        def: 'A standard deck has 52 cards, divided into 4 suits (Hearts, Diamonds, Clubs, Spades) of 13 cards each.',
        formula: '$\\text{Total} = 52$',
        example: '2 Red suits (Hearts, Diamonds), 2 Black suits (Clubs, Spades).',
        memory: '4 Suits × 13 Cards = 52 Total'
    },
];

const RULES = [
    {
        num: 1,
        title: 'Probability Bounds',
        rule: 'The probability of any event $E$ always lies between 0 and 1, inclusive.',
        emoji: '📏',
        color: '#6366f1',
        detail: 'Because the number of favorable outcomes can never be less than 0, and can never exceed the total number of outcomes, the fraction is always between 0 and 1.',
        examples: ['$0 \\le P(E) \\le 1$', '$P(E) = 1.5 \\text{ is INCORRECT}$'],
        tip: 'If you calculate a probability greater than 1 or less than 0, you made a mistake!'
    },
    {
        num: 2,
        title: 'Sum of All Elementary Events',
        rule: 'The sum of the probabilities of all the elementary events of an experiment is 1.',
        emoji: '🥇',
        color: '#0891b2',
        detail: 'An elementary event is an event having only one outcome of the experiment. If you add up the probabilities of every single possible separate outcome, they must total 100% (or 1).',
        examples: ['$P(H) + P(T) = \\frac{1}{2} + \\frac{1}{2} = 1$', '$P(1) + P(2) + \\dots + P(6) = 1$'],
        tip: 'All individual chances combine to form the whole (1)!'
    },
    {
        num: 3,
        title: 'Complementary Events',
        rule: 'The probability of an event happening plus it NOT happening is exactly 1.',
        emoji: '🔄',
        color: '#f59e0b',
        detail: 'For any event $E$, $P(E) + P(\\bar{E}) = 1$. This means the probability of $"E" \\text{ not happening" is } 1 - P(E)$.',
        examples: ['$P(\\bar{E}) = 1 - P(E)$', 'If $P(\\text{win}) = 0.4$, $P(\\text{loss}) = 0.6$'],
        tip: 'Use this shortcut if calculating the "not" event is easier than calculating the event itself!'
    },
    {
        num: 4,
        title: 'Playing Cards Distribution',
        rule: 'A deck of 52 cards consists of 26 Red and 26 Black cards.',
        emoji: '🃏',
        color: '#10b981',
        detail: 'There are 4 suits: Hearts (red, 13), Diamonds (red, 13), Spades (black, 13), Clubs (black, 13). Each suit has an Ace, 2-10, Jack, Queen, King.',
        examples: ['Face Cards = 3 per suit, 12 total', '$P(\\text{Red Card}) = \\frac{26}{52} = \\frac{1}{2}$'],
        tip: 'Remember there are exactly 12 Face Cards (Jack, Queen, King in 4 suits. Ace is NOT a face card).'
    },
    {
        num: 5,
        title: 'Theoretical Probability Formula',
        rule: 'Calculate probability by dividing Favorable by Total possible.',
        emoji: '📝',
        color: '#ec4899',
        detail: 'This classical definition of probability assumes all outcomes of the experiment are equally likely.',
        examples: ['$P(E) = \\frac{\\text{Num of outcomes favorable to } E}{\\text{Total num of possible outcomes}}$'],
        tip: 'Always identify the Total Sample Space size first (the Denominator) before finding Favorable outcomes.'
    }
];

const QUIZ = [
    { q: "What is the probability of a sure event?", opts: ["$0$", "$1$", "$\\frac{1}{2}$", "Undefined"], corr: 1, exp: "A sure event is guaranteed to happen, so its probability is $1$ (or 100%)." },
    { q: "Which of the following cannot be the probability of an event?", opts: ["$\\frac{2}{3}$", "$-1.5$", "$15\\%$", "$0.7$"], corr: 1, exp: "Rule 1 states that probability must be between 0 and 1. It can never be negative." },
    { q: "If $P(E) = 0.05$, what is the probability of 'not $E$'?", opts: ["$0.95$", "$0.05$", "$0.9$", "$1$"], corr: 0, exp: "$P(\\bar{E}) = 1 - P(E) = 1 - 0.05 = 0.95$." },
    { q: "What is the probability of rolling a number greater than 6 on a single die?", opts: ["$1$", "$\\frac{1}{6}$", "$0$", "$\\frac{1}{2}$"], corr: 2, exp: "This is an impossible event because a die only has numbers 1 to 6. So $P(E) = 0$." },
    { q: "The sum of the probabilities of all elementary events of an experiment is:", opts: ["$0$", "$0.5$", "$1$", "$2$"], corr: 2, exp: "Rule 2 states that all possible elementary outcomes always sum to $1$." },
    { q: "How many Face Cards are there in a standard deck of 52 cards?", opts: ["$4$", "$10$", "$12$", "$13$"], corr: 2, exp: "There are 3 Face Cards (Jack, Queen, King) in each of the 4 suits. $3 \\times 4 = 12$." },
    { q: "A bag has 3 red and 5 black balls. Finding probability of red ball?", opts: ["$\\frac{3}{5}$", "$\\frac{5}{8}$", "$\\frac{3}{8}$", "$\\frac{1}{8}$"], corr: 2, exp: "Total balls = $3 + 5 = 8$. Favorable for red = $3$. Thus $P(\\text{Red}) = \\frac{3}{8}$." },
    { q: "In a single coin toss, what are the equally likely outcomes?", opts: ["Head and Tail", "Head only", "Tail only", "Neither"], corr: 0, exp: "Both Head and Tail have a 50% chance of occurring, making them equally likely." },
    { q: "If $P(E) = 1$, then event $E$ is known as a:", opts: ["Possible Event", "Sure Event", "Impossible Event", "Complementary Event"], corr: 1, exp: "An event with a probability of 1 is termed a Sure Event." },
    { q: "What is the probability of drawing a red face card from a standard deck?", opts: ["$\\frac{3}{52}$", "$\\frac{6}{52}$", "$\\frac{12}{52}$", "$\\frac{26}{52}$"], corr: 1, exp: "There are 2 red suits (Hearts, Diamonds), each with 3 face cards. $2 \\times 3 = 6$. So $P = \\frac{6}{52}$." }
];

export default function ProbabilityTerminology() {
    const navigate = useNavigate();
    const [view, setView] = useState('terms'); // 'terms' | 'rules' | 'quiz'
    const [selectedIdx, setSelectedIdx] = useState(0);
    const [selectedRuleIdx, setSelectedRuleIdx] = useState(0);

    // Quiz state
    const [quizIdx, setQuizIdx] = useState(0);
    const [ansSelected, setAnsSelected] = useState(null);
    const [answered, setAnswered] = useState(false);
    const [score, setScore] = useState(0);
    const [finished, setFinished] = useState(false);

    const { startSession, logAnswer, finishSession } = useSessionLogger();
    const v4Answers = React.useRef([]);

    React.useEffect(() => {
        document.body.classList.add('hide-main-footer');
        return () => document.body.classList.remove('hide-main-footer');
    }, []);

    const term = TERMS[selectedIdx];
    const activeRule = RULES[selectedRuleIdx];

    const handleAns = (idx) => {
        if (answered) return;
        setAnsSelected(idx);
        setAnswered(true);

        const currentQ = QUIZ[quizIdx];
        const isCorrect = idx === currentQ.corr;

        const answerData = {
            question_index: quizIdx,
            answer_json: {
                question: currentQ.q,
                selected: currentQ.opts[idx],
                correct: currentQ.opts[currentQ.corr]
            },
            is_correct: isCorrect ? 1 : 0,
        };

        v4Answers.current[quizIdx] = answerData;
        logAnswer(answerData);

        if (isCorrect) setScore(s => s + 1);
    };

    const nextQ = () => {
        if (quizIdx + 1 < QUIZ.length) {
            setQuizIdx(i => i + 1);
            setAnsSelected(null);
            setAnswered(false);
        } else {
            setFinished(true);
            finishSession({
                totalQuestions: QUIZ.length,
                questionsAnswered: v4Answers.current.filter(Boolean).length,
                answersPayload: v4Answers.current.filter(Boolean)
            });
        }
    };

    // Session Start when switching to quiz view
    React.useEffect(() => {
        if (view === 'quiz' && !finished) {
            startSession({
                nodeId: NODE_IDS.g10MathProbTerminologyQuiz,
                sessionType: 'practice'
            });
        }
    }, [view, finished, startSession]);

    return (
        <div className="prob-terminology-page">
            <nav className="prob-intro-nav">
                <button className="prob-intro-nav-back" onClick={() => navigate('/senior/grade/10/probability')}>← Back to Hub</button>
                <div className="prob-intro-nav-links">
                    <button className="prob-intro-nav-link" onClick={() => navigate('/senior/grade/10/probability/introduction')}>🌟 Introduction</button>
                    <button className="prob-intro-nav-link prob-intro-nav-link--active" onClick={() => navigate('/senior/grade/10/probability/terminology')}>📖 Terminology</button>
                    <button className="prob-intro-nav-link" onClick={() => navigate('/senior/grade/10/probability/skills')}>🎯 Skills</button>
                </div>
            </nav>

            <div className="res-container" style={{ maxWidth: 1100, margin: '0 auto', padding: '0 16px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: 4 }}>
                    <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.2rem', fontWeight: 900, color: '#0f172a', margin: '0' }}>
                        Probability <span style={{ color: 'var(--prob-secondary)' }}>Vocabulary</span>
                    </h1>
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginBottom: 4 }}>
                    <button className={`prob-tab ${view === 'terms' ? 'active' : ''}`} style={{ padding: '4px 12px', fontSize: 12 }} onClick={() => setView('terms')}>📚 Terminology</button>
                    <button className={`prob-tab ${view === 'rules' ? 'active' : ''}`} style={{ padding: '4px 12px', fontSize: 12 }} onClick={() => setView('rules')}>📏 5 Rules</button>
                    <button className={`prob-tab ${view === 'quiz' ? 'active' : ''}`} style={{ padding: '4px 12px', fontSize: 12 }} onClick={() => setView('quiz')}>🧪 Quiz</button>
                </div>

                {view === 'terms' && (
                    <div className="res-fade-in prob-lexicon-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(280px, 320px) 1fr', gap: 12, alignItems: 'start' }}>
                        <aside className="prob-selector-container" style={{
                            background: 'rgba(255,255,255,0.7)', padding: '10px', borderRadius: 20, border: '1px solid rgba(0,0,0,0.05)',
                            display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, backdropFilter: 'blur(10px)',
                            alignContent: 'start'
                        }}>
                            {TERMS.map((t, i) => {
                                const isActive = selectedIdx === i;
                                return (
                                    <button
                                        key={i}
                                        className={`prob-term-btn-mini ${isActive ? 'active' : ''}`}
                                        onClick={() => setSelectedIdx(i)}
                                        style={{
                                            background: `linear-gradient(135deg, ${t.color}15, ${t.color}05)`,
                                            borderColor: isActive ? t.color : `${t.color}20`,
                                            gridColumn: i === TERMS.length - 1 && TERMS.length % 2 !== 0 ? 'span 2' : 'span 1',
                                            justifyContent: i === TERMS.length - 1 && TERMS.length % 2 !== 0 ? 'center' : 'flex-start',
                                            padding: '6px 10px', position: 'relative', overflow: 'hidden', border: '1.5px solid', borderRadius: 12, cursor: 'pointer', transition: 'all 0.2s', textAlign: 'left', display: 'flex', alignItems: 'center', gap: 4, flexDirection: 'column'
                                        }}
                                    >
                                        <div style={{ fontSize: 20, padding: '2px', position: 'relative', zIndex: 1, filter: isActive ? 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' : 'none' }}>{t.visualEmoji || t.icon}</div>
                                        <div style={{ fontWeight: 800, fontSize: 10, color: isActive ? '#fff' : '#1e293b', textAlign: 'center', lineHeight: 1.1, position: 'relative', zIndex: 1 }}>{t.name.split(' (')[0]}</div>
                                        {isActive && <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(135deg, ${t.color}, ${t.color}dd)`, zIndex: 0 }} />}
                                    </button>
                                );
                            })}
                        </aside>

                        <main className="prob-details-window-anim" key={selectedIdx} style={{
                            background: '#ffffff', borderRadius: 20, padding: 0, boxShadow: '0 8px 32px rgba(0,0,0,0.04)',
                            border: `2px solid ${term.color}40`, display: 'flex', flexDirection: 'column', overflow: 'hidden', height: '100%'
                        }}>
                             <div className="term-featured-card" style={{ border: 'none', background: 'transparent', boxShadow: 'none', borderRadius: 0, margin: 0, height: '100%', alignItems: 'stretch' }}>
                                 <div className="term-visual-zone" style={{ position: 'relative', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <div className="term-visual-emoji">{term.visualEmoji || term.icon}</div>
                                 </div>

                                 <div className="term-content-zone" style={{ padding: '0 0 0 10px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                    <span className="term-badge" style={{ background: term.color + '15', color: term.color, marginBottom: 6, padding: '2px 8px', fontSize: 10 }}>Definition</span>
                                    <h2 style={{ fontSize: 22, fontWeight: 900, color: '#0f172a', margin: '0 0 4px', lineHeight: 1.1 }}>{term.name}</h2>
                                    <p style={{ fontSize: 13, lineHeight: 1.4, color: '#475569', marginBottom: 12 }}><MathRenderer text={term.def} /></p>

                                    <div style={{ display: 'flex', gap: 8, marginBottom: 12, flexWrap: 'wrap' }}>
                                        <div style={{ flex: '1 1 120px', background: '#f8fafc', padding: 8, borderRadius: 10, border: '1px solid rgba(0,0,0,0.03)' }}>
                                            <div style={{ fontSize: 9, fontWeight: 800, color: term.color, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 4 }}>Example Match</div>
                                            <div style={{ fontSize: 13, fontWeight: 600, color: '#1e293b' }}><MathRenderer text={term.formula} /></div>
                                        </div>
                                        <div style={{ flex: '2 1 140px', background: '#f8fafc', padding: 8, borderRadius: 10, border: '1px solid rgba(0,0,0,0.03)' }}>
                                            <div style={{ fontSize: 9, fontWeight: 800, color: term.color, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 4 }}>In Practice</div>
                                            <div style={{ fontSize: 12, color: '#64748b', lineHeight: 1.3 }}><MathRenderer text={term.example} /></div>
                                        </div>
                                    </div>

                                    <div style={{ background: term.color + '05', padding: '10px 12px', borderRadius: 10, borderLeft: `4px solid ${term.color}` }}>
                                        <div style={{ fontSize: 12, fontWeight: 600, color: '#1e293b', lineHeight: 1.4 }}>
                                            <span style={{ marginRight: 6 }}>💡</span> <MathRenderer text={term.memory} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </main>
                    </div>
                )}

                {view === 'rules' && (
                    <div className="res-fade-in prob-lexicon-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(240px, 280px) 1fr', gap: 12, alignItems: 'start' }}>
                        <aside className="prob-selector-container" style={{
                            background: 'rgba(255,255,255,0.7)', padding: '8px 10px', borderRadius: 16, border: '1px solid rgba(0,0,0,0.05)',
                            display: 'grid', gridTemplateColumns: '1fr', gap: 6, backdropFilter: 'blur(10px)',
                            alignContent: 'start'
                        }}>
                            {RULES.map((rule, i) => {
                                const isActive = selectedRuleIdx === i;
                                return (
                                    <button key={i} className={`prob-term-btn-mini ${isActive ? 'active' : ''}`} onClick={() => setSelectedRuleIdx(i)}
                                        style={{ background: `linear-gradient(135deg, ${rule.color}15, ${rule.color}05)`, borderColor: isActive ? rule.color : `${rule.color}20`, padding: '8px 12px', position: 'relative', overflow: 'hidden', border: '1.5px solid rgba(0,0,0,0.06)', borderRadius: 10, cursor: 'pointer', transition: 'all 0.2s', textAlign: 'left', display: 'flex', alignItems: 'center', gap: 10 }}
                                    >
                                        <div style={{ width: 26, height: 26, borderRadius: 6, background: isActive ? rule.color : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, color: isActive ? '#fff' : rule.color, fontWeight: 900, position: 'relative', zIndex: 1 }}>{rule.num}</div>
                                        <div style={{ display: 'flex', flexDirection: 'column', position: 'relative', zIndex: 1 }}>
                                            <span style={{ fontWeight: 800, fontSize: 13, color: isActive ? '#fff' : '#1e293b', lineHeight: 1 }}>Rule {rule.num}</span>
                                            <span style={{ fontSize: 11, fontWeight: 700, color: isActive ? 'rgba(255,255,255,0.8)' : '#64748b', textTransform: 'uppercase', letterSpacing: 0.5, marginTop: 4 }}>
                                                {rule.title}
                                            </span>
                                        </div>
                                        {isActive && <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(135deg, ${rule.color}, ${rule.color}dd)`, zIndex: 0 }} />}
                                    </button>
                                );
                            })}
                        </aside>

                        <main className="prob-details-window-anim" key={selectedRuleIdx} style={{
                            background: '#ffffff', borderRadius: 16, padding: '10px 14px', boxShadow: '0 8px 24px rgba(0,0,0,0.03)',
                            border: `2px solid ${activeRule.color}15`, height: '100%', display: 'flex', flexDirection: 'column', gap: '6px'
                        }}>
                             <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                                <div style={{ width: 26, height: 26, borderRadius: 6, background: `${activeRule.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, color: activeRule.color, fontWeight: 900 }}>{activeRule.emoji}</div>
                                <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 16, fontWeight: 900, color: activeRule.color, margin: 0 }}>Rule {activeRule.num}: <MathRenderer text={activeRule.title} /></h2>
                            </div>
                            <div style={{ background: `${activeRule.color}08`, padding: '8px 10px', borderRadius: 8, borderLeft: `3px solid ${activeRule.color}`, marginBottom: 8 }}>
                                <p style={{ fontSize: 13, fontWeight: 700, color: activeRule.color, margin: 0 }}>
                                    <MathRenderer text={activeRule.rule} />
                                </p>
                            </div>
                            <p style={{ fontSize: 13, color: '#1e293b', lineHeight: 1.3, margin: '0 0 10px' }}>
                                <MathRenderer text={activeRule.detail} />
                            </p>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12 }}>
                                <div>
                                    <h4 style={{ textTransform: 'uppercase', fontSize: 9, letterSpacing: 1, color: activeRule.color, marginBottom: 6 }}>Examples</h4>
                                    <div style={{ background: '#f8fafc', padding: 10, borderRadius: 10, border: '1px solid rgba(0,0,0,0.04)' }}>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                                            {activeRule.examples.map((ex, j) => (
                                                <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                                    <div style={{ width: 4, height: 4, borderRadius: '50%', background: activeRule.color }} />
                                                    <span style={{ fontSize: 12, background: '#fff', padding: '2px 6px', borderRadius: 6, color: '#1e293b', fontWeight: 600 }}>
                                                        <MathRenderer text={ex} />
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <h4 style={{ textTransform: 'uppercase', fontSize: 9, letterSpacing: 1, color: '#14b9a6', marginBottom: 6 }}>Survival Tip</h4>
                                    <div style={{ background: 'rgba(20,184,166,0.05)', padding: 10, borderRadius: 10, border: '1px solid rgba(20,184,166,0.1)' }}>
                                        <p style={{ margin: 0, fontSize: 12, color: '#445163', lineHeight: 1.4 }}><span style={{ fontWeight: 800, color: '#14b9a6' }}>🛡️ Pro Tip: </span><MathRenderer text={activeRule.tip} /></p>
                                    </div>
                                </div>
                            </div>
                        </main>
                    </div>
                )}

                {view === 'quiz' && (
                    <div className="res-fade-in prob-details-window-anim" style={{ maxWidth: 800, margin: '0 auto', background: '#fff', borderRadius: 24, padding: '16px 20px', boxShadow: '0 15px 40px rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.04)' }}>
                        {!finished ? (
                            <>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                                    <div>
                                        <div style={{ fontSize: 10, fontWeight: 800, color: 'var(--prob-secondary)', textTransform: 'uppercase', letterSpacing: 1 }}>Question {quizIdx + 1} of {QUIZ.length}</div>
                                        <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 18, fontWeight: 800, color: '#0f172a', margin: 0 }}>Vocabulary Check</h3>
                                    </div>
                                    <div style={{ width: 40, height: 40, borderRadius: '50%', border: '3px solid #f1f5f9', borderTopColor: 'var(--prob-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 900, color: 'var(--prob-secondary)' }}>{quizIdx + 1}/{QUIZ.length}</div>
                                </div>
                                <div style={{ fontSize: 15, fontWeight: 600, color: '#0f172a', lineHeight: 1.4, marginBottom: 12 }}>
                                    <MathRenderer text={QUIZ[quizIdx].q} />
                                </div>
                                <div className="quiz-options-container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 12 }}>
                                    {QUIZ[quizIdx].opts.map((opt, i) => {
                                        const isSelected = ansSelected === i;
                                        const isCorrect = i === QUIZ[quizIdx].corr;

                                        let borderColor = 'rgba(0,0,0,0.05)';
                                        let bgColor = '#fff';
                                        let textColor = '#0f172a';

                                        if (answered) {
                                            if (isCorrect) {
                                                borderColor = '#10b981';
                                                bgColor = 'rgba(16, 185, 129, 0.05)';
                                                textColor = '#10b981';
                                            } else if (isSelected) {
                                                borderColor = '#ef4444';
                                                bgColor = 'rgba(239, 68, 68, 0.05)';
                                                textColor = '#ef4444';
                                            }
                                        } else if (isSelected) {
                                            borderColor = 'var(--prob-secondary)';
                                            bgColor = 'rgba(14, 165, 233, 0.05)';
                                        }

                                        return (
                                            <button
                                                key={i}
                                                onClick={() => handleAns(i)}
                                                disabled={answered}
                                                style={{
                                                    padding: '10px 14px', borderRadius: '12px', border: `2px solid ${borderColor}`,
                                                    background: bgColor, color: textColor,
                                                    textAlign: 'left', fontWeight: isSelected ? 800 : 600, transition: 'all 0.2s',
                                                    fontSize: '13px', cursor: answered ? 'default' : 'pointer'
                                                }}
                                            >
                                                <MathRenderer text={opt} />
                                            </button>
                                        );
                                    })}
                                </div>
                                {answered && (
                                    <div style={{
                                        background: 'rgba(14, 165, 233, 0.05)', padding: '8px 12px', borderRadius: '12px', marginBottom: '12px',
                                        border: '1px solid rgba(14, 165, 233, 0.2)'
                                    }}>
                                        <p style={{ margin: 0, fontSize: '13px', color: '#64748b', lineHeight: 1.4 }}>
                                            <strong style={{ color: 'var(--prob-secondary)' }}>Solution: </strong>
                                            <MathRenderer text={QUIZ[quizIdx].exp} />
                                        </p>
                                    </div>
                                )}
                                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                                        <button
                                            className="prob-btn-primary"
                                            onClick={nextQ}
                                            disabled={!answered}
                                            style={{
                                                padding: '8px 24px', background: answered ? 'var(--prob-secondary)' : '#f1f5f9',
                                                color: answered ? '#fff' : '#94a3b8', border: 'none', borderRadius: '100px',
                                                fontWeight: 800, fontSize: '13px', cursor: answered ? 'pointer' : 'not-allowed',
                                                transition: 'all 0.2s', boxShadow: answered ? '0 4px 15px rgba(14, 165, 233, 0.3)' : 'none'
                                            }}
                                        >
                                            {quizIdx + 1 === QUIZ.length ? 'Finish Test' : 'Next Question →'}
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <div style={{ textAlign: 'center', padding: '12px 0' }}>
                                    <div style={{ fontSize: 48, marginBottom: 12 }}>{score >= 8 ? '🏆' : score >= 5 ? '🌟' : '💪'}</div>
                                    <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 24, fontWeight: 900, marginBottom: 6, color: 'var(--prob-text)' }}>Test Complete!</h2>
                                    <p style={{ color: '#64748b', fontSize: 16, marginBottom: 24 }}>Your Vocabulary Score: <span style={{ color: 'var(--prob-secondary)', fontWeight: 900 }}>{score} / {QUIZ.length}</span></p>
                                    <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
                                        <button className="prob-btn-primary" style={{ padding: '6px 16px', borderRadius: 100, fontSize: '13px' }} onClick={() => { setFinished(false); setQuizIdx(0); setScore(0); setAnswered(false); setAnsSelected(null); }}>Try Again</button>
                                        <button className="prob-btn-secondary" style={{ padding: '6px 16px', borderRadius: 100, fontSize: '13px' }} onClick={() => navigate('/senior/grade/10/probability/skills')}>Go to Skills 🎯</button>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    <div style={{ marginTop: 2, textAlign: 'center' }}>
                        <button className="prob-btn-primary" onClick={() => navigate('/senior/grade/10/probability/skills')} style={{ padding: '6px 20px', fontSize: 13, borderRadius: 100 }}>Ready to Solve! 🎯</button>
                    </div>
                </div>
            </div >
    );
}
