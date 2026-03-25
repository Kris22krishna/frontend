import React, { useState } from 'react';

/* ─────────────────────────────────────────────────────────────────
   Shared design tokens
───────────────────────────────────────────────────────────────── */
const card = {
    background: '#fff',
    borderRadius: 20,
    border: '1px solid #e2e8f0',
    boxShadow: '0 8px 32px rgba(0,0,0,0.05)',
    overflow: 'hidden',
};

const headerBar = (color) => ({
    padding: '18px 24px',
    background: `linear-gradient(135deg, ${color}15, ${color}08)`,
    borderBottom: `2px solid ${color}20`,
    display: 'flex',
    alignItems: 'center',
    gap: 12,
});

const pill = (color) => ({
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
    background: `${color}15`,
    color,
    border: `1px solid ${color}30`,
    borderRadius: 100,
    padding: '4px 14px',
    fontSize: 11,
    fontWeight: 900,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
});

const btn = (color, variant = 'filled') => ({
    padding: '11px 26px',
    borderRadius: 100,
    fontWeight: 800,
    fontSize: 14,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    border: variant === 'filled' ? 'none' : `1.5px solid ${color}`,
    background: variant === 'filled' ? color : 'transparent',
    color: variant === 'filled' ? '#fff' : color,
    boxShadow: variant === 'filled' ? `0 4px 16px ${color}40` : 'none',
});

/* ─────────────────────────────────────────────────────────────────
   EQUATION BALANCER  (Core Concept 1.1)
───────────────────────────────────────────────────────────────── */
const BALANCER_EQUATIONS = [
    {
        label: 'Burning Magnesium',
        parts: ['Mg', 'O₂', 'MgO'],
        ops:   ['+', '→'],
        answers: [2, 1, 2],
        hints: ['Mg atoms — count on RHS', 'O₂ molecules needed', 'MgO produced'],
        tip: 'MgO has 1 Mg and 1 O. Balance Mg first, then oxygen.',
    },
    {
        label: 'Aluminium + Oxygen',
        parts: ['Al', 'O₂', 'Al₂O₃'],
        ops:   ['+', '→'],
        answers: [4, 3, 2],
        hints: ['Al atoms', 'O₂ molecules', 'Al₂O₃ formed'],
        tip: 'Al₂O₃ has 2 Al and 3 O. Start with Al₂O₃.',
    },
    {
        label: 'Iron + Steam',
        parts: ['Fe', 'H₂O', 'Fe₃O₄', 'H₂'],
        ops:   ['+', '→', '+'],
        answers: [3, 4, 1, 4],
        hints: ['Fe atoms', 'H₂O molecules', 'Fe₃O₄ formed', 'H₂ released'],
        tip: 'Fe₃O₄ has 3 Fe atoms — start there.',
    },
];

