import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { useDCLogic } from './useDCLogic';
import DCPracticeTemplate from './DCPracticeTemplate';
import { DCOption, DCTFButtons, StoryBox, AchievementBadge, shuffle } from './DCSharedComponents';
import './double-century.css';

// Mini board cell
const BoardCell = ({ num, isSnakeHead = false, isSnakeTail = false, isLadderBottom = false, isLadderTop = false, isHighlight = false }) => {
  let bg = '#f8fafc', border = '#e2e8f0', color = '#374151';
  if (isSnakeHead) { bg = '#fee2e2'; border = '#ef4444'; color = '#dc2626'; }
  else if (isSnakeTail) { bg = '#fef3c7'; border = '#f59e0b'; color = '#92400e'; }
  else if (isLadderBottom) { bg = '#f0fdf4'; border = '#22c55e'; color = '#15803d'; }
  else if (isLadderTop) { bg = '#dbeafe'; border = '#3a86ff'; color = '#1d4ed8'; }
  else if (isHighlight) { bg = '#fce7f3'; border = '#f472b6'; color = '#9d174d'; }
  return (
    <motion.div initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: num % 10 * 0.04, type: 'spring' }}
      style={{ width: 36, height: 36, background: bg, border: `2px solid ${border}`, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Baloo 2',cursive", fontWeight: 800, fontSize: '.8rem', color }}>
      {num}
    </motion.div>
  );
};

const BoardRow = ({ nums, snakeHeads = [], snakeTails = [], ladderBottoms = [], ladderTops = [], highlight = null }) => (
  <div style={{ display: 'flex', gap: 4, justifyContent: 'center', flexWrap: 'wrap' }}>
    {nums.map(n => (
      <BoardCell key={n} num={n}
        isSnakeHead={snakeHeads.includes(n)} isSnakeTail={snakeTails.includes(n)}
        isLadderBottom={ladderBottoms.includes(n)} isLadderTop={ladderTops.includes(n)}
        isHighlight={n === highlight}
      />
    ))}
  </div>
);

