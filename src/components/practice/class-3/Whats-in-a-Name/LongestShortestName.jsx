import React, { useRef } from 'react';
import { useWINLogic } from './useWINLogic';
import WINPracticeTemplate from './WINPracticeTemplate';
import { LetterBoxes, shuffle } from './WINSharedComponents';
import './whats-in-a-name.css';

const ANIMALS = {
  tiger:    { emoji: '🐯', count: 5 },
  elephant: { emoji: '🐘', count: 8 },
  deer:     { emoji: '🦌', count: 4 },
  rat:      { emoji: '🐀', count: 3 },
  monkey:   { emoji: '🐒', count: 6 },
  ox:       { emoji: '🐂', count: 2 },
  dog:      { emoji: '🐕', count: 3 },
  snake:    { emoji: '🐍', count: 5 },
  goat:     { emoji: '🐐', count: 4 },
  lion:     { emoji: '🦁', count: 4 },
};

// Compact animal cards for picking
const AnimalPickCard = ({ name, selected, correct, wrong, onClick }) => {
  const { emoji } = ANIMALS[name];
  let border = '#e2e8f0', bg = '#fff';
  if (correct) { border = '#16a34a'; bg = '#dcfce7'; }
  else if (wrong) { border = '#dc2626'; bg = '#fee2e2'; }
  else if (selected) { border = '#3a86ff'; bg = '#dbeafe'; }

  return (
    <div onClick={onClick} style={{
      background: bg, border: `2.5px solid ${border}`,
      borderRadius: 14, padding: '10px 12px',
      textAlign: 'center', cursor: 'pointer',
      transition: 'all .15s', minWidth: 80,
    }}>
      <div style={{ fontSize: '2.2rem', marginBottom: 4 }}>{emoji}</div>
      <div style={{ fontFamily: "'Baloo 2', cursive", fontWeight: 800, fontSize: '.85rem', color: '#1a1a2e', marginBottom: 6 }}>{name.toUpperCase()}</div>
      <LetterBoxes word={name} />
    </div>
  );
};

