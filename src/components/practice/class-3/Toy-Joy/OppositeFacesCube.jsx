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

// Simple die SVG showing N dots on front face
const DieSVG = ({ front = 1, label = '' }) => {
  const dotPositions = {
    1: [[35, 35]],
    2: [[22, 22], [48, 48]],
    3: [[22, 22], [35, 35], [48, 48]],
    4: [[22, 22], [48, 22], [22, 48], [48, 48]],
    5: [[22, 22], [48, 22], [35, 35], [22, 48], [48, 48]],
    6: [[22, 20], [48, 20], [22, 35], [48, 35], [22, 50], [48, 50]],
  };
  const dots = dotPositions[front] || dotPositions[1];
  return (
    <svg width="90" height="90" viewBox="0 0 70 70">
      {/* Die body */}
      <rect x="6" y="14" width="48" height="48" rx="8" fill="#fff9e6" stroke="#f4a261" strokeWidth="2.5"/>
      {/* Top face */}
      <polygon points="6,14 54,14 64,4 16,4" fill="#ffe8b0" stroke="#f4a261" strokeWidth="1.5"/>
      {/* Right face */}
      <polygon points="54,14 64,4 64,52 54,62" fill="#ffd170" stroke="#f4a261" strokeWidth="1.5"/>
      {/* Dots on front face */}
      {dots.map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="4" fill="#e63946"/>
      ))}
      {label ? <text x="30" y="80" textAnchor="middle" fontSize="8" fill="#666" fontFamily="Nunito" fontWeight="700">{label}</text> : null}
    </svg>
  );
};

