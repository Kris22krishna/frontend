import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../../../Math-Branches/Algebra/algebra.css';
import MathRenderer from '../../../../../MathRenderer';
import {
  orderQuestions, orderAssessment,
  typesQuestions, typesAssessment,
  operationsQuestions, operationsAssessment,
  multiplicationQuestions, multiplicationAssessment,
  transposeQuestions, transposeAssessment,
  inverseQuestions, inverseAssessment,
} from './matrixQuestions';

// ─── Shared Quiz Engine (exact copy from AlgebraSkills) ─────────────────────
function QuizEngine({ questions, title, onBack, color }) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const q = questions[current];
  const progress = ((current + (finished ? 1 : 0)) / questions.length) * 100;

  const handleSelect = (optIdx) => {
    if (answered) return;
    setSelected(optIdx);
    setAnswered(true);
    if (optIdx === q.correct) setScore(s => s + 1);
  };

  const handleNext = () => {
    if (current + 1 >= questions.length) {
      setFinished(true);
    } else {
      setCurrent(c => c + 1);
      setSelected(null);
      setAnswered(false);
    }
  };

  if (finished) {
    const pct = Math.round((score / questions.length) * 100);
    let msg = pct >= 90 ? '🏆 Mastered!' : pct >= 75 ? '🌟 Great Job!' : pct >= 50 ? '👍 Keep it up!' : '💪 Keep Learning!';
    let msgSub = pct >= 90 ? 'You have excellent control over this topic!' : 'Review the concepts and try again for 100%.';

    return (
      <div className="alg-quiz-finished" style={{ textAlign: 'center', padding: '40px 0' }}>
        <div className="alg-quiz-score-circle" style={{
          width: 140, height: 140, borderRadius: '50%',
          background: `conic-gradient(${color} ${pct * 3.6}deg, #f1f5f9 0deg)`,
          margin: '0 auto 24px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
          border: '8px solid #fff'
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: 40, fontWeight: 900, color: 'var(--alg-text)', lineHeight: 1 }}>{score}</div>
            <div style={{ fontSize: 13, color: 'var(--alg-muted)', fontWeight: 700 }}>out of {questions.length}</div>
          </div>
        </div>
        <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 28, fontWeight: 900, color: 'var(--alg-text)', margin: '0 0 8px' }}>{msg}</h2>
        <p style={{ color: 'var(--alg-muted)', fontSize: 15, margin: '0 0 32px' }}>{msgSub}</p>
        <div className="alg-quiz-finished-actions" style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
          <button
            className="alg-btn-primary"
            onClick={() => { setCurrent(0); setSelected(null); setAnswered(false); setScore(0); setFinished(false); }}
            style={{ padding: '12px 24px', background: color }}
          >
            Try Again
          </button>
          <button className="alg-btn-secondary" onClick={onBack} style={{ padding: '12px 24px' }}>
            Return to Skills
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="alg-quiz-active alg-quiz-container">
      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <div className="alg-score-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 12 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 800, color: color, textTransform: 'uppercase', letterSpacing: 1.2, marginBottom: 4 }}>Skill Verification</div>
            <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 22, fontWeight: 800, color: 'var(--alg-text)', margin: 0 }}>{title}</h3>
          </div>
          <div style={{ fontSize: 13, color: 'var(--alg-muted)', fontWeight: 700 }}>
            Question <span style={{ color: color }}>{current + 1}</span> / {questions.length}
          </div>
        </div>
        <div style={{ background: '#f1f5f9', borderRadius: 10, height: 6, overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${progress}%`, background: color, borderRadius: 10, transition: 'width 0.4s ease' }} />
        </div>
      </div>

      {/* Question Card */}
      <div className="alg-quiz-card" style={{
        background: '#fff', borderRadius: 20, padding: '32px 36px',
        marginBottom: 20, boxShadow: '0 12px 30px rgba(0,0,0,0.03)',
        border: '1px solid rgba(0,0,0,0.05)'
      }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          background: `${color}15`, padding: '4px 12px', borderRadius: 8,
          fontSize: 12, fontWeight: 800, color: color, marginBottom: 16
        }}>
          <span>QUESTION</span> {current + 1}
        </div>
        <div className="alg-quiz-question-text" style={{ fontSize: 18, fontWeight: 600, color: 'var(--alg-text)', lineHeight: 1.6, marginBottom: 24 }}>
          {q.question}
        </div>
        {q.math && (
          <div style={{
            background: '#f8fafc', border: `1px solid ${color}20`,
            borderRadius: 12, padding: '16px', marginBottom: 24,
            fontSize: 24, color: color, textAlign: 'center', fontWeight: 700
          }}>
            <MathRenderer text={q.math.includes('$') ? q.math : `$$${q.math}$$`} />
          </div>
        )}

        {/* Options */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 12 }}>
          {q.options.map((opt, oi) => {
            let borderColor = 'rgba(0,0,0,0.04)';
            let bgColor = '#fff';
            let textColor = 'var(--alg-text)';
            let dotColor = '#f1f5f9';

            if (answered) {
              if (oi === q.correct) {
                borderColor = 'var(--alg-teal)'; bgColor = 'rgba(16,185,129,0.05)';
                textColor = 'var(--alg-teal)'; dotColor = 'var(--alg-teal)';
              } else if (oi === selected) {
                borderColor = 'var(--alg-red)'; bgColor = 'rgba(239,68,68,0.05)';
                textColor = 'var(--alg-red)'; dotColor = 'var(--alg-red)';
              }
            } else if (selected === oi) {
              borderColor = color; bgColor = `${color}05`; dotColor = color;
            }

            return (
              <button key={oi} onClick={() => handleSelect(oi)} disabled={answered}
                style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  padding: '14px 16px', borderRadius: 12,
                  border: `2.5px solid ${borderColor}`,
                  background: bgColor, cursor: answered ? 'default' : 'pointer',
                  fontSize: 15, color: textColor, textAlign: 'left',
                  transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                  fontWeight: selected === oi ? 700 : 500,
                  boxShadow: selected === oi && !answered ? '0 4px 12px rgba(0,0,0,0.05)' : 'none'
                }}
              >
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: dotColor, flexShrink: 0, transition: 'all 0.2s' }} />
                <span style={{ fontSize: '1.1rem' }}>
                  <MathRenderer text={opt.includes('^') || opt.includes('=') || opt.includes('/') || opt.includes('×') ? (opt.includes('$') ? opt : `$${opt}$`) : opt} />
                </span>
              </button>
            );
          })}
        </div>

        {/* Explanation */}
        {answered && (
          <div style={{
            marginTop: 24, padding: '16px 20px', borderRadius: 12,
            background: 'rgba(59,130,246,0.05)', border: '1px solid rgba(59,130,246,0.1)',
            color: 'var(--alg-muted)', fontSize: 13.5, lineHeight: 1.6
          }}>
            <strong style={{ color: 'var(--alg-blue)' }}>💡 Explanation: </strong>
            <MathRenderer text={q.explanation} />
          </div>
        )}
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <button onClick={handleNext} disabled={!answered} className="alg-btn-primary"
          style={{
            padding: '12px 40px',
            background: answered ? color : '#f1f5f9',
            color: answered ? '#fff' : '#94a3b8',
            cursor: answered ? 'pointer' : 'not-allowed',
            border: 'none', borderRadius: 100, fontSize: 15, fontWeight: 800,
            boxShadow: answered ? `0 8px 20px ${color}30` : 'none'
          }}
        >
          {current + 1 >= questions.length ? 'See Final Score' : 'Next Question'}
        </button>
      </div>
    </div>
  );
}

// ─── SKILLS DATA ───────────────────────────────────────────────────────────
const SKILLS = [
  {
    id: 'order', title: 'Order & Elements', subtitle: 'Skill 1 · Foundations', icon: '📏', color: '#6366f1',
    desc: 'Identify rows, columns, elements, and order of any matrix.',
    practice: orderQuestions, assessment: orderAssessment,
    learn: {
      concept: 'Understanding order is the first step to working with matrices. Every matrix is described by its rows × columns dimensions.',
      rules: [
        { title: 'Order Convention', f: 'm × n', d: 'A matrix with m rows and n columns has order m × n. Rows always come first.', ex: 'A 2×3 matrix has 2 rows and 3 columns', tip: 'RC = Rows × Columns (like Remote Control)!' },
        { title: 'Element Notation', f: 'a_{ij}', d: 'Element aᵢⱼ is in row i and column j. The first subscript is always the row.', ex: 'a₂₃ means row 2, column 3', tip: 'Think "Row then Column" — always in that order!' },
        { title: 'Total Elements', f: 'm × n', d: 'A matrix of order m × n has exactly m × n elements.', ex: 'A 3×4 matrix has 12 elements', tip: 'Just multiply rows by columns!' },
        { title: 'Possible Orders', f: 'Factor pairs', d: 'A number of elements can have multiple possible orders based on factor pairs.', ex: '12 elements: 1×12, 2×6, 3×4, 4×3, 6×2, 12×1', tip: 'List all factor pairs of the total to find all possible orders.' },
      ]
    }
  },
  {
    id: 'types', title: 'Types of Matrices', subtitle: 'Skill 2 · Classification', icon: '⬜', color: '#0891b2',
    desc: 'Classify matrices: square, diagonal, identity, symmetric, and more.',
    practice: typesQuestions, assessment: typesAssessment,
    learn: {
      concept: 'Matrices come in many types based on their structure and the arrangement of their elements.',
      rules: [
        { title: 'Square Matrix', f: 'n × n', d: 'A matrix where rows equals columns. Only square matrices can have determinants and inverses.', ex: '[[1,2],[3,4]] is 2×2 square', tip: 'Equal dimensions = square, like a perfect square shape!' },
        { title: 'Diagonal Matrix', f: 'a_{ij} = 0, i ≠ j', d: 'A square matrix where all off-diagonal elements are zero.', ex: '[[5,0],[0,3]] is diagonal', tip: 'Everything off the diagonal is wiped to zero!' },
        { title: 'Identity Matrix', f: 'I_n', d: 'A diagonal matrix with all 1s on the diagonal. The multiplicative identity for matrices.', ex: 'I₂ = [[1,0],[0,1]]', tip: 'The "1" of matrix world — multiplying by it changes nothing!' },
        { title: 'Symmetric Matrix', f: 'A = Aᵀ', d: 'A matrix equal to its transpose. It is symmetric about the main diagonal.', ex: '[[1,2],[2,3]] is symmetric', tip: 'Mirror image across the diagonal!' },
        { title: 'Skew-Symmetric', f: 'A = -Aᵀ', d: 'A matrix that equals the negative of its transpose. All diagonal elements must be 0.', ex: '[[0,2],[-2,0]] is skew-symmetric', tip: 'Diagonal = 0, and signs flip across the diagonal!' },
      ]
    }
  },
  {
    id: 'operations', title: 'Addition & Scalar Mult.', subtitle: 'Skill 3 · Operations', icon: '➕', color: '#f59e0b',
    desc: 'Add, subtract, and scale matrices element-wise.',
    practice: operationsQuestions, assessment: operationsAssessment,
    learn: {
      concept: 'Matrix addition and scalar multiplication are element-wise operations — simple but with important rules about matching orders.',
      rules: [
        { title: 'Same Order Rule', f: 'A + B defined iff same order', d: 'You can only add/subtract matrices that have the exact same dimensions.', ex: '2×3 + 2×3 ✓, 2×3 + 3×2 ✗', tip: 'Always check order first!' },
        { title: 'Element-wise Add', f: '(A+B)_{ij} = a_{ij} + b_{ij}', d: 'Add corresponding elements in the same position.', ex: '[[1,2]] + [[3,4]] = [[4,6]]', tip: 'Match positions and add!' },
        { title: 'Scalar Multiply', f: '(kA)_{ij} = k · a_{ij}', d: 'Multiply every element by the scalar k.', ex: '3 × [[1,2]] = [[3,6]]', tip: 'The scalar visits every single element!' },
        { title: 'Properties', f: 'Commutative & Associative', d: 'A+B = B+A and (A+B)+C = A+(B+C). Zero matrix is the additive identity.', ex: 'A + O = A', tip: 'Addition is friendly — order doesn\'t matter!' },
      ]
    }
  },
  {
    id: 'multiplication', title: 'Matrix Multiplication', subtitle: 'Skill 4 · Core', icon: '✖️', color: '#ec4899',
    desc: 'Multiply matrices using dot products of rows and columns.',
    practice: multiplicationQuestions, assessment: multiplicationAssessment,
    learn: {
      concept: 'Matrix multiplication combines rows of the first matrix with columns of the second using dot products. Order matters!',
      rules: [
        { title: 'Dimension Rule', f: 'A_{m×n} · B_{n×p} = C_{m×p}', d: 'Inner dimensions must match. Result has outer dimensions.', ex: 'A₂ₓ₃ · B₃ₓ₄ = C₂ₓ₄', tip: 'Inner match, outer = result!' },
        { title: 'Dot Product', f: 'c_{ij} = Σ a_{ik}b_{kj}', d: 'Each element is the dot product of a row from A and a column from B.', ex: 'Row [1,2,3] · Col [4,5,6] = 1·4+2·5+3·6 = 32', tip: 'Multiply matching pairs, then sum!' },
        { title: 'Non-Commutative', f: 'AB ≠ BA', d: 'Matrix multiplication is NOT commutative. Order matters!', ex: 'AB and BA usually give different results', tip: 'Never swap the order unless proven equal!' },
        { title: 'Associative', f: 'A(BC) = (AB)C', d: 'Grouping doesn\'t matter, but order does.', ex: 'You can compute BC first or AB first', tip: 'Group however you like, just keep the sequence!' },
      ]
    }
  },
  {
    id: 'transpose', title: 'Transpose Properties', subtitle: 'Skill 5 · Transforms', icon: '🔄', color: '#7c3aed',
    desc: 'Master transpose operations, symmetric and skew-symmetric decomposition.',
    practice: transposeQuestions, assessment: transposeAssessment,
    learn: {
      concept: 'The transpose flips a matrix over its main diagonal, swapping rows and columns. It has elegant properties.',
      rules: [
        { title: 'Basic Transpose', f: '(Aᵀ)_{ij} = a_{ji}', d: 'Rows become columns and columns become rows.', ex: '[[1,2],[3,4]]ᵀ = [[1,3],[2,4]]', tip: 'Flip over the diagonal!' },
        { title: 'Double Transpose', f: '(Aᵀ)ᵀ = A', d: 'Transposing twice gives back the original matrix.', ex: 'Flip twice = back to start', tip: 'Two flips cancel out!' },
        { title: 'Product Transpose', f: '(AB)ᵀ = BᵀAᵀ', d: 'Reverse the order and transpose each factor.', ex: '(ABC)ᵀ = CᵀBᵀAᵀ', tip: 'Shoe-sock rule: last on, first off!' },
        { title: 'Decomposition', f: 'A = ½(A+Aᵀ) + ½(A-Aᵀ)', d: 'Any square matrix = symmetric part + skew-symmetric part.', ex: 'Works for every square matrix!', tip: 'Split any matrix into a symmetric + skew-symmetric pair!' },
      ]
    }
  },
  {
    id: 'inverse', title: 'Invertible Matrices', subtitle: 'Skill 6 · Advanced', icon: '🔓', color: '#059669',
    desc: 'Determine invertibility, properties of matrix inverses.',
    practice: inverseQuestions, assessment: inverseAssessment,
    learn: {
      concept: 'A matrix inverse "undoes" multiplication. Only square matrices with non-zero determinants are invertible.',
      rules: [
        { title: 'Existence', f: '|A| ≠ 0 ⟹ A⁻¹ exists', d: 'A square matrix is invertible if and only if its determinant is non-zero.', ex: '|A| = 5 → A is invertible', tip: 'Always check the determinant first!' },
        { title: 'Definition', f: 'AA⁻¹ = A⁻¹A = I', d: 'The inverse undoes multiplication, yielding the identity matrix.', ex: 'A × A⁻¹ = I', tip: 'Like multiplying by 1/x to get 1!' },
        { title: 'Product Inverse', f: '(AB)⁻¹ = B⁻¹A⁻¹', d: 'Inverse of a product reverses the order (shoe-sock rule again).', ex: 'Undo B first, then undo A', tip: 'Same reversal pattern as transpose!' },
        { title: 'Transpose-Inverse', f: '(Aᵀ)⁻¹ = (A⁻¹)ᵀ', d: 'Transpose and inverse operations commute — you can do them in any order.', ex: 'Transpose first or invert first — same result', tip: 'These two operations are best friends!' },
      ]
    }
  },
];

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────
export default function MatricesSkills() {
  const navigate = useNavigate();
  const [view, setView] = useState('list');
  const [activeSkill, setActiveSkill] = useState(null);
  const [selectedLearnIdx, setSelectedLearnIdx] = useState(0);

  const skill = activeSkill !== null ? SKILLS[activeSkill] : null;

  if (view !== 'list' && skill) {
    return (
      <div className="skills-page" style={{ background: '#f8fafc', minHeight: '100vh', padding: '20px 0 60px' }}>
        <nav className="intro-nav">
          <button className="intro-nav-back" onClick={() => { setView('list'); setSelectedLearnIdx(0); }}>← Back to Skills</button>
          <div className="intro-nav-links">
            <button className="intro-nav-link" onClick={() => navigate('/senior/grade/12/matrices/introduction')}>🌟 Intro</button>
            <button className="intro-nav-link" onClick={() => navigate('/senior/grade/12/matrices/terminology')}>📖 Terminology</button>
            <button className="intro-nav-link intro-nav-link--active">🎯 Skills</button>
          </div>
        </nav>
        <div style={{ padding: '0 24px' }}>
          {view === 'learn' ? (
            <div className="alg-lexicon-container" style={{ maxWidth: 1100, margin: '0 auto' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24, justifyContent: 'center' }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: `${skill.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>{skill.icon}</div>
                <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '2.5rem', fontWeight: 900, color: 'var(--alg-text)', margin: 0 }}>Learn: {skill.title}</h1>
              </div>

              <div className="alg-learn-grid">
                {/* Side Selector */}
                <aside className="alg-learn-sidebar" style={{
                  background: 'rgba(255,255,255,0.7)', padding: '12px', borderRadius: 20,
                  border: '1px solid rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', gap: 8,
                  maxHeight: '65vh', overflowY: 'auto'
                }}>
                  {skill.learn.rules.map((rule, ri) => (
                    <button key={ri} onClick={() => setSelectedLearnIdx(ri)}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', borderRadius: 12,
                        border: '1px solid', borderColor: selectedLearnIdx === ri ? skill.color : 'rgba(0,0,0,0.05)',
                        background: selectedLearnIdx === ri ? skill.color : '#fff',
                        color: selectedLearnIdx === ri ? '#fff' : 'var(--alg-text)',
                        transition: 'all 0.2s', cursor: 'pointer', textAlign: 'left'
                      }}
                    >
                      <div style={{
                        width: 24, height: 24, borderRadius: 6,
                        background: selectedLearnIdx === ri ? 'rgba(255,255,255,0.2)' : `${skill.color}15`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 14, fontWeight: 900, flexShrink: 0
                      }}>{ri + 1}</div>
                      <span style={{ fontWeight: 700, fontSize: 15 }}>{rule.title}</span>
                    </button>
                  ))}
                </aside>

                {/* Detailed Window */}
                <main className="details-window-anim alg-details-window" key={selectedLearnIdx} style={{
                  background: '#fff', borderRadius: 20, padding: '24px 32px', border: `2px solid ${skill.color}15`,
                  boxShadow: '0 8px 30px rgba(0,0,0,0.03)', minHeight: 400
                }}>
                  <div className="alg-learn-header-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
                    <div>
                      <h3 style={{ margin: '0 0 4px', fontSize: 28, fontWeight: 900, color: skill.color }}>{skill.learn.rules[selectedLearnIdx].title}</h3>
                      <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--alg-muted)' }}>RULE {selectedLearnIdx + 1} OF {skill.learn.rules.length}</div>
                    </div>
                    <div style={{ fontSize: 32 }}>{skill.icon}</div>
                  </div>

                  {/* Core Formula Box */}
                  <div style={{ background: `${skill.color}05`, padding: '24px', borderRadius: 20, border: `2px solid ${skill.color}15`, marginBottom: 32, textAlign: 'center' }}>
                    <div className="formula-text" style={{ fontSize: 42, fontWeight: 800, color: skill.color }}>
                      <MathRenderer text={`$$${skill.learn.rules[selectedLearnIdx].f}$$`} />
                    </div>
                  </div>

                  <div className="alg-rule-split" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                    <div>
                      <h4 style={{ textTransform: 'uppercase', fontSize: 12, letterSpacing: 1, color: 'var(--alg-muted)', marginBottom: 10 }}>Explanation</h4>
                      <p style={{ fontSize: 17, lineHeight: 1.6, margin: 0, color: 'var(--alg-text)' }}>{skill.learn.rules[selectedLearnIdx].d}</p>

                      <div style={{ marginTop: 24, background: 'rgba(20,184,166,0.05)', padding: '16px', borderRadius: 16, border: '1px solid rgba(20,184,166,0.1)' }}>
                        <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, color: 'var(--alg-muted)' }}>
                          <span style={{ fontWeight: 800, color: 'var(--alg-teal)' }}>🛡️ Survival Tip: </span>
                          {skill.learn.rules[selectedLearnIdx].tip}
                        </p>
                      </div>
                    </div>
                    <div>
                      <h4 style={{ textTransform: 'uppercase', fontSize: 12, letterSpacing: 1, color: skill.color, marginBottom: 10 }}>Practical Example</h4>
                      <div style={{ background: '#f8fafc', padding: 24, borderRadius: 20, border: '1px solid rgba(0,0,0,0.03)' }}>
                        <div style={{ fontSize: 22, fontWeight: 700, color: 'var(--alg-text)' }}>
                          <MathRenderer text={skill.learn.rules[selectedLearnIdx].ex.includes('$') ? skill.learn.rules[selectedLearnIdx].ex : `$$${skill.learn.rules[selectedLearnIdx].ex}$$`} />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Footnotes */}
                  <div className="alg-learn-footer" style={{ marginTop: 40, display: 'flex', gap: 16 }}>
                    <button className="alg-btn-primary" onClick={() => setView('practice')} style={{ padding: '14px 32px', background: skill.color, fontSize: 15 }}>Mastered this? Try Practice →</button>
                    <button className="alg-btn-secondary" onClick={() => {
                      const nextIdx = (selectedLearnIdx + 1) % skill.learn.rules.length;
                      setSelectedLearnIdx(nextIdx);
                    }} style={{ padding: '14px 32px', fontSize: 15 }}>Next: {skill.learn.rules[(selectedLearnIdx + 1) % skill.learn.rules.length].title}</button>
                  </div>
                </main>
              </div>
            </div>
          ) : (
            <QuizEngine
              questions={view === 'practice' ? skill.practice : skill.assessment}
              title={`${view === 'practice' ? 'Practice' : 'Assessment'}: ${skill.title}`}
              onBack={() => setView('list')}
              color={skill.color}
            />
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="skills-page">
      {/* ── TOP NAV BAR ──────────────────────────────── */}
      <nav className="intro-nav">
        <button className="intro-nav-back" onClick={() => navigate('/senior/grade/12/matrices')}>
          ← Back to Matrices
        </button>
        <div className="intro-nav-links">
          <button className="intro-nav-link" onClick={() => navigate('/senior/grade/12/matrices/introduction')}>
            🌟 Introduction
          </button>
          <button className="intro-nav-link" onClick={() => navigate('/senior/grade/12/matrices/terminology')}>
            📖 Terminology
          </button>
          <button className="intro-nav-link intro-nav-link--active" onClick={() => navigate('/senior/grade/12/matrices/skills')}>
            🎯 Skills
          </button>
        </div>
      </nav>

      {/* ── MAIN CONTENT ──────────────────────────────── */}
      <div className="alg-lexicon-container" style={{ maxWidth: 1100, margin: '20px auto 40px', padding: '0 24px' }}>

        {/* Compact Heading Line */}
        <div style={{
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', textAlign: 'center', marginBottom: 32
        }}>
          <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '2.1rem', fontWeight: 900, color: 'var(--alg-text)', margin: '0 0 6px' }}>
            Matrices <span style={{ background: 'linear-gradient(135deg, var(--alg-teal), var(--alg-indigo))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Skills</span>
          </h1>
          <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--alg-muted)', letterSpacing: 0.5 }}>
            Step up from concepts to mastery with targeted practice.
          </div>
        </div>

        {/* Vertical Skills List */}
        <div className="alg-skills-list">
          {SKILLS.map((skill, idx) => (
            <div key={skill.id} className="alg-skill-card">
              {/* Skill Info */}
              <div className="alg-skill-info">
                <div className="alg-skill-icon" style={{ background: `${skill.color}15` }}>
                  {skill.icon}
                </div>
                <div>
                  <div style={{ fontSize: 10, fontWeight: 800, color: skill.color, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 2 }}>
                    {skill.subtitle}
                  </div>
                  <h3 style={{ margin: 0, fontSize: 17, fontWeight: 800, color: 'var(--alg-text)' }}>{skill.title}</h3>
                  <p style={{ margin: 0, fontSize: 12, color: 'var(--alg-muted)' }}>{skill.desc}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="alg-skill-actions">
                <button
                  onClick={() => { setActiveSkill(idx); setView('learn'); }}
                  className="alg-btn-secondary"
                  style={{ padding: '8px 16px', fontSize: 12, fontWeight: 800, whiteSpace: 'nowrap', border: '1.5px solid rgba(0,0,0,0.1)' }}
                >
                  Learn
                </button>
                <button
                  onClick={() => { setActiveSkill(idx); setView('practice'); }}
                  className="alg-btn-secondary"
                  style={{ padding: '8px 16px', fontSize: 12, fontWeight: 800, whiteSpace: 'nowrap' }}
                >
                  Practice
                </button>
                <button
                  onClick={() => { setActiveSkill(idx); setView('assessment'); }}
                  className="alg-btn-primary"
                  style={{ padding: '8px 16px', fontSize: 12, fontWeight: 800, whiteSpace: 'nowrap', background: skill.color }}
                >
                  Assess
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Final Motivation */}
        <div style={{ marginTop: 40, textAlign: 'center' }}>
          <p style={{ fontSize: 13, color: 'var(--alg-muted)', fontWeight: 600 }}>
            Done with all? You're officially a <span style={{ color: 'var(--alg-indigo)' }}>Matrix Pro!</span> 🏅
          </p>
        </div>
      </div>
    </div>
  );
}
