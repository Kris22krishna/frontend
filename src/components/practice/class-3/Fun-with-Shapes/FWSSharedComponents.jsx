import React, { useState, useRef } from 'react';
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
export const FWSOption = ({ value, displayText, letterIdx, onClick, className }) => (
  <motion.div
    initial={{ opacity: 0, y: 14 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: letterIdx * 0.07, type: 'spring', stiffness: 300, damping: 20 }}
    onClick={onClick}
    className={`fws-opt ${className}`}
    whileTap={{ scale: 0.95 }}
  >
    <span className="fws-opt-letter">{String.fromCharCode(65 + letterIdx)}</span>
    {displayText || value}
  </motion.div>
);

// ─── True / False Buttons ─────────────────────────────────────────────────────
export const FWSTFButtons = ({ qid, lp }) => (
  <div className="fws-tfopts">
    {[['true', '✅ True', 'fws-t'], ['false', '❌ False', 'fws-f']].map(([val, text, cls], i) => (
      <motion.button
        key={val}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: i * 0.1, type: 'spring', stiffness: 280 }}
        whileTap={{ scale: 0.92 }}
        onClick={() => lp.handleTf(qid, val === 'true')}
        className={`fws-tfbtn ${cls} ${lp.getTfClass(qid, val === 'true')}`}
      >{text}</motion.button>
    ))}
  </div>
);

// ─── Story Box ────────────────────────────────────────────────────────────────
export const StoryBox = ({ emoji, text, color = '#f0fdf4', border = '#22c55e' }) => (
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

// ─── Achievement Badge ────────────────────────────────────────────────────────
export const AchievementBadge = ({ icon, label, color = '#22c55e' }) => (
  <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: color, borderRadius: 20, padding: '3px 10px', marginBottom: 8 }}>
    <span style={{ fontSize: '0.85rem' }}>{icon}</span>
    <span style={{ fontFamily: "'Baloo 2',cursive", fontSize: '0.72rem', fontWeight: 800, color: '#fff', letterSpacing: 0.5 }}>{label}</span>
  </div>
);

// ─── SVG Shape Card ───────────────────────────────────────────────────────────
export const ShapeCard = ({ shape, color = '#3a86ff', size = 80, label, strokeOnly = false }) => {
  const half = size / 2;
  let shapeEl;
  const fill = strokeOnly ? 'none' : color;
  const stroke = strokeOnly ? color : 'none';
  const strokeW = strokeOnly ? 3 : 0;

  if (shape === 'circle') {
    shapeEl = <circle cx={half} cy={half} r={half * 0.72} fill={fill} stroke={stroke} strokeWidth={strokeW} />;
  } else if (shape === 'rectangle') {
    shapeEl = <rect x={size * 0.08} y={size * 0.22} width={size * 0.84} height={size * 0.56} rx={4} fill={fill} stroke={stroke} strokeWidth={strokeW} />;
  } else if (shape === 'square') {
    shapeEl = <rect x={size * 0.14} y={size * 0.14} width={size * 0.72} height={size * 0.72} rx={4} fill={fill} stroke={stroke} strokeWidth={strokeW} />;
  } else if (shape === 'triangle') {
    const pts = `${half},${size * 0.1} ${size * 0.92},${size * 0.92} ${size * 0.08},${size * 0.92}`;
    shapeEl = <polygon points={pts} fill={fill} stroke={stroke} strokeWidth={strokeW} />;
  } else if (shape === 'diamond') {
    const pts = `${half},${size * 0.06} ${size * 0.94},${half} ${half},${size * 0.94} ${size * 0.06},${half}`;
    shapeEl = <polygon points={pts} fill={fill} stroke={stroke} strokeWidth={strokeW} />;
  } else if (shape === 'pentagon') {
    const pts = [0,1,2,3,4].map(i => {
      const angle = (i * 72 - 90) * Math.PI / 180;
      return `${half + half * 0.76 * Math.cos(angle)},${half + half * 0.76 * Math.sin(angle)}`;
    }).join(' ');
    shapeEl = <polygon points={pts} fill={fill} stroke={stroke} strokeWidth={strokeW} />;
  }

  return (
    <motion.div
      className="fws-shape-card"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 18 }}
    >
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>{shapeEl}</svg>
      {label && <span className="fws-shape-label">{label}</span>}
    </motion.div>
  );
};

// ─── Shape Row (multiple shapes) ──────────────────────────────────────────────
export const ShapeRow = ({ shapes }) => (
  <div className="fws-shape-row">
    {shapes.map(({ shape, color, size = 64, label }, i) => (
      <ShapeCard key={i} shape={shape} color={color} size={size} label={label} />
    ))}
  </div>
);

