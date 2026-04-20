import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { useFLLogic } from './useFLLogic';
import FLPracticeTemplate from './FLPracticeTemplate';
import { BalanceScaleSVG, WeightBlocks, FLOption, FLTFButtons, AchievementBadge, shuffle } from './FLSharedComponents';
import './filling-and-lifting.css';

const QUESTION_POOL = [
  {
    id: 'uk_q1',
    meta: { type: 'mcq', qid: 'uk_q1', correct: 'Kilogram (kg)', explanation: 'Kilogram (kg) is the standard unit used to measure weight. We use it every day at shops and markets!', correctLabel: 'Kilogram (kg)' },
    render: (lp) => (
      <div className="fl-qcard fl-s7">
        <AchievementBadge icon="⚖️" label="WEIGHT UNIT!" color="#16a34a" />
        <p className="fl-qtext">What is the standard unit for measuring weight? ⚖️</p>
        <WeightBlocks weights={[{ label: '1 kg', type: 'kg' }]} />
        <div className="fl-opts">
          {[['Litre','A'],['Kilogram (kg)','B'],['Metre','C'],['Centimetre','D']].map(([v,l],i) => (
            <FLOption key={v} value={v} label={l} index={i} onClick={() => lp.handleMcq('uk_q1', v)} className={lp.getMcqClass('uk_q1', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'uk_q2',
    meta: { type: 'mcq', qid: 'uk_q2', correct: '1 kg bag of flour', explanation: 'A 1 kg packet of salt weighs the same as a 1 kg bag of flour — both are exactly 1 kilogram!', correctLabel: '1 kg bag of flour' },
    render: (lp) => (
      <div className="fl-qcard fl-s7">
        <AchievementBadge icon="🧂" label="1 KG REFERENCE!" color="#16a34a" />
        <p className="fl-qtext">A 1 kg packet of salt weighs about the same as ___? 🧂</p>
        <WeightBlocks weights={[{ label: '1 kg salt', type: 'kg' }, { label: '= ?', type: 'kg' }]} />
        <div className="fl-opts">
          {[['A pencil','A'],['A 1 kg bag of flour','B'],['A feather','C'],['A bucket of water','D']].map(([v,l],i) => (
            <FLOption key={v} value={v} label={l} index={i} onClick={() => lp.handleMcq('uk_q2', v)} className={lp.getMcqClass('uk_q2', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'uk_q3',
    meta: { type: 'tf', qid: 'uk_q3_tf', correct: true, explanation: 'Yes! Kilogram (kg) is the standard unit of weight — agreed upon worldwide so everyone measures the same way!', correctLabel: 'True' },
    render: (lp) => (
      <div className="fl-qcard fl-s7">
        <AchievementBadge icon="🎯" label="TRUE OR FALSE?" color="#7c3aed" />
        <p className="fl-qtext">Kilogram (kg) is the standard unit for weight. True or False?</p>
        <FLTFButtons qid="uk_q3_tf" lp={lp} />
      </div>
    ),
  },
  {
    id: 'uk_q4',
    meta: { type: 'mcq', qid: 'uk_q4', correct: 'A big watermelon', explanation: 'A big watermelon weighs 5–8 kg — much more than 1 kg! The other items are all lighter than 1 kg.', correctLabel: 'A big watermelon' },
    render: (lp) => (
      <div className="fl-qcard fl-s7">
        <AchievementBadge icon="🍉" label="HEAVIER THAN 1 KG?" color="#16a34a" />
        <p className="fl-qtext">Which is HEAVIER than 1 kg? 🍉</p>
        <div className="fl-opts">
          {[['An eraser','A'],['A pencil','B'],['A big watermelon','C'],['A coin','D']].map(([v,l],i) => (
            <FLOption key={v} value={v} label={l} index={i} onClick={() => lp.handleMcq('uk_q4', v)} className={lp.getMcqClass('uk_q4', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'uk_q5',
    meta: { type: 'mcq', qid: 'uk_q5', correct: 'An eraser', explanation: 'An eraser is very light — only a few grams. That is much LESS than 1 kilogram!', correctLabel: 'An eraser' },
    render: (lp) => (
      <div className="fl-qcard fl-s7">
        <AchievementBadge icon="🔍" label="LIGHTER THAN 1 KG?" color="#16a34a" />
        <p className="fl-qtext">Which is LIGHTER than 1 kg? 🔍</p>
        <div className="fl-opts">
          {[['A big dictionary','A'],['An eraser','B'],['A bucket of water','C'],['A big pumpkin','D']].map(([v,l],i) => (
            <FLOption key={v} value={v} label={l} index={i} onClick={() => lp.handleMcq('uk_q5', v)} className={lp.getMcqClass('uk_q5', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'uk_q6',
    meta: { type: 'tf', qid: 'uk_q6_tf', correct: false, explanation: 'False! A full school bag with books typically weighs 3–5 kg — that is MORE than 1 kg, not less!', correctLabel: 'False' },
    render: (lp) => (
      <div className="fl-qcard fl-s7">
        <AchievementBadge icon="🎯" label="TRUE OR FALSE?" color="#7c3aed" />
        <p className="fl-qtext">A full school bag weighs LESS than 1 kg. True or False?</p>
        <FLTFButtons qid="uk_q6_tf" lp={lp} />
      </div>
    ),
  },
  {
    id: 'uk_q7',
    meta: { type: 'mcq', qid: 'uk_q7', correct: '1 kg', explanation: 'Meera starts with 2 kg. She uses 1 kg. 2 - 1 = 1 kg of rice remains!', correctLabel: '1 kg' },
    render: (lp) => (
      <div className="fl-qcard fl-s7">
        <AchievementBadge icon="🌾" label="RICE PROBLEM!" color="#16a34a" />
        <p className="fl-qtext">2 kg rice − 1 kg used = ___ kg left? 🌾</p>
        <WeightBlocks weights={[{ label: '2 kg', type: 'kg' }, { label: '− 1 kg', type: 'half' }, { label: '= ?', type: 'quarter' }]} />
        <div className="fl-opts">
          {[['3 kg','A'],['2 kg','B'],['1 kg','C'],['½ kg','D']].map(([v,l],i) => (
            <FLOption key={v} value={v} label={l} index={i} onClick={() => lp.handleMcq('uk_q7', v)} className={lp.getMcqClass('uk_q7', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'uk_q8',
    meta: { type: 'mcq', qid: 'uk_q8', correct: '3', explanation: 'A bag of onions = 3 kg. Each 1 kg packet = 1 kg. So you need 3 packets!', correctLabel: '3' },
    render: (lp) => (
      <div className="fl-qcard fl-s7">
        <AchievementBadge icon="🧅" label="ONION BAG!" color="#16a34a" />
        <p className="fl-qtext">A 3 kg bag of onions = ___ packets of 1 kg each? 🧅</p>
        <WeightBlocks weights={[{ label: '1 kg', type: 'kg' }, { label: '1 kg', type: 'kg' }, { label: '1 kg', type: 'kg' }]} />
        <div className="fl-opts">
          {[['1','A'],['2','B'],['3','C'],['4','D']].map(([v,l],i) => (
            <FLOption key={v} value={v} label={l} index={i} onClick={() => lp.handleMcq('uk_q8', v)} className={lp.getMcqClass('uk_q8', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'uk_q9',
    meta: { type: 'tf', qid: 'uk_q9_tf', correct: true, explanation: 'Yes! Groceries like rice, sugar, flour, and vegetables are all commonly sold in kilograms at shops!', correctLabel: 'True' },
    render: (lp) => (
      <div className="fl-qcard fl-s7">
        <AchievementBadge icon="🛒" label="AT THE STORE!" color="#7c3aed" />
        <p className="fl-qtext">Grocery items like rice and flour are often sold in kg. True or False?</p>
        <FLTFButtons qid="uk_q9_tf" lp={lp} />
      </div>
    ),
  },
  {
    id: 'uk_q10',
    matchAnswers: { uk_match10: { 'uk_m_eraser': 'Less than 1 kg', 'uk_m_pumpkin': 'More than 1 kg', 'uk_m_salt': 'Exactly 1 kg', 'uk_m_water': 'Much more than 1 kg' } },
    rightItems: [['Less than 1 kg','Less than 1 kg'],['More than 1 kg','More than 1 kg'],['Exactly 1 kg','Exactly 1 kg'],['Much more than 1 kg','Much more than 1 kg']],
    meta: { type: 'match', totalPairs: 4, explanation: 'Eraser<1kg, 1kg salt=1kg, Big pumpkin>1kg, Bucket of water>>1kg!', correctLabel: 'All pairs matched!' },
    render: (lp, ctx) => (
      <div className="fl-qcard fl-s7">
        <AchievementBadge icon="🔗" label="MATCH KG!" color="#0891b2" />
        <p className="fl-qtext">Match each item to its weight compared to 1 kg! 🎯</p>
        <div className="fl-match-wrap">
          <div className="fl-match-col">
            {[['uk_m_eraser','🩹 Eraser'],['uk_m_pumpkin','🎃 Big pumpkin'],['uk_m_salt','🧂 1 kg salt pack'],['uk_m_water','🪣 Full bucket']].map(([val, label], i) => (
              <motion.div key={val} initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }}
                onClick={() => lp.handleMatch('uk_match10','left',val)} className={`fl-match-item ${lp.getMatchClass('uk_match10','left',val)}`}>{label}</motion.div>
            ))}
          </div>
          <div className="fl-match-center">{[0,1,2,3].map(i => <div key={i} className="fl-match-line">→</div>)}</div>
          <div className="fl-match-col">
            {ctx.shuffledRight.map(([val, label], i) => (
              <motion.div key={val} initial={{ opacity: 0, x: 15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }}
                onClick={() => lp.handleMatch('uk_match10','right',val)} className={`fl-match-item ${lp.getMatchClass('uk_match10','right',val)}`}>{label}</motion.div>
            ))}
          </div>
        </div>
      </div>
    ),
  },
];

const UnderstandingKilogram = () => {
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
  return <FLPracticeTemplate skillId="FL-07" skillName="Understanding Kilogram" questions={questions} questionMeta={questionMeta} logicProps={logicProps} />;
};

export default UnderstandingKilogram;
