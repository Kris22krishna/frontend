import React, { useState, useCallback } from 'react';

// Common wrapper for minigames
const GameWrapper = ({ title, desc, children, isWin, onReset, color }) => (
    <div style={{ background: '#fff', borderRadius: 24, padding: 32, boxShadow: '0 10px 40px rgba(0,0,0,0.05)', border: `2px solid ${color}30`, textAlign: 'center' }}>
        <h2 style={{ fontSize: 28, color: color, margin: '0 0 12px', fontFamily: 'Outfit, sans-serif' }}>{title}</h2>
        <p style={{ color: '#64748b', marginBottom: 24, fontSize: 16 }}>{desc}</p>

        <div style={{ background: '#f8fafc', padding: 24, borderRadius: 16, border: '1px solid #e2e8f0', minHeight: 300, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            {children}
        </div>

        {isWin && (
            <div style={{ marginTop: 24 }}>
                <div style={{ fontSize: 40, marginBottom: 12 }}>🎉</div>
                <h3 style={{ color: '#10b981', margin: '0 0 16px', fontSize: 24 }}>Great Job!</h3>
                <button onClick={onReset} style={{ padding: '12px 32px', background: color, color: '#fff', borderRadius: 100, border: 'none', fontWeight: 800, fontSize: 16, cursor: 'pointer' }}>
                    Play Again
                </button>
            </div>
        )}
    </div>
);

// ── HELPERS ──────────────────────────────────────────────────────────────────
function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function pick(arr, n) {
    return shuffle(arr).slice(0, n);
}

// ── ALL POSSIBLE FAMILY MEMBERS ───────────────────────────────────────────────
const ALL_FAMILY = [
    { id: 'dadaji', icon: '👴', name: 'Dadaji' },
    { id: 'dadiji', icon: '👵', name: 'Dadiji' },
    { id: 'mausi', icon: '👩', name: 'Mausi' },
    { id: 'bhaiya', icon: '👦', name: 'Bhaiya' },
    { id: 'didi', icon: '👧', name: 'Didi' },
    { id: 'mama', icon: '🧔', name: 'Mama' },
    { id: 'chachi', icon: '🧕', name: 'Chachi' },
    { id: 'nana', icon: '👴', name: 'Nana' },
    { id: 'nani', icon: '👵', name: 'Nani' },
    { id: 'chachu', icon: '👨', name: 'Chachu' },
    { id: 'baby', icon: '👶', name: 'Baby' },
    { id: 'fufa', icon: '🧑', name: 'Fufa' },
];

function makeFamilyRound() {
    return pick(ALL_FAMILY, 4).map(f => ({ ...f, matched: false }));
}

// 1. Family Roles Match Game (randomized each round)
export function FamilyRolesGame({ color }) {
    const [family, setFamily] = useState(makeFamilyRound);
    const [slots, setSlots] = useState(() => shuffle(family));
    const [selectedIcon, setSelectedIcon] = useState(null);

    const reset = useCallback(() => {
        const newFamily = makeFamilyRound();
        setFamily(newFamily);
        setSlots(shuffle(newFamily));
        setSelectedIcon(null);
    }, []);

    const handleIconClick = (id) => {
        if (!family.find(f => f.id === id).matched) setSelectedIcon(id);
    };

    const handleSlotClick = (id) => {
        if (selectedIcon === id) {
            setFamily(prev => prev.map(f => f.id === id ? { ...f, matched: true } : f));
            setSlots(prev => prev.map(s => s.id === id ? { ...s, matched: true } : s));
            setSelectedIcon(null);
        } else if (selectedIcon !== null) {
            setSelectedIcon(null);
        }
    };

    const isWin = family.every(f => f.matched);

    return (
        <GameWrapper
            title="Match the Family!"
            desc="Click a family member, then click their correct name tag."
            isWin={isWin}
            onReset={reset}
            color={color}
        >
            <div style={{ display: 'flex', gap: 24, marginBottom: 40, flexWrap: 'wrap', justifyContent: 'center' }}>
                {family.map(f => (
                    <button
                        key={f.id}
                        onClick={() => handleIconClick(f.id)}
                        style={{
                            fontSize: 50, background: f.matched ? '#dcfce7' : selectedIcon === f.id ? `${color}30` : '#fff',
                            border: `3px solid ${selectedIcon === f.id ? color : f.matched ? '#22c55e' : '#e2e8f0'}`,
                            borderRadius: '50%', width: 80, height: 80, display: 'flex', alignItems: 'center', justifyContent: 'center',
                            cursor: f.matched ? 'default' : 'pointer', transition: 'all 0.2s', opacity: f.matched ? 0.5 : 1
                        }}
                    >
                        {f.icon}
                    </button>
                ))}
            </div>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
                {slots.map(s => (
                    <button
                        key={s.id}
                        onClick={() => handleSlotClick(s.id)}
                        style={{
                            padding: '16px 24px', background: s.matched ? '#10b981' : '#f1f5f9',
                            color: s.matched ? '#fff' : '#475569',
                            border: `2px dashed ${s.matched ? '#10b981' : '#94a3b8'}`,
                            borderRadius: 12, fontSize: 18, fontWeight: 800,
                            cursor: s.matched ? 'default' : 'pointer'
                        }}
                    >
                        {s.name} {s.matched && '✅'}
                    </button>
                ))}
            </div>
        </GameWrapper>
    );
}

// ── ALL RANGOLI CONFIGS ───────────────────────────────────────────────────────
const RANGOLI_DESIGNS = [
    // Traditional 8-petal flower
    {
        name: 'Eight Petal Flower',
        angles: [0, 45, 90, 135, 180, 225, 270, 315],
        petalPath: 'M 100 80 Q 120 40 100 10 Q 80 40 100 80',
        centerR: 20
    },
    // 6-petal flower
    {
        name: 'Six Petal Flower',
        angles: [0, 60, 120, 180, 240, 300],
        petalPath: 'M 100 78 Q 125 38 100 5 Q 75 38 100 78',
        centerR: 22
    },
    // 12-petal star
    {
        name: 'Star Burst',
        angles: [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330],
        petalPath: 'M 100 82 Q 112 55 100 20 Q 88 55 100 82',
        centerR: 18
    },
    // Diamond pattern (4 directional diamonds)
    {
        name: 'Diamond Cross',
        angles: [0, 90, 180, 270],
        petalPath: 'M 100 75 L 115 45 L 100 10 L 85 45 Z',
        centerR: 25
    },
    // Fan burst (10 petals)
    {
        name: 'Sun Fan',
        angles: [0, 36, 72, 108, 144, 180, 216, 252, 288, 324],
        petalPath: 'M 100 80 Q 118 42 100 8 Q 82 42 100 80',
        centerR: 20
    },
];

const PALETTE_SETS = [
    ['#ef4444', '#3b82f6', '#f59e0b', '#10b981', '#ec4899', '#8b5cf6', '#06b6d4', '#84cc16'],
    ['#f97316', '#14b8a6', '#a855f7', '#eab308', '#22c55e', '#f43f5e', '#0ea5e9', '#d946ef'],
    ['#dc2626', '#7c3aed', '#0284c7', '#059669', '#b45309', '#9333ea', '#0891b2', '#4d7c0f'],
    ['#be185d', '#1d4ed8', '#047857', '#92400e', '#6d28d9', '#0e7490', '#15803d', '#b91c1c'],
    ['#fbbf24', '#a78bfa', '#34d399', '#f87171', '#60a5fa', '#fb923c', '#4ade80', '#e879f9'],
];

function makeRangoliRound() {
    const design = RANGOLI_DESIGNS[Math.floor(Math.random() * RANGOLI_DESIGNS.length)];
    const palette = PALETTE_SETS[Math.floor(Math.random() * PALETTE_SETS.length)];
    const paths = design.angles.map((_, i) => ({ id: i + 1, color: '#fff' }));
    return { design, palette, paths };
}

// 2. Rangoli Coloring Game (randomized design + palette each round)
export function RangoliGame({ color }) {
    const [round, setRound] = useState(makeRangoliRound);
    const [selectedColor, setSelectedColor] = useState(() => round.palette[0]);

    const reset = useCallback(() => {
        const newRound = makeRangoliRound();
        setRound(newRound);
        setSelectedColor(newRound.palette[0]);
    }, []);

    const handlePathClick = (id) => {
        setRound(prev => ({
            ...prev,
            paths: prev.paths.map(p => p.id === id ? { ...p, color: selectedColor } : p)
        }));
    };

    const isWin = round.paths.every(p => p.color !== '#fff');

    const centerColors = {
        '#ef4444': '#fcd34d', '#f97316': '#fde68a', '#dc2626': '#fbbf24',
        default: '#fcd34d'
    };
    const centerFill = centerColors[round.palette[0]] || centerColors.default;

    return (
        <GameWrapper
            title={`Rangoli: ${round.design.name}`}
            desc="Select a color and tap the petals to decorate your festival Rangoli!"
            isWin={isWin}
            onReset={reset}
            color={color}
        >
            {/* Color Palette */}
            <div style={{ display: 'flex', gap: 10, marginBottom: 24, flexWrap: 'wrap', justifyContent: 'center' }}>
                {round.palette.map(c => (
                    <button
                        key={c}
                        onClick={() => setSelectedColor(c)}
                        style={{
                            width: 40, height: 40, borderRadius: '50%', background: c,
                            border: `4px solid ${selectedColor === c ? '#1e293b' : 'transparent'}`,
                            cursor: 'pointer', transform: selectedColor === c ? 'scale(1.2)' : 'scale(1)',
                            transition: 'all 0.2s', boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                        }}
                    />
                ))}
            </div>

            {/* SVG Rangoli Design */}
            <svg viewBox="0 0 200 200" width="220" height="220" style={{ overflow: 'visible' }}>
                {/* Center jewel */}
                <circle cx="100" cy="100" r={round.design.centerR} fill={centerFill} stroke="#d97706" strokeWidth="2" />
                {/* Petals */}
                {round.design.angles.map((angle, i) => {
                    const id = i + 1;
                    const pathColor = round.paths.find(p => p.id === id).color;
                    return (
                        <g
                            key={angle}
                            style={{ transform: `rotate(${angle}deg)`, transformOrigin: '100px 100px', cursor: 'pointer' }}
                            onClick={() => handlePathClick(id)}
                        >
                            <path
                                d={round.design.petalPath}
                                fill={pathColor}
                                stroke="#1e293b"
                                strokeWidth="1.5"
                                style={{ transition: 'fill 0.3s' }}
                            />
                        </g>
                    );
                })}
            </svg>

            {/* Current selected color indicator */}
            <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 8, color: '#64748b', fontSize: 14 }}>
                <div style={{ width: 20, height: 20, borderRadius: '50%', background: selectedColor, border: '2px solid #e2e8f0' }} />
                <span>Selected color</span>
            </div>
        </GameWrapper>
    );
}

