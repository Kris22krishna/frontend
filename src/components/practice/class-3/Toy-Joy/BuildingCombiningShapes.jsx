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

// 3 cubes in a horizontal row
const ThreeCubesRowSVG = () => (
  <svg width="220" height="80" viewBox="0 0 220 80">
    {/* Cube 1 */}
    <rect x="5" y="22" width="44" height="44" fill="#f4a261"/>
    <polygon points="5,22 49,22 59,12 15,12" fill="#e76f51"/>
    <polygon points="49,22 59,12 59,56 49,66" fill="#c9581c"/>
    {/* Cube 2 */}
    <rect x="82" y="22" width="44" height="44" fill="#f4a261"/>
    <polygon points="82,22 126,22 136,12 92,12" fill="#e76f51"/>
    <polygon points="126,22 136,12 136,56 126,66" fill="#c9581c"/>
    {/* Cube 3 */}
    <rect x="159" y="22" width="44" height="44" fill="#f4a261"/>
    <polygon points="159,22 203,22 213,12 169,12" fill="#e76f51"/>
    <polygon points="203,22 213,12 213,56 203,66" fill="#c9581c"/>
  </svg>
);

// Result: a long cuboid
const LongCuboidSVG = () => (
  <svg width="200" height="70" viewBox="0 0 200 70">
    <rect x="4" y="20" width="160" height="38" fill="#b5ead7"/>
    <polygon points="4,20 164,20 178,8 18,8" fill="#85d9b8"/>
    <polygon points="164,20 178,8 178,46 164,58" fill="#5ac9a0"/>
  </svg>
);

// Cube + cuboid side by side
const CubePlusCuboidSVG = () => (
  <svg width="200" height="90" viewBox="0 0 200 90">
    {/* Cube */}
    <rect x="5" y="28" width="52" height="52" fill="#f4a261"/>
    <polygon points="5,28 57,28 69,16 17,16" fill="#e76f51"/>
    <polygon points="57,28 69,16 69,68 57,80" fill="#c9581c"/>
    {/* Plus sign */}
    <text x="90" y="60" textAnchor="middle" fontSize="24" fill="#6b7280" fontFamily="Nunito" fontWeight="800">+</text>
    {/* Cuboid */}
    <rect x="110" y="34" width="72" height="36" fill="#b5ead7"/>
    <polygon points="110,34 182,34 194,22 122,22" fill="#85d9b8"/>
    <polygon points="182,34 194,22 194,58 182,70" fill="#5ac9a0"/>
  </svg>
);

// 2 cubes stacked on top of each other
const TwoCubesStackedSVG = () => (
  <svg width="100" height="130" viewBox="0 0 100 130">
    {/* Bottom cube */}
    <rect x="18" y="68" width="52" height="52" fill="#f4a261"/>
    <polygon points="18,68 70,68 82,56 30,56" fill="#e76f51"/>
    <polygon points="70,68 82,56 82,108 70,120" fill="#c9581c"/>
    {/* Top cube */}
    <rect x="18" y="14" width="52" height="52" fill="#f4a261"/>
    <polygon points="18,14 70,14 82,2 30,2" fill="#e76f51"/>
    <polygon points="70,14 82,2 82,66 70,68" fill="#c9581c"/>
  </svg>
);

// 2 cubes side by side
const TwoCubesSideSVG = () => (
  <svg width="160" height="80" viewBox="0 0 160 80">
    {/* Cube 1 */}
    <rect x="5" y="22" width="52" height="52" fill="#f4a261"/>
    <polygon points="5,22 57,22 69,10 17,10" fill="#e76f51"/>
    <polygon points="57,22 69,10 69,74 57,74" fill="#c9581c"/>
    {/* Cube 2 */}
    <rect x="86" y="22" width="52" height="52" fill="#f4a261"/>
    <polygon points="86,22 138,22 150,10 98,10" fill="#e76f51"/>
    <polygon points="138,22 150,10 150,74 138,74" fill="#c9581c"/>
  </svg>
);

