import React, { useRef } from 'react';
import { useHOHLogic } from './useHOHLogic';
import HOHPracticeTemplate from './HOHPracticeTemplate';
import { HOHOption, HOHTFButtons, AchievementBadge, NumberLineDisplay, NumberLineJump, StoryBox, shuffle } from './HOHSharedComponents';
import './house-of-hundreds.css';

// NCERT Maths Mela Class 3 — Chapter 6 (pp. 67, 71)
// Topic: Number Line Understanding — locating numbers, distance, position

const QUESTION_POOL = [
  {
    id: 'nl_q1',
    options: [['Between 200 and 250','Between 200 and 250'],['Between 250 and 300','Between 250 and 300'],['Between 150 and 200','Between 150 and 200'],['At exactly 250','At exactly 250']],
    meta: { type: 'mcq', qid: 'nl_q1', correct: 'Between 200 and 250', correctLabel: 'Between 200 and 250',
      explanation: '235 is between 200 and 250 on the number line. 200 < 235 < 250. It sits closer to 250 than to 200.' },
    render: (lp, ctx) => (
      <div className="hoh-qcard">
        <AchievementBadge icon="📍" label="LOCATE ON NUMBER LINE" color="#3b82f6" />
        <StoryBox emoji="📏" text="235 lies between 200 and 250 on the number line — Teji and Jojo are placing numbers!" />
        <p className="hoh-qtext">On the number line below, where does 235 lie?</p>
        <NumberLineDisplay start={200} end={300} step={50} markers={[{ value: 235, color: '#ef4444', label: '235' }]} height={80} />
        <div className="hoh-opts">
          {ctx.shuffledOpts.map(([v, d], i) => (
            <HOHOption key={v} value={v} displayText={d} letterIdx={i} onClick={() => lp.handleMcq('nl_q1', v)} className={lp.getMcqClass('nl_q1', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'nl_q2',
    options: [['Between 210 and 220','Between 210 and 220'],['Between 200 and 210','Between 200 and 210'],['Between 220 and 230','Between 220 and 230'],['After 260','After 260']],
    meta: { type: 'mcq', qid: 'nl_q2', correct: 'Between 210 and 220', correctLabel: 'Between 210 and 220',
      explanation: '216 is between 210 and 220. On a number line from 200 to 260, 216 sits between the 210 and 220 marks.' },
    render: (lp, ctx) => (
      <div className="hoh-qcard">
        <AchievementBadge icon="📍" label="WHERE IS 216?" color="#22c55e" />
        <p className="hoh-qtext">On this number line (200–260), where does 216 lie?</p>
        <NumberLineDisplay start={200} end={260} step={10} markers={[{ value: 216, color: '#22c55e', label: '216' }]} height={85} />
        <div className="hoh-opts">
          {ctx.shuffledOpts.map(([v, d], i) => (
            <HOHOption key={v} value={v} displayText={d} letterIdx={i} onClick={() => lp.handleMcq('nl_q2', v)} className={lp.getMcqClass('nl_q2', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'nl_q3',
    options: [['13','13 steps'],['3','3 steps'],['30','30 steps'],['103','103 steps']],
    meta: { type: 'mcq', qid: 'nl_q3', correct: '13', correctLabel: '13 steps',
      explanation: '400 − 387 = 13. So 387 is 13 steps away from 400 on the number line.' },
    render: (lp, ctx) => (
      <div className="hoh-qcard">
        <AchievementBadge icon="📏" label="HOW FAR FROM 400?" color="#ef4444" />
        <p className="hoh-qtext">How far is 387 from 400 on the number line?</p>
        <NumberLineJump start={380} end={402} step={2} from={387} to={400} color="#ef4444" />
        <div className="hoh-sentence"><span>400</span><span>−</span><span>387</span><span>=</span><span>?</span></div>
        <div className="hoh-opts">
          {ctx.shuffledOpts.map(([v, d], i) => (
            <HOHOption key={v} value={v} displayText={d} letterIdx={i} onClick={() => lp.handleMcq('nl_q3', v)} className={lp.getMcqClass('nl_q3', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'nl_q4',
    options: [['400','400 is more'],['393','393 is more'],['Equal','They are equal']],
    meta: { type: 'mcq', qid: 'nl_q4', correct: '400', correctLabel: '400 is more',
      explanation: '400 > 393. On the number line, 400 comes after (to the right of) 393. Numbers on the right are always bigger!' },
    render: (lp, ctx) => (
      <div className="hoh-qcard">
        <AchievementBadge icon="⚖️" label="WHICH IS MORE?" color="#8b5cf6" />
        <p className="hoh-qtext">Which is more: 393 or 400? Use the number line to decide.</p>
        <NumberLineDisplay start={390} end={402} step={2} markers={[{ value: 393, color: '#8b5cf6', label: '393' }, { value: 400, color: '#22c55e', label: '400' }]} height={80} />
        <div className="hoh-opts">
          {ctx.shuffledOpts.map(([v, d], i) => (
            <HOHOption key={v} value={v} displayText={d} letterIdx={i} onClick={() => lp.handleMcq('nl_q4', v)} className={lp.getMcqClass('nl_q4', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'nl_q5',
    options: [['Between 240 and 250','Between 240 and 250'],['Between 250 and 260','Between 250 and 260'],['Between 230 and 240','Between 230 and 240'],['Before 200','Before 200']],
    meta: { type: 'mcq', qid: 'nl_q5', correct: 'Between 240 and 250', correctLabel: 'Between 240 and 250',
      explanation: '243 is between 240 and 250. On the number line (200–260), it sits between the 240 and 250 marks.' },
    render: (lp, ctx) => (
      <div className="hoh-qcard">
        <AchievementBadge icon="📍" label="WHERE IS 243?" color="#f59e0b" />
        <p className="hoh-qtext">Locate 243 on the number line from 200 to 260. Where does it lie?</p>
        <NumberLineDisplay start={200} end={260} step={10} markers={[{ value: 243, color: '#f59e0b', label: '243' }]} height={85} />
        <div className="hoh-opts">
          {ctx.shuffledOpts.map(([v, d], i) => (
            <HOHOption key={v} value={v} displayText={d} letterIdx={i} onClick={() => lp.handleMcq('nl_q5', v)} className={lp.getMcqClass('nl_q5', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'nl_q6',
    options: [['Between 250 and 260','Between 250 and 260'],['Between 240 and 250','Between 240 and 250'],['Between 260 and 270','Between 260 and 270'],['At exactly 260','At exactly 260']],
    meta: { type: 'mcq', qid: 'nl_q6', correct: 'Between 250 and 260', correctLabel: 'Between 250 and 260',
      explanation: '257 is between 250 and 260. On a number line, 250 < 257 < 260.' },
    render: (lp, ctx) => (
      <div className="hoh-qcard">
        <AchievementBadge icon="📍" label="LOCATE 257!" color="#14b8a6" />
        <p className="hoh-qtext">Where does 257 lie on the number line from 200 to 260?</p>
        <NumberLineDisplay start={200} end={260} step={10} markers={[{ value: 257, color: '#14b8a6', label: '257' }]} height={85} />
        <div className="hoh-opts">
          {ctx.shuffledOpts.map(([v, d], i) => (
            <HOHOption key={v} value={v} displayText={d} letterIdx={i} onClick={() => lp.handleMcq('nl_q6', v)} className={lp.getMcqClass('nl_q6', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'nl_q7',
    options: [['7','7 jumps'],['17','17 jumps'],['7 and 3','7 and 3 jumps'],['3','3 jumps']],
    meta: { type: 'mcq', qid: 'nl_q7', correct: '7', correctLabel: '7 jumps',
      explanation: '393 + 7 = 400. So it takes 7 jumps of 1 to get from 393 to 400 on the number line.' },
    render: (lp, ctx) => (
      <div className="hoh-qcard">
        <AchievementBadge icon="🦘" label="JUMP TO 400!" color="#ef4444" />
        <p className="hoh-qtext">How many jumps of 1 does it take to get from 393 to 400?</p>
        <NumberLineJump start={391} end={401} step={1} from={393} to={400} color="#ef4444" />
        <div className="hoh-opts">
          {ctx.shuffledOpts.map(([v, d], i) => (
            <HOHOption key={v} value={v} displayText={d} letterIdx={i} onClick={() => lp.handleMcq('nl_q7', v)} className={lp.getMcqClass('nl_q7', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'nl_q8',
    options: [['Between 330 and 340','Between 330 and 340'],['Between 320 and 330','Between 320 and 330'],['Between 340 and 350','Between 340 and 350'],['At exactly 340','At exactly 340']],
    meta: { type: 'mcq', qid: 'nl_q8', correct: 'Between 330 and 340', correctLabel: 'Between 330 and 340',
      explanation: '337 is between 330 and 340. 330 < 337 < 340.' },
    render: (lp, ctx) => (
      <div className="hoh-qcard">
        <AchievementBadge icon="📍" label="LOCATE 337!" color="#3b82f6" />
        <p className="hoh-qtext">On the number line from 320 to 400, where does 337 lie?</p>
        <NumberLineDisplay start={320} end={400} step={10} markers={[{ value: 337, color: '#3b82f6', label: '337' }]} height={85} />
        <div className="hoh-opts">
          {ctx.shuffledOpts.map(([v, d], i) => (
            <HOHOption key={v} value={v} displayText={d} letterIdx={i} onClick={() => lp.handleMcq('nl_q8', v)} className={lp.getMcqClass('nl_q8', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'nl_q9',
    meta: { type: 'tf', qid: 'nl_q9_tf', correct: true, correctLabel: 'True',
      explanation: 'Yes! On the number line, numbers increase as we go right. So 329 < 332 < 337 — they are correctly placed from left to right.' },
    render: (lp) => (
      <div className="hoh-qcard">
        <AchievementBadge icon="🎯" label="TRUE OR FALSE?" color="#7c3aed" />
        <p className="hoh-qtext">On a number line, 329 comes before 332, which comes before 337. True or False?</p>
        <NumberLineDisplay start={320} end={345} step={5} markers={[{ value: 329, color: '#ef4444', label: '329' }, { value: 332, color: '#f59e0b', label: '332' }, { value: 337, color: '#22c55e', label: '337' }]} height={85} />
        <HOHTFButtons qid="nl_q9_tf" lp={lp} />
      </div>
    ),
  },
  {
    id: 'nl_q10',
    meta: { type: 'tf', qid: 'nl_q10_tf', correct: false, correctLabel: 'False',
      explanation: 'No! 387 is 13 steps away from 400, not 3 steps. 400 − 387 = 13.' },
    render: (lp) => (
      <div className="hoh-qcard">
        <AchievementBadge icon="🎯" label="TRUE OR FALSE?" color="#7c3aed" />
        <p className="hoh-qtext">387 is only 3 steps away from 400 on the number line. True or False?</p>
        <NumberLineJump start={380} end={402} step={2} from={387} to={400} color="#ef4444" />
        <HOHTFButtons qid="nl_q10_tf" lp={lp} />
      </div>
    ),
  },
  {
    id: 'nl_q11',
    options: [['375 and 387','375 and 387'],['329 and 332','329 and 332'],['320 and 337','320 and 337'],['332 and 375','332 and 375']],
    meta: { type: 'mcq', qid: 'nl_q11', correct: '375 and 387', correctLabel: '375 and 387',
      explanation: 'Between 370 and 390 on the number line, both 375 and 387 lie in this range. 370 < 375 < 387 < 390.' },
    render: (lp, ctx) => (
      <div className="hoh-qcard">
        <AchievementBadge icon="📍" label="WHICH PAIR?" color="#22c55e" />
        <p className="hoh-qtext">From these numbers — 329, 332, 337, 375, 387 — which two are between 370 and 390?</p>
        <NumberLineDisplay start={320} end={400} step={10} markers={[{ value: 375, color: '#22c55e', label: '375' }, { value: 387, color: '#3b82f6', label: '387' }]} height={85} />
        <div className="hoh-opts">
          {ctx.shuffledOpts.map(([v, d], i) => (
            <HOHOption key={v} value={v} displayText={d} letterIdx={i} onClick={() => lp.handleMcq('nl_q11', v)} className={lp.getMcqClass('nl_q11', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'nl_q12',
    options: [['Right (bigger numbers)','Right — bigger numbers are on the right'],['Left (smaller numbers)','Left — smaller numbers are on the left'],['Centre','Centre of the line'],['Same position','Same position as 300']],
    meta: { type: 'mcq', qid: 'nl_q12', correct: 'Right (bigger numbers)', correctLabel: 'Right — bigger numbers are on the right',
      explanation: 'On a number line, numbers increase as we go right. So 400 (bigger) is to the right of 300.' },
    render: (lp, ctx) => (
      <div className="hoh-qcard">
        <AchievementBadge icon="📏" label="NUMBER LINE RULE" color="#f59e0b" />
        <p className="hoh-qtext">On a number line, where is 400 compared to 300?</p>
        <NumberLineDisplay start={0} end={400} step={100} markers={[{ value: 300, color: '#f59e0b', label: '300' }, { value: 400, color: '#22c55e', label: '400' }]} height={80} />
        <div className="hoh-opts">
          {ctx.shuffledOpts.map(([v, d], i) => (
            <HOHOption key={v} value={v} displayText={d} letterIdx={i} onClick={() => lp.handleMcq('nl_q12', v)} className={lp.getMcqClass('nl_q12', v)} />
          ))}
        </div>
      </div>
    ),
  },
];

const NumberLineSkills = () => {
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
  return <HOHPracticeTemplate skillId="HOH-04" skillName="Number Line Skills" questions={questions} questionMeta={questionMeta} logicProps={logicProps} />;
};

export default NumberLineSkills;
