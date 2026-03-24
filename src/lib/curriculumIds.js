// lib/curriculumIds.js
// Keep in sync with supabase/seeds/curriculum.sql (v3_ tables) and
// supabase/migrations/001_v4_tables.sql (v4_ tables).
//
// v4 UUIDs: used by useSessionLogger + AlgebraSkillsData for progress tracking.
// v4 nodes mirror the v3 structure but live in the new unified node table.

export const NODE_IDS = {
  // ── v4 Subjects ──────────────────────────────────────────────────────────
  math: 'a1000000-0000-0000-0000-000000000001',

  // ── v4 Grades ─────────────────────────────────────────────────────────────
  grade8: 'a2000000-0000-0000-0000-000000000001',
  grade9: 'a2000000-0000-0000-0000-000000000002',

  // ── v4 Chapters ───────────────────────────────────────────────────────────
  g8MathAlgebra: 'a3000000-0000-0000-0000-000000000001',

  // ── v4 Skills (no subskills — leaf nodes) ────────────────────────────────
  g8MathAlgebraLikeTerms:    'a4000000-0000-0000-0000-000000000002',
  g8MathAlgebraExpressions:  'a4000000-0000-0000-0000-000000000003',
  g8MathAlgebraSolving:      'a4000000-0000-0000-0000-000000000004',
  g8MathAlgebraSubject:      'a4000000-0000-0000-0000-000000000005',
  g8MathAlgebraWordProblems: 'a4000000-0000-0000-0000-000000000006',
  g8MathAlgebraRealLife:     'a4000000-0000-0000-0000-000000000007',

  // ── v4 Skill with subskills — Laws of Exponents ───────────────────────────
  g8MathAlgebraExponents:    'a4000000-0000-0000-0000-000000000001',

  // ── v4 Subskills (Exponent Laws) ─────────────────────────────────────────
  g8MathAlgebraExponentsProductLaw:    'a5000000-0000-0000-0000-000000000001',
  g8MathAlgebraExponentsQuotientLaw:   'a5000000-0000-0000-0000-000000000002',
  g8MathAlgebraExponentsPowerLaw:      'a5000000-0000-0000-0000-000000000003',
  g8MathAlgebraExponentsPowerOfProduct:'a5000000-0000-0000-0000-000000000004',
  g8MathAlgebraExponentsPowerOfQuotient:'a5000000-0000-0000-0000-000000000005',
  g8MathAlgebraExponentsZeroLaw:       'a5000000-0000-0000-0000-000000000006',
  g8MathAlgebraExponentsIdentityLaw:   'a5000000-0000-0000-0000-000000000007',
  g8MathAlgebraExponentsNegativeLaw:   'a5000000-0000-0000-0000-000000000008',
  g8MathAlgebraExponentsFractionalLaw: 'a5000000-0000-0000-0000-000000000009',
  g8MathAlgebraExponentsStandardForm:  'a5000000-0000-0000-0000-000000000010',
  g8MathAlgebraExponentsComparing:     'a5000000-0000-0000-0000-000000000011',
};

// Slug → NODE_ID lookup (used by useSessionLogger)
export const SLUG_TO_NODE_ID = {
  'g8-math-algebra':                           NODE_IDS.g8MathAlgebra,
  'g8-math-algebra-exponents':                 NODE_IDS.g8MathAlgebraExponents,
  'g8-math-algebra-like-terms':                NODE_IDS.g8MathAlgebraLikeTerms,
  'g8-math-algebra-expressions':               NODE_IDS.g8MathAlgebraExpressions,
  'g8-math-algebra-solving':                   NODE_IDS.g8MathAlgebraSolving,
  'g8-math-algebra-subject':                   NODE_IDS.g8MathAlgebraSubject,
  'g8-math-algebra-word-problems':             NODE_IDS.g8MathAlgebraWordProblems,
  'g8-math-algebra-real-life':                 NODE_IDS.g8MathAlgebraRealLife,
  'g8-math-algebra-exponents-product-law':     NODE_IDS.g8MathAlgebraExponentsProductLaw,
  'g8-math-algebra-exponents-quotient-law':    NODE_IDS.g8MathAlgebraExponentsQuotientLaw,
  'g8-math-algebra-exponents-power-law':       NODE_IDS.g8MathAlgebraExponentsPowerLaw,
  'g8-math-algebra-exponents-power-of-product':NODE_IDS.g8MathAlgebraExponentsPowerOfProduct,
  'g8-math-algebra-exponents-power-of-quotient':NODE_IDS.g8MathAlgebraExponentsPowerOfQuotient,
  'g8-math-algebra-exponents-zero-law':        NODE_IDS.g8MathAlgebraExponentsZeroLaw,
  'g8-math-algebra-exponents-identity-law':    NODE_IDS.g8MathAlgebraExponentsIdentityLaw,
  'g8-math-algebra-exponents-negative-law':    NODE_IDS.g8MathAlgebraExponentsNegativeLaw,
  'g8-math-algebra-exponents-fractional-law':  NODE_IDS.g8MathAlgebraExponentsFractionalLaw,
  'g8-math-algebra-exponents-standard-form':   NODE_IDS.g8MathAlgebraExponentsStandardForm,
  'g8-math-algebra-exponents-comparing':      NODE_IDS.g8MathAlgebraExponentsComparing,
};
