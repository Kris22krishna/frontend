import React, { useState } from 'react';

// 7 Words of Algebra
const SEVEN_WORDS = ['Constant', 'Variable', 'Term', 'Coefficient', 'Power', 'Expression', 'Equation'];

// Terminology data
const TERMS = [
    {
        name: 'Constant',
        color: '#6c63ff',
        icon: '🔢',
        def: 'A fixed number that never changes its value. It stands alone — no variable attached!',
        examples: ['3', '−7', '100', '0', '½'],
        inUse: 'In 5x + 3, the number 3 is a constant.',
        memory: 'Think of it as something constant — like the number of days in a week: always 7!'
    },
    {
        name: 'Variable',
        color: '#00d4aa',
        icon: '❓',
        def: 'A letter that represents an unknown or changing quantity. It\'s the mystery number!',
        examples: ['x', 'y', 'n', 'a', 'b'],
        inUse: 'In 5x + 3, the letter x is a variable — its value can change.',
        memory: 'Variable = Variable value — it can vary and change!'
    },
    {
        name: 'Term',
        color: '#f9a825',
        icon: '🧩',
        def: 'A single piece of an expression — either a constant, a variable, or a combination using multiplication/division.',
        examples: ['5x', '−3y²', '7', 'ab', '4/x'],
        inUse: 'In 5x + 3, we have two terms: 5x and 3.',
        memory: 'Terms are like puzzle pieces — each one is a complete piece that combines to make a full picture!'
    },
    {
        name: 'Coefficient',
        color: '#ff6b9d',
        icon: '✖️',
        def: 'The number in front of a variable in a term. It tells you how many times to take the variable.',
        examples: ['5 in 5x', '−3 in −3y', '1 in x (hidden!)', '⅔ in ⅔n'],
        inUse: 'In 5x + 3, the coefficient of x is 5.',
        memory: 'Coefficient = the "chef" who decides how many ingredients (variables) to use!'
    },
    {
        name: 'Power',
        color: '#8b5cf6',
        icon: '⚡',
        def: 'The small raised number that tells you how many times to multiply the base by itself. Also called "exponent".',
        examples: ['x² = x×x', 'y³ = y×y×y', '5² = 25', 'a⁴'],
        inUse: 'In 3x², the power is 2 — so x is multiplied by itself twice.',
        memory: 'Power = superscript — it\'s the tiny number with SUPER strength!'
    },
    {
        name: 'Like Terms',
        color: '#22d9a0',
        icon: '🤝',
        def: 'Terms that have EXACTLY the same variable(s) raised to the SAME power. Only then can they be combined!',
        examples: ['3x and 5x', '−2y² and 7y²', '4ab and −ab'],
        inUse: '3x + 5x = 8x (like terms combined!) but 3x + 5y ≠ 8xy (unlike terms!)',
        memory: 'Like terms = like people — they must share everything (same variable, same power) to join forces!'
    },
    {
        name: 'Unlike Terms',
        color: '#ff8c42',
        icon: '❌',
        def: 'Terms that have different variables OR the same variable raised to different powers. They CANNOT be combined.',
        examples: ['3x and 3y', '5x² and 5x', '4a and 4b'],
        inUse: '3x + 5y² — these are unlike terms and must stay separate.',
        memory: 'Unlike terms are like apples and oranges — different things, can\'t be added together!'
    },
    {
        name: 'Expression',
        color: '#06d6a0',
        icon: '📝',
        def: 'A combination of terms joined by + or − signs. An expression has NO equals sign — it\'s just a mathematical phrase.',
        examples: ['5x + 3', '2a² − 4b + 7', 'x + y + z', '3'],
        inUse: '5x + 3 is an expression. It doesn\'t equal anything yet — it\'s just described!',
        memory: 'An expression is like a phrase — "the red ball" describes something but isn\'t a full sentence (no = sign)!'
    },
    {
        name: 'Equation',
        color: '#e63946',
        icon: '⚖️',
        def: 'A statement that two expressions are EQUAL — it MUST have an equals sign (=). Like a balanced scale!',
        examples: ['2x + 3 = 11', 'y − 5 = 0', 'x² = 9', '3a = 15'],
        inUse: '2x + 3 = 11 is an equation. Our job is to FIND the value of x that makes it balance!',
        memory: 'Equation = equalise! The two sides must balance like a weighing scale — that\'s the whole game!'
    },
];

