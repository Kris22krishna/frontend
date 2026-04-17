import React, { useRef } from 'react';
import { useHOHLogic } from './useHOHLogic';
import HOHPracticeTemplate from './HOHPracticeTemplate';
import { HOHOption, HOHTFButtons, AchievementBadge, CountingObjectsDisplay, TileSequence, StoryBox, shuffle } from './HOHSharedComponents';
import './house-of-hundreds.css';

// NCERT Maths Mela Class 3 — Chapter 6: House of Hundreds I (pp. 64–65)
// Topic: Counting Beyond 200 — triangular torans, bangles, toffees; bridging to 300

const QUESTION_POOL = [
  {
    id: 'cb_q1',
    options: [['250','250'],['200','200'],['300','300'],['150','150']],
    meta: { type: 'mcq', qid: 'cb_q1', correct: '250', correctLabel: '250',
      explanation: 'The triangular torans are arranged in rows of 10. There are 200 in the big block, and 5 lines of 10 more = 50. So 200 + 50 = 250 triangles total!' },
    render: (lp, ctx) => (
      <div className="hoh-qcard">
        <AchievementBadge icon="🔺" label="COUNTING TORANS" color="#ef4444" />
        <StoryBox emoji="🎪" text="Ajji, Teji and Jojo are at the mela. They see triangular torans. There are already 2 hundred torans, plus 5 rows of 10 more!" />
        <p className="hoh-qtext">How many triangular torans are there in total?<br />(200 + 50 more)</p>
        <CountingObjectsDisplay emoji="🔺" groups={5} extraCount={0} groupSize={10} label="5 groups of 10 = 50, already have 200 → total = 250" />
        <div className="hoh-opts">
          {ctx.shuffledOpts.map(([v, d], i) => (
            <HOHOption key={v} value={v} displayText={d} letterIdx={i} onClick={() => lp.handleMcq('cb_q1', v)} className={lp.getMcqClass('cb_q1', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'cb_q2',
    options: [['280','280'],['250','250'],['300','300'],['270','270']],
    meta: { type: 'mcq', qid: 'cb_q2', correct: '280', correctLabel: '280',
      explanation: 'Teji counts bangles in 10s: 10, 20, 30, … 100, 110, … 200, 210, … 270, 271, 272, … 280. Total bangles = 280! That is 200 and 80 more.' },
    render: (lp, ctx) => (
      <div className="hoh-qcard">
        <AchievementBadge icon="💍" label="BANGLE COUNTER" color="#f59e0b" />
        <StoryBox emoji="💍" text="Teji counts bangles at the mela stall counting in groups of 10: 10, 20, 30, … all the way to 280!" />
        <p className="hoh-qtext">How many bangles are there in total? (200 and 80 more)</p>
        <div className="hoh-sentence"><span>200</span><span>+</span><span>80</span><span>=</span><span>?</span></div>
        <div className="hoh-opts">
          {ctx.shuffledOpts.map(([v, d], i) => (
            <HOHOption key={v} value={v} displayText={d} letterIdx={i} onClick={() => lp.handleMcq('cb_q2', v)} className={lp.getMcqClass('cb_q2', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'cb_q3',
    options: [['298','298'],['300','300'],['290','290'],['280','280']],
    meta: { type: 'mcq', qid: 'cb_q3', correct: '298', correctLabel: '298',
      explanation: 'Jojo counts toffees in boxes of 10: 10, 20, … 100, 110, … 200, 210, … 290, 291, 292, 293, … 298. Total toffees in boxes = 298!' },
    render: (lp, ctx) => (
      <div className="hoh-qcard">
        <AchievementBadge icon="🍬" label="TOFFEE COUNTER" color="#8b5cf6" />
        <StoryBox emoji="🍬" text="Jojo counts toffees in big boxes at the mela: 10, 20, … 290, 291, 292, … He reaches 298 toffees in the boxes!" />
        <p className="hoh-qtext">How many toffees are there in the boxes?</p>
        <div className="hoh-opts">
          {ctx.shuffledOpts.map(([v, d], i) => (
            <HOHOption key={v} value={v} displayText={d} letterIdx={i} onClick={() => lp.handleMcq('cb_q3', v)} className={lp.getMcqClass('cb_q3', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'cb_q4',
    options: [['299','299'],['300','300'],['297','297'],['298','298']],
    meta: { type: 'mcq', qid: 'cb_q4', correct: '299', correctLabel: '299',
      explanation: '298 + 1 = 299. When we add 1 to 298, the ones digit increases by 1, giving us 299.' },
    render: (lp, ctx) => (
      <div className="hoh-qcard">
        <AchievementBadge icon="➕" label="PLUS ONE!" color="#22c55e" />
        <p className="hoh-qtext">298 + 1 = ?</p>
        <TileSequence items={[298, '+1', '=', '?']} />
        <div className="hoh-opts">
          {ctx.shuffledOpts.map(([v, d], i) => (
            <HOHOption key={v} value={v} displayText={d} letterIdx={i} onClick={() => lp.handleMcq('cb_q4', v)} className={lp.getMcqClass('cb_q4', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'cb_q5',
    options: [['300','300'],['299','299'],['301','301'],['310','310']],
    meta: { type: 'mcq', qid: 'cb_q5', correct: '300', correctLabel: '300',
      explanation: '299 + 1 = 300. After 299 comes 300 — the next big hundred number!' },
    render: (lp, ctx) => (
      <div className="hoh-qcard">
        <AchievementBadge icon="🎉" label="REACHING 300!" color="#3b82f6" />
        <p className="hoh-qtext">299 + 1 = ? (What number comes after 299?)</p>
        <TileSequence items={[299, '+1', '=', '?']} />
        <div className="hoh-opts">
          {ctx.shuffledOpts.map(([v, d], i) => (
            <HOHOption key={v} value={v} displayText={d} letterIdx={i} onClick={() => lp.handleMcq('cb_q5', v)} className={lp.getMcqClass('cb_q5', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'cb_q6',
    options: [['50','50 more'],['20','20 more'],['100','100 more'],['30','30 more']],
    meta: { type: 'mcq', qid: 'cb_q6', correct: '50', correctLabel: '50 more',
      explanation: 'There are 250 triangles. To make 300, we need 300 − 250 = 50 more triangles.' },
    render: (lp, ctx) => (
      <div className="hoh-qcard">
        <AchievementBadge icon="🔺" label="HOW MANY MORE TO 300?" color="#ef4444" />
        <p className="hoh-qtext">There are 250 triangular torans. How many more triangles are needed to make 300?</p>
        <div className="hoh-sentence"><span>250</span><span>+</span><span>?</span><span>=</span><span>300</span></div>
        <div className="hoh-opts">
          {ctx.shuffledOpts.map(([v, d], i) => (
            <HOHOption key={v} value={v} displayText={d} letterIdx={i} onClick={() => lp.handleMcq('cb_q6', v)} className={lp.getMcqClass('cb_q6', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'cb_q7',
    options: [['20','20 less'],['30','30 less'],['80','80 less'],['50','50 less']],
    meta: { type: 'mcq', qid: 'cb_q7', correct: '20', correctLabel: '20 less',
      explanation: 'There are 280 bangles. 300 − 280 = 20. So bangles are 20 less than 300.' },
    render: (lp, ctx) => (
      <div className="hoh-qcard">
        <AchievementBadge icon="💍" label="LESS THAN 300?" color="#f59e0b" />
        <p className="hoh-qtext">There are 280 bangles. How many bangles less than 300?</p>
        <div className="hoh-sentence"><span>300</span><span>−</span><span>280</span><span>=</span><span>?</span></div>
        <div className="hoh-opts">
          {ctx.shuffledOpts.map(([v, d], i) => (
            <HOHOption key={v} value={v} displayText={d} letterIdx={i} onClick={() => lp.handleMcq('cb_q7', v)} className={lp.getMcqClass('cb_q7', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'cb_q8',
    options: [['Bangles','💍 Bangles (280)'],['Triangles','🔺 Triangles (250)']],
    meta: { type: 'mcq', qid: 'cb_q8', correct: 'Bangles', correctLabel: 'Bangles (280)',
      explanation: 'Bangles = 280, Triangles = 250. Since 280 > 250, bangles are more! The open mouth of the crocodile always points to the bigger number.' },
    render: (lp, ctx) => (
      <div className="hoh-qcard">
        <AchievementBadge icon="🤔" label="WHICH IS MORE?" color="#7c3aed" />
        <p className="hoh-qtext">Which is more: bangles (280) or triangular torans (250)?</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 30, margin: '14px 0' }}>
          <div style={{ textAlign: 'center' }}>
            <span style={{ fontSize: '2.5rem' }}>💍</span>
            <div style={{ fontFamily: "'Baloo 2',cursive", fontWeight: 800, color: '#f59e0b', fontSize: '1.4rem' }}>280</div>
          </div>
          <div style={{ fontSize: '2rem', alignSelf: 'center', color: '#94a3b8', fontWeight: 800 }}>vs</div>
          <div style={{ textAlign: 'center' }}>
            <span style={{ fontSize: '2.5rem' }}>🔺</span>
            <div style={{ fontFamily: "'Baloo 2',cursive", fontWeight: 800, color: '#ef4444', fontSize: '1.4rem' }}>250</div>
          </div>
        </div>
        <div className="hoh-opts">
          {ctx.shuffledOpts.map(([v, d], i) => (
            <HOHOption key={v} value={v} displayText={d} letterIdx={i} onClick={() => lp.handleMcq('cb_q8', v)} className={lp.getMcqClass('cb_q8', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'cb_q9',
    meta: { type: 'tf', qid: 'cb_q9_tf', correct: true, correctLabel: 'True',
      explanation: 'Yes! 298 toffees in boxes + 2 toffees in Jojo\'s hand = 300 toffees altogether. 298 + 2 = 300.' },
    render: (lp) => (
      <div className="hoh-qcard">
        <AchievementBadge icon="🎯" label="TRUE OR FALSE?" color="#7c3aed" />
        <StoryBox emoji="🍬" text="There are 298 toffees in boxes. Jojo has 2 toffees in his hand." />
        <p className="hoh-qtext">There are 300 toffees altogether. True or False?</p>
        <div className="hoh-sentence"><span>298</span><span>+</span><span>2</span><span>=</span><span>300</span></div>
        <HOHTFButtons qid="cb_q9_tf" lp={lp} />
      </div>
    ),
  },
  {
    id: 'cb_q10',
    meta: { type: 'tf', qid: 'cb_q10_tf', correct: false, correctLabel: 'False',
      explanation: 'Triangles = 250, Bangles = 280. 250 is NOT more than 280. So triangles are fewer than bangles. 250 < 280.' },
    render: (lp) => (
      <div className="hoh-qcard">
        <AchievementBadge icon="🎯" label="TRUE OR FALSE?" color="#7c3aed" />
        <p className="hoh-qtext">There are more triangular torans (250) than bangles (280). True or False?</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 20, margin: '14px 0' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: "'Baloo 2',cursive", fontWeight: 800, fontSize: '1.3rem', color: '#ef4444' }}>🔺 250</div>
          </div>
          <div style={{ fontFamily: "'Baloo 2',cursive", fontWeight: 700, alignSelf: 'center', color: '#94a3b8' }}>vs</div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: "'Baloo 2',cursive", fontWeight: 800, fontSize: '1.3rem', color: '#f59e0b' }}>💍 280</div>
          </div>
        </div>
        <HOHTFButtons qid="cb_q10_tf" lp={lp} />
      </div>
    ),
  },
  {
    id: 'cb_q11',
    options: [['300','300 toffees'],['298','298 toffees'],['302','302 toffees'],['296','296 toffees']],
    meta: { type: 'mcq', qid: 'cb_q11', correct: '300', correctLabel: '300 toffees',
      explanation: '298 toffees in boxes + 2 toffees Jojo is holding = 298 + 2 = 300 toffees altogether!' },
    render: (lp, ctx) => (
      <div className="hoh-qcard">
        <AchievementBadge icon="🍬" label="TOTAL TOFFEES!" color="#06b6d4" />
        <StoryBox emoji="🍬" text="298 toffees are in the boxes. Jojo has 2 toffees in his hand." />
        <p className="hoh-qtext">How many toffees are there altogether?</p>
        <div className="hoh-sentence"><span>298</span><span>+</span><span>2</span><span>=</span><span>?</span></div>
        <div className="hoh-opts">
          {ctx.shuffledOpts.map(([v, d], i) => (
            <HOHOption key={v} value={v} displayText={d} letterIdx={i} onClick={() => lp.handleMcq('cb_q11', v)} className={lp.getMcqClass('cb_q11', v)} />
          ))}
        </div>
      </div>
    ),
  },
];

const CountingBeyond200 = () => {
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
  return <HOHPracticeTemplate skillId="HOH-01" skillName="Counting Beyond 200" questions={questions} questionMeta={questionMeta} logicProps={logicProps} />;
};

export default CountingBeyond200;
