import React, { useMemo } from 'react';
import VNPracticeTemplate from './VNPracticeTemplate';
import { useVNLogic } from './useVNLogic';
import { VNOption, AchievementBadge, StoryBox, shuffle } from './VNSharedComponents';

export default function EstimationAround100() {
  const meta = useMemo(() => [
    { id: 1, type: 'estimate_more_less', expr: '150 - 49', exact: 101, ans: 'More than 100', options: ["More than 100", "Less than 100"] },
    { id: 2, type: 'estimate_more_less', expr: '95 + 10 + 5', exact: 110, ans: 'More than 100', options: ["More than 100", "Less than 100"] },
    { id: 3, type: 'estimate_more_less', expr: '124 - 30', exact: 94, ans: 'Less than 100', options: ["More than 100", "Less than 100"] },
    { id: 4, type: 'approximate', expr: '52 + 47', ans: 100, options: shuffle([80, 90, 100, 110]) },
    { id: 5, type: 'approximate', expr: '148 - 49', ans: 100, options: shuffle([80, 90, 100, 110]) }
  ], []);

  const qMeta = meta.map(m => ({ correct: m.ans, correctLabel: m.ans }));
  const lp = useVNLogic(qMeta);

  const qs = meta.map((m, i) => {
    let content;
    if (m.type === 'estimate_more_less') {
      content = (
        <>
          <AchievementBadge icon="🤔" label="ESTIMATE" color="#8b5cf6" />
          <div className="vn-qtext">Without exactly calculating, is {m.expr} more or less than 100?</div>
          <StoryBox emoji="💭" text={`Let's estimate around 100 to quickly find the answer!`} />
        </>
      );
    } else if (m.type === 'approximate') {
      content = (
        <>
          <AchievementBadge icon="🎯" label="APPROXIMATE" color="#eab308" />
          <div className="vn-qtext">What is the closest approximation to {m.expr}?</div>
          <StoryBox emoji="📈" text={`Round the numbers to the nearest tens first.`} />
        </>
      );
    }

    return (
      <div key={m.id} className={`vn-s8`}>
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

  return <VNPracticeTemplate skillId="VN-08" skillName="Estimation Around 100" questions={qs} questionMeta={qMeta} logicProps={lp} />;
}
