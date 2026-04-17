import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { useFWSLogic } from './useFWSLogic';
import FWSPracticeTemplate from './FWSPracticeTemplate';
import { FWSOption, FWSTFButtons, AchievementBadge, ShapeCard, FWSMatchLayout, shuffle } from './FWSSharedComponents';
import './fun-with-shapes.css';

// SVG Circle with center point
const CircleWithCenter = ({ showCenter = false, showDiameter = false, size = 100 }) => {
  const cx = size / 2, cy = size / 2, r = size * 0.4;
  return (
    <motion.div style={{ display: 'flex', justifyContent: 'center', margin: '12px 0' }}
      initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 260 }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle cx={cx} cy={cy} r={r} fill="#bfdbfe" stroke="#3a86ff" strokeWidth="3" />
        {showCenter && <circle cx={cx} cy={cy} r="5" fill="#ef4444" />}
        {showDiameter && <line x1={cx - r} y1={cy} x2={cx + r} y2={cy} stroke="#ef4444" strokeWidth="2.5" strokeDasharray="5,3" />}
        {showCenter && <text x={cx + 8} y={cy - 6} fontSize="11" fontWeight="700" fill="#dc2626" fontFamily="Baloo 2, cursive">centre</text>}
      </svg>
    </motion.div>
  );
};

