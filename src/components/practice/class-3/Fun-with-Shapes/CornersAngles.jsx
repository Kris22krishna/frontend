import React, { useRef } from 'react';
import { useFWSLogic } from './useFWSLogic';
import FWSPracticeTemplate from './FWSPracticeTemplate';
import { FWSOption, FWSTFButtons, AchievementBadge, ShapeCard, CornerDisplay, FWSMatchLayout, shuffle } from './FWSSharedComponents';
import './fun-with-shapes.css';

const QUESTION_POOL = [
  {
    id: 'ca_q1',
    options: [['Book','📚 Book'],['Ball','⚽ Ball'],['Orange','🍊 Orange'],['Leaf','🍃 Leaf']],
    meta: { type: 'mcq', qid: 'ca_q1', correct: 'Book', correctLabel: 'Book', explanation: 'A book has perfect square corners! A ball is round, an orange is round, and a leaf has curved edges — none of them have square corners.' },
    render: (lp, ctx) => (
      <div className="fws-qcard fws-s5">
        <AchievementBadge icon="📐" label="CORNER DETECTIVE" color="#7c3aed" />
        <p className="fws-qtext">Which object has a SQUARE CORNER?</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 12, margin: '14px 0', fontSize: '3rem', flexWrap: 'wrap' }}>
          {['📚', '⚽', '🍊', '🍃'].map((e, i) => (
            <span key={i} style={{ padding: '10px 16px', background: '#f8fafc', borderRadius: 12, border: '2px solid #e2e8f0' }}>{e}</span>
          ))}
        </div>
        <div className="fws-opts">
          {ctx.shuffledOpts.map(([v, d], i) => (
            <FWSOption key={v} value={v} displayText={d} letterIdx={i} onClick={() => lp.handleMcq('ca_q1', v)} className={lp.getMcqClass('ca_q1', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'ca_q2',
    meta: { type: 'tf', qid: 'ca_q2_tf', correct: true, correctLabel: 'True', explanation: 'YES! A square has ALL 4 corners as square corners — just like the corners of a square tile or a square window.' },
    render: (lp) => (
      <div className="fws-qcard fws-s5">
        <AchievementBadge icon="🟥" label="TRUE OR FALSE?" color="#7c3aed" />
        <p className="fws-qtext">A square has 4 square corners. True or False?</p>
        <div style={{ display: 'flex', justifyContent: 'center', margin: '14px 0' }}>
          <ShapeCard shape="square" color="#f59e0b" size={120} />
        </div>
        <FWSTFButtons qid="ca_q2_tf" lp={lp} />
      </div>
    ),
  },
  {
    id: 'ca_q3',
    options: [['Square corner','Square corner'],['Less than square','Less than a square corner'],['More than square','More than a square corner'],['No corner','Not a corner']],
    meta: { type: 'mcq', qid: 'ca_q3', correct: 'Square corner', correctLabel: 'Square corner', explanation: 'This corner fits perfectly into the corner of a square — it IS a square corner! You can check by placing a square tile against it.' },
    render: (lp, ctx) => (
      <div className="fws-qcard fws-s5">
        <AchievementBadge icon="🔍" label="NAME THE CORNER" color="#7c3aed" />
        <p className="fws-qtext">What kind of corner is this?</p>
        <div className="fws-corner-row">
          <CornerDisplay type="right" size={130} />
        </div>
        <div className="fws-opts">
          {ctx.shuffledOpts.map(([v, d], i) => (
            <FWSOption key={v} value={v} displayText={d} letterIdx={i} onClick={() => lp.handleMcq('ca_q3', v)} className={lp.getMcqClass('ca_q3', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'ca_q4',
    meta: { type: 'tf', qid: 'ca_q4_tf', correct: false, correctLabel: 'False', explanation: 'A circle has NO corners at all — it is perfectly round! You cannot find any corner, square or otherwise, on a circle.' },
    render: (lp) => (
      <div className="fws-qcard fws-s5">
        <AchievementBadge icon="⭕" label="TRUE OR FALSE?" color="#7c3aed" />
        <p className="fws-qtext">A circle has 4 square corners. True or False?</p>
        <div style={{ display: 'flex', justifyContent: 'center', margin: '14px 0' }}>
          <ShapeCard shape="circle" color="#22c55e" size={120} />
        </div>
        <FWSTFButtons qid="ca_q4_tf" lp={lp} />
      </div>
    ),
  },
  {
    id: 'ca_q5',
    options: [['0','0 square corners'],['2','2 square corners'],['4','4 square corners'],['6','6 square corners']],
    meta: { type: 'mcq', qid: 'ca_q5', correct: '4', correctLabel: '4', explanation: 'A rectangle has 4 corners and ALL of them are square corners! Think of a door or window — every corner is a perfect square corner.' },
    render: (lp, ctx) => (
      <div className="fws-qcard fws-s5">
        <AchievementBadge icon="▬" label="RECTANGLE CORNERS" color="#3a86ff" />
        <p className="fws-qtext">How many square corners does a rectangle have?</p>
        <div style={{ display: 'flex', justifyContent: 'center', margin: '14px 0' }}>
          <ShapeCard shape="rectangle" color="#3a86ff" size={120} />
        </div>
        <div className="fws-opts">
          {ctx.shuffledOpts.map(([v, d], i) => (
            <FWSOption key={v} value={v} displayText={d} letterIdx={i} onClick={() => lp.handleMcq('ca_q5', v)} className={lp.getMcqClass('ca_q5', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'ca_q6',
    options: [['Book','📚 Book'],['Tile','🔲 Tile'],['Ball','⚽ Ball'],['Eraser','Eraser']],
    meta: { type: 'mcq', qid: 'ca_q6', correct: 'Ball', correctLabel: 'Ball', explanation: 'A ball is perfectly round — it has NO corners at all! Books, tiles, and erasers all have square corners, but a ball does not.' },
    render: (lp, ctx) => (
      <div className="fws-qcard fws-s5">
        <AchievementBadge icon="🚫" label="NO SQUARE CORNER!" color="#ef4444" />
        <p className="fws-qtext">Which object does NOT have a square corner?</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 12, margin: '14px 0', fontSize: '3rem', flexWrap: 'wrap' }}>
          {['📚', '🔲', '⚽', '✏️'].map((e, i) => (
            <span key={i} style={{ padding: '10px 16px', background: '#f8fafc', borderRadius: 12, border: '2px solid #e2e8f0' }}>{e}</span>
          ))}
        </div>
        <div className="fws-opts">
          {ctx.shuffledOpts.map(([v, d], i) => (
            <FWSOption key={v} value={v} displayText={d} letterIdx={i} onClick={() => lp.handleMcq('ca_q6', v)} className={lp.getMcqClass('ca_q6', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'ca_q7',
    options: [['Square corner','Square corner'],['Less than square','Less than a square corner'],['More than square','More than a square corner'],['No corner','No corner at all']],
    meta: { type: 'mcq', qid: 'ca_q7', correct: 'Less than square', correctLabel: 'Less than a square corner', explanation: 'The pointed tip of a triangle is a SHARP corner — it is LESS than a square corner! It is narrower than the corner of a square.' },
    render: (lp, ctx) => (
      <div className="fws-qcard fws-s5">
        <AchievementBadge icon="🔺" label="SHARP CORNER" color="#ef4444" />
        <p className="fws-qtext">The tip of this triangle is a…?</p>
        <div className="fws-corner-row">
          <CornerDisplay type="acute" size={130} />
        </div>
        <div className="fws-opts">
          {ctx.shuffledOpts.map(([v, d], i) => (
            <FWSOption key={v} value={v} displayText={d} letterIdx={i} onClick={() => lp.handleMcq('ca_q7', v)} className={lp.getMcqClass('ca_q7', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'ca_q8',
    meta: { type: 'tf', qid: 'ca_q8_tf', correct: true, correctLabel: 'True', explanation: 'YES! The corner of a door frame is a perfect square corner — builders make sure of this so the door fits properly!' },
    render: (lp) => (
      <div className="fws-qcard fws-s5">
        <AchievementBadge icon="🚪" label="TRUE OR FALSE?" color="#7c3aed" />
        <p className="fws-qtext">The corner of a door is a square corner. True or False?</p>
        <div style={{ fontSize: '6rem', textAlign: 'center', margin: '10px 0' }}>🚪</div>
        <FWSTFButtons qid="ca_q8_tf" lp={lp} />
      </div>
    ),
  },
  {
    id: 'ca_q9',
    options: [['Square corner','Square corner'],['Less than square','Less than a square corner'],['More than square','More than a square corner'],['No corner','No corner']],
    meta: { type: 'mcq', qid: 'ca_q9', correct: 'More than square', correctLabel: 'More than a square corner', explanation: 'This wide, open corner is MORE than a square corner — it is wider and bigger than the corner of a square.' },
    render: (lp, ctx) => (
      <div className="fws-qcard fws-s5">
        <AchievementBadge icon="📏" label="WIDE CORNER" color="#f59e0b" />
        <p className="fws-qtext">What kind of corner is this wide, open corner?</p>
        <div className="fws-corner-row">
          <CornerDisplay type="obtuse" size={130} />
        </div>
        <div className="fws-opts">
          {ctx.shuffledOpts.map(([v, d], i) => (
            <FWSOption key={v} value={v} displayText={d} letterIdx={i} onClick={() => lp.handleMcq('ca_q9', v)} className={lp.getMcqClass('ca_q9', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'ca_q10',
    matchAnswers: { ca_match10: { 'ca_m_book': 'Square corner', 'ca_m_mountain': 'Less than square corner', 'ca_m_open': 'More than square corner', 'ca_m_ball': 'No corners' } },
    rightItems: [['Square corner','Square corner'],['Less than square corner','Less than square corner'],['More than square corner','More than square corner'],['No corners','No corners at all']],
    meta: { type: 'match', totalPairs: 4, explanation: 'Book → square corner, Mountain tip → less than square corner, Open angle → more than square corner, Ball → no corners!', correctLabel: 'All corners matched!' },
    render: (lp, ctx) => (
      <div className="fws-qcard fws-s5">
        <AchievementBadge icon="🔗" label="CORNER MATCH!" color="#7c3aed" />
        <p className="fws-qtext">Match each corner to its type!</p>
        <div className="fws-corner-row" style={{ marginBottom: 8 }}>
          <CornerDisplay type="right" size={70} />
          <CornerDisplay type="acute" size={70} />
          <CornerDisplay type="obtuse" size={70} />
        </div>
        <FWSMatchLayout
          matchId="ca_match10"
          leftItems={[['ca_m_book','📚 Book corner'],['ca_m_mountain','🔺 Mountain tip'],['ca_m_open','↗ Wide open corner'],['ca_m_ball','⚽ Ball']]}
          shuffledRight={ctx.shuffledRight}
          lp={lp}
        />
      </div>
    ),
  },
];

const CornersAngles = () => {
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
  return <FWSPracticeTemplate skillId="FWS-05" skillName="Corners and Square Corners" questions={questions} questionMeta={questionMeta} logicProps={logicProps} />;
};

export default CornersAngles;
