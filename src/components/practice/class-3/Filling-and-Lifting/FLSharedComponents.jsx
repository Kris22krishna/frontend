import React from 'react';
import { motion } from 'framer-motion';

// ─── Animated Option Button ───────────────────────────────────────────────────
export const FLOption = ({ value, label, index, onClick, className }) => (
  <motion.div
    initial={{ opacity: 0, y: 18 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.08, type: 'spring', stiffness: 300, damping: 20 }}
    onClick={onClick}
    className={`fl-opt ${className}`}
    whileTap={{ scale: 0.95 }}
  >
    <span className="fl-opt-letter">{label}</span>{value}
  </motion.div>
);

// ─── True/False Buttons ───────────────────────────────────────────────────────
export const FLTFButtons = ({ qid, lp }) => (
  <div className="fl-tfopts">
    {[['true', '✅ True', 'fl-t'], ['false', '❌ False', 'fl-f']].map(([val, text, cls], i) => (
      <motion.button
        key={val}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: i * 0.1, type: 'spring', stiffness: 280 }}
        whileTap={{ scale: 0.92 }}
        onClick={() => lp.handleTf(qid, val === 'true')}
        className={`fl-tfbtn ${cls} ${lp.getTfClass(qid, val === 'true')}`}
      >{text}</motion.button>
    ))}
  </div>
);

// ─── Story Box ────────────────────────────────────────────────────────────────
export const StoryBox = ({ emoji, text, color = '#ecfeff', border = '#0ea5e9' }) => (
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
export const AchievementBadge = ({ icon, label, color = '#0ea5e9' }) => (
  <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: color, borderRadius: 20, padding: '3px 10px', marginBottom: 8 }}>
    <span style={{ fontSize: '0.85rem' }}>{icon}</span>
    <span style={{ fontFamily: "'Baloo 2',cursive", fontSize: '0.72rem', fontWeight: 800, color: '#fff', letterSpacing: 0.5 }}>{label}</span>
  </div>
);

// ─── Container SVG (glass / bottle / jug / bucket / bowl / mug) ──────────────
export const ContainerSVG = ({ type = 'glass', fillPct = 50, color = '#60a5fa', size = 'md' }) => {
  const W = size === 'sm' ? 48 : size === 'lg' ? 72 : 56;
  const H = size === 'sm' ? 60 : size === 'lg' ? 90 : 72;
  const fill = Math.max(0, Math.min(100, fillPct));

  const shapes = {
    glass: { // tapered glass
      outer: `M${W * 0.12},${H * 0.05} L${W * 0.88},${H * 0.05} L${W * 0.78},${H * 0.95} L${W * 0.22},${H * 0.95} Z`,
      fillY: H * 0.05 + (H * 0.9) * (1 - fill / 100),
      clipId: 'clip-glass',
    },
    bottle: { // bottle with neck
      outer: `M${W * 0.3},${H * 0.05} L${W * 0.7},${H * 0.05} L${W * 0.7},${H * 0.25} L${W * 0.85},${H * 0.35} L${W * 0.85},${H * 0.95} L${W * 0.15},${H * 0.95} L${W * 0.15},${H * 0.35} L${W * 0.3},${H * 0.25} Z`,
      fillY: H * 0.35 + (H * 0.6) * (1 - fill / 100),
      clipId: 'clip-bottle',
    },
    jug: { // jug with handle-like wider base
      outer: `M${W * 0.2},${H * 0.08} L${W * 0.8},${H * 0.08} L${W * 0.88},${H * 0.95} L${W * 0.12},${H * 0.95} Z`,
      fillY: H * 0.08 + (H * 0.87) * (1 - fill / 100),
      clipId: 'clip-jug',
    },
    bucket: { // bucket — wider at top
      outer: `M${W * 0.08},${H * 0.1} L${W * 0.92},${H * 0.1} L${W * 0.82},${H * 0.95} L${W * 0.18},${H * 0.95} Z`,
      fillY: H * 0.1 + (H * 0.85) * (1 - fill / 100),
      clipId: 'clip-bucket',
    },
    bowl: { // shallow bowl
      outer: `M${W * 0.05},${H * 0.3} Q${W * 0.5},${H * 1.1} ${W * 0.95},${H * 0.3} Z`,
      fillY: H * 0.3 + (H * 0.6) * (1 - fill / 100),
      clipId: 'clip-bowl',
    },
    mug: { // mug — cylindrical
      outer: `M${W * 0.15},${H * 0.08} L${W * 0.85},${H * 0.08} L${W * 0.85},${H * 0.95} L${W * 0.15},${H * 0.95} Z`,
      fillY: H * 0.08 + (H * 0.87) * (1 - fill / 100),
      clipId: 'clip-mug',
    },
  };

  const s = shapes[type] || shapes.glass;
  const liquidColor = color;
  const liquidOpacity = 0.85;

  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ display: 'block' }}>
      <defs>
        <clipPath id={`${s.clipId}-${type}`}>
          <path d={s.outer} />
        </clipPath>
      </defs>
      {/* Container outline */}
      <path d={s.outer} fill="#f0f9ff" stroke="#94a3b8" strokeWidth="2" />
      {/* Fill rect clipped to shape */}
      <rect
        x={0} y={s.fillY} width={W} height={H}
        fill={liquidColor} opacity={liquidOpacity}
        clipPath={`url(#${s.clipId}-${type})`}
      />
      {/* Container border overlay */}
      <path d={s.outer} fill="none" stroke="#475569" strokeWidth="2" />
    </svg>
  );
};

