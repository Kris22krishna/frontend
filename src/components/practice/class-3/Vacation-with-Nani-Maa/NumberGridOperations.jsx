import React, { useMemo } from 'react';
import VNPracticeTemplate from './VNPracticeTemplate';
import { useVNLogic } from './useVNLogic';
import { VNOption, AchievementBadge, StoryBox, shuffle } from './VNSharedComponents';

const GridWalkthrough = ({ type }) => {
  if (type === 'add') {
    return (
      <div style={{ background: '#eff6ff', borderRadius: '8px', padding: '14px', margin: '10px 0 20px', border: '2px dashed #93c5fd' }}>
        <div style={{ fontWeight: 'bold', color: '#1e40af', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.05rem' }}>
          <span style={{ fontSize: '1.3rem' }}>💡</span> <span>Walkthrough: Adding 45 + 34</span>
        </div>
        <ul style={{ margin: 0, paddingLeft: '24px', color: '#1e3a8a', fontSize: '0.95rem', lineHeight: '1.6' }}>
          <li><strong>Step 1:</strong> Find the starting number, <strong>45</strong>, and click it.</li>
          <li><strong>Step 2:</strong> Look at the <strong>tens</strong> digit in 34. It's a 3! Click and jump DOWN 3 rows (+30) to reach <strong>75</strong>.</li>
          <li><strong>Step 3:</strong> Look at the <strong>ones</strong> digit in 34. It's a 4. Click and move RIGHT 4 boxes (+4) to reach <strong>79</strong>.</li>
          <li><strong>Step 4:</strong> You found the answer! Select it from the options below.</li>
        </ul>
      </div>
    );
  }
  return (
    <div style={{ background: '#f0fdf4', borderRadius: '8px', padding: '14px', margin: '10px 0 20px', border: '2px dashed #86efac' }}>
      <div style={{ fontWeight: 'bold', color: '#166534', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.05rem' }}>
        <span style={{ fontSize: '1.3rem' }}>💡</span> <span>Walkthrough: Steps from 23 to 34</span>
      </div>
      <ul style={{ margin: 0, paddingLeft: '24px', color: '#14532d', fontSize: '0.95rem', lineHeight: '1.6' }}>
        <li><strong>Step 1:</strong> Click the starting number <strong>23</strong>.</li>
        <li><strong>Step 2:</strong> How many full rows down can we jump? 1 row down takes you to <strong>33</strong> (+10 steps). Click 33!</li>
        <li><strong>Step 3:</strong> Are we at 34 yet? Not quite! Move RIGHT 1 box (+1 step). Click <strong>34</strong>.</li>
        <li><strong>Step 4:</strong> We made 1 jump of ten (10) and 1 jump of one (1). The total distance is <strong>11</strong> steps! Select the answer below.</li>
      </ul>
    </div>
  );
};

const MiniGrid = ({ mId }) => {
  const [selected, setSelected] = React.useState([]);

  const toggle = (num) => {
    setSelected(p => p.includes(num) ? p.filter(x => x !== num) : [...p, num]);
  };

  const rows = [];
  for (let r = 9; r >= 0; r--) {
    let row = [];
    for (let c = 1; c <= 10; c++) {
      let num = r * 10 + c;
      let isSel = selected.includes(num);
      row.push(
        <div key={num} onClick={() => toggle(num)} style={{
          width: '34px', height: '34px', fontSize: '0.8rem', fontWeight: isSel ? '900' : 'normal',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: isSel ? '#fef08a' : '#f8fafc', cursor: 'pointer',
          border: '1px solid', borderColor: isSel ? '#ca8a04' : '#e2e8f0',
          color: isSel ? '#854d0e' : '#64748b',
          transition: 'all 0.1s ease-in-out',
          userSelect: 'none'
        }}>
          {num}
        </div>
      );
    }
    rows.push(<div key={r} style={{ display: 'flex' }}>{row}</div>);
  }
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '14px 0' }}>
      <div style={{ fontSize: '0.85rem', color: '#10b981', marginBottom: '8px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '6px' }}>
         <span style={{ fontSize: '1.2rem' }}>👆</span> Click the boxes on the grid to trace your jumps!
      </div>
      <div style={{ border: '2px solid #94a3b8', borderRadius: '4px', overflow: 'hidden' }}>
        {rows}
      </div>
    </div>
  );
};

export default function NumberGridOperations() {
  const meta = useMemo(() => [
    { id: 1, type: 'grid_add', a: 45, b: 34, ans: 79, options: shuffle([69, 79, 89, 99]) },
    { id: 2, type: 'grid_add', a: 30, b: 66, ans: 96, options: shuffle([86, 96, 76, 106]) },
    { id: 3, type: 'multi', from: 23, to: 34, ans: 11, options: shuffle([10, 11, 12, 13]) },
    { id: 4, type: 'multi', from: 19, to: 54, ans: 35, options: shuffle([25, 35, 45, 55]) },
    { id: 5, type: 'grid_add', a: 75, b: 16, ans: 91, options: shuffle([81, 91, 90, 85]) }
  ], []);

  const qMeta = meta.map(m => ({ correct: m.ans, correctLabel: m.ans }));
  const lp = useVNLogic(qMeta);

  const qs = meta.map((m, i) => {
    let content;
    if (m.type === 'grid_add') {
      content = (
        <>
          <AchievementBadge icon="🔢" label="NUMBER GRID" color="#eab308" />
          <div className="vn-qtext">Add using the grid: {m.a} + {m.b} = ?</div>
          <StoryBox emoji="🎲" text={`Start at ${m.a}. We can jump up by tens, and right by ones!`} />
          {m.id === 1 && <GridWalkthrough type="add" />}
          <div style={{ textAlign: 'center' }}><MiniGrid mId={m.id} /></div>
        </>
      );
    } else if (m.type === 'multi') {
      content = (
        <>
          <AchievementBadge icon="🛤️" label="MULTI-STEP JUMPS" color="#14b8a6" />
          <div className="vn-qtext">How many steps from {m.from} to {m.to}?</div>
          <StoryBox emoji="🚀" text={`Jump from ${m.from} to ${Math.floor(m.to/10)*10} by tens, then slide to ${m.to} by ones.`} />
          {m.id === 3 && <GridWalkthrough type="multi" />}
          <div style={{ textAlign: 'center' }}><MiniGrid mId={m.id} /></div>
        </>
      );
    }

    return (
      <div key={m.id} className={`vn-s4`}>
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

  return <VNPracticeTemplate skillId="VN-04" skillName="Number Grid Operations" questions={qs} questionMeta={qMeta} logicProps={lp} />;
}
