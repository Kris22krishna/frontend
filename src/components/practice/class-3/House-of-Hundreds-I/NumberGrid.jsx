import React, { useRef } from 'react';
import { useHOHLogic } from './useHOHLogic';
import HOHPracticeTemplate from './HOHPracticeTemplate';
import { HOHOption, HOHTFButtons, AchievementBadge, StoryBox, HOHMatchLayout, shuffle } from './HOHSharedComponents';
import './house-of-hundreds.css';

// NCERT Maths Mela Class 3 — Chapter 6 (pp. 73–75)
// Topic: Number Grid (Apartment) — Hop Hundreds Home, floor/column identification, number riddles

// Mini apartment grid component (10 cols × rows)
const ApartmentGrid = ({ highlight = [], missing = [], start = 201, rows = 5 }) => {
  const cells = [];
  for (let r = 0; r < rows; r++) {
    const rowCells = [];
    for (let c = 0; c < 10; c++) {
      const n = start + r * 10 + c;
      const isHL = highlight.includes(n);
      const isMiss = missing.includes(n);
      rowCells.push(
        <div key={c} className={`hoh-grid-cell${isHL ? ' hoh-grid-shaded' : ''}${isMiss ? ' hoh-grid-missing' : ''}`}>
          {isMiss ? '?' : n}
        </div>
      );
    }
    cells.push(<div key={r} className="hoh-grid-row">{rowCells}</div>);
  }
  return (
    <div className="hoh-grid-wrap">
      <div className="hoh-grid">{cells}</div>
    </div>
  );
};

const MATCH_ANSWERS = {
  ng_match1: { 'ng_m1': '159', 'ng_m2': '400', 'ng_m3': '303' },
};

