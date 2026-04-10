import React, { useEffect, useRef, useState } from 'react';
import MathRenderer from '../../../../MathRenderer';
import { useSessionLogger } from '@/hooks/useSessionLogger';

const getQuestionType = (question) => {
  if (question?.type === 'text') return 'text';
  if (question?.type === 'msq') return 'msq';
  return 'mcq';
};

const normalizeTextAnswer = (value) => String(value ?? '')
  .replace(/[\$\\]/g, '')
  .replace(/\s+/g, ' ')
  .trim()
  .toLowerCase();

const isAnswerComplete = (question, answer) => {
  const type = getQuestionType(question);
  if (type === 'text') return normalizeTextAnswer(answer).length > 0;
  if (type === 'msq') return Array.isArray(answer) && answer.length > 0;
  return answer !== null && answer !== undefined;
};

const isAnswerCorrect = (question, answer) => {
  const type = getQuestionType(question);
  if (type === 'text') {
    return normalizeTextAnswer(answer) === normalizeTextAnswer(question.answer);
  }
  if (type === 'msq') {
    const expected = Array.isArray(question.correct) ? [...question.correct].sort((a, b) => a - b) : [];
    const actual = Array.isArray(answer) ? [...answer].sort((a, b) => a - b) : [];
    return expected.length === actual.length && expected.every((value, index) => value === actual[index]);
  }
  return answer === question.correct;
};

const getCorrectAnswerLabel = (question) => {
  const type = getQuestionType(question);
  if (type === 'text') return question.answer ?? 'No answer provided';
  if (type === 'msq') {
    return Array.isArray(question.correct)
      ? question.correct.map((index) => question.options?.[index]).filter(Boolean).join(', ')
      : 'No answer provided';
  }
  return question.options?.[question.correct] ?? 'No answer provided';
};

const getUserAnswerLabel = (question, answer) => {
  const type = getQuestionType(question);
  if (!isAnswerComplete(question, answer)) return 'Not Answered';
  if (type === 'text') return answer;
  if (type === 'msq') {
    return Array.isArray(answer)
      ? answer.map((index) => question.options?.[index]).filter(Boolean).join(', ')
      : 'Not Answered';
  }
  return question.options?.[answer] ?? 'Not Answered';
};

const formatAnswer = (value) => String(value ?? '');

