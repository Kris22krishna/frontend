import React, { useRef } from 'react';
import { useHOHLogic } from './useHOHLogic';
import HOHPracticeTemplate from './HOHPracticeTemplate';
import { HOHOption, HOHTFButtons, AchievementBadge, TileSequence, StoryBox, shuffle } from './HOHSharedComponents';
import './house-of-hundreds.css';

// NCERT Maths Mela Class 3 — Chapter 6 (pp. 71–72)
// Topic: Large Numbers in Context — Sweet shop: mysore pak trays, laddoos, number line 413–500

const QUESTION_POOL = [
  {
    id: 'lnc_q1',
    options: [['100','100 pieces'],['50','50 pieces'],['10','10 pieces'],['200','200 pieces']],
    meta: { type: 'mcq', qid: 'lnc_q1', correct: '100', correctLabel: '100 pieces',
      explanation: 'Each tray in the sweet shop holds exactly 100 pieces of Mysore pak. 1 tray = 100 sweets!' },
    render: (lp, ctx) => (
      <div className="hoh-qcard">
        <AchievementBadge icon="🍮" label="SWEET SHOP!" color="#f59e0b" />
        <StoryBox emoji="🍮" text="Ajji runs a sweet shop at the mela! She arranges Mysore pak (a sweet) in big trays." />
        <p className="hoh-qtext">Each tray in Ajji's sweet shop holds how many pieces of Mysore pak?</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 12, margin: '14px 0', flexWrap: 'wrap' }}>
          {[1,2,3].map(n => (
            <div key={n} style={{ background: 'linear-gradient(135deg,#fef3c7,#fde68a)', border: '2px solid #f59e0b', borderRadius: 12, padding: '12px 16px', textAlign: 'center', minWidth: 80 }}>
              <div style={{ fontSize: '1.8rem' }}>🍮</div>
              <div style={{ fontFamily: "'Baloo 2',cursive", fontWeight: 800, color: '#92400e', fontSize: '0.85rem' }}>Tray {n}</div>
              <div style={{ fontFamily: "'Baloo 2',cursive", fontWeight: 900, color: '#d97706', fontSize: '1.1rem' }}>= ?</div>
            </div>
          ))}
        </div>
        <div className="hoh-opts">
          {ctx.shuffledOpts.map(([v, d], i) => (
            <HOHOption key={v} value={v} displayText={d} letterIdx={i} onClick={() => lp.handleMcq('lnc_q1', v)} className={lp.getMcqClass('lnc_q1', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'lnc_q2',
    options: [['413','413 pieces'],['400','400 pieces'],['430','430 pieces'],['314','314 pieces']],
    meta: { type: 'mcq', qid: 'lnc_q2', correct: '413', correctLabel: '413 pieces',
      explanation: '4 full trays of 100 = 400. Then 13 extra pieces. So 400 + 13 = 413 pieces of Mysore pak altogether!' },
    render: (lp, ctx) => (
      <div className="hoh-qcard">
        <AchievementBadge icon="🍮" label="COUNT THE SWEETS!" color="#f59e0b" />
        <StoryBox emoji="🍮" text="Ajji has 4 full trays of Mysore pak (100 each), plus 13 extra pieces on the counter." />
        <p className="hoh-qtext">How many pieces of Mysore pak does Ajji have in total?</p>
        <div className="hoh-sentence"><span>4</span><span>×</span><span>100</span><span>+</span><span>13</span><span>=</span><span>?</span></div>
        <div className="hoh-opts">
          {ctx.shuffledOpts.map(([v, d], i) => (
            <HOHOption key={v} value={v} displayText={d} letterIdx={i} onClick={() => lp.handleMcq('lnc_q2', v)} className={lp.getMcqClass('lnc_q2', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'lnc_q3',
    options: [['87','87 more'],['100','100 more'],['13','13 more'],['50','50 more']],
    meta: { type: 'mcq', qid: 'lnc_q3', correct: '87', correctLabel: '87 more',
      explanation: '500 − 413 = 87. Ajji needs 87 more pieces to fill up to 500 (which is 5 full trays).' },
    render: (lp, ctx) => (
      <div className="hoh-qcard">
        <AchievementBadge icon="🍮" label="HOW MANY MORE?" color="#22c55e" />
        <p className="hoh-qtext">Ajji has 413 Mysore pak pieces. She wants exactly 500 pieces (5 full trays). How many more does she need?</p>
        <div className="hoh-sentence"><span>413</span><span>+</span><span>?</span><span>=</span><span>500</span></div>
        <div className="hoh-opts">
          {ctx.shuffledOpts.map(([v, d], i) => (
            <HOHOption key={v} value={v} displayText={d} letterIdx={i} onClick={() => lp.handleMcq('lnc_q3', v)} className={lp.getMcqClass('lnc_q3', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'lnc_q4',
    options: [['350','350 laddoos'],['300','300 laddoos'],['400','400 laddoos'],['250','250 laddoos']],
    meta: { type: 'mcq', qid: 'lnc_q4', correct: '350', correctLabel: '350 laddoos',
      explanation: '3 full trays of 100 = 300. Then 5 rows of 10 = 50. So 300 + 50 = 350 laddoos in all!' },
    render: (lp, ctx) => (
      <div className="hoh-qcard">
        <AchievementBadge icon="🟡" label="LADDOO COUNT!" color="#f59e0b" />
        <StoryBox emoji="🟡" text="Ajji also makes laddoos! They are stacked in trays of 100, with extra rows of 10." />
        <p className="hoh-qtext">3 full trays of 100 laddoos + 5 more rows of 10 laddoos = how many laddoos?</p>
        <div className="hoh-sentence"><span>300</span><span>+</span><span>50</span><span>=</span><span>?</span></div>
        <div className="hoh-opts">
          {ctx.shuffledOpts.map(([v, d], i) => (
            <HOHOption key={v} value={v} displayText={d} letterIdx={i} onClick={() => lp.handleMcq('lnc_q4', v)} className={lp.getMcqClass('lnc_q4', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'lnc_q5',
    options: [['500','500'],['400','400'],['413','413'],['450','450']],
    meta: { type: 'mcq', qid: 'lnc_q5', correct: '500', correctLabel: '500',
      explanation: 'On the number line from 413 to 500, the far right end is 500. Ajji wants to fill up to 500 pieces — that is 5 full trays!' },
    render: (lp, ctx) => (
      <div className="hoh-qcard">
        <AchievementBadge icon="📏" label="NUMBER LINE 413–500" color="#3b82f6" />
        <StoryBox emoji="📏" text="Ajji draws a number line to track her sweets from 413 to her target." />
        <p className="hoh-qtext">On the number line from 413 to Ajji's target of 5 full trays, what number is at the right end?</p>
        <div style={{ margin: '14px 0', padding: '12px', background: '#eff6ff', borderRadius: 12, border: '2px solid #bfdbfe', overflowX: 'auto' }}>
          <svg width="280" height="60" viewBox="0 0 280 60" style={{ display: 'block', margin: '0 auto' }}>
            <line x1="20" y1="30" x2="260" y2="30" stroke="#3b82f6" strokeWidth="3" />
            <polygon points="260,30 250,24 250,36" fill="#3b82f6" />
            <line x1="20" y1="22" x2="20" y2="38" stroke="#3b82f6" strokeWidth="2" />
            <text x="20" y="52" textAnchor="middle" fontFamily="Baloo 2,cursive" fontWeight="800" fontSize="12" fill="#1e40af">413</text>
            <line x1="260" y1="22" x2="260" y2="38" stroke="#ef4444" strokeWidth="2.5" />
            <text x="260" y="52" textAnchor="middle" fontFamily="Baloo 2,cursive" fontWeight="800" fontSize="12" fill="#ef4444">?</text>
            {[140].map(x => (
              <React.Fragment key={x}>
                <line x1={x} y1="25" x2={x} y2="35" stroke="#93c5fd" strokeWidth="1.5" />
              </React.Fragment>
            ))}
          </svg>
        </div>
        <div className="hoh-opts">
          {ctx.shuffledOpts.map(([v, d], i) => (
            <HOHOption key={v} value={v} displayText={d} letterIdx={i} onClick={() => lp.handleMcq('lnc_q5', v)} className={lp.getMcqClass('lnc_q5', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'lnc_q6',
    options: [['450','450'],['460','460'],['440','440'],['413','413']],
    meta: { type: 'mcq', qid: 'lnc_q6', correct: '450', correctLabel: '450',
      explanation: '413 is close to 400. The midpoint between 413 and 500 is about 456, but the exact halfway point between 400 and 500 is 450. 413 + 37 = 450 is roughly halfway.' },
    render: (lp, ctx) => (
      <div className="hoh-qcard">
        <AchievementBadge icon="📏" label="HALFWAY POINT!" color="#8b5cf6" />
        <p className="hoh-qtext">On the number line from 400 to 500, which number is exactly in the middle?</p>
        <div style={{ margin: '14px 0', overflowX: 'auto' }}>
          <svg width="280" height="70" viewBox="0 0 280 70" style={{ display: 'block', margin: '0 auto' }}>
            <line x1="20" y1="35" x2="260" y2="35" stroke="#8b5cf6" strokeWidth="3" />
            <polygon points="260,35 250,29 250,41" fill="#8b5cf6" />
            <line x1="20" y1="27" x2="20" y2="43" stroke="#8b5cf6" strokeWidth="2.5" />
            <text x="20" y="58" textAnchor="middle" fontFamily="Baloo 2,cursive" fontWeight="800" fontSize="12" fill="#4c1d95">400</text>
            <line x1="140" y1="25" x2="140" y2="45" stroke="#f59e0b" strokeWidth="2.5" strokeDasharray="4,3" />
            <text x="140" y="65" textAnchor="middle" fontFamily="Baloo 2,cursive" fontWeight="800" fontSize="12" fill="#d97706">?</text>
            <line x1="260" y1="27" x2="260" y2="43" stroke="#8b5cf6" strokeWidth="2.5" />
            <text x="260" y="58" textAnchor="middle" fontFamily="Baloo 2,cursive" fontWeight="800" fontSize="12" fill="#4c1d95">500</text>
          </svg>
        </div>
        <div className="hoh-opts">
          {ctx.shuffledOpts.map(([v, d], i) => (
            <HOHOption key={v} value={v} displayText={d} letterIdx={i} onClick={() => lp.handleMcq('lnc_q6', v)} className={lp.getMcqClass('lnc_q6', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'lnc_q7',
    meta: { type: 'tf', qid: 'lnc_q7_tf', correct: true, correctLabel: 'True',
      explanation: 'Yes! 4 trays × 100 each = 400. Plus the 13 extra = 413. So 413 = 4 full trays + 13 loose pieces. Correct!' },
    render: (lp) => (
      <div className="hoh-qcard">
        <AchievementBadge icon="🎯" label="TRUE OR FALSE?" color="#7c3aed" />
        <StoryBox emoji="🍮" text="Ajji counts her Mysore pak." />
        <p className="hoh-qtext">413 pieces of Mysore pak means 4 full trays of 100 and 13 extra pieces. True or False?</p>
        <div className="hoh-sentence"><span>4</span><span>×</span><span>100</span><span>+</span><span>13</span><span>=</span><span>413</span></div>
        <HOHTFButtons qid="lnc_q7_tf" lp={lp} />
      </div>
    ),
  },
  {
    id: 'lnc_q8',
    options: [['5','5 trays'],['4','4 trays'],['6','6 trays'],['3','3 trays']],
    meta: { type: 'mcq', qid: 'lnc_q8', correct: '5', correctLabel: '5 trays',
      explanation: '500 ÷ 100 = 5. If each tray holds 100, then 500 pieces fill exactly 5 trays. 5 × 100 = 500!' },
    render: (lp, ctx) => (
      <div className="hoh-qcard">
        <AchievementBadge icon="🍮" label="HOW MANY TRAYS?" color="#14b8a6" />
        <p className="hoh-qtext">Ajji has exactly 500 pieces of Mysore pak. Each tray holds 100 pieces. How many trays does she need?</p>
        <div className="hoh-sentence"><span>500</span><span>÷</span><span>100</span><span>=</span><span>?</span></div>
        <div className="hoh-opts">
          {ctx.shuffledOpts.map(([v, d], i) => (
            <HOHOption key={v} value={v} displayText={d} letterIdx={i} onClick={() => lp.handleMcq('lnc_q8', v)} className={lp.getMcqClass('lnc_q8', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'lnc_q9',
    options: [['Mysore pak','🍮 Mysore pak (413)'],['Laddoos','🟡 Laddoos (350)']],
    meta: { type: 'mcq', qid: 'lnc_q9', correct: 'Mysore pak', correctLabel: 'Mysore pak (413)',
      explanation: 'Mysore pak = 413, Laddoos = 350. Since 413 > 350, there are more pieces of Mysore pak!' },
    render: (lp, ctx) => (
      <div className="hoh-qcard">
        <AchievementBadge icon="🤔" label="WHICH IS MORE?" color="#ef4444" />
        <p className="hoh-qtext">Which sweet does Ajji have more of — Mysore pak (413) or Laddoos (350)?</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 24, margin: '14px 0', flexWrap: 'wrap' }}>
          <div style={{ textAlign: 'center', padding: '12px 20px', background: '#fef3c7', border: '2px solid #f59e0b', borderRadius: 14 }}>
            <div style={{ fontSize: '2rem' }}>🍮</div>
            <div style={{ fontFamily: "'Baloo 2',cursive", fontWeight: 900, color: '#d97706', fontSize: '1.5rem' }}>413</div>
          </div>
          <div style={{ fontFamily: "'Baloo 2',cursive", fontWeight: 900, fontSize: '1.8rem', color: '#94a3b8', alignSelf: 'center' }}>vs</div>
          <div style={{ textAlign: 'center', padding: '12px 20px', background: '#fffbeb', border: '2px solid #fde68a', borderRadius: 14 }}>
            <div style={{ fontSize: '2rem' }}>🟡</div>
            <div style={{ fontFamily: "'Baloo 2',cursive", fontWeight: 900, color: '#92400e', fontSize: '1.5rem' }}>350</div>
          </div>
        </div>
        <div className="hoh-opts">
          {ctx.shuffledOpts.map(([v, d], i) => (
            <HOHOption key={v} value={v} displayText={d} letterIdx={i} onClick={() => lp.handleMcq('lnc_q9', v)} className={lp.getMcqClass('lnc_q9', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'lnc_q10',
    meta: { type: 'tf', qid: 'lnc_q10_tf', correct: false, correctLabel: 'False',
      explanation: '350 laddoos is NOT more than 413 Mysore pak. 350 < 413. So laddoos are fewer than Mysore pak pieces.' },
    render: (lp) => (
      <div className="hoh-qcard">
        <AchievementBadge icon="🎯" label="TRUE OR FALSE?" color="#7c3aed" />
        <p className="hoh-qtext">Ajji has more laddoos (350) than Mysore pak pieces (413). True or False?</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 16, margin: '12px 0' }}>
          <div style={{ fontFamily: "'Baloo 2',cursive", fontWeight: 800, fontSize: '1.2rem', color: '#92400e' }}>🟡 350</div>
          <div style={{ fontFamily: "'Baloo 2',cursive", fontWeight: 700, fontSize: '1.1rem', color: '#94a3b8', alignSelf: 'center' }}>vs</div>
          <div style={{ fontFamily: "'Baloo 2',cursive", fontWeight: 800, fontSize: '1.2rem', color: '#d97706' }}>🍮 413</div>
        </div>
        <HOHTFButtons qid="lnc_q10_tf" lp={lp} />
      </div>
    ),
  },
  {
    id: 'lnc_q11',
    options: [['463','463'],['413','413'],['450','450'],['500','500']],
    meta: { type: 'mcq', qid: 'lnc_q11', correct: '463', correctLabel: '463',
      explanation: '413 + 50 = 463. If Ajji gets 50 more Mysore pak pieces, she now has 463 pieces in total.' },
    render: (lp, ctx) => (
      <div className="hoh-qcard">
        <AchievementBadge icon="🍮" label="MORE SWEETS!" color="#22c55e" />
        <StoryBox emoji="🍮" text="More Mysore pak arrives at Ajji's shop!" />
        <p className="hoh-qtext">Ajji has 413 pieces of Mysore pak. She gets 50 more pieces. How many does she have now?</p>
        <div className="hoh-sentence"><span>413</span><span>+</span><span>50</span><span>=</span><span>?</span></div>
        <div className="hoh-opts">
          {ctx.shuffledOpts.map(([v, d], i) => (
            <HOHOption key={v} value={v} displayText={d} letterIdx={i} onClick={() => lp.handleMcq('lnc_q11', v)} className={lp.getMcqClass('lnc_q11', v)} />
          ))}
        </div>
      </div>
    ),
  },
];

const LargeNumbersContext = () => {
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
  return <HOHPracticeTemplate skillId="HOH-06" skillName="Large Numbers in Context" questions={questions} questionMeta={questionMeta} logicProps={logicProps} />;
};

export default LargeNumbersContext;
