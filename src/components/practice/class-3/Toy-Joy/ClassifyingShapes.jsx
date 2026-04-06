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

const CylinderSVG = () => (
  <svg width="65" height="80" viewBox="0 0 70 85">
    <rect x="10" y="14" width="50" height="60" rx="8" fill="#a8d5e2"/>
    <ellipse cx="35" cy="14" rx="25" ry="8" fill="#79b8cc"/>
    <ellipse cx="35" cy="74" rx="25" ry="8" fill="#79b8cc"/>
  </svg>
);

const CubeSVG = ({ color = '#f4a261' }) => (
  <svg width="65" height="80" viewBox="0 0 70 85">
    <rect x="8" y="25" width="44" height="44" fill={color}/>
    <polygon points="8,25 52,25 62,15 18,15" fill="#e76f51"/>
    <polygon points="52,25 62,15 62,59 52,69" fill="#c9581c"/>
  </svg>
);

const CuboidSVG = () => (
  <svg width="80" height="65" viewBox="0 0 85 70">
    <rect x="4" y="22" width="60" height="36" fill="#b5ead7"/>
    <polygon points="4,22 64,22 74,12 14,12" fill="#85d9b8"/>
    <polygon points="64,22 74,12 74,48 64,58" fill="#5ac9a0"/>
  </svg>
);

const ConeSVG = ({ color = '#ffd166' }) => (
  <svg width="65" height="80" viewBox="0 0 70 85">
    <polygon points="35,5 5,76 65,76" fill={color}/>
    <ellipse cx="35" cy="76" rx="30" ry="9" fill="#f4b942"/>
  </svg>
);

const SphereSVG = () => (
  <svg width="65" height="65" viewBox="0 0 70 70">
    <circle cx="35" cy="35" r="28" fill="#c77dff"/>
    <ellipse cx="35" cy="35" rx="28" ry="10" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5"/>
    <ellipse cx="35" cy="35" rx="10" ry="28" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5"/>
  </svg>
);

