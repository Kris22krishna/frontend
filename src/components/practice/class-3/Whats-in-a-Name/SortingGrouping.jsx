import React, { useRef } from 'react';
import { useWINLogic } from './useWINLogic';
import WINPracticeTemplate from './WINPracticeTemplate';
import { shuffle } from './WINSharedComponents';
import './whats-in-a-name.css';

// Object card for grouping drag-like interaction
const ObjCard = ({ emoji, name, selected, correct, wrong, onClick }) => {
  let border = '#e2e8f0', bg = '#fff', shadow = 'none';
  if (correct) { border = '#16a34a'; bg = '#dcfce7'; }
  else if (wrong) { border = '#dc2626'; bg = '#fee2e2'; }
  else if (selected) { border = '#3a86ff'; bg = '#dbeafe'; shadow = '0 0 0 3px rgba(58,134,255,.2)'; }

  return (
    <div
      onClick={onClick}
      style={{
        background: bg, border: `2.5px solid ${border}`,
        borderRadius: 14, padding: '12px 10px',
        textAlign: 'center', cursor: onClick ? 'pointer' : 'default',
        transition: 'all .15s', minWidth: 74,
        boxShadow: shadow,
      }}
    >
      <div style={{ fontSize: '2.4rem', marginBottom: 4 }}>{emoji}</div>
      <div style={{ fontSize: '.74rem', fontWeight: 700, color: '#374151' }}>{name}</div>
    </div>
  );
};

// Two-column visual for correct grouping (shown in explanation)
const GroupDisplay = ({ g1Label, g1Items, g2Label, g2Items }) => (
  <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap', marginTop: 12 }}>
    {[{ label: g1Label, items: g1Items, color: '#16a34a', bg: '#f0fdf4' },
      { label: g2Label, items: g2Items, color: '#dc2626', bg: '#fff1f2' }].map(({ label, items, color, bg }) => (
      <div key={label} style={{ background: bg, border: `2px dashed ${color}`, borderRadius: 14, padding: '10px 14px', flex: 1, minWidth: 140 }}>
        <div style={{ fontWeight: 800, fontSize: '.8rem', color, marginBottom: 8 }}>{label}</div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {items.map(([e, n]) => (
            <div key={n} style={{ textAlign: 'center', minWidth: 44 }}>
              <div style={{ fontSize: '1.6rem' }}>{e}</div>
              <div style={{ fontSize: '.65rem', fontWeight: 700, color: '#4b5563' }}>{n}</div>
            </div>
          ))}
        </div>
      </div>
    ))}
  </div>
);

// PDF page 6-7: Teji groups living/non-living animals vs objects
// PDF page 7: Jojo groups by electricity usage
// Exact objects from PDF p.7: TV, Chair, Lamp, Bed, Clock, Fan, Pillow, Blanket

const ELECTRICITY_OBJECTS = [
  { id: 'tv',      emoji: '📺', name: 'TV',      needsElec: true },
  { id: 'chair',   emoji: '🪑', name: 'Chair',   needsElec: false },
  { id: 'lamp',    emoji: '💡', name: 'Lamp',    needsElec: true },
  { id: 'bed',     emoji: '🛏️', name: 'Bed',     needsElec: false },
  { id: 'clock',   emoji: '🕐', name: 'Clock',   needsElec: true },
  { id: 'fan',     emoji: '🌀', name: 'Fan',     needsElec: true },
  { id: 'pillow',  emoji: '🛋️', name: 'Pillow',  needsElec: false },
  { id: 'blanket', emoji: '🛌', name: 'Blanket', needsElec: false },
];

// Teji's picture cards from PDF p.6
const LIVING_OBJECTS = [
  { id: 'bird',  emoji: '🐦', name: 'Bird',  eats: true },
  { id: 'fish',  emoji: '🐟', name: 'Fish',  eats: true },
  { id: 'fly',   emoji: '🪰', name: 'Fly',   eats: true },
  { id: 'mouse', emoji: '🐭', name: 'Mouse', eats: true },
  { id: 'plane', emoji: '✈️', name: 'Plane', eats: false },
  { id: 'drone', emoji: '🚁', name: 'Drone', eats: false },
  { id: 'phone', emoji: '📱', name: 'Phone', eats: false },
  { id: 'book',  emoji: '📖', name: 'Book',  eats: false },
  { id: 'kite',  emoji: '🪁', name: 'Kite',  eats: false },
  { id: 'bulb',  emoji: '💡', name: 'Bulb',  eats: false },
];

