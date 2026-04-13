import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Timer, Star, ChevronLeft, ChevronRight, Check, X, RefreshCw, FileText } from 'lucide-react';
import { motion } from 'framer-motion';
import { useSessionLogger } from '@/hooks/useSessionLogger';
import { NODE_IDS } from '@/lib/curriculumIds';
import Navbar from '../../../Navbar';
import { LatexText } from '../../../LatexText';
import ExplanationModal from '../../../ExplanationModal';
import StickerExit from '../../../StickerExit';
import avatarImg from '../../../../assets/avatar.png';
import { TallyMarkSVG } from './WINSharedComponents';
import '../../../../pages/juniors/class-1/Grade1Practice.css';
import './whats-in-a-name.css';

const SKILL_NAME = "What's in a Name? — Chapter Test";
const TOPIC_URL = encodeURIComponent("What's in a Name?");

const generateQuestions = () => {
  const pool = [
    // Tally questions
    { id: 1, text: 'How many cows does this tally show? ✗ ✗ (2 full crossed groups)', options: ['5','8','10','12'], correct: '10', explanation: '2 full crossed groups = 5 + 5 = 10 marks.' },
    { id: 2, text: 'One full crossed group of tally = ?', options: ['4','5','6','7'], correct: '5', explanation: 'One crossed group (4 vertical + 1 diagonal) = 5 marks.' },
    { id: 3, text: '23 went out, 20 came back. How many are missing?', options: ['1','2','3','4'], correct: '3', explanation: '23 – 20 = 3 are missing!' },
    { id: 4, text: 'To show 15, how many full crossed groups?', options: ['2','3','4','5'], correct: '3', explanation: '3 × 5 = 15. So 3 full crossed groups.' },
    { id: 5, text: '36 went out, 34 came back. How many are missing?', options: ['1','2','3','4'], correct: '2', explanation: '36 – 34 = 2 are missing — just like in Deba\'s story!' },
    // Letter counting
    { id: 6, text: 'ELEPHANT has how many letters?', options: ['6','7','8','9'], correct: '8', explanation: 'E-L-E-P-H-A-N-T = 8 letters. The longest animal name in the game!' },
    { id: 7, text: 'OX has how many letters?', options: ['1','2','3','4'], correct: '2', explanation: 'O-X = only 2 letters. The shortest animal name!' },
    { id: 8, text: 'TIGER has how many letters?', options: ['4','5','6','7'], correct: '5', explanation: 'T-I-G-E-R = 5 letters.' },
    { id: 9, text: 'MONKEY has how many letters?', options: ['5','6','7','8'], correct: '6', explanation: 'M-O-N-K-E-Y = 6 letters.' },
    { id: 10, text: 'Which animal has the MOST letters? 🐯🐘🐂🐕', options: ['Tiger','Elephant','Ox','Dog'], correct: 'Elephant', explanation: 'Elephant (8) > Tiger (5) > Dog (3) > Ox (2). ELEPHANT wins!' },
    // Longest/shortest
    { id: 11, text: 'Which animal has the FEWEST letters? 🐒🦌🐀🐂', options: ['Monkey','Deer','Rat','Ox'], correct: 'Ox', explanation: 'Ox has only 2 letters — the fewest! It is Team 2 captain.' },
    { id: 12, text: 'MAHESH and KARTIK — which has MORE letters?', options: ['Mahesh','Kartik','Same','Cannot tell'], correct: 'Same', explanation: 'MAHESH = 6 letters, KARTIK = 6 letters. They are the SAME length!' },
    { id: 13, text: 'SNAKE (5) and LION (4) — which is LONGER?', options: ['Snake','Lion','Same','Neither'], correct: 'Snake', explanation: 'SNAKE has 5 letters, LION has 4. SNAKE is longer!' },
    // Number names
    { id: 14, text: 'FORTY THREE (43) has how many letters?', options: ['8','9','10','11'], correct: '10', explanation: 'F-O-R-T-Y-T-H-R-E-E = 10 letters. That\'s Teji\'s roll number!' },
    { id: 15, text: 'SEVENTEEN (17) has how many letters?', options: ['7','8','9','10'], correct: '9', explanation: 'S-E-V-E-N-T-E-E-N = 9 letters. That\'s Jojo\'s roll number!' },
    { id: 16, text: 'FIFTY SIX (56) has how many letters?', options: ['7','8','9','10'], correct: '8', explanation: 'F-I-F-T-Y-S-I-X = 8 letters.' },
    { id: 17, text: 'Which number name has 7 letters: 40, 70, 56, 43?', options: ['40','70','56','43'], correct: '70', explanation: 'SEVENTY = S-E-V-E-N-T-Y = 7 letters!' },
    // Number puzzles
    { id: 18, text: '"I am near 100. My name has 2 words. First word has 6 letters." Who am I?', options: ['96','97','98','99'], correct: '98', explanation: 'NINETY EIGHT: NINETY = 6 letters, EIGHT = 5 letters. Very near 100!' },
    { id: 19, text: 'Between 63–78, which number has the SHORTEST name?', options: ['64','70','66','73'], correct: '70', explanation: 'SEVENTY = 7 letters — the fewest among all numbers from 63 to 78!' },
    { id: 20, text: 'SEVENTY THREE (73) has how many letters?', options: ['10','11','12','13'], correct: '12', explanation: 'S-E-V-E-N-T-Y-T-H-R-E-E = 12 letters — the longest among 1–99!' },
    // Grouping
    { id: 21, text: 'Which object needs ELECTRICITY? 🪑📺🛏️🛋️', options: ['Chair','TV','Bed','Pillow'], correct: 'TV', explanation: 'TV needs electricity. Chair, Bed, and Pillow do NOT need electricity.' },
    { id: 22, text: 'Which does NOT need electricity? 📺💡🌀🛌', options: ['TV','Lamp','Fan','Blanket'], correct: 'Blanket', explanation: 'Blanket does NOT need electricity. TV, Lamp, and Fan all do!' },
    { id: 23, text: 'From: TV, Lamp, Fan, Clock, Chair, Bed — how many need electricity?', options: ['3','4','5','6'], correct: '4', explanation: 'TV, Lamp, Fan, Clock = 4 items need electricity. Chair and Bed do not.' },
    { id: 24, text: 'FISH and BIRD are in the same group because...', options: ['Both fly','Both eat food','Both live in water','Both are big'], correct: 'Both eat food', explanation: 'Fish and Bird are both living things — they both eat food!' },
    // Data collection
    { id: 25, text: 'Short Hair = 7, Braid = 4. How many MORE children have Short Hair?', options: ['2','3','4','5'], correct: '3', explanation: '7 – 4 = 3 more children have Short Hair than Braids.' },
    { id: 26, text: 'Ponytail = 6 children. Which tally shows 6?', options: ['A','B','C','D'], tallyOptions: [5, 6, 7, 10], correct: 'B', explanation: '1 full group (5) + 1 extra = 6. Correct tally for 6!' },
    { id: 27, text: 'Bun = 2 children, Two Braids = 3. Together they are?', options: ['4','5','6','7'], correct: '5', explanation: '2 + 3 = 5 children altogether!' },
  ];

  // Pick 15 random questions each time
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 15);
};

