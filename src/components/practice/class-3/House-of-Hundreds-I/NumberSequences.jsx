import React, { useRef } from 'react';
import { useHOHLogic } from './useHOHLogic';
import HOHPracticeTemplate from './HOHPracticeTemplate';
import { HOHOption, HOHTFButtons, AchievementBadge, TileSequence, StoryBox, shuffle } from './HOHSharedComponents';
import './house-of-hundreds.css';

// NCERT Maths Mela Class 3 — Chapter 6 (p. 66)
// Topic: Number Sequences and Missing Numbers — Jojo's tiled path, fill missing tiles

const QUESTION_POOL = [
  {
    id: 'ns_q1',
    options: [['213','213'],['215','215'],['217','217'],['214','214']],
    meta: { type: 'mcq', qid: 'ns_q1', correct: '213', correctLabel: '213',
      explanation: '211, 212, 213, 214, 215 — each tile increases by 1. After 212 comes 213!' },
    render: (lp, ctx) => (
      <div className="hoh-qcard">
        <AchievementBadge icon="🪨" label="JOJO'S TILES" color="#3b82f6" />
        <StoryBox emoji="🚶" text="Jojo is jumping on a tiled path inside the mela. What number goes in the blank tile?" />
        <p className="hoh-qtext">211, 212, ___, 214, 215, 216 — what is the missing number?</p>
        <TileSequence items={[211, 212, '?', 214, 215, 216]} />
        <div className="hoh-opts">
          {ctx.shuffledOpts.map(([v, d], i) => (
            <HOHOption key={v} value={v} displayText={d} letterIdx={i} onClick={() => lp.handleMcq('ns_q1', v)} className={lp.getMcqClass('ns_q1', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'ns_q2',
    options: [['296','296'],['297','297'],['298','298'],['299','299']],
    meta: { type: 'mcq', qid: 'ns_q2', correct: '296', correctLabel: '296',
      explanation: '294, 295, 296, 297 — the sequence goes up by 1 each time. After 295 comes 296!' },
    render: (lp, ctx) => (
      <div className="hoh-qcard">
        <AchievementBadge icon="🪨" label="FILL THE TILE!" color="#22c55e" />
        <p className="hoh-qtext">294, 295, ___, 297 — what number fills the blank tile?</p>
        <TileSequence items={[294, 295, '?', 297]} />
        <div className="hoh-opts">
          {ctx.shuffledOpts.map(([v, d], i) => (
            <HOHOption key={v} value={v} displayText={d} letterIdx={i} onClick={() => lp.handleMcq('ns_q2', v)} className={lp.getMcqClass('ns_q2', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'ns_q3',
    options: [['303','303'],['304','304'],['305','305'],['306','306']],
    meta: { type: 'mcq', qid: 'ns_q3', correct: '303', correctLabel: '303',
      explanation: '302, 303, 304 — count by 1s. After 302 comes 303. Counting continues smoothly past 300!' },
    render: (lp, ctx) => (
      <div className="hoh-qcard">
        <AchievementBadge icon="🔢" label="CROSSING 300!" color="#ef4444" />
        <p className="hoh-qtext">302, ___, 304, 305 — what number is missing?</p>
        <TileSequence items={[302, '?', 304, 305]} />
        <div className="hoh-opts">
          {ctx.shuffledOpts.map(([v, d], i) => (
            <HOHOption key={v} value={v} displayText={d} letterIdx={i} onClick={() => lp.handleMcq('ns_q3', v)} className={lp.getMcqClass('ns_q3', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'ns_q4',
    options: [['228','228'],['229','229'],['230','230'],['231','231']],
    meta: { type: 'mcq', qid: 'ns_q4', correct: '229', correctLabel: '229',
      explanation: 'The arrows show counting going right (increasing). 227, 228, 229, 230 — each step adds 1. Missing tile is 229!' },
    render: (lp, ctx) => (
      <div className="hoh-qcard">
        <AchievementBadge icon="➡️" label="COUNT FORWARD" color="#f59e0b" />
        <p className="hoh-qtext">227, 228, ___, 230 — find the missing number!</p>
        <TileSequence items={[227, 228, '?', 230]} />
        <div className="hoh-opts">
          {ctx.shuffledOpts.map(([v, d], i) => (
            <HOHOption key={v} value={v} displayText={d} letterIdx={i} onClick={() => lp.handleMcq('ns_q4', v)} className={lp.getMcqClass('ns_q4', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'ns_q5',
    options: [['233','233'],['231','231'],['232','232'],['234','234']],
    meta: { type: 'mcq', qid: 'ns_q5', correct: '233', correctLabel: '233',
      explanation: '230, 231, 232, 233, 234 — counting by 1. The tile before 234 is 233!' },
    render: (lp, ctx) => (
      <div className="hoh-qcard">
        <AchievementBadge icon="🔢" label="WHAT COMES BEFORE?" color="#8b5cf6" />
        <p className="hoh-qtext">230, 231, 232, ___, 234 — which number fits?</p>
        <TileSequence items={[230, 231, 232, '?', 234]} />
        <div className="hoh-opts">
          {ctx.shuffledOpts.map(([v, d], i) => (
            <HOHOption key={v} value={v} displayText={d} letterIdx={i} onClick={() => lp.handleMcq('ns_q5', v)} className={lp.getMcqClass('ns_q5', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'ns_q6',
    options: [['385','385'],['383','383'],['384','384'],['386','386']],
    meta: { type: 'mcq', qid: 'ns_q6', correct: '384', correctLabel: '384',
      explanation: '382, 383, 384, 385 — add 1 each time. After 383 comes 384. Numbers keep the same pattern even in the 300s!' },
    render: (lp, ctx) => (
      <div className="hoh-qcard">
        <AchievementBadge icon="⬅️" label="BACKWARD PATH" color="#14b8a6" />
        <p className="hoh-qtext">382, 383, ___, 385 — what number is missing?</p>
        <TileSequence items={[382, 383, '?', 385]} />
        <div className="hoh-opts">
          {ctx.shuffledOpts.map(([v, d], i) => (
            <HOHOption key={v} value={v} displayText={d} letterIdx={i} onClick={() => lp.handleMcq('ns_q6', v)} className={lp.getMcqClass('ns_q6', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'ns_q7',
    options: [['388','388'],['387','387'],['389','389'],['386','386']],
    meta: { type: 'mcq', qid: 'ns_q7', correct: '388', correctLabel: '388',
      explanation: '387, 388, 389, 390 — counting in 1s. After 387 comes 388!' },
    render: (lp, ctx) => (
      <div className="hoh-qcard">
        <AchievementBadge icon="🔢" label="NUMBER PATH" color="#ef4444" />
        <p className="hoh-qtext">387, ___, 389, 390 — what number fills the blank?</p>
        <TileSequence items={[387, '?', 389, 390]} />
        <div className="hoh-opts">
          {ctx.shuffledOpts.map(([v, d], i) => (
            <HOHOption key={v} value={v} displayText={d} letterIdx={i} onClick={() => lp.handleMcq('ns_q7', v)} className={lp.getMcqClass('ns_q7', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'ns_q8',
    meta: { type: 'tf', qid: 'ns_q8_tf', correct: true, correctLabel: 'True',
      explanation: 'Yes! After 299 comes 300. The numbers count forward without stopping: 297, 298, 299, 300, 301…' },
    render: (lp) => (
      <div className="hoh-qcard">
        <AchievementBadge icon="🎯" label="TRUE OR FALSE?" color="#7c3aed" />
        <p className="hoh-qtext">The number that comes right after 299 is 300. True or False?</p>
        <TileSequence items={[298, 299, '?']} />
        <HOHTFButtons qid="ns_q8_tf" lp={lp} />
      </div>
    ),
  },
  {
    id: 'ns_q9',
    options: [['306','306'],['307','307'],['308','308'],['309','309']],
    meta: { type: 'mcq', qid: 'ns_q9', correct: '307', correctLabel: '307',
      explanation: '302, 303, … counting by 1. We jump from 302 to 310. The 5th tile after 302 is 307.' },
    render: (lp, ctx) => (
      <div className="hoh-qcard">
        <AchievementBadge icon="🪨" label="SKIP AND FIND!" color="#3b82f6" />
        <p className="hoh-qtext">302, 303, 304, 305, 306, ___, 308, 309, 310 — what is missing?</p>
        <TileSequence items={[302, 303, 304, 305, 306, '?', 308]} />
        <div className="hoh-opts">
          {ctx.shuffledOpts.map(([v, d], i) => (
            <HOHOption key={v} value={v} displayText={d} letterIdx={i} onClick={() => lp.handleMcq('ns_q9', v)} className={lp.getMcqClass('ns_q9', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'ns_q10',
    meta: { type: 'tf', qid: 'ns_q10_tf', correct: false, correctLabel: 'False',
      explanation: 'No! After 215 comes 216, not 217. Each number increases by exactly 1: 214, 215, 216, 217...' },
    render: (lp) => (
      <div className="hoh-qcard">
        <AchievementBadge icon="🎯" label="TRUE OR FALSE?" color="#7c3aed" />
        <p className="hoh-qtext">The number that comes right after 215 is 217. True or False?</p>
        <TileSequence items={[214, 215, '?', 217]} />
        <HOHTFButtons qid="ns_q10_tf" lp={lp} />
      </div>
    ),
  },
  {
    id: 'ns_q11',
    options: [['Counting in 1s','Counting in 1s (each tile +1)'],['Counting in 10s','Counting in 10s (each tile +10)'],['Counting in 100s','Counting in 100s (each tile +100)'],['Random','No pattern']],
    meta: { type: 'mcq', qid: 'ns_q11', correct: 'Counting in 1s', correctLabel: 'Counting in 1s',
      explanation: 'In the tiled path — 211, 212, 213, 214, 215, 216 — each tile increases by exactly 1. This is counting in 1s!' },
    render: (lp, ctx) => (
      <div className="hoh-qcard">
        <AchievementBadge icon="🧩" label="SPOT THE PATTERN!" color="#22c55e" />
        <p className="hoh-qtext">211, 212, 213, 214, 215, 216 — what pattern do you see in these tiles?</p>
        <TileSequence items={[211, 212, 213, 214, 215, 216]} />
        <div className="hoh-opts">
          {ctx.shuffledOpts.map(([v, d], i) => (
            <HOHOption key={v} value={v} displayText={d} letterIdx={i} onClick={() => lp.handleMcq('ns_q11', v)} className={lp.getMcqClass('ns_q11', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'ns_q12',
    options: [['Groups of 10','Counting in groups of 10'],['Guessing','Guessing randomly'],['One by one','Counting one by one without groups'],['Skip counting by 2','Counting by 2s']],
    meta: { type: 'mcq', qid: 'ns_q12', correct: 'Groups of 10', correctLabel: 'Counting in groups of 10',
      explanation: 'Counting in groups of 10 is the fastest way to count large numbers correctly — 10, 20, 30 … This is how Teji counted the bangles!' },
    render: (lp, ctx) => (
      <div className="hoh-qcard">
        <AchievementBadge icon="💡" label="SMART COUNTING!" color="#f59e0b" />
        <StoryBox emoji="💍" text="There are many bangles. Teji counts: 10, 20, 30, 40, … all the way to 280!" />
        <p className="hoh-qtext">What is the fastest way to count large numbers correctly?</p>
        <div className="hoh-opts">
          {ctx.shuffledOpts.map(([v, d], i) => (
            <HOHOption key={v} value={v} displayText={d} letterIdx={i} onClick={() => lp.handleMcq('ns_q12', v)} className={lp.getMcqClass('ns_q12', v)} />
          ))}
        </div>
      </div>
    ),
  },
];

const NumberSequences = () => {
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
  return <HOHPracticeTemplate skillId="HOH-02" skillName="Number Sequences & Missing Numbers" questions={questions} questionMeta={questionMeta} logicProps={logicProps} />;
};

export default NumberSequences;
