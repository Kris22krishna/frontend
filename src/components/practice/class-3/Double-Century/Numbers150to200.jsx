import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { useDCLogic } from './useDCLogic';
import DCPracticeTemplate from './DCPracticeTemplate';
import { HTODisplay, StonePath, NumberBond100, DCOption, DCTFButtons, StoryBox, AchievementBadge, shuffle } from './DCSharedComponents';
import './double-century.css';

const QUESTION_POOL = [
  {
    id: 'n150_q1',
    meta: { type: 'mcq', qid: 'n150_q1', correct: '160', explanation: '150 + 10 = 160. Count on by ten: 150, 160!', correctLabel: '160' },
    render: (lp) => (
      <div className="dc-qcard dc-s7">
        <AchievementBadge icon="🏆" label="RACE TO 200!" color="#b45309" />
        <StoryBox emoji="🏃" text="Bholu is racing to 200! He's at 150 and takes a giant leap of 10. Where does he land?" color="#fffbeb" border="#b45309" />
        <p className="dc-qtext">🔢 150 + 10 = ____?</p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, margin: '16px 0', flexWrap: 'wrap' }}>
          {[['150','#fef3c7','#d97706'],['+',' ',''],['10','#dbeafe','#3b82f6'],['=','',''],['?','#f0fdf4','#16a34a']].map(([val,bg,bdr],i) => (
            val === '+' || val === '=' ? <motion.span key={i} style={{ fontSize: '1.6rem', fontWeight: 900 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i*0.07 }}>{val}</motion.span> :
            <motion.div key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i*0.1, type:'spring' }}
              style={{ background: bg, border: `2px ${val==='?'?'dashed':'solid'} ${bdr}`, borderRadius: 12, padding: '8px 16px', fontFamily:"'Baloo 2',cursive", fontWeight:900, fontSize:'1.8rem', color:'#1a1a1a' }}>{val}</motion.div>
          ))}
        </div>
        <div className="dc-opts">
          {[['140','A'],['151','B'],['160','C'],['165','D']].map(([v,l],i) => (
            <DCOption key={v} value={v} label={l} index={i} onClick={() => lp.handleMcq('n150_q1', v)} className={lp.getMcqClass('n150_q1', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'n150_q2',
    meta: { type: 'mcq', qid: 'n150_q2', correct: '157', explanation: '155, 156, 157, 158 — stepping one by one towards 200!', correctLabel: '157' },
    render: (lp) => (
      <div className="dc-qcard dc-s7">
        <AchievementBadge icon="🪨" label="STONE HOPPER" color="#64748b" />
        <StoryBox emoji="🏃" text="Bholu is hopping stones across the river — 155, 156... one stone is missing! Which number is it?" color="#f8fafc" border="#64748b" />
        <p className="dc-qtext">🪨 155 → 156 → ? → 158. Hop the missing stone!</p>
        <StonePath numbers={[155, 156, 0, 158]} highlight={0} />
        <div className="dc-opts">
          {[['154','A'],['157','B'],['159','C'],['160','D']].map(([v,l],i) => (
            <DCOption key={v} value={v} label={l} index={i} onClick={() => lp.handleMcq('n150_q2', v)} className={lp.getMcqClass('n150_q2', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'n150_q3',
    meta: { type: 'mcq', qid: 'n150_q3', correct: '7', explanation: '175 → H=1, T=7, O=5. The tens digit is 7!', correctLabel: '7' },
    render: (lp) => (
      <div className="dc-qcard dc-s7">
        <AchievementBadge icon="🔍" label="FIND THE DIGIT" color="#1d4ed8" />
        <StoryBox emoji="🏃" text="Bholu passes a signpost: 175 km to finish! What is the tens digit in 175?" color="#eff6ff" border="#1d4ed8" />
        <p className="dc-qtext">🔢 What is the <strong>tens digit</strong> of 175?</p>
        <HTODisplay number={175} highlightCol="T" />
        <div className="dc-opts">
          {[['1','A'],['5','B'],['7','C'],['17','D']].map(([v,l],i) => (
            <DCOption key={v} value={v} label={l} index={i} onClick={() => lp.handleMcq('n150_q3', v)} className={lp.getMcqClass('n150_q3', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'n150_q4',
    meta: { type: 'tf', qid: 'n150_q4_tf', correct: true, explanation: '100 + 100 = 200. Two centuries = one Double Century! That is why this chapter is called Double Century!', correctLabel: 'True' },
    render: (lp) => (
      <div className="dc-qcard dc-s7">
        <AchievementBadge icon="🏏" label="DOUBLE CENTURY!" color="#d97706" />
        <StoryBox emoji="🏏" text="A Double Century means scoring 200 runs in cricket! That's 100 + 100. Is that true?" color="#fffbeb" border="#d97706" />
        <p className="dc-qtext">100 + 100 = <strong>200</strong>. True or False? 🏏</p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, margin: '16px 0', flexWrap: 'wrap' }}>
          {[['100','#dbeafe','#3b82f6'],['+',' ',''],['100','#dbeafe','#3b82f6'],['=','',''],['200','linear-gradient(135deg,#ffd600,#ff9800)','#e65100']].map(([val,bg,bdr],i) => (
            val === '+' || val === '=' ? <motion.span key={i} style={{ fontSize: '1.6rem', fontWeight: 900 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i*0.07 }}>{val}</motion.span> :
            <motion.div key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i*0.1, type:'spring' }}
              style={{ background: bg, border: `2px solid ${bdr}`, borderRadius: 12, padding: '8px 16px', fontFamily:"'Baloo 2',cursive", fontWeight:900, fontSize:'1.8rem', color: val==='200' ? '#7c2d12' : '#1d4ed8' }}>{val}</motion.div>
          ))}
        </div>
        <DCTFButtons qid="n150_q4_tf" lp={lp} />
      </div>
    ),
  },
  {
    id: 'n150_q5',
    meta: { type: 'mcq', qid: 'n150_q5', correct: 'One Hundred Eighty Six', explanation: '186 = 100 + 80 + 6. We say "One Hundred Eighty Six"!', correctLabel: 'One Hundred Eighty Six' },
    render: (lp) => (
      <div className="dc-qcard dc-s7">
        <AchievementBadge icon="📢" label="SAY IT ALOUD!" color="#d97706" />
        <StoryBox emoji="🏃" text="The race commentator announces: '186 metres to go!' How does he say that number?" color="#fffbeb" border="#b45309" />
        <p className="dc-qtext">📝 How do you say <strong>186</strong>?</p>
        <HTODisplay number={186} />
        <div className="dc-opts" style={{ flexDirection: 'column' }}>
          {[['One Hundred Sixty Eight','A'],['One Hundred Eighty Six','B'],['Eighty Six Hundred','C'],['One Hundred Eight Six','D']].map(([v,l],i) => (
            <DCOption key={v} value={v} label={l} index={i} onClick={() => lp.handleMcq('n150_q5', v)} className={lp.getMcqClass('n150_q5', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'n150_q6',
    meta: { type: 'mcq', qid: 'n150_q6', correct: '50', explanation: '150 + 50 = 200! Just like 50 + 50 = 100, double that gives 200!', correctLabel: '50' },
    render: (lp) => (
      <div className="dc-qcard dc-s7">
        <AchievementBadge icon="🏏" label="MAKE 200!" color="#dc2626" />
        <StoryBox emoji="🏏" text="Bholu scored 150 runs! To hit a Double Century, he needs 200. How many more runs does he need?" color="#fef2f2" border="#dc2626" />
        <p className="dc-qtext">🏏 150 + <strong>?</strong> = 200</p>
        <NumberBond100 part1={150} part2={50} unknown="part2" />
        <div className="dc-opts">
          {[['40','A'],['60','B'],['50','C'],['100','D']].map(([v,l],i) => (
            <DCOption key={v} value={v} label={l} index={i} onClick={() => lp.handleMcq('n150_q6', v)} className={lp.getMcqClass('n150_q6', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'n150_q7',
    meta: { type: 'tf', qid: 'n150_q7_tf', correct: true, explanation: '199 + 1 = 200. Just like 99 + 1 = 100! 200 is the Double Century!', correctLabel: 'True' },
    render: (lp) => (
      <div className="dc-qcard dc-s7">
        <AchievementBadge icon="🎯" label="TRUE OR FALSE?" color="#7c3aed" />
        <StoryBox emoji="🏃" text="Bholu is ONE step away from 200! He's on 199. He says 200 comes right after 199. Correct?" color="#f0fdf4" border="#16a34a" />
        <p className="dc-qtext">200 comes right after <strong>199</strong>. True or False? 🏏</p>
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', alignItems: 'center', margin: '16px 0' }}>
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ type: 'spring' }}
            style={{ width: 64, height: 64, background: '#dbeafe', border: '2px solid #3b82f6', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Baloo 2',cursive", fontWeight: 900, fontSize: '1.4rem', color: '#1d4ed8' }}>199</motion.div>
          <motion.span animate={{ x: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1 }} style={{ fontSize: '1.5rem' }}>→</motion.span>
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1, type: 'spring' }}
            style={{ width: 64, height: 64, background: 'linear-gradient(135deg,#ffd600,#ff9800)', border: '2.5px solid #e65100', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Baloo 2',cursive", fontWeight: 900, fontSize: '1.4rem', color: '#7c2d12' }}>200</motion.div>
        </div>
        <DCTFButtons qid="n150_q7_tf" lp={lp} />
      </div>
    ),
  },
  {
    id: 'n150_q8',
    meta: { type: 'mcq', qid: 'n150_q8', correct: '197', explanation: '195, 196, 197, 198 — just before 200! One step at a time!', correctLabel: '197' },
    render: (lp) => (
      <div className="dc-qcard dc-s7">
        <AchievementBadge icon="🪨" label="STONE HOPPER" color="#64748b" />
        <StoryBox emoji="🏃" text="So close to 200! Bholu hops: 195, 196... a stone is missing! Can you find it?" color="#f8fafc" border="#64748b" />
        <p className="dc-qtext">🪨 195 → 196 → ? → 198. What is missing?</p>
        <StonePath numbers={[195, 196, 0, 198]} highlight={0} />
        <div className="dc-opts">
          {[['194','A'],['199','B'],['197','C'],['200','D']].map(([v,l],i) => (
            <DCOption key={v} value={v} label={l} index={i} onClick={() => lp.handleMcq('n150_q8', v)} className={lp.getMcqClass('n150_q8', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'n150_q9',
    meta: { type: 'mcq', qid: 'n150_q9', correct: '2', explanation: '200 → H=2, T=0, O=0. The hundreds digit is 2 — that is TWO hundreds!', correctLabel: '2' },
    render: (lp) => (
      <div className="dc-qcard dc-s7">
        <AchievementBadge icon="🏆" label="DOUBLE CENTURY!" color="#d97706" />
        <StoryBox emoji="🏏" text="200 — the legendary Double Century! H=?, T=0, O=0. What is the hundreds digit of 200?" color="#fffbeb" border="#d97706" />
        <p className="dc-qtext">🏏 What is the hundreds digit of <strong>200</strong>?</p>
        <HTODisplay number={200} highlightCol="H" />
        <div className="dc-opts">
          {[['0','A'],['20','B'],['2','C'],['200','D']].map(([v,l],i) => (
            <DCOption key={v} value={v} label={l} index={i} onClick={() => lp.handleMcq('n150_q9', v)} className={lp.getMcqClass('n150_q9', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'n150_q10',
    matchAnswers: { n150_match10: { 'n150_160': 'One Hundred Sixty', 'n150_175': 'One Hundred Seventy Five', 'n150_190': 'One Hundred Ninety', 'n150_200': 'Two Hundred' } },
    rightItems: [['One Hundred Sixty','One Hundred Sixty'],['One Hundred Seventy Five','One Hundred Seventy Five'],['One Hundred Ninety','One Hundred Ninety'],['Two Hundred','Two Hundred']],
    meta: { type: 'match', totalPairs: 4, explanation: '160=One Hundred Sixty, 175=One Hundred Seventy Five, 190=One Hundred Ninety, 200=Two Hundred!', correctLabel: 'All matched!' },
    render: (lp, ctx) => (
      <div className="dc-qcard dc-s7">
        <AchievementBadge icon="🔗" label="NAME THE NUMBER" color="#b45309" />
        <StoryBox emoji="🏃" text="The race finish board shows numbers, but the names are mixed up! Help Bholu match them!" color="#fffbeb" border="#b45309" />
        <p className="dc-qtext">Match each number to its name! 📖</p>
        <div className="dc-match-wrap">
          <div className="dc-match-col">
            {[['n150_160','160'],['n150_175','175'],['n150_190','190'],['n150_200','200']].map(([val, label], i) => (
              <motion.div key={val} initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }}
                onClick={() => lp.handleMatch('n150_match10','left',val)} className={`dc-match-item ${lp.getMatchClass('n150_match10','left',val)}`}>{label}</motion.div>
            ))}
          </div>
          <div className="dc-match-center">{[0,1,2,3].map(i => <div key={i} className="dc-match-line">→</div>)}</div>
          <div className="dc-match-col" style={{ fontSize: '0.75rem' }}>
            {ctx.shuffledRight.map(([val, label], i) => (
              <motion.div key={val} initial={{ opacity: 0, x: 15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }}
                onClick={() => lp.handleMatch('n150_match10','right',val)} className={`dc-match-item ${lp.getMatchClass('n150_match10','right',val)}`}>{label}</motion.div>
            ))}
          </div>
        </div>
      </div>
    ),
  },
];

const Numbers150to200 = () => {
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
  return <DCPracticeTemplate skillId="DC-07" skillName="Numbers 150 to 200" questions={questions} questionMeta={questionMeta} logicProps={logicProps} />;
};

export default Numbers150to200;