const QUESTION_POOL = [
  {
    id: 'cls_q1',
    meta: {
      type: 'multipick',
      correct: ['cls_cube1', 'cls_cube2'],
      explanation: 'Shape A and Shape C are cubes — they have 6 equal square faces. Shape B is a cone (pointed), Shape D is a cuboid (rectangular), and Shape E is a cylinder (rounded).',
      correctLabel: 'Shape A and Shape C (Cubes)',
    },
    render: (lp) => (
      <div className="toy-joy-qcard">
        <div className="toy-joy-qmeta"><span className="toy-joy-qbadge">Q</span><span className="toy-joy-qtype">Multi-Pick</span></div>
        <p className="toy-joy-qtext">Click <strong>ALL the CUBES</strong> from the shapes below.</p>
        <div className="toy-joy-pic-row" style={{ justifyContent: 'center', gap: '14px', flexWrap: 'wrap', marginTop: '14px' }}>
          {[
            { id: 'cls_cube1', label: 'Shape A', svg: <CubeSVG /> },
            { id: 'cls_cone1', label: 'Shape B', svg: <ConeSVG /> },
            { id: 'cls_cube2', label: 'Shape C', svg: <CubeSVG color="#e89c6e" /> },
            { id: 'cls_cuboid1', label: 'Shape D', svg: <CuboidSVG /> },
            { id: 'cls_cyl1', label: 'Shape E', svg: <CylinderSVG /> },
          ].map(({ id, label, svg }) => (
            <div key={id} className="toy-joy-pic-item" onClick={() => lp.toggleMultiPic(id)}>
              <div style={{ border: `3px solid ${lp.getMultiPicClass(id) === 'toy-joy-selected' ? '#f4b942' : '#e2e8f0'}`, borderRadius: '12px', padding: '6px', background: '#f8fafc', transition: 'all .15s' }}>
                {svg}
              </div>
              <span className="toy-joy-pic-label">{label}</span>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'cls_q2',
    meta: {
      type: 'mcq',
      qid: 'cls_mcq_cube_cuboid',
      correct: 'all_cubes_are_cuboids',
      explanation: "A cube is a SPECIAL cuboid where all 6 faces are equal squares. So all cubes are cuboids, but not all cuboids are cubes (a regular rectangular box is a cuboid but not a cube).",
      correctLabel: 'All cubes are cuboids (but not all cuboids are cubes)',
    },
    render: (lp) => (
      <div className="toy-joy-qcard">
        <div className="toy-joy-qmeta"><span className="toy-joy-qbadge">Q</span><span className="toy-joy-qtype">Multiple Choice</span></div>
        <p className="toy-joy-qtext">The textbook says <em>'A cube is a special type of cuboid.'</em> Which statement is TRUE?</p>
        <div className="toy-joy-pic-row" style={{ justifyContent: 'center', gap: '16px', margin: '12px 0', pointerEvents: 'none' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
            <div style={{ border: '2px solid #e2e8f0', borderRadius: '10px', padding: '4px', background: '#f8fafc' }}><CubeSVG /></div>
            <span style={{ fontSize: '0.75rem', fontWeight: '700', color: '#64748b' }}>Cube</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
            <div style={{ border: '2px solid #e2e8f0', borderRadius: '10px', padding: '4px', background: '#f8fafc' }}><CuboidSVG /></div>
            <span style={{ fontSize: '0.75rem', fontWeight: '700', color: '#64748b' }}>Cuboid</span>
          </div>
        </div>
        <div className="toy-joy-opts">
          {[
            ['all_cuboids_are_cubes', 'All cuboids are cubes'],
            ['all_cubes_are_cuboids', 'All cubes are cuboids (but not all cuboids are cubes)'],
            ['cube_has_more_faces', 'A cube has more faces than a cuboid'],
            ['they_are_completely_different', 'Cubes and cuboids are completely different shapes'],
          ].map(([val, label], i) => (
            <div key={val} onClick={() => lp.handleMcq('cls_mcq_cube_cuboid', val)} className={`toy-joy-opt ${lp.getMcqClass('cls_mcq_cube_cuboid', val)}`}>
              <span className="toy-joy-opt-letter">{String.fromCharCode(65 + i)}</span>{label}
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'cls_q3',
    meta: {
      type: 'tf',
      qid: 'tf_sphere_cyl_curved',
      correct: true,
      explanation: 'True! Both a sphere and a cylinder have curved surfaces. The sphere is entirely curved, and the cylinder has one curved surface wrapping around its body. They both belong in the curved-surface group.',
      correctLabel: 'True',
    },
    render: (lp) => (
      <div className="toy-joy-qcard">
        <div className="toy-joy-qmeta"><span className="toy-joy-qbadge">Q</span><span className="toy-joy-qtype">True / False</span></div>
        <p className="toy-joy-qtext">A sphere and a cylinder both have <strong>curved surfaces</strong>, so they belong in the <strong>'curved surface'</strong> group.</p>
        <div className="toy-joy-pic-row" style={{ justifyContent: 'center', gap: '16px', margin: '12px 0', pointerEvents: 'none' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
            <div style={{ border: '2px solid #e2e8f0', borderRadius: '10px', padding: '4px', background: '#f8fafc' }}><SphereSVG /></div>
            <span style={{ fontSize: '0.75rem', fontWeight: '700', color: '#64748b' }}>Sphere</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
            <div style={{ border: '2px solid #e2e8f0', borderRadius: '10px', padding: '4px', background: '#f8fafc' }}><CylinderSVG /></div>
            <span style={{ fontSize: '0.75rem', fontWeight: '700', color: '#64748b' }}>Cylinder</span>
          </div>
        </div>
        <div className="toy-joy-tfopts">
          <button onClick={() => lp.handleTf('tf_sphere_cyl_curved', true)} className={`toy-joy-tfbtn toy-joy-t ${lp.getTfClass('tf_sphere_cyl_curved', true)}`}>✅ True</button>
          <button onClick={() => lp.handleTf('tf_sphere_cyl_curved', false)} className={`toy-joy-tfbtn toy-joy-f ${lp.getTfClass('tf_sphere_cyl_curved', false)}`}>❌ False</button>
        </div>
      </div>
    ),
  },
  {
    id: 'cls_q4',
    meta: {
      type: 'multipick',
      correct: ['cls_cone_a', 'cls_cone_b'],
      explanation: 'Shape A and Shape C are cones — they have a pointed tip and a flat circular base. Shape B is a cube, Shape D is a cylinder.',
      correctLabel: 'Shape A and Shape C (Cones)',
    },
    render: (lp) => (
      <div className="toy-joy-qcard">
        <div className="toy-joy-qmeta"><span className="toy-joy-qbadge">Q</span><span className="toy-joy-qtype">Multi-Pick</span></div>
        <p className="toy-joy-qtext">Click <strong>ALL the CONES</strong> from the shapes below.</p>
        <div className="toy-joy-pic-row" style={{ justifyContent: 'center', gap: '14px', flexWrap: 'wrap', marginTop: '14px' }}>
          {[
            { id: 'cls_cone_a', label: 'Shape A', svg: <ConeSVG /> },
            { id: 'cls_cube_b', label: 'Shape B', svg: <CubeSVG /> },
            { id: 'cls_cone_b', label: 'Shape C', svg: <ConeSVG color="#ff9f7a" /> },
            { id: 'cls_cyl_d', label: 'Shape D', svg: <CylinderSVG /> },
          ].map(({ id, label, svg }) => (
            <div key={id} className="toy-joy-pic-item" onClick={() => lp.toggleMultiPic(id)}>
              <div style={{ border: `3px solid ${lp.getMultiPicClass(id) === 'toy-joy-selected' ? '#f4b942' : '#e2e8f0'}`, borderRadius: '12px', padding: '6px', background: '#f8fafc', transition: 'all .15s' }}>
                {svg}
              </div>
              <span className="toy-joy-pic-label">{label}</span>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'cls_q5',
    matchAnswers: {
      cls_match_objects: {
        'cls_ball_wool': 'Sphere',
        'cls_chalk': 'Cylinder',
        'cls_birthday_cap': 'Cone',
        'cls_pencil_box': 'Cuboid',
      }
    },
    rightItems: [['Sphere', 'Sphere'], ['Cylinder', 'Cylinder'], ['Cone', 'Cone'], ['Cuboid', 'Cuboid']],
    meta: {
      type: 'match',
      totalPairs: 4,
      explanation: 'Ball of wool → Sphere (round all over). Piece of chalk → Cylinder (long with circular ends). Birthday cap → Cone (pointed top with circular base). Pencil box → Cuboid (rectangular box).',
      correctLabel: 'All 4 pairs matched correctly',
    },
    render: (lp, ctx) => (
      <div className="toy-joy-qcard">
        <div className="toy-joy-qmeta"><span className="toy-joy-qbadge">Q</span><span className="toy-joy-qtype">Match the Following</span></div>
        <p className="toy-joy-qtext">Match each classroom object to its shape group. Click a left item, then a right item.</p>
        <div className="toy-joy-pic-row" style={{ justifyContent: 'center', gap: '12px', margin: '10px 0 4px', pointerEvents: 'none' }}>
          {[
            { svg: <SphereSVG />, label: 'Sphere' },
            { svg: <CylinderSVG />, label: 'Cylinder' },
            { svg: <ConeSVG />, label: 'Cone' },
            { svg: <CuboidSVG />, label: 'Cuboid' },
          ].map(({ svg, label }, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px' }}>
              <div style={{ border: '2px solid #e2e8f0', borderRadius: '10px', padding: '4px', background: '#f8fafc' }}>{svg}</div>
              <span style={{ fontSize: '0.7rem', fontWeight: '700', color: '#64748b' }}>{label}</span>
            </div>
          ))}
        </div>
        <div className="toy-joy-match-wrap">
          <div className="toy-joy-match-col">
            {[
              ['cls_ball_wool', '🧶 Ball of wool'],
              ['cls_chalk', '🖍️ Piece of chalk'],
              ['cls_birthday_cap', '🎉 Birthday cap'],
              ['cls_pencil_box', '📦 Pencil box'],
            ].map(([val, label]) => (
              <div key={val} onClick={() => lp.handleMatch('cls_match_objects', 'left', val)} className={`toy-joy-match-item ${lp.getMatchClass('cls_match_objects', 'left', val)}`}>{label}</div>
            ))}
          </div>
          <div className="toy-joy-match-center">
            <div className="toy-joy-match-line">→</div>
            <div className="toy-joy-match-line">→</div>
            <div className="toy-joy-match-line">→</div>
            <div className="toy-joy-match-line">→</div>
          </div>
          <div className="toy-joy-match-col">
            {ctx.shuffledRight.map(([val, label]) => (
              <div key={val} onClick={() => lp.handleMatch('cls_match_objects', 'right', val)} className={`toy-joy-match-item ${lp.getMatchClass('cls_match_objects', 'right', val)}`}>{label}</div>
            ))}
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'cls_q6',
    meta: {
      type: 'mcq',
      qid: 'cls_mcq_ball_group',
      correct: 'sphere',
      explanation: 'A ball, an orange, and a globe are all perfectly round shapes — they all belong to the SPHERE group.',
      correctLabel: 'Sphere',
    },
    render: (lp) => (
      <div className="toy-joy-qcard">
        <div className="toy-joy-qmeta"><span className="toy-joy-qbadge">Q</span><span className="toy-joy-qtype">Multiple Choice</span></div>
        <p className="toy-joy-qtext">Jaya finds a <strong>ball</strong>, an <strong>orange</strong>, and a <strong>globe</strong>. Which GROUP do all three belong to?</p>
        <div className="toy-joy-opts">
          {[['cylinder', 'Cylinder'], ['cuboid', 'Cuboid'], ['cone', 'Cone'], ['sphere', 'Sphere']].map(([val, label], i) => (
            <div key={val} onClick={() => lp.handleMcq('cls_mcq_ball_group', val)} className={`toy-joy-opt ${lp.getMcqClass('cls_mcq_ball_group', val)}`}>
              <span className="toy-joy-opt-letter">{String.fromCharCode(65 + i)}</span>{label}
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'cls_q7',
    meta: {
      type: 'tf',
      qid: 'tf_book_brick_cuboid',
      correct: true,
      explanation: 'True! A book and a brick are both rectangular box shapes with 6 flat rectangular faces — they both belong to the CUBOID group.',
      correctLabel: 'True',
    },
    render: (lp) => (
      <div className="toy-joy-qcard">
        <div className="toy-joy-qmeta"><span className="toy-joy-qbadge">Q</span><span className="toy-joy-qtype">True / False</span></div>
        <p className="toy-joy-qtext">A <strong>book</strong> and a <strong>brick</strong> both belong to the <strong>CUBOID group</strong>.</p>
        <div className="toy-joy-tfopts">
          <button onClick={() => lp.handleTf('tf_book_brick_cuboid', true)} className={`toy-joy-tfbtn toy-joy-t ${lp.getTfClass('tf_book_brick_cuboid', true)}`}>✅ True</button>
          <button onClick={() => lp.handleTf('tf_book_brick_cuboid', false)} className={`toy-joy-tfbtn toy-joy-f ${lp.getTfClass('tf_book_brick_cuboid', false)}`}>❌ False</button>
        </div>
      </div>
    ),
  },
  {
    id: 'cls_q8',
    meta: {
      type: 'mcq',
      qid: 'cls_mcq_not_flat_only',
      correct: 'cone',
      explanation: "A cone does NOT belong in the 'Flat Faces Only' group because it has BOTH a flat circular base AND a curved surface. Cubes and cuboids have only flat faces.",
      correctLabel: 'Cone',
    },
    render: (lp) => (
      <div className="toy-joy-qcard">
        <div className="toy-joy-qmeta"><span className="toy-joy-qbadge">Q</span><span className="toy-joy-qtype">Multiple Choice</span></div>
        <p className="toy-joy-qtext">Which of these shapes does <strong>NOT</strong> belong in the <strong>'Flat Faces Only'</strong> group?</p>
        <div className="toy-joy-opts">
          {[['cube', 'Cube'], ['cuboid', 'Cuboid'], ['cone', 'Cone'], ['cube2', 'Cube (dice)']].map(([val, label], i) => (
            <div key={val} onClick={() => lp.handleMcq('cls_mcq_not_flat_only', val)} className={`toy-joy-opt ${lp.getMcqClass('cls_mcq_not_flat_only', val)}`}>
              <span className="toy-joy-opt-letter">{String.fromCharCode(65 + i)}</span>{label}
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'cls_q9',
    meta: {
      type: 'mcq',
      qid: 'cls_mcq_can_roll',
      correct: 'cyl_sphere_cone',
      explanation: 'Cylinder, Sphere, and Cone can all ROLL because they all have curved surfaces. Cube and Cuboid have only flat faces and cannot roll — they slide.',
      correctLabel: 'Cylinder, Sphere, and Cone',
    },
    render: (lp) => (
      <div className="toy-joy-qcard">
        <div className="toy-joy-qmeta"><span className="toy-joy-qbadge">Q</span><span className="toy-joy-qtype">Multiple Choice</span></div>
        <p className="toy-joy-qtext">Devika wants to put shapes that can <strong>ROLL</strong> into one group. Which shapes should she include?</p>
        <div className="toy-joy-opts">
          {[
            ['cube_cuboid_only', 'Cube and Cuboid only'],
            ['cube_cyl_cone', 'Cube, Cylinder and Cone'],
            ['cyl_sphere_cone', 'Cylinder, Sphere and Cone'],
            ['all_shapes', 'All shapes can roll'],
          ].map(([val, label], i) => (
            <div key={val} onClick={() => lp.handleMcq('cls_mcq_can_roll', val)} className={`toy-joy-opt ${lp.getMcqClass('cls_mcq_can_roll', val)}`}>
              <span className="toy-joy-opt-letter">{String.fromCharCode(65 + i)}</span>{label}
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'cls_q10',
    meta: {
      type: 'multipick',
      correct: ['cls_fp_cube', 'cls_fp_cuboid'],
      explanation: 'Cube and Cuboid have ONLY flat faces — no curved surfaces at all. Cylinder, Cone, and Sphere all have curved surfaces, so they do not belong in the flat-only group.',
      correctLabel: 'Cube and Cuboid',
    },
    render: (lp) => (
      <div className="toy-joy-qcard">
        <div className="toy-joy-qmeta"><span className="toy-joy-qbadge">Q</span><span className="toy-joy-qtype">Multi-Pick</span></div>
        <p className="toy-joy-qtext">Click <strong>ALL</strong> shapes that have <strong>ONLY flat faces</strong> (no curved surface at all).</p>
        <div className="toy-joy-pic-row" style={{ justifyContent: 'center', gap: '14px', flexWrap: 'wrap', marginTop: '14px' }}>
          {[
            { id: 'cls_fp_cube', label: 'Shape A', svg: <CubeSVG /> },
            { id: 'cls_fp_cyl', label: 'Shape B', svg: <CylinderSVG /> },
            { id: 'cls_fp_cone', label: 'Shape C', svg: <ConeSVG /> },
            { id: 'cls_fp_cuboid', label: 'Shape D', svg: <CuboidSVG /> },
            { id: 'cls_fp_sphere', label: 'Shape E', svg: <SphereSVG /> },
          ].map(({ id, label, svg }) => (
            <div key={id} className="toy-joy-pic-item" onClick={() => lp.toggleMultiPic(id)}>
              <div style={{ border: `3px solid ${lp.getMultiPicClass(id) === 'toy-joy-selected' ? '#f4b942' : '#e2e8f0'}`, borderRadius: '12px', padding: '6px', background: '#f8fafc', transition: 'all .15s' }}>
                {svg}
              </div>
              <span className="toy-joy-pic-label">{label}</span>
            </div>
          ))}
        </div>
      </div>
    ),
  },
];

const ClassifyingShapes = () => {
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
      skillId="TJ-05"
      skillName="Classifying Shapes"
      questions={questions}
      questionMeta={questionMeta}
      logicProps={logicProps}
    />
  );
};

export default ClassifyingShapes;
