import React, { useRef } from 'react';
import { useWINLogic } from './useWINLogic';
import WINPracticeTemplate from './WINPracticeTemplate';
import { TallyMarkSVG, shuffle } from './WINSharedComponents';
import './whats-in-a-name.css';

// Four tally options for "which shows N?"
const TallyChoice = ({ lp, qid, val, count }) => {
  const cls = lp.getMcqClass(qid, val);
  let border = '#e2e8f0', bg = '#fefce8';
  if (cls.includes('correct')) { border = '#16a34a'; bg = '#dcfce7'; }
  else if (cls.includes('wrong')) { border = '#dc2626'; bg = '#fee2e2'; }
  else if (cls.includes('selected')) { border = '#3a86ff'; bg = '#dbeafe'; }

  return (
    <div
      onClick={() => lp.handleMcq(qid, val)}
      style={{
        background: bg, border: `2.5px solid ${border}`,
        borderRadius: '12px', padding: '12px 8px',
        cursor: 'pointer', transition: 'all .15s',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', gap: 8, minHeight: 70,
        overflow: 'hidden',
      }}
    >
      <TallyMarkSVG count={count} color="#2d1508" scale={0.85} />
    </div>
  );
};

const QUESTION_POOL = [
  // Q1 — show 8
  {
    id: 'mtm_q1',
    meta: {
      type: 'mcq', qid: 'mtm_q1',
      correct: 'C',
      explanation: '8 = one full group of 5 (crossed) + 3 extra sticks.',
      correctLabel: 'Option C',
    },
    render: (lp) => (
      <div className="win-qcard">
        <div className="win-qmeta"><span className="win-qbadge">Q</span><span className="win-qtype">Pick the Right Tally</span></div>
        <p className="win-qtext">Which shows <strong>8</strong>? 🔢</p>
        <div className="win-tally-grid">
          {[['A',7],['B',9],['C',8],['D',6]].map(([opt, cnt]) => (
            <div key={opt}>
              <TallyChoice lp={lp} qid="mtm_q1" val={opt} count={cnt} />
              <div style={{ textAlign:'center', fontSize:'.75rem', fontWeight:700, color:'#64748b', marginTop:4 }}>{opt}</div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  // Q2 — show 13
  {
    id: 'mtm_q2',
    meta: {
      type: 'mcq', qid: 'mtm_q2',
      correct: 'B',
      explanation: '13 = 2 full groups of 5 (10) + 3 extra sticks.',
      correctLabel: 'Option B',
    },
    render: (lp) => (
      <div className="win-qcard">
        <div className="win-qmeta"><span className="win-qbadge">Q</span><span className="win-qtype">Pick the Right Tally</span></div>
        <p className="win-qtext">Which shows <strong>13</strong>? 🔢</p>
        <div className="win-tally-grid">
          {[['A',12],['B',13],['C',15],['D',14]].map(([opt, cnt]) => (
            <div key={opt}>
              <TallyChoice lp={lp} qid="mtm_q2" val={opt} count={cnt} />
              <div style={{ textAlign:'center', fontSize:'.75rem', fontWeight:700, color:'#64748b', marginTop:4 }}>{opt}</div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  // Q3 — complete groups for 23
  {
    id: 'mtm_q3',
    meta: {
      type: 'mcq', qid: 'mtm_q3',
      correct: '4',
      explanation: '23 = 4 groups of 5 (= 20) + 3 extra sticks. So 4 complete crossed groups!',
      correctLabel: '4 groups',
    },
    render: (lp) => (
      <div className="win-qcard">
        <div className="win-qmeta"><span className="win-qbadge">Q</span><span className="win-qtype">Groups of 5</span></div>
        <p className="win-qtext">For <strong>23 sheep</strong> — how many <strong>full groups of 5</strong>? 🐑</p>
        <div style={{ display:'flex', justifyContent:'center', margin:'14px 0' }}>
          <TallyMarkSVG count={23} color="#2d1508" />
        </div>
        <div className="win-opts">
          {[['3','A'],['4','B'],['5','C'],['6','D']].map(([v,l]) => (
            <div key={v} onClick={() => lp.handleMcq('mtm_q3', v)} className={`win-opt ${lp.getMcqClass('mtm_q3', v)}`}>
              <span className="win-opt-letter">{l}</span>{v}
            </div>
          ))}
        </div>
      </div>
    ),
  },
  // Q4 — TF: 10 = 2 crossed groups
  {
    id: 'mtm_q4',
    meta: {
      type: 'tf', qid: 'mtm_q4_tf',
      correct: true,
      explanation: 'Yes! 2 crossed groups = 5 + 5 = exactly 10. That is correct!',
      correctLabel: 'True',
    },
    render: (lp) => (
      <div className="win-qcard">
        <div className="win-qmeta"><span className="win-qbadge">Q</span><span className="win-qtype">True / False</span></div>
        <p className="win-qtext">To show <strong>10</strong>, you make <strong>2 crossed groups</strong>.</p>
        <div style={{ display:'flex', justifyContent:'center', margin:'16px 0' }}>
          <TallyMarkSVG count={10} color="#2d1508" />
        </div>
        <div className="win-tfopts">
          <button onClick={() => lp.handleTf('mtm_q4_tf', true)} className={`win-tfbtn win-t ${lp.getTfClass('mtm_q4_tf', true)}`}>✅ True</button>
          <button onClick={() => lp.handleTf('mtm_q4_tf', false)} className={`win-tfbtn win-f ${lp.getTfClass('mtm_q4_tf', false)}`}>❌ False</button>
        </div>
      </div>
    ),
  },
  // Q5 — extra sticks for 18
  {
    id: 'mtm_q5',
    meta: {
      type: 'mcq', qid: 'mtm_q5',
      correct: '3',
      explanation: '18 = 3 full groups (15) + 3 extra sticks. So 3 extra sticks after the crossed groups!',
      correctLabel: '3 extra sticks',
    },
    render: (lp) => (
      <div className="win-qcard">
        <div className="win-qmeta"><span className="win-qbadge">Q</span><span className="win-qtype">Extra Sticks</span></div>
        <p className="win-qtext">For <strong>18</strong> — how many <strong>extra sticks</strong> after full groups?</p>
        <div style={{ display:'flex', justifyContent:'center', margin:'14px 0' }}>
          <TallyMarkSVG count={18} color="#2d1508" />
        </div>
        <div className="win-opts">
          {[['1','A'],['2','B'],['3','C'],['4','D']].map(([v,l]) => (
            <div key={v} onClick={() => lp.handleMcq('mtm_q5', v)} className={`win-opt ${lp.getMcqClass('mtm_q5', v)}`}>
              <span className="win-opt-letter">{l}</span>{v}
            </div>
          ))}
        </div>
      </div>
    ),
  },
  // Q6 — show 15
  {
    id: 'mtm_q6',
    meta: {
      type: 'mcq', qid: 'mtm_q6',
      correct: 'C',
      explanation: '15 = exactly 3 full crossed groups (5+5+5). No extra sticks!',
      correctLabel: 'Option C',
    },
    render: (lp) => (
      <div className="win-qcard">
        <div className="win-qmeta"><span className="win-qbadge">Q</span><span className="win-qtype">Pick the Right Tally</span></div>
        <p className="win-qtext">Which shows <strong>15</strong>? 🔢</p>
        <div className="win-tally-grid">
          {[['A',14],['B',16],['C',15],['D',13]].map(([opt, cnt]) => (
            <div key={opt}>
              <TallyChoice lp={lp} qid="mtm_q6" val={opt} count={cnt} />
              <div style={{ textAlign:'center', fontSize:'.75rem', fontWeight:700, color:'#64748b', marginTop:4 }}>{opt}</div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  // Q7 — full groups for 36
  {
    id: 'mtm_q7',
    meta: {
      type: 'mcq', qid: 'mtm_q7',
      correct: '7',
      explanation: '36 = 7 groups of 5 (= 35) + 1 extra stick. So 7 complete crossed groups!',
      correctLabel: '7 groups',
    },
    render: (lp) => (
      <div className="win-qcard">
        <div className="win-qmeta"><span className="win-qbadge">Q</span><span className="win-qtype">Groups of 5</span></div>
        <p className="win-qtext">Hemant has <strong>36 cows</strong>. How many <strong>full groups of 5</strong>? 🐄</p>
        <div className="win-opts">
          {[['6','A'],['7','B'],['8','C'],['9','D']].map(([v,l]) => (
            <div key={v} onClick={() => lp.handleMcq('mtm_q7', v)} className={`win-opt ${lp.getMcqClass('mtm_q7', v)}`}>
              <span className="win-opt-letter">{l}</span>{v}
            </div>
          ))}
        </div>
      </div>
    ),
  },
  // Q8 — show 20
  {
    id: 'mtm_q8',
    meta: {
      type: 'tf', qid: 'mtm_q8_tf',
      correct: true,
      explanation: 'Yes! 20 = exactly 4 crossed groups (5×4 = 20). No extra sticks needed.',
      correctLabel: 'True',
    },
    render: (lp) => (
      <div className="win-qcard">
        <div className="win-qmeta"><span className="win-qbadge">Q</span><span className="win-qtype">True / False</span></div>
        <p className="win-qtext">To show <strong>20</strong>, you need exactly <strong>4 crossed groups</strong> and no extra sticks.</p>
        <div style={{ display:'flex', justifyContent:'center', margin:'16px 0' }}>
          <TallyMarkSVG count={20} color="#2d1508" />
        </div>
        <div className="win-tfopts">
          <button onClick={() => lp.handleTf('mtm_q8_tf', true)} className={`win-tfbtn win-t ${lp.getTfClass('mtm_q8_tf', true)}`}>✅ True</button>
          <button onClick={() => lp.handleTf('mtm_q8_tf', false)} className={`win-tfbtn win-f ${lp.getTfClass('mtm_q8_tf', false)}`}>❌ False</button>
        </div>
      </div>
    ),
  },
];

const MakingTallyMarks = () => {
  const selRef = useRef(null);
  if (!selRef.current) {
    selRef.current = shuffle([...QUESTION_POOL]).slice(0, 5).map(q =>
      q.rightItems ? { ...q, shuffledRight: shuffle([...q.rightItems]) } : q
    );
  }
  const selected = selRef.current;
  const matchAnswers = {};
  selected.forEach(q => { if (q.matchAnswers) Object.assign(matchAnswers, q.matchAnswers); });
  const logicProps = useWINLogic(matchAnswers);
  const questions = selected.map(q => <React.Fragment key={q.id}>{q.render(logicProps, q)}</React.Fragment>);
  const questionMeta = selected.map(q => q.meta);

  return (
    <WINPracticeTemplate
      skillId="WIN-02"
      skillName="Making Tally Marks"
      questions={questions}
      questionMeta={questionMeta}
      logicProps={logicProps}
    />
  );
};

export default MakingTallyMarks;
