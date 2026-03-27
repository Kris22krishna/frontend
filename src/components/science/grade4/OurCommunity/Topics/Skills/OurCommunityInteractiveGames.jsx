import React, { useState, useEffect, useCallback } from 'react';
import { CheckCircle2, RefreshCcw, ArrowRight } from 'lucide-react';

/* ── HELPERS ───────────────────────────────────────── */
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
function pick(arr, n) { return shuffle(arr).slice(0, n); }

/* ── ALL RIDDLE POOLS ──────────────────────────────── */
const ALL_RIDDLES = [
  { text: "I keep letters far and near, with stamps and parcels waiting here.", answer: "Post Office", emoji: "✉️" },
  { text: "I am full of colors, fruits, vegetables and sounds of people shopping.", answer: "Market", emoji: "🛒" },
  { text: "I am a place where you run and play, with swings and slides to enjoy your day.", answer: "Park", emoji: "🌳" },
  { text: "I am a place where doctors and nurses help you get better when you are sick.", answer: "Hospital", emoji: "🏥" },
  { text: "Children come to me every morning with bags and books to learn new things.", answer: "School", emoji: "🏫" },
  { text: "I am where police officers work hard to keep the neighborhood safe.", answer: "Police Station", emoji: "🚔" },
  { text: "People wait at me to catch buses and autos to travel far away.", answer: "Bus Stop", emoji: "🚏" },
  { text: "I have shelves full of books that anyone can borrow and read.", answer: "Library", emoji: "📚" },
  { text: "Firefighters stay at me, ready to rush and save people from fires.", answer: "Fire Station", emoji: "🚒" },
  { text: "I store money and help people save for the future.", answer: "Bank", emoji: "🏦" },
];

const ALL_PLACE_NAMES = [...new Set(ALL_RIDDLES.map(r => r.answer))];

/* ── ALL TOOL-PROFESSION POOLS ──────────────────────── */
const ALL_TOOLS = [
  { tool: "Trowel & Bricks", answer: "Mason", emoji: "🧱" },
  { tool: "Chalk & Blackboard", answer: "Teacher", emoji: "📚" },
  { tool: "Watering Can & Seeds", answer: "Gardener", emoji: "🌿" },
  { tool: "Steering Wheel", answer: "Driver", emoji: "🚌" },
  { tool: "Letters & Stamps", answer: "Postman", emoji: "✉️" },
  { tool: "Stethoscope", answer: "Doctor", emoji: "🩺" },
  { tool: "Wrench & Pipes", answer: "Plumber", emoji: "🔧" },
  { tool: "Wires & Bulbs", answer: "Electrician", emoji: "💡" },
  { tool: "Hammer & Nails", answer: "Carpenter", emoji: "🪚" },
  { tool: "Pots & Ladle", answer: "Cook", emoji: "🍳" },
  { tool: "Scissors & Cloth", answer: "Tailor", emoji: "✂️" },
  { tool: "Camera & Lens", answer: "Photographer", emoji: "📷" },
];

/* ── ALL SEQUENCE SCENARIOS ─────────────────────────── */
const ALL_SEQUENCES = [
  {
    title: "Van Mahotsav — Plant a Tree! 🌱",
    steps: [
      { id: '1', text: 'Clean the area', emoji: '🧹' },
      { id: '2', text: 'Dig a hole', emoji: '🕳️' },
      { id: '3', text: 'Place the sapling', emoji: '🌱' },
      { id: '4', text: 'Water the plant', emoji: '🚿' },
    ]
  },
  {
    title: "Uruka — Prepare the Feast! 🔥",
    steps: [
      { id: '1', text: 'Collect bamboo & hay', emoji: '🎋' },
      { id: '2', text: 'Build the Bhela Ghar', emoji: '🏠' },
      { id: '3', text: 'Cook the feast', emoji: '🍲' },
      { id: '4', text: 'Light the bonfire', emoji: '🔥' },
    ]
  },
  {
    title: "Community Clean-up Day! 🧹",
    steps: [
      { id: '1', text: 'Gather volunteers', emoji: '🤝' },
      { id: '2', text: 'Collect tools & bags', emoji: '🧰' },
      { id: '3', text: 'Pick up litter', emoji: '🗑️' },
      { id: '4', text: 'Plant flowers', emoji: '🌺' },
    ]
  },
  {
    title: "School Function — Stage a Play! 🎭",
    steps: [
      { id: '1', text: 'Write the script', emoji: '📝' },
      { id: '2', text: 'Rehearse with friends', emoji: '🎭' },
      { id: '3', text: 'Set up the stage', emoji: '🪑' },
      { id: '4', text: 'Perform for everyone!', emoji: '👏' },
    ]
  },
];

