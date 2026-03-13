import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../surface-volumes.css';
import '../../hide-footer.css';
import MathRenderer from '../../../../../MathRenderer';

// Import Assets
import tsaImg from '../../../../../../assets/surface-volumes/tsa.png';
import csaImg from '../../../../../../assets/surface-volumes/csa.png';
import volumeImg from '../../../../../../assets/surface-volumes/volume.png';
import combinedImg from '../../../../../../assets/surface-volumes/combined.png';
import hollowImg from '../../../../../../assets/surface-volumes/hollow.png';
import capacityImg from '../../../../../../assets/surface-volumes/capacity.png';
import slantHeightImg from '../../../../../../assets/surface-volumes/slant_height.png';
import displacementImg from '../../../../../../assets/surface-volumes/displacement.png';
import circumscribedImg from '../../../../../../assets/surface-volumes/circumscribed.png';
import hiddenSurfaceImg from '../../../../../../assets/surface-volumes/hidden_surface.png';

const TERMS = [
    {
        name: 'Total Surface Area (TSA)',
        color: '#6366f1',
        icon: '📦',
        img: tsaImg,
        def: 'The total area of all the faces of a 3D object, including the bases. It counts every square unit on the outer shell.',
        formula: '$2\\pi r(r + h)$ or $6a^2$',
        example: 'To paint the entire outside of a closed gift box, we calculate its TSA.',
        memory: 'TSA = "Total" — covers everything, including the lid!'
    },
    {
        name: 'Curved Surface Area (CSA)',
        color: '#0891b2',
        icon: '🌀',
        img: csaImg,
        def: 'Also called Lateral Surface Area. It is the area of only the curved part of a solid, leaving the flat bases untouched.',
        formula: 'Cylinder: $2\\pi rh$; Cone: $\\pi rl$',
        example: 'Area of the canvas needed for a tent wall (floor not included).',
        memory: 'CSA = "Curved" — imagine just the label on a can.'
    },
    {
        name: 'Volume',
        color: '#f59e0b',
        icon: '🧊',
        img: volumeImg,
        def: 'The amount of 3D space occupied by a solid. It represents the "stuffing" or capacity inside.',
        formula: 'Cylinder: $\\pi r^2h$; Sphere: $\\frac{4}{3}\\pi r^3$',
        example: 'How much water a bottle can hold or iron in a rod.',
        memory: 'Volume = "Space" — the 3D "inside" of the shell.'
    },
    {
        name: 'Combined Solid',
        color: '#ec4899',
        icon: '🧩',
        img: combinedImg,
        def: 'A complex solid formed by joining two or more simple solids. The joins create "hidden" surfaces.',
        formula: 'Sum of individual volumes.',
        example: 'A rocket consists of a cone joined to a cylinder.',
        memory: 'Combined = "Fused" — parts become one single shape.'
    },
    {
        name: 'Hollow Solid',
        color: '#7c3aed',
        icon: '🕳️',
        img: hollowImg,
        def: 'A solid with an empty cavity inside. Its volume is the difference between outer and inner boundaries.',
        formula: '$V_{outer} - V_{inner}$',
        example: 'A metal pipe or a hemispherical bowl.',
        memory: 'Hollow = "Subtract" — minus the part that is empty!'
    },
    {
        name: 'Capacity',
        color: '#10b981',
        icon: '🚰',
        img: capacityImg,
        def: 'The maximum amount of liquid or gas a container can hold. It equals the internal volume of the shell.',
        formula: 'Inner Volume',
        example: 'A jug with a capacity of 1.5 liters.',
        memory: 'Capacity = "Liquid" — how much can be poured in?'
    },
    {
        name: 'Slant Height',
        color: '#ef4444',
        icon: '📐',
        img: slantHeightImg,
        def: 'The diagonal distance from the vertex of a cone to its base edge. Forms a right triangle with R and H.',
        formula: '$l = \\sqrt{r^2 + h^2}$',
        example: 'Used for calculating slant area of cones.',
        memory: 'Slant = "Diagonal" — the long way down a cone!'
    },
    {
        name: 'Displacement',
        color: '#06b6d4',
        icon: '🌊',
        img: displacementImg,
        def: 'The liquid pushed aside when an object is submerged. Volume of water moved = Volume of the object.',
        formula: '$V_{water} = V_{solid}$',
        example: 'Dropping an egg in a full glass of water.',
        memory: 'Displace = "Move" — push out to make room!'
    },
    {
        name: 'Circumscribed',
        color: '#6366f1',
        icon: '⭕',
        img: circumscribedImg,
        def: 'When a solid fits perfectly inside or around another, with their boundaries touching tightly.',
        formula: 'Shared dimensions.',
        example: 'A sphere just fitting inside a cube.',
        memory: 'Circumscribed = "Tightly Wrapped".'
    },
    {
        name: 'Hidden Surface',
        color: '#f97316',
        icon: '🙈',
        img: hiddenSurfaceImg,
        def: 'Surfaces that are "lost" at the join when two pieces are glued together. They aren\'t part of final TSA.',
        formula: 'Subtract Shared Base',
        example: 'Base of a cone joined to a hemisphere.',
        memory: 'Hidden = "Lost" — if you can\'t touch it, don\'t count it!'
    },
];

