import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../euclids_geometry_9.module.css';
import { LatexText } from '../../../../../LatexText';
import { 
    PointLineSurfaceChart, 
    CoincideAxiomChart, 
    WholePartAxiomChart, 
    Postulate1Chart, 
    Postulate2Chart, 
    Postulate3Chart, 
    Postulate5Chart, 
    Postulate4Chart, 
    EquivVersionsChart 
} from '../components/EGDynamicCharts';

// ─── TERMS DATA ──────────────────────────────────────────────────────────────
const DEFINITION_TERMS = [
    {
        id: 'def1',
        name: 'Definitions & Entities',
        icon: '🌌',
        color: '#0f4c81',
        chart: PointLineSurfaceChart,
        def: 'Euclid listed 23 definitions to lay the foundation of geometry. The basic ones define dimensions:\n\n• **Point**: That which has no part (0 dimensions)\n• **Line**: Breadthless length (1 dimension)\n• **Surface**: That which has length and breadth only (2 dimensions)\n• **Solid**: That which has shape, size, and position (3 dimensions)',
        example: 'A dot drawn on a paper represents a point. An edge of a ruler represents a line segment.',
        realWorld: 'A piece of paper is a surface, but a brick is a solid.',
    },
    {
        id: 'def2',
        name: 'Axioms (Common Notions)',
        icon: '⚖️',
        color: '#10b981',
        chart: CoincideAxiomChart,
        def: 'Assumptions that are universally true in all branches of mathematics (not just geometry).\n\n1. Things equal to the same thing are equal to one another.\n2. If equals are added to equals, the wholes are equal.\n3. If equals are subtracted from equals, the remainders are equal.\n4. Things which coincide are equal.',
        example: 'If $A = B$ and $B = C$, then $A = C$.',
        realWorld: 'If two identical puzzle pieces fit perfectly over one another, they have the exact same area and shape.',
    },
    {
        id: 'def3',
        name: 'The Whole & The Part',
        icon: '🍕',
        color: '#f59e0b',
        chart: WholePartAxiomChart,
        def: "Euclid's 5th Axiom: 'The whole is greater than the part.'\n\nThis is a universal truth applicable to magnitude. If $B$ is a part of $A$, then $A > B$. Also, there implies a third quantity $C$ such that $A = B + C$.",
        example: 'If you take a bite out of an apple, the whole apple was bigger than the bite you took, and bigger than the piece that remains.',
        realWorld: 'A whole continent is always larger in land area than a single country within it.',
    }
];

const POSTULATE_TERMS = [
    {
        id: 'post1',
        name: 'Postulate 1 & 2',
        icon: '📏',
        color: '#6366f1',
        chart: Postulate2Chart, // Postulate2Chart contains a line segment that extends
        def: '**Postulate 1**: A straight line may be drawn from any one point to any other point. (Given two distinct points, there is a unique line passing through them.)\n\n**Postulate 2**: A terminated line can be produced indefinitely. (What we now call a line segment can be extended on both sides to form a line.)',
        example: 'If you have points A and B, you can connect them with exactly one straight path.',
        realWorld: 'Roads or laser beams can theoretically be extended forever in a straight direction.',
    },
    {
        id: 'post2',
        name: 'Postulate 3',
        icon: '⭕',
        color: '#d946ef',
        chart: Postulate3Chart,
        def: '**Postulate 3**: A circle can be drawn with any centre and any radius.',
        example: 'You can use a compass to place the needle at any specific centre point and open the pencil to any width (radius) to draw a perfect circle.',
        realWorld: 'A ripple in a pond spreads out as a perfect circle from the exact point a stone hits the water.',
    },
    {
        id: 'post4_new',
        name: 'Postulate 4',
        icon: '📐',
        color: '#f97316',
        chart: Postulate4Chart,
        def: '**Postulate 4**: All right angles are equal to one another.',
        example: 'No matter where you draw a right angle, or how long its arms are or how it is rotated, its measure is exactly 90 degrees.',
        realWorld: 'The corners of a small book and the corners of a massive square building are both exactly equal to 90 degrees.',
    },
    {
        id: 'post3',
        name: 'Euclid\'s Fifth Postulate',
        icon: '⚠️',
        color: '#ef4444',
        chart: Postulate5Chart,
        def: 'If a straight line falling on two straight lines makes the interior angles on the same side of it taken together less than two right angles, then the two straight lines, if produced indefinitely, meet on that side on which the sum of angles is less than two right angles.',
        example: 'If angles $\\alpha + \\beta < 180^\\circ$ on the right side of the transversal, the lines will eventually intersect on the right side.',
        realWorld: 'Lines merging on a highway if not perfectly parallel.',
    },
    {
        id: 'post4',
        name: 'Equivalent Versions',
        icon: '🚊',
        color: '#1f2937',
        chart: EquivVersionsChart,
        def: '**Playfair\'s Axiom**: For every line $L$ and for every point $P$ not lying on $L$, there exists a unique line $M$ passing through $P$ and parallel to $L$.\n\nTwo distinct intersecting lines cannot both be parallel to the same line.',
        example: 'Through a point outside a given line, you can only draw exactly ONE parallel line.',
        realWorld: 'Train tracks: If you stand at a point beside a track, only one straight set of secondary tracks can be built through your point that will never crash into the main track.',
    }
];

