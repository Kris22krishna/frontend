import React, { useRef } from 'react';
import { useHOHLogic } from './useHOHLogic';
import HOHPracticeTemplate from './HOHPracticeTemplate';
import { HOHOption, HOHTFButtons, AchievementBadge, TileSequence, StoryBox, shuffle } from './HOHSharedComponents';
import './house-of-hundreds.css';

// NCERT Maths Mela Class 3 — Chapter 6 (pp. 79–80)
// Topic: Patterns & Groups — Spring Leap Homes (401,410,419...491), 1 box of 100 = 10 boxes of 10

const QUESTION_POOL = [
  {
    id: 'pg_q1',
    options: [['419','419'],['420','420'],['410','410'],['411','411']],
    meta: { type: 'mcq', qid: 'pg_q1', correct: '419', correctLabel: '419',
      explanation: '401, 410, 419 — each step increases by 9! 401 + 9 = 410, 410 + 9 = 419. This is the Spring Leap Homes pattern: +9 each time.' },
    render: (lp, ctx) => (
      <div className="hoh-qcard">
        <AchievementBadge icon="🌿" label="SPRING LEAP!" color="#22c55e" />
        <StoryBox emoji="🌿" text="Jojo finds a special pattern in the Spring Leap Homes — the numbers jump by 9 each time!" />
        <p className="hoh-qtext">401, 410, ___, 428, 437 — what is the missing number?</p>
        <TileSequence items={[401, 410, '?', 428, 437]} />
        <div className="hoh-opts">
          {ctx.shuffledOpts.map(([v, d], i) => (
            <HOHOption key={v} value={v} displayText={d} letterIdx={i} onClick={() => lp.handleMcq('pg_q1', v)} className={lp.getMcqClass('pg_q1', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'pg_q2',
    options: [['9','Jump of 9'],['10','Jump of 10'],['1','Jump of 1'],['19','Jump of 19']],
    meta: { type: 'mcq', qid: 'pg_q2', correct: '9', correctLabel: 'Jump of 9',
      explanation: '410 − 401 = 9. Each number in the Spring Leap pattern increases by 9. Watch: 401→410→419→428→437→446...491. Each step is +9!' },
    render: (lp, ctx) => (
      <div className="hoh-qcard">
        <AchievementBadge icon="🌿" label="FIND THE JUMP!" color="#22c55e" />
        <p className="hoh-qtext">401, 410, 419, 428, 437 — by how much does each number increase?</p>
        <TileSequence items={[401, 410, 419, 428, 437]} />
        <div className="hoh-opts">
          {ctx.shuffledOpts.map(([v, d], i) => (
            <HOHOption key={v} value={v} displayText={d} letterIdx={i} onClick={() => lp.handleMcq('pg_q2', v)} className={lp.getMcqClass('pg_q2', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'pg_q3',
    options: [['491','491'],['490','490'],['481','481'],['482','482']],
    meta: { type: 'mcq', qid: 'pg_q3', correct: '491', correctLabel: '491',
      explanation: '401, 410, 419, 428, 437, 446, 455, 464, 473, 482, 491. Counting from 401 in jumps of 9 — the last number in the Spring Leap Homes sequence is 491.' },
    render: (lp, ctx) => (
      <div className="hoh-qcard">
        <AchievementBadge icon="🌿" label="LAST IN SEQUENCE!" color="#3b82f6" />
        <p className="hoh-qtext">The Spring Leap Homes sequence starts at 401 and jumps by 9 each time. What is the last number before 500?</p>
        <TileSequence items={[401, 410, '...', 482, '?']} />
        <div className="hoh-opts">
          {ctx.shuffledOpts.map(([v, d], i) => (
            <HOHOption key={v} value={v} displayText={d} letterIdx={i} onClick={() => lp.handleMcq('pg_q3', v)} className={lp.getMcqClass('pg_q3', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'pg_q4',
    options: [['10','10 small boxes'],['100','100 small boxes'],['1','1 small box'],['20','20 small boxes']],
    meta: { type: 'mcq', qid: 'pg_q4', correct: '10', correctLabel: '10 small boxes',
      explanation: '1 big box of 100 = 10 small boxes of 10. Because 100 = 10 × 10. Ten boxes of ten makes one hundred!' },
    render: (lp, ctx) => (
      <div className="hoh-qcard">
        <AchievementBadge icon="📦" label="BOXES OF 10!" color="#f59e0b" />
        <StoryBox emoji="📦" text="Ajji packs sweets into big boxes of 100 and small boxes of 10. How many small boxes make 1 big box?" />
        <p className="hoh-qtext">1 big box of 100 = how many small boxes of 10?</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 12, margin: '14px 0', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ background: 'linear-gradient(135deg,#eff6ff,#dbeafe)', border: '2px solid #93c5fd', borderRadius: 12, padding: '14px 20px', textAlign: 'center' }}>
            <div style={{ fontSize: '2rem' }}>📦</div>
            <div style={{ fontFamily: "'Baloo 2',cursive", fontWeight: 900, color: '#1e40af', fontSize: '1.2rem' }}>1 × 100</div>
          </div>
          <div style={{ fontFamily: "'Baloo 2',cursive", fontWeight: 900, fontSize: '1.5rem', color: '#94a3b8' }}>=</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, maxWidth: 120 }}>
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} style={{ background: '#fef3c7', border: '2px solid #f59e0b', borderRadius: 8, width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Baloo 2',cursive", fontWeight: 800, color: '#92400e', fontSize: '0.75rem' }}>10</div>
            ))}
          </div>
        </div>
        <div className="hoh-opts">
          {ctx.shuffledOpts.map(([v, d], i) => (
            <HOHOption key={v} value={v} displayText={d} letterIdx={i} onClick={() => lp.handleMcq('pg_q4', v)} className={lp.getMcqClass('pg_q4', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'pg_q5',
    options: [['300','300 sweets'],['30','30 sweets'],['3','3 sweets'],['310','310 sweets']],
    meta: { type: 'mcq', qid: 'pg_q5', correct: '300', correctLabel: '300 sweets',
      explanation: '3 big boxes × 100 each = 300 sweets. Or equivalently, 30 small boxes × 10 each = 300 sweets. Both give 300!' },
    render: (lp, ctx) => (
      <div className="hoh-qcard">
        <AchievementBadge icon="📦" label="HOW MANY SWEETS?" color="#ef4444" />
        <StoryBox emoji="📦" text="Ajji has 3 big boxes of 100 sweets each. How many sweets in total?" />
        <p className="hoh-qtext">3 big boxes × 100 sweets each = ?</p>
        <div className="hoh-sentence"><span>3</span><span>×</span><span>100</span><span>=</span><span>?</span></div>
        <div className="hoh-opts">
          {ctx.shuffledOpts.map(([v, d], i) => (
            <HOHOption key={v} value={v} displayText={d} letterIdx={i} onClick={() => lp.handleMcq('pg_q5', v)} className={lp.getMcqClass('pg_q5', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'pg_q6',
    options: [['446','446'],['445','445'],['447','447'],['436','436']],
    meta: { type: 'mcq', qid: 'pg_q6', correct: '446', correctLabel: '446',
      explanation: '437 + 9 = 446. The Spring Leap pattern adds 9 each time. 437 → 437 + 9 = 446.' },
    render: (lp, ctx) => (
      <div className="hoh-qcard">
        <AchievementBadge icon="🌿" label="NEXT LEAP!" color="#22c55e" />
        <p className="hoh-qtext">In the Spring Leap Homes pattern (+9 each time), what comes after 437?</p>
        <TileSequence items={[419, 428, 437, '?']} />
        <div className="hoh-opts">
          {ctx.shuffledOpts.map(([v, d], i) => (
            <HOHOption key={v} value={v} displayText={d} letterIdx={i} onClick={() => lp.handleMcq('pg_q6', v)} className={lp.getMcqClass('pg_q6', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'pg_q7',
    meta: { type: 'tf', qid: 'pg_q7_tf', correct: true, correctLabel: 'True',
      explanation: 'Yes! 1 big box of 100 = 10 small boxes of 10. Because 10 × 10 = 100. Ten tens make one hundred!' },
    render: (lp) => (
      <div className="hoh-qcard">
        <AchievementBadge icon="🎯" label="TRUE OR FALSE?" color="#7c3aed" />
        <p className="hoh-qtext">1 box of 100 is the same as 10 boxes of 10. True or False?</p>
        <div className="hoh-sentence"><span>1</span><span>×</span><span>100</span><span>=</span><span>10</span><span>×</span><span>10</span></div>
        <HOHTFButtons qid="pg_q7_tf" lp={lp} />
      </div>
    ),
  },
  {
    id: 'pg_q8',
    options: [['30 boxes of 10','30 small boxes of 10'],['3 boxes of 10','3 small boxes of 10'],['300 boxes of 10','300 small boxes of 10'],['10 boxes of 10','10 small boxes of 10']],
    meta: { type: 'mcq', qid: 'pg_q8', correct: '30 boxes of 10', correctLabel: '30 small boxes of 10',
      explanation: '3 big boxes of 100 = 300 sweets. 300 ÷ 10 = 30 small boxes of 10. So 3 big boxes = 30 small boxes!' },
    render: (lp, ctx) => (
      <div className="hoh-qcard">
        <AchievementBadge icon="📦" label="SWAP THE BOXES!" color="#8b5cf6" />
        <p className="hoh-qtext">Ajji swaps her 3 big boxes of 100 for small boxes of 10 each. How many small boxes does she get?</p>
        <div className="hoh-sentence"><span>3</span><span>×</span><span>100</span><span>=</span><span>?</span><span>×</span><span>10</span></div>
        <div className="hoh-opts">
          {ctx.shuffledOpts.map(([v, d], i) => (
            <HOHOption key={v} value={v} displayText={d} letterIdx={i} onClick={() => lp.handleMcq('pg_q8', v)} className={lp.getMcqClass('pg_q8', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'pg_q9',
    meta: { type: 'tf', qid: 'pg_q9_tf', correct: false, correctLabel: 'False',
      explanation: 'No! The Spring Leap pattern goes: 401, 410, 419, 428... It jumps by 9 each time, NOT by 10. 401 + 10 = 411, but the next number is 410 (a jump of 9).' },
    render: (lp) => (
      <div className="hoh-qcard">
        <AchievementBadge icon="🎯" label="TRUE OR FALSE?" color="#7c3aed" />
        <p className="hoh-qtext">The Spring Leap Homes sequence (401, 410, 419, 428...) increases by 10 each time. True or False?</p>
        <TileSequence items={[401, 410, 419, 428]} />
        <HOHTFButtons qid="pg_q9_tf" lp={lp} />
      </div>
    ),
  },
  {
    id: 'pg_q10',
    options: [['455','455'],['456','456'],['464','464'],['454','454']],
    meta: { type: 'mcq', qid: 'pg_q10', correct: '455', correctLabel: '455',
      explanation: '446 + 9 = 455. Spring Leap always adds 9: 437 → 446 → 455 → 464 → ...' },
    render: (lp, ctx) => (
      <div className="hoh-qcard">
        <AchievementBadge icon="🌿" label="KEEP LEAPING!" color="#14b8a6" />
        <p className="hoh-qtext">Spring Leap pattern: 437, 446, ___, 464 — what is the missing number?</p>
        <TileSequence items={[437, 446, '?', 464]} />
        <div className="hoh-opts">
          {ctx.shuffledOpts.map(([v, d], i) => (
            <HOHOption key={v} value={v} displayText={d} letterIdx={i} onClick={() => lp.handleMcq('pg_q10', v)} className={lp.getMcqClass('pg_q10', v)} />
          ))}
        </div>
      </div>
    ),
  },
];

const PatternsGroups = () => {
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
  return <HOHPracticeTemplate skillId="HOH-09" skillName="Patterns & Groups" questions={questions} questionMeta={questionMeta} logicProps={logicProps} />;
};

export default PatternsGroups;
