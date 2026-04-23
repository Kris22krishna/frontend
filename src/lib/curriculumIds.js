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
  grade1:  'a2000000-0000-0000-0000-000000000001',
  grade2:  'a2000000-0000-0000-0000-000000000002',
  grade3:  'a2000000-0000-0000-0000-000000000003',
  grade4:  'a2000000-0000-0000-0000-000000000004',
  grade5:  'a2000000-0000-0000-0000-000000000005',
  grade6:  'a2000000-0000-0000-0000-000000000006',
  grade7:  'a2000000-0000-0000-0000-000000000007',
  grade8:  'a2000000-0000-0000-0000-000000000008',
  grade9:  'a2000000-0000-0000-0000-000000000009',
  grade10: 'a2000000-0000-0000-0000-000000000010',
  grade11: 'a2000000-0000-0000-0000-000000000011',

  // ── GRADE 4: ELEPHANTS, TIGERS AND LEOPARDS (CHAPTER 3) ───────────────────
  g4MathElephantsChapter:          'a3041003-0000-0000-0000-000000000001',
  g4MathETLNimGame:                'a4041003-0001-0000-0000-000000000000',
  g4MathETLNumberGridPatterns:     'a4041003-0002-0000-0000-000000000000',
  g4MathETLMagicMirrorNumbers:     'a4041003-0003-0000-0000-000000000000',
  g4MathETLForestRestorationAdd:   'a4041003-0004-0000-0000-000000000000',
  g4MathETLJourneySums:            'a4041003-0005-0000-0000-000000000000',
  g4MathETLEstimationBeforeAdd:    'a4041003-0006-0000-0000-000000000000',
  g4MathETLRiverCrossingSubtract:  'a4041003-0007-0000-0000-000000000000',
  g4MathETLHiddenPathDifference:   'a4041003-0008-0000-0000-000000000000',
  g4MathETLEstimationBeforeSub:    'a4041003-0009-0000-0000-000000000000',
  g4MathETLBalanceScaleEstimation: 'a4041003-0010-0000-0000-000000000000',
  g4MathETLQuickCompare:           'a4041003-0011-0000-0000-000000000000',
  g4MathETLSmartShortcuts:         'a4041003-0012-0000-0000-000000000000',
  g4MathETLCompensationStrategy:   'a4041003-0013-0000-0000-000000000000',
  g4MathETLChapterTest:            'a4041003-0014-0000-0000-000000000000',

  // ── GRADE 4: DATA HANDLING (CHAPTER 14) ───────────────────────────────────
  g4MathDataHandling:                'a3041014-0000-0000-0000-000000000001',
  g4MathDHCollectingOrganizing:      'a4041014-0001-0000-0000-000000000000',
  g4MathDHReadingCreatingTables:     'a4041014-0002-0000-0000-000000000000',
  g4MathDHPictographReading:         'a4041014-0003-0000-0000-000000000000',
  g4MathDHDataInterpretation:        'a4041014-0004-0000-0000-000000000000',

  // ── GRADE 4: FUN WITH SYMMETRY (CHAPTER 6) ─────────────────────────────────
  g4MathFunWithSymmetry:                   'a3041006-0000-0000-0000-000000000001',
  g4MathFWSIdentifyLineOfSymmetry:         'a4041006-0001-0000-0000-000000000000',
  g4MathFWSDrawLineOfSymmetry:             'a4041006-0002-0000-0000-000000000000',
  g4MathFWSPaperFoldSymmetry:              'a4041006-0003-0000-0000-000000000000',
  g4MathFWSMirrorImageShapes:              'a4041006-0004-0000-0000-000000000000',
  g4MathFWSCompleteHalfDesign:             'a4041006-0005-0000-0000-000000000000',
  g4MathFWSSymmetryOnDotGrid:              'a4041006-0006-0000-0000-000000000000',
  g4MathFWSLinesOfSymmetryInPolygons:      'a4041006-0007-0000-0000-000000000000',
  g4MathFWSMirrorSymmetricCharacters:      'a4041006-0008-0000-0000-000000000000',
  g4MathFWSIdentifyRepeatingTile:          'a4041006-0009-0000-0000-000000000000',
  g4MathFWSCreateTilingWithoutGaps:        'a4041006-0010-0000-0000-000000000000',
  g4MathFWSClassifySymmetricalObjects:     'a4041006-0011-0000-0000-000000000000',
  g4MathFWSChapterTest:                    'a4041006-0012-0000-0000-000000000000',

  // ── GRADE 4: EQUAL GROUPS (CHAPTER 11) ─────────────────────────────────────
  g4MathEqualGroups:                      'a3041011-0000-0000-0000-000000000001',
  g4MathEGJumpBasedMultiples:             'a4041011-0001-0000-0000-000000000000',
  g4MathEGCommonMultiplesFromJumps:       'a4041011-0002-0000-0000-000000000000',
  g4MathEGGroupSizeAndNumberOfGroups:     'a4041011-0003-0000-0000-000000000000',
  g4MathEGArraysRowsAndColumns:           'a4041011-0004-0000-0000-000000000000',
  g4MathEGDoublingNumbers:                'a4041011-0005-0000-0000-000000000000',
  g4MathEGDoublingOnesDigitPatterns:      'a4041011-0006-0000-0000-000000000000',
  g4MathEGMultiplyUsingTens:              'a4041011-0007-0000-0000-000000000000',
  g4MathEGMultiplyUsingHundreds:          'a4041011-0008-0000-0000-000000000000',
  g4MathEGBreakApartMultiplication:       'a4041011-0009-0000-0000-000000000000',
  g4MathEGEqualGroupsStoryProblems:       'a4041011-0010-0000-0000-000000000000',
  g4MathEGDivisionByPartialGroups:        'a4041011-0011-0000-0000-000000000000',
  g4MathEGDivisionWithRemainders:         'a4041011-0012-0000-0000-000000000000',
  g4MathEGDivideUsingPatterns:            'a4041011-0013-0000-0000-000000000000',
  g4MathEGEqualSharingDivision:           'a4041011-0014-0000-0000-000000000000',
  g4MathEGEqualGroupsMixedWordProblems:   'a4041011-0015-0000-0000-000000000000',
  g4MathEGAlwaysSometimesNever:           'a4041011-0016-0000-0000-000000000000',
  g4MathEGFindTheMistake:                 'a4041011-0017-0000-0000-000000000000',
  g4MathEGCreateYourOwn:                  'a4041011-0018-0000-0000-000000000000',
  g4MathEGChapterTest:                    'a4041011-0019-0000-0000-000000000000',

  // ── GRADE 4: SHAPES AROUND US (CHAPTER 5) ──────────────────────────────────
  g4MathShapesAroundUs: 'a3041005-0000-0000-0000-000000000001',
  g4MathShapesIntro:   'a4041005-0000-0000-0000-000000000000',
  g4MathShapesIdentifying3D: 'a4041005-0001-0000-0000-000000000000',
  g4MathShapesNets:    'a4041005-0002-0000-0000-000000000000',
  g4MathShapesAngles:  'a4041005-0003-0000-0000-000000000000',
  g4MathShapesCircles: 'a4041005-0004-0000-0000-000000000000',
  g4MathShapesTerminologyQuiz: 'a4041005-0010-0000-0000-000000000000',

  // ── GRADE 3: WHAT'S IN A NAME? (CHAPTER 1) ───────────────────────────────
 

  // ── GRADE 3: TOY-JOY (CHAPTER 1) ──────────────────────────────────────────
  g3MathToyJoy:        'a3031001-0000-0000-0000-000000000001',
  g3MathToyJoyIdentifying3D: 'a4031001-0001-0000-0000-000000000000',
  g3MathToyJoyCounting:      'a4031001-0002-0000-0000-000000000000',
  g3MathToyJoyPosition:      'a4031001-0003-0000-0000-000000000000',
  g3MathToyJoyProperties:    'a4031001-0004-0000-0000-000000000000',
  g3MathToyJoyClassifying:   'a4031001-0005-0000-0000-000000000000',
  g3MathToyJoyOppositeFaces: 'a4031001-0006-0000-0000-000000000000',
  g3MathToyJoyBuilding:      'a4031001-0007-0000-0000-000000000000',
  g3MathToyJoySequencing:    'a4031001-0008-0000-0000-000000000000',
  g3MathToyJoyTest:          'a4031001-0010-0000-0000-000000000000',

  // ── GRADE 2: WHAT IS LONG, WHAT IS ROUND (CHAPTER 1) ──────────────────────
  g2MathLongRound:           'a3021001-0000-0000-0000-000000000001',
  g2MathLongRoundShapes:     'a4021001-0001-0000-0000-000000000000',
  g2MathLongRoundComparison:   'a4021001-0002-0000-0000-000000000000',
  g2MathLongRoundClassification: 'a4021001-0003-0000-0000-000000000000',
  g2MathLongRoundMixed:      'a4021001-0010-0000-0000-000000000000',

  // ── GRADE 1: SHAPES AND SPACE (CHAPTER 1) ────────────────────────────────
  g1MathShapesSpace:         'a3011001-0000-0000-0000-000000000001',
  g1MathShapesSpaceIdentify: 'a4011001-0001-0000-0000-000000000000',
  g1MathShapesSpacePosition: 'a4011001-0002-0000-0000-000000000000',
  g1MathShapesSpaceSize:     'a4011001-0003-0000-0000-000000000000',
  g1MathShapesSpaceMixed:    'a4011001-0010-0000-0000-000000000000',

  // ── GRADE 1: NUMBERS 1-9 (CHAPTER 2) ────────────────────────────────────
  g1MathNumbers19:           'a3011002-0000-0000-0000-000000000001',
  g1MathNumbers19Reading:    'a4011002-0001-0000-0000-000000000000',
  g1MathNumbers19Counting:   'a4011002-0002-0000-0000-000000000000',
  g1MathNumbers19Sequence:    'a4011002-0003-0000-0000-000000000000',
  g1MathNumbers19Comparison: 'a4011002-0004-0000-0000-000000000000',
  g1MathNumbers19Mixed:      'a4011002-0010-0000-0000-000000000000',

  // ── GRADE 1: ADDITION (CHAPTER 3) ───────────────────────────────────────
  g1MathAddition:           'a3011003-0000-0000-0000-000000000001',
  g1MathAdditionVisual:     'a4011003-0001-0000-0000-000000000000',
  g1MathAdditionNumeric:    'a4011003-0002-0000-0000-000000000000',
  g1MathAdditionNumberLine: 'a4011003-0003-0000-0000-000000000000',
  g1MathAdditionMixed:      'a4011003-0010-0000-0000-000000000000',

  // ── GRADE 1: SUBTRACTION (CHAPTER 4) ────────────────────────────────────
  g1MathSubtraction:        'a3011004-0000-0000-0000-000000000001',
  g1MathSubtractionVisual:  'a4011004-0001-0000-0000-000000000000',
  g1MathSubtractionNumeric: 'a4011004-0002-0000-0000-000000000000',
  g1MathSubtractionZero:    'a4011004-0003-0000-0000-000000000000',
  g1MathSubtractionMixed:    'a4011004-0010-0000-0000-000000000000',

  // ── GRADE 1: NUMBERS 10-20 (CHAPTER 5) ──────────────────────────────────
  g1MathNumbers1020:           'a3011005-0000-0000-0000-000000000001',
  g1MathNumbers1020Counting:   'a4011005-0001-0000-0000-000000000000',
  g1MathNumbers1020TensOnes:   'a4011005-0002-0000-0000-000000000000',
  g1MathNumbers1020Comparison: 'a4011005-0003-0000-0000-000000000000',
  g1MathNumbers1020Mixed:      'a4011005-0010-0000-0000-000000000000',

  // ── GRADE 1: TIME (CHAPTER 6) ──────────────────────────────────────────
  g1MathTime:            'a3011006-0000-0000-0000-000000000001',
  g1MathTimeDayNight:    'a4011006-0001-0000-0000-000000000000',
  g1MathTimeDaysWeek:    'a4011006-0002-0000-0000-000000000000',
  g1MathTimeBeforeAfter: 'a4011006-0003-0000-0000-000000000000',
  g1MathTimeClock:       'a4011006-0004-0000-0000-000000000000',
  g1MathTimeMixed:       'a4011006-0010-0000-0000-000000000000',

  // ── GRADE 1: MEASUREMENT (CHAPTER 7) ───────────────────────────────────
  g1MathMeasurement:             'a3011007-0000-0000-0000-000000000001',
  g1MathMeasurementLengthHeight: 'a4011007-0001-0000-0000-000000000000',
  g1MathMeasurementWeight:       'a4011007-0002-0000-0000-000000000000',
  g1MathMeasurementCapacity:     'a4011007-0003-0000-0000-000000000000',
  g1MathMeasurementMixed:        'a4011007-0010-0000-0000-000000000000',

  // ── GRADE 1: NUMBERS 21-50 (CHAPTER 8) ─────────────────────────────────
  g1MathNumbers2150:           'a3011008-0000-0000-0000-000000000001',
  g1MathNumbers2150Counting:   'a4011008-0001-0000-0000-000000000000',
  g1MathNumbers2150TensOnes:   'a4011008-0002-0000-0000-000000000000',
  g1MathNumbers2150Comparison: 'a4011008-0003-0000-0000-000000000000',
  g1MathNumbers2150Mixed:      'a4011008-0010-0000-0000-000000000000',

  // ── GRADE 1: DATA HANDLING (CHAPTER 9) ────────────────────────────────
  g1MathDataHandling:                 'a3011009-0000-0000-0000-000000000001',
  g1MathDataHandlingSorting:          'a4011009-0001-0000-0000-000000000000',
  g1MathDataHandlingPictograph:       'a4011009-0002-0000-0000-000000000000',
  g1MathDataHandlingCountingGrouping: 'a4011009-0003-0000-0000-000000000000',
  g1MathDataHandlingMixed:            'a4011009-0010-0000-0000-000000000000',

  // ── GRADE 1: PATTERNS (CHAPTER 10) ────────────────────────────────────
  g1MathPatterns:            'a3011010-0000-0000-0000-000000000001',
  g1MathPatternsIdentifying: 'a4011010-0001-0000-0000-000000000000',
  g1MathPatternsCreating:    'a4011010-0002-0000-0000-000000000000',
  g1MathPatternsMixed:       'a4011010-0010-0000-0000-000000000000',

  // ── GRADE 1: NUMBERS 51-100 (CHAPTER 11) ──────────────────────────────
  g1MathNumbers51100:           'a3011011-0000-0000-0000-000000000001',
  g1MathNumbers51100Counting:   'a4011011-0001-0000-0000-000000000000',
  g1MathNumbers51100Writing:    'a4011011-0002-0000-0000-000000000000',
  g1MathNumbers51100Names:      'a4011011-0003-0000-0000-000000000000',
  g1MathNumbers51100Comparison: 'a4011011-0004-0000-0000-000000000000',
  g1MathNumbers51100Skip:       'a4011011-0005-0000-0000-000000000000',
  g1MathNumbers51100Mixed:      'a4011011-0010-0000-0000-000000000000',

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

  // ── 3. GRADE 8 SKILLS — NEW UUID SCHEME ───────────────────────────────────

  // Ch 1: Rational Numbers
  g8MathRNChapter:                   'a3081001-0000-0000-0000-000000000001',
  g8MathRNCommutativity:             'a4081001-0001-0000-0000-000000000000',
  g8MathRNAssociativity:             'a4081001-0002-0000-0000-000000000000',
  g8MathRNDistributivity:            'a4081001-0003-0000-0000-000000000000',
  g8MathRNIdentities:                'a4081001-0004-0000-0000-000000000000',
  g8MathRNChapterTest:               'a4081001-0010-0000-0000-000000000000',

  // Ch 3: Understanding Quadrilaterals
  g8MathUQChapter:                   'a3081003-0000-0000-0000-000000000001',
  g8MathUQAngleSumExterior:          'a4081003-0001-0000-0000-000000000000',
  g8MathUQKindsOfQuadrilaterals:     'a4081003-0002-0000-0000-000000000000',
  g8MathUQSpecialParallelograms:     'a4081003-0003-0000-0000-000000000000',

  // Ch 5: Data Handling
  g8MathDHChapter:                   'a3081005-0000-0000-0000-000000000001',
  g8MathDHOrganisingData:            'a4081005-0001-0000-0000-000000000000',
  g8MathDHBarGraphs:                 'a4081005-0002-0000-0000-000000000000',
  g8MathDHPieCharts:                 'a4081005-0003-0000-0000-000000000000',
  g8MathDHProbability:               'a4081005-0004-0000-0000-000000000000',

  // Ch 6: Squares and Square Roots
  g8MathSSRChapter:                  'a3081006-0000-0000-0000-000000000001',
  g8MathSSRIdentifyPerfect:          'a4081006-0001-0000-0000-000000000000',
  g8MathSSRProperties:               'a4081006-0002-0000-0000-000000000000',
  g8MathSSRPythagorean:              'a4081006-0003-0000-0000-000000000000',
  g8MathSSRConceptRoot:              'a4081006-0004-0000-0000-000000000000',
  g8MathSSRPrimeFactorization:       'a4081006-0005-0000-0000-000000000000',
  g8MathSSRLongDivision:             'a4081006-0006-0000-0000-000000000000',
  g8MathSSRDecimals:                 'a4081006-0007-0000-0000-000000000000',
  g8MathSSRIdentityPatterns:         'a4081006-0008-0000-0000-000000000000',
  g8MathSSRChapterTest:              'a4081006-0010-0000-0000-000000000000',

  // Ch 7: Cubes and Cube Roots
  g8MathCCRChapter:                  'a3081007-0000-0000-0000-000000000001',
  g8MathCCRPerfectCubes:             'a4081007-0001-0000-0000-000000000000',
  g8MathCCRPrimeFactorisation:       'a4081007-0002-0000-0000-000000000000',
  g8MathCCREstimatingRoots:          'a4081007-0003-0000-0000-000000000000',
  g8MathCCRMissingMultiples:         'a4081007-0004-0000-0000-000000000000',

  // Ch 11: Mensuration
  g8MathMensChapter:                 'a3081011-0000-0000-0000-000000000001',
  g8MathMensAreaPolygon:             'a4081011-0001-0000-0000-000000000000',
  g8MathMensSACube:                  'a4081011-0002-0000-0000-000000000000',
  g8MathMensSACuboid:                'a4081011-0003-0000-0000-000000000000',
  g8MathMensSACylinder:              'a4081011-0004-0000-0000-000000000000',
  g8MathMensVolCube:                 'a4081011-0005-0000-0000-000000000000',
  g8MathMensVolCuboid:               'a4081011-0006-0000-0000-000000000000',
  g8MathMensVolCylinder:             'a4081011-0007-0000-0000-000000000000',
  g8MathMensVolCapacity:             'a4081011-0008-0000-0000-000000000000',
  g8MathMensChapterTest:             'a4081011-0010-0000-0000-000000000000',

  // Ch 13: Direct and Inverse Proportions
  g8MathDIPChapter:                  'a3081013-0000-0000-0000-000000000001',
  g8MathDIPDirect:                   'a4081013-0001-0000-0000-000000000000',
  g8MathDIPInverse:                  'a4081013-0002-0000-0000-000000000000',

  // Ch 14: Factorisation
  g8MathFactChapter:                 'a3081014-0000-0000-0000-000000000001',
  g8MathFactCommonFactors:           'a4081014-0001-0000-0000-000000000000',
  g8MathFactRegrouping:              'a4081014-0002-0000-0000-000000000000',
  g8MathFactIdentities:              'a4081014-0003-0000-0000-000000000000',
  g8MathFactXplusAXplusB:            'a4081014-0004-0000-0000-000000000000',
  g8MathFactDivMonomialMonomial:     'a4081014-0005-0000-0000-000000000000',
  g8MathFactDivPolyMonomial:         'a4081014-0006-0000-0000-000000000000',
  g8MathFactDivPolyPoly:             'a4081014-0007-0000-0000-000000000000',
  g8MathFactChapterTest:             'a4081014-0010-0000-0000-000000000000',

  // Ch 15: Introduction to Graphs
  g8MathGraphsChapter:               'a3081015-0000-0000-0000-000000000001',
  g8MathGraphsLineGraph:             'a4081015-0001-0000-0000-000000000000',
  g8MathGraphsLinearGraph:           'a4081015-0002-0000-0000-000000000000',

  // ── LEGACY GRADE 8 SKILL IDs (kept for backward compat) ──────────────────
  g8MathRationalAssociativity:   'a4000000-0000-0000-0000-000000010001',
  g8MathRationalDistributivity:  'a4000000-0000-0000-0000-000000010002',
  g8MathLinearSolving:           'a4000000-0000-0000-0000-000000020001',
  g8MathLinearWordProblems:      'a4000000-0000-0000-0000-000000020002',
  g8MathExponentsLaws:           'a4000000-0000-0000-0000-000000050001',
  g8MathExponentsStandardForm:   'a4000000-0000-0000-0000-000000050002',
  g8MathCQIntro:                 'a4000000-0000-0000-0000-000000060000',
  g8MathComparingPercentages:    'a4000000-0000-0000-0000-000000060001',
  g8MathComparingProfitLoss:     'a4000000-0000-0000-0000-000000060002',
  g8MathComparingSimpleInterest: 'a4000000-0000-0000-0000-000000060003',
  g8MathComparingCompoundInterest:'a4000000-0000-0000-0000-000000060004',
  g8MathCQTerminologyQuiz:       'a4000000-0000-0000-0000-000000060010',

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
  // ── 5. CLASS 10 MATH ─────────────────────────────────────────────────────

  // Grade 10 Math: Surface Areas and Volumes (Chapter 13)
  g10MathSurfaceAreasAndVolumes:            'a3101013-0000-0000-0000-000000000001',
  g10MathSAVVisualization:                  'a4101013-0001-0000-0000-000000000000',
  g10MathSAVSurfaceArea:                    'a4101013-0002-0000-0000-000000000000',
  g10MathSAVVolume:                         'a4101013-0003-0000-0000-000000000000',
  g10MathSAVConversion:                     'a4101013-0004-0000-0000-000000000000',
  g10MathSAVHollowParts:                    'a4101013-0005-0000-0000-000000000000',
  g10MathSAVCapacity:                       'a4101013-0006-0000-0000-000000000000',
  g10MathSAVRealWorldProblems:              'a4101013-0007-0000-0000-000000000000',
  g10MathSAVTerminologyQuiz:                'a4101013-0010-0000-0000-000000000000',

  // Grade 10 Math: Areas Related to Circles (Chapter 12)
  g10MathAreasCircles:                    'a3101012-0000-0000-0000-000000000001',
  g10MathAreasCirclesRegions:             'a4101012-0001-0000-0000-000000000000',
  g10MathAreasCirclesArcLength:           'a4101012-0002-0000-0000-000000000000',
  g10MathAreasCirclesSectorArea:          'a4101012-0003-0000-0000-000000000000',
  g10MathAreasCirclesSegmentArea:         'a4101012-0004-0000-0000-000000000000',
  g10MathAreasCirclesRealLife:            'a4101012-0005-0000-0000-000000000000',
  g10MathAreasCirclesComposite:           'a4101012-0006-0000-0000-000000000000',
  g10MathAreasCirclesTerminologyQuiz:     'a4101012-0010-0000-0000-000000000000',

  // Grade 10 Math: Triangles (Chapter 6)
  g10MathTriangles:                         'a3101006-0000-0000-0000-000000000001',
  g10MathTriSimilarFigures:                 'a4101006-0001-0000-0000-000000000000',
  g10MathTriSimilarityOfTriangles:          'a4101006-0002-0000-0000-000000000000',
  g10MathTriBPTAndConverse:                 'a4101006-0003-0000-0000-000000000000',
  g10MathTriApplicationsOfBPT:              'a4101006-0004-0000-0000-000000000000',
  g10MathTriAAASSSAS:                       'a4101006-0005-0000-0000-000000000000',
  g10MathTriUsingSimilarTriangles:          'a4101006-0006-0000-0000-000000000000',
  g10MathTriRealLifeApplications:           'a4101006-0007-0000-0000-000000000000',
  g10MathTriTerminologyQuiz:                'a4101006-0010-0000-0000-000000000000',

  // Grade 10 Math: Arithmetic Progressions (Chapter 5)
  g10MathArithmeticProgressions:              'a3101005-0000-0000-0000-000000000001',
  g10MathAPRecognisingPatterns:               'a4101005-0001-0000-0000-000000000000',
  g10MathAPUnderstanding:                     'a4101005-0002-0000-0000-000000000000',
  g10MathAPIdentifyingTerms:                  'a4101005-0003-0000-0000-000000000000',
  g10MathAPFindingSpecificTerms:              'a4101005-0004-0000-0000-000000000000',
  g10MathAPSumOfTerms:                        'a4101005-0005-0000-0000-000000000000',
  g10MathAPChapterTest:                       'a4101005-0010-0000-0000-000000000000',

  // Grade 10 Math: Circles (Chapter 10)
  g10MathCircles:                           'a3101010-0000-0000-0000-000000000001',
  g10MathCirclesTangentBasics:              'a4101010-0001-0000-0000-000000000000',
  g10MathCirclesTangentPerp:                'a4101010-0002-0000-0000-000000000000',
  g10MathCirclesNumberOfTangents:           'a4101010-0003-0000-0000-000000000000',
  g10MathCirclesLengthsOfTangents:          'a4101010-0004-0000-0000-000000000000',
  g10MathCirclesAngleProperties:            'a4101010-0005-0000-0000-000000000000',
  g10MathCirclesCircumscribedPolygons:      'a4101010-0006-0000-0000-000000000000',
  g10MathCirclesComplexApplications:        'a4101010-0007-0000-0000-000000000000',
  g10MathCirclesTerminologyQuiz:            'a4101010-0010-0000-0000-000000000000',
  
  // Grade 10 Math: Real Numbers (Chapter 1)
  g10MathRealNumbers:                       'a3101001-0000-0000-0000-000000000001',
  g10MathRNUnderstanding:                   'a4101001-0001-0000-0000-000000000000',
  g10MathRNEuclidsAlgorithm:                'a4101001-0002-0000-0000-000000000000',
  g10MathRNPrimeFactorisation:              'a4101001-0003-0000-0000-000000000000',
  g10MathRNFundamentalTheorem:              'a4101001-0004-0000-0000-000000000000',
  g10MathRNHCFLCMMethod:                    'a4101001-0005-0000-0000-000000000000',
  g10MathRNApplicationsHCFLCM:             'a4101001-0006-0000-0000-000000000000',
  g10MathRNProvingIrrational:               'a4101001-0007-0000-0000-000000000000',
  g10MathRNOperationsIrrational:            'a4101001-0008-0000-0000-000000000000',
  g10MathRNTerminologyQuiz:                 'a4101001-0010-0000-0000-000000000000',

  // Grade 10 Math: Polynomials (Chapter 2)
  g10MathPolynomials:                       'a3101002-0000-0000-0000-000000000001',
  g10MathPolyTypesDegrees:                  'a4101002-0001-0000-0000-000000000000',
  g10MathPolyEvaluatingIdentifying:         'a4101002-0002-0000-0000-000000000000',
  g10MathPolyGeometricalInterpretation:    'a4101002-0003-0000-0000-000000000000',
  g10MathPolyGraphicalBehaviour:            'a4101002-0004-0000-0000-000000000000',
  g10MathPolyRelationshipQuadratic:         'a4101002-0005-0000-0000-000000000000',
  g10MathPolyRelationshipCubic:             'a4101002-0006-0000-0000-000000000000',
  g10MathPolyConstructingQuadratic:         'a4101002-0007-0000-0000-000000000000',
  g10MathPolyChapterTest:                   'a4101002-0010-0000-0000-000000000000',

  // Grade 10 Math: Pair of Linear Equations (Chapter 3)
  g10MathLinearEquations:                   'a3101003-0000-0000-0000-000000000001',
  g10MathLEIntro:                           'a4101003-0001-0000-0000-000000000000',
  g10MathLEGraphical:                       'a4101003-0002-0000-0000-000000000000',
  g10MathLEConsistency:                     'a4101003-0003-0000-0000-000000000000',
  g10MathLESubstitution:                    'a4101003-0004-0000-0000-000000000000',
  g10MathLEElimination:                     'a4101003-0005-0000-0000-000000000000',
  g10MathLEApplications:                    'a4101003-0006-0000-0000-000000000000',
  g10MathLEStandardForm:                    'a4101003-0007-0000-0000-000000000000',
  g10MathLEChapterTest:                     'a4101003-0010-0000-0000-000000000000',

  // Grade 10 Math: Quadratic Equations (Chapter 4)
  g10MathQuadraticEquations:                'a3101004-0000-0000-0000-000000000001',
  g10MathQuadraticFoundations:              'a4101004-0001-0000-0000-000000000000',
  g10MathQuadraticRepresenting:             'a4101004-0002-0000-0000-000000000000',
  g10MathQuadraticIdentifying:              'a4101004-0003-0000-0000-000000000000',
  g10MathQuadraticFactorisation:            'a4101004-0004-0000-0000-000000000000',
  g10MathQuadraticWordProblemsFactorisation: 'a4101004-0005-0000-0000-000000000000',
  g10MathQuadraticNatureOfRoots:            'a4101004-0006-0000-0000-000000000000',
  g10MathQuadraticDiscriminant:             'a4101004-0007-0000-0000-000000000000',
  g10MathQuadraticRealLife:                 'a4101004-0008-0000-0000-000000000000',
  g10MathQuadraticChapterTest:              'a4101004-0010-0000-0000-000000000000',

  // Grade 10 Math: Coordinate Geometry (Chapter 7)
  g10MathCoordinateGeometry:                'a3101007-0000-0000-0000-000000000001',
  g10MathCGDistanceFormula:                 'a4101007-0001-0000-0000-000000000000',
  g10MathCGSectionFormula:                  'a4101007-0002-0000-0000-000000000000',
  g10MathCGAreaOfTriangle:                  'a4101007-0003-0000-0000-000000000000',
  g10MathCGCollinearPoints:                 'a4101007-0004-0000-0000-000000000000',
  g10MathCGGeometricFigures:                'a4101007-0005-0000-0000-000000000000',

  // Grade 10 Math: Introduction to Trigonometry (Chapter 8)
  g10MathTrigonometry:                      'a3101008-0000-0000-0000-000000000001',
  g10MathTrigRealLife:                      'a4101008-0001-0000-0000-000000000000',
  g10MathTrigRatios:                        'a4101008-0002-0000-0000-000000000000',
  g10MathTrigTriangleSides:                 'a4101008-0003-0000-0000-000000000000',
  g10MathTrigStandardAngles:                'a4101008-0004-0000-0000-000000000000',
  g10MathTrigEvaluatingValues:              'a4101008-0005-0000-0000-000000000000',
  g10MathTrigIdentities:                    'a4101008-0006-0000-0000-000000000000',
  g10MathTrigSimplifyProve:                 'a4101008-0007-0000-0000-000000000000',
  g10MathTrigAngleProblems:                 'a4101008-0008-0000-0000-000000000000',
  
  // Grade 10 Math: Probability (Chapter 15)
  g10MathProbability:                       'a3101015-0000-0000-0000-000000000001',
  g10MathProbRandomExperiments:             'a4101015-0001-0000-0000-000000000000',
  g10MathProbTheoretical:                   'a4101015-0002-0000-0000-000000000000',
  g10MathProbElementary:                    'a4101015-0003-0000-0000-000000000000',
  g10MathProbComplementary:                 'a4101015-0004-0000-0000-000000000000',
  g10MathProbImpossibleSure:                'a4101015-0005-0000-0000-000000000000',
  g10MathProbCoinsDice:                     'a4101015-0006-0000-0000-000000000000',
  g10MathProbCards:                         'a4101015-0007-0000-0000-000000000000',
  g10MathProbSelections:                    'a4101015-0008-0000-0000-000000000000',
  g10MathProbTerminologyQuiz:               'a4101015-0010-0000-0000-000000000000',
  g10MathProbEasyTest:                      'a4101015-0011-0000-0000-000000000000',
  g10MathProbMediumTest:                    'a4101015-0012-0000-0000-000000000000',
  g10MathProbHardTest:                      'a4101015-0013-0000-0000-000000000000',

  // ── 6. NEW GRADE-BASED TOPICS (v4) ───────────────────────────────────────
  
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
  
  // ── GRADE 5 MATH ─────────────────────────────────────────────────────────

  // Ch 1: The Fish Tale
  g5MathFishTale:                     'a3051001-0000-0000-0000-000000000001',
  g5MathFTNumberSensePlaceValue:      'a4051001-0001-0000-0000-000000000000',
  g5MathFTReadingWritingBigNumbers:   'a4051001-0002-0000-0000-000000000000',
  g5MathFTPlaceValueLakhs:            'a4051001-0003-0000-0000-000000000000',
  g5MathFTComparison:                 'a4051001-0004-0000-0000-000000000000',
  g5MathFTEstimation:                 'a4051001-0005-0000-0000-000000000000',
  g5MathFTEstimationSkills:           'a4051001-0006-0000-0000-000000000000',
  g5MathFTRealLifeData:               'a4051001-0007-0000-0000-000000000000',
  g5MathFTRealLifeSituations:         'a4051001-0008-0000-0000-000000000000',

  // Ch 2: Shapes and Angles
  g5MathShapesAndAngles:              'a3051002-0000-0000-0000-000000000001',
  g5MathSASkill1:                     'a4051002-0001-0000-0000-000000000000',
  g5MathSASkill2:                     'a4051002-0002-0000-0000-000000000000',
  g5MathSASkill3:                     'a4051002-0003-0000-0000-000000000000',
  g5MathSASkill4:                     'a4051002-0004-0000-0000-000000000000',

  // Ch 3: How Many Squares?
  g5MathHowManySquares:               'a3051003-0000-0000-0000-000000000001',
  g5MathHMSSkill1:                    'a4051003-0001-0000-0000-000000000000',
  g5MathHMSSkill2:                    'a4051003-0002-0000-0000-000000000000',
  g5MathHMSSkill3:                    'a4051003-0003-0000-0000-000000000000',

  // Ch 4: Parts and Wholes
  g5MathPartsAndWholes:               'a3051004-0000-0000-0000-000000000001',
  g5MathPWPartsOfWhole:               'a4051004-0001-0000-0000-000000000000',
  g5MathPWEquivalentFractions:        'a4051004-0002-0000-0000-000000000000',

  // Ch 5: Does it Look the Same?
  g5MathDoesItLookSame:               'a3051005-0000-0000-0000-000000000001',
  g5MathDILSVisualSymmetry:           'a4051005-0001-0000-0000-000000000000',
  g5MathDILSPatternObservation:       'a4051005-0002-0000-0000-000000000000',
  g5MathDILSGeometricReasoning:       'a4051005-0003-0000-0000-000000000000',

  // Ch 6: Be My Multiple, I'll be Your Factor
  g5MathBeMyMultiple:                 'a3051006-0000-0000-0000-000000000001',
  g5MathBMFSkill1:                    'a4051006-0001-0000-0000-000000000000',
  g5MathBMFSkill2:                    'a4051006-0002-0000-0000-000000000000',
  g5MathBMFSkill3:                    'a4051006-0003-0000-0000-000000000000',

  // Ch 7: Can You See the Pattern? (engine-based)
  g5MathCanYouSeePattern:             'a3051007-0000-0000-0000-000000000001',
  g5MathCYSPNumberPatterns:           'a4051007-0001-0000-0000-000000000000',
  g5MathCYSPShapePatterns:            'a4051007-0002-0000-0000-000000000000',
  g5MathCYSPPatternRules:             'a4051007-0003-0000-0000-000000000000',
  g5MathCYSPContinuingPatterns:       'a4051007-0004-0000-0000-000000000000',
  // Ch 7: Can You See the Pattern? (flat-file skills)
  g5MathCYSPPatternIdentification:    'a4051007-0005-0000-0000-000000000000',
  g5MathCYSPGridPattern:              'a4051007-0006-0000-0000-000000000000',
  g5MathCYSPRuleBasedPattern:         'a4051007-0007-0000-0000-000000000000',
  g5MathCYSPUnderstandingRotations:   'a4051007-0008-0000-0000-000000000000',
  g5MathCYSPPalindromeRecognition:    'a4051007-0009-0000-0000-000000000000',
  g5MathCYSPDigitRelationships:       'a4051007-0010-0000-0000-000000000000',
  g5MathCYSPPropertiesOfOperations:   'a4051007-0011-0000-0000-000000000000',
  g5MathCYSPStructuredNumberPatterns: 'a4051007-0012-0000-0000-000000000000',
  g5MathCYSPMentalCalcStrategies:     'a4051007-0013-0000-0000-000000000000',
  g5MathCYSPMissingNumberReasoning:   'a4051007-0014-0000-0000-000000000000',
  g5MathCYSPMultiStepOperations:      'a4051007-0015-0000-0000-000000000000',
  g5MathCYSPRuleApplication:          'a4051007-0016-0000-0000-000000000000',
  g5MathCYSPSkillApplicationPatterns: 'a4051007-0017-0000-0000-000000000000',
  g5MathCYSPChapterTest:              'a4051007-0018-0000-0000-000000000000',

  // Ch 8: Mapping Your Way
  g5MathMappingYourWay:               'a3051008-0000-0000-0000-000000000001',
  g5MathMYWMapsDirections:            'a4051008-0001-0000-0000-000000000000',
  g5MathMYWReadingMaps:               'a4051008-0002-0000-0000-000000000000',
  g5MathMYWGridReferences:            'a4051008-0003-0000-0000-000000000000',

  // Ch 10: Tenths and Hundredths
  g5MathTenthsAndHundredths:          'a3051010-0000-0000-0000-000000000001',
  g5MathTHPlaceValues:                'a4051010-0001-0000-0000-000000000000',
  g5MathTHVisualRepresentation:       'a4051010-0002-0000-0000-000000000000',
  g5MathTHFractionToDecimal:          'a4051010-0003-0000-0000-000000000000',
  g5MathTHComparingDecimals:          'a4051010-0004-0000-0000-000000000000',
  g5MathTHDecimalInMoney:             'a4051010-0005-0000-0000-000000000000',
  g5MathTHDecimalInMeasurement:       'a4051010-0006-0000-0000-000000000000',
  g5MathTHDecimalOperations:          'a4051010-0007-0000-0000-000000000000',
  g5MathTHConversionBetweenForms:     'a4051010-0008-0000-0000-000000000000',
  g5MathTHSkillApplicationProb:       'a4051010-0009-0000-0000-000000000000',
  g5MathTHChapterTest:                'a4051010-0010-0000-0000-000000000000',

  // Ch 11: Area and its Boundary
  g5MathAreaAndBoundary:              'a3051011-0000-0000-0000-000000000001',
  g5MathAABFindingArea:               'a4051011-0001-0000-0000-000000000000',
  g5MathAABAppropriateAreaUnits:      'a4051011-0002-0000-0000-000000000000',
  g5MathAABAreaRealLife:              'a4051011-0003-0000-0000-000000000000',
  g5MathAABCompareShapesSameArea:     'a4051011-0004-0000-0000-000000000000',
  g5MathAABFindingPerimeter:          'a4051011-0005-0000-0000-000000000000',
  g5MathAABPerimeterAsBoundary:       'a4051011-0006-0000-0000-000000000000',
  g5MathAABPerimeterRealLife:         'a4051011-0007-0000-0000-000000000000',
  g5MathAABSamePerimeterDiffShapes:   'a4051011-0008-0000-0000-000000000000',
  g5MathAABAreaPerimeterRelation:     'a4051011-0009-0000-0000-000000000000',
  g5MathAABSkillApplicationProblems:  'a4051011-0010-0000-0000-000000000000',
  g5MathAABChapterTest:               'a4051011-0011-0000-0000-000000000000',

  // Ch 13: Ways to Multiply and Divide
  g5MathWaysToMultiplyDivide:         'a3051013-0000-0000-0000-000000000001',
  g5MathWMDMult2Digit:                'a4051013-0001-0000-0000-000000000000',
  g5MathWMDMult3Digit:                'a4051013-0002-0000-0000-000000000000',
  g5MathWMDMultEndingZeros:           'a4051013-0003-0000-0000-000000000000',
  g5MathWMDMultMultipleNumbers:       'a4051013-0004-0000-0000-000000000000',
  g5MathWMDMultWordProblems:          'a4051013-0005-0000-0000-000000000000',
  g5MathWMDDivOneDigit:               'a4051013-0006-0000-0000-000000000000',
  g5MathWMDDivTwoDigit:               'a4051013-0007-0000-0000-000000000000',
  g5MathWMDDivEndingZeros:            'a4051013-0008-0000-0000-000000000000',
  g5MathWMDDivWordProblems:           'a4051013-0009-0000-0000-000000000000',
  g5MathWMDSkillApplicationProblems:  'a4051013-0010-0000-0000-000000000000',
  g5MathWMDChapterTest:               'a4051013-0011-0000-0000-000000000000',

  // Ch 14: How Big? How Heavy?
  g5MathHowBigHowHeavy:              'a3051014-0000-0000-0000-000000000001',
  g5MathHBHHUnitsOfVolume:           'a4051014-0001-0000-0000-000000000000',
  g5MathHBHHVolumeEstimation:        'a4051014-0002-0000-0000-000000000000',
  g5MathHBHHVolumeUnitCubes:         'a4051014-0003-0000-0000-000000000000',
  g5MathHBHHVolumeDisplacement:      'a4051014-0004-0000-0000-000000000000',
  g5MathHBHHUnitsOfMass:             'a4051014-0005-0000-0000-000000000000',
  g5MathHBHHWeightEstimation:        'a4051014-0006-0000-0000-000000000000',
  g5MathHBHHMassConversion:          'a4051014-0007-0000-0000-000000000000',
  g5MathHBHHMassCalculation:         'a4051014-0008-0000-0000-000000000000',
  g5MathHBHHMeasurementRealLife:     'a4051014-0009-0000-0000-000000000000',
  g5MathHBHH3DShapeConstruction:     'a4051014-0010-0000-0000-000000000000',
  g5MathHBHHPackagingLayering:       'a4051014-0011-0000-0000-000000000000',
  g5MathHBHHSkillApplicationProblem: 'a4051014-0012-0000-0000-000000000000',
  g5MathHBHHChapterTest:             'a4051014-0013-0000-0000-000000000000',

  // Grade 6 Math: Patterns in Mathematics (Chapter 1)
  g6MathPatterns:                      'a3061001-0000-0000-0000-000000000001',
  g6MathPatternsIntro:                 'a4061001-0001-0000-0000-000000000000',
  g6MathPatternsTerminology:           'a4061001-0002-0000-0000-000000000000',
  g6MathPatternsSkills:                'a4061001-0003-0000-0000-000000000000',
  g6MathPatternsNumberSequences:       'a4061001-0004-0000-0000-000000000000',
  g6MathPatternsShapeGeometry:         'a4061001-0005-0000-0000-000000000000',
  g6MathPatternsSpecialPatterns:       'a4061001-0006-0000-0000-000000000000',
  g6MathPatternsVocabQuiz:             'a4061001-0010-0000-0000-000000000000',

  // Grade 6 Math: Lines and Angles (Chapter 2)
  g6MathLinesAndAngles:                'a3061002-0000-0000-0000-000000000001',
  g6MathLALinesSegmentsRays:           'a4061002-0001-0000-0000-000000000000',
  g6MathLAClassifyingAngles:           'a4061002-0002-0000-0000-000000000000',
  g6MathLAMeasuringAngles:             'a4061002-0003-0000-0000-000000000000',

  // Grade 6 Math: Number Play (Chapter 3)
  g6MathNumberPlay:                    'a3061003-0000-0000-0000-000000000001',
  g6MathNPNumbersDailyLife:            'a4061003-0001-0000-0000-000000000000',
  g6MathNPPatternsNumberLine:          'a4061003-0002-0000-0000-000000000000',
  g6MathNPSupercells:                  'a4061003-0003-0000-0000-000000000000',
  g6MathNPPalindromicNumbers:          'a4061003-0004-0000-0000-000000000000',
  g6MathNPKaprekarConstant:            'a4061003-0005-0000-0000-000000000000',
  g6MathNPNumberGamesStrategies:       'a4061003-0006-0000-0000-000000000000',

  // Grade 6 Math: Data Handling and Presentation (Chapter 4 - flat files)
  g6MathDataHandlingPresentation:      'a3061004-0000-0000-0000-000000000001',
  g6MathDHPCollecting:                 'a4061004-0001-0000-0000-000000000000',
  g6MathDHPPictographs:                'a4061004-0002-0000-0000-000000000000',
  g6MathDHPBarGraphs:                  'a4061004-0003-0000-0000-000000000000',
  g6MathDHPDrawingBarGraph:            'a4061004-0004-0000-0000-000000000000',
  g6MathDHPFigureItOut:                'a4061004-0005-0000-0000-000000000000',

  // Grade 6 Math: Prime Time (Chapter 5)
  g6MathPrimeTime:                     'a3061005-0000-0000-0000-000000000001',
  g6MathPTFactorsMultiples:            'a4061005-0001-0000-0000-000000000000',
  g6MathPTPrimeComposite:              'a4061005-0002-0000-0000-000000000000',
  g6MathPTDivisibilityRules:           'a4061005-0003-0000-0000-000000000000',
  g6MathPTPrimeFactorization:          'a4061005-0004-0000-0000-000000000000',
  g6MathPTHcfLcm:                      'a4061005-0005-0000-0000-000000000000',

  // Grade 6 Math: Perimeter and Area (Chapter 6 - flat files)
  g6MathPerimeterArea:                 'a3061006-0000-0000-0000-000000000001',
  g6MathPARectangle:                   'a4061006-0001-0000-0000-000000000000',
  g6MathPASquare:                      'a4061006-0002-0000-0000-000000000000',
  g6MathPATriangle:                    'a4061006-0003-0000-0000-000000000000',
  g6MathPARegularPolygon:              'a4061006-0004-0000-0000-000000000000',
  g6MathPAMixedBag:                    'a4061006-0005-0000-0000-000000000000',

  // Grade 6 Math: Symmetry (Chapter 9 - flat files)
  g6MathSymmetry:                      'a3061009-0000-0000-0000-000000000001',
  g6MathSymLineOfSymmetry:             'a4061009-0001-0000-0000-000000000000',
  g6MathSymReflection:                 'a4061009-0002-0000-0000-000000000000',
  g6MathSymRotational:                 'a4061009-0003-0000-0000-000000000000',
  g6MathSymOrderRotational:            'a4061009-0004-0000-0000-000000000000',

  // Grade 6 Math: Data Handling 6 - engine chapter (Chapter 11)
  g6MathDataHandling6:                 'a3061011-0000-0000-0000-000000000001',
  g6MathDH6DataObservations:           'a4061011-0001-0000-0000-000000000000',
  g6MathDH6TallyMarks:                 'a4061011-0002-0000-0000-000000000000',
  g6MathDH6Pictographs:                'a4061011-0003-0000-0000-000000000000',
  g6MathDH6BarGraphs:                  'a4061011-0004-0000-0000-000000000000',

  // Grade 6 Math: Mensuration 6 - engine chapter (Chapter 12)
  g6MathMensuration6:                  'a3061012-0000-0000-0000-000000000001',
  g6MathM6PerimeterBasics:             'a4061012-0001-0000-0000-000000000000',
  g6MathM6AreaGrids:                   'a4061012-0002-0000-0000-000000000000',
  g6MathM6ShapeDecomposition:          'a4061012-0003-0000-0000-000000000000',
  g6MathM6TriangleArea:                'a4061012-0004-0000-0000-000000000000',

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

  // Grade 8 Math: Exponents and Powers (Chapter 12)
  g8MathExponentsPowersChapter:            'a3081012-0000-0000-0000-000000000001',
  g8MathEPNegativeExponents:               'a4081012-0001-0000-0000-000000000000',
  g8MathEPLawsOfExponents:                 'a4081012-0002-0000-0000-000000000000',
  g8MathEPStandardForm:                    'a4081012-0003-0000-0000-000000000000',
  g8MathEPComparingNumbers:                'a4081012-0004-0000-0000-000000000000',
  g8MathEPApplications:                    'a4081012-0005-0000-0000-000000000000',
  g8MathEPChapterTest:                     'a4081012-0010-0000-0000-000000000000',

  // Grade 8 Science: Exploring Investigative Science
  g8ScienceInvestigativeScience:           'b3081001-0000-0000-0000-000000000001',
  g8ScienceInvestigativeMethod:            'b4081001-0001-0000-0000-000000000000',
  g8ScienceInvestigativeMeasurements:      'b4081001-0002-0000-0000-000000000000',
  g8ScienceInvestigativeAnalysis:          'b4081001-0003-0000-0000-000000000000',
  g8ScienceInvestigativeTerminologyQuiz:   'b4081001-0010-0000-0000-000000000000',

  // Grade 7 Math: Integers (Chapter 1)
  g7MathIntegers:                          'a3071001-0000-0000-0000-000000000001',
  g7MathIntAddSubProperties:               'a4071001-0001-0000-0000-000000000000',
  g7MathIntMultiplication:                 'a4071001-0002-0000-0000-000000000000',
  g7MathIntMultiplicationProperties:       'a4071001-0003-0000-0000-000000000000',
  g7MathIntDivision:                       'a4071001-0004-0000-0000-000000000000',
  g7MathIntDivisionProperties:             'a4071001-0005-0000-0000-000000000000',

  // Grade 7 Math: Fractions and Decimals (Chapter 2)
  g7MathFractionsAndDecimals:              'a3071002-0000-0000-0000-000000000001',
  g7MathFDTypes:                           'a4071002-0001-0000-0000-000000000000',
  g7MathFDAddSub:                          'a4071002-0002-0000-0000-000000000000',
  g7MathFDMultiply:                        'a4071002-0003-0000-0000-000000000000',
  g7MathFDDecimalShift:                    'a4071002-0004-0000-0000-000000000000',
  g7MathFDDecimalMult:                     'a4071002-0005-0000-0000-000000000000',

  // Grade 7 Math: Data Handling (Chapter 3)
  g7MathDataHandling:                      'a3071003-0000-0000-0000-000000000001',
  g7MathDHMean:                            'a4071003-0001-0000-0000-000000000000',
  g7MathDHRange:                           'a4071003-0002-0000-0000-000000000000',
  g7MathDHMode:                            'a4071003-0003-0000-0000-000000000000',
  g7MathDHMedian:                          'a4071003-0004-0000-0000-000000000000',
  g7MathDHBarGraph:                        'a4071003-0005-0000-0000-000000000000',
  g7MathDHDoubleBarGraph:                  'a4071003-0006-0000-0000-000000000000',

  // Grade 7 Math: Simple Equations (Chapter 4)
  g7MathSimpleEquations:                   'a3071004-0000-0000-0000-000000000001',
  g7MathSEForming:                         'a4071004-0001-0000-0000-000000000000',
  g7MathSEMeaning:                         'a4071004-0002-0000-0000-000000000000',
  g7MathSEStatements:                      'a4071004-0003-0000-0000-000000000000',
  g7MathSESolving:                         'a4071004-0004-0000-0000-000000000000',
  g7MathSEProperties:                      'a4071004-0005-0000-0000-000000000000',
  g7MathSEApplications:                    'a4071004-0006-0000-0000-000000000000',

  // Grade 7 Math: Lines and Angles (Chapter 5)
  g7MathLinesAndAngles:                    'a3071005-0000-0000-0000-000000000001',
  g7MathLABasicConcepts:                   'a4071005-0001-0000-0000-000000000000',
  g7MathLARelatedAngles:                   'a4071005-0002-0000-0000-000000000000',
  g7MathLAPairsOfLines:                    'a4071005-0003-0000-0000-000000000000',
  g7MathLATransversalProperties:           'a4071005-0004-0000-0000-000000000000',
  g7MathLACheckParallel:                   'a4071005-0005-0000-0000-000000000000',
  g7MathLAApplications:                    'a4071005-0006-0000-0000-000000000000',

  // Grade 7 Math: The Triangle and Its Properties (Chapter 6)
  g7MathTriangle:                          'a3071006-0000-0000-0000-000000000001',
  g7MathTriElements:                       'a4071006-0001-0000-0000-000000000000',
  g7MathTriClassifyBySides:                'a4071006-0002-0000-0000-000000000000',
  g7MathTriClassifyByAngles:               'a4071006-0003-0000-0000-000000000000',
  g7MathTriMediansAltitudes:               'a4071006-0004-0000-0000-000000000000',
  g7MathTriExteriorAngle:                  'a4071006-0005-0000-0000-000000000000',
  g7MathTriAngleSum:                       'a4071006-0006-0000-0000-000000000000',
  g7MathTriFindUnknownX:                   'a4071006-0007-0000-0000-000000000000',
  g7MathTriInequality:                     'a4071006-0008-0000-0000-000000000000',

  // Grade 7 Math: Comparing Quantities (Chapter 8)
  g7MathComparingQuantities:               'a3071008-0000-0000-0000-000000000001',
  g7MathCQPercentage:                      'a4071008-0001-0000-0000-000000000000',
  g7MathCQUseOfPercentages:                'a4071008-0002-0000-0000-000000000000',
  g7MathCQProfitAndLoss:                   'a4071008-0003-0000-0000-000000000000',
  g7MathCQSimpleInterest:                  'a4071008-0004-0000-0000-000000000000',
  g7MathCQChapterTest:                     'a4071008-0010-0000-0000-000000000000',

  // Grade 7 Math: Rational Numbers (Chapter 9)
  g7MathRationalNumbers:                   'a3071009-0000-0000-0000-000000000001',
  g7MathRNWhatAre:                         'a4071009-0001-0000-0000-000000000000',
  g7MathRNNeedFor:                         'a4071009-0002-0000-0000-000000000000',
  g7MathRNPositiveNegative:                'a4071009-0003-0000-0000-000000000000',
  g7MathRNNumberLine:                      'a4071009-0004-0000-0000-000000000000',
  g7MathRNStandardForm:                    'a4071009-0005-0000-0000-000000000000',
  g7MathRNComparison:                      'a4071009-0006-0000-0000-000000000000',
  g7MathRNOperations:                      'a4071009-0007-0000-0000-000000000000',
  g7MathRNBetween:                         'a4071009-0008-0000-0000-000000000000',
  g7MathRNChapterTest:                     'a4071009-0010-0000-0000-000000000000',

  // Grade 7 Math: Perimeter and Area (Chapter 11)
  g7MathPerimeterArea:                     'a3071011-0000-0000-0000-000000000001',
  g7MathPAAreaParallelogram:               'a4071011-0001-0000-0000-000000000000',
  g7MathPAAreaTriangle:                    'a4071011-0002-0000-0000-000000000000',
  g7MathPACircles:                         'a4071011-0003-0000-0000-000000000000',
  g7MathPAChapterTest:                     'a4071011-0010-0000-0000-000000000000',

  // Grade 7 Math: Algebraic Expressions (Chapter 12)
  g7MathAlgebraicExpressions:              'a3071012-0000-0000-0000-000000000001',
  g7MathAETermsFactors:                    'a4071012-0001-0000-0000-000000000000',
  g7MathAECoefficients:                    'a4071012-0002-0000-0000-000000000000',
  g7MathAELikeUnlikeTerms:                 'a4071012-0003-0000-0000-000000000000',
  g7MathAEFormation:                       'a4071012-0004-0000-0000-000000000000',
  g7MathAEFindingValue:                    'a4071012-0005-0000-0000-000000000000',
  g7MathAEPolynomials:                     'a4071012-0006-0000-0000-000000000000',
  g7MathAEChapterTest:                     'a4071012-0010-0000-0000-000000000000',

  // Grade 7 Math: Exponents and Powers (Chapter 13)
  g7MathExponentsPowers:                   'a3071013-0000-0000-0000-000000000001',
  g7MathEPBasics:                          'a4071013-0001-0000-0000-000000000000',
  g7MathEPLaws:                            'a4071013-0002-0000-0000-000000000000',
  g7MathEPDecimalNumberSystem:             'a4071013-0003-0000-0000-000000000000',
  g7MathEPStandardForm:                    'a4071013-0004-0000-0000-000000000000',
  g7MathEPChapterTest:                     'a4071013-0010-0000-0000-000000000000',

  // Grade 7 Math: Symmetry (Chapter 14)
  g7MathSymmetry:                          'a3071014-0000-0000-0000-000000000001',
  g7MathSymLineSymmetry:                   'a4071014-0001-0000-0000-000000000000',
  g7MathSymRotational:                     'a4071014-0002-0000-0000-000000000000',
  g7MathSymLineRotRelationship:            'a4071014-0003-0000-0000-000000000000',
  g7MathSymMirrorReflection:               'a4071014-0004-0000-0000-000000000000',
  g7MathSymRegularPolygons:                'a4071014-0005-0000-0000-000000000000',
  g7MathSymChapterTest:                    'a4071014-0010-0000-0000-000000000000',

  // Grade 7 Math: Visualising Solid Shapes (Chapter 15)
  g7MathVisualisingSolidShapes:            'a3071015-0000-0000-0000-000000000001',
  g7MathVSSPlaneFigures:                   'a4071015-0001-0000-0000-000000000000',
  g7MathVSSFacesEdgesVertices:             'a4071015-0002-0000-0000-000000000000',
  g7MathVSSNets:                           'a4071015-0003-0000-0000-000000000000',
  g7MathVSSDrawingSolids:                  'a4071015-0004-0000-0000-000000000000',
  g7MathVSSViewingSections:                'a4071015-0005-0000-0000-000000000000',
  g7MathVSSChapterTest:                    'a4071015-0010-0000-0000-000000000000',

  // Grade 9 Math: Number System (Chapter 1)
  g9MathNumberSystem:                      'a3091001-0000-0000-0000-000000000001',
  g9MathNSClassification:                  'a4091001-0001-0000-0000-000000000000',
  g9MathNSDecimalExpansion:                'a4091001-0002-0000-0000-000000000000',
  g9MathNSSurds:                           'a4091001-0003-0000-0000-000000000000',
  g9MathNSRationalisation:                 'a4091001-0004-0000-0000-000000000000',
  g9MathNSLawsOfExponents:                 'a4091001-0005-0000-0000-000000000000',
  g9MathNSChapterAssessment:               'a4091001-0006-0000-0000-000000000000',
  g9MathNSTerminologyQuiz:                 'a4091001-0010-0000-0000-000000000000',

  // Grade 9 Math: Coordinate Geometry (Chapter 3)
  g9MathCoordinateGeometry:                'a3091003-0000-0000-0000-000000000001',
  g9MathCGIdentifyQuadrants:               'a4091003-0001-0000-0000-000000000000',
  g9MathCGReadingCoordinates:              'a4091003-0002-0000-0000-000000000000',
  g9MathCGPlottingPoints:                  'a4091003-0003-0000-0000-000000000000',
  g9MathCGDistanceReflections:             'a4091003-0004-0000-0000-000000000000',
  g9MathCGTerminologyQuiz:                 'a4091003-0010-0000-0000-000000000000',

  // Grade 9 Math: Polynomials (Chapter 2)
  g9MathPolynomials:                       'a3091002-0000-0000-0000-000000000001',
  g9MathPolyIdentifying:                   'a4091002-0001-0000-0000-000000000000',
  g9MathPolyZeroes:                        'a4091002-0002-0000-0000-000000000000',
  g9MathPolyFactorisation:                 'a4091002-0003-0000-0000-000000000000',
  g9MathPolyIdentities:                    'a4091002-0004-0000-0000-000000000000',
  // ── GRADE 12 MATH: RELATIONS ──────────────────────────────────────────────
  g12MathRelations:                      'a3121001-0000-0000-0000-000000000001',
  g12MathRelationsCartesian:             'a4121001-0001-0000-0000-000000000000',
  g12MathRelationsDomainRange:           'a4121001-0002-0000-0000-000000000000',
  g12MathRelationsCounting:              'a4121001-0003-0000-0000-000000000000',
  g12MathRelationsEquivalence:           'a4121001-0004-0000-0000-000000000000',
  g12MathRelationsTerminologyQuiz:       'a4121001-0010-0000-0000-000000000000',

  // ── GRADE 12 MATH: FUNCTIONS ──────────────────────────────────────────────
  g12MathFunctions:                      'a3121002-0000-0000-0000-000000000001',
  g12MathFunctionsConcept:               'a4121002-0001-0000-0000-000000000000',
  g12MathFunctionsTypes:                 'a4121002-0002-0000-0000-000000000000',
  g12MathFunctionsAlgebra:               'a4121002-0003-0000-0000-000000000000',
  g12MathFunctionsEquations:             'a4121002-0004-0000-0000-000000000000',
  g12MathFunctionsDomainRange:           'a4121002-0005-0000-0000-000000000000',
  g12MathFunctionsTerminologyQuiz:       'a4121002-0010-0000-0000-000000000000',

  // ── GRADE 12 MATH: MATRICES ───────────────────────────────────────────────
  g12MathMatrices:                       'a3121003-0000-0000-0000-000000000001',
  g12MathMatricesOrder:                  'a4121003-0001-0000-0000-000000000000',
  g12MathMatricesTypes:                  'a4121003-0002-0000-0000-000000000000',
  g12MathMatricesOperations:             'a4121003-0003-0000-0000-000000000000',
  g12MathMatricesMultiplication:         'a4121003-0004-0000-0000-000000000000',
  g12MathMatricesTranspose:              'a4121003-0005-0000-0000-000000000000',
  g12MathMatricesInverse:                'a4121003-0006-0000-0000-000000000000',
  g12MathMatricesTerminologyQuiz:        'a4121003-0010-0000-0000-000000000000',

  // ── GRADE 12 MATH: DETERMINANTS ───────────────────────────────────────────
  g12MathDeterminants:                   'a3121004-0000-0000-0000-000000000001',
  g12MathDeterminantsFundamentals:       'a4121004-0001-0000-0000-000000000000',
  g12MathDeterminantsProperties:         'a4121004-0002-0000-0000-000000000000',
  g12MathDeterminantsArea:               'a4121004-0003-0000-0000-000000000000',
  g12MathDeterminantsMinorsCofactors:    'a4121004-0004-0000-0000-000000000000',
  g12MathDeterminantsAdjointInverse:     'a4121004-0005-0000-0000-000000000000',
  g12MathDeterminantsApplications:       'a4121004-0006-0000-0000-000000000000',
  g12MathDeterminantsTerminologyQuiz:    'a4121004-0010-0000-0000-000000000000',

  // ── GRADE 12 MATH: INVERSE TRIGONOMETRIC FUNCTIONS ────────────────────────
  g12MathITF:                            'a3121005-0000-0000-0000-000000000001',
  g12MathITFConcept:                     'a4121005-0001-0000-0000-000000000000',
  g12MathITFDefinitions:                 'a4121005-0002-0000-0000-000000000000',
  g12MathITFProperties:                  'a4121005-0003-0000-0000-000000000000',
  g12MathITFPrincipal:                   'a4121005-0004-0000-0000-000000000000',
  g12MathITFSimplification:              'a4121005-0005-0000-0000-000000000000',
  g12MathITFTerminologyQuiz:             'a4121005-0010-0000-0000-000000000000',
  g9MathPolyTerminologyQuiz:               'a4091002-0010-0000-0000-000000000000',

  // ── 7. GRADE 11 CHEMISTRY ─────────────────────────────────────────────────
  // Prefix convention: c=Chemistry, d=Physics, a=Maths, e=Biology (all hex-safe)
  // Format: [subject][level][Grade][SubjectCode][Chapter#] where level 3=chapter, 4=skill
  // Chemistry subject code: 14

  // Ch 1: Structure of Atom
  g11ChemistryStructureOfAtom:             'c3111401-0000-0000-0000-000000000001',

  // Skills (9 skills)
  g11ChemSOASubAtomicParticles:            'c4111401-0001-0000-0000-000000000000',
  g11ChemSOAAtomicModels:                  'c4111401-0002-0000-0000-000000000000',
  g11ChemSOABohrModel:                     'c4111401-0003-0000-0000-000000000000',
  g11ChemSOAHydrogenSpectrum:              'c4111401-0004-0000-0000-000000000000',
  g11ChemSOADualNature:                    'c4111401-0005-0000-0000-000000000000',
  g11ChemSOAHeisenberg:                    'c4111401-0006-0000-0000-000000000000',
  g11ChemSOAQuantumNumbers:                'c4111401-0007-0000-0000-000000000000',
  g11ChemSOAShapesOfOrbitals:              'c4111401-0008-0000-0000-000000000000',
  g11ChemSOAElectronicConfig:              'c4111401-0009-0000-0000-000000000000',

  // Terminology Quiz
  g11ChemSOATerminologyQuiz:               'c4111401-0010-0000-0000-000000000000',

  // ── 8. GRADE 11 PHYSICS ───────────────────────────────────────────────────
  // Prefix: d = Physics (hex-safe) | Physics subject code: 15

  // Ch 5: Laws of Motion
  g11PhysicsLOM:                           'd3111505-0000-0000-0000-000000000001',

  // Skills (6 skills)
  g11PhysLOMNewtons3Laws:                  'd4111505-0001-0000-0000-000000000000',
  g11PhysLOMMomentumImpulse:               'd4111505-0002-0000-0000-000000000000',
  g11PhysLOMConservationMomentum:          'd4111505-0003-0000-0000-000000000000',
  g11PhysLOMEquilibriumForces:             'd4111505-0004-0000-0000-000000000000',
  g11PhysLOMFriction:                      'd4111505-0005-0000-0000-000000000000',
  g11PhysLOMCircularMotion:                'd4111505-0006-0000-0000-000000000000',

  // Terminology Quiz
  g11PhysLOMTerminologyQuiz:               'd4111505-0010-0000-0000-000000000000',

  // Ch 6: Work, Energy and Power
  g11PhysicsWEP:                           'd3111506-0000-0000-0000-000000000001',

  // Skills (4 skills)
  g11PhysWEPWorkCalc:                      'd4111506-0001-0000-0000-000000000000',
  g11PhysWEPWorkEnergyTheorem:             'd4111506-0002-0000-0000-000000000000',
  g11PhysWEPPotentialEnergy:               'd4111506-0003-0000-0000-000000000000',
  g11PhysWEPConservation:                  'd4111506-0004-0000-0000-000000000000',

  // Terminology Quiz
  g11PhysWEPTerminologyQuiz:               'd4111506-0010-0000-0000-000000000000',

  // ── 9. GRADE 11 MATHS ─────────────────────────────────────────────────────
  // Prefix: a = Maths | Maths subject code: 10

  // Ch 1: Sets
  g11MathsSets:                            'a3111001-0000-0000-0000-000000000001',

  // Skills (9 skills)
  g11MathSetsWhatIsSet:                    'a4111001-0001-0000-0000-000000000000',
  g11MathSetsTypes:                        'a4111001-0002-0000-0000-000000000000',
  g11MathSetsEqualEquivalent:              'a4111001-0003-0000-0000-000000000000',
  g11MathSetsSubsetsIntervals:             'a4111001-0004-0000-0000-000000000000',
  g11MathSetsUniversalComplement:          'a4111001-0005-0000-0000-000000000000',
  g11MathSetsOperations:                   'a4111001-0006-0000-0000-000000000000',
  g11MathSetsVennDiagrams:                 'a4111001-0007-0000-0000-000000000000',
  g11MathSetsLawsProperties:               'a4111001-0008-0000-0000-000000000000',
  g11MathSetsCardinality:                  'a4111001-0009-0000-0000-000000000000',

  // Terminology Quiz
  g11MathSetsTerminologyQuiz:              'a4111001-0010-0000-0000-000000000000',

  // Ch 2: Relations and Functions
  g11MathsRAF:                             'a3111002-0000-0000-0000-000000000001',

  // Skills (6 skills)
  g11MathRAFCartesian:                     'a4111002-0001-0000-0000-000000000000',
  g11MathRAFRelations:                     'a4111002-0002-0000-0000-000000000000',
  g11MathRAFCounting:                      'a4111002-0003-0000-0000-000000000000',
  g11MathRAFFunctions:                     'a4111002-0004-0000-0000-000000000000',
  g11MathRAFSpecial:                       'a4111002-0005-0000-0000-000000000000',
  g11MathRAFAlgebra:                       'a4111002-0006-0000-0000-000000000000',

  // Terminology Quiz
  g11MathRAFTerminologyQuiz:               'a4111002-0010-0000-0000-000000000000',

  // ── 10. GRADE 11 BIOLOGY ──────────────────────────────────────────────────
  // Prefix: e = Biology (hex-safe) | Biology subject code: 16

  // Ch 4: The Cell — The Unit of Life
  g11BiologyTheCell:                       'e3111604-0000-0000-0000-000000000001',

  // Skills (8 skills)
  g11BiolTheCellCellTheory:                'e4111604-0001-0000-0000-000000000000',
  g11BiolTheCellProkEuk:                   'e4111604-0002-0000-0000-000000000000',
  g11BiolTheCellMembrane:                  'e4111604-0003-0000-0000-000000000000',
  g11BiolTheCellWall:                      'e4111604-0004-0000-0000-000000000000',
  g11BiolTheCellEndomembrane:              'e4111604-0005-0000-0000-000000000000',
  g11BiolTheCellOrganelles:               'e4111604-0006-0000-0000-000000000000',
  g11BiolTheCellNucleus:                   'e4111604-0007-0000-0000-000000000000',
  g11BiolTheCellPlantVsAnimal:             'e4111604-0008-0000-0000-000000000000',

  // Terminology Quiz
  g11BiolTheCellTerminologyQuiz:           'e4111604-0010-0000-0000-000000000000',

  // Ch 8: Cell — Structure and Functions (legacy test)
  // g11BiologyCellStructure:                 'e4111608-0001-0000-0000-000000000000',
  // Grade 12 Chemistry: Solutions
  g12ChemSolutions:                            'e3121601-0000-0000-0000-000000000001',
  g12ChemSolutionsTypes:                       'e4121601-0001-0000-0000-000000000000',
  g12ChemSolutionsConcentration:               'e4121601-0002-0000-0000-000000000000',
  g12ChemSolutionsSolubility:                  'e4121601-0003-0000-0000-000000000000',
  g12ChemSolutionsVapourPressure:              'e4121601-0004-0000-0000-000000000000',
  g12ChemSolutionsIdeal:                       'e4121601-0005-0000-0000-000000000000',
  g12ChemSolutionsColligative:                 'e4121601-0006-0000-0000-000000000000',
  g12ChemSolutionsTerminologyQuiz:             'e4121601-0010-0000-0000-000000000000',
  g12ChemSolutionsIntro:                       'e4121601-0011-0000-0000-000000000000',
  g12ChemSolutionsConnectomics:                'e4121601-0012-0000-0000-000000000000',
  g12ChemSolutionsVirtualLab:                  'e4121601-0013-0000-0000-000000000000',
  g12ChemSolutionsExamEdge:                    'e4121601-0014-0000-0000-000000000000',
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

  // Grade 10 Math: Quadratic Equations
  'g10-math-quadratic-equations':       NODE_IDS.g10MathQuadraticEquations,
  'g10-math-quadratic-foundations':     NODE_IDS.g10MathQuadraticFoundations,
  'g10-math-quadratic-representing':     NODE_IDS.g10MathQuadraticRepresenting,
  'g10-math-quadratic-identifying':      NODE_IDS.g10MathQuadraticIdentifying,
  'g10-math-quadratic-factorisation':    NODE_IDS.g10MathQuadraticFactorisation,
  'g10-math-quadratic-wp-factorisation': NODE_IDS.g10MathQuadraticWordProblemsFactorisation,
  'g10-math-quadratic-nature-roots':     NODE_IDS.g10MathQuadraticNatureOfRoots,
  'g10-math-quadratic-discriminant':     NODE_IDS.g10MathQuadraticDiscriminant,
  'g10-math-quadratic-real-life':        NODE_IDS.g10MathQuadraticRealLife,
  'g10-math-quadratic-chapter-test':     NODE_IDS.g10MathQuadraticChapterTest,

  // Grade 10 Math: Probability
  'g10-math-probability':               NODE_IDS.g10MathProbability,
  'g10-math-prob-random-experiments':   NODE_IDS.g10MathProbRandomExperiments,
  'g10-math-prob-theoretical':         NODE_IDS.g10MathProbTheoretical,
  'g10-math-prob-elementary':          NODE_IDS.g10MathProbElementary,
  'g10-math-prob-complementary':       NODE_IDS.g10MathProbComplementary,
  'g10-math-prob-impossible-sure':     NODE_IDS.g10MathProbImpossibleSure,
  'g10-math-prob-coins-dice':          NODE_IDS.g10MathProbCoinsDice,
  'g10-math-prob-cards':               NODE_IDS.g10MathProbCards,
  'g10-math-prob-selections':          NODE_IDS.g10MathProbSelections,
  'g10-math-prob-terminology':         NODE_IDS.g10MathProbTerminologyQuiz,
  'g10-math-prob-easy-test':           NODE_IDS.g10MathProbEasyTest,
  'g10-math-prob-medium-test':         NODE_IDS.g10MathProbMediumTest,
  'g10-math-prob-hard-test':           NODE_IDS.g10MathProbHardTest,

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

  // Grade 11 Chemistry: Structure of Atom
  'g11-chem-structure-of-atom':                NODE_IDS.g11ChemistryStructureOfAtom,
  'g11-chem-soa-sub-atomic-particles':         NODE_IDS.g11ChemSOASubAtomicParticles,
  'g11-chem-soa-atomic-models':                NODE_IDS.g11ChemSOAAtomicModels,
  'g11-chem-soa-bohr-model':                   NODE_IDS.g11ChemSOABohrModel,
  'g11-chem-soa-hydrogen-spectrum':            NODE_IDS.g11ChemSOAHydrogenSpectrum,
  'g11-chem-soa-dual-nature':                  NODE_IDS.g11ChemSOADualNature,
  'g11-chem-soa-heisenberg':                   NODE_IDS.g11ChemSOAHeisenberg,
  'g11-chem-soa-quantum-numbers':              NODE_IDS.g11ChemSOAQuantumNumbers,
  'g11-chem-soa-shapes-of-orbitals':           NODE_IDS.g11ChemSOAShapesOfOrbitals,
  'g11-chem-soa-electronic-config':            NODE_IDS.g11ChemSOAElectronicConfig,
  'g11-chem-soa-terminology':                  NODE_IDS.g11ChemSOATerminologyQuiz,

  // Grade 11 Physics: Laws of Motion
  'g11-phys-lom':                              NODE_IDS.g11PhysicsLOM,
  'g11-phys-lom-newtons-3-laws':               NODE_IDS.g11PhysLOMNewtons3Laws,
  'g11-phys-lom-momentum-impulse':             NODE_IDS.g11PhysLOMMomentumImpulse,
  'g11-phys-lom-conservation-momentum':        NODE_IDS.g11PhysLOMConservationMomentum,
  'g11-phys-lom-equilibrium-forces':           NODE_IDS.g11PhysLOMEquilibriumForces,
  'g11-phys-lom-friction':                     NODE_IDS.g11PhysLOMFriction,
  'g11-phys-lom-circular-motion':              NODE_IDS.g11PhysLOMCircularMotion,
  'g11-phys-lom-terminology':                  NODE_IDS.g11PhysLOMTerminologyQuiz,

  // Grade 11 Physics: Work, Energy and Power
  'g11-phys-wep':                              NODE_IDS.g11PhysicsWEP,
  'g11-phys-wep-work-calc':                    NODE_IDS.g11PhysWEPWorkCalc,
  'g11-phys-wep-work-energy-theorem':          NODE_IDS.g11PhysWEPWorkEnergyTheorem,
  'g11-phys-wep-potential-energy':             NODE_IDS.g11PhysWEPPotentialEnergy,
  'g11-phys-wep-conservation':                 NODE_IDS.g11PhysWEPConservation,
  'g11-phys-wep-terminology':                  NODE_IDS.g11PhysWEPTerminologyQuiz,

  // Grade 11 Maths: Sets
  'g11-math-sets':                             NODE_IDS.g11MathsSets,
  'g11-math-sets-what-is-set':                 NODE_IDS.g11MathSetsWhatIsSet,
  'g11-math-sets-types':                       NODE_IDS.g11MathSetsTypes,
  'g11-math-sets-equal-equivalent':            NODE_IDS.g11MathSetsEqualEquivalent,
  'g11-math-sets-subsets-intervals':           NODE_IDS.g11MathSetsSubsetsIntervals,
  'g11-math-sets-universal-complement':        NODE_IDS.g11MathSetsUniversalComplement,
  'g11-math-sets-operations':                  NODE_IDS.g11MathSetsOperations,
  'g11-math-sets-venn-diagrams':               NODE_IDS.g11MathSetsVennDiagrams,
  'g11-math-sets-laws-properties':             NODE_IDS.g11MathSetsLawsProperties,
  'g11-math-sets-cardinality':                 NODE_IDS.g11MathSetsCardinality,
  'g11-math-sets-terminology':                 NODE_IDS.g11MathSetsTerminologyQuiz,

  // Grade 11 Maths: Relations and Functions
  'g11-math-raf':                              NODE_IDS.g11MathsRAF,
  'g11-math-raf-cartesian':                    NODE_IDS.g11MathRAFCartesian,
  'g11-math-raf-relations':                    NODE_IDS.g11MathRAFRelations,
  'g11-math-raf-counting':                     NODE_IDS.g11MathRAFCounting,
  'g11-math-raf-functions':                    NODE_IDS.g11MathRAFFunctions,
  'g11-math-raf-special':                      NODE_IDS.g11MathRAFSpecial,
  'g11-math-raf-algebra':                      NODE_IDS.g11MathRAFAlgebra,
  'g11-math-raf-terminology':                  NODE_IDS.g11MathRAFTerminologyQuiz,

  // Grade 11 Biology: The Cell — The Unit of Life
  'g11-bio-the-cell':                          NODE_IDS.g11BiologyTheCell,
  'g11-bio-the-cell-cell-theory':              NODE_IDS.g11BiolTheCellCellTheory,
  'g11-bio-the-cell-prok-euk':                 NODE_IDS.g11BiolTheCellProkEuk,
  'g11-bio-the-cell-membrane':                 NODE_IDS.g11BiolTheCellMembrane,
  'g11-bio-the-cell-wall':                     NODE_IDS.g11BiolTheCellWall,
  'g11-bio-the-cell-endomembrane':             NODE_IDS.g11BiolTheCellEndomembrane,
  'g11-bio-the-cell-organelles':               NODE_IDS.g11BiolTheCellOrganelles,
  'g11-bio-the-cell-nucleus':                  NODE_IDS.g11BiolTheCellNucleus,
  'g11-bio-the-cell-plant-vs-animal':          NODE_IDS.g11BiolTheCellPlantVsAnimal,
  'g11-bio-the-cell-terminology':              NODE_IDS.g11BiolTheCellTerminologyQuiz,

  // Grade 11 Biology: Cell — Structure and Functions (legacy test)
  // 'g11-bio-cell-structure':                    NODE_IDS.g11BiologyCellStructure,

  // Grade 12 Math: Relations
  'g12-math-relations':                        NODE_IDS.g12MathRelations,
  'g12-math-relations-cartesian':              NODE_IDS.g12MathRelationsCartesian,
  'g12-math-relations-domain-range':           NODE_IDS.g12MathRelationsDomainRange,
  'g12-math-relations-counting':               NODE_IDS.g12MathRelationsCounting,
  'g12-math-relations-equivalence':            NODE_IDS.g12MathRelationsEquivalence,
  'g12-math-relations-terminology':            NODE_IDS.g12MathRelationsTerminologyQuiz,

  // Grade 12 Math: Functions
  'g12-math-functions':                        NODE_IDS.g12MathFunctions,
  'g12-math-functions-concept':                NODE_IDS.g12MathFunctionsConcept,
  'g12-math-functions-types':                  NODE_IDS.g12MathFunctionsTypes,
  'g12-math-functions-algebra':                NODE_IDS.g12MathFunctionsAlgebra,
  'g12-math-functions-equations':              NODE_IDS.g12MathFunctionsEquations,
  'g12-math-functions-domain-range':           NODE_IDS.g12MathFunctionsDomainRange,
  'g12-math-functions-terminology':            NODE_IDS.g12MathFunctionsTerminologyQuiz,

  // Grade 12 Math: Matrices
  'g12-math-matrices':                         NODE_IDS.g12MathMatrices,
  'g12-math-matrices-order':                   NODE_IDS.g12MathMatricesOrder,
  'g12-math-matrices-types':                   NODE_IDS.g12MathMatricesTypes,
  'g12-math-matrices-operations':              NODE_IDS.g12MathMatricesOperations,
  'g12-math-matrices-multiplication':          NODE_IDS.g12MathMatricesMultiplication,
  'g12-math-matrices-transpose':               NODE_IDS.g12MathMatricesTranspose,
  'g12-math-matrices-inverse':                 NODE_IDS.g12MathMatricesInverse,
  'g12-math-matrices-terminology':             NODE_IDS.g12MathMatricesTerminologyQuiz,

  // Grade 12 Math: Determinants
  'g12-math-determinants':                     NODE_IDS.g12MathDeterminants,
  'g12-math-determinants-fundamentals':        NODE_IDS.g12MathDeterminantsFundamentals,
  'g12-math-determinants-properties':          NODE_IDS.g12MathDeterminantsProperties,
  'g12-math-determinants-area':                NODE_IDS.g12MathDeterminantsArea,
  'g12-math-determinants-minors-cofactors':    NODE_IDS.g12MathDeterminantsMinorsCofactors,
  'g12-math-determinants-adjoint-inverse':     NODE_IDS.g12MathDeterminantsAdjointInverse,
  'g12-math-determinants-applications':        NODE_IDS.g12MathDeterminantsApplications,
  'g12-math-determinants-terminology':         NODE_IDS.g12MathDeterminantsTerminologyQuiz,

  // Grade 12 Math: Inverse Trigonometric Functions
  'g12-math-itf':                              NODE_IDS.g12MathITF,
  'g12-math-itf-concept':                      NODE_IDS.g12MathITFConcept,
  'g12-math-itf-definitions':                  NODE_IDS.g12MathITFDefinitions,
  'g12-math-itf-properties':                   NODE_IDS.g12MathITFProperties,
  'g12-math-itf-principal':                    NODE_IDS.g12MathITFPrincipal,
  'g12-math-itf-simplification':               NODE_IDS.g12MathITFSimplification,
  'g12-math-itf-terminology':                  NODE_IDS.g12MathITFTerminologyQuiz,

  // Grade 9 Math: Polynomials
  'g9-math-polynomials':                NODE_IDS.g9MathPolynomials,
  'g9-math-poly-identifying':           NODE_IDS.g9MathPolyIdentifying,
  'g9-math-poly-zeroes':                NODE_IDS.g9MathPolyZeroes,
  'g9-math-poly-factorisation':          NODE_IDS.g9MathPolyFactorisation,
  'g9-math-poly-identities':             NODE_IDS.g9MathPolyIdentities,
  'g9-math-poly-terminology':           NODE_IDS.g9MathPolyTerminologyQuiz,

  // Grade 8 Math: Comparing Quantities
  'g8-math-comparing-quantities':       NODE_IDS.g8MathComparingQuantities,
  'g8-math-cq-intro':                   NODE_IDS.g8MathCQIntro,
  'g8-math-cq-percentages':             NODE_IDS.g8MathComparingPercentages,
  'g8-math-cq-profit-loss':             NODE_IDS.g8MathComparingProfitLoss,
  'g8-math-cq-simple-interest':         NODE_IDS.g8MathComparingSimpleInterest,
  'g8-math-cq-compound-interest':       NODE_IDS.g8MathComparingCompoundInterest,
  'g8-math-cq-terminology':             NODE_IDS.g8MathCQTerminologyQuiz,

  // Grade 4 Math: Shapes Around Us
  'g4-math-shapes-around-us':           NODE_IDS.g4MathShapesAroundUs,
  'g4-math-shapes-intro':               NODE_IDS.g4MathShapesIntro,
  'g4-math-shapes-identifying-3d':      NODE_IDS.g4MathShapesIdentifying3D,
  'g4-math-shapes-nets': NODE_IDS.g4MathShapesNets,
  'g4-math-shapes-angles': NODE_IDS.g4MathShapesAngles,
  'g4-math-shapes-circles': NODE_IDS.g4MathShapesCircles,
  'g4-math-shapes-terminology': NODE_IDS.g4MathShapesTerminologyQuiz,

 

  // GRADE 3: TOY-JOY
  'g3-math-toy-joy-identifying-3d': NODE_IDS.g3MathToyJoyIdentifying3D,
  'g3-math-toy-joy-counting': NODE_IDS.g3MathToyJoyCounting,
  'g3-math-toy-joy-position': NODE_IDS.g3MathToyJoyPosition,
  'g3-math-toy-joy-properties': NODE_IDS.g3MathToyJoyProperties,
  'g3-math-toy-joy-classifying': NODE_IDS.g3MathToyJoyClassifying,
  'g3-math-toy-joy-opposite-faces': NODE_IDS.g3MathToyJoyOppositeFaces,
  'g3-math-toy-joy-building': NODE_IDS.g3MathToyJoyBuilding,
  'g3-math-toy-joy-sequencing': NODE_IDS.g3MathToyJoySequencing,
  'g3-math-toy-joy-test': NODE_IDS.g3MathToyJoyTest,

  // GRADE 2: WHAT IS LONG, WHAT IS ROUND
  'g2-math-long-round-shapes': NODE_IDS.g2MathLongRoundShapes,
  'g2-math-long-round-comparison': NODE_IDS.g2MathLongRoundComparison,
  'g2-math-long-round-classification': NODE_IDS.g2MathLongRoundClassification,
  'g2-math-long-round-mixed': NODE_IDS.g2MathLongRoundMixed,

  // GRADE 1: SHAPES AND SPACE
  'g1-math-shapes-space-identify': NODE_IDS.g1MathShapesSpaceIdentify,
  'g1-math-shapes-space-position': NODE_IDS.g1MathShapesSpacePosition,
  'g1-math-shapes-space-size':     NODE_IDS.g1MathShapesSpaceSize,
  'g1-math-shapes-space-mixed':    NODE_IDS.g1MathShapesSpaceMixed,

  // GRADE 1: NUMBERS 1-9
  'g1-math-numbers-1-9-reading':    NODE_IDS.g1MathNumbers19Reading,
  'g1-math-numbers-1-9-counting':   NODE_IDS.g1MathNumbers19Counting,
  'g1-math-numbers-1-9-sequence':   NODE_IDS.g1MathNumbers19Sequence,
  'g1-math-numbers-1-9-comparison': NODE_IDS.g1MathNumbers19Comparison,
  'g1-math-numbers-1-9-mixed':      NODE_IDS.g1MathNumbers19Mixed,

  // GRADE 1: ADDITION
  'g1-math-addition-visual':      NODE_IDS.g1MathAdditionVisual,
  'g1-math-addition-numeric':     NODE_IDS.g1MathAdditionNumeric,
  'g1-math-addition-number-line': NODE_IDS.g1MathAdditionNumberLine,
  'g1-math-addition-mixed':       NODE_IDS.g1MathAdditionMixed,

  // GRADE 1: SUBTRACTION
  'g1-math-subtraction-visual':  NODE_IDS.g1MathSubtractionVisual,
  'g1-math-subtraction-numeric': NODE_IDS.g1MathSubtractionNumeric,
  'g1-math-subtraction-zero':    NODE_IDS.g1MathSubtractionZero,
  'g1-math-subtraction-mixed':   NODE_IDS.g1MathSubtractionMixed,

  // GRADE 1: NUMBERS 10-20
  'g1-math-numbers-10-20-counting':   NODE_IDS.g1MathNumbers1020Counting,
  'g1-math-numbers-10-20-tens-ones':  NODE_IDS.g1MathNumbers1020TensOnes,
  'g1-math-numbers-10-20-comparison': NODE_IDS.g1MathNumbers1020Comparison,
  'g1-math-numbers-10-20-mixed':      NODE_IDS.g1MathNumbers1020Mixed,

  // GRADE 1: TIME
  'g1-math-time-day-night':    NODE_IDS.g1MathTimeDayNight,
  'g1-math-time-days-week':    NODE_IDS.g1MathTimeDaysWeek,
  'g1-math-time-before-after': NODE_IDS.g1MathTimeBeforeAfter,
  'g1-math-time-clock':        NODE_IDS.g1MathTimeClock,
  'g1-math-time-mixed':        NODE_IDS.g1MathTimeMixed,

  // GRADE 1: MEASUREMENT
  'g1-math-measurement-length-height': NODE_IDS.g1MathMeasurementLengthHeight,
  'g1-math-measurement-weight':        NODE_IDS.g1MathMeasurementWeight,
  'g1-math-measurement-capacity':      NODE_IDS.g1MathMeasurementCapacity,
  'g1-math-measurement-mixed':         NODE_IDS.g1MathMeasurementMixed,

  // GRADE 1: NUMBERS 21-50
  'g1-math-numbers-21-50-counting':   NODE_IDS.g1MathNumbers2150Counting,
  'g1-math-numbers-21-50-tens-ones':   NODE_IDS.g1MathNumbers2150TensOnes,
  'g1-math-numbers-21-50-comparison':  NODE_IDS.g1MathNumbers2150Comparison,
  'g1-math-numbers-21-50-mixed':       NODE_IDS.g1MathNumbers2150Mixed,

  // GRADE 1: DATA HANDLING
  'g1-math-data-handling-sorting':           NODE_IDS.g1MathDataHandlingSorting,
  'g1-math-data-handling-pictograph':        NODE_IDS.g1MathDataHandlingPictograph,
  'g1-math-data-handling-counting-grouping': NODE_IDS.g1MathDataHandlingCountingGrouping,
  'g1-math-data-handling-mixed':             NODE_IDS.g1MathDataHandlingMixed,

  // GRADE 1: PATTERNS
  'g1-math-patterns-identifying':  NODE_IDS.g1MathPatternsIdentifying,
  'g1-math-patterns-creating':     NODE_IDS.g1MathPatternsCreating,
  'g1-math-patterns-mixed':        NODE_IDS.g1MathPatternsMixed,

  // GRADE 1: NUMBERS 51-100
  'g1-math-numbers-51-100-counting':   NODE_IDS.g1MathNumbers51100Counting,
  'g1-math-numbers-51-100-writing':    NODE_IDS.g1MathNumbers51100Writing,
  'g1-math-numbers-51-100-names':      NODE_IDS.g1MathNumbers51100Names,
  'g1-math-numbers-51-100-comparison': NODE_IDS.g1MathNumbers51100Comparison,
  'g1-math-numbers-51-100-skip':       NODE_IDS.g1MathNumbers51100Skip,
  'g1-math-numbers-51-100-mixed':      NODE_IDS.g1MathNumbers51100Mixed,

  // Grade 12 Chemistry: Solutions
  'g12-chem-solutions':                        NODE_IDS.g12ChemSolutions,
  'g12-chem-solutions-types':                  NODE_IDS.g12ChemSolutionsTypes,
  'g12-chem-solutions-concentration':          NODE_IDS.g12ChemSolutionsConcentration,
  'g12-chem-solutions-solubility':             NODE_IDS.g12ChemSolutionsSolubility,
  'g12-chem-solutions-vapour-pressure':        NODE_IDS.g12ChemSolutionsVapourPressure,
  'g12-chem-solutions-ideal':                  NODE_IDS.g12ChemSolutionsIdeal,
  'g12-chem-solutions-colligative':            NODE_IDS.g12ChemSolutionsColligative,
  'g12-chem-solutions-terminology':            NODE_IDS.g12ChemSolutionsTerminologyQuiz,
  'g12-chem-solutions-introduction':           NODE_IDS.g12ChemSolutionsIntro,
  'g12-chem-solutions-connectomics':           NODE_IDS.g12ChemSolutionsConnectomics,
  'g12-chem-solutions-virtual-lab':            NODE_IDS.g12ChemSolutionsVirtualLab,
  'g12-chem-solutions-exam-edge':               NODE_IDS.g12ChemSolutionsExamEdge,
};
