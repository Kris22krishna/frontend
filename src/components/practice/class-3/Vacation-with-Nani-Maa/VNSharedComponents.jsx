import React from 'react';
import { motion } from 'framer-motion';

// ─── Animated Option Button ───────────────────────────────────────────────────
export const VNOption = ({ value, label, index, onClick, className }) => (
  <motion.div
    initial={{ opacity: 0, y: 18 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.08, type: 'spring', stiffness: 300, damping: 20 }}
    onClick={onClick}
    className={`vn-opt ${className}`}
    whileTap={{ scale: 0.95 }}
  >
    <span className="vn-opt-letter">{label}</span>{value}
  </motion.div>
);

// ─── Animated TF Buttons ─────────────────────────────────────────────────────
export const VNTFButtons = ({ qid, lp }) => (
  <div className="vn-tfopts">
    {[['true', '✅ True', 'vn-t'], ['false', '❌ False', 'vn-f']].map(([val, text, cls], i) => (
      <motion.button
        key={val}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: i * 0.1, type: 'spring', stiffness: 280 }}
        whileTap={{ scale: 0.92 }}
        onClick={() => lp.handleTf(qid, val === 'true')}
        className={`vn-tfbtn ${cls} ${lp.getTfClass(qid, val === 'true')}`}
      >{text}</motion.button>
    ))}
  </div>
);

// ─── Story Box (character speaking) ─────────────────────────────────────────
export const StoryBox = ({ emoji, text, color = '#ede9fe', border = '#8b5cf6' }) => (
  <motion.div
    initial={{ opacity: 0, x: -10 }}
    animate={{ opacity: 1, x: 0 }}
    style={{ background: color, border: `2px solid ${border}`, borderRadius: 14, padding: '10px 14px', margin: '10px 0 14px', display: 'flex', alignItems: 'center', gap: 10 }}
  >
    <span style={{ fontSize: '1.8rem', flexShrink: 0 }}>{emoji}</span>
    <span style={{ fontFamily: "'Baloo 2',cursive", fontSize: '0.95rem', fontWeight: 600, color: '#374151', lineHeight: 1.4 }}>{text}</span>
  </motion.div>
);

// ─── Achievement Badge ────────────────────────────────────────────────────────
export const AchievementBadge = ({ icon, label, color = '#7c3aed' }) => (
  <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: color, borderRadius: 20, padding: '3px 10px', marginBottom: 8 }}>
    <span style={{ fontSize: '0.85rem' }}>{icon}</span>
    <span style={{ fontFamily: "'Baloo 2',cursive", fontSize: '0.72rem', fontWeight: 800, color: '#fff', letterSpacing: 0.5 }}>{label}</span>
  </div>
);

