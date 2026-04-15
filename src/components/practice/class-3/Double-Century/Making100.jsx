import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { useDCLogic } from './useDCLogic';
import DCPracticeTemplate from './DCPracticeTemplate';
import { NumberBond100, NumberLineDC, DCOption, DCTFButtons, StoryBox, AchievementBadge, shuffle } from './DCSharedComponents';
import './double-century.css';

const QUESTION_POOL = [
  {
    id: 'm100_q1',
    meta: { type: 'mcq', qid: 'm100_q1', correct: '40', explanation: '60 + 40 = 100! They are like two puzzle pieces that fit together to make 100.', correctLabel: '40' },
    render: (lp) => (
      <div className="dc-qcard dc-s4">
        <AchievementBadge icon="🏏" label="CENTURY CLUB" color="#dc2626" />
        <StoryBox emoji="🏏" text="Mahi needs exactly 100 runs to score a century! She already scored 60. How many more does she need?" color="#fef2f2" border="#dc2626" />
        <p className="dc-qtext">60 + <strong>?</strong> = 100 🎯</p>
        <NumberBond100 part1={60} part2={40} unknown="part2" />
        <div className="dc-opts">
          {[['30','A'],['40','B'],['50','C'],['60','D']].map(([v,l],i) => (
            <DCOption key={v} value={v} label={l} index={i} onClick={() => lp.handleMcq('m100_q1', v)} className={lp.getMcqClass('m100_q1', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'm100_q2',
    meta: { type: 'mcq', qid: 'm100_q2', correct: '75', explanation: '75 + 25 = 100! If you have 25, you need 75 more to reach 100.', correctLabel: '75' },
    render: (lp) => (
      <div className="dc-qcard dc-s4">
        <AchievementBadge icon="🏏" label="CENTURY CLUB" color="#dc2626" />
        <StoryBox emoji="🏏" text="The scoreboard shows 25 runs. The team needs 100 to win! How many more runs are needed?" color="#fef2f2" border="#dc2626" />
        <p className="dc-qtext"><strong>?</strong> + 25 = 100 🎯</p>
        <NumberBond100 part1={75} part2={25} unknown="part1" />
        <div className="dc-opts">
          {[['65','A'],['70','B'],['75','C'],['80','D']].map(([v,l],i) => (
            <DCOption key={v} value={v} label={l} index={i} onClick={() => lp.handleMcq('m100_q2', v)} className={lp.getMcqClass('m100_q2', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'm100_q3',
    meta: { type: 'mcq', qid: 'm100_q3', correct: '55', explanation: '45 + 55 = 100! The flower petal has 45 on one side and 55 on the other — both add to 100!', correctLabel: '55' },
    render: (lp) => (
      <div className="dc-qcard dc-s4">
        <AchievementBadge icon="🌸" label="FLOWER PETALS" color="#9333ea" />
        <StoryBox emoji="🌸" text="A magic flower has 100 petals! One side has 45 petals. How many petals are on the other side?" color="#fdf4ff" border="#9333ea" />
        <p className="dc-qtext">45 + <strong>?</strong> = 100 🌸</p>
        <NumberBond100 part1={45} part2={55} unknown="part2" />
        <div className="dc-opts">
          {[['45','A'],['50','B'],['55','C'],['65','D']].map(([v,l],i) => (
            <DCOption key={v} value={v} label={l} index={i} onClick={() => lp.handleMcq('m100_q3', v)} className={lp.getMcqClass('m100_q3', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'm100_q4',
    meta: { type: 'mcq', qid: 'm100_q4', correct: '15', explanation: '15 + 85 = 100! Use the flower petal — if one petal is 85, the other petal must be 15!', correctLabel: '15' },
    render: (lp) => (
      <div className="dc-qcard dc-s4">
        <AchievementBadge icon="🌸" label="FLOWER PETALS" color="#9333ea" />
        <StoryBox emoji="🌸" text="The magic flower again! One side has 85 petals. The other side has some missing petals. Find them!" color="#fdf4ff" border="#9333ea" />
        <p className="dc-qtext"><strong>?</strong> + 85 = 100 🌸</p>
        <NumberBond100 part1={15} part2={85} unknown="part1" />
        <div className="dc-opts">
          {[['5','A'],['10','B'],['15','C'],['25','D']].map(([v,l],i) => (
            <DCOption key={v} value={v} label={l} index={i} onClick={() => lp.handleMcq('m100_q4', v)} className={lp.getMcqClass('m100_q4', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'm100_q5',
    meta: { type: 'tf', qid: 'm100_q5_tf', correct: true, explanation: '35 + 65 = 100! Yes, these two numbers are partners that make 100. Like 30+70, 40+60…', correctLabel: 'True' },
    render: (lp) => (
      <div className="dc-qcard dc-s4">
        <AchievementBadge icon="🎯" label="TRUE OR FALSE?" color="#7c3aed" />
        <StoryBox emoji="🏏" text="Mahi says 35 + 65 makes a century (100)! Is she right?" color="#fef2f2" border="#dc2626" />
        <p className="dc-qtext"><strong>35</strong> + <strong>65</strong> = 100?</p>
        <NumberBond100 part1={35} part2={65} unknown="none" />
        <DCTFButtons qid="m100_q5_tf" lp={lp} />
      </div>
    ),
  },
  {
    id: 'm100_q6',
    meta: { type: 'mcq', qid: 'm100_q6', correct: '30', explanation: '70 + 30 = 100! Just like 7 + 3 = 10. Use that to help you!', correctLabel: '30' },
    render: (lp) => (
      <div className="dc-qcard dc-s4">
        <AchievementBadge icon="🐸" label="NUMBER LINE JUMP" color="#16a34a" />
        <StoryBox emoji="🐸" text="Frog Tiku jumps from 70 and wants to land exactly on 100. How far should he jump?" color="#f0fdf4" border="#16a34a" />
        <p className="dc-qtext">70 + <strong>?</strong> = 100 🐸</p>
        <NumberLineDC start={0} end={100} step={10} highlight={100} jumpFrom={70} jumpTo={100} jumpSize={30} />
        <div className="dc-opts">
          {[['20','A'],['30','B'],['40','C'],['70','D']].map(([v,l],i) => (
            <DCOption key={v} value={v} label={l} index={i} onClick={() => lp.handleMcq('m100_q6', v)} className={lp.getMcqClass('m100_q6', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'm100_q7',
    meta: { type: 'tf', qid: 'm100_q7_tf', correct: false, explanation: '50 + 60 = 110, NOT 100! To make 100 from 50, you need 50 more. 50 + 50 = 100.', correctLabel: 'False — 50 + 60 = 110' },
    render: (lp) => (
      <div className="dc-qcard dc-s4">
        <AchievementBadge icon="🎯" label="SPOT THE MISTAKE!" color="#dc2626" />
        <StoryBox emoji="🏏" text="A cheeky player says 50 + 60 = 100 and claims a century! Is this really a century?" color="#fef2f2" border="#dc2626" />
        <p className="dc-qtext"><strong>50</strong> + <strong>60</strong> = 100? 🏏</p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, margin: '14px 0', flexWrap: 'wrap' }}>
          {['50','+','60','=','100?'].map((item, i) => (
            <motion.div key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i * 0.08, type: 'spring' }}
              className={item === '100?' ? 'dc-bond-100' : item.match(/\d+/) ? 'dc-bond-box' : undefined}
              style={item.match(/[+=?]/) && !item.match(/\d/) ? { fontSize: '1.4rem', fontWeight: 900 } : {}}
            >{item}</motion.div>
          ))}
        </div>
        <DCTFButtons qid="m100_q7_tf" lp={lp} />
      </div>
    ),
  },
  {
    id: 'm100_q8',
    meta: { type: 'mcq', qid: 'm100_q8', correct: '19', explanation: '81 + 19 = 100! 100 − 81 = 19. These two are a making-100 pair!', correctLabel: '19' },
    render: (lp) => (
      <div className="dc-qcard dc-s4">
        <AchievementBadge icon="🏏" label="CENTURY CLUB" color="#dc2626" />
        <StoryBox emoji="🏏" text="Mahi scored 81 runs. How many more does she need to complete her century of 100?" color="#fef2f2" border="#dc2626" />
        <p className="dc-qtext">81 + <strong>?</strong> = 100 🏏</p>
        <NumberBond100 part1={81} part2={19} unknown="part2" />
        <div className="dc-opts">
          {[['9','A'],['19','B'],['29','C'],['21','D']].map(([v,l],i) => (
            <DCOption key={v} value={v} label={l} index={i} onClick={() => lp.handleMcq('m100_q8', v)} className={lp.getMcqClass('m100_q8', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'm100_q9',
    meta: { type: 'mcq', qid: 'm100_q9', correct: '35', explanation: '65 + 35 = 100! Bholu jumped 65 steps, then 35 more to reach 100. Great jump!', correctLabel: '35' },
    render: (lp) => (
      <div className="dc-qcard dc-s4">
        <AchievementBadge icon="🐶" label="BHOLU'S JUMP" color="#0284c7" />
        <StoryBox emoji="🐶" text="Bholu started at 0 and jumped 65 steps. He wants to land on 100. How far is his next jump?" color="#eff6ff" border="#3b82f6" />
        <p className="dc-qtext">🐶 Bholu jumped 65, then how much more to reach 100?</p>
        <NumberLineDC start={0} end={100} step={10} highlight={100} jumpFrom={65} jumpTo={100} jumpSize={35} />
        <div className="dc-opts">
          {[['25','A'],['30','B'],['35','C'],['45','D']].map(([v,l],i) => (
            <DCOption key={v} value={v} label={l} index={i} onClick={() => lp.handleMcq('m100_q9', v)} className={lp.getMcqClass('m100_q9', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'm100_q10',
    matchAnswers: { m100_match10: { 'm100_60': '40', 'm100_30': '70', 'm100_45': '55', 'm100_25': '75' } },
    rightItems: [['40','40'],['70','70'],['55','55'],['75','75']],
    meta: { type: 'match', totalPairs: 4, explanation: '60+40=100, 30+70=100, 45+55=100, 25+75=100. These are all century pairs!', correctLabel: 'All pairs matched!' },
    render: (lp, ctx) => (
      <div className="dc-qcard dc-s4">
        <AchievementBadge icon="🔗" label="CENTURY PAIRS" color="#dc2626" />
        <StoryBox emoji="🏏" text="Each number has a partner that helps it reach 100! Can you find all 4 century pairs?" color="#fef2f2" border="#dc2626" />
        <p className="dc-qtext">Match each number with its partner to make 100! 🌸</p>
        <div className="dc-match-wrap">
          <div className="dc-match-col">
            {[['m100_60','60 + ? = 100'],['m100_30','30 + ? = 100'],['m100_45','45 + ? = 100'],['m100_25','25 + ? = 100']].map(([val, label], i) => (
              <motion.div key={val} initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }}
                onClick={() => lp.handleMatch('m100_match10','left',val)} className={`dc-match-item ${lp.getMatchClass('m100_match10','left',val)}`}>{label}</motion.div>
            ))}
          </div>
          <div className="dc-match-center">{[0,1,2,3].map(i => <div key={i} className="dc-match-line">→</div>)}</div>
          <div className="dc-match-col">
            {ctx.shuffledRight.map(([val, label], i) => (
              <motion.div key={val} initial={{ opacity: 0, x: 15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }}
                onClick={() => lp.handleMatch('m100_match10','right',val)} className={`dc-match-item ${lp.getMatchClass('m100_match10','right',val)}`}>{label}</motion.div>
            ))}
          </div>
        </div>
      </div>
    ),
  },
];

const Making100 = () => {
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
  return <DCPracticeTemplate skillId="DC-04" skillName="Making 100" questions={questions} questionMeta={questionMeta} logicProps={logicProps} />;
};

export default Making100;
