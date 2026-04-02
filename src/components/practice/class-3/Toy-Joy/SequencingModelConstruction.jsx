import React, { useRef } from 'react';
import { useToyJoyLogic } from './useToyJoyLogic';
import ToyJoyPracticeTemplate from './ToyJoyPracticeTemplate';
import './toy-joy.css';

const shuffle = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

// Table model SVG: flat cuboid top, 4 cylinder legs
const TableModelSVG = () => (
  <svg width="180" height="160" viewBox="0 0 180 160">
    {/* Table top - flat cuboid */}
    <rect x="20" y="40" width="130" height="24" fill="#b5ead7"/>
    <polygon points="20,40 150,40 164,28 34,28" fill="#85d9b8"/>
    <polygon points="150,40 164,28 164,64 150,76" fill="#5ac9a0"/>
    <text x="85" y="57" textAnchor="middle" fontSize="9" fill="#1a5c3a" fontFamily="Nunito" fontWeight="700">Cuboid (top)</text>
    {/* Front-left leg */}
    <rect x="32" y="64" width="18" height="70" rx="5" fill="#a8d5e2"/>
    <ellipse cx="41" cy="64" rx="9" ry="4" fill="#79b8cc"/>
    <ellipse cx="41" cy="134" rx="9" ry="4" fill="#79b8cc"/>
    {/* Front-right leg */}
    <rect x="120" y="64" width="18" height="70" rx="5" fill="#a8d5e2"/>
    <ellipse cx="129" cy="64" rx="9" ry="4" fill="#79b8cc"/>
    <ellipse cx="129" cy="134" rx="9" ry="4" fill="#79b8cc"/>
    <text x="85" y="108" textAnchor="middle" fontSize="9" fill="#1a4a5c" fontFamily="Nunito" fontWeight="700">Cylinders (legs)</text>
  </svg>
);

// Simple house: cylinder body + cone roof
const HouseSVG = ({ coneFirst = false }) => (
  <svg width="120" height="160" viewBox="0 0 120 160">
    {/* Cone roof */}
    <polygon points="60,15 25,65 95,65" fill="#ffd166"/>
    <ellipse cx="60" cy="65" rx="35" ry="9" fill="#f4b942"/>
    <text x="60" y="47" textAnchor="middle" fontSize="8" fill="#7a5000" fontFamily="Nunito" fontWeight="700">Cone</text>
    {/* Cylinder body */}
    <rect x="25" y="65" width="70" height="70" rx="8" fill="#a8d5e2"/>
    <ellipse cx="60" cy="65" rx="35" ry="9" fill="#79b8cc"/>
    <ellipse cx="60" cy="135" rx="35" ry="9" fill="#79b8cc"/>
    <text x="60" y="104" textAnchor="middle" fontSize="8" fill="#1a4a5c" fontFamily="Nunito" fontWeight="700">Cylinder</text>
  </svg>
);

