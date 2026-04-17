import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { useFWSLogic } from './useFWSLogic';
import FWSPracticeTemplate from './FWSPracticeTemplate';
import { FWSOption, FWSTFButtons, AchievementBadge, ShapeCard, FWSMatchLayout, DrawQuestion, shuffle } from './FWSSharedComponents';
import './fun-with-shapes.css';

const QUESTION_POOL = [
  {
    id: 'sq_q1',
    options: [['2','2 equal sides'],['3','3 equal sides'],['4','All 4 sides equal'],['0','No equal sides']],
    meta: { type: 'mcq', qid: 'sq_q1', correct: '4', correctLabel: 'All 4 sides equal', explanation: 'A square has ALL 4 sides equal in length — that\'s its superpower! This is what makes it different from a rectangle.' },
    render: (lp, ctx) => (
      <div className="fws-qcard fws-s4">
        <AchievementBadge icon="🟥" label="SQUARE SQUAD" color="#f59e0b" />
        <p className="fws-qtext">How many sides of a square are equal?</p>
        <div style={{ display: 'flex', justifyContent: 'center', margin: '14px 0' }}>
          <ShapeCard shape="square" color="#f59e0b" size={120} />
        </div>
        <div className="fws-opts">
          {ctx.shuffledOpts.map(([v, d], i) => (
            <FWSOption key={v} value={v} displayText={d} letterIdx={i} onClick={() => lp.handleMcq('sq_q1', v)} className={lp.getMcqClass('sq_q1', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'sq_q2',
    meta: { type: 'tf', qid: 'sq_q2_tf', correct: true, correctLabel: 'True', explanation: 'YES! All 4 sides of a square are exactly equal in length. Measure any side of a square tile — they\'re all the same!' },
    render: (lp) => (
      <div className="fws-qcard fws-s4">
        <AchievementBadge icon="🎯" label="TRUE OR FALSE?" color="#7c3aed" />
        <p className="fws-qtext">A square has all 4 sides equal in length. True or False?</p>
        <div style={{ display: 'flex', justifyContent: 'center', margin: '14px 0' }}>
          <ShapeCard shape="square" color="#f59e0b" size={120} />
        </div>
        <FWSTFButtons qid="sq_q2_tf" lp={lp} />
      </div>
    ),
  },
  {
    id: 'sq_q3',
    options: [['More sides','It has more sides'],['Equal sides','All 4 sides are equal'],['Round corners','It has round corners'],['3 corners','It has 3 corners']],
    meta: { type: 'mcq', qid: 'sq_q3', correct: 'Equal sides', correctLabel: 'All 4 sides are equal', explanation: 'Both square and rectangle have 4 sides and 4 right angle corners. The BIG difference: a square has ALL 4 sides equal, a rectangle does not!' },
    render: (lp, ctx) => (
      <div className="fws-qcard fws-s4">
        <AchievementBadge icon="🔍" label="SPOT THE DIFFERENCE" color="#f59e0b" />
        <p className="fws-qtext">What makes a square DIFFERENT from a rectangle?</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 24, margin: '14px 0', flexWrap: 'wrap' }}>
          <ShapeCard shape="square" color="#f59e0b" size={90} label="Square" />
          <ShapeCard shape="rectangle" color="#3a86ff" size={90} label="Rectangle" />
        </div>
        <div className="fws-opts">
          {ctx.shuffledOpts.map(([v, d], i) => (
            <FWSOption key={v} value={v} displayText={d} letterIdx={i} onClick={() => lp.handleMcq('sq_q3', v)} className={lp.getMcqClass('sq_q3', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'sq_q4',
    options: [['Circle','⭕ Circle'],['Rectangle','▬ Rectangle'],['Triangle','🔺 Triangle'],['Hexagon','⬡ Hexagon']],
    meta: { type: 'mcq', qid: 'sq_q4', correct: 'Rectangle', correctLabel: 'Rectangle', explanation: 'When you join 2 squares side by side, you get a RECTANGLE! The new shape has 2 long sides and 2 short sides with opposite sides equal.' },
    render: (lp, ctx) => (
      <div className="fws-qcard fws-s4">
        <AchievementBadge icon="🧩" label="SHAPE BUILDER" color="#f59e0b" />
        <p className="fws-qtext">Join 2 squares side by side — what shape do you get?</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 0, margin: '14px 0', alignItems: 'center' }}>
          {[1, 2].map(n => (
            <motion.div key={n} initial={{ x: n === 1 ? -20 : 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: n * 0.15, type: 'spring' }}>
              <ShapeCard shape="square" color="#f59e0b" size={80} />
            </motion.div>
          ))}
          <span style={{ fontSize: '2rem', margin: '0 12px', alignSelf: 'center', color: '#64748b' }}>→ ?</span>
        </div>
        <div className="fws-opts">
          {ctx.shuffledOpts.map(([v, d], i) => (
            <FWSOption key={v} value={v} displayText={d} letterIdx={i} onClick={() => lp.handleMcq('sq_q4', v)} className={lp.getMcqClass('sq_q4', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'sq_q5',
    meta: { type: 'tf', qid: 'sq_q5_tf', correct: true, correctLabel: 'True', explanation: 'YES! A chessboard is made up of 64 small squares arranged in an 8×8 grid. Every single cell is a perfect square!' },
    render: (lp) => (
      <div className="fws-qcard fws-s4">
        <AchievementBadge icon="♟️" label="TRUE OR FALSE?" color="#7c3aed" />
        <p className="fws-qtext">A chessboard is made of squares. True or False?</p>
        <div style={{ display: 'flex', justifyContent: 'center', margin: '14px 0' }}>
          <svg width="160" height="160" viewBox="0 0 160 160" style={{ borderRadius: 8, border: '3px solid #6b21a8' }}>
            {Array.from({ length: 8 }, (_, row) =>
              Array.from({ length: 8 }, (_, col) => (
                <rect
                  key={`${row}-${col}`}
                  x={col * 20} y={row * 20}
                  width={20} height={20}
                  fill={(row + col) % 2 === 0 ? '#f3e8ff' : '#6b21a8'}
                />
              ))
            )}
          </svg>
        </div>
        <FWSTFButtons qid="sq_q5_tf" lp={lp} />
      </div>
    ),
  },
  {
    id: 'sq_q6',
    options: [['2','2 corners'],['3','3 corners'],['4','4 corners'],['5','5 corners']],
    meta: { type: 'mcq', qid: 'sq_q6', correct: '4', correctLabel: '4', explanation: 'A square has exactly 4 corners, just like a rectangle — and all 4 corners are right angles (90°)!' },
    render: (lp, ctx) => (
      <div className="fws-qcard fws-s4">
        <AchievementBadge icon="📐" label="CORNER COUNT" color="#f59e0b" />
        <p className="fws-qtext">How many corners does a square have?</p>
        <div style={{ display: 'flex', justifyContent: 'center', margin: '14px 0' }}>
          <ShapeCard shape="square" color="#f59e0b" size={120} />
        </div>
        <div className="fws-opts">
          {ctx.shuffledOpts.map(([v, d], i) => (
            <FWSOption key={v} value={v} displayText={d} letterIdx={i} onClick={() => lp.handleMcq('sq_q6', v)} className={lp.getMcqClass('sq_q6', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'sq_q7',
    options: [['2 Triangles','2 Triangles 🔺🔺'],['2 Circles','2 Circles ⭕⭕'],['2 Rectangles','2 Rectangles ▬▬'],['2 Squares','2 Squares 🟥🟥']],
    meta: { type: 'mcq', qid: 'sq_q7', correct: '2 Triangles', correctLabel: '2 Triangles', explanation: 'When you draw a diagonal line from corner to corner of a square, you cut it into 2 equal triangles!' },
    render: (lp, ctx) => (
      <div className="fws-qcard fws-s4">
        <AchievementBadge icon="✂️" label="SPLIT IT!" color="#f59e0b" />
        <p className="fws-qtext">Draw a diagonal line inside a square — what 2 shapes do you get?</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 12, margin: '14px 0', alignItems: 'center' }}>
          <ShapeCard shape="square" color="#f59e0b" size={90} label="Square" />
          <span style={{ fontSize: '1.5rem', color: '#64748b' }}>→</span>
          <ShapeCard shape="triangle" color="#ef4444" size={72} label="?" />
          <span style={{ fontSize: '1.2rem', color: '#64748b' }}>+</span>
          <ShapeCard shape="triangle" color="#ef4444" size={72} label="?" />
        </div>
        <div className="fws-opts">
          {ctx.shuffledOpts.map(([v, d], i) => (
            <FWSOption key={v} value={v} displayText={d} letterIdx={i} onClick={() => lp.handleMcq('sq_q7', v)} className={lp.getMcqClass('sq_q7', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'sq_q8',
    meta: { type: 'tf', qid: 'sq_q8_tf', correct: true, correctLabel: 'True', explanation: 'YES! A square is a special rectangle — it has all 4 right angles AND all 4 equal sides. Every square is a rectangle, but not every rectangle is a square!' },
    render: (lp) => (
      <div className="fws-qcard fws-s4">
        <AchievementBadge icon="🎯" label="TRUE OR FALSE?" color="#7c3aed" />
        <p className="fws-qtext">A square is a special kind of rectangle. True or False?</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 24, margin: '14px 0', flexWrap: 'wrap' }}>
          <ShapeCard shape="square" color="#f59e0b" size={90} label="Square" />
          <ShapeCard shape="rectangle" color="#3a86ff" size={90} label="Rectangle" />
        </div>
        <FWSTFButtons qid="sq_q8_tf" lp={lp} />
      </div>
    ),
  },
  {
    id: 'sq_q9',
    options: [['Orange','🍊 Orange'],['Book cover','📚 Book cover'],['Dice face','🎲 Dice face'],['Pencil','✏️ Pencil']],
    meta: { type: 'mcq', qid: 'sq_q9', correct: 'Dice face', correctLabel: 'Dice face', explanation: 'A dice face is a square — all 4 sides equal and 4 right angle corners! A book cover is a rectangle, an orange is a sphere, a pencil is a cylinder.' },
    render: (lp, ctx) => (
      <div className="fws-qcard fws-s4">
        <AchievementBadge icon="🌟" label="FIND THE SQUARE" color="#f59e0b" />
        <p className="fws-qtext">Which object has a SQUARE shaped face?</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 12, margin: '14px 0', fontSize: '3rem', flexWrap: 'wrap' }}>
          {['🍊', '📚', '🎲', '✏️'].map((e, i) => (
            <motion.span key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i * 0.1, type: 'spring' }}
              style={{ padding: '10px 16px', background: '#f8fafc', borderRadius: 12, border: '2px solid #e2e8f0' }}
            >{e}</motion.span>
          ))}
        </div>
        <div className="fws-opts">
          {ctx.shuffledOpts.map(([v, d], i) => (
            <FWSOption key={v} value={v} displayText={d} letterIdx={i} onClick={() => lp.handleMcq('sq_q9', v)} className={lp.getMcqClass('sq_q9', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'sq_q10',
    // Drawing question: given top side (3 units), complete the square 3×3
    // Grid: 7 cols × 7 rows; square corners at (2,1),(5,1),(5,4),(2,4)
    // Given: top side {c1:2,r1:1,c2:5,r2:1}
    // Expected: right {c1:5,r1:1,c2:5,r2:4}, bottom {c1:2,r1:4,c2:5,r2:4}, left {c1:2,r1:1,c2:2,r2:4}
    meta: {
      type: 'draw',
      expectedLines: [
        { c1: 5, r1: 1, c2: 5, r2: 4 },
        { c1: 2, r1: 4, c2: 5, r2: 4 },
        { c1: 2, r1: 1, c2: 2, r2: 4 },
      ],
      correctLabel: 'Square complete!',
      explanation: 'Perfect! A square has all 4 sides equal and 4 square corners. The top side was given — you drew the right, bottom, and left sides to complete it!',
    },
    render: (lp) => (
      <div className="fws-qcard fws-s4">
        <AchievementBadge icon="✏️" label="DRAW A SQUARE!" color="#f59e0b" />
        <p className="fws-qtext">The top side of a square is given. Complete the square!</p>
        <DrawQuestion
          lp={lp}
          cols={8} rows={7} cellSize={32}
          givenLines={[{ c1: 2, r1: 1, c2: 5, r2: 1 }]}
          expectedLines={[
            { c1: 5, r1: 1, c2: 5, r2: 4 },
            { c1: 2, r1: 4, c2: 5, r2: 4 },
            { c1: 2, r1: 1, c2: 2, r2: 4 },
          ]}
          promptText="Remember: all 4 sides of a square are equal! Draw 3 more sides 👇"
        />
      </div>
    ),
  },
];

const Squares = () => {
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
  return <FWSPracticeTemplate skillId="FWS-04" skillName="Squares" questions={questions} questionMeta={questionMeta} logicProps={logicProps} />;
};

export default Squares;