// 3. Helping Out Sorting Game (unchanged — items are randomized by state init)
export function HelpingOutGame({ color }) {
    const itemsData = [
        { id: 1, icon: '🧸', name: 'Teddy', bin: 'toys', sorted: false },
        { id: 2, icon: '🍌', name: 'Banana Peel', bin: 'trash', sorted: false },
        { id: 3, icon: '👕', name: 'Shirt', bin: 'clothes', sorted: false },
        { id: 4, icon: '🚗', name: 'Toy Car', bin: 'toys', sorted: false },
        { id: 5, icon: '🧦', name: 'Socks', bin: 'clothes', sorted: false },
        { id: 6, icon: '🗑️', name: 'Paper', bin: 'trash', sorted: false },
    ];

    const [items, setItems] = useState(itemsData);
    const [selectedItem, setSelectedItem] = useState(null);

    const handleItemClick = (id) => {
        if (!items.find(i => i.id === id).sorted) setSelectedItem(id);
    };

    const handleBinClick = (binType) => {
        if (selectedItem !== null) {
            const itemObj = items.find(i => i.id === selectedItem);
            if (itemObj.bin === binType) {
                setItems(prev => prev.map(i => i.id === selectedItem ? { ...i, sorted: true } : i));
            }
            setSelectedItem(null);
        }
    };

    const isWin = items.every(i => i.sorted);

    return (
        <GameWrapper
            title="Clean Up Time!"
            desc="Click an item that needs cleaning, then click the correct bin."
            isWin={isWin}
            onReset={() => { setItems(itemsData); setSelectedItem(null); }}
            color={color}
        >
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 40, minHeight: 60 }}>
                {items.filter(i => !i.sorted).map(i => (
                    <button
                        key={i.id}
                        onClick={() => handleItemClick(i.id)}
                        style={{
                            fontSize: 40, background: selectedItem === i.id ? `${color}30` : '#fff',
                            border: `3px solid ${selectedItem === i.id ? color : '#e2e8f0'}`,
                            borderRadius: '16px', width: 70, height: 70, display: 'flex', alignItems: 'center', justifyContent: 'center',
                            cursor: 'pointer', transition: 'all 0.2s'
                        }}
                    >
                        {i.icon}
                    </button>
                ))}
            </div>
            <div style={{ display: 'flex', gap: 24, justifyContent: 'center' }}>
                {[
                    { type: 'toys', label: 'Toy Box', emoji: '📦', bg: '#fef3c7', border: '#f59e0b' },
                    { type: 'trash', label: 'Dustbin', emoji: '🗑️', bg: '#fee2e2', border: '#ef4444' },
                    { type: 'clothes', label: 'Laundry', emoji: '🧺', bg: '#e0e7ff', border: '#6366f1' }
                ].map(b => (
                    <button
                        key={b.type}
                        onClick={() => handleBinClick(b.type)}
                        style={{
                            width: 100, height: 120, background: b.bg, border: `3px dashed ${b.border}`,
                            borderRadius: 16, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                            cursor: 'pointer'
                        }}
                    >
                        <div style={{ fontSize: 40 }}>{b.emoji}</div>
                        <div style={{ fontWeight: 800, color: b.border, marginTop: 8 }}>{b.label}</div>
                    </button>
                ))}
            </div>
        </GameWrapper>
    );
}