// ─── Dot Grid Display ─────────────────────────────────────────────────────────
export const DotGrid = ({ rows = 5, cols = 5, lines = [], highlightDots = [] }) => {
  const gap = 22, pad = 14;
  const w = pad * 2 + (cols - 1) * gap;
  const h = pad * 2 + (rows - 1) * gap;
  const pt = (r, c) => ({ x: pad + c * gap, y: pad + r * gap });
  return (
    <div className="fws-dot-grid-wrap">
      <motion.svg
        width={w} height={h} viewBox={`0 0 ${w} ${h}`}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
      >
        {lines.map(([r1, c1, r2, c2], i) => {
          const p1 = pt(r1, c1), p2 = pt(r2, c2);
          return <line key={i} x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} stroke="#3a86ff" strokeWidth="2.5" strokeLinecap="round" />;
        })}
        {Array.from({ length: rows }).flatMap((_, r) =>
          Array.from({ length: cols }).map((_, c) => {
            const { x, y } = pt(r, c);
            const isHL = highlightDots.some(([hr, hc]) => hr === r && hc === c);
            return <circle key={`${r}-${c}`} cx={x} cy={y} r={isHL ? 5 : 3} fill={isHL ? '#3a86ff' : '#94a3b8'} />;
          })
        )}
      </motion.svg>
    </div>
  );
};

// ─── Corner / Angle Display ───────────────────────────────────────────────────
export const CornerDisplay = ({ type = 'right', size = 90, customLabel }) => {
  const W = size, H = size * 0.85;
  let d, color, label;
  if (type === 'right') {
    d = `M ${W * 0.18},${H * 0.82} L ${W * 0.18},${H * 0.18} L ${W * 0.82},${H * 0.18}`;
    color = '#3a86ff'; label = customLabel !== undefined ? customLabel : 'Square corner';
  } else if (type === 'acute') {
    d = `M ${W * 0.12},${H * 0.82} L ${W * 0.5},${H * 0.1} L ${W * 0.88},${H * 0.82}`;
    color = '#f59e0b'; label = customLabel !== undefined ? customLabel : 'Less than square corner';
  } else {
    d = `M ${W * 0.06},${H * 0.35} L ${W * 0.5},${H * 0.82} L ${W * 0.94},${H * 0.35}`;
    color = '#ef4444'; label = customLabel !== undefined ? customLabel : 'More than square corner';
  }
  const squareSize = W * 0.1;
  return (
    <motion.div className="fws-corner-item" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 280 }}>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
        <path d={d} stroke={color} strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        {type === 'right' && (
          <rect x={W * 0.18} y={H * 0.18 - squareSize} width={squareSize} height={squareSize} fill="none" stroke={color} strokeWidth="2" />
        )}
      </svg>
      {label && <span className="fws-corner-label" style={{ color }}>{label}</span>}
    </motion.div>
  );
};

