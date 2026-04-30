import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { useGTLogic } from './useGTLogic';
import GTPracticeTemplate from './GTPracticeTemplate';
import { GTOption, GTTFButtons, StoryBox, AchievementBadge, StonePath, shuffle } from './GTSharedComponents';
import './give-and-take.css';

const QUESTION_POOL = [
  {
    id: 'gt08_q1',
    meta: { type: 'mcq', qid: 'gt08_q1', correct: '435', explanation: 'To compare 345 and 435: look at hundreds. 3 hundreds < 4 hundreds. So 435 is bigger!', correctLabel: '435' },
    render: (lp) => (
      <div className="gt-qcard gt-s8">
        <AchievementBadge icon="🧠" label="THINK FAST!" color="#ec4899" />
        <StoryBox emoji="🦁" text="Leo has 345 sticks. Giri has 435 sticks. Who has MORE sticks?" color="#fce7f3" border="#ec4899" />
        <div style={{ display: 'flex', gap: 20, justifyContent: 'center', margin: '14px 0', flexWrap: 'wrap' }}>
          <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} transition={{ type: 'spring' }}
            style={{ background: '#eff6ff', border: '2.5px solid #3b82f6', borderRadius: 14, padding: '14px 20px', textAlign: 'center', fontFamily: "'Baloo 2',cursive" }}>
            <div style={{ fontSize: '0.8rem', color: '#6b7280', marginBottom: 4 }}>🦁 Leo</div>
            <div style={{ fontSize: '2.2rem', fontWeight: 900, color: '#1e40af' }}>345</div>
          </motion.div>
          <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.1 }}
            style={{ background: '#f0fdf4', border: '2.5px solid #16a34a', borderRadius: 14, padding: '14px 20px', textAlign: 'center', fontFamily: "'Baloo 2',cursive" }}>
            <div style={{ fontSize: '0.8rem', color: '#6b7280', marginBottom: 4 }}>🐻 Giri</div>
            <div style={{ fontSize: '2.2rem', fontWeight: 900, color: '#15803d' }}>435</div>
          </motion.div>
        </div>
        <p className="gt-qtext">Which is greater: 345 or 435? 🧠</p>
        <div className="gt-opts">
          {[['435','A'],['345','B'],['Both equal','C'],["Can't say",'D']].map(([v,l],i) => (
            <GTOption key={v} value={v} label={l} index={i} onClick={() => lp.handleMcq('gt08_q1', v)} className={lp.getMcqClass('gt08_q1', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'gt08_q2',
    meta: { type: 'mcq', qid: 'gt08_q2', correct: '500', explanation: '200 + 300 = 500! Two hundreds plus three hundreds = five hundreds!', correctLabel: '500' },
    render: (lp) => (
      <div className="gt-qcard gt-s8">
        <AchievementBadge icon="⚡" label="QUICK MATH!" color="#f59e0b" />
        <StoryBox emoji="⚡" text="Sparky says: 200 + 300 = ? Think quickly, don't calculate on paper!" color="#fef3c7" border="#f59e0b" />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, margin: '14px 0', flexWrap: 'wrap' }}>
          {[{ n: 200, bg: '#dbeafe', bc: '#3b82f6', c: '#1e40af' }, { n: 300, bg: '#dcfce7', bc: '#16a34a', c: '#14532d' }].map((item, i) => (
            <motion.div key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i * 0.1, type: 'spring' }}
              style={{ background: item.bg, border: `2.5px solid ${item.bc}`, borderRadius: 14, padding: '12px 18px', fontFamily: "'Baloo 2',cursive", fontWeight: 900, fontSize: '1.8rem', color: item.c }}>
              {item.n}
            </motion.div>
          ))}
        </div>
        <p className="gt-qtext">200 + 300 = ? ⚡</p>
        <div className="gt-opts">
          {[['500','A'],['400','B'],['600','C'],['230','D']].map(([v,l],i) => (
            <GTOption key={v} value={v} label={l} index={i} onClick={() => lp.handleMcq('gt08_q2', v)} className={lp.getMcqClass('gt08_q2', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'gt08_q3',
    meta: { type: 'tf', qid: 'gt08_q3_tf', correct: true, explanation: '99 + 1 = 100! 99 is just 1 away from 100. Add 1 more to make 100!', correctLabel: 'True' },
    render: (lp) => (
      <div className="gt-qcard gt-s8">
        <AchievementBadge icon="🎯" label="TRUE OR FALSE?" color="#8b5cf6" />
        <StoryBox emoji="🎈" text="Balloon Benny says: 99 + 1 = 100! Just one more makes a hundred!" color="#f0fdf4" border="#16a34a" />
        <StonePath numbers={[99, 100]} highlight={100} />
        <p className="gt-qtext">99 + 1 = 100. True or False?</p>
        <GTTFButtons qid="gt08_q3_tf" lp={lp} />
      </div>
    ),
  },
  {
    id: 'gt08_q4',
    meta: { type: 'mcq', qid: 'gt08_q4', correct: '200', explanation: '157 is between 100 and 200. Since 157 is closer to 200 (only 43 away vs 57 away from 100), we round to 200!', correctLabel: '200' },
    render: (lp) => (
      <div className="gt-qcard gt-s8">
        <AchievementBadge icon="🎯" label="ROUND IT!" color="#16a34a" />
        <StoryBox emoji="🎯" text="Round the number 157 to the nearest hundred. Which hundred is it closer to?" color="#f0fdf4" border="#16a34a" />
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', margin: '14px 0', alignItems: 'center', flexWrap: 'wrap' }}>
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring' }}
            style={{ background: '#dbeafe', border: '2px solid #3b82f6', borderRadius: 12, padding: '10px 16px', fontFamily: "'Baloo 2',cursive", fontWeight: 900, fontSize: '1.4rem', color: '#1e40af' }}>100</motion.div>
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.1 }}
            style={{ background: '#fef3c7', border: '3px solid #f59e0b', borderRadius: 12, padding: '12px 20px', fontFamily: "'Baloo 2',cursive", fontWeight: 900, fontSize: '2rem', color: '#78350f' }}>157</motion.div>
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.2 }}
            style={{ background: '#dcfce7', border: '2px solid #16a34a', borderRadius: 12, padding: '10px 16px', fontFamily: "'Baloo 2',cursive", fontWeight: 900, fontSize: '1.4rem', color: '#14532d' }}>200</motion.div>
        </div>
        <p className="gt-qtext">Round 157 to the nearest 100? 🎯</p>
        <div className="gt-opts">
          {[['200','A'],['100','B'],['150','C'],['160','D']].map(([v,l],i) => (
            <GTOption key={v} value={v} label={l} index={i} onClick={() => lp.handleMcq('gt08_q4', v)} className={lp.getMcqClass('gt08_q4', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'gt08_q5',
    meta: { type: 'mcq', qid: 'gt08_q5', correct: '300', explanation: '500 − 200 = 300! Five hundreds minus two hundreds = three hundreds!', correctLabel: '300' },
    render: (lp) => (
      <div className="gt-qcard gt-s8">
        <AchievementBadge icon="⚡" label="QUICK MATH!" color="#ef4444" />
        <StoryBox emoji="⚡" text="Sparky asks: What is 500 minus 200? Use your head — no pencil needed!" color="#fee2e2" border="#ef4444" />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, margin: '14px 0', flexWrap: 'wrap' }}>
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring' }}
            style={{ background: '#dcfce7', border: '2.5px solid #16a34a', borderRadius: 14, padding: '12px 18px', fontFamily: "'Baloo 2',cursive", fontWeight: 900, fontSize: '1.8rem', color: '#14532d' }}>500</motion.div>
          <span style={{ fontSize: '2rem', fontWeight: 900, color: '#ef4444' }}>−</span>
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.1 }}
            style={{ background: '#fee2e2', border: '2.5px solid #ef4444', borderRadius: 14, padding: '12px 18px', fontFamily: "'Baloo 2',cursive", fontWeight: 900, fontSize: '1.8rem', color: '#7f1d1d' }}>200</motion.div>
        </div>
        <p className="gt-qtext">500 − 200 = ? ⚡</p>
        <div className="gt-opts">
          {[['300','A'],['200','B'],['400','C'],['700','D']].map(([v,l],i) => (
            <GTOption key={v} value={v} label={l} index={i} onClick={() => lp.handleMcq('gt08_q5', v)} className={lp.getMcqClass('gt08_q5', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'gt08_q6',
    meta: { type: 'tf', qid: 'gt08_q6_tf', correct: true, explanation: '150 + 150 = 300! One hundred fifty plus one hundred fifty equals three hundred!', correctLabel: 'True' },
    render: (lp) => (
      <div className="gt-qcard gt-s8">
        <AchievementBadge icon="🎯" label="TRUE OR FALSE?" color="#8b5cf6" />
        <StoryBox emoji="🐝" text="Busy Bee says: 150 + 150 = 300! Two halves of 300 make 300!" color="#fef3c7" border="#f59e0b" />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, margin: '14px 0', flexWrap: 'wrap' }}>
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring' }}
            style={{ background: '#fef3c7', border: '2px solid #f59e0b', borderRadius: 12, padding: '10px 16px', fontFamily: "'Baloo 2',cursive", fontWeight: 900, fontSize: '1.5rem', color: '#78350f' }}>150</motion.div>
          <span style={{ fontSize: '1.8rem', fontWeight: 900 }}>+</span>
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.1 }}
            style={{ background: '#fef3c7', border: '2px solid #f59e0b', borderRadius: 12, padding: '10px 16px', fontFamily: "'Baloo 2',cursive", fontWeight: 900, fontSize: '1.5rem', color: '#78350f' }}>150</motion.div>
          <span style={{ fontSize: '1.8rem', fontWeight: 900 }}>=</span>
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.2 }}
            style={{ background: '#dcfce7', border: '2px solid #16a34a', borderRadius: 12, padding: '10px 16px', fontFamily: "'Baloo 2',cursive", fontWeight: 900, fontSize: '1.5rem', color: '#14532d' }}>300</motion.div>
        </div>
        <p className="gt-qtext">150 + 150 = 300. True or False?</p>
        <GTTFButtons qid="gt08_q6_tf" lp={lp} />
      </div>
    ),
  },
  {
    id: 'gt08_q7',
    meta: { type: 'mcq', qid: 'gt08_q7', correct: '543', explanation: 'To make the LARGEST number from digits 3, 4, 5: put the biggest digit first = 543!', correctLabel: '543' },
    render: (lp) => (
      <div className="gt-qcard gt-s8">
        <AchievementBadge icon="🏆" label="MAKE BIGGEST!" color="#f59e0b" />
        <StoryBox emoji="🏆" text="Using digits 3, 4, and 5 (each once), arrange them to make the BIGGEST number possible!" color="#fef3c7" border="#f59e0b" />
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', margin: '14px 0' }}>
          {['5','4','3'].map((d, i) => (
            <motion.div key={d} initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: i * 0.12, type: 'spring' }}
              style={{ background: '#fef3c7', border: '3px solid #f59e0b', borderRadius: 12, width: 48, height: 56, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Baloo 2',cursive", fontWeight: 900, fontSize: '2rem', color: '#78350f' }}>{d}</motion.div>
          ))}
        </div>
        <p className="gt-qtext">Arrange 3, 4, 5 to make the largest 3-digit number! 🏆</p>
        <div className="gt-opts">
          {[['543','A'],['354','B'],['435','C'],['345','D']].map(([v,l],i) => (
            <GTOption key={v} value={v} label={l} index={i} onClick={() => lp.handleMcq('gt08_q7', v)} className={lp.getMcqClass('gt08_q7', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'gt08_q8',
    meta: { type: 'mcq', qid: 'gt08_q8', correct: '300', explanation: '100 + 100 + 100 = 300! Three hundreds make three hundred!', correctLabel: '300' },
    render: (lp) => (
      <div className="gt-qcard gt-s8">
        <AchievementBadge icon="⚡" label="QUICK ADD!" color="#16a34a" />
        <StoryBox emoji="⚡" text="Three friends each have ₹100. How much money do they have together?" color="#f0fdf4" border="#16a34a" />
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', margin: '14px 0', flexWrap: 'wrap' }}>
          {['👦','👧','🧒'].map((e, i) => (
            <motion.div key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i * 0.1, type: 'spring' }}
              style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem' }}>{e}</div>
              <div style={{ background: '#dcfce7', border: '2px solid #16a34a', borderRadius: 10, padding: '6px 12px', fontFamily: "'Baloo 2',cursive", fontWeight: 900, fontSize: '1.2rem', color: '#14532d', marginTop: 4 }}>₹100</div>
            </motion.div>
          ))}
        </div>
        <p className="gt-qtext">₹100 + ₹100 + ₹100 = ? ⚡</p>
        <div className="gt-opts">
          {[['300','A'],['200','B'],['400','C'],['3','D']].map(([v,l],i) => (
            <GTOption key={v} value={v} label={l} index={i} onClick={() => lp.handleMcq('gt08_q8', v)} className={lp.getMcqClass('gt08_q8', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'gt08_q9',
    meta: { type: 'tf', qid: 'gt08_q9_tf', correct: true, explanation: '250 > 200 because 250 has 2 hundreds and 5 tens, while 200 has only 2 hundreds!', correctLabel: 'True' },
    render: (lp) => (
      <div className="gt-qcard gt-s8">
        <AchievementBadge icon="🎯" label="TRUE OR FALSE?" color="#8b5cf6" />
        <StoryBox emoji="🐨" text="Koala says: 250 is greater than 200 because it has 50 extra!" color="#f0fdf4" border="#16a34a" />
        <div style={{ display: 'flex', gap: 20, justifyContent: 'center', margin: '14px 0', flexWrap: 'wrap' }}>
          {[{ n: 250, bg: '#dcfce7', bc: '#16a34a', c: '#14532d', label: 'Bigger?' }, { n: 200, bg: '#dbeafe', bc: '#3b82f6', c: '#1e40af', label: 'Smaller?' }].map((item, i) => (
            <motion.div key={i} initial={{ scale: 0.8 }} animate={{ scale: 1 }} transition={{ delay: i * 0.1, type: 'spring' }}
              style={{ background: item.bg, border: `2.5px solid ${item.bc}`, borderRadius: 14, padding: '12px 18px', textAlign: 'center', fontFamily: "'Baloo 2',cursive" }}>
              <div style={{ fontSize: '2rem', fontWeight: 900, color: item.c }}>{item.n}</div>
              <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>{item.label}</div>
            </motion.div>
          ))}
        </div>
        <p className="gt-qtext">250 &gt; 200. True or False?</p>
        <GTTFButtons qid="gt08_q9_tf" lp={lp} />
      </div>
    ),
  },
  {
    id: 'gt08_q10',
    meta: { type: 'mcq', qid: 'gt08_q10', correct: '300', explanation: '198 rounds to 200 and 102 rounds to 100. Estimated sum = 200 + 100 = 300! Close to the real answer 300!', correctLabel: '300' },
    render: (lp) => (
      <div className="gt-qcard gt-s8">
        <AchievementBadge icon="🎯" label="ESTIMATE!" color="#0d9488" />
        <StoryBox emoji="🎯" text="Estimate 198 + 102 by rounding each number to the nearest 100 first!" color="#f0fdf4" border="#0d9488" />
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', margin: '14px 0', flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: "'Baloo 2',cursive", fontWeight: 700, fontSize: '0.8rem', color: '#6b7280' }}>198 rounds to →</div>
            <div style={{ background: '#fef3c7', border: '2px solid #f59e0b', borderRadius: 10, padding: '8px 14px', fontFamily: "'Baloo 2',cursive", fontWeight: 900, fontSize: '1.5rem', color: '#78350f' }}>200</div>
          </div>
          <span style={{ fontSize: '1.8rem', fontWeight: 900 }}>+</span>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: "'Baloo 2',cursive", fontWeight: 700, fontSize: '0.8rem', color: '#6b7280' }}>102 rounds to →</div>
            <div style={{ background: '#fef3c7', border: '2px solid #f59e0b', borderRadius: 10, padding: '8px 14px', fontFamily: "'Baloo 2',cursive", fontWeight: 900, fontSize: '1.5rem', color: '#78350f' }}>100</div>
          </div>
          <span style={{ fontSize: '1.8rem', fontWeight: 900 }}>= ?</span>
        </div>
        <p className="gt-qtext">Estimated answer of 198 + 102 = ? 🎯</p>
        <div className="gt-opts">
          {[['300','A'],['200','B'],['400','C'],['250','D']].map(([v,l],i) => (
            <GTOption key={v} value={v} label={l} index={i} onClick={() => lp.handleMcq('gt08_q10', v)} className={lp.getMcqClass('gt08_q10', v)} />
          ))}
        </div>
      </div>
    ),
  },
];

const MentalMath = () => {
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
  return <GTPracticeTemplate skillId="GT-08" skillName="Mental Math & Estimation" questions={questions} questionMeta={questionMeta} logicProps={logicProps} />;
};

export default MentalMath;
