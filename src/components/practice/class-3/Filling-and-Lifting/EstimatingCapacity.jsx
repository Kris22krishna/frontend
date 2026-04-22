import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { useFLLogic } from './useFLLogic';
import FLPracticeTemplate from './FLPracticeTemplate';
import { CapacityRow, FLOption, FLTFButtons, AchievementBadge, PourBubbles, shuffle } from './FLSharedComponents';
import './filling-and-lifting.css';

const QUESTION_POOL = [
  {
    id: 'ec_q1',
    meta: { type: 'mcq', qid: 'ec_q1', correct: '3 bowls', explanation: 'A glass holds about 3 times more than a small bowl. You need about 3 bowls to fill 1 glass!', correctLabel: '3 bowls' },
    render: (lp) => (
      <div className="fl-qcard fl-s2">
        <AchievementBadge icon="🔮" label="GUESS & CHECK!" color="#10b981" />
        <p className="fl-qtext">About how many small bowls fill 1 big glass? 🔮</p>
        <CapacityRow containers={[
          { type: 'bowl', fillPct: 100, color: '#6ee7b7', label: 'Bowl', size: 'sm' },
          { type: 'bowl', fillPct: 100, color: '#6ee7b7', label: 'Bowl', size: 'sm' },
          { type: 'bowl', fillPct: 100, color: '#6ee7b7', label: 'Bowl', size: 'sm' },
          { type: 'glass', fillPct: 100, color: '#10b981', label: 'Big glass', size: 'lg' },
        ]} />
        <div className="fl-opts">
          {[['1 bowl','A'],['2 bowls','B'],['3 bowls','C'],['10 bowls','D']].map(([v,l],i) => (
            <FLOption key={v} value={v} label={l} index={i} onClick={() => lp.handleMcq('ec_q1', v)} className={lp.getMcqClass('ec_q1', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'ec_q2',
    meta: { type: 'mcq', qid: 'ec_q2', correct: 'A little too high', explanation: 'She guessed 5 but it only took 4 glasses — her guess was a little too high (she over-estimated)!', correctLabel: 'A little too high' },
    render: (lp) => (
      <div className="fl-qcard fl-s2">
        <AchievementBadge icon="🎯" label="CHECK YOUR GUESS!" color="#10b981" />
        <p className="fl-qtext">Anu guessed 5 glasses, but it actually took 4. Her guess was… 🎯</p>
        <PourBubbles items={[{ label: 'Her guess', value: '5 glasses' }, { label: 'Actual', value: '4 glasses' }]} />
        <div className="fl-opts">
          {[['Exactly right','A'],['A little too low','B'],['A little too high','C'],['Way too low','D']].map(([v,l],i) => (
            <FLOption key={v} value={v} label={l} index={i} onClick={() => lp.handleMcq('ec_q2', v)} className={lp.getMcqClass('ec_q2', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'ec_q3',
    meta: { type: 'tf', qid: 'ec_q3_tf', correct: true, explanation: 'Yes! A bowl is a wide container that holds much more than a small teacup.', correctLabel: 'True' },
    render: (lp) => (
      <div className="fl-qcard fl-s2">
        <AchievementBadge icon="🎯" label="TRUE OR FALSE?" color="#7c3aed" />
        <p className="fl-qtext">A bowl holds MORE than a teacup. True or False?</p>
        <CapacityRow containers={[
          { type: 'bowl', fillPct: 100, color: '#6ee7b7', label: 'Bowl', size: 'md' },
          { type: 'mug', fillPct: 100, color: '#34d399', label: 'Teacup', size: 'sm' },
        ]} />
        <FLTFButtons qid="ec_q3_tf" lp={lp} />
      </div>
    ),
  },
  {
    id: 'ec_q4',
    meta: { type: 'mcq', qid: 'ec_q4', correct: '🪣 Bucket', explanation: 'Of all these containers, a bucket holds the most — it is the largest!', correctLabel: '🪣 Bucket' },
    render: (lp) => (
      <div className="fl-qcard fl-s2">
        <AchievementBadge icon="🏆" label="MOST CAPACITY!" color="#10b981" />
        <p className="fl-qtext">Which container holds the MOST? 🏆</p>
        <CapacityRow containers={[
          { type: 'mug', fillPct: 100, color: '#a7f3d0', label: 'Mug', size: 'sm' },
          { type: 'glass', fillPct: 100, color: '#34d399', label: 'Glass', size: 'md' },
          { type: 'jug', fillPct: 100, color: '#10b981', label: 'Jug', size: 'md' },
          { type: 'bucket', fillPct: 100, color: '#059669', label: 'Bucket', size: 'lg' },
        ]} />
        <div className="fl-opts">
          {[['☕ Mug','A'],['🥤 Glass','B'],['🏺 Jug','C'],['🪣 Bucket','D']].map(([v,l],i) => (
            <FLOption key={v} value={v} label={l} index={i} onClick={() => lp.handleMcq('ec_q4', v)} className={lp.getMcqClass('ec_q4', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'ec_q5',
    meta: { type: 'mcq', qid: 'ec_q5', correct: '☕ Teacup', explanation: 'Of all these options, a teacup is the smallest — it holds the least!', correctLabel: '☕ Teacup' },
    render: (lp) => (
      <div className="fl-qcard fl-s2">
        <AchievementBadge icon="🔍" label="LEAST CAPACITY!" color="#10b981" />
        <p className="fl-qtext">Which container holds the LEAST? 🔍</p>
        <div className="fl-opts">
          {[['☕ Teacup','A'],['🥤 Glass','B'],['🏺 Jug','C'],['🪣 Bucket','D']].map(([v,l],i) => (
            <FLOption key={v} value={v} label={l} index={i} onClick={() => lp.handleMcq('ec_q5', v)} className={lp.getMcqClass('ec_q5', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'ec_q6',
    meta: { type: 'tf', qid: 'ec_q6_tf', correct: true, explanation: 'Yes! A jug is much bigger than a glass, so it holds more water.', correctLabel: 'True' },
    render: (lp) => (
      <div className="fl-qcard fl-s2">
        <AchievementBadge icon="🎯" label="TRUE OR FALSE?" color="#7c3aed" />
        <p className="fl-qtext">A jug holds MORE than a glass. True or False?</p>
        <FLTFButtons qid="ec_q6_tf" lp={lp} />
      </div>
    ),
  },
  {
    id: 'ec_q7',
    meta: { type: 'mcq', qid: 'ec_q7', correct: 'Less', explanation: 'A mug is smaller than a bucket — so a mug holds LESS than a bucket!', correctLabel: 'Less' },
    render: (lp) => (
      <div className="fl-qcard fl-s2">
        <AchievementBadge icon="📝" label="FILL IN THE BLANK!" color="#10b981" />
        <p className="fl-qtext">A mug holds _____ than a bucket. 📝</p>
        <CapacityRow containers={[
          { type: 'mug', fillPct: 80, color: '#6ee7b7', label: 'Mug', size: 'md' },
          { type: 'bucket', fillPct: 80, color: '#059669', label: 'Bucket', size: 'lg' },
        ]} />
        <div className="fl-opts">
          {[['More','A'],['Less','B'],['Same','C'],['Much more','D']].map(([v,l],i) => (
            <FLOption key={v} value={v} label={l} index={i} onClick={() => lp.handleMcq('ec_q7', v)} className={lp.getMcqClass('ec_q7', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'ec_q8',
    meta: { type: 'mcq', qid: 'ec_q8', correct: 'By pouring and counting', explanation: 'The best way to verify a capacity guess is to actually pour and count — that gives you the real answer!', correctLabel: 'By pouring and counting' },
    render: (lp) => (
      <div className="fl-qcard fl-s2">
        <AchievementBadge icon="🧪" label="SCIENCE TIME!" color="#10b981" />
        <p className="fl-qtext">How can Bholu verify his capacity guess? 🧪</p>
        <div className="fl-opts">
          {[['By looking at the bottle','A'],['By pouring and counting','B'],['By asking a friend','C'],['By weighing it','D']].map(([v,l],i) => (
            <FLOption key={v} value={v} label={l} index={i} onClick={() => lp.handleMcq('ec_q8', v)} className={lp.getMcqClass('ec_q8', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'ec_q9',
    meta: { type: 'tf', qid: 'ec_q9_tf', correct: true, explanation: 'Correct! A small cup always holds less than a big mug because the mug has more space inside.', correctLabel: 'True' },
    render: (lp) => (
      <div className="fl-qcard fl-s2">
        <AchievementBadge icon="🎯" label="TRUE OR FALSE?" color="#7c3aed" />
        <p className="fl-qtext">A small cup holds LESS than a big mug. True or False?</p>
        <FLTFButtons qid="ec_q9_tf" lp={lp} />
      </div>
    ),
  },
  {
    id: 'ec_q10',
    matchAnswers: { ec_match10: { 'ec_m_most': 'Bucket', 'ec_m_more': 'Jug', 'ec_m_less': 'Glass', 'ec_m_least': 'Teacup' } },
    rightItems: [['Bucket','Bucket'],['Jug','Jug'],['Glass','Glass'],['Teacup','Teacup']],
    meta: { type: 'match', totalPairs: 4, explanation: 'Most → Bucket, More → Jug, Less → Glass, Least → Teacup. From most to least!', correctLabel: 'All pairs matched!' },
    render: (lp, ctx) => (
      <div className="fl-qcard fl-s2">
        <AchievementBadge icon="🔗" label="MATCH CAPACITY!" color="#0891b2" />
        <p className="fl-qtext">Match each word to the correct container! 🎯</p>
        <div className="fl-match-wrap">
          <div className="fl-match-col">
            {[['ec_m_most','🏆 Most capacity'],['ec_m_more','➕ More capacity'],['ec_m_less','➖ Less capacity'],['ec_m_least','🔻 Least capacity']].map(([val, label], i) => (
              <motion.div key={val} initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }}
                onClick={() => lp.handleMatch('ec_match10','left',val)} className={`fl-match-item ${lp.getMatchClass('ec_match10','left',val)}`}>{label}</motion.div>
            ))}
          </div>
          <div className="fl-match-center">{[0,1,2,3].map(i => <div key={i} className="fl-match-line">→</div>)}</div>
          <div className="fl-match-col">
            {ctx.shuffledRight.map(([val, label], i) => (
              <motion.div key={val} initial={{ opacity: 0, x: 15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }}
                onClick={() => lp.handleMatch('ec_match10','right',val)} className={`fl-match-item ${lp.getMatchClass('ec_match10','right',val)}`}>{label}</motion.div>
            ))}
          </div>
        </div>
      </div>
    ),
  },
];

const EstimatingCapacity = () => {
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
  return <FLPracticeTemplate skillId="FL-02" skillName="Estimating Capacity" questions={questions} questionMeta={questionMeta} logicProps={logicProps} />;
};

export default EstimatingCapacity;
