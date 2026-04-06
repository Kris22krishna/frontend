import React, { useRef } from 'react';
import { useToyJoyLogic } from './useToyJoyLogic';
import ToyJoyPracticeTemplate from './ToyJoyPracticeTemplate';
import { EngineSVG, RocketSVG } from './SharedSVGs';
import './toy-joy.css';

const shuffle = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const QUESTION_POOL = [
  {
    id: 'cnt_q1',
    meta: {
      type: 'mcq',
      qid: 'cnt_mcq_yellow_cones',
      correct: '2',
      explanation: 'Look at the top of the engine — there are 2 yellow cone shapes sitting on top of the boiler section.',
      correctLabel: '2',
    },
    render: (lp) => (
      <div className="toy-joy-qcard">
        <div className="toy-joy-qmeta"><span className="toy-joy-qbadge">Q</span><span className="toy-joy-qtype">Picture + MCQ</span></div>
        <p className="toy-joy-qtext">Look at Devika's toy engine below. <strong>How many yellow cones</strong> do you see on the engine?</p>
        <div style={{ display: 'flex', justifyContent: 'center', margin: '14px 0' }}>
          <EngineSVG />
        </div>
        <div className="toy-joy-opts">
          {['1', '2', '3', '4'].map((val, i) => (
            <div key={val} onClick={() => lp.handleMcq('cnt_mcq_yellow_cones', val)} className={`toy-joy-opt ${lp.getMcqClass('cnt_mcq_yellow_cones', val)}`}>
              <span className="toy-joy-opt-letter">{String.fromCharCode(65 + i)}</span>{val}
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'cnt_q2',
    meta: {
      type: 'rocket',
      correct: { cone: '1', cyl: '1', cub: '3' },
      explanation: "Jaya's rocket uses: 1 Cone at the very top (pointed tip), 1 Cylinder for the middle body, and 3 Cuboids (2 blue fin wings + 1 red base block).",
      correctLabel: 'Cone: 1, Cylinder: 1, Cuboid: 3',
    },
    render: (lp) => (
      <div className="toy-joy-qcard">
        <div className="toy-joy-qmeta"><span className="toy-joy-qbadge">Q</span><span className="toy-joy-qtype">Count &amp; Fill</span></div>
        <p className="toy-joy-qtext">Count the shapes in Jaya's rocket and fill in the blanks.</p>
        <div style={{ display: 'flex', justifyContent: 'center', margin: '14px 0' }}>
          <RocketSVG />
        </div>
        <div className="toy-joy-count-boxes">
          <div className="toy-joy-cbox">🔺 Cones: <input type="number" min="0" max="9" value={lp.rocket.cone} onChange={e => lp.setRocket(r => ({ ...r, cone: e.target.value }))} placeholder="?" /></div>
          <div className="toy-joy-cbox">🥫 Cylinders: <input type="number" min="0" max="9" value={lp.rocket.cyl} onChange={e => lp.setRocket(r => ({ ...r, cyl: e.target.value }))} placeholder="?" /></div>
          <div className="toy-joy-cbox">📦 Cuboids: <input type="number" min="0" max="9" value={lp.rocket.cub} onChange={e => lp.setRocket(r => ({ ...r, cub: e.target.value }))} placeholder="?" /></div>
        </div>
      </div>
    ),
  },
  {
    id: 'cnt_q3',
    meta: {
      type: 'mcq',
      qid: 'cnt_mcq_red_boiler',
      correct: 'cylinder',
      explanation: 'The large red part of the toy engine is the boiler. It is shaped like a cylinder — it has a curved surface and two flat circular ends.',
      correctLabel: 'Cylinder',
    },
    render: (lp) => (
      <div className="toy-joy-qcard">
        <div className="toy-joy-qmeta"><span className="toy-joy-qbadge">Q</span><span className="toy-joy-qtype">Picture + MCQ</span></div>
        <p className="toy-joy-qtext">Look at Devika's toy engine. Which shape is the large <strong>RED boiler</strong> part?</p>
        <div style={{ display: 'flex', justifyContent: 'center', margin: '14px 0' }}>
          <EngineSVG />
        </div>
        <div className="toy-joy-opts">
          {[['cube', 'Cube'], ['cylinder', 'Cylinder'], ['cone', 'Cone'], ['cuboid', 'Cuboid']].map(([val, label], i) => (
            <div key={val} onClick={() => lp.handleMcq('cnt_mcq_red_boiler', val)} className={`toy-joy-opt ${lp.getMcqClass('cnt_mcq_red_boiler', val)}`}>
              <span className="toy-joy-opt-letter">{String.fromCharCode(65 + i)}</span>{label}
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'cnt_q4',
    meta: {
      type: 'tf',
      qid: 'tf_cabin_cube',
      correct: false,
      explanation: 'False! The blue cabin of the toy engine is shaped like a CUBOID, not a cube. A cuboid has rectangular faces of different sizes, while a cube has 6 equal square faces.',
      correctLabel: 'False — it is a Cuboid',
    },
    render: (lp) => (
      <div className="toy-joy-qcard">
        <div className="toy-joy-qmeta"><span className="toy-joy-qbadge">Q</span><span className="toy-joy-qtype">True / False</span></div>
        <p className="toy-joy-qtext">The blue cabin of the toy engine is shaped like a <strong>cube</strong> (all sides are equal).</p>
        <div style={{ display: 'flex', justifyContent: 'center', margin: '12px 0' }}>
          <EngineSVG />
        </div>
        <div className="toy-joy-tfopts">
          <button onClick={() => lp.handleTf('tf_cabin_cube', true)} className={`toy-joy-tfbtn toy-joy-t ${lp.getTfClass('tf_cabin_cube', true)}`}>✅ True</button>
          <button onClick={() => lp.handleTf('tf_cabin_cube', false)} className={`toy-joy-tfbtn toy-joy-f ${lp.getTfClass('tf_cabin_cube', false)}`}>❌ False</button>
        </div>
      </div>
    ),
  },
  {
    id: 'cnt_q5',
    matchAnswers: {
      cnt_match_engine: {
        'cnt_red_boiler': 'Cylinder',
        'cnt_blue_cabin': 'Cuboid',
        'cnt_yellow_tops': 'Cone',
        'cnt_grey_base': 'Cuboid',
      }
    },
    rightItems: [['Cylinder', 'Cylinder'], ['Cone', 'Cone'], ['Cuboid', 'Cuboid']],
    meta: {
      type: 'match',
      totalPairs: 3,
      explanation: 'Red boiler → Cylinder. Blue cabin → Cuboid. Yellow tops → Cone. Grey base → Cuboid (both cabin and base are cuboids, so matching either is correct).',
      correctLabel: 'Red boiler→Cylinder, Yellow tops→Cone, Cabin/Base→Cuboid',
    },
    render: (lp, ctx) => (
      <div className="toy-joy-qcard">
        <div className="toy-joy-qmeta"><span className="toy-joy-qbadge">Q</span><span className="toy-joy-qtype">Match the Following</span></div>
        <p className="toy-joy-qtext">Look at Devika's toy engine. Match each <strong> coloured part</strong> to its shape name. Click a left item, then a right item.</p>
        <div style={{ display: 'flex', justifyContent: 'center', margin: '12px 0' }}>
          <EngineSVG />
        </div>
        <div className="toy-joy-match-wrap">
          <div className="toy-joy-match-col">
            {[
              ['cnt_red_boiler', '🔴 Red boiler'],
              ['cnt_yellow_tops', '🟡 Yellow tops'],
              ['cnt_grey_base', '⬜ Grey base'],
            ].map(([val, label]) => (
              <div key={val} onClick={() => lp.handleMatch('cnt_match_engine', 'left', val)} className={`toy-joy-match-item ${lp.getMatchClass('cnt_match_engine', 'left', val)}`}>{label}</div>
            ))}
          </div>
          <div className="toy-joy-match-center">
            <div className="toy-joy-match-line">→</div>
            <div className="toy-joy-match-line">→</div>
            <div className="toy-joy-match-line">→</div>
          </div>
          <div className="toy-joy-match-col">
            {ctx.shuffledRight.map(([val, label]) => (
              <div key={val} onClick={() => lp.handleMatch('cnt_match_engine', 'right', val)} className={`toy-joy-match-item ${lp.getMatchClass('cnt_match_engine', 'right', val)}`}>{label}</div>
            ))}
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'cnt_q6',
    meta: {
      type: 'mcq',
      qid: 'cnt_mcq_rocket_cuboids',
      correct: '3',
      explanation: "Jaya's rocket uses 3 cuboids total: 2 blue fin cuboids (wing-like fins on each side) + 1 red base cuboid at the bottom.",
      correctLabel: '3',
    },
    render: (lp) => (
      <div className="toy-joy-qcard">
        <div className="toy-joy-qmeta"><span className="toy-joy-qbadge">Q</span><span className="toy-joy-qtype">Multiple Choice</span></div>
        <p className="toy-joy-qtext">Jaya builds a rocket using 1 cone, 1 cylinder, <strong>2 blue fin cuboids</strong>, and <strong>1 red base cuboid</strong>. How many <strong>CUBOIDS</strong> did she use in total?</p>
        <div style={{ display: 'flex', justifyContent: 'center', margin: '12px 0' }}>
          <RocketSVG />
        </div>
        <div className="toy-joy-opts">
          {['1', '2', '3', '4'].map((val, i) => (
            <div key={val} onClick={() => lp.handleMcq('cnt_mcq_rocket_cuboids', val)} className={`toy-joy-opt ${lp.getMcqClass('cnt_mcq_rocket_cuboids', val)}`}>
              <span className="toy-joy-opt-letter">{String.fromCharCode(65 + i)}</span>{val}
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'cnt_q7',
    meta: {
      type: 'tf',
      qid: 'tf_rocket_cone',
      correct: true,
      explanation: "True! In Jaya's rocket, the pointed top part is a cone. A cone has a flat circular base and a pointed tip — perfect for the nose of a rocket!",
      correctLabel: 'True',
    },
    render: (lp) => (
      <div className="toy-joy-qcard">
        <div className="toy-joy-qmeta"><span className="toy-joy-qbadge">Q</span><span className="toy-joy-qtype">True / False</span></div>
        <p className="toy-joy-qtext">In Jaya's rocket, the <strong>pointed top part</strong> is a <strong>Cone</strong>.</p>
        <div style={{ display: 'flex', justifyContent: 'center', margin: '12px 0' }}>
          <RocketSVG />
        </div>
        <div className="toy-joy-tfopts">
          <button onClick={() => lp.handleTf('tf_rocket_cone', true)} className={`toy-joy-tfbtn toy-joy-t ${lp.getTfClass('tf_rocket_cone', true)}`}>✅ True</button>
          <button onClick={() => lp.handleTf('tf_rocket_cone', false)} className={`toy-joy-tfbtn toy-joy-f ${lp.getTfClass('tf_rocket_cone', false)}`}>❌ False</button>
        </div>
      </div>
    ),
  },
  {
    id: 'cnt_q8',
    meta: {
      type: 'mcq',
      qid: 'cnt_mcq_total_shapes',
      correct: '6',
      explanation: '2 cones + 1 cylinder + 3 cuboids = 2 + 1 + 3 = 6 shapes in total.',
      correctLabel: '6',
    },
    render: (lp) => (
      <div className="toy-joy-qcard">
        <div className="toy-joy-qmeta"><span className="toy-joy-qbadge">Q</span><span className="toy-joy-qtype">Multiple Choice</span></div>
        <p className="toy-joy-qtext">A model uses <strong>2 cones</strong>, <strong>1 cylinder</strong>, and <strong>3 cuboids</strong>. How many shapes are used in <strong>total</strong>?</p>
        <div className="toy-joy-opts">
          {['4', '5', '6', '7'].map((val, i) => (
            <div key={val} onClick={() => lp.handleMcq('cnt_mcq_total_shapes', val)} className={`toy-joy-opt ${lp.getMcqClass('cnt_mcq_total_shapes', val)}`}>
              <span className="toy-joy-opt-letter">{String.fromCharCode(65 + i)}</span>{val}
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'cnt_q9',
    meta: {
      type: 'mcq',
      qid: 'cnt_mcq_engine_wheels',
      correct: '3',
      explanation: "Devika's toy engine has 3 wheels (circles): 1 large wheel on the left side and 2 smaller wheels on the right side.",
      correctLabel: '3',
    },
    render: (lp) => (
      <div className="toy-joy-qcard">
        <div className="toy-joy-qmeta"><span className="toy-joy-qbadge">Q</span><span className="toy-joy-qtype">Picture + MCQ</span></div>
        <p className="toy-joy-qtext">Look at Devika's toy engine. How many <strong>wheels (circles)</strong> does the engine have?</p>
        <div style={{ display: 'flex', justifyContent: 'center', margin: '14px 0' }}>
          <EngineSVG />
        </div>
        <div className="toy-joy-opts">
          {['2', '3', '4', '5'].map((val, i) => (
            <div key={val} onClick={() => lp.handleMcq('cnt_mcq_engine_wheels', val)} className={`toy-joy-opt ${lp.getMcqClass('cnt_mcq_engine_wheels', val)}`}>
              <span className="toy-joy-opt-letter">{String.fromCharCode(65 + i)}</span>{val}
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'cnt_q10',
    meta: {
      type: 'multipick',
      correct: ['cnt_mp_cone1', 'cnt_mp_cone2'],
      explanation: 'The toy engine has 2 yellow cone shapes on top — one near the left chimney area and one further right. Click both yellow cone options.',
      correctLabel: 'Both yellow cone shapes (Shape A and Shape B)',
    },
    render: (lp) => (
      <div className="toy-joy-qcard">
        <div className="toy-joy-qmeta"><span className="toy-joy-qbadge">Q</span><span className="toy-joy-qtype">Multi-Pick</span></div>
        <p className="toy-joy-qtext">Look at the engine. Click <strong>ALL the CONE shapes</strong> you can identify. (Hint: there are 2 cones!)</p>
        <div style={{ display: 'flex', justifyContent: 'center', margin: '14px 0' }}>
          <EngineSVG />
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '12px', justifyContent: 'center' }}>
          {[
            { id: 'cnt_mp_cone1', label: 'Yellow cone (left)' },
            { id: 'cnt_mp_cone2', label: 'Yellow cone (right)' },
            { id: 'cnt_mp_cyl', label: 'Red boiler' },
            { id: 'cnt_mp_cabin', label: 'Blue cabin' },
          ].map(({ id, label }) => (
            <div key={id} onClick={() => lp.toggleMultiPic(id)}
              style={{ padding: '10px 16px', border: `2px solid ${lp.getMultiPicClass(id) === 'toy-joy-selected' ? '#f4b942' : '#e2e8f0'}`, borderRadius: '10px', background: lp.getMultiPicClass(id) === 'toy-joy-selected' ? '#fff7ed' : '#f8fafc', fontWeight: '700', fontSize: '0.85rem', cursor: 'pointer', transition: 'all .15s' }}>
              {label}
            </div>
          ))}
        </div>
      </div>
    ),
  },
];

const CountingShapes = () => {
  const selRef = useRef(null);
  if (!selRef.current) {
    selRef.current = shuffle([...QUESTION_POOL]).slice(0, 5).map(q =>
      q.rightItems ? { ...q, shuffledRight: shuffle([...q.rightItems]) } : q
    );
  }
  const selected = selRef.current;

  const matchAnswers = {};
  selected.forEach(q => { if (q.matchAnswers) Object.assign(matchAnswers, q.matchAnswers); });

  const logicProps = useToyJoyLogic(matchAnswers);
  const questions = selected.map(q => <React.Fragment key={q.id}>{q.render(logicProps, q)}</React.Fragment>);
  const questionMeta = selected.map(q => q.meta);

  return (
    <ToyJoyPracticeTemplate
      skillId="TJ-02"
      skillName="Counting Shapes in Models"
      questions={questions}
      questionMeta={questionMeta}
      logicProps={logicProps}
    />
  );
};

export default CountingShapes;
