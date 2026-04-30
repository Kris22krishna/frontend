import React from 'react';
import { motion } from 'framer-motion';

// ─── Animated Option Button ───────────────────────────────────────────────────
export const GTOption = ({ value, label, index, onClick, className }) => (
  <motion.div
    initial={{ opacity: 0, y: 18 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.08, type: 'spring', stiffness: 300, damping: 20 }}
    onClick={onClick}
    className={`gt-opt ${className}`}
    whileTap={{ scale: 0.95 }}
  >
    <span className="gt-opt-letter">{label}</span>{value}
  </motion.div>
);

// ─── True / False Buttons ─────────────────────────────────────────────────────
export const GTTFButtons = ({ qid, lp }) => (
  <div className="gt-tfopts">
    {[['true', '✅ True', 'gt-t'], ['false', '❌ False', 'gt-f']].map(([val, text, cls], i) => (
      <motion.button
        key={val}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: i * 0.1, type: 'spring', stiffness: 280 }}
        whileTap={{ scale: 0.92 }}
        onClick={() => lp.handleTf(qid, val === 'true')}
        className={`gt-tfbtn ${cls} ${lp.getTfClass(qid, val === 'true')}`}
      >{text}</motion.button>
    ))}
  </div>
);

// ─── Story Box (character speaking) ──────────────────────────────────────────
export const StoryBox = ({ emoji, text, color = '#f0fdf4', border = '#16a34a' }) => (
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
export const AchievementBadge = ({ icon, label, color = '#16a34a' }) => (
  <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: color, borderRadius: 20, padding: '3px 10px', marginBottom: 8 }}>
    <span style={{ fontSize: '0.85rem' }}>{icon}</span>
    <span style={{ fontFamily: "'Baloo 2',cursive", fontSize: '0.72rem', fontWeight: 800, color: '#fff', letterSpacing: 0.5 }}>{label}</span>
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
      <table className="gt-hto-table">
        <thead>
          <tr>
            <th className="gt-hto-th" style={highlightCol === 'H' ? { background: '#fef3c7', color: '#92400e' } : {}}>H</th>
            <th className="gt-hto-th" style={highlightCol === 'T' ? { background: '#fef3c7', color: '#92400e' } : {}}>T</th>
            <th className="gt-hto-th" style={highlightCol === 'O' ? { background: '#fef3c7', color: '#92400e' } : {}}>O</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="gt-hto-td gt-h" style={highlightCol === 'H' ? hlStyle : {}}>{h}</td>
            <td className="gt-hto-td gt-t" style={highlightCol === 'T' ? hlStyle : {}}>{t}</td>
            <td className="gt-hto-td gt-o" style={highlightCol === 'O' ? hlStyle : {}}>{o}</td>
          </tr>
        </tbody>
      </table>
    </motion.div>
  );
};

// ─── Number Line (for GT jumps) ───────────────────────────────────────────────
export const NumberLineGT = ({ start = 0, end = 100, step = 10, highlight = null, jumpFrom = null, jumpTo = null, jumpLabel = null, backward = false }) => {
  const W = 320, H = 72, pad = 24;
  const range = end - start;
  const toX = (n) => pad + ((n - start) / range) * (W - 2 * pad);
  const ticks = [];
  for (let n = start; n <= end; n += step) ticks.push(n);
  let arc = null;
  if (jumpFrom !== null && jumpTo !== null) {
    const x1 = toX(jumpFrom), x2 = toX(jumpTo);
    const mx = (x1 + x2) / 2, cy = H / 2 - 20;
    const color = backward ? '#ef4444' : '#16a34a';
    arc = (
      <>
        <path d={`M${x1},${H/2} Q${mx},${cy} ${x2},${H/2}`} fill="none" stroke={color} strokeWidth="2.5" strokeDasharray="5,3" markerEnd="url(#gt-arrow)" />
        {jumpLabel && <text x={mx} y={H/2 - 26} textAnchor="middle" fontSize="11" fontWeight="800" fill={color} fontFamily="Baloo 2, cursive">{jumpLabel}</text>}
      </>
    );
  }
  return (
    <motion.div className="gt-numline-wrap" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ maxWidth: '100%', height: 'auto' }}>
        <defs>
          <marker id="gt-arrow" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
            <polygon points="0 0, 7 3.5, 0 7" fill="#16a34a" />
          </marker>
        </defs>
        <line x1={pad} y1={H/2} x2={W-pad} y2={H/2} stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx={pad} cy={H/2} r="5" fill="#16a34a" />
        <circle cx={W-pad} cy={H/2} r="5" fill="#16a34a" />
        {ticks.map(n => {
          const x = toX(n);
          const isHL = n === highlight;
          return (
            <g key={n}>
              <line x1={x} y1={H/2-7} x2={x} y2={H/2+7} stroke={isHL ? '#f59e0b' : '#64748b'} strokeWidth={isHL ? 2.5 : 1.5} />
              <text x={x} y={H/2+20} textAnchor="middle" fontSize={isHL ? '11' : '10'} fontWeight={isHL ? '900' : '600'} fill={isHL ? '#d97706' : '#374151'} fontFamily="Baloo 2, cursive">{n}</text>
              {isHL && <circle cx={x} cy={H/2} r="6" fill="#fbbf24" stroke="#d97706" strokeWidth="2" />}
            </g>
          );
        })}
        {arc}
      </svg>
    </motion.div>
  );
};

