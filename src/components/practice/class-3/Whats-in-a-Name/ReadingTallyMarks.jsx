import React, { useRef } from 'react';
import { useWINLogic } from './useWINLogic';
import WINPracticeTemplate from './WINPracticeTemplate';
import { TallyWall, TallyMarkSVG, shuffle } from './WINSharedComponents';
import './whats-in-a-name.css';

// MCQ option styled block
const Opt = ({ lp, qid, val, label }) => {
  const cls = lp.getMcqClass(qid, val);
  return (
    <div
      onClick={() => lp.handleMcq(qid, val)}
      className={`win-opt ${cls}`}
    >
      <span className="win-opt-letter">{label}</span>
      {val}
    </div>
  );
};

const QUESTION_POOL = [
  // Q1 — count 7
  {
    id: 'rtm_q1',
    meta: {
      type: 'mcq', qid: 'rtm_q1_mcq',
      correct: '7',
      explanation: 'Count the marks: one full group of 5 (✗) + 2 extra = 7 cows!',
      correctLabel: '7',
    },
    render: (lp) => (
      <div className="win-qcard">
        <div className="win-qmeta"><span className="win-qbadge">Q</span><span className="win-qtype">Count the Marks</span></div>
        <p className="win-qtext">How many marks are on the wall? 🐄</p>
        <div style={{ display: 'flex', justifyContent: 'center', margin: '16px 0' }}>
          <TallyWall count={7} />
        </div>
        <div className="win-opts">
          {[['5','A'],['6','B'],['7','C'],['8','D']].map(([v,l]) => <Opt key={v} lp={lp} qid="rtm_q1_mcq" val={v} label={l} />)}
        </div>
      </div>
    ),
  },
  // Q2 — count 12
  {
    id: 'rtm_q2',
    meta: {
      type: 'mcq', qid: 'rtm_q2_mcq',
      correct: '12',
      explanation: '2 full groups of 5 (✗ ✗) + 2 extra = 10 + 2 = 12!',
      correctLabel: '12',
    },
    render: (lp) => (
      <div className="win-qcard">
        <div className="win-qmeta"><span className="win-qbadge">Q</span><span className="win-qtype">Count the Marks</span></div>
        <p className="win-qtext">How many cows went out? 🐄</p>
        <div style={{ display: 'flex', justifyContent: 'center', margin: '16px 0' }}>
          <TallyWall count={12} />
        </div>
        <div className="win-opts">
          {[['10','A'],['11','B'],['12','C'],['13','D']].map(([v,l]) => <Opt key={v} lp={lp} qid="rtm_q2_mcq" val={v} label={l} />)}
        </div>
      </div>
    ),
  },
  // Q3 — count 18
  {
    id: 'rtm_q3',
    meta: {
      type: 'mcq', qid: 'rtm_q3_mcq',
      correct: '18',
      explanation: '3 full groups (✗ ✗ ✗) = 15, plus 3 more = 18!',
      correctLabel: '18',
    },
    render: (lp) => (
      <div className="win-qcard">
        <div className="win-qmeta"><span className="win-qbadge">Q</span><span className="win-qtype">Count the Marks</span></div>
        <p className="win-qtext">Count the sheep marks! 🐑</p>
        <div style={{ display: 'flex', justifyContent: 'center', margin: '16px 0' }}>
          <TallyWall count={18} />
        </div>
        <div className="win-opts">
          {[['16','A'],['17','B'],['18','C'],['19','D']].map(([v,l]) => <Opt key={v} lp={lp} qid="rtm_q3_mcq" val={v} label={l} />)}
        </div>
      </div>
    ),
  },
  // Q4 — count 5 (one crossed group)
  {
    id: 'rtm_q4',
    meta: {
      type: 'tf', qid: 'rtm_q4_tf',
      correct: true,
      explanation: 'Yes! One crossed group (4 vertical + 1 diagonal) = exactly 5 marks.',
      correctLabel: 'True',
    },
    render: (lp) => (
      <div className="win-qcard">
        <div className="win-qmeta"><span className="win-qbadge">Q</span><span className="win-qtype">True / False</span></div>
        <p className="win-qtext">This shows <strong>5</strong> marks. ✅ or ❌?</p>
        <div style={{ display: 'flex', justifyContent: 'center', margin: '16px 0' }}>
          <TallyWall count={5} />
        </div>
        <div className="win-tfopts">
          <button onClick={() => lp.handleTf('rtm_q4_tf', true)} className={`win-tfbtn win-t ${lp.getTfClass('rtm_q4_tf', true)}`}>✅ True</button>
          <button onClick={() => lp.handleTf('rtm_q4_tf', false)} className={`win-tfbtn win-f ${lp.getTfClass('rtm_q4_tf', false)}`}>❌ False</button>
        </div>
      </div>
    ),
  },
  // Q5 — count 8
  {
    id: 'rtm_q5',
    meta: {
      type: 'mcq', qid: 'rtm_q5_mcq',
      correct: '8',
      explanation: '1 full crossed group = 5, plus 3 more sticks = 5 + 3 = 8!',
      correctLabel: '8',
    },
    render: (lp) => (
      <div className="win-qcard">
        <div className="win-qmeta"><span className="win-qbadge">Q</span><span className="win-qtype">Count the Marks</span></div>
        <p className="win-qtext">How many students entered the class? 🏫</p>
        <div style={{ display: 'flex', justifyContent: 'center', margin: '16px 0' }}>
          <TallyWall count={8} />
        </div>
        <div className="win-opts">
          {[['7','A'],['8','B'],['9','C'],['10','D']].map(([v,l]) => <Opt key={v} lp={lp} qid="rtm_q5_mcq" val={v} label={l} />)}
        </div>
      </div>
    ),
  },
  // Q6 — count 15
  {
    id: 'rtm_q6',
    meta: {
      type: 'mcq', qid: 'rtm_q6_mcq',
      correct: '15',
      explanation: '3 full crossed groups = 5 + 5 + 5 = 15. No extra sticks!',
      correctLabel: '15',
    },
    render: (lp) => (
      <div className="win-qcard">
        <div className="win-qmeta"><span className="win-qbadge">Q</span><span className="win-qtype">Count the Marks</span></div>
        <p className="win-qtext">Count the marks on the wall! 🧱</p>
        <div style={{ display: 'flex', justifyContent: 'center', margin: '16px 0' }}>
          <TallyWall count={15} />
        </div>
        <div className="win-opts">
          {[['13','A'],['14','B'],['15','C'],['16','D']].map(([v,l]) => <Opt key={v} lp={lp} qid="rtm_q6_mcq" val={v} label={l} />)}
        </div>
      </div>
    ),
  },
  // Q7 — tf: 10 = 2 groups
  {
    id: 'rtm_q7',
    meta: {
      type: 'tf', qid: 'rtm_q7_tf',
      correct: true,
      explanation: 'Correct! 2 crossed groups = 5 + 5 = 10 marks.',
      correctLabel: 'True',
    },
    render: (lp) => (
      <div className="win-qcard">
        <div className="win-qmeta"><span className="win-qbadge">Q</span><span className="win-qtype">True / False</span></div>
        <p className="win-qtext">This shows <strong>10</strong> marks.</p>
        <div style={{ display: 'flex', justifyContent: 'center', margin: '16px 0' }}>
          <TallyWall count={10} />
        </div>
        <div className="win-tfopts">
          <button onClick={() => lp.handleTf('rtm_q7_tf', true)} className={`win-tfbtn win-t ${lp.getTfClass('rtm_q7_tf', true)}`}>✅ True</button>
          <button onClick={() => lp.handleTf('rtm_q7_tf', false)} className={`win-tfbtn win-f ${lp.getTfClass('rtm_q7_tf', false)}`}>❌ False</button>
        </div>
      </div>
    ),
  },
  // Q8 — count 23
  {
    id: 'rtm_q8',
    meta: {
      type: 'mcq', qid: 'rtm_q8_mcq',
      correct: '23',
      explanation: '4 full groups = 20, plus 3 extra sticks = 20 + 3 = 23!',
      correctLabel: '23',
    },
    render: (lp) => (
      <div className="win-qcard">
        <div className="win-qmeta"><span className="win-qbadge">Q</span><span className="win-qtype">Count the Marks</span></div>
        <p className="win-qtext">Hemant's sheep! How many? 🐑</p>
        <div style={{ display: 'flex', justifyContent: 'center', margin: '16px 0' }}>
          <TallyWall count={23} />
        </div>
        <div className="win-opts">
          {[['21','A'],['22','B'],['23','C'],['24','D']].map(([v,l]) => <Opt key={v} lp={lp} qid="rtm_q8_mcq" val={v} label={l} />)}
        </div>
      </div>
    ),
  },
  // Q9 — match tally to number
  {
    id: 'rtm_q9',
    matchAnswers: {
      rtm_match: {
        'rtm_t6': '6',
        'rtm_t10': '10',
        'rtm_t3': '3',
        'rtm_t14': '14',
      }
    },
    rightItems: [['6','6'],['10','10'],['3','3'],['14','14']],
    meta: {
      type: 'match', totalPairs: 4,
      explanation: '6 = 1 group of 5 + 1. 10 = 2 groups. 3 = three sticks. 14 = 2 groups + 4.',
      correctLabel: 'All 4 matched!',
    },
    render: (lp, ctx) => (
      <div className="win-qcard">
        <div className="win-qmeta"><span className="win-qbadge">Q</span><span className="win-qtype">Match Tally → Number</span></div>
        <p className="win-qtext">Match each tally to its number! 🎯</p>
        <div className="win-match-wrap">
          <div className="win-match-col">
            {[
              ['rtm_t6', 6],
              ['rtm_t10', 10],
              ['rtm_t3', 3],
              ['rtm_t14', 14],
            ].map(([val, cnt]) => (
              <div
                key={val}
                onClick={() => lp.handleMatch('rtm_match', 'left', val)}
                className={`win-match-item ${lp.getMatchClass('rtm_match', 'left', val)}`}
                style={{ display: 'flex', justifyContent: 'center', padding: '10px' }}
              >
                <TallyMarkSVG count={cnt} color="#2d1508" />
              </div>
            ))}
          </div>
          <div className="win-match-center">
            {[0,1,2,3].map(i => <div key={i} className="win-match-line">→</div>)}
          </div>
          <div className="win-match-col">
            {ctx.shuffledRight.map(([val, label]) => (
              <div
                key={val}
                onClick={() => lp.handleMatch('rtm_match', 'right', val)}
                className={`win-match-item ${lp.getMatchClass('rtm_match', 'right', val)}`}
              >
                {label}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  },
];

const ReadingTallyMarks = () => {
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
      skillId="WIN-01"
      skillName="Reading Tally Marks"
      questions={questions}
      questionMeta={questionMeta}
      logicProps={logicProps}
    />
  );
};

export default ReadingTallyMarks;
