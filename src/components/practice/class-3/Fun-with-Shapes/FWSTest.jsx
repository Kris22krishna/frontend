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
import { FWSOption, AchievementBadge, ShapeCard, ShapeRow, CornerDisplay, PatternSequence, TangramDisplay, shuffle } from './FWSSharedComponents';
import '../../../../pages/juniors/class-1/Grade1Practice.css';
import '../../../../pages/juniors/grade3/time-goes-ontest.css';
import './fun-with-shapes.css';

const TOPIC_URL = encodeURIComponent('Fun with Shapes');
const SKILL_NAME = 'Fun with Shapes — Chapter Test';
const TOTAL_QUESTIONS = 10;

const ALL_QUESTIONS = [
  // FWS-01 Recognising Shapes
  {
    id: 'fwst_1', correct: 'Triangle', correctLabel: 'Triangle', text: 'Which shape has exactly 3 sides and 3 corners?',
    options: [['Triangle','🔺 Triangle'],['Square','🟥 Square'],['Circle','⭕ Circle'],['Rectangle','▬ Rectangle']],
    render: (sel, onSel, opts) => (
      <div className="fws-qcard fws-s1">
        <AchievementBadge icon="🦁" label="SHAPE SPOTTER" color="#ef4444" />
        <p className="fws-qtext">🔍 Which shape has exactly 3 sides and 3 corners?</p>
        <ShapeRow shapes={[{ shape: 'triangle', color: '#ef4444', size: 56 },{ shape: 'square', color: '#3a86ff', size: 56 },{ shape: 'circle', color: '#22c55e', size: 56 },{ shape: 'rectangle', color: '#f59e0b', size: 56 }]} />
        <div className="fws-opts">
          {opts.map(([v, d], i) => <FWSOption key={v} value={v} displayText={d} letterIdx={i} onClick={() => onSel(v)} className={sel === v ? 'toy-joy-selected' : ''} />)}
        </div>
      </div>
    ),
  },
  {
    id: 'fwst_2', correct: '0', correctLabel: '0', text: 'How many corners does a circle have?',
    options: [['0','0 — None'],['2','2 corners'],['4','4 corners'],['3','3 corners']],
    render: (sel, onSel, opts) => (
      <div className="fws-qcard fws-s1">
        <AchievementBadge icon="⭕" label="CIRCLE QUEST" color="#22c55e" />
        <p className="fws-qtext">⭕ How many corners does a circle have?</p>
        <div style={{ display: 'flex', justifyContent: 'center', margin: '10px 0' }}>
          <ShapeCard shape="circle" color="#22c55e" size={90} />
        </div>
        <div className="fws-opts">
          {opts.map(([v, d], i) => <FWSOption key={v} value={v} displayText={d} letterIdx={i} onClick={() => onSel(v)} className={sel === v ? 'toy-joy-selected' : ''} />)}
        </div>
      </div>
    ),
  },
  // FWS-02 Flat Shapes
  {
    id: 'fwst_3', correct: 'Square', correctLabel: 'Square', text: 'What shape is a face of a dice?',
    options: [['Square','🟥 Square'],['Circle','⭕ Circle'],['Triangle','🔺 Triangle'],['Rectangle','▬ Rectangle']],
    render: (sel, onSel, opts) => (
      <div className="fws-qcard fws-s2">
        <AchievementBadge icon="🎲" label="FACE FINDER" color="#00b8a9" />
        <p className="fws-qtext">🎲 What shape is the face of a dice?</p>
        <div style={{ fontSize: '4rem', textAlign: 'center', margin: '10px 0' }}>🎲</div>
        <div className="fws-opts">
          {opts.map(([v, d], i) => <FWSOption key={v} value={v} displayText={d} letterIdx={i} onClick={() => onSel(v)} className={sel === v ? 'toy-joy-selected' : ''} />)}
        </div>
      </div>
    ),
  },
  // FWS-03 Rectangles
  {
    id: 'fwst_4', correct: '4', correctLabel: '4', text: 'How many sides does a rectangle have?',
    options: [['2','2 sides'],['3','3 sides'],['4','4 sides'],['6','6 sides']],
    render: (sel, onSel, opts) => (
      <div className="fws-qcard fws-s3">
        <AchievementBadge icon="▬" label="RECTANGLE RANGER" color="#3a86ff" />
        <p className="fws-qtext">▬ How many sides does a rectangle have?</p>
        <div style={{ display: 'flex', justifyContent: 'center', margin: '10px 0' }}>
          <ShapeCard shape="rectangle" color="#3a86ff" size={96} />
        </div>
        <div className="fws-opts">
          {opts.map(([v, d], i) => <FWSOption key={v} value={v} displayText={d} letterIdx={i} onClick={() => onSel(v)} className={sel === v ? 'toy-joy-selected' : ''} />)}
        </div>
      </div>
    ),
  },
  {
    id: 'fwst_5', correct: 'Opposite sides equal', correctLabel: 'Opposite sides equal', text: 'Which sides of a rectangle are equal?',
    options: [['All sides equal','All 4 sides equal'],['Opposite sides equal','Opposite sides equal'],['No sides equal','No sides equal'],['Adjacent sides equal','Adjacent sides equal']],
    render: (sel, onSel, opts) => (
      <div className="fws-qcard fws-s3">
        <AchievementBadge icon="📏" label="EQUAL SIDES" color="#3a86ff" />
        <p className="fws-qtext">📏 Which sides of a rectangle are equal?</p>
        <div className="fws-opts">
          {opts.map(([v, d], i) => <FWSOption key={v} value={v} displayText={d} letterIdx={i} onClick={() => onSel(v)} className={sel === v ? 'toy-joy-selected' : ''} />)}
        </div>
      </div>
    ),
  },
  // FWS-04 Squares
  {
    id: 'fwst_6', correct: 'All sides are equal', correctLabel: 'All sides are equal', text: 'What makes a square different from a rectangle?',
    options: [['More sides','It has more sides'],['All sides are equal','All 4 sides are equal'],['Round corners','It has round corners'],['3 corners','It has 3 corners']],
    render: (sel, onSel, opts) => (
      <div className="fws-qcard fws-s4">
        <AchievementBadge icon="🟥" label="SQUARE VS RECTANGLE" color="#f59e0b" />
        <p className="fws-qtext">🔍 What makes a SQUARE different from a rectangle?</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 20, margin: '10px 0', flexWrap: 'wrap' }}>
          <ShapeCard shape="square" color="#f59e0b" size={68} label="Square" />
          <ShapeCard shape="rectangle" color="#3a86ff" size={68} label="Rectangle" />
        </div>
        <div className="fws-opts">
          {opts.map(([v, d], i) => <FWSOption key={v} value={v} displayText={d} letterIdx={i} onClick={() => onSel(v)} className={sel === v ? 'toy-joy-selected' : ''} />)}
        </div>
      </div>
    ),
  },
  // FWS-05 Corners & Angles
  {
    id: 'fwst_7', correct: 'Right angle', correctLabel: 'Right angle', text: 'What is a square corner called?',
    options: [['Straight angle','Straight angle'],['Right angle','Right angle'],['Open angle','Open angle'],['Flat angle','Flat angle']],
    render: (sel, onSel, opts) => (
      <div className="fws-qcard fws-s5">
        <AchievementBadge icon="📐" label="ANGLE ADVENTURE" color="#7c3aed" />
        <p className="fws-qtext">📐 What is a square corner also called?</p>
        <div className="fws-corner-row">
          <CornerDisplay type="right" size={90} />
        </div>
        <div className="fws-opts">
          {opts.map(([v, d], i) => <FWSOption key={v} value={v} displayText={d} letterIdx={i} onClick={() => onSel(v)} className={sel === v ? 'toy-joy-selected' : ''} />)}
        </div>
      </div>
    ),
  },
  // FWS-06 Triangles
  {
    id: 'fwst_8', correct: 'Triangle', correctLabel: 'Triangle', text: 'What shape is a pizza slice?',
    options: [['Circle','⭕ Circle'],['Rectangle','▬ Rectangle'],['Triangle','🔺 Triangle'],['Square','🟥 Square']],
    render: (sel, onSel, opts) => (
      <div className="fws-qcard fws-s6">
        <AchievementBadge icon="🍕" label="PIZZA SHAPES" color="#ff7c2a" />
        <p className="fws-qtext">🍕 What shape is a pizza slice?</p>
        <div style={{ fontSize: '4rem', textAlign: 'center', margin: '10px 0' }}>🍕</div>
        <div className="fws-opts">
          {opts.map(([v, d], i) => <FWSOption key={v} value={v} displayText={d} letterIdx={i} onClick={() => onSel(v)} className={sel === v ? 'toy-joy-selected' : ''} />)}
        </div>
      </div>
    ),
  },
  // FWS-07 Circles
  {
    id: 'fwst_9', correct: 'Semi-circle', correctLabel: 'Semi-circle', text: 'Fold a circle in half — what shape do you get?',
    options: [['Triangle','🔺 Triangle'],['Semi-circle','🌙 Semi-circle'],['Square','🟥 Square'],['Rectangle','▬ Rectangle']],
    render: (sel, onSel, opts) => (
      <div className="fws-qcard fws-s7">
        <AchievementBadge icon="🌙" label="FOLD IT!" color="#22c55e" />
        <p className="fws-qtext">🌙 Fold a circle in half — what shape do you get?</p>
        <div className="fws-opts">
          {opts.map(([v, d], i) => <FWSOption key={v} value={v} displayText={d} letterIdx={i} onClick={() => onSel(v)} className={sel === v ? 'toy-joy-selected' : ''} />)}
        </div>
      </div>
    ),
  },
  // FWS-08 Composite
  {
    id: 'fwst_10', correct: 'Circle', correctLabel: 'Circle', text: 'Which shape is the odd one out among Triangle, Circle, Square, Rectangle?',
    options: [['Triangle','🔺 Triangle'],['Circle','⭕ Circle'],['Square','🟥 Square'],['Rectangle','▬ Rectangle']],
    render: (sel, onSel, opts) => (
      <div className="fws-qcard fws-s8">
        <AchievementBadge icon="🚫" label="ODD ONE OUT!" color="#ef4444" />
        <p className="fws-qtext">🔍 Which shape is the ODD ONE OUT?</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 10, margin: '10px 0', flexWrap: 'wrap' }}>
          <ShapeCard shape="triangle" color="#ff7c2a" size={56} label="Triangle" />
          <ShapeCard shape="circle" color="#22c55e" size={56} label="Circle" />
          <ShapeCard shape="square" color="#f59e0b" size={56} label="Square" />
          <ShapeCard shape="rectangle" color="#3a86ff" size={56} label="Rectangle" />
        </div>
        <div className="fws-opts">
          {opts.map(([v, d], i) => <FWSOption key={v} value={v} displayText={d} letterIdx={i} onClick={() => onSel(v)} className={sel === v ? 'toy-joy-selected' : ''} />)}
        </div>
      </div>
    ),
  },
  // FWS-09 Lines & Tangram
  {
    id: 'fwst_11', correct: '△', correctLabel: '△ Triangle', text: 'Pattern: ○△○△○ — what comes next?',
    options: [['△','🔺 Triangle'],['○','⭕ Circle'],['□','🟦 Square'],['◇','💠 Diamond']],
    render: (sel, onSel, opts) => (
      <div className="fws-qcard fws-s9">
        <AchievementBadge icon="🔮" label="PATTERN POWER" color="#6366f1" />
        <p className="fws-qtext">🔮 What comes next: ○△○△○ — ?</p>
        <PatternSequence items={['○', '△', '○', '△', '○', '?']} />
        <div className="fws-opts">
          {opts.map(([v, d], i) => <FWSOption key={v} value={v} displayText={d} letterIdx={i} onClick={() => onSel(v)} className={sel === v ? 'toy-joy-selected' : ''} />)}
        </div>
      </div>
    ),
  },
  {
    id: 'fwst_12', correct: '7 pieces', correctLabel: '7 pieces', text: 'How many pieces does a tangram have?',
    options: [['5 pieces','5 pieces'],['7 pieces','7 pieces'],['9 pieces','9 pieces'],['12 pieces','12 pieces']],
    render: (sel, onSel, opts) => (
      <div className="fws-qcard fws-s9">
        <AchievementBadge icon="🧩" label="TANGRAM MASTER" color="#6366f1" />
        <p className="fws-qtext">🧩 How many pieces does a tangram puzzle have?</p>
        <TangramDisplay />
        <div className="fws-opts">
          {opts.map(([v, d], i) => <FWSOption key={v} value={v} displayText={d} letterIdx={i} onClick={() => onSel(v)} className={sel === v ? 'toy-joy-selected' : ''} />)}
        </div>
      </div>
    ),
  },
  {
    id: 'fwst_13', correct: '4', correctLabel: '4 right angles', text: 'How many right angles does a rectangle have?',
    options: [['2','2 right angles'],['4','4 right angles'],['3','3 right angles'],['0','0 right angles']],
    render: (sel, onSel, opts) => (
      <div className="fws-qcard fws-s5">
        <AchievementBadge icon="📐" label="RECTANGLE ANGLES" color="#7c3aed" />
        <p className="fws-qtext">📐 How many right angles does a rectangle have?</p>
        <div style={{ display: 'flex', justifyContent: 'center', margin: '10px 0' }}>
          <ShapeCard shape="rectangle" color="#7c3aed" size={90} />
        </div>
        <div className="fws-opts">
          {opts.map(([v, d], i) => <FWSOption key={v} value={v} displayText={d} letterIdx={i} onClick={() => onSel(v)} className={sel === v ? 'toy-joy-selected' : ''} />)}
        </div>
      </div>
    ),
  },
  {
    id: 'fwst_14', correct: 'Rectangle', correctLabel: 'Rectangle', text: 'Join 2 squares side by side — what shape do you get?',
    options: [['Circle','⭕ Circle'],['Rectangle','▬ Rectangle'],['Triangle','🔺 Triangle'],['Pentagon','⬡ Pentagon']],
    render: (sel, onSel, opts) => (
      <div className="fws-qcard fws-s4">
        <AchievementBadge icon="🧩" label="SHAPE BUILDER" color="#f59e0b" />
        <p className="fws-qtext">🧩 Join 2 squares side by side — what shape do you get?</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 0, margin: '10px 0', alignItems: 'center' }}>
          <ShapeCard shape="square" color="#f59e0b" size={60} />
          <ShapeCard shape="square" color="#f59e0b" size={60} />
          <span style={{ fontSize: '1.4rem', color: '#64748b', margin: '0 8px' }}>→ ?</span>
        </div>
        <div className="fws-opts">
          {opts.map(([v, d], i) => <FWSOption key={v} value={v} displayText={d} letterIdx={i} onClick={() => onSel(v)} className={sel === v ? 'toy-joy-selected' : ''} />)}
        </div>
      </div>
    ),
  },
  {
    id: 'fwst_15', correct: 'Diameter', correctLabel: 'Diameter', text: 'A line through the centre of a circle is called…?',
    options: [['Perimeter','Perimeter'],['Diameter','Diameter'],['Radius','Radius'],['Boundary','Boundary']],
    render: (sel, onSel, opts) => (
      <div className="fws-qcard fws-s7">
        <AchievementBadge icon="📏" label="CIRCLE PARTS" color="#22c55e" />
        <p className="fws-qtext">📏 A line through the centre of a circle is called…?</p>
        <div className="fws-opts">
          {opts.map(([v, d], i) => <FWSOption key={v} value={v} displayText={d} letterIdx={i} onClick={() => onSel(v)} className={sel === v ? 'toy-joy-selected' : ''} />)}
        </div>
      </div>
    ),
  },
];

