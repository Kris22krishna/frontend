import React, { useMemo } from 'react';
import VNPracticeTemplate from './VNPracticeTemplate';
import { useVNLogic } from './useVNLogic';
import { VNOption, AchievementBadge, StoryBox, BoxDiagram, shuffle } from './VNSharedComponents';

export default function BoxDiagramMethod() {
  const meta = useMemo(() => [
    { id: 1, type: 'find_total', p1: 45, p2: 35, ans: 80, options: shuffle([70, 80, 90, 100]) },
    { id: 2, type: 'find_missing', total: 100, p1: 60, ans: 40, options: shuffle([30, 40, 50, 60]) },
    { id: 3, type: 'compare', v1: 85, v2: 65, ans: 20, options: shuffle([10, 15, 20, 25]) },
    { id: 4, type: 'find_total', p1: 120, p2: 40, ans: 160, options: shuffle([140, 150, 160, 170]) },
    { id: 5, type: 'compare', v1: 150, v2: 90, ans: 60, options: shuffle([40, 50, 60, 70]) }
  ], []);

  const qMeta = meta.map(m => ({ correct: m.ans, correctLabel: m.ans }));
  const lp = useVNLogic(qMeta);

  const qs = meta.map((m, i) => {
    let content;
    if (m.type === 'find_total') {
      content = (
        <>
          <AchievementBadge icon="📦" label="BOX DIAGRAM" color="#eab308" />
          <div className="vn-qtext">We sold {m.p1} books on Monday and {m.p2} books on Tuesday. Find the total using the diagram!</div>
          <BoxDiagram total="?" parts={[{ value: m.p1, label: 'Monday' }, { value: m.p2, label: 'Tuesday' }]} />
        </>
      );
    } else if (m.type === 'find_missing') {
      content = (
        <>
          <AchievementBadge icon="📦" label="MISSING PART" color="#3b82f6" />
          <div className="vn-qtext">Nani planted {m.total} plants. {m.p1} dried up. How many are left?</div>
          <BoxDiagram total={m.total} parts={[{ value: m.p1, label: 'Dried' }, { value: '?', label: 'Left' }]} />
        </>
      );
    } else if (m.type === 'compare') {
      content = (
        <>
          <AchievementBadge icon="⚖️" label="COMPARE DIAGRAM" color="#14b8a6" />
          <div className="vn-qtext">Compare the quantities. What is the difference?</div>
          <BoxDiagram total={Math.max(m.v1, m.v2)} parts={[{ value: Math.min(m.v1, m.v2), label: 'Smaller' }, { value: '?', label: 'Difference' }]} />
        </>
      );
    }

    return (
      <div key={m.id} className={`vn-s7`}>
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

  return <VNPracticeTemplate skillId="VN-07" skillName="Box Diagram Method" questions={qs} questionMeta={qMeta} logicProps={lp} />;
}