const QUESTION_POOL = [
  {
    id: 'die_q1',
    meta: {
      type: 'mcq',
      qid: 'die_mcq_opp1',
      correct: '6',
      explanation: 'On a standard die, opposite faces always add up to 7. So the face opposite to 1 is 7 - 1 = 6.',
      correctLabel: '6',
    },
    render: (lp) => (
      <div className="toy-joy-qcard">
        <div className="toy-joy-qmeta"><span className="toy-joy-qbadge">Q</span><span className="toy-joy-qtype">Picture + MCQ</span></div>
        <p className="toy-joy-qtext">On a standard die, <strong>opposite faces always add up to 7</strong>. What number is OPPOSITE to <strong>1</strong>?</p>
        <div style={{ display: 'flex', justifyContent: 'center', margin: '14px 0' }}>
          <DieSVG front={1} />
        </div>
        <div className="toy-joy-opts">
          {['2', '4', '5', '6'].map((val, i) => (
            <div key={val} onClick={() => lp.handleMcq('die_mcq_opp1', val)} className={`toy-joy-opt ${lp.getMcqClass('die_mcq_opp1', val)}`}>
              <span className="toy-joy-opt-letter">{String.fromCharCode(65 + i)}</span>{val}
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'die_q2',
    meta: {
      type: 'mcq',
      qid: 'die_mcq_opp3',
      correct: '4',
      explanation: 'On a standard die, opposite faces add up to 7. So the face opposite to 3 is 7 - 3 = 4.',
      correctLabel: '4',
    },
    render: (lp) => (
      <div className="toy-joy-qcard">
        <div className="toy-joy-qmeta"><span className="toy-joy-qbadge">Q</span><span className="toy-joy-qtype">Multiple Choice</span></div>
        <p className="toy-joy-qtext">On a standard die, what number is OPPOSITE to face <strong>3</strong>?</p>
        <div style={{ display: 'flex', justifyContent: 'center', margin: '14px 0' }}>
          <DieSVG front={3} />
        </div>
        <div className="toy-joy-opts">
          {['2', '3', '4', '5'].map((val, i) => (
            <div key={val} onClick={() => lp.handleMcq('die_mcq_opp3', val)} className={`toy-joy-opt ${lp.getMcqClass('die_mcq_opp3', val)}`}>
              <span className="toy-joy-opt-letter">{String.fromCharCode(65 + i)}</span>{val}
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'die_q3',
    meta: {
      type: 'tf',
      qid: 'tf_die_sum7',
      correct: true,
      explanation: 'True! On a standard die, opposite pairs are always: 1 opposite 6 (1+6=7), 2 opposite 5 (2+5=7), and 3 opposite 4 (3+4=7).',
      correctLabel: 'True',
    },
    render: (lp) => (
      <div className="toy-joy-qcard">
        <div className="toy-joy-qmeta"><span className="toy-joy-qbadge">Q</span><span className="toy-joy-qtype">True / False</span></div>
        <p className="toy-joy-qtext">On a standard die, <strong>opposite faces always add up to 7</strong>.</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '18px', margin: '14px 0', alignItems: 'center' }}>
          <div style={{ textAlign: 'center' }}><DieSVG front={1} /><div style={{ fontSize: '0.75rem', color: '#6b7280', fontWeight: '700' }}>1 + ? = 7</div></div>
          <div style={{ textAlign: 'center' }}><DieSVG front={2} /><div style={{ fontSize: '0.75rem', color: '#6b7280', fontWeight: '700' }}>2 + ? = 7</div></div>
          <div style={{ textAlign: 'center' }}><DieSVG front={3} /><div style={{ fontSize: '0.75rem', color: '#6b7280', fontWeight: '700' }}>3 + ? = 7</div></div>
        </div>
        <div className="toy-joy-tfopts">
          <button onClick={() => lp.handleTf('tf_die_sum7', true)} className={`toy-joy-tfbtn toy-joy-t ${lp.getTfClass('tf_die_sum7', true)}`}>✅ True</button>
          <button onClick={() => lp.handleTf('tf_die_sum7', false)} className={`toy-joy-tfbtn toy-joy-f ${lp.getTfClass('tf_die_sum7', false)}`}>❌ False</button>
        </div>
      </div>
    ),
  },
  {
    id: 'die_q4',
    meta: {
      type: 'mcq',
      qid: 'die_mcq_top4_bottom',
      correct: '3',
      explanation: 'When the top face shows 4, the face touching the table (opposite face) shows 7 - 4 = 3.',
      correctLabel: '3',
    },
    render: (lp) => (
      <div className="toy-joy-qcard">
        <div className="toy-joy-qmeta"><span className="toy-joy-qbadge">Q</span><span className="toy-joy-qtype">Picture + MCQ</span></div>
        <p className="toy-joy-qtext">The die is placed on the table with <strong>4 dots on top</strong>. What number is on the face <strong>TOUCHING THE TABLE</strong>?</p>
        <div style={{ display: 'flex', justifyContent: 'center', margin: '14px 0' }}>
          <DieSVG front={4} />
        </div>
        <div className="toy-joy-opts">
          {['1', '2', '3', '4'].map((val, i) => (
            <div key={val} onClick={() => lp.handleMcq('die_mcq_top4_bottom', val)} className={`toy-joy-opt ${lp.getMcqClass('die_mcq_top4_bottom', val)}`}>
              <span className="toy-joy-opt-letter">{String.fromCharCode(65 + i)}</span>{val}
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'die_q5',
    matchAnswers: {
      die_match_opp: {
        '1dot': '6',
        '2dot': '5',
        '3dot': '4',
      }
    },
    rightItems: [['4', 'Opposite: 4'], ['5', 'Opposite: 5'], ['6', 'Opposite: 6']],
    meta: {
      type: 'match',
      totalPairs: 3,
      explanation: 'Opposite pairs on a standard die: 1↔6 (sum=7), 2↔5 (sum=7), 3↔4 (sum=7).',
      correctLabel: '1→6, 2→5, 3→4',
    },
    render: (lp, ctx) => (
      <div className="toy-joy-qcard">
        <div className="toy-joy-qmeta"><span className="toy-joy-qbadge">Q</span><span className="toy-joy-qtype">Match the Following</span></div>
        <p className="toy-joy-qtext">Match each face number to its OPPOSITE face number. (Remember: opposite faces add up to 7!)</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', margin: '12px 0' }}>
          <DieSVG front={1} label="Face: 1" />
          <DieSVG front={2} label="Face: 2" />
          <DieSVG front={3} label="Face: 3" />
        </div>
        <div className="toy-joy-match-wrap">
          <div className="toy-joy-match-col">
            {[['1dot', 'Face showing 1'], ['2dot', 'Face showing 2'], ['3dot', 'Face showing 3']].map(([val, label]) => (
              <div key={val} onClick={() => lp.handleMatch('die_match_opp', 'left', val)} className={`toy-joy-match-item ${lp.getMatchClass('die_match_opp', 'left', val)}`}>{label}</div>
            ))}
          </div>
          <div className="toy-joy-match-center">
            <div className="toy-joy-match-line">→</div>
            <div className="toy-joy-match-line">→</div>
            <div className="toy-joy-match-line">→</div>
          </div>
          <div className="toy-joy-match-col">
            {ctx.shuffledRight.map(([val, label]) => (
              <div key={val} onClick={() => lp.handleMatch('die_match_opp', 'right', val)} className={`toy-joy-match-item ${lp.getMatchClass('die_match_opp', 'right', val)}`}>{label}</div>
            ))}
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'die_q6',
    meta: {
      type: 'mcq',
      qid: 'die_mcq_opp4',
      correct: '3',
      explanation: 'On a die, 2 and 5 are opposite. Since one face shows 4, the opposite face shows 7 - 4 = 3.',
      correctLabel: '3',
    },
    render: (lp) => (
      <div className="toy-joy-qcard">
        <div className="toy-joy-qmeta"><span className="toy-joy-qbadge">Q</span><span className="toy-joy-qtype">Multiple Choice</span></div>
        <p className="toy-joy-qtext">On a die, 2 and 5 are opposite. If one face shows <strong>4</strong>, what does the <strong>OPPOSITE face</strong> show?</p>
        <div style={{ display: 'flex', justifyContent: 'center', margin: '14px 0' }}>
          <DieSVG front={4} />
        </div>
        <div className="toy-joy-opts">
          {['1', '2', '3', '6'].map((val, i) => (
            <div key={val} onClick={() => lp.handleMcq('die_mcq_opp4', val)} className={`toy-joy-opt ${lp.getMcqClass('die_mcq_opp4', val)}`}>
              <span className="toy-joy-opt-letter">{String.fromCharCode(65 + i)}</span>{val}
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'die_q7',
    meta: {
      type: 'tf',
      qid: 'tf_1opp5',
      correct: false,
      explanation: 'False! On a standard die, the face showing 1 is OPPOSITE the face showing 6 (1 + 6 = 7). The face showing 5 is opposite the face showing 2.',
      correctLabel: 'False — 1 is opposite 6',
    },
    render: (lp) => (
      <div className="toy-joy-qcard">
        <div className="toy-joy-qmeta"><span className="toy-joy-qbadge">Q</span><span className="toy-joy-qtype">True / False</span></div>
        <p className="toy-joy-qtext">On a standard die, the face showing <strong>1</strong> is opposite the face showing <strong>5</strong>.</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '18px', margin: '14px 0', alignItems: 'center' }}>
          <DieSVG front={1} label="Face: 1" />
          <span style={{ fontSize: '1.5rem', color: '#6b7280', fontWeight: '800' }}>↔</span>
          <DieSVG front={5} label="Face: 5?" />
        </div>
        <div className="toy-joy-tfopts">
          <button onClick={() => lp.handleTf('tf_1opp5', true)} className={`toy-joy-tfbtn toy-joy-t ${lp.getTfClass('tf_1opp5', true)}`}>✅ True</button>
          <button onClick={() => lp.handleTf('tf_1opp5', false)} className={`toy-joy-tfbtn toy-joy-f ${lp.getTfClass('tf_1opp5', false)}`}>❌ False</button>
        </div>
      </div>
    ),
  },
  {
    id: 'die_q8',
    meta: {
      type: 'mcq',
      qid: 'die_mcq_top6_bottom',
      correct: '1',
      explanation: 'When the top face shows 6, the bottom face (opposite) shows 7 - 6 = 1.',
      correctLabel: '1',
    },
    render: (lp) => (
      <div className="toy-joy-qcard">
        <div className="toy-joy-qmeta"><span className="toy-joy-qbadge">Q</span><span className="toy-joy-qtype">Multiple Choice</span></div>
        <p className="toy-joy-qtext">On a die, the <strong>top face shows 6</strong>. What number faces <strong>DOWN</strong> (touching the table)?</p>
        <div style={{ display: 'flex', justifyContent: 'center', margin: '14px 0' }}>
          <DieSVG front={6} />
        </div>
        <div className="toy-joy-opts">
          {['1', '2', '3', '5'].map((val, i) => (
            <div key={val} onClick={() => lp.handleMcq('die_mcq_top6_bottom', val)} className={`toy-joy-opt ${lp.getMcqClass('die_mcq_top6_bottom', val)}`}>
              <span className="toy-joy-opt-letter">{String.fromCharCode(65 + i)}</span>{val}
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'die_q9',
    meta: {
      type: 'tf',
      qid: 'tf_die_is_cube',
      correct: true,
      explanation: 'True! A die is a perfect example of a CUBE — all its 6 faces are equal squares of the same size.',
      correctLabel: 'True',
    },
    render: (lp) => (
      <div className="toy-joy-qcard">
        <div className="toy-joy-qmeta"><span className="toy-joy-qbadge">Q</span><span className="toy-joy-qtype">True / False</span></div>
        <p className="toy-joy-qtext">A die is an example of a <strong>CUBE</strong> — all its faces are equal squares.</p>
        <div style={{ display: 'flex', justifyContent: 'center', margin: '14px 0' }}>
          <DieSVG front={4} label="A die" />
        </div>
        <div className="toy-joy-tfopts">
          <button onClick={() => lp.handleTf('tf_die_is_cube', true)} className={`toy-joy-tfbtn toy-joy-t ${lp.getTfClass('tf_die_is_cube', true)}`}>✅ True</button>
          <button onClick={() => lp.handleTf('tf_die_is_cube', false)} className={`toy-joy-tfbtn toy-joy-f ${lp.getTfClass('tf_die_is_cube', false)}`}>❌ False</button>
        </div>
      </div>
    ),
  },
  {
    id: 'die_q10',
    meta: {
      type: 'mcq',
      qid: 'die_mcq_front2_back',
      correct: '5',
      explanation: 'On a die, opposite faces add up to 7. So if the front face shows 2, the back (opposite) face shows 7 - 2 = 5.',
      correctLabel: '5',
    },
    render: (lp) => (
      <div className="toy-joy-qcard">
        <div className="toy-joy-qmeta"><span className="toy-joy-qbadge">Q</span><span className="toy-joy-qtype">Multiple Choice</span></div>
        <p className="toy-joy-qtext">Riya rolls a die. The <strong>FRONT face shows 2</strong>. Using the rule that opposite faces add to 7, what does the <strong>BACK face</strong> show?</p>
        <div style={{ display: 'flex', justifyContent: 'center', margin: '14px 0' }}>
          <DieSVG front={2} />
        </div>
        <div className="toy-joy-opts">
          {['3', '4', '5', '6'].map((val, i) => (
            <div key={val} onClick={() => lp.handleMcq('die_mcq_front2_back', val)} className={`toy-joy-opt ${lp.getMcqClass('die_mcq_front2_back', val)}`}>
              <span className="toy-joy-opt-letter">{String.fromCharCode(65 + i)}</span>{val}
            </div>
          ))}
        </div>
      </div>
    ),
  },
];

const OppositeFacesCube = () => {
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
      skillId="TJ-06"
      skillName="Opposite Faces of a Cube"
      questions={questions}
      questionMeta={questionMeta}
      logicProps={logicProps}
    />
  );
};

export default OppositeFacesCube;
