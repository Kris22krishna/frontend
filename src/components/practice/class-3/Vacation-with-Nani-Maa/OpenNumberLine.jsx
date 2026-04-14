import React, { useMemo } from 'react';
import VNPracticeTemplate from './VNPracticeTemplate';
import { useVNLogic } from './useVNLogic';
import { VNOption, AchievementBadge, NumberLineVN, shuffle } from './VNSharedComponents';

export default function OpenNumberLine() {
  const meta = useMemo(() => [
    { id: 1, type: 'add', start: 63, jump1: 20, jump2: 6, ans: 89, options: shuffle([79, 89, 99, 109]) },
    { id: 2, type: 'add_multi', start: 70, jump1: 30, jump2: 1, ans: 101, options: shuffle([91, 101, 111, 121]) },
    { id: 3, type: 'add', start: 20, jump1: 40, jump2: 1, ans: 61, options: shuffle([51, 61, 71, 81]) },
    { id: 4, type: 'sub', start: 134, jump1: -50, jump2: -6, ans: 78, options: shuffle([68, 78, 88, 98]) },
    { id: 5, type: 'sub', start: 68, jump1: -20, jump2: -6, ans: 42, options: shuffle([32, 42, 52, 62]) }
  ], []);

  const qMeta = meta.map(m => ({ correct: m.ans, correctLabel: m.ans }));
  const lp = useVNLogic(qMeta);

  const qs = meta.map((m, i) => {
    let content;
    if (m.type === 'add' || m.type === 'add_multi') {
      const mid = m.start + m.jump1;
      content = (
        <>
          <AchievementBadge icon="〰️" label="OPEN NUMBER LINE" color="#22c55e" />
          <div className="vn-qtext">Solve addition on the open number line: {m.start} + {m.jump1 + m.jump2} = ?</div>
          <NumberLineVN
            start={Math.max(0, m.start - 10)} end={m.ans + 10} step={10}
            highlight={[m.start, mid, m.ans]}
            jumps={[
              { from: m.start, to: mid, label: `+${m.jump1}` },
              { from: mid, to: m.ans, label: `+${m.jump2}` }
            ]}
          />
        </>
      );
    } else if (m.type === 'sub') {
      const mid = m.start + m.jump1;
      content = (
        <>
          <AchievementBadge icon="〰️" label="OPEN NUMBER LINE" color="#ef4444" />
          <div className="vn-qtext">Solve subtraction on the open number line: {m.start} - {Math.abs(m.jump1 + m.jump2)} = ?</div>
          <NumberLineVN
            start={Math.max(0, m.ans - 10)} end={m.start + 10} step={10}
            highlight={[m.ans, mid, m.start]}
            jumps={[
              { from: m.start, to: mid, label: `${m.jump1}` },
              { from: mid, to: m.ans, label: `${m.jump2}` }
            ]}
          />
        </>
      );
    }

    return (
      <div key={m.id} className={`vn-s9`}>
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

  return <VNPracticeTemplate skillId="VN-09" skillName="Open Number Line Solving" questions={qs} questionMeta={qMeta} logicProps={lp} />;
}