const KEY_IDEAS = [
    {
        title: 'Euclid\'s Definitions & Axioms',
        icon: '📖',
        color: '#0f4c81',
        rules: [
            {
                title: 'Definitions',
                chart: PointLineSurfaceChart,
                f: '\\text{Point (0D)} \\rightarrow \\text{Line (1D)} \\rightarrow \\text{Surface (2D)}',
                d: 'Euclid started geometry by defining common terms. A point has no size. A line has only length. A surface has length and width. The boundaries of surfaces are lines, and the ends of lines are points.',
                tip: 'Euclid\'s definitions are descriptive rather than mathematically rigorous by modern standards, but they laid the logical groundwork for geometry.',
                ex: 'A sheet of paper acts as a surface. Its edges are lines. The corners where edges meet are points.',
            },
            {
                title: 'Axioms (Common Notions)',
                chart: CoincideAxiomChart,
                f: 'A = B \\text{ and } B = C \\implies A = C',
                d: 'Axioms are basic facts taken for granted without proof, applying to ALL branches of mathematics. They deal with equality, addition, subtraction, coinciding objects, and wholes/parts.',
                tip: 'An easy trick to remember: Axiom starts with A, meaning "Applies to All" (all math).',
                ex: 'If Area of Triangle 1 = Area of Rectangle, and Area of Rectangle = Area of Triangle 2, then Area of Triangle 1 = Area of Triangle 2.',
            },
        ],
    },
    {
        title: 'Euclid\'s Postulates',
        icon: '📐',
        color: '#6366f1',
        rules: [
            {
                title: 'Postulates 1–4',
                chart: Postulate3Chart,
                f: '\\text{Geometry Specific Assumptions}',
                d: 'Postulates are assumptions specific only to Geometry. They state that we can connect two points, infinitely extend a line, draw a circle anywhere with any radius, and that all right angles are equal.',
                tip: 'Postulate starts with P, meaning "Pertains to Positional" (shapes/space geometry).',
                ex: 'Postulate 1 guarantees that if you give me ANY two cities on a flat map, I can draw exactly one straight line connecting them.',
            },
            {
                title: 'The Fifth Postulate',
                chart: Postulate5Chart,
                f: '\\angle 1 + \\angle 2 < 180^\\circ \\implies \\text{Lines Intersect}',
                d: 'The most famous postulate! It explains when two lines will intersect. If a line cuts across two other lines, check the interior angles on one side. If their sum is strictly less than 180 degrees, the lines will eventually crash into each other on that side.',
                tip: 'If the sum is exactly 180 degrees on both sides, the lines will NEVER intersect (they are parallel).',
                ex: 'If the interior angles are 90° and 85° (sum = 175°), the lines are leaning towards each other and will meet.',
            },
        ],
    },
];

// ─── HELPER ──────────────────────────────────────────────────────────────────
const renderMarkdownLatex = (str) => {
    if (!str) return null;
    return str.split('**').map((part, i) => {
        if (i % 2 === 1) return <strong key={i} style={{color: '#0f172a', fontWeight: 800}}><LatexText text={part} /></strong>;
        return <LatexText key={i} text={part} />;
    });
};