const QUESTION_POOL = [
  {
    id: 'cir_q1',
    options: [['0','0 — No corners!'],['2','2 corners'],['4','4 corners'],['3','3 corners']],
    meta: { type: 'mcq', qid: 'cir_q1', correct: '0', correctLabel: '0', explanation: 'A circle has NO corners at all! It is perfectly round and smooth. That\'s why a ball rolls so easily — no edges, no corners.' },
    render: (lp, ctx) => (
      <div className="fws-qcard fws-s7">
        <AchievementBadge icon="⭕" label="CIRCLE SAFARI" color="#22c55e" />
        <p className="fws-qtext">⭕ How many corners does a circle have?</p>
        <CircleWithCenter size={100} />
        <div className="fws-opts">
          {ctx.shuffledOpts.map(([v, d], i) => (
            <FWSOption key={v} value={v} displayText={d} letterIdx={i} onClick={() => lp.handleMcq('cir_q1', v)} className={lp.getMcqClass('cir_q1', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'cir_q2',
    options: [['A corner','A sharp corner'],['The edge','The outer edge'],['The middle point','The middle point'],['A side','A flat side']],
    meta: { type: 'mcq', qid: 'cir_q2', correct: 'The middle point', correctLabel: 'The middle point', explanation: 'The centre of a circle is the middle point! Every point on the circle is the same distance from the centre. You can find it by folding the circle in half twice!' },
    render: (lp, ctx) => (
      <div className="fws-qcard fws-s7">
        <AchievementBadge icon="🎯" label="FIND THE CENTRE!" color="#22c55e" />
        <p className="fws-qtext">🎯 What is the CENTRE of a circle?</p>
        <CircleWithCenter showCenter size={110} />
        <div className="fws-opts">
          {ctx.shuffledOpts.map(([v, d], i) => (
            <FWSOption key={v} value={v} displayText={d} letterIdx={i} onClick={() => lp.handleMcq('cir_q2', v)} className={lp.getMcqClass('cir_q2', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'cir_q3',
    meta: { type: 'tf', qid: 'cir_q3_tf', correct: true, correctLabel: 'True', explanation: 'YES! A circle has NO straight sides. It is entirely made of one continuous curved line. This is what makes it completely different from triangles, squares, and rectangles.' },
    render: (lp) => (
      <div className="fws-qcard fws-s7">
        <AchievementBadge icon="🎯" label="TRUE OR FALSE?" color="#7c3aed" />
        <p className="fws-qtext">⭕ A circle has NO straight sides. True or False?</p>
        <CircleWithCenter size={100} />
        <FWSTFButtons qid="cir_q3_tf" lp={lp} />
      </div>
    ),
  },
  {
    id: 'cir_q4',
    options: [['Square','🟥 Square'],['Triangle','🔺 Triangle'],['Circle','⭕ Circle'],['Rectangle','▬ Rectangle']],
    meta: { type: 'mcq', qid: 'cir_q4', correct: 'Circle', correctLabel: 'Circle', explanation: 'A bangle is circular — a perfect ring shape! Other circle examples: bangles, rings, bracelets, coins, wheels.' },
    render: (lp, ctx) => (
      <div className="fws-qcard fws-s7">
        <AchievementBadge icon="💍" label="JEWELLERY SHAPES" color="#f59e0b" />
        <p className="fws-qtext">💍 What shape is a bangle?</p>
        <div style={{ fontSize: '4rem', textAlign: 'center', margin: '10px 0' }}>💍</div>
        <div className="fws-opts">
          {ctx.shuffledOpts.map(([v, d], i) => (
            <FWSOption key={v} value={v} displayText={d} letterIdx={i} onClick={() => lp.handleMcq('cir_q4', v)} className={lp.getMcqClass('cir_q4', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'cir_q5',
    options: [['Triangle','🔺 Triangle'],['Semi-circle','🌙 Semi-circle'],['Square','🟥 Square'],['Rectangle','▬ Rectangle']],
    meta: { type: 'mcq', qid: 'cir_q5', correct: 'Semi-circle', correctLabel: 'Semi-circle', explanation: 'When you fold a circle in half, you get a SEMI-CIRCLE! "Semi" means half — so semi-circle = half circle.' },
    render: (lp, ctx) => (
      <div className="fws-qcard fws-s7">
        <AchievementBadge icon="🌙" label="FOLD IT!" color="#22c55e" />
        <p className="fws-qtext">🌙 Fold a circle in half — what shape do you get?</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 16, margin: '12px 0', alignItems: 'center' }}>
          <CircleWithCenter size={80} />
          <span style={{ fontSize: '1.5rem', color: '#64748b' }}>→</span>
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.2 }}>
            <svg width={80} height={50} viewBox="0 0 80 50">
              <path d="M 4,46 A 36,36 0 0 1 76,46 Z" fill="#bfdbfe" stroke="#3a86ff" strokeWidth="2.5" />
              <line x1="4" y1="46" x2="76" y2="46" stroke="#3a86ff" strokeWidth="2.5" />
            </svg>
          </motion.div>
        </div>
        <div className="fws-opts">
          {ctx.shuffledOpts.map(([v, d], i) => (
            <FWSOption key={v} value={v} displayText={d} letterIdx={i} onClick={() => lp.handleMcq('cir_q5', v)} className={lp.getMcqClass('cir_q5', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'cir_q6',
    meta: { type: 'tf', qid: 'cir_q6_tf', correct: false, correctLabel: 'False', explanation: 'NOT all circles are the same size! Circles can be tiny (like a dot) or huge (like the sun). They are all round, but different sizes.' },
    render: (lp) => (
      <div className="fws-qcard fws-s7">
        <AchievementBadge icon="🎯" label="TRUE OR FALSE?" color="#7c3aed" />
        <p className="fws-qtext">⭕ All circles are the same size. True or False?</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 8, margin: '12px 0', alignItems: 'center' }}>
          {[30, 50, 70, 90].map((s, i) => (
            <motion.div key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i * 0.1, type: 'spring' }}>
              <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`}>
                <circle cx={s / 2} cy={s / 2} r={s * 0.42} fill="#bfdbfe" stroke="#3a86ff" strokeWidth="2" />
              </svg>
            </motion.div>
          ))}
        </div>
        <FWSTFButtons qid="cir_q6_tf" lp={lp} />
      </div>
    ),
  },
  {
    id: 'cir_q7',
    options: [['Coin','🪙 Coin'],['Clock','🕒 Clock'],['Book','📚 Book'],['Wheel','🎡 Wheel']],
    meta: { type: 'mcq', qid: 'cir_q7', correct: 'Book', correctLabel: 'Book', explanation: 'A book is NOT circular — it is rectangular! Coins, clocks, and wheels are all circular objects.' },
    render: (lp, ctx) => (
      <div className="fws-qcard fws-s7">
        <AchievementBadge icon="🚫" label="ODD ONE OUT" color="#ef4444" />
        <p className="fws-qtext">🔍 Which of these is NOT a circular object?</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 12, margin: '12px 0', fontSize: '2.5rem', flexWrap: 'wrap' }}>
          {['🪙', '🕒', '📚', '🎡'].map((e, i) => (
            <motion.span key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i * 0.1, type: 'spring' }}
              style={{ padding: '8px 14px', background: '#f8fafc', borderRadius: 12, border: '2px solid #e2e8f0' }}>
              {e}
            </motion.span>
          ))}
        </div>
        <div className="fws-opts">
          {ctx.shuffledOpts.map(([v, d], i) => (
            <FWSOption key={v} value={v} displayText={d} letterIdx={i} onClick={() => lp.handleMcq('cir_q7', v)} className={lp.getMcqClass('cir_q7', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'cir_q8',
    meta: { type: 'tf', qid: 'cir_q8_tf', correct: true, correctLabel: 'True', explanation: 'YES! A circle has exactly 0 corners. It is completely smooth with no points, no edges — just a continuous curve.' },
    render: (lp) => (
      <div className="fws-qcard fws-s7">
        <AchievementBadge icon="🎯" label="TRUE OR FALSE?" color="#7c3aed" />
        <p className="fws-qtext">⭕ A circle has exactly 0 corners. True or False?</p>
        <CircleWithCenter size={100} />
        <FWSTFButtons qid="cir_q8_tf" lp={lp} />
      </div>
    ),
  },
  {
    id: 'cir_q9',
    options: [['Perimeter','Perimeter'],['Diameter','Diameter'],['Radius','Radius'],['Boundary','Boundary']],
    meta: { type: 'mcq', qid: 'cir_q9', correct: 'Diameter', correctLabel: 'Diameter', explanation: 'A line that passes through the CENTRE of a circle and touches both sides is called the DIAMETER! It divides the circle into two equal halves.' },
    render: (lp, ctx) => (
      <div className="fws-qcard fws-s7">
        <AchievementBadge icon="📏" label="CIRCLE PARTS" color="#3a86ff" />
        <p className="fws-qtext">📏 A line through the centre of a circle is called…?</p>
        <CircleWithCenter showCenter showDiameter size={110} />
        <div className="fws-opts">
          {ctx.shuffledOpts.map(([v, d], i) => (
            <FWSOption key={v} value={v} displayText={d} letterIdx={i} onClick={() => lp.handleMcq('cir_q9', v)} className={lp.getMcqClass('cir_q9', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'cir_q10',
    matchAnswers: { cir_match10: { 'cir_m_bangle': 'Circle_bangle', 'cir_m_coin': 'Circle_coin', 'cir_m_corners': '0', 'cir_m_fold': 'Semi-circle' } },
    rightItems: [['Circle_bangle','Circle shape'],['Circle_coin','⭕ Circular'],['0','Zero corners'],['Semi-circle','Half circle']],
    meta: { type: 'match', totalPairs: 4, explanation: 'Bangle→Circle, Coin→Circle, Corners→0, Fold circle in half→Semi-circle!', correctLabel: 'All matched!' },
    render: (lp, ctx) => (
      <div className="fws-qcard fws-s7">
        <AchievementBadge icon="🔗" label="CIRCLE MATCH!" color="#22c55e" />
        <p className="fws-qtext">🎯 Match each circle fact to its answer!</p>
        <FWSMatchLayout
          matchId="cir_match10"
          leftItems={[['cir_m_bangle','💍 Bangle shape?'],['cir_m_coin','🪙 Coin face shape?'],['cir_m_corners','How many corners?'],['cir_m_fold','Fold a circle in half?']]}
          shuffledRight={ctx.shuffledRight}
          lp={lp}
        />
      </div>
    ),
  },
];

const Circles = () => {
  const selRef = useRef(null);
  if (!selRef.current) {
    selRef.current = shuffle([...QUESTION_POOL]).slice(0, 5).map(q => ({
      ...q,
      ...(q.options    && { shuffledOpts:  shuffle([...q.options])    }),
      ...(q.rightItems && { shuffledRight: shuffle([...q.rightItems]) }),
    }));
  }
  const selected = selRef.current;
  const matchAnswers = {};
  selected.forEach(q => { if (q.matchAnswers) Object.assign(matchAnswers, q.matchAnswers); });
  const logicProps = useFWSLogic(matchAnswers);
  const questions = selected.map(q => <React.Fragment key={q.id}>{q.render(logicProps, q)}</React.Fragment>);
  const questionMeta = selected.map(q => q.meta);
  return <FWSPracticeTemplate skillId="FWS-07" skillName="Circles" questions={questions} questionMeta={questionMeta} logicProps={logicProps} />;
};

export default Circles;
