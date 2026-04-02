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
  <svg width="70" height="85" viewBox="0 0 70 85">
    <rect x="10" y="14" width="50" height="60" rx="8" fill="#a8d5e2"/>
    <ellipse cx="35" cy="14" rx="25" ry="8" fill="#79b8cc"/>
    <ellipse cx="35" cy="74" rx="25" ry="8" fill="#79b8cc"/>
  </svg>
);

const CubeSVG = () => (
  <svg width="70" height="85" viewBox="0 0 70 85">
    <rect x="8" y="25" width="44" height="44" fill="#f4a261"/>
    <polygon points="8,25 52,25 62,15 18,15" fill="#e76f51"/>
    <polygon points="52,25 62,15 62,59 52,69" fill="#c9581c"/>
  </svg>
);

const CuboidSVG = () => (
  <svg width="85" height="70" viewBox="0 0 85 70">
    <rect x="4" y="22" width="60" height="36" fill="#b5ead7"/>
    <polygon points="4,22 64,22 74,12 14,12" fill="#85d9b8"/>
    <polygon points="64,22 74,12 74,48 64,58" fill="#5ac9a0"/>
  </svg>
);

const ConeSVG = () => (
  <svg width="70" height="85" viewBox="0 0 70 85">
    <polygon points="35,5 5,76 65,76" fill="#ffd166"/>
    <ellipse cx="35" cy="76" rx="30" ry="9" fill="#f4b942"/>
  </svg>
);

const SphereSVG = ({ highlighted = false }) => (
  <svg width="70" height="70" viewBox="0 0 70 70">
    <circle cx="35" cy="35" r="28" fill={highlighted ? '#a855f7' : '#c77dff'}/>
    <ellipse cx="35" cy="35" rx="28" ry="10" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5"/>
    <ellipse cx="35" cy="35" rx="10" ry="28" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5"/>
  </svg>
);

