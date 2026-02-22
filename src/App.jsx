import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MultiplicationPractice from './components/practice/class-5/WaystoMultiplyandDivide/Multiplication/multiplication_of_2_digit_numbers';
import MultiplicationPractice3D from './components/practice/class-5/WaystoMultiplyandDivide/Multiplication/multiplication_of_3_digit_numbers';
import MultiplicationPracticeMultiple from './components/practice/class-5/WaystoMultiplyandDivide/Multiplication/multiplication_of_multiple_numbers';
import MultiplicationEndingZero from './components/practice/class-5/WaystoMultiplyandDivide/Multiplication/multiplication_of_numbers_ending_in_zeros';
import MultiplicationWordProblems from './components/practice/class-5/WaystoMultiplyandDivide/Multiplication/multiplication_word_problems';
import DivisionPracticeOneDigit from './components/practice/class-5/WaystoMultiplyandDivide/Division/divide_one_digit_number';
import DivisionPracticeTwoDigit from './components/practice/class-5/WaystoMultiplyandDivide/Division/divide_by_two_digit_number';
import DivisionEndingZero from './components/practice/class-5/WaystoMultiplyandDivide/Division/divide_numbers_ending_zeros';
import DivisionWordProblems from './components/practice/class-5/WaystoMultiplyandDivide/Division/division_word_problems';
import MultiDivWordProblems from './components/practice/class-5/WaystoMultiplyandDivide/Skill_application_problems/skill_application_problems';
import MainLayout from './layouts/WebsiteLayout';
import Home from './pages/Home';
import AdminLogin from './pages/AdminLogin';
import MathSelection from './pages/MathSelection';
import GradeSyllabus from './pages/GradeSyllabus';
import PracticePage from './pages/PracticePage';
import ContentPage from './pages/ContentPage';
import DynamicQuestionsDashboard from './pages/DynamicQuestionsDashboard';
import PracticeSession from './pages/PracticeSession';
import UploaderLogin from './pages/UploaderLogin';
import RapidMathPage from './pages/RapidMathPage';
import Internship from './pages/internship/Internship';

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

// Components
import ProtectedRoute from './components/ProtectedRoute';

// Dashboards
import StudentDashboard from './pages/dashboards/student/StudentDashboard';
import TeacherLayout from './pages/dashboards/teacher/TeacherLayout';
import TeacherDashboard from './pages/dashboards/teacher/TeacherDashboard';
import TeacherStudents from './pages/dashboards/teacher/TeacherStudents';
import TeacherAssignments from './pages/dashboards/teacher/TeacherAssignments';
import TeacherAttendance from './pages/dashboards/teacher/TeacherAttendance';
import TeacherSettings from './pages/dashboards/teacher/TeacherSettings';
import ParentLayout from './pages/dashboards/parent/ParentLayout';
import ParentDashboard from './pages/dashboards/parent/ParentDashboard';
import ProgressPage from './pages/dashboards/parent/ProgressPage';
import QuizzesPage from './pages/dashboards/parent/QuizzesPage';
import SkillsPage from './pages/dashboards/parent/SkillsPage';
import ReportsPage from './pages/dashboards/parent/ReportsPage';
import SettingsPage from './pages/dashboards/parent/SettingsPage';
import NotificationsPage from './pages/dashboards/parent/NotificationsPage';
import GuestDashboard from './pages/dashboards/guest/GuestDashboard';
import MentorDashboard from './pages/dashboards/mentor/MentorDashboard';

// Admin Dashboard
import AdminLayout from './pages/dashboards/admin/AdminLayout';
import AdminDashboard from './pages/dashboards/admin/AdminDashboard';
// Admin Pages
import AdminStudentsPage from './pages/dashboards/admin/pages/StudentsPage';
import AdminTeachersPage from './pages/dashboards/admin/pages/TeachersPage';
import AdminParentsPage from './pages/dashboards/admin/pages/ParentsPage';
import AdminGuestsPage from './pages/dashboards/admin/pages/GuestsPage';
import AdminUploadersPage from './pages/dashboards/admin/pages/UploadersPage';
import AdminAssessmentUploadersPage from './pages/dashboards/admin/pages/AssessmentUploadersPage';
import AdminClassesPage from './pages/dashboards/admin/pages/ClassesPage';
import AdminQuizzesPage from './pages/dashboards/admin/pages/QuizzesPage';
import AdminQuestionBankPage from './pages/dashboards/admin/pages/QuestionBankPage';
import AdminSkillsPage from './pages/dashboards/admin/pages/SkillsPage';
import AdminQuestionGenerationPage from './pages/dashboards/admin/pages/QuestionGenerationPage';
import AdminTemplatesPage from './pages/dashboards/admin/pages/TemplatesPage';
import AdminGeneratedQuestionsPage from './pages/dashboards/admin/pages/GeneratedQuestionsPage';
import AdminAlertsPage from './pages/dashboards/admin/pages/AlertsPage';
import AdminAnalyticsPage from './pages/dashboards/admin/pages/AnalyticsPage';
import AdminSystemHealthPage from './pages/dashboards/admin/pages/SystemHealthPage';
import AdminActivityLogPage from './pages/dashboards/admin/pages/ActivityLogPage';
import AdminSettingsPage from './pages/dashboards/admin/pages/SettingsPage';

import UploaderDashboard from './pages/uploader/UploaderDashboard';
import AssessmentUploaderLogin from './pages/AssessmentUploaderLogin';
import AssessmentUploaderDashboard from './pages/dashboards/AssessmentUploaderDashboard';
import AssessmentAccessPage from './pages/AssessmentAccessPage';
import AssessmentStudentDashboard from './pages/dashboards/AssessmentStudentDashboard';
import AssessmentRunner from './pages/AssessmentRunner';

// Junior Pages (Grades 1-4 child-friendly design)
import JuniorGradeSyllabus from './pages/juniors/JuniorGradeSyllabus';
import JuniorSubtopics from './pages/juniors/JuniorSubtopics';
import JuniorPracticeSession from './pages/juniors/JuniorPracticeSession';
import DrawTiles from './components/practice/class-3/House-of-Hundreds-II/Draw-tiles';
import NeighbouringNumbers from './components/practice/class-3/House-of-Hundreds-II/neighbouring-numbers';
import HelpCranesOnNumberLine from './components/practice/class-3/House-of-Hundreds-II/Help-cranes-on-number-line';
import Tambola from './components/practice/class-3/House-of-Hundreds-II/Tambola';
import SkipAndSolve from './components/practice/class-3/House-of-Hundreds-II/skip-&-solve';
import NumberInTheCentre from './components/practice/class-3/House-of-Hundreds-II/number-in-the-centre';
import NumberPuzzles from './components/practice/class-3/House-of-Hundreds-II/number-puzzles';
import TheNumberDetective from './components/practice/class-3/House-of-Hundreds-II/The-number-detective';
import PaperSlips from './components/practice/class-3/House-of-Hundreds-II/Paper-slips';
import GuessTheNumber from './components/practice/class-3/House-of-Hundreds-II/Guess-the-number';

// Grade 5 Decimal Practice Components
import PlaceValuesOfDecimals from './components/practice/class-5/TenthsandHundrendths/Decimals/place-values-of-decimals';
import FractionToDecimalConversion from './components/practice/class-5/TenthsandHundrendths/Decimals/fraction-to-decimal-conversion';
import DecimalVisualRepresentation from './components/practice/class-5/TenthsandHundrendths/Decimals/decimal-visual-representation';
import DecimalInMeasurement from './components/practice/class-5/TenthsandHundrendths/Decimals/decimal-in-measurement';
import DecimalInMoney from './components/practice/class-5/TenthsandHundrendths/Decimals/decimal-in-money';
import ComparingDecimals from './components/practice/class-5/TenthsandHundrendths/Decimals/comparing-decimals';
import DecimalOperations from './components/practice/class-5/TenthsandHundrendths/Decimals/decimal-operations';
import ConversionBetweenForms from './components/practice/class-5/TenthsandHundrendths/Decimals/conversion-between-forms';
import DecimalWordProblems from './components/practice/class-5/TenthsandHundrendths/SkillApplicationProb/skill_app_prob_decimal';

// Grade 5 Area and its Boundary Components
import FindingArea from './components/practice/class-5/AreaanditsBoundary/Area/FindingArea';
import CompareShapesSameArea from './components/practice/class-5/AreaanditsBoundary/Area/CompareShapesSameArea';
import AreaRealLife from './components/practice/class-5/AreaanditsBoundary/Area/AreaRealLife';
import AppropriateAreaUnits from './components/practice/class-5/AreaanditsBoundary/Area/AppropriateAreaUnits';
import FindingPerimeter from './components/practice/class-5/AreaanditsBoundary/Perimeter/FindingPerimeter';
import PerimeterAsBoundary from './components/practice/class-5/AreaanditsBoundary/Perimeter/PerimeterAsBoundary';
import SamePerimeterDifferentShapes from './components/practice/class-5/AreaanditsBoundary/Perimeter/SamePerimeterDifferentShapes';
import PerimeterRealLife from './components/practice/class-5/AreaanditsBoundary/Perimeter/PerimeterRealLife';
import AreaPerimeterRelationship from './components/practice/class-5/AreaanditsBoundary/AreaPerimeterRelationship/AreaPerimeterRelationship';
import SkillApplicationProblemsArea from './components/practice/class-5/AreaanditsBoundary/Skillapplicationproblems/SkillApplicationProblemsArea';

// Grade 5 - How Big? How Heavy?
import VolumeByDisplacement from './components/practice/class-5/Howbighowheavy/volume measurement/volume-by-displacement';
import UnitsOfVolume from './components/practice/class-5/Howbighowheavy/volume measurement/units-of-volume';
import VolumeEstimation from './components/practice/class-5/Howbighowheavy/volume measurement/volume-estimation';
import VolumeUsingUnitCubes from './components/practice/class-5/Howbighowheavy/volume measurement/volume-using-unit-cubes';
import UnitsOfMass from './components/practice/class-5/Howbighowheavy/mass measurement/units-of-mass';
import MassConversion from './components/practice/class-5/Howbighowheavy/mass measurement/mass-conversion';
import MassCalculation from './components/practice/class-5/Howbighowheavy/mass measurement/mass-calculation';
import WeightEstimationComparison from './components/practice/class-5/Howbighowheavy/mass measurement/weight-estimation-comparison';
import ThreeDShapeConstruction from './components/practice/class-5/Howbighowheavy/measurement based reasoning/3d-shape-construction';
import PackagingAndLayering from './components/practice/class-5/Howbighowheavy/measurement based reasoning/packaging-and-layering';
import MeasurementInRealLife from './components/practice/class-5/Howbighowheavy/measurement based reasoning/measurement-in-real-life';
import SkillApplicationProblems from './components/practice/class-5/Howbighowheavy/skill application problem/skill-application-problem';

