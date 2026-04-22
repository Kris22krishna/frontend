import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { useGTLogic } from './useGTLogic';
import GTPracticeTemplate from './GTPracticeTemplate';
import { GTOption, GTTFButtons, StoryBox, AchievementBadge, CoinDisplay, NoteDisplay, shuffle } from './GTSharedComponents';
import './give-and-take.css';

const QUESTION_POOL = [
  {
    id: 'gt05_q1',
    meta: { type: 'mcq', qid: 'gt05_q1', correct: '₹30', explanation: '3 coins of ₹10 each = 3 × 10 = ₹30! Count all coins together.', correctLabel: '₹30' },
    render: (lp) => (
      <div className="gt-qcard gt-s5">
        <AchievementBadge icon="🪙" label="COUNT COINS!" color="#f59e0b" />
        <StoryBox emoji="🪙" text="Ria has 3 coins of ₹10 each. How much money does she have in total?" color="#fef3c7" border="#f59e0b" />
        <CoinDisplay coins={[{ denom: 10, count: 3 }]} />
        <p className="gt-qtext">3 × ₹10 = ? 🪙</p>
        <div className="gt-opts">
          {[['₹30','A'],['₹13','B'],['₹20','C'],['₹10','D']].map(([v,l],i) => (
            <GTOption key={v} value={v} label={l} index={i} onClick={() => lp.handleMcq('gt05_q1', v)} className={lp.getMcqClass('gt05_q1', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'gt05_q2',
    meta: { type: 'mcq', qid: 'gt05_q2', correct: '₹25', explanation: '2 ₹10 coins = ₹20, plus 1 ₹5 coin = ₹5. Total: ₹20 + ₹5 = ₹25!', correctLabel: '₹25' },
    render: (lp) => (
      <div className="gt-qcard gt-s5">
        <AchievementBadge icon="💰" label="ADD MONEY!" color="#16a34a" />
        <StoryBox emoji="💰" text="Raj has 2 coins of ₹10 and 1 coin of ₹5. How much money does he have?" color="#f0fdf4" border="#16a34a" />
        <CoinDisplay coins={[{ denom: 10, count: 2 }, { denom: 5, count: 1 }]} />
        <p className="gt-qtext">₹10 + ₹10 + ₹5 = ? 💰</p>
        <div className="gt-opts">
          {[['₹25','A'],['₹15','B'],['₹20','C'],['₹30','D']].map(([v,l],i) => (
            <GTOption key={v} value={v} label={l} index={i} onClick={() => lp.handleMcq('gt05_q2', v)} className={lp.getMcqClass('gt05_q2', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'gt05_q3',
    meta: { type: 'tf', qid: 'gt05_q3_tf', correct: true, explanation: '10 coins of ₹10 = 10 × ₹10 = ₹100. Yes! Ten ₹10 coins make ₹100!', correctLabel: 'True' },
    render: (lp) => (
      <div className="gt-qcard gt-s5">
        <AchievementBadge icon="🎯" label="TRUE OR FALSE?" color="#8b5cf6" />
        <StoryBox emoji="🏦" text="The shopkeeper says: 10 coins of ₹10 are the same as ₹100!" color="#f0fdf4" border="#16a34a" />
        <CoinDisplay coins={[{ denom: 10, count: 10 }]} />
        <p className="gt-qtext">10 × ₹10 = ₹100. True or False?</p>
        <GTTFButtons qid="gt05_q3_tf" lp={lp} />
      </div>
    ),
  },
  {
    id: 'gt05_q4',
    meta: { type: 'mcq', qid: 'gt05_q4', correct: '5', explanation: '₹25 ÷ ₹5 = 5. So 5 coins of ₹5 make ₹25!', correctLabel: '5' },
    render: (lp) => (
      <div className="gt-qcard gt-s5">
        <AchievementBadge icon="🪙" label="COIN PUZZLE!" color="#f97316" />
        <StoryBox emoji="🪙" text="Manu wants to make ₹25 using only ₹5 coins. How many ₹5 coins does he need?" color="#fef3c7" border="#f97316" />
        <div style={{ display: 'flex', justifyContent: 'center', margin: '12px 0' }}>
          <div style={{ background: '#fef9c3', border: '2px dashed #f59e0b', borderRadius: 12, padding: '12px 20px', fontFamily: "'Baloo 2',cursive", fontWeight: 900, fontSize: '1.8rem', color: '#78350f' }}>₹25</div>
          <span style={{ fontSize: '2rem', margin: '0 12px', alignSelf: 'center' }}>=</span>
          <div style={{ fontFamily: "'Baloo 2',cursive", fontWeight: 900, fontSize: '1.8rem', color: '#92400e', alignSelf: 'center' }}>? × ₹5</div>
        </div>
        <p className="gt-qtext">How many ₹5 coins make ₹25? 🪙</p>
        <div className="gt-opts">
          {[['5','A'],['4','B'],['6','C'],['3','D']].map(([v,l],i) => (
            <GTOption key={v} value={v} label={l} index={i} onClick={() => lp.handleMcq('gt05_q4', v)} className={lp.getMcqClass('gt05_q4', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'gt05_q5',
    meta: { type: 'mcq', qid: 'gt05_q5', correct: '₹80', explanation: '₹50 + ₹30 = ₹80! Add the two notes together.', correctLabel: '₹80' },
    render: (lp) => (
      <div className="gt-qcard gt-s5">
        <AchievementBadge icon="💵" label="ADD NOTES!" color="#3b82f6" />
        <StoryBox emoji="💵" text="Maya has a ₹50 note and a ₹30... wait, she has a ₹50 note and three ₹10 notes. Total?" color="#eff6ff" border="#3b82f6" />
        <NoteDisplay notes={[{ denom: 50, count: 1 }, { denom: 10, count: 3 }]} />
        <p className="gt-qtext">₹50 + ₹10 + ₹10 + ₹10 = ? 💵</p>
        <div className="gt-opts">
          {[['₹80','A'],['₹70','B'],['₹60','C'],['₹90','D']].map(([v,l],i) => (
            <GTOption key={v} value={v} label={l} index={i} onClick={() => lp.handleMcq('gt05_q5', v)} className={lp.getMcqClass('gt05_q5', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'gt05_q6',
    meta: { type: 'tf', qid: 'gt05_q6_tf', correct: true, explanation: '2 × ₹50 = ₹100. Two fifty-rupee notes make one hundred rupees!', correctLabel: 'True' },
    render: (lp) => (
      <div className="gt-qcard gt-s5">
        <AchievementBadge icon="🎯" label="TRUE OR FALSE?" color="#8b5cf6" />
        <StoryBox emoji="💸" text="Papa says: Two ₹50 notes are the same as one ₹100 note!" color="#f0fdf4" border="#16a34a" />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, margin: '14px 0', flexWrap: 'wrap' }}>
          <NoteDisplay notes={[{ denom: 50, count: 2 }]} />
          <span style={{ fontSize: '2rem', fontWeight: 900 }}>=</span>
          <NoteDisplay notes={[{ denom: 100, count: 1 }]} />
        </div>
        <p className="gt-qtext">2 × ₹50 = ₹100. True or False?</p>
        <GTTFButtons qid="gt05_q6_tf" lp={lp} />
      </div>
    ),
  },
  {
    id: 'gt05_q7',
    meta: { type: 'mcq', qid: 'gt05_q7', correct: '₹35', explanation: 'Rohan paid ₹100 for an item costing ₹65. Change = ₹100 − ₹65 = ₹35!', correctLabel: '₹35' },
    render: (lp) => (
      <div className="gt-qcard gt-s5">
        <AchievementBadge icon="🏪" label="SHOP CHANGE!" color="#ef4444" />
        <StoryBox emoji="🏪" text="Rohan went to a shop and bought a toy for ₹65. He gave the shopkeeper ₹100. How much change will he get back?" color="#fee2e2" border="#ef4444" />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, margin: '14px 0', flexWrap: 'wrap' }}>
          <NoteDisplay notes={[{ denom: 100, count: 1 }]} />
          <span style={{ fontSize: '1.5rem', fontWeight: 900, color: '#ef4444' }}>− ₹65</span>
          <span style={{ fontSize: '2rem', fontWeight: 900 }}>=</span>
          <div style={{ fontFamily: "'Baloo 2',cursive", fontWeight: 900, fontSize: '1.8rem', color: '#92400e', background: '#fef3c7', border: '2px dashed #f59e0b', borderRadius: 10, padding: '8px 14px' }}>?</div>
        </div>
        <p className="gt-qtext">₹100 − ₹65 = ? (change received) 💰</p>
        <div className="gt-opts">
          {[['₹35','A'],['₹45','B'],['₹25','C'],['₹165','D']].map(([v,l],i) => (
            <GTOption key={v} value={v} label={l} index={i} onClick={() => lp.handleMcq('gt05_q7', v)} className={lp.getMcqClass('gt05_q7', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'gt05_q8',
    meta: { type: 'mcq', qid: 'gt05_q8', correct: '₹100', explanation: '5 × ₹20 = ₹100. Five twenty-rupee notes make one hundred rupees!', correctLabel: '₹100' },
    render: (lp) => (
      <div className="gt-qcard gt-s5">
        <AchievementBadge icon="💵" label="COUNT NOTES!" color="#16a34a" />
        <StoryBox emoji="💵" text="Grandma gave Anu 5 notes of ₹20 each for her birthday. How much money did Anu get?" color="#f0fdf4" border="#16a34a" />
        <NoteDisplay notes={[{ denom: 20, count: 5 }]} />
        <p className="gt-qtext">5 × ₹20 = ? 💵</p>
        <div className="gt-opts">
          {[['₹100','A'],['₹90','B'],['₹110','C'],['₹25','D']].map(([v,l],i) => (
            <GTOption key={v} value={v} label={l} index={i} onClick={() => lp.handleMcq('gt05_q8', v)} className={lp.getMcqClass('gt05_q8', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'gt05_q9',
    meta: { type: 'tf', qid: 'gt05_q9_tf', correct: true, explanation: '3 × ₹100 = ₹300. Three hundred-rupee notes make ₹300!', correctLabel: 'True' },
    render: (lp) => (
      <div className="gt-qcard gt-s5">
        <AchievementBadge icon="🎯" label="TRUE OR FALSE?" color="#8b5cf6" />
        <StoryBox emoji="🏦" text="Mohan saved 3 notes of ₹100 each. He says he has saved ₹300 in total!" color="#f0fdf4" border="#16a34a" />
        <NoteDisplay notes={[{ denom: 100, count: 3 }]} />
        <p className="gt-qtext">3 × ₹100 = ₹300. True or False?</p>
        <GTTFButtons qid="gt05_q9_tf" lp={lp} />
      </div>
    ),
  },
  {
    id: 'gt05_q10',
    matchAnswers: { gt05_match: { 'gt05_m1': '₹30', 'gt05_m2': '₹25', 'gt05_m3': '₹100', 'gt05_m4': '₹50' } },
    rightItems: [['₹30','₹30'],['₹25','₹25'],['₹100','₹100'],['₹50','₹50']],
    meta: { type: 'match', totalPairs: 4, explanation: '3×₹10=₹30, 5×₹5=₹25, 10×₹10=₹100, 5×₹10=₹50. Great money matching!', correctLabel: 'All pairs matched!' },
    render: (lp, ctx) => (
      <div className="gt-qcard gt-s5">
        <AchievementBadge icon="🔗" label="MATCH MONEY!" color="#0891b2" />
        <StoryBox emoji="🧩" text="Match each coin group to the correct total amount! Count carefully!" color="#f0fdf4" border="#0d9488" />
        <p className="gt-qtext">Match the coins to their total value! 🪙</p>
        <div className="gt-match-wrap">
          <div className="gt-match-col">
            {[['gt05_m1','3 × ₹10 🪙'],['gt05_m2','5 × ₹5 🪙'],['gt05_m3','10 × ₹10 🪙'],['gt05_m4','5 × ₹10 🪙']].map(([val, label], i) => (
              <motion.div key={val} initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }}
                onClick={() => lp.handleMatch('gt05_match','left',val)} className={`gt-match-item ${lp.getMatchClass('gt05_match','left',val)}`}>{label}</motion.div>
            ))}
          </div>
          <div className="gt-match-center">{[0,1,2,3].map(i => <div key={i} className="gt-match-line">→</div>)}</div>
          <div className="gt-match-col">
            {ctx.shuffledRight.map(([val, label], i) => (
              <motion.div key={val} initial={{ opacity: 0, x: 15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }}
                onClick={() => lp.handleMatch('gt05_match','right',val)} className={`gt-match-item ${lp.getMatchClass('gt05_match','right',val)}`}>{label}</motion.div>
            ))}
          </div>
        </div>
      </div>
    ),
  },
];

const MoneyExchange = () => {
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
  return <GTPracticeTemplate skillId="GT-05" skillName="Money & Exchange" questions={questions} questionMeta={questionMeta} logicProps={logicProps} />;
};

export default MoneyExchange;
