import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../herons_formula_9.module.css';
import { LatexText } from '../../../../../LatexText';

const KEY_TERMS = [
    {
        id: 'semi-perimeter',
        title: 'Semi-Perimeter',
        icon: '📏',
        desc: 'Half of the total perimeter of the shape.',
        details: `The semi-perimeter, denoted by $s$, is the most crucial variable in Heron's Formula. It is simply the sum of all three sides divided by 2:
        
$s = \\frac{a+b+c}{2}$`,
        color: '#0f4c81',
        svg: (color) => (
            <svg viewBox="0 0 100 120" width="100%" height="240" style={{ maxWidth: 220, display: 'block', margin: '0 auto' }}>
                <path d="M 20 80 L 80 80 L 50 20 Z" fill="rgba(0,0,0,0.05)" stroke="#64748b" strokeWidth="2" strokeDasharray="4 4" />
                <path d="M 20 80 L 80 80 L 50 20" fill="none" stroke={color} strokeWidth="4" />
                <text x="50" y="88" fontSize="10" fill={color} textAnchor="middle" fontWeight="bold">a</text>
                <text x="30" y="45" fontSize="10" fill={color} textAnchor="end" fontWeight="bold">b</text>
                <text x="70" y="45" fontSize="10" fill={color} textAnchor="start" fontWeight="bold">c</text>
                <rect x="10" y="100" width="80" height="18" fill={`${color}20`} rx="4" />
                <text x="50" y="112" fontSize="10" fill={color} textAnchor="middle" fontWeight="bold">s = ½(a+b+c)</text>
            </svg>
        ),
    },
    {
        id: 'scalene',
        title: 'Scalene Triangle',
        icon: '📐',
        desc: 'A triangle where all three sides have different lengths.',
        details: 'This is the triangle where Heron\'s Formula shines the brightest. Because all three sides are different, calculating the height is complex. With Heron\'s Formula, we bypass the need for height entirely.',
        color: '#1a237e',
        svg: (color) => (
            <svg viewBox="0 0 100 100" width="100%" height="200" style={{ maxWidth: 200, display: 'block', margin: '0 auto' }}>
                <path d="M 10 90 L 90 80 L 30 20 Z" fill={`${color}20`} stroke={color} strokeWidth="3" />
                <text x="50" y="90" fontSize="10" fill={color} textAnchor="middle">a = 8</text>
                <text x="15" y="55" fontSize="10" fill={color} textAnchor="middle">b = 7</text>
                <text x="65" y="45" fontSize="10" fill={color} textAnchor="middle">c = 9</text>
            </svg>
        ),
    },
    {
        id: 'equilateral',
        title: 'Equilateral Triangle',
        icon: '🔺',
        desc: 'A triangle where all three sides are exactly the same length.',
        details: `While you can use Heron\'s Formula here (it works perfectly!), there is a faster shortcut derived from Heron\'s:
        
$\\text{Area} = \\frac{\\sqrt{3}}{4} a^2$`,
        color: '#b71c1c',
        svg: (color) => (
            <svg viewBox="0 0 100 100" width="100%" height="200" style={{ maxWidth: 200, display: 'block', margin: '0 auto' }}>
                <path d="M 15 85 L 85 85 L 50 25 Z" fill={`${color}20`} stroke={color} strokeWidth="3" />
                <text x="50" y="95" fontSize="10" fill={color} textAnchor="middle" fontWeight="bold">a</text>
                <text x="25" y="55" fontSize="10" fill={color} textAnchor="middle" fontWeight="bold">a</text>
                <text x="75" y="55" fontSize="10" fill={color} textAnchor="middle" fontWeight="bold">a</text>
            </svg>
        ),
    },
    {
        id: 'isosceles',
        title: 'Isosceles Triangle',
        icon: '🎪',
        desc: 'A triangle with at least two equal sides.',
        details: 'You can use Heron\'s Formula easily, remembering that two of the side variables ($a, b, c$) will be the same number. Splitting the triangle down the middle to find the height with the Pythagorean Theorem is also a common method.',
        color: '#6a1b9a',
        svg: (color) => (
            <svg viewBox="0 0 100 100" width="100%" height="200" style={{ maxWidth: 200, display: 'block', margin: '0 auto' }}>
                <path d="M 25 85 L 75 85 L 50 15 Z" fill={`${color}20`} stroke={color} strokeWidth="3" />
                <path d="M 50 15 L 50 85" stroke={color} strokeWidth="2" strokeDasharray="4 4" />
                <text x="35" y="50" fontSize="10" fill={color} textAnchor="middle" fontWeight="bold">a</text>
                <text x="65" y="50" fontSize="10" fill={color} textAnchor="middle" fontWeight="bold">a</text>
                <text x="50" y="95" fontSize="10" fill={color} textAnchor="middle" fontWeight="bold">b</text>
            </svg>
        ),
    },
     {
        id: 'right',
        title: 'Right-Angled Triangle',
        icon: '📐',
        desc: 'A triangle containing a perfectly $90^{\\circ}$ angle.',
        details: 'Heron\'s Formula works, but it\'s usually unnecessary. Because the two legs making up the $90^{\\circ}$ angle serve as the perfectly perpendicular base and height, you just use $\\frac{1}{2}bh$.',
        color: '#e65100',
        svg: (color) => (
            <svg viewBox="0 0 100 100" width="100%" height="200" style={{ maxWidth: 200, display: 'block', margin: '0 auto' }}>
                <path d="M 20 80 L 80 80 L 20 20 Z" fill={`${color}20`} stroke={color} strokeWidth="3" />
                <rect x="20" y="70" width="10" height="10" fill="none" stroke={color} strokeWidth="1" />
                <text x="50" y="90" fontSize="10" fill={color} textAnchor="middle">Base (b)</text>
                <text x="10" y="50" fontSize="10" fill={color} textAnchor="middle" transform="rotate(-90 10 50)">Height (h)</text>
            </svg>
        ),
    }
];