export function EquationBalancer({ color = '#f59e0b' }) {
    const [eqIdx, setEqIdx] = useState(0);
    const [inputs, setInputs] = useState(['', '', '', '']);
    const [feedback, setFeedback] = useState(null); // null | { ok: bool, text: string }

    const eq = BALANCER_EQUATIONS[eqIdx];

    const handleInput = (i, val) => {
        const updated = [...inputs];
        updated[i] = val;
        setInputs(updated);
        setFeedback(null);
    };

    const handleCheck = () => {
        const allCorrect = eq.answers.every((ans, i) => parseInt(inputs[i]) === ans);
        setFeedback({
            ok: allCorrect,
            text: allCorrect
                ? '✅ Perfect! Every atom is balanced. Well done!'
                : '❌ Not quite — recount atoms on each side and try again.',
        });
    };

    const nextEq = () => {
        setEqIdx((i) => (i + 1) % BALANCER_EQUATIONS.length);
        setInputs(['', '', '', '']);
        setFeedback(null);
    };

    return (
        <div style={{ ...card, marginTop: 0 }}>
            {/* Header */}
            <div style={headerBar(color)}>
                <span style={{ fontSize: 26 }}>⚖️</span>
                <div>
                    <div style={pill(color)}>Interactive Tool</div>
                    <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: 20, fontWeight: 900, color: '#1e293b', marginTop: 4 }}>
                        Equation Balancer
                    </div>
                </div>
                <div style={{ marginLeft: 'auto', fontSize: 12, fontWeight: 700, color: '#94a3b8' }}>
                    {eqIdx + 1} / {BALANCER_EQUATIONS.length}
                </div>
            </div>

            <div style={{ padding: '28px 28px 24px' }}>
                {/* Equation label */}
                <div style={{ fontSize: 12, fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 20 }}>
                    {eq.label}
                </div>

                {/* Coefficient input row */}
                <div style={{
                    display: 'flex', alignItems: 'center', flexWrap: 'wrap',
                    gap: 10, marginBottom: 24, justifyContent: 'center',
                    background: '#f8fafc', borderRadius: 16, padding: '20px 24px',
                    border: '1px solid #e2e8f0',
                }}>
                    {eq.parts.map((part, i) => (
                        <React.Fragment key={i}>
                            {/* Coefficient input */}
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                                <input
                                    type="number" min="1" max="20"
                                    value={inputs[i] || ''}
                                    onChange={(e) => handleInput(i, e.target.value)}
                                    placeholder="?"
                                    style={{
                                        width: 52, height: 52, textAlign: 'center',
                                        fontSize: 22, fontWeight: 900,
                                        borderRadius: 12, border: `2px solid ${inputs[i] ? color : '#e2e8f0'}`,
                                        background: inputs[i] ? `${color}08` : '#fff',
                                        color: color, outline: 'none',
                                        transition: 'all 0.2s',
                                    }}
                                />
                                <div style={{ fontSize: 10, color: '#94a3b8', fontWeight: 700 }}>{eq.hints[i]}</div>
                            </div>
                            {/* Formula */}
                            <div style={{ fontSize: 20, fontWeight: 800, color: '#1e293b', fontFamily: 'monospace' }}>{part}</div>
                            {/* Operator */}
                            {i < eq.ops.length && (
                                <div style={{ fontSize: 18, fontWeight: 900, color: '#94a3b8', padding: '0 4px' }}>{eq.ops[i]}</div>
                            )}
                        </React.Fragment>
                    ))}
                </div>

                {/* Tip */}
                <div style={{
                    background: `${color}08`, border: `1px solid ${color}20`, borderRadius: 12,
                    padding: '12px 16px', marginBottom: 20, fontSize: 14, color: '#475569',
                }}>
                    <span style={{ fontWeight: 800, color }}>💡 Tip: </span>{eq.tip}
                </div>

                {/* Feedback */}
                {feedback && (
                    <div style={{
                        borderRadius: 12, padding: '12px 18px', marginBottom: 20, fontSize: 14, fontWeight: 700,
                        background: feedback.ok ? '#ecfdf5' : '#fef2f2',
                        border: feedback.ok ? '1px solid #6ee7b7' : '1px solid #fca5a5',
                        color: feedback.ok ? '#065f46' : '#991b1b',
                    }}>
                        {feedback.text}
                    </div>
                )}

                {/* Buttons */}
                <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
                    <button onClick={handleCheck} style={btn(color, 'filled')}>✓ Check Balance</button>
                    <button onClick={nextEq} style={btn(color, 'outline')}>Next Equation →</button>
                </div>
            </div>
        </div>
    );
}

/* ─────────────────────────────────────────────────────────────────
   REACTION TYPE CLASSIFIER  (Core Concept 1.2)
───────────────────────────────────────────────────────────────── */
const REACTION_TYPES = [
    { eq: '2Na + Cl₂ → 2NaCl',                    type: 'Combination Reaction',       icon: '🔗' },
    { eq: '2H₂O → 2H₂ + O₂',                      type: 'Decomposition Reaction',     icon: '💥' },
    { eq: 'Fe + CuSO₄ → FeSO₄ + Cu',              type: 'Displacement Reaction',      icon: '⚡' },
    { eq: 'Na₂SO₄ + BaCl₂ → BaSO₄↓ + 2NaCl',     type: 'Double Displacement Reaction', icon: '🔄' },
    { eq: '2Mg + O₂ → 2MgO',                      type: 'Combination + Oxidation',    icon: '🔥' },
];