// ─── Interactive Draw Grid for Shape Construction ─────────────────────────────
export const DrawQuestion = ({ lp, cols = 7, rows = 6, cellSize = 32, givenLines = [], expectedLines = [], promptText }) => {
  const [userLines, setUserLines] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(null);
  const [cursorPos, setCursorPos] = useState(null);
  const svgRef = useRef(null);

  const canvasW = cols * cellSize;
  const canvasH = rows * cellSize;

  const getCoord = (col, row) => ({
    x: col * cellSize + cellSize / 2,
    y: row * cellSize + cellSize / 2,
  });

  const snapToGrid = (x, y) => {
    const touchR = cellSize * 0.6;
    const col = Math.round((x - cellSize / 2) / cellSize);
    const row = Math.round((y - cellSize / 2) / cellSize);
    if (col < 0 || col >= cols || row < 0 || row >= rows) return null;
    const cx = col * cellSize + cellSize / 2;
    const cy = row * cellSize + cellSize / 2;
    if (Math.sqrt((x - cx) ** 2 + (y - cy) ** 2) > touchR) return null;
    return { col, row };
  };

  const getSVGPos = (e) => {
    if (!svgRef.current) return { x: 0, y: 0 };
    const rect = svgRef.current.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return {
      x: (clientX - rect.left) * (canvasW / rect.width),
      y: (clientY - rect.top) * (canvasH / rect.height),
    };
  };

  const updateLines = (lines) => {
    setUserLines(lines);
    lp.setSelectedOption(lines.length > 0 ? lines : null);
  };

  const onPointerDown = (e) => {
    if (lp.isAnswered) return;
    const gp = snapToGrid(...Object.values(getSVGPos(e)));
    if (gp) { setIsDragging(true); setDragStart(gp); setCursorPos(getSVGPos(e)); }
  };

  const onPointerMove = (e) => {
    if (!isDragging || lp.isAnswered) return;
    e.preventDefault();
    const pos = getSVGPos(e);
    setCursorPos(pos);
    const gp = snapToGrid(pos.x, pos.y);
    if (gp && (gp.col !== dragStart.col || gp.row !== dragStart.row)) {
      updateLines([...userLines, { c1: dragStart.col, r1: dragStart.row, c2: gp.col, r2: gp.row }]);
      setDragStart(gp);
    }
  };

  const onPointerUp = () => { setIsDragging(false); setDragStart(null); setCursorPos(null); };

  const renderLine = (l, color, width, key) => {
    const p1 = getCoord(l.c1, l.r1), p2 = getCoord(l.c2, l.r2);
    return <line key={key} x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} stroke={color} strokeWidth={width} strokeLinecap="round" />;
  };

  const lineColor = lp.isAnswered
    ? (lp.lastIsCorrect ? '#22c55e' : '#ef4444')
    : '#3b82f6';

  return (
    <div style={{ margin: '10px 0' }}>
      {promptText && <p style={{ fontFamily: "'Baloo 2',cursive", fontWeight: 700, color: '#374151', fontSize: '0.95rem', margin: '0 0 8px', textAlign: 'center' }}>{promptText}</p>}
      <div style={{ position: 'relative', width: '100%', maxWidth: canvasW, margin: '0 auto', borderRadius: 12, border: '2px solid #cbd5e1', overflow: 'hidden', background: '#f8fafc', touchAction: 'none', userSelect: 'none' }}>
        <svg ref={svgRef} viewBox={`0 0 ${canvasW} ${canvasH}`} width="100%" height="auto"
          onPointerDown={onPointerDown} onPointerMove={onPointerMove}
          onPointerUp={onPointerUp} onPointerLeave={onPointerUp}
          style={{ cursor: lp.isAnswered ? 'default' : 'crosshair', display: 'block', touchAction: 'none' }}
        >
          {Array.from({ length: rows }).flatMap((_, r) =>
            Array.from({ length: cols }).map((_, c) => {
              const { x, y } = getCoord(c, r);
              return <circle key={`dot-${c}-${r}`} cx={x} cy={y} r={3} fill="#94a3b8" />;
            })
          )}
          {givenLines.map((l, i) => renderLine(l, '#1e293b', 4, `given-${i}`))}
          {userLines.map((l, i) => renderLine(l, lineColor, 3.5, `user-${i}`))}
          {isDragging && dragStart && cursorPos && (
            <line x1={getCoord(dragStart.col, dragStart.row).x} y1={getCoord(dragStart.col, dragStart.row).y}
              x2={cursorPos.x} y2={cursorPos.y}
              stroke="#93c5fd" strokeWidth="2.5" strokeDasharray="5,4" />
          )}
        </svg>
      </div>
      <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginTop: 8 }}>
        <button onClick={() => updateLines(userLines.slice(0, -1))} disabled={userLines.length === 0 || lp.isAnswered}
          style={{ padding: '6px 14px', borderRadius: 8, border: '1.5px solid #cbd5e1', background: userLines.length === 0 || lp.isAnswered ? '#f1f5f9' : '#fff', color: '#374151', fontWeight: 700, fontSize: '0.82rem', cursor: userLines.length === 0 || lp.isAnswered ? 'not-allowed' : 'pointer', opacity: userLines.length === 0 || lp.isAnswered ? 0.5 : 1 }}>
          ↩ Undo
        </button>
        <button onClick={() => updateLines([])} disabled={userLines.length === 0 || lp.isAnswered}
          style={{ padding: '6px 14px', borderRadius: 8, border: '1.5px solid #fca5a5', background: userLines.length === 0 || lp.isAnswered ? '#f1f5f9' : '#fff5f5', color: '#ef4444', fontWeight: 700, fontSize: '0.82rem', cursor: userLines.length === 0 || lp.isAnswered ? 'not-allowed' : 'pointer', opacity: userLines.length === 0 || lp.isAnswered ? 0.5 : 1 }}>
          🗑 Clear
        </button>
      </div>
    </div>
  );
};

