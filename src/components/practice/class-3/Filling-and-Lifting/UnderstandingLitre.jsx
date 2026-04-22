import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { useFLLogic } from './useFLLogic';
import FLPracticeTemplate from './FLPracticeTemplate';
import { LitreDisplay, FLOption, FLTFButtons, AchievementBadge, shuffle } from './FLSharedComponents';
import './filling-and-lifting.css';

const QUESTION_POOL = [
  {
    id: 'ul_q1',
    meta: { type: 'mcq', qid: 'ul_q1', correct: '1 litre water bottle', explanation: 'A standard 1 litre water bottle holds exactly 1 litre — that is why it is labelled "1L"!', correctLabel: '1 litre water bottle' },
    render: (lp) => (
      <div className="fl-qcard fl-s4">
        <AchievementBadge icon="💧" label="LITRE EXPLORER!" color="#f59e0b" />
        <p className="fl-qtext">Which container holds EXACTLY 1 litre? 💧</p>
        <LitreDisplay bottles={[
          { label: '1 litre bottle', fillPct: 100, color: '#60a5fa', fraction: '1 L' },
          { label: 'Big bucket', fillPct: 100, color: '#34d399', fraction: '>1 L' },
          { label: 'Small cup', fillPct: 100, color: '#f87171', fraction: '<1 L' },
        ]} />
        <div className="fl-opts">
          {[['Big bucket','A'],['1 litre water bottle','B'],['Small teacup','C'],['A bowl','D']].map(([v,l],i) => (
            <FLOption key={v} value={v} label={l} index={i} onClick={() => lp.handleMcq('ul_q1', v)} className={lp.getMcqClass('ul_q1', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'ul_q2',
    meta: { type: 'mcq', qid: 'ul_q2', correct: '2', explanation: '1 litre = 2 half litres. Like splitting a pizza in half — two halves make one whole!', correctLabel: '2' },
    render: (lp) => (
      <div className="fl-qcard fl-s4">
        <AchievementBadge icon="½" label="HALF LITRE!" color="#f59e0b" />
        <p className="fl-qtext">1 litre = ___ half litres? 💧</p>
        <LitreDisplay bottles={[
          { label: '1 full litre', fillPct: 100, color: '#60a5fa', fraction: '1 L' },
          { label: 'Half litre', fillPct: 50, color: '#93c5fd', fraction: '½ L' },
          { label: 'Half litre', fillPct: 50, color: '#93c5fd', fraction: '½ L' },
        ]} />
        <div className="fl-opts">
          {[['1','A'],['2','B'],['3','C'],['4','D']].map(([v,l],i) => (
            <FLOption key={v} value={v} label={l} index={i} onClick={() => lp.handleMcq('ul_q2', v)} className={lp.getMcqClass('ul_q2', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'ul_q3',
    meta: { type: 'mcq', qid: 'ul_q3', correct: '4', explanation: '1 litre = 4 quarter litres. Like cutting a pie into 4 equal pieces!', correctLabel: '4' },
    render: (lp) => (
      <div className="fl-qcard fl-s4">
        <AchievementBadge icon="¼" label="QUARTER LITRE!" color="#f59e0b" />
        <p className="fl-qtext">1 litre = ___ quarter litres? 💧</p>
        <LitreDisplay bottles={[
          { label: '¼ L', fillPct: 25, color: '#fbbf24', fraction: '¼ L' },
          { label: '¼ L', fillPct: 25, color: '#fbbf24', fraction: '¼ L' },
          { label: '¼ L', fillPct: 25, color: '#fbbf24', fraction: '¼ L' },
          { label: '¼ L', fillPct: 25, color: '#fbbf24', fraction: '¼ L' },
        ]} />
        <div className="fl-opts">
          {[['2','A'],['3','B'],['4','C'],['8','D']].map(([v,l],i) => (
            <FLOption key={v} value={v} label={l} index={i} onClick={() => lp.handleMcq('ul_q3', v)} className={lp.getMcqClass('ul_q3', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'ul_q4',
    meta: { type: 'tf', qid: 'ul_q4_tf', correct: false, explanation: 'False! A bucket holds MUCH more than 1 litre — buckets typically hold 10 to 20 litres!', correctLabel: 'False' },
    render: (lp) => (
      <div className="fl-qcard fl-s4">
        <AchievementBadge icon="🎯" label="TRUE OR FALSE?" color="#7c3aed" />
        <p className="fl-qtext">A big bucket holds LESS than 1 litre. True or False?</p>
        <FLTFButtons qid="ul_q4_tf" lp={lp} />
      </div>
    ),
  },
  {
    id: 'ul_q5',
    meta: { type: 'tf', qid: 'ul_q5_tf', correct: false, explanation: 'False! A teacup holds much LESS than 1 litre — usually about ¼ litre or even less!', correctLabel: 'False' },
    render: (lp) => (
      <div className="fl-qcard fl-s4">
        <AchievementBadge icon="🎯" label="TRUE OR FALSE?" color="#7c3aed" />
        <p className="fl-qtext">A teacup holds exactly 1 litre. True or False?</p>
        <FLTFButtons qid="ul_q5_tf" lp={lp} />
      </div>
    ),
  },
  {
    id: 'ul_q6',
    meta: { type: 'mcq', qid: 'ul_q6', correct: '1 litre', explanation: 'Half litre + half litre = 1 full litre! Two halves always make one whole.', correctLabel: '1 litre' },
    render: (lp) => (
      <div className="fl-qcard fl-s4">
        <AchievementBadge icon="➕" label="ADD THE LITRES!" color="#f59e0b" />
        <p className="fl-qtext">½ litre + ½ litre = ___? 💧</p>
        <LitreDisplay bottles={[
          { label: '½ L', fillPct: 50, color: '#93c5fd', fraction: '½ L' },
          { label: '+ ½ L', fillPct: 50, color: '#93c5fd', fraction: '½ L' },
          { label: '= ?', fillPct: 100, color: '#3b82f6', fraction: '?' },
        ]} />
        <div className="fl-opts">
          {[['½ litre','A'],['1 litre','B'],['2 litres','C'],['¼ litre','D']].map(([v,l],i) => (
            <FLOption key={v} value={v} label={l} index={i} onClick={() => lp.handleMcq('ul_q6', v)} className={lp.getMcqClass('ul_q6', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'ul_q7',
    meta: { type: 'mcq', qid: 'ul_q7', correct: 'More than 1 litre', explanation: 'A bucket is much bigger than 1 litre — it holds many litres of water!', correctLabel: 'More than 1 litre' },
    render: (lp) => (
      <div className="fl-qcard fl-s4">
        <AchievementBadge icon="🪣" label="BUCKET CAPACITY!" color="#f59e0b" />
        <p className="fl-qtext">A big bucket holds ___ 1 litre? 🪣</p>
        <div className="fl-opts">
          {[['Less than 1 litre','A'],['Exactly 1 litre','B'],['More than 1 litre','C'],['Half a litre','D']].map(([v,l],i) => (
            <FLOption key={v} value={v} label={l} index={i} onClick={() => lp.handleMcq('ul_q7', v)} className={lp.getMcqClass('ul_q7', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'ul_q8',
    meta: { type: 'mcq', qid: 'ul_q8', correct: 'Quarter litre', explanation: 'A drinking glass typically holds about ¼ litre (250 ml) — that is one quarter of a litre!', correctLabel: 'Quarter litre' },
    render: (lp) => (
      <div className="fl-qcard fl-s4">
        <AchievementBadge icon="🥤" label="GLASS SIZE!" color="#f59e0b" />
        <p className="fl-qtext">A regular drinking glass holds about ___? 🥤</p>
        <div className="fl-opts">
          {[['2 litres','A'],['1 litre','B'],['Half litre','C'],['Quarter litre','D']].map(([v,l],i) => (
            <FLOption key={v} value={v} label={l} index={i} onClick={() => lp.handleMcq('ul_q8', v)} className={lp.getMcqClass('ul_q8', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'ul_q9',
    meta: { type: 'tf', qid: 'ul_q9_tf', correct: true, explanation: 'Yes! 2 quarter litres = 2 × ¼ = ½ litre. Two quarters always make one half!', correctLabel: 'True' },
    render: (lp) => (
      <div className="fl-qcard fl-s4">
        <AchievementBadge icon="🎯" label="TRUE OR FALSE?" color="#7c3aed" />
        <p className="fl-qtext">2 quarter litres = 1 half litre. True or False?</p>
        <LitreDisplay bottles={[
          { label: '¼ L', fillPct: 25, color: '#fbbf24', fraction: '¼ L' },
          { label: '+ ¼ L', fillPct: 25, color: '#fbbf24', fraction: '¼ L' },
          { label: '= ½ L?', fillPct: 50, color: '#f59e0b', fraction: '½ L' },
        ]} />
        <FLTFButtons qid="ul_q9_tf" lp={lp} />
      </div>
    ),
  },
  {
    id: 'ul_q10',
    matchAnswers: { ul_match10: { 'ul_m_bucket': 'More than 1 L', 'ul_m_bottle': 'Exactly 1 L', 'ul_m_glass': 'Less than 1 L', 'ul_m_half': 'Half a litre' } },
    rightItems: [['More than 1 L','More than 1 L'],['Exactly 1 L','Exactly 1 L'],['Less than 1 L','Less than 1 L'],['Half a litre','Half a litre']],
    meta: { type: 'match', totalPairs: 4, explanation: 'Bucket > 1L, 1L bottle = 1L, drinking glass < 1L, half-filled 1L bottle = ½L!', correctLabel: 'All pairs matched!' },
    render: (lp, ctx) => (
      <div className="fl-qcard fl-s4">
        <AchievementBadge icon="🔗" label="MATCH LITRES!" color="#0891b2" />
        <p className="fl-qtext">Match each container to its capacity! 🎯</p>
        <div className="fl-match-wrap">
          <div className="fl-match-col">
            {[['ul_m_bucket','🪣 Big bucket'],['ul_m_bottle','🧴 1L bottle'],['ul_m_glass','🥤 Drinking glass'],['ul_m_half','½ L bottle']].map(([val, label], i) => (
              <motion.div key={val} initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }}
                onClick={() => lp.handleMatch('ul_match10','left',val)} className={`fl-match-item ${lp.getMatchClass('ul_match10','left',val)}`}>{label}</motion.div>
            ))}
          </div>
          <div className="fl-match-center">{[0,1,2,3].map(i => <div key={i} className="fl-match-line">→</div>)}</div>
          <div className="fl-match-col">
            {ctx.shuffledRight.map(([val, label], i) => (
              <motion.div key={val} initial={{ opacity: 0, x: 15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }}
                onClick={() => lp.handleMatch('ul_match10','right',val)} className={`fl-match-item ${lp.getMatchClass('ul_match10','right',val)}`}>{label}</motion.div>
            ))}
          </div>
        </div>
      </div>
    ),
  },
];

const UnderstandingLitre = () => {
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
  return <FLPracticeTemplate skillId="FL-04" skillName="Understanding Litre" questions={questions} questionMeta={questionMeta} logicProps={logicProps} />;
};

export default UnderstandingLitre;
