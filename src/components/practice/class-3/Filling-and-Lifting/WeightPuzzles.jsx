import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { useFLLogic } from './useFLLogic';
import FLPracticeTemplate from './FLPracticeTemplate';
import { BalanceScaleSVG, FLOption, FLTFButtons, AchievementBadge, shuffle } from './FLSharedComponents';
import './filling-and-lifting.css';

const QUESTION_POOL = [
  {
    id: 'wp_q1',
    meta: { type: 'mcq', qid: 'wp_q1', correct: 'Ball A', explanation: 'Ball A > Ball B, and Ball B > Ball C. So Ball A is the heaviest of all three! (A > B > C)', correctLabel: 'Ball A' },
    render: (lp) => (
      <div className="fl-qcard fl-s9">
        <AchievementBadge icon="🧩" label="WEIGHT PUZZLE!" color="#d97706" />
        <p className="fl-qtext">A &gt; B &gt; C. Which is the HEAVIEST? 🧩</p>
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', margin: '14px 0', flexWrap: 'wrap' }}>
          {[['A','#fca5a5'],['B','#fcd34d'],['C','#86efac']].map(([ball, color]) => (
            <motion.div key={ball}
              style={{ width: 52, height: 52, borderRadius: '50%', background: color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Baloo 2',cursive", fontWeight: 900, fontSize: '1.4rem', border: '2px solid #374151' }}
              initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 300 }}>
              {ball}
            </motion.div>
          ))}
        </div>
        <div className="fl-opts">
          {[['Ball A','A'],['Ball B','B'],['Ball C','C'],['All same weight','D']].map(([v,l],i) => (
            <FLOption key={v} value={v} label={l} index={i} onClick={() => lp.handleMcq('wp_q1', v)} className={lp.getMcqClass('wp_q1', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'wp_q2',
    meta: { type: 'mcq', qid: 'wp_q2', correct: '1', explanation: 'Put one ball on each side of the balance. The side that goes DOWN is the heavier ball — done in just 1 weighing!', correctLabel: '1' },
    render: (lp) => (
      <div className="fl-qcard fl-s9">
        <AchievementBadge icon="⚖️" label="MINIMUM WEIGHINGS!" color="#d97706" />
        <p className="fl-qtext">Find the heavier ball (out of 2) with minimum balance uses. How many? ⚖️</p>
        <BalanceScaleSVG leftLabel="Ball 1" rightLabel="Ball 2" tilt="left" leftColor="#fca5a5" rightColor="#fde68a" />
        <div className="fl-opts">
          {[['1','A'],['2','B'],['3','C'],['4','D']].map(([v,l],i) => (
            <FLOption key={v} value={v} label={l} index={i} onClick={() => lp.handleMcq('wp_q2', v)} className={lp.getMcqClass('wp_q2', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'wp_q3',
    meta: { type: 'tf', qid: 'wp_q3_tf', correct: true, explanation: 'Yes! This is called transitivity. If A > B and B > C, then A must also be greater than C!', correctLabel: 'True' },
    render: (lp) => (
      <div className="fl-qcard fl-s9">
        <AchievementBadge icon="🎯" label="LOGIC RULE!" color="#7c3aed" />
        <p className="fl-qtext">If A &gt; B and B &gt; C, then A &gt; C. True or False?</p>
        <FLTFButtons qid="wp_q3_tf" lp={lp} />
      </div>
    ),
  },
  {
    id: 'wp_q4',
    meta: { type: 'mcq', qid: 'wp_q4', correct: 'Ball C', explanation: 'A > C and C > B means the order is A (heaviest) > C > B (lightest). Ball C is in the middle!', correctLabel: 'Ball C' },
    render: (lp) => (
      <div className="fl-qcard fl-s9">
        <AchievementBadge icon="🔍" label="ORDER THE BALLS!" color="#d97706" />
        <p className="fl-qtext">A &gt; C &gt; B. Which ball is SECOND heaviest (in the middle)? 🔍</p>
        <div className="fl-opts">
          {[['Ball A','A'],['Ball B','B'],['Ball C','C'],['All same','D']].map(([v,l],i) => (
            <FLOption key={v} value={v} label={l} index={i} onClick={() => lp.handleMcq('wp_q4', v)} className={lp.getMcqClass('wp_q4', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'wp_q5',
    meta: { type: 'mcq', qid: 'wp_q5', correct: 'C, A, B', explanation: 'A = 2 kg, B = 3 kg, C = 1 kg. Lightest first: C (1 kg), A (2 kg), B (3 kg). Order: C, A, B!', correctLabel: 'C, A, B' },
    render: (lp) => (
      <div className="fl-qcard fl-s9">
        <AchievementBadge icon="📊" label="SORT BY WEIGHT!" color="#d97706" />
        <p className="fl-qtext">A=2kg, B=3kg, C=1kg. Lightest to heaviest order? 📊</p>
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', margin: '14px 0', flexWrap: 'wrap' }}>
          {[['A','2 kg','#fcd34d'],['B','3 kg','#fca5a5'],['C','1 kg','#86efac']].map(([obj, wt, color]) => (
            <motion.div key={obj}
              style={{ background: color, borderRadius: 12, padding: '8px 14px', fontFamily: "'Baloo 2',cursive", fontWeight: 900, textAlign: 'center', border: '2px solid #374151' }}
              initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 280 }}>
              <div style={{ fontSize: '1.2rem' }}>{obj}</div>
              <div style={{ fontSize: '.75rem', color: '#374151' }}>{wt}</div>
            </motion.div>
          ))}
        </div>
        <div className="fl-opts">
          {[['A, B, C','A'],['B, A, C','B'],['C, A, B','C'],['A, C, B','D']].map(([v,l],i) => (
            <FLOption key={v} value={v} label={l} index={i} onClick={() => lp.handleMcq('wp_q5', v)} className={lp.getMcqClass('wp_q5', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'wp_q6',
    meta: { type: 'tf', qid: 'wp_q6_tf', correct: true, explanation: 'Yes! When both pans balance perfectly (level), both objects weigh exactly the same amount!', correctLabel: 'True' },
    render: (lp) => (
      <div className="fl-qcard fl-s9">
        <AchievementBadge icon="🎯" label="BALANCE RULE!" color="#7c3aed" />
        <p className="fl-qtext">If balance is perfectly level, both sides weigh the same. True or False?</p>
        <BalanceScaleSVG leftLabel="?" rightLabel="?" tilt="equal" leftColor="#a7f3d0" rightColor="#a7f3d0" />
        <FLTFButtons qid="wp_q6_tf" lp={lp} />
      </div>
    ),
  },
  {
    id: 'wp_q7',
    meta: { type: 'mcq', qid: 'wp_q7', correct: 'Right side (3 oranges)', explanation: '3 oranges (same weight each) weigh more than 2 apples of the same weight. 3 > 2, so right goes down!', correctLabel: 'Right side (3 oranges)' },
    render: (lp) => (
      <div className="fl-qcard fl-s9">
        <AchievementBadge icon="🍊🍎" label="FRUIT BALANCE!" color="#d97706" />
        <p className="fl-qtext">Left: 2 apples. Right: 3 oranges. (Same weight each) Which side goes DOWN? 🍊</p>
        <BalanceScaleSVG leftLabel="2🍎" rightLabel="3🍊" tilt="right" leftColor="#fde68a" rightColor="#fca5a5" />
        <div className="fl-opts">
          {[['Left side (2 apples)','A'],['Right side (3 oranges)','B'],['Both sides equal','C'],['Neither side','D']].map(([v,l],i) => (
            <FLOption key={v} value={v} label={l} index={i} onClick={() => lp.handleMcq('wp_q7', v)} className={lp.getMcqClass('wp_q7', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'wp_q8',
    meta: { type: 'tf', qid: 'wp_q8_tf', correct: true, explanation: 'Yes! The heavier side always pulls down on the balance scale — that is how a balance works!', correctLabel: 'True' },
    render: (lp) => (
      <div className="fl-qcard fl-s9">
        <AchievementBadge icon="🎯" label="BALANCE PHYSICS!" color="#7c3aed" />
        <p className="fl-qtext">The heavier side always goes DOWN on a balance. True or False?</p>
        <FLTFButtons qid="wp_q8_tf" lp={lp} />
      </div>
    ),
  },
  {
    id: 'wp_q9',
    meta: { type: 'mcq', qid: 'wp_q9', correct: 'Ball A (it goes down)', explanation: 'When ball A is placed on a pan and goes DOWN, it means ball A is heavier than ball B!', correctLabel: 'Ball A (it goes down)' },
    render: (lp) => (
      <div className="fl-qcard fl-s9">
        <AchievementBadge icon="🔍" label="READ THE SCALE!" color="#d97706" />
        <p className="fl-qtext">Ball A on left, Ball B on right. Left goes DOWN. Which is heavier? 🔍</p>
        <BalanceScaleSVG leftLabel="Ball A ⬇" rightLabel="Ball B" tilt="left" leftColor="#fca5a5" rightColor="#fde68a" />
        <div className="fl-opts">
          {[['Ball B (it goes up)','A'],['Ball A (it goes down)','B'],['Both same weight','C'],['Cannot tell','D']].map(([v,l],i) => (
            <FLOption key={v} value={v} label={l} index={i} onClick={() => lp.handleMcq('wp_q9', v)} className={lp.getMcqClass('wp_q9', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'wp_q10',
    matchAnswers: { wp_match10: { 'wp_m_left_down': 'Left is heavier', 'wp_m_right_down': 'Right is heavier', 'wp_m_level': 'Both equal', 'wp_m_a_b_c': 'A is heaviest' } },
    rightItems: [['Left is heavier','Left is heavier'],['Right is heavier','Right is heavier'],['Both equal','Both equal'],['A is heaviest','A is heaviest']],
    meta: { type: 'match', totalPairs: 4, explanation: 'Left down→Left heavy, Right down→Right heavy, Level→Equal, A>B>C→A heaviest!', correctLabel: 'All pairs matched!' },
    render: (lp, ctx) => (
      <div className="fl-qcard fl-s9">
        <AchievementBadge icon="🔗" label="MATCH BALANCE STATES!" color="#0891b2" />
        <p className="fl-qtext">Match each balance situation to its meaning! 🎯</p>
        <div className="fl-match-wrap">
          <div className="fl-match-col">
            {[['wp_m_left_down','⬇️ Left side goes down'],['wp_m_right_down','⬇️ Right side goes down'],['wp_m_level','↔️ Balance is level'],['wp_m_a_b_c','A>B, B>C']].map(([val, label], i) => (
              <motion.div key={val} initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }}
                onClick={() => lp.handleMatch('wp_match10','left',val)} className={`fl-match-item ${lp.getMatchClass('wp_match10','left',val)}`}>{label}</motion.div>
            ))}
          </div>
          <div className="fl-match-center">{[0,1,2,3].map(i => <div key={i} className="fl-match-line">→</div>)}</div>
          <div className="fl-match-col">
            {ctx.shuffledRight.map(([val, label], i) => (
              <motion.div key={val} initial={{ opacity: 0, x: 15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }}
                onClick={() => lp.handleMatch('wp_match10','right',val)} className={`fl-match-item ${lp.getMatchClass('wp_match10','right',val)}`}>{label}</motion.div>
            ))}
          </div>
        </div>
      </div>
    ),
  },
];

const WeightPuzzles = () => {
  const selRef = useRef(null);
  if (!selRef.current) {
    selRef.current = shuffle([...QUESTION_POOL]).slice(0, 5).map(q =>
      q.rightItems ? { ...q, shuffledRight: shuffle([...q.rightItems]) } : q
    );
  }
  const selected = selRef.current;
  const matchAnswers = {};
  selected.forEach(q => { if (q.matchAnswers) Object.assign(matchAnswers, q.matchAnswers); });
  const logicProps = useFLLogic(matchAnswers);
  const questions = selected.map(q => <React.Fragment key={q.id}>{q.render(logicProps, q)}</React.Fragment>);
  const questionMeta = selected.map(q => q.meta);
  return <FLPracticeTemplate skillId="FL-09" skillName="Logical Weight Puzzles" questions={questions} questionMeta={questionMeta} logicProps={logicProps} />;
};

export default WeightPuzzles;
