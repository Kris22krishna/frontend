import React, { useState, useEffect, useRef, useCallback } from 'react';
import { CheckCircle2, XCircle, Clock, Flag, Home, RotateCcw, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSessionLogger } from '@/hooks/useSessionLogger';

export default function JuniorEvsAssessmentEngine({ 
  questions, 
  onComplete,
  nodeId,
  sessionType = 'test' 
}) {
  const navigate = useNavigate();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState({}); // { idx: selectedOpt }
  const [markedForReview, setMarkedForReview] = useState(new Set());
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [timer, setTimer] = useState(questions.length * 60); // 1 min per question
  const timerRef = useRef(null);

  // v4 Logging
  const { startSession, logAnswer, finishSession, abandonSession } = useSessionLogger();
  const isFinishedRef = useRef(false);

  // Start session on mount
  useEffect(() => {
    if (!nodeId) return;
    startSession({ nodeId, sessionType });
    isFinishedRef.current = false;

    return () => {
      if (!isFinishedRef.current) {
        // Abandon session if navigating away before submission
        abandonSession({ totalQuestions: questions.length });
      }
    };
  }, [nodeId, sessionType, startSession, questions.length, abandonSession]);

  // Timer
  useEffect(() => {
    if (isSubmitted) return;
    timerRef.current = setInterval(() => {
      setTimer(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          handleFinalSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [isSubmitted]);

  const formatTime = (s) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, '0')}`;
  };

  const handleSelect = (opt) => {
    if (isSubmitted) return;
    setAnswers(prev => ({ ...prev, [currentIdx]: opt }));
  };

  const handleMarkReview = () => {
    setMarkedForReview(prev => {
      const next = new Set(prev);
      next.has(currentIdx) ? next.delete(currentIdx) : next.add(currentIdx);
      return next;
    });
  };

  const handleFinalSubmit = async () => {
    if (isFinishedRef.current) return;
    clearInterval(timerRef.current);
    
    // Compile final payload for v4 table
    const fullPayload = questions.map((q, i) => {
      const userAns = answers[i];
      if (!userAns) return null;
      return {
        question_index: i + 1,
        answer_json: { selected: userAns },
        is_correct: userAns === q.correctAnswer ? 1.0 : 0.0,
        marks_awarded: userAns === q.correctAnswer ? 1 : 0,
        marks_possible: 1,
        time_taken_ms: 0
      };
    }).filter(Boolean);

    if (nodeId) {
      // First log each individual answer that was given
      for (const item of fullPayload) {
        await logAnswer(item);
      }
      // Then compile and finish
      await finishSession({
        totalQuestions: questions.length,
        questionsAnswered: fullPayload.length,
        answersPayload: fullPayload
      });
    }

    isFinishedRef.current = true;
    setIsSubmitted(true);
  };

  const answeredCount = Object.keys(answers).length;
  const reviewCount = markedForReview.size;

  // Calculate results for local display
  const getResults = useCallback(() => {
    let correct = 0, wrong = 0, unanswered = 0;
    const breakdown = questions.map((q, i) => {
      const userAns = answers[i];
      if (!userAns) { unanswered++; return { ...q, userAns: null, isCorrect: false, status: 'unanswered' }; }
      if (userAns === q.correctAnswer) { correct++; return { ...q, userAns, isCorrect: true, status: 'correct' }; }
      wrong++; return { ...q, userAns, isCorrect: false, status: 'wrong' };
    });
    return { correct, wrong, unanswered, breakdown, total: questions.length, percentage: Math.round((correct / questions.length) * 100) };
  }, [questions, answers]);

  // ── REPORT VIEW ───────────────────────────────────
  if (isSubmitted) {
    const r = getResults();
    const timeUsed = (questions.length * 60) - timer;

    return (
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        {/* Report Header */}
        <div style={{
          background: '#fff', borderRadius: 24, padding: 32, marginBottom: 24,
          boxShadow: '0 4px 20px rgba(0,0,0,0.06)', border: '1px solid #e2e8f0'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
            <div style={{ fontSize: 32 }}>📊</div>
            <h2 style={{ fontSize: 28, fontWeight: 900, color: '#1e293b', fontFamily: 'Outfit', margin: 0 }}>Assessment Report</h2>
          </div>

          {/* Stats Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 24 }}>
            <div style={{ background: '#dcfce7', borderRadius: 16, padding: 20, textAlign: 'center' }}>
              <div style={{ fontSize: 32, fontWeight: 900, color: '#166534' }}>{r.correct}</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#166534', opacity: 0.8 }}>✅ Correct</div>
            </div>
            <div style={{ background: '#fecaca', borderRadius: 16, padding: 20, textAlign: 'center' }}>
              <div style={{ fontSize: 32, fontWeight: 900, color: '#991b1b' }}>{r.wrong}</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#991b1b', opacity: 0.8 }}>❌ Wrong</div>
            </div>
            <div style={{ background: '#e0f2fe', borderRadius: 16, padding: 20, textAlign: 'center' }}>
              <div style={{ fontSize: 32, fontWeight: 900, color: '#0369a1' }}>{formatTime(timeUsed)}</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#0369a1', opacity: 0.8 }}>⏱ Time Used</div>
            </div>
          </div>

          {/* Score Circle */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
            <div style={{ position: 'relative', width: 120, height: 120 }}>
              <svg viewBox="0 0 36 36" style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
                <circle cx="18" cy="18" r="16" fill="none" stroke="#e2e8f0" strokeWidth="3" />
                <circle cx="18" cy="18" r="16" fill="none"
                  stroke={r.percentage >= 70 ? '#10b981' : r.percentage >= 40 ? '#f59e0b' : '#ef4444'}
                  strokeWidth="3" strokeLinecap="round"
                  strokeDasharray={`${r.percentage} 100`}
                />
              </svg>
              <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: 28, fontWeight: 900, color: '#1e293b' }}>{r.percentage}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Question Breakdown */}
        <div style={{
          background: '#fff', borderRadius: 24, padding: 32,
          boxShadow: '0 4px 20px rgba(0,0,0,0.06)', border: '1px solid #e2e8f0'
        }}>
          <h3 style={{ fontSize: 22, fontWeight: 900, color: '#1e293b', marginBottom: 20, fontFamily: 'Outfit' }}>Question Breakdown</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {r.breakdown.map((item, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'flex-start', gap: 14, padding: 16, borderRadius: 14,
                background: item.status === 'correct' ? '#f0fdf4' : item.status === 'wrong' ? '#fef2f2' : '#f8fafc',
                border: `1.5px solid ${item.status === 'correct' ? '#bbf7d0' : item.status === 'wrong' ? '#fecaca' : '#e2e8f0'}`
              }}>
                <div style={{
                  width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
                  background: item.status === 'correct' ? '#dcfce7' : item.status === 'wrong' ? '#fecaca' : '#f1f5f9',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 14,
                  color: item.status === 'correct' ? '#166534' : item.status === 'wrong' ? '#991b1b' : '#94a3b8'
                }}>
                  {i + 1}
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontWeight: 700, color: '#1e293b', margin: '0 0 6px', fontSize: 15 }}>{item.question}</p>
                  <div style={{ fontSize: 14, color: '#166534' }}>✅ {item.correctAnswer}</div>
                  {item.status === 'wrong' && (
                    <div style={{ fontSize: 14, color: '#991b1b', marginTop: 2 }}>❌ Your answer: {item.userAns}</div>
                  )}
                  {item.status === 'unanswered' && (
                    <div style={{ fontSize: 14, color: '#94a3b8', marginTop: 2 }}>⏭ Not answered</div>
                  )}
                </div>
                {item.status === 'correct' ? <CheckCircle2 size={22} color="#22c55e" /> : item.status === 'wrong' ? <XCircle size={22} color="#ef4444" /> : null}
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', margin: '32px 0' }}>
          <button onClick={() => navigate('/junior/grade/4/science/our-community/skills')} style={{
            padding: '14px 28px', borderRadius: 100, border: '2px solid #e2e8f0', background: '#fff',
            fontWeight: 800, cursor: 'pointer', color: '#475569', display: 'flex', alignItems: 'center', gap: 8
          }}>
            <Home size={18} /> Back to Skills
          </button>
        </div>
      </div>
    );
  }

  // ── QUIZ VIEW ─────────────────────────────────────
  const question = questions[currentIdx];

  return (
    <div style={{ maxWidth: 900, margin: '0 auto' }}>
      {/* Timer + Progress Bar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8, padding: '10px 20px',
          background: timer < 60 ? '#fef2f2' : '#fff', borderRadius: 100,
          border: `2px solid ${timer < 60 ? '#fecaca' : '#e2e8f0'}`, fontWeight: 900, fontSize: 20,
          color: timer < 60 ? '#ef4444' : '#1e293b', fontFamily: 'monospace'
        }}>
          <Clock size={20} color={timer < 60 ? '#ef4444' : '#64748b'} /> {formatTime(timer)}
        </div>
        <div style={{ flex: 1, height: 8, background: '#e2e8f0', borderRadius: 100 }}>
          <div style={{ width: `${((currentIdx + 1) / questions.length) * 100}%`, height: '100%', background: '#4f46e5', borderRadius: 100, transition: 'width 0.3s' }} />
        </div>
        <span style={{ fontWeight: 800, color: '#64748b', fontSize: 14, whiteSpace: 'nowrap' }}>
          {currentIdx + 1}/{questions.length}
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 260px', gap: 24 }}>
        {/* Left: Question */}
        <div style={{ background: '#fff', borderRadius: 24, padding: 32, boxShadow: '0 4px 20px rgba(0,0,0,0.04)', border: '1px solid #e2e8f0' }}>
          <h3 style={{ fontSize: 22, color: '#1e293b', marginBottom: 28, lineHeight: 1.4, fontWeight: 800 }}>
            {question.question}
          </h3>
          <div style={{ display: 'grid', gap: 12 }}>
            {question.options.map((opt, idx) => {
              const isSelected = answers[currentIdx] === opt;
              return (
                <button key={idx} onClick={() => handleSelect(opt)} style={{
                  padding: '16px 20px', borderRadius: 14, textAlign: 'left', fontSize: 16, fontWeight: 700,
                  cursor: 'pointer', transition: 'all 0.15s',
                  background: isSelected ? '#eef2ff' : '#f8fafc',
                  border: `2.5px solid ${isSelected ? '#4f46e5' : '#e2e8f0'}`,
                  color: isSelected ? '#4338ca' : '#334155'
                }}>
                  <span style={{
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    width: 28, height: 28, borderRadius: '50%', marginRight: 12, fontSize: 13, fontWeight: 900,
                    background: isSelected ? '#4f46e5' : '#e2e8f0', color: isSelected ? '#fff' : '#64748b'
                  }}>
                    {String.fromCharCode(65 + idx)}
                  </span>
                  {opt}
                </button>
              );
            })}
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 28, alignItems: 'center' }}>
            <button onClick={handleMarkReview} style={{
              padding: '10px 20px', borderRadius: 100, border: 'none', fontWeight: 700, cursor: 'pointer',
              background: markedForReview.has(currentIdx) ? '#fef3c7' : '#f1f5f9',
              color: markedForReview.has(currentIdx) ? '#92400e' : '#64748b',
              display: 'flex', alignItems: 'center', gap: 6, fontSize: 14
            }}>
              <Flag size={16} /> {markedForReview.has(currentIdx) ? 'Marked ★' : 'Mark for Review'}
            </button>

            <div style={{ display: 'flex', gap: 10 }}>
              {currentIdx > 0 && (
                <button onClick={() => setCurrentIdx(i => i - 1)} style={{
                  padding: '10px 20px', borderRadius: 100, border: '2px solid #e2e8f0', background: '#fff',
                  fontWeight: 700, cursor: 'pointer', color: '#475569'
                }}>← Previous</button>
              )}
              {currentIdx < questions.length - 1 ? (
                <button onClick={() => setCurrentIdx(i => i + 1)} style={{
                  padding: '10px 20px', borderRadius: 100, border: 'none', background: '#4f46e5',
                  color: '#fff', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6
                }}>
                  Next <ChevronRight size={16} />
                </button>
              ) : null}
            </div>
          </div>
        </div>

        {/* Right: Question Palette */}
        <div style={{ background: '#fffbeb', borderRadius: 20, padding: 24, border: '1px solid #fef08a', height: 'fit-content', position: 'sticky', top: 100 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <Clock size={18} color="#92400e" />
            <span style={{ fontWeight: 900, fontSize: 20, color: '#92400e', fontFamily: 'monospace' }}>{formatTime(timer)}</span>
          </div>
          <h4 style={{ fontSize: 15, fontWeight: 800, color: '#1e293b', margin: '0 0 12px' }}>Question Palette</h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 6, marginBottom: 16 }}>
            {questions.map((_, i) => {
              const isAnswered = answers[i] !== undefined;
              const isReview = markedForReview.has(i);
              const isCurrent = i === currentIdx;
              let bg = '#fff', border = '#e2e8f0', color = '#64748b';
              if (isCurrent) { bg = '#4f46e5'; border = '#4f46e5'; color = '#fff'; }
              else if (isReview) { bg = '#fef3c7'; border = '#f59e0b'; color = '#92400e'; }
              else if (isAnswered) { bg = '#dcfce7'; border = '#86efac'; color = '#166534'; }

              return (
                <button key={i} onClick={() => setCurrentIdx(i)} style={{
                  width: 40, height: 40, borderRadius: 10, border: `2px solid ${border}`,
                  background: bg, color, fontWeight: 900, fontSize: 14, cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  {i + 1}
                </button>
              );
            })}
          </div>

          {/* Legend */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 12, fontWeight: 700, color: '#475569', marginBottom: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 16, height: 16, borderRadius: 4, background: '#dcfce7', border: '2px solid #86efac' }} />
              Answered
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 16, height: 16, borderRadius: 4, background: '#fff', border: '2px solid #e2e8f0' }} />
              Not Answered
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 16, height: 16, borderRadius: 4, background: '#fef3c7', border: '2px solid #f59e0b' }} />
              Marked for Review
            </div>
          </div>

          {/* Submit */}
          <button onClick={handleFinalSubmit} style={{
            width: '100%', padding: '14px', borderRadius: 14, border: 'none',
            background: 'linear-gradient(135deg, #ef4444, #dc2626)', color: '#fff',
            fontWeight: 900, fontSize: 16, cursor: 'pointer',
            boxShadow: '0 4px 15px rgba(239,68,68,0.3)'
          }}>
            Submit Assessment
          </button>
          <p style={{ fontSize: 12, color: '#94a3b8', textAlign: 'center', marginTop: 8 }}>
            {answeredCount}/{questions.length} answered · {reviewCount} marked
          </p>
        </div>
      </div>
    </div>
  );
}
