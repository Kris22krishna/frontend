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
import { NumberLineVN, TensFrame, BoxDiagram, VNOption, StoryBox, AchievementBadge, shuffle } from './VNSharedComponents';
import '../../../../pages/juniors/class-1/Grade1Practice.css';
import '../../../../pages/juniors/grade3/time-goes-ontest.css';
import './vacation-nani-maa.css';

const TOPIC_URL = encodeURIComponent('Vacation with My Nani Maa');
const SKILL_NAME = 'Vacation with Nani Maa — Chapter Test';
const TOTAL_QUESTIONS = 10;

const ALL_QUESTIONS = [
  {
    id: 'vn_1', correct: '3', explanation: '15 - 12 = 3 hidden items!', correctLabel: '3', text: 'Total seeds: 15. Uncovered: 12. How many are hidden?',
    render: (sel, onSel) => (
      <div className="vn-qcard vn-s1">
        <AchievementBadge icon="🌱" label="HIDDEN OBJECTS" color="#eab308" />
        <StoryBox emoji="🌾" text="Total seeds: 15. Uncovered: 12. The rest are buried!" />
        <p className="vn-qtext">How many are hidden?</p>
        <div className="vn-opts">
          {[['2','A'],['3','B'],['4','C'],['5','D']].map(([v,l],i) => (
            <VNOption key={v} value={v} label={l} index={i} onClick={() => onSel(v)} className={sel === v ? 'toy-joy-selected' : ''} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'vn_2', correct: '11', explanation: '20 - 9 = 11 hidden items!', correctLabel: '11', text: 'Total seeds: 20. Uncovered: 9. How many are hidden?',
    render: (sel, onSel) => (
      <div className="vn-qcard vn-s1">
        <AchievementBadge icon="🌱" label="HIDDEN OBJECTS" color="#eab308" />
        <StoryBox emoji="🌾" text="Total seeds: 20. Uncovered: 9. The rest are buried!" />
        <p className="vn-qtext">How many are hidden?</p>
        <div className="vn-opts">
          {[['10','A'],['11','B'],['12','C'],['13','D']].map(([v,l],i) => (
            <VNOption key={v} value={v} label={l} index={i} onClick={() => onSel(v)} className={sel === v ? 'toy-joy-selected' : ''} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'vn_3', correct: '14', explanation: '6 + 8 = 14', correctLabel: '14', text: 'Add the numbers using the tens frames: 6 + 8 = ?',
    render: (sel, onSel) => (
      <div className="vn-qcard vn-s2">
        <AchievementBadge icon="🧮" label="TENS FRAME" color="#fb923c" />
        <p className="vn-qtext">Add the numbers using the tens frames: 6 + 8 = ?</p>
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <TensFrame dotsRed={6} />
          <TensFrame dotsBlue={8} />
        </div>
        <div className="vn-opts">
          {[['13','A'],['14','B'],['15','C'],['16','D']].map(([v,l],i) => (
            <VNOption key={v} value={v} label={l} index={i} onClick={() => onSel(v)} className={sel === v ? 'toy-joy-selected' : ''} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'vn_4', correct: '3', explanation: '9 - 6 = 3', correctLabel: '3', text: 'Subtract using the tens frames: 9 - 6 = ?',
    render: (sel, onSel) => (
      <div className="vn-qcard vn-s2">
        <AchievementBadge icon="🧮" label="TENS FRAME" color="#3b82f6" />
        <p className="vn-qtext">Subtract using the tens frames: 9 - 6 = ?</p>
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <TensFrame dotsRed={9} />
          <div style={{ fontSize: '2rem', display: 'flex', alignItems: 'center' }}>-</div>
          <TensFrame dotsBlue={6} />
        </div>
        <div className="vn-opts">
          {[['2','A'],['3','B'],['4','C'],['5','D']].map(([v,l],i) => (
            <VNOption key={v} value={v} label={l} index={i} onClick={() => onSel(v)} className={sel === v ? 'toy-joy-selected' : ''} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'vn_5', correct: '22', explanation: '15 + 7 = 22', correctLabel: '22', text: "Let's jump forward! 15 + 7 = ?",
    render: (sel, onSel) => (
      <div className="vn-qcard vn-s3">
        <AchievementBadge icon="🐸" label="FORWARD JUMPS" color="#22c55e" />
        <p className="vn-qtext">Let's jump forward! 15 + 7 = ?</p>
        <NumberLineVN start={0} end={30} step={5} highlight={[15, 22]} jumps={[{from: 15, to: 22, label: '+7'}]} />
        <div className="vn-opts">
          {[['20','A'],['21','B'],['22','C'],['23','D']].map(([v,l],i) => (
            <VNOption key={v} value={v} label={l} index={i} onClick={() => onSel(v)} className={sel === v ? 'toy-joy-selected' : ''} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'vn_6', correct: '37', explanation: 'Skip count by 10 three times: 7, 17, 27, 37!', correctLabel: '37', text: 'Start at 7 and jump forward by 10, 3 times. Where do you land?',
    render: (sel, onSel) => (
      <div className="vn-qcard vn-s3">
        <AchievementBadge icon="🐾" label="SKIP COUNTING" color="#eab308" />
        <p className="vn-qtext">Start at 7 and jump forward by 10, 3 times. Where do you land?</p>
        <NumberLineVN start={0} end={40} step={10} highlight={[7, 17, 27, 37]} jumps={[{from:7,to:17,label:'+10'},{from:17,to:27,label:'+10'},{from:27,to:37,label:'+10'}]} />
        <div className="vn-opts">
          {[['27','A'],['37','B'],['47','C'],['57','D']].map(([v,l],i) => (
            <VNOption key={v} value={v} label={l} index={i} onClick={() => onSel(v)} className={sel === v ? 'toy-joy-selected' : ''} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'vn_7', correct: '11', explanation: 'From 23 to 34 is exactly 11 steps.', correctLabel: '11', text: 'How many steps from 23 to 34?',
    render: (sel, onSel) => (
      <div className="vn-qcard vn-s4">
        <AchievementBadge icon="🛤️" label="MULTI-STEP JUMPS" color="#14b8a6" />
        <StoryBox emoji="🚀" text="Jump from 23 to 30 by tens, then slide to 34 by ones." />
        <p className="vn-qtext">How many steps from 23 to 34?</p>
        <div className="vn-opts">
          {[['10','A'],['11','B'],['12','C'],['13','D']].map(([v,l],i) => (
            <VNOption key={v} value={v} label={l} index={i} onClick={() => onSel(v)} className={sel === v ? 'toy-joy-selected' : ''} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'vn_8', correct: '80', explanation: '45 books + 35 books = 80 books.', correctLabel: '80', text: 'We sold 45 books on Monday and 35 books on Tuesday. Find the total!',
    render: (sel, onSel) => (
      <div className="vn-qcard vn-s7">
        <AchievementBadge icon="📦" label="BOX DIAGRAM" color="#eab308" />
        <p className="vn-qtext">We sold 45 books on Monday and 35 books on Tuesday. Find the total!</p>
        <BoxDiagram total="?" parts={[{ value: 45, label: 'Monday' }, { value: 35, label: 'Tuesday' }]} />
        <div className="vn-opts">
          {[['70','A'],['80','B'],['90','C'],['100','D']].map(([v,l],i) => (
            <VNOption key={v} value={v} label={l} index={i} onClick={() => onSel(v)} className={sel === v ? 'toy-joy-selected' : ''} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'vn_9', correct: 'More than 100', explanation: '150 - 49 is around 101, which is more than 100!', correctLabel: 'More than 100', text: 'Without exactly calculating, is 150 - 49 more or less than 100?',
    render: (sel, onSel) => (
      <div className="vn-qcard vn-s8">
        <AchievementBadge icon="🤔" label="ESTIMATE" color="#8b5cf6" />
        <StoryBox emoji="💭" text="Let's estimate around 100 to quickly find the answer!" />
        <p className="vn-qtext">Without exactly calculating, is 150 - 49 more or less than 100?</p>
        <div className="vn-opts">
          {[['More than 100','A'],['Less than 100','B']].map(([v,l],i) => (
            <VNOption key={v} value={v} label={l} index={i} onClick={() => onSel(v)} className={sel === v ? 'toy-joy-selected' : ''} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'vn_10', correct: '89', explanation: 'Start at 63, jump 20 to 83, jump 6 to 89.', correctLabel: '89', text: 'Solve addition on the open number line: 63 + 26 = ?',
    render: (sel, onSel) => (
      <div className="vn-qcard vn-s9">
        <AchievementBadge icon="〰️" label="OPEN NUMBER LINE" color="#22c55e" />
        <p className="vn-qtext">Solve addition on the open number line: 63 + 26 = ?</p>
        <NumberLineVN
          start={50} end={100} step={10}
          highlight={[63, 83, 89]}
          jumps={[{ from: 63, to: 83, label: '+20' }, { from: 83, to: 89, label: '+6' }]}
        />
        <div className="vn-opts">
          {[['79','A'],['89','B'],['99','C'],['109','D']].map(([v,l],i) => (
            <VNOption key={v} value={v} label={l} index={i} onClick={() => onSel(v)} className={sel === v ? 'toy-joy-selected' : ''} />
          ))}
        </div>
      </div>
    ),
  }
];

const VNTest = () => {
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
    startSession({ nodeId: NODE_IDS.g3MathVNTest, sessionType: 'assessment' });
  }, [startSession]);

  useEffect(() => {
    let iv;
    if (!showResults) iv = setInterval(() => setTimer(v => v + 1), 1000);
    return () => clearInterval(iv);
  }, [showResults]);

  const currentQ = questions[qIndex];
  const isAnswered = !!answers[qIndex]?.selectedOption;
  const currentSel = answers[qIndex]?.tempSelection || (isAnswered ? answers[qIndex].selectedOption : null);

  const handleSelect = (val) => {
    if (isAnswered) return;
    setAnswers(prev => ({
       ...prev,
       [qIndex]: { ...(prev[qIndex] || {}), tempSelection: val }
    }));
  };

  const tempSel = currentSel;

  const handleSubmit = () => {
    if (!tempSel || isAnswered) return;
    const isCorrect = tempSel === currentQ.correct;
    if (isCorrect) setScore(s => s + 1);
    
    logAnswer({ 
      question_index: qIndex, 
      answer_json: { selected: tempSel, correct: currentQ.correctLabel, isCorrect }, 
      is_correct: isCorrect ? 1 : 0 
    });
    
    setAnswers(prev => ({
      ...prev,
      [qIndex]: {
        selectedOption: tempSel,
        isCorrect,
        questionText: currentQ.text,
        correctAnswer: currentQ.correctLabel,
        explanation: currentQ.explanation
      }
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
          <h1 className="results-title">Adventure Report</h1>
          <div className="exit-container">
            <StickerExit onClick={() => navigate(`/junior/grade/3/topic/${TOPIC_URL}`)} />
          </div>
        </header>
        <main className="results-content">
          <div className="results-hero-section">
            <img src={avatarImg} alt="Mascot" style={{ width: '120px', height: '120px', margin: '0 auto 20px' }} />
            <h2 style={{ fontSize: '2.5rem', color: '#31326F', fontFamily: 'Nunito, sans-serif' }}>Adventure Complete! 🎉</h2>
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
          Vacation with Nani Maa
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

export default VNTest;
