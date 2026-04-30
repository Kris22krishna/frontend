import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { useGTLogic } from './useGTLogic';
import GTPracticeTemplate from './GTPracticeTemplate';
import { GTOption, GTTFButtons, StoryBox, AchievementBadge, NumberLineGT, StonePath, shuffle } from './GTSharedComponents';
import './give-and-take.css';

const QUESTION_POOL = [
  {
    id: 'gt03_q1',
    meta: { type: 'mcq', qid: 'gt03_q1', correct: '50', explanation: 'Start at 20, jump forward 30. 20 + 30 = 50! The frog lands on 50!', correctLabel: '50' },
    render: (lp) => (
      <div className="gt-qcard gt-s3">
        <AchievementBadge icon="🐸" label="JUMP FORWARD!" color="#16a34a" />
        <StoryBox emoji="🐸" text="Froggy sits on 20 on the number line. He jumps forward 30 spaces. Where does he land?" color="#f0fdf4" border="#16a34a" />
        <NumberLineGT start={0} end={60} step={10} jumpFrom={20} jumpTo={50} jumpLabel="+30" highlight={50} />
        <p className="gt-qtext">Start at 20, jump +30. Where? 🐸</p>
        <div className="gt-opts">
          {[['50','A'],['40','B'],['60','C'],['30','D']].map(([v,l],i) => (
            <GTOption key={v} value={v} label={l} index={i} onClick={() => lp.handleMcq('gt03_q1', v)} className={lp.getMcqClass('gt03_q1', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'gt03_q2',
    meta: { type: 'mcq', qid: 'gt03_q2', correct: '50', explanation: 'Start at 80, jump BACK 30. 80 − 30 = 50! Going backwards on the number line!', correctLabel: '50' },
    render: (lp) => (
      <div className="gt-qcard gt-s3">
        <AchievementBadge icon="🐰" label="JUMP BACK!" color="#ef4444" />
        <StoryBox emoji="🐰" text="Bunny is at 80 on the number line. She hops BACK 30 steps. Where does she land?" color="#fee2e2" border="#ef4444" />
        <NumberLineGT start={40} end={90} step={10} jumpFrom={80} jumpTo={50} jumpLabel="−30" highlight={50} backward={true} />
        <p className="gt-qtext">Start at 80, jump BACK 30. Where? 🐰</p>
        <div className="gt-opts">
          {[['50','A'],['40','B'],['60','C'],['110','D']].map(([v,l],i) => (
            <GTOption key={v} value={v} label={l} index={i} onClick={() => lp.handleMcq('gt03_q2', v)} className={lp.getMcqClass('gt03_q2', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'gt03_q3',
    meta: { type: 'tf', qid: 'gt03_q3_tf', correct: true, explanation: '50 + 30 = 80! Starting at 50 and jumping forward 30 lands on 80. Correct!', correctLabel: 'True' },
    render: (lp) => (
      <div className="gt-qcard gt-s3">
        <AchievementBadge icon="🎯" label="TRUE OR FALSE?" color="#8b5cf6" />
        <StoryBox emoji="🐿️" text="Chipmunk says: I start at 50 and jump +30. I will land on 80!" color="#f0fdf4" border="#16a34a" />
        <NumberLineGT start={40} end={90} step={10} jumpFrom={50} jumpTo={80} jumpLabel="+30" highlight={80} />
        <p className="gt-qtext">50 + 30 = 80 on the number line. True or False?</p>
        <GTTFButtons qid="gt03_q3_tf" lp={lp} />
      </div>
    ),
  },
  {
    id: 'gt03_q4',
    meta: { type: 'mcq', qid: 'gt03_q4', correct: '70', explanation: '45 + 25 = 70! Jump from 45 forward by 25 to reach 70!', correctLabel: '70' },
    render: (lp) => (
      <div className="gt-qcard gt-s3">
        <AchievementBadge icon="🦊" label="JUMP AHEAD!" color="#f97316" />
        <StoryBox emoji="🦊" text="Foxy the fox is at 45. He leaps forward 25 steps on the number line. Where is he now?" color="#fef3c7" border="#f97316" />
        <NumberLineGT start={30} end={80} step={10} jumpFrom={45} jumpTo={70} jumpLabel="+25" highlight={70} />
        <p className="gt-qtext">Start at 45, jump +25. Where? 🦊</p>
        <div className="gt-opts">
          {[['60','A'],['70','B'],['65','C'],['75','D']].map(([v,l],i) => (
            <GTOption key={v} value={v} label={l} index={i} onClick={() => lp.handleMcq('gt03_q4', v)} className={lp.getMcqClass('gt03_q4', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'gt03_q5',
    meta: { type: 'mcq', qid: 'gt03_q5', correct: '50', explanation: '90 − 40 = 50! Jump backwards 40 from 90 to land on 50!', correctLabel: '50' },
    render: (lp) => (
      <div className="gt-qcard gt-s3">
        <AchievementBadge icon="🐦" label="FLY BACK!" color="#3b82f6" />
        <StoryBox emoji="🐦" text="Birdie is perched on 90. She flies BACK 40 spaces. Where does she land?" color="#eff6ff" border="#3b82f6" />
        <NumberLineGT start={40} end={100} step={10} jumpFrom={90} jumpTo={50} jumpLabel="−40" highlight={50} backward={true} />
        <p className="gt-qtext">Start at 90, jump BACK 40. Where? 🐦</p>
        <div className="gt-opts">
          {[['50','A'],['60','B'],['40','C'],['130','D']].map(([v,l],i) => (
            <GTOption key={v} value={v} label={l} index={i} onClick={() => lp.handleMcq('gt03_q5', v)} className={lp.getMcqClass('gt03_q5', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'gt03_q6',
    meta: { type: 'tf', qid: 'gt03_q6_tf', correct: true, explanation: 'Starting at 100 and jumping back 50 lands on 50. 100 − 50 = 50. Correct!', correctLabel: 'True' },
    render: (lp) => (
      <div className="gt-qcard gt-s3">
        <AchievementBadge icon="🎯" label="TRUE OR FALSE?" color="#8b5cf6" />
        <StoryBox emoji="🐘" text="Ellie the elephant says: I start at 100 and walk back 50 steps. I will reach 50!" color="#f0fdf4" border="#16a34a" />
        <NumberLineGT start={40} end={110} step={10} jumpFrom={100} jumpTo={50} jumpLabel="−50" highlight={50} backward={true} />
        <p className="gt-qtext">Starting at 100, jumping back 50 → lands on 50. True or False?</p>
        <GTTFButtons qid="gt03_q6_tf" lp={lp} />
      </div>
    ),
  },
  {
    id: 'gt03_q7',
    meta: { type: 'mcq', qid: 'gt03_q7', correct: '90', explanation: '60 + 30 = 90! Jump forward 30 from 60 to land on 90!', correctLabel: '90' },
    render: (lp) => (
      <div className="gt-qcard gt-s3">
        <AchievementBadge icon="🐸" label="JUMP FORWARD!" color="#16a34a" />
        <StoryBox emoji="🐸" text="Froggy starts at 60. He jumps forward by 30. What number does he reach?" color="#f0fdf4" border="#16a34a" />
        <NumberLineGT start={50} end={100} step={10} jumpFrom={60} jumpTo={90} jumpLabel="+30" highlight={90} />
        <p className="gt-qtext">60 + 30 = ? 🐸</p>
        <div className="gt-opts">
          {[['80','A'],['90','B'],['100','C'],['70','D']].map(([v,l],i) => (
            <GTOption key={v} value={v} label={l} index={i} onClick={() => lp.handleMcq('gt03_q7', v)} className={lp.getMcqClass('gt03_q7', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'gt03_q8',
    meta: { type: 'mcq', qid: 'gt03_q8', correct: '60', explanation: 'Two jumps of +10 each from 40: 40 → 50 → 60. Answer is 60!', correctLabel: '60' },
    render: (lp) => (
      <div className="gt-qcard gt-s3">
        <AchievementBadge icon="🦋" label="TWO JUMPS!" color="#ec4899" />
        <StoryBox emoji="🦋" text="Butterfly starts at 40. She makes TWO jumps of +10 each. Where does she land?" color="#fce7f3" border="#ec4899" />
        <StonePath numbers={[40, 50, 60]} highlight={60} />
        <p className="gt-qtext">40 → (+10) → (+10) → ? 🦋</p>
        <div className="gt-opts">
          {[['50','A'],['60','B'],['70','C'],['80','D']].map(([v,l],i) => (
            <GTOption key={v} value={v} label={l} index={i} onClick={() => lp.handleMcq('gt03_q8', v)} className={lp.getMcqClass('gt03_q8', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'gt03_q9',
    meta: { type: 'tf', qid: 'gt03_q9_tf', correct: true, explanation: '100 − 30 = 70! Jump back 30 from 100 lands on 70. Correct!', correctLabel: 'True' },
    render: (lp) => (
      <div className="gt-qcard gt-s3">
        <AchievementBadge icon="🎯" label="TRUE OR FALSE?" color="#8b5cf6" />
        <StoryBox emoji="🐢" text="Tortoise starts at 100 and walks back 30 steps. He says he will reach 70!" color="#f0fdf4" border="#16a34a" />
        <NumberLineGT start={60} end={110} step={10} jumpFrom={100} jumpTo={70} jumpLabel="−30" highlight={70} backward={true} />
        <p className="gt-qtext">100 − 30 = 70 on the number line. True or False?</p>
        <GTTFButtons qid="gt03_q9_tf" lp={lp} />
      </div>
    ),
  },
  {
    id: 'gt03_q10',
    meta: { type: 'mcq', qid: 'gt03_q10', correct: '45', explanation: 'Start at 20, jump +15 = 35, then jump +10 = 45. Three steps on number line!', correctLabel: '45' },
    render: (lp) => (
      <div className="gt-qcard gt-s3">
        <AchievementBadge icon="🚀" label="MULTI-JUMP!" color="#8b5cf6" />
        <StoryBox emoji="🚀" text="Rocket starts at 20. First jump: +15. Second jump: +10. Where does Rocket land?" color="#ede9fe" border="#8b5cf6" />
        <StonePath numbers={[20, 35, 45]} highlight={45} />
        <p className="gt-qtext">20 + 15 + 10 = ? 🚀</p>
        <div className="gt-opts">
          {[['35','A'],['45','B'],['55','C'],['40','D']].map(([v,l],i) => (
            <GTOption key={v} value={v} label={l} index={i} onClick={() => lp.handleMcq('gt03_q10', v)} className={lp.getMcqClass('gt03_q10', v)} />
          ))}
        </div>
      </div>
    ),
  },
];

const NumberLineMethod = () => {
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
  return <GTPracticeTemplate skillId="GT-03" skillName="Number Line Method" questions={questions} questionMeta={questionMeta} logicProps={logicProps} />;
};

export default NumberLineMethod;
