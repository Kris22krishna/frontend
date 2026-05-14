import React, { useState, useEffect, useRef } from 'react';
import MathRenderer from '../../../MathRenderer';

export default function PracticeEngine({ questions, title, color, onBack }) {
  const [questionSet] = useState(() => typeof questions === 'function' ? questions() : questions);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState(Array(questionSet.length).fill(null));
  const [finished, setFinished] = useState(false);
  const [timeTaken, setTimeTaken] = useState(0);
  const [questionTimes, setQuestionTimes] = useState(Array(questionSet.length).fill(0));
  const timerRef = useRef(null);
  const startTimeRef = useRef(Date.now());

  useEffect(() => {
    timerRef.current = setInterval(() => setTimeTaken(t => t + 1), 1000);
    return () => clearInterval(timerRef.current);
  }, []);

  useEffect(() => {
    startTimeRef.current = Date.now();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [current]);

  const formatTime = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

  const q = questionSet[current];
  const isAnswered = answers[current] !== null;

  const handleSelect = (idx) => {
    if (isAnswered) return;
    const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000);
    setQuestionTimes(t => { const n = [...t]; n[current] = elapsed; return n; });
    setAnswers(a => { const n = [...a]; n[current] = idx; return n; });
  };

  const handleNext = () => {
    if (current + 1 >= questionSet.length) { setFinished(true); clearInterval(timerRef.current); return; }
    setCurrent(c => c + 1);
  };
  const handlePrev = () => { if (current > 0) setCurrent(c => c - 1); };

  if (finished) {
    const score = answers.reduce((acc, ans, i) => acc + (ans === questionSet[i].correct ? 1 : 0), 0);
    const pct = Math.round((score / questionSet.length) * 100);
    const msg = pct >= 90 ? '🏆 Mastered!' : pct >= 75 ? '🌟 Great Job!' : pct >= 50 ? '👍 Keep it up!' : '💪 Keep Learning!';

    return (
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        {/* Score card */}
        <div style={{ maxWidth: 600, margin: '0 auto 40px', textAlign: 'center', padding: '48px 32px', background: '#fff', borderRadius: 24, border: '1px solid #e2e8f0', boxShadow: `0 20px 60px ${color}20`, position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 6, background: `linear-gradient(90deg, ${color}, ${color}80)` }} />
          <div style={{ width: 160, height: 160, borderRadius: '50%', background: `conic-gradient(${color} ${pct * 3.6}deg, #f1f5f9 0deg)`, margin: '0 auto 32px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 10px 40px ${color}30`, border: '10px solid #fff' }}>
            <div style={{ textAlign: 'center', background: '#fff', width: 120, height: 120, borderRadius: '50%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: 44, fontWeight: 900, color, lineHeight: 1 }}>{pct}%</div>
              <div style={{ fontSize: 13, color: '#64748b', fontWeight: 800, textTransform: 'uppercase', letterSpacing: 1, marginTop: 4 }}>Accuracy</div>
            </div>
          </div>
          <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 32, fontWeight: 900, color: '#0f172a', margin: '0 0 24px' }}>{msg}</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 32 }}>
            <div style={{ background: '#f8fafc', padding: 20, borderRadius: 16, border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: 13, color: '#64748b', fontWeight: 700, textTransform: 'uppercase', marginBottom: 8 }}>Correct</div>
              <div style={{ fontSize: 24, fontWeight: 800 }}>{score} / {questionSet.length}</div>
            </div>
            <div style={{ background: '#f8fafc', padding: 20, borderRadius: 16, border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: 13, color: '#64748b', fontWeight: 700, textTransform: 'uppercase', marginBottom: 8 }}>Total Time</div>
              <div style={{ fontSize: 24, fontWeight: 800 }}>{formatTime(timeTaken)}</div>
            </div>
          </div>
          <button onClick={onBack} style={{ padding: '16px 32px', background: color, color: '#fff', border: 'none', borderRadius: 100, fontWeight: 800, fontSize: 15, cursor: 'pointer', boxShadow: `0 8px 24px ${color}40` }}>
            Back to Skills
          </button>
        </div>

        {/* Practice Report */}
        <h3 style={{ fontSize: 22, fontWeight: 800, marginBottom: 20, color: '#1e293b' }}>Practice Report</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {questionSet.map((qr, idx) => {
            const isCorrect = answers[idx] === qr.correct;
            return (
              <div key={idx} style={{ padding: 24, borderRadius: 16, border: `2px solid ${isCorrect ? '#10b981' : '#ef4444'}`, background: isCorrect ? 'rgba(16,185,129,0.04)' : 'rgba(239,68,68,0.04)' }}>
                <div style={{ fontWeight: 800, marginBottom: 10, color: isCorrect ? '#10b981' : '#ef4444', display: 'flex', justifyContent: 'space-between' }}>
                  <span>Q{idx + 1} — {isCorrect ? '✓ Correct' : '✗ Incorrect'}</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: '#64748b' }}>⏱ {formatTime(questionTimes[idx])}</span>
                </div>
                {qr.svg && <div style={{ marginBottom: 12, textAlign: 'center' }} dangerouslySetInnerHTML={{ __html: qr.svg }} />}
                {qr.image && <div style={{ marginBottom: 12, textAlign: 'center' }}><img src={qr.image} alt="" style={{ maxWidth: '100%', borderRadius: 8 }} /></div>}
                <div style={{ fontSize: 16, fontWeight: 600, color: '#1e293b', marginBottom: 16, lineHeight: 1.6 }}>
                  <MathRenderer text={qr.question} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 8, marginBottom: 12 }}>
                  {qr.options.map((opt, oi) => {
                    const isUserChoice = answers[idx] === oi;
                    const isCorrectOpt = qr.correct === oi;
                    let bg = '#f8fafc', border = '1px solid #e2e8f0', clr = '#475569';
                    if (isCorrectOpt) { bg = 'rgba(16,185,129,0.08)'; border = '1.5px solid #10b981'; clr = '#059669'; }
                    if (isUserChoice && !isCorrectOpt) { bg = 'rgba(239,68,68,0.08)'; border = '1.5px solid #ef4444'; clr = '#dc2626'; }
                    return (
                      <div key={oi} style={{ padding: '10px 14px', borderRadius: 10, background: bg, border, color: clr, fontSize: 13, fontWeight: isCorrectOpt || isUserChoice ? 700 : 500 }}>
                        {isCorrectOpt ? '✓ ' : isUserChoice ? '✗ ' : ''}<MathRenderer text={opt} />
                      </div>
                    );
                  })}
                </div>
                <div style={{ background: 'rgba(59,130,246,0.05)', padding: '12px 16px', borderRadius: 10, border: '1px solid rgba(59,130,246,0.1)', fontSize: 13, color: '#475569' }}>
                  <strong style={{ color: '#2563eb' }}>💡 </strong><MathRenderer text={qr.explanation} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  const progress = ((current + (isAnswered ? 1 : 0)) / questionSet.length) * 100;

  return (
    <div style={{ maxWidth: 800, margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 800, color, textTransform: 'uppercase', letterSpacing: 1.2, marginBottom: 4 }}>Practice Mode</div>
            <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 22, fontWeight: 800, color: '#1e293b', margin: 0 }}>{title}</h3>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ fontSize: 13, color, fontWeight: 800, background: `${color}15`, padding: '4px 10px', borderRadius: 8 }}>⏱️ {formatTime(timeTaken)}</div>
            <button onClick={onBack} style={{ background: '#fee2e2', color: '#ef4444', border: '1px solid #fca5a5', padding: '4px 12px', borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>✕ Exit</button>
          </div>
        </div>
        <div style={{ marginTop: 12, color: '#64748b', fontSize: 13, fontWeight: 700 }}>Question {current + 1} / {questionSet.length}</div>
        <div style={{ background: '#f1f5f9', borderRadius: 10, height: 6, overflow: 'hidden', marginTop: 8 }}>
          <div style={{ height: '100%', width: `${progress}%`, background: color, borderRadius: 10, transition: 'width 0.4s ease' }} />
        </div>
      </div>

      {/* Question Card */}
      <div style={{ background: '#fff', borderRadius: 20, padding: 32, border: '1px solid #e2e8f0', boxShadow: '0 4px 20px rgba(0,0,0,0.04)', marginBottom: 20 }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: `${color}15`, padding: '6px 16px', borderRadius: 10, fontSize: 11, fontWeight: 900, color, marginBottom: 20, textTransform: 'uppercase', letterSpacing: 1 }}>
          QUESTION {current + 1}
        </div>
        {q.svg && <div style={{ marginBottom: 20, textAlign: 'center' }} dangerouslySetInnerHTML={{ __html: q.svg }} />}
        {q.image && <div style={{ marginBottom: 20, textAlign: 'center' }}><img src={q.image} alt="" style={{ maxWidth: '100%', borderRadius: 8 }} /></div>}
        <div style={{ fontSize: 18, fontWeight: 600, color: '#1e293b', lineHeight: 1.6, marginBottom: 24 }}>
          <MathRenderer text={q.question} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {q.options.map((opt, oi) => {
            const isUserChoice = answers[current] === oi;
            const isCorrectOpt = q.correct === oi;
            let borderColor = 'rgba(0,0,0,0.04)', bgColor = '#fff', textColor = '#1e293b';
            if (isAnswered) {
              if (isCorrectOpt) { borderColor = '#10b981'; bgColor = 'rgba(16,185,129,0.05)'; textColor = '#059669'; }
              else if (isUserChoice) { borderColor = '#ef4444'; bgColor = 'rgba(239,68,68,0.05)'; textColor = '#dc2626'; }
            } else if (isUserChoice) { borderColor = color; bgColor = `${color}05`; }
            return (
              <button key={oi} onClick={() => handleSelect(oi)} disabled={isAnswered}
                style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '14px 16px', borderRadius: 16, border: `2.5px solid ${borderColor}`, background: bgColor, cursor: isAnswered ? 'default' : 'pointer', fontSize: 14, color: textColor, textAlign: 'left', transition: 'all 0.2s', fontWeight: isUserChoice ? 700 : 500, width: '100%', minHeight: 58, lineHeight: 1.55 }}
              >
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: isAnswered ? (isCorrectOpt ? '#10b981' : isUserChoice ? '#ef4444' : '#f1f5f9') : (isUserChoice ? color : '#f1f5f9'), flexShrink: 0, marginTop: 6, transition: 'all 0.2s' }} />
                <span style={{ display: 'block', minWidth: 0 }}>
                  <MathRenderer text={opt.includes('^') || opt.includes('=') || opt.includes('/') || opt.includes('\\') ? (opt.includes('$') ? opt : `$${opt}$`) : opt} />
                </span>
              </button>
            );
          })}
        </div>

        {isAnswered && (
          <div style={{ marginTop: 24, padding: '16px 20px', borderRadius: 12, background: 'rgba(59,130,246,0.05)', border: '1px solid rgba(59,130,246,0.1)', color: '#475569', fontSize: 13.5, lineHeight: 1.6 }}>
            <strong style={{ color: '#2563eb' }}>💡 Explanation: </strong><MathRenderer text={q.explanation} />
          </div>
        )}
      </div>

      {/* Navigation */}
      <div style={{ display: 'flex', gap: 12, justifyContent: 'space-between' }}>
        <button onClick={handlePrev} disabled={current === 0}
          style={{ flex: 1, maxWidth: 160, padding: '12px 24px', borderRadius: 100, background: '#fff', border: '1px solid #e2e8f0', color: '#475569', fontWeight: 700, fontSize: 15, cursor: current === 0 ? 'not-allowed' : 'pointer', opacity: current === 0 ? 0.4 : 1 }}
        >
          ← Previous
        </button>
        <button onClick={handleNext} disabled={!isAnswered}
          style={{ flex: 1, maxWidth: 220, padding: '12px 24px', borderRadius: 100, background: isAnswered ? color : '#f1f5f9', color: isAnswered ? '#fff' : '#94a3b8', border: 'none', fontWeight: 800, fontSize: 15, cursor: isAnswered ? 'pointer' : 'not-allowed', boxShadow: isAnswered ? `0 8px 20px ${color}30` : 'none' }}
        >
          {current + 1 >= questionSet.length ? 'See Report' : 'Next →'}
        </button>
      </div>
    </div>
  );
}
