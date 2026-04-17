import React from 'react';
import { motion } from 'framer-motion';

// ─── Animated Option Button ───────────────────────────────────────────────────
export const DCOption = ({ value, label, index, onClick, className }) => (
  <motion.div
    initial={{ opacity: 0, y: 18 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.08, type: 'spring', stiffness: 300, damping: 20 }}
    onClick={onClick}
    className={`dc-opt ${className}`}
    whileTap={{ scale: 0.95 }}
  >
    <span className="dc-opt-letter">{label}</span>{value}
  </motion.div>
);

// ─── Animated TF Buttons ─────────────────────────────────────────────────────
export const DCTFButtons = ({ qid, lp }) => (
  <div className="dc-tfopts">
    {[['true', '✅ True', 'dc-t'], ['false', '❌ False', 'dc-f']].map(([val, text, cls], i) => (
      <motion.button
        key={val}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: i * 0.1, type: 'spring', stiffness: 280 }}
        whileTap={{ scale: 0.92 }}
        onClick={() => lp.handleTf(qid, val === 'true')}
        className={`dc-tfbtn ${cls} ${lp.getTfClass(qid, val === 'true')}`}
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

// ─── Matchstick Bundle Display ────────────────────────────────────────────────
export const BundleDisplay = ({ hundreds = 0, tens = 0, ones = 0 }) => (
  <div className="dc-bundle-row">
    {hundreds > 0 && (
      <div className="dc-bundle-group">
        <div className="dc-bundle-items">
          {Array.from({ length: hundreds }).map((_, i) => (
            <motion.div key={i} className="dc-bundle-100" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i * 0.12, type: 'spring' }}>
              <span style={{ position: 'relative', zIndex: 1, fontSize: '.6rem' }}>100</span>
            </motion.div>
          ))}
        </div>
        <div className="dc-bundle-label">{hundreds} × 100</div>
      </div>
    )}
    {tens > 0 && (
      <div className="dc-bundle-group">
        <div className="dc-bundle-items">
          {Array.from({ length: Math.min(tens, 10) }).map((_, i) => (
            <motion.div key={i} className="dc-bundle-10" initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ delay: i * 0.07, type: 'spring', stiffness: 280 }}>10</motion.div>
          ))}
        </div>
        <div className="dc-bundle-label">{tens} × 10</div>
      </div>
    )}
    {ones > 0 && (
      <div className="dc-bundle-group">
        <div className="dc-bundle-items">
          {Array.from({ length: Math.min(ones, 9) }).map((_, i) => (
            <motion.div key={i} className="dc-stick" initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ delay: i * 0.06 }} />
          ))}
        </div>
        <div className="dc-bundle-label">{ones} × 1</div>
      </div>
    )}
  </div>
);

// ─── Number Line SVG ─────────────────────────────────────────────────────────
export const NumberLineDC = ({ start = 0, end = 100, step = 10, highlight = null, jumpFrom = null, jumpTo = null, jumpSize = null }) => {
  const W = 320, H = 70, pad = 24;
  const range = end - start;
  const toX = (n) => pad + ((n - start) / range) * (W - 2 * pad);
  const ticks = [];
  for (let n = start; n <= end; n += step) ticks.push(n);
  let arc = null;
  if (jumpFrom !== null && jumpTo !== null) {
    const x1 = toX(jumpFrom), x2 = toX(jumpTo);
    const mx = (x1 + x2) / 2, cy = H / 2 - 22;
    arc = <path d={`M${x1},${H / 2} Q${mx},${cy} ${x2},${H / 2}`} fill="none" stroke="#f59e0b" strokeWidth="2.5" strokeDasharray="5,3" markerEnd="url(#arrow)" />;
  }
  return (
    <motion.div className="dc-numline-wrap" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ maxWidth: '100%', height: 'auto' }}>
        <defs>
          <marker id="arrow" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
            <polygon points="0 0, 7 3.5, 0 7" fill="#f59e0b" />
          </marker>
        </defs>
        <line x1={pad} y1={H / 2} x2={W - pad} y2={H / 2} stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx={pad} cy={H / 2} r="5" fill="#3a86ff" />
        <circle cx={W - pad} cy={H / 2} r="5" fill="#3a86ff" />
        {ticks.map(n => {
          const x = toX(n);
          const isHL = n === highlight;
          return (
            <g key={n}>
              <line x1={x} y1={H / 2 - 7} x2={x} y2={H / 2 + 7} stroke={isHL ? '#f59e0b' : '#64748b'} strokeWidth={isHL ? 2.5 : 1.5} />
              <text x={x} y={H / 2 + 20} textAnchor="middle" fontSize={isHL ? '11' : '10'} fontWeight={isHL ? '900' : '600'} fill={isHL ? '#d97706' : '#374151'} fontFamily="Baloo 2, cursive">{n}</text>
              {isHL && <circle cx={x} cy={H / 2} r="6" fill="#fbbf24" stroke="#d97706" strokeWidth="2" />}
            </g>
          );
        })}
        {arc}
        {jumpSize !== null && jumpFrom !== null && jumpTo !== null && (
          <text x={(toX(jumpFrom) + toX(jumpTo)) / 2} y={H / 2 - 28} textAnchor="middle" fontSize="11" fontWeight="800" fill="#d97706" fontFamily="Baloo 2, cursive">+{jumpSize}</text>
        )}
      </svg>
    </motion.div>
  );
};