// ── ALL POSSIBLE ANIMAL-FOOD COMBOS ──────────────────────────────────────────
const ALL_ANIMALS = [
    { animal: '🐕', type: 'dog', req: 'bone', foodIcon: '🦴', foodLabel: 'Bone' },
    { animal: '🐱', type: 'cat', req: 'fish', foodIcon: '🐟', foodLabel: 'Fish' },
    { animal: '🦜', type: 'parrot', req: 'chilli', foodIcon: '🌶️', foodLabel: 'Chilli' },
    { animal: '🐇', type: 'rabbit', req: 'carrot', foodIcon: '🥕', foodLabel: 'Carrot' },
    { animal: '🐄', type: 'cow', req: 'grass', foodIcon: '🌿', foodLabel: 'Grass' },
    { animal: '🐿️', type: 'squirrel', req: 'nut', foodIcon: '🌰', foodLabel: 'Nut' },
    { animal: '🐘', type: 'elephant', req: 'banana', foodIcon: '🍌', foodLabel: 'Banana' },
    { animal: '🐻', type: 'bear', req: 'honey', foodIcon: '🍯', foodLabel: 'Honey' },
    { animal: '🐸', type: 'frog', req: 'fly', foodIcon: '🦟', foodLabel: 'Fly' },
    { animal: '🦩', type: 'flamingo', req: 'shrimp', foodIcon: '🦐', foodLabel: 'Shrimp' },
    { animal: '🐔', type: 'hen', req: 'grain', foodIcon: '🌾', foodLabel: 'Grain' },
    { animal: '🦊', type: 'fox', req: 'berry', foodIcon: '🫐', foodLabel: 'Berry' },
];

