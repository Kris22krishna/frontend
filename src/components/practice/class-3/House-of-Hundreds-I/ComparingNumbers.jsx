import React, { useRef } from 'react';
import { useHOHLogic } from './useHOHLogic';
import HOHPracticeTemplate from './HOHPracticeTemplate';
import { HOHOption, HOHTFButtons, AchievementBadge, StoryBox, HOHMatchLayout, shuffle } from './HOHSharedComponents';
import './house-of-hundreds.css';

// NCERT Maths Mela Class 3 — Chapter 6 (pp. 83–84)
// Topic: Comparing Numbers — >, <, =; smallest/greatest; ascending/descending order

const MATCH_ANSWERS = {
  cn_match1: { 'cn_m1': '>', 'cn_m2': '<', 'cn_m3': '>' },
};

// Comparison visual component
const CompareDisplay = ({ a, b }) => (
  <div className="hoh-compare-wrap">
    <div className="hoh-compare-num">{a}</div>
    <div className="hoh-compare-symbol" style={{ color: '#94a3b8' }}>?</div>
    <div className="hoh-compare-num">{b}</div>
  </div>
);

const QUESTION_POOL = [
  {
    id: 'cn_q1',
    options: [['487 > 423','487 > 423 (487 is greater)'],['487 < 423','487 < 423 (423 is greater)'],['487 = 423','487 = 423 (equal)'],['Cannot compare','Cannot compare']],
    meta: { type: 'mcq', qid: 'cn_q1', correct: '487 > 423', correctLabel: '487 > 423',
      explanation: '487 vs 423: same hundreds (4). Compare tens: 8 tens vs 2 tens. 8 > 2, so 487 > 423. The crocodile mouth opens toward 487!' },
    render: (lp, ctx) => (
      <div className="hoh-qcard">
        <AchievementBadge icon="🐊" label="COMPARE!" color="#3b82f6" />
        <StoryBox emoji="🐊" text="The number crocodile always opens its mouth toward the bigger number!" />
        <p className="hoh-qtext">Compare 487 and 423. Which is correct?</p>
        <CompareDisplay a={487} b={423} />
        <div className="hoh-opts">
          {ctx.shuffledOpts.map(([v, d], i) => (
            <HOHOption key={v} value={v} displayText={d} letterIdx={i} onClick={() => lp.handleMcq('cn_q1', v)} className={lp.getMcqClass('cn_q1', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'cn_q2',
    options: [['209 < 290','209 < 290 (290 is greater)'],['209 > 290','209 > 290 (209 is greater)'],['209 = 290','209 = 290 (equal)'],['Cannot compare','Cannot compare']],
    meta: { type: 'mcq', qid: 'cn_q2', correct: '209 < 290', correctLabel: '209 < 290',
      explanation: '209 vs 290: same hundreds (2). Compare tens: 0 tens vs 9 tens. 0 < 9, so 209 < 290. Even though the digits are the same, the order matters!' },
    render: (lp, ctx) => (
      <div className="hoh-qcard">
        <AchievementBadge icon="🐊" label="TRICKY COMPARE!" color="#ef4444" />
        <StoryBox emoji="🐊" text="Watch out — these numbers use the same digits but in different places!" />
        <p className="hoh-qtext">Compare 209 and 290. Which is correct?</p>
        <CompareDisplay a={209} b={290} />
        <div className="hoh-opts">
          {ctx.shuffledOpts.map(([v, d], i) => (
            <HOHOption key={v} value={v} displayText={d} letterIdx={i} onClick={() => lp.handleMcq('cn_q2', v)} className={lp.getMcqClass('cn_q2', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'cn_q3',
    options: [['321 > 231','321 is greater than 231'],['321 < 231','231 is greater than 321'],['321 = 231','They are equal'],['231 > 321','231 is greater']],
    meta: { type: 'mcq', qid: 'cn_q3', correct: '321 > 231', correctLabel: '321 > 231',
      explanation: '321 vs 231: Compare hundreds first: 3 hundreds vs 2 hundreds. 3 > 2, so 321 > 231. We only need to compare hundreds!' },
    render: (lp, ctx) => (
      <div className="hoh-qcard">
        <AchievementBadge icon="🐊" label="HUNDREDS FIRST!" color="#22c55e" />
        <p className="hoh-qtext">Compare 321 and 231. Which statement is correct?</p>
        <CompareDisplay a={321} b={231} />
        <div className="hoh-opts">
          {ctx.shuffledOpts.map(([v, d], i) => (
            <HOHOption key={v} value={v} displayText={d} letterIdx={i} onClick={() => lp.handleMcq('cn_q3', v)} className={lp.getMcqClass('cn_q3', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'cn_q4',
    options: [['199 < 201','199 is less than 201'],['199 > 201','199 is greater than 201'],['199 = 201','They are equal'],['201 < 199','201 is less']],
    meta: { type: 'mcq', qid: 'cn_q4', correct: '199 < 201', correctLabel: '199 < 201',
      explanation: '199 vs 201: Compare hundreds: 1 vs 2. 1 < 2, so 199 < 201. Even though 199 has 9s everywhere, it is still less than 201 because 1 hundred < 2 hundreds!' },
    render: (lp, ctx) => (
      <div className="hoh-qcard">
        <AchievementBadge icon="🐊" label="TRICKY NINES!" color="#f59e0b" />
        <StoryBox emoji="🐊" text="Nines can look big but the hundreds place decides!" />
        <p className="hoh-qtext">Compare 199 and 201. Which is correct?</p>
        <CompareDisplay a={199} b={201} />
        <div className="hoh-opts">
          {ctx.shuffledOpts.map(([v, d], i) => (
            <HOHOption key={v} value={v} displayText={d} letterIdx={i} onClick={() => lp.handleMcq('cn_q4', v)} className={lp.getMcqClass('cn_q4', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'cn_q5',
    options: [['231','231 (smallest)'],['312','312'],['321','321'],['123','123 (smallest)']],
    meta: { type: 'mcq', qid: 'cn_q5', correct: '123', correctLabel: '123 (smallest)',
      explanation: 'Compare hundreds: 1, 2, 3. Smallest hundreds digit = 1, so 123 is the smallest. Then 231, then 312, then 321.' },
    render: (lp, ctx) => (
      <div className="hoh-qcard">
        <AchievementBadge icon="⬇️" label="SMALLEST NUMBER!" color="#8b5cf6" />
        <p className="hoh-qtext">Which is the smallest: 231, 312, 321, 123?</p>
        <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap', margin: '12px 0' }}>
          {[231,312,321,123].map(n => (
            <div key={n} style={{ background: '#eff6ff', border: '2px solid #bfdbfe', borderRadius: 10, padding: '8px 14px', fontFamily: "'Baloo 2',cursive", fontWeight: 800, color: '#1e40af', fontSize: '1.1rem' }}>{n}</div>
          ))}
        </div>
        <div className="hoh-opts">
          {ctx.shuffledOpts.map(([v, d], i) => (
            <HOHOption key={v} value={v} displayText={d} letterIdx={i} onClick={() => lp.handleMcq('cn_q5', v)} className={lp.getMcqClass('cn_q5', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'cn_q6',
    options: [['421','421 (greatest)'],['214','214'],['142','142'],['412','412']],
    meta: { type: 'mcq', qid: 'cn_q6', correct: '421', correctLabel: '421 (greatest)',
      explanation: 'All four numbers use digits 1, 2, 4. Greatest hundreds = 4. Among 412 and 421: compare tens — 421 has 2 tens vs 412 has 1 ten. 2 > 1 so 421 > 412. Greatest is 421.' },
    render: (lp, ctx) => (
      <div className="hoh-qcard">
        <AchievementBadge icon="⬆️" label="GREATEST NUMBER!" color="#14b8a6" />
        <p className="hoh-qtext">Which is the greatest: 214, 142, 412, 421?</p>
        <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap', margin: '12px 0' }}>
          {[214,142,412,421].map(n => (
            <div key={n} style={{ background: '#eff6ff', border: '2px solid #bfdbfe', borderRadius: 10, padding: '8px 14px', fontFamily: "'Baloo 2',cursive", fontWeight: 800, color: '#1e40af', fontSize: '1.1rem' }}>{n}</div>
          ))}
        </div>
        <div className="hoh-opts">
          {ctx.shuffledOpts.map(([v, d], i) => (
            <HOHOption key={v} value={v} displayText={d} letterIdx={i} onClick={() => lp.handleMcq('cn_q6', v)} className={lp.getMcqClass('cn_q6', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'cn_q7',
    options: [['285 > 275','285 is greater than 275'],['285 < 275','275 is greater than 285'],['285 = 275','They are equal'],['Cannot compare','Cannot compare']],
    meta: { type: 'mcq', qid: 'cn_q7', correct: '285 > 275', correctLabel: '285 > 275',
      explanation: '285 vs 275: Same hundreds (2). Compare tens: 8 tens vs 7 tens. 8 > 7, so 285 > 275!' },
    render: (lp, ctx) => (
      <div className="hoh-qcard">
        <AchievementBadge icon="🐊" label="TENS DECIDE!" color="#3b82f6" />
        <p className="hoh-qtext">Compare 285 and 275.</p>
        <CompareDisplay a={285} b={275} />
        <div className="hoh-opts">
          {ctx.shuffledOpts.map(([v, d], i) => (
            <HOHOption key={v} value={v} displayText={d} letterIdx={i} onClick={() => lp.handleMcq('cn_q7', v)} className={lp.getMcqClass('cn_q7', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'cn_q8',
    options: [['142, 214, 412, 421','Ascending: 142, 214, 412, 421'],['421, 412, 214, 142','Descending'],['214, 142, 421, 412','Random'],['412, 421, 142, 214','Random']],
    meta: { type: 'mcq', qid: 'cn_q8', correct: '142, 214, 412, 421', correctLabel: 'Ascending: 142 → 214 → 412 → 421',
      explanation: 'Ascending (smallest to largest): 142 < 214 < 412 < 421. Compare hundreds first: 1, 2, 4, 4. For the two 4s, compare tens: 1 < 2, so 412 < 421.' },
    render: (lp, ctx) => (
      <div className="hoh-qcard">
        <AchievementBadge icon="📈" label="ASCENDING ORDER!" color="#22c55e" />
        <p className="hoh-qtext">Arrange 214, 142, 412, 421 in ascending order (smallest to largest):</p>
        <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap', margin: '12px 0' }}>
          {[214,142,412,421].map(n => (
            <div key={n} style={{ background: '#eff6ff', border: '2px solid #bfdbfe', borderRadius: 10, padding: '8px 14px', fontFamily: "'Baloo 2',cursive", fontWeight: 800, color: '#1e40af', fontSize: '1.1rem' }}>{n}</div>
          ))}
        </div>
        <div className="hoh-opts">
          {ctx.shuffledOpts.map(([v, d], i) => (
            <HOHOption key={v} value={v} displayText={d} letterIdx={i} onClick={() => lp.handleMcq('cn_q8', v)} className={lp.getMcqClass('cn_q8', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'cn_q9',
    meta: { type: 'tf', qid: 'cn_q9_tf', correct: true, correctLabel: 'True',
      explanation: 'Yes! To compare 3-digit numbers, always start with the hundreds digit. If hundreds are equal, move to tens. If tens are equal, compare ones. Hundreds always come first!' },
    render: (lp) => (
      <div className="hoh-qcard">
        <AchievementBadge icon="🎯" label="TRUE OR FALSE?" color="#7c3aed" />
        <p className="hoh-qtext">When comparing two 3-digit numbers, we always compare the hundreds digits first. True or False?</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, margin: '12px 0', padding: '10px 14px', background: '#eff6ff', borderRadius: 12, border: '2px solid #bfdbfe' }}>
          <div style={{ fontFamily: "'Baloo 2',cursive", fontWeight: 700, color: '#1e40af', fontSize: '0.95rem' }}>Step 1: Compare Hundreds (H)</div>
          <div style={{ fontFamily: "'Baloo 2',cursive", fontWeight: 700, color: '#1e40af', fontSize: '0.95rem' }}>Step 2: If equal → Compare Tens (T)</div>
          <div style={{ fontFamily: "'Baloo 2',cursive", fontWeight: 700, color: '#1e40af', fontSize: '0.95rem' }}>Step 3: If equal → Compare Ones (O)</div>
        </div>
        <HOHTFButtons qid="cn_q9_tf" lp={lp} />
      </div>
    ),
  },
  {
    id: 'cn_q10',
    rightItems: [['>','>'],['<','<'],['>','>']],
    matchAnswers: { cn_match1: { 'cn_m1': '>', 'cn_m2': '<', 'cn_m3': '>' } },
    meta: { type: 'match', totalPairs: 3, explanation: '487>423 (tens 8>2), 209<290 (tens 0<9), 321>231 (hundreds 3>2). Always compare from hundreds first!', correctLabel: 'All matched!' },
    render: (lp, ctx) => (
      <div className="hoh-qcard">
        <AchievementBadge icon="🔗" label="MATCH THE SYMBOL!" color="#3b82f6" />
        <p className="hoh-qtext">Match each comparison with the correct symbol (&gt; or &lt;)!</p>
        <HOHMatchLayout
          matchId="cn_match1"
          leftItems={[
            ['cn_m1', '487 ___ 423'],
            ['cn_m2', '209 ___ 290'],
            ['cn_m3', '321 ___ 231'],
          ]}
          shuffledRight={ctx.shuffledRight}
          lp={lp}
        />
      </div>
    ),
  },
  {
    id: 'cn_q11',
    options: [['421, 412, 214, 142','Descending: 421, 412, 214, 142'],['142, 214, 412, 421','Ascending'],['214, 412, 421, 142','Random'],['412, 421, 142, 214','Random']],
    meta: { type: 'mcq', qid: 'cn_q11', correct: '421, 412, 214, 142', correctLabel: 'Descending: 421 → 412 → 214 → 142',
      explanation: 'Descending (largest to smallest): 421 > 412 > 214 > 142. Compare hundreds: 4, 4, 2, 1. For the two 4s: compare tens — 421 (2 tens) > 412 (1 ten).' },
    render: (lp, ctx) => (
      <div className="hoh-qcard">
        <AchievementBadge icon="📉" label="DESCENDING ORDER!" color="#ef4444" />
        <p className="hoh-qtext">Arrange 214, 142, 412, 421 in descending order (largest to smallest):</p>
        <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap', margin: '12px 0' }}>
          {[214,142,412,421].map(n => (
            <div key={n} style={{ background: '#eff6ff', border: '2px solid #bfdbfe', borderRadius: 10, padding: '8px 14px', fontFamily: "'Baloo 2',cursive", fontWeight: 800, color: '#1e40af', fontSize: '1.1rem' }}>{n}</div>
          ))}
        </div>
        <div className="hoh-opts">
          {ctx.shuffledOpts.map(([v, d], i) => (
            <HOHOption key={v} value={v} displayText={d} letterIdx={i} onClick={() => lp.handleMcq('cn_q11', v)} className={lp.getMcqClass('cn_q11', v)} />
          ))}
        </div>
      </div>
    ),
  },
];

const ComparingNumbers = () => {
  const selRef = useRef(null);
  if (!selRef.current) {
    selRef.current = shuffle([...QUESTION_POOL]).slice(0, 5).map(q => ({
      ...q,
      ...(q.options    && { shuffledOpts:  shuffle([...q.options]) }),
      ...(q.rightItems && { shuffledRight: shuffle([...q.rightItems]) }),
    }));
  }
  const selected = selRef.current;
  const matchAnswers = {};
  selected.forEach(q => { if (q.matchAnswers) Object.assign(matchAnswers, q.matchAnswers); });
  const logicProps = useHOHLogic(matchAnswers);
  const questions = selected.map(q => <React.Fragment key={q.id}>{q.render(logicProps, q)}</React.Fragment>);
  const questionMeta = selected.map(q => q.meta);
  return <HOHPracticeTemplate skillId="HOH-11" skillName="Comparing Numbers" questions={questions} questionMeta={questionMeta} logicProps={logicProps} />;
};

export default ComparingNumbers;
