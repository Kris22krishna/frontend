import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { useDCLogic } from './useDCLogic';
import DCPracticeTemplate from './DCPracticeTemplate';
import { NumberLineDC, StonePath, DCOption, DCTFButtons, StoryBox, AchievementBadge, shuffle } from './DCSharedComponents';
import './double-century.css';

const QUESTION_POOL = [
  {
    id: 'jg_q1',
    meta: { type: 'mcq', qid: 'jg_q1', correct: '115', explanation: 'Jump by 5: 100, 105, 110, 115, 120. Each hop is 5 steps!', correctLabel: '115' },
    render: (lp) => (
      <div className="dc-qcard dc-s8">
        <AchievementBadge icon="🐸" label="FROG JUMP CHAMP!" color="#16a34a" />
        <StoryBox emoji="🐸" text="Tiku the frog jumps exactly 5 lily pads each time! He's at 110 and needs one more jump. Where does he land?" color="#f0fdf4" border="#16a34a" />
        <p className="dc-qtext">🐸 100 → 105 → 110 → ____? Jump by 5!</p>
        <StonePath numbers={[100, 105, 110, 0, 120]} highlight={0} />
        <div className="dc-opts">
          {[['111','A'],['112','B'],['115','C'],['119','D']].map(([v,l],i) => (
            <DCOption key={v} value={v} label={l} index={i} onClick={() => lp.handleMcq('jg_q1', v)} className={lp.getMcqClass('jg_q1', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'jg_q2',
    meta: { type: 'mcq', qid: 'jg_q2', correct: '140', explanation: 'Jump by 20: 100, 120, 140, 160. Each big jump is 20 steps!', correctLabel: '140' },
    render: (lp) => (
      <div className="dc-qcard dc-s8">
        <AchievementBadge icon="🦘" label="GIANT JUMP!" color="#7c3aed" />
        <StoryBox emoji="🦘" text="Kanga the kangaroo jumps 20 at a time! Starting from 100, she jumped to 120. One more big jump — where does she land?" color="#fdf4ff" border="#9333ea" />
        <p className="dc-qtext">🦘 100 → 120 → ____? Jump by 20!</p>
        <NumberLineDC start={100} end={200} step={20} highlight={160} jumpFrom={120} jumpTo={140} jumpSize={20} />
        <div className="dc-opts">
          {[['130','A'],['135','B'],['140','C'],['150','D']].map(([v,l],i) => (
            <DCOption key={v} value={v} label={l} index={i} onClick={() => lp.handleMcq('jg_q2', v)} className={lp.getMcqClass('jg_q2', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'jg_q3',
    meta: { type: 'tf', qid: 'jg_q3_tf', correct: true, explanation: '150, 155, 160, 165 — yes, each step is +5! Jump by 5 gives these numbers.', correctLabel: 'True' },
    render: (lp) => (
      <div className="dc-qcard dc-s8">
        <AchievementBadge icon="🎯" label="TRUE OR FALSE?" color="#7c3aed" />
        <StoryBox emoji="🐸" text="Tiku counts his jumps from 150: 150, 155, 160, 165. He says each jump is exactly 5. Is Tiku right?" color="#f0fdf4" border="#16a34a" />
        <p className="dc-qtext">Counting by 5 from 150: <strong>150, 155, 160, 165</strong>. Correct?</p>
        <StonePath numbers={[150, 155, 160, 165]} highlight={165} />
        <DCTFButtons qid="jg_q3_tf" lp={lp} />
      </div>
    ),
  },
  {
    id: 'jg_q4',
    meta: { type: 'mcq', qid: 'jg_q4', correct: '185', explanation: '175, 180, 185, 190 — jumping by 5 each time! Getting closer to 200!', correctLabel: '185' },
    render: (lp) => (
      <div className="dc-qcard dc-s8">
        <AchievementBadge icon="🐸" label="FROG JUMP CHAMP!" color="#16a34a" />
        <StoryBox emoji="🐸" text="Tiku is almost at 200! He's at 180 and takes one more jump of 5. Where does he land?" color="#f0fdf4" border="#16a34a" />
        <p className="dc-qtext">🐸 175 → 180 → ____? Jump by 5!</p>
        <StonePath numbers={[175, 180, 0, 190]} highlight={0} />
        <div className="dc-opts">
          {[['182','A'],['183','B'],['184','C'],['185','D']].map(([v,l],i) => (
            <DCOption key={v} value={v} label={l} index={i} onClick={() => lp.handleMcq('jg_q4', v)} className={lp.getMcqClass('jg_q4', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'jg_q5',
    meta: { type: 'mcq', qid: 'jg_q5', correct: '180', explanation: '100 + 20 + 20 + 20 + 20 = 180. Four jumps of 20 from 100!', correctLabel: '180' },
    render: (lp) => (
      <div className="dc-qcard dc-s8">
        <AchievementBadge icon="🦘" label="COUNT THE JUMPS" color="#7c3aed" />
        <StoryBox emoji="🦘" text="Kanga starts at 100 and makes FOUR jumps of 20 each. Where does she finish?" color="#fdf4ff" border="#9333ea" />
        <p className="dc-qtext">Start at 100 → make <strong>4 jumps of 20</strong> → land on?</p>
        <NumberLineDC start={100} end={200} step={20} highlight={180} jumpFrom={100} jumpTo={180} jumpSize={20} />
        <div className="dc-opts">
          {[['160','A'],['170','B'],['180','C'],['200','D']].map(([v,l],i) => (
            <DCOption key={v} value={v} label={l} index={i} onClick={() => lp.handleMcq('jg_q5', v)} className={lp.getMcqClass('jg_q5', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'jg_q6',
    meta: { type: 'tf', qid: 'jg_q6_tf', correct: true, explanation: '100, 120, 140, 160, 180, 200 — yes! Each jump is exactly 20. Jumping by 20s gets you to 200!', correctLabel: 'True' },
    render: (lp) => (
      <div className="dc-qcard dc-s8">
        <AchievementBadge icon="🎯" label="TRUE OR FALSE?" color="#7c3aed" />
        <StoryBox emoji="🦘" text="Kanga says: If I jump by 20 starting from 100, I get 100, 120, 140, 160, 180, 200! Is she right?" color="#fdf4ff" border="#9333ea" />
        <p className="dc-qtext">🏏 100, 120, 140, 160, 180, 200 — counting by 20?</p>
        <div style={{ display: 'flex', gap: 6, justifyContent: 'center', flexWrap: 'wrap', margin: '14px 0' }}>
          {[100,120,140,160,180,200].map((n, i) => (
            <motion.div key={n} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07, type: 'spring' }}
              style={{ background: n === 200 ? 'linear-gradient(135deg,#ffd600,#ff9800)' : '#dbeafe', border: `2px solid ${n === 200 ? '#e65100' : '#3b82f6'}`, borderRadius: 10, padding: '8px 12px', fontFamily: "'Baloo 2',cursive", fontWeight: 900, fontSize: '1.1rem', color: n === 200 ? '#7c2d12' : '#1d4ed8' }}>{n}</motion.div>
          ))}
        </div>
        <DCTFButtons qid="jg_q6_tf" lp={lp} />
      </div>
    ),
  },
  {
    id: 'jg_q7',
    meta: { type: 'mcq', qid: 'jg_q7', correct: '5', explanation: '150→155→160→165→170→175 — that is 5 jumps of 5!', correctLabel: '5' },
    render: (lp) => (
      <div className="dc-qcard dc-s8">
        <AchievementBadge icon="🐸" label="COUNT THE JUMPS" color="#16a34a" />
        <StoryBox emoji="🐸" text="Tiku jumps from 150 to 175, jumping 5 each time. How many jumps does he make?" color="#f0fdf4" border="#16a34a" />
        <p className="dc-qtext">🐸 Jumping by 5: from 150 to 175 — how many jumps?</p>
        <NumberLineDC start={150} end={200} step={10} highlight={175} jumpFrom={150} jumpTo={175} jumpSize={5} />
        <div className="dc-opts">
          {[['3','A'],['4','B'],['5','C'],['6','D']].map(([v,l],i) => (
            <DCOption key={v} value={v} label={l} index={i} onClick={() => lp.handleMcq('jg_q7', v)} className={lp.getMcqClass('jg_q7', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'jg_q8',
    meta: { type: 'mcq', qid: 'jg_q8', correct: '180', explanation: '140, 160, 180, 200 — jumping by 20! The last big jump before 200!', correctLabel: '180' },
    render: (lp) => (
      <div className="dc-qcard dc-s8">
        <AchievementBadge icon="🦘" label="GIANT JUMP!" color="#7c3aed" />
        <StoryBox emoji="🦘" text="Kanga's final stretch! She's jumping: 140, 160, ?, 200. What number did she jump past?" color="#fdf4ff" border="#9333ea" />
        <p className="dc-qtext">🦘 140 → 160 → ____? Jump by 20!</p>
        <NumberLineDC start={100} end={200} step={20} highlight={200} jumpFrom={160} jumpTo={180} jumpSize={20} />
        <div className="dc-opts">
          {[['170','A'],['175','B'],['180','C'],['190','D']].map(([v,l],i) => (
            <DCOption key={v} value={v} label={l} index={i} onClick={() => lp.handleMcq('jg_q8', v)} className={lp.getMcqClass('jg_q8', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'jg_q9',
    meta: { type: 'tf', qid: 'jg_q9_tf', correct: false, explanation: '165, 170, 175 → next should be 180, NOT 181! We always add 5 each time.', correctLabel: 'False — 175 + 5 = 180' },
    render: (lp) => (
      <div className="dc-qcard dc-s8">
        <AchievementBadge icon="🎯" label="SPOT THE MISTAKE!" color="#dc2626" />
        <StoryBox emoji="🐸" text="Tiku wrote his jumps: 165, 170, 175, 181. But he made a mistake! Can you spot it?" color="#fef2f2" border="#dc2626" />
        <p className="dc-qtext">Counting by 5: <strong>165, 170, 175, 181</strong>. Correct?</p>
        <StonePath numbers={[165, 170, 175, 181]} highlight={181} />
        <DCTFButtons qid="jg_q9_tf" lp={lp} />
      </div>
    ),
  },
  {
    id: 'jg_q10',
    matchAnswers: { jg_match10: { 'jg_by5': '100, 105, 110, 115', 'jg_by20': '100, 120, 140, 160', 'jg_by5b': '150, 155, 160, 165', 'jg_by20b': '140, 160, 180, 200' } },
    rightItems: [['100, 105, 110, 115','100, 105, 110, 115'],['100, 120, 140, 160','100, 120, 140, 160'],['150, 155, 160, 165','150, 155, 160, 165'],['140, 160, 180, 200','140, 160, 180, 200']],
    meta: { type: 'match', totalPairs: 4, explanation: 'Jump by 5 → steps of 5. Jump by 20 → steps of 20. Tiku and Kanga nailed it!', correctLabel: 'All matched!' },
    render: (lp, ctx) => (
      <div className="dc-qcard dc-s8">
        <AchievementBadge icon="🔗" label="MATCH THE JUMPS" color="#16a34a" />
        <StoryBox emoji="🐸" text="Tiku and Kanga mixed up their jump trails! Match each jumping rule to the right number trail!" color="#f0fdf4" border="#16a34a" />
        <p className="dc-qtext">Match each jump rule to its sequence! 🎯</p>
        <div className="dc-match-wrap">
          <div className="dc-match-col" style={{ fontSize: '0.85rem' }}>
            {[['jg_by5','🐸 Jump by 5 (from 100)'],['jg_by20','🦘 Jump by 20 (from 100)'],['jg_by5b','🐸 Jump by 5 (from 150)'],['jg_by20b','🦘 Jump by 20 (from 140)']].map(([val, label], i) => (
              <motion.div key={val} initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }}
                onClick={() => lp.handleMatch('jg_match10','left',val)} className={`dc-match-item ${lp.getMatchClass('jg_match10','left',val)}`}>{label}</motion.div>
            ))}
          </div>
          <div className="dc-match-center">{[0,1,2,3].map(i => <div key={i} className="dc-match-line">→</div>)}</div>
          <div className="dc-match-col" style={{ fontSize: '0.72rem' }}>
            {ctx.shuffledRight.map(([val, label], i) => (
              <motion.div key={val} initial={{ opacity: 0, x: 15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }}
                onClick={() => lp.handleMatch('jg_match10','right',val)} className={`dc-match-item ${lp.getMatchClass('jg_match10','right',val)}`}>{label}</motion.div>
            ))}
          </div>
        </div>
      </div>
    ),
  },
];

const JumpingGame = () => {
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
  return <DCPracticeTemplate skillId="DC-08" skillName="Jumping Game" questions={questions} questionMeta={questionMeta} logicProps={logicProps} />;
};

export default JumpingGame;