import RakshaBandhanIntro from './components/practice/class-3/Raksha-Bandhan/fill-in-the-blanks';
import RakshaBandhanMultiplication from './components/practice/class-3/Raksha-Bandhan/multiplication';
import RakshaBandhanDivision from './components/practice/class-3/Raksha-Bandhan/division';
import PowersWithNegativeExponents from './components/practice/class-8/exponents and powers/powers_with_negative_exponents';
import LawsOfExponentsClass8 from './components/practice/class-8/exponents and powers/laws_of_exponents';
import LawsOfExponentsApplication from './components/practice/class-8/exponents and powers/laws_of_exponents_application';
import StandardFormSmallNumbers from './components/practice/class-8/exponents and powers/standard_form_small_numbers';
import ComparingLargeSmallNumbers from './components/practice/class-8/exponents and powers/comparing_large_small_numbers';
import Associativity from './components/practice/class-8/rational-numbers/associativity';
import Commutativity from './components/practice/class-8/rational-numbers/commutativity';
import AdditiveMultiplicativeIdentity from './components/practice/class-8/rational-numbers/additive_multiplicative_identity';
import Distributivity from './components/practice/class-8/rational-numbers/distributivity';
import AreaOfPolygon from './components/practice/class-8/mensuration/area_of_polygon';
import SurfaceAreaCuboid from './components/practice/class-8/mensuration/surface_area_cuboid';
import SurfaceAreaCube from './components/practice/class-8/mensuration/surface_area_cube';
import SurfaceAreaCylinder from './components/practice/class-8/mensuration/surface_area_cylinder';
import VolumeOfCube from './components/practice/class-8/mensuration/volume_of_cube';
import VolumeOfCuboid from './components/practice/class-8/mensuration/volume_of_cuboid';
import VolumeOfCylinder from './components/practice/class-8/mensuration/volume_of_cylinder';
import VolumeAndCapacity from './components/practice/class-8/mensuration/volume_and_capacity';
import MethodOfCommonFactors from './components/practice/class-8/factorisation/method_of_common_factors';
import FactorisationByRegrouping from './components/practice/class-8/factorisation/factorisation_by_regrouping';
import FactorisationUsingIdentities from './components/practice/class-8/factorisation/factorisation_using_identities';
import FactorsOfFormXplusAXplusB from './components/practice/class-8/factorisation/factors_of_form_x_plus_a_x_plus_b';
import DivisionMonomialByMonomial from './components/practice/class-8/factorisation/division_monomial_by_monomial';
import DivisionPolynomialByMonomial from './components/practice/class-8/factorisation/division_polynomial_by_monomial';
import DivisionPolynomialByPolynomial from './components/practice/class-8/factorisation/division_polynomial_by_polynomial';

// Grade 1 Specialized Components
import Grade1ShapesAndSpace from './components/practice/grade-1/shapes-and-space';
import Grade1Numbers1to9 from './components/practice/grade-1/numbers-1-9';
import Grade1Addition from './components/practice/grade-1/addition';
import Grade1Subtraction from './components/practice/grade-1/subtraction';
import Grade1Numbers10to20 from './components/practice/grade-1/numbers-10-20';
import Grade1Time from './components/practice/grade-1/time';
import Grade1Measurement from './components/practice/grade-1/measurement';
import Grade1Numbers21to50 from './components/practice/grade-1/numbers-21-50';
import Grade1DataHandling from './components/practice/grade-1/data-handling';
import Grade1Patterns from './components/practice/grade-1/patterns';
import Grade1Numbers51to100 from './components/practice/grade-1/numbers-51-100';
import IdentifyingShapes from './components/practice/class-2/what-is-long,what-is-round/identifying_shapes';
import ComparingLengths from './components/practice/class-2/what-is-long,what-is-round/comparing_lengths';
import RecognizingRoundObjects from './components/practice/class-2/what-is-long,what-is-round/recognizing_round_objects';
import ComparingWeights from './components/practice/class-2/c-203/how-much-can-you-carry/ComparingWeights';
import HeavierLighter from './components/practice/class-2/c-203/how-much-can-you-carry/HeavierLighter';
import EstimatingWeight from './components/practice/class-2/c-203/how-much-can-you-carry/EstimatingWeight';
import CountingInPairs from './components/practice/class-2/Counting in Groups/counting_in_pairs';
import SkipCounting from './components/practice/class-2/Counting in Groups/skip_counting';
import RepeatedAdditionClass2 from './components/practice/class-2/Counting in Groups/repeated_addition';
import NumbersUpTo100 from './components/practice/class-2/Counting in Tens/numbers_up_to_100';
import PlaceValueTensOnes from './components/practice/class-2/Counting in Tens/place_value_tens_ones';
import ExpandedForm from './components/practice/class-2/Counting in Tens/expanded_form';
import ComparingNumbers from './components/practice/class-2/Counting in Tens/comparing_numbers';

// Grade 5: Can you see the Pattern?
import PatternIdentification from './components/practice/class-5/CanyouseethePattern/PatternRecognition/pattern-identification';
import RuleBasedPatternCreation from './components/practice/class-5/CanyouseethePattern/PatternRecognition/rule-based-pattern-creation';
import UnderstandingRotations from './components/practice/class-5/CanyouseethePattern/PatternRecognition/understanding-rotations';
import GridPatternRecognition from './components/practice/class-5/CanyouseethePattern/PatternRecognition/grid-pattern-recognition';
import PropertiesOfOperation from './components/practice/class-5/CanyouseethePattern/NummberProperties/properties-of-operations';
import DigitRelationships from './components/practice/class-5/CanyouseethePattern/NummberProperties/digit-relationships';
import PalindromeRecognition from './components/practice/class-5/CanyouseethePattern/NummberProperties/palindrome-recognition';
import StructuredNumberPatterns from './components/practice/class-5/CanyouseethePattern/NummberProperties/structured-number-patterns';
import RuleApplications from './components/practice/class-5/CanyouseethePattern/LogicalReasoning/rule-application';
import MultiStepOperations from './components/practice/class-5/CanyouseethePattern/LogicalReasoning/multi-step-operations';
import MissingNumberReasoning from './components/practice/class-5/CanyouseethePattern/LogicalReasoning/missing-number-reasoning';
import MentalCalculationReasoning from './components/practice/class-5/CanyouseethePattern/LogicalReasoning/mental-calculation-strategies';
import SkillApplicationProblemsPatterns from './components/practice/class-5/CanyouseethePattern/SkillApplicationProblems/skill-application-problems-patterns';
import ChapterTestPatterns from './components/practice/class-5/CanyouseethePattern/ChapterTest/chapter-test';

// Middle Pages (Grades 5-7 professional design)
import MiddleGradeSyllabus from './pages/middle/MiddleGradeSyllabus';
import MiddlePracticeSession from './pages/middle/MiddlePracticeSession';
import RectanglePractice from './components/practice/grade-6/Perimeter and Area/Rectangle';
import SquarePractice from './components/practice/grade-6/Perimeter and Area/Square';
import TrianglePractice from './components/practice/grade-6/Perimeter and Area/Triangle';
import RegularPolygonPractice from './components/practice/grade-6/Perimeter and Area/Regular Polygon';
import MixedBagPractice from './components/practice/grade-6/Perimeter and Area/MixedBag';
import VisualisingNumberSequences from './components/practice/grade-6/patterns-in-mathematics/VisualisingNumberSequences';
import RelationsAmongNumberSequences from './components/practice/grade-6/patterns-in-mathematics/RelationsAmongNumberSequences';
import PatternsInShapes from './components/practice/grade-6/patterns-in-mathematics/PatternsInShapes';
import NumbersCanTellUsThings from './components/practice/grade-6/number-play/NumbersCanTellUsThings';
import Supercells from './components/practice/grade-6/number-play/Supercells';
import GrowingPatterns from './components/practice/grade-6/number-play/GrowingPatterns';
import CollectingAndOrganisingData from './components/practice/grade-6/DataHandlingAndPresentation/CollectingAndOrganisingData';
import Pictographs from './components/practice/grade-6/DataHandlingAndPresentation/Pictographs';
import BarGraphs from './components/practice/grade-6/DataHandlingAndPresentation/BarGraphs';
import DrawingABarGraph from './components/practice/grade-6/DataHandlingAndPresentation/DrawingABarGraph';
import FigureItOut from './components/practice/grade-6/DataHandlingAndPresentation/FigureItOut';

