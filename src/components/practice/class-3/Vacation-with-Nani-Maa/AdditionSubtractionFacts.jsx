import React, { useMemo } from 'react';
import VNPracticeTemplate from './VNPracticeTemplate';
import { useVNLogic } from './useVNLogic';
import { VNOption, StoryBox, AchievementBadge, shuffle } from './VNSharedComponents';

export default function AdditionSubtractionFacts() {
  const meta = useMemo(() => [
    { id: 1, type: 'missing', total: 15, visible: 12, ans: 3, options: shuffle([2, 3, 4, 5]) },
    { id: 2, type: 'add', a: 7, b: 5, ans: 12, options: shuffle([11, 12, 13, 14]) },
    { id: 3, type: 'sub', total: 18, take: 9, ans: 9, options: shuffle([7, 8, 9, 10]) },
    { id: 4, type: 'missing', total: 20, visible: 9, ans: 11, options: shuffle([10, 11, 12, 13]) },
    { id: 5, type: 'add', a: 9, b: 7, ans: 16, options: shuffle([14, 15, 16, 17]) }
  ], []);

  const qMeta = meta.map(m => ({ correct: m.ans, correctLabel: m.ans }));
  const lp = useVNLogic(qMeta);

  const qs = meta.map((m, i) => {
    let content;
    if (m.type === 'missing') {
      content = (
        <>
          <AchievementBadge icon="🌱" label="HIDDEN OBJECTS" color="#eab308" />
          <div className="vn-qtext">We have {m.total} objects in total, but we can only see {m.visible}. How many are hidden?</div>
          <StoryBox emoji="🌾" text={`Total seeds: ${m.total}. Uncovered: ${m.visible}. The rest are buried!`} />
        </>
      );
    } else if (m.type === 'add') {
      content = (
        <>
          <AchievementBadge icon="🍬" label="ADDITION FACTS" color="#14b8a6" />
          <div className="vn-qtext">Find the total: {m.a} + {m.b} = ?</div>
          <StoryBox emoji="🧸" text={`I had ${m.a} toys and my Nani gave me ${m.b} sweets. How many items total?`} />
        </>
      );
    } else if (m.type === 'sub') {
      content = (
        <>
          <AchievementBadge icon="📚" label="SUBTRACTION FACTS" color="#ef4444" />
          <div className="vn-qtext">Solve: {m.total} - {m.take} = ?</div>
          <StoryBox emoji="📘" text={`Out of ${m.total} books, we read ${m.take} books during the vacation. How many are left?`} />
        </>
      );
    }

    return (
      <div key={m.id} className={`vn-s1`}>
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

  return <VNPracticeTemplate skillId="VN-01" skillName="Addition and Subtraction Facts" questions={qs} questionMeta={qMeta} logicProps={lp} />;
}
