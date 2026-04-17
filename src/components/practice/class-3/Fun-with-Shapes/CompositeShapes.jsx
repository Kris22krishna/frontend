import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { useFWSLogic } from './useFWSLogic';
import FWSPracticeTemplate from './FWSPracticeTemplate';
import { FWSOption, FWSTFButtons, AchievementBadge, ShapeCard, ShapeCountGrid, FWSMatchLayout, shuffle } from './FWSSharedComponents';
import './fun-with-shapes.css';

// SVG: grid of rectangles for hidden shape counting
const RectGrid = ({ rows = 1, cols = 2, cellW = 50, cellH = 40 }) => {
  const W = cols * cellW + 4, H = rows * cellH + 4;
  const lines = [];
  for (let r = 0; r <= rows; r++) lines.push(<line key={`h${r}`} x1={2} y1={2 + r * cellH} x2={W - 2} y2={2 + r * cellH} stroke="#3a86ff" strokeWidth="2" />);
  for (let c = 0; c <= cols; c++) lines.push(<line key={`v${c}`} x1={2 + c * cellW} y1={2} x2={2 + c * cellW} y2={H - 2} stroke="#3a86ff" strokeWidth="2" />);
  return (
    <motion.div style={{ display: 'flex', justifyContent: 'center', margin: '12px 0' }} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ background: '#eff6ff', borderRadius: 10 }}>{lines}</svg>
    </motion.div>
  );
};

