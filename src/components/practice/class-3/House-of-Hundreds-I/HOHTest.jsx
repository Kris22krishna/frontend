import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Timer, ChevronLeft, ChevronRight, Check, RefreshCw, FileText } from 'lucide-react';
import { motion } from 'framer-motion';
import { useSessionLogger } from '@/hooks/useSessionLogger';
import { NODE_IDS } from '@/lib/curriculumIds';
import Navbar from '../../../Navbar';
import StickerExit from '../../../StickerExit';
import { LatexText } from '../../../LatexText';
import avatarImg from '../../../../assets/avatar.png';
import { HOHOption, AchievementBadge, TileSequence, StoryBox, MatchstickBundles, HTOBlockDisplay, shuffle } from './HOHSharedComponents';
import '../../../../pages/juniors/class-1/Grade1Practice.css';
import '../../../../pages/juniors/grade3/time-goes-ontest.css';
import './house-of-hundreds.css';

const TOPIC_URL = encodeURIComponent('House of Hundreds I');
const SKILL_NAME = 'House of Hundreds I — Chapter Test';
const TOTAL_QUESTIONS = 10;

// Comparison visual (inline, no import needed)
const CmpDisplay = ({ a, b }) => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, margin: '14px 0', padding: '12px 20px', background: '#f8fafc', borderRadius: 16, border: '2px solid #e2e8f0' }}>
    <div style={{ fontFamily: "'Baloo 2',cursive", fontSize: '2rem', fontWeight: 800, color: '#1e293b', padding: '8px 20px', background: '#fff', borderRadius: 14, border: '2px solid #e2e8f0', minWidth: 80, textAlign: 'center' }}>{a}</div>
    <div style={{ fontSize: '2.5rem', fontWeight: 900, fontFamily: "'Baloo 2',cursive", color: '#94a3b8' }}>?</div>
    <div style={{ fontFamily: "'Baloo 2',cursive", fontSize: '2rem', fontWeight: 800, color: '#1e293b', padding: '8px 20px', background: '#fff', borderRadius: 14, border: '2px solid #e2e8f0', minWidth: 80, textAlign: 'center' }}>{b}</div>
  </div>
);

// render signature: (sel, onSel, opts)
// sel = currently selected value, onSel = selection handler, opts = shuffled [[val, display], ...]
const mkOpts = (sel, onSel, opts) =>
  <div className="hoh-opts">
    {opts.map(([v, d], i) => (
      <HOHOption key={v} value={v} displayText={d} letterIdx={i}
        onClick={() => onSel(v)}
        className={sel === v ? 'hoh-selected' : ''}
      />
    ))}
  </div>;

