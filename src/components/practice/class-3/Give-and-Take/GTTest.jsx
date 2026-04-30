import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Timer, Star, ChevronLeft, ChevronRight, Check, RefreshCw, FileText, SkipForward } from 'lucide-react';
import { motion } from 'framer-motion';
import { useSessionLogger } from '@/hooks/useSessionLogger';
import { NODE_IDS } from '@/lib/curriculumIds';
import Navbar from '../../../Navbar';
import StickerExit from '../../../StickerExit';
import avatarImg from '../../../../assets/avatar.png';
import '../../../../pages/juniors/class-1/Grade1Practice.css';
import '../../../../pages/juniors/grade3/time-goes-ontest.css';
import './give-and-take.css';
import { GTOption, GTTFButtons, StoryBox, AchievementBadge, HTODisplay, NumberLineGT, EmojiRow, BoxDiagram, CoinDisplay, NoteDisplay, StonePath, shuffle } from './GTSharedComponents';
import { useGTLogic } from './useGTLogic';

const TF_OPTIONS = [['True', '✅ True'], ['False', '❌ False']];

const TOPIC_URL = encodeURIComponent('Give and Take');

const ALL_QUESTIONS = [
  // ── GT-01 Addition ──
  {
    id: 'test_add1',
    text: 'Meena has 15 mangoes and her friend has 23 mangoes. How many mangoes in total?',
    options: [['38','38'],['35','35'],['40','40'],['28','28']],
    meta: { type: 'mcq', qid: 'test_add1', correct: '38', explanation: '15 + 23 = 38! Count mangoes from both baskets!', correctLabel: '38' },
    render: (lp) => (
      <div className="gt-qcard gt-s1">
        <AchievementBadge icon="🥭" label="ADDITION" color="#f97316" />
        <StoryBox emoji="🧒" text="Meena has 15 mangoes and her friend has 23 mangoes. How many mangoes in total?" color="#fef3c7" border="#f97316" />
        <EmojiRow emoji="🥭" count={15} label="Meena: 15 mangoes" color="#fef9c3" border="#fde68a" />
        <EmojiRow emoji="🥭" count={15} label="Friend: 23 mangoes (showing 15)" color="#f0fdf4" border="#86efac" />
        <p className="gt-qtext">15 + 23 = ? 🥭</p>
        <div className="gt-opts">
          {[['38','A'],['35','B'],['40','C'],['28','D']].map(([v,l],i) => (
            <GTOption key={v} value={v} label={l} index={i} onClick={() => lp.handleMcq('test_add1', v)} className={lp.getMcqClass('test_add1', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'test_add2',
    text: 'A farmer planted 312 seeds in the morning and 56 more in the evening. Total seeds?',
    options: [['368','368'],['358','358'],['378','378'],['468','468']],
    meta: { type: 'mcq', qid: 'test_add2', correct: '368', explanation: '312 + 56 = 368! Ones: 2+6=8, Tens: 1+5=6, Hundreds: 3!', correctLabel: '368' },
    render: (lp) => (
      <div className="gt-qcard gt-s1">
        <AchievementBadge icon="🌻" label="ADDITION HTO" color="#f97316" />
        <StoryBox emoji="👨‍🌾" text="A farmer planted 312 seeds in the morning and 56 more in the evening. Total seeds?" color="#fef3c7" border="#f97316" />
        <HTODisplay number={312} />
        <p className="gt-qtext">312 + 56 = ? 🌻</p>
        <div className="gt-opts">
          {[['368','A'],['358','B'],['378','C'],['468','D']].map(([v,l],i) => (
            <GTOption key={v} value={v} label={l} index={i} onClick={() => lp.handleMcq('test_add2', v)} className={lp.getMcqClass('test_add2', v)} />
          ))}
        </div>
      </div>
    ),
  },
  // ── GT-02 Subtraction ──
  {
    id: 'test_sub1',
    text: 'Raju had 12 apples. He ate 5. How many apples are left?',
    options: [['7','7'],['8','8'],['6','6'],['17','17']],
    meta: { type: 'mcq', qid: 'test_sub1', correct: '7', explanation: '12 − 5 = 7. Take away 5 apples from 12!', correctLabel: '7' },
    render: (lp) => (
      <div className="gt-qcard gt-s2">
        <AchievementBadge icon="🍎" label="SUBTRACTION" color="#ef4444" />
        <StoryBox emoji="🍎" text="Raju had 12 apples. He ate 5. How many apples are left?" color="#fef3c7" border="#f97316" />
        <EmojiRow emoji="🍎" count={12} label="12 apples to start" color="#fef9c3" border="#fde68a" />
        <p className="gt-qtext">12 − 5 = ? 🍎</p>
        <div className="gt-opts">
          {[['7','A'],['8','B'],['6','C'],['17','D']].map(([v,l],i) => (
            <GTOption key={v} value={v} label={l} index={i} onClick={() => lp.handleMcq('test_sub1', v)} className={lp.getMcqClass('test_sub1', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'test_sub2',
    text: 'Meena had 100 stickers. She gave 40 to friends. She says 60 stickers are left. True or False?',
    options: TF_OPTIONS,
    meta: { type: 'tf', qid: 'test_sub2_tf', correct: true, explanation: '100 − 40 = 60. One hundred minus 4 tens = 60!', correctLabel: 'True' },
    render: (lp) => (
      <div className="gt-qcard gt-s2">
        <AchievementBadge icon="🎯" label="TRUE / FALSE" color="#8b5cf6" />
        <StoryBox emoji="🧸" text="Meena had 100 stickers. She gave 40 to friends. She says 60 stickers are left!" color="#f0fdf4" border="#16a34a" />
        <BoxDiagram part1={60} part2={40} whole={100} unknownPart="part1" />
        <p className="gt-qtext">100 − 40 = 60. True or False?</p>
        <GTTFButtons qid="test_sub2_tf" lp={lp} />
      </div>
    ),
  },
  // ── GT-03 Number Line ──
  {
    id: 'test_nl1',
    text: 'Froggy starts at 20 and jumps forward 30 spaces. Where does he land?',
    options: [['50','50'],['40','40'],['60','60'],['30','30']],
    meta: { type: 'mcq', qid: 'test_nl1', correct: '50', explanation: 'Start at 20, jump forward 30: 20 + 30 = 50!', correctLabel: '50' },
    render: (lp) => (
      <div className="gt-qcard gt-s3">
        <AchievementBadge icon="🐸" label="NUMBER LINE" color="#16a34a" />
        <StoryBox emoji="🐸" text="Froggy starts at 20 and jumps forward 30 spaces. Where does he land?" color="#f0fdf4" border="#16a34a" />
        <NumberLineGT start={0} end={60} step={10} jumpFrom={20} jumpTo={50} jumpLabel="+30" highlight={50} />
        <p className="gt-qtext">Start at 20, jump +30. Where? 🐸</p>
        <div className="gt-opts">
          {[['50','A'],['40','B'],['60','C'],['30','D']].map(([v,l],i) => (
            <GTOption key={v} value={v} label={l} index={i} onClick={() => lp.handleMcq('test_nl1', v)} className={lp.getMcqClass('test_nl1', v)} />
          ))}
        </div>
      </div>
    ),
  },
  // ── GT-04 Word Problems ──
  {
    id: 'test_wp1',
    text: 'Raju planted 134 seeds in the morning and 25 more in the evening. How many seeds in all?',
    options: [['159','159'],['149','149'],['169','169'],['109','109']],
    meta: { type: 'mcq', qid: 'test_wp1', correct: '159', explanation: '134 + 25 = 159 seeds in total!', correctLabel: '159' },
    render: (lp) => (
      <div className="gt-qcard gt-s4">
        <AchievementBadge icon="🌱" label="WORD PROBLEM" color="#f59e0b" />
        <StoryBox emoji="🌱" text="Raju planted 134 seeds in the morning and 25 more in the evening. How many seeds in all?" color="#f0fdf4" border="#16a34a" />
        <BoxDiagram part1={134} part2={25} whole={159} unknownPart="whole" />
        <p className="gt-qtext">134 + 25 = ? 🌱</p>
        <div className="gt-opts">
          {[['159','A'],['149','B'],['169','C'],['109','D']].map(([v,l],i) => (
            <GTOption key={v} value={v} label={l} index={i} onClick={() => lp.handleMcq('test_wp1', v)} className={lp.getMcqClass('test_wp1', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'test_wp2',
    text: '50 sparrows sat on one tree and 25 on another. Neha says there are 75 birds total. True or False?',
    options: TF_OPTIONS,
    meta: { type: 'tf', qid: 'test_wp2_tf', correct: true, explanation: '50 + 25 = 75 birds total! Correct!', correctLabel: 'True' },
    render: (lp) => (
      <div className="gt-qcard gt-s4">
        <AchievementBadge icon="🎯" label="TRUE / FALSE" color="#8b5cf6" />
        <StoryBox emoji="🐦" text="50 sparrows sat on one tree and 25 on another. Neha says there are 75 birds total!" color="#eff6ff" border="#3b82f6" />
        <BoxDiagram part1={50} part2={25} whole={75} />
        <p className="gt-qtext">50 + 25 = 75. True or False?</p>
        <GTTFButtons qid="test_wp2_tf" lp={lp} />
      </div>
    ),
  },
  // ── GT-05 Money ──
  {
    id: 'test_mn1',
    text: 'Ria has 3 coins of ₹10 each. How much money does she have?',
    options: [['₹30','₹30'],['₹13','₹13'],['₹20','₹20'],['₹10','₹10']],
    meta: { type: 'mcq', qid: 'test_mn1', correct: '₹30', explanation: '3 × ₹10 = ₹30! Three ten-rupee coins make thirty rupees!', correctLabel: '₹30' },
    render: (lp) => (
      <div className="gt-qcard gt-s5">
        <AchievementBadge icon="🪙" label="MONEY" color="#f59e0b" />
        <StoryBox emoji="🪙" text="Ria has 3 coins of ₹10 each. How much money does she have?" color="#fef3c7" border="#f59e0b" />
        <CoinDisplay coins={[{ denom: 10, count: 3 }]} />
        <p className="gt-qtext">3 × ₹10 = ? 🪙</p>
        <div className="gt-opts">
          {[['₹30','A'],['₹13','B'],['₹20','C'],['₹10','D']].map(([v,l],i) => (
            <GTOption key={v} value={v} label={l} index={i} onClick={() => lp.handleMcq('test_mn1', v)} className={lp.getMcqClass('test_mn1', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'test_mn2',
    text: 'Papa says: Two ₹50 notes are the same as one ₹100 note. True or False?',
    options: TF_OPTIONS,
    meta: { type: 'tf', qid: 'test_mn2_tf', correct: true, explanation: '2 × ₹50 = ₹100. Two fifty-rupee notes make one hundred!', correctLabel: 'True' },
    render: (lp) => (
      <div className="gt-qcard gt-s5">
        <AchievementBadge icon="🎯" label="TRUE / FALSE" color="#8b5cf6" />
        <StoryBox emoji="💸" text="Papa says: Two ₹50 notes are the same as one ₹100 note!" color="#f0fdf4" border="#16a34a" />
        <NoteDisplay notes={[{ denom: 50, count: 2 }]} />
        <p className="gt-qtext">2 × ₹50 = ₹100. True or False?</p>
        <GTTFButtons qid="test_mn2_tf" lp={lp} />
      </div>
    ),
  },
  // ── GT-07 Patterns ──
  {
    id: 'test_pat1',
    text: 'Ellie counts by hundreds: 100, 200, 300… What comes next?',
    options: [['400','400'],['350','350'],['500','500'],['310','310']],
    meta: { type: 'mcq', qid: 'test_pat1', correct: '400', explanation: '100→200→300→400! Adding 100 each time!', correctLabel: '400' },
    render: (lp) => (
      <div className="gt-qcard gt-s7">
        <AchievementBadge icon="🔢" label="PATTERN" color="#16a34a" />
        <StoryBox emoji="🐘" text="Ellie counts by hundreds: 100, 200, 300... What comes next?" color="#f0fdf4" border="#16a34a" />
        <StonePath numbers={[100, 200, 300, null]} highlight={null} />
        <p className="gt-qtext">100 → 200 → 300 → ? 🔢</p>
        <div className="gt-opts">
          {[['400','A'],['350','B'],['500','C'],['310','D']].map(([v,l],i) => (
            <GTOption key={v} value={v} label={l} index={i} onClick={() => lp.handleMcq('test_pat1', v)} className={lp.getMcqClass('test_pat1', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'test_pat2',
    text: 'Tortoise counts down by 10: 90, 80, 70… What comes next?',
    options: [['60','60'],['65','65'],['50','50'],['75','75']],
    meta: { type: 'mcq', qid: 'test_pat2', correct: '60', explanation: '90→80→70→60! Going DOWN by 10 each time!', correctLabel: '60' },
    render: (lp) => (
      <div className="gt-qcard gt-s7">
        <AchievementBadge icon="⬇️" label="COUNT DOWN" color="#ef4444" />
        <StoryBox emoji="🐢" text="Tortoise counts down by 10: 90, 80, 70... What comes next?" color="#fee2e2" border="#ef4444" />
        <StonePath numbers={[90, 80, 70, null]} highlight={null} />
        <p className="gt-qtext">90 → 80 → 70 → ? ⬇️</p>
        <div className="gt-opts">
          {[['60','A'],['65','B'],['50','C'],['75','D']].map(([v,l],i) => (
            <GTOption key={v} value={v} label={l} index={i} onClick={() => lp.handleMcq('test_pat2', v)} className={lp.getMcqClass('test_pat2', v)} />
          ))}
        </div>
      </div>
    ),
  },
  // ── GT-08 Mental Math ──
  {
    id: 'test_mm1',
    text: 'Sparky says: 200 + 300 = ? Think quickly!',
    options: [['500','500'],['400','400'],['600','600'],['230','230']],
    meta: { type: 'mcq', qid: 'test_mm1', correct: '500', explanation: '200 + 300 = 500! Two hundreds + three hundreds = five hundreds!', correctLabel: '500' },
    render: (lp) => (
      <div className="gt-qcard gt-s8">
        <AchievementBadge icon="⚡" label="MENTAL MATH" color="#ec4899" />
        <StoryBox emoji="⚡" text="Sparky says: 200 + 300 = ? Think quickly!" color="#fce7f3" border="#ec4899" />
        <p className="gt-qtext">200 + 300 = ? ⚡</p>
        <div className="gt-opts">
          {[['500','A'],['400','B'],['600','C'],['230','D']].map(([v,l],i) => (
            <GTOption key={v} value={v} label={l} index={i} onClick={() => lp.handleMcq('test_mm1', v)} className={lp.getMcqClass('test_mm1', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'test_mm2',
    text: 'Round 157 to the nearest 100. Is it closer to 100 or 200?',
    options: [['200','200'],['100','100'],['150','150'],['160','160']],
    meta: { type: 'mcq', qid: 'test_mm2', correct: '200', explanation: '157 is closer to 200 than to 100, so it rounds to 200!', correctLabel: '200' },
    render: (lp) => (
      <div className="gt-qcard gt-s8">
        <AchievementBadge icon="🎯" label="ROUND IT!" color="#0d9488" />
        <StoryBox emoji="🎯" text="Round 157 to the nearest hundred. Is it closer to 100 or 200?" color="#f0fdf4" border="#0d9488" />
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', margin: '14px 0', alignItems: 'center', flexWrap: 'wrap' }}>
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring' }}
            style={{ background: '#dbeafe', border: '2px solid #3b82f6', borderRadius: 12, padding: '10px 16px', fontFamily: "'Baloo 2',cursive", fontWeight: 900, fontSize: '1.4rem', color: '#1e40af' }}>100</motion.div>
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.1 }}
            style={{ background: '#fef3c7', border: '3px solid #f59e0b', borderRadius: 12, padding: '12px 20px', fontFamily: "'Baloo 2',cursive", fontWeight: 900, fontSize: '2rem', color: '#78350f' }}>157</motion.div>
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.2 }}
            style={{ background: '#dcfce7', border: '2px solid #16a34a', borderRadius: 12, padding: '10px 16px', fontFamily: "'Baloo 2',cursive", fontWeight: 900, fontSize: '1.4rem', color: '#14532d' }}>200</motion.div>
        </div>
        <p className="gt-qtext">Round 157 to the nearest 100? 🎯</p>
        <div className="gt-opts">
          {[['200','A'],['100','B'],['150','C'],['160','D']].map(([v,l],i) => (
            <GTOption key={v} value={v} label={l} index={i} onClick={() => lp.handleMcq('test_mm2', v)} className={lp.getMcqClass('test_mm2', v)} />
          ))}
        </div>
      </div>
    ),
  },
  // ── GT-06 Making Amounts ──
  {
    id: 'test_ma1',
    text: 'Veer needs ₹20 using only ₹5 coins. How many ₹5 coins does he need?',
    options: [['4','4'],['3','3'],['5','5'],['2','2']],
    meta: { type: 'mcq', qid: 'test_ma1', correct: '4', explanation: '₹20 ÷ ₹5 = 4. Four ₹5 coins make ₹20!', correctLabel: '4' },
    render: (lp) => (
      <div className="gt-qcard gt-s6">
        <AchievementBadge icon="🪙" label="MAKING AMOUNTS" color="#ef4444" />
        <StoryBox emoji="🪙" text="Veer needs ₹20 using only ₹5 coins. How many ₹5 coins does he need?" color="#fef3c7" border="#f59e0b" />
        <CoinDisplay coins={[{ denom: 5, count: 4 }]} />
        <p className="gt-qtext">₹20 = ? × ₹5 coins 🪙</p>
        <div className="gt-opts">
          {[['4','A'],['3','B'],['5','C'],['2','D']].map(([v,l],i) => (
            <GTOption key={v} value={v} label={l} index={i} onClick={() => lp.handleMcq('test_ma1', v)} className={lp.getMcqClass('test_ma1', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'test_ma2',
    text: 'Tina says: I can make ₹15 with 1 coin of ₹10 and 1 coin of ₹5. True or False?',
    options: TF_OPTIONS,
    meta: { type: 'tf', qid: 'test_ma2_tf', correct: true, explanation: '₹10 + ₹5 = ₹15. One ten and one five make fifteen!', correctLabel: 'True' },
    render: (lp) => (
      <div className="gt-qcard gt-s6">
        <AchievementBadge icon="🎯" label="TRUE / FALSE" color="#8b5cf6" />
        <StoryBox emoji="🎒" text="Tina says: I can make ₹15 with 1 coin of ₹10 and 1 coin of ₹5!" color="#f0fdf4" border="#16a34a" />
        <CoinDisplay coins={[{ denom: 10, count: 1 }, { denom: 5, count: 1 }]} />
        <p className="gt-qtext">₹10 + ₹5 = ₹15. True or False?</p>
        <GTTFButtons qid="test_ma2_tf" lp={lp} />
      </div>
    ),
  },
];

const TOTAL_TEST_QUESTIONS = 10;

const GTTest = () => {
  const navigate = useNavigate();
  const { startSession, logAnswer, finishSession } = useSessionLogger();

  const selRef = useRef(null);
  if (!selRef.current) {
    selRef.current = shuffle([...ALL_QUESTIONS]).slice(0, TOTAL_TEST_QUESTIONS);
  }
  const selected = selRef.current;

  const matchAnswers = {};
  selected.forEach(q => { if (q.matchAnswers) Object.assign(matchAnswers, q.matchAnswers); });
  const logicProps = useGTLogic(matchAnswers);
  const { isAnswered, setIsAnswered, selectedOption, setSelectedOption, lastIsCorrect, lastExplanation, lastCorrectLabel, checkCurrentAnswer, isReadyToSubmit, resetState } = logicProps;

  const [qIndex, setQIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [timer, setTimer] = useState(0);
  const [answersMap, setAnswersMap] = useState({});
  const [skipped, setSkipped] = useState([]);

  useEffect(() => {
    startSession({ nodeId: NODE_IDS.g3MathGTTest, sessionType: 'test' });
  }, [startSession]);

  useEffect(() => {
    let interval;
    if (!showResults) interval = setInterval(() => setTimer(v => v + 1), 1000);
    return () => clearInterval(interval);
  }, [showResults]);

  const formatTime = (s) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;

  const handleSubmit = () => {
    if (isAnswered) return;
    const q = selected[qIndex];
    const meta = q?.meta;
    const isCorrect = checkCurrentAnswer(qIndex, meta);
    setIsAnswered(true);
    if (isCorrect) setScore(s => s + 1);
    const answerData = {
      selected: selectedOption,
      correct: meta?.correctLabel || meta?.correct,
      isCorrect,
      questionText: q?.text || '',
      options: q?.options || [],
      explanation: meta?.explanation || '',
    };
    setAnswersMap(prev => ({ ...prev, [qIndex]: answerData }));
    logAnswer({ question_index: qIndex, answer_json: answerData, is_correct: isCorrect ? 1 : 0 });
  };

  const handleNext = () => {
    if (qIndex < TOTAL_TEST_QUESTIONS - 1) {
      setQIndex(v => v + 1);
      setIsAnswered(false);
      setSelectedOption(null);
      if (resetState) resetState();
    } else {
      finishSession({ totalQuestions: TOTAL_TEST_QUESTIONS, questionsAnswered: Object.keys(answersMap).length, answersPayload: answersMap });
      setShowResults(true);
    }
  };

  const handleSkip = () => {
    const q = selected[qIndex];
    const meta = q?.meta;
    const skipData = {
      selected: 'Skipped',
      correct: meta?.correctLabel || meta?.correct,
      isCorrect: false,
      questionText: q?.text || '',
      options: q?.options || [],
      explanation: meta?.explanation || '',
    };
    setAnswersMap(prev => ({ ...prev, [qIndex]: skipData }));
    setSkipped(s => [...s, qIndex]);
    logAnswer({ question_index: qIndex, answer_json: skipData, is_correct: 0 });
    handleNext();
  };

  if (showResults) {
    const correctCount = Object.values(answersMap).filter(r => r.isCorrect).length;
    const wrongCount = Object.values(answersMap).filter(r => !r.isCorrect && r.selected !== 'Skipped').length;
    const skippedCount = TOTAL_TEST_QUESTIONS - correctCount - wrongCount;
    const pct = Math.round((correctCount / TOTAL_TEST_QUESTIONS) * 100);

    return (
      <div className="junior-practice-page grey-selection-theme result-page-wrapper" style={{ background: 'linear-gradient(135deg, #d1fae5 0%, #ecfdf5 50%, #fef9c3 100%)', minHeight: '100vh', overflowY: 'auto' }}>
        <Navbar />
        <div className="exam-report-container" style={{ padding: '2rem 1rem' }}>
          <div className="results-hero-section flex flex-col items-center mb-8 mt-4">
            <img src={avatarImg} alt="Mascot" className="w-40 h-40 mb-2 drop-shadow-lg object-contain" />
            <h1 className="text-5xl font-black text-[#14532d] mb-2 tracking-tight text-center">Test Report</h1>
            <p className="text-[#64748B] text-xl font-medium mb-8 text-center px-4">
              How you performed in <span className="font-bold">Give and Take — Chapter Test</span>
            </p>
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
                <span className="block text-xs font-black uppercase tracking-widest text-[#FF9800] mb-1">Total Time</span>
                <span className="text-4xl font-black text-[#E65100]">{formatTime(timer)}</span>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '3rem' }}>
            <button onClick={() => window.location.reload()} className="bg-white text-[#14532d] border-2 border-[#14532d] px-8 py-3 rounded-2xl font-black uppercase tracking-wider hover:bg-[#14532d] hover:text-white transition-colors flex items-center justify-center gap-2" style={{ fontSize: '1.1rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
              <RefreshCw size={20} /> Retake Test
            </button>
            <button onClick={() => navigate(`/junior/grade/3/topic/${TOPIC_URL}`)} className="bg-[#14532d] text-white border-2 border-[#14532d] px-8 py-3 rounded-2xl font-black uppercase tracking-wider transition-opacity hover:opacity-90 flex items-center justify-center gap-2" style={{ fontSize: '1.1rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
              <FileText size={20} /> Back to Topics
            </button>
          </div>

          <div style={{ marginBottom: '2rem', maxWidth: '1000px', marginLeft: 'auto', marginRight: 'auto' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1E293B', marginBottom: '1.5rem', paddingLeft: '1rem' }}>Detailed Review & Solutions</h2>
            {selected.map((q, idx) => {
              const res = answersMap[idx] || { selected: 'Skipped', isCorrect: false };
              const isSkipped = res.selected === 'Skipped';
              const meta = q.meta;
              const correctVal = meta?.correctLabel || meta?.correct;

              return (
                <details key={idx} className="solution-accordion group">
                  <summary className="solution-header cursor-pointer hover:bg-slate-50 transition-colors" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', listStyle: 'none', width: '100%' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1, overflow: 'hidden' }}>
                      <span style={{ fontWeight: '800', minWidth: '32px', height: '32px', background: '#16a34a', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', fontSize: '0.9rem', flexShrink: 0 }}>{idx + 1}</span>
                      <div className="hidden md:block truncate text-sm text-slate-500" style={{ flex: 1, maxWidth: '350px' }}>{q.text}</div>
                      {isSkipped
                        ? <span className="status-badge status-skipped shrink-0">Skipped</span>
                        : res.isCorrect
                          ? <span className="status-badge status-correct shrink-0">Correct</span>
                          : <span className="status-badge status-wrong shrink-0">Incorrect</span>}
                    </div>
                    <div style={{ color: '#64748B', display: 'flex', alignItems: 'center', gap: '1rem', flexShrink: 0 }}>
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-green-600 font-semibold text-sm whitespace-nowrap">Check Solution ↓</span>
                    </div>
                  </summary>

                  <div className="solution-content">
                    <div style={{ marginBottom: '1rem', padding: '1rem', borderLeft: '4px solid #16a34a', background: '#f0fdf4' }}>
                      {q.text}
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
                      {(q.options || []).map(([optVal, optDisplay], oIdx) => (
                        <div key={oIdx} style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid #E2E8F0', background: String(optVal) === String(correctVal) ? '#DCFCE7' : (String(optVal) === String(res.selected) ? '#FEE2E2' : 'white'), color: String(optVal) === String(correctVal) ? '#166534' : (String(optVal) === String(res.selected) ? '#991B1B' : '#475569') }}>
                          {optDisplay}
                        </div>
                      ))}
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                      <div style={{ background: '#F8FAFC', padding: '1rem', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                        <h5 style={{ fontSize: '0.7rem', fontWeight: '800', color: '#94A3B8', textTransform: 'uppercase', marginBottom: '0.5rem', letterSpacing: '0.5px' }}>Your Answer</h5>
                        {isSkipped
                          ? <span style={{ color: '#F59E0B', fontWeight: '700', fontSize: '1.1rem' }}>Skipped</span>
                          : <span style={{ color: res.isCorrect ? '#166534' : '#DC2626', fontWeight: '700', fontSize: '1.1rem' }}>{res.selected || 'Skipped'}</span>}
                      </div>
                      <div style={{ background: '#DCFCE7', padding: '1rem', borderRadius: '12px', border: '1px solid #BBF7D0' }}>
                        <h5 style={{ fontSize: '0.7rem', fontWeight: '800', color: '#166534', textTransform: 'uppercase', marginBottom: '0.5rem', letterSpacing: '0.5px' }}>Correct Answer</h5>
                        <span style={{ color: '#166534', fontWeight: '700', fontSize: '1.1rem' }}>{correctVal}</span>
                      </div>
                    </div>

                    {meta?.explanation && (
                      <div style={{ background: '#f0fdf4', padding: '1.5rem', borderRadius: '12px', border: '1px solid #bbf7d0' }}>
                        <h4 style={{ color: '#14532d', fontWeight: '800', marginBottom: '1rem', textTransform: 'uppercase', fontSize: '0.85rem', letterSpacing: '0.5px' }}>Solution:</h4>
                        {meta.explanation}
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

  const ready = isReadyToSubmit(qIndex);
  const currentQ = selected[qIndex];

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
            <div className="g1-progress-fill" style={{ width: `${((qIndex + 1) / TOTAL_TEST_QUESTIONS) * 100}%` }}></div>
          </div>
          <div className="exit-practice-sticker">
            <StickerExit onClick={() => navigate(`/junior/grade/3/topic/${TOPIC_URL}`)} />
          </div>
        </div>
        <div className="g1-topic-header-compact" style={{ textAlign: 'center', margin: '10px 0', fontSize: '0.9rem', color: '#64748B', textTransform: 'uppercase', letterSpacing: '2px' }}>
          Give and Take — Chapter Test &nbsp; | &nbsp; Q {qIndex + 1} of {TOTAL_TEST_QUESTIONS}
        </div>
        <motion.div key={qIndex} initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="g1-question-card">
          <div className="custom-html-question-content">
            {currentQ?.render(logicProps, currentQ)}
          </div>
          <div className="g1-navigation-footer" style={{ marginTop: '30px', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
            <button className="g1-nav-btn prev-btn" onClick={() => qIndex > 0 && setQIndex(qIndex - 1)} disabled={qIndex === 0 || isAnswered}>
              <ChevronLeft size={24} /> Prev
            </button>
            <div style={{ display: 'flex', gap: 8 }}>
              {!isAnswered && (
                <button className="g1-nav-btn" style={{ background: '#e2e8f0', color: '#374151' }} onClick={handleSkip}>
                  <SkipForward size={20} /> Skip
                </button>
              )}
              {!isAnswered ? (
                <button className="g1-nav-btn submit-btn" onClick={handleSubmit} disabled={!ready}>
                  Submit <Check size={24} />
                </button>
              ) : (
                <button className="g1-nav-btn next-btn" onClick={handleNext}>
                  {qIndex === TOTAL_TEST_QUESTIONS - 1 ? 'See Results' : 'Next'} <ChevronRight size={24} />
                </button>
              )}
            </div>
          </div>
          {isAnswered && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ marginTop: 12, padding: '12px 16px', borderRadius: 12, background: lastIsCorrect ? '#dcfce7' : '#fee2e2', border: `2px solid ${lastIsCorrect ? '#16a34a' : '#ef4444'}` }}
            >
              <p style={{ margin: 0, fontFamily: "'Baloo 2',cursive", fontWeight: 700, color: lastIsCorrect ? '#14532d' : '#7f1d1d', fontSize: '0.9rem' }}>
                {lastIsCorrect ? '✅ Correct!' : `❌ Answer: ${lastCorrectLabel}`}
              </p>
              {lastExplanation && <p style={{ margin: '4px 0 0', fontFamily: 'Nunito, sans-serif', fontSize: '0.85rem', color: '#374151' }}>{lastExplanation}</p>}
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default GTTest;
