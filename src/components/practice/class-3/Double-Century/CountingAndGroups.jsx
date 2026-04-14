import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { useDCLogic } from './useDCLogic';
import DCPracticeTemplate from './DCPracticeTemplate';
import { BundleDisplay, DCOption, DCTFButtons, StoryBox, AchievementBadge, shuffle } from './DCSharedComponents';
import './double-century.css';

const QUESTION_POOL = [
  {
    id: 'cg_q1',
    meta: { type: 'mcq', qid: 'cg_q1', correct: '34', explanation: '3 bundles of 10 = 30, plus 4 loose sticks = 34! Bholu counted correctly!', correctLabel: '34' },
    render: (lp) => (
      <div className="dc-qcard dc-s1">
        <AchievementBadge icon="🪵" label="BUNDLE BUILDER" color="#f97316" />
        <StoryBox emoji="🐶" text="Bholu is collecting sticks for a bonfire! Help him count all the sticks!" color="#fef3c7" border="#f59e0b" />
        <p className="dc-qtext">How many sticks does Bholu have altogether? 🔢</p>
        <BundleDisplay tens={3} ones={4} />
        <div className="dc-opts">
          {[['34','A'],['43','B'],['30','C'],['37','D']].map(([v,l],i) => (
            <DCOption key={v} value={v} label={l} index={i} onClick={() => lp.handleMcq('cg_q1', v)} className={lp.getMcqClass('cg_q1', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'cg_q2',
    meta: { type: 'mcq', qid: 'cg_q2', correct: '50', explanation: '5 bundles of 10 sticks = 5 × 10 = 50 sticks!', correctLabel: '50' },
    render: (lp) => (
      <div className="dc-qcard dc-s1">
        <AchievementBadge icon="🪵" label="BUNDLE BUILDER" color="#f97316" />
        <StoryBox emoji="🐶" text="Bholu made 5 big bundles with 10 sticks each. How many sticks total?" color="#fef3c7" border="#f59e0b" />
        <p className="dc-qtext">5 bundles of 10 = ? 🪵</p>
        <BundleDisplay tens={5} ones={0} />
        <div className="dc-opts">
          {[['40','A'],['45','B'],['50','C'],['55','D']].map(([v,l],i) => (
            <DCOption key={v} value={v} label={l} index={i} onClick={() => lp.handleMcq('cg_q2', v)} className={lp.getMcqClass('cg_q2', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'cg_q3',
    meta: { type: 'tf', qid: 'cg_q3_tf', correct: true, explanation: '10 bundles of 10 sticks each = 10 × 10 = 100 sticks — one super bundle!', correctLabel: 'True' },
    render: (lp) => (
      <div className="dc-qcard dc-s1">
        <AchievementBadge icon="🎯" label="TRUE OR FALSE?" color="#7c3aed" />
        <StoryBox emoji="🐶" text="Bholu says: I made 10 bundles with 10 sticks each. That gives me 100 sticks!" color="#f0fdf4" border="#16a34a" />
        <p className="dc-qtext">10 bundles of 10 = <strong>100</strong> sticks. Is Bholu right?</p>
        <BundleDisplay tens={10} ones={0} />
        <DCTFButtons qid="cg_q3_tf" lp={lp} />
      </div>
    ),
  },
  {
    id: 'cg_q4',
    meta: { type: 'mcq', qid: 'cg_q4', correct: '47', explanation: '4 bundles of 10 = 40, plus 7 loose sticks = 47!', correctLabel: '47' },
    render: (lp) => (
      <div className="dc-qcard dc-s1">
        <AchievementBadge icon="🪵" label="BUNDLE BUILDER" color="#f97316" />
        <StoryBox emoji="🐶" text="Bholu has 4 big bundles AND 7 extra sticks. Count them all for him!" color="#fef3c7" border="#f59e0b" />
        <p className="dc-qtext">4 bundles of 10 + 7 loose sticks = ? 🔢</p>
        <BundleDisplay tens={4} ones={7} />
        <div className="dc-opts">
          {[['74','A'],['47','B'],['40','C'],['77','D']].map(([v,l],i) => (
            <DCOption key={v} value={v} label={l} index={i} onClick={() => lp.handleMcq('cg_q4', v)} className={lp.getMcqClass('cg_q4', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'cg_q5',
    meta: { type: 'mcq', qid: 'cg_q5', correct: '20', explanation: 'Count in groups of 5: 5, 10, 15, 20 — each jump adds 5 more!', correctLabel: '20' },
    render: (lp) => (
      <div className="dc-qcard dc-s1">
        <AchievementBadge icon="✋" label="COUNT IN FIVES" color="#0284c7" />
        <StoryBox emoji="🐶" text="Bholu counts fingers! Every hand has 5 fingers. What number comes after 15?" color="#eff6ff" border="#3b82f6" />
        <p className="dc-qtext">5 → 10 → 15 → ____? Jump by 5! ✋</p>
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', margin: '14px 0', flexWrap: 'wrap' }}>
          {[5,10,15].map((n,idx) => (
            <motion.div key={n} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: idx*0.1, type:'spring' }}
              style={{ background: '#dbeafe', border: '2px solid #3a86ff', borderRadius: 12, padding: '10px 16px', fontFamily: "'Baloo 2',cursive", fontWeight: 900, fontSize: '1.4rem', color: '#1e40af' }}>{n}</motion.div>
          ))}
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3, type:'spring' }}
            style={{ background: '#fef3c7', border: '2px dashed #f59e0b', borderRadius: 12, padding: '10px 16px', fontFamily: "'Baloo 2',cursive", fontWeight: 900, fontSize: '1.4rem', color: '#92400e' }}>?</motion.div>
        </div>
        <div className="dc-opts">
          {[['18','A'],['20','B'],['22','C'],['25','D']].map(([v,l],i) => (
            <DCOption key={v} value={v} label={l} index={i} onClick={() => lp.handleMcq('cg_q5', v)} className={lp.getMcqClass('cg_q5', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'cg_q6',
    meta: { type: 'tf', qid: 'cg_q6_tf', correct: true, explanation: '4 groups of 5 = 5+5+5+5 = 20. Yes, that is correct!', correctLabel: 'True' },
    render: (lp) => (
      <div className="dc-qcard dc-s1">
        <AchievementBadge icon="🎯" label="TRUE OR FALSE?" color="#7c3aed" />
        <StoryBox emoji="🐶" text="Bholu laid out 4 groups of 5 sticks and says the total is 20. Correct?" color="#f0fdf4" border="#16a34a" />
        <p className="dc-qtext">4 groups of 5 = <strong>20</strong>. True or False?</p>
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', margin: '14px 0', flexWrap: 'wrap' }}>
          {[1,2,3,4].map((g,gi) => (
            <motion.div key={g} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: gi*0.08 }}
              style={{ display: 'flex', gap: 3, background: '#dcfce7', borderRadius: 8, padding: '6px 8px', border: '1.5px solid #16a34a' }}>
              {[1,2,3,4,5].map(s => <div key={s} className="dc-stick" style={{ height: 28 }} />)}
            </motion.div>
          ))}
        </div>
        <DCTFButtons qid="cg_q6_tf" lp={lp} />
      </div>
    ),
  },
  {
    id: 'cg_q7',
    meta: { type: 'mcq', qid: 'cg_q7', correct: '20', explanation: '2 bundles of 10 sticks = 20 sticks in total!', correctLabel: '20' },
    render: (lp) => (
      <div className="dc-qcard dc-s1">
        <AchievementBadge icon="🪵" label="BUNDLE BUILDER" color="#f97316" />
        <StoryBox emoji="🐶" text="Bholu grabbed 2 bundles of 10 sticks. How many sticks does he have?" color="#fef3c7" border="#f59e0b" />
        <p className="dc-qtext">2 bundles of 10 = ? 🪵</p>
        <BundleDisplay tens={2} ones={0} />
        <div className="dc-opts">
          {[['12','A'],['20','B'],['22','C'],['200','D']].map(([v,l],i) => (
            <DCOption key={v} value={v} label={l} index={i} onClick={() => lp.handleMcq('cg_q7', v)} className={lp.getMcqClass('cg_q7', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'cg_q8',
    meta: { type: 'mcq', qid: 'cg_q8', correct: '63', explanation: '6 bundles of 10 = 60, plus 3 loose sticks = 63!', correctLabel: '63' },
    render: (lp) => (
      <div className="dc-qcard dc-s1">
        <AchievementBadge icon="🪵" label="BUNDLE BUILDER" color="#f97316" />
        <StoryBox emoji="🐶" text="Bholu has 6 big bundles and 3 extra sticks. Can you count the total?" color="#fef3c7" border="#f59e0b" />
        <p className="dc-qtext">6 bundles of 10 + 3 loose sticks = ? 🔢</p>
        <BundleDisplay tens={6} ones={3} />
        <div className="dc-opts">
          {[['36','A'],['60','B'],['63','C'],['66','D']].map(([v,l],i) => (
            <DCOption key={v} value={v} label={l} index={i} onClick={() => lp.handleMcq('cg_q8', v)} className={lp.getMcqClass('cg_q8', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'cg_q9',
    meta: { type: 'tf', qid: 'cg_q9_tf', correct: true, explanation: '7 × 10 = 70. Seven bundles of 10 make 70!', correctLabel: 'True' },
    render: (lp) => (
      <div className="dc-qcard dc-s1">
        <AchievementBadge icon="🎯" label="TRUE OR FALSE?" color="#7c3aed" />
        <StoryBox emoji="🐶" text="Bholu counts 7 bundles and says: that's 70 sticks! Do you agree?" color="#f0fdf4" border="#16a34a" />
        <p className="dc-qtext">7 bundles of 10 = <strong>70</strong> sticks. True or False?</p>
        <BundleDisplay tens={7} ones={0} />
        <DCTFButtons qid="cg_q9_tf" lp={lp} />
      </div>
    ),
  },
  {
    id: 'cg_q10',
    matchAnswers: { cg_match10: { 'cg_m2t': '20', 'cg_m3t': '30', 'cg_m5t': '50', 'cg_m4t': '40' } },
    rightItems: [['20','20'],['30','30'],['50','50'],['40','40']],
    meta: { type: 'match', totalPairs: 4, explanation: '2×10=20, 3×10=30, 4×10=40, 5×10=50. Bholu matched them all!', correctLabel: 'All pairs matched!' },
    render: (lp, ctx) => (
      <div className="dc-qcard dc-s1">
        <AchievementBadge icon="🔗" label="MATCH IT!" color="#0891b2" />
        <StoryBox emoji="🐶" text="Bholu mixed up his bundle labels! Help him match each bundle group to the right total!" color="#fef3c7" border="#f59e0b" />
        <p className="dc-qtext">Match each bundle group to its total! 🎯</p>
        <div className="dc-match-wrap">
          <div className="dc-match-col">
            {[['cg_m2t','2 × 10'],['cg_m3t','3 × 10'],['cg_m5t','5 × 10'],['cg_m4t','4 × 10']].map(([val, label], i) => (
              <motion.div key={val} initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }}
                onClick={() => lp.handleMatch('cg_match10','left',val)} className={`dc-match-item ${lp.getMatchClass('cg_match10','left',val)}`}>{label}</motion.div>
            ))}
          </div>
          <div className="dc-match-center">{[0,1,2,3].map(i => <div key={i} className="dc-match-line">→</div>)}</div>
          <div className="dc-match-col">
            {ctx.shuffledRight.map(([val, label], i) => (
              <motion.div key={val} initial={{ opacity: 0, x: 15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }}
                onClick={() => lp.handleMatch('cg_match10','right',val)} className={`dc-match-item ${lp.getMatchClass('cg_match10','right',val)}`}>{label}</motion.div>
            ))}
          </div>
        </div>
      </div>
    ),
  },
];

const CountingAndGroups = () => {
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
  return <DCPracticeTemplate skillId="DC-01" skillName="Counting and Groups" questions={questions} questionMeta={questionMeta} logicProps={logicProps} />;
};

export default CountingAndGroups;