const QUESTION_POOL = [
  // Q1 — PDF p.7: electricity grouping — which needs electricity?
  {
    id: 'sg_q1',
    meta: {
      type: 'mcq', qid: 'sg_q1',
      correct: 'fan',
      explanation: 'TV, Lamp, Fan, and Clock all need electricity. Chair, Bed, Pillow, and Blanket do NOT need electricity.',
      correctLabel: 'Fan',
    },
    render: (lp) => (
      <div className="win-qcard">
        <div className="win-qmeta"><span className="win-qbadge">Q</span><span className="win-qtype">Electricity Groups</span></div>
        <p className="win-qtext">Which needs <strong>electricity</strong>? ⚡</p>
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap', margin: '14px 0' }}>
          {[
            { id: 'chair', emoji: '🪑', name: 'Chair' },
            { id: 'fan',   emoji: '🌀', name: 'Fan' },
            { id: 'pillow',emoji: '🛋️', name: 'Pillow' },
            { id: 'blanket',emoji:'🛌', name: 'Blanket' },
          ].map(obj => (
            <ObjCard
              key={obj.id} emoji={obj.emoji} name={obj.name}
              selected={lp.getMcqClass('sg_q1', obj.id).includes('selected')}
              correct={lp.getMcqClass('sg_q1', obj.id).includes('correct')}
              wrong={lp.getMcqClass('sg_q1', obj.id).includes('wrong')}
              onClick={() => lp.handleMcq('sg_q1', obj.id)}
            />
          ))}
        </div>
      </div>
    ),
  },
  // Q2 — PDF p.7: which does NOT need electricity?
  {
    id: 'sg_q2',
    meta: {
      type: 'mcq', qid: 'sg_q2',
      correct: 'bed',
      explanation: 'Bed does NOT need electricity. TV, Clock, and Lamp all need electricity to work.',
      correctLabel: 'Bed',
    },
    render: (lp) => (
      <div className="win-qcard">
        <div className="win-qmeta"><span className="win-qbadge">Q</span><span className="win-qtype">Electricity Groups</span></div>
        <p className="win-qtext">Which does <strong>NOT</strong> need electricity? 🚫⚡</p>
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap', margin: '14px 0' }}>
          {[
            { id: 'tv',    emoji: '📺', name: 'TV' },
            { id: 'clock', emoji: '🕐', name: 'Clock' },
            { id: 'bed',   emoji: '🛏️', name: 'Bed' },
            { id: 'lamp',  emoji: '💡', name: 'Lamp' },
          ].map(obj => (
            <ObjCard
              key={obj.id} emoji={obj.emoji} name={obj.name}
              selected={lp.getMcqClass('sg_q2', obj.id).includes('selected')}
              correct={lp.getMcqClass('sg_q2', obj.id).includes('correct')}
              wrong={lp.getMcqClass('sg_q2', obj.id).includes('wrong')}
              onClick={() => lp.handleMcq('sg_q2', obj.id)}
            />
          ))}
        </div>
      </div>
    ),
  },
  // Q3 — match objects to electricity group
  {
    id: 'sg_q3',
    matchAnswers: {
      sg_match3: {
        'sg_tv':      'Needs Electricity',
        'sg_pillow':  "Doesn't Need",
        'sg_fan':     'Needs Electricity',
        'sg_blanket': "Doesn't Need",
      }
    },
    rightItems: [['Needs Electricity','Needs Electricity'],["Doesn't Need","Doesn't Need"]],
    meta: {
      type: 'match', totalPairs: 4,
      explanation: 'TV and Fan need electricity. Pillow and Blanket do NOT need electricity.',
      correctLabel: 'All 4 matched!',
    },
    render: (lp, ctx) => (
      <div className="win-qcard">
        <div className="win-qmeta"><span className="win-qbadge">Q</span><span className="win-qtype">Match the Group</span></div>
        <p className="win-qtext">Match each object to its group! ⚡</p>
        <div className="win-match-wrap">
          <div className="win-match-col">
            {[['sg_tv','📺 TV'],['sg_pillow','🛋️ Pillow'],['sg_fan','🌀 Fan'],['sg_blanket','🛌 Blanket']].map(([val, label]) => (
              <div key={val} onClick={() => lp.handleMatch('sg_match3','left',val)} className={`win-match-item ${lp.getMatchClass('sg_match3','left',val)}`}>{label}</div>
            ))}
          </div>
          <div className="win-match-center">{[0,1,2,3].map(i=><div key={i} className="win-match-line">→</div>)}</div>
          <div className="win-match-col">
            {ctx.shuffledRight.map(([val,label])=>(
              <div key={val} onClick={()=>lp.handleMatch('sg_match3','right',val)} className={`win-match-item ${lp.getMatchClass('sg_match3','right',val)}`}>{label}</div>
            ))}
          </div>
        </div>
      </div>
    ),
  },
  // Q4 — PDF p.6: living / non-living (eats food or not)
  {
    id: 'sg_q4',
    meta: {
      type: 'mcq', qid: 'sg_q4',
      correct: 'fish',
      explanation: 'Fish is a living thing — it eats food! A plane, kite, and phone are objects that do NOT eat food.',
      correctLabel: 'Fish 🐟',
    },
    render: (lp) => (
      <div className="win-qcard">
        <div className="win-qmeta"><span className="win-qbadge">Q</span><span className="win-qtype">Living or Not?</span></div>
        <p className="win-qtext">Which one <strong>eats food</strong>? 🍎</p>
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap', margin: '14px 0' }}>
          {[
            { id: 'plane', emoji: '✈️', name: 'Plane' },
            { id: 'kite',  emoji: '🪁', name: 'Kite' },
            { id: 'fish',  emoji: '🐟', name: 'Fish' },
            { id: 'phone', emoji: '📱', name: 'Phone' },
          ].map(obj => (
            <ObjCard
              key={obj.id} emoji={obj.emoji} name={obj.name}
              selected={lp.getMcqClass('sg_q4', obj.id).includes('selected')}
              correct={lp.getMcqClass('sg_q4', obj.id).includes('correct')}
              wrong={lp.getMcqClass('sg_q4', obj.id).includes('wrong')}
              onClick={() => lp.handleMcq('sg_q4', obj.id)}
            />
          ))}
        </div>
      </div>
    ),
  },
  // Q5 — TF: Chair and Pillow are in the same "no electricity" group
  {
    id: 'sg_q5',
    meta: {
      type: 'tf', qid: 'sg_q5_tf',
      correct: true,
      explanation: 'True! Neither a Chair nor a Pillow needs electricity. They both belong to the "does not need electricity" group.',
      correctLabel: 'True',
    },
    render: (lp) => (
      <div className="win-qcard">
        <div className="win-qmeta"><span className="win-qbadge">Q</span><span className="win-qtype">True / False</span></div>
        <p className="win-qtext">🪑 Chair and 🛋️ Pillow belong in the <strong>same group</strong> (no electricity).</p>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', margin: '14px 0' }}>
          <ObjCard emoji="🪑" name="Chair" />
          <ObjCard emoji="🛋️" name="Pillow" />
        </div>
        <div className="win-tfopts">
          <button onClick={() => lp.handleTf('sg_q5_tf', true)} className={`win-tfbtn win-t ${lp.getTfClass('sg_q5_tf', true)}`}>✅ True</button>
          <button onClick={() => lp.handleTf('sg_q5_tf', false)} className={`win-tfbtn win-f ${lp.getTfClass('sg_q5_tf', false)}`}>❌ False</button>
        </div>
      </div>
    ),
  },
  // Q6 — How many from TV,Lamp,Clock,Fan,Chair,Bed,Pillow,Blanket need electricity?
  {
    id: 'sg_q6',
    meta: {
      type: 'mcq', qid: 'sg_q6',
      correct: '4',
      explanation: 'TV, Lamp, Clock, Fan — these 4 need electricity. Chair, Bed, Pillow, Blanket do NOT.',
      correctLabel: '4',
    },
    render: (lp) => (
      <div className="win-qcard">
        <div className="win-qmeta"><span className="win-qbadge">Q</span><span className="win-qtype">Count the Group</span></div>
        <p className="win-qtext">From these objects — how many need <strong>electricity</strong>? ⚡</p>
        <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap', margin: '12px 0' }}>
          {ELECTRICITY_OBJECTS.map(o => (
            <div key={o.id} style={{ textAlign: 'center', minWidth: 52 }}>
              <div style={{ fontSize: '2rem' }}>{o.emoji}</div>
              <div style={{ fontSize: '.65rem', fontWeight: 700, color: '#4b5563' }}>{o.name}</div>
            </div>
          ))}
        </div>
        <div className="win-opts">
          {[['3','A'],['4','B'],['5','C'],['6','D']].map(([v,l]) => (
            <div key={v} onClick={() => lp.handleMcq('sg_q6', v)} className={`win-opt ${lp.getMcqClass('sg_q6', v)}`}>
              <span className="win-opt-letter">{l}</span>{v}
            </div>
          ))}
        </div>
      </div>
    ),
  },
  // Q7 — Odd one out: Bird, Mouse, Fly, Phone (phone is non-living)
  {
    id: 'sg_q7',
    meta: {
      type: 'mcq', qid: 'sg_q7',
      correct: 'phone',
      explanation: 'Bird, Mouse, and Fly are living things that eat food. Phone is an object — it does NOT eat food. Phone is the odd one out!',
      correctLabel: 'Phone 📱',
    },
    render: (lp) => (
      <div className="win-qcard">
        <div className="win-qmeta"><span className="win-qbadge">Q</span><span className="win-qtype">Odd One Out</span></div>
        <p className="win-qtext">Which one does <strong>NOT</strong> eat food? 🤔</p>
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap', margin: '14px 0' }}>
          {[
            { id: 'bird',  emoji: '🐦', name: 'Bird' },
            { id: 'mouse', emoji: '🐭', name: 'Mouse' },
            { id: 'fly',   emoji: '🪰', name: 'Fly' },
            { id: 'phone', emoji: '📱', name: 'Phone' },
          ].map(obj => (
            <ObjCard
              key={obj.id} emoji={obj.emoji} name={obj.name}
              selected={lp.getMcqClass('sg_q7', obj.id).includes('selected')}
              correct={lp.getMcqClass('sg_q7', obj.id).includes('correct')}
              wrong={lp.getMcqClass('sg_q7', obj.id).includes('wrong')}
              onClick={() => lp.handleMcq('sg_q7', obj.id)}
            />
          ))}
        </div>
      </div>
    ),
  },
  // Q8 — TF: TV and Fan are in the same electricity group
  {
    id: 'sg_q8',
    meta: {
      type: 'tf', qid: 'sg_q8_tf',
      correct: true,
      explanation: 'True! Both TV and Fan need electricity to work. They belong to the same "Needs Electricity" group.',
      correctLabel: 'True',
    },
    render: (lp) => (
      <div className="win-qcard">
        <div className="win-qmeta"><span className="win-qbadge">Q</span><span className="win-qtype">True / False</span></div>
        <p className="win-qtext">📺 TV and 🌀 Fan are in the <strong>same group</strong> — both need electricity.</p>
        <div style={{ display: 'flex', gap: 20, justifyContent: 'center', margin: '14px 0' }}>
          <ObjCard emoji="📺" name="TV" />
          <ObjCard emoji="🌀" name="Fan" />
        </div>
        <div className="win-tfopts">
          <button onClick={() => lp.handleTf('sg_q8_tf', true)} className={`win-tfbtn win-t ${lp.getTfClass('sg_q8_tf', true)}`}>✅ True</button>
          <button onClick={() => lp.handleTf('sg_q8_tf', false)} className={`win-tfbtn win-f ${lp.getTfClass('sg_q8_tf', false)}`}>❌ False</button>
        </div>
      </div>
    ),
  },
];

const SortingGrouping = () => {
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
      skillId="WIN-08"
      skillName="Sorting and Grouping"
      questions={questions}
      questionMeta={questionMeta}
      logicProps={logicProps}
    />
  );
};

export default SortingGrouping;
