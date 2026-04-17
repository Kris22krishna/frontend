import React, { useState } from 'react';
import { motion } from 'framer-motion';

// ─── Shuffle utility ──────────────────────────────────────────────────────────
export const shuffle = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

// ─── MCQ Option Button ────────────────────────────────────────────────────────
export const HOHOption = ({ value, displayText, letterIdx, onClick, className }) => (
  <motion.div
    initial={{ opacity: 0, y: 14 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: letterIdx * 0.07, type: 'spring', stiffness: 300, damping: 20 }}
    onClick={onClick}
    className={`hoh-opt ${className}`}
    whileTap={{ scale: 0.95 }}
  >
    <span className="hoh-opt-letter">{String.fromCharCode(65 + letterIdx)}</span>
    {displayText || value}
  </motion.div>
);

// ─── True / False Buttons ─────────────────────────────────────────────────────
export const HOHTFButtons = ({ qid, lp }) => (
  <div className="hoh-tfopts">
    {[['true', '✅ True', 'hoh-t'], ['false', '❌ False', 'hoh-f']].map(([val, text, cls], i) => (
      <motion.button
        key={val}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: i * 0.1, type: 'spring', stiffness: 280 }}
        whileTap={{ scale: 0.92 }}
        onClick={() => lp.handleTf(qid, val === 'true')}
        className={`hoh-tfbtn ${cls} ${lp.getTfClass(qid, val === 'true')}`}
      >{text}</motion.button>
    ))}
  </div>
);

// ─── Achievement Badge ────────────────────────────────────────────────────────
export const AchievementBadge = ({ icon, label, color = '#22c55e' }) => (
  <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: color, borderRadius: 20, padding: '3px 10px', marginBottom: 8 }}>
    <span style={{ fontSize: '0.85rem' }}>{icon}</span>
    <span style={{ fontFamily: "'Baloo 2',cursive", fontSize: '0.72rem', fontWeight: 800, color: '#fff', letterSpacing: 0.5 }}>{label}</span>
  </div>
);

// ─── Fill-in-the-Blank Input ──────────────────────────────────────────────────
export const FillBlankInput = ({ blankKey, lp, placeholder = '?', width = 70 }) => (
  <input
    type="text"
    inputMode="numeric"
    className={`hoh-fill-input ${lp.isAnswered ? (lp.lastIsCorrect ? 'hoh-correct' : 'hoh-wrong') : ''}`}
    value={lp.fillBlanks[blankKey] || ''}
    onChange={(e) => lp.handleFillBlank(blankKey, e.target.value)}
    placeholder={placeholder}
    disabled={lp.isAnswered}
    style={{ width }}
    autoComplete="off"
  />
);

// ─── Number Line Display ──────────────────────────────────────────────────────
export const NumberLineDisplay = ({ start, end, step = 10, markers = [], highlightRange, height = 80 }) => {
  const ticks = [];
  for (let n = start; n <= end; n += step) ticks.push(n);
  const totalW = 520;
  const pad = 30;
  const lineW = totalW - pad * 2;
  const getX = (n) => pad + ((n - start) / (end - start)) * lineW;

  return (
    <motion.div className="hoh-number-line-wrap" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <svg width="100%" viewBox={`0 0 ${totalW} ${height}`} style={{ maxWidth: totalW }}>
        <line x1={pad} y1={height - 28} x2={totalW - pad} y2={height - 28} stroke="#64748b" strokeWidth="2.5" />
        <polygon points={`${totalW - pad + 8},${height - 28} ${totalW - pad - 2},${height - 33} ${totalW - pad - 2},${height - 23}`} fill="#64748b" />
        {highlightRange && (
          <rect x={getX(highlightRange[0])} y={height - 36} width={getX(highlightRange[1]) - getX(highlightRange[0])} height={16} rx={4} fill="#dbeafe" opacity={0.6} />
        )}
        {ticks.map((n) => (
          <g key={n}>
            <line x1={getX(n)} y1={height - 34} x2={getX(n)} y2={height - 22} stroke="#94a3b8" strokeWidth="1.5" />
            <text x={getX(n)} y={height - 8} textAnchor="middle" fontSize="10" fill="#64748b" fontWeight="600" fontFamily="'Nunito',sans-serif">{n}</text>
          </g>
        ))}
        {markers.map(({ value, color = '#ef4444', label }) => (
          <g key={value}>
            <circle cx={getX(value)} cy={height - 28} r={5} fill={color} stroke="#fff" strokeWidth="1.5" />
            {label && <text x={getX(value)} y={height - 42} textAnchor="middle" fontSize="9" fill={color} fontWeight="700">{label}</text>}
          </g>
        ))}
      </svg>
    </motion.div>
  );
};

