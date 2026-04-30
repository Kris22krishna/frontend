import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { useGTLogic } from './useGTLogic';
import GTPracticeTemplate from './GTPracticeTemplate';
import { GTOption, GTTFButtons, StoryBox, AchievementBadge, CoinDisplay, NoteDisplay, shuffle } from './GTSharedComponents';
import './give-and-take.css';

const QUESTION_POOL = [
  {
    id: 'gt06_q1',
    meta: { type: 'mcq', qid: 'gt06_q1', correct: '3', explanation: '₹30 ÷ ₹10 = 3. You need 3 notes of ₹10 to make ₹30!', correctLabel: '3' },
    render: (lp) => (
      <div className="gt-qcard gt-s6">
        <AchievementBadge icon="💵" label="MAKING AMOUNTS" color="#ef4444" />
        <StoryBox emoji="🛒" text="Sana wants to pay exactly ₹30 using ₹10 notes. How many ₹10 notes does she need?" color="#fee2e2" border="#ef4444" />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, margin: '14px 0', flexWrap: 'wrap' }}>
          <div style={{ fontFamily: "'Baloo 2',cursive", fontWeight: 900, fontSize: '2rem', color: '#92400e', background: '#fef3c7', border: '2.5px solid #f59e0b', borderRadius: 12, padding: '10px 20px' }}>₹30</div>
          <span style={{ fontSize: '2rem', fontWeight: 900 }}>=</span>
          <div style={{ fontFamily: "'Baloo 2',cursive", fontWeight: 900, fontSize: '1.8rem', color: '#1e40af', background: '#dbeafe', border: '2px dashed #3b82f6', borderRadius: 12, padding: '10px 16px' }}>? × ₹10</div>
        </div>
        <p className="gt-qtext">₹30 = ? × ₹10 notes 💵</p>
        <div className="gt-opts">
          {[['3','A'],['2','B'],['4','C'],['5','D']].map(([v,l],i) => (
            <GTOption key={v} value={v} label={l} index={i} onClick={() => lp.handleMcq('gt06_q1', v)} className={lp.getMcqClass('gt06_q1', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'gt06_q2',
    meta: { type: 'mcq', qid: 'gt06_q2', correct: '4', explanation: '₹20 ÷ ₹5 = 4. Four coins of ₹5 make ₹20!', correctLabel: '4' },
    render: (lp) => (
      <div className="gt-qcard gt-s6">
        <AchievementBadge icon="🪙" label="COIN COUNTING" color="#f59e0b" />
        <StoryBox emoji="🪙" text="Veer needs to make ₹20 using only ₹5 coins. How many ₹5 coins does he need?" color="#fef3c7" border="#f59e0b" />
        <CoinDisplay coins={[{ denom: 5, count: 4 }]} />
        <p className="gt-qtext">₹20 = ? × ₹5 coins 🪙</p>
        <div className="gt-opts">
          {[['4','A'],['3','B'],['5','C'],['2','D']].map(([v,l],i) => (
            <GTOption key={v} value={v} label={l} index={i} onClick={() => lp.handleMcq('gt06_q2', v)} className={lp.getMcqClass('gt06_q2', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'gt06_q3',
    meta: { type: 'tf', qid: 'gt06_q3_tf', correct: true, explanation: '₹10 + ₹5 = ₹15. Yes! One ₹10 and one ₹5 coin make exactly ₹15!', correctLabel: 'True' },
    render: (lp) => (
      <div className="gt-qcard gt-s6">
        <AchievementBadge icon="🎯" label="TRUE OR FALSE?" color="#8b5cf6" />
        <StoryBox emoji="🎒" text="Tina says: I can make ₹15 using 1 coin of ₹10 and 1 coin of ₹5!" color="#f0fdf4" border="#16a34a" />
        <CoinDisplay coins={[{ denom: 10, count: 1 }, { denom: 5, count: 1 }]} />
        <p className="gt-qtext">₹10 + ₹5 = ₹15. Is Tina right?</p>
        <GTTFButtons qid="gt06_q3_tf" lp={lp} />
      </div>
    ),
  },
  {
    id: 'gt06_q4',
    meta: { type: 'mcq', qid: 'gt06_q4', correct: '2', explanation: '₹100 ÷ ₹50 = 2. Two ₹50 notes make ₹100!', correctLabel: '2' },
    render: (lp) => (
      <div className="gt-qcard gt-s6">
        <AchievementBadge icon="💵" label="NOTE PUZZLE!" color="#16a34a" />
        <StoryBox emoji="💵" text="Grandpa wants to exchange a ₹100 note for ₹50 notes. How many ₹50 notes will he get?" color="#f0fdf4" border="#16a34a" />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, margin: '14px 0', flexWrap: 'wrap' }}>
          <NoteDisplay notes={[{ denom: 100, count: 1 }]} />
          <span style={{ fontSize: '2rem', fontWeight: 900 }}>=</span>
          <div style={{ fontFamily: "'Baloo 2',cursive", fontWeight: 900, fontSize: '1.8rem', color: '#9d174d', background: '#fce7f3', border: '2px dashed #ec4899', borderRadius: 12, padding: '10px 16px' }}>? × ₹50</div>
        </div>
        <p className="gt-qtext">₹100 = ? × ₹50 notes 💵</p>
        <div className="gt-opts">
          {[['2','A'],['3','B'],['4','C'],['1','D']].map(([v,l],i) => (
            <GTOption key={v} value={v} label={l} index={i} onClick={() => lp.handleMcq('gt06_q4', v)} className={lp.getMcqClass('gt06_q4', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'gt06_q5',
    meta: { type: 'mcq', qid: 'gt06_q5', correct: '₹120', explanation: '2 × ₹50 = ₹100, plus 2 × ₹10 = ₹20. Total: ₹100 + ₹20 = ₹120!', correctLabel: '₹120' },
    render: (lp) => (
      <div className="gt-qcard gt-s6">
        <AchievementBadge icon="🧮" label="TOTAL MONEY" color="#0d9488" />
        <StoryBox emoji="🧮" text="Priya has 2 notes of ₹50 and 2 notes of ₹10. What is the total amount?" color="#f0fdf4" border="#0d9488" />
        <NoteDisplay notes={[{ denom: 50, count: 2 }, { denom: 10, count: 2 }]} />
        <p className="gt-qtext">₹50 + ₹50 + ₹10 + ₹10 = ? 🧮</p>
        <div className="gt-opts">
          {[['₹120','A'],['₹110','B'],['₹130','C'],['₹100','D']].map(([v,l],i) => (
            <GTOption key={v} value={v} label={l} index={i} onClick={() => lp.handleMcq('gt06_q5', v)} className={lp.getMcqClass('gt06_q5', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'gt06_q6',
    meta: { type: 'tf', qid: 'gt06_q6_tf', correct: false, explanation: '3 × ₹10 = ₹30, plus 2 × ₹5 = ₹10. Total = ₹30 + ₹10 = ₹40. Not ₹35!', correctLabel: 'False' },
    render: (lp) => (
      <div className="gt-qcard gt-s6">
        <AchievementBadge icon="🎯" label="TRUE OR FALSE?" color="#8b5cf6" />
        <StoryBox emoji="🤔" text="Raju says: 3 coins of ₹10 and 2 coins of ₹5 together make ₹35!" color="#fef3c7" border="#f97316" />
        <CoinDisplay coins={[{ denom: 10, count: 3 }, { denom: 5, count: 2 }]} />
        <p className="gt-qtext">3×₹10 + 2×₹5 = ₹35? True or False?</p>
        <GTTFButtons qid="gt06_q6_tf" lp={lp} />
      </div>
    ),
  },
  {
    id: 'gt06_q7',
    meta: { type: 'mcq', qid: 'gt06_q7', correct: '₹5', explanation: 'Priya needs ₹45. She has ₹20 + ₹20 = ₹40. She still needs ₹45 − ₹40 = ₹5 more!', correctLabel: '₹5' },
    render: (lp) => (
      <div className="gt-qcard gt-s6">
        <AchievementBadge icon="🛍️" label="HOW MUCH MORE?" color="#ec4899" />
        <StoryBox emoji="🛍️" text="Priya needs ₹45 to buy a toy. She has two ₹20 notes. How much more money does she need?" color="#fce7f3" border="#ec4899" />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, margin: '14px 0', flexWrap: 'wrap' }}>
          <NoteDisplay notes={[{ denom: 20, count: 2 }]} />
          <span style={{ fontSize: '1.5rem', fontWeight: 900, color: '#9d174d' }}>= ₹40</span>
          <span style={{ fontSize: '1.5rem', fontWeight: 900 }}>|</span>
          <span style={{ fontSize: '1.5rem', fontWeight: 900, color: '#374151' }}>Needs ₹45</span>
        </div>
        <p className="gt-qtext">₹45 − ₹40 = ? more needed 🛍️</p>
        <div className="gt-opts">
          {[['₹5','A'],['₹10','B'],['₹15','C'],['₹25','D']].map(([v,l],i) => (
            <GTOption key={v} value={v} label={l} index={i} onClick={() => lp.handleMcq('gt06_q7', v)} className={lp.getMcqClass('gt06_q7', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'gt06_q8',
    meta: { type: 'mcq', qid: 'gt06_q8', correct: '7', explanation: '₹70 ÷ ₹10 = 7. Seven ₹10 notes make ₹70!', correctLabel: '7' },
    render: (lp) => (
      <div className="gt-qcard gt-s6">
        <AchievementBadge icon="💵" label="COUNT NOTES!" color="#3b82f6" />
        <StoryBox emoji="💵" text="Teacher wants to make exactly ₹70 using ₹10 notes. How many notes are needed?" color="#eff6ff" border="#3b82f6" />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, margin: '14px 0', flexWrap: 'wrap' }}>
          <div style={{ fontFamily: "'Baloo 2',cursive", fontWeight: 900, fontSize: '2rem', color: '#92400e', background: '#fef3c7', border: '2.5px solid #f59e0b', borderRadius: 12, padding: '10px 20px' }}>₹70</div>
          <span style={{ fontSize: '2rem', fontWeight: 900 }}>=</span>
          <div style={{ fontFamily: "'Baloo 2',cursive", fontWeight: 900, fontSize: '1.8rem', color: '#1e40af', background: '#dbeafe', border: '2px dashed #3b82f6', borderRadius: 12, padding: '10px 16px' }}>? × ₹10</div>
        </div>
        <p className="gt-qtext">How many ₹10 notes make ₹70? 💵</p>
        <div className="gt-opts">
          {[['7','A'],['6','B'],['8','C'],['5','D']].map(([v,l],i) => (
            <GTOption key={v} value={v} label={l} index={i} onClick={() => lp.handleMcq('gt06_q8', v)} className={lp.getMcqClass('gt06_q8', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'gt06_q9',
    meta: { type: 'tf', qid: 'gt06_q9_tf', correct: true, explanation: '5 × ₹100 = ₹500. Five hundred-rupee notes make ₹500!', correctLabel: 'True' },
    render: (lp) => (
      <div className="gt-qcard gt-s6">
        <AchievementBadge icon="🎯" label="TRUE OR FALSE?" color="#8b5cf6" />
        <StoryBox emoji="💰" text="Arun says: If I have 5 notes of ₹100, I have ₹500 in total!" color="#f0fdf4" border="#16a34a" />
        <NoteDisplay notes={[{ denom: 100, count: 5 }]} />
        <p className="gt-qtext">5 × ₹100 = ₹500. True or False?</p>
        <GTTFButtons qid="gt06_q9_tf" lp={lp} />
      </div>
    ),
  },
  {
    id: 'gt06_q10',
    matchAnswers: { gt06_match: { 'gt06_m1': '₹20', 'gt06_m2': '₹15', 'gt06_m3': '₹70', 'gt06_m4': '₹40' } },
    rightItems: [['₹20','₹20'],['₹15','₹15'],['₹70','₹70'],['₹40','₹40']],
    meta: { type: 'match', totalPairs: 4, explanation: '2×₹10=₹20, ₹10+₹5=₹15, 7×₹10=₹70, 4×₹10=₹40!', correctLabel: 'All pairs matched!' },
    render: (lp, ctx) => (
      <div className="gt-qcard gt-s6">
        <AchievementBadge icon="🔗" label="MATCH AMOUNTS!" color="#0891b2" />
        <StoryBox emoji="🧩" text="Match each coin/note combination to the correct total amount!" color="#f0fdf4" border="#0d9488" />
        <p className="gt-qtext">Match the combination to the total! 💰</p>
        <div className="gt-match-wrap">
          <div className="gt-match-col">
            {[['gt06_m1','2 × ₹10'],['gt06_m2','₹10 + ₹5'],['gt06_m3','7 × ₹10'],['gt06_m4','4 × ₹10']].map(([val, label], i) => (
              <motion.div key={val} initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }}
                onClick={() => lp.handleMatch('gt06_match','left',val)} className={`gt-match-item ${lp.getMatchClass('gt06_match','left',val)}`}>{label}</motion.div>
            ))}
          </div>
          <div className="gt-match-center">{[0,1,2,3].map(i => <div key={i} className="gt-match-line">→</div>)}</div>
          <div className="gt-match-col">
            {ctx.shuffledRight.map(([val, label], i) => (
              <motion.div key={val} initial={{ opacity: 0, x: 15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }}
                onClick={() => lp.handleMatch('gt06_match','right',val)} className={`gt-match-item ${lp.getMatchClass('gt06_match','right',val)}`}>{label}</motion.div>
            ))}
          </div>
        </div>
      </div>
    ),
  },
];

const MakingAmounts = () => {
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
  return <GTPracticeTemplate skillId="GT-06" skillName="Making Amounts" questions={questions} questionMeta={questionMeta} logicProps={logicProps} />;
};

export default MakingAmounts;
