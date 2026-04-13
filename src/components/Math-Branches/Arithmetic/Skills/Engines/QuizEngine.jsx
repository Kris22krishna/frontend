import React, { useEffect, useRef, useState } from 'react';
import MathRenderer from '../../../../MathRenderer';
import { useSessionLogger } from '@/hooks/useSessionLogger';

const formatTime = (seconds) => {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s < 10 ? '0' : ''}${s}`;
};

export default function QuizEngine({
  questions,
  title,
  onBack,
  onSecondaryBack,
  color,
  prefix = 'calc',
  nodeId,
  sessionType = 'practice'
}) {
  const [questionSet, setQuestionSet] = useState(() => typeof questions === 'function' ? questions() : questions);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [timeTaken, setTimeTaken] = useState(0);
  const { startSession, logAnswer, finishSession, abandonSession } = useSessionLogger();
  const answersPayload = useRef([]);
  const isFinishedRef = useRef(false);

  useEffect(() => {
    isFinishedRef.current = finished;
  }, [finished]);

  useEffect(() => {
    const newQs = typeof questions === 'function' ? questions() : questions;
    setQuestionSet(newQs);
    setCurrent(0);
    setSelected(null);
    setAnswered(false);
    setScore(0);
    setFinished(false);
    setTimeTaken(0);
    answersPayload.current = [];

    if (nodeId) {
      startSession({ nodeId, sessionType });
    }

    return () => {
      if (!isFinishedRef.current && answersPayload.current.length > 0) {
        abandonSession({
          answersPayload: answersPayload.current,
          totalQuestions: newQs.length
        });
      }
    };
  }, [questions, nodeId, sessionType, startSession, abandonSession]);

  useEffect(() => {
    if (finished) return;
    const timer = setInterval(() => {
      setTimeTaken((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [finished]);

  const q = questionSet[current];
  const progress = ((current + (finished ? 1 : 0)) / questionSet.length) * 100;

  const handleSelect = async (optIdx) => {
    if (answered) return;
    setSelected(optIdx);
    setAnswered(true);

    const isCorrect = optIdx === q.correct;
    if (isCorrect) setScore((s) => s + 1);

    if (nodeId) {
      const answerData = {
        question_index: current + 1,
        answer_json: { selected: optIdx, text: q.options[optIdx] },
        is_correct: isCorrect ? 1.0 : 0.0,
        marks_awarded: isCorrect ? 1 : 0,
        marks_possible: 1,
        time_taken_ms: 0
      };
      answersPayload.current.push(answerData);

      await logAnswer({
        questionIndex: answerData.question_index,
        answerJson: answerData.answer_json,
        isCorrect: answerData.is_correct
      });
    }
  };

  const handleNext = async () => {
    if (current + 1 >= questionSet.length) {
      setFinished(true);
      if (nodeId) {
        await finishSession({
          totalQuestions: questionSet.length,
          questionsAnswered: answersPayload.current.length,
          answersPayload: answersPayload.current
        });
      }
    } else {
      setCurrent((c) => c + 1);
      setSelected(null);
      setAnswered(false);
    }
  };

  const handleRetry = () => {
    const newQs = typeof questions === 'function' ? questions() : questions;
    answersPayload.current = [];
    isFinishedRef.current = false;
    setQuestionSet(newQs);
    setCurrent(0);
    setSelected(null);
    setAnswered(false);
    setScore(0);
    setFinished(false);
    setTimeTaken(0);
    if (nodeId) {
      startSession({ nodeId, sessionType });
    }
  };

  if (!questionSet.length) {
    return (
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '20px', textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 28, fontWeight: 900, color: '#1e293b', margin: '0 0 10px' }}>
          No Practice Questions Available
        </h2>
        <p style={{ color: '#64748b', fontSize: 15, margin: '0 0 20px' }}>
          This skill currently has no practice questions.
        </p>
        <button className={`${prefix}-btn-secondary`} onClick={onBack}>Back to Skills</button>
      </div>
    );
  }

  if (finished) {
    const pct = Math.round((score / questionSet.length) * 100);
    const msg = pct >= 90 ? 'Mastered!' : pct >= 75 ? 'Great Job!' : pct >= 50 ? 'Keep it up!' : 'Keep Learning!';
    const sub = pct >= 75 ? 'Excellent understanding!' : 'Review the concepts and try again.';

    return (
      <div className={`${prefix}-quiz-finished`} style={{ maxWidth: 760, margin: '0 auto', padding: '20px' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ width: 140, height: 140, borderRadius: '50%', background: `conic-gradient(${color} ${pct * 3.6}deg, #f1f5f9 0deg)`, margin: '0 auto 24px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', border: '8px solid #fff' }}>
            <div style={{ width: 100, height: 100, background: '#fff', borderRadius: '50%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
              <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: 40, fontWeight: 900, color: '#1e293b', lineHeight: 1 }}>{score}</div>
              <div style={{ fontSize: 13, color: '#64748b', fontWeight: 700 }}>of {questionSet.length}</div>
            </div>
          </div>
          <div style={{ display: 'inline-block', padding: '6px 16px', background: `${color}15`, color, borderRadius: 50, fontSize: 14, fontWeight: 800, marginBottom: 16 }}>
            Time Taken: {formatTime(timeTaken)}
          </div>
          <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 28, fontWeight: 900, color: '#1e293b', margin: '0 0 8px' }}>{msg}</h2>
          <p style={{ color: '#64748b', fontSize: 15, margin: '0 0 24px' }}>{sub}</p>
        </div>

        <div className={`${prefix}-quiz-finished-actions`}>
          <button className={`${prefix}-btn-primary`} onClick={handleRetry} style={{ background: color }}>
            New Questions
          </button>
          <button className={`${prefix}-btn-secondary`} onClick={onBack}>
            Return to Skills
          </button>
          {onSecondaryBack && (
            <button className={`${prefix}-btn-secondary`} onClick={onSecondaryBack}>
              Back to Chapter
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={`${prefix}-quiz-container`}>
      <div style={{ marginBottom: 20 }}>
        <div className={`${prefix}-score-header`} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 800, color, textTransform: 'uppercase', letterSpacing: 1.2, marginBottom: 4 }}>Practice</div>
            <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 20, fontWeight: 800, color: '#1e293b', margin: 0 }}>{title}</h3>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 13, color, fontWeight: 800, background: `${color}15`, padding: '4px 10px', borderRadius: 8, display: 'inline-block', marginBottom: 4 }}>{formatTime(timeTaken)}</div>
              <div style={{ fontSize: 13, color: '#64748b', fontWeight: 700 }}>Q <span style={{ color }}>{current + 1}</span> / {questionSet.length}</div>
            </div>
            <button className={`${prefix}-btn-exit`} onClick={onBack}>Exit</button>
          </div>
        </div>
        <div style={{ background: '#f1f5f9', borderRadius: 10, height: 6, overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${progress}%`, background: color, borderRadius: 10, transition: 'width 0.4s ease' }} />
        </div>
      </div>

      <div className={`${prefix}-quiz-card`}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: `${color}15`, padding: '4px 12px', borderRadius: 8, fontSize: 12, fontWeight: 800, color, marginBottom: 14 }}>
          QUESTION {current + 1}
        </div>

        <div className={`${prefix}-quiz-question-text`} style={{ fontSize: 16, fontWeight: 600, color: '#1e293b', lineHeight: 1.65, marginBottom: 18, whiteSpace: 'pre-line' }}>
          {q?.image && (
            <div style={{ marginBottom: 16 }}>
              <img src={q.image} alt="Problem" style={{ width: '100%', height: 'auto', display: 'block', borderRadius: 12 }} />
            </div>
          )}
          {q?.svg && <div style={{ marginBottom: 16, textAlign: 'center' }} dangerouslySetInnerHTML={{ __html: q.svg }} />}
          <MathRenderer text={q?.question || ''} />
        </div>

        <div className={`${prefix}-quiz-options`}>
          {(q?.options || []).map((opt, oi) => {
            let border = 'rgba(0,0,0,0.06)';
            let bg = '#fff';
            let txtColor = '#1e293b';
            let dot = '#f1f5f9';
            if (answered) {
              if (oi === q.correct) {
                border = '#10b981';
                bg = 'rgba(16,185,129,0.05)';
                txtColor = '#059669';
                dot = '#10b981';
              } else if (oi === selected) {
                border = '#ef4444';
                bg = 'rgba(239,68,68,0.05)';
                txtColor = '#ef4444';
                dot = '#ef4444';
              }
            } else if (selected === oi) {
              border = color;
              bg = `${color}05`;
              dot = color;
            }

            return (
              <button
                key={oi}
                onClick={() => handleSelect(oi)}
                disabled={answered}
                className={`${prefix}-quiz-option`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '14px 16px',
                  borderRadius: 12,
                  border: `2.5px solid ${border}`,
                  background: bg,
                  cursor: answered ? 'default' : 'pointer',
                  fontSize: 14,
                  color: txtColor,
                  textAlign: 'left',
                  transition: 'all 0.2s',
                  fontWeight: selected === oi ? 700 : 500,
                  justifyContent: 'flex-start',
                  fontFamily: 'Open Sans, sans-serif'
                }}
              >
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: dot, flexShrink: 0 }} />
                <span><MathRenderer text={opt} /></span>
              </button>
            );
          })}
        </div>

        {answered && (
          <div style={{ marginTop: 20, padding: '14px 18px', borderRadius: 12, background: 'rgba(15,118,110,0.05)', border: '1px solid rgba(15,118,110,0.1)', color: '#64748b', fontSize: 13.5, lineHeight: 1.65, whiteSpace: 'pre-line' }}>
            <strong style={{ color }}>Explanation: </strong>
            <MathRenderer text={q?.explanation || ''} />
          </div>
        )}
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 16 }}>
        <button
          onClick={handleNext}
          disabled={!answered}
          className={`${prefix}-btn-primary`}
          style={{ padding: '12px 40px', background: answered ? color : '#f1f5f9', color: answered ? '#fff' : '#94a3b8', cursor: answered ? 'pointer' : 'not-allowed', border: 'none', borderRadius: 100, fontSize: 15, fontWeight: 800, boxShadow: answered ? `0 8px 20px ${color}30` : 'none', transition: 'all 0.2s', fontFamily: 'Open Sans, sans-serif' }}
        >
          {current + 1 >= questionSet.length ? 'See Final Score' : 'Next Question'}
        </button>
      </div>
    </div>
  );
}
