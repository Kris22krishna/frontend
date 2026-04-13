import React from 'react';

// ─────────────────────────────────────────────
// Tally Mark SVG
// Draws tally marks: groups of 5 (4 verticals + diagonal cross)
// followed by remaining vertical lines
// ─────────────────────────────────────────────
export const TallyMarkSVG = ({ count, color = '#2d1b69', scale = 1 }) => {
  const groups = Math.floor(count / 5);
  const rem = count % 5;
  const lh = 36 * scale;
  const ls = 11 * scale;
  const gs = 18 * scale;
  const pad = 10 * scale;

  const lines = [];
  let cx = pad;

  for (let g = 0; g < groups; g++) {
    for (let i = 0; i < 4; i++) {
      lines.push(
        <line key={`g${g}v${i}`}
          x1={cx + i * ls} y1={4}
          x2={cx + i * ls} y2={4 + lh}
          stroke={color} strokeWidth={2.5 * scale} strokeLinecap="round"
        />
      );
    }
    lines.push(
      <line key={`g${g}x`}
        x1={cx - 5 * scale} y1={4 + lh + 2 * scale}
        x2={cx + 3 * ls + 5 * scale} y2={2}
        stroke={color} strokeWidth={2.5 * scale} strokeLinecap="round"
      />
    );
    cx += 4 * ls + gs;
  }

  for (let i = 0; i < rem; i++) {
    lines.push(
      <line key={`r${i}`}
        x1={cx + i * ls} y1={4}
        x2={cx + i * ls} y2={4 + lh}
        stroke={color} strokeWidth={2.5 * scale} strokeLinecap="round"
      />
    );
  }

  const svgW = cx + (rem > 0 ? (rem - 1) * ls + pad : groups > 0 ? -gs + pad : pad);
  const svgH = lh + 14 * scale;

  return (
    <svg
      width={Math.max(svgW, 30)}
      height={svgH}
      viewBox={`0 0 ${Math.max(svgW, 30)} ${svgH}`}
      style={{ display: 'block', maxWidth: '100%', height: 'auto' }}
    >
      {lines}
    </svg>
  );
};

// ─────────────────────────────────────────────
// Wall / Rock background for tally marks
// ─────────────────────────────────────────────
export const TallyWall = ({ count, label = '' }) => (
  <div style={{ textAlign: 'center', width: '100%' }}>
    <div style={{
      background: 'linear-gradient(135deg, #c9a87c 0%, #a87850 100%)',
      borderRadius: '20px',
      padding: '14px 20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 6px 20px rgba(168,120,80,.4)',
      border: '3px solid #8b5e30',
      maxWidth: '100%',
      overflow: 'hidden',
    }}>
      <TallyMarkSVG count={count} color="#2d1508" />
    </div>
    {label && (
      <div style={{ marginTop: 8, fontSize: '0.85rem', fontWeight: 700, color: '#64748b' }}>{label}</div>
    )}
  </div>
);

// ─────────────────────────────────────────────
// Letter boxes for showing individual letters of a word
// ─────────────────────────────────────────────
export const LetterBoxes = ({ word, color = '#3a86ff', bgColor = '#eff6ff', textColor = '#1e40af' }) => (
  <div style={{ display: 'flex', gap: '4px', justifyContent: 'center', flexWrap: 'wrap' }}>
    {word.toUpperCase().split('').map((letter, i) => (
      <div key={i} style={{
        width: '30px', height: '30px',
        border: `2.5px solid ${color}`,
        borderRadius: '7px',
        background: bgColor,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: "'Baloo 2', cursive",
        fontWeight: '800', fontSize: '0.9rem',
        color: textColor,
        flexShrink: 0,
      }}>
        {letter}
      </div>
    ))}
  </div>
);

// ─────────────────────────────────────────────
// Animal card with emoji + letter boxes
// ─────────────────────────────────────────────
export const AnimalCard = ({ name, emoji, selected, correct, wrong, onClick, hideLetters = false }) => {
  let borderColor = '#e2e8f0';
  let bg = '#fff';
  if (correct) { borderColor = '#16a34a'; bg = '#dcfce7'; }
  else if (wrong) { borderColor = '#dc2626'; bg = '#fee2e2'; }
  else if (selected) { borderColor = '#3a86ff'; bg = '#dbeafe'; }

  return (
    <div
      onClick={onClick}
      style={{
        background: bg,
        border: `2.5px solid ${borderColor}`,
        borderRadius: '14px',
        padding: '12px 14px',
        textAlign: 'center',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'all .15s',
        minWidth: '90px',
      }}
    >
      <div style={{ fontSize: '2.4rem', marginBottom: '6px' }}>{emoji}</div>
      <div style={{ fontFamily: "'Baloo 2', cursive", fontWeight: 800, fontSize: '0.9rem', color: '#1a1a2e', marginBottom: '6px' }}>
        {name}
      </div>
      {!hideLetters && <LetterBoxes word={name} />}
    </div>
  );
};

// ─────────────────────────────────────────────
// Number name card (like textbook flash cards)
// ─────────────────────────────────────────────
export const NumberNameCard = ({ word, accent = '#f59e0b' }) => (
  <div style={{
    background: '#fef3c7',
    border: `2px solid ${accent}`,
    borderRadius: '10px',
    padding: '8px 14px',
    fontFamily: "'Baloo 2', cursive",
    fontWeight: 800,
    fontSize: '1rem',
    color: '#92400e',
    display: 'inline-block',
    margin: '4px',
    textTransform: 'uppercase',
  }}>
    {word}
  </div>
);

// ─────────────────────────────────────────────
// Object card for grouping activities
// ─────────────────────────────────────────────
export const ObjectCard = ({ name, emoji, selected, correct, wrong, onClick }) => {
  let borderColor = '#e2e8f0';
  let bg = '#fff';
  if (correct) { borderColor = '#16a34a'; bg = '#dcfce7'; }
  else if (wrong) { borderColor = '#dc2626'; bg = '#fee2e2'; }
  else if (selected) { borderColor = '#3a86ff'; bg = '#dbeafe'; }

  return (
    <div
      onClick={onClick}
      style={{
        background: bg,
        border: `2.5px solid ${borderColor}`,
        borderRadius: '14px',
        padding: '12px',
        textAlign: 'center',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'all .15s',
        minWidth: '80px',
      }}
    >
      <div style={{ fontSize: '2.2rem', marginBottom: '4px' }}>{emoji}</div>
      <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#374151' }}>{name}</div>
    </div>
  );
};

// ─────────────────────────────────────────────
// Story box (like the Deba/Deep story context)
// ─────────────────────────────────────────────
export const StoryBox = ({ children }) => (
  <div style={{
    background: 'linear-gradient(135deg, #fef3c7, #fde68a)',
    border: '2px solid #f59e0b',
    borderRadius: '14px',
    padding: '12px 16px',
    fontSize: '0.88rem',
    fontWeight: 600,
    color: '#78350f',
    lineHeight: 1.6,
    marginBottom: '14px',
  }}>
    {children}
  </div>
);

// ─────────────────────────────────────────────
// Shuffle utility
// ─────────────────────────────────────────────
export const shuffle = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};
