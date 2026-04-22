import React, { useMemo } from 'react';
import VNPracticeTemplate from './VNPracticeTemplate';
import { useVNLogic } from './useVNLogic';
import { VNOption, AchievementBadge, StoryBox, shuffle } from './VNSharedComponents';

export default function StoryBasedAddSub() {
  const meta = useMemo(() => [
    { id: 1, type: 'story_add', a: 25, b: 36, obj: 'radishes', ans: 61, options: shuffle([51, 61, 71, 81]) },
    { id: 2, type: 'story_add', a: 85, b: 67, obj: 'apples', ans: 152, options: shuffle([142, 152, 162, 172]) },
    { id: 3, type: 'story_sub', total: 100, take: 65, obj: 'flowers', ans: 35, options: shuffle([25, 35, 45, 55]) },
    { id: 4, type: 'story_compare', p1: 'Raju', v1: 85, p2: 'Nani', v2: 67, obj: 'apples', ans: 18, options: shuffle([16, 18, 20, 22]) },
    { id: 5, type: 'story_add', a: 56, b: 65, obj: 'runs', ans: 121, options: shuffle([111, 121, 131, 141]) }
  ], []);

  const qMeta = meta.map(m => ({ correct: m.ans, correctLabel: m.ans }));
  const lp = useVNLogic(qMeta);

  const qs = meta.map((m, i) => {
    let content;
    if (m.type === 'story_add') {
      content = (
        <>
          <AchievementBadge icon="📖" label="STORY PROBLEM" color="#ef4444" />
          <div className="vn-qtext">Read the story and solve the problem!</div>
          <StoryBox emoji="🗣️" text={`I collected ${m.a} ${m.obj} and my friend collected ${m.b} ${m.obj}. How many ${m.obj} do we have altogether?`} />
          <div style={{ textAlign: 'center', fontSize: '1.2rem', fontWeight: 800 }}>{m.a} + {m.b} = ?</div>
        </>
      );
    } else if (m.type === 'story_sub') {
      content = (
        <>
          <AchievementBadge icon="📖" label="MISSING PART" color="#3b82f6" />
          <div className="vn-qtext">Find the missing quantity from the total.</div>
          <StoryBox emoji="🌸" text={`There were ${m.total} ${m.obj} in the garden. We picked ${m.take} of them. How many ${m.obj} are left?`} />
          <div style={{ textAlign: 'center', fontSize: '1.2rem', fontWeight: 800 }}>{m.total} - {m.take} = ?</div>
        </>
      );
    } else if (m.type === 'story_compare') {
      content = (
        <>
          <AchievementBadge icon="⚖️" label="COMPARE QUANTITIES" color="#14b8a6" />
          <div className="vn-qtext">Find who has more and by how much!</div>
          <StoryBox emoji="🍎" text={`${m.p1} has ${m.v1} ${m.obj}. ${m.p2} has ${m.v2} ${m.obj}. How many more ${m.obj} does ${m.p1} have than ${m.p2}?`} />
          <div style={{ textAlign: 'center', fontSize: '1.2rem', fontWeight: 800 }}>{m.v1} - {m.v2} = ?</div>
        </>
      );
    }

    return (
      <div key={m.id} className={`vn-s6`}>
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

  return <VNPracticeTemplate skillId="VN-06" skillName="Story-Based Addition and Subtraction" questions={qs} questionMeta={qMeta} logicProps={lp} />;
}
