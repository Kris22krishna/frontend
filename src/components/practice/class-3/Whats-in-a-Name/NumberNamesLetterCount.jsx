import React, { useRef } from 'react';
import { useWINLogic } from './useWINLogic';
import WINPracticeTemplate from './WINPracticeTemplate';
import { LetterBoxes, shuffle } from './WINSharedComponents';
import './whats-in-a-name.css';

// Number name data — letter counts exactly as per PDF (no hyphen counted)
// PDF examples: 43=forty-three(10), 17=seventeen(9), 56=fifty-six(8)
const NUM_NAMES = {
  17:  { name: 'seventeen',   display: 'SEVENTEEN',   count: 9 },
  43:  { name: 'fortythree',  display: 'FORTY THREE', count: 10 },
  56:  { name: 'fiftysix',    display: 'FIFTY SIX',   count: 8 },
  13:  { name: 'thirteen',    display: 'THIRTEEN',    count: 8 },
  14:  { name: 'fourteen',    display: 'FOURTEEN',    count: 8 },
  70:  { name: 'seventy',     display: 'SEVENTY',     count: 7 },
  42:  { name: 'fortytwo',    display: 'FORTY TWO',   count: 8 },
  66:  { name: 'sixtysix',    display: 'SIXTY SIX',   count: 8 },
  40:  { name: 'forty',       display: 'FORTY',       count: 5 },
  20:  { name: 'twenty',      display: 'TWENTY',      count: 6 },
};

// Number name card with letter boxes split per word
const NumberCard = ({ num }) => {
  const { display, name } = NUM_NAMES[num];
  const words = name.replace(/\s+/g, '').split('');  // count letters without spaces

  return (
    <div style={{ textAlign: 'center', margin: '12px 0' }}>
      {/* Big number */}
      <div style={{
        fontFamily: "'Baloo 2', cursive",
        fontWeight: 900, fontSize: '3rem',
        color: '#4f46e5', marginBottom: 8,
        textShadow: '2px 2px 0 rgba(79,70,229,.15)',
      }}>
        {num}
      </div>
      {/* Word cards (like textbook) */}
      <div style={{ display: 'flex', gap: 6, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 10 }}>
        {display.split(' ').map((word, i) => (
          <div key={i} style={{
            background: '#fef3c7', border: '2px solid #f59e0b',
            borderRadius: 10, padding: '6px 14px',
            fontFamily: "'Baloo 2', cursive",
            fontWeight: 800, fontSize: '1rem', color: '#92400e',
          }}>
            {word}
          </div>
        ))}
      </div>
      {/* Letter boxes */}
      <LetterBoxes word={name} color="#4f46e5" bgColor="#eef2ff" textColor="#3730a3" />
      <div style={{ marginTop: 8, fontSize: '.8rem', color: '#64748b', fontWeight: 600 }}>
        Count the boxes! 👆
      </div>
    </div>
  );
};