const ALL_QUESTIONS = [
  // HOH-01
  {
    id: 'ht_q1',
    correct: '300', correctLabel: '300', topic: 'Counting Beyond 200',
    text: '299 + 1 = ?',
    options: [['300','300'],['299','299'],['301','301'],['310','310']],
    explanation: '299 + 1 = 300. After 299 comes 300 — the next big hundred!',
    render: (sel, onSel, opts) => (
      <div className="hoh-qcard">
        <AchievementBadge icon="🎉" label="COUNTING BEYOND 200" color="#3b82f6" />
        <p className="hoh-qtext">299 + 1 = ?</p>
        <TileSequence items={[299, '+1', '=', '?']} />
        {mkOpts(sel, onSel, opts)}
      </div>
    ),
  },
  // HOH-01 extra
  {
    id: 'ht_q2',
    correct: '50', correctLabel: '50 more', topic: 'Counting Beyond 200',
    text: '250 + ? = 300',
    options: [['50','50 more'],['100','100 more'],['20','20 more'],['30','30 more']],
    explanation: '300 − 250 = 50. You need 50 more torans to reach 300!',
    render: (sel, onSel, opts) => (
      <div className="hoh-qcard">
        <AchievementBadge icon="🔺" label="HOW MANY MORE TO 300?" color="#ef4444" />
        <p className="hoh-qtext">There are 250 triangular torans. How many more are needed to make 300?</p>
        <div className="hoh-sentence"><span>250</span><span>+</span><span>?</span><span>=</span><span>300</span></div>
        {mkOpts(sel, onSel, opts)}
      </div>
    ),
  },
  // HOH-02
  {
    id: 'ht_q3',
    correct: '303', correctLabel: '303', topic: 'Number Sequences',
    text: '302, ___, 304, 305 — what is missing?',
    options: [['303','303'],['304','304'],['302','302'],['301','301']],
    explanation: '302, 303, 304 — count by 1s. After 302 comes 303!',
    render: (sel, onSel, opts) => (
      <div className="hoh-qcard">
        <AchievementBadge icon="🪨" label="JOJO'S TILES" color="#22c55e" />
        <p className="hoh-qtext">302, ___, 304, 305 — what is the missing number?</p>
        <TileSequence items={[302, '?', 304, 305]} />
        {mkOpts(sel, onSel, opts)}
      </div>
    ),
  },
  // HOH-03
  {
    id: 'ht_q4',
    correct: '235', correctLabel: '235', topic: 'Number Representation',
    text: '2 bundles of 100, 3 bundles of 10, 5 loose sticks = ?',
    options: [['235','235'],['253','253'],['325','325'],['200','200']],
    explanation: '2×100 + 3×10 + 5 = 200 + 30 + 5 = 235!',
    render: (sel, onSel, opts) => (
      <div className="hoh-qcard">
        <AchievementBadge icon="🔥" label="MATCHSTICK BUNDLES" color="#f59e0b" />
        <p className="hoh-qtext">2 bundles of 100, 3 bundles of 10, and 5 loose sticks. What number is this?</p>
        <MatchstickBundles hundreds={2} tens={3} ones={5} />
        {mkOpts(sel, onSel, opts)}
      </div>
    ),
  },
  // HOH-03 extra
  {
    id: 'ht_q5',
    correct: '286', correctLabel: '286', topic: 'Number Representation',
    text: '285 + 1 = ?',
    options: [['286','286'],['285','285'],['284','284'],['296','296']],
    explanation: '285 + 1 = 286. Only the ones digit changes: 5 → 6.',
    render: (sel, onSel, opts) => (
      <div className="hoh-qcard">
        <AchievementBadge icon="⬆️" label="INCREASE BY 1" color="#22c55e" />
        <p className="hoh-qtext">285 — increase the number by 1. What do you get?</p>
        <TileSequence items={[285, '+1', '=', '?']} />
        {mkOpts(sel, onSel, opts)}
      </div>
    ),
  },
  // HOH-04
  {
    id: 'ht_q6',
    correct: '235', correctLabel: '235', topic: 'Number Line Skills',
    text: 'On a number line from 200 to 300, the number 235 is closer to which end?',
    options: [['200','Closer to 200'],['300','Closer to 300'],['Exactly middle','Exactly in the middle'],['Cannot tell','Cannot tell']],
    explanation: '235 is 35 away from 200 and 65 away from 300. So 235 is closer to 200!',
    render: (sel, onSel, opts) => (
      <div className="hoh-qcard">
        <AchievementBadge icon="📏" label="NUMBER LINE" color="#3b82f6" />
        <p className="hoh-qtext">On the number line from 200 to 300, is 235 closer to 200 or closer to 300?</p>
        <div style={{ margin: '14px 0', overflowX: 'auto' }}>
          <svg width="280" height="60" viewBox="0 0 280 60" style={{ display: 'block', margin: '0 auto' }}>
            <line x1="20" y1="30" x2="260" y2="30" stroke="#3b82f6" strokeWidth="3" />
            <polygon points="260,30 250,24 250,36" fill="#3b82f6" />
            <line x1="20" y1="22" x2="20" y2="38" stroke="#3b82f6" strokeWidth="2.5" />
            <text x="20" y="52" textAnchor="middle" fontFamily="Baloo 2,cursive" fontWeight="800" fontSize="12" fill="#1e40af">200</text>
            <line x1="260" y1="22" x2="260" y2="38" stroke="#3b82f6" strokeWidth="2.5" />
            <text x="260" y="52" textAnchor="middle" fontFamily="Baloo 2,cursive" fontWeight="800" fontSize="12" fill="#1e40af">300</text>
            <line x1="97" y1="20" x2="97" y2="40" stroke="#ef4444" strokeWidth="2.5" />
            <circle cx="97" cy="30" r="5" fill="#ef4444" />
            <text x="97" y="16" textAnchor="middle" fontFamily="Baloo 2,cursive" fontWeight="900" fontSize="12" fill="#ef4444">235</text>
          </svg>
        </div>
        {mkOpts(sel, onSel, opts)}
      </div>
    ),
  },
  // HOH-05
  {
    id: 'ht_q7',
    correct: '400', correctLabel: '400', topic: 'Number Games & Patterns',
    text: '100, 200, 300, ___ — what comes next?',
    options: [['400','400'],['300','300'],['500','500'],['350','350']],
    explanation: '100, 200, 300 — each jump is +100. The next number is 400!',
    render: (sel, onSel, opts) => (
      <div className="hoh-qcard">
        <AchievementBadge icon="💯" label="HUNDREDS PATTERN" color="#ef4444" />
        <p className="hoh-qtext">100, 200, 300, ___ — what comes next?</p>
        <TileSequence items={[100, 200, 300, '?']} />
        {mkOpts(sel, onSel, opts)}
      </div>
    ),
  },
  // HOH-06
  {
    id: 'ht_q8',
    correct: '413', correctLabel: '413 pieces', topic: 'Large Numbers in Context',
    text: '4 trays × 100 + 13 = ?',
    options: [['413','413 pieces'],['400','400 pieces'],['300','300 pieces'],['314','314 pieces']],
    explanation: '4 × 100 = 400. Plus 13 extra = 413 pieces of Mysore pak!',
    render: (sel, onSel, opts) => (
      <div className="hoh-qcard">
        <AchievementBadge icon="🍮" label="SWEET SHOP!" color="#f59e0b" />
        <StoryBox emoji="🍮" text="Ajji has 4 full trays of 100 Mysore pak pieces, plus 13 extra." />
        <p className="hoh-qtext">How many pieces altogether?</p>
        <div className="hoh-sentence"><span>4</span><span>×</span><span>100</span><span>+</span><span>13</span><span>=</span><span>?</span></div>
        {mkOpts(sel, onSel, opts)}
      </div>
    ),
  },
  // HOH-07
  {
    id: 'ht_q9',
    correct: '159', correctLabel: '159', topic: 'Number Grid',
    text: 'Digits 9, 1, 5 — less than 200 — 9 ones. What number?',
    options: [['159','159'],['195','195'],['519','519'],['915','915']],
    explanation: 'Hundreds = 1 (less than 200). Ones = 9. Tens = 5. Number = 159!',
    render: (sel, onSel, opts) => (
      <div className="hoh-qcard">
        <AchievementBadge icon="🧩" label="NUMBER RIDDLE" color="#7c3aed" />
        <p className="hoh-qtext">I use digits 9, 1, 5. I am less than 200. I have 9 ones. What number am I?</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 5, margin: '10px 0', padding: '10px 14px', background: '#f5f3ff', borderRadius: 12, border: '2px solid #c4b5fd' }}>
          <div style={{ fontFamily: "'Baloo 2',cursive", fontWeight: 700, color: '#4c1d95', fontSize: '0.9rem' }}>🔢 Digits: 9, 1, 5 &nbsp;|&nbsp; 📏 Less than 200 &nbsp;|&nbsp; 🔢 9 in ones place</div>
        </div>
        {mkOpts(sel, onSel, opts)}
      </div>
    ),
  },
  // HOH-08
  {
    id: 'ht_q10',
    correct: '300+0+9', correctLabel: '300 + 0 + 9', topic: 'Place Value HTO',
    text: '309 in expanded form is…?',
    options: [['300+0+9','300 + 0 + 9'],['300+9','300 + 9'],['30+9','30 + 9'],['309','309 alone']],
    explanation: '309 = 3 hundreds + 0 tens + 9 ones = 300 + 0 + 9.',
    render: (sel, onSel, opts) => (
      <div className="hoh-qcard">
        <AchievementBadge icon="📝" label="EXPANDED FORM" color="#22c55e" />
        <p className="hoh-qtext">Write 309 in expanded form (H + T + O):</p>
        <HTOBlockDisplay hundreds={3} tens={0} ones={9} number={309} />
        {mkOpts(sel, onSel, opts)}
      </div>
    ),
  },
  // HOH-09
  {
    id: 'ht_q11',
    correct: '419', correctLabel: '419', topic: 'Patterns & Groups',
    text: '401, 410, ___, 428 — Spring Leap (+9) pattern',
    options: [['419','419'],['420','420'],['428','428'],['410','410']],
    explanation: 'Spring Leap adds 9 each time. 410 + 9 = 419!',
    render: (sel, onSel, opts) => (
      <div className="hoh-qcard">
        <AchievementBadge icon="🌿" label="SPRING LEAP PATTERN" color="#22c55e" />
        <p className="hoh-qtext">401, 410, ___, 428 — Spring Leap pattern (+9 each step). What is missing?</p>
        <TileSequence items={[401, 410, '?', 428]} />
        {mkOpts(sel, onSel, opts)}
      </div>
    ),
  },
  // HOH-10
  {
    id: 'ht_q12',
    correct: '226', correctLabel: '226', topic: 'Number Hunt Games',
    text: '216 → ten more → ?',
    options: [['226','226'],['216','216'],['236','236'],['217','217']],
    explanation: '216 + 10 = 226. The tens digit increases: 1 → 2.',
    render: (sel, onSel, opts) => (
      <div className="hoh-qcard">
        <AchievementBadge icon="⛓️" label="CHAIN GAME" color="#3b82f6" />
        <p className="hoh-qtext">216 → ten more → ?</p>
        <TileSequence items={[216, '+10', '?']} />
        {mkOpts(sel, onSel, opts)}
      </div>
    ),
  },
  // HOH-11
  {
    id: 'ht_q13',
    correct: '321 > 231', correctLabel: '321 > 231', topic: 'Comparing Numbers',
    text: 'Compare 321 and 231.',
    options: [['321 > 231','321 > 231'],['321 < 231','321 < 231'],['321 = 231','321 = 231'],['Cannot compare','Cannot compare']],
    explanation: 'Hundreds: 3 vs 2. Since 3 > 2, we get 321 > 231!',
    render: (sel, onSel, opts) => (
      <div className="hoh-qcard">
        <AchievementBadge icon="🐊" label="COMPARE!" color="#ef4444" />
        <p className="hoh-qtext">Compare 321 and 231. Which statement is correct?</p>
        <CmpDisplay a={321} b={231} />
        {mkOpts(sel, onSel, opts)}
      </div>
    ),
  },
  // HOH-11 extra
  {
    id: 'ht_q14',
    correct: '487 > 423', correctLabel: '487 > 423', topic: 'Comparing Numbers',
    text: 'Compare 487 and 423.',
    options: [['487 > 423','487 > 423'],['487 < 423','487 < 423'],['487 = 423','487 = 423'],['Cannot compare','Cannot compare']],
    explanation: 'Same hundreds (4). Tens: 8 > 2. So 487 > 423!',
    render: (sel, onSel, opts) => (
      <div className="hoh-qcard">
        <AchievementBadge icon="🐊" label="TENS DECIDE!" color="#3b82f6" />
        <p className="hoh-qtext">Compare 487 and 423.</p>
        <CmpDisplay a={487} b={423} />
        {mkOpts(sel, onSel, opts)}
      </div>
    ),
  },
  // HOH-05 extra
  {
    id: 'ht_q15',
    correct: '207', correctLabel: '207', topic: 'Number Games & Patterns',
    text: 'Flag game: between 200–210, more than 206, less than 209.',
    options: [['207','207'],['203','203'],['210','210'],['205','205']],
    explanation: 'Between 200–210, more than 206, less than 209 → the answer is 207!',
    render: (sel, onSel, opts) => (
      <div className="hoh-qcard">
        <AchievementBadge icon="🚩" label="FLAG GAME!" color="#3b82f6" />
        <p className="hoh-qtext">Mystery number: between 200 &amp; 210, more than 206, less than 209. What is it?</p>
        <div style={{ padding: '10px 14px', background: '#eff6ff', borderRadius: 12, border: '2px solid #bfdbfe', margin: '10px 0', fontFamily: "'Baloo 2',cursive", fontWeight: 700, color: '#1e40af', fontSize: '0.9rem' }}>
          🚩 Between 200 and 210 &nbsp;|&nbsp; 🚩 More than 206 &nbsp;|&nbsp; 🚩 Less than 209
        </div>
        {mkOpts(sel, onSel, opts)}
      </div>
    ),
  },
];