const IDEAS = [
    {
        id: 'core-formula',
        title: 'The Core Formula',
        desc: 'Understanding the structure of the equation.',
        content: `Once you have calculated the semi-perimeter $s$, the formula requires taking the square root of four pieces multiplied together:
        
        1. $s$
        2. $(s - a)$ - The difference between semi-perimeter and side $a$
        3. $(s - b)$ - The difference between semi-perimeter and side $b$
        4. $(s - c)$ - The difference between semi-perimeter and side $c$
        
        Formula: $\\text{Area} = \\sqrt{s(s-a)(s-b)(s-c)}$`,
        svg: (
            <svg viewBox="0 0 200 60" width="100%" style={{ maxWidth: 400, display: 'block', margin: '20px auto' }}>
                <rect x="0" y="0" width="200" height="60" fill="#f8fafc" rx="8" stroke="#0f766e" strokeWidth="2" />
                <text x="100" y="36" fontSize="16" fill="#0f766e" textAnchor="middle" fontWeight="bold">Area = √( s(s-a)(s-b)(s-c) )</text>
            </svg>
        )
    },
    {
        id: 'derived',
        title: 'Equilateral Shortcut Derivation',
        desc: 'How Heron\'s turns into the shortcut.',
        content: `If a triangle is equilateral, then $a = b = c$.
        Thus, $s = \\frac{a+a+a}{2} = \\frac{3a}{2}$.
        
        If we plug this into Heron's:
        $\\sqrt{\\left(\\frac{3a}{2}\\right) \\left(\\frac{3a}{2} - a\\right) \\left(\\frac{3a}{2} - a\\right) \\left(\\frac{3a}{2} - a\\right)}$
        
        $\\sqrt{\\left(\\frac{3a}{2}\\right) \\left(\\frac{a}{2}\\right) \\left(\\frac{a}{2}\\right) \\left(\\frac{a}{2}\\right)} = \\sqrt{\\frac{3a^4}{16}}$
        
        Area = $\\frac{\\sqrt{3}}{4} a^2$`,
        svg: (
             <svg viewBox="0 0 100 80" width="100%" style={{ maxWidth: 200, display: 'block', margin: '20px auto' }}>
                <path d="M 20 70 L 80 70 L 50 18 Z" fill="rgba(15, 118, 110, 0.15)" stroke="#0f766e" strokeWidth="2" />
                <text x="50" y="48" fontSize="11" fill="#0f766e" textAnchor="middle" fontWeight="bold">√3/4 a²</text>
                <text x="50" y="78" fontSize="9" fill="#0f766e" textAnchor="middle" fontWeight="bold">a</text>
                <text x="30" y="42" fontSize="9" fill="#0f766e" textAnchor="end" fontWeight="bold">a</text>
                <text x="70" y="42" fontSize="9" fill="#0f766e" textAnchor="start" fontWeight="bold">a</text>
            </svg>
        )
    },
];

