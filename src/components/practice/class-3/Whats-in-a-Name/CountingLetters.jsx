import React, { useRef } from 'react';
import { useWINLogic } from './useWINLogic';
import WINPracticeTemplate from './WINPracticeTemplate';
import { LetterBoxes, shuffle } from './WINSharedComponents';
import './whats-in-a-name.css';

// Animal data — from the PDF page 3 exactly
const ANIMALS = {
  tiger:    { emoji: '🐯', count: 5 },
  elephant: { emoji: '🐘', count: 8 },
  deer:     { emoji: '🦌', count: 4 },
  rat:      { emoji: '🐀', count: 3 },
  monkey:   { emoji: '🐒', count: 6 },
  ox:       { emoji: '🐂', count: 2 },
  dog:      { emoji: '🐕', count: 3 },
  snake:    { emoji: '🐍', count: 5 },
  goat:     { emoji: '🐐', count: 4 },
  lion:     { emoji: '🦁', count: 4 },
};

// Card showing animal emoji + name with letter boxes
const AnimalLetterCard = ({ name }) => {
  const { emoji } = ANIMALS[name];
  return (
    <div style={{ textAlign: 'center', margin: '12px 0' }}>
      <div style={{ fontSize: '3.5rem', marginBottom: 8 }}>{emoji}</div>
      <div style={{
        fontFamily: "'Baloo 2', cursive", fontWeight: 800,
        fontSize: '1.1rem', color: '#1a1a2e', marginBottom: 10,
        textTransform: 'uppercase', letterSpacing: '1px',
      }}>
        {name}
      </div>
      <LetterBoxes word={name} />
      <div style={{ marginTop: 8, fontSize: '.8rem', color: '#64748b', fontWeight: 600 }}>
        Count the boxes! 👆
      </div>
    </div>
  );
};

// Build a question for any animal
const makeAnimalQ = (name, id, opts) => ({
  id,
  meta: {
    type: 'mcq', qid: id,
    correct: String(ANIMALS[name].count),
    explanation: `${name.toUpperCase()} has ${ANIMALS[name].count} letters: ${name.toUpperCase().split('').join(' – ')}.`,
    correctLabel: String(ANIMALS[name].count),
  },
  render: (lp) => (
    <div className="win-qcard">
      <div className="win-qmeta"><span className="win-qbadge">Q</span><span className="win-qtype">Count Letters</span></div>
      <p className="win-qtext">How many letters? 🔤</p>
      <AnimalLetterCard name={name} />
      <div className="win-opts">
        {opts.map(([v,l]) => (
          <div key={v} onClick={() => lp.handleMcq(id, v)} className={`win-opt ${lp.getMcqClass(id, v)}`}>
            <span className="win-opt-letter">{l}</span>{v}
          </div>
        ))}
      </div>
    </div>
  ),
});

const QUESTION_POOL = [
  makeAnimalQ('tiger',    'cl_tiger',    [['4','A'],['5','B'],['6','C'],['7','D']]),
  makeAnimalQ('elephant', 'cl_elephant', [['6','A'],['7','B'],['8','C'],['9','D']]),
  makeAnimalQ('monkey',   'cl_monkey',   [['5','A'],['6','B'],['7','C'],['8','D']]),
  makeAnimalQ('snake',    'cl_snake',    [['4','A'],['5','B'],['6','C'],['7','D']]),
  makeAnimalQ('ox',       'cl_ox',       [['1','A'],['2','B'],['3','C'],['4','D']]),
  makeAnimalQ('lion',     'cl_lion',     [['3','A'],['4','B'],['5','C'],['6','D']]),
  makeAnimalQ('rat',      'cl_rat',      [['2','A'],['3','B'],['4','C'],['5','D']]),
  makeAnimalQ('goat',     'cl_goat',     [['3','A'],['4','B'],['5','C'],['6','D']]),
  makeAnimalQ('deer',     'cl_deer',     [['3','A'],['4','B'],['5','C'],['6','D']]),
  makeAnimalQ('dog',      'cl_dog',      [['2','A'],['3','B'],['4','C'],['5','D']]),
  // Extra: a name comparison TF
  {
    id: 'cl_tf_monkey_tiger',
    meta: {
      type: 'tf', qid: 'cl_tf_monkey_tiger',
      correct: true,
      explanation: 'MONKEY has 6 letters (M-O-N-K-E-Y). TIGER has 5 letters (T-I-G-E-R). 6 > 5, so MONKEY has more letters!',
      correctLabel: 'True',
    },
    render: (lp) => (
      <div className="win-qcard">
        <div className="win-qmeta"><span className="win-qbadge">Q</span><span className="win-qtype">True / False</span></div>
        <p className="win-qtext"><strong>MONKEY</strong> has more letters than <strong>TIGER</strong>.</p>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', margin: '14px 0' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '3rem' }}>🐒</div>
            <div style={{ fontWeight: 800, marginBottom: 6 }}>MONKEY</div>
            <LetterBoxes word="monkey" color="#9333ea" bgColor="#faf5ff" textColor="#7e22ce" />
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '3rem' }}>🐯</div>
            <div style={{ fontWeight: 800, marginBottom: 6 }}>TIGER</div>
            <LetterBoxes word="tiger" color="#ea580c" bgColor="#fff7ed" textColor="#c2410c" />
          </div>
        </div>
        <div className="win-tfopts">
          <button onClick={() => lp.handleTf('cl_tf_monkey_tiger', true)} className={`win-tfbtn win-t ${lp.getTfClass('cl_tf_monkey_tiger', true)}`}>✅ True</button>
          <button onClick={() => lp.handleTf('cl_tf_monkey_tiger', false)} className={`win-tfbtn win-f ${lp.getTfClass('cl_tf_monkey_tiger', false)}`}>❌ False</button>
        </div>
      </div>
    ),
  },
];

const CountingLetters = () => {
  const selRef = useRef(null);
  if (!selRef.current) {
    selRef.current = shuffle([...QUESTION_POOL]).slice(0, 5).map(q =>
      q.rightItems ? { ...q, shuffledRight: shuffle([...q.rightItems]) } : q
    );
  }
  const selected = selRef.current;
  const logicProps = useWINLogic({});
  const questions = selected.map(q => <React.Fragment key={q.id}>{q.render(logicProps, q)}</React.Fragment>);
  const questionMeta = selected.map(q => q.meta);

  return (
    <WINPracticeTemplate
      skillId="WIN-04"
      skillName="Counting Letters in Names"
      questions={questions}
      questionMeta={questionMeta}
      logicProps={logicProps}
    />
  );
};

export default CountingLetters;
