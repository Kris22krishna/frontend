import React, { useRef } from 'react';
import { useHOHLogic } from './useHOHLogic';
import HOHPracticeTemplate from './HOHPracticeTemplate';
import { HOHOption, HOHTFButtons, AchievementBadge, MatchstickBundles, TileSequence, StoryBox, HOHMatchLayout, shuffle } from './HOHSharedComponents';
import './house-of-hundreds.css';

// NCERT Maths Mela Class 3 — Chapter 6 (pp. 67–68)
// Topic: Representing numbers using matchstick bundles, number sentences, increase/decrease

const MATCH_ANSWERS = {
  nr_match1: { 'nr_m1': '200+35', 'nr_m2': '300+16', 'nr_m3': '100+9' },
};

const QUESTION_POOL = [
  {
    id: 'nr_q1',
    options: [['235','235'],['253','253'],['325','325'],['200','200']],
    meta: { type: 'mcq', qid: 'nr_q1', correct: '235', correctLabel: '235',
      explanation: '2 bundles of 100 = 200, 3 bundles of 10 = 30, 5 loose sticks = 5. So 200 + 30 + 5 = 235!' },
    render: (lp, ctx) => (
      <div className="hoh-qcard">
        <AchievementBadge icon="🔥" label="MATCHSTICK BUNDLES" color="#f59e0b" />
        <StoryBox emoji="🔥" text="Teji and Jojo use matchstick bundles to show numbers. Big bundles = 100, medium bundles = 10, loose sticks = 1." />
        <p className="hoh-qtext">2 bundles of 100, 3 bundles of 10, and 5 loose sticks. What number is this?</p>
        <MatchstickBundles hundreds={2} tens={3} ones={5} />
        <div className="hoh-opts">
          {ctx.shuffledOpts.map(([v, d], i) => (
            <HOHOption key={v} value={v} displayText={d} letterIdx={i} onClick={() => lp.handleMcq('nr_q1', v)} className={lp.getMcqClass('nr_q1', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'nr_q2',
    options: [['200+35','200 and 35 more'],['250-15','250 minus 15'],['200+53','200 and 53 more'],['300-65','300 minus 65']],
    meta: { type: 'mcq', qid: 'nr_q2', correct: '200+35', correctLabel: '200 + 35',
      explanation: '235 = 200 + 35. Two hundreds and 35 more. You can also say 235 = 250 − 15 (15 less than 250).' },
    render: (lp, ctx) => (
      <div className="hoh-qcard">
        <AchievementBadge icon="🔢" label="NUMBER SENTENCE" color="#3b82f6" />
        <p className="hoh-qtext">Which number sentence correctly describes 235?</p>
        <div style={{ display: 'flex', justifyContent: 'center', margin: '12px 0' }}>
          <div className="hoh-num-box">235</div>
        </div>
        <div className="hoh-opts">
          {ctx.shuffledOpts.map(([v, d], i) => (
            <HOHOption key={v} value={v} displayText={d} letterIdx={i} onClick={() => lp.handleMcq('nr_q2', v)} className={lp.getMcqClass('nr_q2', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'nr_q3',
    options: [['316','316'],['300+16=316','316'],['31+6','316'],['300+6','306']],
    meta: { type: 'mcq', qid: 'nr_q3', correct: '316', correctLabel: '316',
      explanation: '300 and 16 more = 300 + 16 = 316. Three hundred and sixteen.' },
    render: (lp, ctx) => (
      <div className="hoh-qcard">
        <AchievementBadge icon="🔥" label="FIND THE NUMBER" color="#22c55e" />
        <p className="hoh-qtext">300 and 16 more = ?</p>
        <div className="hoh-sentence"><span>300</span><span>+</span><span>16</span><span>=</span><span>?</span></div>
        <div className="hoh-opts">
          {ctx.shuffledOpts.map(([v, d], i) => (
            <HOHOption key={v} value={v} displayText={d} letterIdx={i} onClick={() => lp.handleMcq('nr_q3', v)} className={lp.getMcqClass('nr_q3', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'nr_q4',
    options: [['286','286'],['285','285'],['284','284'],['296','296']],
    meta: { type: 'mcq', qid: 'nr_q4', correct: '286', correctLabel: '286',
      explanation: '285 increased by 1 = 285 + 1 = 286. Only the ones digit changes: 5 → 6.' },
    render: (lp, ctx) => (
      <div className="hoh-qcard">
        <AchievementBadge icon="⬆️" label="INCREASE BY 1" color="#22c55e" />
        <StoryBox emoji="🎚️" text="Use the number slider to increase the number by 1!" />
        <p className="hoh-qtext">285 — increase the number by 1. What do you get?</p>
        <TileSequence items={[285, '+1', '='  , '?']} />
        <div className="hoh-opts">
          {ctx.shuffledOpts.map(([v, d], i) => (
            <HOHOption key={v} value={v} displayText={d} letterIdx={i} onClick={() => lp.handleMcq('nr_q4', v)} className={lp.getMcqClass('nr_q4', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'nr_q5',
    options: [['157','157'],['147','147'],['137','137'],['148','148']],
    meta: { type: 'mcq', qid: 'nr_q5', correct: '157', correctLabel: '157',
      explanation: '147 increased by 10 = 147 + 10 = 157. The tens digit increases by 1: 4 → 5. Hundreds and ones stay the same.' },
    render: (lp, ctx) => (
      <div className="hoh-qcard">
        <AchievementBadge icon="⬆️" label="INCREASE BY 10" color="#3b82f6" />
        <StoryBox emoji="🎚️" text="Use the number slider to increase the number by 10!" />
        <p className="hoh-qtext">147 — increase the number by ten. What do you get?</p>
        <TileSequence items={[147, '+10', '=', '?']} />
        <div className="hoh-opts">
          {ctx.shuffledOpts.map(([v, d], i) => (
            <HOHOption key={v} value={v} displayText={d} letterIdx={i} onClick={() => lp.handleMcq('nr_q5', v)} className={lp.getMcqClass('nr_q5', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'nr_q6',
    options: [['365','365'],['367','367'],['369','369'],['375','375']],
    meta: { type: 'mcq', qid: 'nr_q6', correct: '365', correctLabel: '365',
      explanation: '367 decreased by 2 = 367 − 2 = 365. The ones digit decreases by 2: 7 → 5.' },
    render: (lp, ctx) => (
      <div className="hoh-qcard">
        <AchievementBadge icon="⬇️" label="DECREASE BY 2" color="#ef4444" />
        <StoryBox emoji="🎚️" text="Use the number slider to decrease the number by 2!" />
        <p className="hoh-qtext">367 — decrease the number by 2. What do you get?</p>
        <TileSequence items={[367, '−2', '=', '?']} />
        <div className="hoh-opts">
          {ctx.shuffledOpts.map(([v, d], i) => (
            <HOHOption key={v} value={v} displayText={d} letterIdx={i} onClick={() => lp.handleMcq('nr_q6', v)} className={lp.getMcqClass('nr_q6', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'nr_q7',
    options: [['279','279'],['289','289'],['269','269'],['299','299']],
    meta: { type: 'mcq', qid: 'nr_q7', correct: '279', correctLabel: '279',
      explanation: '289 decreased by 10 = 289 − 10 = 279. The tens digit decreases by 1: 8 → 7. Hundreds and ones stay the same.' },
    render: (lp, ctx) => (
      <div className="hoh-qcard">
        <AchievementBadge icon="⬇️" label="DECREASE BY 10" color="#8b5cf6" />
        <StoryBox emoji="🎚️" text="Use the number slider to decrease the number by 10!" />
        <p className="hoh-qtext">289 — decrease the number by 10. What do you get?</p>
        <TileSequence items={[289, '−10', '=', '?']} />
        <div className="hoh-opts">
          {ctx.shuffledOpts.map(([v, d], i) => (
            <HOHOption key={v} value={v} displayText={d} letterIdx={i} onClick={() => lp.handleMcq('nr_q7', v)} className={lp.getMcqClass('nr_q7', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'nr_q8',
    options: [['310','310'],['290','290'],['270','270'],['312','312']],
    meta: { type: 'mcq', qid: 'nr_q8', correct: '310', correctLabel: '310',
      explanation: '290 increased by 20 = 290 + 20 = 310. The tens digit increases by 2: 9 + 2 = 11, so we carry: 290 + 20 = 310.' },
    render: (lp, ctx) => (
      <div className="hoh-qcard">
        <AchievementBadge icon="⬆️" label="INCREASE BY 20!" color="#f59e0b" />
        <StoryBox emoji="🎚️" text="Use the number slider to increase the number by 20!" />
        <p className="hoh-qtext">290 — increase the number by 20. What do you get?</p>
        <TileSequence items={[290, '+20', '=', '?']} />
        <div className="hoh-opts">
          {ctx.shuffledOpts.map(([v, d], i) => (
            <HOHOption key={v} value={v} displayText={d} letterIdx={i} onClick={() => lp.handleMcq('nr_q8', v)} className={lp.getMcqClass('nr_q8', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'nr_q9',
    meta: { type: 'tf', qid: 'nr_q9_tf', correct: true, correctLabel: 'True',
      explanation: 'Yes! 235 = 200 + 35 AND 235 = 250 − 15. Numbers can be expressed in many ways!' },
    render: (lp) => (
      <div className="hoh-qcard">
        <AchievementBadge icon="🎯" label="TRUE OR FALSE?" color="#7c3aed" />
        <p className="hoh-qtext">235 can be written as both (200 + 35) AND (250 − 15). True or False?</p>
        <div className="hoh-sentence"><span>200</span><span>+</span><span>35</span><span>=</span><span>235</span></div>
        <div className="hoh-sentence"><span>250</span><span>−</span><span>15</span><span>=</span><span>235</span></div>
        <HOHTFButtons qid="nr_q9_tf" lp={lp} />
      </div>
    ),
  },
  {
    id: 'nr_q10',
    options: [['109','109'],['19','19'],['190','190'],['910','910']],
    meta: { type: 'mcq', qid: 'nr_q10', correct: '109', correctLabel: '109',
      explanation: '1 bundle of 100 = 100, 0 bundles of 10 = 0, 9 loose sticks = 9. So 100 + 0 + 9 = 109.' },
    render: (lp, ctx) => (
      <div className="hoh-qcard">
        <AchievementBadge icon="🔥" label="READ THE BUNDLES" color="#14b8a6" />
        <p className="hoh-qtext">1 bundle of 100, no bundles of 10, and 9 loose sticks. What number is this?</p>
        <MatchstickBundles hundreds={1} tens={0} ones={9} />
        <div className="hoh-opts">
          {ctx.shuffledOpts.map(([v, d], i) => (
            <HOHOption key={v} value={v} displayText={d} letterIdx={i} onClick={() => lp.handleMcq('nr_q10', v)} className={lp.getMcqClass('nr_q10', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'nr_q11',
    rightItems: [['200+35','200 and 35 more'],['300+16','300 and 16 more'],['100+9','100 and 9 more']],
    matchAnswers: { nr_match1: { 'nr_m1': '200+35', 'nr_m2': '300+16', 'nr_m3': '100+9' } },
    meta: { type: 'match', totalPairs: 3, explanation: '235=200+35, 316=300+16, 109=100+9. All numbers can be broken into hundreds and the rest!', correctLabel: 'All matched!' },
    render: (lp, ctx) => (
      <div className="hoh-qcard">
        <AchievementBadge icon="🔗" label="MATCH IT!" color="#3b82f6" />
        <p className="hoh-qtext">Match each number to its number sentence!</p>
        <HOHMatchLayout
          matchId="nr_match1"
          leftItems={[['nr_m1','235'],['nr_m2','316'],['nr_m3','109']]}
          shuffledRight={ctx.shuffledRight}
          lp={lp}
        />
      </div>
    ),
  },
  {
    id: 'nr_q12',
    meta: { type: 'tf', qid: 'nr_q12_tf', correct: false, correctLabel: 'False',
      explanation: 'No! When you increase 147 by 10 you get 157, not 148. Adding 10 changes the tens digit, not the ones digit.' },
    render: (lp) => (
      <div className="hoh-qcard">
        <AchievementBadge icon="🎯" label="TRUE OR FALSE?" color="#7c3aed" />
        <p className="hoh-qtext">147 increased by 10 equals 148. True or False?</p>
        <TileSequence items={[147, '+10', '=', '?']} />
        <HOHTFButtons qid="nr_q12_tf" lp={lp} />
      </div>
    ),
  },
];

const NumberRepresentation = () => {
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
  return <HOHPracticeTemplate skillId="HOH-03" skillName="Number Representation — Bundles & Sentences" questions={questions} questionMeta={questionMeta} logicProps={logicProps} />;
};

export default NumberRepresentation;