const QUIZ = [
    {
        q: 'If the sides of a triangle are $6\\text{ cm}, 8\\text{ cm},$ and $10\\text{ cm}$, what is the semi-perimeter ($s$)?',
        options: ['$12\\text{ cm}$', '$24\\text{ cm}$', '$48\\text{ cm}$', '$14\\text{ cm}$'],
        ans: 0,
        exp: 'Sum of sides = $6 + 8 + 10 = 24$. Semi-perimeter $s = \\frac{24}{2} = 12$.',
    },
    {
        q: 'What must be true about the semi-perimeter ($s$) compared to any individual side length ($a$, $b$, or $c$)?',
        options: ['$s$ is always smaller than the longest side.', '$s$ must be exactly equal to the shortest side.', '$s$ must always be strictly greater than any single side.', '$s$ multiplied by 2 equals the area.'],
        ans: 2,
        exp: 'Because the sum of any two sides must be strictly greater than the third side, $a+b > c$. Adding $c$ to both sides gives $a+b+c > 2c$. Dividing by 2 gives $s > c$. Therefore, $s$ is always greater than any individual side, ensuring $(s-a)$, $(s-b)$, and $(s-c)$ are always positive numbers.',
    },
    {
        q: 'You are calculating the area of a right-angled triangle mapping $30\\text{m}$, $40\\text{m}$, and $50\\text{m}$. Which method is faster?',
        options: ["Using Heron's Formula.", "Using $\\frac{1}{2} \\times \\text{base} \\times \\text{height}$"],
        ans: 1,
        exp: 'Because it is a right-angled triangle, the legs ($30\\text{m}$ and $40\\text{m}$) act as the base and perpendicular height. Simply calculate $\\frac{1}{2} \\times 30 \\times 40 = 600\\text{m}^2$. Heron\'s formula will yield the same result but requires more arithmetic.',
    },
    {
        q: 'If the semi-perimeter $s=15$, and $(s-a)=5$, $(s-b)=5$, and $(s-c)=5$, what type of triangle is this?',
        options: ['Scalene', 'Isosceles', 'Equilateral', 'Right'],
        ans: 2,
        exp: 'If $(s-a) = (s-b) = (s-c)$, then by logic $a = b = c$, which defines an equilateral triangle (where all sides are equal length).',
    },
    {
        q: 'A triangular park requires a physical boundary fence around it. Which metric do you need to calculate the length of fence required?',
        options: ['The Area', 'The Height', 'The Perimeter', 'The Semi-Perimeter'],
        ans: 2,
        exp: 'A fence encircles the shape, so you need the Perimeter (the sum of the boundary lengths). Area determines the size of the grass inside the park.',
    }
];

