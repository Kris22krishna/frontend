import React, { useRef } from 'react';
import { useHOHLogic } from './useHOHLogic';
import HOHPracticeTemplate from './HOHPracticeTemplate';
import { HOHOption, HOHTFButtons, AchievementBadge, TileSequence, StoryBox, shuffle } from './HOHSharedComponents';
import './house-of-hundreds.css';

// NCERT Maths Mela Class 3 — Chapter 6 (pp. 81–82)
// Topic: Number Hunt Games — numbers 200–300 with digit 5, chain number game (216 → ten more → 226)

const QUESTION_POOL = [
  {
    id: 'nhg_q1',
    options: [['8','8 numbers'],['9','9 numbers'],['10','10 numbers'],['11','11 numbers']],
    meta: { type: 'mcq', qid: 'nhg_q1', correct: '10', correctLabel: '10 numbers',
      explanation: 'Numbers between 200 and 300 with digit 5: 205, 215, 225, 235, 245, 255, 265, 275, 285, 295. That is 10 numbers total! (Every tens group has one number ending in 5.)' },
    render: (lp, ctx) => (
      <div className="hoh-qcard">
        <AchievementBadge icon="🔍" label="NUMBER HUNT!" color="#3b82f6" />
        <StoryBox emoji="🔍" text="Jojo and Teji play Number Hunt — find all numbers between 200 and 300 that have the digit 5!" />
        <p className="hoh-qtext">How many numbers between 200 and 300 contain the digit 5?</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, justifyContent: 'center', margin: '12px 0' }}>
          {[205,215,225,235,245,255,265,275,285,295].map(n => (
            <div key={n} style={{ background: 'linear-gradient(135deg,#eff6ff,#dbeafe)', border: '2px solid #93c5fd', borderRadius: 8, padding: '4px 10px', fontFamily: "'Baloo 2',cursive", fontWeight: 800, color: '#1e40af', fontSize: '0.9rem' }}>{n}</div>
          ))}
        </div>
        <div className="hoh-opts">
          {ctx.shuffledOpts.map(([v, d], i) => (
            <HOHOption key={v} value={v} displayText={d} letterIdx={i} onClick={() => lp.handleMcq('nhg_q1', v)} className={lp.getMcqClass('nhg_q1', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'nhg_q2',
    options: [['226','226'],['216','216'],['236','236'],['227','227']],
    meta: { type: 'mcq', qid: 'nhg_q2', correct: '226', correctLabel: '226',
      explanation: '216 + 10 = 226. Ten more means adding 10. The tens digit increases: 1 → 2. So 216 becomes 226!' },
    render: (lp, ctx) => (
      <div className="hoh-qcard">
        <AchievementBadge icon="⛓️" label="CHAIN GAME!" color="#22c55e" />
        <StoryBox emoji="⛓️" text="Play the chain number game — start with 216 and add ten more each step!" />
        <p className="hoh-qtext">216 → ten more → ?</p>
        <TileSequence items={[216, '+10', '?']} />
        <div className="hoh-opts">
          {ctx.shuffledOpts.map(([v, d], i) => (
            <HOHOption key={v} value={v} displayText={d} letterIdx={i} onClick={() => lp.handleMcq('nhg_q2', v)} className={lp.getMcqClass('nhg_q2', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'nhg_q3',
    options: [['236','236'],['246','246'],['226','226'],['237','237']],
    meta: { type: 'mcq', qid: 'nhg_q3', correct: '236', correctLabel: '236',
      explanation: '226 + 10 = 236. Continuing the chain: 216 → 226 → 236. Each step adds 10. The tens digit goes 1 → 2 → 3.' },
    render: (lp, ctx) => (
      <div className="hoh-qcard">
        <AchievementBadge icon="⛓️" label="CHAIN STEP 2!" color="#22c55e" />
        <p className="hoh-qtext">216 → 226 → ten more → ?</p>
        <TileSequence items={[216, 226, '+10', '?']} />
        <div className="hoh-opts">
          {ctx.shuffledOpts.map(([v, d], i) => (
            <HOHOption key={v} value={v} displayText={d} letterIdx={i} onClick={() => lp.handleMcq('nhg_q3', v)} className={lp.getMcqClass('nhg_q3', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'nhg_q4',
    options: [['275','275'],['265','265'],['255','255'],['285','285']],
    meta: { type: 'mcq', qid: 'nhg_q4', correct: '275', correctLabel: '275',
      explanation: '265 is in our Number Hunt list (has digit 5 in ones). 265 + 10 = 275. Tens digit: 6 → 7. The ones digit stays 5!' },
    render: (lp, ctx) => (
      <div className="hoh-qcard">
        <AchievementBadge icon="🔍" label="HUNT + CHAIN!" color="#f59e0b" />
        <p className="hoh-qtext">265 is a Number Hunt target (has digit 5). What is ten more than 265?</p>
        <TileSequence items={[265, '+10', '?']} />
        <div className="hoh-opts">
          {ctx.shuffledOpts.map(([v, d], i) => (
            <HOHOption key={v} value={v} displayText={d} letterIdx={i} onClick={() => lp.handleMcq('nhg_q4', v)} className={lp.getMcqClass('nhg_q4', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'nhg_q5',
    options: [['255','255'],['245','245'],['235','235'],['265','265']],
    meta: { type: 'mcq', qid: 'nhg_q5', correct: '255', correctLabel: '255',
      explanation: 'Ten less than 265 = 265 − 10 = 255. The tens digit decreases: 6 → 5. 255 is also a Number Hunt target (has digit 5)!' },
    render: (lp, ctx) => (
      <div className="hoh-qcard">
        <AchievementBadge icon="⬇️" label="TEN LESS!" color="#ef4444" />
        <p className="hoh-qtext">265 → ten less → ?</p>
        <TileSequence items={[265, '−10', '?']} />
        <div className="hoh-opts">
          {ctx.shuffledOpts.map(([v, d], i) => (
            <HOHOption key={v} value={v} displayText={d} letterIdx={i} onClick={() => lp.handleMcq('nhg_q5', v)} className={lp.getMcqClass('nhg_q5', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'nhg_q6',
    options: [['205','205'],['250','250'],['502','502'],['025','25']],
    meta: { type: 'mcq', qid: 'nhg_q6', correct: '205', correctLabel: '205',
      explanation: 'The first number between 200 and 300 containing the digit 5 is 205 (2 hundreds, 0 tens, 5 ones). 201, 202, 203, 204, then 205!' },
    render: (lp, ctx) => (
      <div className="hoh-qcard">
        <AchievementBadge icon="🔍" label="FIRST HUNT!" color="#7c3aed" />
        <StoryBox emoji="🔍" text="In the Number Hunt between 200 and 300, find the FIRST number with digit 5." />
        <p className="hoh-qtext">What is the smallest number between 200 and 300 that contains the digit 5?</p>
        <div className="hoh-opts">
          {ctx.shuffledOpts.map(([v, d], i) => (
            <HOHOption key={v} value={v} displayText={d} letterIdx={i} onClick={() => lp.handleMcq('nhg_q6', v)} className={lp.getMcqClass('nhg_q6', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'nhg_q7',
    meta: { type: 'tf', qid: 'nhg_q7_tf', correct: true, correctLabel: 'True',
      explanation: 'Yes! In the chain game starting at 216, adding 10 each step: 216, 226, 236, 246, 256, 266, 276, 286, 296. The ones digit always stays 6 throughout the chain!' },
    render: (lp) => (
      <div className="hoh-qcard">
        <AchievementBadge icon="🎯" label="TRUE OR FALSE?" color="#7c3aed" />
        <p className="hoh-qtext">In the chain game starting at 216 (adding 10 each time), the ones digit always stays 6. True or False?</p>
        <TileSequence items={[216, 226, 236, 246, 256]} />
        <HOHTFButtons qid="nhg_q7_tf" lp={lp} />
      </div>
    ),
  },
  {
    id: 'nhg_q8',
    options: [['295','295'],['290','290'],['300','300'],['285','285']],
    meta: { type: 'mcq', qid: 'nhg_q8', correct: '295', correctLabel: '295',
      explanation: 'The last Number Hunt target (digit 5) before 300 is 295. After that comes 296, 297, 298, 299, 300 — none with digit 5 in the hundreds group.' },
    render: (lp, ctx) => (
      <div className="hoh-qcard">
        <AchievementBadge icon="🔍" label="LAST HUNT!" color="#3b82f6" />
        <p className="hoh-qtext">What is the LARGEST number between 200 and 300 that contains the digit 5?</p>
        <div className="hoh-opts">
          {ctx.shuffledOpts.map(([v, d], i) => (
            <HOHOption key={v} value={v} displayText={d} letterIdx={i} onClick={() => lp.handleMcq('nhg_q8', v)} className={lp.getMcqClass('nhg_q8', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'nhg_q9',
    options: [['316','316'],['306','306'],['326','326'],['317','317']],
    meta: { type: 'mcq', qid: 'nhg_q9', correct: '316', correctLabel: '316',
      explanation: 'Chain: 296 + 10 = 306, 306 + 10 = 316. After 296, the chain crosses into the 300s! 296 → 306 → 316.' },
    render: (lp, ctx) => (
      <div className="hoh-qcard">
        <AchievementBadge icon="⛓️" label="CROSS 300!" color="#ef4444" />
        <StoryBox emoji="⛓️" text="The chain game crosses into the 300s!" />
        <p className="hoh-qtext">Chain: 296 → ten more → 306 → ten more → ?</p>
        <TileSequence items={[296, 306, '+10', '?']} />
        <div className="hoh-opts">
          {ctx.shuffledOpts.map(([v, d], i) => (
            <HOHOption key={v} value={v} displayText={d} letterIdx={i} onClick={() => lp.handleMcq('nhg_q9', v)} className={lp.getMcqClass('nhg_q9', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'nhg_q10',
    meta: { type: 'tf', qid: 'nhg_q10_tf', correct: false, correctLabel: 'False',
      explanation: 'No! 253 does NOT contain the digit 5 in the ones place — it has 3 ones. But wait, 253 DOES have digit 5 in the TENS place. So yes, 253 contains the digit 5! The statement says 253 does not contain digit 5, which is False.' },
    render: (lp) => (
      <div className="hoh-qcard">
        <AchievementBadge icon="🎯" label="TRUE OR FALSE?" color="#7c3aed" />
        <p className="hoh-qtext">253 does NOT contain the digit 5. True or False?</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 4, margin: '12px 0' }}>
          {['2','5','3'].map((d, i) => (
            <div key={i} style={{ width: 44, height: 52, display: 'flex', alignItems: 'center', justifyContent: 'center', background: d === '5' ? 'linear-gradient(135deg,#dcfce7,#86efac)' : '#f8fafc', border: `2.5px solid ${d === '5' ? '#22c55e' : '#e2e8f0'}`, borderRadius: 10, fontFamily: "'Baloo 2',cursive", fontWeight: 900, fontSize: '1.5rem', color: d === '5' ? '#166534' : '#334155' }}>{d}</div>
          ))}
        </div>
        <HOHTFButtons qid="nhg_q10_tf" lp={lp} />
      </div>
    ),
  },
  {
    id: 'nhg_q11',
    options: [['10','10 numbers'],['9','9 numbers'],['5','5 numbers'],['20','20 numbers']],
    meta: { type: 'mcq', qid: 'nhg_q11', correct: '10', correctLabel: '10 numbers',
      explanation: 'Numbers between 300 and 400 with digit 5 in ones place: 305, 315, 325, 335, 345, 355, 365, 375, 385, 395. That is 10 numbers!' },
    render: (lp, ctx) => (
      <div className="hoh-qcard">
        <AchievementBadge icon="🔍" label="HUNT IN 300s!" color="#14b8a6" />
        <StoryBox emoji="🔍" text="Now hunt for numbers between 300 and 400 with digit 5 in the ones place!" />
        <p className="hoh-qtext">How many numbers between 300 and 400 have 5 in the ones place?</p>
        <div className="hoh-opts">
          {ctx.shuffledOpts.map(([v, d], i) => (
            <HOHOption key={v} value={v} displayText={d} letterIdx={i} onClick={() => lp.handleMcq('nhg_q11', v)} className={lp.getMcqClass('nhg_q11', v)} />
          ))}
        </div>
      </div>
    ),
  },
];

const NumberHuntGames = () => {
  const selRef = useRef(null);
  if (!selRef.current) {
    selRef.current = shuffle([...QUESTION_POOL]).slice(0, 5).map(q => ({
      ...q,
      ...(q.options && { shuffledOpts: shuffle([...q.options]) }),
    }));
  }
  const selected = selRef.current;
  const logicProps = useHOHLogic();
  const questions = selected.map(q => <React.Fragment key={q.id}>{q.render(logicProps, q)}</React.Fragment>);
  const questionMeta = selected.map(q => q.meta);
  return <HOHPracticeTemplate skillId="HOH-10" skillName="Number Hunt Games" questions={questions} questionMeta={questionMeta} logicProps={logicProps} />;
};

export default NumberHuntGames;
