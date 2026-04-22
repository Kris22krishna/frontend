import React, { useMemo } from 'react';
import VNPracticeTemplate from './VNPracticeTemplate';
import { useVNLogic } from './useVNLogic';
import { VNOption, AchievementBadge, NumberLineVN, StoryBox, shuffle } from './VNSharedComponents';

export default function NumberLineJumps() {
  const meta = useMemo(() => [
    { id: 1, type: 'add', start: 15, jump: 7, ans: 22, options: shuffle([20, 21, 22, 23]), hl: [15, 22] },
    { id: 2, type: 'add', start: 22, jump: 30, ans: 52, options: shuffle([42, 52, 62, 72]), hl: [22, 52] },
    { id: 3, type: 'sub', start: 52, jump: 37, ans: 15, options: shuffle([14, 15, 16, 17]), hl: [52, 15] },
    { id: 4, type: 'skip', start: 7, jump: 10, times: 3, ans: 37, options: shuffle([27, 37, 47, 57]), hl: [7, 17, 27, 37] },
    { id: 5, type: 'skip', start: 76, jump: -10, times: 2, ans: 56, options: shuffle([66, 56, 46, 36]), hl: [76, 66, 56] }
  ], []);

  const qMeta = meta.map(m => ({ correct: m.ans, correctLabel: m.ans }));
  const lp = useVNLogic(qMeta);

  const qs = meta.map((m, i) => {
    let content;
    if (m.type === 'add') {
      content = (
        <>
          <AchievementBadge icon="🐸" label="FORWARD JUMPS" color="#22c55e" />
          <div className="vn-qtext">Let's jump forward! {m.start} + {m.jump} = ?</div>
          <NumberLineVN start={Math.max(0, m.start - 10)} end={m.ans + 10} step={m.jump > 20 ? 10 : 2} highlight={m.hl} jumps={[{from: m.start, to: m.ans, label: `+${m.jump}`}]} />
        </>
      );
    } else if (m.type === 'sub') {
      content = (
        <>
          <AchievementBadge icon="🐸" label="BACKWARD JUMPS" color="#ef4444" />
          <div className="vn-qtext">Let's jump backward! {m.start} - {m.jump} = ?</div>
          <NumberLineVN start={Math.max(0, m.ans - 10)} end={m.start + 10} step={m.jump > 20 ? 10 : 2} highlight={m.hl} jumps={[{from: m.start, to: m.ans, label: `-${m.jump}`}]} />
        </>
      );
    } else if (m.type === 'skip') {
      const jumps = [];
      let current = m.start;
      for (let j = 0; j < m.times; j++) {
        let next = current + m.jump;
        jumps.push({ from: current, to: next, label: m.jump > 0 ? `+${m.jump}` : `${m.jump}` });
        current = next;
      }
      content = (
        <>
          <AchievementBadge icon="🐾" label="SKIP COUNTING" color="#eab308" />
          <div className="vn-qtext">Start at {m.start} and jump {m.jump > 0 ? 'forward' : 'backward'} by {Math.abs(m.jump)}, {m.times} times. Where do you land?</div>
          <NumberLineVN start={Math.min(m.start, m.ans) - 5} end={Math.max(m.start, m.ans) + 5} step={5} highlight={m.hl} jumps={jumps} />
        </>
      );
    }

    return (
      <div key={m.id} className={`vn-s3`}>
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

  return <VNPracticeTemplate skillId="VN-03" skillName="Number Line and Ginladi Jumps" questions={qs} questionMeta={qMeta} logicProps={lp} />;
}