// ─── Capacity Row: side-by-side containers ───────────────────────────────────
export const CapacityRow = ({ containers }) => (
  <div className="fl-container-row">
    {containers.map(({ type, fillPct, color, label, size }, i) => (
      <motion.div
        key={i}
        className="fl-container-group"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: i * 0.1, type: 'spring', stiffness: 260 }}
      >
        <ContainerSVG type={type} fillPct={fillPct} color={color} size={size || 'md'} />
        <div className="fl-container-label">{label}</div>
      </motion.div>
    ))}
  </div>
);

// ─── Balance Scale SVG ────────────────────────────────────────────────────────
export const BalanceScaleSVG = ({ leftLabel = '', rightLabel = '', tilt = 'equal', leftColor = '#fde68a', rightColor = '#fde68a' }) => {
  const W = 220, H = 120;
  const pivotX = W / 2, pivotY = 38;
  const armLen = 80;

  const tiltAngle = tilt === 'left' ? -18 : tilt === 'right' ? 18 : 0;
  const rad = (tiltAngle * Math.PI) / 180;

  const lx = pivotX - armLen * Math.cos(rad);
  const ly = pivotY - armLen * Math.sin(rad);
  const rx = pivotX + armLen * Math.cos(rad);
  const ry = pivotY + armLen * Math.sin(rad);

  const panR = 26, panH = 10;

  return (
    <motion.div className="fl-balance-wrap" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ maxWidth: '100%', height: 'auto' }}>
        {/* Stand */}
        <rect x={W / 2 - 5} y={pivotY} width={10} height={H - pivotY - 6} fill="#92400e" rx={4} />
        <rect x={W / 2 - 22} y={H - 12} width={44} height={12} fill="#78350f" rx={5} />
        {/* Pivot circle */}
        <circle cx={pivotX} cy={pivotY} r={7} fill="#d97706" stroke="#92400e" strokeWidth={2} />
        {/* Arm */}
        <line x1={lx} y1={ly} x2={rx} y2={ry} stroke="#d97706" strokeWidth={4} strokeLinecap="round" />
        {/* Left string */}
        <line x1={lx} y1={ly} x2={lx} y2={ly + 24} stroke="#94a3b8" strokeWidth={1.5} />
        {/* Left pan */}
        <ellipse cx={lx} cy={ly + 24} rx={panR} ry={panH / 2} fill={leftColor} stroke="#f59e0b" strokeWidth={1.5} />
        {leftLabel !== '' && (
          <text x={lx} y={ly + 22} textAnchor="middle" fontSize="10" fontWeight="800" fill="#374151" fontFamily="Baloo 2, cursive">{leftLabel}</text>
        )}
        {/* Right string */}
        <line x1={rx} y1={ry} x2={rx} y2={ry + 24} stroke="#94a3b8" strokeWidth={1.5} />
        {/* Right pan */}
        <ellipse cx={rx} cy={ry + 24} rx={panR} ry={panH / 2} fill={rightColor} stroke="#f59e0b" strokeWidth={1.5} />
        {rightLabel !== '' && (
          <text x={rx} y={ry + 22} textAnchor="middle" fontSize="10" fontWeight="800" fill="#374151" fontFamily="Baloo 2, cursive">{rightLabel}</text>
        )}
      </svg>
    </motion.div>
  );
};

// ─── Weight Blocks Display ────────────────────────────────────────────────────
export const WeightBlocks = ({ weights = [] }) => (
  <div className="fl-weight-row">
    {weights.map(({ label, type = 'kg' }, i) => (
      <motion.div
        key={i}
        className={`fl-weight-block ${type}`}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: i * 0.1, type: 'spring', stiffness: 300 }}
      >
        {label}
      </motion.div>
    ))}
  </div>
);

// ─── Pour Count Bubbles ───────────────────────────────────────────────────────
export const PourBubbles = ({ items }) => (
  <div className="fl-pour-row">
    {items.map(({ label, value }, i) => (
      <motion.div
        key={i}
        className="fl-pour-bubble"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: i * 0.1, type: 'spring' }}
      >
        <div style={{ fontSize: '.7rem', color: '#7c3aed', marginBottom: 2 }}>{label}</div>
        <div style={{ fontSize: '1.4rem', fontFamily: "'Baloo 2',cursive", fontWeight: 900 }}>{value}</div>
      </motion.div>
    ))}
  </div>
);

// ─── Coin Row ─────────────────────────────────────────────────────────────────
export const CoinRow = ({ count, color = '#f59e0b' }) => (
  <div className="fl-coin-row">
    {Array.from({ length: Math.min(count, 15) }).map((_, i) => (
      <motion.div
        key={i}
        className="fl-coin"
        style={{ background: `linear-gradient(135deg, ${color}, #b45309)` }}
        initial={{ scale: 0, rotate: -30 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: i * 0.05, type: 'spring', stiffness: 300 }}
      >
        ₹
      </motion.div>
    ))}
    {count > 15 && (
      <span style={{ fontFamily: "'Baloo 2',cursive", fontWeight: 800, color: '#78350f' }}>+{count - 15} more</span>
    )}
  </div>
);

// ─── Litre Visual ─────────────────────────────────────────────────────────────
export const LitreDisplay = ({ bottles = [] }) => (
  <div className="fl-litre-row">
    {bottles.map(({ fraction, label, fillPct, color = '#60a5fa' }, i) => (
      <motion.div
        key={i}
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: i * 0.1, type: 'spring' }}
      >
        <ContainerSVG type="bottle" fillPct={fillPct} color={color} size="md" />
        <div className="fl-litre-label">{label}</div>
        {fraction && (
          <div style={{ fontFamily: "'Baloo 2',cursive", fontWeight: 900, fontSize: '0.75rem', color: '#0c4a6e' }}>{fraction}</div>
        )}
      </motion.div>
    ))}
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