// 5 stacked cuboids tower
const TowerOfFiveSVG = () => (
  <svg width="120" height="220" viewBox="0 0 120 220">
    {[0, 1, 2, 3, 4].map((i) => {
      const y = 180 - i * 38;
      const colors = ['#b5ead7', '#85d9b8', '#5ac9a0'];
      return (
        <g key={i}>
          <rect x="20" y={y} width="70" height="30" fill={colors[0]}/>
          <polygon points={`20,${y} 90,${y} 102,${y - 10} 32,${y - 10}`} fill={colors[1]}/>
          <polygon points={`90,${y} 102,${y - 10} 102,${y + 20} 90,${y + 30}`} fill={colors[2]}/>
        </g>
      );
    })}
  </svg>
);

const QUESTION_POOL = [
  {
    id: 'bld_q1',
    meta: {
      type: 'mcq',
      qid: 'bld_mcq_3cubes_result',
      correct: 'long_cuboid',
      explanation: 'When you join 3 cubes in a row, the result is a LONGER CUBOID — it is still a box shape but now it is much wider than it is tall, making a long rectangular cuboid.',
      correctLabel: 'A longer cuboid',
    },
    render: (lp) => (
      <div className="toy-joy-qcard">
        <div className="toy-joy-qmeta"><span className="toy-joy-qbadge">Q</span><span className="toy-joy-qtype">Picture + MCQ</span></div>
        <p className="toy-joy-qtext">When you join <strong>3 cubes in a row</strong> like this, what shape do you get?</p>
        <div style={{ display: 'flex', justifyContent: 'center', margin: '14px 0' }}>
          <ThreeCubesRowSVG />
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', margin: '6px 0 14px', fontSize: '0.85rem', color: '#6b7280', fontWeight: '700' }}>
          <span>→ becomes →</span>
          <LongCuboidSVG />
        </div>
        <div className="toy-joy-opts">
          {[
            ['bigger_cube', 'A bigger cube'],
            ['long_cuboid', 'A longer cuboid'],
            ['cylinder', 'A cylinder'],
            ['three_cubes', 'Still three separate cubes'],
          ].map(([val, label], i) => (
            <div key={val} onClick={() => lp.handleMcq('bld_mcq_3cubes_result', val)} className={`toy-joy-opt ${lp.getMcqClass('bld_mcq_3cubes_result', val)}`}>
              <span className="toy-joy-opt-letter">{String.fromCharCode(65 + i)}</span>{label}
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'bld_q2',
    meta: {
      type: 'mcq',
      qid: 'bld_mcq_cube_cuboid_join',
      correct: 'bigger_cuboid',
      explanation: 'When you join a cube and a cuboid face-to-face, the result is a BIGGER CUBOID — the combined shape still has 6 flat rectangular faces.',
      correctLabel: 'A bigger cuboid',
    },
    render: (lp) => (
      <div className="toy-joy-qcard">
        <div className="toy-joy-qmeta"><span className="toy-joy-qbadge">Q</span><span className="toy-joy-qtype">Multiple Choice</span></div>
        <p className="toy-joy-qtext">What shape do you get when you join a <strong>cube</strong> and a <strong>cuboid</strong> face-to-face?</p>
        <div style={{ display: 'flex', justifyContent: 'center', margin: '14px 0' }}>
          <CubePlusCuboidSVG />
        </div>
        <div className="toy-joy-opts">
          {[
            ['two_shapes', 'Two separate shapes'],
            ['sphere', 'A sphere'],
            ['bigger_cuboid', 'A bigger cuboid'],
            ['cube', 'A cube'],
          ].map(([val, label], i) => (
            <div key={val} onClick={() => lp.handleMcq('bld_mcq_cube_cuboid_join', val)} className={`toy-joy-opt ${lp.getMcqClass('bld_mcq_cube_cuboid_join', val)}`}>
              <span className="toy-joy-opt-letter">{String.fromCharCode(65 + i)}</span>{label}
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'bld_q3',
    meta: {
      type: 'tf',
      qid: 'tf_2cubes_cuboid',
      correct: true,
      explanation: 'True! When you stack 2 cubes on top of each other, the combined shape is a cuboid (taller rectangular box) — it has 6 flat rectangular faces.',
      correctLabel: 'True',
    },
    render: (lp) => (
      <div className="toy-joy-qcard">
        <div className="toy-joy-qmeta"><span className="toy-joy-qbadge">Q</span><span className="toy-joy-qtype">True / False</span></div>
        <p className="toy-joy-qtext">When you stack <strong>2 cubes</strong> on top of each other, you still get a <strong>cuboid</strong> shape.</p>
        <div style={{ display: 'flex', justifyContent: 'center', margin: '14px 0' }}>
          <TwoCubesStackedSVG />
        </div>
        <div className="toy-joy-tfopts">
          <button onClick={() => lp.handleTf('tf_2cubes_cuboid', true)} className={`toy-joy-tfbtn toy-joy-t ${lp.getTfClass('tf_2cubes_cuboid', true)}`}>✅ True</button>
          <button onClick={() => lp.handleTf('tf_2cubes_cuboid', false)} className={`toy-joy-tfbtn toy-joy-f ${lp.getTfClass('tf_2cubes_cuboid', false)}`}>❌ False</button>
        </div>
      </div>
    ),
  },
  {
    id: 'bld_q4',
    meta: {
      type: 'mcq',
      qid: 'bld_mcq_2x3_count',
      correct: '6',
      explanation: 'A flat 2×3×1 arrangement has 2 rows of 3 cubes each. So 2 × 3 = 6 cubes are needed.',
      correctLabel: '6',
    },
    render: (lp) => (
      <div className="toy-joy-qcard">
        <div className="toy-joy-qmeta"><span className="toy-joy-qbadge">Q</span><span className="toy-joy-qtype">Multiple Choice</span></div>
        <p className="toy-joy-qtext">How many cubes are needed to make a flat <strong>2×3×1</strong> arrangement (a grid 2 cubes wide and 3 cubes long)?</p>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', margin: '14px 0' }}>
          <ThreeCubesRowSVG />
          <ThreeCubesRowSVG />
          <div style={{ fontSize: '0.78rem', color: '#6b7280', fontWeight: '700' }}>2 rows × 3 cubes = ?</div>
        </div>
        <div className="toy-joy-opts">
          {['4', '5', '6', '8'].map((val, i) => (
            <div key={val} onClick={() => lp.handleMcq('bld_mcq_2x3_count', val)} className={`toy-joy-opt ${lp.getMcqClass('bld_mcq_2x3_count', val)}`}>
              <span className="toy-joy-opt-letter">{String.fromCharCode(65 + i)}</span>{val}
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'bld_q5',
    matchAnswers: {
      bld_match_result: {
        'bld_3_in_line': 'Long cuboid',
        'bld_6_flat': 'Flat cuboid',
        'bld_6_tall': 'Tall tower (cuboid)',
      }
    },
    rightItems: [['Long cuboid', 'Long cuboid'], ['Flat cuboid', 'Flat cuboid'], ['Tall tower (cuboid)', 'Tall tower (cuboid)']],
    meta: {
      type: 'match',
      totalPairs: 3,
      explanation: '3 cubes in a line → Long cuboid (wide). 6 cubes in 2×3×1 → Flat cuboid (flat layer). 6 cubes stacked tall → Tall tower (cuboid, tall height).',
      correctLabel: 'All 3 pairs matched correctly',
    },
    render: (lp, ctx) => (
      <div className="toy-joy-qcard">
        <div className="toy-joy-qmeta"><span className="toy-joy-qbadge">Q</span><span className="toy-joy-qtype">Match the Following</span></div>
        <p className="toy-joy-qtext">Match each cube arrangement to the result it makes. Click a left item, then a right item.</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', margin: '12px 0', flexWrap: 'wrap', alignItems: 'flex-end' }}>
          <div style={{ textAlign: 'center' }}><ThreeCubesRowSVG /><div style={{ fontSize: '0.72rem', color: '#6b7280', fontWeight: '700' }}>3 in a line</div></div>
          <div style={{ textAlign: 'center' }}><TwoCubesStackedSVG /><div style={{ fontSize: '0.72rem', color: '#6b7280', fontWeight: '700' }}>stacked tall</div></div>
        </div>
        <div className="toy-joy-match-wrap">
          <div className="toy-joy-match-col">
            {[
              ['bld_3_in_line', '3 cubes in a line'],
              ['bld_6_flat', '6 cubes in 2×3×1'],
              ['bld_6_tall', '6 cubes stacked tall'],
            ].map(([val, label]) => (
              <div key={val} onClick={() => lp.handleMatch('bld_match_result', 'left', val)} className={`toy-joy-match-item ${lp.getMatchClass('bld_match_result', 'left', val)}`}>{label}</div>
            ))}
          </div>
          <div className="toy-joy-match-center">
            <div className="toy-joy-match-line">→</div>
            <div className="toy-joy-match-line">→</div>
            <div className="toy-joy-match-line">→</div>
          </div>
          <div className="toy-joy-match-col">
            {ctx.shuffledRight.map(([val, label]) => (
              <div key={val} onClick={() => lp.handleMatch('bld_match_result', 'right', val)} className={`toy-joy-match-item ${lp.getMatchClass('bld_match_result', 'right', val)}`}>{label}</div>
            ))}
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'bld_q6',
    meta: {
      type: 'mcq',
      qid: 'bld_mcq_4cubes_tower',
      correct: 'cuboid_taller',
      explanation: 'When Jaya stacks 4 cubes in a tower, the result is a CUBOID (taller) — taller than it is wide, but still a cuboid shape with 6 flat rectangular faces.',
      correctLabel: 'Cuboid (taller)',
    },
    render: (lp) => (
      <div className="toy-joy-qcard">
        <div className="toy-joy-qmeta"><span className="toy-joy-qbadge">Q</span><span className="toy-joy-qtype">Multiple Choice</span></div>
        <p className="toy-joy-qtext">Jaya stacks <strong>4 cubes</strong> in a tower. What shape does the tower look like?</p>
        <div style={{ display: 'flex', justifyContent: 'center', margin: '14px 0' }}>
          <TowerOfFiveSVG />
        </div>
        <div className="toy-joy-opts">
          {[
            ['cylinder', 'Cylinder'],
            ['cube', 'Cube'],
            ['cone', 'Cone'],
            ['cuboid_taller', 'Cuboid (taller)'],
          ].map(([val, label], i) => (
            <div key={val} onClick={() => lp.handleMcq('bld_mcq_4cubes_tower', val)} className={`toy-joy-opt ${lp.getMcqClass('bld_mcq_4cubes_tower', val)}`}>
              <span className="toy-joy-opt-letter">{String.fromCharCode(65 + i)}</span>{label}
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'bld_q7',
    meta: {
      type: 'tf',
      qid: 'tf_2cubes_side_cuboid',
      correct: true,
      explanation: 'True! Two cubes placed side by side always make a cuboid shape — the combined shape has a rectangular face (it is wider than a single cube) but still has 6 flat faces.',
      correctLabel: 'True',
    },
    render: (lp) => (
      <div className="toy-joy-qcard">
        <div className="toy-joy-qmeta"><span className="toy-joy-qbadge">Q</span><span className="toy-joy-qtype">True / False</span></div>
        <p className="toy-joy-qtext">Two cubes placed <strong>side by side</strong> always make a <strong>cuboid</strong> shape.</p>
        <div style={{ display: 'flex', justifyContent: 'center', margin: '14px 0' }}>
          <TwoCubesSideSVG />
        </div>
        <div className="toy-joy-tfopts">
          <button onClick={() => lp.handleTf('tf_2cubes_side_cuboid', true)} className={`toy-joy-tfbtn toy-joy-t ${lp.getTfClass('tf_2cubes_side_cuboid', true)}`}>✅ True</button>
          <button onClick={() => lp.handleTf('tf_2cubes_side_cuboid', false)} className={`toy-joy-tfbtn toy-joy-f ${lp.getTfClass('tf_2cubes_side_cuboid', false)}`}>❌ False</button>
        </div>
      </div>
    ),
  },
  {
    id: 'bld_q8',
    meta: {
      type: 'mcq',
      qid: 'bld_mcq_tower_count',
      correct: '5',
      explanation: 'The tall tower model uses 5 cuboids stacked on top of each other.',
      correctLabel: '5',
    },
    render: (lp) => (
      <div className="toy-joy-qcard">
        <div className="toy-joy-qmeta"><span className="toy-joy-qbadge">Q</span><span className="toy-joy-qtype">Picture + MCQ</span></div>
        <p className="toy-joy-qtext">How many cuboids are used in this stacked tower model?</p>
        <div style={{ display: 'flex', justifyContent: 'center', margin: '14px 0' }}>
          <TowerOfFiveSVG />
        </div>
        <div className="toy-joy-opts">
          {['3', '4', '5', '6'].map((val, i) => (
            <div key={val} onClick={() => lp.handleMcq('bld_mcq_tower_count', val)} className={`toy-joy-opt ${lp.getMcqClass('bld_mcq_tower_count', val)}`}>
              <span className="toy-joy-opt-letter">{String.fromCharCode(65 + i)}</span>{val}
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'bld_q9',
    meta: {
      type: 'mcq',
      qid: 'bld_mcq_combined_faces',
      correct: '6',
      explanation: 'When you join a cube and a cuboid face-to-face, the combined shape is still a cuboid and has 6 flat faces — joining two box-like shapes always gives you another box-like (cuboid) shape with 6 faces.',
      correctLabel: '6',
    },
    render: (lp) => (
      <div className="toy-joy-qcard">
        <div className="toy-joy-qmeta"><span className="toy-joy-qbadge">Q</span><span className="toy-joy-qtype">Multiple Choice</span></div>
        <p className="toy-joy-qtext">Joining a cube and a cuboid gives you a shape with how many <strong>flat faces</strong>?</p>
        <div style={{ display: 'flex', justifyContent: 'center', margin: '14px 0' }}>
          <CubePlusCuboidSVG />
        </div>
        <div className="toy-joy-opts">
          {['4', '5', '6', '8'].map((val, i) => (
            <div key={val} onClick={() => lp.handleMcq('bld_mcq_combined_faces', val)} className={`toy-joy-opt ${lp.getMcqClass('bld_mcq_combined_faces', val)}`}>
              <span className="toy-joy-opt-letter">{String.fromCharCode(65 + i)}</span>{val}
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'bld_q10',
    meta: {
      type: 'tf',
      qid: 'tf_cubes_3d',
      correct: true,
      explanation: 'True! You can arrange cubes to fill a flat area (like a 2D grid pattern), but the cubes themselves are always 3D shapes — they have length, width, AND height.',
      correctLabel: 'True',
    },
    render: (lp) => (
      <div className="toy-joy-qcard">
        <div className="toy-joy-qmeta"><span className="toy-joy-qbadge">Q</span><span className="toy-joy-qtype">True / False</span></div>
        <p className="toy-joy-qtext">You can arrange cubes in a flat layer pattern, but cubes are always <strong>3D shapes</strong>.</p>
        <div style={{ display: 'flex', justifyContent: 'center', margin: '14px 0' }}>
          <ThreeCubesRowSVG />
        </div>
        <div className="toy-joy-tfopts">
          <button onClick={() => lp.handleTf('tf_cubes_3d', true)} className={`toy-joy-tfbtn toy-joy-t ${lp.getTfClass('tf_cubes_3d', true)}`}>✅ True</button>
          <button onClick={() => lp.handleTf('tf_cubes_3d', false)} className={`toy-joy-tfbtn toy-joy-f ${lp.getTfClass('tf_cubes_3d', false)}`}>❌ False</button>
        </div>
      </div>
    ),
  },
];

const BuildingCombiningShapes = () => {
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
      skillId="TJ-07"
      skillName="Building &amp; Combining Shapes"
      questions={questions}
      questionMeta={questionMeta}
      logicProps={logicProps}
    />
  );
};

export default BuildingCombiningShapes;
