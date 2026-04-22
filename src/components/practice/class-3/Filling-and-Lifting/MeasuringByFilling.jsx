import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { useFLLogic } from './useFLLogic';
import FLPracticeTemplate from './FLPracticeTemplate';
import { CapacityRow, FLOption, FLTFButtons, AchievementBadge, PourBubbles, shuffle } from './FLSharedComponents';
import './filling-and-lifting.css';

const QUESTION_POOL = [
  {
    id: 'mf_q1',
    meta: { type: 'mcq', qid: 'mf_q1', correct: '12', explanation: '1 bowl needs 4 ladles. So 3 bowls need 3 × 4 = 12 ladles!', correctLabel: '12' },
    render: (lp) => (
      <div className="fl-qcard fl-s3">
        <AchievementBadge icon="🥄" label="LADLE COUNTING!" color="#8b5cf6" />
        <p className="fl-qtext">4 ladles fill 1 bowl. How many ladles fill 3 bowls? 🥄</p>
        <PourBubbles items={[{ label: '1 bowl needs', value: '4 ladles' }, { label: '3 bowls need', value: '? ladles' }]} />
        <div className="fl-opts">
          {[['7','A'],['12','B'],['8','C'],['16','D']].map(([v,l],i) => (
            <FLOption key={v} value={v} label={l} index={i} onClick={() => lp.handleMcq('mf_q1', v)} className={lp.getMcqClass('mf_q1', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'mf_q2',
    meta: { type: 'mcq', qid: 'mf_q2', correct: '6', explanation: '1 jug needs 3 glasses. So 2 jugs need 2 × 3 = 6 glasses!', correctLabel: '6' },
    render: (lp) => (
      <div className="fl-qcard fl-s3">
        <AchievementBadge icon="🥤" label="JUG FILLING!" color="#8b5cf6" />
        <p className="fl-qtext">3 glasses fill 1 jug. How many glasses fill 2 jugs? 🥤</p>
        <PourBubbles items={[{ label: '1 jug needs', value: '3 glasses' }, { label: '2 jugs need', value: '? glasses' }]} />
        <div className="fl-opts">
          {[['4','A'],['5','B'],['6','C'],['9','D']].map(([v,l],i) => (
            <FLOption key={v} value={v} label={l} index={i} onClick={() => lp.handleMcq('mf_q2', v)} className={lp.getMcqClass('mf_q2', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'mf_q3',
    meta: { type: 'tf', qid: 'mf_q3_tf', correct: true, explanation: 'Yes! Any smaller container can be used to measure a larger one — you just count how many times you pour!', correctLabel: 'True' },
    render: (lp) => (
      <div className="fl-qcard fl-s3">
        <AchievementBadge icon="🎯" label="TRUE OR FALSE?" color="#7c3aed" />
        <p className="fl-qtext">You can use any smaller container to measure a bigger one. True or False?</p>
        <FLTFButtons qid="mf_q3_tf" lp={lp} />
      </div>
    ),
  },
  {
    id: 'mf_q4',
    meta: { type: 'mcq', qid: 'mf_q4', correct: 'Mug', explanation: 'A cup needs 8 spoons and a mug needs 12 spoons. Since mug needs MORE spoons, it must be BIGGER!', correctLabel: 'Mug' },
    render: (lp) => (
      <div className="fl-qcard fl-s3">
        <AchievementBadge icon="🔍" label="BIGGER OR SMALLER?" color="#8b5cf6" />
        <p className="fl-qtext">Cup = 8 spoons. Mug = 12 spoons (same spoon). Which is bigger? 🔍</p>
        <PourBubbles items={[{ label: '☕ Cup', value: '8 spoons' }, { label: '🫖 Mug', value: '12 spoons' }]} />
        <div className="fl-opts">
          {[['Cup','A'],['Mug','B'],['Both same','C'],['Spoon','D']].map(([v,l],i) => (
            <FLOption key={v} value={v} label={l} index={i} onClick={() => lp.handleMcq('mf_q4', v)} className={lp.getMcqClass('mf_q4', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'mf_q5',
    meta: { type: 'mcq', qid: 'mf_q5', correct: '2', explanation: '5 mugs fill 1 bucket. So 10 mugs fill 10 ÷ 5 = 2 buckets!', correctLabel: '2' },
    render: (lp) => (
      <div className="fl-qcard fl-s3">
        <AchievementBadge icon="🪣" label="BUCKET FILLING!" color="#8b5cf6" />
        <p className="fl-qtext">5 mugs = 1 bucket. 10 mugs = ___ buckets? 🪣</p>
        <PourBubbles items={[{ label: '1 bucket', value: '5 mugs' }, { label: '? buckets', value: '10 mugs' }]} />
        <div className="fl-opts">
          {[['1','A'],['2','B'],['3','C'],['5','D']].map(([v,l],i) => (
            <FLOption key={v} value={v} label={l} index={i} onClick={() => lp.handleMcq('mf_q5', v)} className={lp.getMcqClass('mf_q5', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'mf_q6',
    meta: { type: 'tf', qid: 'mf_q6_tf', correct: true, explanation: 'Yes! When you use a smaller measuring unit, you need to pour more times — so the count is larger!', correctLabel: 'True' },
    render: (lp) => (
      <div className="fl-qcard fl-s3">
        <AchievementBadge icon="🎯" label="TRUE OR FALSE?" color="#7c3aed" />
        <p className="fl-qtext">Using a SMALLER unit gives a LARGER count of pours. True or False?</p>
        <FLTFButtons qid="mf_q6_tf" lp={lp} />
      </div>
    ),
  },
  {
    id: 'mf_q7',
    meta: { type: 'mcq', qid: 'mf_q7', correct: '3', explanation: '1 bowl needs 3 glasses. So 9 glasses can fill 9 ÷ 3 = 3 bowls!', correctLabel: '3' },
    render: (lp) => (
      <div className="fl-qcard fl-s3">
        <AchievementBadge icon="🥣" label="BOWL CHALLENGE!" color="#8b5cf6" />
        <p className="fl-qtext">3 glasses fill 1 bowl. 9 glasses fill how many bowls? 🥣</p>
        <PourBubbles items={[{ label: '1 bowl', value: '3 glasses' }, { label: '? bowls', value: '9 glasses' }]} />
        <div className="fl-opts">
          {[['2','A'],['3','B'],['4','C'],['6','D']].map(([v,l],i) => (
            <FLOption key={v} value={v} label={l} index={i} onClick={() => lp.handleMcq('mf_q7', v)} className={lp.getMcqClass('mf_q7', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'mf_q8',
    meta: { type: 'mcq', qid: 'mf_q8', correct: 'Smaller unit (teaspoon)', explanation: 'For small amounts, a teaspoon gives a more precise measurement. A jug would be too big and imprecise!', correctLabel: 'Smaller unit (teaspoon)' },
    render: (lp) => (
      <div className="fl-qcard fl-s3">
        <AchievementBadge icon="💊" label="MEASURE EXACTLY!" color="#8b5cf6" />
        <p className="fl-qtext">For a small amount of medicine, which is best? 💊</p>
        <div className="fl-opts">
          {[['Smaller unit (teaspoon)','A'],['Bigger unit (jug)','B'],['A bucket','C'],['A bowl','D']].map(([v,l],i) => (
            <FLOption key={v} value={v} label={l} index={i} onClick={() => lp.handleMcq('mf_q8', v)} className={lp.getMcqClass('mf_q8', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'mf_q9',
    meta: { type: 'tf', qid: 'mf_q9_tf', correct: true, explanation: 'Yes! Different measuring tools can give the same total liquid — you just express it in different units.', correctLabel: 'True' },
    render: (lp) => (
      <div className="fl-qcard fl-s3">
        <AchievementBadge icon="🎯" label="TRUE OR FALSE?" color="#7c3aed" />
        <p className="fl-qtext">Different tools can measure the same quantity of liquid. True or False?</p>
        <FLTFButtons qid="mf_q9_tf" lp={lp} />
      </div>
    ),
  },
  {
    id: 'mf_q10',
    matchAnswers: { mf_match10: { 'mf_m_ladle': 'Bowl', 'mf_m_glass': 'Jug', 'mf_m_mug': 'Bucket', 'mf_m_cup': 'Glass' } },
    rightItems: [['Bowl','Bowl'],['Jug','Jug'],['Bucket','Bucket'],['Glass','Glass']],
    meta: { type: 'match', totalPairs: 4, explanation: 'Ladle → Bowl, Glass → Jug, Mug → Bucket, Cup → Glass. Smaller units measure bigger containers!', correctLabel: 'All pairs matched!' },
    render: (lp, ctx) => (
      <div className="fl-qcard fl-s3">
        <AchievementBadge icon="🔗" label="MATCH UNITS!" color="#0891b2" />
        <p className="fl-qtext">Match each tool to the container it measures! 🎯</p>
        <div className="fl-match-wrap">
          <div className="fl-match-col">
            {[['mf_m_ladle','🥄 Ladle'],['mf_m_glass','🥤 Glass'],['mf_m_mug','🫖 Mug'],['mf_m_cup','☕ Cup']].map(([val, label], i) => (
              <motion.div key={val} initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }}
                onClick={() => lp.handleMatch('mf_match10','left',val)} className={`fl-match-item ${lp.getMatchClass('mf_match10','left',val)}`}>{label}</motion.div>
            ))}
          </div>
          <div className="fl-match-center">{[0,1,2,3].map(i => <div key={i} className="fl-match-line">→</div>)}</div>
          <div className="fl-match-col">
            {ctx.shuffledRight.map(([val, label], i) => (
              <motion.div key={val} initial={{ opacity: 0, x: 15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }}
                onClick={() => lp.handleMatch('mf_match10','right',val)} className={`fl-match-item ${lp.getMatchClass('mf_match10','right',val)}`}>{label}</motion.div>
            ))}
          </div>
        </div>
      </div>
    ),
  },
];

const MeasuringByFilling = () => {
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
  return <FLPracticeTemplate skillId="FL-03" skillName="Measuring by Filling" questions={questions} questionMeta={questionMeta} logicProps={logicProps} />;
};

export default MeasuringByFilling;