// 5 Rules data
const FIVE_RULES = [
    {
        num: 1,
        rule: 'Terms are created by combining constants and variables using multiplication or division operations.',
        emoji: '✖️',
        example: '5 × x = 5x (a term)  |  4 ÷ x = 4/x (a term)',
        note: 'Addition or subtraction creates MULTIPLE terms, not one term!'
    },
    {
        num: 2,
        rule: 'Like terms are defined as terms with the same variable AND the same power.',
        emoji: '🤝',
        example: '3x² and 7x² are LIKE (same variable x, same power 2)  |  3x² and 7x are UNLIKE (different powers)',
        note: 'Both conditions must be met — same variable AND same power!'
    },
    {
        num: 3,
        rule: 'Expressions are created by combining terms with plus or minus operations.',
        emoji: '📝',
        example: 'Terms: 3x², 5x, 8  →  Expression: 3x² + 5x − 8',
        note: 'An expression is a collection of terms — no equals sign yet!'
    },
    {
        num: 4,
        rule: 'Like terms can be added and subtracted (their coefficients are combined, variable part stays same).',
        emoji: '➕',
        example: '3x + 5x = 8x  |  7y² − 2y² = 5y²  |  4ab + (−ab) = 3ab',
        note: 'Think of it as: 3 mangoes + 5 mangoes = 8 mangoes (x is the mango!)'
    },
    {
        num: 5,
        rule: 'Solving equations uses the balance method — whatever you do to one side, do to the other!',
        emoji: '⚖️',
        example: 'x + 3 = 11 → subtract 3 from both sides → x = 8',
        note: 'The equal sign is your balance point. Keep both sides equal at every step!'
    },
];