// ─── COMPONENT ───────────────────────────────────────────────────────────────
export default function EuclidsGeometry9Terminology() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('defs');
    const [selectedDefItem, setSelectedDefItem] = useState(DEFINITION_TERMS[0]);
    const [selectedPostItem, setSelectedPostItem] = useState(POSTULATE_TERMS[0]);
    const [selectedKeyIdea, setSelectedKeyIdea] = useState(0);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className={styles['page']} style={window.innerWidth > 900 ? { height: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden' } : { display: 'flex', flexDirection: 'column' }}>
            <nav className={styles['nav']} style={{ position: 'sticky', top: 0, zIndex: 100 }}>
                <button className={styles['nav-back']} onClick={() => navigate('/practice/class-9/euclids-geometry')}>
                    ← Back to Module
                </button>
                <div className={styles['nav-links']}>
                    <button className={styles['nav-link']} onClick={() => navigate('/practice/class-9/euclids-geometry/intro')}>
                        🌟 Introduction
                    </button>
                    <button className={`${styles['nav-link']} ${styles['nav-link--active']}`}>
                        📖 Terminology
                    </button>
                    <button className={styles['nav-link']} onClick={() => navigate('/practice/class-9/euclids-geometry/skills')}>
                        🎯 Skills
                    </button>
                </div>
            </nav>

            <div className={styles['term-layout']}>
                {/* ── LEFT COLUMN: TABS & LIST ── */}
                <div className={styles['term-left']}>
                    <div className={styles['term-tabs']}>
                        <button
                            className={`${styles['term-tab']} ${activeTab === 'defs' ? styles['term-tab--active'] : ''}`}
                            onClick={() => setActiveTab('defs')}
                        >
                            Defs & Axioms
                        </button>
                        <button
                            className={`${styles['term-tab']} ${activeTab === 'posts' ? styles['term-tab--active'] : ''}`}
                            onClick={() => setActiveTab('posts')}
                        >
                            Postulates
                        </button>
                        <button
                            className={`${styles['term-tab']} ${activeTab === 'keys' ? styles['term-tab--active'] : ''}`}
                            onClick={() => setActiveTab('keys')}
                        >
                            Key Ideas
                        </button>
                    </div>

                    <div className={styles['term-list-container']}>
                        {activeTab === 'defs' && DEFINITION_TERMS.map((item) => (
                            <button
                                key={item.id}
                                className={`${styles['term-list-item']} ${selectedDefItem.id === item.id ? styles['term-list-item--active'] : ''}`}
                                onClick={() => setSelectedDefItem(item)}
                            >
                                <div className={styles['term-list-icon']} style={{ background: `${item.color}15` }}>{item.icon}</div>
                                <div className={styles['term-list-label']}>{item.name}</div>
                            </button>
                        ))}
                        {activeTab === 'posts' && POSTULATE_TERMS.map((item) => (
                            <button
                                key={item.id}
                                className={`${styles['term-list-item']} ${selectedPostItem.id === item.id ? styles['term-list-item--active'] : ''}`}
                                onClick={() => setSelectedPostItem(item)}
                            >
                                <div className={styles['term-list-icon']} style={{ background: `${item.color}15` }}>{item.icon}</div>
                                <div className={styles['term-list-label']}>{item.name}</div>
                            </button>
                        ))}
                        {activeTab === 'keys' && KEY_IDEAS.map((idea, idx) => (
                            <button
                                key={idx}
                                className={`${styles['term-list-item']} ${selectedKeyIdea === idx ? styles['term-list-item--active'] : ''}`}
                                onClick={() => setSelectedKeyIdea(idx)}
                            >
                                <div className={styles['term-list-icon']} style={{ background: `${idea.color}15` }}>{idea.icon}</div>
                                <div className={styles['term-list-label']}>{idea.title}</div>
                            </button>
                        ))}
                        {activeTab === 'keys' && (
                            <div style={{ marginTop: 20, textAlign: 'center' }}>
                                <button
                                    className={styles['btn-primary']}
                                    onClick={() => navigate('/practice/class-9/euclids-geometry/skills')}
                                >
                                    Practice Now →
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* ── RIGHT COLUMN: DETAILS ── */}
                <div className={styles['term-right']}>
                    {activeTab !== 'keys' && (
                        <div
                            key={(activeTab === 'defs' ? selectedDefItem.id : selectedPostItem.id)}
                            className={styles['term-detail-card']}
                            style={{ animation: 'fadeSlideIn 0.4s ease both' }}
                        >
                            <div
                                className={styles['term-detail-header']}
                                style={{ background: `${(activeTab === 'defs' ? selectedDefItem.color : selectedPostItem.color)}10` }}
                            >
                                <div
                                    className={styles['term-detail-icon']}
                                    style={{ background: `${(activeTab === 'defs' ? selectedDefItem.color : selectedPostItem.color)}20` }}
                                >
                                    {(activeTab === 'defs' ? selectedDefItem.icon : selectedPostItem.icon)}
                                </div>
                                <h2
                                    className={styles['term-detail-title']}
                                    style={{ color: (activeTab === 'defs' ? selectedDefItem.color : selectedPostItem.color) }}
                                >
                                    {(activeTab === 'defs' ? selectedDefItem.name : selectedPostItem.name)}
                                </h2>
                            </div>
                            <div className={styles['term-detail-body']}>
                                <div className={styles['term-detail-def']}>
                                    {renderMarkdownLatex(activeTab === 'defs' ? selectedDefItem.def : selectedPostItem.def)}
                                </div>

                                {/* Custom Graphical Chart */}
                                {((activeTab === 'defs' ? selectedDefItem.chart : selectedPostItem.chart)) && (
                                    <div style={{ margin: '24px 0', padding: '16px', background: '#f8fafc', borderRadius: '16px', border: '1px solid #e2e8f0', display: 'flex', justifyContent: 'center' }}>
                                        {React.createElement((activeTab === 'defs' ? selectedDefItem.chart : selectedPostItem.chart))}
                                    </div>
                                )}

                                <div className={styles['term-grid-2']}>
                                    <div className={styles['term-box']}>
                                        <div className={styles['term-box-title']}>Example</div>
                                        <div className={styles['term-box-content']}>
                                            <LatexText text={(activeTab === 'defs' ? selectedDefItem.example : selectedPostItem.example)} />
                                        </div>
                                    </div>
                                    <div className={styles['term-box']} style={{ background: '#fdf4ff' }}>
                                        <div className={styles['term-box-title']}>In Real Life</div>
                                        <div className={styles['term-box-content']}>
                                            <LatexText text={(activeTab === 'defs' ? selectedDefItem.realWorld : selectedPostItem.realWorld)} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    {activeTab === 'keys' && (() => {
                        const idea = KEY_IDEAS[selectedKeyIdea];
                        return (
                            <div className={styles['term-detail-card']} style={{ animation: 'fadeSlideIn 0.4s ease both' }}>
                                <div className={styles['term-detail-header']} style={{ background: `${idea.color}10` }}>
                                    <div className={styles['term-detail-icon']} style={{ background: `${idea.color}20` }}>{idea.icon}</div>
                                    <h2 className={styles['term-detail-title']} style={{ color: idea.color }}>{idea.title}</h2>
                                </div>
                                <div className={styles['term-detail-body']} style={{ paddingTop: 40 }}>
                                    {idea.rules.map((rule, rIdx) => (
                                        <div key={rIdx} className={styles['ki-rule']} style={{ paddingTop: rIdx === 0 ? 0 : 32, marginTop: rIdx === 0 ? 0 : 32, borderTop: rIdx === 0 ? 'none' : '1px solid #f1f5f9' }}>
                                            <div className={styles['ki-rule-title']} style={{ fontSize: 20, marginBottom: 16 }}>{rule.title}</div>
                                            {rule.chart && (
                                                <div style={{ marginBottom: 24, padding: 24, background: '#f8fafc', borderRadius: 16, border: '1px solid #e2e8f0', display: 'flex', justifyContent: 'center' }}>
                                                    {React.createElement(rule.chart)}
                                                </div>
                                            )}
                                            <div className={styles['ki-rule-math']} style={{ fontSize: 16, marginBottom: 16 }}>
                                                <LatexText text={`$${rule.f}$`} />
                                            </div>
                                            <div className={styles['ki-rule-desc']} style={{ fontSize: 16, lineHeight: 1.7, marginBottom: 16, color: '#334155' }}>
                                                <LatexText text={rule.d} />
                                            </div>
                                            {rule.tip && (
                                                <div className={styles['ki-rule-tip']} style={{ fontSize: 14, padding: 16, borderRadius: 12 }}>
                                                    <strong>💡 Trick:</strong> <LatexText text={rule.tip} />
                                                </div>
                                            )}
                                            {rule.ex && (
                                                <div className={styles['ki-rule-example']} style={{ fontSize: 14, padding: 16, borderRadius: 12 }}>
                                                    <strong>Example:</strong> <LatexText text={rule.ex} />
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })()}
                </div>
            </div>
        </div>
    );
}