const WINTest = () => {
  const navigate = useNavigate();
  const { startSession, logAnswer, finishSession } = useSessionLogger();

  const [qIndex, setQIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [timer, setTimer] = useState(0);
  const [answers, setAnswers] = useState({});
  const [questions] = useState(generateQuestions);

  const totalQuestions = questions.length;

  useEffect(() => {
    startSession({ nodeId: NODE_IDS.g3MathWINTest, sessionType: 'assessment' });
  }, [startSession]);

  useEffect(() => {
    let interval;
    if (!showResults) interval = setInterval(() => setTimer(v => v + 1), 1000);
    return () => clearInterval(interval);
  }, [showResults]);

  useEffect(() => {
    if (answers[qIndex]) {
      setSelectedOption(answers[qIndex].selectedOption);
      setIsAnswered(true);
    } else {
      setSelectedOption(null);
      setIsAnswered(false);
    }
  }, [qIndex, answers]);

  const handleSubmit = () => {
    if (isAnswered || selectedOption === null) return;
    const currentQ = questions[qIndex];
    const isCorrect = selectedOption === currentQ.correct;
    if (isCorrect) setScore(s => s + 1);

    logAnswer({
      question_index: qIndex,
      answer_json: { question_text: currentQ.text, selected: selectedOption, correct: currentQ.correct, isCorrect },
      is_correct: isCorrect ? 1 : 0
    });

    setAnswers(prev => ({
      ...prev,
      [qIndex]: {
        selectedOption,
        isCorrect,
        questionText: currentQ.text,
        correctAnswer: currentQ.correct,
        explanation: currentQ.explanation,
      }
    }));
    handleNext();
  };

  const handleSkip = () => {
    const currentQ = questions[qIndex];
    logAnswer({ question_index: qIndex, answer_json: { selected: 'Skipped', correct: currentQ.correct, isCorrect: false }, is_correct: 0 });
    setAnswers(prev => ({
      ...prev,
      [qIndex]: { selectedOption: 'Skipped', isCorrect: false, questionText: currentQ.text, correctAnswer: currentQ.correct, explanation: currentQ.explanation }
    }));
    handleNext();
  };

  const handleNext = () => {
    if (qIndex < totalQuestions - 1) {
      setQIndex(v => v + 1);
    } else {
      finishSession({ totalQuestions, questionsAnswered: Object.keys(answers).length, answersPayload: answers });
      setShowResults(true);
    }
  };

  const formatTime = (s) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;

  if (showResults) {
    const percentage = Math.round((score / totalQuestions) * 100);
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
            <img src={avatarImg} alt="Avatar" style={{ width: '120px', height: '120px', margin: '0 auto 20px' }} />
            <h2 style={{ fontSize: '2.5rem', fontWeight: 400, color: '#31326F', fontFamily: 'Nunito, sans-serif' }}>Adventure Complete! 🎉</h2>
            <div className="stars-container">
              {[1, 2, 3].map(i => (
                <motion.div key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i * 0.2 }} className="star-wrapper">
                  <Star size={60} fill={percentage >= (i * 33) ? '#FFD700' : '#EDF2F7'} color={percentage >= (i * 33) ? '#F6AD55' : '#CBD5E0'} />
                </motion.div>
              ))}
            </div>
            <div className="results-stats-grid">
              <div className="stat-card"><span className="stat-label">Correct</span><span className="stat-value-large">{score}/{totalQuestions}</span></div>
              <div className="stat-card"><span className="stat-label">Time</span><span className="stat-value-large">{formatTime(timer)}</span></div>
              <div className="stat-card"><span className="stat-label">Accuracy</span><span className="stat-value-large">{percentage}%</span></div>
              <div className="stat-card"><span className="stat-label">Score</span><span className="stat-value-large">{score * 10}</span></div>
            </div>
          </div>

          <div className="detailed-breakdown">
            <h3 className="breakdown-title">Quest Log 📜</h3>
            <div className="quest-log-list">
              {questions.map((q, idx) => {
                const ans = answers[idx];
                if (!ans) return null;
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
            <button className="action-btn-large play-again-btn" onClick={() => window.location.reload()}><RefreshCw size={24} /> Retake Test</button>
            <button className="action-btn-large back-topics-btn" onClick={() => navigate(`/junior/grade/3/topic/${TOPIC_URL}`)}><FileText size={24} /> Back to Topics</button>
          </div>
        </main>
      </div>
    );
  }

  const currentQ = questions[qIndex];

  return (
    <div className="grade1-practice-page">
      <div className="g1-bg-blobs">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
      </div>

      <div className="g1-practice-container">
        <div className="g1-header-nav">
          <div className="g1-timer-badge"><Timer size={18} />{formatTime(timer)}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', flex: 1, minWidth: 0 }}>
            <span style={{ fontWeight: 400, color: '#666', fontSize: '1rem', background: 'white', padding: '8px 15px', borderRadius: '15px', boxShadow: '0 4px 10px rgba(0,0,0,0.05)', whiteSpace: 'nowrap' }}>
              Q {qIndex + 1}/{totalQuestions}
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
          <div className="g1-progress-fill" style={{ width: `${((qIndex + 1) / totalQuestions) * 100}%` }}></div>
        </div>

        <div className="g1-topic-header-compact" style={{ textAlign: 'center', margin: '5px 0', fontSize: '0.8rem', color: '#64748B', textTransform: 'uppercase', letterSpacing: '2px' }}>
          What's in a Name?
        </div>

        <motion.div key={qIndex} initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="g1-question-card">
          <h2 className="g1-question-text"><LatexText text={currentQ.text} /></h2>
          <div className="g1-quiz-side" style={{ width: '100%' }}>
            <div className={currentQ.tallyOptions ? 'win-test-tally-grid' : 'g1-options-grid'}>
              {currentQ.options.map((opt, i) => (
                <button
                  key={i}
                  className={`g1-option-btn ${selectedOption === opt ? 'selected-test' : ''}`}
                  onClick={() => !isAnswered && setSelectedOption(opt)}
                  disabled={isAnswered}
                  style={currentQ.tallyOptions ? { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, padding: '14px 10px' } : {}}
                >
                  {currentQ.tallyOptions ? (
                    <>
                      <TallyMarkSVG count={currentQ.tallyOptions[i]} color="#2d1508" scale={0.85} />
                      <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#64748b' }}>{opt}</span>
                    </>
                  ) : (
                    <LatexText text={String(opt)} />
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="g1-navigation-footer">
            <button className="g1-nav-btn prev-btn" onClick={() => qIndex > 0 && setQIndex(qIndex - 1)} disabled={qIndex === 0}>
              <ChevronLeft size={24} /> Prev
            </button>
            <div>
              {!isAnswered ? (
                <button className="g1-nav-btn submit-btn" onClick={handleSubmit} disabled={selectedOption === null}>
                  {qIndex === totalQuestions - 1 ? 'Finish Test' : 'Next Question'} <ChevronRight size={24} />
                </button>
              ) : (
                <button className="g1-nav-btn next-btn" onClick={handleNext}>
                  {qIndex === totalQuestions - 1 ? 'Finish Test' : 'Next Question'} <ChevronRight size={24} />
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default WINTest;