function makeAnimalRound() {
    const selected = pick(ALL_ANIMALS, 3);
    return {
        animals: selected.map(a => ({ ...a, fed: false })),
        foods: selected.map(a => ({ id: a.req, icon: a.foodIcon }))
    };
}

// 4. Feed Animals Game (randomized each round)
export function FeedAnimalsGame({ color }) {
    const [round, setRound] = useState(makeAnimalRound);
    const [selectedFood, setSelectedFood] = useState(null);

    const reset = useCallback(() => {
        setRound(makeAnimalRound());
        setSelectedFood(null);
    }, []);

    const handleAnimalClick = (type) => {
        if (selectedFood) {
            const animalObj = round.animals.find(a => a.type === type);
            if (animalObj && animalObj.req === selectedFood && !animalObj.fed) {
                setRound(prev => ({
                    ...prev,
                    animals: prev.animals.map(a => a.type === type ? { ...a, fed: true } : a)
                }));
                setSelectedFood(null);
            } else {
                setSelectedFood(null);
            }
        }
    };

    const isWin = round.animals.every(a => a.fed);

    return (
        <GameWrapper
            title="Feed the Animals!"
            desc="Select the correct food from the plate and give it to the right animal."
            isWin={isWin}
            onReset={reset}
            color={color}
        >
            {/* Animals */}
            <div style={{ display: 'flex', gap: 32, marginBottom: 40, flexWrap: 'wrap', justifyContent: 'center' }}>
                {round.animals.map(a => (
                    <button
                        key={a.type}
                        onClick={() => handleAnimalClick(a.type)}
                        style={{
                            width: 100, height: 100, borderRadius: '50%', background: a.fed ? '#dcfce7' : '#f1f5f9',
                            border: `4px solid ${a.fed ? '#22c55e' : '#cbd5e1'}`,
                            fontSize: 50, display: 'flex', alignItems: 'center', justifyContent: 'center',
                            cursor: a.fed ? 'default' : 'pointer', position: 'relative',
                            flexDirection: 'column', gap: 2
                        }}
                    >
                        {a.animal}
                        {a.fed && <div style={{ position: 'absolute', bottom: -10, right: -10, fontSize: 24 }}>💖</div>}
                    </button>
                ))}
            </div>

            {/* Food plate */}
            <div style={{ display: 'flex', gap: 16, background: '#fef3c7', padding: '16px 32px', borderRadius: 100, border: '2px solid #fde68a' }}>
                {round.foods.map(f => {
                    const isFed = round.animals.find(a => a.req === f.id)?.fed;
                    return (
                        <button
                            key={f.id}
                            onClick={() => !isFed && setSelectedFood(f.id)}
                            disabled={isFed}
                            style={{
                                fontSize: 40, background: selectedFood === f.id ? '#fff' : 'transparent',
                                border: `2px solid ${selectedFood === f.id ? '#f59e0b' : 'transparent'}`,
                                borderRadius: '50%', width: 60, height: 60, display: 'flex', alignItems: 'center', justifyContent: 'center',
                                cursor: isFed ? 'not-allowed' : 'pointer',
                                opacity: isFed ? 0.3 : 1,
                                transform: selectedFood === f.id ? 'scale(1.15)' : 'scale(1)',
                                transition: 'all 0.2s'
                            }}
                        >
                            {f.icon}
                        </button>
                    );
                })}
            </div>
        </GameWrapper>
    );
}

// Master component mapper
export default function InteractiveGameMapper({ skillId, color }) {
    if (skillId === 'playing-together') return <RangoliGame color={color} />;
    if (skillId === 'helping-out') return <HelpingOutGame color={color} />;
    if (skillId === 'animals-surroundings') return <FeedAnimalsGame color={color} />;
    return <FamilyRolesGame color={color} />;
}