const RULES = [
    {
        num: 1,
        title: 'TSA $\\neq$ Sum of TSAs',
        rule: 'When joining shapes, the common faces are hidden. The new TSA is the sum of CSAs plus only the exposed bases.',
        emoji: '📉',
        color: '#6366f1',
        detail: 'The most common mistake is adding the total surface areas of two shapes. Remember: if you glue two blocks together, the surfaces that touch are no longer on the "outside"!',
        examples: ['Cone on a Hemisphere: $TSA = CSA_{cone} + CSA_{hemisphere}$', 'Capsule: $TSA = CSA_{cylinder} + 2 \\times CSA_{hemisphere}$'],
        tip: 'If you can\'t touch a surface because it\'s inside the joint, don\'t count it!'
    },
    {
        num: 2,
        title: 'Volume is Constant',
        rule: 'Volume is ALWAYS additive. When you join two solids, the total volume is simply the sum of their individual volumes.',
        emoji: '➕',
        color: '#0891b2',
        detail: 'Unlike surface area, volume doesn\'t care about "hidden" parts. If you have $500$ml of clay in a cube and $200$ml in a pyramid, joining them will always give you $700$ml of clay.',
        examples: ['Total Volume = $V_1 + V_2$', 'Volume of a Toy = $V_{cone} + V_{hemisphere}$'],
        tip: 'Volume is like "stuffing" — it just adds up!'
    },
    {
        num: 3,
        title: 'Hollow = Subtraction',
        rule: 'The volume of a hollow solid or a container with thickness is the Outer Volume minus the Inner Volume.',
        emoji: '🕳️',
        color: '#f59e0b',
        detail: 'Think of a metal pipe. The amount of metal used is the space it occupies. We find the volume of the full cylinder and subtract the volume of the empty "hole".',
        examples: ['Metal in Pipe = $\\pi R^2h - \\pi r^2h$', 'Volume of a Bowl = Outer Hemisphere - Inner Hemisphere'],
        tip: 'Hollow = Space - Hole. Simple as that!'
    },
    {
        num: 4,
        title: 'Common Radius',
        rule: 'In most combined solid problems, the parts that join share the EXACT same radius.',
        emoji: '📏',
        color: '#10b981',
        detail: 'When a cone is mounted on a hemisphere, or a cylinder is topped by a cone, they must fit perfectly. This means $r_{cone} = r_{hemisphere} = r_{cylinder}$.',
        examples: ['Cone radius = Cylinder radius', 'Hemisphere radius = Cone radius'],
        tip: 'Always look for the shared "edge" — it tells you the radius is common!'
    },
    {
        num: 5,
        title: 'Invariance',
        rule: 'When a shape is reformed (melting or digging), the volume remains exactly the same.',
        emoji: '🌍',
        color: '#ec4899',
        detail: 'Whether you melt a sphere to make small cones, or dig mud from a well to make a platform, the volume of material used doesn\'t change.',
        examples: ['Volume of mud dug = Volume of embankment', 'Volume of big sphere = $n \\times$ Volume of small spheres'],
        tip: 'Material is never lost, it just changes shape!'
    }
];