// ─── HTO Block Display ────────────────────────────────────────────────────────
export const HTOBlockDisplay = ({
  hundreds = 0, tens = 0, ones = 0, showLabel = true,
  number = null, showQuestion = false,
  highlightHundreds = false, highlightTens = false, highlightOnes = false,
}) => (
  <motion.div className="hoh-hto-display" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
    <div className="hoh-hto-group">
      {Array.from({ length: Math.max(hundreds, 0) }).map((_, i) => (
        <div key={`h${i}`} className="hoh-block hoh-block-h" title="100"
          style={highlightHundreds ? { outline: '3px solid #fbbf24', outlineOffset: 2 } : {}}>
          <span>100</span>
        </div>
      ))}
      {showLabel && <div className="hoh-hto-label" style={highlightHundreds ? { color: '#d97706', fontWeight: 900 } : {}}>{hundreds} H</div>}
    </div>
    <div className="hoh-hto-group">
      {Array.from({ length: Math.max(tens, 0) }).map((_, i) => (
        <div key={`t${i}`} className="hoh-block hoh-block-t" title="10"
          style={highlightTens ? { outline: '3px solid #fbbf24', outlineOffset: 2 } : {}}>
          <span>10</span>
        </div>
      ))}
      {showLabel && <div className="hoh-hto-label" style={highlightTens ? { color: '#d97706', fontWeight: 900 } : {}}>{tens} T</div>}
    </div>
    <div className="hoh-hto-group">
      {Array.from({ length: Math.max(ones, 0) }).map((_, i) => (
        <div key={`o${i}`} className="hoh-block hoh-block-o" title="1"
          style={highlightOnes ? { outline: '3px solid #fbbf24', outlineOffset: 2 } : {}}>
          <span>1</span>
        </div>
      ))}
      {showLabel && <div className="hoh-hto-label" style={highlightOnes ? { color: '#d97706', fontWeight: 900 } : {}}>{ones} O</div>}
    </div>
    {(number !== null || showQuestion) && (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginLeft: 8 }}>
        <div className="hoh-num-box" style={{ fontSize: '1.4rem', padding: '8px 16px' }}>
          {showQuestion ? '?' : number}
        </div>
      </div>
    )}
  </motion.div>
);

