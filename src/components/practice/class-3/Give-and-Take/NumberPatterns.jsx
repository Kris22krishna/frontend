import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { useGTLogic } from './useGTLogic';
import GTPracticeTemplate from './GTPracticeTemplate';
import { GTOption, GTTFButtons, StoryBox, AchievementBadge, StonePath, shuffle } from './GTSharedComponents';
import './give-and-take.css';

const QUESTION_POOL = [
  {
    id: 'gt07_q1',
    meta: { type: 'mcq', qid: 'gt07_q1', correct: '400', explanation: '100, 200, 300, 400! The pattern adds 100 each time. So the next is 400!', correctLabel: '400' },
    render: (lp) => (
      <div className="gt-qcard gt-s7">
        <AchievementBadge icon="🔢" label="NUMBER PATTERN" color="#16a34a" />
        <StoryBox emoji="🐘" text="Ellie is counting by hundreds: 100, 200, 300... What comes next?" color="#f0fdf4" border="#16a34a" />
        <StonePath numbers={[100, 200, 300, null]} highlight={null} />
        <p className="gt-qtext">100 → 200 → 300 → ? (adding 100 each time) 🔢</p>
        <div className="gt-opts">
          {[['400','A'],['350','B'],['500','C'],['310','D']].map(([v,l],i) => (
            <GTOption key={v} value={v} label={l} index={i} onClick={() => lp.handleMcq('gt07_q1', v)} className={lp.getMcqClass('gt07_q1', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'gt07_q2',
    meta: { type: 'mcq', qid: 'gt07_q2', correct: '40', explanation: '10, 20, 30, 40! The pattern adds 10 each time. Next is 40!', correctLabel: '40' },
    render: (lp) => (
      <div className="gt-qcard gt-s7">
        <AchievementBadge icon="🦘" label="JUMP BY 10!" color="#0d9488" />
        <StoryBox emoji="🦘" text="Kanga jumps by 10 each time: 10, 20, 30... Where does she land next?" color="#f0fdf4" border="#0d9488" />
        <StonePath numbers={[10, 20, 30, null]} highlight={null} />
        <p className="gt-qtext">10 → 20 → 30 → ? (adding 10 each time) 🦘</p>
        <div className="gt-opts">
          {[['40','A'],['35','B'],['45','C'],['31','D']].map(([v,l],i) => (
            <GTOption key={v} value={v} label={l} index={i} onClick={() => lp.handleMcq('gt07_q2', v)} className={lp.getMcqClass('gt07_q2', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'gt07_q3',
    meta: { type: 'tf', qid: 'gt07_q3_tf', correct: true, explanation: '5, 10, 15, 20, 25 — yes! Each number is 5 more than the previous. Correct pattern!', correctLabel: 'True' },
    render: (lp) => (
      <div className="gt-qcard gt-s7">
        <AchievementBadge icon="🎯" label="TRUE OR FALSE?" color="#8b5cf6" />
        <StoryBox emoji="⭐" text="Star says: 5, 10, 15, 20, 25 — I am counting by 5s!" color="#f0fdf4" border="#16a34a" />
        <StonePath numbers={[5, 10, 15, 20, 25]} highlight={25} />
        <p className="gt-qtext">5, 10, 15, 20, 25 is counting by 5s. True or False?</p>
        <GTTFButtons qid="gt07_q3_tf" lp={lp} />
      </div>
    ),
  },
  {
    id: 'gt07_q4',
    meta: { type: 'mcq', qid: 'gt07_q4', correct: '200', explanation: '50, 100, 150, 200! Each jump is +50. After 150 comes 200!', correctLabel: '200' },
    render: (lp) => (
      <div className="gt-qcard gt-s7">
        <AchievementBadge icon="🚀" label="JUMP BY 50!" color="#f97316" />
        <StoryBox emoji="🚀" text="Rocket counts by 50s: 50, 100, 150... What number does it reach next?" color="#fef3c7" border="#f97316" />
        <StonePath numbers={[50, 100, 150, null]} highlight={null} />
        <p className="gt-qtext">50 → 100 → 150 → ? (adding 50 each time) 🚀</p>
        <div className="gt-opts">
          {[['200','A'],['175','B'],['160','C'],['250','D']].map(([v,l],i) => (
            <GTOption key={v} value={v} label={l} index={i} onClick={() => lp.handleMcq('gt07_q4', v)} className={lp.getMcqClass('gt07_q4', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'gt07_q5',
    meta: { type: 'mcq', qid: 'gt07_q5', correct: '60', explanation: '90, 80, 70, 60! The pattern subtracts 10 each time. After 70 comes 60!', correctLabel: '60' },
    render: (lp) => (
      <div className="gt-qcard gt-s7">
        <AchievementBadge icon="⬇️" label="COUNT DOWN!" color="#ef4444" />
        <StoryBox emoji="🐢" text="Tortoise counts backwards by 10: 90, 80, 70... What comes next?" color="#fee2e2" border="#ef4444" />
        <StonePath numbers={[90, 80, 70, null]} highlight={null} />
        <p className="gt-qtext">90 → 80 → 70 → ? (subtracting 10 each time) ⬇️</p>
        <div className="gt-opts">
          {[['60','A'],['65','B'],['50','C'],['75','D']].map(([v,l],i) => (
            <GTOption key={v} value={v} label={l} index={i} onClick={() => lp.handleMcq('gt07_q5', v)} className={lp.getMcqClass('gt07_q5', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'gt07_q6',
    meta: { type: 'tf', qid: 'gt07_q6_tf', correct: true, explanation: '200 + 100 = 300. Adding 100 takes us from 200 to 300. Correct!', correctLabel: 'True' },
    render: (lp) => (
      <div className="gt-qcard gt-s7">
        <AchievementBadge icon="🎯" label="TRUE OR FALSE?" color="#8b5cf6" />
        <StoryBox emoji="🦁" text="Leo the lion says: In the +100 pattern, after 200 comes 300!" color="#fef3c7" border="#f59e0b" />
        <div style={{ display: 'flex', gap: 8, justifyContent: 'center', margin: '14px 0', flexWrap: 'wrap' }}>
          {[100, 200].map((n, i) => (
            <motion.div key={n} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i * 0.1, type: 'spring' }}
              style={{ background: '#f0fdf4', border: '2px solid #16a34a', borderRadius: 12, padding: '10px 16px', fontFamily: "'Baloo 2',cursive", fontWeight: 900, fontSize: '1.4rem', color: '#15803d' }}>{n}</motion.div>
          ))}
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: 'spring' }}
            style={{ background: '#fef3c7', border: '2px solid #f59e0b', borderRadius: 12, padding: '10px 16px', fontFamily: "'Baloo 2',cursive", fontWeight: 900, fontSize: '1.4rem', color: '#78350f' }}>300</motion.div>
        </div>
        <p className="gt-qtext">100, 200, 300 — adds 100 each time. True or False?</p>
        <GTTFButtons qid="gt07_q6_tf" lp={lp} />
      </div>
    ),
  },
  {
    id: 'gt07_q7',
    meta: { type: 'mcq', qid: 'gt07_q7', correct: '40', explanation: '25, 30, 35, 40! Adding 5 each time. After 35 comes 40!', correctLabel: '40' },
    render: (lp) => (
      <div className="gt-qcard gt-s7">
        <AchievementBadge icon="🌟" label="FIND THE NEXT!" color="#f59e0b" />
        <StoryBox emoji="🌟" text="Stars in the sky: 25, 30, 35... How many stars come next?" color="#fef3c7" border="#f59e0b" />
        <StonePath numbers={[25, 30, 35, null]} highlight={null} />
        <p className="gt-qtext">25 → 30 → 35 → ? (adding 5 each time) 🌟</p>
        <div className="gt-opts">
          {[['40','A'],['36','B'],['45','C'],['38','D']].map(([v,l],i) => (
            <GTOption key={v} value={v} label={l} index={i} onClick={() => lp.handleMcq('gt07_q7', v)} className={lp.getMcqClass('gt07_q7', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'gt07_q8',
    meta: { type: 'mcq', qid: 'gt07_q8', correct: '120', explanation: '110, ___, 130, 140. The pattern adds 10 each time. Missing number is 110+10 = 120!', correctLabel: '120' },
    render: (lp) => (
      <div className="gt-qcard gt-s7">
        <AchievementBadge icon="❓" label="FILL THE GAP!" color="#3b82f6" />
        <StoryBox emoji="🔍" text="Detective Dino finds a missing number in the pattern: 110, ___, 130, 140. Can you find it?" color="#eff6ff" border="#3b82f6" />
        <StonePath numbers={[110, null, 130, 140]} highlight={null} />
        <p className="gt-qtext">110, ?, 130, 140 — what is the missing number? 🔍</p>
        <div className="gt-opts">
          {[['120','A'],['115','B'],['125','C'],['111','D']].map(([v,l],i) => (
            <GTOption key={v} value={v} label={l} index={i} onClick={() => lp.handleMcq('gt07_q8', v)} className={lp.getMcqClass('gt07_q8', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'gt07_q9',
    meta: { type: 'tf', qid: 'gt07_q9_tf', correct: true, explanation: '300, 200, 100 — each number is 100 less than the one before. It goes DOWN by 100!', correctLabel: 'True' },
    render: (lp) => (
      <div className="gt-qcard gt-s7">
        <AchievementBadge icon="🎯" label="TRUE OR FALSE?" color="#8b5cf6" />
        <StoryBox emoji="🐦" text="Parrot says: 300, 200, 100 — this pattern goes DOWN by 100 each time!" color="#f0fdf4" border="#16a34a" />
        <StonePath numbers={[300, 200, 100]} highlight={100} />
        <p className="gt-qtext">300, 200, 100 decreases by 100 each time. True or False?</p>
        <GTTFButtons qid="gt07_q9_tf" lp={lp} />
      </div>
    ),
  },
  {
    id: 'gt07_q10',
    matchAnswers: { gt07_match: { 'gt07_m1': '400', 'gt07_m2': '40', 'gt07_m3': '200', 'gt07_m4': '60' } },
    rightItems: [['400','400'],['40','40'],['200','200'],['60','60']],
    meta: { type: 'match', totalPairs: 4, explanation: '+100 pattern: next after 300 = 400. +10: next after 30 = 40. +50: next after 150 = 200. −10: next after 70 = 60!', correctLabel: 'All pairs matched!' },
    render: (lp, ctx) => (
      <div className="gt-qcard gt-s7">
        <AchievementBadge icon="🔗" label="MATCH PATTERN!" color="#0891b2" />
        <StoryBox emoji="🧩" text="Match each number pattern to what comes next! Follow the rule carefully!" color="#f0fdf4" border="#0d9488" />
        <p className="gt-qtext">Match each pattern to its next number! 🎯</p>
        <div className="gt-match-wrap">
          <div className="gt-match-col">
            {[['gt07_m1','100→200→300→?'],['gt07_m2','10→20→30→?'],['gt07_m3','50→100→150→?'],['gt07_m4','90→80→70→?']].map(([val, label], i) => (
              <motion.div key={val} initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }}
                onClick={() => lp.handleMatch('gt07_match','left',val)} className={`gt-match-item ${lp.getMatchClass('gt07_match','left',val)}`}>{label}</motion.div>
            ))}
          </div>
          <div className="gt-match-center">{[0,1,2,3].map(i => <div key={i} className="gt-match-line">→</div>)}</div>
          <div className="gt-match-col">
            {ctx.shuffledRight.map(([val, label], i) => (
              <motion.div key={val} initial={{ opacity: 0, x: 15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }}
                onClick={() => lp.handleMatch('gt07_match','right',val)} className={`gt-match-item ${lp.getMatchClass('gt07_match','right',val)}`}>{label}</motion.div>
            ))}
          </div>
        </div>
      </div>
    ),
  },
];

const NumberPatterns = () => {
  const selRef = useRef(null);
  if (!selRef.current) {
    selRef.current = shuffle([...QUESTION_POOL]).slice(0, 5).map(q =>
      q.rightItems ? { ...q, shuffledRight: shuffle([...q.rightItems]) } : q
    );
  }
  const selected = selRef.current;
  const matchAnswers = {};
  selected.forEach(q => { if (q.matchAnswers) Object.assign(matchAnswers, q.matchAnswers); });
  const logicProps = useGTLogic(matchAnswers);
  const questions = selected.map(q => <React.Fragment key={q.id}>{q.render(logicProps, q)}</React.Fragment>);
  const questionMeta = selected.map(q => q.meta);
  return <GTPracticeTemplate skillId="GT-07" skillName="Number Patterns" questions={questions} questionMeta={questionMeta} logicProps={logicProps} />;
};

export default NumberPatterns;