const QUESTION_POOL = [
  // Q1 — 43 = FORTY THREE = 10 (PDF exact)
  {
    id: 'nn_q43',
    meta: {
      type: 'mcq', qid: 'nn_q43',
      correct: '10',
      explanation: 'FORTY THREE: F-O-R-T-Y-T-H-R-E-E = 10 letters. Just like Teji\'s roll number in the textbook!',
      correctLabel: '10 letters',
    },
    render: (lp) => (
      <div className="win-qcard">
        <div className="win-qmeta"><span className="win-qbadge">Q</span><span className="win-qtype">Count Letters in Number Name</span></div>
        <p className="win-qtext">How many letters? 🔢</p>
        <NumberCard num={43} />
        <div className="win-opts">
          {[['8','A'],['9','B'],['10','C'],['11','D']].map(([v,l]) => (
            <div key={v} onClick={() => lp.handleMcq('nn_q43', v)} className={`win-opt ${lp.getMcqClass('nn_q43', v)}`}>
              <span className="win-opt-letter">{l}</span>{v}
            </div>
          ))}
        </div>
      </div>
    ),
  },
  // Q2 — 17 = SEVENTEEN = 9 (PDF exact)
  {
    id: 'nn_q17',
    meta: {
      type: 'mcq', qid: 'nn_q17',
      correct: '9',
      explanation: 'SEVENTEEN: S-E-V-E-N-T-E-E-N = 9 letters. Just like Jojo\'s roll number in the textbook!',
      correctLabel: '9 letters',
    },
    render: (lp) => (
      <div className="win-qcard">
        <div className="win-qmeta"><span className="win-qbadge">Q</span><span className="win-qtype">Count Letters in Number Name</span></div>
        <p className="win-qtext">How many letters? 🔢</p>
        <NumberCard num={17} />
        <div className="win-opts">
          {[['7','A'],['8','B'],['9','C'],['10','D']].map(([v,l]) => (
            <div key={v} onClick={() => lp.handleMcq('nn_q17', v)} className={`win-opt ${lp.getMcqClass('nn_q17', v)}`}>
              <span className="win-opt-letter">{l}</span>{v}
            </div>
          ))}
        </div>
      </div>
    ),
  },
  // Q3 — 56 = FIFTY SIX = 8 (PDF exact)
  {
    id: 'nn_q56',
    meta: {
      type: 'mcq', qid: 'nn_q56',
      correct: '8',
      explanation: 'FIFTY SIX: F-I-F-T-Y-S-I-X = 8 letters. That\'s how many letters in Teji and Jojo\'s number!',
      correctLabel: '8 letters',
    },
    render: (lp) => (
      <div className="win-qcard">
        <div className="win-qmeta"><span className="win-qbadge">Q</span><span className="win-qtype">Count Letters in Number Name</span></div>
        <p className="win-qtext">How many letters? 🔢</p>
        <NumberCard num={56} />
        <div className="win-opts">
          {[['7','A'],['8','B'],['9','C'],['10','D']].map(([v,l]) => (
            <div key={v} onClick={() => lp.handleMcq('nn_q56', v)} className={`win-opt ${lp.getMcqClass('nn_q56', v)}`}>
              <span className="win-opt-letter">{l}</span>{v}
            </div>
          ))}
        </div>
      </div>
    ),
  },
  // Q4 — SEVENTY = 7
  {
    id: 'nn_q70',
    meta: {
      type: 'mcq', qid: 'nn_q70',
      correct: '7',
      explanation: 'SEVENTY: S-E-V-E-N-T-Y = 7 letters. Among numbers 63–78, this is the SHORTEST name!',
      correctLabel: '7 letters',
    },
    render: (lp) => (
      <div className="win-qcard">
        <div className="win-qmeta"><span className="win-qbadge">Q</span><span className="win-qtype">Count Letters in Number Name</span></div>
        <p className="win-qtext">How many letters? 🔢</p>
        <NumberCard num={70} />
        <div className="win-opts">
          {[['5','A'],['6','B'],['7','C'],['8','D']].map(([v,l]) => (
            <div key={v} onClick={() => lp.handleMcq('nn_q70', v)} className={`win-opt ${lp.getMcqClass('nn_q70', v)}`}>
              <span className="win-opt-letter">{l}</span>{v}
            </div>
          ))}
        </div>
      </div>
    ),
  },
  // Q5 — Which has 8 letters? (56, 43, 17, 20)
  {
    id: 'nn_q5',
    meta: {
      type: 'mcq', qid: 'nn_q5',
      correct: '56',
      explanation: 'FIFTY-SIX (56) has 8 letters. 43 = FORTY THREE (10), 17 = SEVENTEEN (9), 20 = TWENTY (6).',
      correctLabel: '56',
    },
    render: (lp) => (
      <div className="win-qcard">
        <div className="win-qmeta"><span className="win-qbadge">Q</span><span className="win-qtype">Find the Number</span></div>
        <p className="win-qtext">Which number name has <strong>8 letters</strong>? 🎯</p>
        <div className="win-opts">
          {[['43','A'],['56','B'],['17','C'],['20','D']].map(([v,l]) => (
            <div key={v} onClick={() => lp.handleMcq('nn_q5', v)} className={`win-opt ${lp.getMcqClass('nn_q5', v)}`}>
              <span className="win-opt-letter">{l}</span>{v}
            </div>
          ))}
        </div>
      </div>
    ),
  },
  // Q6 — THIRTEEN = 8
  {
    id: 'nn_q13',
    meta: {
      type: 'mcq', qid: 'nn_q13',
      correct: '8',
      explanation: 'THIRTEEN: T-H-I-R-T-E-E-N = 8 letters.',
      correctLabel: '8 letters',
    },
    render: (lp) => (
      <div className="win-qcard">
        <div className="win-qmeta"><span className="win-qbadge">Q</span><span className="win-qtype">Count Letters</span></div>
        <p className="win-qtext">How many letters? 🔢</p>
        <NumberCard num={13} />
        <div className="win-opts">
          {[['7','A'],['8','B'],['9','C'],['10','D']].map(([v,l]) => (
            <div key={v} onClick={() => lp.handleMcq('nn_q13', v)} className={`win-opt ${lp.getMcqClass('nn_q13', v)}`}>
              <span className="win-opt-letter">{l}</span>{v}
            </div>
          ))}
        </div>
      </div>
    ),
  },
  // Q7 — TF: FIFTY-SIX and FORTY-TWO have same count (both 8)
  {
    id: 'nn_q7_tf',
    meta: {
      type: 'tf', qid: 'nn_q7_tf',
      correct: true,
      explanation: 'FIFTY-SIX = F-I-F-T-Y-S-I-X = 8. FORTY-TWO = F-O-R-T-Y-T-W-O = 8. They both have 8 letters!',
      correctLabel: 'True',
    },
    render: (lp) => (
      <div className="win-qcard">
        <div className="win-qmeta"><span className="win-qbadge">Q</span><span className="win-qtype">True / False</span></div>
        <p className="win-qtext"><strong>FIFTY SIX</strong> and <strong>FORTY TWO</strong> have the same number of letters.</p>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', margin: '12px 0' }}>
          {[{ num: 56, word: 'fiftysix', display: 'FIFTY SIX' }, { num: 42, word: 'fortytwo', display: 'FORTY TWO' }].map(({ num, word, display }) => (
            <div key={num} style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: "'Baloo 2',cursive", fontWeight: 900, fontSize: '2rem', color: '#4f46e5', marginBottom: 6 }}>{num}</div>
              <div style={{ background: '#fef3c7', border: '2px solid #f59e0b', borderRadius: 8, padding: '4px 12px', fontWeight: 800, fontSize: '.9rem', color: '#92400e', marginBottom: 8 }}>{display}</div>
              <LetterBoxes word={word} color="#4f46e5" bgColor="#eef2ff" textColor="#3730a3" />
            </div>
          ))}
        </div>
        <div className="win-tfopts">
          <button onClick={() => lp.handleTf('nn_q7_tf', true)} className={`win-tfbtn win-t ${lp.getTfClass('nn_q7_tf', true)}`}>✅ True</button>
          <button onClick={() => lp.handleTf('nn_q7_tf', false)} className={`win-tfbtn win-f ${lp.getTfClass('nn_q7_tf', false)}`}>❌ False</button>
        </div>
      </div>
    ),
  },
  // Q8 — FORTY has 5 letters
  {
    id: 'nn_q8',
    meta: {
      type: 'mcq', qid: 'nn_q8',
      correct: '5',
      explanation: 'FORTY: F-O-R-T-Y = 5 letters.',
      correctLabel: '5 letters',
    },
    render: (lp) => (
      <div className="win-qcard">
        <div className="win-qmeta"><span className="win-qbadge">Q</span><span className="win-qtype">Count Letters</span></div>
        <p className="win-qtext">How many letters in <strong>FORTY</strong>? 🔢</p>
        <div style={{ textAlign: 'center', margin: '14px 0' }}>
          <div style={{ background: '#fef3c7', border: '2px solid #f59e0b', borderRadius: 12, padding: '12px 24px', display: 'inline-block', fontFamily: "'Baloo 2',cursive", fontWeight: 800, fontSize: '1.4rem', color: '#92400e', marginBottom: 10 }}>FORTY</div>
          <br />
          <LetterBoxes word="forty" color="#4f46e5" bgColor="#eef2ff" textColor="#3730a3" />
        </div>
        <div className="win-opts">
          {[['3','A'],['4','B'],['5','C'],['6','D']].map(([v,l]) => (
            <div key={v} onClick={() => lp.handleMcq('nn_q8', v)} className={`win-opt ${lp.getMcqClass('nn_q8', v)}`}>
              <span className="win-opt-letter">{l}</span>{v}
            </div>
          ))}
        </div>
      </div>
    ),
  },
];

const NumberNamesLetterCount = () => {
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
      skillId="WIN-06"
      skillName="Number Names & Letter Count"
      questions={questions}
      questionMeta={questionMeta}
      logicProps={logicProps}
    />
  );
};

export default NumberNamesLetterCount;
