import React, { useRef } from 'react';
import { useFWSLogic } from './useFWSLogic';
import FWSPracticeTemplate from './FWSPracticeTemplate';
import { FWSOption, FWSTFButtons, AchievementBadge, ShapeCard, FaceDisplay, FWSMatchLayout, shuffle } from './FWSSharedComponents';
import './fun-with-shapes.css';

const QUESTION_POOL = [
  {
    id: 'fs_q1',
    options: [['Square','🟥 Square'],['Circle','⭕ Circle'],['Triangle','🔺 Triangle'],['Rectangle','▬ Rectangle']],
    meta: { type: 'mcq', qid: 'fs_q1', correct: 'Square', correctLabel: 'Square', explanation: 'A dice (cube) has 6 faces, and each face is a perfect SQUARE! All sides of each face are equal.' },
    render: (lp, ctx) => (
      <div className="fws-qcard fws-s2">
        <AchievementBadge icon="🎲" label="FACE FINDER" color="#00b8a9" />
        <p className="fws-qtext">What is the shape of one face of a dice?</p>
        <div style={{ fontSize: '6rem', textAlign: 'center', margin: '10px 0' }}>🎲</div>
        <FaceDisplay object="cube" faceShape="square" faceColor="#3a86ff" />
        <div className="fws-opts">
          {ctx.shuffledOpts.map(([v, d], i) => (
            <FWSOption key={v} value={v} displayText={d} letterIdx={i} onClick={() => lp.handleMcq('fs_q1', v)} className={lp.getMcqClass('fs_q1', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'fs_q2',
    options: [['4','4 faces'],['6','6 faces'],['8','8 faces'],['12','12 faces']],
    meta: { type: 'mcq', qid: 'fs_q2', correct: '6', correctLabel: '6', explanation: 'A cube (like a dice or a gift box) has exactly 6 faces — top, bottom, front, back, left, and right!' },
    render: (lp, ctx) => (
      <div className="fws-qcard fws-s2">
        <AchievementBadge icon="📦" label="CUBE EXPLORER" color="#00b8a9" />
        <p className="fws-qtext">How many faces does a cube have?</p>
        <div style={{ fontSize: '6rem', textAlign: 'center', margin: '10px 0' }}>📦</div>
        <div className="fws-opts">
          {ctx.shuffledOpts.map(([v, d], i) => (
            <FWSOption key={v} value={v} displayText={d} letterIdx={i} onClick={() => lp.handleMcq('fs_q2', v)} className={lp.getMcqClass('fs_q2', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'fs_q3',
    meta: { type: 'tf', qid: 'fs_q3_tf', correct: false, correctLabel: 'False', explanation: 'A sphere (like a ball) has NO flat faces at all! It is completely curved. You cannot trace a flat shape from it.' },
    render: (lp) => (
      <div className="fws-qcard fws-s2">
        <AchievementBadge icon="🎯" label="TRUE OR FALSE?" color="#7c3aed" />
        <p className="fws-qtext">A ball (sphere) has flat faces you can trace. True or False?</p>
        <div style={{ fontSize: '6rem', textAlign: 'center', margin: '10px 0' }}>⚽</div>
        <FWSTFButtons qid="fs_q3_tf" lp={lp} />
      </div>
    ),
  },
  {
    id: 'fs_q4',
    options: [['Circle','⭕ Circle'],['Square','🟥 Square'],['Triangle','🔺 Triangle'],['Rectangle','▬ Rectangle']],
    meta: { type: 'mcq', qid: 'fs_q4', correct: 'Circle', correctLabel: 'Circle', explanation: 'A coin is a cylinder shape — the flat top and bottom faces are circles! Trace a coin on paper and you get a circle.' },
    render: (lp, ctx) => (
      <div className="fws-qcard fws-s2">
        <AchievementBadge icon="🪙" label="COIN TRACER" color="#f59e0b" />
        <p className="fws-qtext">Trace around a coin — what shape do you get?</p>
        <div style={{ fontSize: '6rem', textAlign: 'center', margin: '10px 0' }}>🪙</div>
        <FaceDisplay object="coin" faceShape="circle" faceColor="#f59e0b" />
        <div className="fws-opts">
          {ctx.shuffledOpts.map(([v, d], i) => (
            <FWSOption key={v} value={v} displayText={d} letterIdx={i} onClick={() => lp.handleMcq('fs_q4', v)} className={lp.getMcqClass('fs_q4', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'fs_q5',
    options: [['Circles','Circles'],['Triangles','Triangles'],['Rectangles','Rectangles'],['Pentagons','Pentagons']],
    meta: { type: 'mcq', qid: 'fs_q5', correct: 'Rectangles', correctLabel: 'Rectangles', explanation: 'When you open a matchbox and flatten it, you see rectangles! A cuboid (like a matchbox) has 6 rectangular faces.' },
    render: (lp, ctx) => (
      <div className="fws-qcard fws-s2">
        <AchievementBadge icon="🗂️" label="OPEN THE BOX!" color="#3a86ff" />
        <p className="fws-qtext">Open and flatten a matchbox — what face shapes do you see?</p>
        <div style={{ fontSize: '5rem', textAlign: 'center', margin: '10px 0' }}>🗂️ → ?</div>
        <div className="fws-opts">
          {ctx.shuffledOpts.map(([v, d], i) => (
            <FWSOption key={v} value={v} displayText={d} letterIdx={i} onClick={() => lp.handleMcq('fs_q5', v)} className={lp.getMcqClass('fs_q5', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'fs_q6',
    meta: { type: 'tf', qid: 'fs_q6_tf', correct: false, correctLabel: 'False', explanation: 'A cuboid (like a shoebox) has faces of DIFFERENT sizes — the top/bottom are one size, front/back another, and sides another. Not all the same!' },
    render: (lp) => (
      <div className="fws-qcard fws-s2">
        <AchievementBadge icon="🎯" label="TRUE OR FALSE?" color="#7c3aed" />
        <p className="fws-qtext">All 6 faces of a cuboid (shoebox) are the same size. True or False?</p>
        <div style={{ fontSize: '6rem', textAlign: 'center', margin: '10px 0' }}>📦</div>
        <FWSTFButtons qid="fs_q6_tf" lp={lp} />
      </div>
    ),
  },
  {
    id: 'fs_q7',
    options: [['Circle','⭕ Circle'],['Triangle','🔺 Triangle'],['Rectangle','▬ Rectangle'],['Hexagon','⬡ Hexagon']],
    meta: { type: 'mcq', qid: 'fs_q7', correct: 'Rectangle', correctLabel: 'Rectangle', explanation: 'An eraser is a cuboid shape — all its faces are rectangles! Trace any face of your eraser to get a rectangle.' },
    render: (lp, ctx) => (
      <div className="fws-qcard fws-s2">
        <AchievementBadge icon="✏️" label="ERASER EXPLORER" color="#ef4444" />
        <p className="fws-qtext">Stamp one face of an eraser — what shape do you get?</p>
        <div style={{ fontSize: '6rem', textAlign: 'center', margin: '10px 0' }}>🖊️</div>
        <FaceDisplay object="cuboid" faceShape="rectangle" faceColor="#ef4444" />
        <div className="fws-opts">
          {ctx.shuffledOpts.map(([v, d], i) => (
            <FWSOption key={v} value={v} displayText={d} letterIdx={i} onClick={() => lp.handleMcq('fs_q7', v)} className={lp.getMcqClass('fs_q7', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'fs_q8',
    meta: { type: 'tf', qid: 'fs_q8_tf', correct: true, correctLabel: 'True', explanation: 'Yes! A cylinder (like a tin can or glass) has circular faces on the top and bottom, and a curved surface around the side.' },
    render: (lp) => (
      <div className="fws-qcard fws-s2">
        <AchievementBadge icon="🥫" label="TRUE OR FALSE?" color="#7c3aed" />
        <p className="fws-qtext">A cylinder has circular faces on the top and bottom. True or False?</p>
        <div style={{ fontSize: '6rem', textAlign: 'center', margin: '10px 0' }}>🥫</div>
        <FWSTFButtons qid="fs_q8_tf" lp={lp} />
      </div>
    ),
  },
  {
    id: 'fs_q9',
    options: [['Circle','⭕ Circle'],['Square','🟥 Square'],['Triangle','🔺 Triangle'],['Rectangle','▬ Rectangle']],
    meta: { type: 'mcq', qid: 'fs_q9', correct: 'Rectangle', correctLabel: 'Rectangle', explanation: 'A book is a cuboid — when you press its cover on paper, you get a rectangle! Books have rectangular faces.' },
    render: (lp, ctx) => (
      <div className="fws-qcard fws-s2">
        <AchievementBadge icon="📚" label="BOOK FACE" color="#3a86ff" />
        <p className="fws-qtext">Trace the cover of a book — what shape do you get?</p>
        <div style={{ fontSize: '6rem', textAlign: 'center', margin: '10px 0' }}>📚</div>
        <FaceDisplay object="cuboid" faceShape="rectangle" faceColor="#3a86ff" />
        <div className="fws-opts">
          {ctx.shuffledOpts.map(([v, d], i) => (
            <FWSOption key={v} value={v} displayText={d} letterIdx={i} onClick={() => lp.handleMcq('fs_q9', v)} className={lp.getMcqClass('fs_q9', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'fs_q10',
    matchAnswers: { fs_match10: { 'fs_m_dice': 'Square', 'fs_m_coin': 'Circle', 'fs_m_book': 'Rectangle', 'fs_m_sharpener': 'Triangle' } },
    rightItems: [['Square','🟥 Square face'],['Circle','⭕ Circle face'],['Rectangle','▬ Rectangle face'],['Triangle','🔺 Triangle face']],
    meta: { type: 'match', totalPairs: 4, explanation: 'Dice→Square, Coin→Circle, Book→Rectangle, Sharpener cap→Triangle!', correctLabel: 'All matched!' },
    render: (lp, ctx) => (
      <div className="fws-qcard fws-s2">
        <AchievementBadge icon="🔗" label="FACE MATCH!" color="#00b8a9" />
        <p className="fws-qtext">Match each object to its face shape!</p>
        <FWSMatchLayout
          matchId="fs_match10"
          leftItems={[['fs_m_dice','🎲 Dice'],['fs_m_coin','🪙 Coin'],['fs_m_book','📚 Book'],['fs_m_sharpener','✏️ Sharpener']]}
          shuffledRight={ctx.shuffledRight}
          lp={lp}
        />
      </div>
    ),
  },
];

const FlatShapesFaces = () => {
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
  return <FWSPracticeTemplate skillId="FWS-02" skillName="Flat Shapes and Faces" questions={questions} questionMeta={questionMeta} logicProps={logicProps} />;
};

export default FlatShapesFaces;