const TYPE_OPTIONS = [
    'Combination Reaction',
    'Decomposition Reaction',
    'Displacement Reaction',
    'Double Displacement Reaction',
    'Combination + Oxidation',
];

export function ReactionClassifier({ color = '#0ea5e9' }) {
    const [current, setCurrent] = useState(0);
    const [selected, setSelected] = useState('');
    const [feedback, setFeedback] = useState(null);

    const item = REACTION_TYPES[current];

    const handleCheck = () => {
        if (!selected) { setFeedback({ ok: false, text: 'Please select a reaction type first.' }); return; }
        setFeedback({
            ok: selected === item.type,
            text: selected === item.type
                ? `✅ Correct! This is a ${item.type}.`
                : `❌ Incorrect. This is a ${item.type}. Look at the reactant/product pattern.`,
        });
    };

    const next = () => {
        setCurrent((c) => (c + 1) % REACTION_TYPES.length);
        setSelected('');
        setFeedback(null);
    };

    return (
        <div style={{ ...card, marginTop: 0 }}>
            {/* Header */}
            <div style={headerBar(color)}>
                <span style={{ fontSize: 26 }}>🔍</span>
                <div>
                    <div style={pill(color)}>Interactive Tool</div>
                    <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: 20, fontWeight: 900, color: '#1e293b', marginTop: 4 }}>
                        Reaction Type Classifier
                    </div>
                </div>
                <div style={{ marginLeft: 'auto', fontSize: 12, fontWeight: 700, color: '#94a3b8' }}>
                    {current + 1} / {REACTION_TYPES.length}
                </div>
            </div>

            <div style={{ padding: '28px 28px 24px' }}>
                {/* Progress dots */}
                <div style={{ display: 'flex', gap: 6, marginBottom: 20 }}>
                    {REACTION_TYPES.map((_, i) => (
                        <div key={i} style={{
                            height: 5, flex: 1, borderRadius: 100,
                            background: i <= current ? color : '#e2e8f0',
                            transition: 'background 0.3s ease',
                        }} />
                    ))}
                </div>

                {/* Equation display */}
                <div style={{
                    background: `${color}06`, border: `2px solid ${color}20`, borderRadius: 16,
                    padding: '24px', textAlign: 'center', marginBottom: 24,
                }}>
                    <div style={{ fontSize: 11, fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 10 }}>
                        Classify this reaction
                    </div>
                    <div style={{ fontSize: 22, fontWeight: 900, color: '#1e293b', fontFamily: 'JetBrains Mono, monospace', letterSpacing: 0.5 }}>
                        {item.eq}
                    </div>
                </div>

                {/* Option buttons (2×3 grid) */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 20 }}>
                    {TYPE_OPTIONS.map((opt) => {
                        const isSelected = selected === opt;
                        return (
                            <button key={opt} onClick={() => { setSelected(opt); setFeedback(null); }}
                                style={{
                                    padding: '12px 14px', borderRadius: 12, fontSize: 13, fontWeight: 700,
                                    textAlign: 'center', cursor: 'pointer', transition: 'all 0.2s',
                                    border: `2px solid ${isSelected ? color : '#e2e8f0'}`,
                                    background: isSelected ? `${color}10` : '#fff',
                                    color: isSelected ? color : '#475569',
                                    boxShadow: isSelected ? `0 4px 12px ${color}25` : 'none',
                                }}>
                                {opt}
                            </button>
                        );
                    })}
                </div>

                {/* Feedback */}
                {feedback && (
                    <div style={{
                        borderRadius: 12, padding: '12px 18px', marginBottom: 20, fontSize: 14, fontWeight: 700,
                        background: feedback.ok ? '#ecfdf5' : '#fef2f2',
                        border: feedback.ok ? '1px solid #6ee7b7' : '1px solid #fca5a5',
                        color: feedback.ok ? '#065f46' : '#991b1b',
                    }}>
                        {feedback.text}
                    </div>
                )}

                {/* Buttons */}
                <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
                    <button onClick={handleCheck} style={btn(color, 'filled')}>Check Answer</button>
                    <button onClick={next} style={btn(color, 'outline')}>Next Reaction →</button>
                </div>
            </div>
        </div>
    );
}
