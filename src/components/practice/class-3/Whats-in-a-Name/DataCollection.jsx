import React, { useRef } from 'react';
import { useWINLogic } from './useWINLogic';
import WINPracticeTemplate from './WINPracticeTemplate';
import { TallyMarkSVG, shuffle } from './WINSharedComponents';
import './whats-in-a-name.css';

// Hair style icons (from PDF p.8 — 6 hair styles shown in a table)
const HAIR_STYLES = [
  { id: 'ponytail',  emoji: '👧', label: 'Ponytail',   count: 6 },
  { id: 'braid',     emoji: '👩', label: 'Braid',      count: 4 },
  { id: 'short',     emoji: '🧒', label: 'Short Hair', count: 7 },
  { id: 'open',      emoji: '👩‍🦰', label: 'Open Hair', count: 5 },
  { id: 'twobraid',  emoji: '👧🏽', label: 'Two Braids', count: 3 },
  { id: 'bun',       emoji: '👩‍🦱', label: 'Bun',       count: 2 },
];

// Visual data table (like the PDF p.8 table)
const HairTable = ({ highlight = null }) => (
  <div style={{ overflowX: 'auto', margin: '14px 0' }}>
    <table style={{
      borderCollapse: 'collapse', width: '100%', minWidth: 280,
      fontFamily: "'Nunito', sans-serif",
    }}>
      <thead>
        <tr style={{ background: '#f0fdfa' }}>
          <th style={{ border: '2px solid #99f6e4', padding: '8px 12px', fontWeight: 800, color: '#0f766e', fontSize: '.8rem' }}>Hair Style</th>
          {HAIR_STYLES.map(s => (
            <th key={s.id} style={{
              border: '2px solid #99f6e4', padding: '8px 6px',
              fontWeight: 800, color: s.id === highlight ? '#4f46e5' : '#0f766e',
              fontSize: '1.2rem', background: s.id === highlight ? '#eef2ff' : '',
            }}>
              {s.emoji}
            </th>
          ))}
        </tr>
        <tr style={{ background: '#f0fdfa' }}>
          <th style={{ border: '2px solid #99f6e4', padding: '4px 12px', fontWeight: 700, color: '#0f766e', fontSize: '.75rem' }}>Style</th>
          {HAIR_STYLES.map(s => (
            <th key={s.id} style={{ border: '2px solid #99f6e4', padding: '4px 6px', fontWeight: 600, color: '#374151', fontSize: '.72rem' }}>{s.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style={{ border: '2px solid #99f6e4', padding: '8px 12px', fontWeight: 700, color: '#374151', fontSize: '.8rem' }}>Number of Children</td>
          {HAIR_STYLES.map(s => (
            <td key={s.id} style={{
              border: '2px solid #99f6e4', padding: '8px 6px',
              textAlign: 'center', fontFamily: "'Baloo 2', cursive",
              fontWeight: 800, fontSize: '1.1rem',
              color: s.id === highlight ? '#4f46e5' : '#1a1a2e',
              background: s.id === highlight ? '#eef2ff' : '',
            }}>
              {s.count}
            </td>
          ))}
        </tr>
      </tbody>
    </table>
  </div>
);

// Tally version of table (used in PDF and some questions)
const TallyRow = ({ style }) => (
  <div style={{ display: 'flex', gap: 10, alignItems: 'center', background: '#fefce8', border: '2px solid #fde047', borderRadius: 10, padding: '10px 14px', marginBottom: 6 }}>
    <div style={{ fontSize: '1.6rem' }}>{style.emoji}</div>
    <div style={{ flex: 1 }}>
      <div style={{ fontWeight: 700, fontSize: '.8rem', color: '#374151', marginBottom: 4 }}>{style.label}</div>
      <TallyMarkSVG count={style.count} color="#2d1508" scale={0.8} />
    </div>
    <div style={{ fontFamily: "'Baloo 2',cursive", fontWeight: 800, fontSize: '1.1rem', color: '#92400e' }}>= {style.count}</div>
  </div>
);

const QUESTION_POOL = [
  // Q1 — most popular hair style
  {
    id: 'dc_q1',
    meta: {
      type: 'mcq', qid: 'dc_q1',
      correct: 'short',
      explanation: 'Short Hair has 7 children — the highest count in the table. So it is the most popular hairstyle!',
      correctLabel: 'Short Hair (7)',
    },
    render: (lp) => (
      <div className="win-qcard">
        <div className="win-qmeta"><span className="win-qbadge">Q</span><span className="win-qtype">Data Table</span></div>
        <p className="win-qtext">Which hair style is most popular? 👆</p>
        <HairTable highlight="short" />
        <div className="win-opts">
          {[['ponytail','A'],['braid','B'],['short','C'],['open','D']].map(([v,l]) => (
            <div key={v} onClick={() => lp.handleMcq('dc_q1', v)} className={`win-opt ${lp.getMcqClass('dc_q1', v)}`}>
              <span className="win-opt-letter">{l}</span>{HAIR_STYLES.find(s=>s.id===v)?.emoji} {HAIR_STYLES.find(s=>s.id===v)?.label}
            </div>
          ))}
        </div>
      </div>
    ),
  },
  // Q2 — how many children have ponytails
  {
    id: 'dc_q2',
    meta: {
      type: 'mcq', qid: 'dc_q2',
      correct: '6',
      explanation: 'From the table, Ponytail has 6 children.',
      correctLabel: '6',
    },
    render: (lp) => (
      <div className="win-qcard">
        <div className="win-qmeta"><span className="win-qbadge">Q</span><span className="win-qtype">Read the Table</span></div>
        <p className="win-qtext">How many children have <strong>ponytails</strong>? 👧</p>
        <HairTable highlight="ponytail" />
        <div className="win-opts">
          {[['4','A'],['5','B'],['6','C'],['7','D']].map(([v,l]) => (
            <div key={v} onClick={() => lp.handleMcq('dc_q2', v)} className={`win-opt ${lp.getMcqClass('dc_q2', v)}`}>
              <span className="win-opt-letter">{l}</span>{v}
            </div>
          ))}
        </div>
      </div>
    ),
  },
  // Q3 — difference: short hair - braid
  {
    id: 'dc_q3',
    meta: {
      type: 'mcq', qid: 'dc_q3',
      correct: '3',
      explanation: 'Short Hair = 7, Braid = 4. 7 – 4 = 3 more children have short hair.',
      correctLabel: '3 more',
    },
    render: (lp) => (
      <div className="win-qcard">
        <div className="win-qmeta"><span className="win-qbadge">Q</span><span className="win-qtype">Compare Data</span></div>
        <p className="win-qtext">How many <strong>more</strong> children have Short Hair than Braids? ✂️</p>
        <HairTable />
        <div className="win-opts">
          {[['1','A'],['2','B'],['3','C'],['4','D']].map(([v,l]) => (
            <div key={v} onClick={() => lp.handleMcq('dc_q3', v)} className={`win-opt ${lp.getMcqClass('dc_q3', v)}`}>
              <span className="win-opt-letter">{l}</span>{v}
            </div>
          ))}
        </div>
      </div>
    ),
  },
  // Q4 — tally for 6 children (ponytail)
  {
    id: 'dc_q4',
    meta: {
      type: 'mcq', qid: 'dc_q4',
      correct: '6',
      explanation: '1 full crossed group (5) + 1 extra = 6. That matches ponytail = 6 children!',
      correctLabel: '6',
    },
    render: (lp) => (
      <div className="win-qcard">
        <div className="win-qmeta"><span className="win-qbadge">Q</span><span className="win-qtype">Tally Count</span></div>
        <p className="win-qtext">This tally shows how many children? 🧮</p>
        <div style={{ display: 'flex', justifyContent: 'center', margin: '14px 0' }}>
          <div style={{ background: '#fefce8', border: '2px solid #fde047', borderRadius: 12, padding: '14px 20px' }}>
            <TallyMarkSVG count={6} color="#2d1508" />
          </div>
        </div>
        <div className="win-opts">
          {[['5','A'],['6','B'],['7','C'],['8','D']].map(([v,l]) => (
            <div key={v} onClick={() => lp.handleMcq('dc_q4', v)} className={`win-opt ${lp.getMcqClass('dc_q4', v)}`}>
              <span className="win-opt-letter">{l}</span>{v}
            </div>
          ))}
        </div>
      </div>
    ),
  },
  // Q5 — TF: bun has fewest children
  {
    id: 'dc_q5',
    meta: {
      type: 'tf', qid: 'dc_q5_tf',
      correct: true,
      explanation: 'Bun has only 2 children — the smallest number in the table. So it is the least popular.',
      correctLabel: 'True',
    },
    render: (lp) => (
      <div className="win-qcard">
        <div className="win-qmeta"><span className="win-qbadge">Q</span><span className="win-qtype">True / False</span></div>
        <p className="win-qtext"><strong>Bun</strong> is the <strong>least popular</strong> hair style.</p>
        <HairTable highlight="bun" />
        <div className="win-tfopts">
          <button onClick={() => lp.handleTf('dc_q5_tf', true)} className={`win-tfbtn win-t ${lp.getTfClass('dc_q5_tf', true)}`}>✅ True</button>
          <button onClick={() => lp.handleTf('dc_q5_tf', false)} className={`win-tfbtn win-f ${lp.getTfClass('dc_q5_tf', false)}`}>❌ False</button>
        </div>
      </div>
    ),
  },
  // Q6 — total children in class
  {
    id: 'dc_q6',
    meta: {
      type: 'mcq', qid: 'dc_q6',
      correct: '27',
      explanation: '6 + 4 + 7 + 5 + 3 + 2 = 27 total children in the class!',
      correctLabel: '27',
    },
    render: (lp) => (
      <div className="win-qcard">
        <div className="win-qmeta"><span className="win-qbadge">Q</span><span className="win-qtype">Total Count</span></div>
        <p className="win-qtext">How many children are in the class <strong>altogether</strong>? 🏫</p>
        <HairTable />
        <div className="win-opts">
          {[['25','A'],['27','B'],['29','C'],['30','D']].map(([v,l]) => (
            <div key={v} onClick={() => lp.handleMcq('dc_q6', v)} className={`win-opt ${lp.getMcqClass('dc_q6', v)}`}>
              <span className="win-opt-letter">{l}</span>{v}
            </div>
          ))}
        </div>
      </div>
    ),
  },
  // Q7 — tally for 4 children (braid)
  {
    id: 'dc_q7',
    meta: {
      type: 'mcq', qid: 'dc_q7',
      correct: '4',
      explanation: '4 vertical sticks (no crossed group yet) = 4 children with braids.',
      correctLabel: '4',
    },
    render: (lp) => (
      <div className="win-qcard">
        <div className="win-qmeta"><span className="win-qbadge">Q</span><span className="win-qtype">Read the Tally</span></div>
        <p className="win-qtext">How many children have <strong>braids</strong>? 👩</p>
        <div style={{ display: 'flex', justifyContent: 'center', margin: '14px 0' }}>
          <div style={{ background: '#fefce8', border: '2px solid #fde047', borderRadius: 12, padding: '14px 20px' }}>
            <TallyMarkSVG count={4} color="#2d1508" />
          </div>
        </div>
        <div className="win-opts">
          {[['3','A'],['4','B'],['5','C'],['6','D']].map(([v,l]) => (
            <div key={v} onClick={() => lp.handleMcq('dc_q7', v)} className={`win-opt ${lp.getMcqClass('dc_q7', v)}`}>
              <span className="win-opt-letter">{l}</span>{v}
            </div>
          ))}
        </div>
      </div>
    ),
  },
  // Q8 — ponytail + braid combined
  {
    id: 'dc_q8',
    meta: {
      type: 'mcq', qid: 'dc_q8',
      correct: '10',
      explanation: 'Ponytail = 6, Braid = 4. Together: 6 + 4 = 10 children!',
      correctLabel: '10',
    },
    render: (lp) => (
      <div className="win-qcard">
        <div className="win-qmeta"><span className="win-qbadge">Q</span><span className="win-qtype">Add Counts</span></div>
        <p className="win-qtext">Ponytail + Braid children together? 👧👩</p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', margin: '12px 0' }}>
          {[
            { s: HAIR_STYLES[0], color: '#3a86ff' },
            { s: HAIR_STYLES[1], color: '#f72585' },
          ].map(({ s, color }) => (
            <div key={s.id} style={{ background: '#fefce8', border: `2px solid ${color}`, borderRadius: 12, padding: '12px 20px', textAlign: 'center' }}>
              <div style={{ fontSize: '1.8rem', marginBottom: 4 }}>{s.emoji}</div>
              <div style={{ fontWeight: 700, fontSize: '.8rem', color: '#374151', marginBottom: 6 }}>{s.label}</div>
              <TallyMarkSVG count={s.count} color="#2d1508" scale={0.85} />
              <div style={{ fontFamily: "'Baloo 2',cursive", fontWeight: 800, color, marginTop: 4 }}>{s.count}</div>
            </div>
          ))}
        </div>
        <div className="win-opts">
          {[['8','A'],['9','B'],['10','C'],['11','D']].map(([v,l]) => (
            <div key={v} onClick={() => lp.handleMcq('dc_q8', v)} className={`win-opt ${lp.getMcqClass('dc_q8', v)}`}>
              <span className="win-opt-letter">{l}</span>{v}
            </div>
          ))}
        </div>
      </div>
    ),
  },
];

const DataCollection = () => {
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
      skillId="WIN-09"
      skillName="Data Collection and Tables"
      questions={questions}
      questionMeta={questionMeta}
      logicProps={logicProps}
    />
  );
};

export default DataCollection;
