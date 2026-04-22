import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { useFLLogic } from './useFLLogic';
import FLPracticeTemplate from './FLPracticeTemplate';
import { CapacityRow, FLOption, FLTFButtons, AchievementBadge, shuffle } from './FLSharedComponents';
import './filling-and-lifting.css';

const QUESTION_POOL = [
  {
    id: 'cc_q1',
    meta: { type: 'mcq', qid: 'cc_q1', correct: 'Big glass', explanation: 'A bigger glass has more space inside, so it holds more juice than a small glass!', correctLabel: 'Big glass' },
    render: (lp) => (
      <div className="fl-qcard fl-s1">
        <AchievementBadge icon="🥤" label="GLASS DETECTIVE" color="#0ea5e9" />
        <p className="fl-qtext">Which glass holds MORE juice? 🥤</p>
        <CapacityRow containers={[
          { type: 'glass', fillPct: 100, color: '#60a5fa', label: 'Small glass', size: 'sm' },
          { type: 'glass', fillPct: 100, color: '#0ea5e9', label: 'Big glass', size: 'lg' },
        ]} />
        <div className="fl-opts">
          {[['Small glass','A'],['Big glass','B'],['Both same','C'],['Cannot say','D']].map(([v,l],i) => (
            <FLOption key={v} value={v} label={l} index={i} onClick={() => lp.handleMcq('cc_q1', v)} className={lp.getMcqClass('cc_q1', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'cc_q2',
    meta: { type: 'mcq', qid: 'cc_q2', correct: 'Rohan', explanation: 'Rohan used a bigger glass — each pour had more milk. So Rohan drank the most!', correctLabel: 'Rohan' },
    render: (lp) => (
      <div className="fl-qcard fl-s1">
        <AchievementBadge icon="🥛" label="MILK CHALLENGE" color="#0ea5e9" />
        <p className="fl-qtext">Who drank the MOST milk? 🥛</p>
        <CapacityRow containers={[
          { type: 'glass', fillPct: 100, color: '#bae6fd', label: 'Bholu (small)', size: 'sm' },
          { type: 'glass', fillPct: 100, color: '#7dd3fc', label: 'Priya (medium)', size: 'md' },
          { type: 'glass', fillPct: 100, color: '#0ea5e9', label: 'Rohan (big)', size: 'lg' },
        ]} />
        <div className="fl-opts">
          {[['Bholu','A'],['Priya','B'],['Rohan','C'],['All same','D']].map(([v,l],i) => (
            <FLOption key={v} value={v} label={l} index={i} onClick={() => lp.handleMcq('cc_q2', v)} className={lp.getMcqClass('cc_q2', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'cc_q3',
    meta: { type: 'tf', qid: 'cc_q3_tf', correct: true, explanation: 'A bigger glass holds more liquid per pour, so you need fewer pours to fill the same jug!', correctLabel: 'True' },
    render: (lp) => (
      <div className="fl-qcard fl-s1">
        <AchievementBadge icon="🎯" label="TRUE OR FALSE?" color="#7c3aed" />
        <p className="fl-qtext">A bigger glass needs FEWER pours to fill the same jug. True or False?</p>
        <CapacityRow containers={[
          { type: 'glass', fillPct: 75, color: '#bae6fd', label: 'Small (8 pours)', size: 'sm' },
          { type: 'jug', fillPct: 60, color: '#60a5fa', label: 'Jug', size: 'md' },
          { type: 'glass', fillPct: 75, color: '#0ea5e9', label: 'Big (4 pours)', size: 'lg' },
        ]} />
        <FLTFButtons qid="cc_q3_tf" lp={lp} />
      </div>
    ),
  },
  {
    id: 'cc_q4',
    meta: { type: 'mcq', qid: 'cc_q4', correct: 'Bholu (small glass)', explanation: 'The small glass holds LESS, so Bholu drank the least milk of all three!', correctLabel: 'Bholu (small glass)' },
    render: (lp) => (
      <div className="fl-qcard fl-s1">
        <AchievementBadge icon="🥛" label="WHO DRANK LEAST?" color="#0ea5e9" />
        <p className="fl-qtext">Who drank the LEAST milk? 🥛</p>
        <div className="fl-opts">
          {[['Tiku (big glass)','A'],['Rani (medium glass)','B'],['Bholu (small glass)','C'],['All drank equal','D']].map(([v,l],i) => (
            <FLOption key={v} value={v} label={l} index={i} onClick={() => lp.handleMcq('cc_q4', v)} className={lp.getMcqClass('cc_q4', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'cc_q5',
    meta: { type: 'mcq', qid: 'cc_q5', correct: 'Glass A is bigger', explanation: 'If Glass A fills the pot in only 3 pours but Glass B needs 6 pours, Glass A must hold more — so Glass A is bigger!', correctLabel: 'Glass A is bigger' },
    render: (lp) => (
      <div className="fl-qcard fl-s1">
        <AchievementBadge icon="🔍" label="DETECTIVE POUR!" color="#0ea5e9" />
        <p className="fl-qtext">Glass A takes 3 pours, Glass B takes 6 pours (same pot). Which is bigger? 🔍</p>
        <div className="fl-opts">
          {[['Glass A is bigger','A'],['Glass B is bigger','B'],['Both are same','C'],['Cannot tell','D']].map(([v,l],i) => (
            <FLOption key={v} value={v} label={l} index={i} onClick={() => lp.handleMcq('cc_q5', v)} className={lp.getMcqClass('cc_q5', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'cc_q6',
    meta: { type: 'tf', qid: 'cc_q6_tf', correct: false, explanation: 'A container can look big but still hold less! Shape matters — a tall, thin container holds less than a short, wide one of the same height.', correctLabel: 'False' },
    render: (lp) => (
      <div className="fl-qcard fl-s1">
        <AchievementBadge icon="🎯" label="TRUE OR FALSE?" color="#7c3aed" />
        <p className="fl-qtext">The container that LOOKS biggest always holds the most. True or False?</p>
        <FLTFButtons qid="cc_q6_tf" lp={lp} />
      </div>
    ),
  },
  {
    id: 'cc_q7',
    meta: { type: 'mcq', qid: 'cc_q7', correct: 'Use the biggest container', explanation: 'The biggest container holds most per pour — fewer trips means faster filling!', correctLabel: 'Use the biggest container' },
    render: (lp) => (
      <div className="fl-qcard fl-s1">
        <AchievementBadge icon="🏺" label="FILL IT FAST!" color="#0ea5e9" />
        <p className="fl-qtext">Which container fills a bucket FASTEST? 🏺</p>
        <div className="fl-opts">
          {[['Use the small cup','A'],['Use the medium glass','B'],['Use the biggest container','C'],['All take same time','D']].map(([v,l],i) => (
            <FLOption key={v} value={v} label={l} index={i} onClick={() => lp.handleMcq('cc_q7', v)} className={lp.getMcqClass('cc_q7', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'cc_q8',
    meta: { type: 'mcq', qid: 'cc_q8', correct: 'Big glass holds twice as much', explanation: 'Rani used 4 big glasses, Tanu used 8 small glasses for the same pot. 4 big = 8 small, so 1 big = 2 small — the big glass holds twice as much!', correctLabel: 'Big glass holds twice as much' },
    render: (lp) => (
      <div className="fl-qcard fl-s1">
        <AchievementBadge icon="💡" label="THINK IT THROUGH!" color="#0ea5e9" />
        <p className="fl-qtext">Rani uses 4 big glasses = Tanu uses 8 small glasses (same pot). This means… 💡</p>
        <div className="fl-opts">
          {[['Small glass holds twice as much','A'],['Big glass holds twice as much','B'],['Both glasses are same size','C'],['Cannot determine','D']].map(([v,l],i) => (
            <FLOption key={v} value={v} label={l} index={i} onClick={() => lp.handleMcq('cc_q8', v)} className={lp.getMcqClass('cc_q8', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'cc_q9',
    meta: { type: 'tf', qid: 'cc_q9_tf', correct: true, explanation: 'Yes! Each time you use a bigger glass, you carry more water per trip — so you make fewer trips to the tap.', correctLabel: 'True' },
    render: (lp) => (
      <div className="fl-qcard fl-s1">
        <AchievementBadge icon="🚰" label="TRIPS TO THE TAP" color="#7c3aed" />
        <p className="fl-qtext">Using a bigger glass means FEWER trips to fill the same bucket. True or False?</p>
        <FLTFButtons qid="cc_q9_tf" lp={lp} />
      </div>
    ),
  },
  {
    id: 'cc_q10',
    matchAnswers: { cc_match10: { 'cc_m_mug': 'Medium', 'cc_m_bucket': 'Largest', 'cc_m_teacup': 'Smallest', 'cc_m_jug': 'Large' } },
    rightItems: [['Medium','Medium'],['Largest','Largest'],['Smallest','Smallest'],['Large','Large']],
    meta: { type: 'match', totalPairs: 4, explanation: 'Teacup < Mug < Jug < Bucket — from smallest to largest capacity!', correctLabel: 'All pairs matched!' },
    render: (lp, ctx) => (
      <div className="fl-qcard fl-s1">
        <AchievementBadge icon="🔗" label="MATCH THE SIZE!" color="#0891b2" />
        <p className="fl-qtext">Match each container to its size! 🎯</p>
        <div className="fl-match-wrap">
          <div className="fl-match-col">
            {[['cc_m_teacup','☕ Teacup'],['cc_m_mug','🫖 Mug'],['cc_m_jug','🏺 Jug'],['cc_m_bucket','🪣 Bucket']].map(([val, label], i) => (
              <motion.div key={val} initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }}
                onClick={() => lp.handleMatch('cc_match10','left',val)} className={`fl-match-item ${lp.getMatchClass('cc_match10','left',val)}`}>{label}</motion.div>
            ))}
          </div>
          <div className="fl-match-center">{[0,1,2,3].map(i => <div key={i} className="fl-match-line">→</div>)}</div>
          <div className="fl-match-col">
            {ctx.shuffledRight.map(([val, label], i) => (
              <motion.div key={val} initial={{ opacity: 0, x: 15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }}
                onClick={() => lp.handleMatch('cc_match10','right',val)} className={`fl-match-item ${lp.getMatchClass('cc_match10','right',val)}`}>{label}</motion.div>
            ))}
          </div>
        </div>
      </div>
    ),
  },
];

const ComparingCapacity = () => {
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
  return <FLPracticeTemplate skillId="FL-01" skillName="Comparing Capacity" questions={questions} questionMeta={questionMeta} logicProps={logicProps} />;
};

export default ComparingCapacity;