const formatTime = (seconds) => {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s < 10 ? '0' : ''}${s}`;
};

export default function AssessmentEngine({
  questions,
  title,
  onBack,
  onSecondaryBack,
  color,
  prefix = 'calc',
  nodeId,
  sessionType = 'assessment'
}) {
  const [questionSet, setQuestionSet] = useState(() => typeof questions === 'function' ? questions() : questions);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState(Array(questionSet.length).fill(null));
  const [markedForReview, setMarkedForReview] = useState(Array(questionSet.length).fill(false));
  const [finished, setFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(questionSet.length * 60);
  const topRef = useRef(null);

  const { startSession, logAnswer, finishSession, abandonSession } = useSessionLogger();
  const answersPayload = useRef([]);
  const isFinishedRef = useRef(false);

  useEffect(() => {
    if (isFinishedRef.current) return;

    const newQs = typeof questions === 'function' ? questions() : questions;
    setQuestionSet(newQs);
    setCurrent(0);
    setAnswers(Array(newQs.length).fill(null));
    setMarkedForReview(Array(newQs.length).fill(false));
    setTimeLeft(newQs.length * 60);
    setFinished(false);

    if (nodeId) {
      startSession({ nodeId, sessionType });
      answersPayload.current = Array(newQs.length).fill(null);
    }

    return () => {
      if (!isFinishedRef.current && answersPayload.current.some((a) => a !== null)) {
        abandonSession({
          answersPayload: answersPayload.current.filter(Boolean),
          totalQuestions: newQs.length
        });
      }
    };
  }, [questions, nodeId, sessionType, startSession, abandonSession]);

  useEffect(() => {
    isFinishedRef.current = finished;
  }, [finished]);

  useEffect(() => {
    if (topRef.current) {
      const yOffset = -100;
      const element = topRef.current;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }, [current]);

  useEffect(() => {
    if (finished) return;
    if (timeLeft <= 0) {
      setFinished(true);
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, finished]);

  const q = questionSet[current];

  const handleSelect = async (optIdx) => {
    if (finished) return;
    const newAns = [...answers];
    newAns[current] = optIdx;
    setAnswers(newAns);

    if (nodeId) {
      const isCorrect = isAnswerCorrect(q, optIdx);
      const answerData = {
        question_index: current + 1,
        answer_json: { selected: optIdx, text: q.options[optIdx] },
        is_correct: isCorrect ? 1.0 : 0.0,
        marks_awarded: isCorrect ? 1 : 0,
        marks_possible: 1,
        time_taken_ms: 0
      };
      answersPayload.current[current] = answerData;

      await logAnswer({
        questionIndex: answerData.question_index,
        answerJson: answerData.answer_json,
        isCorrect: answerData.is_correct
      });
    }
  };

  const handleTextAnswerChange = async (value) => {
    if (finished) return;
    const newAns = [...answers];
    newAns[current] = value;
    setAnswers(newAns);

    if (nodeId) {
      const isCorrect = isAnswerCorrect(q, value);
      const answerData = {
        question_index: current + 1,
        answer_json: { text: value },
        is_correct: isCorrect ? 1.0 : 0.0,
        marks_awarded: isCorrect ? 1 : 0,
        marks_possible: 1,
        time_taken_ms: 0
      };
      answersPayload.current[current] = answerData;

      await logAnswer({
        questionIndex: answerData.question_index,
        answerJson: answerData.answer_json,
        isCorrect: answerData.is_correct
      });
    }
  };

  const handleMsqToggle = async (optIdx) => {
    if (finished) return;
    const currentAnswer = Array.isArray(answers[current]) ? answers[current] : [];
    const nextAnswer = currentAnswer.includes(optIdx)
      ? currentAnswer.filter((idx) => idx !== optIdx)
      : [...currentAnswer, optIdx];
    const newAns = [...answers];
    newAns[current] = nextAnswer;
    setAnswers(newAns);

    if (nodeId) {
      const isCorrect = isAnswerCorrect(q, nextAnswer);
      const answerData = {
        question_index: current + 1,
        answer_json: { selected: nextAnswer },
        is_correct: isCorrect ? 1.0 : 0.0,
        marks_awarded: isCorrect ? 1 : 0,
        marks_possible: 1,
        time_taken_ms: 0
      };
      answersPayload.current[current] = answerData;

      await logAnswer({
        questionIndex: answerData.question_index,
        answerJson: answerData.answer_json,
        isCorrect: answerData.is_correct
      });
    }
  };

  const handleNext = () => {
    if (current + 1 < questionSet.length) {
      setCurrent((index) => index + 1);
    }
  };

  const handlePrev = () => {
    if (current > 0) {
      setCurrent((index) => index - 1);
    }
  };

  const toggleMarkForReview = () => {
    if (finished) return;
    setMarkedForReview((prev) => {
      const next = [...prev];
      next[current] = !next[current];
      return next;
    });
  };

  const handleSubmit = async () => {
    if (questionSet.some((question, index) => !isAnswerComplete(question, answers[index]))) {
      if (!window.confirm('You have unanswered questions. Are you sure you want to submit?')) return;
    }
    setFinished(true);

    if (nodeId) {
      const payload = answersPayload.current.filter(Boolean);
      await finishSession({
        totalQuestions: questionSet.length,
        questionsAnswered: payload.length,
        answersPayload: payload
      });
    }
  };

  if (!questionSet.length) {
    return (
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '20px', textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 28, fontWeight: 900, color: '#1e293b', margin: '0 0 10px' }}>
          No Assessment Questions Available
        </h2>
        <p style={{ color: '#64748b', fontSize: 15, margin: '0 0 20px' }}>
          This skill currently has no valid assessment questions.
        </p>
        <button className={`${prefix}-btn-secondary`} onClick={onBack}>Back to Skills</button>
      </div>
    );
  }

  if (finished) {
    const score = questionSet.reduce((acc, question, index) => acc + (isAnswerCorrect(question, answers[index]) ? 1 : 0), 0);
    const pct = Math.round((score / questionSet.length) * 100);

    return (
      <div className={`${prefix}-quiz-finished`} style={{ maxWidth: 860, margin: '0 auto', padding: '20px' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 13, fontWeight: 800, color, textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 8 }}>
            {title} - Assessment
          </div>
          <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 28, fontWeight: 900, color: '#1e293b', margin: '0 0 16px' }}>
            Assessment Complete
          </h2>
          <div style={{ fontSize: 52, fontWeight: 900, color, lineHeight: 1, marginBottom: 4 }}>{score} / {questionSet.length}</div>
          <div style={{ fontSize: 18, color: '#64748b', fontWeight: 600 }}>Score: {pct}%</div>

          <div className={`${prefix}-quiz-finished-actions`}>
            <button
              className={`${prefix}-btn-primary`}
              onClick={() => {
                const newQs = typeof questions === 'function' ? questions() : questions;
                setQuestionSet(newQs);
                setCurrent(0);
                setAnswers(Array(newQs.length).fill(null));
                setMarkedForReview(Array(newQs.length).fill(false));
                setTimeLeft(newQs.length * 60);
                setFinished(false);
              }}
              style={{ padding: '10px 20px', background: color, border: 'none', color: '#fff', borderRadius: 8, fontWeight: 700, cursor: 'pointer' }}
            >
              Retake Assessment
            </button>
            <button className={`${prefix}-btn-secondary`} onClick={onBack} style={{ padding: '10px 20px' }}>
              Return to Skills
            </button>
            {onSecondaryBack && (
              <button className={`${prefix}-btn-secondary`} onClick={onSecondaryBack} style={{ padding: '10px 20px', background: '#f8fafc' }}>
                Back to Chapter
              </button>
            )}
          </div>
        </div>

        <h3 style={{ fontSize: 24, fontWeight: 800, marginBottom: 20, color: '#1e293b' }}>Summary Report</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {questionSet.map((question, index) => {
            const isCorrect = isAnswerCorrect(question, answers[index]);
            const correctOptText = getCorrectAnswerLabel(question);
            const userOptText = getUserAnswerLabel(question, answers[index]);

            return (
              <div
                key={index}
                style={{
                  padding: 20,
                  borderRadius: 16,
                  border: `2px solid ${isCorrect ? '#10b981' : '#ef4444'}`,
                  background: isCorrect ? 'rgba(16,185,129,0.05)' : 'rgba(239,68,68,0.05)'
                }}
              >
                <div style={{ fontWeight: 800, marginBottom: 8, color: isCorrect ? '#10b981' : '#ef4444' }}>
                  Question {index + 1} - {isCorrect ? 'Correct' : 'Incorrect'}
                </div>
                <div className={`${prefix}-quiz-question-text`} style={{ fontSize: 16, marginBottom: 16, color: '#1e293b', fontWeight: 600 }}>
                  <MathRenderer text={question.question} />
                </div>
                <div className={`${prefix}-summary-split`}>
                  <div className={`${prefix}-summary-item`}>
                    <strong style={{ color: '#10b981' }}>Correct Answer:</strong>
                    <div style={{ marginTop: 6 }}>
                      <MathRenderer text={formatAnswer(correctOptText).includes('$') || formatAnswer(correctOptText).includes('^') ? (formatAnswer(correctOptText).includes('$') ? formatAnswer(correctOptText) : `$${correctOptText}$`) : formatAnswer(correctOptText)} />
                    </div>
                  </div>
                  <div className={`${prefix}-summary-item user-ans`}>
                    <strong style={{ color: isCorrect ? '#10b981' : '#ef4444' }}>Your Answer:</strong>
                    <div style={{ marginTop: 6 }}>
                      {userOptText === 'Not Answered'
                        ? 'Not Answered'
                        : <MathRenderer text={formatAnswer(userOptText).includes('$') || formatAnswer(userOptText).includes('^') ? (formatAnswer(userOptText).includes('$') ? formatAnswer(userOptText) : `$${userOptText}$`) : formatAnswer(userOptText)} />}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  const qType = getQuestionType(q);

  return (
    <div className={`${prefix}-quiz-active ${prefix}-assessment-layout`}>

      {/* ── Question area (left/top) ── */}
      <div style={{ flex: 1, minWidth: 0 }} ref={topRef}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 800, color, textTransform: 'uppercase', letterSpacing: 1.2 }}>Assessment</div>
            <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: 18, fontWeight: 800, color: '#1e293b' }}>{title}</div>
          </div>
          <button
            className={`${prefix}-btn-exit`}
            onClick={() => {
              if (window.confirm('Are you sure you want to exit? Your progress will be lost.')) {
                onBack();
              }
            }}
          >
            <span>✕</span> Exit
          </button>
        </div>

        <div className={`${prefix}-quiz-card`}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: `${color}15`, padding: '4px 12px', borderRadius: 8, fontSize: 12, fontWeight: 800, color, marginBottom: 16 }}>
            QUESTION {current + 1} OF {questionSet.length}
          </div>

          <div className={`${prefix}-quiz-question-text`} style={{ fontSize: 16, fontWeight: 600, color: '#1e293b', lineHeight: 1.65, marginBottom: 20, whiteSpace: 'pre-line' }}>
            {q?.svg && (
              <div style={{ marginBottom: 16, textAlign: 'center' }} dangerouslySetInnerHTML={{ __html: q.svg }} />
            )}
            <MathRenderer text={q?.question || ''} />
          </div>

          {qType === 'text' ? (
            <div style={{ display: 'grid', gap: 12 }}>
              <label style={{ fontSize: 12, fontWeight: 800, letterSpacing: 1.2, textTransform: 'uppercase', color: '#64748b' }}>
                Type your answer
              </label>
              <input
                type="text"
                value={answers[current] ?? ''}
                onChange={(e) => handleTextAnswerChange(e.target.value)}
                placeholder="Enter your answer"
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  borderRadius: 12,
                  border: `2px solid ${isAnswerComplete(q, answers[current]) ? color : 'rgba(0,0,0,0.08)'}`,
                  background: '#fff',
                  color: '#1e293b',
                  fontSize: 15,
                  fontWeight: 600,
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>
          ) : (
            <div className={`${prefix}-quiz-options`}>
              {(q?.options || []).map((opt, optIndex) => {
                const isSelected = qType === 'msq'
                  ? Array.isArray(answers[current]) && answers[current].includes(optIndex)
                  : answers[current] === optIndex;

                return (
                  <button
                    key={optIndex}
                    onClick={() => qType === 'msq' ? handleMsqToggle(optIndex) : handleSelect(optIndex)}
                    className={`${prefix}-quiz-option`}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 12,
                      padding: '12px 14px',
                      borderRadius: 12,
                      border: `2.5px solid ${isSelected ? color : 'rgba(0,0,0,0.06)'}`,
                      background: isSelected ? `${color}06` : '#fff',
                      cursor: 'pointer',
                      fontSize: 14,
                      color: isSelected ? color : '#1e293b',
                      textAlign: 'left',
                      transition: 'all 0.2s',
                      fontWeight: isSelected ? 700 : 500,
                      width: '100%',
                      lineHeight: 1.55,
                      fontFamily: 'Open Sans, sans-serif'
                    }}
                  >
                    <div style={{ width: 9, height: 9, borderRadius: '50%', background: isSelected ? color : '#f1f5f9', flexShrink: 0 }} />
                    <span style={{ display: 'block', minWidth: 0, maxWidth: '100%', lineHeight: 1.55, color: 'inherit' }}>
                      <MathRenderer text={opt.includes('^') || opt.includes('=') || opt.includes('/') ? (opt.includes('$') ? opt : `$${opt}$`) : opt} />
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* ── Nav row ── */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 20, flexWrap: 'wrap', gap: '12px 16px' }}>
          <button
            className={`${prefix}-btn-secondary`}
            onClick={handlePrev}
            disabled={current === 0}
            style={{ visibility: current === 0 ? 'hidden' : 'visible' }}
          >
            ← Previous
          </button>

          <button
            className={`${prefix}-btn-review${markedForReview[current] ? ' active' : ''}`}
            onClick={toggleMarkForReview}
          >
            Mark for Review
          </button>

          {current + 1 === questionSet.length ? (
            <button
              className={`${prefix}-btn-primary`}
              onClick={handleSubmit}
              style={{ background: '#ef4444' }}
            >
              Submit Assessment
            </button>
          ) : (
            <button
              className={`${prefix}-btn-primary`}
              onClick={handleNext}
              style={{ background: color }}
            >
              Next →
            </button>
          )}
        </div>
      </div>

      {/* ── Mobile Palette Hint ── */}
      <div className={`${prefix}-palette-hint`}>
        <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', color: '#64748b' }}>Scroll down for Question Palette</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#94a3b8' }}><polyline points="6 9 12 15 18 9"></polyline></svg>
      </div>

      {/* ── Palette sidebar (right/bottom) ── */}
      <div className={`${prefix}-assessment-palette`}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '12px', borderRadius: 12, marginBottom: 20, fontWeight: 800, fontSize: 18, background: timeLeft < 60 ? 'rgba(239,68,68,0.1)' : `${color}0D`, color: timeLeft < 60 ? '#ef4444' : color }}>
          {formatTime(timeLeft)}
        </div>
        <div style={{ fontSize: 12, fontWeight: 800, marginBottom: 12, color: '#1e293b', textTransform: 'uppercase', letterSpacing: 0.5 }}>Question Palette</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 6 }}>
          {questionSet.map((_, i) => {
            const isAnswered = answers[i] !== null;
            const isCurrent = current === i;
            const isMarked = markedForReview[i];
            
            let border = isCurrent ? '3px solid #1e293b' : '1px solid #e2e8f0';
            if (!isCurrent && isMarked) border = '2.5px solid #f59e0b';

            return (
              <button key={i} onClick={() => setCurrent(i)}
                style={{ aspectRatio: '1/1', borderRadius: 8, fontSize: 13, fontWeight: 700, background: isAnswered ? color : '#f1f5f9', color: isAnswered ? '#fff' : '#64748b', border, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s', position: 'relative' }}>
                {i + 1}
                {isMarked && <div style={{ position: 'absolute', top: -4, right: -4, width: 10, height: 10, borderRadius: '50%', background: '#f59e0b', border: '2.5px solid #fff' }} />}
              </button>
            );
          })}
        </div>
        <div style={{ marginTop: 20, fontSize: 12, color: '#64748b' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
            <div style={{ width: 10, height: 10, background: color, borderRadius: 3 }} /> Answered
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
            <div style={{ width: 10, height: 10, background: '#f1f5f9', borderRadius: 3, border: '1px solid #e2e8f0' }} /> Pending
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 10, height: 10, background: '#fffbeb', borderRadius: 3, border: '1.5px solid #f59e0b' }} /> Marked for Review
          </div>
        </div>
        <button className={`${prefix}-btn-primary`} onClick={handleSubmit} style={{ background: '#ef4444', width: '100%', padding: '12px', marginTop: 24, fontSize: 13, boxShadow: 'none' }}>
          Submit Assessment
        </button>
      </div>

    </div>
  );
}
