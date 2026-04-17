import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { useFWSLogic } from './useFWSLogic';
import FWSPracticeTemplate from './FWSPracticeTemplate';
import { FWSOption, FWSTFButtons, AchievementBadge, PatternSequence, TangramDisplay, FWSMatchLayout, shuffle } from './FWSSharedComponents';
import './fun-with-shapes.css';

const QUESTION_POOL = [
  {
    id: 'lt_q1',
    options: [['△','🔺 Triangle'],['○','⭕ Circle'],['□','🟦 Square'],['◇','💠 Diamond']],
    meta: { type: 'mcq', qid: 'lt_q1', correct: '△', correctLabel: '△ Triangle', explanation: 'The pattern is ○△ repeating: ○△○△○ — so the next is △! Look for the repeating unit to continue the pattern.' },
    render: (lp, ctx) => (
      <div className="fws-qcard fws-s9">
        <AchievementBadge icon="🔮" label="PATTERN POWER" color="#6366f1" />
        <p className="fws-qtext">🔮 What comes next in the pattern?</p>
        <PatternSequence items={['○', '△', '○', '△', '○', '?']} />
        <div className="fws-opts">
          {ctx.shuffledOpts.map(([v, d], i) => (
            <FWSOption key={v} value={v} displayText={d} letterIdx={i} onClick={() => lp.handleMcq('lt_q1', v)} className={lp.getMcqClass('lt_q1', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'lt_q2',
    options: [['△','🔺 Triangle'],['□','🟦 Square'],['○','⭕ Circle'],['◇','💠 Diamond']],
    meta: { type: 'mcq', qid: 'lt_q2', correct: '△', correctLabel: '△ Triangle', explanation: 'The pattern unit is □□△ repeating: □□△□□△□□ — so the next shape is △!' },
    render: (lp, ctx) => (
      <div className="fws-qcard fws-s9">
        <AchievementBadge icon="🎨" label="BORDER DESIGNER" color="#6366f1" />
        <p className="fws-qtext">🎨 What comes next in this border pattern?</p>
        <PatternSequence items={['□', '□', '△', '□', '□', '△', '□', '□', '?']} />
        <div className="fws-opts">
          {ctx.shuffledOpts.map(([v, d], i) => (
            <FWSOption key={v} value={v} displayText={d} letterIdx={i} onClick={() => lp.handleMcq('lt_q2', v)} className={lp.getMcqClass('lt_q2', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'lt_q3',
    meta: { type: 'tf', qid: 'lt_q3_tf', correct: true, correctLabel: 'True', explanation: 'YES! A standard tangram puzzle has exactly 7 pieces: 5 triangles (2 large, 1 medium, 2 small), 1 square, and 1 parallelogram.' },
    render: (lp) => (
      <div className="fws-qcard fws-s9">
        <AchievementBadge icon="🎯" label="TRUE OR FALSE?" color="#7c3aed" />
        <p className="fws-qtext">🧩 A tangram puzzle has exactly 7 pieces. True or False?</p>
        <TangramDisplay />
        <FWSTFButtons qid="lt_q3_tf" lp={lp} />
      </div>
    ),
  },
  {
    id: 'lt_q4',
    options: [['Small triangle','Small triangle 🔺'],['Large triangle','Large triangle 🔺'],['Square','Square 🟥'],['Parallelogram','Parallelogram ▱']],
    meta: { type: 'mcq', qid: 'lt_q4', correct: 'Large triangle', correctLabel: 'Large triangle', explanation: 'The LARGEST piece in a tangram is the big triangle! There are 2 of them. They take up the most space in the puzzle.' },
    render: (lp, ctx) => (
      <div className="fws-qcard fws-s9">
        <AchievementBadge icon="🏆" label="TANGRAM MASTER" color="#6366f1" />
        <p className="fws-qtext">🧩 Which piece is the LARGEST in a tangram puzzle?</p>
        <TangramDisplay />
        <div className="fws-opts">
          {ctx.shuffledOpts.map(([v, d], i) => (
            <FWSOption key={v} value={v} displayText={d} letterIdx={i} onClick={() => lp.handleMcq('lt_q4', v)} className={lp.getMcqClass('lt_q4', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'lt_q5',
    options: [['◇','💠 Diamond'],['○','⭕ Circle'],['△','🔺 Triangle'],['□','🟦 Square']],
    meta: { type: 'mcq', qid: 'lt_q5', correct: '○', correctLabel: '○ Circle', explanation: 'The pattern is ◇○ repeating: ◇○◇○◇ — so the next is ○! The pattern unit is ◇○.' },
    render: (lp, ctx) => (
      <div className="fws-qcard fws-s9">
        <AchievementBadge icon="🌟" label="PATTERN WIZARD" color="#6366f1" />
        <p className="fws-qtext">💫 What comes next in this pattern?</p>
        <PatternSequence items={['◇', '○', '◇', '○', '◇', '?']} />
        <div className="fws-opts">
          {ctx.shuffledOpts.map(([v, d], i) => (
            <FWSOption key={v} value={v} displayText={d} letterIdx={i} onClick={() => lp.handleMcq('lt_q5', v)} className={lp.getMcqClass('lt_q5', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'lt_q6',
    meta: { type: 'tf', qid: 'lt_q6_tf', correct: true, correctLabel: 'True', explanation: 'YES! Tangram pieces can be arranged to make a house shape — use triangles for the roof and squares/rectangles for the walls!' },
    render: (lp) => (
      <div className="fws-qcard fws-s9">
        <AchievementBadge icon="🏠" label="TRUE OR FALSE?" color="#7c3aed" />
        <p className="fws-qtext">🏠 You can make a house shape using tangram pieces. True or False?</p>
        <TangramDisplay />
        <FWSTFButtons qid="lt_q6_tf" lp={lp} />
      </div>
    ),
  },
  {
    id: 'lt_q7',
    options: [['Straight lines','Straight lines ——'],['Curved lines','Curved lines ∿'],['Both straight and curved','Both types'],['Neither','No lines']],
    meta: { type: 'mcq', qid: 'lt_q7', correct: 'Curved lines', correctLabel: 'Curved lines', explanation: 'A circle uses only CURVED lines — it is one continuous curve with no straight parts. Squares and triangles use straight lines.' },
    render: (lp, ctx) => (
      <div className="fws-qcard fws-s9">
        <AchievementBadge icon="〰️" label="LINES DETECTIVE" color="#6366f1" />
        <p className="fws-qtext">〰️ Does a circle use straight or curved lines?</p>
        <div className="fws-opts">
          {ctx.shuffledOpts.map(([v, d], i) => (
            <FWSOption key={v} value={v} displayText={d} letterIdx={i} onClick={() => lp.handleMcq('lt_q7', v)} className={lp.getMcqClass('lt_q7', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'lt_q8',
    options: [['3','3 triangles'],['4','4 triangles'],['5','5 triangles'],['7','7 triangles']],
    meta: { type: 'mcq', qid: 'lt_q8', correct: '5', correctLabel: '5', explanation: 'A standard tangram has 5 triangles: 2 large triangles, 1 medium triangle, and 2 small triangles. That\'s out of 7 total pieces!' },
    render: (lp, ctx) => (
      <div className="fws-qcard fws-s9">
        <AchievementBadge icon="🔺" label="TANGRAM COUNT" color="#6366f1" />
        <p className="fws-qtext">🔺 How many TRIANGLE pieces are in a tangram?</p>
        <TangramDisplay />
        <div className="fws-opts">
          {ctx.shuffledOpts.map(([v, d], i) => (
            <FWSOption key={v} value={v} displayText={d} letterIdx={i} onClick={() => lp.handleMcq('lt_q8', v)} className={lp.getMcqClass('lt_q8', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'lt_q9',
    meta: { type: 'tf', qid: 'lt_q9_tf', correct: false, correctLabel: 'False', explanation: 'A straight line CANNOT make a circle! A circle is made entirely of curved lines. You need many tiny curves joined together to make a circle.' },
    render: (lp) => (
      <div className="fws-qcard fws-s9">
        <AchievementBadge icon="🎯" label="TRUE OR FALSE?" color="#7c3aed" />
        <p className="fws-qtext">〰️ A straight line can make a circle. True or False?</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 20, margin: '12px 0' }}>
          <motion.div style={{ textAlign: 'center' }} initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
            <svg width={60} height={60} viewBox="0 0 60 60"><line x1="10" y1="30" x2="50" y2="30" stroke="#ef4444" strokeWidth="3" strokeLinecap="round" /></svg>
            <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#64748b' }}>Straight line</div>
          </motion.div>
          <motion.div style={{ textAlign: 'center' }} initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.1 }}>
            <svg width={60} height={60} viewBox="0 0 60 60"><circle cx="30" cy="30" r="22" fill="none" stroke="#3a86ff" strokeWidth="3" /></svg>
            <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#64748b' }}>Circle (curved)</div>
          </motion.div>
        </div>
        <FWSTFButtons qid="lt_q9_tf" lp={lp} />
      </div>
    ),
  },
  {
    id: 'lt_q10',
    matchAnswers: { lt_match10: { 'lt_m_total': '7 pieces', 'lt_m_tris': '5 triangles', 'lt_m_circle': 'Curved lines', 'lt_m_pattern': 'Repeating unit' } },
    rightItems: [['7 pieces','7 total pieces'],['5 triangles','5 triangle pieces'],['Curved lines','Uses curved lines'],['Repeating unit','Rule of a pattern']],
    meta: { type: 'match', totalPairs: 4, explanation: 'Tangram total=7, Triangle pieces=5, Circle uses=Curved lines, Pattern rule=Repeating unit!', correctLabel: 'All matched!' },
    render: (lp, ctx) => (
      <div className="fws-qcard fws-s9">
        <AchievementBadge icon="🔗" label="LINES & TANGRAM MATCH!" color="#6366f1" />
        <p className="fws-qtext">🎯 Match each question to the correct answer!</p>
        <FWSMatchLayout
          matchId="lt_match10"
          leftItems={[['lt_m_total','Total tangram pieces?'],['lt_m_tris','Triangle pieces in tangram?'],['lt_m_circle','A circle uses what lines?'],['lt_m_pattern','What makes a pattern?']]}
          shuffledRight={ctx.shuffledRight}
          lp={lp}
        />
      </div>
    ),
  },
];

const LinesTangram = () => {
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
  return <FWSPracticeTemplate skillId="FWS-09" skillName="Lines, Curves and Tangram" questions={questions} questionMeta={questionMeta} logicProps={logicProps} />;
};

export default LinesTangram;
