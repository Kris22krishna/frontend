import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { useFWSLogic } from './useFWSLogic';
import FWSPracticeTemplate from './FWSPracticeTemplate';
import { FWSOption, FWSTFButtons, AchievementBadge, ShapeCard, ShapeCountGrid, FWSMatchLayout, shuffle } from './FWSSharedComponents';
import './fun-with-shapes.css';

const QUESTION_POOL = [
  {
    id: 'tri_q1',
    options: [['2','2 sides'],['3','3 sides'],['4','4 sides'],['5','5 sides']],
    meta: { type: 'mcq', qid: 'tri_q1', correct: '3', correctLabel: '3', explanation: 'A triangle always has exactly 3 sides! The word "tri" means three — triangle = three angles = three sides.' },
    render: (lp, ctx) => (
      <div className="fws-qcard fws-s6">
        <AchievementBadge icon="🔺" label="TRIANGLE TREK" color="#ff7c2a" />
        <p className="fws-qtext">🔺 How many sides does a triangle have?</p>
        <div style={{ display: 'flex', justifyContent: 'center', margin: '12px 0' }}>
          <ShapeCard shape="triangle" color="#ff7c2a" size={100} />
        </div>
        <div className="fws-opts">
          {ctx.shuffledOpts.map(([v, d], i) => (
            <FWSOption key={v} value={v} displayText={d} letterIdx={i} onClick={() => lp.handleMcq('tri_q1', v)} className={lp.getMcqClass('tri_q1', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'tri_q2',
    options: [['2','2 corners'],['3','3 corners'],['4','4 corners'],['5','5 corners']],
    meta: { type: 'mcq', qid: 'tri_q2', correct: '3', correctLabel: '3', explanation: 'A triangle has exactly 3 corners (also called vertices). One corner at the top and two at the base — always 3!' },
    render: (lp, ctx) => (
      <div className="fws-qcard fws-s6">
        <AchievementBadge icon="📍" label="COUNT THE CORNERS" color="#ff7c2a" />
        <p className="fws-qtext">📍 How many corners does a triangle have?</p>
        <div style={{ display: 'flex', justifyContent: 'center', margin: '12px 0' }}>
          <ShapeCard shape="triangle" color="#ff7c2a" size={100} />
        </div>
        <div className="fws-opts">
          {ctx.shuffledOpts.map(([v, d], i) => (
            <FWSOption key={v} value={v} displayText={d} letterIdx={i} onClick={() => lp.handleMcq('tri_q2', v)} className={lp.getMcqClass('tri_q2', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'tri_q3',
    meta: { type: 'tf', qid: 'tri_q3_tf', correct: false, correctLabel: 'False', explanation: 'NOT all triangles have equal sides! There are different types — equilateral (all equal), isosceles (two equal), and scalene (no equal). But ALL triangles have 3 sides!' },
    render: (lp) => (
      <div className="fws-qcard fws-s6">
        <AchievementBadge icon="🎯" label="TRUE OR FALSE?" color="#7c3aed" />
        <p className="fws-qtext">🔺 All triangles have equal sides. True or False?</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 16, margin: '12px 0', flexWrap: 'wrap' }}>
          <ShapeCard shape="triangle" color="#ef4444" size={64} label="Equilateral" />
          <ShapeCard shape="triangle" color="#3a86ff" size={64} label="Isosceles" />
          <ShapeCard shape="triangle" color="#22c55e" size={64} label="Scalene" />
        </div>
        <FWSTFButtons qid="tri_q3_tf" lp={lp} />
      </div>
    ),
  },
  {
    id: 'tri_q4',
    options: [['Circle','⭕ Circle'],['Rectangle','▬ Rectangle'],['Triangle','🔺 Triangle'],['Square','🟥 Square']],
    meta: { type: 'mcq', qid: 'tri_q4', correct: 'Triangle', correctLabel: 'Triangle', explanation: 'A pizza slice is shaped like a triangle! It has 2 straight sides (the cuts) and 1 curved side (the crust edge), but we count it as triangular.' },
    render: (lp, ctx) => (
      <div className="fws-qcard fws-s6">
        <AchievementBadge icon="🍕" label="PIZZA SHAPES" color="#ff7c2a" />
        <p className="fws-qtext">🍕 What shape is a pizza slice?</p>
        <div style={{ fontSize: '4rem', textAlign: 'center', margin: '10px 0' }}>🍕</div>
        <div className="fws-opts">
          {ctx.shuffledOpts.map(([v, d], i) => (
            <FWSOption key={v} value={v} displayText={d} letterIdx={i} onClick={() => lp.handleMcq('tri_q4', v)} className={lp.getMcqClass('tri_q4', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'tri_q5',
    options: [['3','3 triangles'],['4','4 triangles'],['5','5 triangles'],['6','6 triangles']],
    meta: { type: 'mcq', qid: 'tri_q5', correct: '4', correctLabel: '4', explanation: 'Count carefully — there are 4 triangles in the figure! Always look for both small and large triangles.' },
    render: (lp, ctx) => (
      <div className="fws-qcard fws-s6">
        <AchievementBadge icon="🔍" label="TRIANGLE HUNT!" color="#ff7c2a" />
        <p className="fws-qtext">🔍 Count all the triangles you can see!</p>
        <ShapeCountGrid shapes={[
          { shape: 'triangle', color: '#ef4444' },
          { shape: 'triangle', color: '#f59e0b' },
          { shape: 'triangle', color: '#3a86ff' },
          { shape: 'triangle', color: '#22c55e' },
        ]} />
        <div className="fws-opts">
          {ctx.shuffledOpts.map(([v, d], i) => (
            <FWSOption key={v} value={v} displayText={d} letterIdx={i} onClick={() => lp.handleMcq('tri_q5', v)} className={lp.getMcqClass('tri_q5', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'tri_q6',
    meta: { type: 'tf', qid: 'tri_q6_tf', correct: true, correctLabel: 'True', explanation: 'YES! A triangle has 3 sides, while a rectangle has 4 sides. So a triangle has FEWER sides — 3 < 4!' },
    render: (lp) => (
      <div className="fws-qcard fws-s6">
        <AchievementBadge icon="🎯" label="TRUE OR FALSE?" color="#7c3aed" />
        <p className="fws-qtext">🔺 A triangle has FEWER sides than a rectangle. True or False?</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 24, margin: '12px 0', flexWrap: 'wrap' }}>
          <ShapeCard shape="triangle" color="#ff7c2a" size={72} label="Triangle (3 sides)" />
          <ShapeCard shape="rectangle" color="#3a86ff" size={72} label="Rectangle (4 sides)" />
        </div>
        <FWSTFButtons qid="tri_q6_tf" lp={lp} />
      </div>
    ),
  },
  {
    id: 'tri_q7',
    options: [['2 Squares','2 Squares 🟥🟥'],['2 Triangles','2 Triangles 🔺🔺'],['2 Circles','2 Circles ⭕⭕'],['2 Rectangles','2 Rectangles ▬▬']],
    meta: { type: 'mcq', qid: 'tri_q7', correct: '2 Triangles', correctLabel: '2 Triangles', explanation: 'When you draw a diagonal line across a rectangle, you cut it into 2 triangles! Try it on paper.' },
    render: (lp, ctx) => (
      <div className="fws-qcard fws-s6">
        <AchievementBadge icon="✂️" label="SHAPE CUTTER" color="#ff7c2a" />
        <p className="fws-qtext">✂️ Cut a rectangle diagonally — what 2 shapes do you get?</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 12, margin: '12px 0', alignItems: 'center' }}>
          <ShapeCard shape="rectangle" color="#3a86ff" size={80} label="Rectangle" />
          <span style={{ fontSize: '1.5rem', color: '#64748b' }}>→</span>
          <ShapeCard shape="triangle" color="#ff7c2a" size={60} label="?" />
          <span style={{ fontSize: '1.2rem', color: '#64748b' }}>+</span>
          <ShapeCard shape="triangle" color="#ff7c2a" size={60} label="?" />
        </div>
        <div className="fws-opts">
          {ctx.shuffledOpts.map(([v, d], i) => (
            <FWSOption key={v} value={v} displayText={d} letterIdx={i} onClick={() => lp.handleMcq('tri_q7', v)} className={lp.getMcqClass('tri_q7', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'tri_q8',
    options: [['Circle','⭕ Circle'],['Square','🟥 Square'],['Triangle','🔺 Triangle'],['Rectangle','▬ Rectangle']],
    meta: { type: 'mcq', qid: 'tri_q8', correct: 'Triangle', correctLabel: 'Triangle', explanation: 'A mountain peak looks like a triangle — it comes to a point at the top! Rooftops, flags, and dunce caps are also triangular.' },
    render: (lp, ctx) => (
      <div className="fws-qcard fws-s6">
        <AchievementBadge icon="⛰️" label="REAL LIFE SHAPES" color="#f59e0b" />
        <p className="fws-qtext">⛰️ What shape does a mountain peak look like?</p>
        <div style={{ fontSize: '4rem', textAlign: 'center', margin: '10px 0' }}>⛰️</div>
        <div className="fws-opts">
          {ctx.shuffledOpts.map(([v, d], i) => (
            <FWSOption key={v} value={v} displayText={d} letterIdx={i} onClick={() => lp.handleMcq('tri_q8', v)} className={lp.getMcqClass('tri_q8', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'tri_q9',
    meta: { type: 'tf', qid: 'tri_q9_tf', correct: true, correctLabel: 'True', explanation: 'YES! Draw a diagonal line from corner to corner of a rectangle and you get 2 triangles. This is a great way to make triangles!' },
    render: (lp) => (
      <div className="fws-qcard fws-s6">
        <AchievementBadge icon="🎯" label="TRUE OR FALSE?" color="#7c3aed" />
        <p className="fws-qtext">▬ You can split a rectangle into 2 triangles. True or False?</p>
        <FWSTFButtons qid="tri_q9_tf" lp={lp} />
      </div>
    ),
  },
  {
    id: 'tri_q10',
    matchAnswers: { tri_match10: { 'tri_m_sides': '3_sides', 'tri_m_corners': '3_corners', 'tri_m_pizza': 'Triangle_pizza', 'tri_m_mountain': 'Triangle_mountain' } },
    rightItems: [['3_sides','3 sides/corners'],['3_corners','Three'],['Triangle_pizza','Triangle shape'],['Triangle_mountain','Triangular']],
    meta: { type: 'match', totalPairs: 4, explanation: 'Triangle: 3 sides, 3 corners, pizza slice shape, mountain peak shape!', correctLabel: 'All matched!' },
    render: (lp, ctx) => (
      <div className="fws-qcard fws-s6">
        <AchievementBadge icon="🔗" label="TRIANGLE MATCH!" color="#ff7c2a" />
        <p className="fws-qtext">🎯 Match triangle facts to their answers!</p>
        <FWSMatchLayout
          matchId="tri_match10"
          leftItems={[['tri_m_sides','How many sides?'],['tri_m_corners','How many corners?'],['tri_m_pizza','🍕 Pizza slice shape?'],['tri_m_mountain','⛰️ Mountain peak shape?']]}
          shuffledRight={ctx.shuffledRight}
          lp={lp}
        />
      </div>
    ),
  },
  {
    id: 'tri_q11',
    options: [['12','12 triangles'],['14','14 triangles'],['16','16 triangles'],['18','18 triangles']],
    meta: { type: 'mcq', qid: 'tri_q11', correct: '16', correctLabel: '16', explanation: 'There are 16 triangles total! 4 small yellow triangles in the middle, 4 blue ones around them, 4 red triangles on the outside, and 4 more hiding inside the larger square patterns.' },
    render: (lp, ctx) => (
      <div className="fws-qcard fws-s6">
        <AchievementBadge icon="🎨" label="RANGOLI MASTER" color="#ff7c2a" />
        <p className="fws-qtext">Count the number of triangles in the given rangoli.</p>
        <div style={{ display: 'flex', justifyContent: 'center', margin: '14px 0' }}>
          <svg width="150" height="150" viewBox="0 0 200 200" style={{ background: '#f8fafc', borderRadius: 12 }}>
            <polygon points="100,10 170,80 190,100 170,120 100,190 30,120 10,100 30,80" fill="#22c55e" />
            <polygon points="30,80 100,10 100,80" fill="#ef4444" />
            <polygon points="100,10 170,80 100,80" fill="#ef4444" />
            <polygon points="170,120 100,190 100,120" fill="#ef4444" />
            <polygon points="100,190 30,120 100,120" fill="#ef4444" />
            <rect x="50" y="50" width="100" height="100" fill="none" stroke="black" strokeWidth="2" />
            <polygon points="50,50 100,50 50,100" fill="#3b82f6" stroke="black" />
            <polygon points="100,50 150,50 150,100" fill="#3b82f6" stroke="black" />
            <polygon points="150,100 150,150 100,150" fill="#3b82f6" stroke="black" />
            <polygon points="50,100 100,150 50,150" fill="#3b82f6" stroke="black" />
            <polygon points="100,50 150,100 100,150 50,100" fill="#eab308" stroke="black" />
            <line x1="100" y1="50" x2="100" y2="150" stroke="black" strokeWidth="2" />
            <line x1="50" y1="100" x2="150" y2="100" stroke="black" strokeWidth="2" />
          </svg>
        </div>
        <div className="fws-opts">
          {ctx.shuffledOpts.map(([v, d], i) => (
            <FWSOption key={v} value={v} displayText={d} letterIdx={i} onClick={() => lp.handleMcq('tri_q11', v)} className={lp.getMcqClass('tri_q11', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'tri_q12',
    options: [['2','2'],['3','3'],['4','4'],['6','6']],
    meta: { type: 'mcq', qid: 'tri_q12', correct: '4', correctLabel: '4', explanation: 'You can make 4 different triangles by connecting any 3 dots! Go ahead, try drawing them on paper.' },
    render: (lp, ctx) => (
      <div className="fws-qcard fws-s6">
        <AchievementBadge icon="🔵" label="DOT CONNECTOR" color="#3b82f6" />
        <p className="fws-qtext">How many different triangles can be made using the dots on this circle?</p>
        <div style={{ display: 'flex', justifyContent: 'center', margin: '14px 0' }}>
          <svg width="150" height="150" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="40" fill="none" stroke="black" strokeWidth="2" />
            <circle cx="50" cy="10" r="4" fill="black" />
            <circle cx="90" cy="50" r="4" fill="black" />
            <circle cx="50" cy="90" r="4" fill="black" />
            <circle cx="10" cy="50" r="4" fill="black" />
          </svg>
        </div>
        <div className="fws-opts">
          {ctx.shuffledOpts.map(([v, d], i) => (
            <FWSOption key={v} value={v} displayText={d} letterIdx={i} onClick={() => lp.handleMcq('tri_q12', v)} className={lp.getMcqClass('tri_q12', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'tri_q13',
    options: [['Move to center','Move 2 matchsticks inside to make a small triangle'], ['Remove them','Take them away completely'], ['Break in half','Break them in half'], ['Stack them','Stack them on top of each other']],
    meta: { type: 'mcq', qid: 'tri_q13', correct: 'Move to center', correctLabel: 'Move 2 matchsticks inside to make a small triangle', explanation: 'By moving 2 matchsticks from one corner and placing them inside, you can cut the shape into two triangles! It\'s a fun brain teaser.' },
    render: (lp, ctx) => (
      <div className="fws-qcard fws-s6">
        <AchievementBadge icon="🧩" label="MATCHSTICK PUZZLE" color="#eab308" />
        <p className="fws-qtext">Move two matchsticks to turn the one triangle (made of 6 matchsticks) into two triangles. What do you do?</p>
        <div style={{ display: 'flex', justifyContent: 'center', margin: '14px 0' }}>
          <svg width="150" height="130" viewBox="0 0 100 100">
            {/* Left side matchsticks */}
            <line x1="50" y1="10" x2="30" y2="50" stroke="#b45309" strokeWidth="4" strokeLinecap="round" />
            <line x1="30" y1="50" x2="10" y2="90" stroke="#b45309" strokeWidth="4" strokeLinecap="round" />
            {/* Right side matchsticks */}
            <line x1="50" y1="10" x2="70" y2="50" stroke="#b45309" strokeWidth="4" strokeLinecap="round" />
            <line x1="70" y1="50" x2="90" y2="90" stroke="#b45309" strokeWidth="4" strokeLinecap="round" />
            {/* Bottom matchsticks */}
            <line x1="10" y1="90" x2="50" y2="90" stroke="#b45309" strokeWidth="4" strokeLinecap="round" />
            <line x1="50" y1="90" x2="90" y2="90" stroke="#b45309" strokeWidth="4" strokeLinecap="round" />
            {/* Matchstick heads */}
            <circle cx="50" cy="10" r="3" fill="#ea580c" />
            <circle cx="30" cy="50" r="3" fill="#ea580c" />
            <circle cx="70" cy="50" r="3" fill="#ea580c" />
            <circle cx="10" cy="90" r="3" fill="#ea580c" />
            <circle cx="50" cy="90" r="3" fill="#ea580c" />
            <circle cx="90" cy="90" r="3" fill="#ea580c" />
          </svg>
        </div>
        <div className="fws-opts">
          {ctx.shuffledOpts.map(([v, d], i) => (
            <FWSOption key={v} value={v} displayText={d} letterIdx={i} onClick={() => lp.handleMcq('tri_q13', v)} className={lp.getMcqClass('tri_q13', v)} />
          ))}
        </div>
      </div>
    ),
  },
];

const Triangles = () => {
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
  return <FWSPracticeTemplate skillId="FWS-06" skillName="Triangles" questions={questions} questionMeta={questionMeta} logicProps={logicProps} />;
};

export default Triangles;