// ─── Coin / Note Display ──────────────────────────────────────────────────────
export const CoinDisplay = ({ coins = [] }) => (
  <div className="gt-coin-row">
    {coins.map(({ denom, count }, gi) =>
      Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={`${gi}-${i}`}
          className={`gt-coin gt-coin-${denom}`}
          initial={{ scale: 0, rotate: -15 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: (gi * count + i) * 0.06, type: 'spring', stiffness: 280 }}
        >₹{denom}</motion.div>
      ))
    )}
  </div>
);

export const NoteDisplay = ({ notes = [] }) => (
  <div className="gt-coin-row">
    {notes.map(({ denom, count }, gi) =>
      Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={`${gi}-${i}`}
          className={`gt-note gt-note-${denom}`}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: (gi * count + i) * 0.07, type: 'spring' }}
        >₹{denom}</motion.div>
      ))
    )}
  </div>
);

// ─── Box Diagram (part-part-whole) ────────────────────────────────────────────
export const BoxDiagram = ({ part1, part2, whole, unknownPart = null }) => (
  <motion.div className="gt-box-diagram" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.1, type: 'spring' }}>
    <div className={`gt-box-part ${unknownPart === 'part1' ? 'unknown' : ''}`}>{unknownPart === 'part1' ? '?' : part1}</div>
    <span className="gt-box-plus">+</span>
    <div className={`gt-box-part ${unknownPart === 'part2' ? 'unknown' : ''}`}>{unknownPart === 'part2' ? '?' : part2}</div>
    <span className="gt-box-eq">=</span>
    <div className={`gt-box-whole ${unknownPart === 'whole' ? 'unknown' : ''}`}>{unknownPart === 'whole' ? '?' : whole}</div>
  </motion.div>
);

// ─── Emoji Row (visual counting) ──────────────────────────────────────────────
export const EmojiRow = ({ emoji, count, label = '', color = '#f0fdf4', border = '#86efac' }) => (
  <motion.div
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.1 }}
    style={{ background: color, border: `2px solid ${border}`, borderRadius: 12, padding: '10px 14px', margin: '8px 0', textAlign: 'center' }}
  >
    {label && <div style={{ fontFamily: "'Baloo 2',cursive", fontWeight: 700, fontSize: '0.8rem', color: '#374151', marginBottom: 6 }}>{label}</div>}
    <div className="gt-emoji-row">
      {Array.from({ length: Math.min(count, 20) }).map((_, i) => (
        <motion.span key={i} className="gt-emoji-item" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i * 0.04, type: 'spring' }}>{emoji}</motion.span>
      ))}
      {count > 20 && <span style={{ fontFamily: "'Baloo 2',cursive", fontWeight: 900, fontSize: '1rem', color: '#6b7280' }}>+{count - 20} more</span>}
    </div>
    {count > 0 && <div style={{ fontFamily: "'Baloo 2',cursive", fontWeight: 900, fontSize: '1rem', color: '#374151', marginTop: 4 }}>Total: {count}</div>}
  </motion.div>
);

// ─── Stone Path for number sequences ─────────────────────────────────────────
export const StonePath = ({ numbers, highlight }) => (
  <div className="gt-stone-path">
    {numbers.map((n, i) => {
      const isMissing = n === 0 || n === null;
      const cls = isMissing
        ? 'gt-stone gt-stone-empty'
        : n === highlight
          ? 'gt-stone gt-stone-gold'
          : i % 3 === 0 ? 'gt-stone gt-stone-green'
            : i % 3 === 1 ? 'gt-stone gt-stone-teal'
              : 'gt-stone gt-stone-pink';
      return (
        <motion.div key={i} className={cls} initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1, type: 'spring', stiffness: 280 }}>
          {isMissing ? '?' : n}
        </motion.div>
      );
    })}
  </div>
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
