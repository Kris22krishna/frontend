import React, { useRef } from 'react';
import { useWINLogic } from './useWINLogic';
import WINPracticeTemplate from './WINPracticeTemplate';
import { TallyMarkSVG, StoryBox, shuffle } from './WINSharedComponents';
import './whats-in-a-name.css';

// Two-column tally comparison: went out vs came back
const TallyCompare = ({ outCount, backCount }) => (
  <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginTop: 14 }}>
    <div style={{
      background: '#eff6ff', border: '2px solid #3a86ff', borderRadius: 14,
      padding: '12px 14px', textAlign: 'center', flex: '1 1 120px',
      minWidth: 0, overflow: 'hidden',
    }}>
      <div style={{ fontSize: '1.2rem', marginBottom: 6 }}>🚪 Went Out</div>
      <TallyMarkSVG count={outCount} color="#1e40af" />
      <div style={{ fontWeight: 700, color: '#1e40af', marginTop: 6, fontSize: '.85rem' }}>{outCount} marks</div>
    </div>
    <div style={{
      background: '#f0fdf4', border: '2px solid #16a34a', borderRadius: 14,
      padding: '12px 14px', textAlign: 'center', flex: '1 1 120px',
      minWidth: 0, overflow: 'hidden',
    }}>
      <div style={{ fontSize: '1.2rem', marginBottom: 6 }}>🏠 Came Back</div>
      <TallyMarkSVG count={backCount} color="#15803d" />
      <div style={{ fontWeight: 700, color: '#15803d', marginTop: 6, fontSize: '.85rem' }}>{backCount} struck</div>
    </div>
  </div>
);