// ─── Number Grid (Apartment) Display ──────────────────────────────────────────
export const NumberGridDisplay = ({ startNum = 1, rows = 5, cols = 10, shaded = [], missing = [] }) => {
  const cells = [];
  for (let r = rows - 1; r >= 0; r--) {
    const row = [];
    for (let c = 0; c < cols; c++) {
      const num = startNum + r * cols + c;
      row.push(num);
    }
    cells.push(row);
  }

  return (
    <motion.div className="hoh-grid-wrap" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="hoh-grid">
        {cells.map((row, ri) => (
          <div key={ri} className="hoh-grid-row">
            {row.map((num) => {
              const isShaded = shaded.includes(num);
              const isMissing = missing.includes(num);
              return (
                <div
                  key={num}
                  className={`hoh-grid-cell ${isShaded ? 'hoh-grid-shaded' : ''} ${isMissing ? 'hoh-grid-missing' : ''}`}
                >
                  {isMissing ? '?' : num}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </motion.div>
  );
};

// ─── Comparison Display (Crocodile Mouth) ─────────────────────────────────────
export const ComparisonDisplay = ({ left, right, symbol, color = '#3a86ff' }) => (
  <motion.div className="hoh-compare-wrap" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
    <div className="hoh-compare-num hoh-compare-left">{left}</div>
    <div className="hoh-compare-symbol" style={{ color }}>{symbol || '?'}</div>
    <div className="hoh-compare-num hoh-compare-right">{right}</div>
  </motion.div>
);

// ─── Tile Sequence ────────────────────────────────────────────────────────────
export const TileSequence = ({ items, direction = 'asc' }) => (
  <div className="hoh-tile-seq">
    {items.map((item, i) => (
      <motion.div
        key={i}
        className={`hoh-tile ${item === '?' || item === '_' ? 'hoh-tile-blank' : ''}`}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: i * 0.06, type: 'spring', stiffness: 300 }}
      >
        {item === '?' || item === '_' ? '?' : item}
      </motion.div>
    ))}
    {direction === 'asc' && <span className="hoh-tile-arrow">→</span>}
    {direction === 'desc' && <span className="hoh-tile-arrow">←</span>}
  </div>
);

// ─── Counting Objects Display ─────────────────────────────────────────────────
export const CountingObjectsDisplay = ({ emoji, groups, extraCount = 0, groupSize = 10, label }) => (
  <motion.div className="hoh-counting-wrap" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
    <div className="hoh-counting-groups">
      {Array.from({ length: groups }).map((_, gi) => (
        <div key={gi} className="hoh-counting-group">
          {Array.from({ length: groupSize }).map((_, i) => (
            <span key={i} className="hoh-counting-item">{emoji}</span>
          ))}
          <span className="hoh-counting-group-label">{groupSize}</span>
        </div>
      ))}
      {extraCount > 0 && (
        <div className="hoh-counting-group hoh-counting-extra">
          {Array.from({ length: extraCount }).map((_, i) => (
            <span key={i} className="hoh-counting-item">{emoji}</span>
          ))}
          <span className="hoh-counting-group-label">{extraCount}</span>
        </div>
      )}
    </div>
    {label && <div className="hoh-counting-total">{label}</div>}
  </motion.div>
);

// ─── Match Layout ─────────────────────────────────────────────────────────────
export const HOHMatchLayout = ({ matchId, leftItems, shuffledRight, lp }) => (
  <div className="hoh-match-wrap">
    <div className="hoh-match-col">
      {leftItems.map(([val, label], i) => (
        <motion.div key={val} initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }}
          onClick={() => lp.handleMatch(matchId, 'left', val)}
          className={`hoh-match-item ${lp.getMatchClass(matchId, 'left', val)}`}
        >{label}</motion.div>
      ))}
    </div>
    <div className="hoh-match-center">{leftItems.map((_, i) => <div key={i} className="hoh-match-line">→</div>)}</div>
    <div className="hoh-match-col">
      {shuffledRight.map(([val, label], i) => (
        <motion.div key={val} initial={{ opacity: 0, x: 15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }}
          onClick={() => lp.handleMatch(matchId, 'right', val)}
          className={`hoh-match-item ${lp.getMatchClass(matchId, 'right', val)}`}
        >{label}</motion.div>
      ))}
    </div>
  </div>
);

// ─── Story Box ────────────────────────────────────────────────────────────────
export const StoryBox = ({ emoji, text, color = '#eff6ff', border = '#3b82f6' }) => (
  <motion.div
    initial={{ opacity: 0, x: -10 }}
    animate={{ opacity: 1, x: 0 }}
    style={{
      background: color, border: `2px solid ${border}`, borderRadius: 14,
      padding: '10px 14px', margin: '10px 0 14px',
      display: 'flex', alignItems: 'center', gap: 10,
    }}
  >
    <span style={{ fontSize: '1.8rem', flexShrink: 0 }}>{emoji}</span>
    <span style={{ fontFamily: "'Baloo 2',cursive", fontSize: '0.95rem', fontWeight: 600, color: '#374151', lineHeight: 1.4 }}>{text}</span>
  </motion.div>
);

// ─── Matchstick Bundle Display ────────────────────────────────────────────────
export const MatchstickBundles = ({ hundreds = 0, tens = 0, ones = 0 }) => {
  const BundleH = () => (
    <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', margin: '4px', padding: '6px', background: '#dbeafe', borderRadius: 8, border: '2px solid #3b82f6' }}>
      <div style={{ display: 'flex', gap: 1 }}>
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} style={{ width: 4, height: 28, background: '#b45309', borderRadius: 2 }} />
        ))}
      </div>
      <div style={{ display: 'flex', gap: 1, marginTop: 1 }}>
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} style={{ width: 4, height: 28, background: '#b45309', borderRadius: 2 }} />
        ))}
      </div>
      <span style={{ fontSize: '0.65rem', fontWeight: 800, color: '#1d4ed8', marginTop: 3 }}>100</span>
    </div>
  );
  const BundleT = () => (
    <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', margin: '4px', padding: '5px', background: '#dcfce7', borderRadius: 8, border: '2px solid #22c55e' }}>
      <div style={{ display: 'flex', gap: 1 }}>
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} style={{ width: 4, height: 22, background: '#b45309', borderRadius: 2 }} />
        ))}
      </div>
      <span style={{ fontSize: '0.65rem', fontWeight: 800, color: '#166534', marginTop: 3 }}>10</span>
    </div>
  );
  const SingleStick = () => (
    <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', margin: '3px' }}>
      <div style={{ width: 4, height: 18, background: '#b45309', borderRadius: 2 }} />
    </div>
  );

  return (
    <motion.div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, justifyContent: 'center', alignItems: 'flex-end', margin: '12px 0', padding: '12px', background: '#fffbeb', borderRadius: 14, border: '2px solid #fde68a' }}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {Array.from({ length: hundreds }).map((_, i) => <BundleH key={`h${i}`} />)}
      {Array.from({ length: tens }).map((_, i) => <BundleT key={`t${i}`} />)}
      {Array.from({ length: ones }).map((_, i) => <SingleStick key={`o${i}`} />)}
    </motion.div>
  );
};

