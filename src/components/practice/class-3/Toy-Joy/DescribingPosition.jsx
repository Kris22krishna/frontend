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

// Stack SVG: cuboid at bottom, cylinder in middle, cone on top — with labels since shape identity is known
const StackSVG = () => (
  <svg width="120" height="200" viewBox="0 0 120 200">
    {/* Base cuboid */}
    <rect x="20" y="148" width="70" height="36" fill="#b5ead7"/>
    <polygon points="20,148 90,148 102,136 32,136" fill="#85d9b8"/>
    <polygon points="90,148 102,136 102,172 90,184" fill="#5ac9a0"/>
    <text x="55" y="169" textAnchor="middle" fontSize="9" fill="#1a5c3a" fontFamily="Nunito" fontWeight="700">Cuboid</text>
    {/* Middle cylinder */}
    <rect x="30" y="92" width="50" height="56" rx="7" fill="#a8d5e2"/>
    <ellipse cx="55" cy="92" rx="25" ry="8" fill="#79b8cc"/>
    <ellipse cx="55" cy="148" rx="25" ry="8" fill="#79b8cc"/>
    <text x="55" y="122" textAnchor="middle" fontSize="9" fill="#1a4a5c" fontFamily="Nunito" fontWeight="700">Cylinder</text>
    {/* Top cone */}
    <polygon points="55,18 30,92 80,92" fill="#ffd166"/>
    <ellipse cx="55" cy="92" rx="25" ry="8" fill="#f4b942"/>
    <text x="55" y="58" textAnchor="middle" fontSize="9" fill="#7a5000" fontFamily="Nunito" fontWeight="700">Cone</text>
  </svg>
);

// Two cuboids with cylinder between them
const SandwichSVG = () => (
  <svg width="140" height="200" viewBox="0 0 140 200">
    {/* Bottom cuboid */}
    <rect x="20" y="152" width="80" height="32" fill="#b5ead7"/>
    <polygon points="20,152 100,152 112,140 32,140" fill="#85d9b8"/>
    <polygon points="100,152 112,140 112,172 100,184" fill="#5ac9a0"/>
    <text x="60" y="172" textAnchor="middle" fontSize="9" fill="#1a5c3a" fontFamily="Nunito" fontWeight="700">Cuboid</text>
    {/* Middle cylinder */}
    <rect x="30" y="100" width="60" height="52" rx="6" fill="#a8d5e2"/>
    <ellipse cx="60" cy="100" rx="30" ry="9" fill="#79b8cc"/>
    <ellipse cx="60" cy="152" rx="30" ry="9" fill="#79b8cc"/>
    <text x="60" y="128" textAnchor="middle" fontSize="9" fill="#1a4a5c" fontFamily="Nunito" fontWeight="700">Cylinder</text>
    {/* Top cuboid */}
    <rect x="20" y="62" width="80" height="30" fill="#b5ead7"/>
    <polygon points="20,62 100,62 112,50 32,50" fill="#85d9b8"/>
    <polygon points="100,62 112,50 112,80 100,92" fill="#5ac9a0"/>
    <text x="60" y="80" textAnchor="middle" fontSize="9" fill="#1a5c3a" fontFamily="Nunito" fontWeight="700">Cuboid</text>
  </svg>
);

