import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { useGTLogic } from './useGTLogic';
import GTPracticeTemplate from './GTPracticeTemplate';
import { GTOption, GTTFButtons, StoryBox, AchievementBadge, EmojiRow, BoxDiagram, shuffle } from './GTSharedComponents';
import './give-and-take.css';

const QUESTION_POOL = [
  {
    id: 'gt04_q1',
    meta: { type: 'mcq', qid: 'gt04_q1', correct: '13', explanation: '8 apples + 5 apples = 13 apples! We add when we put things together!', correctLabel: '13' },
    render: (lp) => (
      <div className="gt-qcard gt-s4">
        <AchievementBadge icon="🍎" label="WORD PROBLEM" color="#f97316" />
        <StoryBox emoji="🧒" text="Rohan had 8 apples. His sister gave him 5 more apples. How many apples does Rohan have now?" color="#fef3c7" border="#f97316" />
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', margin: '10px 0', flexWrap: 'wrap' }}>
          <EmojiRow emoji="🍎" count={8} label="Rohan's apples" color="#fef9c3" border="#fde68a" />
          <EmojiRow emoji="🍎" count={5} label="Sister gave" color="#dcfce7" border="#86efac" />
        </div>
        <p className="gt-qtext">8 + 5 = ? 🍎</p>
        <div className="gt-opts">
          {[['13','A'],['12','B'],['14','C'],['3','D']].map(([v,l],i) => (
            <GTOption key={v} value={v} label={l} index={i} onClick={() => lp.handleMcq('gt04_q1', v)} className={lp.getMcqClass('gt04_q1', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'gt04_q2',
    meta: { type: 'mcq', qid: 'gt04_q2', correct: '9', explanation: '15 flowers − 6 plucked = 9 flowers left! We subtract when things are taken away.', correctLabel: '9' },
    render: (lp) => (
      <div className="gt-qcard gt-s4">
        <AchievementBadge icon="🌸" label="WORD PROBLEM" color="#ec4899" />
        <StoryBox emoji="🌸" text="Rani's garden had 15 beautiful flowers. She plucked 6 for a vase. How many flowers are left in the garden?" color="#fce7f3" border="#ec4899" />
        <EmojiRow emoji="🌸" count={15} label="Total flowers" color="#fce7f3" border="#f9a8d4" />
        <EmojiRow emoji="💐" count={6} label="Plucked away" color="#fee2e2" border="#fca5a5" />
        <p className="gt-qtext">15 − 6 = ? 🌸</p>
        <div className="gt-opts">
          {[['9','A'],['10','B'],['8','C'],['21','D']].map(([v,l],i) => (
            <GTOption key={v} value={v} label={l} index={i} onClick={() => lp.handleMcq('gt04_q2', v)} className={lp.getMcqClass('gt04_q2', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'gt04_q3',
    meta: { type: 'tf', qid: 'gt04_q3_tf', correct: true, explanation: '12 candies + 8 candies = 20 candies total! Adding both bags gives 20.', correctLabel: 'True' },
    render: (lp) => (
      <div className="gt-qcard gt-s4">
        <AchievementBadge icon="🎯" label="TRUE OR FALSE?" color="#8b5cf6" />
        <StoryBox emoji="🍬" text="A bag has 12 candies and another bag has 8 candies. Together they have 20 candies!" color="#fce7f3" border="#ec4899" />
        <div style={{ display: 'flex', gap: 8, justifyContent: 'center', margin: '10px 0', flexWrap: 'wrap' }}>
          <EmojiRow emoji="🍬" count={12} label="Bag 1: 12" color="#fce7f3" border="#f9a8d4" />
          <EmojiRow emoji="🍬" count={8} label="Bag 2: 8" color="#fef3c7" border="#fde68a" />
        </div>
        <BoxDiagram part1={12} part2={8} whole={20} />
        <p className="gt-qtext">12 + 8 = 20. True or False?</p>
        <GTTFButtons qid="gt04_q3_tf" lp={lp} />
      </div>
    ),
  },
  {
    id: 'gt04_q4',
    meta: { type: 'mcq', qid: 'gt04_q4', correct: '159', explanation: 'Raju planted 134 seeds and then 25 more: 134 + 25 = 159 seeds total!', correctLabel: '159' },
    render: (lp) => (
      <div className="gt-qcard gt-s4">
        <AchievementBadge icon="🌱" label="GARDEN STORY" color="#16a34a" />
        <StoryBox emoji="🌱" text="Raju planted 134 seeds in the morning. In the evening he planted 25 more seeds. How many seeds in all?" color="#f0fdf4" border="#16a34a" />
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', margin: '12px 0', flexWrap: 'wrap' }}>
          {[{ emoji: '🌱', n: 134, label: 'Morning', bg: '#f0fdf4', bc: '#86efac', c: '#14532d' }, { emoji: '🌱', n: 25, label: 'Evening', bg: '#dcfce7', bc: '#16a34a', c: '#14532d' }].map((item, i) => (
            <div key={i} style={{ background: item.bg, border: `2px solid ${item.bc}`, borderRadius: 12, padding: '12px 18px', textAlign: 'center', minWidth: 80 }}>
              <div style={{ fontSize: '2rem' }}>{item.emoji}</div>
              <div style={{ fontFamily: "'Baloo 2',cursive", fontWeight: 900, fontSize: '1.6rem', color: item.c }}>{item.n}</div>
              <div style={{ fontSize: '0.72rem', color: '#6b7280', marginTop: 2 }}>{item.label}</div>
            </div>
          ))}
        </div>
        <BoxDiagram part1={134} part2={25} whole={159} unknownPart="whole" />
        <p className="gt-qtext">134 + 25 = ? 🌱</p>
        <div className="gt-opts">
          {[['159','A'],['149','B'],['169','C'],['109','D']].map(([v,l],i) => (
            <GTOption key={v} value={v} label={l} index={i} onClick={() => lp.handleMcq('gt04_q4', v)} className={lp.getMcqClass('gt04_q4', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'gt04_q5',
    meta: { type: 'mcq', qid: 'gt04_q5', correct: '155', explanation: '200 boxes − 45 sold = 155 boxes left! Subtract what was sold.', correctLabel: '155' },
    render: (lp) => (
      <div className="gt-qcard gt-s4">
        <AchievementBadge icon="📦" label="SHOP STORY" color="#0d9488" />
        <StoryBox emoji="🏪" text="A shop had 200 boxes of crayons. On Monday, 45 boxes were sold. How many boxes are left?" color="#f0fdf4" border="#0d9488" />
        <BoxDiagram part1={155} part2={45} whole={200} unknownPart="part1" />
        <p className="gt-qtext">200 − 45 = ? 📦</p>
        <div className="gt-opts">
          {[['155','A'],['145','B'],['165','C'],['245','D']].map(([v,l],i) => (
            <GTOption key={v} value={v} label={l} index={i} onClick={() => lp.handleMcq('gt04_q5', v)} className={lp.getMcqClass('gt04_q5', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'gt04_q6',
    meta: { type: 'tf', qid: 'gt04_q6_tf', correct: true, explanation: '50 birds + 25 birds = 75 birds! Adding both groups gives 75.', correctLabel: 'True' },
    render: (lp) => (
      <div className="gt-qcard gt-s4">
        <AchievementBadge icon="🎯" label="TRUE OR FALSE?" color="#8b5cf6" />
        <StoryBox emoji="🐦" text="50 sparrows sat on one tree and 25 on another. Neha says there are 75 birds in total!" color="#eff6ff" border="#3b82f6" />
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', margin: '12px 0', flexWrap: 'wrap' }}>
          {[{ emoji: '🌳', birds: 50, label: 'Tree 1', bg: '#eff6ff', bc: '#bfdbfe', c: '#1e40af' }, { emoji: '🌲', birds: 25, label: 'Tree 2', bg: '#f0fdf4', bc: '#86efac', c: '#14532d' }].map((item, i) => (
            <div key={i} style={{ background: item.bg, border: `2px solid ${item.bc}`, borderRadius: 12, padding: '12px 18px', textAlign: 'center', minWidth: 90 }}>
              <div style={{ fontSize: '2rem' }}>{item.emoji}</div>
              <div style={{ fontSize: '1.4rem', margin: '2px 0' }}>🐦</div>
              <div style={{ fontFamily: "'Baloo 2',cursive", fontWeight: 900, fontSize: '1.6rem', color: item.c }}>{item.birds}</div>
              <div style={{ fontSize: '0.72rem', color: '#6b7280', marginTop: 2 }}>{item.label}: {item.birds} birds</div>
            </div>
          ))}
        </div>
        <BoxDiagram part1={50} part2={25} whole={75} />
        <p className="gt-qtext">50 + 25 = 75. Is Neha right?</p>
        <GTTFButtons qid="gt04_q6_tf" lp={lp} />
      </div>
    ),
  },
  {
    id: 'gt04_q7',
    meta: { type: 'mcq', qid: 'gt04_q7', correct: '30', explanation: '3 baskets × 10 bananas each = 30 bananas in total!', correctLabel: '30' },
    render: (lp) => (
      <div className="gt-qcard gt-s4">
        <AchievementBadge icon="🍌" label="BASKET COUNT" color="#f59e0b" />
        <StoryBox emoji="🍌" text="There are 3 baskets. Each basket has exactly 10 bananas. How many bananas are there altogether?" color="#fef3c7" border="#f59e0b" />
        <div style={{ display: 'flex', gap: 8, justifyContent: 'center', margin: '10px 0', flexWrap: 'wrap' }}>
          {[1,2,3].map(b => (
            <EmojiRow key={b} emoji="🍌" count={10} label={`Basket ${b}`} color="#fef9c3" border="#fde68a" />
          ))}
        </div>
        <p className="gt-qtext">3 baskets × 10 bananas = ? 🍌</p>
        <div className="gt-opts">
          {[['30','A'],['13','B'],['20','C'],['33','D']].map(([v,l],i) => (
            <GTOption key={v} value={v} label={l} index={i} onClick={() => lp.handleMcq('gt04_q7', v)} className={lp.getMcqClass('gt04_q7', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'gt04_q8',
    meta: { type: 'mcq', qid: 'gt04_q8', correct: '48', explanation: 'Class A: 25 kids, Class B: 23 kids. 25 + 23 = 48 kids total!', correctLabel: '48' },
    render: (lp) => (
      <div className="gt-qcard gt-s4">
        <AchievementBadge icon="🏫" label="SCHOOL STORY" color="#8b5cf6" />
        <StoryBox emoji="🏫" text="Class A has 25 students and Class B has 23 students. How many students are there in all?" color="#ede9fe" border="#8b5cf6" />
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', margin: '12px 0', flexWrap: 'wrap' }}>
          {[{ emoji: '🧒', count: 25, label: 'Class A', bg: '#ede9fe', bc: '#c4b5fd', c: '#5b21b6' }, { emoji: '👦', count: 23, label: 'Class B', bg: '#fce7f3', bc: '#f9a8d4', c: '#9d174d' }].map((item, i) => (
            <div key={i} style={{ background: item.bg, border: `2px solid ${item.bc}`, borderRadius: 12, padding: '12px 18px', textAlign: 'center', minWidth: 90 }}>
              <div style={{ fontSize: '2rem' }}>{item.emoji}</div>
              <div style={{ fontFamily: "'Baloo 2',cursive", fontWeight: 900, fontSize: '1.8rem', color: item.c }}>{item.count}</div>
              <div style={{ fontSize: '0.72rem', color: '#6b7280', marginTop: 2 }}>{item.label}: {item.count} students</div>
            </div>
          ))}
        </div>
        <BoxDiagram part1={25} part2={23} whole={48} unknownPart="whole" />
        <p className="gt-qtext">25 + 23 = ? 🏫</p>
        <div className="gt-opts">
          {[['48','A'],['47','B'],['49','C'],['38','D']].map(([v,l],i) => (
            <GTOption key={v} value={v} label={l} index={i} onClick={() => lp.handleMcq('gt04_q8', v)} className={lp.getMcqClass('gt04_q8', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'gt04_q9',
    meta: { type: 'tf', qid: 'gt04_q9_tf', correct: true, explanation: 'Started with 100 stickers, used 40: 100 − 40 = 60 stickers left!', correctLabel: 'True' },
    render: (lp) => (
      <div className="gt-qcard gt-s4">
        <AchievementBadge icon="🎯" label="TRUE OR FALSE?" color="#8b5cf6" />
        <StoryBox emoji="⭐" text="Priya was given 100 star stickers. She used 40 stickers to decorate her notebook. She says 60 stickers are left!" color="#fef3c7" border="#f59e0b" />
        <BoxDiagram part1={60} part2={40} whole={100} unknownPart="part1" />
        <p className="gt-qtext">100 − 40 = 60. Is Priya right?</p>
        <GTTFButtons qid="gt04_q9_tf" lp={lp} />
      </div>
    ),
  },
  {
    id: 'gt04_q10',
    matchAnswers: { gt04_match: { 'gt04_m1': 'add', 'gt04_m2': 'sub', 'gt04_m3': 'add2', 'gt04_m4': 'sub2' } },
    rightItems: [['add','➕ Add'],['sub','➖ Subtract'],['add2','➕ Add'],['sub2','➖ Subtract']],
    meta: { type: 'match', totalPairs: 4, explanation: '"Put together" and "got more" → Add. "Gave away" and "used up" → Subtract!', correctLabel: 'All pairs matched!' },
    render: (lp, ctx) => (
      <div className="gt-qcard gt-s4">
        <AchievementBadge icon="🔗" label="MATCH IT!" color="#0891b2" />
        <StoryBox emoji="🧩" text="Match each situation to the correct operation. When do we add? When do we subtract?" color="#f0fdf4" border="#0d9488" />
        <p className="gt-qtext">Match the situation to add (+) or subtract (−)! 🎯</p>
        <div className="gt-match-wrap">
          <div className="gt-match-col">
            {[['gt04_m1','Put together 🤝'],['gt04_m2','Gave away 🎁'],['gt04_m3','Got more 📈'],['gt04_m4','Used up 📉']].map(([val, label], i) => (
              <motion.div key={val} initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }}
                onClick={() => lp.handleMatch('gt04_match','left',val)} className={`gt-match-item ${lp.getMatchClass('gt04_match','left',val)}`}>{label}</motion.div>
            ))}
          </div>
          <div className="gt-match-center">{[0,1,2,3].map(i => <div key={i} className="gt-match-line">→</div>)}</div>
          <div className="gt-match-col">
            {ctx.shuffledRight.map(([val, label], i) => (
              <motion.div key={val} initial={{ opacity: 0, x: 15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }}
                onClick={() => lp.handleMatch('gt04_match','right',val)} className={`gt-match-item ${lp.getMatchClass('gt04_match','right',val)}`}>{label}</motion.div>
            ))}
          </div>
        </div>
      </div>
    ),
  },
];

const WordProblems = () => {
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
  return <GTPracticeTemplate skillId="GT-04" skillName="Word Problems" questions={questions} questionMeta={questionMeta} logicProps={logicProps} />;
};

export default WordProblems;
