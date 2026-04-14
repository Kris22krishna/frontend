import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Timer, Star, ChevronRight, Check, RefreshCw, FileText } from 'lucide-react';
import { motion } from 'framer-motion';
import { useSessionLogger } from '@/hooks/useSessionLogger';
import { NODE_IDS } from '@/lib/curriculumIds';
import Navbar from '../../../Navbar';
import ExplanationModal from '../../../ExplanationModal';
import StickerExit from '../../../StickerExit';
import avatarImg from '../../../../assets/avatar.png';
import { BundleDisplay, NumberLineDC, TalkingPot, HTODisplay, NumberBond100, StonePath, DCOption, StoryBox, AchievementBadge, shuffle } from './DCSharedComponents';
import '../../../../pages/juniors/class-1/Grade1Practice.css';
import '../../../../pages/juniors/grade3/time-goes-ontest.css';
import './double-century.css';

const TOPIC_URL = encodeURIComponent('Double Century');
const TOTAL_QUESTIONS = 10;

const ALL_QUESTIONS = [
  // DC-01 Counting and Groups
  {
    id: 'dct_1', correct: '50', explanation: '5 bundles of 10 = 5 × 10 = 50 sticks!', correctLabel: '50',
    render: (sel, onSel) => (
      <div className="dc-qcard dc-s1">
        <AchievementBadge icon="🪵" label="BUNDLE BUILDER" color="#16a34a" />
        <StoryBox emoji="🐶" text="Bholu is building a bonfire! He tied 5 bundles of 10 sticks each. How many sticks does he have?" color="#f0fdf4" border="#16a34a" />
        <p className="dc-qtext">🪵 How many sticks in 5 bundles of 10?</p>
        <BundleDisplay tens={5} ones={0} />
        <div className="dc-opts">
          {[['40','A'],['45','B'],['50','C'],['55','D']].map(([v,l],i) => (
            <DCOption key={v} value={v} label={l} index={i} onClick={() => onSel(v)} className={sel === v ? 'toy-joy-selected' : ''} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'dct_2', correct: '47', explanation: '4 bundles of 10 = 40, plus 7 loose sticks = 47!', correctLabel: '47',
    render: (sel, onSel) => (
      <div className="dc-qcard dc-s1">
        <AchievementBadge icon="🔢" label="COUNT THE STICKS" color="#16a34a" />
        <StoryBox emoji="🐶" text="Bholu collected 4 full bundles of 10 and 7 extra sticks. Count them all — what's the total?" color="#f0fdf4" border="#16a34a" />
        <p className="dc-qtext">🔢 4 bundles of 10 and 7 loose sticks — total?</p>
        <BundleDisplay tens={4} ones={7} />
        <div className="dc-opts">
          {[['74','A'],['47','B'],['40','C'],['77','D']].map(([v,l],i) => (
            <DCOption key={v} value={v} label={l} index={i} onClick={() => onSel(v)} className={sel === v ? 'toy-joy-selected' : ''} />
          ))}
        </div>
      </div>
    ),
  },
  // DC-03 Number Before/After
  {
    id: 'dct_3', correct: '40', explanation: 'The Talking Pot always says ONE MORE! 39 + 1 = 40!', correctLabel: '40',
    render: (sel, onSel) => (
      <div className="dc-qcard dc-s3">
        <AchievementBadge icon="🏺" label="MAGIC POT CHALLENGE" color="#7c3aed" />
        <StoryBox emoji="👵" text="Grandma's Magic Pot always says ONE MORE than what you say! Say 39 into the pot... what does it echo back?" color="#fdf4ff" border="#9333ea" />
        <p className="dc-qtext">🏺 The Pot says ONE MORE. I said 39. Pot says…?</p>
        <TalkingPot saidNum={39} potSaid="?" />
        <div className="dc-opts">
          {[['38','A'],['39','B'],['40','C'],['41','D']].map(([v,l],i) => (
            <DCOption key={v} value={v} label={l} index={i} onClick={() => onSel(v)} className={sel === v ? 'toy-joy-selected' : ''} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'dct_4', correct: '99', explanation: 'The number just before 100 is 99. And 99 + 1 = 100!', correctLabel: '99',
    render: (sel, onSel) => (
      <div className="dc-qcard dc-s3">
        <AchievementBadge icon="🎯" label="CENTURY MOMENT!" color="#dc2626" />
        <StoryBox emoji="🏏" text="Mahi the cricketer is one run away from scoring 100! Which number was he on just before reaching the century?" color="#fef2f2" border="#dc2626" />
        <p className="dc-qtext">What number comes just <strong>before</strong> 100?</p>
        <div style={{ display: 'flex', gap: 8, justifyContent: 'center', alignItems: 'center', margin: '16px 0', flexWrap: 'wrap' }}>
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 300 }}
            style={{ width: 52, height: 52, background: '#fef3c7', border: '2.5px dashed #f59e0b', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Baloo 2',cursive", fontWeight: 900, fontSize: '1.4rem', color: '#92400e' }}>?</motion.div>
          <span style={{ fontSize: '1.5rem', color: '#6b7280' }}>→</span>
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.15, type: 'spring', stiffness: 300 }}
            style={{ width: 52, height: 52, background: 'linear-gradient(135deg,#ffd600,#f59e0b)', border: '2.5px solid #d97706', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Baloo 2',cursive", fontWeight: 900, fontSize: '1.4rem', color: '#92400e' }}>100</motion.div>
        </div>
        <div className="dc-opts">
          {[['98','A'],['99','B'],['101','C'],['90','D']].map(([v,l],i) => (
            <DCOption key={v} value={v} label={l} index={i} onClick={() => onSel(v)} className={sel === v ? 'toy-joy-selected' : ''} />
          ))}
        </div>
      </div>
    ),
  },
  // DC-04 Making 100
  {
    id: 'dct_5', correct: '40', explanation: '60 + 40 = 100! They fit together like puzzle pieces.', correctLabel: '40',
    render: (sel, onSel) => (
      <div className="dc-qcard dc-s4">
        <AchievementBadge icon="🏏" label="CENTURY CLUB" color="#d97706" />
        <StoryBox emoji="🏏" text="Mahi the cricketer already scored 60 runs. How many MORE runs does she need to hit a century — 100 runs?" color="#fefce8" border="#d97706" />
        <p className="dc-qtext">60 + <strong>?</strong> = 100 🎯</p>
        <NumberBond100 part1={60} part2={40} unknown="part2" />
        <div className="dc-opts">
          {[['30','A'],['40','B'],['50','C'],['60','D']].map(([v,l],i) => (
            <DCOption key={v} value={v} label={l} index={i} onClick={() => onSel(v)} className={sel === v ? 'toy-joy-selected' : ''} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'dct_6', correct: '75', explanation: '75 + 25 = 100! If you have 25, you need 75 more to reach 100.', correctLabel: '75',
    render: (sel, onSel) => (
      <div className="dc-qcard dc-s4">
        <AchievementBadge icon="🌸" label="FLOWER PETALS" color="#ec4899" />
        <StoryBox emoji="🐸" text="Tiku the frog is collecting flower petals! He already has 25. He needs exactly 100 total. How many more must he find?" color="#fdf2f8" border="#ec4899" />
        <p className="dc-qtext"><strong>?</strong> + 25 = 100 🌸</p>
        <NumberBond100 part1={75} part2={25} unknown="part1" />
        <div className="dc-opts">
          {[['65','A'],['70','B'],['75','C'],['80','D']].map(([v,l],i) => (
            <DCOption key={v} value={v} label={l} index={i} onClick={() => onSel(v)} className={sel === v ? 'toy-joy-selected' : ''} />
          ))}
        </div>
      </div>
    ),
  },
  // DC-05 Numbers 101–150
  {
    id: 'dct_7', correct: '123', explanation: '1 hundred = 100, 2 tens = 20, 3 ones = 3. 100+20+3 = 123!', correctLabel: '123',
    render: (sel, onSel) => (
      <div className="dc-qcard dc-s5">
        <AchievementBadge icon="🧩" label="H-T-O PUZZLE" color="#0891b2" />
        <StoryBox emoji="🐱" text="Mia the explorer found a secret number code in a cave: 1 hundred, 2 tens, 3 ones! What number is hidden in the cave?" color="#ecfeff" border="#0891b2" />
        <p className="dc-qtext">1 hundred + 2 tens + 3 ones = ____?</p>
        <HTODisplay number={123} />
        <div className="dc-opts">
          {[['132','A'],['213','B'],['123','C'],['321','D']].map(([v,l],i) => (
            <DCOption key={v} value={v} label={l} index={i} onClick={() => onSel(v)} className={sel === v ? 'toy-joy-selected' : ''} />
          ))}
        </div>
      </div>
    ),
  },
  // DC-06 Place Value
  {
    id: 'dct_8', correct: '4', explanation: '147 → H=1, T=4, O=7. The tens digit is 4!', correctLabel: '4',
    render: (sel, onSel) => (
      <div className="dc-qcard dc-s6">
        <AchievementBadge icon="🔍" label="DETECTIVE RAJU" color="#1d4ed8" />
        <StoryBox emoji="🕵️" text="Detective Raju is cracking a number code! He needs the TENS digit of 147 to unlock the mystery box. What is it?" color="#eff6ff" border="#1d4ed8" />
        <p className="dc-qtext">🔢 What is the <strong>tens digit</strong> of 147?</p>
        <HTODisplay number={147} highlightCol="T" />
        <div className="dc-opts">
          {[['1','A'],['4','B'],['7','C'],['14','D']].map(([v,l],i) => (
            <DCOption key={v} value={v} label={l} index={i} onClick={() => onSel(v)} className={sel === v ? 'toy-joy-selected' : ''} />
          ))}
        </div>
      </div>
    ),
  },
  // DC-07 Numbers 150–200
  {
    id: 'dct_9', correct: '157', explanation: '155, 156, 157, 158 — stepping one by one towards 200!', correctLabel: '157',
    render: (sel, onSel) => (
      <div className="dc-qcard dc-s7">
        <AchievementBadge icon="🪨" label="STONE HOPPER" color="#64748b" />
        <StoryBox emoji="🏃" text="Bholu is hopping stones across the river on his way to 200! One stone is missing. Quick — which number stone fell into the river?" color="#f8fafc" border="#64748b" />
        <p className="dc-qtext">🪨 155, 156, ____, 158. Hop the missing stone!</p>
        <StonePath numbers={[155, 156, 0, 158]} highlight={0} />
        <div className="dc-opts">
          {[['154','A'],['157','B'],['159','C'],['160','D']].map(([v,l],i) => (
            <DCOption key={v} value={v} label={l} index={i} onClick={() => onSel(v)} className={sel === v ? 'toy-joy-selected' : ''} />
          ))}
        </div>
      </div>
    ),
  },
  // DC-08 Jumping Game
  {
    id: 'dct_10', correct: '115', explanation: 'Jump by 5: 100, 105, 110, 115, 120. Each hop is 5 steps!', correctLabel: '115',
    render: (sel, onSel) => (
      <div className="dc-qcard dc-s8">
        <AchievementBadge icon="🐸" label="FROG JUMP CHAMP!" color="#16a34a" />
        <StoryBox emoji="🐸" text="Tiku the frog jumps exactly 5 lily pads each time! He jumped: 100, 105, 110... one more jump! Where does he land?" color="#f0fdf4" border="#16a34a" />
        <p className="dc-qtext">🐸 100, 105, 110, ____, 120. Jump by 5!</p>
        <StonePath numbers={[100, 105, 110, 0, 120]} highlight={0} />
        <div className="dc-opts">
          {[['111','A'],['112','B'],['115','C'],['119','D']].map(([v,l],i) => (
            <DCOption key={v} value={v} label={l} index={i} onClick={() => onSel(v)} className={sel === v ? 'toy-joy-selected' : ''} />
          ))}
        </div>
      </div>
    ),
  },
  // Extra questions for variety
  {
    id: 'dct_11', correct: '35', explanation: '65 + 35 = 100! Bholu jumped 65, then 35 more to reach 100!', correctLabel: '35',
    render: (sel, onSel) => (
      <div className="dc-qcard dc-s4">
        <AchievementBadge icon="🐶" label="BHOLU'S JUMP" color="#7c3aed" />
        <StoryBox emoji="🐶" text="Bholu leaped 65 steps on the number line. He wants to reach exactly 100! How many MORE steps must he jump?" color="#fdf4ff" border="#9333ea" />
        <p className="dc-qtext">🐶 Bholu jumped 65, then how much more to reach 100?</p>
        <NumberLineDC start={0} end={100} step={10} highlight={100} jumpFrom={65} jumpTo={100} jumpSize={35} />
        <div className="dc-opts">
          {[['25','A'],['30','B'],['35','C'],['45','D']].map(([v,l],i) => (
            <DCOption key={v} value={v} label={l} index={i} onClick={() => onSel(v)} className={sel === v ? 'toy-joy-selected' : ''} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'dct_12', correct: '140', explanation: 'Jump by 20: 100, 120, 140, 160. Each big jump is 20!', correctLabel: '140',
    render: (sel, onSel) => (
      <div className="dc-qcard dc-s8">
        <AchievementBadge icon="🦘" label="GIANT JUMP!" color="#7c3aed" />
        <StoryBox emoji="🦘" text="Kanga the kangaroo jumps 20 at a time! She went 100, 120... what's the next landing spot?" color="#fdf4ff" border="#9333ea" />
        <p className="dc-qtext">🦘 100, 120, ____, 160. Jump by 20!</p>
        <NumberLineDC start={100} end={200} step={20} highlight={160} jumpFrom={120} jumpTo={140} jumpSize={20} />
        <div className="dc-opts">
          {[['130','A'],['135','B'],['140','C'],['150','D']].map(([v,l],i) => (
            <DCOption key={v} value={v} label={l} index={i} onClick={() => onSel(v)} className={sel === v ? 'toy-joy-selected' : ''} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'dct_13', correct: '128', explanation: '127 + 1 = 128. One more than 127 is 128!', correctLabel: '128',
    render: (sel, onSel) => (
      <div className="dc-qcard dc-s3">
        <AchievementBadge icon="🏺" label="MAGIC POT CHALLENGE" color="#7c3aed" />
        <StoryBox emoji="👵" text="Grandma's Magic Pot is back! You say 127 — the pot echoes back ONE MORE. What does it say?" color="#fdf4ff" border="#9333ea" />
        <p className="dc-qtext">🏺 I said <strong>127</strong>. Pot said…?</p>
        <TalkingPot saidNum={127} potSaid="?" />
        <div className="dc-opts">
          {[['126','A'],['128','B'],['127','C'],['130','D']].map(([v,l],i) => (
            <DCOption key={v} value={v} label={l} index={i} onClick={() => onSel(v)} className={sel === v ? 'toy-joy-selected' : ''} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'dct_14', correct: '30', explanation: 'In 138, the digit 3 is in the tens place. 3 tens = 30!', correctLabel: '30',
    render: (sel, onSel) => (
      <div className="dc-qcard dc-s6">
        <AchievementBadge icon="💎" label="DIGIT VALUE" color="#7c3aed" />
        <StoryBox emoji="🕵️" text="Detective Raju found a clue in 138! The digit 3 looks small — but its TRUE value is much bigger. What is it?" color="#eff6ff" border="#1d4ed8" />
        <p className="dc-qtext">🔍 In 138, what is the <strong>value</strong> of digit 3?</p>
        <HTODisplay number={138} highlightCol="T" />
        <div className="dc-opts">
          {[['3','A'],['300','B'],['30','C'],['13','D']].map(([v,l],i) => (
            <DCOption key={v} value={v} label={l} index={i} onClick={() => onSel(v)} className={sel === v ? 'toy-joy-selected' : ''} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'dct_15', correct: '50', explanation: '150 + 50 = 200! Just like 50 + 50 = 100, double that is 200!', correctLabel: '50',
    render: (sel, onSel) => (
      <div className="dc-qcard dc-s7">
        <AchievementBadge icon="🏏" label="DOUBLE CENTURY!" color="#f59e0b" />
        <StoryBox emoji="🏏" text="Bholu already scored 150 runs in cricket. He's going for a DOUBLE CENTURY — 200 runs! How many more does he need?" color="#fefce8" border="#f59e0b" />
        <p className="dc-qtext">🏏 150 + <strong>?</strong> = 200</p>
        <NumberBond100 part1={150} part2={50} unknown="part2" />
        <div className="dc-opts">
          {[['40','A'],['60','B'],['50','C'],['100','D']].map(([v,l],i) => (
            <DCOption key={v} value={v} label={l} index={i} onClick={() => onSel(v)} className={sel === v ? 'toy-joy-selected' : ''} />
          ))}
        </div>
      </div>
    ),
  },
];

const DCTest = () => {
  const navigate = useNavigate();
  const { startSession, logAnswer, finishSession } = useSessionLogger();
  const questionsRef = useRef(null);
  if (!questionsRef.current) {
    questionsRef.current = shuffle([...ALL_QUESTIONS]).slice(0, TOTAL_QUESTIONS);
  }
  const questions = questionsRef.current;

  const [qIndex, setQIndex] = useState(0);
  const [selections, setSelections] = useState({});
  const [answered, setAnswered] = useState({});
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({ isCorrect: false, explanation: '', correctAnswer: '' });

  useEffect(() => {
    startSession({ nodeId: NODE_IDS.g3MathDCTest, sessionType: 'test' });
  }, [startSession]);

  useEffect(() => {
    let iv;
    if (!showResults) iv = setInterval(() => setTimer(v => v + 1), 1000);
    return () => clearInterval(iv);
  }, [showResults]);

  const currentQ = questions[qIndex];
  const currentSel = selections[currentQ?.id] || null;
  const isAnswered = !!answered[currentQ?.id];

  const handleSelect = (val) => {
    if (isAnswered) return;
    setSelections(prev => ({ ...prev, [currentQ.id]: val }));
  };

  const handleSubmit = () => {
    if (!currentSel || isAnswered) return;
    const isCorrect = currentSel === currentQ.correct;
    if (isCorrect) setScore(s => s + 1);
    setAnswered(prev => ({ ...prev, [currentQ.id]: true }));
    setModalData({ isCorrect, explanation: currentQ.explanation, correctAnswer: currentQ.correctLabel });
    logAnswer({ question_index: qIndex, answer_json: { selected: currentSel, correct: currentQ.correctLabel, isCorrect }, is_correct: isCorrect ? 1 : 0 });
    setShowModal(true);
  };

  const handleNext = () => {
    setShowModal(false);
    if (qIndex < TOTAL_QUESTIONS - 1) {
      setQIndex(v => v + 1);
    } else {
      finishSession({ totalQuestions: TOTAL_QUESTIONS, questionsAnswered: Object.keys(answered).length + 1, answersPayload: answered });
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
            <h2 style={{ fontSize: '2.5rem', color: '#31326F', fontFamily: 'Nunito, sans-serif' }}>Double Century Complete! 🏏🎉</h2>
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
          <div className="results-actions">
            <button className="action-btn-large retake-skill-btn" onClick={() => window.location.reload()}><RefreshCw size={24} /> Retake</button>
            <button className="action-btn-large back-topics-btn" onClick={() => navigate(`/junior/grade/3/topic/${TOPIC_URL}`)}><FileText size={24} /> Back to Skills</button>
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
          <div className="g1-progress-container">
            <div className="g1-progress-fill" style={{ width: `${((qIndex + 1) / TOTAL_QUESTIONS) * 100}%` }}></div>
          </div>
          <div className="exit-practice-sticker">
            <StickerExit onClick={() => navigate(`/junior/grade/3/topic/${TOPIC_URL}`)} />
          </div>
        </div>
        <div className="g1-topic-header-compact" style={{ textAlign: 'center', margin: '10px 0', fontSize: '0.9rem', color: '#64748B', textTransform: 'uppercase', letterSpacing: '2px' }}>
          Double Century — Chapter Test
        </div>
        <motion.div key={qIndex} initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="g1-question-card">
          <div className="custom-html-question-content">
            {currentQ.render(currentSel, isAnswered ? () => {} : handleSelect)}
          </div>
          <div className="g1-navigation-footer" style={{ marginTop: '30px', display: 'flex', justifyContent: 'flex-end' }}>
            {!isAnswered ? (
              <button className="g1-nav-btn submit-btn" onClick={handleSubmit} disabled={!currentSel}>
                Submit <Check size={24} />
              </button>
            ) : (
              <button className="g1-nav-btn next-btn" onClick={handleNext}>
                {qIndex === TOTAL_QUESTIONS - 1 ? 'Finish' : 'Next'} <ChevronRight size={24} />
              </button>
            )}
          </div>
        </motion.div>
      </div>
      <ExplanationModal
        isOpen={showModal}
        isCorrect={modalData.isCorrect}
        correctAnswer={modalData.correctAnswer}
        explanation={modalData.explanation}
        onClose={() => setShowModal(false)}
        onNext={handleNext}
      />
    </div>
  );
};

export default DCTest;
