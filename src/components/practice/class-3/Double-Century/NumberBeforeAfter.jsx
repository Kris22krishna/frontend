import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { useDCLogic } from './useDCLogic';
import DCPracticeTemplate from './DCPracticeTemplate';
import { TalkingPot, DCOption, DCTFButtons, StoryBox, AchievementBadge, shuffle } from './DCSharedComponents';
import './double-century.css';

const QUESTION_POOL = [
  {
    id: 'nba_q1',
    meta: { type: 'mcq', qid: 'nba_q1', correct: '40', explanation: 'The Talking Pot always says ONE MORE! 39 + 1 = 40. When 39 is said, Pot says 40!', correctLabel: '40' },
    render: (lp) => (
      <div className="dc-qcard dc-s3">
        <AchievementBadge icon="🏺" label="MAGIC POT CHALLENGE" color="#db2777" />
        <StoryBox emoji="👵" text="Grandma's magic pot has a superpower — it always says ONE MORE than what you say! What will it say now?" color="#fdf2f8" border="#db2777" />
        <p className="dc-qtext">I said <strong>39</strong>. What does the Magic Pot say? 🏺</p>
        <TalkingPot saidNum={39} potSaid="?" />
        <div className="dc-opts">
          {[['38','A'],['39','B'],['40','C'],['41','D']].map(([v,l],i) => (
            <DCOption key={v} value={v} label={l} index={i} onClick={() => lp.handleMcq('nba_q1', v)} className={lp.getMcqClass('nba_q1', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'nba_q2',
    meta: { type: 'mcq', qid: 'nba_q2', correct: '89', explanation: 'If Pot says 90, you must have said one less = 89! Because 89 + 1 = 90.', correctLabel: '89' },
    render: (lp) => (
      <div className="dc-qcard dc-s3">
        <AchievementBadge icon="🔍" label="REVERSE DETECTIVE" color="#7c3aed" />
        <StoryBox emoji="👵" text="The pot said 90! But what did YOU say? Remember — the pot always says one MORE!" color="#fdf2f8" border="#db2777" />
        <p className="dc-qtext">🏺 Pot said <strong>90</strong>. What did YOU say?</p>
        <TalkingPot saidNum="?" potSaid={90} />
        <div className="dc-opts">
          {[['88','A'],['89','B'],['91','C'],['90','D']].map(([v,l],i) => (
            <DCOption key={v} value={v} label={l} index={i} onClick={() => lp.handleMcq('nba_q2', v)} className={lp.getMcqClass('nba_q2', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'nba_q3',
    meta: { type: 'mcq', qid: 'nba_q3', correct: '64', explanation: 'The Talking Pot always says one more! 63 + 1 = 64!', correctLabel: '64' },
    render: (lp) => (
      <div className="dc-qcard dc-s3">
        <AchievementBadge icon="🏺" label="MAGIC POT CHALLENGE" color="#db2777" />
        <StoryBox emoji="👵" text="I said 63 to the magic pot. The pot whispers back its secret number. What is it?" color="#fdf2f8" border="#db2777" />
        <p className="dc-qtext">I said <strong>63</strong>. Pot said…? 🏺</p>
        <TalkingPot saidNum={63} potSaid="?" />
        <div className="dc-opts">
          {[['62','A'],['63','B'],['64','C'],['65','D']].map(([v,l],i) => (
            <DCOption key={v} value={v} label={l} index={i} onClick={() => lp.handleMcq('nba_q3', v)} className={lp.getMcqClass('nba_q3', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'nba_q4',
    meta: { type: 'mcq', qid: 'nba_q4', correct: '100', explanation: '99 + 1 = 100! One more than 99 is 100 — a whole century!', correctLabel: '100' },
    render: (lp) => (
      <div className="dc-qcard dc-s3">
        <AchievementBadge icon="🌟" label="CENTURY MOMENT!" color="#d97706" />
        <StoryBox emoji="👵" text="The magic pot is about to say a very special number... I said 99. What magical number will the pot say?" color="#fef3c7" border="#f59e0b" />
        <p className="dc-qtext">I said <strong>99</strong>. Pot said…? 🏺✨</p>
        <TalkingPot saidNum={99} potSaid="?" />
        <div className="dc-opts">
          {[['98','A'],['99','B'],['100','C'],['101','D']].map(([v,l],i) => (
            <DCOption key={v} value={v} label={l} index={i} onClick={() => lp.handleMcq('nba_q4', v)} className={lp.getMcqClass('nba_q4', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'nba_q5',
    meta: { type: 'tf', qid: 'nba_q5_tf', correct: true, explanation: '42 + 1 = 43. The Talking Pot said 43 when Bholu said 42. Correct!', correctLabel: 'True' },
    render: (lp) => (
      <div className="dc-qcard dc-s3">
        <AchievementBadge icon="🎯" label="TRUE OR FALSE?" color="#7c3aed" />
        <StoryBox emoji="🐶" text="Bholu said 42 to the magic pot. The pot replied with 43. Is the pot working correctly?" color="#f0fdf4" border="#16a34a" />
        <p className="dc-qtext">I said <strong>42</strong>. The Pot said <strong>43</strong>. Correct?</p>
        <TalkingPot saidNum={42} potSaid={43} />
        <DCTFButtons qid="nba_q5_tf" lp={lp} />
      </div>
    ),
  },
  {
    id: 'nba_q6',
    meta: { type: 'mcq', qid: 'nba_q6', correct: '89', explanation: 'One LESS than 90 means 90 − 1 = 89. So the answer is 89!', correctLabel: '89' },
    render: (lp) => (
      <div className="dc-qcard dc-s3">
        <AchievementBadge icon="⬇️" label="ONE LESS" color="#0284c7" />
        <StoryBox emoji="👵" text="Grandma is asking a tricky question now — what is ONE LESS than 90? Think carefully!" color="#eff6ff" border="#3b82f6" />
        <p className="dc-qtext">What is <strong>one less</strong> than 90? 🔢</p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, margin: '16px 0', flexWrap: 'wrap' }}>
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring' }}
            style={{ background: '#fee2e2', border: '2px solid #ef4444', borderRadius: 12, padding: '10px 16px', fontFamily: "'Baloo 2',cursive", fontWeight: 900, fontSize: '1.8rem', color: '#dc2626' }}>90</motion.div>
          <span style={{ fontSize: '1.5rem' }}>− 1 = </span>
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.15, type: 'spring' }}
            style={{ background: '#fef3c7', border: '2px dashed #f59e0b', borderRadius: 12, padding: '10px 16px', fontFamily: "'Baloo 2',cursive", fontWeight: 900, fontSize: '1.8rem', color: '#92400e' }}>?</motion.div>
        </div>
        <div className="dc-opts">
          {[['88','A'],['89','B'],['91','C'],['80','D']].map(([v,l],i) => (
            <DCOption key={v} value={v} label={l} index={i} onClick={() => lp.handleMcq('nba_q6', v)} className={lp.getMcqClass('nba_q6', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'nba_q7',
    meta: { type: 'mcq', qid: 'nba_q7', correct: '128', explanation: 'The Talking Pot came back for bigger numbers! 127 + 1 = 128.', correctLabel: '128' },
    render: (lp) => (
      <div className="dc-qcard dc-s3">
        <AchievementBadge icon="🚀" label="BIG NUMBERS!" color="#7c3aed" />
        <StoryBox emoji="👵" text="Wow, the magic pot can handle big numbers too! I said 127. What will it say?" color="#fdf2f8" border="#db2777" />
        <p className="dc-qtext">I said <strong>127</strong>. Pot said…? 🏺</p>
        <TalkingPot saidNum={127} potSaid="?" />
        <div className="dc-opts">
          {[['126','A'],['128','B'],['127','C'],['130','D']].map(([v,l],i) => (
            <DCOption key={v} value={v} label={l} index={i} onClick={() => lp.handleMcq('nba_q7', v)} className={lp.getMcqClass('nba_q7', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'nba_q8',
    meta: { type: 'mcq', qid: 'nba_q8', correct: '99', explanation: 'The number just before 100 is 99. And 99 + 1 = 100!', correctLabel: '99' },
    render: (lp) => (
      <div className="dc-qcard dc-s3">
        <AchievementBadge icon="🏅" label="NUMBER BEFORE" color="#0284c7" />
        <StoryBox emoji="👵" text="100 is a very famous number! But which number hides just BEFORE it on the number line?" color="#eff6ff" border="#3b82f6" />
        <p className="dc-qtext">What number comes just <strong>before</strong> 100?</p>
        <div style={{ display: 'flex', gap: 8, justifyContent: 'center', alignItems: 'center', margin: '16px 0', flexWrap: 'wrap' }}>
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ type: 'spring' }}
            style={{ width: 56, height: 56, background: '#fef3c7', border: '2.5px dashed #f59e0b', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Baloo 2',cursive", fontWeight: 900, fontSize: '1.4rem', color: '#92400e' }}>?</motion.div>
          <span style={{ fontSize: '1.5rem', color: '#6b7280' }}>→</span>
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1, type: 'spring' }}
            style={{ width: 56, height: 56, background: 'linear-gradient(135deg,#ffd600,#f59e0b)', border: '2.5px solid #d97706', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Baloo 2',cursive", fontWeight: 900, fontSize: '1.4rem', color: '#92400e' }}>100</motion.div>
        </div>
        <div className="dc-opts">
          {[['98','A'],['99','B'],['101','C'],['90','D']].map(([v,l],i) => (
            <DCOption key={v} value={v} label={l} index={i} onClick={() => lp.handleMcq('nba_q8', v)} className={lp.getMcqClass('nba_q8', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'nba_q9',
    meta: { type: 'tf', qid: 'nba_q9_tf', correct: true, explanation: '134 + 1 = 135. Yes, one more than 134 is 135!', correctLabel: 'True' },
    render: (lp) => (
      <div className="dc-qcard dc-s3">
        <AchievementBadge icon="🎯" label="TRUE OR FALSE?" color="#7c3aed" />
        <StoryBox emoji="🐶" text="Bholu tries the pot with a big number — 134. The pot says 135. Is that right?" color="#f0fdf4" border="#16a34a" />
        <p className="dc-qtext">One more than <strong>134</strong> is <strong>135</strong>. True or False?</p>
        <TalkingPot saidNum={134} potSaid={135} />
        <DCTFButtons qid="nba_q9_tf" lp={lp} />
      </div>
    ),
  },
  {
    id: 'nba_q10',
    meta: { type: 'mcq', qid: 'nba_q10', correct: '149', explanation: 'If Pot says 150, you said one less = 149. Because 149 + 1 = 150!', correctLabel: '149' },
    render: (lp) => (
      <div className="dc-qcard dc-s3">
        <AchievementBadge icon="🔍" label="REVERSE DETECTIVE" color="#7c3aed" />
        <StoryBox emoji="👵" text="Tricky! The pot said 150 — but what did I say? Remember, pot always adds 1!" color="#fdf2f8" border="#db2777" />
        <p className="dc-qtext">🏺 Pot said <strong>150</strong>. What did YOU say?</p>
        <TalkingPot saidNum="?" potSaid={150} />
        <div className="dc-opts">
          {[['148','A'],['149','B'],['151','C'],['160','D']].map(([v,l],i) => (
            <DCOption key={v} value={v} label={l} index={i} onClick={() => lp.handleMcq('nba_q10', v)} className={lp.getMcqClass('nba_q10', v)} />
          ))}
        </div>
      </div>
    ),
  },
];

const NumberBeforeAfter = () => {
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
  return <DCPracticeTemplate skillId="DC-03" skillName="Number Before and After" questions={questions} questionMeta={questionMeta} logicProps={logicProps} />;
};

export default NumberBeforeAfter;