const QUESTION_POOL = [
  {
    id: 'prop_q1',
    meta: {
      type: 'singlePic',
      correct: 'prop_sphere_id',
      explanation: 'A sphere has NO edges and NO corners — only one continuous curved surface all around. All other shapes (cube, cylinder, cone) have at least some edges.',
      correctLabel: 'Shape D (Sphere)',
    },
    render: (lp) => (
      <div className="toy-joy-qcard">
        <div className="toy-joy-qmeta"><span className="toy-joy-qbadge">Q</span><span className="toy-joy-qtype">Click the Shape</span></div>
        <p className="toy-joy-qtext">Click the shape that has <strong>NO EDGES</strong> at all.</p>
        <div className="toy-joy-pic-row" style={{ justifyContent: 'center', gap: '16px', flexWrap: 'wrap', marginTop: '14px' }}>
          {[
            { id: 'prop_cube_id', label: 'Shape A', svg: <CubeSVG /> },
            { id: 'prop_cyl_id', label: 'Shape B', svg: <CylinderSVG /> },
            { id: 'prop_cone_id', label: 'Shape C', svg: <ConeSVG /> },
            { id: 'prop_sphere_id', label: 'Shape D', svg: <SphereSVG /> },
          ].map(({ id, label, svg }) => (
            <div key={id} className="toy-joy-pic-item" onClick={() => lp.handleSinglePic(id)}>
              <div className={`${lp.getSinglePicClass(id)}`} style={{ border: `3px solid ${lp.getSinglePicClass(id) === 'toy-joy-correct' ? '#16a34a' : lp.getSinglePicClass(id) === 'toy-joy-wrong' ? '#dc2626' : lp.getSinglePicClass(id) === 'toy-joy-selected' ? '#f4b942' : '#e2e8f0'}`, borderRadius: '12px', padding: '6px', background: '#f8fafc', transition: 'all .15s' }}>
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
    id: 'prop_q2',
    meta: {
      type: 'mcq',
      qid: 'prop_mcq_only_flat',
      correct: 'cube_cuboid',
      explanation: 'A cube and a cuboid have ONLY flat faces — no curved surface at all. A cylinder and cone both have curved surfaces. A sphere has only a curved surface.',
      correctLabel: 'Cube / Cuboid',
    },
    render: (lp) => (
      <div className="toy-joy-qcard">
        <div className="toy-joy-qmeta"><span className="toy-joy-qbadge">Q</span><span className="toy-joy-qtype">Multiple Choice</span></div>
        <p className="toy-joy-qtext">Which shape has <strong>ONLY flat faces</strong> with <strong>no curved surface</strong> at all?</p>
        <div className="toy-joy-pic-row" style={{ justifyContent: 'center', gap: '12px', marginTop: '10px', marginBottom: '4px', pointerEvents: 'none' }}>
          {[<SphereSVG key="s"/>, <CylinderSVG key="cy"/>, <ConeSVG key="co"/>, <CubeSVG key="cu"/>].map((svg, i) => (
            <div key={i} style={{ border: '2px solid #e2e8f0', borderRadius: '10px', padding: '4px', background: '#f8fafc' }}>{svg}</div>
          ))}
        </div>
        <div className="toy-joy-opts">
          {[
            ['sphere', 'Sphere'],
            ['cylinder', 'Cylinder'],
            ['cone', 'Cone'],
            ['cube_cuboid', 'Cube / Cuboid'],
          ].map(([val, label], i) => (
            <div key={val} onClick={() => lp.handleMcq('prop_mcq_only_flat', val)} className={`toy-joy-opt ${lp.getMcqClass('prop_mcq_only_flat', val)}`}>
              <span className="toy-joy-opt-letter">{String.fromCharCode(65 + i)}</span>{label}
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'prop_q3',
    meta: {
      type: 'tf',
      qid: 'tf_cyl_bothfaces',
      correct: true,
      explanation: 'True! A cylinder has TWO flat circular faces (one at each end) AND one curved surface (the body wrapping around). So it has both flat and curved surfaces.',
      correctLabel: 'True',
    },
    render: (lp) => (
      <div className="toy-joy-qcard">
        <div className="toy-joy-qmeta"><span className="toy-joy-qbadge">Q</span><span className="toy-joy-qtype">True / False</span></div>
        <p className="toy-joy-qtext">A cylinder has <strong>BOTH flat faces AND a curved surface</strong>.</p>
        <div style={{ display: 'flex', justifyContent: 'center', margin: '14px 0' }}>
          <CylinderSVG />
        </div>
        <div className="toy-joy-tfopts">
          <button onClick={() => lp.handleTf('tf_cyl_bothfaces', true)} className={`toy-joy-tfbtn toy-joy-t ${lp.getTfClass('tf_cyl_bothfaces', true)}`}>✅ True</button>
          <button onClick={() => lp.handleTf('tf_cyl_bothfaces', false)} className={`toy-joy-tfbtn toy-joy-f ${lp.getTfClass('tf_cyl_bothfaces', false)}`}>❌ False</button>
        </div>
      </div>
    ),
  },
  {
    id: 'prop_q4',
    matchAnswers: {
      prop_match_property: {
        'prop_no_edges_corners': 'Sphere',
        'prop_only_flat_12edges': 'Cube / Cuboid',
        'prop_one_flat_pointed': 'Cone',
        'prop_two_flat_circles': 'Cylinder',
      }
    },
    meta: {
      type: 'match',
      totalPairs: 4,
      explanation: 'No edges/corners/only curved → Sphere. Only flat faces, 12 edges, 8 corners → Cube/Cuboid. One flat circular base + curved + pointed tip → Cone. Two flat circular faces + one curved surface → Cylinder.',
      correctLabel: 'All 4 pairs matched correctly',
    },
    render: (lp) => (
      <div className="toy-joy-qcard">
        <div className="toy-joy-qmeta"><span className="toy-joy-qbadge">Q</span><span className="toy-joy-qtype">Match the Following</span></div>
        <p className="toy-joy-qtext">Match each property to the correct 3D shape. Click a left item, then a right item.</p>
        <div className="toy-joy-pic-row" style={{ justifyContent: 'center', gap: '12px', marginTop: '10px', marginBottom: '4px', pointerEvents: 'none' }}>
          {[
            { svg: <SphereSVG key="s"/>, label: 'Sphere' },
            { svg: <CubeSVG key="cu"/>, label: 'Cube/Cuboid' },
            { svg: <ConeSVG key="co"/>, label: 'Cone' },
            { svg: <CylinderSVG key="cy"/>, label: 'Cylinder' },
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
              ['prop_no_edges_corners', 'No edges, no corners, only curved'],
              ['prop_only_flat_12edges', 'Only flat faces, 12 edges, 8 corners'],
              ['prop_one_flat_pointed', '1 flat circular base + curved + pointed tip'],
              ['prop_two_flat_circles', 'Two flat circular faces + one curved surface'],
            ].map(([val, label]) => (
              <div key={val} onClick={() => lp.handleMatch('prop_match_property', 'left', val)} className={`toy-joy-match-item ${lp.getMatchClass('prop_match_property', 'left', val)}`} style={{ fontSize: '0.78rem' }}>{label}</div>
            ))}
          </div>
          <div className="toy-joy-match-center">
            <div className="toy-joy-match-line">→</div>
            <div className="toy-joy-match-line">→</div>
            <div className="toy-joy-match-line">→</div>
            <div className="toy-joy-match-line">→</div>
          </div>
          <div className="toy-joy-match-col">
            {['Sphere', 'Cube / Cuboid', 'Cone', 'Cylinder'].map(val => (
              <div key={val} onClick={() => lp.handleMatch('prop_match_property', 'right', val)} className={`toy-joy-match-item ${lp.getMatchClass('prop_match_property', 'right', val)}`}>{val}</div>
            ))}
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'prop_q5',
    meta: {
      type: 'multipick',
      correct: ['prop_mp_cyl', 'prop_mp_cone'],
      explanation: 'Cylinder has two flat circular faces AND one curved surface. Cone has one flat circular face AND one curved surface. Both have BOTH types. Sphere has only curved. Cube and Cuboid have only flat faces.',
      correctLabel: 'Cylinder and Cone',
    },
    render: (lp) => (
      <div className="toy-joy-qcard">
        <div className="toy-joy-qmeta"><span className="toy-joy-qbadge">Q</span><span className="toy-joy-qtype">Multi-Pick</span></div>
        <p className="toy-joy-qtext">Click <strong>ALL</strong> shapes that have <strong>BOTH flat faces AND curved surfaces</strong>.</p>
        <div className="toy-joy-pic-row" style={{ justifyContent: 'center', gap: '16px', flexWrap: 'wrap', marginTop: '14px' }}>
          {[
            { id: 'prop_mp_cyl', label: 'Shape A', svg: <CylinderSVG /> },
            { id: 'prop_mp_cube', label: 'Shape B', svg: <CubeSVG /> },
            { id: 'prop_mp_cone', label: 'Shape C', svg: <ConeSVG /> },
            { id: 'prop_mp_sphere', label: 'Shape D', svg: <SphereSVG /> },
            { id: 'prop_mp_cuboid', label: 'Shape E', svg: <CuboidSVG /> },
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
    id: 'prop_q6',
    meta: {
      type: 'mcq',
      qid: 'prop_mcq_kiara_tara',
      correct: 'kiara',
      explanation: 'Kiara is correct! A sphere has NO edges and NO corners — it is completely round with just one continuous curved surface. Tara is wrong — spheres have zero edges.',
      correctLabel: 'Kiara',
    },
    render: (lp) => (
      <div className="toy-joy-qcard">
        <div className="toy-joy-qmeta"><span className="toy-joy-qbadge">Q</span><span className="toy-joy-qtype">Multiple Choice</span></div>
        <p className="toy-joy-qtext">Kiara says a sphere has <strong>no edges and no corners</strong>. Tara says a sphere has <strong>many edges</strong>. Who is correct?</p>
        <div style={{ display: 'flex', justifyContent: 'center', margin: '14px 0' }}>
          <SphereSVG />
        </div>
        <div className="toy-joy-opts">
          {[['tara', 'Tara'], ['both', 'Both are right'], ['kiara', 'Kiara'], ['neither', 'Neither is right']].map(([val, label], i) => (
            <div key={val} onClick={() => lp.handleMcq('prop_mcq_kiara_tara', val)} className={`toy-joy-opt ${lp.getMcqClass('prop_mcq_kiara_tara', val)}`}>
              <span className="toy-joy-opt-letter">{String.fromCharCode(65 + i)}</span>{label}
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'prop_q7',
    meta: {
      type: 'tf',
      qid: 'tf_sphere_noflatnoedge',
      correct: true,
      explanation: 'True! A sphere has no flat faces and no edges at all. It is a perfectly round shape with only one continuous curved surface.',
      correctLabel: 'True',
    },
    render: (lp) => (
      <div className="toy-joy-qcard">
        <div className="toy-joy-qmeta"><span className="toy-joy-qbadge">Q</span><span className="toy-joy-qtype">True / False</span></div>
        <p className="toy-joy-qtext">A sphere has <strong>no flat faces</strong> and <strong>no edges</strong>.</p>
        <div style={{ display: 'flex', justifyContent: 'center', margin: '14px 0' }}>
          <SphereSVG />
        </div>
        <div className="toy-joy-tfopts">
          <button onClick={() => lp.handleTf('tf_sphere_noflatnoedge', true)} className={`toy-joy-tfbtn toy-joy-t ${lp.getTfClass('tf_sphere_noflatnoedge', true)}`}>✅ True</button>
          <button onClick={() => lp.handleTf('tf_sphere_noflatnoedge', false)} className={`toy-joy-tfbtn toy-joy-f ${lp.getTfClass('tf_sphere_noflatnoedge', false)}`}>❌ False</button>
        </div>
      </div>
    ),
  },
  {
    id: 'prop_q8',
    meta: {
      type: 'mcq',
      qid: 'prop_mcq_one_flat_curved',
      correct: 'cone',
      explanation: 'A cone has EXACTLY ONE flat face (the circular base) and ONE curved surface that goes up to the pointed tip. A cylinder has two flat faces. A sphere has none.',
      correctLabel: 'Cone',
    },
    render: (lp) => (
      <div className="toy-joy-qcard">
        <div className="toy-joy-qmeta"><span className="toy-joy-qbadge">Q</span><span className="toy-joy-qtype">Multiple Choice</span></div>
        <p className="toy-joy-qtext">Which shape has <strong>EXACTLY ONE flat face</strong> (the circular base) and <strong>ONE curved surface</strong>?</p>
        <div style={{ display: 'flex', justifyContent: 'center', margin: '14px 0' }}>
          <ConeSVG />
        </div>
        <div className="toy-joy-opts">
          {[['sphere', 'Sphere'], ['cuboid', 'Cuboid'], ['cylinder', 'Cylinder'], ['cone', 'Cone']].map(([val, label], i) => (
            <div key={val} onClick={() => lp.handleMcq('prop_mcq_one_flat_curved', val)} className={`toy-joy-opt ${lp.getMcqClass('prop_mcq_one_flat_curved', val)}`}>
              <span className="toy-joy-opt-letter">{String.fromCharCode(65 + i)}</span>{label}
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'prop_q9',
    meta: {
      type: 'mcq',
      qid: 'prop_mcq_cube_faces',
      correct: '6',
      explanation: 'A cube has exactly 6 faces — all of them are equal squares. Think of a dice: it has 6 numbered faces.',
      correctLabel: '6',
    },
    render: (lp) => (
      <div className="toy-joy-qcard">
        <div className="toy-joy-qmeta"><span className="toy-joy-qbadge">Q</span><span className="toy-joy-qtype">Multiple Choice</span></div>
        <p className="toy-joy-qtext">A cube has how many <strong>FACES</strong>?</p>
        <div style={{ display: 'flex', justifyContent: 'center', margin: '14px 0' }}>
          <CubeSVG />
        </div>
        <div className="toy-joy-opts">
          {['4', '5', '6', '8'].map((val, i) => (
            <div key={val} onClick={() => lp.handleMcq('prop_mcq_cube_faces', val)} className={`toy-joy-opt ${lp.getMcqClass('prop_mcq_cube_faces', val)}`}>
              <span className="toy-joy-opt-letter">{String.fromCharCode(65 + i)}</span>{val}
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'prop_q10',
    meta: {
      type: 'tf',
      qid: 'tf_cuboid_cube_6faces',
      correct: true,
      explanation: 'True! Both a cube and a cuboid have exactly 6 faces. The difference is that in a cube all 6 faces are equal squares, while in a cuboid the faces are rectangles of different sizes.',
      correctLabel: 'True',
    },
    render: (lp) => (
      <div className="toy-joy-qcard">
        <div className="toy-joy-qmeta"><span className="toy-joy-qbadge">Q</span><span className="toy-joy-qtype">True / False</span></div>
        <p className="toy-joy-qtext">A cuboid has the <strong>SAME number of faces</strong> as a cube — both have <strong>6 faces</strong>.</p>
        <div className="toy-joy-pic-row" style={{ justifyContent: 'center', gap: '16px', margin: '14px 0', pointerEvents: 'none' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
            <div style={{ border: '2px solid #e2e8f0', borderRadius: '10px', padding: '4px', background: '#f8fafc' }}><CubeSVG /></div>
            <span style={{ fontSize: '0.75rem', fontWeight: '700', color: '#64748b' }}>Cube</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
            <div style={{ border: '2px solid #e2e8f0', borderRadius: '10px', padding: '4px', background: '#f8fafc' }}><CuboidSVG /></div>
            <span style={{ fontSize: '0.75rem', fontWeight: '700', color: '#64748b' }}>Cuboid</span>
          </div>
        </div>
        <div className="toy-joy-tfopts">
          <button onClick={() => lp.handleTf('tf_cuboid_cube_6faces', true)} className={`toy-joy-tfbtn toy-joy-t ${lp.getTfClass('tf_cuboid_cube_6faces', true)}`}>✅ True</button>
          <button onClick={() => lp.handleTf('tf_cuboid_cube_6faces', false)} className={`toy-joy-tfbtn toy-joy-f ${lp.getTfClass('tf_cuboid_cube_6faces', false)}`}>❌ False</button>
        </div>
      </div>
    ),
  },
];

const PropertiesOf3DShapes = () => {
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
      skillId="TJ-04"
      skillName="Properties of 3D Shapes"
      questions={questions}
      questionMeta={questionMeta}
      logicProps={logicProps}
    />
  );
};

export default PropertiesOf3DShapes;