const QUIZ = [
    { q: "Joining a cone to a hemisphere removes how many bases?", opts: ["None", "One", "Two", "Three"], corr: 2, exp: "The base of the cone and the top of the hemisphere join, so two bases become internal." },
    { q: "Which property is additive for combined solids?", opts: ["TSA", "CSA", "Volume", "Slant Height"], corr: 2, exp: "Volume is always additive, regardless of how shapes are joined." },
    { q: "If a sphere is circumscribed inside a cube of side $a$, its diameter is...", opts: ["$a/2$", "$a$", "$2a$", "$a\\sqrt{2}$"], corr: 1, exp: "A circumscribed sphere touches all faces, so its diameter must equal the cube's side length $a$." },
    { q: "What is 'Hidden Surface' in combined solids?", opts: ["The outer shell", "Surfaces lost at the join", "The base of the solid", "The internal cavity"], corr: 1, exp: "Hidden surfaces are the overlapping areas (like joined bases) that are no longer part of the external surface area." },
    { q: "When a solid is melted and recast into another shape, which stays constant?", opts: ["TSA", "CSA", "Volume", "Radius"], corr: 2, exp: "The amount of material (Volume) remains the same during melting/recasting." },
    { q: "A metal pipe is a classic example of which type of solid?", opts: ["Combined Solid", "Hollow Solid", "Simple Solid", "Hidden Solid"], corr: 1, exp: "A pipe has an outer and inner boundary with empty space in between, making it a hollow solid." },
    { q: "The Slant Height ($l$) of a cone forms a right triangle with...", opts: ["Radius and Volume", "Radius and Height", "Height and TSA", "CSA and Base"], corr: 1, exp: "Slant height, vertical height, and radius form a right-angled triangle: $l^2 = r^2 + h^2$." },
    { q: "Capacity of a container is equivalent to its...", opts: ["Total Surface Area", "Internal Volume", "External Volume", "Lateral Area"], corr: 1, exp: "Capacity specifically refers to the internal space available to hold liquid or gas." },
    { q: "In most NCERT problems, combined solids share a...", opts: ["Common Height", "Common Volume", "Common Radius", "Common TSA"], corr: 2, exp: "Rule 4: Standard shapes like a cone on a cylinder usually share the exact same radius at the join." },
    { q: "If an object displaces $50$ ml of water, what is its volume?", opts: ["$5$ $cm^3$", "$25$ $cm^3$", "$50$ $cm^3$", "$100$ $cm^3$"], corr: 2, exp: "Volume of displaced water = Volume of the object ($1$ ml = $1$ $cm^3$)." }
];