const QUESTION_POOL = [
  // Q1 — LONGEST from tiger, elephant, ox, dog (PDF p.3 exact set)
  {
    id: 'lsn_q1',
    meta: {
      type: 'mcq', qid: 'lsn_q1',
      correct: 'elephant',
      explanation: 'ELEPHANT has 8 letters — the most among tiger(5), ox(2), dog(3). It is the captain of Team 1!',
      correctLabel: 'ELEPHANT (8 letters)',
    },
    render: (lp) => (
      <div className="win-qcard">
        <div className="win-qmeta"><span className="win-qbadge">Q</span><span className="win-qtype">Longest Name</span></div>
        <p className="win-qtext">🏆 Who has the <strong>LONGEST</strong> name?</p>
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap', marginTop: 12 }}>
          {['tiger','elephant','ox','dog'].map(name => (
            <AnimalPickCard
              key={name} name={name}
              selected={lp.getMcqClass('lsn_q1', name).includes('selected')}
              correct={lp.getMcqClass('lsn_q1', name).includes('correct')}
              wrong={lp.getMcqClass('lsn_q1', name).includes('wrong')}
              onClick={() => lp.handleMcq('lsn_q1', name)}
            />
          ))}
        </div>
      </div>
    ),
  },
  // Q2 — SHORTEST from same set (PDF p.3)
  {
    id: 'lsn_q2',
    meta: {
      type: 'mcq', qid: 'lsn_q2',
      correct: 'ox',
      explanation: 'OX has only 2 letters — the fewest! It is the captain of Team 2.',
      correctLabel: 'OX (2 letters)',
    },
    render: (lp) => (
      <div className="win-qcard">
        <div className="win-qmeta"><span className="win-qbadge">Q</span><span className="win-qtype">Shortest Name</span></div>
        <p className="win-qtext">🥇 Who has the <strong>SHORTEST</strong> name?</p>
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap', marginTop: 12 }}>
          {['tiger','elephant','ox','dog'].map(name => (
            <AnimalPickCard
              key={name} name={name}
              selected={lp.getMcqClass('lsn_q2', name).includes('selected')}
              correct={lp.getMcqClass('lsn_q2', name).includes('correct')}
              wrong={lp.getMcqClass('lsn_q2', name).includes('wrong')}
              onClick={() => lp.handleMcq('lsn_q2', name)}
            />
          ))}
        </div>
      </div>
    ),
  },
  // Q3 — Mahesh vs Kartik (both have 6 letters — SAME, from PDF p.3)
  {
    id: 'lsn_q3',
    meta: {
      type: 'mcq', qid: 'lsn_q3',
      correct: 'same',
      explanation: 'MAHESH has 6 letters (M-A-H-E-S-H) and KARTIK also has 6 letters (K-A-R-T-I-K). They are the SAME length!',
      correctLabel: 'Same length (both 6)',
    },
    render: (lp) => (
      <div className="win-qcard">
        <div className="win-qmeta"><span className="win-qbadge">Q</span><span className="win-qtype">Compare Names</span></div>
        <p className="win-qtext">Who has a <strong>longer</strong> name?</p>
        <div style={{ display: 'flex', gap: 20, justifyContent: 'center', flexWrap: 'wrap', margin: '16px 0' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', marginBottom: 8 }}>🧑</div>
            <div style={{ fontFamily: "'Baloo 2',cursive", fontWeight: 800, fontSize: '1.2rem', color: '#1a1a2e', marginBottom: 8 }}>Mahesh</div>
            <LetterBoxes word="Mahesh" color="#0ea5e9" bgColor="#f0f9ff" textColor="#0369a1" />
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', marginBottom: 8 }}>🧑</div>
            <div style={{ fontFamily: "'Baloo 2',cursive", fontWeight: 800, fontSize: '1.2rem', color: '#1a1a2e', marginBottom: 8 }}>Kartik</div>
            <LetterBoxes word="Kartik" color="#8b5cf6" bgColor="#f5f3ff" textColor="#6d28d9" />
          </div>
        </div>
        <div className="win-opts">
          {[['Mahesh','A'],['Kartik','B'],['same','C'],['Cannot tell','D']].map(([v,l]) => (
            <div key={v} onClick={() => lp.handleMcq('lsn_q3', v)} className={`win-opt ${lp.getMcqClass('lsn_q3', v)}`}>
              <span className="win-opt-letter">{l}</span>{v}
            </div>
          ))}
        </div>
      </div>
    ),
  },
  // Q4 — SNAKE longer than LION?
  {
    id: 'lsn_q4',
    meta: {
      type: 'tf', qid: 'lsn_q4_tf',
      correct: true,
      explanation: 'SNAKE has 5 letters. LION has 4 letters. 5 > 4, so SNAKE is longer. True!',
      correctLabel: 'True',
    },
    render: (lp) => (
      <div className="win-qcard">
        <div className="win-qmeta"><span className="win-qbadge">Q</span><span className="win-qtype">True / False</span></div>
        <p className="win-qtext"><strong>SNAKE</strong> has more letters than <strong>LION</strong>.</p>
        <div style={{ display: 'flex', gap: 20, justifyContent: 'center', flexWrap: 'wrap', margin: '14px 0' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: 6 }}>🐍</div>
            <div style={{ fontWeight: 800, marginBottom: 6 }}>SNAKE</div>
            <LetterBoxes word="snake" />
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: 6 }}>🦁</div>
            <div style={{ fontWeight: 800, marginBottom: 6 }}>LION</div>
            <LetterBoxes word="lion" color="#f59e0b" bgColor="#fef3c7" textColor="#92400e" />
          </div>
        </div>
        <div className="win-tfopts">
          <button onClick={() => lp.handleTf('lsn_q4_tf', true)} className={`win-tfbtn win-t ${lp.getTfClass('lsn_q4_tf', true)}`}>✅ True</button>
          <button onClick={() => lp.handleTf('lsn_q4_tf', false)} className={`win-tfbtn win-f ${lp.getTfClass('lsn_q4_tf', false)}`}>❌ False</button>
        </div>
      </div>
    ),
  },
  // Q5 — TF: MONKEY longer than ELEPHANT (FALSE)
  {
    id: 'lsn_q5',
    meta: {
      type: 'tf', qid: 'lsn_q5_tf',
      correct: false,
      explanation: 'MONKEY has 6 letters. ELEPHANT has 8 letters. MONKEY is NOT longer than ELEPHANT. False!',
      correctLabel: 'False — ELEPHANT is longer',
    },
    render: (lp) => (
      <div className="win-qcard">
        <div className="win-qmeta"><span className="win-qbadge">Q</span><span className="win-qtype">True / False</span></div>
        <p className="win-qtext"><strong>MONKEY</strong> has more letters than <strong>ELEPHANT</strong>.</p>
        <div style={{ display: 'flex', gap: 20, justifyContent: 'center', flexWrap: 'wrap', margin: '14px 0' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: 6 }}>🐒</div>
            <div style={{ fontWeight: 800, marginBottom: 6 }}>MONKEY</div>
            <LetterBoxes word="monkey" color="#9333ea" bgColor="#faf5ff" textColor="#7e22ce" />
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: 6 }}>🐘</div>
            <div style={{ fontWeight: 800, marginBottom: 6 }}>ELEPHANT</div>
            <LetterBoxes word="elephant" color="#06b6d4" bgColor="#ecfeff" textColor="#0e7490" />
          </div>
        </div>
        <div className="win-tfopts">
          <button onClick={() => lp.handleTf('lsn_q5_tf', true)} className={`win-tfbtn win-t ${lp.getTfClass('lsn_q5_tf', true)}`}>✅ True</button>
          <button onClick={() => lp.handleTf('lsn_q5_tf', false)} className={`win-tfbtn win-f ${lp.getTfClass('lsn_q5_tf', false)}`}>❌ False</button>
        </div>
      </div>
    ),
  },
  // Q6 — GOAT vs DEER (same = 4)
  {
    id: 'lsn_q6',
    meta: {
      type: 'mcq', qid: 'lsn_q6',
      correct: 'same',
      explanation: 'GOAT has 4 letters (G-O-A-T). DEER also has 4 letters (D-E-E-R). They are the SAME length!',
      correctLabel: 'Same (both 4 letters)',
    },
    render: (lp) => (
      <div className="win-qcard">
        <div className="win-qmeta"><span className="win-qbadge">Q</span><span className="win-qtype">Compare Names</span></div>
        <p className="win-qtext">Which has <strong>fewer</strong> letters?</p>
        <div style={{ display: 'flex', gap: 20, justifyContent: 'center', flexWrap: 'wrap', margin: '14px 0' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: 6 }}>🐐</div>
            <div style={{ fontWeight: 800, marginBottom: 6 }}>GOAT</div>
            <LetterBoxes word="goat" />
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: 6 }}>🦌</div>
            <div style={{ fontWeight: 800, marginBottom: 6 }}>DEER</div>
            <LetterBoxes word="deer" color="#22c55e" bgColor="#f0fdf4" textColor="#15803d" />
          </div>
        </div>
        <div className="win-opts">
          {[['Goat','A'],['Deer','B'],['same','C'],['Cannot tell','D']].map(([v,l]) => (
            <div key={v} onClick={() => lp.handleMcq('lsn_q6', v)} className={`win-opt ${lp.getMcqClass('lsn_q6', v)}`}>
              <span className="win-opt-letter">{l}</span>{v}
            </div>
          ))}
        </div>
      </div>
    ),
  },
  // Q7 — Longest from full PDF list (from 10 animals)
  {
    id: 'lsn_q7',
    meta: {
      type: 'mcq', qid: 'lsn_q7',
      correct: 'elephant',
      explanation: 'From all 10 animals in the game: ELEPHANT (8) is the longest. OX (2) is the shortest.',
      correctLabel: 'ELEPHANT (8 letters)',
    },
    render: (lp) => (
      <div className="win-qcard">
        <div className="win-qmeta"><span className="win-qbadge">Q</span><span className="win-qtype">Team Captain</span></div>
        <p className="win-qtext">🏆 Which animal has the <strong>MOST</strong> letters?</p>
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap', marginTop: 12 }}>
          {['rat','monkey','elephant','snake'].map(name => (
            <AnimalPickCard
              key={name} name={name}
              selected={lp.getMcqClass('lsn_q7', name).includes('selected')}
              correct={lp.getMcqClass('lsn_q7', name).includes('correct')}
              wrong={lp.getMcqClass('lsn_q7', name).includes('wrong')}
              onClick={() => lp.handleMcq('lsn_q7', name)}
            />
          ))}
        </div>
      </div>
    ),
  },
  // Q8 — Snake more than Goat?
  {
    id: 'lsn_q8',
    meta: {
      type: 'mcq', qid: 'lsn_q8',
      correct: 'snake',
      explanation: 'SNAKE has 5 letters. GOAT has 4 letters. 5 > 4 so SNAKE has more letters.',
      correctLabel: 'SNAKE (5 letters)',
    },
    render: (lp) => (
      <div className="win-qcard">
        <div className="win-qmeta"><span className="win-qbadge">Q</span><span className="win-qtype">More Letters</span></div>
        <p className="win-qtext">Who has <strong>more</strong> letters?</p>
        <div style={{ display: 'flex', gap: 20, justifyContent: 'center', flexWrap: 'wrap', margin: '14px 0' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: 6 }}>🐍</div>
            <div style={{ fontWeight: 800, marginBottom: 6 }}>SNAKE</div>
            <LetterBoxes word="snake" />
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: 6 }}>🐐</div>
            <div style={{ fontWeight: 800, marginBottom: 6 }}>GOAT</div>
            <LetterBoxes word="goat" color="#22c55e" bgColor="#f0fdf4" textColor="#15803d" />
          </div>
        </div>
        <div className="win-opts">
          {[['snake','A'],['goat','B'],['same','C'],['Neither','D']].map(([v,l]) => (
            <div key={v} onClick={() => lp.handleMcq('lsn_q8', v)} className={`win-opt ${lp.getMcqClass('lsn_q8', v)}`}>
              <span className="win-opt-letter">{l}</span>{v.toUpperCase()}
            </div>
          ))}
        </div>
      </div>
    ),
  },
];

const LongestShortestName = () => {
  const selRef = useRef(null);
  if (!selRef.current) {
    selRef.current = shuffle([...QUESTION_POOL]).slice(0, 5).map(q =>
      q.rightItems ? { ...q, shuffledRight: shuffle([...q.rightItems]) } : q
    );
  }
  const selected = selRef.current;
  const logicProps = useWINLogic({});
  const questions = selected.map(q => <React.Fragment key={q.id}>{q.render(logicProps, q)}</React.Fragment>);
  const questionMeta = selected.map(q => q.meta);

  return (
    <WINPracticeTemplate
      skillId="WIN-05"
      skillName="Longest and Shortest Names"
      questions={questions}
      questionMeta={questionMeta}
      logicProps={logicProps}
    />
  );
};

export default LongestShortestName;
