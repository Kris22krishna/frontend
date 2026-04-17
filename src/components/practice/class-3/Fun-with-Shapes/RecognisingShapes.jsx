import React, { useRef } from 'react';
import { useFWSLogic } from './useFWSLogic';
import FWSPracticeTemplate from './FWSPracticeTemplate';
import { FWSOption, FWSTFButtons, AchievementBadge, ShapeRow, ShapeCard, FWSMatchLayout, shuffle } from './FWSSharedComponents';
import './fun-with-shapes.css';

const QUESTION_POOL = [
  {
    id: 'rs_q1',
    options: [['Triangle','🔺 Triangle'],['Square','🟥 Square'],['Circle','⭕ Circle'],['Rectangle','▬ Rectangle']],
    meta: { type: 'mcq', qid: 'rs_q1', correct: 'Triangle', correctLabel: 'Triangle', explanation: 'A triangle has exactly 3 sides and 3 corners! You can spot triangles in rangoli patterns, kites, and mountains.' },
    render: (lp, ctx) => (
      <div className="fws-qcard fws-s1">
        <AchievementBadge icon="🔍" label="SHAPE SPOTTER" color="#ef4444" />
        <p className="fws-qtext">Which shape has exactly 3 sides and 3 corners?</p>
        <ShapeRow shapes={[
          { shape: 'triangle', color: '#ef4444', size: 80 },
          { shape: 'square', color: '#3a86ff', size: 80 },
          { shape: 'circle', color: '#22c55e', size: 80 },
          { shape: 'rectangle', color: '#f59e0b', size: 80 },
        ]} />
        <div className="fws-opts">
          {ctx.shuffledOpts.map(([v, d], i) => (
            <FWSOption key={v} value={v} displayText={d} letterIdx={i} onClick={() => lp.handleMcq('rs_q1', v)} className={lp.getMcqClass('rs_q1', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'rs_q2',
    options: [['0','0 — None!'],['2','2 corners'],['4','4 corners'],['3','3 corners']],
    meta: { type: 'mcq', qid: 'rs_q2', correct: '0', correctLabel: '0', explanation: 'A circle is perfectly round with NO corners at all! That\'s what makes it special.' },
    render: (lp, ctx) => (
      <div className="fws-qcard fws-s1">
        <AchievementBadge icon="⭕" label="CIRCLE QUEST" color="#22c55e" />
        <p className="fws-qtext">How many corners does a circle have?</p>
        <div style={{ display: 'flex', justifyContent: 'center', margin: '14px 0' }}>
          <ShapeCard shape="circle" color="#22c55e" size={120} />
        </div>
        <div className="fws-opts">
          {ctx.shuffledOpts.map(([v, d], i) => (
            <FWSOption key={v} value={v} displayText={d} letterIdx={i} onClick={() => lp.handleMcq('rs_q2', v)} className={lp.getMcqClass('rs_q2', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'rs_q3',
    meta: { type: 'tf', qid: 'rs_q3_tf', correct: true, correctLabel: 'True', explanation: 'Yes! A square has 4 sides that are ALL equal in length. That\'s the special property of a square!' },
    render: (lp) => (
      <div className="fws-qcard fws-s1">
        <AchievementBadge icon="🎯" label="TRUE OR FALSE?" color="#7c3aed" />
        <p className="fws-qtext">A square has 4 sides that are ALL equal. True or False?</p>
        <div style={{ display: 'flex', justifyContent: 'center', margin: '14px 0' }}>
          <ShapeCard shape="square" color="#3a86ff" size={120} />
        </div>
        <FWSTFButtons qid="rs_q3_tf" lp={lp} />
      </div>
    ),
  },
  {
    id: 'rs_q4',
    options: [['Circle','⭕ Circle'],['Square','🟥 Square'],['Triangle','🔺 Triangle'],['Rectangle','▬ Rectangle']],
    meta: { type: 'mcq', qid: 'rs_q4', correct: 'Circle', correctLabel: 'Circle', explanation: 'A coin is circular — perfectly round with no corners! Bangles, plates, and wheels are also circles.' },
    render: (lp, ctx) => (
      <div className="fws-qcard fws-s1">
        <AchievementBadge icon="🪙" label="REAL LIFE SHAPES" color="#f59e0b" />
        <p className="fws-qtext">What shape is the face of a coin?</p>
        <div style={{ fontSize: '6rem', textAlign: 'center', margin: '10px 0' }}>🪙</div>
        <div className="fws-opts">
          {ctx.shuffledOpts.map(([v, d], i) => (
            <FWSOption key={v} value={v} displayText={d} letterIdx={i} onClick={() => lp.handleMcq('rs_q4', v)} className={lp.getMcqClass('rs_q4', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'rs_q5',
    options: [['3','3 sides'],['4','4 sides'],['5','5 sides'],['6','6 sides']],
    meta: { type: 'mcq', qid: 'rs_q5', correct: '4', correctLabel: '4', explanation: 'A rectangle has 4 sides! Two long sides and two short sides — and all 4 corners are right angles.' },
    render: (lp, ctx) => (
      <div className="fws-qcard fws-s1">
        <AchievementBadge icon="▬" label="RECTANGLE RANGER" color="#3a86ff" />
        <p className="fws-qtext">How many sides does a rectangle have?</p>
        <div style={{ display: 'flex', justifyContent: 'center', margin: '14px 0' }}>
          <ShapeCard shape="rectangle" color="#3a86ff" size={120} />
        </div>
        <div className="fws-opts">
          {ctx.shuffledOpts.map(([v, d], i) => (
            <FWSOption key={v} value={v} displayText={d} letterIdx={i} onClick={() => lp.handleMcq('rs_q5', v)} className={lp.getMcqClass('rs_q5', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'rs_q6',
    meta: { type: 'tf', qid: 'rs_q6_tf', correct: false, correctLabel: 'False', explanation: 'A triangle has only 3 corners, not 4! Remember: triangle = 3 sides + 3 corners.' },
    render: (lp) => (
      <div className="fws-qcard fws-s1">
        <AchievementBadge icon="🎯" label="TRUE OR FALSE?" color="#7c3aed" />
        <p className="fws-qtext">A triangle has 4 corners. True or False?</p>
        <div style={{ display: 'flex', justifyContent: 'center', margin: '14px 0' }}>
          <ShapeCard shape="triangle" color="#ef4444" size={120} />
        </div>
        <FWSTFButtons qid="rs_q6_tf" lp={lp} />
      </div>
    ),
  },
  {
    id: 'rs_q7',
    options: [['Square','🟥 Square'],['Rectangle','▬ Rectangle'],['Triangle','🔺 Triangle'],['Circle','⭕ Circle']],
    meta: { type: 'mcq', qid: 'rs_q7', correct: 'Square', correctLabel: 'Square', explanation: 'A square has 4 corners AND all 4 sides are equal — that\'s what makes it different from a rectangle!' },
    render: (lp, ctx) => (
      <div className="fws-qcard fws-s1">
        <AchievementBadge icon="🏆" label="SHAPE CHAMPION" color="#f59e0b" />
        <p className="fws-qtext">I have 4 corners and ALL my sides are equal. What shape am I?</p>
        <ShapeRow shapes={[
          { shape: 'square', color: '#3a86ff', size: 76, label: '?' },
          { shape: 'rectangle', color: '#22c55e', size: 76, label: '?' },
          { shape: 'triangle', color: '#ef4444', size: 76, label: '?' },
          { shape: 'circle', color: '#f59e0b', size: 76, label: '?' },
        ]} />
        <div className="fws-opts">
          {ctx.shuffledOpts.map(([v, d], i) => (
            <FWSOption key={v} value={v} displayText={d} letterIdx={i} onClick={() => lp.handleMcq('rs_q7', v)} className={lp.getMcqClass('rs_q7', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'rs_q8',
    options: [['Circle','⭕ Circle'],['Square','🟥 Square'],['Triangle','🔺 Triangle'],['Rectangle','▬ Rectangle']],
    meta: { type: 'mcq', qid: 'rs_q8', correct: 'Circle', correctLabel: 'Circle', explanation: 'A circle has NO corners and NO straight sides — it is completely round! That\'s why we say circles have 0 corners.' },
    render: (lp, ctx) => (
      <div className="fws-qcard fws-s1">
        <AchievementBadge icon="🌟" label="NO CORNERS CLUB" color="#06b6d4" />
        <p className="fws-qtext">Which shape has NO corners and NO straight sides?</p>
        <ShapeRow shapes={[
          { shape: 'circle', color: '#22c55e', size: 76 },
          { shape: 'square', color: '#3a86ff', size: 76 },
          { shape: 'triangle', color: '#ef4444', size: 76 },
          { shape: 'rectangle', color: '#f59e0b', size: 76 },
        ]} />
        <div className="fws-opts">
          {ctx.shuffledOpts.map(([v, d], i) => (
            <FWSOption key={v} value={v} displayText={d} letterIdx={i} onClick={() => lp.handleMcq('rs_q8', v)} className={lp.getMcqClass('rs_q8', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'rs_q9',
    meta: { type: 'tf', qid: 'rs_q9_tf', correct: true, correctLabel: 'True', explanation: 'Yes! In a rectangle, the opposite sides are equal — the two long sides are equal and the two short sides are equal.' },
    render: (lp) => (
      <div className="fws-qcard fws-s1">
        <AchievementBadge icon="🎯" label="TRUE OR FALSE?" color="#7c3aed" />
        <p className="fws-qtext">In a rectangle, the OPPOSITE sides are equal. True or False?</p>
        <div style={{ display: 'flex', justifyContent: 'center', margin: '14px 0' }}>
          <ShapeCard shape="rectangle" color="#3a86ff" size={120} />
        </div>
        <FWSTFButtons qid="rs_q9_tf" lp={lp} />
      </div>
    ),
  },
  {
    id: 'rs_q10',
    matchAnswers: { rs_match10: { 'rs_m_tri': '3', 'rs_m_sq': '4 equal', 'rs_m_cir': '0', 'rs_m_rect': '4 (opposite equal)' } },
    rightItems: [['3', '3 sides & corners'], ['4 equal', 'All 4 sides equal'], ['0', 'No corners!'], ['4 (opposite equal)', 'Opposite sides equal']],
    meta: { type: 'match', totalPairs: 4, explanation: 'Triangle→3, Square→all 4 equal, Circle→0 corners, Rectangle→opposite sides equal.', correctLabel: 'All shapes matched!' },
    render: (lp, ctx) => (
      <div className="fws-qcard fws-s1">
        <AchievementBadge icon="🔗" label="SHAPE MATCH!" color="#7c3aed" />
        <p className="fws-qtext">Match each shape to its property!</p>
        <FWSMatchLayout
          matchId="rs_match10"
          leftItems={[['rs_m_tri','🔺 Triangle'],['rs_m_sq','🟥 Square'],['rs_m_cir','⭕ Circle'],['rs_m_rect','▬ Rectangle']]}
          shuffledRight={ctx.shuffledRight}
          lp={lp}
        />
      </div>
    ),
  },
  {
    id: 'rs_q11',
    options: [['Same','Same'],['Different','Different']],
    meta: { type: 'mcq', qid: 'rs_q11', correct: 'Different', correctLabel: 'Different', explanation: 'A square has 4 corners and a triangle has 3 corners. So they are different! But both have straight edges.' },
    render: (lp, ctx) => (
      <div className="fws-qcard fws-s1">
        <AchievementBadge icon="👀" label="SHAPE DETECTIVE" color="#ef4444" />
        <p className="fws-qtext">Look at a square and a triangle. Their corners are:</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 24, margin: '14px 0' }}>
          <ShapeCard shape="square" color="#ef4444" size={80} />
          <ShapeCard shape="triangle" color="#22c55e" size={80} />
        </div>
        <div className="fws-opts">
          {ctx.shuffledOpts.map(([v, d], i) => (
            <FWSOption key={v} value={v} displayText={d} letterIdx={i} onClick={() => lp.handleMcq('rs_q11', v)} className={lp.getMcqClass('rs_q11', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'rs_q12',
    options: [['Same','Same'],['Different','Different']],
    meta: { type: 'mcq', qid: 'rs_q12', correct: 'Different', correctLabel: 'Different', explanation: 'A square has 4 sides and a triangle has 3 sides. Their number of sides is different!' },
    render: (lp, ctx) => (
      <div className="fws-qcard fws-s1">
        <AchievementBadge icon="👀" label="SHAPE DETECTIVE" color="#3a86ff" />
        <p className="fws-qtext">Look at a square and a triangle. Their number of sides is:</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 24, margin: '14px 0' }}>
          <ShapeCard shape="square" color="#ef4444" size={80} />
          <ShapeCard shape="triangle" color="#22c55e" size={80} />
        </div>
        <div className="fws-opts">
          {ctx.shuffledOpts.map(([v, d], i) => (
            <FWSOption key={v} value={v} displayText={d} letterIdx={i} onClick={() => lp.handleMcq('rs_q12', v)} className={lp.getMcqClass('rs_q12', v)} />
          ))}
        </div>
      </div>
    ),
  },
];

const RecognisingShapes = () => {
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
  return <FWSPracticeTemplate skillId="FWS-01" skillName="Recognising Basic Shapes" questions={questions} questionMeta={questionMeta} logicProps={logicProps} />;
};

export default RecognisingShapes;
