import React, { useRef } from 'react';
import { useHOHLogic } from './useHOHLogic';
import HOHPracticeTemplate from './HOHPracticeTemplate';
import { HOHOption, HOHTFButtons, AchievementBadge, TileSequence, StoryBox, shuffle } from './HOHSharedComponents';
import './house-of-hundreds.css';

// NCERT Maths Mela Class 3 — Chapter 6 (pp. 69–70)
// Topic: Number Games & Patterns — Flag game, Magical count, Hundreds sequence

const QUESTION_POOL = [
  {
    id: 'ngp_q1',
    options: [['207','207'],['203','203'],['209','209'],['205','205']],
    meta: { type: 'mcq', qid: 'ngp_q1', correct: '207', correctLabel: '207',
      explanation: 'The clues tell us: more than 200, less than 210. More than 205, less than 209. More than 206 — so it is 207!' },
    render: (lp, ctx) => (
      <div className="hoh-qcard">
        <AchievementBadge icon="🚩" label="FLAG GAME!" color="#3b82f6" />
        <StoryBox emoji="🚩" text="Teji thinks of a number. Use the flag clues to guess the mystery number!" />
        <p className="hoh-qtext">The mystery number is between 200 and 210. It is more than 205, less than 209, and more than 206. What is the number?</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, margin: '12px 0', padding: '10px 14px', background: '#eff6ff', borderRadius: 12, border: '2px solid #bfdbfe' }}>
          <div style={{ fontFamily: "'Baloo 2',cursive", fontWeight: 700, color: '#1e40af', fontSize: '0.95rem' }}>🚩 Clue 1: More than 200, less than 210</div>
          <div style={{ fontFamily: "'Baloo 2',cursive", fontWeight: 700, color: '#1e40af', fontSize: '0.95rem' }}>🚩 Clue 2: More than 205, less than 209</div>
          <div style={{ fontFamily: "'Baloo 2',cursive", fontWeight: 700, color: '#1e40af', fontSize: '0.95rem' }}>🚩 Clue 3: More than 206</div>
        </div>
        <div className="hoh-opts">
          {ctx.shuffledOpts.map(([v, d], i) => (
            <HOHOption key={v} value={v} displayText={d} letterIdx={i} onClick={() => lp.handleMcq('ngp_q1', v)} className={lp.getMcqClass('ngp_q1', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'ngp_q2',
    options: [['More than','More than (>)'],['Less than','Less than (<)'],['Equal to','Equal to (=)'],['Not related','Not related']],
    meta: { type: 'mcq', qid: 'ngp_q2', correct: 'Less than', correctLabel: 'Less than (<)',
      explanation: '207 is less than 210. In the flag game, when the number is below the guess, we say "less than". 207 < 210.' },
    render: (lp, ctx) => (
      <div className="hoh-qcard">
        <AchievementBadge icon="🚩" label="FLAG DIRECTION!" color="#22c55e" />
        <p className="hoh-qtext">In the flag game, the mystery number is 207 and Teji guessed 210. What flag does she show?</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 24, margin: '12px 0' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: "'Baloo 2',cursive", fontWeight: 900, fontSize: '2rem', color: '#3b82f6' }}>207</div>
            <div style={{ fontFamily: "'Baloo 2',cursive", fontWeight: 700, fontSize: '0.9rem', color: '#64748b' }}>Mystery</div>
          </div>
          <div style={{ fontFamily: "'Baloo 2',cursive", fontWeight: 900, fontSize: '2rem', color: '#94a3b8', alignSelf: 'center' }}>vs</div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: "'Baloo 2',cursive", fontWeight: 900, fontSize: '2rem', color: '#ef4444' }}>210</div>
            <div style={{ fontFamily: "'Baloo 2',cursive", fontWeight: 700, fontSize: '0.9rem', color: '#64748b' }}>Guess</div>
          </div>
        </div>
        <div className="hoh-opts">
          {ctx.shuffledOpts.map(([v, d], i) => (
            <HOHOption key={v} value={v} displayText={d} letterIdx={i} onClick={() => lp.handleMcq('ngp_q2', v)} className={lp.getMcqClass('ngp_q2', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'ngp_q3',
    options: [['FOUR','FOUR (4 letters)'],['THREE','THREE (5 letters)'],['FIVE','FIVE (4 letters)'],['TEN','TEN (3 letters)']],
    meta: { type: 'mcq', qid: 'ngp_q3', correct: 'FOUR', correctLabel: 'FOUR',
      explanation: 'The Magical Count always leads to FOUR! FOUR has 4 letters → count those letters → FOUR → it loops forever! Every number eventually reaches FOUR.' },
    render: (lp, ctx) => (
      <div className="hoh-qcard">
        <AchievementBadge icon="✨" label="MAGICAL COUNT!" color="#7c3aed" />
        <StoryBox emoji="✨" text="Jojo discovered a magic trick! Start with any number. Write its name. Count the letters. Write that number name. Count letters again. Keep going... you always reach the same word!" />
        <p className="hoh-qtext">Try it: Start with 235 → TWO HUNDRED AND THIRTY FIVE (27 letters) → TWENTY SEVEN (11 letters) → ELEVEN (6 letters) → SIX (3 letters) → THREE (5 letters) → FIVE (4 letters) → ___?</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, justifyContent: 'center', margin: '10px 0' }}>
          {['235','27','11','6','3','5','?'].map((n, i) => (
            <React.Fragment key={i}>
              <div style={{ background: i === 6 ? '#fef3c7' : '#eff6ff', border: `2px ${i === 6 ? 'dashed #f59e0b' : 'solid #bfdbfe'}`, borderRadius: 8, padding: '4px 10px', fontFamily: "'Baloo 2',cursive", fontWeight: 800, color: i === 6 ? '#d97706' : '#1e40af', fontSize: '1rem' }}>{n}</div>
              {i < 6 && <span style={{ alignSelf: 'center', color: '#94a3b8', fontSize: '1rem' }}>→</span>}
            </React.Fragment>
          ))}
        </div>
        <div className="hoh-opts">
          {ctx.shuffledOpts.map(([v, d], i) => (
            <HOHOption key={v} value={v} displayText={d} letterIdx={i} onClick={() => lp.handleMcq('ngp_q3', v)} className={lp.getMcqClass('ngp_q3', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'ngp_q4',
    options: [['4','4 letters'],['5','5 letters'],['3','3 letters'],['6','6 letters']],
    meta: { type: 'mcq', qid: 'ngp_q4', correct: '4', correctLabel: '4 letters',
      explanation: 'FOUR has exactly 4 letters: F-O-U-R. That is why the Magical Count always loops at FOUR — counting 4 letters of FOUR gives you FOUR again!' },
    render: (lp, ctx) => (
      <div className="hoh-qcard">
        <AchievementBadge icon="✨" label="WHY FOUR?" color="#f59e0b" />
        <p className="hoh-qtext">The Magical Count always ends at FOUR. Why does it stop at FOUR? How many letters does the word FOUR have?</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 8, margin: '14px 0' }}>
          {['F','O','U','R'].map((l, i) => (
            <div key={i} style={{ width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg,#fef3c7,#fde68a)', border: '2.5px solid #f59e0b', borderRadius: 10, fontFamily: "'Baloo 2',cursive", fontWeight: 900, fontSize: '1.4rem', color: '#92400e' }}>{l}</div>
          ))}
        </div>
        <div className="hoh-opts">
          {ctx.shuffledOpts.map(([v, d], i) => (
            <HOHOption key={v} value={v} displayText={d} letterIdx={i} onClick={() => lp.handleMcq('ngp_q4', v)} className={lp.getMcqClass('ngp_q4', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'ngp_q5',
    options: [['400','400'],['300','300'],['500','500'],['350','350']],
    meta: { type: 'mcq', qid: 'ngp_q5', correct: '400', correctLabel: '400',
      explanation: '100, 200, 300 — the pattern increases by 100 each time. So the next number in the hundreds sequence is 400!' },
    render: (lp, ctx) => (
      <div className="hoh-qcard">
        <AchievementBadge icon="💯" label="HUNDREDS LEAP!" color="#ef4444" />
        <p className="hoh-qtext">100, 200, 300, ___ — what comes next in the hundreds sequence?</p>
        <TileSequence items={[100, 200, 300, '?']} />
        <div className="hoh-opts">
          {ctx.shuffledOpts.map(([v, d], i) => (
            <HOHOption key={v} value={v} displayText={d} letterIdx={i} onClick={() => lp.handleMcq('ngp_q5', v)} className={lp.getMcqClass('ngp_q5', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'ngp_q6',
    options: [['100','Jump of 100'],['10','Jump of 10'],['50','Jump of 50'],['200','Jump of 200']],
    meta: { type: 'mcq', qid: 'ngp_q6', correct: '100', correctLabel: 'Jump of 100',
      explanation: '200 − 100 = 100. Each step in the sequence 100, 200, 300, 400 increases by exactly 100. This is called counting by hundreds!' },
    render: (lp, ctx) => (
      <div className="hoh-qcard">
        <AchievementBadge icon="💯" label="JUMP SIZE!" color="#22c55e" />
        <p className="hoh-qtext">In the sequence 100, 200, 300, 400 — how much do the numbers jump each time?</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 4, margin: '12px 0', flexWrap: 'wrap', alignItems: 'center' }}>
          {[100,200,300,400].map((n, i) => (
            <React.Fragment key={n}>
              <div style={{ background: 'linear-gradient(135deg,#eff6ff,#dbeafe)', border: '2px solid #93c5fd', borderRadius: 10, padding: '6px 14px', fontFamily: "'Baloo 2',cursive", fontWeight: 800, color: '#1e40af', fontSize: '1rem' }}>{n}</div>
              {i < 3 && <div style={{ fontFamily: "'Baloo 2',cursive", fontWeight: 800, color: '#f59e0b', fontSize: '0.85rem', padding: '2px 6px', background: '#fef3c7', borderRadius: 6 }}>+?</div>}
            </React.Fragment>
          ))}
        </div>
        <div className="hoh-opts">
          {ctx.shuffledOpts.map(([v, d], i) => (
            <HOHOption key={v} value={v} displayText={d} letterIdx={i} onClick={() => lp.handleMcq('ngp_q6', v)} className={lp.getMcqClass('ngp_q6', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'ngp_q7',
    options: [['209','209'],['211','211'],['207','207'],['210','210']],
    meta: { type: 'mcq', qid: 'ngp_q7', correct: '209', correctLabel: '209',
      explanation: 'Clue 1: between 200 and 210 → could be 201–209. Clue 2: more than 208 → 209. So the mystery number is 209!' },
    render: (lp, ctx) => (
      <div className="hoh-qcard">
        <AchievementBadge icon="🚩" label="FLAG GAME 2!" color="#3b82f6" />
        <StoryBox emoji="🚩" text="Play the flag game again! Use the clues to find the mystery number." />
        <p className="hoh-qtext">Mystery number clues: Between 200 and 210. More than 208. What is the number?</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, margin: '12px 0', padding: '10px 14px', background: '#eff6ff', borderRadius: 12, border: '2px solid #bfdbfe' }}>
          <div style={{ fontFamily: "'Baloo 2',cursive", fontWeight: 700, color: '#1e40af', fontSize: '0.95rem' }}>🚩 Clue 1: Between 200 and 210</div>
          <div style={{ fontFamily: "'Baloo 2',cursive", fontWeight: 700, color: '#1e40af', fontSize: '0.95rem' }}>🚩 Clue 2: More than 208</div>
        </div>
        <div className="hoh-opts">
          {ctx.shuffledOpts.map(([v, d], i) => (
            <HOHOption key={v} value={v} displayText={d} letterIdx={i} onClick={() => lp.handleMcq('ngp_q7', v)} className={lp.getMcqClass('ngp_q7', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'ngp_q8',
    meta: { type: 'tf', qid: 'ngp_q8_tf', correct: true, correctLabel: 'True',
      explanation: 'Yes! The Magical Count works for every number. Try any number — it always ends at FOUR because FOUR has exactly 4 letters and 4 → FOUR → 4 letters → loops forever!' },
    render: (lp) => (
      <div className="hoh-qcard">
        <AchievementBadge icon="🎯" label="TRUE OR FALSE?" color="#7c3aed" />
        <p className="hoh-qtext">The Magical Count works for every number — it always ends at FOUR. True or False?</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 8, margin: '12px 0', alignItems: 'center' }}>
          {['ANY NUMBER','→','...','→','FOUR','→','FOUR','→','...'].map((t, i) => (
            <span key={i} style={{ fontFamily: "'Baloo 2',cursive", fontWeight: t === 'FOUR' ? 900 : 700, color: t === 'FOUR' ? '#7c3aed' : '#64748b', fontSize: t === 'FOUR' ? '1rem' : '0.85rem' }}>{t}</span>
          ))}
        </div>
        <HOHTFButtons qid="ngp_q8_tf" lp={lp} />
      </div>
    ),
  },
  {
    id: 'ngp_q9',
    options: [['SIX','SIX (3 letters)'],['FOUR','FOUR (4 letters)'],['FIVE','FIVE (4 letters)'],['THREE','THREE (5 letters)']],
    meta: { type: 'mcq', qid: 'ngp_q9', correct: 'FIVE', correctLabel: 'FIVE (4 letters)',
      explanation: 'THREE has 5 letters → FIVE has 4 letters → FOUR has 4 letters → loops. Wait — THREE→FIVE→FOUR. Actually FIVE(4 letters)→FOUR. So after THREE comes FIVE!' },
    render: (lp, ctx) => (
      <div className="hoh-qcard">
        <AchievementBadge icon="✨" label="MAGICAL CHAIN!" color="#f59e0b" />
        <p className="hoh-qtext">In the Magical Count: THREE (5 letters) → count 5 letters → what word comes next?</p>
        <div style={{ display: 'flex', gap: 8, justifyContent: 'center', margin: '12px 0', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ background: '#eff6ff', border: '2px solid #bfdbfe', borderRadius: 8, padding: '6px 14px', fontFamily: "'Baloo 2',cursive", fontWeight: 800, color: '#1e40af' }}>THREE</div>
          <span style={{ color: '#94a3b8', fontSize: '1.2rem' }}>→</span>
          <div style={{ background: '#f1f5f9', border: '2px solid #cbd5e1', borderRadius: 8, padding: '6px 14px', fontFamily: "'Baloo 2',cursive", fontWeight: 700, color: '#64748b' }}>5 letters</div>
          <span style={{ color: '#94a3b8', fontSize: '1.2rem' }}>→</span>
          <div style={{ background: '#fef3c7', border: '2.5px dashed #f59e0b', borderRadius: 8, padding: '6px 14px', fontFamily: "'Baloo 2',cursive", fontWeight: 800, color: '#d97706' }}>?</div>
        </div>
        <div className="hoh-opts">
          {ctx.shuffledOpts.map(([v, d], i) => (
            <HOHOption key={v} value={v} displayText={d} letterIdx={i} onClick={() => lp.handleMcq('ngp_q9', v)} className={lp.getMcqClass('ngp_q9', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'ngp_q10',
    meta: { type: 'tf', qid: 'ngp_q10_tf', correct: false, correctLabel: 'False',
      explanation: 'No! 100, 200, 300, 400 — the sequence increases by 100 each time, not by 10. 200 − 100 = 100, not 10.' },
    render: (lp) => (
      <div className="hoh-qcard">
        <AchievementBadge icon="🎯" label="TRUE OR FALSE?" color="#7c3aed" />
        <p className="hoh-qtext">In the sequence 100, 200, 300, 400 — the numbers increase by 10 each time. True or False?</p>
        <TileSequence items={[100, 200, 300, 400]} />
        <HOHTFButtons qid="ngp_q10_tf" lp={lp} />
      </div>
    ),
  },
  {
    id: 'ngp_q11',
    options: [['More than (>)','More than — mystery is bigger than your guess'],['Less than (<)','Less than — mystery is smaller than your guess'],['Equal (=)','Equal — you guessed it!'],['No flag','No direction shown']],
    meta: { type: 'mcq', qid: 'ngp_q11', correct: 'More than (>)', correctLabel: 'More than (>)',
      explanation: 'If the mystery number is 207 and you guessed 203, then 207 > 203. The flag shows "more than" — the mystery number is bigger than your guess, so count up!' },
    render: (lp, ctx) => (
      <div className="hoh-qcard">
        <AchievementBadge icon="🚩" label="FLAG RULES!" color="#14b8a6" />
        <StoryBox emoji="🚩" text="In the flag game: if the mystery number is BIGGER than your guess, which flag is shown?" />
        <p className="hoh-qtext">Mystery number: 207. Your guess: 203. Which flag does Teji show?</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 24, margin: '12px 0' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: "'Baloo 2',cursive", fontWeight: 900, fontSize: '2rem', color: '#22c55e' }}>207</div>
            <div style={{ fontFamily: "'Baloo 2',cursive", fontWeight: 700, fontSize: '0.85rem', color: '#64748b' }}>Mystery</div>
          </div>
          <div style={{ fontFamily: "'Baloo 2',cursive", fontWeight: 900, fontSize: '2rem', color: '#94a3b8', alignSelf: 'center' }}>vs</div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: "'Baloo 2',cursive", fontWeight: 900, fontSize: '2rem', color: '#ef4444' }}>203</div>
            <div style={{ fontFamily: "'Baloo 2',cursive", fontWeight: 700, fontSize: '0.85rem', color: '#64748b' }}>Guess</div>
          </div>
        </div>
        <div className="hoh-opts">
          {ctx.shuffledOpts.map(([v, d], i) => (
            <HOHOption key={v} value={v} displayText={d} letterIdx={i} onClick={() => lp.handleMcq('ngp_q11', v)} className={lp.getMcqClass('ngp_q11', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'ngp_q12',
    options: [['500','500'],['600','600'],['450','450'],['400','400']],
    meta: { type: 'mcq', qid: 'ngp_q12', correct: '500', correctLabel: '500',
      explanation: '100, 200, 300, 400, 500 — counting by hundreds. After 400 comes 500. Each step adds 100 more!' },
    render: (lp, ctx) => (
      <div className="hoh-qcard">
        <AchievementBadge icon="💯" label="WHAT COMES NEXT?" color="#ef4444" />
        <p className="hoh-qtext">100, 200, 300, 400, ___ — what comes next in the hundreds?</p>
        <TileSequence items={[100, 200, 300, 400, '?']} />
        <div className="hoh-opts">
          {ctx.shuffledOpts.map(([v, d], i) => (
            <HOHOption key={v} value={v} displayText={d} letterIdx={i} onClick={() => lp.handleMcq('ngp_q12', v)} className={lp.getMcqClass('ngp_q12', v)} />
          ))}
        </div>
      </div>
    ),
  },
];

const NumberGamesPatterns = () => {
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
  return <HOHPracticeTemplate skillId="HOH-05" skillName="Number Games & Patterns" questions={questions} questionMeta={questionMeta} logicProps={logicProps} />;
};

export default NumberGamesPatterns;