const QUESTION_POOL = [
  {
    id: 'ng_q1',
    options: [['1st floor, column 3','1st floor, column 3 (House 13)'],['3rd floor, column 1','3rd floor, column 1'],['1st floor, column 1','1st floor, column 1'],['2nd floor, column 3','2nd floor, column 3']],
    meta: { type: 'mcq', qid: 'ng_q1', correct: '1st floor, column 3', correctLabel: '1st floor, column 3',
      explanation: 'In the apartment grid (Hop Hundreds Home), House 13 means: tens digit = floor number = 1st floor. Ones digit = column = column 3. So House 13 is on the 1st floor, column 3!' },
    render: (lp, ctx) => (
      <div className="hoh-qcard">
        <AchievementBadge icon="🏠" label="HOP HUNDREDS HOME!" color="#3b82f6" />
        <StoryBox emoji="🏠" text="The Hop Hundreds Home is an apartment building! Each room has a number. The tens digit = floor. The ones digit = column." />
        <p className="hoh-qtext">In the Hop Hundreds Home, where is room number 13?</p>
        <ApartmentGrid highlight={[213]} start={201} rows={3} />
        <div className="hoh-opts">
          {ctx.shuffledOpts.map(([v, d], i) => (
            <HOHOption key={v} value={v} displayText={d} letterIdx={i} onClick={() => lp.handleMcq('ng_q1', v)} className={lp.getMcqClass('ng_q1', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'ng_q2',
    options: [['159','159'],['195','195'],['519','519'],['915','915']],
    meta: { type: 'mcq', qid: 'ng_q2', correct: '159', correctLabel: '159',
      explanation: 'Clues: digits are 9, 1, 5. Less than 200, so hundreds digit = 1. Has 9 ones → ones digit = 9. Remaining digit = 5 → tens. So the number is 159!' },
    render: (lp, ctx) => (
      <div className="hoh-qcard">
        <AchievementBadge icon="🧩" label="NUMBER RIDDLE!" color="#7c3aed" />
        <StoryBox emoji="🧩" text="Solve the riddle to find the mystery number in the grid!" />
        <p className="hoh-qtext">Riddle: I use only the digits 9, 1, and 5. I am less than 200. I have 9 ones. What number am I?</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, margin: '12px 0', padding: '10px 14px', background: '#f5f3ff', borderRadius: 12, border: '2px solid #c4b5fd' }}>
          <div style={{ fontFamily: "'Baloo 2',cursive", fontWeight: 700, color: '#4c1d95', fontSize: '0.95rem' }}>🔢 My digits: 9, 1, 5</div>
          <div style={{ fontFamily: "'Baloo 2',cursive", fontWeight: 700, color: '#4c1d95', fontSize: '0.95rem' }}>📏 I am less than 200</div>
          <div style={{ fontFamily: "'Baloo 2',cursive", fontWeight: 700, color: '#4c1d95', fontSize: '0.95rem' }}>🔢 I have 9 ones</div>
        </div>
        <div className="hoh-opts">
          {ctx.shuffledOpts.map(([v, d], i) => (
            <HOHOption key={v} value={v} displayText={d} letterIdx={i} onClick={() => lp.handleMcq('ng_q2', v)} className={lp.getMcqClass('ng_q2', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'ng_q3',
    options: [['400','400'],['440','440'],['404','404'],['044','44']],
    meta: { type: 'mcq', qid: 'ng_q3', correct: '400', correctLabel: '400',
      explanation: 'Only digits 4 and 0. A 3-digit number using 4 and 0: 400 (4 hundreds, 0 tens, 0 ones). 400 uses only 4 and 0!' },
    render: (lp, ctx) => (
      <div className="hoh-qcard">
        <AchievementBadge icon="🧩" label="NUMBER RIDDLE 2!" color="#ef4444" />
        <p className="hoh-qtext">Riddle: I am a 3-digit number. I use only the digits 4 and 0. What number am I?</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, margin: '12px 0', padding: '10px 14px', background: '#fef2f2', borderRadius: 12, border: '2px solid #fca5a5' }}>
          <div style={{ fontFamily: "'Baloo 2',cursive", fontWeight: 700, color: '#991b1b', fontSize: '0.95rem' }}>🔢 I use only digits: 4 and 0</div>
          <div style={{ fontFamily: "'Baloo 2',cursive", fontWeight: 700, color: '#991b1b', fontSize: '0.95rem' }}>📏 I am a 3-digit number</div>
        </div>
        <div className="hoh-opts">
          {ctx.shuffledOpts.map(([v, d], i) => (
            <HOHOption key={v} value={v} displayText={d} letterIdx={i} onClick={() => lp.handleMcq('ng_q3', v)} className={lp.getMcqClass('ng_q3', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'ng_q4',
    options: [['303','303'],['300','300'],['330','330'],['033','33']],
    meta: { type: 'mcq', qid: 'ng_q4', correct: '303', correctLabel: '303',
      explanation: 'Between 300 and 400, so hundreds digit = 3. No tens (0 tens). No ones... wait — "hundreds = ones digit"? 3 hundreds, 0 tens, 3 ones = 303. That fits: >300, <400, 0 tens, hundreds digit = ones digit.' },
    render: (lp, ctx) => (
      <div className="hoh-qcard">
        <AchievementBadge icon="🧩" label="NUMBER RIDDLE 3!" color="#22c55e" />
        <p className="hoh-qtext">Riddle: I am more than 300 but less than 400. I have no tens and no ones... but my hundreds digit equals my ones digit! What am I?</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, margin: '12px 0', padding: '10px 14px', background: '#f0fdf4', borderRadius: 12, border: '2px solid #86efac' }}>
          <div style={{ fontFamily: "'Baloo 2',cursive", fontWeight: 700, color: '#166534', fontSize: '0.95rem' }}>📏 More than 300, less than 400</div>
          <div style={{ fontFamily: "'Baloo 2',cursive", fontWeight: 700, color: '#166534', fontSize: '0.95rem' }}>🔢 0 tens</div>
          <div style={{ fontFamily: "'Baloo 2',cursive", fontWeight: 700, color: '#166534', fontSize: '0.95rem' }}>✨ Hundreds digit = ones digit</div>
        </div>
        <div className="hoh-opts">
          {ctx.shuffledOpts.map(([v, d], i) => (
            <HOHOption key={v} value={v} displayText={d} letterIdx={i} onClick={() => lp.handleMcq('ng_q4', v)} className={lp.getMcqClass('ng_q4', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'ng_q5',
    options: [['Row 3 (301–310)','Row 3 (301–310)'],['Row 1 (281–290)','Row 1 (281–290)'],['Row 2 (291–300)','Row 2 (291–300)'],['Row 4 (311–320)','Row 4 (311–320)']],
    meta: { type: 'mcq', qid: 'ng_q5', correct: 'Row 3 (301–310)', correctLabel: 'Row 3 (301–310)',
      explanation: 'In the number grid, 303 falls in the row containing 301 to 310. That is the 3rd row if the grid starts at 281 (rows of 10 each).' },
    render: (lp, ctx) => (
      <div className="hoh-qcard">
        <AchievementBadge icon="🏠" label="FIND THE FLOOR!" color="#f59e0b" />
        <p className="hoh-qtext">In the Hop Hundreds Home grid, which row (group of 10) contains the number 303?</p>
        <ApartmentGrid highlight={[303]} start={281} rows={5} />
        <div className="hoh-opts">
          {ctx.shuffledOpts.map(([v, d], i) => (
            <HOHOption key={v} value={v} displayText={d} letterIdx={i} onClick={() => lp.handleMcq('ng_q5', v)} className={lp.getMcqClass('ng_q5', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'ng_q6',
    meta: { type: 'tf', qid: 'ng_q6_tf', correct: true, correctLabel: 'True',
      explanation: 'Yes! In the grid, each row has exactly 10 numbers. So 310 and 320 are 10 apart — they are in the same column (column 0 = 10s position) but different rows.' },
    render: (lp) => (
      <div className="hoh-qcard">
        <AchievementBadge icon="🎯" label="TRUE OR FALSE?" color="#7c3aed" />
        <p className="hoh-qtext">In the Hop Hundreds Home number grid, each row contains exactly 10 numbers. True or False?</p>
        <ApartmentGrid start={301} rows={3} />
        <HOHTFButtons qid="ng_q6_tf" lp={lp} />
      </div>
    ),
  },
  {
    id: 'ng_q7',
    options: [['251','251'],['261','261'],['241','241'],['271','271']],
    meta: { type: 'mcq', qid: 'ng_q7', correct: '251', correctLabel: '251',
      explanation: 'In the grid, the number directly below 241 is 10 more = 251. Moving down one row always adds 10!' },
    render: (lp, ctx) => (
      <div className="hoh-qcard">
        <AchievementBadge icon="⬇️" label="ONE ROW DOWN!" color="#3b82f6" />
        <StoryBox emoji="🏠" text="In the apartment grid, moving one floor down adds 10 to the number." />
        <p className="hoh-qtext">What number is directly below 241 in the grid?</p>
        <ApartmentGrid highlight={[241]} missing={[251]} start={231} rows={4} />
        <div className="hoh-opts">
          {ctx.shuffledOpts.map(([v, d], i) => (
            <HOHOption key={v} value={v} displayText={d} letterIdx={i} onClick={() => lp.handleMcq('ng_q7', v)} className={lp.getMcqClass('ng_q7', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'ng_q8',
    options: [['312','312'],['313','313'],['311','311'],['321','321']],
    meta: { type: 'mcq', qid: 'ng_q8', correct: '312', correctLabel: '312',
      explanation: 'In the grid, the number directly to the right of 311 is 1 more = 312. Moving right always adds 1!' },
    render: (lp, ctx) => (
      <div className="hoh-qcard">
        <AchievementBadge icon="➡️" label="ONE STEP RIGHT!" color="#22c55e" />
        <StoryBox emoji="🏠" text="In the apartment grid, moving one step right adds 1 to the number." />
        <p className="hoh-qtext">What number is directly to the right of 311 in the grid?</p>
        <ApartmentGrid highlight={[311]} missing={[312]} start={301} rows={2} />
        <div className="hoh-opts">
          {ctx.shuffledOpts.map(([v, d], i) => (
            <HOHOption key={v} value={v} displayText={d} letterIdx={i} onClick={() => lp.handleMcq('ng_q8', v)} className={lp.getMcqClass('ng_q8', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'ng_q9',
    rightItems: [['159','159'],['400','400'],['303','303']],
    matchAnswers: { ng_match1: { 'ng_m1': '159', 'ng_m2': '400', 'ng_m3': '303' } },
    meta: { type: 'match', totalPairs: 3, explanation: 'Riddle 1: digits 9,1,5 <200 with 9 ones = 159. Riddle 2: only 4 and 0 = 400. Riddle 3: >300 <400, 0 tens, hundreds=ones = 303.', correctLabel: 'All matched!' },
    render: (lp, ctx) => (
      <div className="hoh-qcard">
        <AchievementBadge icon="🔗" label="MATCH THE RIDDLES!" color="#7c3aed" />
        <p className="hoh-qtext">Match each riddle to its mystery number!</p>
        <HOHMatchLayout
          matchId="ng_match1"
          leftItems={[
            ['ng_m1', 'Digits 9,1,5 · <200 · 9 ones'],
            ['ng_m2', 'Only digits 4 & 0 · 3-digit'],
            ['ng_m3', '>300 <400 · 0 tens · H=O'],
          ]}
          shuffledRight={ctx.shuffledRight}
          lp={lp}
        />
      </div>
    ),
  },
  {
    id: 'ng_q10',
    meta: { type: 'tf', qid: 'ng_q10_tf', correct: false, correctLabel: 'False',
      explanation: 'No! Moving right in the grid adds 1 (not 10). Moving down adds 10. So 312 → move right → 313 (not 322).' },
    render: (lp) => (
      <div className="hoh-qcard">
        <AchievementBadge icon="🎯" label="TRUE OR FALSE?" color="#7c3aed" />
        <StoryBox emoji="🏠" text="Think about the apartment grid rules!" />
        <p className="hoh-qtext">In the Hop Hundreds Home grid, moving one step to the right from 312 gives you 322. True or False?</p>
        <ApartmentGrid highlight={[312]} start={301} rows={2} />
        <HOHTFButtons qid="ng_q10_tf" lp={lp} />
      </div>
    ),
  },
  {
    id: 'ng_q11',
    options: [['423','423'],['432','432'],['342','342'],['234','234']],
    meta: { type: 'mcq', qid: 'ng_q11', correct: '423', correctLabel: '423',
      explanation: 'Clues: digits 4, 2, 3. More than 400 so hundreds=4. More than 420 so tens digit > 2, so tens=2 is okay (420 < 423 < 424). 3 ones. So 423!' },
    render: (lp, ctx) => (
      <div className="hoh-qcard">
        <AchievementBadge icon="🧩" label="NUMBER RIDDLE 4!" color="#14b8a6" />
        <p className="hoh-qtext">Riddle: I use the digits 4, 2, and 3. I am more than 400. I am more than 420. I have 3 ones. What number am I?</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, margin: '12px 0', padding: '10px 14px', background: '#f0fdfa', borderRadius: 12, border: '2px solid #99f6e4' }}>
          <div style={{ fontFamily: "'Baloo 2',cursive", fontWeight: 700, color: '#134e4a', fontSize: '0.95rem' }}>🔢 My digits: 4, 2, 3</div>
          <div style={{ fontFamily: "'Baloo 2',cursive", fontWeight: 700, color: '#134e4a', fontSize: '0.95rem' }}>📏 More than 400 and more than 420</div>
          <div style={{ fontFamily: "'Baloo 2',cursive", fontWeight: 700, color: '#134e4a', fontSize: '0.95rem' }}>🔢 I have 3 ones</div>
        </div>
        <div className="hoh-opts">
          {ctx.shuffledOpts.map(([v, d], i) => (
            <HOHOption key={v} value={v} displayText={d} letterIdx={i} onClick={() => lp.handleMcq('ng_q11', v)} className={lp.getMcqClass('ng_q11', v)} />
          ))}
        </div>
      </div>
    ),
  },
];

const NumberGrid = () => {
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
  return <HOHPracticeTemplate skillId="HOH-07" skillName="Number Grid — Hop Hundreds Home" questions={questions} questionMeta={questionMeta} logicProps={logicProps} />;
};

export default NumberGrid;