/* ── ALL BRIDGE SCENARIOS ──────────────────────────── */
const ALL_BRIDGE_SCENARIOS = [
  {
    title: "Bamboo Bridge over Chinar River",
    story: "The Chinar river in Chhattisgarh has flooded! The community needs bamboo and stones to build a bridge so children can reach school.",
    resources: [
      { id: 'bamboo', name: 'Bamboo', emoji: '🎋', need: 4, color: '#F59E0B' },
      { id: 'stone', name: 'Stones', emoji: '🪨', need: 3, color: '#94A3B8' },
    ]
  },
  {
    title: "Log Bridge in the Hills",
    story: "Heavy rains washed away the bridge in a hilly village. People must gather logs and rope to rebuild it before winter!",
    resources: [
      { id: 'log', name: 'Logs', emoji: '🪵', need: 4, color: '#92400E' },
      { id: 'rope', name: 'Rope', emoji: '🪢', need: 3, color: '#7C3AED' },
    ]
  },
  {
    title: "Plank Bridge for the Market",
    story: "A stream separates the village from the market. The Khetala specialists donate planks and nails to build a new walkway.",
    resources: [
      { id: 'plank', name: 'Planks', emoji: '🪵', need: 5, color: '#D97706' },
      { id: 'nail', name: 'Nails', emoji: '🔩', need: 3, color: '#64748B' },
    ]
  },
];


