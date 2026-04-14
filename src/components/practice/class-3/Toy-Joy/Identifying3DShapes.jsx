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

const SphereSVG = () => (
  <svg width="70" height="70" viewBox="0 0 70 70">
    <circle cx="35" cy="35" r="28" fill="#c77dff"/>
    <ellipse cx="35" cy="35" rx="28" ry="10" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5"/>
    <ellipse cx="35" cy="35" rx="10" ry="28" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5"/>
  </svg>
);

const QUESTION_POOL = [
  {
    id: 'id_q1',
    meta: {
      type: 'mcq',
      qid: 'id_mcq_pointed',
      correct: 'id_mcq_pointed_cone',
      explanation: 'A cone has a pointed top and one flat circular base. The cylinder has two flat circular faces and no point. The cuboid has only flat rectangular faces. The sphere has no flat faces at all.',
      correctLabel: 'Shape D (Cone)',
    },
    render: (lp) => (
      <div className="toy-joy-qcard">
        <div className="toy-joy-qmeta"><span className="toy-joy-qbadge">Q</span><span className="toy-joy-qtype">Multiple Choice</span></div>
        <p className="toy-joy-qtext">Which shape has a <strong>pointed top</strong> and a <strong>flat circular base</strong>?</p>
        <div className="toy-joy-pic-row" style={{ justifyContent: 'center', gap: '16px', flexWrap: 'wrap', marginTop: '14px' }}>
          {[
            { id: 'id_mcq_pointed_cyl', label: 'Shape A', svg: <CylinderSVG /> },
            { id: 'id_mcq_pointed_cube', label: 'Shape B', svg: <CubeSVG /> },
            { id: 'id_mcq_pointed_cuboid', label: 'Shape C', svg: <CuboidSVG /> },
            { id: 'id_mcq_pointed_cone', label: 'Shape D', svg: <ConeSVG /> },
          ].map(({ id, label, svg }) => (
            <div key={id} className="toy-joy-pic-item" onClick={() => lp.handleMcq('id_mcq_pointed', id)}>
              <div style={{ border: `3px solid ${lp.getMcqClass('id_mcq_pointed', id) === 'toy-joy-selected toy-joy-correct' ? '#16a34a' : lp.getMcqClass('id_mcq_pointed', id) === 'toy-joy-selected toy-joy-wrong' ? '#dc2626' : lp.getMcqClass('id_mcq_pointed', id) === 'toy-joy-selected' ? '#f4b942' : '#e2e8f0'}`, borderRadius: '12px', padding: '6px', background: '#f8fafc', transition: 'all .15s' }}>
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
    id: 'id_q2',
    meta: {
      type: 'mcq',
      qid: 'id_mcq_ball',
      correct: 'id_mcq_ball_sphere',
      explanation: 'A sphere looks like a ball and has NO flat faces at all — only a curved surface all around. The cylinder, cone, and cuboid all have at least one flat face.',
      correctLabel: 'Shape C (Sphere)',
    },
    render: (lp) => (
      <div className="toy-joy-qcard">
        <div className="toy-joy-qmeta"><span className="toy-joy-qbadge">Q</span><span className="toy-joy-qtype">Multiple Choice</span></div>
        <p className="toy-joy-qtext">Which shape looks like a ball and has <strong>NO flat faces</strong> at all?</p>
        <div className="toy-joy-pic-row" style={{ justifyContent: 'center', gap: '16px', flexWrap: 'wrap', marginTop: '14px' }}>
          {[
            { id: 'id_mcq_ball_cyl', label: 'Shape A', svg: <CylinderSVG /> },
            { id: 'id_mcq_ball_cone', label: 'Shape B', svg: <ConeSVG /> },
            { id: 'id_mcq_ball_sphere', label: 'Shape C', svg: <SphereSVG /> },
            { id: 'id_mcq_ball_cube', label: 'Shape D', svg: <CubeSVG /> },
          ].map(({ id, label, svg }) => (
            <div key={id} className="toy-joy-pic-item" onClick={() => lp.handleMcq('id_mcq_ball', id)}>
              <div style={{ border: `3px solid ${lp.getMcqClass('id_mcq_ball', id) === 'toy-joy-selected toy-joy-correct' ? '#16a34a' : lp.getMcqClass('id_mcq_ball', id) === 'toy-joy-selected toy-joy-wrong' ? '#dc2626' : lp.getMcqClass('id_mcq_ball', id) === 'toy-joy-selected' ? '#f4b942' : '#e2e8f0'}`, borderRadius: '12px', padding: '6px', background: '#f8fafc', transition: 'all .15s' }}>
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
    id: 'id_q3',
    meta: {
      type: 'tf',
      qid: 'tf_bottle_cyl',
      correct: true,
      explanation: 'True! A bottle is shaped like a cylinder. It has one curved surface wrapping around and two flat circular faces — one at the top and one at the bottom.',
      correctLabel: 'True',
    },
    render: (lp) => (
      <div className="toy-joy-qcard">
        <div className="toy-joy-qmeta"><span className="toy-joy-qbadge">Q</span><span className="toy-joy-qtype">True / False</span></div>
        <p className="toy-joy-qtext">A bottle is shaped like a <strong>cylinder</strong> — it has two flat circular faces and one curved surface.</p>
        <div style={{ display: 'flex', justifyContent: 'center', margin: '14px 0' }}>
          <CylinderSVG />
        </div>
        <div className="toy-joy-tfopts">
          <button onClick={() => lp.handleTf('tf_bottle_cyl', true)} className={`toy-joy-tfbtn toy-joy-t ${lp.getTfClass('tf_bottle_cyl', true)}`}>✅ True</button>
          <button onClick={() => lp.handleTf('tf_bottle_cyl', false)} className={`toy-joy-tfbtn toy-joy-f ${lp.getTfClass('tf_bottle_cyl', false)}`}>❌ False</button>
        </div>
      </div>
    ),
  },
  {
    id: 'id_q4',
    meta: {
      type: 'tf',
      qid: 'tf_die_cuboid',
      correct: false,
      explanation: 'False! A die (dice) is shaped like a CUBE, not a cuboid. A cube has 6 equal square faces, while a cuboid has rectangular faces that are not all the same size.',
      correctLabel: 'False — it is a Cube',
    },
    render: (lp) => (
      <div className="toy-joy-qcard">
        <div className="toy-joy-qmeta"><span className="toy-joy-qbadge">Q</span><span className="toy-joy-qtype">True / False</span></div>
        <p className="toy-joy-qtext">A die (dice) is shaped like a <strong>cuboid</strong>.</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', margin: '14px 0', alignItems: 'flex-end' }}>
          <div style={{ textAlign: 'center' }}><CubeSVG /><div style={{ fontSize: '0.75rem', color: '#6b7280', fontWeight: '700' }}>Cube</div></div>
          <div style={{ textAlign: 'center' }}><CuboidSVG /><div style={{ fontSize: '0.75rem', color: '#6b7280', fontWeight: '700' }}>Cuboid</div></div>
        </div>
        <div className="toy-joy-tfopts">
          <button onClick={() => lp.handleTf('tf_die_cuboid', true)} className={`toy-joy-tfbtn toy-joy-t ${lp.getTfClass('tf_die_cuboid', true)}`}>✅ True</button>
          <button onClick={() => lp.handleTf('tf_die_cuboid', false)} className={`toy-joy-tfbtn toy-joy-f ${lp.getTfClass('tf_die_cuboid', false)}`}>❌ False</button>
        </div>
      </div>
    ),
  },
  {
    id: 'id_q5',
    matchAnswers: {
      id_match_objects: {
        'id_chalk': 'Cylinder',
        'id_bday_cap': 'Cone',
        'id_football': 'Sphere',
        'id_eraser': 'Cuboid',
      }
    },
    rightItems: [['Cylinder', 'Cylinder'], ['Cone', 'Cone'], ['Sphere', 'Sphere'], ['Cuboid', 'Cuboid']],
    meta: {
      type: 'match',
      totalPairs: 4,
      explanation: 'Chalk → Cylinder (long rounded shape with flat circular ends). Birthday cap → Cone (pointed top with circular base). Football → Sphere (perfectly round, no flat faces). Eraser → Cuboid (rectangular box shape).',
      correctLabel: 'All 4 pairs matched correctly',
    },
    render: (lp, ctx) => (
      <div className="toy-joy-qcard">
        <div className="toy-joy-qmeta"><span className="toy-joy-qbadge">Q</span><span className="toy-joy-qtype">Match the Following</span></div>
        <p className="toy-joy-qtext">Match each object to its 3D shape. Click a left item, then a right item.</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', margin: '12px 0', flexWrap: 'wrap', alignItems: 'flex-end' }}>
          <div style={{ textAlign: 'center' }}><CylinderSVG /><div style={{ fontSize: '0.72rem', color: '#6b7280', fontWeight: '700' }}>Cylinder</div></div>
          <div style={{ textAlign: 'center' }}><ConeSVG /><div style={{ fontSize: '0.72rem', color: '#6b7280', fontWeight: '700' }}>Cone</div></div>
          <div style={{ textAlign: 'center' }}><SphereSVG /><div style={{ fontSize: '0.72rem', color: '#6b7280', fontWeight: '700' }}>Sphere</div></div>
          <div style={{ textAlign: 'center' }}><CuboidSVG /><div style={{ fontSize: '0.72rem', color: '#6b7280', fontWeight: '700' }}>Cuboid</div></div>
        </div>
        <div className="toy-joy-match-wrap">
          <div className="toy-joy-match-col">
            {[['id_chalk', '🖍️ Chalk'], ['id_bday_cap', '🎉 Birthday cap'], ['id_football', '⚽ Football'], ['id_eraser', '🧹 Eraser']].map(([val, label]) => (
              <div key={val} onClick={() => lp.handleMatch('id_match_objects', 'left', val)} className={`toy-joy-match-item ${lp.getMatchClass('id_match_objects', 'left', val)}`}>{label}</div>
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
              <div key={val} onClick={() => lp.handleMatch('id_match_objects', 'right', val)} className={`toy-joy-match-item ${lp.getMatchClass('id_match_objects', 'right', val)}`}>{label}</div>
            ))}
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'id_q6',
    meta: {
      type: 'multipick',
      correct: ['id_mp_cyl', 'id_mp_cone', 'id_mp_sphere'],
      explanation: 'Cylinder, Cone, and Sphere all have curved surfaces. A cube and cuboid have only flat (square or rectangular) faces — no curved surfaces.',
      correctLabel: 'Cylinder, Cone, and Sphere',
    },
    render: (lp) => (
      <div className="toy-joy-qcard">
        <div className="toy-joy-qmeta"><span className="toy-joy-qbadge">Q</span><span className="toy-joy-qtype">Multi-Pick</span></div>
        <p className="toy-joy-qtext">Click <strong>ALL</strong> the shapes that have a <strong>curved surface</strong>.</p>
        <div className="toy-joy-pic-row" style={{ justifyContent: 'center', gap: '16px', flexWrap: 'wrap', marginTop: '14px' }}>
          {[
            { id: 'id_mp_cyl', label: 'Shape A', svg: <CylinderSVG /> },
            { id: 'id_mp_cube', label: 'Shape B', svg: <CubeSVG /> },
            { id: 'id_mp_cone', label: 'Shape C', svg: <ConeSVG /> },
            { id: 'id_mp_sphere', label: 'Shape D', svg: <SphereSVG /> },
            { id: 'id_mp_cuboid', label: 'Shape E', svg: <CuboidSVG /> },
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
    id: 'id_q7',
    meta: {
      type: 'mcq',
      qid: 'id_mcq_cat_face',
      correct: 'cuboid',
      explanation: 'A box that is wider than it is tall has rectangular faces of different sizes — that makes it a cuboid. In the textbook, the cat face is made on a cuboid (long rectangular box).',
      correctLabel: 'Cuboid',
    },
    render: (lp) => (
      <div className="toy-joy-qcard">
        <div className="toy-joy-qmeta"><span className="toy-joy-qbadge">Q</span><span className="toy-joy-qtype">Multiple Choice</span></div>
        <p className="toy-joy-qtext">Riya drew a <strong>cat face</strong> on a long box. The box is <strong>wider than it is tall</strong>. What shape is it?</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', margin: '14px 0', flexWrap: 'wrap', alignItems: 'flex-end' }}>
          <div style={{ textAlign: 'center' }}><CubeSVG /><div style={{ fontSize: '0.72rem', color: '#6b7280', fontWeight: '700' }}>Cube (equal sides)</div></div>
          <div style={{ textAlign: 'center' }}><CuboidSVG /><div style={{ fontSize: '0.72rem', color: '#6b7280', fontWeight: '700' }}>Cuboid (wider)</div></div>
        </div>
        <div className="toy-joy-opts">
          {[['cone', 'Cone'], ['cylinder', 'Cylinder'], ['cube', 'Cube'], ['cuboid', 'Cuboid']].map(([val, label], i) => (
            <div key={val} onClick={() => lp.handleMcq('id_mcq_cat_face', val)} className={`toy-joy-opt ${lp.getMcqClass('id_mcq_cat_face', val)}`}>
              <span className="toy-joy-opt-letter">{String.fromCharCode(65 + i)}</span>{label}
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'id_q8',
    meta: {
      type: 'mcq',
      qid: 'id_mcq_equal_squares',
      correct: 'cube',
      explanation: 'A cube has 6 faces that are ALL equal squares. A cuboid has 6 rectangular faces but they are not all the same size. A sphere has no flat faces. A cone has one flat circular face.',
      correctLabel: 'Cube',
    },
    render: (lp) => (
      <div className="toy-joy-qcard">
        <div className="toy-joy-qmeta"><span className="toy-joy-qbadge">Q</span><span className="toy-joy-qtype">Multiple Choice</span></div>
        <p className="toy-joy-qtext">Which shape has <strong>6 faces that are ALL equal squares</strong>?</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', margin: '14px 0', flexWrap: 'wrap', alignItems: 'flex-end' }}>
          <div style={{ textAlign: 'center' }}><SphereSVG /><div style={{ fontSize: '0.72rem', color: '#6b7280', fontWeight: '700' }}>Sphere</div></div>
          <div style={{ textAlign: 'center' }}><CuboidSVG /><div style={{ fontSize: '0.72rem', color: '#6b7280', fontWeight: '700' }}>Cuboid</div></div>
          <div style={{ textAlign: 'center' }}><CubeSVG /><div style={{ fontSize: '0.72rem', color: '#6b7280', fontWeight: '700' }}>Cube</div></div>
          <div style={{ textAlign: 'center' }}><ConeSVG /><div style={{ fontSize: '0.72rem', color: '#6b7280', fontWeight: '700' }}>Cone</div></div>
        </div>
        <div className="toy-joy-opts">
          {[['sphere', 'Sphere'], ['cuboid', 'Cuboid'], ['cube', 'Cube'], ['cone', 'Cone']].map(([val, label], i) => (
            <div key={val} onClick={() => lp.handleMcq('id_mcq_equal_squares', val)} className={`toy-joy-opt ${lp.getMcqClass('id_mcq_equal_squares', val)}`}>
              <span className="toy-joy-opt-letter">{String.fromCharCode(65 + i)}</span>{label}
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'id_q9',
    meta: {
      type: 'tf',
      qid: 'tf_cone_faces',
      correct: true,
      explanation: 'True! A cone has exactly ONE flat circular face (the base) and ONE curved surface that goes up to the pointed tip.',
      correctLabel: 'True',
    },
    render: (lp) => (
      <div className="toy-joy-qcard">
        <div className="toy-joy-qmeta"><span className="toy-joy-qbadge">Q</span><span className="toy-joy-qtype">True / False</span></div>
        <p className="toy-joy-qtext">A cone has exactly <strong>one flat circular face</strong> and <strong>one curved surface</strong>.</p>
        <div style={{ display: 'flex', justifyContent: 'center', margin: '14px 0' }}>
          <ConeSVG />
        </div>
        <div className="toy-joy-tfopts">
          <button onClick={() => lp.handleTf('tf_cone_faces', true)} className={`toy-joy-tfbtn toy-joy-t ${lp.getTfClass('tf_cone_faces', true)}`}>✅ True</button>
          <button onClick={() => lp.handleTf('tf_cone_faces', false)} className={`toy-joy-tfbtn toy-joy-f ${lp.getTfClass('tf_cone_faces', false)}`}>❌ False</button>
        </div>
      </div>
    ),
  },
  {
    id: 'id_q10',
    matchAnswers: {
      id_match_desc: {
        'id_no_edges': 'Sphere',
        'id_one_flat_pointed': 'Cone',
        'id_two_flat_cyl': 'Cylinder',
        'id_six_rect': 'Cuboid',
      }
    },
    rightItems: [['Sphere', 'Sphere'], ['Cone', 'Cone'], ['Cylinder', 'Cylinder'], ['Cuboid', 'Cuboid']],
    meta: {
      type: 'match',
      totalPairs: 4,
      explanation: 'No edges at all → Sphere. One flat circular base + pointed top → Cone. Two flat circular faces + one curved surface → Cylinder. Six rectangular flat faces → Cuboid.',
      correctLabel: 'All 4 pairs matched correctly',
    },
    render: (lp, ctx) => (
      <div className="toy-joy-qcard">
        <div className="toy-joy-qmeta"><span className="toy-joy-qbadge">Q</span><span className="toy-joy-qtype">Match the Following</span></div>
        <p className="toy-joy-qtext">Match each description to the correct 3D shape. Click a left item, then a right item.</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', margin: '12px 0', flexWrap: 'wrap', alignItems: 'flex-end' }}>
          <div style={{ textAlign: 'center' }}><SphereSVG /><div style={{ fontSize: '0.72rem', color: '#6b7280', fontWeight: '700' }}>Sphere</div></div>
          <div style={{ textAlign: 'center' }}><ConeSVG /><div style={{ fontSize: '0.72rem', color: '#6b7280', fontWeight: '700' }}>Cone</div></div>
          <div style={{ textAlign: 'center' }}><CylinderSVG /><div style={{ fontSize: '0.72rem', color: '#6b7280', fontWeight: '700' }}>Cylinder</div></div>
          <div style={{ textAlign: 'center' }}><CuboidSVG /><div style={{ fontSize: '0.72rem', color: '#6b7280', fontWeight: '700' }}>Cuboid</div></div>
        </div>
        <div className="toy-joy-match-wrap">
          <div className="toy-joy-match-col">
            {[
              ['id_no_edges', 'Has no edges at all'],
              ['id_one_flat_pointed', 'One flat circular base + pointed top'],
              ['id_two_flat_cyl', 'Two flat circular faces + one curved surface'],
              ['id_six_rect', 'Has 6 rectangular flat faces'],
            ].map(([val, label]) => (
              <div key={val} onClick={() => lp.handleMatch('id_match_desc', 'left', val)} className={`toy-joy-match-item ${lp.getMatchClass('id_match_desc', 'left', val)}`}>{label}</div>
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
              <div key={val} onClick={() => lp.handleMatch('id_match_desc', 'right', val)} className={`toy-joy-match-item ${lp.getMatchClass('id_match_desc', 'right', val)}`}>{label}</div>
            ))}
          </div>
        </div>
      </div>
    ),
  },
];

const Identifying3DShapes = () => {
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
      skillId="TJ-01"
      skillName="Identifying 3D Shapes"
      questions={questions}
      questionMeta={questionMeta}
      logicProps={logicProps}
    />
  );
};

export default Identifying3DShapes;