import PlayingWithDigits from './components/practice/grade-6/number-play/PlayingWithDigits';
import Percentage from './components/practice/class-7/comparing quantities/Percentage';
import UseOfPercentages from './components/practice/class-7/comparing quantities/UseOfPercentages';
import ProfitAndLoss from './components/practice/class-7/comparing quantities/ProfitAndLoss';
import SimpleInterest from './components/practice/class-7/comparing quantities/SimpleInterest';
import ExponentsBasics from './components/practice/class-7/exponents and powers/ExponentsBasics';
import LawsOfExponents7 from './components/practice/class-7/exponents and powers/LawsOfExponents';
import DecimalNumberSystem from './components/practice/class-7/exponents and powers/DecimalNumberSystem';
import StandardForm from './components/practice/class-7/exponents and powers/StandardForm';
import ComparingQuantitiesTest from './components/practice/class-7/comparing quantities/ComparingQuantitiesTest';
import ExponentsPowersTest from './components/practice/class-7/exponents and powers/ExponentsPowersTest';
import NeedForRationalNumbers from './components/practice/class-7/rational numbers/NeedForRationalNumbers';
import WhatAreRationalNumbers from './components/practice/class-7/rational numbers/WhatAreRationalNumbers';
import PositiveNegativeRationalNumbers from './components/practice/class-7/rational numbers/PositiveNegativeRationalNumbers';
import RationalNumbersNumberLine from './components/practice/class-7/rational numbers/RationalNumbersNumberLine';
import RationalNumbersStandardForm from './components/practice/class-7/rational numbers/RationalNumbersStandardForm';
import ComparisonOfRationalNumbers from './components/practice/class-7/rational numbers/ComparisonOfRationalNumbers';
import RationalNumbersBetween from './components/practice/class-7/rational numbers/RationalNumbersBetween';
import OperationsOnRationalNumbers from './components/practice/class-7/rational numbers/OperationsOnRationalNumbers';
import RationalNumbersTest from './components/practice/class-7/rational numbers/RationalNumbersTest';
import PlaneFiguresSolidShapes from './components/practice/class-7/visualising solid shapes/PlaneFiguresSolidShapes';
import FacesEdgesVertices from './components/practice/class-7/visualising solid shapes/FacesEdgesVertices';
import NetsBuilding3DShapes from './components/practice/class-7/visualising solid shapes/NetsBuilding3DShapes';
import DrawingSolids from './components/practice/class-7/visualising solid shapes/DrawingSolids';
import ViewingSections from './components/practice/class-7/visualising solid shapes/ViewingSections';
import VisualisingSolidShapesTest from './components/practice/class-7/visualising solid shapes/VisualisingSolidShapesTest';
import LineSymmetry from './components/practice/class-7/symmetry/LineSymmetry';
import RegularPolygonsSymmetry from './components/practice/class-7/symmetry/RegularPolygonsSymmetry';
import MirrorReflectionSymmetry from './components/practice/class-7/symmetry/MirrorReflectionSymmetry';
import RotationalSymmetry from './components/practice/class-7/symmetry/RotationalSymmetry';
import LineRotationalRelationship from './components/practice/class-7/symmetry/LineRotationalRelationship';
import SymmetryTest from './components/practice/class-7/symmetry/SymmetryTest';

import Formation from './components/practice/class-7/algebraic expressions/Formation';
import TermsFactors from './components/practice/class-7/algebraic expressions/TermsFactors';
import Coefficients from './components/practice/class-7/algebraic expressions/Coefficients';
import LikeUnlikeTerms from './components/practice/class-7/algebraic expressions/LikeUnlikeTerms';
import Polynomials from './components/practice/class-7/algebraic expressions/Polynomials';
import FindingValue from './components/practice/class-7/algebraic expressions/FindingValue';
import AlgebraicExpressionsTest from './components/practice/class-7/algebraic expressions/AlgebraicExpressionsTest';
import AreaParallelogram from './components/practice/class-7/perimeter area/AreaParallelogram';
import AreaTriangle from './components/practice/class-7/perimeter area/AreaTriangle';
import Circles from './components/practice/class-7/perimeter area/Circles';
import PerimeterAreaTest from './components/practice/class-7/perimeter area/PerimeterAreaTest';

// Senior Pages (Grades 8-10 professional design)
import SeniorGradeSyllabus from './pages/high/SeniorGradeSyllabus';
import HighPracticeSession from './pages/high/HighPracticeSession';
import IntroductionToLinearEquations from './components/practice/class-10/Pair of linear equations in two variables/IntroductionToLinearEquations';
import GraphicalMethod from './components/practice/class-10/Pair of linear equations in two variables/GraphicalMethod';
import AlgebraicMethods from './components/practice/class-10/Pair of linear equations in two variables/AlgebraicMethods';
import ConditionsForConsistency from './components/practice/class-10/Pair of linear equations in two variables/ConditionsForConsistency';
import ApplicationProblems from './components/practice/class-10/Pair of linear equations in two variables/ApplicationProblems';
import StandardFormEquations from './components/practice/class-10/Pair of linear equations in two variables/StandardFormEquations';
import RecognisingPatterns from './components/practice/class-10/Arithmetic Progressions/RecognisingPatterns';
import UnderstandingAP from './components/practice/class-10/Arithmetic Progressions/UnderstandingAP';
import IdentifyingTerms from './components/practice/class-10/Arithmetic Progressions/IdentifyingTerms';
import FindingSpecificTerms from './components/practice/class-10/Arithmetic Progressions/FindingSpecificTerms';
import SumOfTerms from './components/practice/class-10/Arithmetic Progressions/SumOfTerms';
import ArithmeticProgressionsTest from './components/practice/class-10/Arithmetic Progressions/ArithmeticProgressionsTest';
import FoundationsQuadratic from './components/practice/class-10/Quadratic Equations/FoundationsQuadratic';
import RepresentingSituations from './components/practice/class-10/Quadratic Equations/RepresentingSituations';
import IdentifyingQuadratic from './components/practice/class-10/Quadratic Equations/IdentifyingQuadratic';
import RootsByFactorisation from './components/practice/class-10/Quadratic Equations/RootsByFactorisation';
import WordProblemsFactorisation from './components/practice/class-10/Quadratic Equations/WordProblemsFactorisation';
import NatureOfRoots from './components/practice/class-10/Quadratic Equations/NatureOfRoots';
import DiscriminantAnalysis from './components/practice/class-10/Quadratic Equations/DiscriminantAnalysis';
import RealLifeApplications from './components/practice/class-10/Quadratic Equations/RealLifeApplications';
import QuadraticEquationsTest from './components/practice/class-10/Quadratic Equations/QuadraticEquationsTest';

// Class 10: Real Numbers
import RealNumberFoundations from './components/practice/class-10/Real Numbers/RealNumberFoundations';
import EuclidsDivision from './components/practice/class-10/Real Numbers/EuclidsDivision';
import PrimeFactorisation from './components/practice/class-10/Real Numbers/PrimeFactorisation';
import FundamentalTheoremArithmetic from './components/practice/class-10/Real Numbers/FundamentalTheoremArithmetic';
import HCFandLCM from './components/practice/class-10/Real Numbers/HCFandLCM';
import HCFLCMApplications from './components/practice/class-10/Real Numbers/HCFLCMApplications';
import ProvingIrrationality from './components/practice/class-10/Real Numbers/ProvingIrrationality';
import IrrationalOperations from './components/practice/class-10/Real Numbers/IrrationalOperations';
import RealNumbersTest from './components/practice/class-10/Real Numbers/RealNumbersTest';

// Class 12 - Matrices Chapter
import MatricesChapter from './components/practice/class-12/MatricesChapter';
import WhoUsesMatrices from './components/practice/class-12/pages/WhoUsesMatrices';
import WhatIsMatrix from './components/practice/class-12/pages/WhatIsMatrix';
import WhenDoWeNeedMatrices from './components/practice/class-12/pages/WhenDoWeNeedMatrices';
import HowOperationsWork from './components/practice/class-12/pages/HowOperationsWork';
import WhyRulesWork from './components/practice/class-12/pages/WhyRulesWork';
import WhereApplied from './components/practice/class-12/pages/WhereApplied';
import InvertibleMatrices from './components/practice/class-12/pages/InvertibleMatrices';
import MatrixOrderTest from './components/practice/class-12/tests/MatrixOrderTest';
import MatrixTypesTest from './components/practice/class-12/tests/MatrixTypesTest';
import MatrixEqualityTest from './components/practice/class-12/tests/MatrixEqualityTest';
import MatrixOperationsTest from './components/practice/class-12/tests/MatrixOperationsTest';
import MatrixTransposeTest from './components/practice/class-12/tests/MatrixTransposeTest';
import InvertibleMatricesTest from './components/practice/class-12/tests/InvertibleMatricesTest';
import MatricesChapterTest from './components/practice/class-12/tests/MatricesChapterTest';

// Grade 3 - Fair Share
import FairShareCutting from './components/practice/class-3/fair-share/cutting';
import FairShareHalvesDoubles from './components/practice/class-3/fair-share/halves&doubles';
import FairShareDraw from './components/practice/class-3/fair-share/draw-halves';
import FairShareGuesswho from './components/practice/class-3/fair-share/guess-who-am-i';
import LongerShorterStrings from './components/practice/class-3/Fun-at-class-party/Longer&Shorter-strings';
import HeightsAndMeters from './components/practice/class-3/Fun-at-class-party/heights-and-meters';

// Grade 4 - The Cleanest Village
import RepeatedAddition from './components/practice/class-4/The_Cleanest_Village/Equal_Groups_and_Repeated_Addition/repeated_addition';
import RepeatedSubtraction from './components/practice/class-4/The_Cleanest_Village/Equal_Groups_and_Repeated_Addition/repeated_subtraction';
import AdditionWithRegrouping from './components/practice/class-4/The_Cleanest_Village/Addition_with_Regrouping/addition_with_regrouping';
import TwoDigitAdditionRegrouping from './components/practice/class-4/The_Cleanest_Village/Addition_with_Regrouping/two_digit_plus_two_digit_regrouping';
import ThreeDigitAdditionRegrouping from './components/practice/class-4/The_Cleanest_Village/Addition_with_Regrouping/three_digit_plus_three_digit_regrouping';
import SubtractionWithRegrouping from './components/practice/class-4/The_Cleanest_Village/Subtraction_with_Regrouping/subtraction_with_regrouping';
import TwoDigitSubtractionRegrouping from './components/practice/class-4/The_Cleanest_Village/Subtraction_with_Regrouping/two_digit_minus_two_digit_regrouping';
import ThreeDigitSubtractionRegrouping from './components/practice/class-4/The_Cleanest_Village/Subtraction_with_Regrouping/three_digit_minus_three_digit_regrouping';
import FindMissingAddend from './components/practice/class-4/The_Cleanest_Village/Missing_Value_and_Balance/find_missing_addend';
import FindMissingSubtrahend from './components/practice/class-4/The_Cleanest_Village/Missing_Value_and_Balance/find_missing_subtrahend';
import FindHowManyMoreOrLess from './components/practice/class-4/The_Cleanest_Village/Comparison_and_Difference/find_how_many_more_or_less';
import ChapterSceneMixedOperations from './components/practice/class-4/The_Cleanest_Village/Word_Problems/chapter_scene_mixed_operations';
import LetUsPlay from './components/practice/class-4/The_Cleanest_Village/Let_Us_Play/let_us_play';
import ChapterTest from './components/practice/class-4/The_Cleanest_Village/Chapter_Test/chapter_test';