const QUESTION_POOL = [
  {
    id: 'pos_q1',
    meta: {
      type: 'mcq',
      qid: 'pos_mcq_cone_where',
      correct: 'ontop_cyl',
      explanation: 'The cone is at the very TOP of the stack, placed on top of the cylinder. So the cone is ON TOP OF the cylinder.',
      correctLabel: 'On top of the cylinder',
    },
    render: (lp) => (
      <div className="toy-joy-qcard">
        <div className="toy-joy-qmeta"><span className="toy-joy-qbadge">Q</span><span className="toy-joy-qtype">Picture + MCQ</span></div>
        <p className="toy-joy-qtext">Look at the model. <strong>Where is the cone?</strong></p>
        <div style={{ display: 'flex', justifyContent: 'center', margin: '14px 0' }}>
          <StackSVG />
        </div>
        <div className="toy-joy-opts">
          {[
            ['under_cyl', 'Under the cylinder'],
            ['ontop_cyl', 'On top of the cylinder'],
            ['between_shapes', 'Between the cuboid and cylinder'],
            ['nextto_cyl', 'Next to the cylinder'],
          ].map(([val, label], i) => (
            <div key={val} onClick={() => lp.handleMcq('pos_mcq_cone_where', val)} className={`toy-joy-opt ${lp.getMcqClass('pos_mcq_cone_where', val)}`}>
              <span className="toy-joy-opt-letter">{String.fromCharCode(65 + i)}</span>{label}
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'pos_q2',
    meta: {
      type: 'mcq',
      qid: 'pos_mcq_cyl_relative',
      correct: 'ontop_cuboid',
      explanation: 'The cylindrical body is placed ON TOP OF the cuboid base. The cone is on top of the cylinder, and the cuboid is at the bottom — so the cylinder is directly on top of the cuboid.',
      correctLabel: 'On top of the cuboid',
    },
    render: (lp) => (
      <div className="toy-joy-qcard">
        <div className="toy-joy-qmeta"><span className="toy-joy-qbadge">Q</span><span className="toy-joy-qtype">Multiple Choice</span></div>
        <p className="toy-joy-qtext">In a rocket model: cone is at the top, cylinder is in the middle, and cuboid is at the bottom. What word describes the <strong>cylinder's position relative to the cuboid</strong>?</p>
        <div style={{ display: 'flex', justifyContent: 'center', margin: '14px 0' }}>
          <StackSVG />
        </div>
        <div className="toy-joy-opts">
          {[
            ['under_cuboid', 'Under the cuboid'],
            ['ontop_cuboid', 'On top of the cuboid'],
            ['nextto_cuboid', 'Next to the cuboid'],
            ['between_cuboids', 'Between two cuboids'],
          ].map(([val, label], i) => (
            <div key={val} onClick={() => lp.handleMcq('pos_mcq_cyl_relative', val)} className={`toy-joy-opt ${lp.getMcqClass('pos_mcq_cyl_relative', val)}`}>
              <span className="toy-joy-opt-letter">{String.fromCharCode(65 + i)}</span>{label}
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'pos_q3',
    meta: {
      type: 'tf',
      qid: 'tf_between_middle',
      correct: true,
      explanation: "True! The word 'between' means a shape is in the MIDDLE of two other shapes — one on each side or above and below.",
      correctLabel: 'True',
    },
    render: (lp) => (
      <div className="toy-joy-qcard">
        <div className="toy-joy-qmeta"><span className="toy-joy-qbadge">Q</span><span className="toy-joy-qtype">True / False</span></div>
        <p className="toy-joy-qtext">The word <strong>'between'</strong> means a shape is in the <strong>MIDDLE</strong> of two other shapes.</p>
        <div style={{ display: 'flex', justifyContent: 'center', margin: '14px 0' }}>
          <SandwichSVG />
        </div>
        <div className="toy-joy-tfopts">
          <button onClick={() => lp.handleTf('tf_between_middle', true)} className={`toy-joy-tfbtn toy-joy-t ${lp.getTfClass('tf_between_middle', true)}`}>✅ True</button>
          <button onClick={() => lp.handleTf('tf_between_middle', false)} className={`toy-joy-tfbtn toy-joy-f ${lp.getTfClass('tf_between_middle', false)}`}>❌ False</button>
        </div>
      </div>
    ),
  },
  {
    id: 'pos_q4',
    meta: {
      type: 'mcq',
      qid: 'pos_mcq_cuboid_sitting',
      correct: 'cylinder_legs',
      explanation: 'In this model, the top cuboid is resting ON TOP OF the cylinder below it. The cylinder supports the top cuboid from underneath.',
      correctLabel: 'The cylinder below it',
    },
    render: (lp) => (
      <div className="toy-joy-qcard">
        <div className="toy-joy-qmeta"><span className="toy-joy-qbadge">Q</span><span className="toy-joy-qtype">Picture + MCQ</span></div>
        <p className="toy-joy-qtext">In this model, the <strong>top cuboid</strong> is resting ON what?</p>
        <div style={{ display: 'flex', justifyContent: 'center', margin: '14px 0' }}>
          <SandwichSVG />
        </div>
        <div className="toy-joy-opts">
          {[
            ['another_cuboid', 'Another cuboid'],
            ['cylinder_legs', 'The cylinder below it'],
            ['cone_base', 'A cone'],
            ['sphere_base', 'A sphere'],
          ].map(([val, label], i) => (
            <div key={val} onClick={() => lp.handleMcq('pos_mcq_cuboid_sitting', val)} className={`toy-joy-opt ${lp.getMcqClass('pos_mcq_cuboid_sitting', val)}`}>
              <span className="toy-joy-opt-letter">{String.fromCharCode(65 + i)}</span>{label}
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'pos_q5',
    matchAnswers: {
      pos_match_words: {
        'pos_ontop': 'The cone is ___ the cylinder',
        'pos_under': 'The cuboid is ___ the cylinder',
        'pos_between': 'The cylinder is ___ the cone and cuboid',
        'pos_nextto': 'Shape placed beside another shape',
      }
    },
    meta: {
      type: 'match',
      totalPairs: 4,
      explanation: "'On top of' → cone on the cylinder. 'Under' → cuboid under the cylinder. 'Between' → cylinder between cone and cuboid. 'Next to' → shape beside another shape.",
      correctLabel: 'All 4 pairs matched correctly',
    },
    render: (lp) => (
      <div className="toy-joy-qcard">
        <div className="toy-joy-qmeta"><span className="toy-joy-qbadge">Q</span><span className="toy-joy-qtype">Match the Following</span></div>
        <p className="toy-joy-qtext">Look at the model (cone on top, cylinder in middle, cuboid at bottom). Match each position word to the correct sentence. Click a left item, then a right item.</p>
        <div style={{ display: 'flex', justifyContent: 'center', margin: '12px 0' }}>
          <StackSVG />
        </div>
        <div className="toy-joy-match-wrap">
          <div className="toy-joy-match-col">
            {[
              ['pos_ontop', 'On top of'],
              ['pos_under', 'Under'],
              ['pos_between', 'Between'],
              ['pos_nextto', 'Next to'],
            ].map(([val, label]) => (
              <div key={val} onClick={() => lp.handleMatch('pos_match_words', 'left', val)} className={`toy-joy-match-item ${lp.getMatchClass('pos_match_words', 'left', val)}`}>{label}</div>
            ))}
          </div>
          <div className="toy-joy-match-center">
            <div className="toy-joy-match-line">→</div>
            <div className="toy-joy-match-line">→</div>
            <div className="toy-joy-match-line">→</div>
            <div className="toy-joy-match-line">→</div>
          </div>
          <div className="toy-joy-match-col">
            {[
              ['The cone is ___ the cylinder', 'The cone is ___ the cylinder'],
              ['The cuboid is ___ the cylinder', 'The cuboid is ___ the cylinder'],
              ['The cylinder is ___ the cone and cuboid', 'The cylinder is ___ the cone and cuboid'],
              ['Shape placed beside another shape', 'Shape placed beside another shape'],
            ].map(([val, label]) => (
              <div key={val} onClick={() => lp.handleMatch('pos_match_words', 'right', val)} className={`toy-joy-match-item ${lp.getMatchClass('pos_match_words', 'right', val)}`} style={{ fontSize: '0.78rem' }}>{label}</div>
            ))}
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'pos_q6',
    meta: {
      type: 'mcq',
      qid: 'pos_mcq_bottom_shape',
      correct: 'cuboid',
      explanation: 'When we stack shapes: cone on top, cylinder in middle, cuboid at the bottom — the CUBOID is at the very bottom (ground level).',
      correctLabel: 'Cuboid',
    },
    render: (lp) => (
      <div className="toy-joy-qcard">
        <div className="toy-joy-qmeta"><span className="toy-joy-qbadge">Q</span><span className="toy-joy-qtype">Multiple Choice</span></div>
        <p className="toy-joy-qtext">In a model: cone is on the cylinder, cylinder is on the cuboid. What shape is at the <strong>BOTTOM</strong>?</p>
        <div style={{ display: 'flex', justifyContent: 'center', margin: '14px 0' }}>
          <StackSVG />
        </div>
        <div className="toy-joy-opts">
          {[['cone', 'Cone'], ['cylinder', 'Cylinder'], ['cuboid', 'Cuboid'], ['sphere', 'Sphere']].map(([val, label], i) => (
            <div key={val} onClick={() => lp.handleMcq('pos_mcq_bottom_shape', val)} className={`toy-joy-opt ${lp.getMcqClass('pos_mcq_bottom_shape', val)}`}>
              <span className="toy-joy-opt-letter">{String.fromCharCode(65 + i)}</span>{label}
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'pos_q7',
    meta: {
      type: 'tf',
      qid: 'tf_nextto_ontop',
      correct: false,
      explanation: "False! 'Next to' means the shape is BESIDE another shape (on its side), NOT on top of it. 'On top of' means it is placed above.",
      correctLabel: 'False — Next to means beside',
    },
    render: (lp) => (
      <div className="toy-joy-qcard">
        <div className="toy-joy-qmeta"><span className="toy-joy-qbadge">Q</span><span className="toy-joy-qtype">True / False</span></div>
        <p className="toy-joy-qtext">If a shape is <strong>'next to'</strong> another shape, it means the shape is <strong>ON TOP OF</strong> it.</p>
        <div style={{ display: 'flex', justifyContent: 'center', margin: '14px 0' }}>
          {/* Side-by-side shapes to illustrate 'next to' */}
          <svg width="160" height="90" viewBox="0 0 160 90">
            <rect x="10" y="25" width="50" height="50" fill="#f4a261"/>
            <polygon points="10,25 60,25 68,17 18,17" fill="#e76f51"/>
            <polygon points="60,25 68,17 68,67 60,75" fill="#c9581c"/>
            <rect x="90" y="28" width="60" height="45" rx="6" fill="#a8d5e2"/>
            <ellipse cx="120" cy="28" rx="30" ry="8" fill="#79b8cc"/>
            <ellipse cx="120" cy="73" rx="30" ry="8" fill="#79b8cc"/>
            <text x="80" y="88" textAnchor="middle" fontSize="9" fill="#555" fontFamily="Nunito" fontWeight="700">← next to →</text>
          </svg>
        </div>
        <div className="toy-joy-tfopts">
          <button onClick={() => lp.handleTf('tf_nextto_ontop', true)} className={`toy-joy-tfbtn toy-joy-t ${lp.getTfClass('tf_nextto_ontop', true)}`}>✅ True</button>
          <button onClick={() => lp.handleTf('tf_nextto_ontop', false)} className={`toy-joy-tfbtn toy-joy-f ${lp.getTfClass('tf_nextto_ontop', false)}`}>❌ False</button>
        </div>
      </div>
    ),
  },
  {
    id: 'pos_q8',
    meta: {
      type: 'mcq',
      qid: 'pos_mcq_under_cone',
      correct: 'cylinder',
      explanation: 'Jaya puts the cone ON TOP of the cylinder. So the cylinder is directly UNDER the cone.',
      correctLabel: 'The cylinder',
    },
    render: (lp) => (
      <div className="toy-joy-qcard">
        <div className="toy-joy-qmeta"><span className="toy-joy-qbadge">Q</span><span className="toy-joy-qtype">Multiple Choice</span></div>
        <p className="toy-joy-qtext">Jaya puts a cone <strong>ON TOP OF</strong> a cylinder. Which shape is <strong>UNDER</strong> the cone?</p>
        <div style={{ display: 'flex', justifyContent: 'center', margin: '14px 0' }}>
          <svg width="90" height="160" viewBox="0 0 90 160">
            <rect x="20" y="80" width="50" height="65" rx="7" fill="#a8d5e2"/>
            <ellipse cx="45" cy="80" rx="25" ry="8" fill="#79b8cc"/>
            <ellipse cx="45" cy="145" rx="25" ry="8" fill="#79b8cc"/>
            <polygon points="45,8 20,80 70,80" fill="#ffd166"/>
            <ellipse cx="45" cy="80" rx="25" ry="8" fill="#f4b942"/>
            <text x="45" y="75" textAnchor="middle" fontSize="9" fill="#7a5000" fontFamily="Nunito" fontWeight="700">Cone</text>
            <text x="45" y="115" textAnchor="middle" fontSize="9" fill="#1a4a5c" fontFamily="Nunito" fontWeight="700">?</text>
          </svg>
        </div>
        <div className="toy-joy-opts">
          {[['cuboid', 'The cuboid'], ['sphere', 'The sphere'], ['cylinder', 'The cylinder'], ['cone', 'Another cone']].map(([val, label], i) => (
            <div key={val} onClick={() => lp.handleMcq('pos_mcq_under_cone', val)} className={`toy-joy-opt ${lp.getMcqClass('pos_mcq_under_cone', val)}`}>
              <span className="toy-joy-opt-letter">{String.fromCharCode(65 + i)}</span>{label}
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'pos_q9',
    meta: {
      type: 'mcq',
      qid: 'pos_mcq_between_cuboids',
      correct: 'cylinder',
      explanation: 'In the sandwich model, the cylinder is placed BETWEEN the two cuboids — one cuboid on top and one at the bottom, with the cylinder in the middle.',
      correctLabel: 'Cylinder',
    },
    render: (lp) => (
      <div className="toy-joy-qcard">
        <div className="toy-joy-qmeta"><span className="toy-joy-qbadge">Q</span><span className="toy-joy-qtype">Picture + MCQ</span></div>
        <p className="toy-joy-qtext">Look at this model. Which shape is <strong>BETWEEN</strong> the two cuboids?</p>
        <div style={{ display: 'flex', justifyContent: 'center', margin: '14px 0' }}>
          <SandwichSVG />
        </div>
        <div className="toy-joy-opts">
          {[['cone', 'Cone'], ['sphere', 'Sphere'], ['cylinder', 'Cylinder'], ['cuboid', 'Another cuboid']].map(([val, label], i) => (
            <div key={val} onClick={() => lp.handleMcq('pos_mcq_between_cuboids', val)} className={`toy-joy-opt ${lp.getMcqClass('pos_mcq_between_cuboids', val)}`}>
              <span className="toy-joy-opt-letter">{String.fromCharCode(65 + i)}</span>{label}
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'pos_q10',
    meta: {
      type: 'mcq',
      qid: 'pos_mcq_directly_above',
      correct: 'on_top_of',
      explanation: "'On top of' means directly above another shape. 'Under' means below. 'Next to' means beside. 'Between' means in the middle of two shapes.",
      correctLabel: 'On top of',
    },
    render: (lp) => (
      <div className="toy-joy-qcard">
        <div className="toy-joy-qmeta"><span className="toy-joy-qbadge">Q</span><span className="toy-joy-qtype">Multiple Choice</span></div>
        <p className="toy-joy-qtext">Which position word means <strong>'directly above'</strong>?</p>
        <div style={{ display: 'flex', justifyContent: 'center', margin: '14px 0' }}>
          <svg width="120" height="130" viewBox="0 0 120 130">
            <rect x="30" y="70" width="60" height="40" rx="5" fill="#b5ead7"/>
            <polygon points="30,70 90,70 100,60 40,60" fill="#85d9b8"/>
            <polygon points="90,70 100,60 100,100 90,110" fill="#5ac9a0"/>
            <polygon points="60,8 35,60 85,60" fill="#ffd166"/>
            <ellipse cx="60" cy="60" rx="25" ry="7" fill="#f4b942"/>
            <text x="60" y="92" textAnchor="middle" fontSize="9" fill="#1a5c3a" fontFamily="Nunito" fontWeight="700">Cuboid</text>
            <text x="60" y="38" textAnchor="middle" fontSize="9" fill="#7a5000" fontFamily="Nunito" fontWeight="700">Cone</text>
            <text x="60" y="122" textAnchor="middle" fontSize="9" fill="#555" fontFamily="Nunito">Cone is ___ cuboid?</text>
          </svg>
        </div>
        <div className="toy-joy-opts">
          {[['under', 'Under'], ['next_to', 'Next to'], ['between', 'Between'], ['on_top_of', 'On top of']].map(([val, label], i) => (
            <div key={val} onClick={() => lp.handleMcq('pos_mcq_directly_above', val)} className={`toy-joy-opt ${lp.getMcqClass('pos_mcq_directly_above', val)}`}>
              <span className="toy-joy-opt-letter">{String.fromCharCode(65 + i)}</span>{label}
            </div>
          ))}
        </div>
      </div>
    ),
  },
];

const DescribingPosition = () => {
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
      skillId="TJ-03"
      skillName="Describing Position"
      questions={questions}
      questionMeta={questionMeta}
      logicProps={logicProps}
    />
  );
};

export default DescribingPosition;