// ─── Pattern Sequence ─────────────────────────────────────────────────────────
export const PatternSequence = ({ items }) => (
  <div className="fws-pattern-row">
    {items.map((item, i) => (
      <motion.div
        key={i}
        className={`fws-pattern-item ${item === '?' ? 'fws-pattern-unknown' : ''}`}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: i * 0.07, type: 'spring', stiffness: 300 }}
      >
        {item}
      </motion.div>
    ))}
  </div>
);

// ─── Tangram SVG ──────────────────────────────────────────────────────────────
export const TangramDisplay = () => (
  <div className="fws-tangram-wrap">
    <motion.svg width={160} height={160} viewBox="0 0 100 100" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: 'spring', stiffness: 200 }}>
      {/* Large triangle 1 (top-left) */}
      <polygon points="0,0 50,50 0,100" fill="#ef4444" opacity={0.85} stroke="#fff" strokeWidth="1" />
      {/* Large triangle 2 (top-right) */}
      <polygon points="0,0 100,0 50,50" fill="#3a86ff" opacity={0.85} stroke="#fff" strokeWidth="1" />
      {/* Medium triangle */}
      <polygon points="50,50 100,0 100,50" fill="#22c55e" opacity={0.85} stroke="#fff" strokeWidth="1" />
      {/* Small triangle 1 */}
      <polygon points="0,100 50,100 25,75" fill="#f59e0b" opacity={0.85} stroke="#fff" strokeWidth="1" />
      {/* Small triangle 2 */}
      <polygon points="50,100 100,100 75,75" fill="#a855f7" opacity={0.85} stroke="#fff" strokeWidth="1" />
      {/* Square */}
      <polygon points="25,75 50,50 75,75 50,100" fill="#f97316" opacity={0.85} stroke="#fff" strokeWidth="1" />
      {/* Parallelogram */}
      <polygon points="50,50 100,50 75,75 25,75" fill="#06b6d4" opacity={0.85} stroke="#fff" strokeWidth="1" />
    </motion.svg>
  </div>
);

// ─── Shape Count Visual ───────────────────────────────────────────────────────
export const ShapeCountGrid = ({ shapes }) => (
  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center', margin: '12px 0', padding: '12px', background: '#f8fafc', borderRadius: 14, border: '1.5px solid #e2e8f0' }}>
    {shapes.map(({ shape, color }, i) => (
      <motion.div key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i * 0.06, type: 'spring' }}>
        <ShapeCard shape={shape} color={color} size={48} />
      </motion.div>
    ))}
  </div>
);

// ─── Face of 3D Object Display ────────────────────────────────────────────────
export const FaceDisplay = ({ object, faceShape, faceColor = '#3a86ff' }) => {
  const objectEmojis = { cube: '🎲', cuboid: '📦', cylinder: '🥫', cone: '🍦', sphere: '⚽', matchbox: '🗂️', coin: '🪙' };
  return (
    <motion.div
      style={{ display: 'flex', alignItems: 'center', gap: 20, justifyContent: 'center', margin: '14px 0', padding: '14px 20px', background: '#f0f9ff', borderRadius: 16, border: '2px solid #bae6fd' }}
      initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
    >
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '3rem' }}>{objectEmojis[object] || '📦'}</div>
        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', marginTop: 4 }}>Object</div>
      </div>
      <div style={{ fontSize: '2rem', color: '#94a3b8' }}>→</div>
      <div style={{ textAlign: 'center' }}>
        <ShapeCard shape={faceShape} color={faceColor} size={64} />
        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', marginTop: 4 }}>Face shape</div>
      </div>
    </motion.div>
  );
};

// ─── Match Layout ─────────────────────────────────────────────────────────────
export const FWSMatchLayout = ({ matchId, leftItems, shuffledRight, lp }) => (
  <div className="fws-match-wrap">
    <div className="fws-match-col">
      {leftItems.map(([val, label], i) => (
        <motion.div key={val} initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }}
          onClick={() => lp.handleMatch(matchId, 'left', val)}
          className={`fws-match-item ${lp.getMatchClass(matchId, 'left', val)}`}
        >{label}</motion.div>
      ))}
    </div>
    <div className="fws-match-center">{leftItems.map((_, i) => <div key={i} className="fws-match-line">→</div>)}</div>
    <div className="fws-match-col">
      {shuffledRight.map(([val, label], i) => (
        <motion.div key={val} initial={{ opacity: 0, x: 15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }}
          onClick={() => lp.handleMatch(matchId, 'right', val)}
          className={`fws-match-item ${lp.getMatchClass(matchId, 'right', val)}`}
        >{label}</motion.div>
      ))}
    </div>
  </div>
);
