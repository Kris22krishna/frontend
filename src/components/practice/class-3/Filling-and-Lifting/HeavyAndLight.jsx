import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { useFLLogic } from './useFLLogic';
import FLPracticeTemplate from './FLPracticeTemplate';
import { BalanceScaleSVG, FLOption, FLTFButtons, AchievementBadge, shuffle } from './FLSharedComponents';
import './filling-and-lifting.css';

const QUESTION_POOL = [
  {
    id: 'hl_q1',
    meta: { type: 'mcq', qid: 'hl_q1', correct: 'Math textbook', explanation: 'A math textbook is much heavier than an eraser! Books are made of many paper pages, making them heavy.', correctLabel: 'Math textbook' },
    render: (lp) => (
      <div className="fl-qcard fl-s5">
        <AchievementBadge icon="⚖️" label="HEAVY OR LIGHT?" color="#ef4444" />
        <p className="fl-qtext">Which is HEAVIER — a math textbook or an eraser? ⚖️</p>
        <BalanceScaleSVG leftLabel="📚 Book" rightLabel="🩹 Eraser" tilt="left" leftColor="#fca5a5" rightColor="#fde68a" />
        <div className="fl-opts">
          {[['Math textbook','A'],['Eraser','B'],['Both same','C'],['Cannot tell','D']].map(([v,l],i) => (
            <FLOption key={v} value={v} label={l} index={i} onClick={() => lp.handleMcq('hl_q1', v)} className={lp.getMcqClass('hl_q1', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'hl_q2',
    meta: { type: 'mcq', qid: 'hl_q2', correct: 'Left side (stone)', explanation: 'A stone is much heavier than a feather! The heavier side goes DOWN on the balance.', correctLabel: 'Left side (stone)' },
    render: (lp) => (
      <div className="fl-qcard fl-s5">
        <AchievementBadge icon="⬇️" label="WHICH GOES DOWN?" color="#ef4444" />
        <p className="fl-qtext">Stone on LEFT, feather on RIGHT. Which side goes DOWN? ⬇️</p>
        <BalanceScaleSVG leftLabel="🪨 Stone" rightLabel="🪶 Feather" tilt="left" leftColor="#fca5a5" rightColor="#fde68a" />
        <div className="fl-opts">
          {[['Left side (stone)','A'],['Right side (feather)','B'],['Both sides equal','C'],['It stays level','D']].map(([v,l],i) => (
            <FLOption key={v} value={v} label={l} index={i} onClick={() => lp.handleMcq('hl_q2', v)} className={lp.getMcqClass('hl_q2', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'hl_q3',
    meta: { type: 'tf', qid: 'hl_q3_tf', correct: true, explanation: 'Yes! A watermelon is a big, heavy fruit — much heavier than a small apple!', correctLabel: 'True' },
    render: (lp) => (
      <div className="fl-qcard fl-s5">
        <AchievementBadge icon="🎯" label="TRUE OR FALSE?" color="#7c3aed" />
        <p className="fl-qtext">A watermelon is HEAVIER than an apple. True or False?</p>
        <BalanceScaleSVG leftLabel="🍉 Watermelon" rightLabel="🍎 Apple" tilt="left" leftColor="#fca5a5" rightColor="#fde68a" />
        <FLTFButtons qid="hl_q3_tf" lp={lp} />
      </div>
    ),
  },
  {
    id: 'hl_q4',
    meta: { type: 'mcq', qid: 'hl_q4', correct: 'Right hand (stone)', explanation: 'A stone is heavier than a feather, so the right hand with the stone will go DOWN (feel heavier)!', correctLabel: 'Right hand (stone)' },
    render: (lp) => (
      <div className="fl-qcard fl-s5">
        <AchievementBadge icon="🤲" label="FEEL THE WEIGHT!" color="#ef4444" />
        <p className="fl-qtext">Left hand: 🪶 Feather. Right hand: 🪨 Stone. Which hand goes DOWN? 🤲</p>
        <div className="fl-opts">
          {[['Left hand (feather)','A'],['Right hand (stone)','B'],['Both hands equal','C'],['Neither hand','D']].map(([v,l],i) => (
            <FLOption key={v} value={v} label={l} index={i} onClick={() => lp.handleMcq('hl_q4', v)} className={lp.getMcqClass('hl_q4', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'hl_q5',
    meta: { type: 'mcq', qid: 'hl_q5', correct: '🎈 Balloon', explanation: 'Of these objects, a balloon is the lightest — it is filled with air!', correctLabel: '🎈 Balloon' },
    render: (lp) => (
      <div className="fl-qcard fl-s5">
        <AchievementBadge icon="🏆" label="LIGHTEST OBJECT!" color="#ef4444" />
        <p className="fl-qtext">Which of these is the LIGHTEST? 🏆</p>
        <div className="fl-opts">
          {[['🪨 Stone','A'],['📚 Textbook','B'],['🏀 Basketball','C'],['🎈 Balloon','D']].map(([v,l],i) => (
            <FLOption key={v} value={v} label={l} index={i} onClick={() => lp.handleMcq('hl_q5', v)} className={lp.getMcqClass('hl_q5', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'hl_q6',
    meta: { type: 'tf', qid: 'hl_q6_tf', correct: true, explanation: 'Yes! A basketball is a solid rubber ball filled with air under pressure — much heavier than a light balloon!', correctLabel: 'True' },
    render: (lp) => (
      <div className="fl-qcard fl-s5">
        <AchievementBadge icon="🎯" label="TRUE OR FALSE?" color="#7c3aed" />
        <p className="fl-qtext">A basketball is HEAVIER than a balloon. True or False?</p>
        <BalanceScaleSVG leftLabel="🏀 Basketball" rightLabel="🎈 Balloon" tilt="left" leftColor="#fca5a5" rightColor="#fde68a" />
        <FLTFButtons qid="hl_q6_tf" lp={lp} />
      </div>
    ),
  },
  {
    id: 'hl_q7',
    meta: { type: 'mcq', qid: 'hl_q7', correct: 'School bag', explanation: 'A school bag is packed with books, notebooks, and supplies — much heavier than a light lunch bag!', correctLabel: 'School bag' },
    render: (lp) => (
      <div className="fl-qcard fl-s5">
        <AchievementBadge icon="🎒" label="BAG COMPARISON!" color="#ef4444" />
        <p className="fl-qtext">Which is HEAVIER — school bag or lunch bag? 🎒</p>
        <BalanceScaleSVG leftLabel="🎒 School" rightLabel="🍱 Lunch" tilt="left" leftColor="#fca5a5" rightColor="#fde68a" />
        <div className="fl-opts">
          {[['School bag','A'],['Lunch bag','B'],['Both same weight','C'],['Lunch bag is always heavier','D']].map(([v,l],i) => (
            <FLOption key={v} value={v} label={l} index={i} onClick={() => lp.handleMcq('hl_q7', v)} className={lp.getMcqClass('hl_q7', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'hl_q8',
    meta: { type: 'mcq', qid: 'hl_q8', correct: "Priya's bag", explanation: "When Priya lifts her bag, her arm goes down more — that means Priya's bag is heavier!", correctLabel: "Priya's bag" },
    render: (lp) => (
      <div className="fl-qcard fl-s5">
        <AchievementBadge icon="🏋️" label="ARM BALANCE TEST!" color="#ef4444" />
        <p className="fl-qtext">Priya's arm goes down more when lifting. Whose bag is heavier? 🏋️</p>
        <div className="fl-opts">
          {[["Priya's bag",'A'],["Riya's bag",'B'],['Both bags same','C'],['Cannot determine','D']].map(([v,l],i) => (
            <FLOption key={v} value={v} label={l} index={i} onClick={() => lp.handleMcq('hl_q8', v)} className={lp.getMcqClass('hl_q8', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'hl_q9',
    meta: { type: 'tf', qid: 'hl_q9_tf', correct: false, explanation: 'False! You can compare weights by lifting objects in your hands — no machine needed! Your hands are natural "balance scales".', correctLabel: 'False' },
    render: (lp) => (
      <div className="fl-qcard fl-s5">
        <AchievementBadge icon="🎯" label="TRUE OR FALSE?" color="#7c3aed" />
        <p className="fl-qtext">You always need a machine to compare which is heavier. True or False?</p>
        <FLTFButtons qid="hl_q9_tf" lp={lp} />
      </div>
    ),
  },
  {
    id: 'hl_q10',
    matchAnswers: { hl_match10: { 'hl_m_stone': 'Heavy', 'hl_m_feather': 'Very light', 'hl_m_book': 'Heavier', 'hl_m_balloon': 'Lightest' } },
    rightItems: [['Heavy','Heavy'],['Very light','Very light'],['Heavier','Heavier'],['Lightest','Lightest']],
    meta: { type: 'match', totalPairs: 4, explanation: 'Stone→Heavy, Book→Heavier, Feather→Very light, Balloon→Lightest! Great sorting!', correctLabel: 'All pairs matched!' },
    render: (lp, ctx) => (
      <div className="fl-qcard fl-s5">
        <AchievementBadge icon="🔗" label="MATCH WEIGHTS!" color="#0891b2" />
        <p className="fl-qtext">Match each object to how heavy it is! 🎯</p>
        <div className="fl-match-wrap">
          <div className="fl-match-col">
            {[['hl_m_stone','🪨 Stone'],['hl_m_feather','🪶 Feather'],['hl_m_book','📚 Textbook'],['hl_m_balloon','🎈 Balloon']].map(([val, label], i) => (
              <motion.div key={val} initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }}
                onClick={() => lp.handleMatch('hl_match10','left',val)} className={`fl-match-item ${lp.getMatchClass('hl_match10','left',val)}`}>{label}</motion.div>
            ))}
          </div>
          <div className="fl-match-center">{[0,1,2,3].map(i => <div key={i} className="fl-match-line">→</div>)}</div>
          <div className="fl-match-col">
            {ctx.shuffledRight.map(([val, label], i) => (
              <motion.div key={val} initial={{ opacity: 0, x: 15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }}
                onClick={() => lp.handleMatch('hl_match10','right',val)} className={`fl-match-item ${lp.getMatchClass('hl_match10','right',val)}`}>{label}</motion.div>
            ))}
          </div>
        </div>
      </div>
    ),
  },
];

const HeavyAndLight = () => {
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
  return <FLPracticeTemplate skillId="FL-05" skillName="Heavy and Light" questions={questions} questionMeta={questionMeta} logicProps={logicProps} />;
};

export default HeavyAndLight;