// Grade 4 - Equal Groups
import JumpBasedMultiples from './components/practice/class-4/Equal_Groups/Multiples_and_Skip_Counting/jump_based_multiples';
import CommonMultiplesFromJumps from './components/practice/class-4/Equal_Groups/Multiples_and_Skip_Counting/common_multiples_from_jumps';
import GroupSizeAndNumberOfGroups from './components/practice/class-4/Equal_Groups/Equal_Groups_to_Multiplication/group_size_and_number_of_groups';
import ArraysRowsAndColumns from './components/practice/class-4/Equal_Groups/Equal_Groups_to_Multiplication/arrays_rows_and_columns';
import DoublingNumbers from './components/practice/class-4/Equal_Groups/Doubling_and_Number_Patterns/doubling_numbers';
import DoublingOnesDigitPatterns from './components/practice/class-4/Equal_Groups/Doubling_and_Number_Patterns/doubling_ones_digit_patterns';
import MultiplyUsingTens from './components/practice/class-4/Equal_Groups/Multiplication_Strategies/multiply_using_tens';
import MultiplyUsingHundreds from './components/practice/class-4/Equal_Groups/Multiplication_Strategies/multiply_using_hundreds';
import BreakApartMultiplication from './components/practice/class-4/Equal_Groups/Multiplication_Strategies/break_apart_multiplication';
import EqualGroupsStoryProblems from './components/practice/class-4/Equal_Groups/Multiplication_Word_Problems/equal_groups_story_problems';
import DivisionByPartialGroups from './components/practice/class-4/Equal_Groups/Division_as_Grouping/division_by_partial_groups';
import DivisionWithRemainders from './components/practice/class-4/Equal_Groups/Division_as_Grouping/division_with_remainders';
import DivideUsingPatterns from './components/practice/class-4/Equal_Groups/Division_Patterns_and_Sharing/divide_using_patterns';
import EqualSharingDivision from './components/practice/class-4/Equal_Groups/Division_Patterns_and_Sharing/equal_sharing_division';
import EqualGroupsMixedWordProblems from './components/practice/class-4/Equal_Groups/Mixed_Multiplication_Division_Word_Problems/equal_groups_mixed_word_problems';
import AlwaysSometimesNeverStatements from './components/practice/class-4/Equal_Groups/Mathematical_Reasoning/always_sometimes_never_statements';
import FindTheMistakeEqualGroups from './components/practice/class-4/Equal_Groups/Mathematical_Reasoning/find_the_mistake_equal_groups';
import CreateYourOwnEqualGroups from './components/practice/class-4/Equal_Groups/Mathematical_Reasoning/create_your_own_equal_groups';
// Grade 4 - Weigh It, Pour It
import GramToKilogramFractions from './components/practice/class-4/Weigh_It_Pour_It/Weight_Unit_Conversion/gram_to_kilogram_fractions';
import MakeOneKilogramUsingPackets from './components/practice/class-4/Weigh_It_Pour_It/Weight_Unit_Conversion/make_one_kilogram_using_packets';
import MillilitreToLitreFractions from './components/practice/class-4/Weigh_It_Pour_It/Capacity_Unit_Conversion/millilitre_to_litre_fractions';
import MakeOneLitreUsingBottles from './components/practice/class-4/Weigh_It_Pour_It/Capacity_Unit_Conversion/make_one_litre_using_bottles';
import CountHowManyUnitsFit from './components/practice/class-4/Weigh_It_Pour_It/Equal_Grouping_and_Unit_Count/count_how_many_units_fit';
import RepeatedAdditionToOneWhole from './components/practice/class-4/Weigh_It_Pour_It/Equal_Grouping_and_Unit_Count/repeated_addition_to_one_whole';
import CompareWeightsAndCapacities from './components/practice/class-4/Weigh_It_Pour_It/Comparison_of_Quantities/compare_weights_and_capacities';
import WeightAndCapacityWordProblems from './components/practice/class-4/Weigh_It_Pour_It/Mixed_Measurement_Word_Problems/weight_and_capacity_word_problems';
const ComingSoon = () => (
  <div className="flex flex-col items-center justify-center h-screen bg-slate-50">
    <h1 className="text-6xl mb-4">🚧</h1>
    <h2 className="text-3xl font-bold text-slate-800">Coming Soon!</h2>
    <p className="text-slate-500 mt-2">This practice session is currently under development.</p>
    <button
      onClick={() => window.history.back()}
      className="mt-8 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
    >
      Go Back
    </button>
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="learn-to-learn" element={<ContentPage topic="learn-to-learn" />} />
          <Route path="math" element={<MathSelection />} />
          <Route path="practice" element={<PracticePage />} />
          <Route path="math/grade/:grade" element={<GradeSyllabus />} />
          {/* Middle Routes (Grades 5-7 professional design) */}
          <Route path="middle/grade/:grade" element={<MiddleGradeSyllabus />} />
          {/* Senior Routes (Grades 8-10 professional design) */}
          <Route path="senior/grade/:grade" element={<SeniorGradeSyllabus />} />
          <Route path="ai" element={<ContentPage topic="ai" />} />
        </Route>
        <Route path="/rapid-math" element={<RapidMathPage />} />
        <Route path="/internship" element={<Internship />} />

        {/* Junior Routes (Grades 1-4 child-friendly design) */}
        <Route path="/junior/grade/:grade" element={<JuniorGradeSyllabus />} />
        <Route path="/junior/grade/:grade/topic/:topic" element={<JuniorSubtopics />} />
        <Route path="/junior/grade/:grade/practice" element={
          <ProtectedRoute redirectTo="/login">
            <JuniorPracticeSession />
          </ProtectedRoute>
        } />

        <Route path="/junior/grade/:grade/raksha-bandhan/intro" element={
          <ProtectedRoute redirectTo="/login">
            <RakshaBandhanIntro />
          </ProtectedRoute>
        } />
        <Route path="/junior/grade/:grade/raksha-bandhan/multiplication" element={
          <ProtectedRoute redirectTo="/login">
            <RakshaBandhanMultiplication />
          </ProtectedRoute>
        } />
        <Route path="/junior/grade/:grade/raksha-bandhan/division" element={
          <ProtectedRoute redirectTo="/login">
            <RakshaBandhanDivision />
          </ProtectedRoute>
        } />
        <Route path="/junior/grade/:grade/fair-share/cutting" element={
          <ProtectedRoute redirectTo="/login">
            <FairShareCutting />
          </ProtectedRoute>
        } />
        <Route path="/junior/grade/:grade/fair-share/halves-doubles" element={
          <ProtectedRoute redirectTo="/login">
            <FairShareHalvesDoubles />
          </ProtectedRoute>
        } />
        <Route path="/junior/grade/:grade/fair-share/draw" element={
          <ProtectedRoute redirectTo="/login">
            <FairShareDraw />
          </ProtectedRoute>
        } />
        <Route path="/junior/grade/:grade/fair-share/guess-who" element={
          <ProtectedRoute redirectTo="/login">
            <FairShareGuesswho />
          </ProtectedRoute>
        } />
        <Route path="/junior/grade/:grade/fun-at-class-party/longer-shorter" element={
          <ProtectedRoute redirectTo="/login">
            <LongerShorterStrings />
          </ProtectedRoute>
        } />
        <Route path="/junior/grade/:grade/fun-at-class-party/heights-and-meters" element={
          <ProtectedRoute redirectTo="/login">
            <HeightsAndMeters />
          </ProtectedRoute>
        } />

        <Route path="/junior/grade/:grade/house-of-hundreds-ii/draw-tiles" element={
          <ProtectedRoute redirectTo="/login">
            <DrawTiles />
          </ProtectedRoute>
        } />

        <Route path="/junior/grade/:grade/house-of-hundreds-ii/neighbouring-numbers" element={
          <ProtectedRoute redirectTo="/login">
            <NeighbouringNumbers />
          </ProtectedRoute>
        } />

        <Route path="/junior/grade/:grade/house-of-hundreds-ii/help-cranes" element={
          <ProtectedRoute redirectTo="/login">
            <HelpCranesOnNumberLine />
          </ProtectedRoute>
        } />

        <Route path="/junior/grade/:grade/house-of-hundreds-ii/tambola" element={
          <ProtectedRoute redirectTo="/login">
            <Tambola />
          </ProtectedRoute>
        } />

        <Route path="/junior/grade/:grade/house-of-hundreds-ii/skip-and-solve" element={
          <ProtectedRoute redirectTo="/login">
            <SkipAndSolve />
          </ProtectedRoute>
        } />

        <Route path="/junior/grade/:grade/house-of-hundreds-ii/number-in-the-centre" element={
          <ProtectedRoute redirectTo="/login">
            <NumberInTheCentre />
          </ProtectedRoute>
        } />

        <Route path="/junior/grade/:grade/house-of-hundreds-ii/number-puzzles" element={
          <ProtectedRoute redirectTo="/login">
            <NumberPuzzles />
          </ProtectedRoute>
        } />

        <Route path="/junior/grade/:grade/house-of-hundreds-ii/the-number-detective" element={
          <ProtectedRoute redirectTo="/login">
            <TheNumberDetective />
          </ProtectedRoute>
        } />

        <Route path="/junior/grade/:grade/house-of-hundreds-ii/paper-slips" element={
          <ProtectedRoute redirectTo="/login">
            <PaperSlips />
          </ProtectedRoute>
        } />

        <Route path="/junior/grade/:grade/house-of-hundreds-ii/guess-the-number" element={
          <ProtectedRoute redirectTo="/login">
            <GuessTheNumber />
          </ProtectedRoute>
        } />

        {/* Grade 8 Exponents and Powers - Negative Exponents */}
        <Route path="/senior/grade/8/exponents-powers/negative-exponents" element={
          <ProtectedRoute redirectTo="/login">
            <PowersWithNegativeExponents />
          </ProtectedRoute>
        } />

        {/* Grade 8 Exponents and Powers - Laws of Exponents */}
        <Route path="/senior/grade/8/exponents-powers/laws-of-exponents" element={
          <ProtectedRoute redirectTo="/login">
            <LawsOfExponentsClass8 />
          </ProtectedRoute>
        } />

        {/* Grade 8 Exponents and Powers - Laws of Exponents Application */}
        <Route path="/senior/grade/8/exponents-powers/laws-application" element={
          <ProtectedRoute redirectTo="/login">
            <LawsOfExponentsApplication />
          </ProtectedRoute>
        } />

        {/* Grade 8 Exponents and Powers - Standard Form for Small Numbers */}
        <Route path="/senior/grade/8/exponents-powers/standard-form" element={
          <ProtectedRoute redirectTo="/login">
            <StandardFormSmallNumbers />
          </ProtectedRoute>
        } />

        {/* Grade 8 Exponents and Powers - Comparing Large and Small Numbers */}
        <Route path="/senior/grade/8/exponents-powers/comparing-numbers" element={
          <ProtectedRoute redirectTo="/login">
            <ComparingLargeSmallNumbers />
          </ProtectedRoute>
        } />

        {/* Grade 5 - Tenths and Hundredths */}
        <Route path="/middle/grade/5/tenths-hundredths/place-values" element={<PlaceValuesOfDecimals />} />
        <Route path="/middle/grade/5/tenths-hundredths/fraction-to-decimal" element={<FractionToDecimalConversion />} />
        <Route path="/middle/grade/5/tenths-hundredths/visual-representation" element={<DecimalVisualRepresentation />} />
        <Route path="/middle/grade/5/tenths-hundredths/measurement" element={<DecimalInMeasurement />} />
        <Route path="/middle/grade/5/tenths-hundredths/money" element={<DecimalInMoney />} />
        <Route path="/middle/grade/5/tenths-hundredths/comparing" element={<ComparingDecimals />} />
        <Route path="/middle/grade/5/tenths-hundredths/operations" element={<DecimalOperations />} />
        <Route path="/middle/grade/5/tenths-hundredths/conversion" element={<ConversionBetweenForms />} />
        <Route path="/middle/grade/5/tenths-hundredths/word-problems" element={<DecimalWordProblems />} />

        {/* Grade 5 - Area and its Boundary */}
        <Route path="/middle/grade/5/area-boundary/area/finding-area" element={<FindingArea />} />
        <Route path="/middle/grade/5/area-boundary/area/compare-shapes" element={<CompareShapesSameArea />} />
        <Route path="/middle/grade/5/area-boundary/area/real-life" element={<AreaRealLife />} />
        <Route path="/middle/grade/5/area-boundary/area/units" element={<AppropriateAreaUnits />} />
        <Route path="/middle/grade/5/area-boundary/perimeter/finding-perimeter" element={<FindingPerimeter />} />
        <Route path="/middle/grade/5/area-boundary/perimeter/boundary-length" element={<PerimeterAsBoundary />} />
        <Route path="/middle/grade/5/area-boundary/perimeter/different-shapes" element={<SamePerimeterDifferentShapes />} />
        <Route path="/middle/grade/5/area-boundary/perimeter/real-life" element={<PerimeterRealLife />} />
        <Route path="/middle/grade/5/area-boundary/relationship" element={<AreaPerimeterRelationship />} />
        <Route path="/middle/grade/5/area-boundary/skill-application" element={<SkillApplicationProblemsArea />} />

        {/* Cleanest Village Routes */}
        <Route path="/junior/grade/:grade/the-cleanest-village/repeated-addition" element={
          <ProtectedRoute redirectTo="/login">
            <RepeatedAddition />
          </ProtectedRoute>
        } />
        <Route path="/junior/grade/:grade/the-cleanest-village/repeated-subtraction" element={
          <ProtectedRoute redirectTo="/login">
            <RepeatedSubtraction />
          </ProtectedRoute>
        } />
        <Route path="/junior/grade/:grade/the-cleanest-village/addition-with-regrouping" element={
          <ProtectedRoute redirectTo="/login">
            <AdditionWithRegrouping />
          </ProtectedRoute>
        } />
        <Route path="/junior/grade/:grade/the-cleanest-village/two-digit-addition-regrouping" element={
          <ProtectedRoute redirectTo="/login">
            <TwoDigitAdditionRegrouping />
          </ProtectedRoute>
        } />
        <Route path="/junior/grade/:grade/the-cleanest-village/three-digit-addition-regrouping" element={
          <ProtectedRoute redirectTo="/login">
            <ThreeDigitAdditionRegrouping />
          </ProtectedRoute>
        } />
        <Route path="/junior/grade/:grade/the-cleanest-village/subtraction-with-regrouping" element={
          <ProtectedRoute redirectTo="/login">
            <SubtractionWithRegrouping />
          </ProtectedRoute>
        } />
        <Route path="/junior/grade/:grade/the-cleanest-village/two-digit-subtraction-regrouping" element={
          <ProtectedRoute redirectTo="/login">
            <TwoDigitSubtractionRegrouping />
          </ProtectedRoute>
        } />
        <Route path="/junior/grade/:grade/the-cleanest-village/three-digit-subtraction-regrouping" element={
          <ProtectedRoute redirectTo="/login">
            <ThreeDigitSubtractionRegrouping />
          </ProtectedRoute>
        } />
        <Route path="/junior/grade/:grade/the-cleanest-village/find-missing-addend" element={
          <ProtectedRoute redirectTo="/login">
            <FindMissingAddend />
          </ProtectedRoute>
        } />
        <Route path="/junior/grade/:grade/the-cleanest-village/find-missing-subtrahend" element={
          <ProtectedRoute redirectTo="/login">
            <FindMissingSubtrahend />
          </ProtectedRoute>
        } />
        <Route path="/junior/grade/:grade/the-cleanest-village/find-how-many-more-or-less" element={
          <ProtectedRoute redirectTo="/login">
            <FindHowManyMoreOrLess />
          </ProtectedRoute>
        } />
        <Route path="/junior/grade/:grade/the-cleanest-village/chapter-scene-mixed-operations" element={
          <ProtectedRoute redirectTo="/login">
            <ChapterSceneMixedOperations />
          </ProtectedRoute>
        } />
        <Route path="/junior/grade/:grade/the-cleanest-village/let-us-play" element={
          <ProtectedRoute redirectTo="/login">
            <LetUsPlay />
          </ProtectedRoute>
        } />
        <Route path="/junior/grade/:grade/the-cleanest-village/chapter-test" element={
          <ProtectedRoute redirectTo="/login">
            <ChapterTest />
          </ProtectedRoute>
        } />
        {/* Fallback for spaces in URL */}
        <Route path="/junior/grade/:grade/the cleanest village/chapter test" element={
          <ProtectedRoute redirectTo="/login">
            <ChapterTest />
          </ProtectedRoute>
        } />

        {/* Equal Groups Routes */}
        <Route path="/junior/grade/:grade/equal-groups/jump-based-multiples" element={
          <ProtectedRoute redirectTo="/login">
            <JumpBasedMultiples />
          </ProtectedRoute>
        } />
        <Route path="/junior/grade/:grade/equal-groups/common-multiples-from-jumps" element={
          <ProtectedRoute redirectTo="/login">
            <CommonMultiplesFromJumps />
          </ProtectedRoute>
        } />
        <Route path="/junior/grade/:grade/equal-groups/group-size-and-number-of-groups" element={
          <ProtectedRoute redirectTo="/login">
            <GroupSizeAndNumberOfGroups />
          </ProtectedRoute>
        } />
        <Route path="/junior/grade/:grade/equal-groups/arrays-rows-and-columns" element={
          <ProtectedRoute redirectTo="/login">
            <ArraysRowsAndColumns />
          </ProtectedRoute>
        } />
        <Route path="/junior/grade/:grade/equal-groups/doubling-numbers" element={
          <ProtectedRoute redirectTo="/login">
            <DoublingNumbers />
          </ProtectedRoute>
        } />
        <Route path="/junior/grade/:grade/equal-groups/doubling-ones-digit-patterns" element={
          <ProtectedRoute redirectTo="/login">
            <DoublingOnesDigitPatterns />
          </ProtectedRoute>
        } />
        <Route path="/junior/grade/:grade/equal-groups/multiply-using-tens" element={
          <ProtectedRoute redirectTo="/login">
            <MultiplyUsingTens />
          </ProtectedRoute>
        } />
        <Route path="/junior/grade/:grade/equal-groups/multiply-using-hundreds" element={
          <ProtectedRoute redirectTo="/login">
            <MultiplyUsingHundreds />
          </ProtectedRoute>
        } />
        <Route path="/junior/grade/:grade/equal-groups/break-apart-multiplication" element={
          <ProtectedRoute redirectTo="/login">
            <BreakApartMultiplication />
          </ProtectedRoute>
        } />
        <Route path="/junior/grade/:grade/equal-groups/equal-groups-story-problems" element={
          <ProtectedRoute redirectTo="/login">
            <EqualGroupsStoryProblems />
          </ProtectedRoute>
        } />
        <Route path="/junior/grade/:grade/equal-groups/division-by-partial-groups" element={
          <ProtectedRoute redirectTo="/login">
            <DivisionByPartialGroups />
          </ProtectedRoute>
        } />
        <Route path="/junior/grade/:grade/equal-groups/division-with-remainders" element={
          <ProtectedRoute redirectTo="/login">
            <DivisionWithRemainders />
          </ProtectedRoute>
        } />
        <Route path="/junior/grade/:grade/equal-groups/divide-using-patterns" element={
          <ProtectedRoute redirectTo="/login">
            <DivideUsingPatterns />
          </ProtectedRoute>
        } />
        <Route path="/junior/grade/:grade/equal-groups/equal-sharing-division" element={
          <ProtectedRoute redirectTo="/login">
            <EqualSharingDivision />
          </ProtectedRoute>
        } />
        <Route path="/junior/grade/:grade/equal-groups/equal-groups-mixed-word-problems" element={
          <ProtectedRoute redirectTo="/login">
            <EqualGroupsMixedWordProblems />
          </ProtectedRoute>
        } />
        <Route path="/junior/grade/:grade/equal-groups/always-sometimes-never-statements" element={
          <ProtectedRoute redirectTo="/login">
            <AlwaysSometimesNeverStatements />
          </ProtectedRoute>
        } />
        <Route path="/junior/grade/:grade/equal-groups/find-the-mistake-equal-groups" element={
          <ProtectedRoute redirectTo="/login">
            <FindTheMistakeEqualGroups />
          </ProtectedRoute>
        } />
        <Route path="/junior/grade/:grade/equal-groups/create-your-own-equal-groups" element={
          <ProtectedRoute redirectTo="/login">
            <CreateYourOwnEqualGroups />
          </ProtectedRoute>
        } />
        {/* Weigh It, Pour It Routes */}
        <Route path="/junior/grade/:grade/weigh-it,-pour-it/gram-to-kilogram-fractions" element={
          <ProtectedRoute redirectTo="/login">
            <GramToKilogramFractions />
          </ProtectedRoute>
        } />
        <Route path="/junior/grade/:grade/weigh-it,-pour-it/make-one-kilogram-using-packets" element={
          <ProtectedRoute redirectTo="/login">
            <MakeOneKilogramUsingPackets />
          </ProtectedRoute>
        } />
        <Route path="/junior/grade/:grade/weigh-it,-pour-it/millilitre-to-litre-fractions" element={
          <ProtectedRoute redirectTo="/login">
            <MillilitreToLitreFractions />
          </ProtectedRoute>
        } />
        <Route path="/junior/grade/:grade/weigh-it,-pour-it/make-one-litre-using-bottles" element={
          <ProtectedRoute redirectTo="/login">
            <MakeOneLitreUsingBottles />
          </ProtectedRoute>
        } />
        <Route path="/junior/grade/:grade/weigh-it,-pour-it/count-how-many-units-fit" element={
          <ProtectedRoute redirectTo="/login">
            <CountHowManyUnitsFit />
          </ProtectedRoute>
        } />
        <Route path="/junior/grade/:grade/weigh-it,-pour-it/repeated-addition-to-one-whole" element={
          <ProtectedRoute redirectTo="/login">
            <RepeatedAdditionToOneWhole />
          </ProtectedRoute>
        } />
        <Route path="/junior/grade/:grade/weigh-it,-pour-it/compare-weights-and-capacities" element={
          <ProtectedRoute redirectTo="/login">
            <CompareWeightsAndCapacities />
          </ProtectedRoute>
        } />
        <Route path="/junior/grade/:grade/weigh-it,-pour-it/weight-and-capacity-word-problems" element={
          <ProtectedRoute redirectTo="/login">
            <WeightAndCapacityWordProblems />
          </ProtectedRoute>
        } />

        {/* Grade 8 Rational Numbers - Commutativity */}
        <Route path="/senior/grade/8/rational-numbers/commutativity" element={
          <ProtectedRoute redirectTo="/login">
            <Commutativity />
          </ProtectedRoute>
        } />

        {/* Grade 8 Rational Numbers - Associativity */}
        <Route path="/senior/grade/8/rational-numbers/associativity" element={
          <ProtectedRoute redirectTo="/login">
            <Associativity />
          </ProtectedRoute>
        } />

        {/* Grade 8 Rational Numbers - Additive and Multiplicative Identity */}
        <Route path="/senior/grade/8/rational-numbers/identity" element={
          <ProtectedRoute redirectTo="/login">
            <AdditiveMultiplicativeIdentity />
          </ProtectedRoute>
        } />

        {/* Grade 8 Rational Numbers - Distributivity */}
        <Route path="/senior/grade/8/rational-numbers/distributivity" element={
          <ProtectedRoute redirectTo="/login">
            <Distributivity />
          </ProtectedRoute>
        } />

        {/* Grade 8 Mensuration */}
        <Route path="/senior/grade/8/mensuration/area-of-polygon" element={
          <ProtectedRoute redirectTo="/login">
            <AreaOfPolygon />
          </ProtectedRoute>
        } />
        <Route path="/senior/grade/8/mensuration/surface-area-cuboid" element={
          <ProtectedRoute redirectTo="/login">
            <SurfaceAreaCuboid />
          </ProtectedRoute>
        } />
        <Route path="/senior/grade/8/mensuration/surface-area-cube" element={
          <ProtectedRoute redirectTo="/login">
            <SurfaceAreaCube />
          </ProtectedRoute>
        } />
        <Route path="/senior/grade/8/mensuration/surface-area-cylinder" element={
          <ProtectedRoute redirectTo="/login">
            <SurfaceAreaCylinder />
          </ProtectedRoute>
        } />
        <Route path="/senior/grade/8/mensuration/volume-of-cube" element={
          <ProtectedRoute redirectTo="/login">
            <VolumeOfCube />
          </ProtectedRoute>
        } />
        <Route path="/senior/grade/8/mensuration/volume-of-cuboid" element={
          <ProtectedRoute redirectTo="/login">
            <VolumeOfCuboid />
          </ProtectedRoute>
        } />
        <Route path="/senior/grade/8/mensuration/volume-of-cylinder" element={
          <ProtectedRoute redirectTo="/login">
            <VolumeOfCylinder />
          </ProtectedRoute>
        } />
        <Route path="/senior/grade/8/mensuration/volume-and-capacity" element={
          <ProtectedRoute redirectTo="/login">
            <VolumeAndCapacity />
          </ProtectedRoute>
        } />

        {/* Grade 8 Factorisation */}
        <Route path="/senior/grade/8/factorisation/common-factors" element={
          <ProtectedRoute redirectTo="/login">
            <MethodOfCommonFactors />
          </ProtectedRoute>
        } />
        <Route path="/senior/grade/8/factorisation/regrouping" element={
          <ProtectedRoute redirectTo="/login">
            <FactorisationByRegrouping />
          </ProtectedRoute>
        } />
        <Route path="/senior/grade/8/factorisation/using-identities" element={
          <ProtectedRoute redirectTo="/login">
            <FactorisationUsingIdentities />
          </ProtectedRoute>
        } />
        <Route path="/senior/grade/8/factorisation/factors-form-xpla-xplb" element={
          <ProtectedRoute redirectTo="/login">
            <FactorsOfFormXplusAXplusB />
          </ProtectedRoute>
        } />
        <Route path="/senior/grade/8/factorisation/division-monomial-by-monomial" element={
          <ProtectedRoute redirectTo="/login">
            <DivisionMonomialByMonomial />
          </ProtectedRoute>
        } />
        <Route path="/senior/grade/8/factorisation/division-polynomial-by-monomial" element={
          <ProtectedRoute redirectTo="/login">
            <DivisionPolynomialByMonomial />
          </ProtectedRoute>
        } />
        <Route path="/senior/grade/8/factorisation/division-polynomial-by-polynomial" element={
          <ProtectedRoute redirectTo="/login">
            <DivisionPolynomialByPolynomial />
          </ProtectedRoute>
        } />

        {/* Grade 1 Specialized Routes */}
        <Route path="/junior/grade/1/shapes-and-space" element={<ProtectedRoute redirectTo="/login"><Grade1ShapesAndSpace /></ProtectedRoute>} />
        <Route path="/junior/grade/1/numbers-from-one-to-nine" element={<ProtectedRoute redirectTo="/login"><Grade1Numbers1to9 /></ProtectedRoute>} />
        <Route path="/junior/grade/1/addition" element={<ProtectedRoute redirectTo="/login"><Grade1Addition /></ProtectedRoute>} />
        <Route path="/junior/grade/1/subtraction" element={<ProtectedRoute redirectTo="/login"><Grade1Subtraction /></ProtectedRoute>} />
        <Route path="/junior/grade/1/numbers-10-20" element={<ProtectedRoute redirectTo="/login"><Grade1Numbers10to20 /></ProtectedRoute>} />
        <Route path="/junior/grade/1/time" element={<ProtectedRoute redirectTo="/login"><Grade1Time /></ProtectedRoute>} />
        <Route path="/junior/grade/1/measurement" element={<ProtectedRoute redirectTo="/login"><Grade1Measurement /></ProtectedRoute>} />
        <Route path="/junior/grade/1/numbers-from-twenty-one-to-fifty" element={<ProtectedRoute redirectTo="/login"><Grade1Numbers21to50 /></ProtectedRoute>} />
        <Route path="/junior/grade/1/data-handling" element={<ProtectedRoute redirectTo="/login"><Grade1DataHandling /></ProtectedRoute>} />
        <Route path="/junior/grade/1/patterns" element={<ProtectedRoute redirectTo="/login"><Grade1Patterns /></ProtectedRoute>} />
        <Route path="/junior/grade/1/numbers-51-to-100" element={<ProtectedRoute redirectTo="/login"><Grade1Numbers51to100 /></ProtectedRoute>} />
        <Route path="/junior/grade/2/what-is-long-what-is-round/identifying-shapes" element={<ProtectedRoute redirectTo="/login"><IdentifyingShapes /></ProtectedRoute>} />
        <Route path="/junior/grade/2/what-is-long-what-is-round/comparing-lengths" element={<ProtectedRoute redirectTo="/login"><ComparingLengths /></ProtectedRoute>} />
        <Route path="/junior/grade/2/what-is-long-what-is-round/recognizing-round-objects" element={<ProtectedRoute redirectTo="/login"><RecognizingRoundObjects /></ProtectedRoute>} />
        <Route path="/junior/grade/2/how-much-can-you-carry/comparing-weights" element={<ProtectedRoute redirectTo="/login"><ComparingWeights /></ProtectedRoute>} />
        <Route path="/junior/grade/2/how-much-can-you-carry/heavier-lighter" element={<ProtectedRoute redirectTo="/login"><HeavierLighter /></ProtectedRoute>} />
        <Route path="/junior/grade/2/how-much-can-you-carry/estimating-weight" element={<ProtectedRoute redirectTo="/login"><EstimatingWeight /></ProtectedRoute>} />
        <Route path="/junior/grade/2/counting-in-groups/counting-in-pairs" element={<ProtectedRoute redirectTo="/login"><CountingInPairs /></ProtectedRoute>} />
        <Route path="/junior/grade/2/counting-in-groups/skip-counting" element={<ProtectedRoute redirectTo="/login"><SkipCounting /></ProtectedRoute>} />
        <Route path="/junior/grade/2/counting-in-groups/repeated-addition" element={<ProtectedRoute redirectTo="/login"><RepeatedAdditionClass2 /></ProtectedRoute>} />
        <Route path="/junior/grade/2/counting-in-tens/numbers-up-to-100" element={<ProtectedRoute redirectTo="/login"><NumbersUpTo100 /></ProtectedRoute>} />
        <Route path="/junior/grade/2/counting-in-tens/place-value-tens-ones" element={<ProtectedRoute redirectTo="/login"><PlaceValueTensOnes /></ProtectedRoute>} />
        <Route path="/junior/grade/2/counting-in-tens/expanded-form" element={<ProtectedRoute redirectTo="/login"><ExpandedForm /></ProtectedRoute>} />
        <Route path="/junior/grade/2/counting-in-tens/comparing-numbers" element={<ProtectedRoute redirectTo="/login"><ComparingNumbers /></ProtectedRoute>} />

        {/* Middle Routes (Grades 5-7 separate professional design) */}
        <Route path="/middle/grade/6/perimeter-area/rectangle" element={<RectanglePractice />} />
        <Route path="/middle/grade/6/perimeter-area/square" element={<SquarePractice />} />
        <Route path="/middle/grade/6/perimeter-area/triangle" element={<TrianglePractice />} />
        <Route path="/middle/grade/6/perimeter-area/regular-polygon" element={<RegularPolygonPractice />} />
        <Route path="/middle/grade/6/perimeter-area/mixed-bag" element={<MixedBagPractice />} />
        <Route path="/middle/grade/6/patterns-math/intro" element={<VisualisingNumberSequences />} />
        <Route path="/middle/grade/6/patterns-math/relations" element={<RelationsAmongNumberSequences />} />
        <Route path="/middle/grade/6/patterns-math/shapes" element={<PatternsInShapes />} />

        <Route path="/middle/grade/6/number-play/numbers-things" element={<NumbersCanTellUsThings />} />
        <Route path="/middle/grade/6/number-play/supercells" element={<Supercells />} />
        <Route path="/middle/grade/6/number-play/growing-patterns" element={<GrowingPatterns />} />
        <Route path="/middle/grade/6/number-play/playing-with-digits" element={<PlayingWithDigits />} />
        <Route path="/middle/grade/6/data-handling/collecting-organising" element={<CollectingAndOrganisingData />} />
        <Route path="/middle/grade/6/data-handling/pictographs" element={<Pictographs />} />
        <Route path="/middle/grade/6/data-handling/bar-graphs" element={<BarGraphs />} />
        <Route path="/middle/grade/6/data-handling/drawing-a-bar-graph" element={<DrawingABarGraph />} />
        <Route path="/middle/grade/6/data-handling/figure-it-out" element={<FigureItOut />} />
        <Route path="/middle/grade/7/comparing-quantities/percentage" element={<Percentage />} />
        <Route path="/middle/grade/7/comparing-quantities/use-of-percentages" element={<UseOfPercentages />} />
        <Route path="/middle/grade/7/comparing-quantities/profit-and-loss" element={<ProfitAndLoss />} />
        <Route path="/middle/grade/7/comparing-quantities/simple-interest" element={<SimpleInterest />} />

        <Route path="/middle/grade/7/exponents-and-powers/basics" element={<ExponentsBasics />} />
        <Route path="/middle/grade/7/exponents-and-powers/laws" element={<LawsOfExponents7 />} />
        <Route path="/middle/grade/7/exponents-and-powers/decimal-system" element={<DecimalNumberSystem />} />
        <Route path="/middle/grade/7/exponents-and-powers/standard-form" element={<StandardForm />} />

        {/* Chapter Tests */}
        <Route path="/middle/grade/7/comparing-quantities/chapter-test" element={<ComparingQuantitiesTest />} />
        <Route path="/middle/grade/7/exponents-and-powers/chapter-test" element={<ExponentsPowersTest />} />

        {/* Rational Numbers */}
        <Route path="/middle/grade/7/rational-numbers/need" element={<NeedForRationalNumbers />} />
        <Route path="/middle/grade/7/rational-numbers/what" element={<WhatAreRationalNumbers />} />
        <Route path="/middle/grade/7/rational-numbers/positive-negative" element={<PositiveNegativeRationalNumbers />} />
        <Route path="/middle/grade/7/rational-numbers/number-line" element={<RationalNumbersNumberLine />} />
        <Route path="/middle/grade/7/rational-numbers/standard-form" element={<RationalNumbersStandardForm />} />
        <Route path="/middle/grade/7/rational-numbers/comparison" element={<ComparisonOfRationalNumbers />} />
        <Route path="/middle/grade/7/rational-numbers/between" element={<RationalNumbersBetween />} />
        <Route path="/middle/grade/7/rational-numbers/operations" element={<OperationsOnRationalNumbers />} />
        <Route path="/middle/grade/7/rational-numbers/chapter-test" element={<RationalNumbersTest />} />

        {/* Visualising Solid Shapes */}
        <Route path="/middle/grade/7/visualising-solid-shapes/plane-figures-solid-shapes" element={<PlaneFiguresSolidShapes />} />
        <Route path="/middle/grade/7/visualising-solid-shapes/faces-edges-vertices" element={<FacesEdgesVertices />} />
        <Route path="/middle/grade/7/visualising-solid-shapes/nets" element={<NetsBuilding3DShapes />} />
        <Route path="/middle/grade/7/visualising-solid-shapes/drawing-solids" element={<DrawingSolids />} />
        <Route path="/middle/grade/7/visualising-solid-shapes/viewing-sections" element={<ViewingSections />} />
        <Route path="/middle/grade/7/visualising-solid-shapes/chapter-test" element={<VisualisingSolidShapesTest />} />

        {/* Symmetry */}
        <Route path="/middle/grade/7/symmetry/line-symmetry" element={<LineSymmetry />} />
        <Route path="/middle/grade/7/symmetry/regular-polygons" element={<RegularPolygonsSymmetry />} />
        <Route path="/middle/grade/7/symmetry/mirror-reflection" element={<MirrorReflectionSymmetry />} />
        <Route path="/middle/grade/7/symmetry/rotational" element={<RotationalSymmetry />} />
        <Route path="/middle/grade/7/symmetry/relationship" element={<LineRotationalRelationship />} />
        <Route path="/middle/grade/7/symmetry/chapter-test" element={<SymmetryTest />} />

        {/* Algebraic Expressions */}
        <Route path="/middle/grade/7/algebraic-expressions/formation" element={<Formation />} />
        <Route path="/middle/grade/7/algebraic-expressions/terms-factors" element={<TermsFactors />} />
        <Route path="/middle/grade/7/algebraic-expressions/coefficients" element={<Coefficients />} />
        <Route path="/middle/grade/7/algebraic-expressions/like-unlike" element={<LikeUnlikeTerms />} />
        <Route path="/middle/grade/7/algebraic-expressions/polynomials" element={<Polynomials />} />
        <Route path="/middle/grade/7/algebraic-expressions/finding-value" element={<FindingValue />} />
        <Route path="/middle/grade/7/algebraic-expressions/chapter-test" element={<AlgebraicExpressionsTest />} />



        {/* Perimeter and Area */}
        <Route path="/middle/grade/7/perimeter-area/parallelogram" element={<AreaParallelogram />} />
        <Route path="/middle/grade/7/perimeter-area/triangle" element={<AreaTriangle />} />
        <Route path="/middle/grade/7/perimeter-area/circles" element={<Circles />} />
        <Route path="/middle/grade/7/perimeter-area/chapter-test" element={<PerimeterAreaTest />} />

        {/* Auth Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Role-Based Dashboards */}
        <Route path="/student-dashboard" element={<StudentDashboard />} />

        {/* Teacher Dashboard with Nested Layout */}
        <Route path="/teacher-dashboard" element={<TeacherLayout />}>
          <Route index element={<TeacherDashboard />} />
          <Route path="students" element={<TeacherStudents />} />
          <Route path="assignments" element={<TeacherAssignments />} />
          <Route path="attendance" element={<TeacherAttendance />} />
          <Route path="settings" element={<TeacherSettings />} />
        </Route>

        {/* Parent Dashboard with Nested Layout */}
        <Route path="/parent-dashboard" element={<ParentLayout />}>
          <Route index element={<ParentDashboard />} />
          <Route path="progress" element={<ProgressPage />} />
          <Route path="quizzes" element={<QuizzesPage />} />
          <Route path="skills" element={<SkillsPage />} />
          <Route path="reports" element={<ReportsPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="notifications" element={<NotificationsPage />} />
        </Route>

        {/* Admin Dashboard with Nested Layout - Protected */}
        <Route path="/admin" element={
          <ProtectedRoute allowedRoles={['admin']} redirectTo="/admin-login">
            <AdminLayout />
          </ProtectedRoute>
        }>
          <Route index element={<AdminDashboard />} />
          {/* User Management */}
          <Route path="students" element={<AdminStudentsPage />} />
          <Route path="teachers" element={<AdminTeachersPage />} />
          <Route path="parents" element={<AdminParentsPage />} />
          <Route path="guests" element={<AdminGuestsPage />} />
          <Route path="uploaders" element={<AdminUploadersPage />} />
          <Route path="assessment-uploaders" element={<AdminAssessmentUploadersPage />} />
          <Route path="classes" element={<AdminClassesPage />} />
          {/* Content */}
          <Route path="quizzes" element={<AdminQuizzesPage />} />
          <Route path="question-bank" element={<AdminQuestionBankPage />} />
          <Route path="skills" element={<AdminSkillsPage />} />
          {/* Question Tools */}
          <Route path="question-generation" element={<AdminQuestionGenerationPage />} />
          <Route path="templates" element={<AdminTemplatesPage />} />
          <Route path="generated-questions" element={<AdminGeneratedQuestionsPage />} />
          {/* Monitoring */}
          <Route path="alerts" element={<AdminAlertsPage />} />
          <Route path="analytics" element={<AdminAnalyticsPage />} />
          <Route path="system-health" element={<AdminSystemHealthPage />} />
          <Route path="activity-log" element={<AdminActivityLogPage />} />
          {/* Configuration */}
          <Route path="settings" element={<AdminSettingsPage />} />
        </Route>

        <Route path="/guest-dashboard" element={<GuestDashboard />} />
        <Route path="/mentor-dashboard" element={<MentorDashboard />} />

        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/uploader-login" element={<UploaderLogin />} />
        <Route path="/uploader-dashboard" element={<UploaderDashboard />} />

        <Route path="/assessment-uploader-login" element={<AssessmentUploaderLogin />} />
        <Route path="/assessment-uploader-dashboard" element={<AssessmentUploaderDashboard />} />
        <Route path="/assessment-access" element={<AssessmentAccessPage />} />
        <Route path="/assessment-student-dashboard" element={<AssessmentStudentDashboard />} />
        <Route path="/assessment-runner" element={<AssessmentRunner />} />

        {/* Full Screen Practice Sessions */}
        <Route path="/practice/:templateId" element={<PracticeSession />} />
        <Route path="/middle/practice/9003" element={<MultiplicationPractice />} />
        <Route path="/middle/practice/9004" element={<MultiplicationPractice3D />} />
        <Route path="/middle/practice/9005" element={<MultiplicationPracticeMultiple />} />
        <Route path="/middle/practice/9006" element={<MultiplicationEndingZero />} />
        <Route path="/middle/practice/9007" element={<MultiplicationWordProblems />} />
        <Route path="/middle/practice/9008" element={<DivisionPracticeOneDigit />} />
        <Route path="/middle/practice/9009" element={<DivisionPracticeTwoDigit />} />
        <Route path="/middle/practice/9010" element={<DivisionEndingZero />} />
        <Route path="/middle/practice/9011" element={<DivisionWordProblems />} />
        <Route path="/middle/practice/9012" element={<MultiDivWordProblems />} />

        {/* Grade 5 - How Big? How Heavy? */}
        <Route path="/middle/grade/5/how-big-how-heavy/volume-by-displacement" element={<VolumeByDisplacement />} />
        <Route path="/middle/grade/5/how-big-how-heavy/units-of-volume" element={<UnitsOfVolume />} />
        <Route path="/middle/grade/5/how-big-how-heavy/volume-estimation" element={<VolumeEstimation />} />
        <Route path="/middle/grade/5/how-big-how-heavy/volume-unit-cubes" element={<VolumeUsingUnitCubes />} />
        <Route path="/middle/grade/5/how-big-how-heavy/units-of-mass" element={<UnitsOfMass />} />
        <Route path="/middle/grade/5/how-big-how-heavy/mass-conversion" element={<MassConversion />} />
        <Route path="/middle/grade/5/how-big-how-heavy/mass-calculation" element={<MassCalculation />} />
        <Route path="/middle/grade/5/how-big-how-heavy/weight-estimation" element={<WeightEstimationComparison />} />
        <Route path="/middle/grade/5/how-big-how-heavy/3d-construction" element={<ThreeDShapeConstruction />} />
        <Route path="/middle/grade/5/how-big-how-heavy/packaging-layering" element={<PackagingAndLayering />} />
        <Route path="/middle/grade/5/how-big-how-heavy/measurement-real-life" element={<MeasurementInRealLife />} />
        <Route path="/middle/grade/5/how-big-how-heavy/skill-application" element={<SkillApplicationProblems />} />
        {/* Can you see the Pattern? - Grade 5 */}
        <Route path="/middle/grade/5/can-you-see-the-pattern/pattern-identification" element={<PatternIdentification />} />
        <Route path="/middle/grade/5/can-you-see-the-pattern/rule-pattern-creation" element={<RuleBasedPatternCreation />} />
        <Route path="/middle/grade/5/can-you-see-the-pattern/rotations" element={<UnderstandingRotations />} />
        <Route path="/middle/grade/5/can-you-see-the-pattern/grid-patterns" element={<GridPatternRecognition />} />
        <Route path="/middle/grade/5/can-you-see-the-pattern/properties-of-operation" element={<PropertiesOfOperation />} />
        <Route path="/middle/grade/5/can-you-see-the-pattern/digit-relationships" element={<DigitRelationships />} />
        <Route path="/middle/grade/5/can-you-see-the-pattern/palindromes" element={<PalindromeRecognition />} />
        <Route path="/middle/grade/5/can-you-see-the-pattern/structured-patterns" element={<StructuredNumberPatterns />} />
        <Route path="/middle/grade/5/can-you-see-the-pattern/rule-applications" element={<RuleApplications />} />
        <Route path="/middle/grade/5/can-you-see-the-pattern/multi-step-operations" element={<MultiStepOperations />} />
        <Route path="/middle/grade/5/can-you-see-the-pattern/missing-numbers" element={<MissingNumberReasoning />} />
        <Route path="/middle/grade/5/can-you-see-the-pattern/mental-calculation" element={<MentalCalculationReasoning />} />
        <Route path="/middle/grade/5/can-you-see-the-pattern/skill-application" element={<SkillApplicationProblemsPatterns />} />
        <Route path="/middle/grade/5/can-you-see-the-pattern/chapter-test" element={<ChapterTestPatterns />} />

        <Route path="/middle/practice/:skillId" element={<MiddlePracticeSession />} />
        {/* Class 10: Pair of Linear Equations Routes */}
        <Route path="/high/practice/10011" element={<GraphicalMethod />} />
        <Route path="/high/practice/10012" element={<GraphicalMethod />} />
        <Route path="/high/practice/10021" element={<GraphicalMethod />} />
        <Route path="/high/practice/10022" element={<ConditionsForConsistency />} />
        <Route path="/high/practice/10031" element={<IntroductionToLinearEquations />} />
        <Route path="/high/practice/10041" element={<StandardFormEquations />} />
        <Route path="/high/practice/10051" element={<AlgebraicMethods />} />
        <Route path="/high/practice/10052" element={<AlgebraicMethods />} />
        <Route path="/high/practice/10053" element={<AlgebraicMethods />} />
        <Route path="/high/practice/10054" element={<AlgebraicMethods />} />
        <Route path="/high/practice/10055" element={<AlgebraicMethods />} />
        {/* Class 10: Arithmetic Progressions Routes */}
        <Route path="/high/practice/10101" element={<RecognisingPatterns />} />
        <Route path="/high/practice/10102" element={<UnderstandingAP />} />
        <Route path="/high/practice/10103" element={<IdentifyingTerms />} />
        <Route path="/high/practice/10104" element={<FindingSpecificTerms />} />
        <Route path="/high/practice/10105" element={<SumOfTerms />} />
        <Route path="/high/practice/10106" element={<ArithmeticProgressionsTest />} />
        {/* Class 10: Quadratic Equations Routes */}
        <Route path="/high/practice/10201" element={<FoundationsQuadratic />} />
        <Route path="/high/practice/10202" element={<RepresentingSituations />} />
        <Route path="/high/practice/10203" element={<IdentifyingQuadratic />} />
        <Route path="/high/practice/10204" element={<RootsByFactorisation />} />
        <Route path="/high/practice/10205" element={<WordProblemsFactorisation />} />
        <Route path="/high/practice/10206" element={<NatureOfRoots />} />
        <Route path="/high/practice/10207" element={<DiscriminantAnalysis />} />
        <Route path="/high/practice/10208" element={<RealLifeApplications />} />
        <Route path="/high/practice/10209" element={<QuadraticEquationsTest />} />
        <Route path="/high/practice/:skillId" element={<HighPracticeSession />} />

        {/* Class 10: Real Numbers Routes */}
        <Route path="/high/practice/10201" element={<RealNumberFoundations />} />
        <Route path="/high/practice/10202" element={<EuclidsDivision />} />
        <Route path="/high/practice/10203" element={<PrimeFactorisation />} />
        <Route path="/high/practice/10204" element={<FundamentalTheoremArithmetic />} />
        <Route path="/high/practice/10205" element={<HCFandLCM />} />
        <Route path="/high/practice/10206" element={<HCFLCMApplications />} />
        <Route path="/high/practice/10207" element={<ProvingIrrationality />} />
        <Route path="/high/practice/10208" element={<IrrationalOperations />} />
        <Route path="/high/practice/10209" element={<RealNumbersTest />} />

        {/* Class 12: Matrices Chapter Routes (Auth Required) */}
        <Route path="/senior/grade/12/matrices" element={<ProtectedRoute redirectTo="/login"><MatricesChapter /></ProtectedRoute>} />
        <Route path="/senior/grade/12/matrices/who-uses" element={<ProtectedRoute redirectTo="/login"><WhoUsesMatrices /></ProtectedRoute>} />
        <Route path="/senior/grade/12/matrices/what-is" element={<ProtectedRoute redirectTo="/login"><WhatIsMatrix /></ProtectedRoute>} />
        <Route path="/senior/grade/12/matrices/when-need" element={<ProtectedRoute redirectTo="/login"><WhenDoWeNeedMatrices /></ProtectedRoute>} />
        <Route path="/senior/grade/12/matrices/how-operations" element={<ProtectedRoute redirectTo="/login"><HowOperationsWork /></ProtectedRoute>} />
        <Route path="/senior/grade/12/matrices/why-rules" element={<ProtectedRoute redirectTo="/login"><WhyRulesWork /></ProtectedRoute>} />
        <Route path="/senior/grade/12/matrices/where-applied" element={<ProtectedRoute redirectTo="/login"><WhereApplied /></ProtectedRoute>} />
        <Route path="/senior/grade/12/matrices/invertible" element={<ProtectedRoute redirectTo="/login"><InvertibleMatrices /></ProtectedRoute>} />
        <Route path="/senior/grade/12/matrices/test" element={<ProtectedRoute redirectTo="/login"><MatricesChapterTest /></ProtectedRoute>} />
        <Route path="/senior/grade/12/matrices/test/matrix-order" element={<ProtectedRoute redirectTo="/login"><MatrixOrderTest /></ProtectedRoute>} />
        <Route path="/senior/grade/12/matrices/test/matrix-types" element={<ProtectedRoute redirectTo="/login"><MatrixTypesTest /></ProtectedRoute>} />
        <Route path="/senior/grade/12/matrices/test/matrix-equality" element={<ProtectedRoute redirectTo="/login"><MatrixEqualityTest /></ProtectedRoute>} />
        <Route path="/senior/grade/12/matrices/test/matrix-operations" element={<ProtectedRoute redirectTo="/login"><MatrixOperationsTest /></ProtectedRoute>} />
        <Route path="/senior/grade/12/matrices/test/matrix-transpose" element={<ProtectedRoute redirectTo="/login"><MatrixTransposeTest /></ProtectedRoute>} />
        <Route path="/senior/grade/12/matrices/test/invertible-matrices" element={<ProtectedRoute redirectTo="/login"><InvertibleMatricesTest /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
// Force rebuild