const HOHTest = () => {
  const navigate = useNavigate();
  const { startSession, logAnswer, finishSession } = useSessionLogger();
  const questionsRef = useRef(null);

  if (!questionsRef.current) {
    questionsRef.current = shuffle([...ALL_QUESTIONS]).slice(0, TOTAL_QUESTIONS).map(q => ({
      ...q,
      shuffledOpts: shuffle([...q.options]),
    }));
  }
  const questions = questionsRef.current;

  const [qIndex, setQIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timer, setTimer] = useState(0);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    startSession({ nodeId: NODE_IDS.g3MathHouseOfHundredsI, sessionType: 'assessment' });
  }, [startSession]);

  useEffect(() => {
    let iv;
    if (!showResults) iv = setInterval(() => setTimer(v => v + 1), 1000);
    return () => clearInterval(iv);
  }, [showResults]);

  const currentQ = questions[qIndex];
  const isAnswered = !!answers[qIndex]?.selectedOption;
  const tempSel = answers[qIndex]?.tempSelection || (isAnswered ? answers[qIndex].selectedOption : null);

  const handleSelect = (val) => {
    if (isAnswered) return;
    setAnswers(prev => ({ ...prev, [qIndex]: { ...(prev[qIndex] || {}), tempSelection: val } }));
  };

  const handleSubmit = () => {
    if (!tempSel || isAnswered) return;
    const isCorrect = tempSel === currentQ.correct;
    logAnswer({
      question_index: qIndex,
      answer_json: { selected: tempSel, correct: currentQ.correctLabel, isCorrect },
      is_correct: isCorrect ? 1 : 0,
    });
    setAnswers(prev => ({
      ...prev,
      [qIndex]: {
        selectedOption: tempSel,
        isCorrect,
        questionText: currentQ.text,
        correctAnswer: currentQ.correctLabel,
        explanation: currentQ.explanation || `Correct answer: ${currentQ.correctLabel}`,
      },
    }));
    handleNext();
  };

  const handleSkip = () => {
    logAnswer({
      question_index: qIndex,
      answer_json: { selected: 'Skipped', correct: currentQ.correctLabel, isCorrect: false },
      is_correct: 0,
    });
    setAnswers(prev => ({
      ...prev,
      [qIndex]: {
        selectedOption: 'Skipped',
        isCorrect: false,
        questionText: currentQ.text,
        correctAnswer: currentQ.correctLabel,
        explanation: currentQ.explanation || '',
      },
    }));
    handleNext();
  };

  const handleNext = () => {
    if (qIndex < TOTAL_QUESTIONS - 1) {
      setQIndex(v => v + 1);
    } else {
      finishSession({
        totalQuestions: TOTAL_QUESTIONS,
        questionsAnswered: Object.keys(answers).length + 1,
        answersPayload: answers,
      });
      setShowResults(true);
    }
  };

  const formatTime = (s) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;

  // ── Results Screen ──────────────────────────────────────────────────────────
  if (showResults) {
    const correctCount = Object.values(answers).filter(r => r.isCorrect).length;
    const wrongCount = Object.values(answers).filter(r => !r.isCorrect && r.selectedOption !== 'Skipped').length;
    const skippedCount = TOTAL_QUESTIONS - correctCount - wrongCount;
    const pct = Math.round((correctCount / TOTAL_QUESTIONS) * 100);

    return (
      <div className="junior-practice-page grey-selection-theme result-page-wrapper"
        style={{ background: 'linear-gradient(135deg,#98D8C8 0%,#E0F6FF 50%,#FFE5E5 100%)', minHeight: '100vh', overflowY: 'auto' }}>
        <Navbar />
        <div className="exam-report-container" style={{ padding: '2rem 1rem' }}>

          {/* Hero */}
          <div className="results-hero-section flex flex-col items-center mb-8 mt-4">
            <img src={avatarImg} alt="Mascot" className="w-40 h-40 mb-2 drop-shadow-lg object-contain" />
            <h1 className="text-5xl font-black text-[#31326F] mb-2 tracking-tight text-center">Test Report</h1>
            <p className="text-[#64748B] text-xl font-medium mb-8 text-center px-4">
              How you performed in <span className="font-bold">{SKILL_NAME}</span>
            </p>

            {/* Stats grid */}
            <div className="results-stats-grid grid grid-cols-2 md:grid-cols-5 gap-4 w-full max-w-5xl">
              <div className="stat-card bg-[#FFF3E0] p-6 rounded-3xl shadow-sm border-2 border-[#FFE0B2] text-center flex flex-col items-center justify-center">
                <span className="block text-xs font-black uppercase tracking-widest text-[#FF9800] mb-1">Score</span>
                <span className="text-4xl font-black text-[#E65100]">{pct}%</span>
              </div>
              <div className="stat-card bg-[#F0FDF4] p-6 rounded-3xl shadow-sm border-2 border-[#DCFCE7] text-center flex flex-col items-center justify-center">
                <span className="block text-xs font-black uppercase tracking-widest text-[#22C55E] mb-1">Correct</span>
                <span className="text-4xl font-black text-[#14532D]">{correctCount}</span>
              </div>
              <div className="stat-card bg-[#FEF2F2] p-6 rounded-3xl shadow-sm border-2 border-[#FEE2E2] text-center flex flex-col items-center justify-center">
                <span className="block text-xs font-black uppercase tracking-widest text-[#EF4444] mb-1">Wrong</span>
                <span className="text-4xl font-black text-[#7F1D1D]">{wrongCount}</span>
              </div>
              <div className="stat-card bg-[#F8FAFC] p-6 rounded-3xl shadow-sm border-2 border-[#E2E8F0] text-center flex flex-col items-center justify-center">
                <span className="block text-xs font-black uppercase tracking-widest text-[#64748B] mb-1">Skipped</span>
                <span className="text-4xl font-black text-[#334155]">{skippedCount}</span>
              </div>
              <div className="stat-card bg-[#FFF3E0] p-6 rounded-3xl shadow-sm border-2 border-[#FFE0B2] text-center flex flex-col items-center justify-center">
                <span className="block text-xs font-black uppercase tracking-widest text-[#FF9800] mb-1">Time</span>
                <span className="text-4xl font-black text-[#E65100]">{formatTime(timer)}</span>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '3rem', flexWrap: 'wrap' }}>
            <button
              onClick={() => window.location.reload()}
              className="bg-white text-[#31326F] border-2 border-[#31326F] px-8 py-3 rounded-2xl font-black uppercase tracking-wider hover:bg-[#31326F] hover:text-white transition-colors flex items-center justify-center gap-2"
              style={{ fontSize: '1.1rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
            >
              <RefreshCw size={20} /> Retake Test
            </button>
            <button
              onClick={() => navigate(`/junior/grade/3/topic/${TOPIC_URL}`)}
              className="bg-[#31326F] text-white border-2 border-[#31326F] px-8 py-3 rounded-2xl font-black uppercase tracking-wider transition-opacity hover:opacity-90 flex items-center justify-center gap-2"
              style={{ fontSize: '1.1rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
            >
              <FileText size={20} /> Back to Topics
            </button>
          </div>

          {/* Detailed review */}
          <div style={{ marginBottom: '2rem', maxWidth: '1000px', marginLeft: 'auto', marginRight: 'auto' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1E293B', marginBottom: '1.5rem', paddingLeft: '1rem' }}>
              Detailed Review &amp; Solutions
            </h2>
            {questions.map((q, idx) => {
              const res = answers[idx] || { selectedOption: 'Skipped', isCorrect: false };
              const isSkipped = res.selectedOption === 'Skipped';
              return (
                <details key={idx} className="solution-accordion group">
                  <summary className="solution-header cursor-pointer hover:bg-slate-50 transition-colors"
                    style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', listStyle: 'none', width: '100%' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1, overflow: 'hidden' }}>
                      <span style={{ fontWeight: 800, minWidth: 32, height: 32, background: '#FF9800', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', fontSize: '0.9rem', flexShrink: 0 }}>{idx + 1}</span>
                      <div className="hidden md:block truncate text-sm text-slate-500" style={{ flex: 1, maxWidth: 350 }}>
                        <LatexText text={q.text} />
                      </div>
                      <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#94a3b8', background: '#f1f5f9', borderRadius: 8, padding: '2px 8px', flexShrink: 0 }}>{q.topic}</span>
                      {isSkipped
                        ? <span className="status-badge status-skipped shrink-0">Skipped</span>
                        : res.isCorrect
                          ? <span className="status-badge status-correct shrink-0">Correct</span>
                          : <span className="status-badge status-wrong shrink-0">Incorrect</span>}
                    </div>
                    <div style={{ color: '#64748B', display: 'flex', alignItems: 'center', gap: '1rem', flexShrink: 0 }}>
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-orange-500 font-semibold text-sm whitespace-nowrap">
                        Check Solution ↓
                      </span>
                    </div>
                  </summary>

                  <div className="solution-content">
                    <div style={{ marginBottom: '1rem', padding: '1rem', borderLeft: '4px solid #FF9800', background: '#FFF8F0' }}>
                      <LatexText text={q.text} />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
                      {q.options.map(([optVal, optDisplay]) => (
                        <div key={optVal} style={{ padding: '0.75rem', borderRadius: 8, border: '1px solid #E2E8F0', background: optVal === q.correct ? '#DCFCE7' : (optVal === res.selectedOption ? '#FEE2E2' : 'white'), color: optVal === q.correct ? '#166534' : (optVal === res.selectedOption ? '#991B1B' : '#475569') }}>
                          <LatexText text={optDisplay} />
                        </div>
                      ))}
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                      <div style={{ background: '#F8FAFC', padding: '1rem', borderRadius: 12, border: '1px solid #E2E8F0' }}>
                        <h5 style={{ fontSize: '0.7rem', fontWeight: 800, color: '#94A3B8', textTransform: 'uppercase', marginBottom: '0.5rem', letterSpacing: '0.5px' }}>Your Answer</h5>
                        {isSkipped
                          ? <span style={{ color: '#F59E0B', fontWeight: 700, fontSize: '1.1rem' }}>Skipped</span>
                          : <span style={{ color: res.isCorrect ? '#166534' : '#DC2626', fontWeight: 700, fontSize: '1.1rem' }}>
                              <LatexText text={res.selectedOption || 'Skipped'} />
                            </span>}
                      </div>
                      <div style={{ background: '#DCFCE7', padding: '1rem', borderRadius: 12, border: '1px solid #BBF7D0' }}>
                        <h5 style={{ fontSize: '0.7rem', fontWeight: 800, color: '#166534', textTransform: 'uppercase', marginBottom: '0.5rem', letterSpacing: '0.5px' }}>Correct Answer</h5>
                        <span style={{ color: '#166534', fontWeight: 700, fontSize: '1.1rem' }}>
                          <LatexText text={q.correctLabel} />
                        </span>
                      </div>
                    </div>
                    {(q.explanation || res.explanation) && (
                      <div style={{ background: '#FFF3E0', padding: '1.5rem', borderRadius: 12, border: '1px solid #FFE0B2' }}>
                        <h4 style={{ color: '#E65100', fontWeight: 800, marginBottom: '1rem', textTransform: 'uppercase', fontSize: '0.85rem', letterSpacing: '0.5px' }}>Solution:</h4>
                        <LatexText text={q.explanation || res.explanation} />
                      </div>
                    )}
                  </div>
                </details>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // ── Question Screen ─────────────────────────────────────────────────────────
  return (
    <div className="grade1-practice-page">
      <div className="g1-bg-blobs">
        <div className="blob blob-1" /><div className="blob blob-2" /><div className="blob blob-3" />
      </div>
      <div className="g1-practice-container">
        {/* Header */}
        <div className="g1-header-nav">
          <div className="g1-timer-badge"><Timer size={18} /> {formatTime(timer)}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 15, flex: 1, minWidth: 0, paddingLeft: 10 }}>
            <span style={{ fontWeight: 400, color: '#666', fontSize: '1rem', background: 'white', padding: '8px 15px', borderRadius: 15, boxShadow: '0 4px 10px rgba(0,0,0,0.05)', whiteSpace: 'nowrap' }}>
              Q {qIndex + 1}/{TOTAL_QUESTIONS}
            </span>
            <span style={{ fontWeight: 400, color: '#2D3436', fontSize: '1rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {SKILL_NAME}
            </span>
          </div>
          {!isAnswered && (
            <button className="g1-skip-btn" onClick={handleSkip} style={{ marginLeft: 15 }}>Skip ⏭️</button>
          )}
          <div className="exit-practice-sticker" style={{ marginLeft: 'auto' }}>
            <StickerExit onClick={() => navigate(`/junior/grade/3/topic/${TOPIC_URL}`)} />
          </div>
        </div>

        {/* Progress bar */}
        <div className="g1-progress-container" style={{ margin: '0 0 10px 0' }}>
          <div className="g1-progress-fill" style={{ width: `${((qIndex + 1) / TOTAL_QUESTIONS) * 100}%` }} />
        </div>

        <div className="g1-topic-header-compact" style={{ textAlign: 'center', margin: '5px 0', fontSize: '0.8rem', color: '#64748B', textTransform: 'uppercase', letterSpacing: '2px' }}>
          House of Hundreds I
        </div>

        {/* Question card */}
        <motion.div key={qIndex} initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="g1-question-card">
          <div className="custom-html-question-content">
            {currentQ.render(tempSel, isAnswered ? () => {} : handleSelect, currentQ.shuffledOpts)}
          </div>

          {/* Navigation footer */}
          <div className="g1-navigation-footer" style={{ marginTop: 30, display: 'flex', justifyContent: 'space-between' }}>
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
                  {qIndex === TOTAL_QUESTIONS - 1 ? 'View Results' : 'Next Question'} <ChevronRight size={24} />
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HOHTest;
