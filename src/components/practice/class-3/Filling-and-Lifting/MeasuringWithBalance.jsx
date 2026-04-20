import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { useFLLogic } from './useFLLogic';
import FLPracticeTemplate from './FLPracticeTemplate';
import { BalanceScaleSVG, CoinRow, FLOption, FLTFButtons, AchievementBadge, shuffle } from './FLSharedComponents';
import './filling-and-lifting.css';

const QUESTION_POOL = [
  {
    id: 'mb_q1',
    meta: { type: 'mcq', qid: 'mb_q1', correct: 'Sharpener', explanation: 'The eraser needs 3 coins but the sharpener needs 5 coins. More coins = heavier! So the sharpener is heavier.', correctLabel: 'Sharpener' },
    render: (lp) => (
      <div className="fl-qcard fl-s6">
        <AchievementBadge icon="🪙" label="COIN BALANCE!" color="#ec4899" />
        <p className="fl-qtext">Eraser = 3 coins. Sharpener = 5 coins. Which is heavier? 🪙</p>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', margin: '10px 0' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: "'Baloo 2',cursive", fontWeight: 800, fontSize: '.85rem', marginBottom: 4, color: '#9d174d' }}>🩹 Eraser</div>
            <CoinRow count={3} color="#f59e0b" />
            <div style={{ fontFamily: "'Baloo 2',cursive", fontWeight: 900, color: '#78350f' }}>3 coins</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: "'Baloo 2',cursive", fontWeight: 800, fontSize: '.85rem', marginBottom: 4, color: '#9d174d' }}>✏️ Sharpener</div>
            <CoinRow count={5} color="#f59e0b" />
            <div style={{ fontFamily: "'Baloo 2',cursive", fontWeight: 900, color: '#78350f' }}>5 coins</div>
          </div>
        </div>
        <div className="fl-opts">
          {[['Eraser','A'],['Sharpener','B'],['Both same','C'],['The coins','D']].map(([v,l],i) => (
            <FLOption key={v} value={v} label={l} index={i} onClick={() => lp.handleMcq('mb_q1', v)} className={lp.getMcqClass('mb_q1', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'mb_q2',
    meta: { type: 'mcq', qid: 'mb_q2', correct: '3', explanation: '1 pencil = 4 erasers. 1 book = 12 erasers. Book ÷ pencil = 12 ÷ 4 = 3. So the book = 3 pencils!', correctLabel: '3' },
    render: (lp) => (
      <div className="fl-qcard fl-s6">
        <AchievementBadge icon="📏" label="PENCIL UNITS!" color="#ec4899" />
        <p className="fl-qtext">1 pencil = 4 erasers. 1 book = 12 erasers. Book = how many pencils? 📏</p>
        <div className="fl-opts">
          {[['2','A'],['3','B'],['4','C'],['6','D']].map(([v,l],i) => (
            <FLOption key={v} value={v} label={l} index={i} onClick={() => lp.handleMcq('mb_q2', v)} className={lp.getMcqClass('mb_q2', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'mb_q3',
    meta: { type: 'tf', qid: 'mb_q3_tf', correct: true, explanation: 'Yes! Using the same type of coins as units lets everyone measure and compare fairly — they are all equal!', correctLabel: 'True' },
    render: (lp) => (
      <div className="fl-qcard fl-s6">
        <AchievementBadge icon="🎯" label="TRUE OR FALSE?" color="#7c3aed" />
        <p className="fl-qtext">Using same-size coins lets us compare weights fairly. True or False?</p>
        <FLTFButtons qid="mb_q3_tf" lp={lp} />
      </div>
    ),
  },
  {
    id: 'mb_q4',
    meta: { type: 'mcq', qid: 'mb_q4', correct: '6', explanation: '1 toy = 3 matchboxes. So 2 toys = 2 × 3 = 6 matchboxes!', correctLabel: '6' },
    render: (lp) => (
      <div className="fl-qcard fl-s6">
        <AchievementBadge icon="📦" label="MATCHBOX METHOD!" color="#ec4899" />
        <p className="fl-qtext">3 matchboxes = 1 toy. How many matchboxes = 2 toys? 📦</p>
        <div className="fl-opts">
          {[['3','A'],['5','B'],['6','C'],['9','D']].map(([v,l],i) => (
            <FLOption key={v} value={v} label={l} index={i} onClick={() => lp.handleMcq('mb_q4', v)} className={lp.getMcqClass('mb_q4', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'mb_q5',
    meta: { type: 'mcq', qid: 'mb_q5', correct: 'Balance is level (equal)', explanation: 'When both objects weigh the same number of coins, the balance scale is perfectly level — neither side goes down!', correctLabel: 'Balance is level (equal)' },
    render: (lp) => (
      <div className="fl-qcard fl-s6">
        <AchievementBadge icon="⚖️" label="EQUAL BALANCE!" color="#ec4899" />
        <p className="fl-qtext">Object A = 5 coins. Object B = 5 coins. Balance shows? ⚖️</p>
        <BalanceScaleSVG leftLabel="A: 5🪙" rightLabel="B: 5🪙" tilt="equal" leftColor="#a7f3d0" rightColor="#a7f3d0" />
        <div className="fl-opts">
          {[['Left side goes down','A'],['Right side goes down','B'],['Balance is level (equal)','C'],['Balance falls','D']].map(([v,l],i) => (
            <FLOption key={v} value={v} label={l} index={i} onClick={() => lp.handleMcq('mb_q5', v)} className={lp.getMcqClass('mb_q5', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'mb_q6',
    meta: { type: 'tf', qid: 'mb_q6_tf', correct: false, explanation: 'False! A big object is NOT always heavier — it depends on what it is made of. A big balloon is lighter than a small stone!', correctLabel: 'False' },
    render: (lp) => (
      <div className="fl-qcard fl-s6">
        <AchievementBadge icon="🎯" label="TRUE OR FALSE?" color="#7c3aed" />
        <p className="fl-qtext">Bigger objects are ALWAYS heavier. True or False?</p>
        <FLTFButtons qid="mb_q6_tf" lp={lp} />
      </div>
    ),
  },
  {
    id: 'mb_q7',
    meta: { type: 'mcq', qid: 'mb_q7', correct: '20', explanation: 'Apple = 8 coins, Mango = 12 coins. Together = 8 + 12 = 20 coins!', correctLabel: '20' },
    render: (lp) => (
      <div className="fl-qcard fl-s6">
        <AchievementBadge icon="🍎🥭" label="FRUIT WEIGHT!" color="#ec4899" />
        <p className="fl-qtext">Apple = 8 coins. Mango = 12 coins. Together = ? coins 🍎🥭</p>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', margin: '10px 0' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: "'Baloo 2',cursive", fontWeight: 800, fontSize: '.85rem', color: '#9d174d' }}>🍎 Apple</div>
            <CoinRow count={8} color="#f59e0b" />
            <div style={{ fontFamily: "'Baloo 2',cursive", fontWeight: 900, color: '#78350f' }}>8 coins</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: "'Baloo 2',cursive", fontWeight: 800, fontSize: '.85rem', color: '#9d174d' }}>🥭 Mango</div>
            <CoinRow count={12} color="#f59e0b" />
            <div style={{ fontFamily: "'Baloo 2',cursive", fontWeight: 900, color: '#78350f' }}>12 coins</div>
          </div>
        </div>
        <div className="fl-opts">
          {[['16','A'],['18','B'],['20','C'],['96','D']].map(([v,l],i) => (
            <FLOption key={v} value={v} label={l} index={i} onClick={() => lp.handleMcq('mb_q7', v)} className={lp.getMcqClass('mb_q7', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'mb_q8',
    meta: { type: 'mcq', qid: 'mb_q8', correct: 'More coins', explanation: 'A heavier object needs MORE coins on the other side to balance it — just like a heavier person needs more people on the other side of a seesaw!', correctLabel: 'More coins' },
    render: (lp) => (
      <div className="fl-qcard fl-s6">
        <AchievementBadge icon="🪙" label="BALANCE LOGIC!" color="#ec4899" />
        <p className="fl-qtext">To balance a HEAVY object on a scale, you need ___? 🪙</p>
        <div className="fl-opts">
          {[['Fewer coins','A'],['More coins','B'],['No coins','C'],['1 coin','D']].map(([v,l],i) => (
            <FLOption key={v} value={v} label={l} index={i} onClick={() => lp.handleMcq('mb_q8', v)} className={lp.getMcqClass('mb_q8', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'mb_q9',
    meta: { type: 'tf', qid: 'mb_q9_tf', correct: true, explanation: 'Yes! Using equal, same-sized matchboxes makes measurements fair and repeatable — everyone gets the same result!', correctLabel: 'True' },
    render: (lp) => (
      <div className="fl-qcard fl-s6">
        <AchievementBadge icon="🎯" label="TRUE OR FALSE?" color="#7c3aed" />
        <p className="fl-qtext">Using equal matchboxes makes measurement fair. True or False?</p>
        <FLTFButtons qid="mb_q9_tf" lp={lp} />
      </div>
    ),
  },
  {
    id: 'mb_q10',
    matchAnswers: { mb_match10: { 'mb_m_lightest': 'Eraser', 'mb_m_mid1': 'Pencil', 'mb_m_mid2': 'Ruler', 'mb_m_heaviest': 'Book' } },
    rightItems: [['Eraser','Eraser'],['Pencil','Pencil'],['Ruler','Ruler'],['Book','Book']],
    meta: { type: 'match', totalPairs: 4, explanation: 'Eraser(3)=lightest, Pencil(5)=between eraser & ruler, Ruler(8)=between pencil & book, Book(15)=heaviest!', correctLabel: 'All pairs matched!' },
    render: (lp, ctx) => (
      <div className="fl-qcard fl-s6">
        <AchievementBadge icon="🔗" label="ORDER BY WEIGHT!" color="#0891b2" />
        <div style={{ background: '#fdf2f8', border: '1.5px solid #ec4899', borderRadius: 10, padding: '10px 14px', margin: '10px 0', fontFamily: "'Baloo 2',cursive" }}>
          <div style={{ fontWeight: 800, fontSize: '.85rem', color: '#9d174d', marginBottom: 6 }}>📋 Measured coin weights:</div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', fontSize: '.82rem', fontWeight: 700, color: '#374151' }}>
            <span>🩹 Eraser = 3 coins</span>
            <span>✏️ Pencil = 5 coins</span>
            <span>📏 Ruler = 8 coins</span>
            <span>📚 Book = 15 coins</span>
          </div>
        </div>
        <p className="fl-qtext">Match each description to the correct object! 🎯</p>
        <div className="fl-match-wrap">
          <div className="fl-match-col">
            {[['mb_m_lightest','Lightest object'],['mb_m_mid1','Heavier than eraser, lighter than ruler'],['mb_m_mid2','Heavier than pencil, lighter than book'],['mb_m_heaviest','Heaviest object']].map(([val, label], i) => (
              <motion.div key={val} initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }}
                onClick={() => lp.handleMatch('mb_match10','left',val)} className={`fl-match-item ${lp.getMatchClass('mb_match10','left',val)}`}>{label}</motion.div>
            ))}
          </div>
          <div className="fl-match-center">{[0,1,2,3].map(i => <div key={i} className="fl-match-line">→</div>)}</div>
          <div className="fl-match-col">
            {ctx.shuffledRight.map(([val, label], i) => (
              <motion.div key={val} initial={{ opacity: 0, x: 15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }}
                onClick={() => lp.handleMatch('mb_match10','right',val)} className={`fl-match-item ${lp.getMatchClass('mb_match10','right',val)}`}>{label}</motion.div>
            ))}
          </div>
        </div>
      </div>
    ),
  },
];

const MeasuringWithBalance = () => {
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
  return <FLPracticeTemplate skillId="FL-06" skillName="Measuring with Balance" questions={questions} questionMeta={questionMeta} logicProps={logicProps} />;
};

export default MeasuringWithBalance;