const QUESTION_POOL = [
  // Q1 — 20 out, 18 back → 2 missing
  {
    id: 'mft_q1',
    meta: {
      type: 'mcq', qid: 'mft_q1',
      correct: '2',
      explanation: '20 went out, 18 came back. 20 – 18 = 2 cows are still missing!',
      correctLabel: '2',
    },
    render: (lp) => (
      <div className="win-qcard">
        <div className="win-qmeta"><span className="win-qbadge">Q</span><span className="win-qtype">Find the Missing</span></div>
        <p className="win-qtext">How many are <strong>missing</strong>? 🐄</p>
        <TallyCompare outCount={20} backCount={18} />
        <div className="win-opts" style={{ marginTop: 14 }}>
          {[['1','A'],['2','B'],['3','C'],['4','D']].map(([v,l]) => (
            <div key={v} onClick={() => lp.handleMcq('mft_q1', v)} className={`win-opt ${lp.getMcqClass('mft_q1', v)}`}>
              <span className="win-opt-letter">{l}</span>{v}
            </div>
          ))}
        </div>
      </div>
    ),
  },
  // Q2 — TF: all marks struck out = no missing
  {
    id: 'mft_q2',
    meta: {
      type: 'tf', qid: 'mft_q2_tf',
      correct: true,
      explanation: 'Correct! If every mark is struck out, then every cow that went out also came back. None are missing!',
      correctLabel: 'True',
    },
    render: (lp) => (
      <div className="win-qcard">
        <div className="win-qmeta"><span className="win-qbadge">Q</span><span className="win-qtype">True / False</span></div>
        <StoryBox>Deba made marks for 12 cows. When they returned, ALL marks were struck out.</StoryBox>
        <p className="win-qtext">No cows are <strong>missing</strong>.</p>
        <div className="win-tfopts">
          <button onClick={() => lp.handleTf('mft_q2_tf', true)} className={`win-tfbtn win-t ${lp.getTfClass('mft_q2_tf', true)}`}>✅ True</button>
          <button onClick={() => lp.handleTf('mft_q2_tf', false)} className={`win-tfbtn win-f ${lp.getTfClass('mft_q2_tf', false)}`}>❌ False</button>
        </div>
      </div>
    ),
  },
  // Q3 — 23 sheep, 20 back → 3 missing
  {
    id: 'mft_q3',
    meta: {
      type: 'mcq', qid: 'mft_q3',
      correct: '3',
      explanation: '23 went out, 20 came back. 23 – 20 = 3 sheep are missing!',
      correctLabel: '3',
    },
    render: (lp) => (
      <div className="win-qcard">
        <div className="win-qmeta"><span className="win-qbadge">Q</span><span className="win-qtype">Find the Missing</span></div>
        <p className="win-qtext">Hemant's <strong>sheep</strong> — how many missing? 🐑</p>
        <TallyCompare outCount={23} backCount={20} />
        <div className="win-opts" style={{ marginTop: 14 }}>
          {[['2','A'],['3','B'],['4','C'],['5','D']].map(([v,l]) => (
            <div key={v} onClick={() => lp.handleMcq('mft_q3', v)} className={`win-opt ${lp.getMcqClass('mft_q3', v)}`}>
              <span className="win-opt-letter">{l}</span>{v}
            </div>
          ))}
        </div>
      </div>
    ),
  },
  // Q4 — 15 students, 12 back → 3 missing
  {
    id: 'mft_q4',
    meta: {
      type: 'mcq', qid: 'mft_q4',
      correct: '3',
      explanation: '15 students left, 12 came back. 15 – 12 = 3 students are still outside!',
      correctLabel: '3',
    },
    render: (lp) => (
      <div className="win-qcard">
        <div className="win-qmeta"><span className="win-qbadge">Q</span><span className="win-qtype">Find the Missing</span></div>
        <p className="win-qtext">Students went out to play — how many didn't come back? 🧒</p>
        <TallyCompare outCount={15} backCount={12} />
        <div className="win-opts" style={{ marginTop: 14 }}>
          {[['2','A'],['3','B'],['4','C'],['5','D']].map(([v,l]) => (
            <div key={v} onClick={() => lp.handleMcq('mft_q4', v)} className={`win-opt ${lp.getMcqClass('mft_q4', v)}`}>
              <span className="win-opt-letter">{l}</span>{v}
            </div>
          ))}
        </div>
      </div>
    ),
  },
  // Q5 — 36 cows, 34 back → 2 missing (exact story from PDF p.2)
  {
    id: 'mft_q5',
    meta: {
      type: 'mcq', qid: 'mft_q5',
      correct: '2',
      explanation: 'The wall had marks for 36 cows. 34 came back (34 marks struck). 36 – 34 = 2 cows missing — just like in the story!',
      correctLabel: '2',
    },
    render: (lp) => (
      <div className="win-qcard">
        <div className="win-qmeta"><span className="win-qbadge">Q</span><span className="win-qtype">Story Problem</span></div>
        <StoryBox>🐄 Deba made marks on the wall. 2 marks were still left when all cows came back. How many were missing?</StoryBox>
        <TallyCompare outCount={36} backCount={34} />
        <div className="win-opts" style={{ marginTop: 14 }}>
          {[['1','A'],['2','B'],['3','C'],['4','D']].map(([v,l]) => (
            <div key={v} onClick={() => lp.handleMcq('mft_q5', v)} className={`win-opt ${lp.getMcqClass('mft_q5', v)}`}>
              <span className="win-opt-letter">{l}</span>{v}
            </div>
          ))}
        </div>
      </div>
    ),
  },
  // Q6 — 10 out, 8 back → 2 missing
  {
    id: 'mft_q6',
    meta: {
      type: 'mcq', qid: 'mft_q6',
      correct: '2',
      explanation: '10 books were taken out. 8 were returned. 10 – 8 = 2 books are missing!',
      correctLabel: '2',
    },
    render: (lp) => (
      <div className="win-qcard">
        <div className="win-qmeta"><span className="win-qbadge">Q</span><span className="win-qtype">Find the Missing</span></div>
        <p className="win-qtext">Library books — how many are <strong>missing</strong>? 📚</p>
        <TallyCompare outCount={10} backCount={8} />
        <div className="win-opts" style={{ marginTop: 14 }}>
          {[['1','A'],['2','B'],['3','C'],['4','D']].map(([v,l]) => (
            <div key={v} onClick={() => lp.handleMcq('mft_q6', v)} className={`win-opt ${lp.getMcqClass('mft_q6', v)}`}>
              <span className="win-opt-letter">{l}</span>{v}
            </div>
          ))}
        </div>
      </div>
    ),
  },
  // Q7 — TF: 12 went out, 10 back → 3 missing (FALSE, it's 2)
  {
    id: 'mft_q7',
    meta: {
      type: 'tf', qid: 'mft_q7_tf',
      correct: false,
      explanation: '12 went out, 10 came back. 12 – 10 = 2 are missing, NOT 3. So the statement is False!',
      correctLabel: 'False — 2 are missing',
    },
    render: (lp) => (
      <div className="win-qcard">
        <div className="win-qmeta"><span className="win-qbadge">Q</span><span className="win-qtype">True / False</span></div>
        <p className="win-qtext"><strong>12</strong> cows went out. <strong>10</strong> came back. <strong>3</strong> are missing.</p>
        <TallyCompare outCount={12} backCount={10} />
        <div className="win-tfopts" style={{ marginTop: 14 }}>
          <button onClick={() => lp.handleTf('mft_q7_tf', true)} className={`win-tfbtn win-t ${lp.getTfClass('mft_q7_tf', true)}`}>✅ True</button>
          <button onClick={() => lp.handleTf('mft_q7_tf', false)} className={`win-tfbtn win-f ${lp.getTfClass('mft_q7_tf', false)}`}>❌ False</button>
        </div>
      </div>
    ),
  },
  // Q8 — 18 out, 15 back → 3 missing
  {
    id: 'mft_q8',
    meta: {
      type: 'mcq', qid: 'mft_q8',
      correct: '3',
      explanation: '18 went out, 15 came back. 18 – 15 = 3 are still out in the field!',
      correctLabel: '3',
    },
    render: (lp) => (
      <div className="win-qcard">
        <div className="win-qmeta"><span className="win-qbadge">Q</span><span className="win-qtype">Find the Missing</span></div>
        <p className="win-qtext">How many birds flew away and didn't return? 🐦</p>
        <TallyCompare outCount={18} backCount={15} />
        <div className="win-opts" style={{ marginTop: 14 }}>
          {[['2','A'],['3','B'],['4','C'],['5','D']].map(([v,l]) => (
            <div key={v} onClick={() => lp.handleMcq('mft_q8', v)} className={`win-opt ${lp.getMcqClass('mft_q8', v)}`}>
              <span className="win-opt-letter">{l}</span>{v}
            </div>
          ))}
        </div>
      </div>
    ),
  },
];

const MissingFromTallies = () => {
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
      skillId="WIN-03"
      skillName="Missing from Tallies"
      questions={questions}
      questionMeta={questionMeta}
      logicProps={logicProps}
    />
  );
};

export default MissingFromTallies;