// ─── Number Line with Jump Arrows ─────────────────────────────────────────────
export const NumberLineJump = ({ start, end, step = 1, from, to, color = '#ef4444' }) => {
  const ticks = [];
  for (let n = start; n <= end; n += step) ticks.push(n);
  const totalW = 420;
  const pad = 24;
  const lineW = totalW - pad * 2;
  const getX = (n) => pad + ((n - start) / (end - start)) * lineW;
  const midX = (getX(from) + getX(to)) / 2;
  const arcH = 28;

  return (
    <motion.div className="hoh-number-line-wrap" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <svg width="100%" viewBox={`0 0 ${totalW} 80`} style={{ maxWidth: totalW }}>
        <line x1={pad} y1={52} x2={totalW - pad} y2={52} stroke="#64748b" strokeWidth="2" />
        <polygon points={`${totalW - pad + 6},52 ${totalW - pad - 2},48 ${totalW - pad - 2},56`} fill="#64748b" />
        {ticks.map((n) => (
          <g key={n}>
            <line x1={getX(n)} y1={46} x2={getX(n)} y2={58} stroke="#94a3b8" strokeWidth="1.5" />
            <text x={getX(n)} y={70} textAnchor="middle" fontSize="9" fill="#64748b" fontWeight="600">{n}</text>
          </g>
        ))}
        {from !== undefined && to !== undefined && (
          <path
            d={`M ${getX(from)},52 Q ${midX},${52 - arcH} ${getX(to)},52`}
            stroke={color} strokeWidth="2.5" fill="none" markerEnd="url(#arrowHOH)"
          />
        )}
        <defs>
          <marker id="arrowHOH" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 Z" fill={color} />
          </marker>
        </defs>
        {from !== undefined && <circle cx={getX(from)} cy={52} r={4} fill={color} />}
        {to !== undefined && <circle cx={getX(to)} cy={52} r={4} fill={color} />}
      </svg>
    </motion.div>
  );
};
