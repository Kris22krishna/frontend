import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { generateThousandsSkillsData } from './skillsData';
import '../../thousands-around-us.css';

/* ═══════════════════════════════════
   SHUFFLE UTILITIES
   ═══════════════════════════════════ */
const shuffleArray = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const useShuffledQuestions = (sourceQuestions, amount = 20) => {
  const [questions, setQuestions] = useState([]);
  useEffect(() => {
    if (!sourceQuestions) return;
    let shuffledQs = shuffleArray(sourceQuestions).slice(0, amount);
    shuffledQs = shuffledQs.map(q => {
      if (q.type === 'multiple-choice') {
        const originalCorrectOption = q.options[q.correctAnswer];
        const shuffledOptions = shuffleArray(q.options);
        const newCorrectAnswerIndex = shuffledOptions.indexOf(originalCorrectOption);
        return { ...q, options: shuffledOptions, correctAnswer: newCorrectAnswerIndex };
      }
      return q;
    });
    setQuestions(shuffledQs);
  }, [sourceQuestions, amount]);
  return questions;
};

/* ═══════════════════════════════════
   INTERACTIVE: PLACE VALUE SLOTS
   ═══════════════════════════════════ */
function PlaceValueSlots({ q, onAnswer, disabled, result }) {
  const PLACES = ['Thousands', 'Hundreds', 'Tens', 'Ones'];
  const COLORS = ['#2563eb', '#8b5cf6', '#f59e0b', '#10b981'];
  const [slots, setSlots] = useState([null, null, null, null]);
  const [bank, setBank] = useState([...q.digits]);

  const placeDigit = (digit, bankIdx) => {
    if (disabled) return;
    const firstEmpty = slots.findIndex(s => s === null);
    if (firstEmpty === -1) return;
    const newSlots = [...slots];
    newSlots[firstEmpty] = digit;
    setSlots(newSlots);
    const newBank = [...bank];
    newBank.splice(bankIdx, 1);
    setBank(newBank);
    // Check if all filled
    if (newSlots.every(s => s !== null)) {
      const isCorrect = newSlots.every((s, i) => s === q.correctSlots[i]);
      onAnswer({ slots: newSlots, isCorrect });
    }
  };

  const removeDigit = (slotIdx) => {
    if (disabled) return;
    if (slots[slotIdx] === null) return;
    const newBank = [...bank, slots[slotIdx]];
    const newSlots = [...slots];
    newSlots[slotIdx] = null;
    setSlots(newSlots);
    setBank(newBank);
  };

  return (
    <div style={{ marginBottom: 20 }}>
      {q.image && <div style={{ fontSize: 48, textAlign: 'center', marginBottom: 12, padding: 16, background: '#f8fafc', borderRadius: 16 }}>{q.image}</div>}
      <p style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, color: '#0f172a' }}>{q.question}</p>

      {/* Slots */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 20 }}>
        {PLACES.map((place, i) => (
          <div key={place} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: COLORS[i], textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6 }}>{place}</div>
            <button
              onClick={() => removeDigit(i)}
              style={{
                width: '100%', aspectRatio: '1', borderRadius: 16,
                border: `3px dashed ${slots[i] !== null ? COLORS[i] : '#cbd5e1'}`,
                background: slots[i] !== null
                  ? (disabled && result ? (slots[i] === q.correctSlots[i] ? '#dcfce7' : '#fee2e2') : `${COLORS[i]}10`)
                  : '#f8fafc',
                fontSize: 32, fontWeight: 900, color: COLORS[i],
                cursor: disabled ? 'default' : 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.2s'
              }}
            >
              {slots[i] !== null ? slots[i] : '?'}
            </button>
          </div>
        ))}
      </div>

      {/* Digit Bank */}
      {!disabled && (
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#64748b', width: '100%', textAlign: 'center', marginBottom: 4 }}>Tap a digit to place it:</div>
          {bank.map((d, i) => (
            <button key={i} onClick={() => placeDigit(d, i)}
              style={{
                width: 56, height: 56, borderRadius: 14,
                background: 'linear-gradient(135deg, #3b82f6, #6366f1)',
                color: '#fff', fontSize: 24, fontWeight: 900,
                border: 'none', cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(59,130,246,0.3)',
                transition: 'all 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}
            >{d}</button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════
   INTERACTIVE: NUMBER BUILDER
   ═══════════════════════════════════ */
function NumberBuilder({ q, onAnswer, disabled, result }) {
  const [digits, setDigits] = useState(['', '', '', '']);
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
  const PLACES = ['Th', 'H', 'T', 'O'];
  const COLORS = ['#2563eb', '#8b5cf6', '#f59e0b', '#10b981'];

  const handleChange = (idx, val) => {
    if (disabled) return;
    if (val.length > 1) val = val.slice(-1);
    if (val && !/^\d$/.test(val)) return;
    const nd = [...digits]; nd[idx] = val; setDigits(nd);
    if (val && idx < 3) inputRefs[idx + 1].current?.focus();
  };

  const handleSubmit = () => {
    const num = +digits.join('');
    onAnswer({ value: num, isCorrect: num === q.correctAnswer });
  };

  const allFilled = digits.every(d => d !== '');

  return (
    <div style={{ marginBottom: 20 }}>
      {q.image && <div style={{ fontSize: 48, textAlign: 'center', marginBottom: 12, padding: 16, background: '#f8fafc', borderRadius: 16 }}>{q.image}</div>}
      <p style={{ fontSize: 18, fontWeight: 700, marginBottom: 20, color: '#0f172a' }}>{q.question}</p>

      <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginBottom: 16 }}>
        {PLACES.map((p, i) => (
          <div key={p} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: COLORS[i], marginBottom: 6, textTransform: 'uppercase', letterSpacing: 1 }}>{p}</div>
            <input
              ref={inputRefs[i]}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={disabled ? String(q.correctAnswer).padStart(4, '0')[i] || digits[i] : digits[i]}
              onChange={(e) => handleChange(i, e.target.value)}
              disabled={disabled}
              style={{
                width: 60, height: 70, borderRadius: 14, textAlign: 'center',
                fontSize: 28, fontWeight: 900,
                border: `3px solid ${disabled && result ? (result.isCorrect ? '#10b981' : '#ef4444') : digits[i] ? COLORS[i] : '#e2e8f0'}`,
                background: disabled && result ? (result.isCorrect ? '#dcfce7' : '#fee2e2') : '#fff',
                color: COLORS[i], outline: 'none',
                transition: 'all 0.2s'
              }}
            />
          </div>
        ))}
      </div>

      {!disabled && (
        <div style={{ textAlign: 'center' }}>
          <button onClick={handleSubmit} disabled={!allFilled}
            style={{
              padding: '12px 36px', borderRadius: 100, border: 'none',
              background: allFilled ? 'linear-gradient(135deg, #3b82f6, #6366f1)' : '#e2e8f0',
              color: allFilled ? '#fff' : '#94a3b8', fontWeight: 800, fontSize: 16,
              cursor: allFilled ? 'pointer' : 'default',
              boxShadow: allFilled ? '0 4px 14px rgba(59,130,246,0.3)' : 'none',
            }}>Check Answer ✓</button>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════
   INTERACTIVE: EXPANDED FORM FILL
   ═══════════════════════════════════ */
function ExpandedFill({ q, onAnswer, disabled, result }) {
  const [values, setValues] = useState(q.parts.map(() => ''));
  const COLORS = ['#2563eb', '#8b5cf6', '#f59e0b', '#10b981'];

  const handleChange = (idx, val) => {
    if (disabled) return;
    const nv = [...values]; nv[idx] = val; setValues(nv);
  };

  const handleSubmit = () => {
    const isCorrect = values.every((v, i) => +v === q.parts[i].value);
    onAnswer({ values: values.map(Number), isCorrect });
  };

  const allFilled = values.every(v => v !== '');

  return (
    <div style={{ marginBottom: 20 }}>
      {q.image && <div style={{ fontSize: 48, textAlign: 'center', marginBottom: 12, padding: 16, background: '#f8fafc', borderRadius: 16 }}>{q.image}</div>}
      <p style={{ fontSize: 18, fontWeight: 700, marginBottom: 20, color: '#0f172a' }}>{q.question}</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 16 }}>
        {q.parts.map((part, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', borderRadius: 14, background: '#f8fafc', border: '1px solid #e2e8f0' }}>
            <span style={{ fontSize: 13, fontWeight: 800, color: COLORS[i], textTransform: 'uppercase', width: 100, letterSpacing: 1 }}>{part.place}</span>
            <span style={{ fontWeight: 700, color: '#334155' }}>{part.digit} × {part.multiplier.toLocaleString()} =</span>
            <input
              type="number"
              value={disabled ? part.value : values[i]}
              onChange={(e) => handleChange(i, e.target.value)}
              disabled={disabled}
              style={{
                width: 100, padding: '8px 12px', borderRadius: 10, fontSize: 16, fontWeight: 700,
                border: `2px solid ${disabled && result ? (result.isCorrect ? '#10b981' : '#ef4444') : values[i] ? COLORS[i] : '#e2e8f0'}`,
                background: disabled && result ? (+values[i] === part.value ? '#dcfce7' : '#fee2e2') : '#fff',
                color: '#0f172a', outline: 'none', textAlign: 'center'
              }}
            />
            {i < q.parts.length - 1 && <span style={{ fontWeight: 700, color: '#94a3b8', fontSize: 20 }}>+</span>}
          </div>
        ))}
      </div>
      {!disabled && (
        <div style={{ textAlign: 'center' }}>
          <button onClick={handleSubmit} disabled={!allFilled}
            style={{
              padding: '12px 36px', borderRadius: 100, border: 'none',
              background: allFilled ? 'linear-gradient(135deg, #8b5cf6, #6366f1)' : '#e2e8f0',
              color: allFilled ? '#fff' : '#94a3b8', fontWeight: 800, fontSize: 16,
              cursor: allFilled ? 'pointer' : 'default'
            }}>Check Answer ✓</button>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════
   INTERACTIVE: ORDERING
   ═══════════════════════════════════ */
function OrderingChallenge({ q, onAnswer, disabled, result }) {
  const [order, setOrder] = useState([]);
  const [remaining, setRemaining] = useState([...q.numbers]);

  const addNumber = (num, idx) => {
    if (disabled) return;
    const newOrder = [...order, num];
    const newRemaining = [...remaining];
    newRemaining.splice(idx, 1);
    setOrder(newOrder);
    setRemaining(newRemaining);
    if (newRemaining.length === 0) {
      const isCorrect = newOrder.every((n, i) => n === q.correctOrder[i]);
      onAnswer({ order: newOrder, isCorrect });
    }
  };

  const removeNumber = (idx) => {
    if (disabled) return;
    const num = order[idx];
    const newOrder = [...order];
    newOrder.splice(idx, 1);
    setOrder(newOrder);
    setRemaining([...remaining, num]);
  };

  return (
    <div style={{ marginBottom: 20 }}>
      {q.image && <div style={{ fontSize: 48, textAlign: 'center', marginBottom: 12, padding: 16, background: '#f8fafc', borderRadius: 16 }}>{q.image}</div>}
      <p style={{ fontSize: 18, fontWeight: 700, marginBottom: 20, color: '#0f172a' }}>{q.question}</p>

      {/* Answer slots */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, justifyContent: 'center', minHeight: 60, flexWrap: 'wrap' }}>
        {q.numbers.map((_, i) => (
          <div key={i}
            onClick={() => order[i] !== undefined && removeNumber(i)}
            style={{
              width: 90, height: 52, borderRadius: 12,
              border: `3px dashed ${order[i] !== undefined ? '#10b981' : '#cbd5e1'}`,
              background: order[i] !== undefined
                ? (disabled && result ? (order[i] === q.correctOrder[i] ? '#dcfce7' : '#fee2e2') : '#f0fdf4')
                : '#f8fafc',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 18, fontWeight: 800, color: '#0f172a',
              cursor: disabled ? 'default' : 'pointer',
              transition: 'all 0.2s'
            }}
          >
            {order[i] !== undefined ? order[i].toLocaleString() : `#${i + 1}`}
          </div>
        ))}
      </div>

      {/* Arrows between slots */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 16, fontSize: 18, color: '#cbd5e1' }}>
        {q.numbers.map((_, i) => i < q.numbers.length - 1 ? <span key={i}>→</span> : null)}
      </div>

      {/* Number bank */}
      {!disabled && remaining.length > 0 && (
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#64748b', textAlign: 'center', marginBottom: 8 }}>Tap numbers in the correct order:</div>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
            {remaining.map((num, i) => (
              <button key={i} onClick={() => addNumber(num, i)}
                style={{
                  padding: '12px 20px', borderRadius: 12,
                  background: 'linear-gradient(135deg, #f59e0b, #f97316)',
                  color: '#fff', fontWeight: 800, fontSize: 16,
                  border: 'none', cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(245,158,11,0.3)',
                  transition: 'all 0.15s'
                }}>{num.toLocaleString()}</button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════
   MCQ QUESTION CARD
   ═══════════════════════════════════ */
function McqCard({ q, onAnswer, disabled, selectedOption }) {
  return (
    <div style={{ marginBottom: 20 }}>
      {q.image && <div style={{ fontSize: 48, textAlign: 'center', marginBottom: 12, padding: 16, background: '#f8fafc', borderRadius: 16 }}>{q.image}</div>}
      <p style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, color: '#0f172a' }}>{q.question}</p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        {q.options.map((opt, i) => {
          let bg = '#fff', bdr = '#e2e8f0', clr = '#0f172a';
          const letter = String.fromCharCode(65 + i);
          if (disabled) {
            if (i === q.correctAnswer) { bg = '#f0fdf4'; bdr = '#10b981'; }
            else if (i === selectedOption) { bg = '#fef2f2'; bdr = '#ef4444'; }
            else { clr = '#94a3b8'; }
          }
          return (
            <button key={i} onClick={() => onAnswer(i)} disabled={disabled}
              style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '14px 16px', borderRadius: 12, border: `2px solid ${bdr}`,
                background: bg, textAlign: 'left', fontWeight: 600, fontSize: 15,
                cursor: disabled ? 'default' : 'pointer', transition: 'all 0.2s', color: clr
              }}>
              <span style={{
                width: 28, height: 28, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 13, fontWeight: 800, flexShrink: 0,
                background: i === selectedOption ? (i === q.correctAnswer ? '#10b981' : '#ef4444') : '#f1f5f9',
                color: i === selectedOption ? '#fff' : '#64748b'
              }}>{letter}</span>
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════
   UNIFIED QUESTION CARD
   ═══════════════════════════════════ */
function QuestionCard({ q, onAnswer, disabled, answerResult, selectedOption }) {
  if (q.type === 'multiple-choice') return <McqCard q={q} onAnswer={onAnswer} disabled={disabled} selectedOption={selectedOption} />;
  if (q.type === 'place-value-slots') return <PlaceValueSlots q={q} onAnswer={onAnswer} disabled={disabled} result={answerResult} />;
  if (q.type === 'number-builder') return <NumberBuilder q={q} onAnswer={onAnswer} disabled={disabled} result={answerResult} />;
  if (q.type === 'expanded-fill') return <ExpandedFill q={q} onAnswer={onAnswer} disabled={disabled} result={answerResult} />;
  if (q.type === 'ordering') return <OrderingChallenge q={q} onAnswer={onAnswer} disabled={disabled} result={answerResult} />;
  return null;
}

/* ═══════════════════════════════════
   SCORE RING
   ═══════════════════════════════════ */
function ScoreRing({ score, total, color }) {
  const pct = total > 0 ? score / total : 0;
  const r = 70, circ = 2 * Math.PI * r;
  const offset = circ * (1 - pct);
  return (
    <svg width="180" height="180" viewBox="0 0 180 180" style={{ display: 'block', margin: '0 auto' }}>
      <circle cx="90" cy="90" r={r} fill="none" stroke="#e2e8f0" strokeWidth="10" />
      <circle cx="90" cy="90" r={r} fill="none" stroke={color} strokeWidth="10"
        strokeDasharray={circ} strokeDashoffset={offset}
        strokeLinecap="round" transform="rotate(-90 90 90)"
        style={{ transition: 'stroke-dashoffset 1s ease' }} />
      <text x="90" y="85" textAnchor="middle" dominantBaseline="central" fontSize="40" fontWeight="900" fill="#0f172a">{score}</text>
      <text x="90" y="115" textAnchor="middle" dominantBaseline="central" fontSize="14" fontWeight="600" fill="#64748b">out of {total}</text>
    </svg>
  );
}

function fmtTime(ms) {
  const sec = Math.floor(ms / 1000);
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

/* ═══════════════════════════════════
   VISUAL LEARN: Place Value Chart
   ═══════════════════════════════════ */
function PlaceValueChart({ color }) {
  const rnd = (a, b) => Math.floor(Math.random() * (b - a + 1)) + a;
  const [num, setNum] = useState(() => rnd(1000, 9999));
  const PLACES = ['Thousands', 'Hundreds', 'Tens', 'Ones'];
  const SHORT = ['Th', 'H', 'T', 'O'];
  const MULTS = [1000, 100, 10, 1];
  const COLORS = ['#2563eb', '#8b5cf6', '#f59e0b', '#10b981'];
  const BLOCKS = ['🏢', '🧱', '📏', '🔵'];
  const d = String(num).padStart(4, '0').split('').map(Number);

  return (
    <div style={{ padding: 20, borderRadius: 20, background: '#f8fafc', border: '1px solid #e2e8f0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <div style={{ fontSize: 16, fontWeight: 800, color: '#0f172a' }}>🏗️ Place Value Chart</div>
        <button onClick={() => setNum(rnd(1000, 9999))}
          style={{ padding: '6px 16px', borderRadius: 100, background: color, color: '#fff', border: 'none', fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>🎲 New</button>
      </div>

      {/* Big number */}
      <div style={{ textAlign: 'center', fontSize: 52, fontWeight: 900, letterSpacing: 8, marginBottom: 24, color: '#0f172a' }}>
        {d.map((digit, i) => (
          <span key={i} style={{ color: COLORS[i] }}>{digit}</span>
        ))}
      </div>

      {/* Visual columns */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
        {d.map((digit, i) => (
          <div key={i} style={{ textAlign: 'center', padding: 12, borderRadius: 16, background: `${COLORS[i]}08`, border: `2px solid ${COLORS[i]}25` }}>
            {/* Column header */}
            <div style={{ fontSize: 11, fontWeight: 800, color: COLORS[i], textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>{PLACES[i]}</div>
            {/* Big digit */}
            <div style={{ fontSize: 36, fontWeight: 900, color: COLORS[i], marginBottom: 8 }}>{digit}</div>
            {/* Visual blocks */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 3, justifyContent: 'center', minHeight: 32, marginBottom: 8 }}>
              {Array.from({ length: digit }).map((_, j) => (
                <span key={j} style={{ fontSize: i === 0 ? 20 : i === 1 ? 16 : i === 2 ? 14 : 12, animation: `fadeIn 0.2s ease ${j * 0.05}s both` }}>{BLOCKS[i]}</span>
              ))}
            </div>
            {/* Value */}
            <div style={{ fontSize: 14, fontWeight: 800, color: COLORS[i], padding: '4px 8px', background: `${COLORS[i]}12`, borderRadius: 8 }}>
              = {(digit * MULTS[i]).toLocaleString()}
            </div>
          </div>
        ))}
      </div>

      {/* Sum bar */}
      <div style={{ marginTop: 16, padding: 12, borderRadius: 12, background: '#0f172a', textAlign: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, flexWrap: 'wrap' }}>
          {d.map((digit, i) => (
            <React.Fragment key={i}>
              {i > 0 && <span style={{ color: '#64748b', fontWeight: 900, fontSize: 18 }}>+</span>}
              <span style={{ color: COLORS[i], fontWeight: 900, fontSize: 18 }}>{(digit * MULTS[i]).toLocaleString()}</span>
            </React.Fragment>
          ))}
          <span style={{ color: '#64748b', fontWeight: 900, fontSize: 18 }}>=</span>
          <span style={{ color: '#fff', fontWeight: 900, fontSize: 22 }}>{num.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════
   VISUAL LEARN: Face vs Place (same digit, different positions)
   ═══════════════════════════════════ */
function FaceVsPlaceVisual({ color }) {
  const [digit, setDigit] = useState(5);
  const PLACES = ['Thousands', 'Hundreds', 'Tens', 'Ones'];
  const MULTS = [1000, 100, 10, 1];
  const COLORS = ['#2563eb', '#8b5cf6', '#f59e0b', '#10b981'];
  const BLOCKS = ['🏢', '🧱', '📏', '🔵'];

  return (
    <div style={{ padding: 20, borderRadius: 20, background: '#f8fafc', border: '1px solid #e2e8f0' }}>
      <div style={{ fontSize: 16, fontWeight: 800, color: '#0f172a', marginBottom: 16 }}>🎭 Same Digit, Different Values!</div>

      {/* Digit picker */}
      <div style={{ display: 'flex', gap: 6, justifyContent: 'center', marginBottom: 20 }}>
        {[1,2,3,4,5,6,7,8,9].map(d => (
          <button key={d} onClick={() => setDigit(d)}
            style={{
              width: 40, height: 40, borderRadius: 10,
              background: digit === d ? color : '#fff',
              border: `2px solid ${digit === d ? color : '#e2e8f0'}`,
              color: digit === d ? '#fff' : '#334155',
              fontWeight: 900, fontSize: 16, cursor: 'pointer'
            }}>{d}</button>
        ))}
      </div>

      {/* Visual comparison */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
        {PLACES.map((place, i) => {
          const value = digit * MULTS[i];
          const numStr = String(value).padStart(4, '0');
          return (
            <div key={i} style={{
              textAlign: 'center', padding: 16, borderRadius: 16,
              background: '#fff', border: `2px solid ${COLORS[i]}30`,
              transition: 'all 0.3s'
            }}>
              {/* Number with highlighted digit */}
              <div style={{ fontSize: 22, fontWeight: 900, marginBottom: 8, letterSpacing: 2 }}>
                {[...String(value)].map((ch, ci) => (
                  <span key={ci} style={{ color: ch === String(digit) && ci === 0 ? COLORS[i] : '#cbd5e1' }}>{ch}</span>
                ))}
              </div>
              {/* Place label */}
              <div style={{ fontSize: 11, fontWeight: 700, color: COLORS[i], textTransform: 'uppercase', marginBottom: 8 }}>{place}</div>
              {/* Blocks */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'center', minHeight: 24 }}>
                {Array.from({ length: Math.min(digit, 9) }).map((_, j) => (
                  <span key={j} style={{ fontSize: i === 0 ? 16 : i === 1 ? 14 : 12 }}>{BLOCKS[i]}</span>
                ))}
              </div>
              {/* Value */}
              <div style={{ marginTop: 8, fontSize: 16, fontWeight: 900, color: COLORS[i] }}>{value.toLocaleString()}</div>
            </div>
          );
        })}
      </div>

      {/* Arrow showing same digit */}
      <div style={{ textAlign: 'center', marginTop: 16, padding: 10, background: `${color}10`, borderRadius: 12 }}>
        <span style={{ fontSize: 28, fontWeight: 900, color: color }}>{digit}</span>
        <span style={{ fontSize: 14, fontWeight: 700, color: '#64748b', margin: '0 8px' }}>→</span>
        {MULTS.map((m, i) => (
          <React.Fragment key={i}>
            <span style={{ fontSize: 14, fontWeight: 800, color: COLORS[i] }}>{(digit * m).toLocaleString()}</span>
            {i < 3 && <span style={{ color: '#cbd5e1', margin: '0 4px' }}>·</span>}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════
   VISUAL LEARN: Number Explorer (interactive tap)
   ═══════════════════════════════════ */
function PlaceValueExplorer({ color }) {
  const rnd = (a, b) => Math.floor(Math.random() * (b - a + 1)) + a;
  const [num, setNum] = useState(() => rnd(1000, 9999));
  const [activeDigit, setActiveDigit] = useState(null);
  const PLACES = ['Thousands', 'Hundreds', 'Tens', 'Ones'];
  const MULTS = [1000, 100, 10, 1];
  const COLORS = ['#2563eb', '#8b5cf6', '#f59e0b', '#10b981'];
  const BLOCKS = ['🏢', '🧱', '📏', '🔵'];
  const d = String(num).padStart(4, '0').split('').map(Number);

  return (
    <div style={{ padding: 20, borderRadius: 20, background: '#f8fafc', border: '1px solid #e2e8f0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <div style={{ fontSize: 16, fontWeight: 800, color: '#0f172a' }}>🔍 Tap to Explore!</div>
        <button onClick={() => { setNum(rnd(1000, 9999)); setActiveDigit(null); }}
          style={{ padding: '6px 16px', borderRadius: 100, background: color, color: '#fff', border: 'none', fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>🎲 New</button>
      </div>

      {/* Tappable digits */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 16 }}>
        {d.map((digit, i) => (
          <button key={i} onClick={() => setActiveDigit(activeDigit === i ? null : i)}
            style={{
              width: 80, height: 90, borderRadius: 16,
              background: activeDigit === i ? `${COLORS[i]}12` : '#fff',
              border: `3px solid ${activeDigit === i ? COLORS[i] : '#e2e8f0'}`,
              fontSize: 42, fontWeight: 900, color: activeDigit === i ? COLORS[i] : '#0f172a',
              cursor: 'pointer', transition: 'all 0.25s',
              transform: activeDigit === i ? 'scale(1.1) translateY(-4px)' : 'scale(1)',
              boxShadow: activeDigit === i ? `0 8px 24px ${COLORS[i]}30` : 'none',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexDirection: 'column', gap: 4
            }}>
            <span>{digit}</span>
            <span style={{ fontSize: 10, fontWeight: 700, color: activeDigit === i ? COLORS[i] : '#cbd5e1' }}>{PLACES[i].slice(0, 2)}</span>
          </button>
        ))}
      </div>

      {/* Reveal panel */}
      {activeDigit !== null && (
        <div style={{
          padding: 20, borderRadius: 16, background: `${COLORS[activeDigit]}08`,
          border: `2px solid ${COLORS[activeDigit]}30`, textAlign: 'center'
        }}>
          {/* Visual equation */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 12 }}>
            <div style={{ fontSize: 48, fontWeight: 900, color: COLORS[activeDigit] }}>{d[activeDigit]}</div>
            <div style={{ fontSize: 24, color: '#94a3b8' }}>×</div>
            <div style={{ padding: '8px 16px', borderRadius: 10, background: `${COLORS[activeDigit]}15`, fontSize: 24, fontWeight: 900, color: COLORS[activeDigit] }}>{MULTS[activeDigit].toLocaleString()}</div>
            <div style={{ fontSize: 24, color: '#94a3b8' }}>=</div>
            <div style={{ padding: '8px 16px', borderRadius: 10, background: COLORS[activeDigit], fontSize: 28, fontWeight: 900, color: '#fff' }}>{(d[activeDigit] * MULTS[activeDigit]).toLocaleString()}</div>
          </div>
          {/* Blocks */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, justifyContent: 'center' }}>
            {Array.from({ length: d[activeDigit] }).map((_, j) => (
              <span key={j} style={{ fontSize: 28, animation: `fadeIn 0.2s ease ${j * 0.06}s both` }}>{BLOCKS[activeDigit]}</span>
            ))}
          </div>
          <div style={{ fontSize: 12, fontWeight: 700, color: COLORS[activeDigit], marginTop: 8, textTransform: 'uppercase', letterSpacing: 1 }}>
            {d[activeDigit]} {PLACES[activeDigit]}
          </div>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════
   VISUAL LEARN: Expanded Form Breakdown
   ═══════════════════════════════════ */
function ExpandedVisualBreakdown({ color }) {
  const rnd = (a, b) => Math.floor(Math.random() * (b - a + 1)) + a;
  const [num, setNum] = useState(() => rnd(1000, 9999));
  const [revealed, setRevealed] = useState(0);
  const MULTS = [1000, 100, 10, 1];
  const COLORS = ['#2563eb', '#8b5cf6', '#f59e0b', '#10b981'];
  const PLACES = ['Th', 'H', 'T', 'O'];
  const d = String(num).padStart(4, '0').split('').map(Number);

  const reset = () => { setNum(rnd(1000, 9999)); setRevealed(0); };

  return (
    <div style={{ padding: 20, borderRadius: 20, background: '#f8fafc', border: '1px solid #e2e8f0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <div style={{ fontSize: 16, fontWeight: 800, color: '#0f172a' }}>🧩 Break It Apart!</div>
        <button onClick={reset}
          style={{ padding: '6px 16px', borderRadius: 100, background: color, color: '#fff', border: 'none', fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>🎲 New</button>
      </div>

      {/* Original number */}
      <div style={{ textAlign: 'center', marginBottom: 20 }}>
        <div style={{ fontSize: 48, fontWeight: 900, letterSpacing: 6 }}>
          {d.map((digit, i) => (
            <span key={i} style={{ color: revealed > i ? COLORS[i] : '#0f172a', transition: 'color 0.3s' }}>{digit}</span>
          ))}
        </div>
      </div>

      {/* Breakdown rows — tap to reveal each */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
        {d.map((digit, i) => (
          <button key={i} onClick={() => setRevealed(Math.max(revealed, i + 1))} disabled={revealed > i}
            style={{
              display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', borderRadius: 14,
              background: revealed > i ? `${COLORS[i]}08` : '#fff',
              border: `2px solid ${revealed > i ? COLORS[i] : '#e2e8f0'}`,
              cursor: revealed > i ? 'default' : 'pointer', transition: 'all 0.3s', width: '100%'
            }}>
            {/* Place label */}
            <div style={{ width: 36, height: 36, borderRadius: 10, background: revealed > i ? COLORS[i] : '#e2e8f0', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 13, flexShrink: 0 }}>{PLACES[i]}</div>
            {/* Content */}
            {revealed > i ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1, animation: 'fadeIn 0.3s ease both' }}>
                <span style={{ fontSize: 28, fontWeight: 900, color: COLORS[i] }}>{digit}</span>
                <span style={{ color: '#94a3b8', fontSize: 18 }}>×</span>
                <span style={{ fontSize: 18, fontWeight: 800, color: '#64748b' }}>{MULTS[i].toLocaleString()}</span>
                <span style={{ color: '#94a3b8', fontSize: 18 }}>=</span>
                <span style={{ fontSize: 22, fontWeight: 900, color: COLORS[i], padding: '4px 12px', background: `${COLORS[i]}12`, borderRadius: 8 }}>{(digit * MULTS[i]).toLocaleString()}</span>
              </div>
            ) : (
              <div style={{ flex: 1, fontSize: 16, fontWeight: 700, color: '#cbd5e1' }}>👆 Tap to reveal</div>
            )}
          </button>
        ))}
      </div>

      {/* Final sum when all revealed */}
      {revealed >= 4 && (
        <div style={{ padding: 16, borderRadius: 14, background: '#0f172a', textAlign: 'center', animation: 'fadeIn 0.4s ease both' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, flexWrap: 'wrap' }}>
            {d.map((digit, i) => (
              <React.Fragment key={i}>
                {i > 0 && <span style={{ color: '#475569', fontWeight: 900 }}>+</span>}
                <span style={{ color: COLORS[i], fontWeight: 900, fontSize: 18 }}>{(digit * MULTS[i]).toLocaleString()}</span>
              </React.Fragment>
            ))}
            <span style={{ color: '#475569', fontWeight: 900, fontSize: 18 }}>=</span>
            <span style={{ color: '#fff', fontWeight: 900, fontSize: 24 }}>{num.toLocaleString()} ✨</span>
          </div>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════
   VISUAL LEARN: Zero Placeholder
   ═══════════════════════════════════ */
function ZeroPlaceholderVisual({ color }) {
  const examples = [
    { num: 7045, desc: '0 in Hundreds' },
    { num: 3001, desc: '0 in Hundreds & Tens' },
    { num: 4500, desc: '0 in Tens & Ones' },
    { num: 1020, desc: '0 in Hundreds & Ones' },
  ];
  const [idx, setIdx] = useState(0);
  const ex = examples[idx];
  const MULTS = [1000, 100, 10, 1];
  const COLORS = ['#2563eb', '#8b5cf6', '#f59e0b', '#10b981'];
  const d = String(ex.num).padStart(4, '0').split('').map(Number);
  const nonZeroParts = d.map((v, i) => v * MULTS[i]).filter(v => v > 0);

  return (
    <div style={{ padding: 20, borderRadius: 20, background: '#f8fafc', border: '1px solid #e2e8f0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <div style={{ fontSize: 16, fontWeight: 800, color: '#0f172a' }}>🕳️ Zero = Placeholder!</div>
        <button onClick={() => setIdx((idx + 1) % examples.length)}
          style={{ padding: '6px 16px', borderRadius: 100, background: color, color: '#fff', border: 'none', fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>Next Example →</button>
      </div>

      {/* Number with highlighted zeros */}
      <div style={{ textAlign: 'center', marginBottom: 16 }}>
        <div style={{ fontSize: 52, fontWeight: 900, letterSpacing: 8 }}>
          {d.map((digit, i) => (
            <span key={i} style={{
              color: digit === 0 ? '#ef4444' : COLORS[i],
              textDecoration: digit === 0 ? 'line-through' : 'none',
              position: 'relative'
            }}>
              {digit}
            </span>
          ))}
        </div>
        <div style={{ fontSize: 13, fontWeight: 700, color: '#ef4444', marginTop: 4 }}>{ex.desc}</div>
      </div>

      {/* Expanded form showing skipped zeros */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
        {d.map((digit, i) => {
          const val = digit * MULTS[i];
          if (digit === 0) {
            return (
              <div key={i} style={{
                padding: '8px 16px', borderRadius: 10,
                background: '#fef2f2', border: '2px dashed #fca5a5',
                fontSize: 16, fontWeight: 700, color: '#fca5a5',
                textDecoration: 'line-through'
              }}>0</div>
            );
          }
          return (
            <React.Fragment key={i}>
              {nonZeroParts.indexOf(val) > 0 && <span style={{ fontWeight: 900, color: '#94a3b8', fontSize: 18 }}>+</span>}
              <div style={{
                padding: '8px 16px', borderRadius: 10,
                background: `${COLORS[i]}10`, border: `2px solid ${COLORS[i]}`,
                fontSize: 18, fontWeight: 900, color: COLORS[i]
              }}>{val.toLocaleString()}</div>
            </React.Fragment>
          );
        })}
      </div>

      {/* Result */}
      <div style={{ textAlign: 'center', padding: '10px 20px', background: '#0f172a', borderRadius: 10 }}>
        <span style={{ color: '#fff', fontWeight: 900, fontSize: 18 }}>{nonZeroParts.map(v => v.toLocaleString()).join(' + ')} = {ex.num.toLocaleString()}</span>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════
   VISUAL LEARN: Number Exploder (interactive)
   ═══════════════════════════════════ */
function ExpandedFormExploder({ color }) {
  const rnd = (a, b) => Math.floor(Math.random() * (b - a + 1)) + a;
  const [num, setNum] = useState(() => rnd(1000, 9999));
  const [exploded, setExploded] = useState(false);
  const [assembled, setAssembled] = useState(false);
  const MULTS = [1000, 100, 10, 1];
  const COLORS = ['#2563eb', '#8b5cf6', '#f59e0b', '#10b981'];
  const d = String(num).padStart(4, '0').split('').map(Number);
  const parts = d.map((v, i) => v * MULTS[i]);

  const reset = () => { setNum(rnd(1000, 9999)); setExploded(false); setAssembled(false); };

  return (
    <div style={{ padding: 20, borderRadius: 20, background: '#f8fafc', border: '1px solid #e2e8f0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <div style={{ fontSize: 16, fontWeight: 800, color: '#0f172a' }}>💥 Tap to Explode!</div>
        <button onClick={reset}
          style={{ padding: '6px 16px', borderRadius: 100, background: color, color: '#fff', border: 'none', fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>🎲 New</button>
      </div>

      {!exploded && (
        <div style={{ textAlign: 'center' }}>
          <button onClick={() => setExploded(true)}
            style={{
              padding: '28px 56px', borderRadius: 24, fontSize: 56, fontWeight: 900,
              background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              color: '#fff', border: 'none', cursor: 'pointer',
              boxShadow: '0 10px 40px rgba(99,102,241,0.4)', letterSpacing: 6,
              transition: 'all 0.2s'
            }}>{num.toLocaleString()}</button>
          <div style={{ fontSize: 13, color: '#94a3b8', marginTop: 10, fontWeight: 700 }}>💥 TAP ME!</div>
        </div>
      )}

      {exploded && !assembled && (
        <div style={{ textAlign: 'center' }}>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 20 }}>
            {parts.map((val, i) => val > 0 && (
              <React.Fragment key={i}>
                {i > 0 && parts.slice(0, i).some(v => v > 0) && (
                  <span style={{ fontSize: 28, fontWeight: 900, color: '#94a3b8', display: 'flex', alignItems: 'center' }}>+</span>
                )}
                <div style={{
                  padding: '16px 24px', borderRadius: 16,
                  background: `${COLORS[i]}10`, border: `3px solid ${COLORS[i]}`,
                  fontSize: 28, fontWeight: 900, color: COLORS[i],
                  animation: `fadeIn 0.4s ease ${i * 0.15}s both`
                }}>{val.toLocaleString()}</div>
              </React.Fragment>
            ))}
          </div>
          <button onClick={() => setAssembled(true)}
            style={{
              padding: '12px 32px', borderRadius: 100,
              background: 'linear-gradient(135deg, #10b981, #059669)',
              color: '#fff', border: 'none', fontWeight: 800, fontSize: 15, cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(16,185,129,0.3)'
            }}>🧩 Put Back Together!</button>
        </div>
      )}

      {assembled && (
        <div style={{ textAlign: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginBottom: 12, flexWrap: 'wrap' }}>
            {parts.filter(v => v > 0).map((v, i, arr) => (
              <React.Fragment key={i}>
                <span style={{ fontSize: 16, fontWeight: 800, color: COLORS[d.findIndex((_, j) => d[j] * MULTS[j] === v)] }}>{v.toLocaleString()}</span>
                {i < arr.length - 1 && <span style={{ color: '#94a3b8' }}>+</span>}
              </React.Fragment>
            ))}
            <span style={{ color: '#94a3b8', fontWeight: 900 }}>=</span>
          </div>
          <div style={{
            display: 'inline-block', padding: '20px 48px', borderRadius: 20,
            background: 'linear-gradient(135deg, #10b981, #059669)',
            fontSize: 48, fontWeight: 900, color: '#fff',
            boxShadow: '0 10px 40px rgba(16,185,129,0.3)',
            animation: 'fadeIn 0.5s ease both'
          }}>{num.toLocaleString()}</div>
          <div style={{ fontSize: 32, marginTop: 10 }}>🎉</div>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════
   VISUAL LEARN: Side-by-Side Comparison
   ═══════════════════════════════════ */
function VisualComparison({ color }) {
  const rnd = (a, b) => Math.floor(Math.random() * (b - a + 1)) + a;
  const [pair, setPair] = useState(() => ({ a: rnd(1000, 9999), b: rnd(1000, 9999) }));
  const PLACES = ['Th', 'H', 'T', 'O'];
  const COLORS = ['#2563eb', '#8b5cf6', '#f59e0b', '#10b981'];
  const dA = String(pair.a).padStart(4, '0').split('').map(Number);
  const dB = String(pair.b).padStart(4, '0').split('').map(Number);

  let diffIdx = -1;
  for (let i = 0; i < 4; i++) { if (dA[i] !== dB[i]) { diffIdx = i; break; } }
  const sym = pair.a < pair.b ? '<' : pair.a > pair.b ? '>' : '=';

  return (
    <div style={{ padding: 20, borderRadius: 20, background: '#f8fafc', border: '1px solid #e2e8f0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <div style={{ fontSize: 16, fontWeight: 800, color: '#0f172a' }}>⚖️ Which is Bigger?</div>
        <button onClick={() => setPair({ a: rnd(1000, 9999), b: rnd(1000, 9999) })}
          style={{ padding: '6px 16px', borderRadius: 100, background: color, color: '#fff', border: 'none', fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>🎲 New</button>
      </div>

      {/* Side by side digit comparison */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginBottom: 16 }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ display: 'flex', gap: 4 }}>
            {dA.map((digit, i) => (
              <div key={i} style={{
                width: 52, height: 60, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexDirection: 'column', gap: 2,
                fontSize: 24, fontWeight: 900,
                background: i === diffIdx ? (dA[i] > dB[i] ? '#dcfce7' : '#fee2e2') : i < diffIdx ? '#f0f9ff' : '#fff',
                border: `2px solid ${COLORS[i]}`,
                color: COLORS[i]
              }}>
                <span>{digit}</span>
                <span style={{ fontSize: 9, fontWeight: 700 }}>{PLACES[i]}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ fontSize: 36, fontWeight: 900, color: sym === '<' ? '#ef4444' : sym === '>' ? '#10b981' : '#f59e0b' }}>{sym}</div>

        <div style={{ textAlign: 'center' }}>
          <div style={{ display: 'flex', gap: 4 }}>
            {dB.map((digit, i) => (
              <div key={i} style={{
                width: 52, height: 60, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexDirection: 'column', gap: 2,
                fontSize: 24, fontWeight: 900,
                background: i === diffIdx ? (dB[i] > dA[i] ? '#dcfce7' : '#fee2e2') : i < diffIdx ? '#f0f9ff' : '#fff',
                border: `2px solid ${COLORS[i]}`,
                color: COLORS[i]
              }}>
                <span>{digit}</span>
                <span style={{ fontSize: 9, fontWeight: 700 }}>{PLACES[i]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Arrow pointing to deciding digit */}
      {diffIdx >= 0 && (
        <div style={{ textAlign: 'center', padding: '8px 16px', borderRadius: 10, background: COLORS[diffIdx] + '12', border: `1px solid ${COLORS[diffIdx]}30` }}>
          <span style={{ fontSize: 24 }}>{dA[diffIdx] > dB[diffIdx] ? '👈' : '👉'}</span>
          <span style={{ fontSize: 14, fontWeight: 800, color: COLORS[diffIdx], marginLeft: 8 }}>
            {dA[diffIdx]} vs {dB[diffIdx]}
          </span>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════
   VISUAL LEARN: Number Line
   ═══════════════════════════════════ */
function NumberLineVisual({ color }) {
  const rnd = (a, b) => Math.floor(Math.random() * (b - a + 1)) + a;
  const gen = () => {
    const nums = [];
    while (nums.length < 3) { const n = rnd(1000, 9999); if (!nums.includes(n)) nums.push(n); }
    return nums;
  };
  const [nums, setNums] = useState(() => gen());
  const sorted = [...nums].sort((a, b) => a - b);
  const min = sorted[0], max = sorted[sorted.length - 1];
  const range = max - min || 1;
  const DOTS = ['#2563eb', '#ef4444', '#10b981'];

  return (
    <div style={{ padding: 20, borderRadius: 20, background: '#f8fafc', border: '1px solid #e2e8f0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <div style={{ fontSize: 16, fontWeight: 800, color: '#0f172a' }}>📏 Number Line</div>
        <button onClick={() => setNums(gen())}
          style={{ padding: '6px 16px', borderRadius: 100, background: color, color: '#fff', border: 'none', fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>🎲 New</button>
      </div>

      {/* Numbers */}
      <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginBottom: 20 }}>
        {nums.map((n, i) => (
          <div key={i} style={{
            padding: '10px 20px', borderRadius: 12,
            background: `${DOTS[i]}12`, border: `2px solid ${DOTS[i]}`,
            fontWeight: 900, fontSize: 20, color: DOTS[i]
          }}>{n.toLocaleString()}</div>
        ))}
      </div>

      {/* Number line */}
      <div style={{ position: 'relative', height: 80, margin: '0 32px' }}>
        {/* Line */}
        <div style={{ position: 'absolute', top: 30, left: 0, right: 0, height: 4, background: '#cbd5e1', borderRadius: 2 }} />
        {/* Arrows */}
        <div style={{ position: 'absolute', top: 26, left: -8, width: 0, height: 0, borderTop: '6px solid transparent', borderBottom: '6px solid transparent', borderRight: '10px solid #cbd5e1' }} />
        <div style={{ position: 'absolute', top: 26, right: -8, width: 0, height: 0, borderTop: '6px solid transparent', borderBottom: '6px solid transparent', borderLeft: '10px solid #cbd5e1' }} />
        {/* Dots */}
        {sorted.map((n, i) => {
          const pct = range > 0 ? ((n - min) / range) * 80 + 10 : 50;
          const origIdx = nums.indexOf(n);
          return (
            <div key={i} style={{ position: 'absolute', left: `${pct}%`, top: 18, transform: 'translateX(-50%)', textAlign: 'center' }}>
              <div style={{ width: 24, height: 24, borderRadius: '50%', background: DOTS[origIdx], margin: '0 auto', boxShadow: `0 2px 8px ${DOTS[origIdx]}40` }} />
              <div style={{ fontSize: 13, fontWeight: 800, color: DOTS[origIdx], marginTop: 6 }}>{n.toLocaleString()}</div>
            </div>
          );
        })}
      </div>

      {/* Order */}
      <div style={{ textAlign: 'center', marginTop: 8, padding: '8px 16px', background: '#0f172a', borderRadius: 10 }}>
        <div style={{ color: '#fff', fontWeight: 800, fontSize: 15 }}>
          {sorted.map((n, i) => (
            <React.Fragment key={i}>
              <span style={{ color: DOTS[nums.indexOf(n)] }}>{n.toLocaleString()}</span>
              {i < sorted.length - 1 && <span style={{ color: '#475569', margin: '0 6px' }}>&lt;</span>}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════
   VISUAL LEARN: Comparison Arena (interactive)
   ═══════════════════════════════════ */
function ComparisonArena({ color }) {
  const rnd = (a, b) => Math.floor(Math.random() * (b - a + 1)) + a;
  const [pair, setPair] = useState(() => ({ a: rnd(1000, 9999), b: rnd(1000, 9999) }));
  const [step, setStep] = useState(0);
  const [userAnswer, setUserAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const PLACES = ['Th', 'H', 'T', 'O'];
  const COLORS = ['#2563eb', '#8b5cf6', '#f59e0b', '#10b981'];
  const dA = String(pair.a).padStart(4, '0').split('').map(Number);
  const dB = String(pair.b).padStart(4, '0').split('').map(Number);
  const correct = pair.a < pair.b ? '<' : pair.a > pair.b ? '>' : '=';
  let diffPos = 4;
  for (let i = 0; i < 4; i++) { if (dA[i] !== dB[i]) { diffPos = i; break; } }

  const reset = () => { setPair({ a: rnd(1000, 9999), b: rnd(1000, 9999) }); setStep(0); setUserAnswer(null); setShowResult(false); };

  return (
    <div style={{ padding: 20, borderRadius: 20, background: '#f8fafc', border: '1px solid #e2e8f0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <div style={{ fontSize: 16, fontWeight: 800, color: '#0f172a' }}>⚔️ You Decide!</div>
        <button onClick={reset}
          style={{ padding: '6px 16px', borderRadius: 100, background: color, color: '#fff', border: 'none', fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>🎲 New</button>
      </div>

      {/* Digit reveal */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginBottom: 16 }}>
        <div style={{ display: 'flex', gap: 4 }}>
          {dA.map((digit, i) => (
            <div key={i} style={{
              width: 52, height: 60, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column',
              fontSize: 26, fontWeight: 900,
              background: i <= step ? (i === diffPos && i <= step ? (dA[i] > dB[i] ? '#dcfce7' : '#fee2e2') : '#f0f9ff') : '#fff',
              border: `2px solid ${i <= step ? COLORS[i] : '#e2e8f0'}`,
              color: i <= step ? COLORS[i] : '#cbd5e1'
            }}>
              <span>{i <= step ? digit : '?'}</span>
              <span style={{ fontSize: 9, fontWeight: 700 }}>{PLACES[i]}</span>
            </div>
          ))}
        </div>
        <div style={{ fontSize: 32, fontWeight: 900, color: showResult ? (correct === '<' ? '#ef4444' : '#10b981') : '#cbd5e1' }}>
          {showResult ? correct : 'vs'}
        </div>
        <div style={{ display: 'flex', gap: 4 }}>
          {dB.map((digit, i) => (
            <div key={i} style={{
              width: 52, height: 60, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column',
              fontSize: 26, fontWeight: 900,
              background: i <= step ? (i === diffPos && i <= step ? (dB[i] > dA[i] ? '#dcfce7' : '#fee2e2') : '#f0f9ff') : '#fff',
              border: `2px solid ${i <= step ? COLORS[i] : '#e2e8f0'}`,
              color: i <= step ? COLORS[i] : '#cbd5e1'
            }}>
              <span>{i <= step ? digit : '?'}</span>
              <span style={{ fontSize: 9, fontWeight: 700 }}>{PLACES[i]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Match indicator */}
      {step <= 3 && !showResult && step <= diffPos && (
        <div style={{ textAlign: 'center', marginBottom: 12 }}>
          <span style={{ fontSize: 24 }}>{dA[step] === dB[step] ? '🤝' : '💥'}</span>
        </div>
      )}

      {/* Controls */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 10 }}>
        {!showResult && step < 3 && (
          <button onClick={() => setStep(step + 1)}
            style={{ padding: '10px 20px', borderRadius: 100, background: color, color: '#fff', border: 'none', fontWeight: 700, cursor: 'pointer', fontSize: 14 }}>
            Reveal Next ▶
          </button>
        )}
        {!showResult && (
          <>
            <button onClick={() => { setUserAnswer('<'); setShowResult(true); }}
              style={{ padding: '10px 20px', borderRadius: 12, background: '#fee2e2', border: '2px solid #ef4444', color: '#dc2626', fontWeight: 800, cursor: 'pointer', fontSize: 20 }}>&lt;</button>
            <button onClick={() => { setUserAnswer('='); setShowResult(true); }}
              style={{ padding: '10px 20px', borderRadius: 12, background: '#fef3c7', border: '2px solid #f59e0b', color: '#d97706', fontWeight: 800, cursor: 'pointer', fontSize: 20 }}>=</button>
            <button onClick={() => { setUserAnswer('>'); setShowResult(true); }}
              style={{ padding: '10px 20px', borderRadius: 12, background: '#dcfce7', border: '2px solid #10b981', color: '#059669', fontWeight: 800, cursor: 'pointer', fontSize: 20 }}>&gt;</button>
          </>
        )}
      </div>

      {showResult && (
        <div style={{ textAlign: 'center', marginTop: 12 }}>
          <span style={{ fontSize: 48 }}>{userAnswer === correct ? '🎉' : '😅'}</span>
          <div style={{ fontWeight: 800, fontSize: 16, color: userAnswer === correct ? '#059669' : '#dc2626' }}>
            {pair.a.toLocaleString()} {correct} {pair.b.toLocaleString()}
          </div>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════
   LEARN MODE — All Visual, No Text Walls
   ═══════════════════════════════════ */
const LEARN_STEPS = {
  'thousands-01': [
    { title: '🏗️ Place Value Chart', Component: PlaceValueChart },
    { title: '🎭 Same Digit, Different Values', Component: FaceVsPlaceVisual },
    { title: '🔍 Explore Numbers', Component: PlaceValueExplorer },
  ],
  'thousands-02': [
    { title: '🧩 Break Numbers Apart', Component: ExpandedVisualBreakdown },
    { title: '🕳️ What About Zeros?', Component: ZeroPlaceholderVisual },
    { title: '💥 Explode & Rebuild', Component: ExpandedFormExploder },
  ],
  'thousands-03': [
    { title: '⚖️ Which is Bigger?', Component: VisualComparison },
    { title: '📏 Number Line', Component: NumberLineVisual },
    { title: '⚔️ You Decide!', Component: ComparisonArena },
  ],
};

function LearnMode({ skill, onBack }) {
  const [step, setStep] = useState(0);
  const steps = LEARN_STEPS[skill.id] || [];
  const totalSteps = steps.length;
  const current = steps[step];

  return (
    <div className="sau-detail-anim" style={{ maxWidth: 800, margin: '0 auto', background: '#fff', padding: 32, borderRadius: 24, boxShadow: '0 10px 40px rgba(0,0,0,0.05)' }}>
      <button onClick={onBack} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', color: '#64748b', fontWeight: 600, cursor: 'pointer', marginBottom: 16 }}>← Back to Skills</button>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 12 }}>
        <div style={{ fontSize: 40 }}>{skill.icon}</div>
        <div>
          <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 28, fontWeight: 900, color: skill.color, margin: 0 }}>{skill.title}</h2>
          <p style={{ margin: 0, fontSize: 15, color: '#64748b' }}>{current?.title}</p>
        </div>
      </div>

      {/* Progress */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 24 }}>
        {steps.map((s, i) => (
          <button key={i} onClick={() => setStep(i)} style={{
            flex: 1, height: 8, borderRadius: 100, border: 'none', padding: 0,
            background: i <= step ? skill.color : '#e2e8f0',
            cursor: 'pointer', transition: 'all 0.3s'
          }} />
        ))}
      </div>

      {/* Visual content */}
      {current && <current.Component key={step} color={skill.color} />}

      {/* Navigation */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 24 }}>
        {step > 0 ? (
          <button onClick={() => setStep(step - 1)}
            style={{ padding: '12px 28px', borderRadius: 100, border: `2px solid ${skill.color}`, background: '#fff', color: skill.color, fontWeight: 800, fontSize: 15, cursor: 'pointer' }}>← Previous</button>
        ) : <div />}
        {step < totalSteps - 1 ? (
          <button onClick={() => setStep(step + 1)}
            style={{ padding: '12px 28px', borderRadius: 100, background: skill.color, color: '#fff', fontWeight: 800, fontSize: 15, border: 'none', cursor: 'pointer', boxShadow: `0 4px 14px ${skill.color}40` }}>
            Next →
          </button>
        ) : (
          <button onClick={onBack}
            style={{ padding: '12px 28px', borderRadius: 100, background: 'linear-gradient(135deg, #10b981, #059669)', color: '#fff', fontWeight: 800, fontSize: 15, border: 'none', cursor: 'pointer', boxShadow: '0 4px 14px rgba(16,185,129,0.3)' }}>
            Start Practicing 🚀
          </button>
        )}
      </div>
    </div>
  );
}



/* ═══════════════════════════════════
   PRACTICE MODE
   ═══════════════════════════════════ */
function PracticeMode({ skill, onBack }) {
  const questions = useShuffledQuestions(skill.practice, 20);
  const [qIdx, setQIdx] = useState(0);
  const [answersMap, setAnswersMap] = useState({});
  const [finished, setFinished] = useState(false);
  const startTime = useRef(Date.now());

  if (!questions || questions.length === 0) return <div>Loading...</div>;

  const q = questions[qIdx];
  const currentAnswer = answersMap[qIdx];
  const answered = !!currentAnswer;
  const isCorrect = currentAnswer?.isCorrect ?? false;
  const selectedOpt = currentAnswer?.selectedOpt ?? null;

  const handleAnswer = (val) => {
    if (answered) return;
    if (q.type === 'multiple-choice') {
      const correct = val === q.correctAnswer;
      setAnswersMap(prev => ({ ...prev, [qIdx]: { selectedOpt: val, isCorrect: correct } }));
    } else {
      // Interactive types submit their own result object with { isCorrect, ... }
      setAnswersMap(prev => ({ ...prev, [qIdx]: { selectedOpt: val, isCorrect: val.isCorrect } }));
    }
  };

  const nextQ = () => {
    if (qIdx + 1 < questions.length) setQIdx(qIdx + 1);
    else setFinished(true);
  };
  const prevQ = () => { if (qIdx > 0) setQIdx(qIdx - 1); };

  if (finished) {
    const totalTime = Date.now() - startTime.current;
    const score = Object.values(answersMap).filter(a => a.isCorrect).length;
    const total = questions.length;
    const pct = Math.round((score / total) * 100);
    let msg = 'Keep Learning!', emoji = '💪', sub = 'Review the concepts and try again for 100%.';
    if (pct >= 90) { msg = 'Excellent!'; emoji = '🏆'; sub = 'You\'ve mastered this skill!'; }
    else if (pct >= 70) { msg = 'Great Job!'; emoji = '🌟'; sub = 'You\'re almost there, keep going!'; }

    return (
      <div className="sau-detail-anim" style={{ maxWidth: 600, margin: '0 auto', textAlign: 'center', padding: '40px 24px' }}>
        <button onClick={onBack} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', color: '#3b82f6', fontWeight: 700, cursor: 'pointer', marginBottom: 16, fontSize: 14 }}>← Back to Skills</button>
        <ScoreRing score={score} total={total} color={skill.color} />
        <div style={{ margin: '16px 0 8px', padding: '8px 24px', background: '#f8fafc', borderRadius: 100, display: 'inline-flex', alignItems: 'center', gap: 8, fontWeight: 700, color: '#64748b', fontSize: 14 }}>
          ⏱️ Time Taken: {fmtTime(totalTime)}
        </div>
        <div style={{ fontSize: 48, marginTop: 16 }}>{emoji}</div>
        <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 28, fontWeight: 900, color: '#0f172a', margin: '8px 0 4px' }}>{msg}</h2>
        <p style={{ color: '#64748b', fontSize: 15, margin: '0 0 24px' }}>{sub}</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 12 }}>
          <button onClick={onBack} style={{ padding: '12px 28px', borderRadius: 100, border: `2px solid ${skill.color}`, background: '#fff', color: skill.color, fontWeight: 800, fontSize: 15, cursor: 'pointer' }}>Back to Skills</button>
        </div>
      </div>
    );
  }

  return (
    <div className="sau-detail-anim" style={{ maxWidth: 700, margin: '0 auto', background: '#fff', padding: 32, borderRadius: 24, boxShadow: '0 10px 40px rgba(0,0,0,0.05)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <button onClick={onBack} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', color: '#64748b', fontWeight: 600, cursor: 'pointer' }}>← Exit Practice</button>
        <div style={{ fontWeight: 800, color: skill.color }}>Practice {qIdx + 1}/{questions.length}</div>
      </div>
      <QuestionCard key={qIdx} q={q} onAnswer={handleAnswer} disabled={answered} answerResult={currentAnswer} selectedOption={selectedOpt} />
      {answered && (
        <div style={{ padding: 16, borderRadius: 12, marginBottom: 20, background: isCorrect ? '#f0fdf4' : '#fef2f2', border: `2px solid ${isCorrect ? '#10b981' : '#ef4444'}` }}>
          <div style={{ fontSize: 18, fontWeight: 800, color: isCorrect ? '#059669' : '#dc2626', marginBottom: 6 }}>{isCorrect ? '🎉 Correct!' : '❌ Not quite!'}</div>
          <p style={{ margin: 0, fontSize: 15, color: '#334155', lineHeight: 1.5 }}>{q.explanation}</p>
        </div>
      )}
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {qIdx > 0 ? (
          <button onClick={prevQ} style={{ padding: '12px 32px', borderRadius: 100, fontWeight: 800, fontSize: 16, border: `2px solid ${skill.color}`, background: '#fff', color: skill.color, cursor: 'pointer' }}>← Previous</button>
        ) : <div />}
        <button onClick={nextQ} disabled={!answered} style={{ padding: '12px 32px', borderRadius: 100, fontWeight: 800, fontSize: 16, border: 'none', background: answered ? skill.color : '#e2e8f0', color: answered ? '#fff' : '#94a3b8', cursor: answered ? 'pointer' : 'default' }}>
          {qIdx + 1 === questions.length ? 'Finish →' : 'Next Question →'}
        </button>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════
   ASSESS MODE
   ═══════════════════════════════════ */
function AssessMode({ skill, onBack }) {
  const questions = useShuffledQuestions(skill.assessment, 20);
  const [qIdx, setQIdx] = useState(0);
  const [answersMap, setAnswersMap] = useState({});
  const [marked, setMarked] = useState({});
  const [finished, setFinished] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [expandedSolution, setExpandedSolution] = useState({});
  const startRef = useRef(Date.now());
  const qStartRef = useRef(Date.now());
  const [qTimes, setQTimes] = useState({});

  useEffect(() => {
    if (finished) return;
    const iv = setInterval(() => setElapsed(Date.now() - startRef.current), 1000);
    return () => clearInterval(iv);
  }, [finished]);

  if (!questions || questions.length === 0) return <div>Loading...</div>;

  const q = questions[qIdx];

  const handleAnswer = (val) => {
    const now = Date.now();
    const time = now - qStartRef.current;
    if (q.type === 'multiple-choice') {
      setAnswersMap(prev => ({ ...prev, [qIdx]: val }));
    } else {
      // Interactive — store the value
      setAnswersMap(prev => ({ ...prev, [qIdx]: val }));
    }
    setQTimes(prev => ({ ...prev, [qIdx]: (prev[qIdx] || 0) + time }));
    qStartRef.current = now;
  };

  const goTo = (idx) => {
    const now = Date.now();
    setQTimes(prev => ({ ...prev, [qIdx]: (prev[qIdx] || 0) + (now - qStartRef.current) }));
    qStartRef.current = now;
    setQIdx(idx);
  };

  const toggleMark = () => setMarked(prev => ({ ...prev, [qIdx]: !prev[qIdx] }));

  const submitAssessment = () => {
    const now = Date.now();
    setQTimes(prev => ({ ...prev, [qIdx]: (prev[qIdx] || 0) + (now - qStartRef.current) }));
    setFinished(true);
  };

  if (finished) {
    const totalTime = Date.now() - startRef.current;
    let score = 0;
    questions.forEach((qq, i) => {
      const ans = answersMap[i];
      if (ans !== undefined) {
        if (qq.type === 'multiple-choice' && ans === qq.correctAnswer) score++;
        else if (qq.type !== 'multiple-choice' && ans?.isCorrect) score++;
      }
    });
    const accuracy = Math.round((score / questions.length) * 100);

    return (
      <div className="sau-detail-anim" style={{ maxWidth: 900, margin: '0 auto', padding: '32px 24px' }}>
        <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 32, fontWeight: 900, color: '#0f172a', display: 'flex', alignItems: 'center', gap: 12, margin: '0 0 28px' }}>
          📊 Assessment Report
        </h1>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 32 }}>
          <div style={{ textAlign: 'center', padding: '20px 16px', borderRadius: 16, border: '1px solid #e2e8f0', background: '#fff' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#64748b', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>Total Score</div>
            <div><span style={{ fontSize: 36, fontWeight: 900, color: skill.color }}>{score}</span><span style={{ fontSize: 18, color: '#94a3b8', fontWeight: 700 }}> / {questions.length}</span></div>
          </div>
          <div style={{ textAlign: 'center', padding: '20px 16px', borderRadius: 16, border: '1px solid #e2e8f0', background: '#fff' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#64748b', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>Accuracy</div>
            <div style={{ fontSize: 36, fontWeight: 900, color: accuracy >= 70 ? '#059669' : '#dc2626' }}>{accuracy}%</div>
          </div>
          <div style={{ textAlign: 'center', padding: '20px 16px', borderRadius: 16, border: '1px solid #e2e8f0', background: '#fff' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#64748b', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>Time Taken</div>
            <div style={{ fontSize: 36, fontWeight: 900, color: '#d97706' }}>⏱️ {fmtTime(totalTime)}</div>
          </div>
        </div>

        <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 22, fontWeight: 900, margin: '0 0 16px', color: '#0f172a' }}>Question Breakdown</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {questions.map((qq, i) => {
            const userAns = answersMap[i];
            const skipped = userAns === undefined;
            let correct = false;
            if (!skipped) {
              if (qq.type === 'multiple-choice') correct = userAns === qq.correctAnswer;
              else correct = userAns?.isCorrect ?? false;
            }
            const pillColor = skipped ? '#f59e0b' : correct ? '#10b981' : '#ef4444';
            const showSol = expandedSolution[i];

            return (
              <div key={i} style={{ background: '#fff', border: `1px solid ${skipped ? '#fde68a' : correct ? '#bbf7d0' : '#fecaca'}`, borderRadius: 16, padding: '20px 24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                  <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', flex: 1 }}>
                    <span style={{ width: 28, height: 28, borderRadius: '50%', background: pillColor, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 13, flexShrink: 0 }}>{i + 1}</span>
                    <p style={{ margin: 0, fontWeight: 700, fontSize: 15, color: '#0f172a', lineHeight: 1.5 }}>{qq.question}</p>
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: skipped ? '#d97706' : correct ? '#059669' : '#dc2626', flexShrink: 0, marginLeft: 12 }}>
                    {skipped ? '⏩ Skipped' : correct ? '✅ Correct' : '❌ Wrong'}
                  </div>
                </div>
                {qq.explanation && (
                  <div>
                    <button onClick={() => setExpandedSolution(prev => ({ ...prev, [i]: !prev[i] }))} style={{ background: 'none', border: 'none', color: '#059669', fontWeight: 700, fontSize: 14, cursor: 'pointer', padding: 0 }}>
                      {showSol ? '∧ Hide Solution' : '∨ Check Solution'}
                    </button>
                    {showSol && (
                      <div style={{ marginTop: 8, padding: '12px 16px', background: '#fefce8', border: '1px solid #fde68a', borderRadius: 12 }}>
                        <div style={{ fontWeight: 700, color: '#92400e', marginBottom: 4 }}>💡 Explanation</div>
                        <p style={{ margin: 0, fontSize: 14, color: '#78350f', lineHeight: 1.6 }}>{qq.explanation}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div style={{ marginTop: 32, display: 'flex', justifyContent: 'center' }}>
          <button onClick={onBack} style={{ padding: '14px 40px', background: skill.color, color: '#fff', borderRadius: 100, fontWeight: 800, fontSize: 16, border: 'none', cursor: 'pointer' }}>Back to Skills</button>
        </div>
      </div>
    );
  }

  const currentAnswered = answersMap[qIdx] !== undefined;

  return (
    <div className="sau-detail-anim" style={{ display: 'flex', gap: 24, maxWidth: 1100, margin: '0 auto', alignItems: 'flex-start' }}>
      {/* LEFT: Question panel */}
      <div style={{ flex: '1 1 60%', background: '#fff', borderRadius: 24, padding: 32, boxShadow: '0 10px 40px rgba(0,0,0,0.05)' }}>
        <div style={{ display: 'inline-block', padding: '4px 14px', borderRadius: 100, border: '2px solid #0f172a', fontWeight: 800, fontSize: 12, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 16 }}>Question {qIdx + 1}</div>

        <QuestionCard
          key={qIdx}
          q={q}
          onAnswer={handleAnswer}
          disabled={false}
          answerResult={null}
          selectedOption={q.type === 'multiple-choice' ? (answersMap[qIdx] ?? null) : null}
        />

        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 16 }}>
          <button onClick={() => goTo(Math.max(0, qIdx - 1))} disabled={qIdx === 0}
            style={{ padding: '10px 24px', borderRadius: 100, border: '2px solid #e2e8f0', background: '#fff', fontWeight: 700, fontSize: 14, color: qIdx === 0 ? '#cbd5e1' : '#334155', cursor: qIdx === 0 ? 'default' : 'pointer' }}>← Previous</button>
          <button onClick={toggleMark}
            style={{ padding: '10px 24px', borderRadius: 100, border: `2px solid ${marked[qIdx] ? '#f59e0b' : '#e2e8f0'}`, background: marked[qIdx] ? '#fef3c7' : '#fff', fontWeight: 700, fontSize: 14, color: marked[qIdx] ? '#92400e' : '#334155', cursor: 'pointer' }}>
            {marked[qIdx] ? '★ Marked' : 'Mark for Review'}
          </button>
          <button onClick={() => goTo(Math.min(questions.length - 1, qIdx + 1))} disabled={qIdx === questions.length - 1}
            style={{ padding: '10px 24px', borderRadius: 100, border: 'none', background: skill.color, fontWeight: 700, fontSize: 14, color: '#fff', cursor: qIdx === questions.length - 1 ? 'default' : 'pointer', opacity: qIdx === questions.length - 1 ? 0.5 : 1 }}>Next →</button>
        </div>
      </div>

      {/* RIGHT: Sidebar */}
      <div style={{ flex: '0 0 280px', background: '#fffbeb', borderRadius: 24, padding: 24, position: 'sticky', top: 80 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 20 }}>
          <span style={{ fontSize: 28 }}>⏱️</span>
          <span style={{ fontFamily: 'Outfit, sans-serif', fontSize: 32, fontWeight: 900, color: '#0f172a' }}>{fmtTime(elapsed)}</span>
        </div>
        <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: 16, fontWeight: 800, color: '#0f172a', marginBottom: 12 }}>Question Palette</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 8, marginBottom: 20 }}>
          {questions.map((_, i) => {
            const isAnswered = answersMap[i] !== undefined;
            const isMarked = !!marked[i];
            const isCurrent = i === qIdx;
            let bg = '#fff', bdr = '#e2e8f0', clr = '#64748b';
            if (isMarked) { bg = '#fef3c7'; bdr = '#f59e0b'; clr = '#92400e'; }
            if (isAnswered) { bg = '#3b82f6'; bdr = '#3b82f6'; clr = '#fff'; }
            if (isCurrent) { bdr = '#0f172a'; }
            return (
              <button key={i} onClick={() => goTo(i)} style={{
                width: 40, height: 40, borderRadius: 8, border: `2px solid ${bdr}`, background: bg,
                color: clr, fontWeight: 800, fontSize: 14, cursor: 'pointer', transition: 'all 0.15s',
                boxShadow: isCurrent ? '0 0 0 2px #0f172a' : 'none'
              }}>{i + 1}</button>
            );
          })}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 20, fontSize: 13 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><div style={{ width: 16, height: 16, borderRadius: 4, background: '#3b82f6' }} /><span style={{ fontWeight: 600, color: '#334155' }}>Answered</span></div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><div style={{ width: 16, height: 16, borderRadius: 4, background: '#fff', border: '2px solid #e2e8f0' }} /><span style={{ fontWeight: 600, color: '#334155' }}>Not Answered</span></div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><div style={{ width: 16, height: 16, borderRadius: 4, background: '#fef3c7', border: '2px solid #f59e0b' }} /><span style={{ fontWeight: 600, color: '#334155' }}>Marked for Review</span></div>
        </div>
        <button onClick={submitAssessment} style={{
          width: '100%', padding: '14px 0', borderRadius: 12, border: 'none',
          background: skill.color, color: '#fff', fontFamily: 'Outfit, sans-serif',
          fontWeight: 800, fontSize: 16, cursor: 'pointer',
          boxShadow: `0 4px 14px ${skill.color}40`, transition: 'all 0.2s'
        }}>Submit Assessment</button>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════
   SKILLS DASHBOARD
   ═══════════════════════════════════ */
function SkillsDashboard({ skills, onSelect }) {
  return (
    <div className="sau-detail-anim" style={{ maxWidth: 1100, margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: 40 }}>
        <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 36, fontWeight: 900, color: '#0f172a', margin: '0 0 12px' }}>Pick a Skill</h1>
        <p style={{ fontSize: 18, color: '#64748b', margin: 0, maxWidth: 600, marginInline: 'auto' }}>
          Choose a skill below. Read the lesson, practice to build confidence, and take the assessment to earn your mastery!
        </p>
      </div>
      <div className="sau-skills-list">
        {skills.map((skill) => (
          <div key={skill.id} className="sau-skill-card" style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            background: '#fff', borderRadius: 16, padding: '24px 32px', marginBottom: 16,
            boxShadow: '0 4px 20px rgba(0,0,0,0.04)', border: '1px solid #f1f5f9'
          }}>
            <div className="sau-skill-info" style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
              <div className="sau-skill-icon" style={{ background: `${skill.color}15`, color: skill.color, padding: '16px', borderRadius: '12px', fontSize: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{skill.icon}</div>
              <div>
                <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: 20, fontWeight: 800, color: '#0f172a', marginBottom: 4 }}>{skill.title}</div>
                <div style={{ fontSize: 14, color: '#64748b' }}>{skill.desc}</div>
              </div>
            </div>
            <div className="sau-skill-actions" style={{ display: 'flex', gap: 12, flexShrink: 0 }}>
              <button onClick={() => onSelect(skill, 'learn')}
                style={{ padding: '10px 20px', borderRadius: 12, background: '#f8fafc', border: '1px solid #e2e8f0', color: '#334155', fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: 8 }}
              >📖 Learn</button>
              <button onClick={() => onSelect(skill, 'practice')}
                style={{ padding: '10px 20px', borderRadius: 12, background: '#f8fafc', border: '1px solid #e2e8f0', color: '#334155', fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: 8 }}
              >✏️ Practice</button>
              <button onClick={() => onSelect(skill, 'assess')}
                style={{ padding: '10px 24px', borderRadius: 12, background: skill.color, border: 'none', color: '#fff', fontWeight: 800, cursor: 'pointer', boxShadow: `0 4px 12px ${skill.color}40`, transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: 8 }}
              >🏆 Assess</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════
   MAIN EXPORT
   ═══════════════════════════════════ */
export default function ThousandsAroundUsSkills() {
  const navigate = useNavigate();
  const [view, setView] = useState('list');
  const [activeSkillId, setActiveSkillId] = useState(null);
  const [skillsData, setSkillsData] = useState([]);

  useEffect(() => { setSkillsData(generateThousandsSkillsData()); }, []);

  const activeSkill = skillsData.find(s => s.id === activeSkillId);

  const openMode = (skill, mode) => {
    setActiveSkillId(skill.id);
    setSkillsData(generateThousandsSkillsData()); // regenerate for fresh questions
    setView(mode);
  };

  return (
    <div className="tau-page">
      <nav className="tau-nav">
        {view === 'list' ? (
          <button className="tau-nav-back" onClick={() => navigate('/junior/grade/4/thousands-around-us')}>← Back to Dashboard</button>
        ) : (
          <button className="tau-nav-back" onClick={() => setView('list')}>← Back to Skills</button>
        )}
        <div className="tau-nav-links">
          <button className="tau-nav-link" onClick={() => navigate('/junior/grade/4/thousands-around-us/introduction')}>🌟 Introduction</button>
          <button className="tau-nav-link" onClick={() => navigate('/junior/grade/4/thousands-around-us/terminology')}>📖 Terminology</button>
          <button className="tau-nav-link tau-nav-link--active">🎯 Skills</button>
        </div>
      </nav>

      <div style={{ padding: '40px 24px', maxWidth: 1100, margin: '0 auto' }}>
        {view === 'list' && <SkillsDashboard skills={skillsData} onSelect={openMode} />}
        {view === 'learn' && activeSkill && <LearnMode skill={activeSkill} onBack={() => setView('list')} />}
        {view === 'practice' && activeSkill && <PracticeMode skill={activeSkill} onBack={() => setView('list')} />}
        {view === 'assess' && activeSkill && <AssessMode skill={activeSkill} onBack={() => setView('list')} />}
      </div>
    </div>
  );
}