export default function AlgebraTerminology({ onBack }) {
    const [activeTab, setActiveTab] = useState('terms');
    const [expanded, setExpanded] = useState(null);

    return (
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px 60px' }}>

            {/* 7 Words Banner */}
            <div className="alg-7words-banner" style={{
                background: 'linear-gradient(135deg, rgba(108,99,255,0.15), rgba(0,212,170,0.1))',
                border: '1px solid rgba(108,99,255,0.3)',
                borderRadius: 16,
                padding: '32px',
                marginBottom: 36,
                textAlign: 'center'
            }}>
                <div style={{
                    fontSize: 12, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase',
                    color: '#6c63ff', marginBottom: 12
                }}>
                    🔑 Learn Algebra with These 7 Words
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 10, marginBottom: 16 }}>
                    {SEVEN_WORDS.map((w, i) => (
                        <span key={i} style={{
                            background: 'linear-gradient(135deg, #6c63ff, #8b5cf6)',
                            color: '#fff',
                            fontFamily: 'Outfit, sans-serif',
                            fontWeight: 700,
                            fontSize: 15,
                            padding: '8px 18px',
                            borderRadius: 50,
                            boxShadow: '0 4px 12px rgba(108,99,255,0.35)'
                        }}>{w}</span>
                    ))}
                </div>
                <p style={{ color: '#9090bb', fontSize: 14, margin: 0 }}>
                    Master these 7 words and you'll speak the language of Algebra fluently!
                </p>
            </div>

            {/* Tabs */}
            <div style={{ display: 'flex', gap: 12, marginBottom: 36, flexWrap: 'wrap' }}>
                {[
                    { id: 'terms', label: '📚 Terminology (9 Terms)', },
                    { id: 'rules', label: '📏 5 Golden Rules', },
                ].map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        style={{
                            padding: '12px 28px',
                            borderRadius: 50,
                            border: '2px solid ' + (activeTab === tab.id ? 'transparent' : 'rgba(108,99,255,0.3)'),
                            background: activeTab === tab.id
                                ? 'linear-gradient(135deg, #6c63ff, #8b5cf6)'
                                : 'transparent',
                            color: activeTab === tab.id ? '#fff' : '#9090bb',
                            fontWeight: 700,
                            fontSize: 14,
                            cursor: 'pointer',
                            transition: 'all 0.3s',
                            boxShadow: activeTab === tab.id ? '0 0 20px rgba(108,99,255,0.4)' : 'none',
                        }}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* TERMS view */}
            {activeTab === 'terms' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    {TERMS.map((term, idx) => (
                        <div
                            key={idx}
                            onClick={() => setExpanded(expanded === idx ? null : idx)}
                            style={{
                                background: '#1e1e3a',
                                border: `1px solid ${expanded === idx ? term.color + '55' : 'rgba(108,99,255,0.2)'}`,
                                borderRadius: 14,
                                padding: '20px 24px',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                boxShadow: expanded === idx ? `0 0 24px ${term.color}25` : 'none',
                                borderLeft: `4px solid ${term.color}`,
                            }}
                        >
                            {/* Header */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: 14, justifyContent: 'space-between' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                                    <div style={{
                                        width: 44, height: 44, borderRadius: 12,
                                        background: `${term.color}20`, display: 'flex',
                                        alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0
                                    }}>{term.icon}</div>
                                    <div>
                                        <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: 19, fontWeight: 800, color: '#fff' }}>
                                            {term.name}
                                        </div>
                                        <div style={{ fontSize: 13.5, color: '#9090bb', lineHeight: 1.5, maxWidth: 600 }}>
                                            {term.def}
                                        </div>
                                    </div>
                                </div>
                                <div style={{ fontSize: 20, color: '#9090bb', flexShrink: 0 }}>{expanded === idx ? '▲' : '▼'}</div>
                            </div>

                            {/* Expanded content */}
                            {expanded === idx && (
                                <div style={{ marginTop: 20, paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 16 }}>

                                        {/* Examples */}
                                        <div>
                                            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, color: term.color, marginBottom: 10, textTransform: 'uppercase' }}>
                                                Examples
                                            </div>
                                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                                                {term.examples.map((ex, i) => (
                                                    <span key={i} style={{
                                                        fontFamily: 'JetBrains Mono, monospace',
                                                        background: `${term.color}15`,
                                                        border: `1px solid ${term.color}30`,
                                                        color: term.color,
                                                        padding: '5px 12px',
                                                        borderRadius: 8,
                                                        fontSize: 14,
                                                    }}>{ex}</span>
                                                ))}
                                            </div>
                                        </div>

                                        {/* In Use */}
                                        <div>
                                            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, color: '#22d9a0', marginBottom: 10, textTransform: 'uppercase' }}>
                                                In an Expression
                                            </div>
                                            <div style={{
                                                background: 'rgba(34,217,160,0.08)',
                                                border: '1px solid rgba(34,217,160,0.2)',
                                                borderRadius: 8, padding: '10px 14px',
                                                fontSize: 14, color: '#c8c8e8', lineHeight: 1.6,
                                                fontFamily: 'JetBrains Mono, monospace'
                                            }}>
                                                {term.inUse}
                                            </div>
                                        </div>

                                        {/* Memory trick */}
                                        <div style={{ gridColumn: '1 / -1' }}>
                                            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, color: '#f9a825', marginBottom: 10, textTransform: 'uppercase' }}>
                                                🧠 Memory Trick
                                            </div>
                                            <div style={{
                                                background: 'rgba(249,168,37,0.08)',
                                                border: '1px solid rgba(249,168,37,0.2)',
                                                borderRadius: 8, padding: '12px 16px',
                                                fontSize: 14, color: '#e8e8ff', lineHeight: 1.6,
                                                fontStyle: 'italic'
                                            }}>
                                                {term.memory}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {/* RULES view */}
            {activeTab === 'rules' && (
                <div>
                    <div style={{
                        textAlign: 'center', marginBottom: 36,
                        background: 'linear-gradient(135deg, rgba(249,168,37,0.12), rgba(255,107,157,0.08))',
                        border: '1px solid rgba(249,168,37,0.25)', borderRadius: 16, padding: 24
                    }}>
                        <div style={{ fontSize: 40, marginBottom: 8 }}>📏</div>
                        <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 22, fontWeight: 800, color: '#fff', marginBottom: 8 }}>
                            The 5 Golden Rules of Algebra
                        </h3>
                        <p style={{ color: '#9090bb', fontSize: 15, margin: 0 }}>
                            Master these rules and you've mastered the foundation of all Algebra!
                        </p>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                        {FIVE_RULES.map((rule, idx) => (
                            <div
                                key={idx}
                                style={{
                                    display: 'flex', gap: 20,
                                    background: '#1e1e3a',
                                    border: '1px solid rgba(108,99,255,0.2)',
                                    borderRadius: 16, padding: '24px',
                                    transition: 'all 0.3s ease',
                                    alignItems: 'flex-start',
                                }}
                                onMouseEnter={e => {
                                    e.currentTarget.style.borderColor = 'rgba(108,99,255,0.5)';
                                    e.currentTarget.style.transform = 'translateX(8px)';
                                    e.currentTarget.style.boxShadow = '-4px 0 20px rgba(108,99,255,0.25)';
                                }}
                                onMouseLeave={e => {
                                    e.currentTarget.style.borderColor = 'rgba(108,99,255,0.2)';
                                    e.currentTarget.style.transform = 'none';
                                    e.currentTarget.style.boxShadow = 'none';
                                }}
                            >
                                {/* Rule number */}
                                <div style={{
                                    width: 50, height: 50, borderRadius: 14,
                                    background: 'linear-gradient(135deg, #6c63ff, #8b5cf6)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontFamily: 'Outfit, sans-serif', fontSize: 22, fontWeight: 900,
                                    color: '#fff', flexShrink: 0,
                                    boxShadow: '0 4px 14px rgba(108,99,255,0.4)'
                                }}>{rule.num}</div>

                                {/* Rule content */}
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontSize: 16, fontWeight: 600, color: '#fff', lineHeight: 1.65, marginBottom: 14 }}>
                                        {rule.emoji} {rule.rule}
                                    </div>

                                    {/* Example */}
                                    <div style={{
                                        background: 'rgba(0,212,170,0.07)',
                                        border: '1px solid rgba(0,212,170,0.2)',
                                        borderRadius: 10, padding: '12px 16px', marginBottom: 10
                                    }}>
                                        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1.5, color: '#00d4aa', textTransform: 'uppercase', marginBottom: 6 }}>
                                            Example
                                        </div>
                                        <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 14, color: '#c8c8e8', lineHeight: 1.6 }}>
                                            {rule.example}
                                        </div>
                                    </div>

                                    {/* Note */}
                                    <div style={{
                                        background: 'rgba(249,168,37,0.07)',
                                        border: '1px solid rgba(249,168,37,0.2)',
                                        borderRadius: 8, padding: '10px 14px',
                                    }}>
                                        <span style={{ fontSize: 12, color: '#f9a825', fontWeight: 700 }}>💡 Remember: </span>
                                        <span style={{ fontSize: 13, color: '#9090bb' }}>{rule.note}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
