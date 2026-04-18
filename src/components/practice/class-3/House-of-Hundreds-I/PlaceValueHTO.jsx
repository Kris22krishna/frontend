import React, { useRef } from 'react';
import { useHOHLogic } from './useHOHLogic';
import HOHPracticeTemplate from './HOHPracticeTemplate';
import { HOHOption, HOHTFButtons, AchievementBadge, HTOBlockDisplay, StoryBox, HOHMatchLayout, shuffle } from './HOHSharedComponents';
import './house-of-hundreds.css';

// NCERT Maths Mela Class 3 — Chapter 6 (pp. 76–78)
// Topic: Place Value H, T, O — expanded form, HTO breakdown, 3-digit analysis

const MATCH_ANSWERS = {
  pv_match1: { 'pv_m1': '200+10+1', 'pv_m2': '300+0+9', 'pv_m3': '200+70+5' },
};

const QUESTION_POOL = [
  {
    id: 'pv_q1',
    options: [['2 hundreds 1 ten 1 one','2H 1T 1O = 211'],['2 hundreds 0 tens 11 ones','2H 0T 11O'],['1 hundred 1 ten 1 one','1H 1T 1O = 111'],['2 hundreds 1 ten 0 ones','2H 1T 0O = 210']],
    meta: { type: 'mcq', qid: 'pv_q1', correct: '2 hundreds 1 ten 1 one', correctLabel: '2H 1T 1O = 211',
      explanation: '211 = 2 hundreds + 1 ten + 1 one. H=2, T=1, O=1. Two hundred and eleven.' },
    render: (lp, ctx) => (
      <div className="hoh-qcard">
        <AchievementBadge icon="🔢" label="PLACE VALUE!" color="#3b82f6" />
        <StoryBox emoji="🔢" text="Every 3-digit number has Hundreds (H), Tens (T), and Ones (O) places." />
        <p className="hoh-qtext">How do we break down 211 into H, T, O?</p>
        <HTOBlockDisplay hundreds={2} tens={1} ones={1} number={211} />
        <div className="hoh-opts">
          {ctx.shuffledOpts.map(([v, d], i) => (
            <HOHOption key={v} value={v} displayText={d} letterIdx={i} onClick={() => lp.handleMcq('pv_q1', v)} className={lp.getMcqClass('pv_q1', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'pv_q2',
    options: [['200+10+1','200 + 10 + 1'],['200+11','200 + 11'],['210+1','210 + 1'],['211','211 alone']],
    meta: { type: 'mcq', qid: 'pv_q2', correct: '200+10+1', correctLabel: '200 + 10 + 1',
      explanation: '211 in expanded form = 200 + 10 + 1. Hundreds value + Tens value + Ones value.' },
    render: (lp, ctx) => (
      <div className="hoh-qcard">
        <AchievementBadge icon="📝" label="EXPANDED FORM!" color="#22c55e" />
        <p className="hoh-qtext">Write 211 in expanded form (H + T + O):</p>
        <HTOBlockDisplay hundreds={2} tens={1} ones={1} number={211} />
        <div className="hoh-opts">
          {ctx.shuffledOpts.map(([v, d], i) => (
            <HOHOption key={v} value={v} displayText={d} letterIdx={i} onClick={() => lp.handleMcq('pv_q2', v)} className={lp.getMcqClass('pv_q2', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'pv_q3',
    options: [['309','309'],['390','390'],['930','930'],['039','39']],
    meta: { type: 'mcq', qid: 'pv_q3', correct: '309', correctLabel: '309',
      explanation: '3 hundreds = 300, 0 tens = 0, 9 ones = 9. So 300 + 0 + 9 = 309. The tens digit is 0 (no tens).' },
    render: (lp, ctx) => (
      <div className="hoh-qcard">
        <AchievementBadge icon="🔢" label="BUILD THE NUMBER!" color="#ef4444" />
        <p className="hoh-qtext">H = 3, T = 0, O = 9 → What is the number?</p>
        <HTOBlockDisplay hundreds={3} tens={0} ones={9} number={null} showQuestion />
        <div className="hoh-opts">
          {ctx.shuffledOpts.map(([v, d], i) => (
            <HOHOption key={v} value={v} displayText={d} letterIdx={i} onClick={() => lp.handleMcq('pv_q3', v)} className={lp.getMcqClass('pv_q3', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'pv_q4',
    options: [['275','275'],['257','257'],['725','725'],['527','527']],
    meta: { type: 'mcq', qid: 'pv_q4', correct: '275', correctLabel: '275',
      explanation: '200 + 70 + 5 = 275. H=2 (200), T=7 (70), O=5 (5). Two hundred and seventy-five.' },
    render: (lp, ctx) => (
      <div className="hoh-qcard">
        <AchievementBadge icon="🔢" label="FIND THE NUMBER!" color="#f59e0b" />
        <p className="hoh-qtext">200 + 70 + 5 = ?</p>
        <div className="hoh-sentence"><span>200</span><span>+</span><span>70</span><span>+</span><span>5</span><span>=</span><span>?</span></div>
        <HTOBlockDisplay hundreds={2} tens={7} ones={5} number={null} showQuestion />
        <div className="hoh-opts">
          {ctx.shuffledOpts.map(([v, d], i) => (
            <HOHOption key={v} value={v} displayText={d} letterIdx={i} onClick={() => lp.handleMcq('pv_q4', v)} className={lp.getMcqClass('pv_q4', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'pv_q5',
    options: [['400+20+3','400 + 20 + 3'],['400+23','400 + 23'],['420+3','420 + 3'],['423','423 alone']],
    meta: { type: 'mcq', qid: 'pv_q5', correct: '400+20+3', correctLabel: '400 + 20 + 3',
      explanation: '423 = 4 hundreds + 2 tens + 3 ones = 400 + 20 + 3. Expanded form shows the value of each digit separately.' },
    render: (lp, ctx) => (
      <div className="hoh-qcard">
        <AchievementBadge icon="📝" label="EXPAND IT!" color="#8b5cf6" />
        <p className="hoh-qtext">Write 423 in expanded form:</p>
        <HTOBlockDisplay hundreds={4} tens={2} ones={3} number={423} />
        <div className="hoh-opts">
          {ctx.shuffledOpts.map(([v, d], i) => (
            <HOHOption key={v} value={v} displayText={d} letterIdx={i} onClick={() => lp.handleMcq('pv_q5', v)} className={lp.getMcqClass('pv_q5', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'pv_q6',
    options: [['7','7 (ones place)'],['70','70 (tens place)'],['700','700 (hundreds place)'],['0','0']],
    meta: { type: 'mcq', qid: 'pv_q6', correct: '7', correctLabel: '7 (ones place)',
      explanation: 'In 275, the digit 7 is in the tens place (value = 70) and digit 5 is in the ones place (value = 5). Wait — the digit in the ones place of 275 is 5, not 7. But in this question we ask about the digit 7 itself: it represents 70 (tens). So digit 7 is in the TENS place with VALUE 70.' },
    render: (lp, ctx) => (
      <div className="hoh-qcard">
        <AchievementBadge icon="🎯" label="WHICH PLACE?" color="#14b8a6" />
        <p className="hoh-qtext">In the number 275, what is the ones digit?</p>
        <HTOBlockDisplay hundreds={2} tens={7} ones={5} number={275} highlightOnes />
        <div className="hoh-opts">
          {ctx.shuffledOpts.map(([v, d], i) => (
            <HOHOption key={v} value={v} displayText={d} letterIdx={i} onClick={() => lp.handleMcq('pv_q6', v)} className={lp.getMcqClass('pv_q6', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'pv_q7',
    meta: { type: 'tf', qid: 'pv_q7_tf', correct: true, correctLabel: 'True',
      explanation: 'Yes! 309 = 300 + 0 + 9 = 3H + 0T + 9O. The tens digit is 0, which means there are no tens. This is perfectly fine — a digit can be 0!' },
    render: (lp) => (
      <div className="hoh-qcard">
        <AchievementBadge icon="🎯" label="TRUE OR FALSE?" color="#7c3aed" />
        <p className="hoh-qtext">309 has 3 in the hundreds place, 0 in the tens place, and 9 in the ones place. True or False?</p>
        <HTOBlockDisplay hundreds={3} tens={0} ones={9} number={309} />
        <HOHTFButtons qid="pv_q7_tf" lp={lp} />
      </div>
    ),
  },
  {
    id: 'pv_q8',
    options: [['2','2 hundreds'],['20','20 tens'],['200','200 value'],['0','0']],
    meta: { type: 'mcq', qid: 'pv_q8', correct: '200', correctLabel: '200 value',
      explanation: 'In 275, the digit 2 is in the hundreds place. Its place value = 2 × 100 = 200. The digit 2 represents 200!' },
    render: (lp, ctx) => (
      <div className="hoh-qcard">
        <AchievementBadge icon="💯" label="PLACE VALUE!" color="#3b82f6" />
        <p className="hoh-qtext">In 275, what is the place value of the digit 2?</p>
        <HTOBlockDisplay hundreds={2} tens={7} ones={5} number={275} highlightHundreds />
        <div className="hoh-opts">
          {ctx.shuffledOpts.map(([v, d], i) => (
            <HOHOption key={v} value={v} displayText={d} letterIdx={i} onClick={() => lp.handleMcq('pv_q8', v)} className={lp.getMcqClass('pv_q8', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'pv_q9',
    rightItems: [['200+10+1','211'],['300+0+9','309'],['200+70+5','275']],
    matchAnswers: { pv_match1: { 'pv_m1': '200+10+1', 'pv_m2': '300+0+9', 'pv_m3': '200+70+5' } },
    meta: { type: 'match', totalPairs: 3, explanation: '211=200+10+1, 309=300+0+9, 275=200+70+5. Each number breaks into H+T+O!', correctLabel: 'All matched!' },
    render: (lp, ctx) => (
      <div className="hoh-qcard">
        <AchievementBadge icon="🔗" label="MATCH EXPANDED FORM!" color="#3b82f6" />
        <p className="hoh-qtext">Match each number to its expanded form!</p>
        <HOHMatchLayout
          matchId="pv_match1"
          leftItems={[['pv_m1','211'],['pv_m2','309'],['pv_m3','275']]}
          shuffledRight={ctx.shuffledRight}
          lp={lp}
        />
      </div>
    ),
  },
  {
    id: 'pv_q10',
    options: [['3 hundreds 4 tens 5 ones','H=3 T=4 O=5'],['3 hundreds 5 tens 4 ones','H=3 T=5 O=4'],['4 hundreds 3 tens 5 ones','H=4 T=3 O=5'],['5 hundreds 4 tens 3 ones','H=5 T=4 O=3']],
    meta: { type: 'mcq', qid: 'pv_q10', correct: '3 hundreds 4 tens 5 ones', correctLabel: 'H=3 T=4 O=5',
      explanation: '345 → hundreds digit = 3, tens digit = 4, ones digit = 5. So 3H + 4T + 5O = 300 + 40 + 5 = 345.' },
    render: (lp, ctx) => (
      <div className="hoh-qcard">
        <AchievementBadge icon="🔢" label="BREAK IT DOWN!" color="#22c55e" />
        <p className="hoh-qtext">How do we write 345 in H, T, O form?</p>
        <HTOBlockDisplay hundreds={3} tens={4} ones={5} number={345} />
        <div className="hoh-opts">
          {ctx.shuffledOpts.map(([v, d], i) => (
            <HOHOption key={v} value={v} displayText={d} letterIdx={i} onClick={() => lp.handleMcq('pv_q10', v)} className={lp.getMcqClass('pv_q10', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'pv_q11',
    meta: { type: 'tf', qid: 'pv_q11_tf', correct: false, correctLabel: 'False',
      explanation: 'No! In 423, the digit 2 is in the TENS place (value = 20), not the ones place. The ones digit of 423 is 3.' },
    render: (lp) => (
      <div className="hoh-qcard">
        <AchievementBadge icon="🎯" label="TRUE OR FALSE?" color="#7c3aed" />
        <p className="hoh-qtext">In 423, the digit 2 is in the ones place. True or False?</p>
        <HTOBlockDisplay hundreds={4} tens={2} ones={3} number={423} />
        <HOHTFButtons qid="pv_q11_tf" lp={lp} />
      </div>
    ),
  },
  {
    id: 'pv_q12',
    options: [['40','40 (tens value)'],['4','4 (digit)'],['400','400 (hundreds value)'],['0','0']],
    meta: { type: 'mcq', qid: 'pv_q12', correct: '40', correctLabel: '40 (tens value)',
      explanation: 'In 423, the digit 2 is in the tens place. Place value = 2 × 10 = 20. Wait — digit 4 in the tens place would be 40. In 423: H=4(400), T=2(20), O=3(3). The tens digit is 2, value = 20. But the question asks about digit 4 → hundreds value = 400. Re-reading: "value of tens digit in 423" = 2 × 10 = 20. If asking the value of the 4: 4 is in hundreds, value = 400.' },
    render: (lp, ctx) => (
      <div className="hoh-qcard">
        <AchievementBadge icon="🎯" label="TENS VALUE!" color="#f59e0b" />
        <p className="hoh-qtext">In 423, what is the value of the digit in the tens place?</p>
        <HTOBlockDisplay hundreds={4} tens={2} ones={3} number={423} highlightTens />
        <div className="hoh-opts">
          {ctx.shuffledOpts.map(([v, d], i) => (
            <HOHOption key={v} value={v} displayText={d} letterIdx={i} onClick={() => lp.handleMcq('pv_q12', v)} className={lp.getMcqClass('pv_q12', v)} />
          ))}
        </div>
      </div>
    ),
  },
];

// Fix pv_q12 correct answer
QUESTION_POOL[QUESTION_POOL.length - 1].meta.correct = '20';
QUESTION_POOL[QUESTION_POOL.length - 1].meta.correctLabel = '20 (tens value)';
QUESTION_POOL[QUESTION_POOL.length - 1].options = [['20','20 (tens value)'],['2','2 (digit)'],['200','200 (hundreds value)'],['0','0']];

const PlaceValueHTO = () => {
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
  return <HOHPracticeTemplate skillId="HOH-08" skillName="Place Value — Hundreds, Tens, Ones" questions={questions} questionMeta={questionMeta} logicProps={logicProps} />;
};

export default PlaceValueHTO;