export default function HeronsFormula9Terminology() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('terms'); // terms, ideas, quiz
    const [selectedTermIdx, setSelectedTermIdx] = useState(0);
    const [selectedIdeaIdx, setSelectedIdeaIdx] = useState(0);

    const [quizAnswers, setQuizAnswers] = useState({});
    const [quizStatus, setQuizStatus] = useState({}); // { qIdx: 'correct' | 'wrong' }

    return (
        <div className={styles['page']}>
            {/* ── TOP NAV ─────────────────────────────────── */}
            <nav className={styles['nav']} style={{ position: 'sticky', top: 0, zIndex: 100 }}>
                <button className={styles['nav-back']} onClick={() => navigate('/practice/class-9/herons-formula')}>
                    ← Back to Module
                </button>
                <div className={styles['nav-links']}>
                    <button className={styles['nav-link']} onClick={() => navigate('/practice/class-9/herons-formula/intro')}>🌟 Introduction</button>
                    <button className={`${styles['nav-link']} ${styles['nav-link--active']}`}>📖 Terminology</button>
                    <button className={styles['nav-link']} onClick={() => navigate('/practice/class-9/herons-formula/skills')}>🎯 Skills</button>
                </div>
            </nav>

            <div style={{ flex: 1, overflowY: 'auto', padding: '24px 20px', background: '#f8fafc' }}>
                <div style={{ maxWidth: 1000, margin: '0 auto' }}>

                    <div style={{ display: 'flex', gap: 12, marginBottom: 28, flexWrap: 'wrap', justifyContent: 'center' }}>
                        <button className={`${styles['tab']} ${activeTab === 'terms' ? styles['active'] : ''}`} onClick={() => setActiveTab('terms')}>
                            📝 Key Terms
                        </button>
                        <button className={`${styles['tab']} ${activeTab === 'ideas' ? styles['active'] : ''}`} onClick={() => setActiveTab('ideas')}>
                            💡 Key Ideas
                        </button>
                        <button className={`${styles['tab']} ${activeTab === 'quiz' ? styles['active'] : ''}`} onClick={() => setActiveTab('quiz')}>
                            ✅ Test Prep
                        </button>
                    </div>

                    {activeTab === 'terms' && (
                        <div className={styles['learn-grid']}>
                            <aside className={styles['learn-sidebar']}>
                                {KEY_TERMS.map((t, i) => (
                                    <button
                                        key={t.id}
                                        className={`${styles['sidebar-btn']} ${selectedTermIdx === i ? styles['active'] : ''}`}
                                        style={{ '--skill-color': t.color }}
                                        onClick={() => setSelectedTermIdx(i)}
                                    >
                                        <div className={styles['sidebar-btn-icon']}>{t.icon}</div>
                                        <span className={styles['sidebar-btn-title']}>{t.title}</span>
                                    </button>
                                ))}
                            </aside>
                            <main className={`${styles['details-window']} ${styles['details-window-anim']}`} key={selectedTermIdx}>
                                <div className={styles['learn-header-row']}>
                                    <div>
                                        <h2 style={{ fontSize: 24, fontWeight: 900, color: KEY_TERMS[selectedTermIdx].color, margin: '0 0 6px' }}>
                                            {KEY_TERMS[selectedTermIdx].title}
                                        </h2>
                                        <p style={{ fontSize: 16, color: '#475569', margin: 0, fontWeight: 600 }}>
                                            {KEY_TERMS[selectedTermIdx].desc}
                                        </p>
                                    </div>
                                    <div style={{ fontSize: 36 }}>{KEY_TERMS[selectedTermIdx].icon}</div>
                                </div>
                                <div style={{ background: '#f8fafc', padding: 24, borderRadius: 16, border: '1px solid #e2e8f0', marginBottom: 24 }}>
                                    {KEY_TERMS[selectedTermIdx].svg(KEY_TERMS[selectedTermIdx].color)}
                                </div>
                                <p style={{ fontSize: 15, lineHeight: 1.7, color: '#334155', whiteSpace: 'pre-wrap', margin: 0 }}>
                                    <LatexText text={KEY_TERMS[selectedTermIdx].details} />
                                </p>
                            </main>
                        </div>
                    )}

                    {activeTab === 'ideas' && (
                        <div className={styles['learn-grid']}>
                            <aside className={styles['learn-sidebar']}>
                                {IDEAS.map((t, i) => (
                                    <button
                                        key={t.id}
                                        className={`${styles['sidebar-btn']} ${selectedIdeaIdx === i ? styles['active'] : ''}`}
                                        style={{ '--skill-color': '#0f766e' }}
                                        onClick={() => setSelectedIdeaIdx(i)}
                                    >
                                        <div className={styles['sidebar-btn-num']}>{i + 1}</div>
                                        <span className={styles['sidebar-btn-title']}>{t.title}</span>
                                    </button>
                                ))}
                            </aside>
                            <main className={`${styles['details-window']} ${styles['details-window-anim']}`} key={selectedIdeaIdx}>
                                <h2 style={{ fontSize: 24, fontWeight: 900, color: '#0f766e', margin: '0 0 6px' }}>
                                    {IDEAS[selectedIdeaIdx].title}
                                </h2>
                                <p style={{ fontSize: 16, color: '#475569', margin: '0 0 24px', fontWeight: 600 }}>
                                    {IDEAS[selectedIdeaIdx].desc}
                                </p>
                                <div style={{ fontSize: 16, lineHeight: 1.8, color: '#0f172a', whiteSpace: 'pre-wrap', background: '#f8fafc', padding: 24, borderRadius: 16, border: '1px solid rgba(15,118,110,0.1)' }}>
                                    <LatexText text={IDEAS[selectedIdeaIdx].content} />
                                    {IDEAS[selectedIdeaIdx].svg && IDEAS[selectedIdeaIdx].svg}
                                </div>
                            </main>
                        </div>
                    )}

                    {activeTab === 'quiz' && (
                        <div className={styles['quiz-container']}>
                            {QUIZ.map((q, qIdx) => {
                                const st = quizStatus[qIdx];
                                const isAns = st !== undefined;
                                return (
                                    <div key={qIdx} className={styles['quiz-card']} style={{ borderColor: st === 'correct' ? '#10b981' : st === 'wrong' ? '#ef4444' : '#f1f5f9', borderWidth: 2, borderStyle: 'solid' }}>
                                        <h3 style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', margin: '0 0 16px', lineHeight: 1.5 }}>
                                            <LatexText text={`${qIdx + 1}. ${q.q}`} />
                                        </h3>
                                        <div className={styles['quiz-options']}>
                                            {q.options.map((opt, oIdx) => {
                                                const isSel = quizAnswers[qIdx] === oIdx;
                                                const isCorrectOpt = q.ans === oIdx;
                                                
                                                let bg = '#f8fafc';
                                                let bc = '#e2e8f0';
                                                let col = '#334155';

                                                if (isAns) {
                                                    if (isCorrectOpt) {
                                                        bg = '#ecfdf5'; bc = '#10b981'; col = '#065f46';
                                                    } else if (isSel) {
                                                        bg = '#fef2f2'; bc = '#ef4444'; col = '#991b1b';
                                                    }
                                                } else if (isSel) {
                                                    bg = '#e0e7ff'; bc = '#6366f1'; col = '#3730a3';
                                                }

                                                return (
                                                    <button
                                                        key={oIdx}
                                                        disabled={isAns}
                                                        onClick={() => {
                                                            setQuizAnswers(p => ({ ...p, [qIdx]: oIdx }));
                                                            setQuizStatus(p => ({ ...p, [qIdx]: oIdx === q.ans ? 'correct' : 'wrong' }));
                                                        }}
                                                        style={{
                                                            padding: '12px 16px',
                                                            borderRadius: 12,
                                                            background: bg,
                                                            border: `2px solid ${bc}`,
                                                            color: col,
                                                            textAlign: 'left',
                                                            fontSize: 14,
                                                            fontWeight: 600,
                                                            cursor: isAns ? 'default' : 'pointer',
                                                            transition: 'all 0.2s'
                                                        }}
                                                    >
                                                        <LatexText text={opt} />
                                                    </button>
                                                )
                                            })}
                                        </div>
                                        {isAns && (
                                            <div style={{ marginTop: 16, padding: 16, background: st === 'correct' ? '#ecfdf5' : '#f8fafc', borderRadius: 12, border: `1px solid ${st === 'correct' ? '#a7f3d0' : '#e2e8f0'}` }}>
                                                <div style={{ fontSize: 13, fontWeight: 800, color: st === 'correct' ? '#059669' : '#64748b', marginBottom: 4, textTransform: 'uppercase' }}>
                                                    {st === 'correct' ? '🎉 Correct!' : '💡 Explanation'}
                                                </div>
                                                <div style={{ fontSize: 14, color: '#0f172a', lineHeight: 1.6 }}>
                                                    <LatexText text={q.exp} />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                            <div className={styles['learn-footer']} style={{ justifyContent: 'center' }}>
                                <button
                                    className={styles['sidebar-btn']}
                                    style={{ background: '#10b981', color: '#fff', border: 'none', padding: '12px 28px', fontSize: 16, fontWeight: 800, boxShadow: '0 4px 12px rgba(16,185,129,0.3)' }}
                                    onClick={() => navigate('/practice/class-9/herons-formula/skills')}
                                >
                                    Start Skills Training 🚀
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
