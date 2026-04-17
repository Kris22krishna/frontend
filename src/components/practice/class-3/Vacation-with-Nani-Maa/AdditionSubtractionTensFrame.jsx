import React, { useMemo } from 'react';
import VNPracticeTemplate from './VNPracticeTemplate';
import { useVNLogic } from './useVNLogic';
import { VNOption, AchievementBadge, TensFrame, shuffle } from './VNSharedComponents';

export default function AdditionSubtractionTensFrame() {
  const meta = useMemo(() => [
    { id: 1, type: 'add', a: 6, b: 8, ans: 14, options: shuffle([13, 14, 15, 16]) },
    { id: 2, type: 'add', a: 5, b: 10, ans: 15, options: shuffle([14, 15, 16, 17]) },
    { id: 3, type: 'sub', total: 9, take: 6, ans: 3, options: shuffle([2, 3, 4, 5]) },
    { id: 4, type: 'sub', total: 18, take: 9, ans: 9, options: shuffle([7, 8, 9, 10]) },
    { id: 5, type: 'cards', triple: [7, 8, 15], ans: "7 + 8 = 15", options: shuffle(["7 + 8 = 15", "15 + 8 = 7", "8 - 15 = 7", "7 - 8 = 15"]) }
  ], []);

  const qMeta = meta.map(m => ({ correct: m.ans, correctLabel: m.ans }));
  const lp = useVNLogic(qMeta);

  const qs = meta.map((m, i) => {
    let content;
    if (m.type === 'add') {
      content = (
        <>
          <AchievementBadge icon="🧮" label="TENS FRAME" color="#fb923c" />
          <div className="vn-qtext">Add the numbers using the tens frames: {m.a} + {m.b} = ?</div>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
            {m.a > 10 ? <><TensFrame dotsRed={10}/><TensFrame dotsRed={m.a - 10}/></> : <TensFrame dotsRed={m.a} />}
            {m.b > 10 ? <><TensFrame dotsBlue={10}/><TensFrame dotsBlue={m.b - 10}/></> : <TensFrame dotsBlue={m.b} />}
          </div>
        </>
      );
    } else if (m.type === 'sub') {
      content = (
        <>
          <AchievementBadge icon="🧮" label="TENS FRAME" color="#3b82f6" />
          <div className="vn-qtext">Subtract using the tens frames: {m.total} - {m.take} = ?</div>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
            {m.total > 10 ? <><TensFrame dotsRed={10}/><TensFrame dotsRed={m.total - 10}/></> : <TensFrame dotsRed={m.total} />}
            <div style={{ fontSize: '2rem', display: 'flex', alignItems: 'center' }}>-</div>
            {m.take > 10 ? <><TensFrame dotsBlue={10}/><TensFrame dotsBlue={m.take - 10}/></> : <TensFrame dotsBlue={m.take} />}
          </div>
        </>
      );
    } else if (m.type === 'cards') {
      content = (
        <>
          <AchievementBadge icon="🃏" label="NUMBER CARDS" color="#8b5cf6" />
          <div className="vn-qtext">Make a valid addition statement using the cards: {m.triple.join(', ')}</div>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', margin: '14px 0' }}>
            {m.triple.map(c => <div key={c} style={{ background: '#e0e7ff', padding: '10px 16px', borderRadius: '8px', border: '2px solid #818cf8', fontWeight: 800 }}>{c}</div>)}
          </div>
        </>
      );
    }

    return (
      <div key={m.id} className={`vn-s2`}>
        {content}
        <div className="vn-opts">
          {m.options.map((opt, oIdx) => (
            <VNOption
              key={oIdx} index={oIdx} value={opt} label={String.fromCharCode(65 + oIdx)}
              className={lp.getOptClass(i, opt)} onClick={() => lp.handleOpt(i, opt)}
            />
          ))}
        </div>
      </div>
    );
  });

  return <VNPracticeTemplate skillId="VN-02" skillName="Addition and Subtraction Using Tens Frame" questions={qs} questionMeta={qMeta} logicProps={lp} />;
}
