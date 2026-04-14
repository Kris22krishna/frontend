import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { useDCLogic } from './useDCLogic';
import DCPracticeTemplate from './DCPracticeTemplate';
import { HTODisplay, DCOption, DCTFButtons, StoryBox, AchievementBadge, shuffle } from './DCSharedComponents';
import './double-century.css';

const QUESTION_POOL = [
  {
    id: 'pv_q1',
    meta: { type: 'mcq', qid: 'pv_q1', correct: '1', explanation: '135 → H=1, T=3, O=5. The hundreds digit is 1!', correctLabel: '1' },
    render: (lp) => (
      <div className="dc-qcard dc-s6">
        <AchievementBadge icon="🔍" label="DETECTIVE RAJU" color="#1d4ed8" />
        <StoryBox emoji="🕵️" text="Detective Raju is cracking a number code! What is the HUNDREDS digit hiding in 135?" color="#eff6ff" border="#1d4ed8" />
        <p className="dc-qtext">🔢 What is the <strong>hundreds digit</strong> of 135?</p>
        <HTODisplay number={135} highlightCol="H" />
        <div className="dc-opts">
          {[['3','A'],['5','B'],['1','C'],['13','D']].map(([v,l],i) => (
            <DCOption key={v} value={v} label={l} index={i} onClick={() => lp.handleMcq('pv_q1', v)} className={lp.getMcqClass('pv_q1', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'pv_q2',
    meta: { type: 'mcq', qid: 'pv_q2', correct: '4', explanation: '147 → H=1, T=4, O=7. The tens digit is 4, which means 4 tens = 40!', correctLabel: '4' },
    render: (lp) => (
      <div className="dc-qcard dc-s6">
        <AchievementBadge icon="🔍" label="DETECTIVE RAJU" color="#1d4ed8" />
        <StoryBox emoji="🕵️" text="Raju examines 147. The TENS digit is highlighted — it holds a clue! What is it?" color="#eff6ff" border="#1d4ed8" />
        <p className="dc-qtext">🔢 What is the <strong>tens digit</strong> of 147?</p>
        <HTODisplay number={147} highlightCol="T" />
        <div className="dc-opts">
          {[['1','A'],['4','B'],['7','C'],['14','D']].map(([v,l],i) => (
            <DCOption key={v} value={v} label={l} index={i} onClick={() => lp.handleMcq('pv_q2', v)} className={lp.getMcqClass('pv_q2', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'pv_q3',
    meta: { type: 'mcq', qid: 'pv_q3', correct: '8', explanation: '128 → H=1, T=2, O=8. The ones digit is 8!', correctLabel: '8' },
    render: (lp) => (
      <div className="dc-qcard dc-s6">
        <AchievementBadge icon="🔍" label="DETECTIVE RAJU" color="#1d4ed8" />
        <StoryBox emoji="🕵️" text="The final digit in 128 is the ONES. Raju needs it to unlock the safe! What is the ones digit?" color="#eff6ff" border="#1d4ed8" />
        <p className="dc-qtext">🔢 What is the <strong>ones digit</strong> of 128?</p>
        <HTODisplay number={128} highlightCol="O" />
        <div className="dc-opts">
          {[['2','A'],['1','B'],['12','C'],['8','D']].map(([v,l],i) => (
            <DCOption key={v} value={v} label={l} index={i} onClick={() => lp.handleMcq('pv_q3', v)} className={lp.getMcqClass('pv_q3', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'pv_q4',
    meta: { type: 'tf', qid: 'pv_q4_tf', correct: true, explanation: '119 → H=1, T=1, O=9. Yes! The tens digit is 1 (meaning 1 ten = 10).', correctLabel: 'True' },
    render: (lp) => (
      <div className="dc-qcard dc-s6">
        <AchievementBadge icon="🎯" label="TRUE OR FALSE?" color="#7c3aed" />
        <StoryBox emoji="🕵️" text="Raju says: In 119, the tens digit is 1. His partner disagrees! Who is right?" color="#f0fdf4" border="#16a34a" />
        <p className="dc-qtext">In <strong>119</strong>, the tens digit is <strong>1</strong>. True or False?</p>
        <HTODisplay number={119} highlightCol="T" />
        <DCTFButtons qid="pv_q4_tf" lp={lp} />
      </div>
    ),
  },
  {
    id: 'pv_q5',
    meta: { type: 'mcq', qid: 'pv_q5', correct: '136', explanation: '1×100 + 3×10 + 6×1 = 100 + 30 + 6 = 136!', correctLabel: '136' },
    render: (lp) => (
      <div className="dc-qcard dc-s6">
        <AchievementBadge icon="🧩" label="BUILD THE NUMBER" color="#0891b2" />
        <StoryBox emoji="🕵️" text="Raju has 3 clues: H=1, T=3, O=6. He must assemble them into a number. What is it?" color="#ecfeff" border="#0891b2" />
        <p className="dc-qtext">H = 1, T = 3, O = 6 → What number? 🔢</p>
        <HTODisplay number={136} />
        <div className="dc-opts">
          {[['163','A'],['316','B'],['613','C'],['136','D']].map(([v,l],i) => (
            <DCOption key={v} value={v} label={l} index={i} onClick={() => lp.handleMcq('pv_q5', v)} className={lp.getMcqClass('pv_q5', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'pv_q6',
    meta: { type: 'mcq', qid: 'pv_q6', correct: '100+20+4', explanation: '124 = 1 hundred + 2 tens + 4 ones = 100 + 20 + 4!', correctLabel: '100+20+4' },
    render: (lp) => (
      <div className="dc-qcard dc-s6">
        <AchievementBadge icon="📤" label="EXPAND IT!" color="#d97706" />
        <StoryBox emoji="🕵️" text="Raju explodes 124 into its parts! Which is the correct expanded form?" color="#fefce8" border="#d97706" />
        <p className="dc-qtext">📤 Expanded form of <strong>124</strong>?</p>
        <HTODisplay number={124} />
        <div className="dc-opts" style={{ flexDirection: 'column' }}>
          {[['100+24','A'],['100+20+4','B'],['1+2+4','C'],['10+20+4','D']].map(([v,l],i) => (
            <DCOption key={v} value={v} label={l} index={i} onClick={() => lp.handleMcq('pv_q6', v)} className={lp.getMcqClass('pv_q6', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'pv_q7',
    meta: { type: 'tf', qid: 'pv_q7_tf', correct: true, explanation: '100 + 40 + 5 = 145. H=1, T=4, O=5. Yes, that is correct!', correctLabel: 'True' },
    render: (lp) => (
      <div className="dc-qcard dc-s6">
        <AchievementBadge icon="🎯" label="TRUE OR FALSE?" color="#7c3aed" />
        <StoryBox emoji="🕵️" text="Raju's final check: 100 + 40 + 5 = 145. His H-T-O table says it's right. Is it?" color="#f0fdf4" border="#16a34a" />
        <p className="dc-qtext">100 + 40 + 5 = <strong>145</strong>. True or False?</p>
        <HTODisplay number={145} />
        <DCTFButtons qid="pv_q7_tf" lp={lp} />
      </div>
    ),
  },
  {
    id: 'pv_q8',
    meta: { type: 'mcq', qid: 'pv_q8', correct: '30', explanation: '138 → the digit 3 is in the tens place. 3 tens = 30!', correctLabel: '30' },
    render: (lp) => (
      <div className="dc-qcard dc-s6">
        <AchievementBadge icon="💎" label="DIGIT VALUE" color="#7c3aed" />
        <StoryBox emoji="🕵️" text="In 138, the digit 3 looks small — but its VALUE is much bigger! What is the true value of 3 here?" color="#eff6ff" border="#1d4ed8" />
        <p className="dc-qtext">🔍 In 138, what is the <strong>value</strong> of digit 3?</p>
        <HTODisplay number={138} highlightCol="T" />
        <div className="dc-opts">
          {[['3','A'],['300','B'],['30','C'],['13','D']].map(([v,l],i) => (
            <DCOption key={v} value={v} label={l} index={i} onClick={() => lp.handleMcq('pv_q8', v)} className={lp.getMcqClass('pv_q8', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'pv_q9',
    meta: { type: 'mcq', qid: 'pv_q9', correct: '109', explanation: 'H=1, T=0, O=9 → 100 + 0 + 9 = 109!', correctLabel: '109' },
    render: (lp) => (
      <div className="dc-qcard dc-s6">
        <AchievementBadge icon="🧩" label="BUILD THE NUMBER" color="#0891b2" />
        <StoryBox emoji="🕵️" text="New clues for Raju: H=1, T=0, O=9. Be careful — zero in the middle is a tricky clue!" color="#ecfeff" border="#0891b2" />
        <p className="dc-qtext">H = 1, T = 0, O = 9 → which number? 🔢</p>
        <HTODisplay number={109} />
        <div className="dc-opts">
          {[['190','A'],['109','B'],['019','C'],['901','D']].map(([v,l],i) => (
            <DCOption key={v} value={v} label={l} index={i} onClick={() => lp.handleMcq('pv_q9', v)} className={lp.getMcqClass('pv_q9', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'pv_q10',
    matchAnswers: { pv_match10: { 'pv_112': 'H=1, T=1, O=2', 'pv_130': 'H=1, T=3, O=0', 'pv_105': 'H=1, T=0, O=5', 'pv_148': 'H=1, T=4, O=8' } },
    rightItems: [['H=1, T=1, O=2','H=1, T=1, O=2'],['H=1, T=3, O=0','H=1, T=3, O=0'],['H=1, T=0, O=5','H=1, T=0, O=5'],['H=1, T=4, O=8','H=1, T=4, O=8']],
    meta: { type: 'match', totalPairs: 4, explanation: '112→H1T1O2, 130→H1T3O0, 105→H1T0O5, 148→H1T4O8. Case closed!', correctLabel: 'All matched!' },
    render: (lp, ctx) => (
      <div className="dc-qcard dc-s6">
        <AchievementBadge icon="🔗" label="MATCH THE CODE" color="#1d4ed8" />
        <StoryBox emoji="🕵️" text="Raju's final case! Match each number to its secret H-T-O code to solve the mystery!" color="#eff6ff" border="#1d4ed8" />
        <p className="dc-qtext">Match each number to its H-T-O values! 🎯</p>
        <div className="dc-match-wrap">
          <div className="dc-match-col">
            {[['pv_112','112'],['pv_130','130'],['pv_105','105'],['pv_148','148']].map(([val, label], i) => (
              <motion.div key={val} initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }}
                onClick={() => lp.handleMatch('pv_match10','left',val)} className={`dc-match-item ${lp.getMatchClass('pv_match10','left',val)}`}>{label}</motion.div>
            ))}
          </div>
          <div className="dc-match-center">{[0,1,2,3].map(i => <div key={i} className="dc-match-line">→</div>)}</div>
          <div className="dc-match-col" style={{ fontSize: '0.75rem' }}>
            {ctx.shuffledRight.map(([val, label], i) => (
              <motion.div key={val} initial={{ opacity: 0, x: 15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }}
                onClick={() => lp.handleMatch('pv_match10','right',val)} className={`dc-match-item ${lp.getMatchClass('pv_match10','right',val)}`}>{label}</motion.div>
            ))}
          </div>
        </div>
      </div>
    ),
  },
];

const PlaceValue = () => {
  const selRef = useRef(null);
  if (!selRef.current) {
    selRef.current = shuffle([...QUESTION_POOL]).slice(0, 5).map(q =>
      q.rightItems ? { ...q, shuffledRight: shuffle([...q.rightItems]) } : q
    );
  }
  const selected = selRef.current;
  const matchAnswers = {};
  selected.forEach(q => { if (q.matchAnswers) Object.assign(matchAnswers, q.matchAnswers); });
  const logicProps = useDCLogic(matchAnswers);
  const questions = selected.map(q => <React.Fragment key={q.id}>{q.render(logicProps, q)}</React.Fragment>);
  const questionMeta = selected.map(q => q.meta);
  return <DCPracticeTemplate skillId="DC-06" skillName="Place Value (H-T-O)" questions={questions} questionMeta={questionMeta} logicProps={logicProps} />;
};

export default PlaceValue;
