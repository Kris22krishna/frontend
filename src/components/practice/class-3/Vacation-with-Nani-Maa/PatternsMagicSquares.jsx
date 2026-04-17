import React, { useMemo } from 'react';
import VNPracticeTemplate from './VNPracticeTemplate';
import { useVNLogic } from './useVNLogic';
import { VNOption, AchievementBadge, StoryBox, shuffle } from './VNSharedComponents';

export default function PatternsMagicSquares() {
  const meta = useMemo(() => [
    { id: 1, type: 'row_sum', grid: [[2, 7, 6], [9, '?', 1], [4, 3, 8]], tr: 1, tc: 1, rsum: 15, ans: 5, options: shuffle([4, 5, 6, 7]) },
    { id: 2, type: 'col_sum', grid: [[8, 1, 6], [3, 5, 7], [4, 9, '?']], tr: 2, tc: 2, rsum: 15, ans: 2, options: shuffle([1, 2, 3, 4]) },
    { id: 3, type: 'magic_sum', grid: [[2, 7, 6], [9, 5, 1], [4, 3, 8]], tr: -1, tc: -1, rsum: 15, ans: 15, options: shuffle([12, 15, 18, 20]) },
    { id: 4, type: 'row_sum', grid: [[8, 3, 4], [1, 5, 9], [6, 7, '?']], tr: 2, tc: 2, rsum: 15, ans: 2, options: shuffle([2, 5, 8, 9]) },
    { id: 5, type: 'magic_square', grid: [[4, 9, 2], [3, 5, 7], [8, 1, '?']], tr: 2, tc: 2, rsum: 15, ans: 6, options: shuffle([5, 6, 7, 8]) }
  ], []);

  const qMeta = meta.map(m => ({ correct: m.ans, correctLabel: m.ans }));
  const lp = useVNLogic(qMeta);

  const renderGrid = (m) => (
    <table className="vn-magic-sq">
      <tbody>
        {m.grid.map((row, r) => (
          <tr key={r}>
            {row.map((cell, c) => (
              <td key={c} className={`vn-magic-td ${r === m.tr && c === m.tc ? 'vn-highlight' : ''}`}>
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );

  const qs = meta.map((m, i) => {
    let content;
    if (m.type === 'row_sum') {
      content = (
        <>
          <AchievementBadge icon="➕" label="ROW SUM" color="#8b5cf6" />
          <div className="vn-qtext">The sum of every row is {m.rsum}. What is the missing number?</div>
          {renderGrid(m)}
        </>
      );
    } else if (m.type === 'col_sum') {
      content = (
        <>
          <AchievementBadge icon="➕" label="COLUMN SUM" color="#3b82f6" />
          <div className="vn-qtext">The sum of the last column is {m.rsum}. Find the missing number!</div>
          {renderGrid(m)}
        </>
      );
    } else if (m.type === 'magic_sum') {
      content = (
        <>
          <AchievementBadge icon="✨" label="MAGIC SUM" color="#fb923c" />
          <div className="vn-qtext">Add up the numbers in any row, column, or diagonal. What is the magic sum?</div>
          {renderGrid(m)}
        </>
      );
    } else if (m.type === 'magic_square') {
      content = (
        <>
          <AchievementBadge icon="🧙‍♂️" label="MAGIC SQUARE" color="#d946ef" />
          <div className="vn-qtext">This is a Magic Square! Every line adds up to {m.rsum}. Fill in the missing number:</div>
          {renderGrid(m)}
        </>
      );
    }

    return (
      <div key={m.id} className={`vn-s5`}>
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

  return <VNPracticeTemplate skillId="VN-05" skillName="Patterns and Magic Squares" questions={qs} questionMeta={qMeta} logicProps={lp} />;
}