export default function Terminology() {
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
        if (idx === QUIZ[quizIdx].corr) setScore(s => s + 1);
    };

    const nextQ = () => {
        if (quizIdx + 1 < QUIZ.length) {
            setQuizIdx(i => i + 1);
            setAnsSelected(null);
            setAnswered(false);
        } else {
            setFinished(true);
        }
    };

    return (
        <div className="terminology-page">
            <nav className="intro-nav">
                <button className="intro-nav-back" onClick={() => navigate('/surface-areas-and-volumes')}>← Hub</button>
                <div className="intro-nav-links">
                    <button className="intro-nav-link" onClick={() => navigate('/surface-areas-and-volumes/introduction')}>🌟 Intro</button>
                    <button className="intro-nav-link intro-nav-link--active">📖 Terminology</button>
                    <button className="intro-nav-link" onClick={() => navigate('/surface-areas-and-volumes/skills')}>🎯 Skills</button>
                </div>
            </nav>

            <div className="res-container" style={{ maxWidth: 1100, margin: '0 auto', padding: '0 16px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: 4 }}>
                    <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.2rem', fontWeight: 900, color: '#0f172a', margin: '0' }}>
                        Surface Areas and Volumes <span style={{ background: 'linear-gradient(135deg, var(--sv-primary), var(--sv-secondary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Vocabulary</span>
                    </h1>
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginBottom: 4 }}>
                    <button className={`alg-tab ${view === 'terms' ? 'active' : ''}`} style={{ padding: '4px 12px', fontSize: 12 }} onClick={() => setView('terms')}>📚 Terminology</button>
                    <button className={`alg-tab ${view === 'rules' ? 'active' : ''}`} style={{ padding: '4px 12px', fontSize: 12 }} onClick={() => setView('rules')}>📏 5 Golden Rules</button>
                    <button className={`alg-tab ${view === 'quiz' ? 'active' : ''}`} style={{ padding: '4px 12px', fontSize: 12 }} onClick={() => setView('quiz')}>🧪 Test Prep</button>
                </div>

                {view === 'terms' && (
                    <div className="res-fade-in alg-lexicon-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(280px, 320px) 1fr', gap: 12, alignItems: 'start' }}>
                        <aside className="selector-container" style={{
                            background: 'rgba(255,255,255,0.7)', padding: '10px', borderRadius: 20, border: '1px solid rgba(0,0,0,0.05)',
                            display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, backdropFilter: 'blur(10px)',
                            alignContent: 'start'
                        }}>
                            {TERMS.map((t, i) => {
                                const isActive = selectedIdx === i;
                                return (
                                    <button
                                        key={i}
                                        className={`term-btn-mini ${isActive ? 'active' : ''}`}
                                        onClick={() => setSelectedIdx(i)}
                                        style={{
                                            background: `linear-gradient(135deg, ${t.color}15, ${t.color}05)`,
                                            borderColor: isActive ? t.color : `${t.color}20`,
                                            gridColumn: i === TERMS.length - 1 && TERMS.length % 2 !== 0 ? 'span 2' : 'span 1',
                                            justifyContent: i === TERMS.length - 1 && TERMS.length % 2 !== 0 ? 'center' : 'flex-start',
                                            padding: '6px 10px', position: 'relative', overflow: 'hidden', border: '1.5px solid', borderRadius: 12, cursor: 'pointer', transition: 'all 0.2s', textAlign: 'left', display: 'flex', alignItems: 'center', gap: 4, flexDirection: 'column'
                                        }}
                                    >
                                        <div style={{ fontSize: 20, padding: '2px', position: 'relative', zIndex: 1, filter: isActive ? 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' : 'none' }}>{t.icon}</div>
                                        <div style={{ fontWeight: 800, fontSize: 10, color: isActive ? '#fff' : '#1e293b', textAlign: 'center', lineHeight: 1.1, position: 'relative', zIndex: 1 }}>{t.name.split(' (')[0]}</div>
                                        {isActive && <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(135deg, ${t.color}, ${t.color}dd)`, zIndex: 0 }} />}
                                    </button>
                                );
                            })}
                        </aside>

                        <main className="details-window-anim" key={selectedIdx} style={{
                            background: '#ffffff', borderRadius: 20, padding: 0, boxShadow: '0 8px 32px rgba(0,0,0,0.04)',
                            border: `2px solid ${term.color}40`, display: 'flex', flexDirection: 'column', overflow: 'hidden', height: '100%'
                        }}>
                            <div className="term-featured-card" style={{ border: 'none', background: 'transparent', boxShadow: 'none', borderRadius: 0, margin: 0, height: '100%', alignItems: 'stretch' }}>
                                <div className="term-visual-zone" style={{ position: 'relative', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <img src={term.img} alt={term.name} className="term-visual-img" style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }} />
                                    <div style={{ position: 'absolute', bottom: 12, right: 12, background: 'rgba(255,255,255,0.9)', padding: '4px 8px', borderRadius: 6, fontSize: 10, fontWeight: 800, color: term.color, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>3D VISUAL</div>
                                </div>

                                <div className="term-content-zone" style={{ padding: '0 0 0 10px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                    <span className="term-badge" style={{ background: term.color + '15', color: term.color, marginBottom: 6, padding: '2px 8px', fontSize: 10 }}>Definition</span>
                                    <h2 style={{ fontSize: 22, fontWeight: 900, color: '#0f172a', margin: '0 0 4px', lineHeight: 1.1 }}>{term.name}</h2>
                                    <p style={{ fontSize: 13, lineHeight: 1.4, color: '#475569', marginBottom: 12 }}>{term.def}</p>

                                    <div style={{ display: 'flex', gap: 8, marginBottom: 12, flexWrap: 'wrap' }}>
                                        <div style={{ flex: '1 1 120px', background: '#f8fafc', padding: 8, borderRadius: 10, border: '1px solid rgba(0,0,0,0.03)' }}>
                                            <div style={{ fontSize: 9, fontWeight: 800, color: term.color, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 4 }}>Formula / Root</div>
                                            <div style={{ fontSize: 13, fontWeight: 600, color: '#1e293b' }}><MathRenderer text={term.formula} /></div>
                                        </div>
                                        <div style={{ flex: '2 1 140px', background: '#f8fafc', padding: 8, borderRadius: 10, border: '1px solid rgba(0,0,0,0.03)' }}>
                                            <div style={{ fontSize: 9, fontWeight: 800, color: term.color, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 4 }}>In Practice</div>
                                            <div style={{ fontSize: 12, color: '#64748b', lineHeight: 1.3 }}>{term.example}</div>
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
                    <div className="alg-lexicon-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(240px, 280px) 1fr', gap: 12, alignItems: 'start' }}>
                        <aside className="selector-container" style={{
                            background: 'rgba(255,255,255,0.7)', padding: '8px 10px', borderRadius: 16, border: '1px solid rgba(0,0,0,0.05)',
                            display: 'grid', gridTemplateColumns: '1fr', gap: 6, backdropFilter: 'blur(10px)',
                            alignContent: 'start'
                        }}>
                            {RULES.map((rule, i) => {
                                const isActive = selectedRuleIdx === i;
                                return (
                                    <button key={i} className={`term-btn-mini ${isActive ? 'active' : ''}`} onClick={() => setSelectedRuleIdx(i)}
                                        style={{ background: `linear-gradient(135deg, ${rule.color}15, ${rule.color}05)`, borderColor: isActive ? rule.color : `${rule.color}20`, padding: '8px 12px', position: 'relative', overflow: 'hidden', border: '1.5px solid rgba(0,0,0,0.06)', borderRadius: 10, cursor: 'pointer', transition: 'all 0.2s', textAlign: 'left', display: 'flex', alignItems: 'center', gap: 10 }}
                                    >
                                        <div style={{ width: 26, height: 26, borderRadius: 6, background: isActive ? rule.color : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, color: isActive ? '#fff' : rule.color, fontWeight: 900, position: 'relative', zIndex: 1 }}>{rule.num}</div>
                                        <div style={{ display: 'flex', flexDirection: 'column', position: 'relative', zIndex: 1 }}>
                                            <span style={{ fontWeight: 800, fontSize: 13, color: isActive ? '#fff' : '#1e293b', lineHeight: 1 }}>Rule {rule.num}</span>
                                            <span style={{ fontSize: 11, fontWeight: 700, color: isActive ? 'rgba(255,255,255,0.8)' : '#64748b', textTransform: 'uppercase', letterSpacing: 0.5, marginTop: 4 }}>
                                                <MathRenderer text={rule.title} />
                                            </span>
                                        </div>
                                        {isActive && <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(135deg, ${rule.color}, ${rule.color}dd)`, zIndex: 0 }} />}
                                    </button>
                                );
                            })}
                        </aside>

                        <main className="details-window-anim" key={selectedRuleIdx} style={{
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
                                    <h4 style={{ textTransform: 'uppercase', fontSize: 9, letterSpacing: 1, color: activeRule.color, marginBottom: 6 }}>Practical Examples</h4>
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
                    <div className="details-window-anim" style={{ maxWidth: 800, margin: '0 auto', background: '#fff', borderRadius: 24, padding: '20px 24px', boxShadow: '0 15px 40px rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.04)' }}>
                        {!finished ? (
                            <>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                                    <div>
                                        <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--sv-secondary)', textTransform: 'uppercase', letterSpacing: 1 }}>Question {quizIdx + 1} of {QUIZ.length}</div>
                                        <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 20, fontWeight: 800, color: '#1e293b', margin: 0 }}>Vocabulary Check</h3>
                                    </div>
                                    <div style={{ width: 48, height: 48, borderRadius: '50%', border: '4px solid #f1f5f9', borderTopColor: 'var(--sv-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 900, color: 'var(--sv-secondary)' }}>{quizIdx + 1}/{QUIZ.length}</div>
                                </div>
                                <div style={{ fontSize: 18, fontWeight: 600, color: '#1e293b', lineHeight: 1.4, marginBottom: 16 }}>
                                    <MathRenderer text={QUIZ[quizIdx].q} />
                                </div>
                                <div className="quiz-options-container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
                                    {QUIZ[quizIdx].opts.map((opt, i) => {
                                        const isSelected = ansSelected === i;
                                        const isCorrect = i === QUIZ[quizIdx].corr;

                                        let borderColor = 'rgba(0,0,0,0.05)';
                                        let bgColor = '#fff';
                                        let textColor = '#1e293b';

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
                                            borderColor = 'var(--sv-secondary)';
                                            bgColor = 'rgba(99, 102, 241, 0.05)';
                                        }

                                        return (
                                            <button
                                                key={i}
                                                onClick={() => handleAns(i)}
                                                disabled={answered}
                                                style={{
                                                    padding: '12px 16px', borderRadius: '14px', border: `2px solid ${borderColor}`,
                                                    background: bgColor, color: textColor,
                                                    textAlign: 'left', fontWeight: isSelected ? 800 : 600, transition: 'all 0.2s',
                                                    fontSize: '15px', cursor: answered ? 'default' : 'pointer'
                                                }}
                                            >
                                                <MathRenderer text={opt} />
                                            </button>
                                        );
                                    })}
                                </div>
                                {answered && (
                                    <div style={{
                                        background: 'rgba(99, 102, 241, 0.05)', padding: '10px 14px', borderRadius: '12px', marginBottom: '16px',
                                        border: '1px solid rgba(99, 102, 241, 0.2)'
                                    }}>
                                        <div style={{ fontSize: '13px', color: '#475569', lineHeight: 1.4 }}>
                                            <strong style={{ color: 'var(--sv-secondary)' }}>Solution: </strong>
                                            <MathRenderer text={QUIZ[quizIdx].exp} />
                                        </div>
                                    </div>
                                )}
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <button
                                        className="alg-btn-primary"
                                        onClick={nextQ}
                                        disabled={!answered}
                                        style={{
                                            padding: '10px 24px', background: answered ? 'var(--sv-secondary)' : '#f8fafc',
                                            color: answered ? '#fff' : '#94a3b8', border: 'none', borderRadius: '100px',
                                            fontWeight: 800, fontSize: '13px', cursor: answered ? 'pointer' : 'not-allowed',
                                            transition: 'all 0.2s', boxShadow: answered ? '0 4px 15px rgba(99, 102, 241, 0.3)' : 'none'
                                        }}
                                    >
                                        {quizIdx + 1 === QUIZ.length ? 'Finish Quiz' : 'Next Question →'}
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div style={{ textAlign: 'center', padding: '20px 0' }}>
                                <div style={{ fontSize: 60, marginBottom: 16 }}>{score >= 8 ? '🏆' : score >= 5 ? '🌟' : '💪'}</div>
                                <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 32, fontWeight: 900, marginBottom: 8, color: 'var(--sv-text)' }}>Test Complete!</h2>
                                <p style={{ color: '#64748b', fontSize: 18, marginBottom: 32 }}>Your Vocabulary Score: <span style={{ color: 'var(--sv-secondary)', fontWeight: 900 }}>{score} / {QUIZ.length}</span></p>
                                <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
                                    <button className="alg-btn-primary" onClick={() => { setFinished(false); setQuizIdx(0); setScore(0); setAnswered(false); setAnsSelected(null); }}>Try Again</button>
                                    <button className="alg-btn-secondary" onClick={() => navigate('/surface-areas-and-volumes/skills')}>Go to Skills 🎯</button>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                <div style={{ marginTop: 4, textAlign: 'center' }}>
                    <button className="alg-btn-primary" onClick={() => navigate('/surface-areas-and-volumes/skills')} style={{ padding: '6px 20px', fontSize: 13, borderRadius: 100 }}>Ready to Solve! 🎯</button>
                </div>
            </div>
        </div >
    );
}
