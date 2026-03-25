/** ── lib/curriculumIds.js ───────────────────────────────────────────────────
 * Canonical registry of v4 curriculum UUIDs for Skill100.ai.
 *
 * This file acts as the single source of truth for the frontend.
 * Ensure these match the entries in 'supabase/seeds/curriculum.sql'.
 *
 * Structure:
 *   - 'a' prefix: Academic (official curriculum path)
 *   - 'm' prefix: Modules (Math-Branches, IDM, etc.)
 * ────────────────────────────────────────────────────────────────────────── */

export const NODE_IDS = {
  // ── 0. SUBJECTS ───────────────────────────────────────────────────────────
  math: 'a1000000-0000-0000-0000-000000000001',

  // ── 1. GRADES ─────────────────────────────────────────────────────────────
  grade8: 'a2000000-0000-0000-0000-000000000008',
  grade9: 'a2000000-0000-0000-0000-000000000009',

  // ── 2. GRADE 8 CHAPTERS ───────────────────────────────────────────────────
  g8MathRationalNumbers:   'a3000000-0000-0000-0000-000000000001',
  g8MathLinearEquations:   'a3000000-0000-0000-0000-000000000002',
  g8MathSquaresRoots:      'a3000000-0000-0000-0000-000000000003',
  g8MathCubesRoots:        'a3000000-0000-0000-0000-000000000004',
  g8MathExponentsPowers:   'a3000000-0000-0000-0000-000000000005',
  g8MathComparingQuantities:'a3000000-0000-0000-0000-000000000006',
  g8MathAlgebraicIdentities:'a3000000-0000-0000-0000-000000000007',
  g8MathMensuration:       'a3000000-0000-0000-0000-000000000008',
  g8MathFactorisation:     'a3000000-0000-0000-0000-000000000009',
  g8MathProportions:       'a3000000-0000-0000-0000-000000000010',
  g8MathGraphs:            'a3000000-0000-0000-0000-000000000011',
  g8MathDataHandling:      'a3000000-0000-0000-0000-000000000012',

  // ── 3. GRADE 8 SKILLS (Representative selection) ──────────────────────────
  
  // Rational Numbers
  g8MathRationalAssociativity:   'a4000000-0000-0000-0000-000000010001',
  g8MathRationalDistributivity:  'a4000000-0000-0000-0000-000000010002',
  
  // Linear Equations
  g8MathLinearSolving:           'a4000000-0000-0000-0000-000000020001',
  g8MathLinearWordProblems:      'a4000000-0000-0000-0000-000000020002',

  // Exponents & Powers
  g8MathExponentsLaws:           'a4000000-0000-0000-0000-000000050001',
  g8MathExponentsStandardForm:   'a4000000-0000-0000-0000-000000050002',

  // Comparing Quantities
  g8MathComparingPercentages:    'a4000000-0000-0000-0000-000000060001',
  g8MathComparingProfitLoss:     'a4000000-0000-0000-0000-000000060002',
  g8MathComparingSimpleInterest: 'a4000000-0000-0000-0000-000000060003',
  g8MathComparingCompoundInterest:'a4000000-0000-0000-0000-000000060004',

  // ── 4. MATH-BRANCHES MODULE (Independent) ─────────────────────────────────
  mathBranchAlgebra:             'f1000000-0000-0000-0000-000000000001',

  // Algebra Hub Skills
  mathBranchAlgebraExponents:    'f2000000-0000-0000-0000-000000000001',
  mathBranchAlgebraLikeTerms:    'f2000000-0000-0000-0000-000000000002',
  mathBranchAlgebraExpressions:  'f2000000-0000-0000-0000-000000000003',
  mathBranchAlgebraSolving:      'f2000000-0000-0000-0000-000000000004',
  mathBranchAlgebraSubject:      'f2000000-0000-0000-0000-000000000005',
  mathBranchAlgebraWordProblems: 'f2000000-0000-0000-0000-000000000006',
  mathBranchAlgebraRealLife:     'f2000000-0000-0000-0000-000000000007',
  mathBranchAlgebraTerminologyQuiz: 'f2000000-0000-0000-0000-000000000010',

  // Subskills for mathBranchAlgebraExponents
  mathBranchAlgebraExponentsProductLaw:     'f3000000-0000-0000-0000-000000000001',
  mathBranchAlgebraExponentsQuotientLaw:    'f3000000-0000-0000-0000-000000000002',
  mathBranchAlgebraExponentsPowerLaw:       'f3000000-0000-0000-0000-000000000003',
  mathBranchAlgebraExponentsPowerOfProduct: 'f3000000-0000-0000-0000-000000000004',
  mathBranchAlgebraExponentsPowerOfQuotient:'f3000000-0000-0000-0000-000000000005',
  mathBranchAlgebraExponentsZeroLaw:        'f3000000-0000-0000-0000-000000000006',
  mathBranchAlgebraExponentsIdentityLaw:    'f3000000-0000-0000-0000-000000000007',
  mathBranchAlgebraExponentsNegativeLaw:    'f3000000-0000-0000-0000-000000000008',
  mathBranchAlgebraExponentsFractionalLaw:  'f3000000-0000-0000-0000-000000000009',
  mathBranchAlgebraExponentsStandardForm:   'f3000000-0000-0000-0000-000000000010',
  mathBranchAlgebraExponentsComparing:      'f3000000-0000-0000-0000-000000000011',
};

/**
 * Slug-to-ID mapping to simplify integration in generic engines.
 */
export const SLUG_TO_NODE_ID = {
  // Hub Slugs
  'math-branch-algebra':                NODE_IDS.mathBranchAlgebra,
  'math-branch-algebra-exponents':      NODE_IDS.mathBranchAlgebraExponents,
  'math-branch-algebra-solving':        NODE_IDS.mathBranchAlgebraSolving,
  'math-branch-algebra-word-problems':  NODE_IDS.mathBranchAlgebraWordProblems,
  
  // Grade 8 Slugs (Chapters)
  'g8-math-rational-numbers':           NODE_IDS.g8MathRationalNumbers,
  'g8-math-linear-equations':           NODE_IDS.g8MathLinearEquations,
  'g8-math-exponents':                  NODE_IDS.g8MathExponentsPowers,

  // Grade 8 Slugs (Skills)
  'g8-math-linear-solving':             NODE_IDS.g8MathLinearSolving,
  'g8-math-linear-word-problems':       NODE_IDS.g8MathLinearWordProblems,
};
