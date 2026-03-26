import React, { useState } from 'react';

// Common wrapper for minigames
const GameWrapper = ({ title, desc, children, isWin, onReset, color }) => (
    <div style={{ background: '#fff', borderRadius: 24, padding: 32, boxShadow: '0 10px 40px rgba(0,0,0,0.05)', border: `2px solid ${color}30`, textAlign: 'center' }}>
        <h2 style={{ fontSize: 28, color: color, margin: '0 0 12px', fontFamily: 'Outfit, sans-serif' }}>{title}</h2>
        <p style={{ color: '#64748b', marginBottom: 24, fontSize: 16 }}>{desc}</p>
        
        <div style={{ background: '#f8fafc', padding: 24, borderRadius: 16, border: '1px solid #e2e8f0', minHeight: 300, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            {children}
        </div>

        {isWin && (
            <div style={{ marginTop: 24, animation: 'bounce 0.5s' }}>
                <div style={{ fontSize: 40, marginBottom: 12 }}>🎉</div>
                <h3 style={{ color: '#10b981', margin: '0 0 16px', fontSize: 24 }}>Great Job!</h3>
                <button onClick={onReset} style={{ padding: '12px 32px', background: color, color: '#fff', borderRadius: 100, border: 'none', fontWeight: 800, fontSize: 16, cursor: 'pointer' }}>
                    Play Again
                </button>
            </div>
        )}
    </div>
);

// 1. Family Roles Match Game
export function FamilyRolesGame({ color }) {
    const defaultFamily = [
        { id: 'dadaji', icon: '👴', name: 'Dadaji', matched: false },
        { id: 'dadiji', icon: '👵', name: 'Dadiji', matched: false },
        { id: 'mausi', icon: '👩', name: 'Mausi', matched: false },
        { id: 'bhaiya', icon: '👦', name: 'Bhaiya', matched: false }
    ];
    
    // Shuffle slots for matching
    const [slots, setSlots] = useState([...defaultFamily].sort(() => Math.random() - 0.5));
    const [family, setFamily] = useState(defaultFamily);
    const [selectedIcon, setSelectedIcon] = useState(null);

    const handleIconClick = (id) => {
        if (!family.find(f => f.id === id).matched) {
            setSelectedIcon(id);
        }
    };

    const handleSlotClick = (id) => {
        if (selectedIcon === id) {
            setFamily(prev => prev.map(f => f.id === id ? { ...f, matched: true } : f));
            setSlots(prev => prev.map(s => s.id === id ? { ...s, matched: true } : s));
            setSelectedIcon(null);
        } else if (selectedIcon !== null) {
            // Incorrect match
            setSelectedIcon(null);
        }
    };

    const isWin = family.every(f => f.matched);

    return (
        <GameWrapper 
            title="Match the Family!" 
            desc="Click a family member, then click their correct name tag."
            isWin={isWin}
            onReset={() => {
                setFamily(defaultFamily);
                setSlots([...defaultFamily].sort(() => Math.random() - 0.5));
                setSelectedIcon(null);
            }}
            color={color}
        >
            <div style={{ display: 'flex', gap: 24, marginBottom: 40 }}>
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

// 2. Rangoli Coloring Game
export function RangoliGame({ color }) {
    const [paths, setPaths] = useState([
        { id: 1, color: '#fff' }, { id: 2, color: '#fff' }, 
        { id: 3, color: '#fff' }, { id: 4, color: '#fff' },
        { id: 5, color: '#fff' }, { id: 6, color: '#fff' },
        { id: 7, color: '#fff' }, { id: 8, color: '#fff' }
    ]);
    const [selectedColor, setSelectedColor] = useState('#ef4444');
    
    const palette = ['#ef4444', '#3b82f6', '#f59e0b', '#10b981', '#ec4899', '#8b5cf6'];

    const handlePathClick = (id) => {
        setPaths(prev => prev.map(p => p.id === id ? { ...p, color: selectedColor } : p));
    };

    const isWin = paths.every(p => p.color !== '#fff');

    return (
        <GameWrapper 
            title="Rangoli Coloring" 
            desc="Select a color and tap the petals to decorate your festival Rangoli!"
            isWin={isWin}
            onReset={() => setPaths(paths.map(p => ({ ...p, color: '#fff' })))}
            color={color}
        >
            <div style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
                {palette.map(c => (
                    <button 
                        key={c}
                        onClick={() => setSelectedColor(c)}
                        style={{
                            width: 40, height: 40, borderRadius: '50%', background: c,
                            border: `4px solid ${selectedColor === c ? '#1e293b' : 'transparent'}`,
                            cursor: 'pointer', transform: selectedColor === c ? 'scale(1.1)' : 'scale(1)',
                            transition: 'all 0.2s', boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                        }}
                    />
                ))}
            </div>

            <svg viewBox="0 0 200 200" width="200" height="200" style={{ overflow: 'visible' }}>
                <circle cx="100" cy="100" r="20" fill="#fcd34d" stroke="#d97706" strokeWidth="2" />
                {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
                    const id = i + 1;
                    const pathColor = paths.find(p => p.id === id).color;
                    return (
                        <g key={angle} style={{ transform: `rotate(${angle}deg)`, transformOrigin: '100px 100px', cursor: 'pointer' }} onClick={() => handlePathClick(id)}>
                            <path 
                                d="M 100 80 Q 120 40 100 10 Q 80 40 100 80" 
                                fill={pathColor} 
                                stroke="#1e293b" 
                                strokeWidth="2"
                                style={{ transition: 'fill 0.3s' }}
                            />
                        </g>
                    );
                })}
            </svg>
        </GameWrapper>
    );
}

// 3. Helping Out Sorting Game
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
        if (!items.find(i => i.id === id).sorted) {
            setSelectedItem(id);
        }
    };

    const handleBinClick = (binType) => {
        if (selectedItem !== null) {
            const itemObj = items.find(i => i.id === selectedItem);
            if (itemObj.bin === binType) {
                setItems(prev => prev.map(i => i.id === selectedItem ? { ...i, sorted: true } : i));
                setSelectedItem(null);
            } else {
                setSelectedItem(null); // wrong bin
            }
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

// 4. Feed Animals Game
export function FeedAnimalsGame({ color }) {
    const defaultData = [
        { animal: '🐕', type: 'dog', fed: false, req: 'bone' },
        { animal: '🐱', type: 'cat', fed: false, req: 'fish' },
        { animal: '🦜', type: 'parrot', fed: false, req: 'chilli' }
    ];

    const foods = [
        { id: 'bone', icon: '🦴' },
        { id: 'fish', icon: '🐟' },
        { id: 'chilli', icon: '🌶️' }
    ];

    const [animals, setAnimals] = useState(defaultData);
    const [selectedFood, setSelectedFood] = useState(null);

    const handleAnimalClick = (type) => {
        if (selectedFood) {
            const animalObj = animals.find(a => a.type === type);
            if (animalObj.req === selectedFood && !animalObj.fed) {
                setAnimals(prev => prev.map(a => a.type === type ? { ...a, fed: true } : a));
                setSelectedFood(null);
            } else {
                setSelectedFood(null);
            }
        }
    };

    const isWin = animals.every(a => a.fed);

    return (
        <GameWrapper 
            title="Feed the Pets!" 
            desc="Select the correct food from the plate and give it to the right animal."
            isWin={isWin}
            onReset={() => { setAnimals(defaultData); setSelectedFood(null); }}
            color={color}
        >
            {/* Animals */}
            <div style={{ display: 'flex', gap: 32, marginBottom: 40 }}>
                {animals.map(a => (
                    <button
                        key={a.type}
                        onClick={() => handleAnimalClick(a.type)}
                        style={{
                            width: 100, height: 100, borderRadius: '50%', background: a.fed ? '#dcfce7' : '#f1f5f9',
                            border: `4px solid ${a.fed ? '#22c55e' : '#cbd5e1'}`,
                            fontSize: 50, display: 'flex', alignItems: 'center', justifyContent: 'center',
                            cursor: a.fed ? 'default' : 'pointer', position: 'relative'
                        }}
                    >
                        {a.animal}
                        {a.fed && <div style={{ position: 'absolute', bottom: -10, right: -10, fontSize: 24 }}>💖</div>}
                    </button>
                ))}
            </div>

            {/* Food */}
            <div style={{ display: 'flex', gap: 16, background: '#fef3c7', padding: '16px 32px', borderRadius: 100, border: '2px solid #fde68a' }}>
                {foods.map(f => (
                    <button
                        key={f.id}
                        onClick={() => setSelectedFood(f.id)}
                        disabled={animals.find(a => a.req === f.id).fed}
                        style={{
                            fontSize: 40, background: selectedFood === f.id ? '#fff' : 'transparent',
                            border: `2px solid ${selectedFood === f.id ? '#f59e0b' : 'transparent'}`,
                            borderRadius: '50%', width: 60, height: 60, display: 'flex', alignItems: 'center', justifyContent: 'center',
                            cursor: animals.find(a => a.req === f.id).fed ? 'not-allowed' : 'pointer',
                            opacity: animals.find(a => a.req === f.id).fed ? 0.3 : 1
                        }}
                    >
                        {f.icon}
                    </button>
                ))}
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