// ==========================================
// GAME 1: MATCH THE RIDDLE (Dynamic)
// ==========================================
const MatchTheRiddle = ({ onComplete }) => {
  const [round] = useState(() => {
    const selected = pick(ALL_RIDDLES, 4);
    const wrongPool = ALL_PLACE_NAMES.filter(n => !selected.some(s => s.answer === n));
    return {
      riddles: selected,
      allChoices: shuffle([...selected.map(s => s.answer), ...pick(wrongPool, 2)])
    };
  });
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState(null); // null | 'correct' | 'wrong'

  const riddle = round.riddles[idx];

  const handlePick = (name) => {
    if (feedback) return;
    const correct = name === riddle.answer;
    setFeedback(correct ? 'correct' : 'wrong');
    if (correct) setScore(s => s + 1);
    setTimeout(() => {
      setFeedback(null);
      if (idx < round.riddles.length - 1) setIdx(i => i + 1);
      else onComplete(score + (correct ? 1 : 0), round.riddles.length);
    }, 1200);
  };

  return (
    <div style={{ padding: 28, background: '#f8fafc', borderRadius: 24 }}>
      <h3 style={{ fontSize: 26, color: '#1e293b', textAlign: 'center', fontFamily: 'Outfit', fontWeight: 900, margin: '0 0 8px' }}>
        🧩 Solve the Riddle!
      </h3>
      <p style={{ textAlign: 'center', color: '#64748b', marginBottom: 24, fontSize: 15 }}>
        Read the clue and pick the correct place. ({idx + 1}/{round.riddles.length})
      </p>

      {/* Riddle Card */}
      <div style={{
        background: 'linear-gradient(135deg, #4f46e5, #7c3aed)', padding: 28, borderRadius: 20,
        marginBottom: 28, textAlign: 'center', color: '#fff', boxShadow: '0 10px 30px rgba(79,70,229,0.25)'
      }}>
        <div style={{ fontSize: 40, marginBottom: 12 }}>{riddle.emoji}</div>
        <p style={{ fontSize: 20, fontWeight: 700, lineHeight: 1.5, fontStyle: 'italic', margin: 0 }}>
          "{riddle.text}"
        </p>
      </div>

      {/* Choices */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
        {round.allChoices.map(name => {
          let bg = '#fff', border = '#e2e8f0', color = '#1e293b';
          if (feedback && name === riddle.answer) { bg = '#dcfce7'; border = '#22c55e'; color = '#166534'; }
          else if (feedback === 'wrong' && name !== riddle.answer) { bg = '#fef2f2'; border = '#fecaca'; }
          return (
            <button key={name} onClick={() => handlePick(name)} style={{
              padding: '16px 12px', borderRadius: 16, border: `3px solid ${border}`, background: bg,
              fontWeight: 800, fontSize: 15, cursor: feedback ? 'default' : 'pointer',
              color, transition: 'all 0.15s', textAlign: 'center'
            }}>
              {name}
            </button>
          );
        })}
      </div>
    </div>
  );
};

// ==========================================
// GAME 2: WHO USES THIS TOOL? (Dynamic)
// ==========================================
const SortOccupations = ({ onComplete }) => {
  const [round] = useState(() => {
    const selected = pick(ALL_TOOLS, 5);
    const allProfs = shuffle(selected.map(s => s.answer));
    return { items: selected, professions: allProfs };
  });
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState(null);

  const item = round.items[idx];

  const handleMatch = (prof) => {
    if (feedback) return;
    const correct = prof === item.answer;
    setFeedback(correct ? 'correct' : 'wrong');
    if (correct) setScore(s => s + 1);
    setTimeout(() => {
      setFeedback(null);
      if (idx < round.items.length - 1) setIdx(i => i + 1);
      else onComplete(score + (correct ? 1 : 0), round.items.length);
    }, 1200);
  };

  return (
    <div style={{ padding: 28, background: '#f8fafc', borderRadius: 24 }}>
      <h3 style={{ fontSize: 26, color: '#1e293b', textAlign: 'center', fontFamily: 'Outfit', fontWeight: 900, margin: '0 0 8px' }}>
        🛠️ Who Uses This Tool?
      </h3>
      <p style={{ textAlign: 'center', color: '#64748b', marginBottom: 28, fontSize: 15 }}>
        Match the tool to the right community helper! ({idx + 1}/{round.items.length})
      </p>

      {/* Tool Display */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 32 }}>
        <div style={{
          width: 180, height: 180, borderRadius: 24,
          background: 'linear-gradient(135deg, #fef3c7, #fff)',
          border: '4px solid #f59e0b', display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 12px 30px rgba(245,158,11,0.2)'
        }}>
          <span style={{ fontSize: 64, marginBottom: 8 }}>{item.emoji}</span>
          <span style={{ fontWeight: 900, fontSize: 17, color: '#92400e' }}>{item.tool}</span>
        </div>
      </div>

      {/* Profession buttons */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
        {round.professions.map(prof => {
          let bg = '#ec4899', shadow = 'rgba(236,72,153,0.3)';
          if (feedback && prof === item.answer) { bg = '#10b981'; shadow = 'rgba(16,185,129,0.3)'; }
          else if (feedback === 'wrong' && prof !== item.answer) { bg = '#cbd5e1'; shadow = 'none'; }
          return (
            <button key={prof} onClick={() => handleMatch(prof)} style={{
              padding: '14px 28px', fontSize: 16, fontWeight: 800, borderRadius: 100,
              border: 'none', background: bg, color: '#fff', cursor: feedback ? 'default' : 'pointer',
              boxShadow: `0 4px 15px ${shadow}`, transition: 'all 0.15s'
            }}>
              {prof}
            </button>
          );
        })}
      </div>
    </div>
  );
};

// ==========================================
// GAME 3: FESTIVAL SEQUENCING (Dynamic scenarios)
// ==========================================
const FestivalSequencing = ({ onComplete }) => {
  const [scenario] = useState(() => {
    const s = ALL_SEQUENCES[Math.floor(Math.random() * ALL_SEQUENCES.length)];
    return { ...s, shuffled: shuffle([...s.steps]) };
  });
  const [selectedOrder, setSelectedOrder] = useState([]);

  const handleSelect = (step) => {
    if (selectedOrder.find(s => s.id === step.id)) return;
    const newOrder = [...selectedOrder, step];
    setSelectedOrder(newOrder);

    if (newOrder.length === scenario.steps.length) {
      const isCorrect = newOrder.every((s, i) => s.id === scenario.steps[i].id);
      setTimeout(() => onComplete(isCorrect ? scenario.steps.length : 0, scenario.steps.length), 1500);
    }
  };

  const isComplete = selectedOrder.length === scenario.steps.length;
  const isCorrect = isComplete && selectedOrder.every((s, i) => s.id === scenario.steps[i].id);

  return (
    <div style={{ padding: 28, background: '#f8fafc', borderRadius: 24 }}>
      <h3 style={{ fontSize: 26, color: '#1e293b', textAlign: 'center', fontFamily: 'Outfit', fontWeight: 900, margin: '0 0 8px' }}>
        📋 {scenario.title}
      </h3>
      <p style={{ textAlign: 'center', color: '#64748b', marginBottom: 28, fontSize: 15 }}>
        Click the steps in the correct order!
      </p>

      {/* Selected sequence */}
      <div style={{
        display: 'grid', gridTemplateColumns: `repeat(${scenario.steps.length}, 1fr)`, gap: 10,
        marginBottom: 32, padding: 20, background: '#fff', borderRadius: 18,
        border: `3px solid ${isComplete ? (isCorrect ? '#22c55e' : '#ef4444') : '#e2e8f0'}`,
        transition: 'border-color 0.3s'
      }}>
        {scenario.steps.map((_, i) => (
          <div key={i} style={{
            height: 80, background: selectedOrder[i] ? '#e0f2fe' : '#f8fafc',
            border: `2px dashed ${selectedOrder[i] ? '#0ea5e9' : '#cbd5e1'}`, borderRadius: 14,
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            fontSize: 14, fontWeight: 700, color: '#334155', textAlign: 'center', padding: 8
          }}>
            {selectedOrder[i] ? (
              <>
                <span style={{ fontSize: 28 }}>{selectedOrder[i].emoji}</span>
                <span style={{ fontSize: 12, marginTop: 4 }}>{selectedOrder[i].text}</span>
              </>
            ) : (
              <span style={{ fontSize: 24, color: '#cbd5e1' }}>{i + 1}</span>
            )}
          </div>
        ))}
      </div>

      {/* Available steps */}
      <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
        {scenario.shuffled.map(step => {
          const used = selectedOrder.find(s => s.id === step.id);
          return (
            <button key={step.id} onClick={() => handleSelect(step)} disabled={!!used} style={{
              padding: '14px 22px', fontSize: 15, fontWeight: 800, borderRadius: 14,
              border: 'none', background: used ? '#e2e8f0' : '#10b981', color: used ? '#94a3b8' : '#fff',
              cursor: used ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', gap: 8,
              boxShadow: used ? 'none' : '0 4px 12px rgba(16,185,129,0.3)', transition: 'all 0.15s'
            }}>
              {step.emoji} {step.text}
            </button>
          );
        })}
      </div>

      {!isComplete && selectedOrder.length > 0 && (
        <div style={{ textAlign: 'center', marginTop: 16 }}>
          <button onClick={() => setSelectedOrder([])} style={{
            background: 'none', border: 'none', cursor: 'pointer', color: '#64748b',
            textDecoration: 'underline', fontWeight: 600
          }}>
            🔄 Reset
          </button>
        </div>
      )}

      {isComplete && (
        <div style={{ textAlign: 'center', marginTop: 20, fontSize: 24, fontWeight: 900 }}>
          {isCorrect ? <span style={{ color: '#10b981' }}>✅ Perfect Order!</span> : <span style={{ color: '#ef4444' }}>❌ Not quite right!</span>}
        </div>
      )}
    </div>
  );
};

// ==========================================
// GAME 4: BUILD THE BRIDGE (Dynamic + Beautiful SVG)
// ==========================================
const BuildTheBridge = ({ onComplete }) => {
  const [scenario] = useState(() => ALL_BRIDGE_SCENARIOS[Math.floor(Math.random() * ALL_BRIDGE_SCENARIOS.length)]);
  const [collected, setCollected] = useState(() => scenario.resources.reduce((acc, r) => ({ ...acc, [r.id]: 0 }), {}));

  const totalNeeded = scenario.resources.reduce((s, r) => s + r.need, 0);
  const totalCollected = Object.values(collected).reduce((s, v) => s + v, 0);
  const progress = Math.round((totalCollected / totalNeeded) * 100);
  const isComplete = scenario.resources.every(r => collected[r.id] >= r.need);

  useEffect(() => {
    if (isComplete) {
      const t = setTimeout(() => onComplete(1, 1), 2500);
      return () => clearTimeout(t);
    }
  }, [isComplete]);

  const handleCollect = (id) => {
    const res = scenario.resources.find(r => r.id === id);
    if (collected[id] < res.need) {
      setCollected(prev => ({ ...prev, [id]: prev[id] + 1 }));
    }
  };

  return (
    <div style={{ padding: 28, background: '#f8fafc', borderRadius: 24 }}>
      <h3 style={{ fontSize: 26, color: '#1e293b', textAlign: 'center', fontFamily: 'Outfit', fontWeight: 900, margin: '0 0 8px' }}>
        🌉 {scenario.title}
      </h3>
      <p style={{ textAlign: 'center', color: '#64748b', marginBottom: 8, fontSize: 15, maxWidth: 500, margin: '0 auto 24px' }}>
        {scenario.story}
      </p>

      {/* Progress Bar */}
      <div style={{ maxWidth: 400, margin: '0 auto 28px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, fontWeight: 800, color: '#64748b', marginBottom: 6 }}>
          <span>Bridge Progress</span>
          <span>{progress}%</span>
        </div>
        <div style={{ height: 14, background: '#e2e8f0', borderRadius: 100, overflow: 'hidden' }}>
          <div style={{
            width: `${progress}%`, height: '100%', borderRadius: 100, transition: 'width 0.4s ease',
            background: isComplete ? '#10b981' : 'linear-gradient(90deg, #f59e0b, #ef4444)'
          }} />
        </div>
      </div>

      {/* Resource Buttons */}
      <div style={{ display: 'flex', gap: 20, justifyContent: 'center', marginBottom: 32 }}>
        {scenario.resources.map(r => {
          const done = collected[r.id] >= r.need;
          return (
            <button key={r.id} onClick={() => handleCollect(r.id)} disabled={done} style={{
              width: 140, padding: '20px 16px', borderRadius: 20, border: `3px solid ${done ? '#22c55e' : r.color}`,
              background: done ? '#f0fdf4' : '#fff', cursor: done ? 'default' : 'pointer',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
              boxShadow: done ? 'none' : `0 6px 20px ${r.color}25`, transition: 'all 0.2s',
              transform: done ? 'scale(0.95)' : 'scale(1)'
            }}>
              <span style={{ fontSize: 48 }}>{r.emoji}</span>
              <span style={{ fontWeight: 900, fontSize: 15, color: done ? '#166534' : '#1e293b' }}>{r.name}</span>
              <div style={{
                padding: '4px 14px', borderRadius: 100, fontWeight: 900, fontSize: 14,
                background: done ? '#dcfce7' : `${r.color}20`, color: done ? '#166534' : r.color
              }}>
                {collected[r.id]}/{r.need} {done && '✅'}
              </div>
            </button>
          );
        })}
      </div>

      {/* Bridge SVG */}
      <svg viewBox="0 0 500 200" style={{ width: '100%', maxWidth: 500, margin: '0 auto', display: 'block' }}>
        {/* Sky gradient */}
        <defs>
          <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#87CEEB" />
            <stop offset="100%" stopColor="#E0F4FF" />
          </linearGradient>
          <linearGradient id="waterGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#2563EB" />
            <stop offset="50%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#2563EB" />
          </linearGradient>
          <linearGradient id="bridgeGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#A0522D" />
            <stop offset="100%" stopColor="#8B4513" />
          </linearGradient>
        </defs>

        {/* Sky */}
        <rect width="500" height="200" fill="url(#skyGrad)" rx="16" />

        {/* Clouds */}
        <g opacity="0.6">
          <ellipse cx="80" cy="30" rx="30" ry="14" fill="#fff" />
          <ellipse cx="100" cy="28" rx="25" ry="12" fill="#fff" />
          <ellipse cx="380" cy="45" rx="35" ry="15" fill="#fff" />
          <ellipse cx="410" cy="42" rx="20" ry="10" fill="#fff" />
        </g>

        {/* Sun */}
        <circle cx="440" cy="35" r="22" fill="#FCD34D" opacity="0.9" />

        {/* River */}
        <path d="M 0 140 Q 125 120 250 140 T 500 135 L 500 200 L 0 200 Z" fill="url(#waterGrad)" opacity="0.8" />
        <path d="M 0 155 Q 125 140 250 155 T 500 150 L 500 200 L 0 200 Z" fill="#1D4ED8" opacity="0.5" />

        {/* River shimmer */}
        <line x1="100" y1="160" x2="140" y2="158" stroke="#93C5FD" strokeWidth="1.5" opacity="0.6" />
        <line x1="250" y1="165" x2="300" y2="162" stroke="#93C5FD" strokeWidth="1.5" opacity="0.6" />
        <line x1="360" y1="158" x2="390" y2="160" stroke="#93C5FD" strokeWidth="1.5" opacity="0.6" />

        {/* Left Bank */}
        <path d="M 0 120 Q 40 110 90 115 L 90 200 L 0 200 Z" fill="#16A34A" />
        <path d="M 0 130 Q 30 125 90 128 L 90 200 L 0 200 Z" fill="#15803D" />
        {/* Tree on left */}
        <rect x="30" y="75" width="8" height="40" fill="#92400E" rx="2" />
        <circle cx="34" cy="65" r="18" fill="#22C55E" />
        <circle cx="20" cy="72" r="12" fill="#16A34A" />
        <circle cx="48" cy="72" r="12" fill="#16A34A" />

        {/* Right Bank */}
        <path d="M 410 118 Q 450 112 500 120 L 500 200 L 410 200 Z" fill="#16A34A" />
        <path d="M 410 130 Q 460 125 500 132 L 500 200 L 410 200 Z" fill="#15803D" />
        {/* Tree on right */}
        <rect x="445" y="70" width="8" height="45" fill="#92400E" rx="2" />
        <circle cx="449" cy="58" r="20" fill="#22C55E" />
        <circle cx="435" cy="68" r="14" fill="#16A34A" />
        <circle cx="463" cy="68" r="14" fill="#16A34A" />

        {/* Bridge pillars */}
        <rect x="85" y="100" width="16" height="80" fill="#78716C" rx="3" />
        <rect x="400" y="100" width="16" height="80" fill="#78716C" rx="3" />

        {/* Bridge deck - grows with progress */}
        <rect x="92" y="100" width={`${(progress / 100) * 316}`} height="14" fill="url(#bridgeGrad)" rx="3" style={{ transition: 'width 0.5s ease' }} />
        {/* Railing */}
        {progress > 10 && <rect x="92" y="95" width={`${(progress / 100) * 316}`} height="4" fill="#D97706" rx="2" style={{ transition: 'width 0.5s ease' }} />}
        {/* Railing posts */}
        {[0.15, 0.35, 0.55, 0.75, 0.95].map((pos, i) => {
          const xPos = 92 + pos * 316;
          return progress > pos * 100 ? (
            <rect key={i} x={xPos} y="90" width="3" height="14" fill="#B45309" rx="1" />
          ) : null;
        })}

        {/* Person walking if complete */}
        {isComplete && (
          <g style={{ animation: 'walkBridge 2s ease-in-out forwards' }}>
            <circle cx="110" cy="85" r="8" fill="#FBBF24" />
            <rect x="105" y="95" width="10" height="15" fill="#3B82F6" rx="3" />
          </g>
        )}

        {/* Celebration if complete */}
        {isComplete && (
          <text x="250" y="40" textAnchor="middle" fill="#16A34A" fontSize="22" fontWeight="bold" fontFamily="Outfit,sans-serif">
            🎉 Bridge Complete!
          </text>
        )}

        <style>{`
          @keyframes walkBridge { 
            0% { transform: translateX(0); }
            100% { transform: translateX(300px); }
          }
        `}</style>
      </svg>
    </div>
  );
};

// ==========================================
// GAME MAPPER
// ==========================================
export default function InteractiveGameMapper({ skillId, onComplete, onWin }) {
  const [hasCompleted, setHasCompleted] = useState(false);
  const [results, setResults] = useState({ score: 0, total: 0 });
  const [gameKey, setGameKey] = useState(Date.now()); // for re-randomization

  const handleGameComplete = (score, total) => {
    setResults({ score, total });
    setHasCompleted(true);
    if (onWin) onWin();
  };

  const handlePlayAgain = () => {
    setHasCompleted(false);
    setGameKey(Date.now()); // force new random round
  };

  if (hasCompleted) {
    return (
      <div style={{ textAlign: 'center', padding: 60, background: '#fff', borderRadius: 24 }}>
        <CheckCircle2 size={80} color="#10b981" style={{ margin: '0 auto 24px' }} />
        <h2 style={{ fontSize: 32, color: '#1e293b', marginBottom: 16, fontFamily: 'Outfit', fontWeight: 900 }}>Great Job!</h2>
        <p style={{ fontSize: 18, color: '#64748b', marginBottom: 32 }}>
          You scored {results.score} out of {results.total} points.
        </p>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
          <button onClick={handlePlayAgain} style={{
            padding: '14px 28px', background: '#f1f5f9', border: 'none', borderRadius: 100,
            color: '#475569', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, fontSize: 15
          }}>
            <RefreshCcw size={18} /> Play Again (New!)
          </button>
          <button onClick={onComplete} style={{
            padding: '14px 28px', background: '#4f46e5', border: 'none', borderRadius: 100,
            color: '#fff', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, fontSize: 15
          }}>
            Continue <ArrowRight size={18} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div key={gameKey} style={{ maxWidth: 800, margin: '0 auto' }}>
      {skillId === 'community-places' && <MatchTheRiddle onComplete={handleGameComplete} />}
      {skillId === 'people-at-work' && <SortOccupations onComplete={handleGameComplete} />}
      {skillId === 'festivals-togetherness' && <FestivalSequencing onComplete={handleGameComplete} />}
      {skillId === 'teamwork' && <BuildTheBridge onComplete={handleGameComplete} />}
    </div>
  );
}