const QUESTION_POOL = [
  {
    id: 'nb_q1',
    meta: { type: 'mcq', qid: 'nb_q1', correct: '32', explanation: 'The ladder at 13 on the board takes you all the way up to 32!', correctLabel: '32' },
    render: (lp) => (
      <div className="dc-qcard dc-s2">
        <AchievementBadge icon="🪜" label="SNAKES & LADDERS" color="#15803d" />
        <StoryBox emoji="🎲" text="Raja landed on 13 and found a ladder! Ladders take you UP. Where does he go?" color="#f0fdf4" border="#16a34a" />
        <p className="dc-qtext">🪜 Landed on <strong>13</strong> with a ladder — where do you go?</p>
        <div style={{ margin: '14px 0' }}>
          <BoardRow nums={[11,12,13,14,15]} ladderBottoms={[13]} highlight={13} />
          <div style={{ textAlign: 'center', fontSize: '1.8rem', margin: '6px 0' }}>🪜⬆️</div>
          <BoardRow nums={[31,32,33,34,35]} ladderTops={[32]} highlight={32} />
        </div>
        <div className="dc-opts">
          {[['28','A'],['30','B'],['32','C'],['35','D']].map(([v,l],i) => (
            <DCOption key={v} value={v} label={l} index={i} onClick={() => lp.handleMcq('nb_q1', v)} className={lp.getMcqClass('nb_q1', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'nb_q2',
    meta: { type: 'mcq', qid: 'nb_q2', correct: '8', explanation: 'The snake mouth is at 25 — it slides you down to 8! Snakes take you backward.', correctLabel: '8' },
    render: (lp) => (
      <div className="dc-qcard dc-s2">
        <AchievementBadge icon="🐍" label="SNAKE SLIDE!" color="#dc2626" />
        <StoryBox emoji="🎲" text="Oh no! Rani landed on 25 — there's a snake there! Snakes take you DOWN. Where does she slide?" color="#fef2f2" border="#dc2626" />
        <p className="dc-qtext">🐍 Landed on snake at <strong>25</strong> — where do you slide?</p>
        <div style={{ margin: '14px 0' }}>
          <BoardRow nums={[23,24,25,26,27]} snakeHeads={[25]} highlight={25} />
          <div style={{ textAlign: 'center', fontSize: '1.8rem', margin: '6px 0' }}>🐍⬇️</div>
          <BoardRow nums={[6,7,8,9,10]} snakeTails={[8]} highlight={8} />
        </div>
        <div className="dc-opts">
          {[['5','A'],['8','B'],['10','C'],['12','D']].map(([v,l],i) => (
            <DCOption key={v} value={v} label={l} index={i} onClick={() => lp.handleMcq('nb_q2', v)} className={lp.getMcqClass('nb_q2', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'nb_q3',
    meta: { type: 'mcq', qid: 'nb_q3', correct: '23', explanation: 'Numbers go in order: 21, 22, 23, 24, 25. The missing number is 23!', correctLabel: '23' },
    render: (lp) => (
      <div className="dc-qcard dc-s2">
        <AchievementBadge icon="📋" label="FILL THE BOARD" color="#7c3aed" />
        <StoryBox emoji="🎲" text="A tile fell off the board! Can you figure out which number is missing from the row?" color="#fdf4ff" border="#9333ea" />
        <p className="dc-qtext">📋 Which number is missing from this row?</p>
        <div style={{ display: 'flex', gap: 6, justifyContent: 'center', margin: '14px 0', flexWrap: 'wrap' }}>
          {[21, 22, '?', 24, 25].map((n, i) => (
            <motion.div key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i * 0.08, type: 'spring' }}
              style={{ width: 44, height: 44, background: n === '?' ? '#fef3c7' : '#eff6ff', border: `2.5px ${n === '?' ? 'dashed' : 'solid'} ${n === '?' ? '#f59e0b' : '#3a86ff'}`, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Baloo 2',cursive", fontWeight: 900, fontSize: '1rem', color: n === '?' ? '#92400e' : '#1e40af' }}>{n}</motion.div>
          ))}
        </div>
        <div className="dc-opts">
          {[['20','A'],['23','B'],['26','C'],['27','D']].map(([v,l],i) => (
            <DCOption key={v} value={v} label={l} index={i} onClick={() => lp.handleMcq('nb_q3', v)} className={lp.getMcqClass('nb_q3', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'nb_q4',
    meta: { type: 'tf', qid: 'nb_q4_tf', correct: true, explanation: 'Yes! Numbers on the board go in order: 1, 2, 3, 4… each number is one more than the last.', correctLabel: 'True' },
    render: (lp) => (
      <div className="dc-qcard dc-s2">
        <AchievementBadge icon="🎯" label="TRUE OR FALSE?" color="#7c3aed" />
        <StoryBox emoji="🎲" text="Raja says: On the number board, each number is 1 MORE than the one before it. Is he right?" color="#f0fdf4" border="#16a34a" />
        <p className="dc-qtext">Each number on the board is <strong>1 more</strong> than the one before it.</p>
        <div style={{ display: 'flex', gap: 6, justifyContent: 'center', margin: '14px 0', flexWrap: 'wrap' }}>
          {[36,37,38,39,40].map((n, i) => (
            <motion.div key={n} initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
              style={{ width: 40, height: 40, background: '#eff6ff', border: '2px solid #3a86ff', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Baloo 2',cursive", fontWeight: 800, fontSize: '.9rem', color: '#1e40af' }}>{n}</motion.div>
          ))}
        </div>
        <DCTFButtons qid="nb_q4_tf" lp={lp} />
      </div>
    ),
  },
  {
    id: 'nb_q5',
    meta: { type: 'mcq', qid: 'nb_q5', correct: '40', explanation: '39 + 1 = 40. On the board, 40 comes right after 39!', correctLabel: '40' },
    render: (lp) => (
      <div className="dc-qcard dc-s2">
        <AchievementBadge icon="🎲" label="ROLL & MOVE" color="#0284c7" />
        <StoryBox emoji="🎲" text="Rani is on 39. She rolls the dice and gets a 1. One step forward — where does she land?" color="#eff6ff" border="#0284c7" />
        <p className="dc-qtext">🎲 You are on <strong>39</strong>. Roll a 1. Where do you go?</p>
        <div style={{ display: 'flex', gap: 8, justifyContent: 'center', alignItems: 'center', margin: '14px 0' }}>
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring' }}
            style={{ width: 56, height: 56, background: '#fef3c7', border: '2.5px solid #f59e0b', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Baloo 2',cursive", fontWeight: 900, fontSize: '1.4rem', color: '#92400e' }}>39</motion.div>
          <motion.span animate={{ x: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1 }} style={{ fontSize: '1.8rem' }}>→</motion.span>
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.1, type: 'spring' }}
            style={{ width: 56, height: 56, background: '#dcfce7', border: '2.5px dashed #16a34a', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Baloo 2',cursive", fontWeight: 900, fontSize: '1.4rem', color: '#15803d' }}>?</motion.div>
        </div>
        <div className="dc-opts">
          {[['38','A'],['40','B'],['41','C'],['45','D']].map(([v,l],i) => (
            <DCOption key={v} value={v} label={l} index={i} onClick={() => lp.handleMcq('nb_q5', v)} className={lp.getMcqClass('nb_q5', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'nb_q6',
    meta: { type: 'tf', qid: 'nb_q6_tf', correct: true, explanation: 'Yes! Snakes always take you DOWN on the board. Landing on a snake head means you slide to its tail.', correctLabel: 'True' },
    render: (lp) => (
      <div className="dc-qcard dc-s2">
        <AchievementBadge icon="🎯" label="SNAKE RULE!" color="#dc2626" />
        <StoryBox emoji="🐍" text="There's an argument! Raja says snakes take you DOWN, but Rani says UP. Who is right?" color="#fef2f2" border="#dc2626" />
        <p className="dc-qtext">🐍 Landing on a snake takes you <strong>down</strong> on the board. True or False?</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 24, margin: '14px 0', flexWrap: 'wrap' }}>
          {[['🐍','Snake = DOWN ⬇️','#fee2e2','#dc2626'],['🪜','Ladder = UP ⬆️','#f0fdf4','#16a34a']].map(([emoji, text, bg, color]) => (
            <motion.div key={emoji} initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} style={{ textAlign: 'center', background: bg, border: `2px solid ${color}`, borderRadius: 12, padding: '10px 16px' }}>
              <div style={{ fontSize: '2rem' }}>{emoji}</div>
              <div style={{ fontSize: '.85rem', fontWeight: 700, color, marginTop: 4 }}>{text}</div>
            </motion.div>
          ))}
        </div>
        <DCTFButtons qid="nb_q6_tf" lp={lp} />
      </div>
    ),
  },
  {
    id: 'nb_q7',
    meta: { type: 'mcq', qid: 'nb_q7', correct: '63', explanation: '61, 62, 63, 64, 65 — numbers follow in order. The first missing number is 63!', correctLabel: '63' },
    render: (lp) => (
      <div className="dc-qcard dc-s2">
        <AchievementBadge icon="📋" label="FILL THE BOARD" color="#7c3aed" />
        <StoryBox emoji="🎲" text="Two tiles are missing from this row! What is the FIRST missing number?" color="#fdf4ff" border="#9333ea" />
        <p className="dc-qtext">📋 What is the first missing number?</p>
        <div style={{ display: 'flex', gap: 6, justifyContent: 'center', margin: '14px 0', flexWrap: 'wrap' }}>
          {[61, 62, '?', '?', 65].map((n, i) => (
            <motion.div key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i * 0.08, type: 'spring' }}
              style={{ width: 44, height: 44, background: n === '?' ? '#fef3c7' : '#eff6ff', border: `2.5px ${n === '?' ? 'dashed' : 'solid'} ${n === '?' ? '#f59e0b' : '#3a86ff'}`, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Baloo 2',cursive", fontWeight: 900, fontSize: '1rem', color: n === '?' ? '#92400e' : '#1e40af' }}>{n}</motion.div>
          ))}
        </div>
        <div className="dc-opts">
          {[['60','A'],['62','B'],['63','C'],['64','D']].map(([v,l],i) => (
            <DCOption key={v} value={v} label={l} index={i} onClick={() => lp.handleMcq('nb_q7', v)} className={lp.getMcqClass('nb_q7', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'nb_q8',
    meta: { type: 'mcq', qid: 'nb_q8', correct: '100', explanation: 'The board goes from 1 to 100. The END square is 100 — that is where you WIN!', correctLabel: '100' },
    render: (lp) => (
      <div className="dc-qcard dc-s2">
        <AchievementBadge icon="🏆" label="WIN THE GAME!" color="#d97706" />
        <StoryBox emoji="🎲" text="Raja and Rani are racing to WIN the game! The last square on the board is the winning square. What number is it?" color="#fffbeb" border="#d97706" />
        <p className="dc-qtext">🏆 What number is at the <strong>WIN</strong> square of the board?</p>
        <motion.div initial={{ scale: 0.8 }} animate={{ scale: [1, 1.05, 1] }} transition={{ repeat: Infinity, duration: 2 }}
          style={{ background: 'linear-gradient(135deg, #ffd600, #f59e0b)', borderRadius: 16, padding: '16px 24px', textAlign: 'center', margin: '14px auto', maxWidth: 180, border: '3px solid #d97706' }}>
          <div style={{ fontSize: '1.5rem', marginBottom: 4 }}>🏆 WIN!</div>
          <div style={{ fontFamily: "'Baloo 2',cursive", fontWeight: 900, fontSize: '2rem', color: '#92400e' }}>???</div>
        </motion.div>
        <div className="dc-opts">
          {[['50','A'],['99','B'],['100','C'],['200','D']].map(([v,l],i) => (
            <DCOption key={v} value={v} label={l} index={i} onClick={() => lp.handleMcq('nb_q8', v)} className={lp.getMcqClass('nb_q8', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'nb_q9',
    meta: { type: 'tf', qid: 'nb_q9_tf', correct: true, explanation: 'Yes! Ladders always take you UP (forward) on the board. They are your friends!', correctLabel: 'True' },
    render: (lp) => (
      <div className="dc-qcard dc-s2">
        <AchievementBadge icon="🎯" label="LADDER RULE!" color="#15803d" />
        <StoryBox emoji="🪜" text="Rani found a ladder! She says it takes her to a BIGGER number. Raja says it goes to a smaller number. Who is right?" color="#f0fdf4" border="#16a34a" />
        <p className="dc-qtext">🪜 Climbing a ladder takes you to a <strong>bigger number</strong>. True or False?</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 20, margin: '14px 0', alignItems: 'center', flexWrap: 'wrap' }}>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ textAlign: 'center', background: '#f0fdf4', border: '2px solid #22c55e', borderRadius: 12, padding: '10px 16px' }}>
            <div style={{ fontFamily: "'Baloo 2',cursive", fontWeight: 900, fontSize: '1.5rem', color: '#15803d' }}>13</div>
            <div style={{ fontSize: '.75rem', color: '#16a34a', fontWeight: 700 }}>🟢 Bottom</div>
          </motion.div>
          <span style={{ fontSize: '1.5rem' }}>🪜→</span>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }} style={{ textAlign: 'center', background: '#dbeafe', border: '2px solid #3a86ff', borderRadius: 12, padding: '10px 16px' }}>
            <div style={{ fontFamily: "'Baloo 2',cursive", fontWeight: 900, fontSize: '1.5rem', color: '#1d4ed8' }}>32</div>
            <div style={{ fontSize: '.75rem', color: '#3a86ff', fontWeight: 700 }}>🔵 Top</div>
          </motion.div>
        </div>
        <DCTFButtons qid="nb_q9_tf" lp={lp} />
      </div>
    ),
  },
  {
    id: 'nb_q10',
    meta: { type: 'mcq', qid: 'nb_q10', correct: '3 tens and 6 ones', explanation: '36 = 3 bundles of 10 (= 30) + 6 loose sticks. So it is 3 tens and 6 ones!', correctLabel: '3 tens and 6 ones' },
    render: (lp) => (
      <div className="dc-qcard dc-s2">
        <AchievementBadge icon="🪵" label="BUNDLES QUIZ" color="#f97316" />
        <StoryBox emoji="🎲" text="Raja landed on 36! He wants to show this using bundles and loose sticks. Which description is correct?" color="#fef3c7" border="#f59e0b" />
        <p className="dc-qtext">Show <strong>36</strong> using bundles. Which is right?</p>
        <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} transition={{ type: 'spring' }}
          style={{ background: '#eff6ff', border: '2px solid #3a86ff', borderRadius: 12, padding: 12, textAlign: 'center', margin: '12px 0' }}>
          <span style={{ fontFamily: "'Baloo 2',cursive", fontWeight: 900, fontSize: '2.5rem', color: '#1e40af' }}>36</span>
        </motion.div>
        <div className="dc-opts" style={{ flexDirection: 'column' }}>
          {[['6 tens and 3 ones','A'],['3 tens and 6 ones','B'],['36 tens','C'],['3 hundreds and 6 ones','D']].map(([v,l],i) => (
            <DCOption key={v} value={v} label={l} index={i} onClick={() => lp.handleMcq('nb_q10', v)} className={lp.getMcqClass('nb_q10', v)} />
          ))}
        </div>
      </div>
    ),
  },
];

const NumberBoard = () => {
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
  return <DCPracticeTemplate skillId="DC-02" skillName="Number Board" questions={questions} questionMeta={questionMeta} logicProps={logicProps} />;
};

export default NumberBoard;