// ─── Talking Pot Visual ───────────────────────────────────────────────────────
export const TalkingPot = ({ saidNum, potSaid }) => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, flexWrap: 'wrap', margin: '14px 0' }}>
    <motion.div className="dc-pot-bubble-blue" style={{ textAlign: 'center' }} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
      <div style={{ fontSize: '.75rem', color: '#6b7280', marginBottom: 4 }}>I said</div>
      <div style={{ fontSize: '2rem', fontFamily: "'Baloo 2',cursive", fontWeight: 900 }}>{saidNum}</div>
    </motion.div>
    <motion.div style={{ fontSize: '2.5rem' }} animate={{ rotate: [0, -8, 8, 0] }} transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}>🏺</motion.div>
    <motion.div className="dc-pot-bubble" style={{ textAlign: 'center' }} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
      <div style={{ fontSize: '.75rem', color: '#9d174d', marginBottom: 4 }}>Pot said</div>
      <div style={{ fontSize: '2rem', fontFamily: "'Baloo 2',cursive", fontWeight: 900, color: potSaid === '?' ? '#d1d5db' : '#831843' }}>{potSaid}</div>
    </motion.div>
  </div>
);

// ─── HTO Place Value Display ──────────────────────────────────────────────────
export const HTODisplay = ({ number, highlightCol = null }) => {
  const h = Math.floor(number / 100);
  const t = Math.floor((number % 100) / 10);
  const o = number % 10;
  const hlStyle = { boxShadow: '0 0 0 3px #fbbf24', transform: 'scale(1.08)' };
  return (
    <motion.div style={{ display: 'flex', justifyContent: 'center', margin: '14px 0' }} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
      <table className="dc-hto-table">
        <thead>
          <tr>
            <th className="dc-hto-th" style={highlightCol === 'H' ? { background: '#fef3c7' } : {}}>H</th>
            <th className="dc-hto-th" style={highlightCol === 'T' ? { background: '#fef3c7' } : {}}>T</th>
            <th className="dc-hto-th" style={highlightCol === 'O' ? { background: '#fef3c7' } : {}}>O</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="dc-hto-td dc-h" style={highlightCol === 'H' ? hlStyle : {}}>{h}</td>
            <td className="dc-hto-td dc-t" style={highlightCol === 'T' ? hlStyle : {}}>{t}</td>
            <td className="dc-hto-td dc-o" style={highlightCol === 'O' ? hlStyle : {}}>{o}</td>
          </tr>
        </tbody>
      </table>
    </motion.div>
  );
};

// ─── Number Bond to 100 / 200 ─────────────────────────────────────────────────
export const NumberBond100 = ({ part1, part2, unknown = 'part2' }) => (
  <motion.div className="dc-bond-row" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.1, type: 'spring' }}>
    <div className="dc-bond-box" style={unknown === 'part1' ? { background: '#fef3c7', borderStyle: 'dashed', color: '#92400e' } : {}}>{unknown === 'part1' ? '?' : part1}</div>
    <span className="dc-bond-equals">+</span>
    <div className="dc-bond-box" style={unknown === 'part2' ? { background: '#fef3c7', borderStyle: 'dashed', color: '#92400e' } : {}}>{unknown === 'part2' ? '?' : part2}</div>
    <span className="dc-bond-equals">=</span>
    <motion.div className="dc-bond-100" animate={{ scale: [1, 1.06, 1] }} transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}>{part1 + part2 >= 190 ? '200' : '100'}</motion.div>
  </motion.div>
);

// ─── Stone Path for sequences ─────────────────────────────────────────────────
export const StonePath = ({ numbers, highlight }) => (
  <div className="dc-stone-path">
    {numbers.map((n, i) => {
      const isMissing = n === 0 || n === null;
      const cls = isMissing
        ? 'dc-stone dc-stone-empty'
        : n === highlight
          ? 'dc-stone dc-stone-gold'
          : i % 3 === 0 ? 'dc-stone dc-stone-blue'
            : i % 3 === 1 ? 'dc-stone dc-stone-green'
              : 'dc-stone dc-stone-pink';
      return (
        <motion.div
          key={i}
          className={cls}
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1, type: 'spring', stiffness: 280 }}
        >
          {isMissing ? '?' : n}
        </motion.div>
      );
    })}
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