// Rocket build: cuboid → cylinder → cone showing steps
const RocketStepsSVG = () => (
  <svg width="220" height="180" viewBox="0 0 220 180">
    {/* Step 1: Cuboid base */}
    <rect x="5" y="120" width="55" height="40" rx="4" fill="#b5ead7"/>
    <polygon points="5,120 60,120 70,110 15,110" fill="#85d9b8"/>
    <text x="32" y="165" textAnchor="middle" fontSize="8" fill="#1a5c3a" fontFamily="Nunito" fontWeight="700">Step 1</text>
    <text x="32" y="175" textAnchor="middle" fontSize="7" fill="#555" fontFamily="Nunito">Cuboid</text>
    {/* Arrow */}
    <text x="88" y="148" textAnchor="middle" fontSize="18" fill="#94a3b8">→</text>
    {/* Step 2: Cuboid + Cylinder */}
    <rect x="107" y="100" width="45" height="60" rx="6" fill="#a8d5e2"/>
    <ellipse cx="129" cy="100" rx="22" ry="7" fill="#79b8cc"/>
    <ellipse cx="129" cy="160" rx="22" ry="7" fill="#79b8cc"/>
    <rect x="107" y="130" width="45" height="37" rx="4" fill="#b5ead7"/>
    <text x="129" y="175" textAnchor="middle" fontSize="8" fill="#555" fontFamily="Nunito">Step 2</text>
    {/* Arrow */}
    <text x="170" y="135" textAnchor="middle" fontSize="18" fill="#94a3b8">→</text>
    {/* Step 3: Full rocket */}
    <polygon points="193,30 176,70 210,70" fill="#ffd166"/>
    <ellipse cx="193" cy="70" rx="17" ry="5" fill="#f4b942"/>
    <rect x="176" y="70" width="34" height="50" rx="5" fill="#a8d5e2"/>
    <ellipse cx="193" cy="70" rx="17" ry="5" fill="#79b8cc"/>
    <ellipse cx="193" cy="120" rx="17" ry="5" fill="#79b8cc"/>
    <rect x="176" y="120" width="34" height="28" rx="4" fill="#b5ead7"/>
    <text x="193" y="165" textAnchor="middle" fontSize="8" fill="#555" fontFamily="Nunito">Step 3</text>
  </svg>
);

