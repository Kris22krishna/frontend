import React, { useRef } from 'react';
import { useFWSLogic } from './useFWSLogic';
import FWSPracticeTemplate from './FWSPracticeTemplate';
import { FWSOption, FWSTFButtons, AchievementBadge, ShapeCard, DotGrid, FWSMatchLayout, DrawQuestion, shuffle } from './FWSSharedComponents';
import './fun-with-shapes.css';

const QUESTION_POOL = [
  {
    id: 'rect_q1',
    options: [['2','2 sides'],['3','3 sides'],['4','4 sides'],['6','6 sides']],
    meta: { type: 'mcq', qid: 'rect_q1', correct: '4', correctLabel: '4', explanation: 'A rectangle always has 4 sides — 2 long sides and 2 short sides. Count them next time on your notebook!' },
    render: (lp, ctx) => (
      <div className="fws-qcard fws-s3">
        <AchievementBadge icon="▬" label="RECTANGLE RANGER" color="#3a86ff" />
        <p className="fws-qtext">How many sides does a rectangle have?</p>
        <div style={{ display: 'flex', justifyContent: 'center', margin: '14px 0' }}>
          <ShapeCard shape="rectangle" color="#3a86ff" size={120} />
        </div>
        <div className="fws-opts">
          {ctx.shuffledOpts.map(([v, d], i) => (
            <FWSOption key={v} value={v} displayText={d} letterIdx={i} onClick={() => lp.handleMcq('rect_q1', v)} className={lp.getMcqClass('rect_q1', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'rect_q2',
    options: [['2','2 corners'],['3','3 corners'],['4','4 corners'],['6','6 corners']],
    meta: { type: 'mcq', qid: 'rect_q2', correct: '4', correctLabel: '4', explanation: 'A rectangle has exactly 4 corners, and every corner is a right angle (square corner = 90°)!' },
    render: (lp, ctx) => (
      <div className="fws-qcard fws-s3">
        <AchievementBadge icon="📐" label="CORNER COUNT" color="#3a86ff" />
        <p className="fws-qtext">How many corners does a rectangle have?</p>
        <div style={{ display: 'flex', justifyContent: 'center', margin: '14px 0' }}>
          <ShapeCard shape="rectangle" color="#3a86ff" size={120} />
        </div>
        <div className="fws-opts">
          {ctx.shuffledOpts.map(([v, d], i) => (
            <FWSOption key={v} value={v} displayText={d} letterIdx={i} onClick={() => lp.handleMcq('rect_q2', v)} className={lp.getMcqClass('rect_q2', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'rect_q3',
    meta: { type: 'tf', qid: 'rect_q3_tf', correct: false, correctLabel: 'False', explanation: 'NOT all sides of a rectangle are equal! Only the OPPOSITE sides are equal — the two long sides are equal and the two short sides are equal.' },
    render: (lp) => (
      <div className="fws-qcard fws-s3">
        <AchievementBadge icon="🎯" label="TRUE OR FALSE?" color="#7c3aed" />
        <p className="fws-qtext">All 4 sides of a rectangle are equal. True or False?</p>
        <div style={{ display: 'flex', justifyContent: 'center', margin: '14px 0' }}>
          <ShapeCard shape="rectangle" color="#3a86ff" size={120} />
        </div>
        <FWSTFButtons qid="rect_q3_tf" lp={lp} />
      </div>
    ),
  },
  {
    id: 'rect_q4',
    options: [['All sides equal','All 4 sides equal'],['Opposite sides equal','Opposite sides equal'],['Adjacent sides equal','Adjacent sides equal'],['No sides equal','No sides equal']],
    meta: { type: 'mcq', qid: 'rect_q4', correct: 'Opposite sides equal', correctLabel: 'Opposite sides equal', explanation: 'In a rectangle, OPPOSITE sides are equal — top = bottom length, left = right length. It\'s like a door or window!' },
    render: (lp, ctx) => (
      <div className="fws-qcard fws-s3">
        <AchievementBadge icon="📏" label="SIDE PROPERTY" color="#3a86ff" />
        <p className="fws-qtext">Which sides of a rectangle are equal?</p>
        <div style={{ display: 'flex', justifyContent: 'center', margin: '14px 0' }}>
          <ShapeCard shape="rectangle" color="#3a86ff" size={120} />
        </div>
        <div className="fws-opts">
          {ctx.shuffledOpts.map(([v, d], i) => (
            <FWSOption key={v} value={v} displayText={d} letterIdx={i} onClick={() => lp.handleMcq('rect_q4', v)} className={lp.getMcqClass('rect_q4', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'rect_q5',
    meta: { type: 'tf', qid: 'rect_q5_tf', correct: true, correctLabel: 'True', explanation: 'YES! Every corner of a rectangle is a right angle (90°). That\'s one of the most important properties of a rectangle!' },
    render: (lp) => (
      <div className="fws-qcard fws-s3">
        <AchievementBadge icon="🎯" label="TRUE OR FALSE?" color="#7c3aed" />
        <p className="fws-qtext">A rectangle has 4 right angle (square) corners. True or False?</p>
        <div style={{ display: 'flex', justifyContent: 'center', margin: '14px 0' }}>
          <ShapeCard shape="rectangle" color="#3a86ff" size={120} />
        </div>
        <FWSTFButtons qid="rect_q5_tf" lp={lp} />
      </div>
    ),
  },
  {
    id: 'rect_q6',
    options: [['Square','🟥 Square'],['Circle','⭕ Circle'],['Triangle','🔺 Triangle'],['Rectangle','▬ Rectangle']],
    meta: { type: 'mcq', qid: 'rect_q6', correct: 'Rectangle', correctLabel: 'Rectangle', explanation: 'A door is shaped like a rectangle — it is taller than it is wide, with 4 corners and 4 sides where opposite sides are equal!' },
    render: (lp, ctx) => (
      <div className="fws-qcard fws-s3">
        <AchievementBadge icon="🚪" label="REAL LIFE SHAPES" color="#f59e0b" />
        <p className="fws-qtext">What shape is a door?</p>
        <div style={{ fontSize: '6rem', textAlign: 'center', margin: '10px 0' }}>🚪</div>
        <div className="fws-opts">
          {ctx.shuffledOpts.map(([v, d], i) => (
            <FWSOption key={v} value={v} displayText={d} letterIdx={i} onClick={() => lp.handleMcq('rect_q6', v)} className={lp.getMcqClass('rect_q6', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'rect_q7',
    options: [['1 pair','1 pair'],['2 pairs','2 pairs'],['3 pairs','3 pairs'],['4 pairs','4 pairs']],
    meta: { type: 'mcq', qid: 'rect_q7', correct: '2 pairs', correctLabel: '2 pairs', explanation: 'A rectangle has 2 pairs of equal sides — one pair of long sides and one pair of short sides. 2 pairs = 4 sides total!' },
    render: (lp, ctx) => (
      <div className="fws-qcard fws-s3">
        <AchievementBadge icon="🔢" label="PAIRS PUZZLE" color="#3a86ff" />
        <p className="fws-qtext">How many PAIRS of equal sides does a rectangle have?</p>
        <div style={{ display: 'flex', justifyContent: 'center', margin: '14px 0' }}>
          <ShapeCard shape="rectangle" color="#3a86ff" size={120} />
        </div>
        <div className="fws-opts">
          {ctx.shuffledOpts.map(([v, d], i) => (
            <FWSOption key={v} value={v} displayText={d} letterIdx={i} onClick={() => lp.handleMcq('rect_q7', v)} className={lp.getMcqClass('rect_q7', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'rect_q8',
    meta: { type: 'tf', qid: 'rect_q8_tf', correct: true, correctLabel: 'True', explanation: 'YES! A square is a SPECIAL type of rectangle — it has all the rectangle properties PLUS all 4 sides are equal!' },
    render: (lp) => (
      <div className="fws-qcard fws-s3">
        <AchievementBadge icon="🎯" label="TRUE OR FALSE?" color="#7c3aed" />
        <p className="fws-qtext">A square is a special kind of rectangle. True or False?</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 24, margin: '14px 0', flexWrap: 'wrap' }}>
          <ShapeCard shape="rectangle" color="#3a86ff" size={90} label="Rectangle" />
          <ShapeCard shape="square" color="#f59e0b" size={90} label="Square" />
        </div>
        <FWSTFButtons qid="rect_q8_tf" lp={lp} />
      </div>
    ),
  },
  {
    id: 'rect_q9',
    // Drawing question: given top side (4 units wide), complete the rectangle 4 wide × 2 tall
    // Grid: 7 cols × 5 rows (indices 0–6, 0–4); rectangle corners at (1,1),(5,1),(5,3),(1,3)
    // Given: top side {c1:1,r1:1,c2:5,r2:1}
    // Expected: right {c1:5,r1:1,c2:5,r2:3}, bottom {c1:1,r1:3,c2:5,r2:3}, left {c1:1,r1:1,c2:1,r2:3}
    meta: {
      type: 'draw',
      expectedLines: [
        { c1: 5, r1: 1, c2: 5, r2: 3 },
        { c1: 1, r1: 3, c2: 5, r2: 3 },
        { c1: 1, r1: 1, c2: 1, r2: 3 },
      ],
      correctLabel: 'Rectangle complete!',
      explanation: 'Great job! A rectangle needs 4 sides with 4 square corners. The top side was given — you needed to draw the right side, bottom side, and left side to complete it!',
    },
    render: (lp) => (
      <div className="fws-qcard fws-s3">
        <AchievementBadge icon="✏️" label="DRAW IT!" color="#3a86ff" />
        <p className="fws-qtext">The top side of a rectangle is given. Complete the rectangle!</p>
        <DrawQuestion
          lp={lp}
          cols={7} rows={5} cellSize={34}
          givenLines={[{ c1: 1, r1: 1, c2: 5, r2: 1 }]}
          expectedLines={[
            { c1: 5, r1: 1, c2: 5, r2: 3 },
            { c1: 1, r1: 3, c2: 5, r2: 3 },
            { c1: 1, r1: 1, c2: 1, r2: 3 },
          ]}
          promptText="Draw the 3 missing sides — right side, bottom, and left side 👇"
        />
      </div>
    ),
  },
  {
    id: 'rect_q10',
    matchAnswers: { rect_match10: { 'rect_m_door': 'Rectangle_door', 'rect_m_note': 'Rectangle_note', 'rect_m_s4': '4', 'rect_m_opp': 'Opposite sides' } },
    rightItems: [['Rectangle_door','Rectangle shape'],['Rectangle_note','Rect. shape'],['4','4 corners'],['Opposite sides','Equal opposite sides']],
    meta: { type: 'match', totalPairs: 4, explanation: 'Door→Rectangle, Notebook→Rectangle, Corners→4, Equal sides→Opposite sides!', correctLabel: 'All matched!' },
    render: (lp, ctx) => (
      <div className="fws-qcard fws-s3">
        <AchievementBadge icon="🔗" label="RECTANGLE MATCH!" color="#3a86ff" />
        <p className="fws-qtext">Match the rectangle clue to its answer!</p>
        <FWSMatchLayout
          matchId="rect_match10"
          leftItems={[['rect_m_door','🚪 Door shape'],['rect_m_note','📓 Notebook shape'],['rect_m_s4','How many corners?'],['rect_m_opp','Which sides are equal?']]}
          shuffledRight={ctx.shuffledRight}
          lp={lp}
        />
      </div>
    ),
  },
  {
    id: 'rect_q11',
    options: [['7','7'],['8','8'],['9','9'],['10','10']],
    meta: { type: 'mcq', qid: 'rect_q11', correct: '9', correctLabel: '9', explanation: 'Count carefully! There are 5 small basic rectangles, 2 columns made of 2 small ones, 2 larger rectangles made of 2 columns, and 1 large outer rectangle. Depending on how you count, standard answers might vary, but identifying all combinations gives you 9 or 10. For this puzzle, we look for 9 main ones!' },
    render: (lp, ctx) => (
      <div className="fws-qcard fws-s3">
        <AchievementBadge icon="🧩" label="PUZZLE MASTER" color="#ef4444" />
        <p className="fws-qtext">Count and write the number of rectangles in the following picture.</p>
        <div style={{ display: 'flex', justifyContent: 'center', margin: '14px 0' }}>
          <svg width="240" height="150" viewBox="0 0 240 150" style={{ background: '#bde0fe', border: '2px solid black' }}>
            {/* Vertical lines */}
            <line x1="80" y1="0" x2="80" y2="150" stroke="black" strokeWidth="2" />
            <line x1="160" y1="0" x2="160" y2="150" stroke="black" strokeWidth="2" />
            {/* Horizontal lines */}
            <line x1="0" y1="95" x2="80" y2="95" stroke="black" strokeWidth="2" />
            <line x1="160" y1="70" x2="240" y2="70" stroke="black" strokeWidth="2" />
            <rect x="0" y="0" width="240" height="150" fill="none" stroke="black" strokeWidth="4" />
          </svg>
        </div>
        <div className="fws-opts">
          {ctx.shuffledOpts.map(([v, d], i) => (
            <FWSOption key={v} value={v} displayText={d} letterIdx={i} onClick={() => lp.handleMcq('rect_q11', v)} className={lp.getMcqClass('rect_q11', v)} />
          ))}
        </div>
      </div>
    ),
  },
];

const Rectangles = () => {
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
  return <FWSPracticeTemplate skillId="FWS-03" skillName="Rectangles" questions={questions} questionMeta={questionMeta} logicProps={logicProps} />;
};

export default Rectangles;