// ─── Number Line SVG ─────────────────────────────────────────────────────────
export const NumberLineVN = ({ start = 0, end = 100, step = 10, highlight = [], jumps = [] }) => {
  const W = 320, H = 70, pad = 24;
  const range = end - start;
  const toX = (n) => pad + ((n - start) / range) * (W - 2 * pad);
  const ticks = [];
  for (let n = start; n <= end; n += step) ticks.push(n);
  return (
    <motion.div className="vn-numline-wrap" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ maxWidth: '100%', height: 'auto' }}>
        <defs>
          <marker id="arrow" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
            <polygon points="0 0, 7 3.5, 0 7" fill="#f59e0b" />
          </marker>
          <marker id="arrow-back" markerWidth="7" markerHeight="7" refX="1" refY="3.5" orient="auto">
            <polygon points="7 0, 0 3.5, 7 7" fill="#ef4444" />
          </marker>
        </defs>
        <line x1={pad} y1={H / 2} x2={W - pad} y2={H / 2} stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx={pad} cy={H / 2} r="5" fill="#3b82f6" />
        <circle cx={W - pad} cy={H / 2} r="5" fill="#3b82f6" />
        {ticks.map(n => {
          const x = toX(n);
          const isHL = highlight.includes(n);
          return (
            <g key={n}>
              <line x1={x} y1={H / 2 - 7} x2={x} y2={H / 2 + 7} stroke={isHL ? '#f59e0b' : '#64748b'} strokeWidth={isHL ? 2.5 : 1.5} />
              <text x={x} y={H / 2 + 20} textAnchor="middle" fontSize={isHL ? '11' : '10'} fontWeight={isHL ? '900' : '600'} fill={isHL ? '#d97706' : '#374151'} fontFamily="Baloo 2, cursive">{n}</text>
              {isHL && <circle cx={x} cy={H / 2} r="6" fill="#fbbf24" stroke="#d97706" strokeWidth="2" />}
            </g>
          );
        })}
        {jumps.map((j, i) => {
          const x1 = toX(j.from), x2 = toX(j.to);
          const isForward = j.to > j.from;
          const mx = (x1 + x2) / 2, cy = H / 2 - 25;
          return (
            <g key={i}>
              <path d={`M${x1},${H / 2 - 2} Q${mx},${cy} ${x2},${H / 2 - 2}`} fill="none" stroke={isForward ? '#f59e0b' : '#ef4444'} strokeWidth="2.5" strokeDasharray="3,3" markerEnd={isForward ? "url(#arrow)" : "url(#arrow-back)"} />
              {j.label && <text x={mx} y={H / 2 - 28} textAnchor="middle" fontSize="11" fontWeight="800" fill={isForward ? '#d97706' : '#ef4444'} fontFamily="Baloo 2, cursive">{j.label}</text>}
            </g>
          );
        })}
      </svg>
    </motion.div>
  );
};

// ─── Tens Frame ──────────────────────────────────────────────────────────────
export const TensFrame = ({ dotsRed = 0, dotsBlue = 0 }) => {
  const dots = [];
  for (let i = 0; i < dotsRed; i++) dots.push('red');
  for (let i = 0; i < dotsBlue; i++) dots.push('blue');
  while (dots.length < 10) dots.push('empty');
  
  return (
    <div className="vn-tens-frame-wrap">
      <div className="vn-tens-frame">
        {dots.map((color, i) => (
          <div key={i} className="vn-tens-slot">
            {color !== 'empty' && (
              <motion.div className={`vn-dot vn-dot-${color}`} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i * 0.05, type: 'spring' }} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── Box Diagram ─────────────────────────────────────────────────────────────
export const BoxDiagram = ({ parts = [], total = null }) => (
  <div className="vn-box-dig-wrap">
    {total !== null && (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
        <div style={{ borderTop: '2px solid #3b82f6', borderLeft: '2px solid #3b82f6', borderRight: '2px solid #3b82f6', height: '10px', width: '90%', marginBottom: '4px' }}></div>
        <div style={{ fontFamily: "'Baloo 2',cursive", fontWeight: 800, color: '#1e3a8a' }}>{total}</div>
      </div>
    )}
    <div className="vn-box-bar">
      {parts.map((p, i) => (
        <div key={i} style={{ flex: p.value || 1, display: 'flex', flexDirection: 'column' }}>
          <motion.div className="vn-box" initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ delay: i * 0.1 }}>
            {p.value === '?' ? <span style={{ color: '#ef4444' }}>?</span> : p.value}
          </motion.div>
          {p.label && <div className="vn-box-label">{p.label}</div>}
        </div>
      ))}
    </div>
  </div>
);

// ─── Big Number Display ───────────────────────────────────────────────────────
export const BigNum = ({ value, color = '#1d4ed8', bg = '#dbeafe', border = '#3b82f6' }) => (
  <motion.div
    style={{ background: bg, border: `2.5px solid ${border}`, borderRadius: 14, padding: '10px 20px', fontFamily: "'Baloo 2',cursive", fontWeight: 900, fontSize: '2rem', color, display: 'inline-block', margin: '0 6px' }}
    initial={{ scale: 0.7, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ type: 'spring', stiffness: 320 }}
  >{value}</motion.div>
);

// ─── Shuffle utility ──────────────────────────────────────────────────────────
export const shuffle = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};