const QUESTION_POOL = [
  {
    id: 'seq_q1',
    meta: {
      type: 'mcq',
      qid: 'seq_mcq_table_first',
      correct: 'cylinder_legs_first',
      explanation: 'To build a table, you must place the CYLINDER LEGS on the ground FIRST — they are the support. Then you can put the flat cuboid top on top of them.',
      correctLabel: 'Place the cylinder legs on the ground',
    },
    render: (lp) => (
      <div className="toy-joy-qcard">
        <div className="toy-joy-qmeta"><span className="toy-joy-qbadge">Q</span><span className="toy-joy-qtype">Picture + MCQ</span></div>
        <p className="toy-joy-qtext">To build this table model, which step should come <strong>FIRST</strong>?</p>
        <div style={{ display: 'flex', justifyContent: 'center', margin: '14px 0' }}>
          <TableModelSVG />
        </div>
        <div className="toy-joy-opts">
          {[
            ['cuboid_top_first', 'Place the flat cuboid top first'],
            ['cylinder_legs_first', 'Place the cylinder legs on the ground first'],
            ['cone_first', 'Place a cone first'],
            ['sphere_first', 'Place a sphere first'],
          ].map(([val, label], i) => (
            <div key={val} onClick={() => lp.handleMcq('seq_mcq_table_first', val)} className={`toy-joy-opt ${lp.getMcqClass('seq_mcq_table_first', val)}`}>
              <span className="toy-joy-opt-letter">{String.fromCharCode(65 + i)}</span>{label}
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'seq_q2',
    meta: {
      type: 'mcq',
      qid: 'seq_mcq_last_placed',
      correct: 'cone_last',
      explanation: 'In the Construct and Describe game: the cylinder is placed beside the cuboid first, then the cone is placed ON TOP of the cylinder last. So the cone was placed LAST.',
      correctLabel: 'Cone (placed last, on top of the cylinder)',
    },
    render: (lp) => (
      <div className="toy-joy-qcard">
        <div className="toy-joy-qmeta"><span className="toy-joy-qbadge">Q</span><span className="toy-joy-qtype">Multiple Choice</span></div>
        <p className="toy-joy-qtext">In the 'Construct and Describe' game: cylinder is beside the cuboid, cone is on the cylinder. Which shape was placed <strong>LAST</strong>?</p>
        <div style={{ display: 'flex', justifyContent: 'center', margin: '14px 0' }}>
          <RocketStepsSVG />
        </div>
        <div className="toy-joy-opts">
          {[
            ['cuboid_last', 'Cuboid'],
            ['cylinder_last', 'Cylinder'],
            ['cone_last', 'Cone'],
            ['all_same_time', 'All placed at the same time'],
          ].map(([val, label], i) => (
            <div key={val} onClick={() => lp.handleMcq('seq_mcq_last_placed', val)} className={`toy-joy-opt ${lp.getMcqClass('seq_mcq_last_placed', val)}`}>
              <span className="toy-joy-opt-letter">{String.fromCharCode(65 + i)}</span>{label}
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'seq_q3',
    meta: {
      type: 'tf',
      qid: 'tf_cone_first',
      correct: false,
      explanation: 'False! When building a rocket (cuboid base, cylinder middle, cone top), the BASE (cuboid) should be placed FIRST. You always build from the ground up — base first, then middle, then top.',
      correctLabel: 'False — the cuboid base goes first',
    },
    render: (lp) => (
      <div className="toy-joy-qcard">
        <div className="toy-joy-qmeta"><span className="toy-joy-qbadge">Q</span><span className="toy-joy-qtype">True / False</span></div>
        <p className="toy-joy-qtext">When building a rocket (cuboid base, cylinder middle, cone top), the <strong>CONE should be placed first</strong>.</p>
        <div style={{ display: 'flex', justifyContent: 'center', margin: '14px 0' }}>
          <RocketStepsSVG />
        </div>
        <div className="toy-joy-tfopts">
          <button onClick={() => lp.handleTf('tf_cone_first', true)} className={`toy-joy-tfbtn toy-joy-t ${lp.getTfClass('tf_cone_first', true)}`}>✅ True</button>
          <button onClick={() => lp.handleTf('tf_cone_first', false)} className={`toy-joy-tfbtn toy-joy-f ${lp.getTfClass('tf_cone_first', false)}`}>❌ False</button>
        </div>
      </div>
    ),
  },
  {
    id: 'seq_q4',
    meta: {
      type: 'mcq',
      qid: 'seq_mcq_house_order',
      correct: 'cyl_then_cone',
      explanation: 'To build a house with a cylinder body and cone roof: you FIRST place the cylinder (the walls/body) on the ground, THEN put the cone (roof) on top. The base always comes first.',
      correctLabel: 'Cylinder first, then cone on top',
    },
    render: (lp) => (
      <div className="toy-joy-qcard">
        <div className="toy-joy-qmeta"><span className="toy-joy-qbadge">Q</span><span className="toy-joy-qtype">Picture + MCQ</span></div>
        <p className="toy-joy-qtext">Which is the <strong>CORRECT order</strong> to build a cylinder house with a cone roof?</p>
        <div style={{ display: 'flex', justifyContent: 'center', margin: '14px 0' }}>
          <HouseSVG />
        </div>
        <div className="toy-joy-opts">
          {[
            ['cone_then_cyl', 'Cone first, then cylinder below it'],
            ['cyl_then_cone', 'Cylinder first, then cone on top'],
            ['both_together', 'Place both at the same time'],
            ['cone_beside_cyl', 'Cone beside the cylinder'],
          ].map(([val, label], i) => (
            <div key={val} onClick={() => lp.handleMcq('seq_mcq_house_order', val)} className={`toy-joy-opt ${lp.getMcqClass('seq_mcq_house_order', val)}`}>
              <span className="toy-joy-opt-letter">{String.fromCharCode(65 + i)}</span>{label}
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'seq_q5',
    matchAnswers: {
      seq_match_steps: {
        'seq_step1': 'Place the cuboid flat on the ground',
        'seq_step2': 'Stack the cylinder on the cuboid',
        'seq_step3': 'Place the cone on the very top',
      }
    },
    meta: {
      type: 'match',
      totalPairs: 3,
      explanation: 'Step 1 (First) → Place cuboid on ground. Step 2 (Middle) → Stack cylinder on cuboid. Step 3 (Last) → Place cone on top. Always build from the base upward.',
      correctLabel: 'All 3 steps matched correctly',
    },
    render: (lp) => (
      <div className="toy-joy-qcard">
        <div className="toy-joy-qmeta"><span className="toy-joy-qbadge">Q</span><span className="toy-joy-qtype">Match the Following</span></div>
        <p className="toy-joy-qtext">Match each step number to the correct action for building a rocket. Click a left item, then a right item.</p>
        <div style={{ display: 'flex', justifyContent: 'center', margin: '12px 0' }}>
          <RocketStepsSVG />
        </div>
        <div className="toy-joy-match-wrap">
          <div className="toy-joy-match-col">
            {[
              ['seq_step1', 'Step 1 (First)'],
              ['seq_step2', 'Step 2 (Middle)'],
              ['seq_step3', 'Step 3 (Last)'],
            ].map(([val, label]) => (
              <div key={val} onClick={() => lp.handleMatch('seq_match_steps', 'left', val)} className={`toy-joy-match-item ${lp.getMatchClass('seq_match_steps', 'left', val)}`}>{label}</div>
            ))}
          </div>
          <div className="toy-joy-match-center">
            <div className="toy-joy-match-line">→</div>
            <div className="toy-joy-match-line">→</div>
            <div className="toy-joy-match-line">→</div>
          </div>
          <div className="toy-joy-match-col">
            {[
              ['Stack the cylinder on the cuboid', 'Stack the cylinder on the cuboid'],
              ['Place the cuboid flat on the ground', 'Place the cuboid flat on the ground'],
              ['Place the cone on the very top', 'Place the cone on the very top'],
            ].map(([val, label]) => (
              <div key={val} onClick={() => lp.handleMatch('seq_match_steps', 'right', val)} className={`toy-joy-match-item ${lp.getMatchClass('seq_match_steps', 'right', val)}`} style={{ fontSize: '0.78rem' }}>{label}</div>
            ))}
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'seq_q6',
    meta: {
      type: 'mcq',
      qid: 'seq_mcq_middle_shape',
      correct: 'cylinder',
      explanation: "In Jaya's build order: first cuboid (bottom), then cylinder (middle), then cone (top). The shape in the MIDDLE of the model is the cylinder.",
      correctLabel: 'Cylinder',
    },
    render: (lp) => (
      <div className="toy-joy-qcard">
        <div className="toy-joy-qmeta"><span className="toy-joy-qbadge">Q</span><span className="toy-joy-qtype">Multiple Choice</span></div>
        <p className="toy-joy-qtext">Jaya builds: first a <strong>cuboid</strong>, then a <strong>cylinder</strong> on it, then a <strong>cone</strong>. Which shape is in the <strong>MIDDLE</strong> of the model?</p>
        <div style={{ display: 'flex', justifyContent: 'center', margin: '14px 0' }}>
          <RocketStepsSVG />
        </div>
        <div className="toy-joy-opts">
          {[['cuboid', 'Cuboid'], ['cone', 'Cone'], ['cylinder', 'Cylinder'], ['sphere', 'Sphere']].map(([val, label], i) => (
            <div key={val} onClick={() => lp.handleMcq('seq_mcq_middle_shape', val)} className={`toy-joy-opt ${lp.getMcqClass('seq_mcq_middle_shape', val)}`}>
              <span className="toy-joy-opt-letter">{String.fromCharCode(65 + i)}</span>{label}
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'seq_q7',
    meta: {
      type: 'tf',
      qid: 'tf_cd_game_rules',
      correct: true,
      explanation: "True! In the 'Construct and Describe' game from the textbook, one student builds a model and describes it without showing it, while the other students listen carefully and try to build the same model.",
      correctLabel: 'True',
    },
    render: (lp) => (
      <div className="toy-joy-qcard">
        <div className="toy-joy-qmeta"><span className="toy-joy-qbadge">Q</span><span className="toy-joy-qtype">True / False</span></div>
        <p className="toy-joy-qtext">In the 'Construct and Describe' game, one student describes the model <strong>WITHOUT showing it</strong>, and others build the same model by <strong>listening</strong>.</p>
        <div className="toy-joy-tfopts">
          <button onClick={() => lp.handleTf('tf_cd_game_rules', true)} className={`toy-joy-tfbtn toy-joy-t ${lp.getTfClass('tf_cd_game_rules', true)}`}>✅ True</button>
          <button onClick={() => lp.handleTf('tf_cd_game_rules', false)} className={`toy-joy-tfbtn toy-joy-f ${lp.getTfClass('tf_cd_game_rules', false)}`}>❌ False</button>
        </div>
      </div>
    ),
  },
  {
    id: 'seq_q8',
    meta: {
      type: 'mcq',
      qid: 'seq_mcq_placed_first',
      correct: 'cube_first',
      explanation: 'In a model with a cube at the bottom and a sphere on top, the CUBE was placed FIRST — it is the base. The sphere comes last because it sits on top.',
      correctLabel: 'The cube',
    },
    render: (lp) => (
      <div className="toy-joy-qcard">
        <div className="toy-joy-qmeta"><span className="toy-joy-qbadge">Q</span><span className="toy-joy-qtype">Multiple Choice</span></div>
        <p className="toy-joy-qtext">A model has a <strong>cube at the bottom</strong> and a <strong>sphere on top</strong>. Which was placed <strong>FIRST</strong>?</p>
        <div style={{ display: 'flex', justifyContent: 'center', margin: '14px 0' }}>
          <svg width="90" height="150" viewBox="0 0 90 150">
            <circle cx="45" cy="30" r="22" fill="#c77dff"/>
            <ellipse cx="45" cy="30" rx="22" ry="8" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5"/>
            <text x="45" y="35" textAnchor="middle" fontSize="9" fill="#fff" fontFamily="Nunito" fontWeight="700">Sphere</text>
            <rect x="12" y="72" width="56" height="56" fill="#f4a261"/>
            <polygon points="12,72 68,72 78,62 22,62" fill="#e76f51"/>
            <polygon points="68,72 78,62 78,118 68,128" fill="#c9581c"/>
            <text x="45" y="103" textAnchor="middle" fontSize="9" fill="#fff" fontFamily="Nunito" fontWeight="700">Cube</text>
            <text x="45" y="142" textAnchor="middle" fontSize="8" fill="#555" fontFamily="Nunito">Which was placed first?</text>
          </svg>
        </div>
        <div className="toy-joy-opts">
          {[
            ['sphere_first', 'The sphere'],
            ['cube_first', 'The cube'],
            ['both_together', 'Both at the same time'],
            ['neither', 'Neither — it does not matter'],
          ].map(([val, label], i) => (
            <div key={val} onClick={() => lp.handleMcq('seq_mcq_placed_first', val)} className={`toy-joy-opt ${lp.getMcqClass('seq_mcq_placed_first', val)}`}>
              <span className="toy-joy-opt-letter">{String.fromCharCode(65 + i)}</span>{label}
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'seq_q9',
    meta: {
      type: 'mcq',
      qid: 'seq_mcq_started_with',
      correct: 'cuboid_start',
      explanation: "When someone describes: 'The cylinder is ON the cuboid, the cone is ON the cylinder' — the CUBOID was the starting/base shape. It is mentioned as what the cylinder sits on.",
      correctLabel: 'Cuboid',
    },
    render: (lp) => (
      <div className="toy-joy-qcard">
        <div className="toy-joy-qmeta"><span className="toy-joy-qbadge">Q</span><span className="toy-joy-qtype">Multiple Choice</span></div>
        <p className="toy-joy-qtext">To describe a model: <em>"The cylinder is ON the cuboid, the cone is ON the cylinder."</em> Which shape did we start building with?</p>
        <div style={{ display: 'flex', justifyContent: 'center', margin: '14px 0' }}>
          <RocketStepsSVG />
        </div>
        <div className="toy-joy-opts">
          {[
            ['cone_start', 'Cone'],
            ['cylinder_start', 'Cylinder'],
            ['cuboid_start', 'Cuboid'],
            ['sphere_start', 'Sphere'],
          ].map(([val, label], i) => (
            <div key={val} onClick={() => lp.handleMcq('seq_mcq_started_with', val)} className={`toy-joy-opt ${lp.getMcqClass('seq_mcq_started_with', val)}`}>
              <span className="toy-joy-opt-letter">{String.fromCharCode(65 + i)}</span>{label}
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'seq_q11',
    meta: {
      type: 'mcq',
      qid: 'seq_mcq_rocket_order',
      correct: 'cuboid_cyl_cone',
      explanation: 'The correct order is: (1) Place the cuboid base on the ground, (2) Stack the cylinder on the cuboid, (3) Place the cone on top of the cylinder. This is bottom-to-top construction order.',
      correctLabel: 'Cuboid → Cylinder → Cone (bottom to top)',
    },
    render: (lp) => (
      <div className="toy-joy-qcard">
        <div className="toy-joy-qmeta"><span className="toy-joy-qbadge">Q</span><span className="toy-joy-qtype">Ordering</span></div>
        <p className="toy-joy-qtext">What is the <strong>correct order</strong> to build a rocket model from <strong>bottom to top</strong>?</p>
        <div style={{ display: 'flex', justifyContent: 'center', margin: '14px 0' }}>
          <RocketStepsSVG />
        </div>
        <div className="toy-joy-opts">
          {[
            ['cone_cyl_cuboid', 'Cone → Cylinder → Cuboid'],
            ['cyl_cuboid_cone', 'Cylinder → Cuboid → Cone'],
            ['cuboid_cyl_cone', 'Cuboid → Cylinder → Cone (bottom to top)'],
            ['cone_cuboid_cyl', 'Cone → Cuboid → Cylinder'],
          ].map(([val, label], i) => (
            <div key={val} onClick={() => lp.handleMcq('seq_mcq_rocket_order', val)} className={`toy-joy-opt ${lp.getMcqClass('seq_mcq_rocket_order', val)}`}>
              <span className="toy-joy-opt-letter">{String.fromCharCode(65 + i)}</span>{label}
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'seq_q10',
    meta: {
      type: 'tf',
      qid: 'tf_order_matters',
      correct: true,
      explanation: 'True! The order in which you describe placing shapes MATTERS — if you say the wrong order, the other person might build the model incorrectly. Clear step-by-step descriptions help others rebuild the model exactly.',
      correctLabel: 'True',
    },
    render: (lp) => (
      <div className="toy-joy-qcard">
        <div className="toy-joy-qmeta"><span className="toy-joy-qbadge">Q</span><span className="toy-joy-qtype">True / False</span></div>
        <p className="toy-joy-qtext">The <strong>order</strong> in which you describe placing shapes <strong>matters</strong> — it helps others rebuild the model correctly.</p>
        <div style={{ display: 'flex', justifyContent: 'center', margin: '14px 0' }}>
          <RocketStepsSVG />
        </div>
        <div className="toy-joy-tfopts">
          <button onClick={() => lp.handleTf('tf_order_matters', true)} className={`toy-joy-tfbtn toy-joy-t ${lp.getTfClass('tf_order_matters', true)}`}>✅ True</button>
          <button onClick={() => lp.handleTf('tf_order_matters', false)} className={`toy-joy-tfbtn toy-joy-f ${lp.getTfClass('tf_order_matters', false)}`}>❌ False</button>
        </div>
      </div>
    ),
  },
];

const SequencingModelConstruction = () => {
  const selRef = useRef(null);
  if (!selRef.current) {
    selRef.current = shuffle([...QUESTION_POOL]).slice(0, 5);
  }
  const selected = selRef.current;

  const matchAnswers = {};
  selected.forEach(q => { if (q.matchAnswers) Object.assign(matchAnswers, q.matchAnswers); });

  const logicProps = useToyJoyLogic(matchAnswers);
  const questions = selected.map(q => <React.Fragment key={q.id}>{q.render(logicProps)}</React.Fragment>);
  const questionMeta = selected.map(q => q.meta);

  return (
    <ToyJoyPracticeTemplate
      skillId="TJ-08"
      skillName="Sequencing Model Construction"
      questions={questions}
      questionMeta={questionMeta}
      logicProps={logicProps}
    />
  );
};

export default SequencingModelConstruction;
