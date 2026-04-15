import React, { useRef } from 'react';
import { useWINLogic } from './useWINLogic';
import WINPracticeTemplate from './WINPracticeTemplate';
import { LetterBoxes, shuffle } from './WINSharedComponents';
import './whats-in-a-name.css';

// Clue card component — like the "Find out" boxes in the PDF
const ClueCard = ({ clues, color = '#4f46e5' }) => (
  <div style={{
    background: '#f5f3ff',
    border: `2px solid ${color}`,
    borderRadius: 14,
    padding: '14px 18px',
    margin: '12px 0',
  }}>
    <div style={{ fontWeight: 800, fontSize: '.85rem', color, marginBottom: 10, textTransform: 'uppercase', letterSpacing: 1 }}>
      🔍 Find out!
    </div>
    {clues.map((clue, i) => (
      <div key={i} style={{
        display: 'flex', alignItems: 'center', gap: 8,
        marginBottom: 6, fontSize: '.88rem', fontWeight: 600, color: '#1a1a2e',
      }}>
        <span style={{ width: 8, height: 8, background: color, borderRadius: '50%', flexShrink: 0 }}></span>
        {clue}
      </div>
    ))}
  </div>
);

// Show a number name with letter boxes to illustrate the answer explanation
const ExplainNumber = ({ num, word, display }) => (
  <div style={{ textAlign: 'center', margin: '10px 0' }}>
    <div style={{ fontFamily: "'Baloo 2',cursive", fontWeight: 900, fontSize: '2.2rem', color: '#4f46e5', marginBottom: 6 }}>{num}</div>
    <div style={{ display: 'flex', gap: 6, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 8 }}>
      {display.split(' ').map((w, i) => (
        <div key={i} style={{ background: '#fef3c7', border: '2px solid #f59e0b', borderRadius: 8, padding: '4px 12px', fontFamily: "'Baloo 2',cursive", fontWeight: 800, fontSize: '.95rem', color: '#92400e' }}>{w}</div>
      ))}
    </div>
    <LetterBoxes word={word} color="#4f46e5" bgColor="#eef2ff" textColor="#3730a3" />
  </div>
);

