import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { useDCLogic } from './useDCLogic';
import DCPracticeTemplate from './DCPracticeTemplate';
import { HTODisplay, StonePath, DCOption, DCTFButtons, StoryBox, AchievementBadge, shuffle } from './DCSharedComponents';
import './double-century.css';

const QUESTION_POOL = [
  {
    id: 'n101_q1',
    meta: { type: 'mcq', qid: 'n101_q1', correct: '101', explanation: '100 + 1 = 101. One hundred and one! It is the first number after 100.', correctLabel: '101' },
    render: (lp) => (
      <div className="dc-qcard dc-s5">
        <AchievementBadge icon="🚀" label="BEYOND 100!" color="#7c3aed" />
        <StoryBox emoji="🐱" text="Mia the explorer just crossed 100! She takes one more step. What number is she on now?" color="#fdf4ff" border="#9333ea" />
        <p className="dc-qtext">100 + 1 = ____? The adventure continues! 🚀</p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, margin: '16px 0', flexWrap: 'wrap' }}>
          {[['100','#ffd600','#e65100'],['+',' ',''],['1','#dbeafe','#3b82f6'],['=','',''],['?','#fef3c7','#f59e0b']].map(([val,bg,border],i) => (
            val.match(/[+=]/) ? <motion.span key={i} style={{ fontSize: '1.6rem', fontWeight: 900 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i*0.06 }}>{val}</motion.span> :
            <motion.div key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i*0.1, type:'spring' }}
              style={{ background: bg, border: `2px ${val==='?'?'dashed':'solid'} ${border}`, borderRadius: 12, padding: '8px 16px', fontFamily:"'Baloo 2',cursive", fontWeight:900, fontSize:'1.8rem', color:'#1a1a1a' }}>{val}</motion.div>
          ))}
        </div>
        <div className="dc-opts">
          {[['99','A'],['100','B'],['101','C'],['110','D']].map(([v,l],i) => (
            <DCOption key={v} value={v} label={l} index={i} onClick={() => lp.handleMcq('n101_q1', v)} className={lp.getMcqClass('n101_q1', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'n101_q2',
    meta: { type: 'mcq', qid: 'n101_q2', correct: '105', explanation: 'One Hundred Five = 100 + 5 = 105. H=1, T=0, O=5!', correctLabel: '105' },
    render: (lp) => (
      <div className="dc-qcard dc-s5">
        <AchievementBadge icon="📖" label="WORDS TO NUMBERS" color="#0284c7" />
        <StoryBox emoji="🐱" text="Mia reads a road sign: 'One Hundred Five kilometres to the city!' What number is that?" color="#eff6ff" border="#3b82f6" />
        <p className="dc-qtext">📖 "One Hundred Five" in digits is ____?</p>
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          style={{ background: '#ede9fe', borderRadius: 14, padding: '12px 18px', margin: '14px auto', maxWidth: 280, textAlign: 'center', fontFamily: "'Baloo 2',cursive", fontWeight: 700, fontSize: '1.3rem', color: '#5b21b6', border: '2px solid #8b5cf6' }}>
          One Hundred Five
        </motion.div>
        <HTODisplay number={105} />
        <div className="dc-opts">
          {[['150','A'],['105','B'],['115','C'],['500','D']].map(([v,l],i) => (
            <DCOption key={v} value={v} label={l} index={i} onClick={() => lp.handleMcq('n101_q2', v)} className={lp.getMcqClass('n101_q2', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'n101_q3',
    meta: { type: 'mcq', qid: 'n101_q3', correct: '123', explanation: '1 hundred = 100, 2 tens = 20, 3 ones = 3. So 100+20+3 = 123!', correctLabel: '123' },
    render: (lp) => (
      <div className="dc-qcard dc-s5">
        <AchievementBadge icon="🧩" label="H-T-O PUZZLE" color="#0891b2" />
        <StoryBox emoji="🐱" text="Mia found a number code: 1 hundred, 2 tens, 3 ones. What secret number is it?" color="#ecfeff" border="#0891b2" />
        <p className="dc-qtext">🔢 1 hundred + 2 tens + 3 ones = ____?</p>
        <HTODisplay number={123} />
        <div className="dc-opts">
          {[['132','A'],['213','B'],['123','C'],['321','D']].map(([v,l],i) => (
            <DCOption key={v} value={v} label={l} index={i} onClick={() => lp.handleMcq('n101_q3', v)} className={lp.getMcqClass('n101_q3', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'n101_q4',
    meta: { type: 'tf', qid: 'n101_q4_tf', correct: true, explanation: '100 + 30 = 130. One hundred and thirty. H=1, T=3, O=0!', correctLabel: 'True' },
    render: (lp) => (
      <div className="dc-qcard dc-s5">
        <AchievementBadge icon="🎯" label="TRUE OR FALSE?" color="#7c3aed" />
        <StoryBox emoji="🐱" text="Mia says 100 + 30 = 130. She draws the H-T-O table to prove it. Is she right?" color="#f0fdf4" border="#16a34a" />
        <p className="dc-qtext">100 + 30 = <strong>130</strong>. True or False?</p>
        <HTODisplay number={130} />
        <DCTFButtons qid="n101_q4_tf" lp={lp} />
      </div>
    ),
  },
  {
    id: 'n101_q5',
    meta: { type: 'mcq', qid: 'n101_q5', correct: 'One Hundred Seventeen', explanation: '117 = 100 + 10 + 7. We say "One Hundred Seventeen"!', correctLabel: 'One Hundred Seventeen' },
    render: (lp) => (
      <div className="dc-qcard dc-s5">
        <AchievementBadge icon="📢" label="SAY IT ALOUD!" color="#d97706" />
        <StoryBox emoji="🐱" text="Mia sees the number 117 on a house. How would you read it out loud?" color="#fefce8" border="#d97706" />
        <p className="dc-qtext">📝 How do you say the number <strong>117</strong>?</p>
        <HTODisplay number={117} />
        <div className="dc-opts" style={{ flexDirection: 'column' }}>
          {[['One Hundred Seventy','A'],['One Hundred Seven','B'],['One Hundred Seventeen','C'],['Seventeen Hundred','D']].map(([v,l],i) => (
            <DCOption key={v} value={v} label={l} index={i} onClick={() => lp.handleMcq('n101_q5', v)} className={lp.getMcqClass('n101_q5', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'n101_q6',
    meta: { type: 'mcq', qid: 'n101_q6', correct: '111', explanation: '109, 110, 111, 112 — counting one by one after 100!', correctLabel: '111' },
    render: (lp) => (
      <div className="dc-qcard dc-s5">
        <AchievementBadge icon="🪨" label="STONE HOPPER" color="#64748b" />
        <StoryBox emoji="🐱" text="Mia is hopping on stepping stones across the river! One stone is missing. Which number goes there?" color="#f8fafc" border="#64748b" />
        <p className="dc-qtext">109 → 110 → ? → 112. Find the missing stone! 🪨</p>
        <StonePath numbers={[109, 110, 0, 112]} highlight={0} />
        <div className="dc-opts">
          {[['100','A'],['111','B'],['113','C'],['210','D']].map(([v,l],i) => (
            <DCOption key={v} value={v} label={l} index={i} onClick={() => lp.handleMcq('n101_q6', v)} className={lp.getMcqClass('n101_q6', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'n101_q7',
    meta: { type: 'tf', qid: 'n101_q7_tf', correct: false, explanation: 'One Hundred Twenty = 120, NOT 102! In 120, H=1, T=2, O=0.', correctLabel: 'False — it is 120' },
    render: (lp) => (
      <div className="dc-qcard dc-s5">
        <AchievementBadge icon="🎯" label="SPOT THE MISTAKE!" color="#dc2626" />
        <StoryBox emoji="🐱" text="Mia's friend wrote 'One Hundred Twenty = 102'. Mia thinks it's wrong! Who is right?" color="#fef2f2" border="#dc2626" />
        <p className="dc-qtext">"One Hundred Twenty" = <strong>102</strong>. Correct?</p>
        <div style={{ display: 'flex', gap: 14, justifyContent: 'center', margin: '14px 0', flexWrap: 'wrap', alignItems: 'center' }}>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            style={{ background: '#ede9fe', borderRadius: 12, padding: '10px 20px', fontFamily: "'Baloo 2',cursive", fontWeight: 700, fontSize: '1.1rem', color: '#5b21b6', border: '2px solid #8b5cf6' }}>One Hundred Twenty</motion.div>
          <span style={{ fontSize: '1.4rem' }}>≠?</span>
          <motion.div className="dc-bond-100" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.1, type: 'spring' }} style={{ fontSize: '1.6rem' }}>102</motion.div>
        </div>
        <DCTFButtons qid="n101_q7_tf" lp={lp} />
      </div>
    ),
  },
  {
    id: 'n101_q8',
    meta: { type: 'mcq', qid: 'n101_q8', correct: '140', explanation: '1 hundred = 100, 4 tens = 40, 0 ones = 0. So 100+40+0 = 140!', correctLabel: '140' },
    render: (lp) => (
      <div className="dc-qcard dc-s5">
        <AchievementBadge icon="🧩" label="H-T-O PUZZLE" color="#0891b2" />
        <StoryBox emoji="🐱" text="Mia's number code today: H=1, T=4, O=0. What is the secret number?" color="#ecfeff" border="#0891b2" />
        <p className="dc-qtext">H = 1, T = 4, O = 0 → ____?</p>
        <HTODisplay number={140} />
        <div className="dc-opts">
          {[['410','A'],['104','B'],['140','C'],['400','D']].map(([v,l],i) => (
            <DCOption key={v} value={v} label={l} index={i} onClick={() => lp.handleMcq('n101_q8', v)} className={lp.getMcqClass('n101_q8', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'n101_q9',
    meta: { type: 'mcq', qid: 'n101_q9', correct: '137', explanation: 'The stone path goes 135, 136, 137, 138 — one step at a time!', correctLabel: '137' },
    render: (lp) => (
      <div className="dc-qcard dc-s5">
        <AchievementBadge icon="🪨" label="STONE HOPPER" color="#64748b" />
        <StoryBox emoji="🐱" text="Mia is hopping: 135… 136… oops, one stone is missing! What number should go there?" color="#f8fafc" border="#64748b" />
        <p className="dc-qtext">🪨 135 → 136 → ? → 138. What is missing?</p>
        <StonePath numbers={[135, 136, 0, 138]} highlight={0} />
        <div className="dc-opts">
          {[['130','A'],['136','B'],['137','C'],['139','D']].map(([v,l],i) => (
            <DCOption key={v} value={v} label={l} index={i} onClick={() => lp.handleMcq('n101_q9', v)} className={lp.getMcqClass('n101_q9', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'n101_q10',
    matchAnswers: { n101_match10: { 'n101_101': 'One Hundred One', 'n101_115': 'One Hundred Fifteen', 'n101_120': 'One Hundred Twenty', 'n101_150': 'One Hundred Fifty' } },
    rightItems: [['One Hundred One','One Hundred One'],['One Hundred Fifteen','One Hundred Fifteen'],['One Hundred Twenty','One Hundred Twenty'],['One Hundred Fifty','One Hundred Fifty']],
    meta: { type: 'match', totalPairs: 4, explanation: '101=One Hundred One, 115=One Hundred Fifteen, 120=One Hundred Twenty, 150=One Hundred Fifty!', correctLabel: 'All matched!' },
    render: (lp, ctx) => (
      <div className="dc-qcard dc-s5">
        <AchievementBadge icon="🔗" label="NUMBER NAMES" color="#7c3aed" />
        <StoryBox emoji="🐱" text="Mia's number name board got shuffled! Help her match each number to its correct name!" color="#fdf4ff" border="#9333ea" />
        <p className="dc-qtext">Match each number to its name! 📖</p>
        <div className="dc-match-wrap">
          <div className="dc-match-col">
            {[['n101_101','101'],['n101_115','115'],['n101_120','120'],['n101_150','150']].map(([val, label], i) => (
              <motion.div key={val} initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }}
                onClick={() => lp.handleMatch('n101_match10','left',val)} className={`dc-match-item ${lp.getMatchClass('n101_match10','left',val)}`}>{label}</motion.div>
            ))}
          </div>
          <div className="dc-match-center">{[0,1,2,3].map(i => <div key={i} className="dc-match-line">→</div>)}</div>
          <div className="dc-match-col" style={{ fontSize: '0.78rem' }}>
            {ctx.shuffledRight.map(([val, label], i) => (
              <motion.div key={val} initial={{ opacity: 0, x: 15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }}
                onClick={() => lp.handleMatch('n101_match10','right',val)} className={`dc-match-item ${lp.getMatchClass('n101_match10','right',val)}`}>{label}</motion.div>
            ))}
          </div>
        </div>
      </div>
    ),
  },
];

const Numbers101to150 = () => {
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
  return <DCPracticeTemplate skillId="DC-05" skillName="Numbers 101 to 150" questions={questions} questionMeta={questionMeta} logicProps={logicProps} />;
};

export default Numbers101to150;
