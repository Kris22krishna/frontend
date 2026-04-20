import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { useFLLogic } from './useFLLogic';
import FLPracticeTemplate from './FLPracticeTemplate';
import { BalanceScaleSVG, WeightBlocks, FLOption, FLTFButtons, AchievementBadge, shuffle } from './FLSharedComponents';
import './filling-and-lifting.css';

const QUESTION_POOL = [
  {
    id: 'hq_q1',
    meta: { type: 'mcq', qid: 'hq_q1', correct: '2', explanation: '1 kg = 2 half kg. Like splitting 1 whole into 2 equal halves!', correctLabel: '2' },
    render: (lp) => (
      <div className="fl-qcard fl-s8">
        <AchievementBadge icon="½" label="HALF KILOGRAM!" color="#7c3aed" />
        <p className="fl-qtext">1 kg = ___ half kg? ½</p>
        <WeightBlocks weights={[{ label: '1 kg', type: 'kg' }, { label: '= ½ kg', type: 'half' }, { label: '+ ½ kg', type: 'half' }]} />
        <div className="fl-opts">
          {[['1','A'],['2','B'],['3','C'],['4','D']].map(([v,l],i) => (
            <FLOption key={v} value={v} label={l} index={i} onClick={() => lp.handleMcq('hq_q1', v)} className={lp.getMcqClass('hq_q1', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'hq_q2',
    meta: { type: 'mcq', qid: 'hq_q2', correct: '4', explanation: '1 kg = 4 quarter kg. Like cutting 1 pizza into 4 equal slices!', correctLabel: '4' },
    render: (lp) => (
      <div className="fl-qcard fl-s8">
        <AchievementBadge icon="¼" label="QUARTER KILOGRAM!" color="#7c3aed" />
        <p className="fl-qtext">1 kg = ___ quarter kg? ¼</p>
        <WeightBlocks weights={[{ label: '¼ kg', type: 'quarter' }, { label: '¼ kg', type: 'quarter' }, { label: '¼ kg', type: 'quarter' }, { label: '¼ kg', type: 'quarter' }]} />
        <div className="fl-opts">
          {[['2','A'],['3','B'],['4','C'],['8','D']].map(([v,l],i) => (
            <FLOption key={v} value={v} label={l} index={i} onClick={() => lp.handleMcq('hq_q2', v)} className={lp.getMcqClass('hq_q2', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'hq_q3',
    meta: { type: 'tf', qid: 'hq_q3_tf', correct: true, explanation: 'Yes! Half kg + half kg = 1 whole kg. Two halves always make one whole!', correctLabel: 'True' },
    render: (lp) => (
      <div className="fl-qcard fl-s8">
        <AchievementBadge icon="🎯" label="TRUE OR FALSE?" color="#7c3aed" />
        <p className="fl-qtext">½ kg + ½ kg = 1 kg. True or False?</p>
        <BalanceScaleSVG leftLabel="½+½ kg" rightLabel="1 kg" tilt="equal" leftColor="#a7f3d0" rightColor="#a7f3d0" />
        <FLTFButtons qid="hq_q3_tf" lp={lp} />
      </div>
    ),
  },
  {
    id: 'hq_q4',
    meta: { type: 'mcq', qid: 'hq_q4', correct: '2', explanation: '1 half kg = 2 quarter kg. So ½ kg = 2 × ¼ kg!', correctLabel: '2' },
    render: (lp) => (
      <div className="fl-qcard fl-s8">
        <AchievementBadge icon="✂️" label="SPLIT THE HALF!" color="#7c3aed" />
        <p className="fl-qtext">1 half kg = ___ quarter kg? ✂️</p>
        <WeightBlocks weights={[{ label: '½ kg', type: 'half' }, { label: '= ¼ kg', type: 'quarter' }, { label: '+ ¼ kg', type: 'quarter' }]} />
        <div className="fl-opts">
          {[['1','A'],['2','B'],['3','C'],['4','D']].map(([v,l],i) => (
            <FLOption key={v} value={v} label={l} index={i} onClick={() => lp.handleMcq('hq_q4', v)} className={lp.getMcqClass('hq_q4', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'hq_q5',
    meta: { type: 'mcq', qid: 'hq_q5', correct: '1 kg', explanation: '4 quarter kg = 4 × ¼ = 1 whole kg!', correctLabel: '1 kg' },
    render: (lp) => (
      <div className="fl-qcard fl-s8">
        <AchievementBadge icon="➕" label="ADD THEM UP!" color="#7c3aed" />
        <p className="fl-qtext">¼ kg + ¼ kg + ¼ kg + ¼ kg = ___? ➕</p>
        <WeightBlocks weights={[{ label: '¼ kg', type: 'quarter' }, { label: '¼ kg', type: 'quarter' }, { label: '¼ kg', type: 'quarter' }, { label: '¼ kg', type: 'quarter' }]} />
        <div className="fl-opts">
          {[['½ kg','A'],['¾ kg','B'],['1 kg','C'],['2 kg','D']].map(([v,l],i) => (
            <FLOption key={v} value={v} label={l} index={i} onClick={() => lp.handleMcq('hq_q5', v)} className={lp.getMcqClass('hq_q5', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'hq_q6',
    meta: { type: 'tf', qid: 'hq_q6_tf', correct: true, explanation: 'Yes! 4 × ¼ kg = 1 kg. Four quarter kilograms together make exactly 1 kilogram!', correctLabel: 'True' },
    render: (lp) => (
      <div className="fl-qcard fl-s8">
        <AchievementBadge icon="🎯" label="TRUE OR FALSE?" color="#7c3aed" />
        <p className="fl-qtext">4 quarter kg = 1 kg. True or False?</p>
        <FLTFButtons qid="hq_q6_tf" lp={lp} />
      </div>
    ),
  },
  {
    id: 'hq_q7',
    meta: { type: 'mcq', qid: 'hq_q7', correct: 'Half kg', explanation: 'Half kg = ½ kg. Quarter kg = ¼ kg. Since ½ > ¼, half kg is heavier than quarter kg!', correctLabel: 'Half kg' },
    render: (lp) => (
      <div className="fl-qcard fl-s8">
        <AchievementBadge icon="⚖️" label="WHICH IS HEAVIER?" color="#7c3aed" />
        <p className="fl-qtext">Which weighs more — ½ kg or ¼ kg? ⚖️</p>
        <BalanceScaleSVG leftLabel="½ kg" rightLabel="¼ kg" tilt="left" leftColor="#ddd6fe" rightColor="#fde68a" />
        <div className="fl-opts">
          {[['Quarter kg','A'],['Half kg','B'],['Both same','C'],['Cannot tell','D']].map(([v,l],i) => (
            <FLOption key={v} value={v} label={l} index={i} onClick={() => lp.handleMcq('hq_q7', v)} className={lp.getMcqClass('hq_q7', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'hq_q8',
    meta: { type: 'mcq', qid: 'hq_q8', correct: '2 half kg weights', explanation: 'To balance 1 kg, you need 1 kg on the other side. Two ½ kg weights = 1 kg!', correctLabel: '2 half kg weights' },
    render: (lp) => (
      <div className="fl-qcard fl-s8">
        <AchievementBadge icon="⚖️" label="BALANCE IT!" color="#7c3aed" />
        <p className="fl-qtext">To balance 1 kg on left, put ___ on right? ⚖️</p>
        <BalanceScaleSVG leftLabel="1 kg" rightLabel="?" tilt="left" leftColor="#ddd6fe" rightColor="#e2e8f0" />
        <div className="fl-opts">
          {[['1 quarter kg weight','A'],['2 half kg weights','B'],['3 quarter kg weights','C'],['4 half kg weights','D']].map(([v,l],i) => (
            <FLOption key={v} value={v} label={l} index={i} onClick={() => lp.handleMcq('hq_q8', v)} className={lp.getMcqClass('hq_q8', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'hq_q9',
    meta: { type: 'tf', qid: 'hq_q9_tf', correct: false, explanation: 'False! 2 quarter kg = ½ kg, NOT 1 kg. You need 4 quarter kg pieces to make 1 full kg!', correctLabel: 'False' },
    render: (lp) => (
      <div className="fl-qcard fl-s8">
        <AchievementBadge icon="🎯" label="TRUE OR FALSE?" color="#7c3aed" />
        <p className="fl-qtext">2 quarter kg = 1 kg. True or False?</p>
        <FLTFButtons qid="hq_q9_tf" lp={lp} />
      </div>
    ),
  },
  {
    id: 'hq_q10',
    matchAnswers: { hq_match10: { 'hq_m_two_half': '1 kg', 'hq_m_four_quarter': '1 kg total', 'hq_m_one_half': '½ kg', 'hq_m_two_quarter': '½ kg total' } },
    rightItems: [['1 kg','1 kg'],['1 kg total','1 kg total'],['½ kg','½ kg'],['½ kg total','½ kg total']],
    meta: { type: 'match', totalPairs: 4, explanation: '2×½=1kg, 4×¼=1kg, 1×½=½kg, 2×¼=½kg. Fractions working together!', correctLabel: 'All pairs matched!' },
    render: (lp, ctx) => (
      <div className="fl-qcard fl-s8">
        <AchievementBadge icon="🔗" label="MATCH WEIGHTS!" color="#0891b2" />
        <p className="fl-qtext">Match each combination to its total weight! 🎯</p>
        <div className="fl-match-wrap">
          <div className="fl-match-col">
            {[['hq_m_two_half','2 × ½ kg'],['hq_m_four_quarter','4 × ¼ kg'],['hq_m_one_half','1 × ½ kg'],['hq_m_two_quarter','2 × ¼ kg']].map(([val, label], i) => (
              <motion.div key={val} initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }}
                onClick={() => lp.handleMatch('hq_match10','left',val)} className={`fl-match-item ${lp.getMatchClass('hq_match10','left',val)}`}>{label}</motion.div>
            ))}
          </div>
          <div className="fl-match-center">{[0,1,2,3].map(i => <div key={i} className="fl-match-line">→</div>)}</div>
          <div className="fl-match-col">
            {ctx.shuffledRight.map(([val, label], i) => (
              <motion.div key={val} initial={{ opacity: 0, x: 15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }}
                onClick={() => lp.handleMatch('hq_match10','right',val)} className={`fl-match-item ${lp.getMatchClass('hq_match10','right',val)}`}>{label}</motion.div>
            ))}
          </div>
        </div>
      </div>
    ),
  },
];

const HalfAndQuarterKg = () => {
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
  return <FLPracticeTemplate skillId="FL-08" skillName="Half and Quarter kg" questions={questions} questionMeta={questionMeta} logicProps={logicProps} />;
};

export default HalfAndQuarterKg;