const QUESTION_POOL = [
  // Q1 — PDF p.6 exact: "Near 100, two words, first 6 letters, second 5 letters" → 98
  {
    id: 'nnp_q1',
    meta: {
      type: 'mcq', qid: 'nnp_q1',
      correct: '98',
      explanation: 'NINETY EIGHT = ninety(6) + eight(5) = 11 letters. It has 2 words. First word NINETY has 6 letters. Second word EIGHT has 5 letters. And 98 is very near 100!',
      correctLabel: '98',
    },
    render: (lp) => (
      <div className="win-qcard">
        <div className="win-qmeta"><span className="win-qbadge">Q</span><span className="win-qtype">Number Puzzle</span></div>
        <p className="win-qtext">Who am I? 🔍</p>
        <ClueCard clues={[
          'My number name has 2 words.',
          'The first word has 6 letters.',
          'The second word has 5 letters.',
          'I am very near 100.',
        ]} />
        <div className="win-opts">
          {[['97','A'],['98','B'],['99','C'],['96','D']].map(([v,l]) => (
            <div key={v} onClick={() => lp.handleMcq('nnp_q1', v)} className={`win-opt ${lp.getMcqClass('nnp_q1', v)}`}>
              <span className="win-opt-letter">{l}</span>{v}
            </div>
          ))}
        </div>
      </div>
    ),
  },
  // Q2 — PDF p.6 exact: "Between 63-78, smallest name" → 70 (seventy = 7 letters)
  {
    id: 'nnp_q2',
    meta: {
      type: 'mcq', qid: 'nnp_q2',
      correct: '70',
      explanation: 'SEVENTY has only 7 letters — the fewest among all numbers from 63 to 78. So 70 is the answer!',
      correctLabel: '70',
    },
    render: (lp) => (
      <div className="win-qcard">
        <div className="win-qmeta"><span className="win-qbadge">Q</span><span className="win-qtype">Number Puzzle</span></div>
        <p className="win-qtext">Who am I? 🔍</p>
        <ClueCard clues={[
          'My friends and I are numbers from 63 to 78.',
          'My number name is the SMALLEST (fewest letters).',
        ]} color="#16a34a" />
        <div className="win-opts">
          {[['64','A'],['70','B'],['66','C'],['73','D']].map(([v,l]) => (
            <div key={v} onClick={() => lp.handleMcq('nnp_q2', v)} className={`win-opt ${lp.getMcqClass('nnp_q2', v)}`}>
              <span className="win-opt-letter">{l}</span>{v}
            </div>
          ))}
        </div>
      </div>
    ),
  },
  // Q3 — Longest number name between 1-99 (73, 77, 78 all have 12)
  {
    id: 'nnp_q3',
    meta: {
      type: 'mcq', qid: 'nnp_q3',
      correct: '73',
      explanation: 'SEVENTY THREE has 12 letters (S-E-V-E-N-T-Y-T-H-R-E-E). Among 1–99, 73, 77, and 78 all have 12 letters — the longest!',
      correctLabel: '73 (seventy-three)',
    },
    render: (lp) => (
      <div className="win-qcard">
        <div className="win-qmeta"><span className="win-qbadge">Q</span><span className="win-qtype">Longest Number Name</span></div>
        <p className="win-qtext">Which number between 1–99 has the <strong>LONGEST</strong> name? 🏆</p>
        <div className="win-opts">
          {[['56','A'],['73','B'],['43','C'],['17','D']].map(([v,l]) => (
            <div key={v} onClick={() => lp.handleMcq('nnp_q3', v)} className={`win-opt ${lp.getMcqClass('nnp_q3', v)}`}>
              <span className="win-opt-letter">{l}</span>{v}
            </div>
          ))}
        </div>
      </div>
    ),
  },
  // Q4 — How many letters in SEVENTY THREE?
  {
    id: 'nnp_q4',
    meta: {
      type: 'mcq', qid: 'nnp_q4',
      correct: '12',
      explanation: 'SEVENTY THREE: S-E-V-E-N-T-Y-T-H-R-E-E = 12 letters!',
      correctLabel: '12 letters',
    },
    render: (lp) => (
      <div className="win-qcard">
        <div className="win-qmeta"><span className="win-qbadge">Q</span><span className="win-qtype">Count Letters</span></div>
        <p className="win-qtext">How many letters in <strong>SEVENTY THREE</strong>? 🔢</p>
        <ExplainNumber num={73} word="seventythree" display="SEVENTY THREE" />
        <div className="win-opts">
          {[['10','A'],['11','B'],['12','C'],['13','D']].map(([v,l]) => (
            <div key={v} onClick={() => lp.handleMcq('nnp_q4', v)} className={`win-opt ${lp.getMcqClass('nnp_q4', v)}`}>
              <span className="win-opt-letter">{l}</span>{v}
            </div>
          ))}
        </div>
      </div>
    ),
  },
  // Q5 — TF: 73, 77, 78 all have 12 letters
  {
    id: 'nnp_q5',
    meta: {
      type: 'tf', qid: 'nnp_q5_tf',
      correct: true,
      explanation: '73 = SEVENTY THREE (12), 77 = SEVENTY SEVEN (12), 78 = SEVENTY EIGHT (12). All three have 12 letters!',
      correctLabel: 'True',
    },
    render: (lp) => (
      <div className="win-qcard">
        <div className="win-qmeta"><span className="win-qbadge">Q</span><span className="win-qtype">True / False</span></div>
        <p className="win-qtext">Numbers <strong>73, 77, and 78</strong> all have <strong>12 letters</strong> in their names.</p>
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap', margin: '12px 0' }}>
          {[
            { num: 73, display: 'SEVENTY THREE' },
            { num: 77, display: 'SEVENTY SEVEN' },
            { num: 78, display: 'SEVENTY EIGHT' },
          ].map(({ num, display }) => (
            <div key={num} style={{ textAlign: 'center', background: '#f5f3ff', borderRadius: 10, padding: '10px 14px', border: '2px solid #8b5cf6' }}>
              <div style={{ fontFamily: "'Baloo 2',cursive", fontWeight: 900, fontSize: '1.8rem', color: '#6d28d9' }}>{num}</div>
              <div style={{ fontSize: '.75rem', fontWeight: 700, color: '#7e22ce', marginTop: 4 }}>{display}</div>
            </div>
          ))}
        </div>
        <div className="win-tfopts">
          <button onClick={() => lp.handleTf('nnp_q5_tf', true)} className={`win-tfbtn win-t ${lp.getTfClass('nnp_q5_tf', true)}`}>✅ True</button>
          <button onClick={() => lp.handleTf('nnp_q5_tf', false)} className={`win-tfbtn win-f ${lp.getTfClass('nnp_q5_tf', false)}`}>❌ False</button>
        </div>
      </div>
    ),
  },
  // Q6 — SIXTY SIX = 8 letters
  {
    id: 'nnp_q6',
    meta: {
      type: 'mcq', qid: 'nnp_q6',
      correct: '8',
      explanation: 'SIXTY SIX: S-I-X-T-Y-S-I-X = 8 letters.',
      correctLabel: '8 letters',
    },
    render: (lp) => (
      <div className="win-qcard">
        <div className="win-qmeta"><span className="win-qbadge">Q</span><span className="win-qtype">Count Letters</span></div>
        <p className="win-qtext">How many letters in <strong>SIXTY SIX</strong>? 🔢</p>
        <ExplainNumber num={66} word="sixtysix" display="SIXTY SIX" />
        <div className="win-opts">
          {[['7','A'],['8','B'],['9','C'],['10','D']].map(([v,l]) => (
            <div key={v} onClick={() => lp.handleMcq('nnp_q6', v)} className={`win-opt ${lp.getMcqClass('nnp_q6', v)}`}>
              <span className="win-opt-letter">{l}</span>{v}
            </div>
          ))}
        </div>
      </div>
    ),
  },
  // Q7 — I have 7 letters, between 60-80 → SEVENTY (70)
  {
    id: 'nnp_q7',
    meta: {
      type: 'mcq', qid: 'nnp_q7',
      correct: '70',
      explanation: 'SEVENTY = S-E-V-E-N-T-Y = exactly 7 letters! It is between 60 and 80.',
      correctLabel: '70',
    },
    render: (lp) => (
      <div className="win-qcard">
        <div className="win-qmeta"><span className="win-qbadge">Q</span><span className="win-qtype">Number Puzzle</span></div>
        <p className="win-qtext">Who am I? 🔍</p>
        <ClueCard clues={[
          'I am between 60 and 80.',
          'My number name has exactly 7 letters.',
        ]} color="#f59e0b" />
        <div className="win-opts">
          {[['60','A'],['70','B'],['80','C'],['66','D']].map(([v,l]) => (
            <div key={v} onClick={() => lp.handleMcq('nnp_q7', v)} className={`win-opt ${lp.getMcqClass('nnp_q7', v)}`}>
              <span className="win-opt-letter">{l}</span>{v}
            </div>
          ))}
        </div>
      </div>
    ),
  },
  // Q8 — same 8 letters: which pair? 56 and 42 (both 8)
  {
    id: 'nnp_q8',
    meta: {
      type: 'mcq', qid: 'nnp_q8',
      correct: '42',
      explanation: 'FORTY TWO = F-O-R-T-Y-T-W-O = 8 letters. FIFTY SIX also has 8. They have the same number of letters!',
      correctLabel: '42 (both have 8 letters)',
    },
    render: (lp) => (
      <div className="win-qcard">
        <div className="win-qmeta"><span className="win-qbadge">Q</span><span className="win-qtype">Same Letter Count</span></div>
        <p className="win-qtext"><strong>56 (FIFTY SIX)</strong> has 8 letters. Which other number also has <strong>8 letters</strong>?</p>
        <div style={{ textAlign: 'center', margin: '10px 0 14px' }}>
          <ExplainNumber num={56} word="fiftysix" display="FIFTY SIX" />
        </div>
        <div className="win-opts">
          {[['43','A'],['42','B'],['17','C'],['20','D']].map(([v,l]) => (
            <div key={v} onClick={() => lp.handleMcq('nnp_q8', v)} className={`win-opt ${lp.getMcqClass('nnp_q8', v)}`}>
              <span className="win-opt-letter">{l}</span>{v}
            </div>
          ))}
        </div>
      </div>
    ),
  },
];

const NumberNamePuzzles = () => {
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
      skillId="WIN-07"
      skillName="Number Name Puzzles"
      questions={questions}
      questionMeta={questionMeta}
      logicProps={logicProps}
    />
  );
};

export default NumberNamePuzzles;
