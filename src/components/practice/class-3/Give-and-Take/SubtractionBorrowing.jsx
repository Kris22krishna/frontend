import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { useGTLogic } from './useGTLogic';
import GTPracticeTemplate from './GTPracticeTemplate';
import { GTOption, GTTFButtons, StoryBox, AchievementBadge, HTODisplay, EmojiRow, BoxDiagram, shuffle } from './GTSharedComponents';
import './give-and-take.css';

const QUESTION_POOL = [
  {
    id: 'gt02_q1',
    meta: { type: 'mcq', qid: 'gt02_q1', correct: '7', explanation: '12 apples − 5 eaten = 7 apples left! We SUBTRACT what was taken away.', correctLabel: '7' },
    render: (lp) => (
      <div className="gt-qcard gt-s2">
        <AchievementBadge icon="🍎" label="TAKE AWAY!" color="#ef4444" />
        <StoryBox emoji="🍎" text="Raju had 12 apples. He ate 5. How many apples are left?" color="#fef3c7" border="#f97316" />
        <EmojiRow emoji="🍎" count={12} label="12 apples to start" color="#fef9c3" border="#fde68a" />
        <EmojiRow emoji="❌" count={5} label="5 eaten away" color="#fee2e2" border="#fca5a5" />
        <p className="gt-qtext">12 − 5 = ? 🍎</p>
        <div className="gt-opts">
          {[['7','A'],['8','B'],['6','C'],['17','D']].map(([v,l],i) => (
            <GTOption key={v} value={v} label={l} index={i} onClick={() => lp.handleMcq('gt02_q1', v)} className={lp.getMcqClass('gt02_q1', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'gt02_q2',
    meta: { type: 'mcq', qid: 'gt02_q2', correct: '155', explanation: '230 − 75 = 155! We borrow from tens to help subtract the ones.', correctLabel: '155' },
    render: (lp) => (
      <div className="gt-qcard gt-s2">
        <AchievementBadge icon="📚" label="SUBTRACT HTO" color="#0d9488" />
        <StoryBox emoji="📚" text="A school had 230 notebooks. 75 were given to students. How many remain?" color="#f0fdf4" border="#0d9488" />
        <div style={{ display: 'flex', justifyContent: 'center', gap: 12, margin: '14px 0', flexWrap: 'wrap' }}>
          <HTODisplay number={230} />
          <span style={{ fontFamily: "'Baloo 2',cursive", fontWeight: 900, fontSize: '2rem', alignSelf: 'center' }}>−</span>
          <HTODisplay number={75} />
        </div>
        <p className="gt-qtext">230 − 75 = ? 📚</p>
        <div className="gt-opts">
          {[['155','A'],['165','B'],['145','C'],['175','D']].map(([v,l],i) => (
            <GTOption key={v} value={v} label={l} index={i} onClick={() => lp.handleMcq('gt02_q2', v)} className={lp.getMcqClass('gt02_q2', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'gt02_q3',
    meta: { type: 'tf', qid: 'gt02_q3_tf', correct: true, explanation: '100 − 40 = 60. Start at 100, take away 4 tens = 60!', correctLabel: 'True' },
    render: (lp) => (
      <div className="gt-qcard gt-s2">
        <AchievementBadge icon="🎯" label="TRUE OR FALSE?" color="#8b5cf6" />
        <StoryBox emoji="🧸" text="Meena had 100 stickers. She gave 40 to her friends. She says 60 stickers are left!" color="#f0fdf4" border="#16a34a" />
        <BoxDiagram part1={60} part2={40} whole={100} unknownPart="part1" />
        <p className="gt-qtext">100 − 40 = 60. Is Meena right?</p>
        <GTTFButtons qid="gt02_q3_tf" lp={lp} />
      </div>
    ),
  },
  {
    id: 'gt02_q4',
    meta: { type: 'mcq', qid: 'gt02_q4', correct: '12', explanation: '20 flowers − 8 given = 12 flowers remaining!', correctLabel: '12' },
    render: (lp) => (
      <div className="gt-qcard gt-s2">
        <AchievementBadge icon="🌸" label="FLOWER FIELD" color="#ec4899" />
        <StoryBox emoji="🌸" text="A garden has 20 flowers. The gardener picked 8 flowers. How many are left in the garden?" color="#fce7f3" border="#ec4899" />
        <EmojiRow emoji="🌸" count={20} label="20 flowers in garden" color="#fce7f3" border="#f9a8d4" />
        <EmojiRow emoji="💐" count={8} label="8 flowers picked" color="#fee2e2" border="#fca5a5" />
        <p className="gt-qtext">20 − 8 = ? 🌸</p>
        <div className="gt-opts">
          {[['12','A'],['13','B'],['11','C'],['14','D']].map(([v,l],i) => (
            <GTOption key={v} value={v} label={l} index={i} onClick={() => lp.handleMcq('gt02_q4', v)} className={lp.getMcqClass('gt02_q4', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'gt02_q5',
    meta: { type: 'mcq', qid: 'gt02_q5', correct: '222', explanation: '345 − 123 = 222! Ones: 5−3=2, Tens: 4−2=2, Hundreds: 3−1=2. Answer: 222!', correctLabel: '222' },
    render: (lp) => (
      <div className="gt-qcard gt-s2">
        <AchievementBadge icon="🎈" label="SUBTRACT!" color="#f97316" />
        <StoryBox emoji="🎈" text="A shop had 345 balloons. 123 were sold at the party. How many balloons remain?" color="#fef3c7" border="#f97316" />
        <p className="gt-qtext">345 − 123 = ? 🎈</p>
        <div className="gt-opts">
          {[['222','A'],['212','B'],['232','C'],['242','D']].map(([v,l],i) => (
            <GTOption key={v} value={v} label={l} index={i} onClick={() => lp.handleMcq('gt02_q5', v)} className={lp.getMcqClass('gt02_q5', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'gt02_q6',
    meta: { type: 'tf', qid: 'gt02_q6_tf', correct: true, explanation: '200 − 150 = 50. 2 hundreds minus 1 hundred 5 tens = 50!', correctLabel: 'True' },
    render: (lp) => (
      <div className="gt-qcard gt-s2">
        <AchievementBadge icon="🎯" label="TRUE OR FALSE?" color="#8b5cf6" />
        <StoryBox emoji="🐢" text="Kachua the turtle collected 200 shells. He gave 150 away. He thinks 50 are left!" color="#f0fdf4" border="#16a34a" />
        <BoxDiagram part1={50} part2={150} whole={200} unknownPart="part1" />
        <p className="gt-qtext">200 − 150 = 50. True or False?</p>
        <GTTFButtons qid="gt02_q6_tf" lp={lp} />
      </div>
    ),
  },
  {
    id: 'gt02_q7',
    meta: { type: 'mcq', qid: 'gt02_q7', correct: '312', explanation: '432 − 120 = 312! Ones: 2−0=2, Tens: 3−2=1, Hundreds: 4−1=3. Answer: 312!', correctLabel: '312' },
    render: (lp) => (
      <div className="gt-qcard gt-s2">
        <AchievementBadge icon="🦋" label="SUBTRACT HTO" color="#0d9488" />
        <StoryBox emoji="🦋" text="A forest had 432 butterflies. 120 flew away. How many are still in the forest?" color="#f0fdf4" border="#0d9488" />
        <div style={{ display: 'flex', justifyContent: 'center', gap: 12, margin: '14px 0', flexWrap: 'wrap' }}>
          <HTODisplay number={432} />
          <span style={{ fontFamily: "'Baloo 2',cursive", fontWeight: 900, fontSize: '2rem', alignSelf: 'center' }}>−</span>
          <HTODisplay number={120} />
        </div>
        <p className="gt-qtext">432 − 120 = ? 🦋</p>
        <div className="gt-opts">
          {[['312','A'],['322','B'],['302','C'],['332','D']].map(([v,l],i) => (
            <GTOption key={v} value={v} label={l} index={i} onClick={() => lp.handleMcq('gt02_q7', v)} className={lp.getMcqClass('gt02_q7', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'gt02_q8',
    meta: { type: 'mcq', qid: 'gt02_q8', correct: '35', explanation: 'Riya had 50 coins. She gave 15 to her brother. 50 − 15 = 35 coins left!', correctLabel: '35' },
    render: (lp) => (
      <div className="gt-qcard gt-s2">
        <AchievementBadge icon="🪙" label="COINS!" color="#f59e0b" />
        <StoryBox emoji="🪙" text="Riya had 50 coins in her piggy bank. She gave 15 coins to her little brother. How many left?" color="#fef3c7" border="#f59e0b" />
        <EmojiRow emoji="🪙" count={15} label="50 coins (showing 15)" color="#fef9c3" border="#fde68a" />
        <p className="gt-qtext">50 − 15 = ? 🪙</p>
        <div className="gt-opts">
          {[['35','A'],['45','B'],['25','C'],['40','D']].map(([v,l],i) => (
            <GTOption key={v} value={v} label={l} index={i} onClick={() => lp.handleMcq('gt02_q8', v)} className={lp.getMcqClass('gt02_q8', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'gt02_q9',
    meta: { type: 'tf', qid: 'gt02_q9_tf', correct: true, explanation: '300 − 100 = 200. 3 hundreds minus 1 hundred = 2 hundreds = 200!', correctLabel: 'True' },
    render: (lp) => (
      <div className="gt-qcard gt-s2">
        <AchievementBadge icon="🎯" label="TRUE OR FALSE?" color="#8b5cf6" />
        <StoryBox emoji="🏫" text="A school had 300 pencils. 100 were distributed. The teacher says 200 pencils are left!" color="#f0fdf4" border="#16a34a" />
        <BoxDiagram part1={200} part2={100} whole={300} unknownPart="part1" />
        <p className="gt-qtext">300 − 100 = 200. True or False?</p>
        <GTTFButtons qid="gt02_q9_tf" lp={lp} />
      </div>
    ),
  },
  {
    id: 'gt02_q10',
    matchAnswers: { gt02_match: { 'gt02_m1': '7', 'gt02_m2': '60', 'gt02_m3': '35', 'gt02_m4': '200' } },
    rightItems: [['7','7'],['60','60'],['35','35'],['200','200']],
    meta: { type: 'match', totalPairs: 4, explanation: '12−5=7, 100−40=60, 50−15=35, 300−100=200. You matched them all!', correctLabel: 'All pairs matched!' },
    render: (lp, ctx) => (
      <div className="gt-qcard gt-s2">
        <AchievementBadge icon="🔗" label="MATCH IT!" color="#0891b2" />
        <StoryBox emoji="🧩" text="Match each subtraction to its answer! Find all 4 pairs!" color="#f0fdf4" border="#0d9488" />
        <p className="gt-qtext">Match the subtraction to the answer! 🎯</p>
        <div className="gt-match-wrap">
          <div className="gt-match-col">
            {[['gt02_m1','12 − 5'],['gt02_m2','100 − 40'],['gt02_m3','50 − 15'],['gt02_m4','300 − 100']].map(([val, label], i) => (
              <motion.div key={val} initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }}
                onClick={() => lp.handleMatch('gt02_match','left',val)} className={`gt-match-item ${lp.getMatchClass('gt02_match','left',val)}`}>{label}</motion.div>
            ))}
          </div>
          <div className="gt-match-center">{[0,1,2,3].map(i => <div key={i} className="gt-match-line">→</div>)}</div>
          <div className="gt-match-col">
            {ctx.shuffledRight.map(([val, label], i) => (
              <motion.div key={val} initial={{ opacity: 0, x: 15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }}
                onClick={() => lp.handleMatch('gt02_match','right',val)} className={`gt-match-item ${lp.getMatchClass('gt02_match','right',val)}`}>{label}</motion.div>
            ))}
          </div>
        </div>
      </div>
    ),
  },
];

const SubtractionBorrowing = () => {
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
  return <GTPracticeTemplate skillId="GT-02" skillName="Subtraction with Borrowing" questions={questions} questionMeta={questionMeta} logicProps={logicProps} />;
};

export default SubtractionBorrowing;
