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
  grade10: 'a2000000-0000-0000-0000-000000000010',

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
  // ── 5. NEW GRADE-BASED TOPICS (v4) ───────────────────────────────────────
  
  // Grade 10 Science: Chemical Reactions
  g10ScienceChemicalReactions:          'b3101001-0000-0000-0000-000000000001',
  g10ScienceChemicalEquations:         'b4101001-0001-0000-0000-000000000000',
  g10ScienceChemicalTypes:             'b4101001-0002-0000-0000-000000000000',
  g10ScienceChemicalOxidation:         'b4101001-0003-0000-0000-000000000000',
  g10ScienceChemicalTerminologyQuiz:   'b4101001-0010-0000-0000-000000000000',
  
  // Grade 6 Science: Wonderful World of Science
  g6ScienceWonderfulWorld:      'b3061001-0000-0000-0000-000000000001',
  
  // Grade 5 Science: Water
  g5ScienceWater:               'b3051001-0000-0000-0000-000000000001',
  
  // Grade 8 Science: Investigative Science
  g8ScienceInvestigative:       'b3081001-0000-0000-0000-000000000001',
  
  // Grade 3 EVS
  g3EvsOurFamilies:             'b3031001-0000-0000-0000-000000000001',
  
  // Grade 4 EVS
  g4EvsOurCommunity:            'b3041001-0000-0000-0000-000000000001',
  
  // Grade 3 Math: Time Goes On
  g3MathTimeGoesOn:             'a3031001-0000-0000-0000-000000000001',
  g3MathTimeGoesOnReadingCalendar:   'a4031001-0001-0000-0000-000000000000',
  g3MathTimeGoesOnFuturePastDates:   'a4031001-0002-0000-0000-000000000000',
  g3MathTimeGoesOnConstructingCalendar:'a4031001-0003-0000-0000-000000000000',
  g3MathTimeGoesOnMonthsDaysYear:    'a4031001-0004-0000-0000-000000000000',
  g3MathTimeGoesOnComparingCalendars:'a4031001-0005-0000-0000-000000000000',
  g3MathTimeGoesOnAgeProblems:       'a4031001-0006-0000-0000-000000000000',
  g3MathTimeGoesOnReadingDates:      'a4031001-0007-0000-0000-000000000000',
  g3MathTimeGoesOnAgeDuration:       'a4031001-0008-0000-0000-000000000000',
  g3MathTimeGoesOnClockTime:         'a4031001-0009-0000-0000-000000000000',
  g3MathTimeGoesOnTimeDurations:     'a4031001-0010-0000-0000-000000000000',
  
  // Grade 6 Math: Patterns
  g6MathPatterns:               'a3061001-0000-0000-0000-000000000001',
  g6MathPatternsIntro:          'a4061001-0001-0000-0000-000000000000',
  g6MathPatternsTerminology:    'a4061001-0002-0000-0000-000000000000',
  g6MathPatternsSkills:         'a4061001-0003-0000-0000-000000000000',

  // Grade 3 EVS Skills
  g3EvsOurFamiliesRoles:        'b4031001-0001-0000-0000-000000000000',
  g3EvsOurFamiliesPlaying:      'b4031001-0002-0000-0000-000000000000',
  g3EvsOurFamiliesHelping:      'b4031001-0003-0000-0000-000000000000',
  g3EvsOurFamiliesAnimals:      'b4031001-0004-0000-0000-000000000000',

  // Grade 4 EVS Skills
  g4EvsOurCommunityPlaces:     'b4041001-0001-0000-0000-000000000000',
  g4EvsOurCommunityWork:       'b4041001-0002-0000-0000-000000000000',
  g4EvsOurCommunityFestivals:  'b4041001-0003-0000-0000-000000000000',
  g4EvsOurCommunityTeamwork:   'b4041001-0004-0000-0000-000000000000',

  // Grade 5 Science: Water Essence of Life
  g5ScienceWaterSources:        'b4051001-0001-0000-0000-000000000000',
  g5ScienceWaterCycle:          'b4051001-0002-0000-0000-000000000000',
  g5ScienceLifeWater:           'b4051001-0003-0000-0000-000000000000',
  g5ScienceWaterTerminologyQuiz:'b4051001-0010-0000-0000-000000000000',

  // Grade 6 Science: Wonderful World of Science
  g6ScienceWonderfulWorldWhatIsScience:    'b4061001-0001-0000-0000-000000000000',
  g6ScienceWonderfulWorldMethod:           'b4061001-0002-0000-0000-000000000000',
  g6ScienceWonderfulWorldDailyLife:        'b4061001-0003-0000-0000-000000000000',
  g6ScienceWonderfulWorldTerminologyQuiz:  'b4061001-0010-0000-0000-000000000000',

  // Grade 7 Science: Ever-Evolving Science
  g7ScienceEverEvolving:                   'b3071001-0000-0000-0000-000000000001',
  g7ScienceEverEvolvingProcess:            'b4071001-0001-0000-0000-000000000000',
  g7ScienceEverEvolvingMaterials:          'b4071001-0002-0000-0000-000000000000',
  g7ScienceEverEvolvingChanges:            'b4071001-0003-0000-0000-000000000000',
  g7ScienceEverEvolvingTerminologyQuiz:    'b4071001-0010-0000-0000-000000000000',

  // Grade 8 Science: Exploring Investigative Science
  g8ScienceInvestigativeScience:           'b3081001-0000-0000-0000-000000000001',
  g8ScienceInvestigativeMethod:            'b4081001-0001-0000-0000-000000000000',
  g8ScienceInvestigativeMeasurements:      'b4081001-0002-0000-0000-000000000000',
  g8ScienceInvestigativeAnalysis:          'b4081001-0003-0000-0000-000000000000',
  g8ScienceInvestigativeTerminologyQuiz:   'b4081001-0010-0000-0000-000000000000',
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
  
  // Grade-based Slugs
  'g10-science-chemical-reactions':    NODE_IDS.g10ScienceChemicalReactions,
  'g10-science-cr-equations':          NODE_IDS.g10ScienceChemicalEquations,
  'g10-science-cr-types':              NODE_IDS.g10ScienceChemicalTypes,
  'g10-science-cr-oxidation':          NODE_IDS.g10ScienceChemicalOxidation,
  'g10-science-cr-terminology':        NODE_IDS.g10ScienceChemicalTerminologyQuiz,
  'g6-science-wonderful-world':         NODE_IDS.g6ScienceWonderfulWorld,
  'g5-science-water-essence':           NODE_IDS.g5ScienceWater,
  'g8-science-investigative':          NODE_IDS.g8ScienceInvestigative,
  'g3-math-time-goes-on':               NODE_IDS.g3MathTimeGoesOn,
  'g6-math-patterns':                  NODE_IDS.g6MathPatterns,
  'g3-science-our-families':           NODE_IDS.g3EvsOurFamilies,
  'g4-science-our-community':          NODE_IDS.g4EvsOurCommunity,

  // Grade 8 Slugs (Chapters)
  'g8-math-rational-numbers':           NODE_IDS.g8MathRationalNumbers,
  'g8-math-linear-equations':           NODE_IDS.g8MathLinearEquations,
  'g8-math-exponents':                  NODE_IDS.g8MathExponentsPowers,

  // Grade 8 Slugs (Skills)
  'g8-math-linear-solving':             NODE_IDS.g8MathLinearSolving,
  'g8-math-linear-word-problems':       NODE_IDS.g8MathLinearWordProblems,

  // Grade 3 EVS Slugs (Skills)
  'g3-science-family-roles':            NODE_IDS.g3EvsOurFamiliesRoles,
  'g3-science-playing-games':           NODE_IDS.g3EvsOurFamiliesPlaying,
  'g3-science-helping-out':             NODE_IDS.g3EvsOurFamiliesHelping,
  'g3-science-animals-nature':          NODE_IDS.g3EvsOurFamiliesAnimals,

  // Grade 4 EVS Slugs (Skills)
  'g4-science-community-places':        NODE_IDS.g4EvsOurCommunityPlaces,
  'g4-science-people-work':             NODE_IDS.g4EvsOurCommunityWork,
  'g4-science-festivals':               NODE_IDS.g4EvsOurCommunityFestivals,
  'g4-science-teamwork':                NODE_IDS.g4EvsOurCommunityTeamwork,

  // Grade 5 Science Slugs (Skills)
  'g5-science-water-sources':           NODE_IDS.g5ScienceWaterSources,
  'g5-science-water-cycle':             NODE_IDS.g5ScienceWaterCycle,
  'g5-science-water-life-water':        NODE_IDS.g5ScienceLifeWater,
  'g5-science-water-terminology':       NODE_IDS.g5ScienceWaterTerminologyQuiz,

  // Grade 6 Science Slugs
  'g6-science-wws-what-is-science':     NODE_IDS.g6ScienceWonderfulWorldWhatIsScience,
  'g6-science-wws-method':             NODE_IDS.g6ScienceWonderfulWorldMethod,
  'g6-science-wws-daily-life':          NODE_IDS.g6ScienceWonderfulWorldDailyLife,
  'g6-science-wws-terminology':         NODE_IDS.g6ScienceWonderfulWorldTerminologyQuiz,

  // Grade 7 Science Slugs
  'ever-evolving-science':              NODE_IDS.g7ScienceEverEvolving,
  'g7-science-ees-process':             NODE_IDS.g7ScienceEverEvolvingProcess,
  'g7-science-ees-materials':           NODE_IDS.g7ScienceEverEvolvingMaterials,
  'g7-science-ees-changes':             NODE_IDS.g7ScienceEverEvolvingChanges,
  'g7-science-ees-terminology':         NODE_IDS.g7ScienceEverEvolvingTerminologyQuiz,

  // Grade 8 Science Slugs
  'exploring-investigative-science':    NODE_IDS.g8ScienceInvestigativeScience,
  'g8-science-eis-method':             NODE_IDS.g8ScienceInvestigativeMethod,
  'g8-science-eis-measurements':       NODE_IDS.g8ScienceInvestigativeMeasurements,
  'g8-science-eis-analysis':           NODE_IDS.g8ScienceInvestigativeAnalysis,
  'g8-science-eis-terminology':         NODE_IDS.g8ScienceInvestigativeTerminologyQuiz,
};
