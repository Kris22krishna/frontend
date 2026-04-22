import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { useGTLogic } from './useGTLogic';
import GTPracticeTemplate from './GTPracticeTemplate';
import { GTOption, GTTFButtons, StoryBox, AchievementBadge, HTODisplay, EmojiRow, BoxDiagram, shuffle } from './GTSharedComponents';
import './give-and-take.css';

const QUESTION_POOL = [
  {
    id: 'gt01_q1',
    meta: { type: 'mcq', qid: 'gt01_q1', correct: '38', explanation: '15 mangoes + 23 mangoes = 38 mangoes! We just ADD them together!', correctLabel: '38' },
    render: (lp) => (
      <div className="gt-qcard gt-s1">
        <AchievementBadge icon="🥭" label="LET'S ADD!" color="#f97316" />
        <StoryBox emoji="🧒" text="Meena has 15 mangoes in one basket and 23 in another. How many mangoes in total?" color="#fef3c7" border="#f97316" />
        <EmojiRow emoji="🥭" count={15} label="First basket" color="#fef9c3" border="#fde68a" />
        <EmojiRow emoji="🥭" count={23} label="Second basket" color="#fef3c7" border="#fed7aa" />
        <p className="gt-qtext">15 + 23 = ? 🥭</p>
        <div className="gt-opts">
          {[['38','A'],['35','B'],['40','C'],['28','D']].map(([v,l],i) => (
            <GTOption key={v} value={v} label={l} index={i} onClick={() => lp.handleMcq('gt01_q1', v)} className={lp.getMcqClass('gt01_q1', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'gt01_q2',
    meta: { type: 'mcq', qid: 'gt01_q2', correct: '234', explanation: '2 Hundreds + 3 Tens + 4 Ones = 200 + 30 + 4 = 234!', correctLabel: '234' },
    render: (lp) => (
      <div className="gt-qcard gt-s1">
        <AchievementBadge icon="📦" label="HTO NUMBERS" color="#0d9488" />
        <StoryBox emoji="🐻" text="Tutu sees a number table. H=2, T=3, O=4. What number is that?" color="#f0fdf4" border="#0d9488" />
        <HTODisplay number={234} />
        <p className="gt-qtext">What number does the table show? 🔢</p>
        <div className="gt-opts">
          {[['234','A'],['243','B'],['324','C'],['342','D']].map(([v,l],i) => (
            <GTOption key={v} value={v} label={l} index={i} onClick={() => lp.handleMcq('gt01_q2', v)} className={lp.getMcqClass('gt01_q2', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'gt01_q3',
    meta: { type: 'tf', qid: 'gt01_q3_tf', correct: true, explanation: '124 + 30 = 154. We add the tens: 2 tens + 3 tens = 5 tens. So 154!', correctLabel: 'True' },
    render: (lp) => (
      <div className="gt-qcard gt-s1">
        <AchievementBadge icon="🎯" label="TRUE OR FALSE?" color="#8b5cf6" />
        <StoryBox emoji="🌟" text="Raju collected 124 stamps. He found 30 more. He says he now has 154!" color="#f0fdf4" border="#16a34a" />
        <BoxDiagram part1={124} part2={30} whole={154} />
        <p className="gt-qtext">124 + 30 = 154. Is Raju correct?</p>
        <GTTFButtons qid="gt01_q3_tf" lp={lp} />
      </div>
    ),
  },
  {
    id: 'gt01_q4',
    meta: { type: 'mcq', qid: 'gt01_q4', correct: '178', explanation: '136 + 42 = 178! Add ones first: 6+2=8, then tens: 3+4=7, then hundreds: 1+0=1. Answer: 178!', correctLabel: '178' },
    render: (lp) => (
      <div className="gt-qcard gt-s1">
        <AchievementBadge icon="🍎" label="ADD APPLES!" color="#ef4444" />
        <StoryBox emoji="👩‍🌾" text="Priya has 136 apples from her farm. Her friend brings 42 more. Total apples?" color="#fef3c7" border="#f97316" />
        <EmojiRow emoji="🍎" count={15} label="136 apples (showing 15 of them)" color="#fef9c3" border="#fde68a" />
        <p className="gt-qtext">136 + 42 = ? 🍎</p>
        <div className="gt-opts">
          {[['178','A'],['168','B'],['188','C'],['174','D']].map(([v,l],i) => (
            <GTOption key={v} value={v} label={l} index={i} onClick={() => lp.handleMcq('gt01_q4', v)} className={lp.getMcqClass('gt01_q4', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'gt01_q5',
    meta: { type: 'mcq', qid: 'gt01_q5', correct: '125', explanation: '1 hundred = 100, 2 tens = 20, 5 ones = 5. So 100+20+5 = 125!', correctLabel: '125' },
    render: (lp) => (
      <div className="gt-qcard gt-s1">
        <AchievementBadge icon="📦" label="HTO NUMBERS" color="#0d9488" />
        <StoryBox emoji="🐻" text="Tutu has 1 hundred block, 2 ten sticks, and 5 single blocks. What number is that?" color="#f0fdf4" border="#0d9488" />
        <HTODisplay number={125} />
        <p className="gt-qtext">H=1, T=2, O=5 means the number is? 🔢</p>
        <div className="gt-opts">
          {[['125','A'],['152','B'],['215','C'],['251','D']].map(([v,l],i) => (
            <GTOption key={v} value={v} label={l} index={i} onClick={() => lp.handleMcq('gt01_q5', v)} className={lp.getMcqClass('gt01_q5', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'gt01_q6',
    meta: { type: 'tf', qid: 'gt01_q6_tf', correct: true, explanation: '200 + 45 = 245. Hundreds stay 2, add 45 in tens and ones: 4 tens 5 ones = 245!', correctLabel: 'True' },
    render: (lp) => (
      <div className="gt-qcard gt-s1">
        <AchievementBadge icon="🎯" label="TRUE OR FALSE?" color="#8b5cf6" />
        <StoryBox emoji="🌟" text="A library has 200 books. 45 new books arrived. The librarian says there are now 245 books!" color="#f0fdf4" border="#16a34a" />
        <BoxDiagram part1={200} part2={45} whole={245} />
        <p className="gt-qtext">200 + 45 = 245. True or False?</p>
        <GTTFButtons qid="gt01_q6_tf" lp={lp} />
      </div>
    ),
  },
  {
    id: 'gt01_q7',
    meta: { type: 'mcq', qid: 'gt01_q7', correct: '368', explanation: '312 + 56 = 368! Ones: 2+6=8, Tens: 1+5=6, Hundreds: 3+0=3. So 368!', correctLabel: '368' },
    render: (lp) => (
      <div className="gt-qcard gt-s1">
        <AchievementBadge icon="🌻" label="ADD IT UP!" color="#f59e0b" />
        <StoryBox emoji="👧" text="A farmer planted 312 sunflower seeds in the morning and 56 in the evening. Total seeds?" color="#fef3c7" border="#f59e0b" />
        <div style={{ display: 'flex', justifyContent: 'center', gap: 12, margin: '14px 0', flexWrap: 'wrap' }}>
          <HTODisplay number={312} />
          <span style={{ fontFamily: "'Baloo 2',cursive", fontWeight: 900, fontSize: '2rem', alignSelf: 'center' }}>+</span>
          <HTODisplay number={56} />
        </div>
        <p className="gt-qtext">312 + 56 = ? 🌻</p>
        <div className="gt-opts">
          {[['368','A'],['358','B'],['378','C'],['468','D']].map(([v,l],i) => (
            <GTOption key={v} value={v} label={l} index={i} onClick={() => lp.handleMcq('gt01_q7', v)} className={lp.getMcqClass('gt01_q7', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'gt01_q8',
    meta: { type: 'mcq', qid: 'gt01_q8', correct: '389', explanation: '364 + 25 = 389! Ones: 4+5=9, Tens: 6+2=8, Hundreds: 3+0=3. So 389!', correctLabel: '389' },
    render: (lp) => (
      <div className="gt-qcard gt-s1">
        <AchievementBadge icon="🌳" label="SAPLING COUNT" color="#16a34a" />
        <StoryBox emoji="🌳" text="A school planted 364 saplings. Then 25 more were planted on Tree Day. How many total?" color="#f0fdf4" border="#16a34a" />
        <HTODisplay number={364} highlightCol="O" />
        <p className="gt-qtext">364 + 25 = ? 🌳</p>
        <div className="gt-opts">
          {[['379','A'],['389','B'],['399','C'],['369','D']].map(([v,l],i) => (
            <GTOption key={v} value={v} label={l} index={i} onClick={() => lp.handleMcq('gt01_q8', v)} className={lp.getMcqClass('gt01_q8', v)} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'gt01_q9',
    meta: { type: 'tf', qid: 'gt01_q9_tf', correct: true, explanation: '400 + 100 = 500! 4 hundreds + 1 hundred = 5 hundreds = 500!', correctLabel: 'True' },
    render: (lp) => (
      <div className="gt-qcard gt-s1">
        <AchievementBadge icon="🎯" label="TRUE OR FALSE?" color="#8b5cf6" />
        <StoryBox emoji="🐘" text="Gaju the elephant collected 400 peanuts and found 100 more. He says the total is 500!" color="#fef3c7" border="#f59e0b" />
        <BoxDiagram part1={400} part2={100} whole={500} />
        <p className="gt-qtext">400 + 100 = 500. True or False?</p>
        <GTTFButtons qid="gt01_q9_tf" lp={lp} />
      </div>
    ),
  },
  {
    id: 'gt01_q10',
    matchAnswers: { gt01_match: { 'gt01_m1': '154', 'gt01_m2': '245', 'gt01_m3': '389', 'gt01_m4': '321' } },
    rightItems: [['154','154'],['245','245'],['389','389'],['321','321']],
    meta: { type: 'match', totalPairs: 4, explanation: '134+20=154, 200+45=245, 364+25=389, 300+21=321. Great matching!', correctLabel: 'All pairs matched!' },
    render: (lp, ctx) => (
      <div className="gt-qcard gt-s1">
        <AchievementBadge icon="🔗" label="MATCH IT!" color="#0891b2" />
        <StoryBox emoji="🧩" text="Match each addition sum to its answer! Can you find all 4 pairs?" color="#f0fdf4" border="#0d9488" />
        <p className="gt-qtext">Match the addition to the correct answer! 🎯</p>
        <div className="gt-match-wrap">
          <div className="gt-match-col">
            {[['gt01_m1','134 + 20'],['gt01_m2','200 + 45'],['gt01_m3','364 + 25'],['gt01_m4','300 + 21']].map(([val, label], i) => (
              <motion.div key={val} initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }}
                onClick={() => lp.handleMatch('gt01_match','left',val)} className={`gt-match-item ${lp.getMatchClass('gt01_match','left',val)}`}>{label}</motion.div>
            ))}
          </div>
          <div className="gt-match-center">{[0,1,2,3].map(i => <div key={i} className="gt-match-line">→</div>)}</div>
          <div className="gt-match-col">
            {ctx.shuffledRight.map(([val, label], i) => (
              <motion.div key={val} initial={{ opacity: 0, x: 15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }}
                onClick={() => lp.handleMatch('gt01_match','right',val)} className={`gt-match-item ${lp.getMatchClass('gt01_match','right',val)}`}>{label}</motion.div>
            ))}
          </div>
        </div>
      </div>
    ),
  },
];

const AdditionHTO = () => {
  const selRef = useRef(null);
  if (!selRef.current) {
    selRef.current = shuffle([...QUESTION_POOL]).slice(0, 5).map(q =>
      q.rightItems ? { ...q, shuffledRight: shuffle([...q.rightItems]) } : q
    );
  }
  const selected = selRef.current;
  const matchAnswers = {};
  selected.forEach(q => { if (q.matchAnswers) Object.assign(matchAnswers, q.matchAnswers); });
  const logicProps = useGTLogic(matchAnswers);
  const questions = selected.map(q => <React.Fragment key={q.id}>{q.render(logicProps, q)}</React.Fragment>);
  const questionMeta = selected.map(q => q.meta);
  return <GTPracticeTemplate skillId="GT-01" skillName="Addition with H-T-O" questions={questions} questionMeta={questionMeta} logicProps={logicProps} />;
};

export default AdditionHTO;
