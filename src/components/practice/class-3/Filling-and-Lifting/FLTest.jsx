import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Timer, Star, ChevronLeft, ChevronRight, Check, X, RefreshCw, FileText } from 'lucide-react';
import { motion } from 'framer-motion';
import { useSessionLogger } from '@/hooks/useSessionLogger';
import { NODE_IDS } from '@/lib/curriculumIds';
import Navbar from '../../../Navbar';
import StickerExit from '../../../StickerExit';
import { LatexText } from '../../../LatexText';
import avatarImg from '../../../../assets/avatar.png';
import { CapacityRow, BalanceScaleSVG, LitreDisplay, WeightBlocks, CoinRow, FLOption, AchievementBadge, shuffle } from './FLSharedComponents';
import '../../../../pages/juniors/class-1/Grade1Practice.css';
import '../../../../pages/juniors/grade3/time-goes-ontest.css';
import './filling-and-lifting.css';

const TOPIC_URL = encodeURIComponent('Filling and Lifting');
const SKILL_NAME = 'Filling and Lifting — Chapter Test';
const TOTAL_QUESTIONS = 10;

const ALL_QUESTIONS = [
  // FL-01 Comparing Capacity
  {
    id: 'flt_1', correct: 'Big glass', explanation: 'A bigger glass has more space inside and holds more liquid!', correctLabel: 'Big glass', text: 'Which glass holds MORE juice?',
    render: (sel, onSel) => (
      <div className="fl-qcard fl-s1">
        <AchievementBadge icon="🥤" label="CAPACITY CHECK!" color="#0ea5e9" />
        <p className="fl-qtext">Which glass holds MORE? 🥤</p>
        <CapacityRow containers={[
          { type: 'glass', fillPct: 100, color: '#60a5fa', label: 'Small glass', size: 'sm' },
          { type: 'glass', fillPct: 100, color: '#0ea5e9', label: 'Big glass', size: 'lg' },
        ]} />
        <div className="fl-opts">
          {[['Small glass','A'],['Big glass','B'],['Both same','C'],['Cannot say','D']].map(([v,l],i) => (
            <FLOption key={v} value={v} label={l} index={i} onClick={() => onSel(v)} className={sel === v ? 'toy-joy-selected' : ''} />
          ))}
        </div>
      </div>
    ),
  },
  // FL-02 Estimating Capacity
  {
    id: 'flt_2', correct: '🪣 Bucket', explanation: 'Of all these containers, a bucket holds the most — it is the largest!', correctLabel: '🪣 Bucket', text: 'Which container holds the MOST?',
    render: (sel, onSel) => (
      <div className="fl-qcard fl-s2">
        <AchievementBadge icon="🏆" label="MOST CAPACITY!" color="#10b981" />
        <p className="fl-qtext">Which container holds the MOST? 🏆</p>
        <div className="fl-opts">
          {[['☕ Teacup','A'],['🥤 Glass','B'],['🏺 Jug','C'],['🪣 Bucket','D']].map(([v,l],i) => (
            <FLOption key={v} value={v} label={l} index={i} onClick={() => onSel(v)} className={sel === v ? 'toy-joy-selected' : ''} />
          ))}
        </div>
      </div>
    ),
  },
  // FL-03 Measuring by Filling
  {
    id: 'flt_3', correct: '12', explanation: '1 bowl needs 4 ladles. 3 bowls need 3 × 4 = 12 ladles!', correctLabel: '12', text: '4 ladles fill 1 bowl. How many ladles fill 3 bowls?',
    render: (sel, onSel) => (
      <div className="fl-qcard fl-s3">
        <AchievementBadge icon="🥄" label="LADLE COUNTING!" color="#8b5cf6" />
        <p className="fl-qtext">4 ladles = 1 bowl. 3 bowls = ? ladles 🥄</p>
        <div className="fl-opts">
          {[['7','A'],['10','B'],['12','C'],['16','D']].map(([v,l],i) => (
            <FLOption key={v} value={v} label={l} index={i} onClick={() => onSel(v)} className={sel === v ? 'toy-joy-selected' : ''} />
          ))}
        </div>
      </div>
    ),
  },
  // FL-04 Understanding Litre
  {
    id: 'flt_4', correct: '2', explanation: '1 litre = 2 half litres. Two halves make one whole!', correctLabel: '2', text: '1 litre = ___ half litres?',
    render: (sel, onSel) => (
      <div className="fl-qcard fl-s4">
        <AchievementBadge icon="💧" label="LITRE MATH!" color="#f59e0b" />
        <p className="fl-qtext">1 litre = ___ half litres? 💧</p>
        <LitreDisplay bottles={[
          { label: '1 L', fillPct: 100, color: '#60a5fa', fraction: '1 L' },
          { label: '½ L', fillPct: 50, color: '#93c5fd', fraction: '½ L' },
          { label: '½ L', fillPct: 50, color: '#93c5fd', fraction: '½ L' },
        ]} />
        <div className="fl-opts">
          {[['1','A'],['2','B'],['3','C'],['4','D']].map(([v,l],i) => (
            <FLOption key={v} value={v} label={l} index={i} onClick={() => onSel(v)} className={sel === v ? 'toy-joy-selected' : ''} />
          ))}
        </div>
      </div>
    ),
  },
  // FL-04 Understanding Litre - quarter litre
  {
    id: 'flt_5', correct: '4', explanation: '1 litre = 4 quarter litres. Four quarters make one whole!', correctLabel: '4', text: '1 litre = ___ quarter litres?',
    render: (sel, onSel) => (
      <div className="fl-qcard fl-s4">
        <AchievementBadge icon="¼" label="QUARTER LITRE!" color="#f59e0b" />
        <p className="fl-qtext">1 litre = ___ quarter litres? ¼</p>
        <div className="fl-opts">
          {[['2','A'],['3','B'],['4','C'],['8','D']].map(([v,l],i) => (
            <FLOption key={v} value={v} label={l} index={i} onClick={() => onSel(v)} className={sel === v ? 'toy-joy-selected' : ''} />
          ))}
        </div>
      </div>
    ),
  },
  // FL-05 Heavy and Light
  {
    id: 'flt_6', correct: 'Left side (stone)', explanation: 'A stone is much heavier than a feather — the heavier side always goes DOWN!', correctLabel: 'Left side (stone)', text: 'Stone on left, feather on right. Which side goes DOWN?',
    render: (sel, onSel) => (
      <div className="fl-qcard fl-s5">
        <AchievementBadge icon="⚖️" label="BALANCE CHECK!" color="#ef4444" />
        <p className="fl-qtext">Stone on LEFT, feather on RIGHT. Which side goes DOWN? ⚖️</p>
        <BalanceScaleSVG leftLabel="🪨 Stone" rightLabel="🪶 Feather" tilt="left" leftColor="#fca5a5" rightColor="#fde68a" />
        <div className="fl-opts">
          {[['Left side (stone)','A'],['Right side (feather)','B'],['Both sides equal','C'],['Neither side','D']].map(([v,l],i) => (
            <FLOption key={v} value={v} label={l} index={i} onClick={() => onSel(v)} className={sel === v ? 'toy-joy-selected' : ''} />
          ))}
        </div>
      </div>
    ),
  },
  // FL-06 Measuring with Balance
  {
    id: 'flt_7', correct: 'Sharpener', explanation: 'Eraser = 3 coins, Sharpener = 5 coins. More coins = heavier! The sharpener is heavier.', correctLabel: 'Sharpener', text: 'Eraser = 3 coins. Sharpener = 5 coins. Which is heavier?',
    render: (sel, onSel) => (
      <div className="fl-qcard fl-s6">
        <AchievementBadge icon="🪙" label="COIN BALANCE!" color="#ec4899" />
        <p className="fl-qtext">Eraser = 3 coins. Sharpener = 5 coins. Which is heavier? 🪙</p>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', margin: '10px 0' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: "'Baloo 2',cursive", fontWeight: 800, fontSize: '.85rem', color: '#9d174d' }}>🩹 Eraser</div>
            <CoinRow count={3} color="#f59e0b" />
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: "'Baloo 2',cursive", fontWeight: 800, fontSize: '.85rem', color: '#9d174d' }}>✏️ Sharpener</div>
            <CoinRow count={5} color="#f59e0b" />
          </div>
        </div>
        <div className="fl-opts">
          {[['Eraser','A'],['Sharpener','B'],['Both same','C'],['The coins','D']].map(([v,l],i) => (
            <FLOption key={v} value={v} label={l} index={i} onClick={() => onSel(v)} className={sel === v ? 'toy-joy-selected' : ''} />
          ))}
        </div>
      </div>
    ),
  },
  // FL-07 Understanding Kilogram
  {
    id: 'flt_8', correct: 'A big watermelon', explanation: 'A big watermelon weighs 5–8 kg — much more than 1 kg!', correctLabel: 'A big watermelon', text: 'Which is HEAVIER than 1 kg?',
    render: (sel, onSel) => (
      <div className="fl-qcard fl-s7">
        <AchievementBadge icon="🍉" label="MORE THAN 1 KG?" color="#16a34a" />
        <p className="fl-qtext">Which is HEAVIER than 1 kg? 🍉</p>
        <WeightBlocks weights={[{ label: '1 kg', type: 'kg' }]} />
        <div className="fl-opts">
          {[['An eraser','A'],['A pencil','B'],['A big watermelon','C'],['A coin','D']].map(([v,l],i) => (
            <FLOption key={v} value={v} label={l} index={i} onClick={() => onSel(v)} className={sel === v ? 'toy-joy-selected' : ''} />
          ))}
        </div>
      </div>
    ),
  },
  // FL-08 Half and Quarter kg
  {
    id: 'flt_9', correct: '2', explanation: '1 kg = 2 half kg. Two halves always make one whole!', correctLabel: '2', text: '1 kg = ___ half kg?',
    render: (sel, onSel) => (
      <div className="fl-qcard fl-s8">
        <AchievementBadge icon="½" label="HALF KILOGRAM!" color="#7c3aed" />
        <p className="fl-qtext">1 kg = ___ half kg? ½</p>
        <WeightBlocks weights={[{ label: '1 kg', type: 'kg' }, { label: '= ½ + ½ kg', type: 'half' }]} />
        <div className="fl-opts">
          {[['1','A'],['2','B'],['3','C'],['4','D']].map(([v,l],i) => (
            <FLOption key={v} value={v} label={l} index={i} onClick={() => onSel(v)} className={sel === v ? 'toy-joy-selected' : ''} />
          ))}
        </div>
      </div>
    ),
  },
  // FL-09 Weight Puzzles
  {
    id: 'flt_10', correct: 'Ball A', explanation: 'Ball A > Ball B > Ball C. So Ball A is the heaviest! (Transitive property)', correctLabel: 'Ball A', text: 'A > B, B > C. Which is HEAVIEST?',
    render: (sel, onSel) => (
      <div className="fl-qcard fl-s9">
        <AchievementBadge icon="🧩" label="WEIGHT PUZZLE!" color="#d97706" />
        <p className="fl-qtext">A &gt; B &gt; C. Which is HEAVIEST? 🧩</p>
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', margin: '14px 0', flexWrap: 'wrap' }}>
          {[['A','#fca5a5'],['B','#fcd34d'],['C','#86efac']].map(([ball, color]) => (
            <motion.div key={ball}
              style={{ width: 52, height: 52, borderRadius: '50%', background: color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Baloo 2',cursive", fontWeight: 900, fontSize: '1.4rem', border: '2px solid #374151' }}
              initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 300 }}>
              {ball}
            </motion.div>
          ))}
        </div>
        <div className="fl-opts">
          {[['Ball A','A'],['Ball B','B'],['Ball C','C'],['All same','D']].map(([v,l],i) => (
            <FLOption key={v} value={v} label={l} index={i} onClick={() => onSel(v)} className={sel === v ? 'toy-joy-selected' : ''} />
          ))}
        </div>
      </div>
    ),
  },
  // Extra questions for variety
  {
    id: 'flt_11', correct: '6', explanation: '3 glasses fill 1 jug. 2 jugs need 2 × 3 = 6 glasses!', correctLabel: '6', text: '3 glasses fill 1 jug. How many glasses fill 2 jugs?',
    render: (sel, onSel) => (
      <div className="fl-qcard fl-s3">
        <AchievementBadge icon="🥤" label="JUG FILLING!" color="#8b5cf6" />
        <p className="fl-qtext">3 glasses = 1 jug. 2 jugs = ? glasses 🥤</p>
        <div className="fl-opts">
          {[['3','A'],['5','B'],['6','C'],['9','D']].map(([v,l],i) => (
            <FLOption key={v} value={v} label={l} index={i} onClick={() => onSel(v)} className={sel === v ? 'toy-joy-selected' : ''} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'flt_12', correct: '1 litre', explanation: 'Half litre + half litre = 1 full litre! Two halves make one whole.', correctLabel: '1 litre', text: '½ litre + ½ litre = ___?',
    render: (sel, onSel) => (
      <div className="fl-qcard fl-s4">
        <AchievementBadge icon="💧" label="LITRE ADDITION!" color="#f59e0b" />
        <p className="fl-qtext">½ litre + ½ litre = ___? 💧</p>
        <div className="fl-opts">
          {[['½ litre','A'],['1 litre','B'],['2 litres','C'],['¼ litre','D']].map(([v,l],i) => (
            <FLOption key={v} value={v} label={l} index={i} onClick={() => onSel(v)} className={sel === v ? 'toy-joy-selected' : ''} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'flt_13', correct: '1 kg', explanation: 'Meera starts with 2 kg. She uses 1 kg. 2 - 1 = 1 kg of rice remains!', correctLabel: '1 kg', text: 'Meera has 2 kg of rice, uses 1 kg. How much remains?',
    render: (sel, onSel) => (
      <div className="fl-qcard fl-s7">
        <AchievementBadge icon="🌾" label="RICE PROBLEM!" color="#16a34a" />
        <p className="fl-qtext">2 kg − 1 kg used = ___? 🌾</p>
        <WeightBlocks weights={[{ label: '2 kg', type: 'kg' }, { label: '−1 kg', type: 'half' }, { label: '= ?', type: 'quarter' }]} />
        <div className="fl-opts">
          {[['0 kg','A'],['1 kg','B'],['2 kg','C'],['3 kg','D']].map(([v,l],i) => (
            <FLOption key={v} value={v} label={l} index={i} onClick={() => onSel(v)} className={sel === v ? 'toy-joy-selected' : ''} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'flt_14', correct: '4', explanation: '1 kg = 4 quarter kg. Four quarters make 1 whole kg!', correctLabel: '4', text: '1 kg = ___ quarter kg?',
    render: (sel, onSel) => (
      <div className="fl-qcard fl-s8">
        <AchievementBadge icon="¼" label="QUARTER KG!" color="#7c3aed" />
        <p className="fl-qtext">1 kg = ___ quarter kg? ¼</p>
        <div className="fl-opts">
          {[['2','A'],['3','B'],['4','C'],['6','D']].map(([v,l],i) => (
            <FLOption key={v} value={v} label={l} index={i} onClick={() => onSel(v)} className={sel === v ? 'toy-joy-selected' : ''} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'flt_15', correct: 'Right side (3 oranges)', explanation: '3 oranges weigh more than 2 apples (same weight each). More objects = heavier side goes down!', correctLabel: 'Right side (3 oranges)', text: '2 apples on left, 3 oranges on right (same weight each). Which side goes down?',
    render: (sel, onSel) => (
      <div className="fl-qcard fl-s9">
        <AchievementBadge icon="🍊" label="FRUIT BALANCE!" color="#d97706" />
        <p className="fl-qtext">Left: 2🍎  Right: 3🍊 (same weight each). Which side DOWN? 🍊</p>
        <BalanceScaleSVG leftLabel="2🍎" rightLabel="3🍊" tilt="right" leftColor="#fde68a" rightColor="#fca5a5" />
        <div className="fl-opts">
          {[['Left side (2 apples)','A'],['Right side (3 oranges)','B'],['Both equal','C'],['Cannot tell','D']].map(([v,l],i) => (
            <FLOption key={v} value={v} label={l} index={i} onClick={() => onSel(v)} className={sel === v ? 'toy-joy-selected' : ''} />
          ))}
        </div>
      </div>
    ),
  },
];

const FLTest = () => {
  const navigate = useNavigate();
  const { startSession, logAnswer, finishSession } = useSessionLogger();
  const questionsRef = useRef(null);
  if (!questionsRef.current) {
    questionsRef.current = shuffle([...ALL_QUESTIONS]).slice(0, TOTAL_QUESTIONS);
  }
  const questions = questionsRef.current;

  const [qIndex, setQIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(0);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    startSession({ nodeId: NODE_IDS.g3MathFLTest, sessionType: 'assessment' });
  }, [startSession]);

  useEffect(() => {
    let iv;
    if (!showResults) iv = setInterval(() => setTimer(v => v + 1), 1000);
    return () => clearInterval(iv);
  }, [showResults]);

  const currentQ = questions[qIndex];
  const isAnswered = !!answers[qIndex]?.selectedOption;
  const currentSel = answers[qIndex]?.tempSelection || (isAnswered ? answers[qIndex].selectedOption : null);
  const tempSel = currentSel;

  const handleSelect = (val) => {
    if (isAnswered) return;
    setAnswers(prev => ({ ...prev, [qIndex]: { ...(prev[qIndex] || {}), tempSelection: val } }));
  };

  const handleSubmit = () => {
    if (!tempSel || isAnswered) return;
    const isCorrect = tempSel === currentQ.correct;
    if (isCorrect) setScore(s => s + 1);
    logAnswer({ question_index: qIndex, answer_json: { selected: tempSel, correct: currentQ.correctLabel, isCorrect }, is_correct: isCorrect ? 1 : 0 });
    setAnswers(prev => ({
      ...prev,
      [qIndex]: { selectedOption: tempSel, isCorrect, questionText: currentQ.text, correctAnswer: currentQ.correctLabel, explanation: currentQ.explanation }
    }));
    handleNext();
  };

  const handleSkip = () => {
    logAnswer({ question_index: qIndex, answer_json: { selected: 'Skipped', correct: currentQ.correctLabel, isCorrect: false }, is_correct: 0 });
    setAnswers(prev => ({
      ...prev,
      [qIndex]: { selectedOption: 'Skipped', isCorrect: false, questionText: currentQ.text, correctAnswer: currentQ.correctLabel, explanation: currentQ.explanation }
    }));
    handleNext();
  };

  const handleNext = () => {
    if (qIndex < TOTAL_QUESTIONS - 1) {
      setQIndex(v => v + 1);
    } else {
      finishSession({ totalQuestions: TOTAL_QUESTIONS, questionsAnswered: Object.keys(answers).length + 1, answersPayload: answers });
      setShowResults(true);
    }
  };

  const formatTime = (s) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;

  if (showResults) {
    const pct = Math.round((score / TOTAL_QUESTIONS) * 100);
    return (
      <div className="grade1-practice-page results-view overflow-y-auto">
        <Navbar />
        <header className="results-header">
          <h1 className="results-title">Chapter Test Report</h1>
          <div className="exit-container">
            <StickerExit onClick={() => navigate(`/junior/grade/3/topic/${TOPIC_URL}`)} />
          </div>
        </header>
        <main className="results-content">
          <div className="results-hero-section">
            <img src={avatarImg} alt="Mascot" style={{ width: '120px', height: '120px', margin: '0 auto 20px' }} />
            <h2 style={{ fontSize: '2.5rem', color: '#31326F', fontFamily: 'Nunito, sans-serif' }}>Filling & Lifting Complete! 💧⚖️🎉</h2>
            <div className="stars-container">
              {[1,2,3].map(i => (
                <Star key={i} size={60} fill={pct >= (i * 33) ? '#FFD700' : '#EDF2F7'} color={pct >= (i * 33) ? '#F6AD55' : '#CBD5E0'} />
              ))}
            </div>
            <div className="results-stats-grid">
              <div className="stat-card"><span className="stat-label">Correct</span><span className="stat-value-large">{score}/{TOTAL_QUESTIONS}</span></div>
              <div className="stat-card"><span className="stat-label">Time</span><span className="stat-value-large">{formatTime(timer)}</span></div>
              <div className="stat-card"><span className="stat-label">Accuracy</span><span className="stat-value-large">{pct}%</span></div>
            </div>
          </div>

          <div className="detailed-breakdown">
            <h3 className="breakdown-title">Quest Log 📜</h3>
            <div className="quest-log-list">
              {questions.map((q, idx) => {
                const ans = answers[idx];
                if (!ans || !ans.selectedOption) return null;
                return (
                  <motion.div key={idx} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="quest-log-item">
                    <div className={`log-number ${!ans.isCorrect ? 'wrong' : ''}`}>{idx + 1}</div>
                    <div className="log-content">
                      <div className="log-question"><LatexText text={ans.questionText} /></div>
                      <div className="log-answers">
                        <div className={`log-answer-box ${ans.isCorrect ? 'correct-box' : 'wrong-box'}`}>
                          <span className="log-label">Your Answer</span>
                          <span className="log-value">{ans.selectedOption}</span>
                        </div>
                        {!ans.isCorrect && (
                          <div className="log-answer-box correct-box">
                            <span className="log-label">Correct Answer</span>
                            <span className="log-value">{ans.correctAnswer}</span>
                          </div>
                        )}
                      </div>
                      <div className="log-explanation">
                        <span className="log-label" style={{ color: '#4C51BF' }}>Explain? 💡</span>
                        <LatexText text={ans.explanation} />
                      </div>
                    </div>
                    <div className="log-icon">
                      {ans.isCorrect ? <Check size={32} color="#4FB7B3" strokeWidth={3} /> : <X size={32} color="#FF6B6B" strokeWidth={3} />}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <div className="results-actions">
            <button className="action-btn-large retake-skill-btn" onClick={() => window.location.reload()}><RefreshCw size={24} /> Retake Test</button>
            <button className="action-btn-large back-topics-btn" onClick={() => navigate(`/junior/grade/3/topic/${TOPIC_URL}`)}><FileText size={24} /> Back to Topics</button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="grade1-practice-page">
      <div className="g1-bg-blobs">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
      </div>
      <div className="g1-practice-container">
        <div className="g1-header-nav">
          <div className="g1-timer-badge"><Timer size={18} /> {formatTime(timer)}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', flex: 1, minWidth: 0, paddingLeft: 10 }}>
            <span style={{ fontWeight: 400, color: '#666', fontSize: '1rem', background: 'white', padding: '8px 15px', borderRadius: '15px', boxShadow: '0 4px 10px rgba(0,0,0,0.05)', whiteSpace: 'nowrap' }}>
              Q {qIndex + 1}/{TOTAL_QUESTIONS}
            </span>
            <span style={{ fontWeight: 400, color: '#2D3436', fontSize: '1rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {SKILL_NAME}
            </span>
          </div>
          {!isAnswered && (
            <button className="g1-skip-btn" onClick={handleSkip} style={{ marginLeft: '15px' }}>Skip ⏭️</button>
          )}
          <div className="exit-practice-sticker" style={{ marginLeft: 'auto' }}>
            <StickerExit onClick={() => navigate(`/junior/grade/3/topic/${TOPIC_URL}`)} />
          </div>
        </div>
        <div className="g1-progress-container" style={{ margin: '0 0 10px 0' }}>
          <div className="g1-progress-fill" style={{ width: `${((qIndex + 1) / TOTAL_QUESTIONS) * 100}%` }}></div>
        </div>
        <div className="g1-topic-header-compact" style={{ textAlign: 'center', margin: '5px 0', fontSize: '0.8rem', color: '#64748B', textTransform: 'uppercase', letterSpacing: '2px' }}>
          Filling and Lifting
        </div>
        <motion.div key={qIndex} initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="g1-question-card">
          <div className="custom-html-question-content">
            {currentQ.render(tempSel, isAnswered ? () => {} : handleSelect)}
          </div>
          <div className="g1-navigation-footer" style={{ marginTop: '30px', display: 'flex', justifyContent: 'space-between' }}>
            <button className="g1-nav-btn prev-btn" onClick={() => qIndex > 0 && setQIndex(qIndex - 1)} disabled={qIndex === 0}>
              <ChevronLeft size={24} /> Prev
            </button>
            <div>
              {!isAnswered ? (
                <button className="g1-nav-btn submit-btn" onClick={handleSubmit} disabled={!tempSel}>
                  {qIndex === TOTAL_QUESTIONS - 1 ? 'Finish Test' : 'Submit'} <Check size={24} />
                </button>
              ) : (
                <button className="g1-nav-btn next-btn" onClick={handleNext}>
                  {qIndex === TOTAL_QUESTIONS - 1 ? 'Finish Test' : 'Next Question'} <ChevronRight size={24} />
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FLTest;