const QUESTION_POOL = [
  {
    id: 'comp_q1',
    options: [['3','3 triangles'],['4','4 triangles'],['5','5 triangles'],['6','6 triangles']],
    meta: { type: 'mcq', qid: 'comp_q1', correct: '4', correctLabel: '4', explanation: 'There are 4 triangles in the figure! Look for small triangles AND the large triangle formed by combining them.' },
    render: (lp, ctx) => (
      <div className="fws-qcard fws-s8">
        <AchievementBadge icon="🔍" label="SHAPE HUNTER" color="#f472b6" />
        <p className="fws-qtext">🔍 Count ALL the triangles (small AND big ones)!</p>
        <ShapeCountGrid shapes={[
          { shape: 'triangle', color: '#ef4444' },
          { shape: 'triangle', color: '#f59e0b' },
          { shape: 'triangle', color: '#3a86ff' },
          { shape: 'triangle', color: '#22c55e' },
        ]} />
        <div className="fws-opts">
          {ctx.shuffledOpts.map(([v, d], i) => (
            <FWSOption key={v} value={v} displayText={d} letterIdx={i} onClick={() => lp.handleMcq('comp_q1', v)} className={lp.getMcqClass('comp_q1', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'comp_q2',
    options: [['2 Squares','2 Squares 🟥🟥'],['2 Triangles','2 Triangles 🔺🔺'],['2 Circles','2 Circles ⭕⭕'],['1 Triangle','1 Triangle 🔺']],
    meta: { type: 'mcq', qid: 'comp_q2', correct: '2 Triangles', correctLabel: '2 Triangles', explanation: 'A diagonal cut from corner to corner divides a rectangle into 2 equal triangles! This is how origami paper folding works too.' },
    render: (lp, ctx) => (
      <div className="fws-qcard fws-s8">
        <AchievementBadge icon="✂️" label="SHAPE SPLITTER" color="#f472b6" />
        <p className="fws-qtext">✂️ Cut a rectangle diagonally — what do you get?</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 12, margin: '12px 0', alignItems: 'center' }}>
          <ShapeCard shape="rectangle" color="#3a86ff" size={80} />
          <span style={{ fontSize: '1.5rem', color: '#64748b' }}>→</span>
          <ShapeCard shape="triangle" color="#ef4444" size={60} />
          <span style={{ fontSize: '1.2rem', color: '#64748b' }}>+</span>
          <ShapeCard shape="triangle" color="#22c55e" size={60} />
        </div>
        <div className="fws-opts">
          {ctx.shuffledOpts.map(([v, d], i) => (
            <FWSOption key={v} value={v} displayText={d} letterIdx={i} onClick={() => lp.handleMcq('comp_q2', v)} className={lp.getMcqClass('comp_q2', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'comp_q3',
    meta: { type: 'tf', qid: 'comp_q3_tf', correct: true, correctLabel: 'True', explanation: 'YES! Place 2 squares side by side and you always get a rectangle — it has 4 right angles and opposite sides equal!' },
    render: (lp) => (
      <div className="fws-qcard fws-s8">
        <AchievementBadge icon="🎯" label="TRUE OR FALSE?" color="#7c3aed" />
        <p className="fws-qtext">🟥🟥 Two squares joined side by side make a rectangle. True or False?</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 0, margin: '12px 0', alignItems: 'center' }}>
          <ShapeCard shape="square" color="#f59e0b" size={64} />
          <ShapeCard shape="square" color="#f59e0b" size={64} />
          <span style={{ fontSize: '1.5rem', color: '#64748b', margin: '0 8px' }}>→</span>
          <ShapeCard shape="rectangle" color="#3a86ff" size={80} />
        </div>
        <FWSTFButtons qid="comp_q3_tf" lp={lp} />
      </div>
    ),
  },
  {
    id: 'comp_q4',
    options: [['Triangle','🔺 Triangle'],['Circle','⭕ Circle'],['Square','🟥 Square'],['Rectangle','▬ Rectangle']],
    meta: { type: 'mcq', qid: 'comp_q4', correct: 'Circle', correctLabel: 'Circle', explanation: 'The circle is the ODD ONE OUT because it has NO straight sides and NO corners! Triangle, square, and rectangle all have straight sides and corners.' },
    render: (lp, ctx) => (
      <div className="fws-qcard fws-s8">
        <AchievementBadge icon="🚫" label="ODD ONE OUT!" color="#ef4444" />
        <p className="fws-qtext">🔍 Which shape is the ODD ONE OUT?</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 12, margin: '12px 0', flexWrap: 'wrap' }}>
          <ShapeCard shape="triangle" color="#ff7c2a" size={64} label="Triangle" />
          <ShapeCard shape="circle" color="#22c55e" size={64} label="Circle" />
          <ShapeCard shape="square" color="#f59e0b" size={64} label="Square" />
          <ShapeCard shape="rectangle" color="#3a86ff" size={64} label="Rectangle" />
        </div>
        <div className="fws-opts">
          {ctx.shuffledOpts.map(([v, d], i) => (
            <FWSOption key={v} value={v} displayText={d} letterIdx={i} onClick={() => lp.handleMcq('comp_q4', v)} className={lp.getMcqClass('comp_q4', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'comp_q5',
    options: [['2','2 rectangles'],['3','3 rectangles'],['4','4 rectangles'],['6','6 rectangles']],
    meta: { type: 'mcq', qid: 'comp_q5', correct: '3', correctLabel: '3', explanation: 'In a 1×2 grid: 2 small unit rectangles + 1 big rectangle (the whole grid) = 3 total! Always count the large combined shapes too.' },
    render: (lp, ctx) => (
      <div className="fws-qcard fws-s8">
        <AchievementBadge icon="🔢" label="COUNT RECTANGLES" color="#3a86ff" />
        <p className="fws-qtext">🔢 Count ALL rectangles (small AND big) in this 1×2 grid!</p>
        <RectGrid rows={1} cols={2} cellW={55} cellH={44} />
        <div className="fws-opts">
          {ctx.shuffledOpts.map(([v, d], i) => (
            <FWSOption key={v} value={v} displayText={d} letterIdx={i} onClick={() => lp.handleMcq('comp_q5', v)} className={lp.getMcqClass('comp_q5', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'comp_q6',
    meta: { type: 'tf', qid: 'comp_q6_tf', correct: true, correctLabel: 'True', explanation: 'YES! Draw 2 diagonal lines inside a square (both diagonals) and you get 4 equal triangles! Each corner becomes a separate triangle.' },
    render: (lp) => (
      <div className="fws-qcard fws-s8">
        <AchievementBadge icon="🎯" label="TRUE OR FALSE?" color="#7c3aed" />
        <p className="fws-qtext">🟥 You can split a square into 4 smaller triangles. True or False?</p>
        <FWSTFButtons qid="comp_q6_tf" lp={lp} />
      </div>
    ),
  },
  {
    id: 'comp_q7',
    options: [['Big square','A big square 🟥'],['Long rectangle','A long rectangle ▬'],['Circle','A circle ⭕'],['Triangle','A triangle 🔺']],
    meta: { type: 'mcq', qid: 'comp_q7', correct: 'Long rectangle', correctLabel: 'A long rectangle', explanation: 'Join 4 squares in a single row and you get a LONG rectangle — very wide but not very tall! It has 4 right angles and opposite sides equal.' },
    render: (lp, ctx) => (
      <div className="fws-qcard fws-s8">
        <AchievementBadge icon="🧩" label="BUILD A SHAPE" color="#f472b6" />
        <p className="fws-qtext">🧩 Join 4 squares in a row — what shape do you get?</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 0, margin: '12px 0', flexWrap: 'wrap' }}>
          {[1, 2, 3, 4].map(n => (
            <motion.div key={n} initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: n * 0.1, type: 'spring' }}>
              <ShapeCard shape="square" color="#f59e0b" size={52} />
            </motion.div>
          ))}
        </div>
        <div className="fws-opts">
          {ctx.shuffledOpts.map(([v, d], i) => (
            <FWSOption key={v} value={v} displayText={d} letterIdx={i} onClick={() => lp.handleMcq('comp_q7', v)} className={lp.getMcqClass('comp_q7', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'comp_q8',
    meta: { type: 'tf', qid: 'comp_q8_tf', correct: true, correctLabel: 'True', explanation: 'YES! Arrange 2 right triangles with their longest sides together and you form a rectangle or square. Tangram puzzles use this trick!' },
    render: (lp) => (
      <div className="fws-qcard fws-s8">
        <AchievementBadge icon="🎯" label="TRUE OR FALSE?" color="#7c3aed" />
        <p className="fws-qtext">🔺🔺 Two triangles can form a rectangle. True or False?</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 12, margin: '12px 0', alignItems: 'center', flexWrap: 'wrap' }}>
          <ShapeCard shape="triangle" color="#ef4444" size={60} />
          <ShapeCard shape="triangle" color="#22c55e" size={60} />
          <span style={{ fontSize: '1.5rem', color: '#64748b' }}>→</span>
          <ShapeCard shape="rectangle" color="#3a86ff" size={80} />
        </div>
        <FWSTFButtons qid="comp_q8_tf" lp={lp} />
      </div>
    ),
  },
  {
    id: 'comp_q9',
    options: [['Square','🟥 Square'],['Triangle','🔺 Triangle'],['Semi-circle','🌙 Semi-circle'],['Rectangle','▬ Rectangle']],
    meta: { type: 'mcq', qid: 'comp_q9', correct: 'Semi-circle', correctLabel: 'Semi-circle', explanation: 'Cut a circle exactly in half and you get 2 SEMI-CIRCLES! "Semi" = half. Each piece has one curved side and one straight side.' },
    render: (lp, ctx) => (
      <div className="fws-qcard fws-s8">
        <AchievementBadge icon="🌙" label="HALF SHAPES" color="#f472b6" />
        <p className="fws-qtext">🌙 Cut a circle in half — each piece is a…?</p>
        <div className="fws-opts">
          {ctx.shuffledOpts.map(([v, d], i) => (
            <FWSOption key={v} value={v} displayText={d} letterIdx={i} onClick={() => lp.handleMcq('comp_q9', v)} className={lp.getMcqClass('comp_q9', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'comp_q10',
    matchAnswers: { comp_match10: { 'comp_m_2sq': 'Rectangle', 'comp_m_diagrect': '2 Triangles', 'comp_m_4sq': 'Big Rectangle', 'comp_m_circhalf': '2 Semi-circles' } },
    rightItems: [['Rectangle','Rectangle ▬'],['2 Triangles','2 Triangles 🔺🔺'],['Big Rectangle','Long rectangle'],['2 Semi-circles','2 semi-circles 🌙🌙']],
    meta: { type: 'match', totalPairs: 4, explanation: '2 squares→Rectangle, Rectangle cut diagonally→2 Triangles, 4 squares→Big Rectangle, Circle cut→2 Semi-circles!', correctLabel: 'All matched!' },
    render: (lp, ctx) => (
      <div className="fws-qcard fws-s8">
        <AchievementBadge icon="🔗" label="SHAPE BUILD MATCH!" color="#f472b6" />
        <p className="fws-qtext">🎯 Match each shape action to its result!</p>
        <FWSMatchLayout
          matchId="comp_match10"
          leftItems={[['comp_m_2sq','Join 2 squares'],['comp_m_diagrect','Cut rectangle diagonally'],['comp_m_4sq','Join 4 squares in a row'],['comp_m_circhalf','Cut a circle in half']]}
          shuffledRight={ctx.shuffledRight}
          lp={lp}
        />
      </div>
    ),
  },
];

const CompositeShapes = () => {
  const selRef = useRef(null);
  if (!selRef.current) {
    selRef.current = shuffle([...QUESTION_POOL]).slice(0, 5).map(q => ({
      ...q,
      ...(q.options    && { shuffledOpts:  shuffle([...q.options])    }),
      ...(q.rightItems && { shuffledRight: shuffle([...q.rightItems]) }),
    }));
  }
  const selected = selRef.current;
  const matchAnswers = {};
  selected.forEach(q => { if (q.matchAnswers) Object.assign(matchAnswers, q.matchAnswers); });
  const logicProps = useFWSLogic(matchAnswers);
  const questions = selected.map(q => <React.Fragment key={q.id}>{q.render(logicProps, q)}</React.Fragment>);
  const questionMeta = selected.map(q => q.meta);
  return <FWSPracticeTemplate skillId="FWS-08" skillName="Composite Shapes and Patterns" questions={questions} questionMeta={questionMeta} logicProps={logicProps} />;
};

export default CompositeShapes;