const FWSTest = () => {
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
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(0);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    startSession({ nodeId: NODE_IDS.g3MathFWSTest, sessionType: 'assessment' });
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
    if (isCorrect) setScore(s => s + 1);
    logAnswer({ question_index: qIndex, answer_json: { selected: tempSel, correct: currentQ.correctLabel, isCorrect }, is_correct: isCorrect ? 1 : 0 });
    setAnswers(prev => ({ ...prev, [qIndex]: { selectedOption: tempSel, isCorrect, questionText: currentQ.text, correctAnswer: currentQ.correctLabel, explanation: currentQ.explanation || `Correct answer: ${currentQ.correctLabel}` } }));
    handleNext();
  };

  const handleSkip = () => {
    logAnswer({ question_index: qIndex, answer_json: { selected: 'Skipped', correct: currentQ.correctLabel, isCorrect: false }, is_correct: 0 });
    setAnswers(prev => ({ ...prev, [qIndex]: { selectedOption: 'Skipped', isCorrect: false, questionText: currentQ.text, correctAnswer: currentQ.correctLabel, explanation: currentQ.explanation || '' } }));
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
    const correctCount = Object.values(answers).filter(r => r.isCorrect).length;
    const wrongCount = Object.values(answers).filter(r => !r.isCorrect && r.selectedOption !== 'Skipped').length;
    const skippedCount = TOTAL_QUESTIONS - correctCount - wrongCount;
    const pct = Math.round((correctCount / TOTAL_QUESTIONS) * 100);

    return (
      <div className="junior-practice-page grey-selection-theme result-page-wrapper" style={{ background: 'linear-gradient(135deg, #98D8C8 0%, #E0F6FF 50%, #FFE5E5 100%)', minHeight: '100vh', overflowY: 'auto' }}>
        <Navbar />
        <div className="exam-report-container" style={{ padding: '2rem 1rem' }}>
          <div className="results-hero-section flex flex-col items-center mb-8 mt-4">
            <img src={avatarImg} alt="Mascot" className="w-40 h-40 mb-2 drop-shadow-lg object-contain" />
            <h1 className="text-5xl font-black text-[#31326F] mb-2 tracking-tight text-center">Test Report</h1>
            <p className="text-[#64748B] text-xl font-medium mb-8 text-center px-4">How you performed in <span className="font-bold">{SKILL_NAME}</span></p>
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
            <button onClick={() => window.location.reload()} className="bg-white text-[#31326F] border-2 border-[#31326F] px-8 py-3 rounded-2xl font-black uppercase tracking-wider hover:bg-[#31326F] hover:text-white transition-colors flex items-center justify-center gap-2" style={{ fontSize: '1.1rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
              <RefreshCw size={20} /> Retake Test
            </button>
            <button onClick={() => navigate(`/junior/grade/3/topic/${TOPIC_URL}`)} className="bg-[#31326F] text-white border-2 border-[#31326F] px-8 py-3 rounded-2xl font-black uppercase tracking-wider transition-opacity hover:opacity-90 flex items-center justify-center gap-2" style={{ fontSize: '1.1rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
              <FileText size={20} /> Back to Topics
            </button>
          </div>
          
          <div style={{ marginBottom: '2rem', maxWidth: '1000px', marginLeft: 'auto', marginRight: 'auto' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1E293B', marginBottom: '1.5rem', paddingLeft: '1rem' }}>Detailed Review & Solutions</h2>
            {questions.map((q, idx) => {
              const res = answers[idx] || { selectedOption: 'Skipped', isCorrect: false };
              const isSkipped = res.selectedOption === 'Skipped';
              
              return (
                <details key={idx} className="solution-accordion group">
                  <summary className="solution-header cursor-pointer hover:bg-slate-50 transition-colors" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', listStyle: 'none', width: '100%' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1, overflow: 'hidden' }}>
                      <span style={{ fontWeight: '800', minWidth: '32px', height: '32px', background: '#FF9800', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', fontSize: '0.9rem', flexShrink: 0 }}>{idx + 1}</span>
                      <div className="hidden md:block truncate text-sm text-slate-500" style={{ flex: 1, maxWidth: '350px' }}><LatexText text={q.text} /></div>
                      {isSkipped ? <span className="status-badge status-skipped shrink-0">Skipped</span> : res.isCorrect ? <span className="status-badge status-correct shrink-0">Correct</span> : <span className="status-badge status-wrong shrink-0">Incorrect</span>}
                    </div>
                    <div style={{ color: '#64748B', display: 'flex', alignItems: 'center', gap: '1rem', flexShrink: 0 }}>
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-orange-500 font-semibold text-sm whitespace-nowrap">Check Solution ↓</span>
                    </div>
                  </summary>
                  
                  <div className="solution-content">
                    <div style={{ marginBottom: '1rem', padding: '1rem', borderLeft: '4px solid #FF9800', background: '#FFF8F0' }}>
                      <LatexText text={q.text} />
                    </div>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
                      {q.options && q.options.map(([optVal, optDisplay], oIdx) => (
                        <div key={oIdx} style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid #E2E8F0', background: optVal === q.correct ? '#DCFCE7' : (optVal === res.selectedOption ? '#FEE2E2' : 'white'), color: optVal === q.correct ? '#166534' : (optVal === res.selectedOption ? '#991B1B' : '#475569') }}>
                          <LatexText text={optDisplay} />
                        </div>
                      ))}
                    </div>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                      <div style={{ background: '#F8FAFC', padding: '1rem', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                        <h5 style={{ fontSize: '0.7rem', fontWeight: '800', color: '#94A3B8', textTransform: 'uppercase', marginBottom: '0.5rem', letterSpacing: '0.5px' }}>Your Answer</h5>
                        {isSkipped ? <span style={{ color: '#F59E0B', fontWeight: '700', fontSize: '1.1rem' }}>Skipped</span> : <span style={{ color: res.isCorrect ? '#166534' : '#DC2626', fontWeight: '700', fontSize: '1.1rem' }}>{res.selectedOption ? <LatexText text={res.selectedOption} /> : 'Skipped'}</span>}
                      </div>
                      <div style={{ background: '#DCFCE7', padding: '1rem', borderRadius: '12px', border: '1px solid #BBF7D0' }}>
                        <h5 style={{ fontSize: '0.7rem', fontWeight: '800', color: '#166534', textTransform: 'uppercase', marginBottom: '0.5rem', letterSpacing: '0.5px' }}>Correct Answer</h5>
                        <span style={{ color: '#166534', fontWeight: '700', fontSize: '1.1rem' }}><LatexText text={q.correctLabel} /></span>
                      </div>
                    </div>
                    
                    {(q.explanation || res.explanation) && (
                      <div style={{ background: '#FFF3E0', padding: '1.5rem', borderRadius: '12px', border: '1px solid #FFE0B2' }}>
                        <h4 style={{ color: '#E65100', fontWeight: '800', marginBottom: '1rem', textTransform: 'uppercase', fontSize: '0.85rem', letterSpacing: '0.5px' }}>Solution:</h4>
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

  return (
    <div className="grade1-practice-page">
      <div className="g1-bg-blobs">
        <div className="blob blob-1"></div><div className="blob blob-2"></div><div className="blob blob-3"></div>
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
          Fun with Shapes
        </div>
        <motion.div key={qIndex} initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="g1-question-card">
          <div className="custom-html-question-content">
            {currentQ.render(tempSel, isAnswered ? () => {} : handleSelect, currentQ.shuffledOpts)}
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

export default FWSTest;
