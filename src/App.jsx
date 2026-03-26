import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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
import NeetMockTest from './pages/NeetMockTest';
import Algebra from './components/Math-Branches/Algebra/Algebra';
import AlgebraIntro5W1H from './components/Math-Branches/Algebra/Topics/5W1H/AlgebraIntro5W1H';
import AlgebraTerminology from './components/Math-Branches/Algebra/Topics/Terminology/AlgebraTerminology';
import AlgebraSkills from './components/Math-Branches/Algebra/Topics/Skills/AlgebraSkills';
import AlgebraMasteryTest from './components/IDM/assessment_idm/AlgebraMasteryTest';
import CalculusMainDashboard from './components/Math-Branches/Calculus/CalculusMainDashboard';
// Functions
import FunctionsDashboard from './components/Math-Branches/Calculus/Functions/FunctionsDashboard';
import FunctionsIntro5W1H from './components/Math-Branches/Calculus/Functions/Topics/5W1H/FunctionsIntro5W1H';
import FunctionsTerminology from './components/Math-Branches/Calculus/Functions/Topics/Terminology/FunctionsTerminology';
import FunctionsSkills from './components/Math-Branches/Calculus/Functions/Topics/Skills/FunctionsSkills';
// Limits
import LimitsDashboard from './components/Math-Branches/Calculus/Limits/LimitsDashboard';
import LimitsIntro5W1H from './components/Math-Branches/Calculus/Limits/Topics/5W1H/LimitsIntro5W1H';
import LimitsTerminology from './components/Math-Branches/Calculus/Limits/Topics/Terminology/LimitsTerminology';
import LimitsSkills from './components/Math-Branches/Calculus/Limits/Topics/Skills/LimitsSkills';
// Differentiation
import DiffDashboard from './components/Math-Branches/Calculus/Differentiation/DiffDashboard';
import DiffIntro5W1H from './components/Math-Branches/Calculus/Differentiation/Topics/5W1H/DiffIntro5W1H';
import DiffTerminology from './components/Math-Branches/Calculus/Differentiation/Topics/Terminology/DiffTerminology';
import DiffSkills from './components/Math-Branches/Calculus/Differentiation/Topics/Skills/DiffSkills';
// Integration
import IntDashboard from './components/Math-Branches/Calculus/Integration/IntDashboard';
import IntIntro5W1H from './components/Math-Branches/Calculus/Integration/Topics/5W1H/IntIntro5W1H';
import IntTerminology from './components/Math-Branches/Calculus/Integration/Topics/Terminology/IntTerminology';
import IntSkills from './components/Math-Branches/Calculus/Integration/Topics/Skills/IntSkills';
import SetsDashboard from './components/Math-Branches/Sets/SetsDashboard';
import SetsIntro from './components/Math-Branches/Sets/Topics/Introduction/SetsIntro';
import SetsTerminology from './components/Math-Branches/Sets/Topics/Terminology/SetsTerminology';
import SetsSkills from './components/Math-Branches/Sets/Topics/Skills/SetsSkills';
import SetsConnectomics from './components/Math-Branches/Sets/Topics/Connectomics/SetsConnectomics';
import SetsExamEdge from './components/Math-Branches/Sets/Topics/ExamEdge/SetsExamEdge';
import TheCellDashboard from './components/Biology-Branches/The-Cell/TheCellDashboard';
import TheCellIntro from './components/Biology-Branches/The-Cell/Topics/Introduction/TheCellIntro';
import TheCellTerminology from './components/Biology-Branches/The-Cell/Topics/Terminology/TheCellTerminology';
import TheCellSkills from './components/Biology-Branches/The-Cell/Topics/Skills/TheCellSkills';
import TheCellConnectomics from './components/Biology-Branches/The-Cell/Topics/Connectomics/TheCellConnectomics';
import TheCellExamEdge from './components/Biology-Branches/The-Cell/Topics/ExamEdge/TheCellExamEdge';
import PhysicsChapters from './components/practice/class-11/physics/PhysicsChapters';
import LawsOfMotionDashboard from './components/Physics-Branches/Laws-Of-Motion/LawsOfMotionDashboard';
import LawsOfMotionIntro from './components/Physics-Branches/Laws-Of-Motion/Topics/Introduction/LawsOfMotionIntro';
import LawsOfMotionTerminology from './components/Physics-Branches/Laws-Of-Motion/Topics/Terminology/LawsOfMotionTerminology';
import LawsOfMotionSkills from './components/Physics-Branches/Laws-Of-Motion/Topics/Skills/LawsOfMotionSkills';
import LawsOfMotionConnectomics from './components/Physics-Branches/Laws-Of-Motion/Topics/Connectomics/LawsOfMotionConnectomics';
import LawsOfMotionExamEdge from './components/Physics-Branches/Laws-Of-Motion/Topics/ExamEdge/LawsOfMotionExamEdge';

import ChemistryChapters from './components/practice/class-11/chemistry/ChemistryChapters';
import StructureOfAtomDashboard from './components/Chemistry-Branches/Structure-of-Atom/StructureOfAtomDashboard';
import StructureOfAtomIntro from './components/Chemistry-Branches/Structure-of-Atom/Topics/Introduction/StructureOfAtomIntro';
import StructureOfAtomTerminology from './components/Chemistry-Branches/Structure-of-Atom/Topics/Terminology/StructureOfAtomTerminology';
import StructureOfAtomSkills from './components/Chemistry-Branches/Structure-of-Atom/Topics/Skills/StructureOfAtomSkills';
import StructureOfAtomConnectomics from './components/Chemistry-Branches/Structure-of-Atom/Topics/Connectomics/StructureOfAtomConnectomics';
import StructureOfAtomExamEdge from './components/Chemistry-Branches/Structure-of-Atom/Topics/ExamEdge/StructureOfAtomExamEdge';

import TheFishTaleLanding from './components/practice/class-5/The_Fish_Tale/TheFishTale';
import FishTaleIntro5W1H from './components/practice/class-5/The_Fish_Tale/Topics/5W1H/FishTaleIntro5W1H';
import FishTaleTerminology from './components/practice/class-5/The_Fish_Tale/Topics/Terminology/FishTaleTerminology';
import FishTaleSkills from './components/practice/class-5/The_Fish_Tale/Topics/Skills/FishTaleSkills';
import SurfaceAreasAndVolumes from './components/practice/class-10/SurfaceAreasAndVolumes/SurfaceAreasAndVolumes';
import SurfaceVolumesIntro from './components/practice/class-10/SurfaceAreasAndVolumes/Topics/5W1H/Intro5W1H';
import SurfaceVolumesTerminology from './components/practice/class-10/SurfaceAreasAndVolumes/Topics/Terminology/Terminology';
import SurfaceVolumesSkills from './components/practice/class-10/SurfaceAreasAndVolumes/Topics/Skills/Skills';

import IntroductionToTrignometry from './components/practice/class-10/IntroductionToTrignometry/IntroductionToTrignometry';
import TrignometryIntro5W1H from './components/practice/class-10/IntroductionToTrignometry/Topics/5W1H/Intro5W1H';
import TrignometryTerminology from './components/practice/class-10/IntroductionToTrignometry/Topics/Terminology/Terminology';
import TrignometrySkills from './components/practice/class-10/IntroductionToTrignometry/Topics/Skills/Skills';

import TickingClocks from './components/practice/class-4/Ticking_Clocks_and_Turning_Calendars/TickingClocks';
import TickingClocksIntro5W1H from './components/practice/class-4/Ticking_Clocks_and_Turning_Calendars/Topics/5W1H/TickingClocksIntro5W1H';
import TickingClocksTerminology from './components/practice/class-4/Ticking_Clocks_and_Turning_Calendars/Topics/Terminology/TickingClocksTerminology';
import TickingClocksSkills from './components/practice/class-4/Ticking_Clocks_and_Turning_Calendars/Topics/Skills/TickingClocksSkills';

import LinearEquations from './components/practice/class-8/linear_equations_in_one_variable/LinearEquations';
import LinearEquationsIntro5W1H from './components/practice/class-8/linear_equations_in_one_variable/Topics/5W1H/LinearEquationsIntro5W1H';
import LinearEquationsTerminology from './components/practice/class-8/linear_equations_in_one_variable/Topics/Terminology/LinearEquationsTerminology';
import LinearEquationsSkills from './components/practice/class-8/linear_equations_in_one_variable/Topics/Skills/LinearEquationsSkills';

import IntroductionToGraphs from './components/practice/class-8/introduction_to_graphs/IntroductionToGraphs';
import GraphsIntro5W1H from './components/practice/class-8/introduction_to_graphs/Topics/5W1H/GraphsIntro5W1H';
import GraphsTerminology from './components/practice/class-8/introduction_to_graphs/Topics/Terminology/GraphsTerminology';
import GraphsSkills from './components/practice/class-8/introduction_to_graphs/Topics/Skills/GraphsSkills';
import DirectAndInverseProportions from './components/practice/class-8/direct_and_inverse_proportions/DirectAndInverseProportions';
import ProportionsIntro5W1H from './components/practice/class-8/direct_and_inverse_proportions/Topics/5W1H/ProportionsIntro5W1H';
import ProportionsTerminology from './components/practice/class-8/direct_and_inverse_proportions/Topics/Terminology/ProportionsTerminology';
import ProportionsSkills from './components/practice/class-8/direct_and_inverse_proportions/Topics/Skills/ProportionsSkills';

import ShapesAroundUs from './components/practice/class-4/Shapes_Around_Us/ShapesAroundUs';
import ShapesAroundUsIntro from './components/practice/class-4/Shapes_Around_Us/Topics/5W1H/ShapesIntro5W1H';
import ShapesAroundUsTerminology from './components/practice/class-4/Shapes_Around_Us/Topics/Terminology/ShapesTerminology';
import ShapesAroundUsSkills from './components/practice/class-4/Shapes_Around_Us/Topics/Skills/ShapesSkills';

import PatternsAroundUs from './components/practice/class-4/Patterns_Around_Us/PatternsAroundUs';
import PatternsIntro5W1H from './components/practice/class-4/Patterns_Around_Us/Topics/Introduction/Introduction';
import PatternsTerminology from './components/practice/class-4/Patterns_Around_Us/Topics/Terminology/Terminology';
import PatternsSkills from './components/practice/class-4/Patterns_Around_Us/Topics/Skills/Skills';

import ShapesAndAnglesLanding from './components/practice/class-5/Shapes_and_Angles/ShapesAndAngles';
import ShapesAndAnglesIntro from './components/practice/class-5/Shapes_and_Angles/Topics/5W1H/ShapesIntro5W1H';
import ShapesAndAnglesTerminology from './components/practice/class-5/Shapes_and_Angles/Topics/Terminology/ShapesTerminology';
import ShapesAndAnglesSkills from './components/practice/class-5/Shapes_and_Angles/Topics/Skills/ShapesSkills';
import ShapesAndAnglesTest from './components/practice/class-5/Shapes_and_Angles/ShapesAndAnglesTest';
import HowManySquares from './components/practice/class-5/howmanysquares/HowManySquares';
import HowManySquaresTest from './components/practice/class-5/howmanysquares/HowManySquaresTest';
import HowManySquaresSkills from './components/practice/class-5/howmanysquares/Topics/Skills/HowManySquaresSkills';
import HowManySquaresIntro5W1H from './components/practice/class-5/howmanysquares/Topics/5W1H/HowManySquaresIntro5W1H';
import HowManySquaresTerminology from './components/practice/class-5/howmanysquares/Topics/Terminology/HowManySquaresTerminology';

import PartsAndWholesLanding from './components/practice/class-5/partsandwholes/PartsAndWholes';
import PartsAndWholesIntro from './components/practice/class-5/partsandwholes/Topics/5W1H/FractionsIntro5W1H';
import PartsAndWholesTerminology from './components/practice/class-5/partsandwholes/Topics/Terminology/FractionsTerminology';
import PartsAndWholesSkills from './components/practice/class-5/partsandwholes/Topics/Skills/FractionsSkills';
import PartsAndWholesTest from './components/practice/class-5/partsandwholes/PartsAndWholesTest';

import DoesItLookSameLanding from './components/practice/class-5/doesitlooksame/DoesItLookSameLandingPage.jsx';
import DoesItLookSameIntro from './components/practice/class-5/doesitlooksame/Topics/5W1H/DoesItLookSameIntro5W1H.jsx';
import DoesItLookSameTerminology from './components/practice/class-5/doesitlooksame/Topics/Terminology/DoesItLookSameTerminology.jsx';
import DoesItLookSameSkills from './components/practice/class-5/doesitlooksame/Topics/Skills/DoesItLookSameSkills.jsx';
import DoesItLookSameTest from './components/practice/class-5/doesitlooksame/DoesItLookSameTest.jsx';

import SharingAndMeasuring from './components/practice/class-4/Sharing_and_Measuring/SharingAndMeasuring';
import SharingAndMeasuringIntro from './components/practice/class-4/Sharing_and_Measuring/Topics/5W1H/SharingAndMeasuringIntro';
import SharingAndMeasuringTerminology from './components/practice/class-4/Sharing_and_Measuring/Topics/Terminology/SharingAndMeasuringTerminology';
import SharingAndMeasuringSkills from './components/practice/class-4/Sharing_and_Measuring/Topics/Skills/SharingAndMeasuringSkills';

import HideAndSeek from './components/practice/class-4/Hide_and_Seek/HideAndSeek';
import HideAndSeekIntro5W1H from './components/practice/class-4/Hide_and_Seek/Topics/5W1H/HideAndSeekIntro5W1H';
import HideAndSeekTerminology from './components/practice/class-4/Hide_and_Seek/Topics/Terminology/HideAndSeekTerminology';
import HideAndSeekSkills from './components/practice/class-4/Hide_and_Seek/Topics/Skills/HideAndSeekSkills';

// Grade 3 EVS
import OurFamiliesDashboard from './components/science/grade3/OurFamiliesAndCommunities/OurFamiliesDashboard';
import OurFamiliesIntro from './components/science/grade3/OurFamiliesAndCommunities/Topics/Introduction/OurFamiliesIntro';
import OurFamiliesTerminology from './components/science/grade3/OurFamiliesAndCommunities/Topics/Terminology/OurFamiliesTerminology';
import OurFamiliesSkills from './components/science/grade3/OurFamiliesAndCommunities/Topics/Skills/OurFamiliesSkills';
import OurFamiliesVirtualLab from './components/science/grade3/OurFamiliesAndCommunities/Topics/VirtualLab/OurFamiliesVirtualLab';

// Grade 4 EVS
import OurCommunityDashboard from './components/science/grade4/OurCommunity/OurCommunityDashboard';
import OurCommunityIntro from './components/science/grade4/OurCommunity/Topics/Introduction/OurCommunityIntro';
import OurCommunityTerminology from './components/science/grade4/OurCommunity/Topics/Terminology/OurCommunityTerminology';
import OurCommunitySkills from './components/science/grade4/OurCommunity/Topics/Skills/OurCommunitySkills';
import OurCommunityVirtualLab from './components/science/grade4/OurCommunity/Topics/VirtualLab/OurCommunityVirtualLab';

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

// Components
import ProtectedRoute from './components/ProtectedRoute';

// Dashboards
import StudentDashboard from './pages/dashboards/student/StudentDashboard';
import IDMPage from './pages/IDMPage';
import StudentDiagnosisResultsPage from './pages/dashboards/student/StudentDiagnosisResultsPage';
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
import AdminPracticeResultsPage from './pages/dashboards/admin/pages/PracticeResultsPage';
import AdminDiagnosisResultsPage from './pages/dashboards/admin/pages/DiagnosisResultsPage';

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
// House-of-Hundreds-II
import DrawTiles from './components/practice/class-3/House-of-Hundreds-II/Draw-tiles';
import NeighbouringNumbers from './components/practice/class-3/House-of-Hundreds-II/neighbouring-numbers';
import HelpCranesOnNumberLine from './components/practice/class-3/House-of-Hundreds-II/Help-cranes-on-number-line';
import Tambola from './components/practice/class-3/House-of-Hundreds-II/Tambola';
import SkipAndSolve from './components/practice/class-3/House-of-Hundreds-II/skip-&-solve';
import NumberInTheCentre from './components/practice/class-3/House-of-Hundreds-II/number-in-the-centre';
import NumberPuzzles from './components/practice/class-3/House-of-Hundreds-II/number-puzzles';
import TheNumberDetective from './components/practice/class-3/House-of-Hundreds-II/The-number-detective';
import PaperSlips from './components/practice/class-3/House-of-Hundreds-II/Paper-slips';
import RakshaBandhanTest from './components/practice/class-3/Raksha-Bandhan/RakshaBandhanTest';
import FairShareTest from './components/practice/class-3/fair-share/FairShareTest';
import FunAtClassPartyTest from './components/practice/class-3/Fun-at-class-party/FunAtClassPartyTest';
import HouseOfHundredsIITest from './components/practice/class-3/House-of-Hundreds-II/HouseOfHundredsIITest';
// Time Goes On
import ReadingCalendar from './components/practice/class-3/Time-Goes-On/reading-calendar';
import FuturePastDates from './components/practice/class-3/Time-Goes-On/future-past-dates';
import ConstructingCalendar from './components/practice/class-3/Time-Goes-On/constructing-calendar';
import MonthsDaysYear from './components/practice/class-3/Time-Goes-On/months-days-year';
import ComparingCalendars from './components/practice/class-3/Time-Goes-On/comparing-calendars';
import AgeProblems from './components/practice/class-3/Time-Goes-On/age-problems';
import ReadingDates from './components/practice/class-3/Time-Goes-On/reading-dates';
import AgeDuration from './components/practice/class-3/Time-Goes-On/age-duration';
import ClockTime from './components/practice/class-3/Time-Goes-On/clock-time';
import TimeDurations from './components/practice/class-3/Time-Goes-On/time-durations';
import TimeGoesOnTest from './components/practice/class-3/Time-Goes-On/TimeGoesOnTest';

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
import AreaBoundaryTest from './components/practice/class-5/AreaanditsBoundary/ChapterTest/AreaBoundaryTest';
import TenthsHundredthsTest from './components/practice/class-5/TenthsandHundrendths/ChapterTest/TenthsHundredthsTest';
import MultiplyDivideTest from './components/practice/class-5/WaystoMultiplyandDivide/ChapterTest/MultiplyDivideTest';
import HowBigHowHeavyTest from './components/practice/class-5/Howbighowheavy/ChapterTest/HowBigHowHeavyTest';
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

// Grade 8 Chapter Tests
import ExponentsAndPowersTest from './components/practice/class-8/exponents and powers/ExponentsAndPowersTest';
import Grade8RationalNumbersTest from './components/practice/class-8/rational-numbers/RationalNumbersTest';
import MensurationTest from './components/practice/class-8/mensuration/MensurationTest';
import FactorisationTest from './components/practice/class-8/factorisation/FactorisationTest';

// Grade 8 Squares and Square Roots
import IdentifyPerfectSquares from './components/practice/class-8/squares_and_square_roots/identify_perfect_squares';
import PropertiesOfSquareNumbers from './components/practice/class-8/squares_and_square_roots/properties_of_square_numbers';
import SquareUsingIdentityPatterns from './components/practice/class-8/squares_and_square_roots/square_using_identity_patterns';
import PythagoreanTriplets from './components/practice/class-8/squares_and_square_roots/pythagorean_triplets';
import ConceptOfSquareRoot from './components/practice/class-8/squares_and_square_roots/concept_of_square_root';
import SquareRootPrimeFactorization from './components/practice/class-8/squares_and_square_roots/square_root_prime_factorization';
import SquareRootLongDivision from './components/practice/class-8/squares_and_square_roots/square_root_long_division';
import SquareRootOfDecimals from './components/practice/class-8/squares_and_square_roots/square_root_of_decimals';
import SquaresAndSquareRootsTest from './components/practice/class-8/squares_and_square_roots/SquaresAndSquareRootsTest';

// Grade 8 Comparing Quantities
import ComparingQuantities from './components/practice/class-8/comparing_quantities/ComparingQuantities';
import ComparingQuantitiesIntro5W1H from './components/practice/class-8/comparing_quantities/Topics/5W1H/ComparingQuantitiesIntro5W1H';
import ComparingQuantitiesTerminology from './components/practice/class-8/comparing_quantities/Topics/Terminology/ComparingQuantitiesTerminology';
import ComparingQuantitiesSkills from './components/practice/class-8/comparing_quantities/Topics/Skills/ComparingQuantitiesSkills';

// Grade 8 Data Handling
import Grade8DataHandling from './components/practice/class-8/data_handling/DataHandling';
import Grade8DataHandlingIntro5W1H from './components/practice/class-8/data_handling/Topics/5W1H/DataHandlingIntro5W1H';
import Grade8DataHandlingTerminology from './components/practice/class-8/data_handling/Topics/Terminology/DataHandlingTerminology';
import Grade8DataHandlingSkills from './components/practice/class-8/data_handling/Topics/Skills/DataHandlingSkills';

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
import Grade2WhatIsLongWhatIsRound from './components/practice/grade-2/what-is-long-what-is-round/what-is-long-what-is-round';
import Grade2HowMuchCanYouCarry from './components/practice/grade-2/how-much-can-you-carry/how-much-can-you-carry';
import Grade2CountingInGroups from './components/practice/grade-2/counting-in-groups/counting-in-groups';
import Grade2CountingInTens from './components/practice/grade-2/counting-in-tens/counting-in-tens';
import Grade2Patterns from './components/practice/grade-2/patterns/patterns';
import Grade2Footprints from './components/practice/grade-2/footprints/footprints';
import Grade2JugsAndMugs from './components/practice/grade-2/jugs-and-mugs/jugs-and-mugs';
import Grade2TensAndOnes from './components/practice/grade-2/tens-and-ones/tens-and-ones';
import Grade2MyFunday from './components/practice/grade-2/my-funday/my-funday';
import Grade2AddOurPoints from './components/practice/grade-2/add-our-points/add-our-points';
import Grade2LinesAndLines from './components/practice/grade-2/lines-and-lines/lines-and-lines';
import Grade2GiveAndTake from './components/practice/grade-2/give-and-take/give-and-take';
import Grade2TheLongestStep from './components/practice/grade-2/the-longest-step/the-longest-step';
import Grade2BirdsComeBirdsGo from './components/practice/grade-2/birds-come-birds-go/birds-come-birds-go';

// Grade 5: Can you see the Pattern?
import PatternIdentification from './components/practice/class-5/CanyouseethePattern/PatternRecognition/pattern-identification';
import RuleBasedPatternCreation from './components/practice/class-5/CanyouseethePattern/PatternRecognition/rule-based-pattern-creation';
import UnderstandingRotations from './components/practice/class-5/CanyouseethePattern/PatternRecognition/understanding-rotations';
import GridPatternRecognition from './components/practice/class-5/CanyouseethePattern/PatternRecognition/grid-pattern-recognition';

// Grade 9 Number System
import NumberSystem from './components/practice/class-9/number_system/NumberSystem';
import NumberSystemIntro5W1H from './components/practice/class-9/number_system/Topics/5W1H/NumberSystemIntro5W1H';
import NumberSystemTerminology from './components/practice/class-9/number_system/Topics/Terminology/NumberSystemTerminology';
import NumberSystemSkills from './components/practice/class-9/number_system/Topics/Skills/NumberSystemSkills';

// Grade 9 Polynomials
import PolynomialsGrade9 from './components/practice/class-9/polynomials/PolynomialsGrade9';
import PolynomialsGrade9Intro from './components/practice/class-9/polynomials/Topics/5W1H/PolynomialsGrade9Intro';
import PolynomialsGrade9Terminology from './components/practice/class-9/polynomials/Topics/Terminology/PolynomialsGrade9Terminology';
import PolynomialsGrade9Skills from './components/practice/class-9/polynomials/Topics/Skills/PolynomialsGrade9Skills';

// Grade 9 Coordinate Geometry
import CoordinateGeometry9 from './components/practice/class-9/coordinate_geometry_9/CoordinateGeometry9';
import CoordinateGeometry9Intro from './components/practice/class-9/coordinate_geometry_9/Topics/Intro/CoordinateGeometry9Intro';
import CoordinateGeometry9Terminology from './components/practice/class-9/coordinate_geometry_9/Topics/Terminology/CoordinateGeometry9Terminology';
import CoordinateGeometry9Skills from './components/practice/class-9/coordinate_geometry_9/Topics/Skills/CoordinateGeometry9Skills';
import RealNumberClassification from './components/practice/class-9/number_system/RealNumberClassification';
import DecimalExpansion from './components/practice/class-9/number_system/DecimalExpansion';
import OperationsOnSurds from './components/practice/class-9/number_system/OperationsOnSurds';
import Rationalisation from './components/practice/class-9/number_system/Rationalisation';
import LawsOfExponents from './components/practice/class-9/number_system/LawsOfExponents';
import NumberSystemTest from './components/practice/class-9/number_system/NumberSystemTest';
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

// Grade 6 Patterns
import Grade6PatternsInMathematics from './components/practice/grade-6/PatternsInMathematics/PatternsInMathematics';
import Grade6PatternsIntro5W1H from './components/practice/grade-6/PatternsInMathematics/Topics/5W1H/PatternsIntro5W1H';
import Grade6PatternsTerminology from './components/practice/grade-6/PatternsInMathematics/Topics/Terminology/PatternsTerminology';
import Grade6PatternsSkills from './components/practice/grade-6/PatternsInMathematics/Topics/Skills/PatternsSkills';

// Grade 6 Symmetry
import ReflectionInALine6 from './components/practice/grade-6/symmetry/ReflectionInALine';
import RotationalSymmetry6 from './components/practice/grade-6/symmetry/RotationalSymmetry';
import OrderOfRotationalSymmetry6 from './components/practice/grade-6/symmetry/OrderOfRotationalSymmetry';
import IntroToSymmetry6 from './components/practice/grade-6/symmetry/line-of-symmetry';

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

// Class 7 - Integers Chapter
import IntegersHub from './components/practice/class-7/Integers/Integers';
import IntegersIntro5W1H from './components/practice/class-7/Integers/Topics/5W1H/IntegersIntro5W1H';
import IntegersTerminology from './components/practice/class-7/Integers/Topics/Terminology/IntegersTerminology';
import IntegersSkills from './components/practice/class-7/Integers/Topics/Skills/IntegersSkills';
import IntegersEasyTest from './components/practice/class-7/Integers/DeepDive/Tests/IntegersEasyTest';
import IntegersMediumTest from './components/practice/class-7/Integers/DeepDive/Tests/IntegersMediumTest';
import IntegersHardTest from './components/practice/class-7/Integers/DeepDive/Tests/IntegersHardTest';

// Class 7 - Fractions and Decimals
import FractionsAndDecimalsHub from './components/practice/class-7/FractionsAndDecimals/FractionsAndDecimals';
import FractionsAndDecimalsIntro5W1H from './components/practice/class-7/FractionsAndDecimals/Topics/5W1H/FractionsAndDecimalsIntro5W1H';
import FractionsAndDecimalsTerminology from './components/practice/class-7/FractionsAndDecimals/Topics/Terminology/FractionsAndDecimalsTerminology';
import FractionsAndDecimalsSkills from './components/practice/class-7/FractionsAndDecimals/Topics/Skills/FractionsAndDecimalsSkills';
import FractionsAndDecimalsEasyTest from './components/practice/class-7/FractionsAndDecimals/DeepDive/Tests/FractionsAndDecimalsEasyTest';
import FractionsAndDecimalsMediumTest from './components/practice/class-7/FractionsAndDecimals/DeepDive/Tests/FractionsAndDecimalsMediumTest';
import FractionsAndDecimalsHardTest from './components/practice/class-7/FractionsAndDecimals/DeepDive/Tests/FractionsAndDecimalsHardTest';
import DataHandlingHub from './components/practice/class-7/DataHandling/DataHandling';
import DataHandlingIntro5W1H from './components/practice/class-7/DataHandling/Topics/5W1H/DataHandlingIntro5W1H';
import DataHandlingTerminology from './components/practice/class-7/DataHandling/Topics/Terminology/DataHandlingTerminology';
import DataHandlingSkills from './components/practice/class-7/DataHandling/Topics/Skills/DataHandlingSkills';
import DataHandlingEasyTest from './components/practice/class-7/DataHandling/DeepDive/Tests/DataHandlingEasyTest';
import DataHandlingMediumTest from './components/practice/class-7/DataHandling/DeepDive/Tests/DataHandlingMediumTest';
import DataHandlingHardTest from './components/practice/class-7/DataHandling/DeepDive/Tests/DataHandlingHardTest';
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
import PairOfLinearEquationsTest from './components/practice/class-10/Pair of linear equations in two variables/PairOfLinearEquationsTest';
import FoundationsQuadratic from './components/practice/class-10/Quadratic Equations/FoundationsQuadratic';
import RepresentingSituations from './components/practice/class-10/Quadratic Equations/RepresentingSituations';
import IdentifyingQuadratic from './components/practice/class-10/Quadratic Equations/IdentifyingQuadratic';
import RootsByFactorisation from './components/practice/class-10/Quadratic Equations/RootsByFactorisation';
import WordProblemsFactorisation from './components/practice/class-10/Quadratic Equations/WordProblemsFactorisation';
import NatureOfRoots from './components/practice/class-10/Quadratic Equations/NatureOfRoots';
import DiscriminantAnalysis from './components/practice/class-10/Quadratic Equations/DiscriminantAnalysis';
import RealLifeApplications from './components/practice/class-10/Quadratic Equations/RealLifeApplications';
import QuadraticEquationsTest from './components/practice/class-10/Quadratic Equations/QuadraticEquationsTest';



// Class 10: Probability
import Probability from './components/practice/class-10/Probability/Probability';
import ProbabilityIntro5W1H from './components/practice/class-10/Probability/Topics/5W1H/ProbabilityIntro5W1H';
import ProbabilityTerminology from './components/practice/class-10/Probability/Topics/Terminology/ProbabilityTerminology';
import ProbabilitySkills from './components/practice/class-10/Probability/Topics/Skills/ProbabilitySkills';
import ProbabilityEasyTest from './components/practice/class-10/Probability/DeepDive/Tests/ProbabilityEasyTest';
import ProbabilityMediumTest from './components/practice/class-10/Probability/DeepDive/Tests/ProbabilityMediumTest';
import ProbabilityHardTest from './components/practice/class-10/Probability/DeepDive/Tests/ProbabilityHardTest';

// Class 11 Physics: Work, Energy and Power
import WorkEnergyPowerDashboard from './components/practice/class-11/physics/WorkEnergyPower/WorkEnergyPowerDashboard';
import WorkEnergyPowerIntro from './components/practice/class-11/physics/WorkEnergyPower/Topics/Introduction/WorkEnergyPowerIntro';
import WorkEnergyPowerTerminology from './components/practice/class-11/physics/WorkEnergyPower/Topics/Terminology/WorkEnergyPowerTerminology';
import WorkEnergyPowerSkills from './components/practice/class-11/physics/WorkEnergyPower/Topics/Skills/WorkEnergyPowerSkills';
import WorkEnergyPowerConnectomics from './components/practice/class-11/physics/WorkEnergyPower/Topics/Connectomics/WorkEnergyPowerConnectomics';
import WorkEnergyPowerExamEdge from './components/practice/class-11/physics/WorkEnergyPower/Topics/ExamEdge/WorkEnergyPowerExamEdge';
import WorkEnergyPowerMindMap from './components/practice/class-11/physics/WorkEnergyPower/Topics/MindMap/WorkEnergyPowerMindMap';
import WorkEnergyPowerDerivations from './components/practice/class-11/physics/WorkEnergyPower/Topics/DerivationsNumericals/WorkEnergyPowerDerivations';

// Class 10: Real Numbers
import RealNumbersDashboard from './components/practice/class-10/RealNumbers/RealNumbersDashboard';
import RealNumbersIntro from './components/practice/class-10/RealNumbers/Topics/Introduction/RealNumbersIntro';
import RealNumbersTerminology from './components/practice/class-10/RealNumbers/Topics/Terminology/RealNumbersTerminology';
import RealNumbersSkills from './components/practice/class-10/RealNumbers/Topics/Skills/RealNumbersSkills';
import RealNumbersConnectomics from './components/practice/class-10/RealNumbers/Topics/Connectomics/RealNumbersConnectomics';
import RealNumbersExamEdge from './components/practice/class-10/RealNumbers/Topics/ExamEdge/RealNumbersExamEdge';
import TrianglesDashboard from './components/practice/class-10/Triangles/TrianglesDashboard';
import TrianglesIntro from './components/practice/class-10/Triangles/Topics/Introduction/TrianglesIntro';
import TrianglesTerminology from './components/practice/class-10/Triangles/Topics/Terminology/TrianglesTerminology';
import TrianglesSkills from './components/practice/class-10/Triangles/Topics/Skills/TrianglesSkills';
import TrianglesConnectomics from './components/practice/class-10/Triangles/Topics/Connectomics/TrianglesConnectomics';

// Class 10: Circles
import CirclesDashboard from './components/practice/class-10/Circles/CirclesDashboard';
import CirclesIntro from './components/practice/class-10/Circles/Topics/Introduction/CirclesIntro';
import CirclesTerminology from './components/practice/class-10/Circles/Topics/Terminology/CirclesTerminology';
import CirclesSkills from './components/practice/class-10/Circles/Topics/Skills/CirclesSkills';
import CirclesConnectomics from './components/practice/class-10/Circles/Topics/Connectomics/CirclesConnectomics';

// Class 10: Coordinate Geometry
import CoordinateGeometryDashboard from './components/practice/class-10/CoordinateGeometry/CoordinateGeometryDashboard';
import CoordinateGeometryIntro from './components/practice/class-10/CoordinateGeometry/Topics/Introduction/CoordinateGeometryIntro';
import CoordinateGeometryTerminology from './components/practice/class-10/CoordinateGeometry/Topics/Terminology/CoordinateGeometryTerminology';
import CoordinateGeometrySkills from './components/practice/class-10/CoordinateGeometry/Topics/Skills/CoordinateGeometrySkills';
import CoordinateGeometryConnectomics from './components/practice/class-10/CoordinateGeometry/Topics/Connectomics/CoordinateGeometryConnectomics';

// Grade 7 Science: The Ever-Evolving World of Science
import WonderfulWorldScienceDashboard from './components/science/grade7/WonderfulWorldScience/WonderfulWorldScienceDashboard';
import WonderfulWorldScienceIntro from './components/science/grade7/WonderfulWorldScience/Topics/Introduction/WonderfulWorldScienceIntro';
import WonderfulWorldScienceTerminology from './components/science/grade7/WonderfulWorldScience/Topics/Terminology/WonderfulWorldScienceTerminology';
import WonderfulWorldScienceCoreConcepts from './components/science/grade7/WonderfulWorldScience/Topics/CoreConcepts/WonderfulWorldScienceCoreConcepts';
import WonderfulWorldScienceConnectomics from './components/science/grade7/WonderfulWorldScience/Topics/Connectomics/WonderfulWorldScienceConnectomics';

// Class 10 Science: Chemical Reactions
import ChemicalReactionsDashboard from './components/science/grade10/ChemicalReactions/ChemicalReactionsDashboard';
import ChemReactionsIntro from './components/science/grade10/ChemicalReactions/Topics/Introduction/ChemReactionsIntro';
import ChemReactionsTerminology from './components/science/grade10/ChemicalReactions/Topics/Terminology/ChemReactionsTerminology';
import ChemReactionsCoreConcepts from './components/science/grade10/ChemicalReactions/Topics/CoreConcepts/ChemReactionsCoreConcepts';
import ChemReactionsConnectomics from './components/science/grade10/ChemicalReactions/Topics/Connectomics/ChemReactionsConnectomics';
import ChemReactionsExamEdge from './components/science/grade10/ChemicalReactions/Topics/ExamEdge/ChemReactionsExamEdge';
import ChemReactionsVirtualLab from './components/science/grade10/ChemicalReactions/Topics/VirtualLab/ChemReactionsVirtualLab';

// Class 6 Science: Wonderful World of Science
import WonderfulWorldOfScienceDashboard from './components/science/grade6/WonderfulWorldOfScience/WonderfulWorldOfScienceDashboard';
import WWSIntro from './components/science/grade6/WonderfulWorldOfScience/Topics/Introduction/WWSIntro';
import WWSTerminology from './components/science/grade6/WonderfulWorldOfScience/Topics/Terminology/WWSTerminology';
import WWSCoreConcepts from './components/science/grade6/WonderfulWorldOfScience/Topics/CoreConcepts/WWSCoreConcepts';
import WWSConnectomics from './components/science/grade6/WonderfulWorldOfScience/Topics/Connectomics/WWSConnectomics';
import WWSVirtualLab from './components/science/grade6/WonderfulWorldOfScience/Topics/VirtualLab/WWSVirtualLab';

// Class 5 Science: Water — The Essence of Life
import WaterEssenceOfLifeDashboard from './components/science/grade5/WaterEssenceOfLife/WaterEssenceOfLifeDashboard';
import WELIntro from './components/science/grade5/WaterEssenceOfLife/Topics/Introduction/WELIntro';
import WELTerminology from './components/science/grade5/WaterEssenceOfLife/Topics/Terminology/WELTerminology';
import WELCoreConcepts from './components/science/grade5/WaterEssenceOfLife/Topics/CoreConcepts/WELCoreConcepts';
import WELConnectomics from './components/science/grade5/WaterEssenceOfLife/Topics/Connectomics/WELConnectomics';
import WELVirtualLab from './components/science/grade5/WaterEssenceOfLife/Topics/VirtualLab/WELVirtualLab';

// Grade 8 Science: Investigative Science
import InvestigativeScienceDashboard from './components/science/grade8/ExploringInvestigativeScience/InvestigativeScienceDashboard';
import ScienceIntro from './components/science/grade8/ExploringInvestigativeScience/Topics/Introduction/ScienceIntro';
import ScienceTerminology from './components/science/grade8/ExploringInvestigativeScience/Topics/Terminology/ScienceTerminology';
import ScienceCoreConcepts from './components/science/grade8/ExploringInvestigativeScience/Topics/CoreConcepts/ScienceCoreConcepts';
import ScienceConnectomics from './components/science/grade8/ExploringInvestigativeScience/Topics/Connectomics/ScienceConnectomics';
import ScienceExamEdge from './components/science/grade8/ExploringInvestigativeScience/Topics/ExamEdge/ScienceExamEdge';
import ScienceVirtualLab from './components/science/grade8/ExploringInvestigativeScience/Topics/VirtualLab/ScienceVirtualLab';
// Class 10: Areas Related to Circles
import AreasRelatedToCirclesDashboard from './components/practice/class-10/AreasRelatedToCircles/AreasRelatedToCirclesDashboard';
import AreasRelatedToCirclesIntro from './components/practice/class-10/AreasRelatedToCircles/Topics/Introduction/AreasRelatedToCirclesIntro';
import AreasRelatedToCirclesTerminology from './components/practice/class-10/AreasRelatedToCircles/Topics/Terminology/AreasRelatedToCirclesTerminology';
import AreasRelatedToCirclesSkills from './components/practice/class-10/AreasRelatedToCircles/Topics/Skills/AreasRelatedToCirclesSkills';
import AreasRelatedToCirclesConnectomics from './components/practice/class-10/AreasRelatedToCircles/Topics/Connectomics/AreasRelatedToCirclesConnectomics';

// Class 10: Polynomials
import TypesAndDegrees from './components/practice/class-10/Polynomials/TypesAndDegrees';
import EvaluatingAndIdentifying from './components/practice/class-10/Polynomials/EvaluatingAndIdentifying';
import GeometricalInterpretation from './components/practice/class-10/Polynomials/GeometricalInterpretation';
import NumberFromGraphicalBehaviour from './components/practice/class-10/Polynomials/NumberFromGraphicalBehaviour';
import RelationshipQuadratic from './components/practice/class-10/Polynomials/RelationshipQuadratic';
import ConstructingQuadratic from './components/practice/class-10/Polynomials/ConstructingQuadratic';
import RelationshipCubic from './components/practice/class-10/Polynomials/RelationshipCubic';
import PolynomialsTest from './components/practice/class-10/Polynomials/PolynomialsTest';

// Class 12 - Matrices Chapter
import MatricesHub from './components/practice/class-12/Matrices/Matrices';
import MatricesIntro5W1H from './components/practice/class-12/Matrices/Topics/5W1H/MatricesIntro5W1H';
import MatricesTerminology from './components/practice/class-12/Matrices/Topics/Terminology/MatricesTerminology';
import MatricesSkills from './components/practice/class-12/Matrices/Topics/Skills/MatricesSkills';
import MatricesConnectomics from './components/practice/class-12/Matrices/Topics/Connectomics/MatricesConnectomics';
import MatricesExamEdge from './components/practice/class-12/Matrices/Topics/ExamEdge/MatricesExamEdge';
import WhoUsesMatrices from './components/practice/class-12/Matrices/DeepDive/Pages/WhoUsesMatrices';
import WhatIsMatrix from './components/practice/class-12/Matrices/DeepDive/Pages/WhatIsMatrix';
import WhenDoWeNeedMatrices from './components/practice/class-12/Matrices/DeepDive/Pages/WhenDoWeNeedMatrices';
import HowOperationsWork from './components/practice/class-12/Matrices/DeepDive/Pages/HowOperationsWork';
import WhyRulesWork from './components/practice/class-12/Matrices/DeepDive/Pages/WhyRulesWork';
import WhereApplied from './components/practice/class-12/Matrices/DeepDive/Pages/WhereApplied';
import InvertibleMatrices from './components/practice/class-12/Matrices/DeepDive/Pages/InvertibleMatrices';
import MatrixOrderTest from './components/practice/class-12/Matrices/DeepDive/Tests/MatrixOrderTest';
import MatrixTypesTest from './components/practice/class-12/Matrices/DeepDive/Tests/MatrixTypesTest';
import MatrixEqualityTest from './components/practice/class-12/Matrices/DeepDive/Tests/MatrixEqualityTest';
import MatrixOperationsTest from './components/practice/class-12/Matrices/DeepDive/Tests/MatrixOperationsTest';
import MatrixTransposeTest from './components/practice/class-12/Matrices/DeepDive/Tests/MatrixTransposeTest';
import InvertibleMatricesTest from './components/practice/class-12/Matrices/DeepDive/Tests/InvertibleMatricesTest';
import MatricesChapterTest from './components/practice/class-12/Matrices/DeepDive/Tests/MatricesChapterTest';

// Class 12 - Determinants Chapter
import DeterminantsHub from './components/practice/class-12/Determinants/Determinants';
import DeterminantsIntro5W1H from './components/practice/class-12/Determinants/Topics/5W1H/DeterminantsIntro5W1H';
import DeterminantsTerminology from './components/practice/class-12/Determinants/Topics/Terminology/DeterminantsTerminology';
import DeterminantsSkills from './components/practice/class-12/Determinants/Topics/Skills/DeterminantsSkills';
import DeterminantsConnectomics from './components/practice/class-12/Determinants/Topics/Connectomics/DeterminantsConnectomics';
import DeterminantsExamEdge from './components/practice/class-12/Determinants/Topics/ExamEdge/DeterminantsExamEdge';
import DeterminantsEasyTest from './components/practice/class-12/Determinants/DeepDive/Tests/DeterminantsEasyTest';
import DeterminantsMediumTest from './components/practice/class-12/Determinants/DeepDive/Tests/DeterminantsMediumTest';
import DeterminantsHardTest from './components/practice/class-12/Determinants/DeepDive/Tests/DeterminantsHardTest';

// Class 12 - Relations Chapter
import RelationsHub from './components/practice/class-12/Relations/Relations';
import RelationsIntro5W1H from './components/practice/class-12/Relations/Topics/5W1H/RelationsIntro5W1H';
import RelationsTerminology from './components/practice/class-12/Relations/Topics/Terminology/RelationsTerminology';
import RelationsSkills from './components/practice/class-12/Relations/Topics/Skills/RelationsSkills';
import RelationsConnectomics from './components/practice/class-12/Relations/Topics/Connectomics/RelationsConnectomics';
import RelationsExamEdge from './components/practice/class-12/Relations/Topics/ExamEdge/RelationsExamEdge';

// Class 11 - Biology
import CellStructureTest from './components/practice/class-11/biology/CellStructureTest';
import BiologyChapters from './components/practice/class-11/biology/BiologyChapters';

// import SetsChapter1Skill100 from './components/practice/class-11/maths/Sets/sets-chapter1-skill100';
import MathsChapters from './components/practice/class-11/maths/MathsChapters';

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

// Grade 5 - The Fish Tale
import LargeNumbersRealLife from './components/practice/class-5/The_Fish_Tale/Real_Life_Situations/LargeNumbersRealLife';
import PlaceValueLakhs from './components/practice/class-5/The_Fish_Tale/Place_Value/PlaceValueLakhs';
import ReadingWritingBigNumbers from './components/practice/class-5/The_Fish_Tale/Reading_Writing_Numbers/ReadingWritingBigNumbers';
import ComparisonOfNumbers from './components/practice/class-5/The_Fish_Tale/Comparison/ComparisonOfNumbers';
import EstimationAndRounding from './components/practice/class-5/The_Fish_Tale/Estimation/EstimationAndRounding';
import NumberSensePlaceValue from './components/practice/class-5/The_Fish_Tale/Number_Sense/NumberSensePlaceValue';
import EstimationSkills from './components/practice/class-5/The_Fish_Tale/Estimation/EstimationSkills';
import InterpretingRealLifeData from './components/practice/class-5/The_Fish_Tale/Real_Life_Data/InterpretingRealLifeData';
import TheFishTaleTest from './components/practice/class-5/The_Fish_Tale/TheFishTaleTest';

// Grade 4 - Elephants, Tigers, and Leopards
import JungleNimGame from './components/practice/class-4/Elephants_Tigers_and_Leopards/Number_Games_and_Patterns/nim_game_add_1_or_2';
import AdditionChartPatterns from './components/practice/class-4/Elephants_Tigers_and_Leopards/Number_Games_and_Patterns/addition_chart_patterns';
import MagicMirrorAddition from './components/practice/class-4/Elephants_Tigers_and_Leopards/Number_Games_and_Patterns/reverse_two_digit_addition';
import ForestRestorationAddition from './components/practice/class-4/Elephants_Tigers_and_Leopards/Large_Number_Addition/four_digit_addition_with_regrouping';
import JungleGatheringAddition from './components/practice/class-4/Elephants_Tigers_and_Leopards/Large_Number_Addition/multi_number_addition';
import EstimateFirstAddition from './components/practice/class-4/Elephants_Tigers_and_Leopards/Large_Number_Addition/estimation_before_addition';
import RiverCrossingSubtraction from './components/practice/class-4/Elephants_Tigers_and_Leopards/Large_Number_Addition/four_digit_subtraction_with_regrouping';
import HiddenPathDifference from './components/practice/class-4/Elephants_Tigers_and_Leopards/Large_Number_Addition/find_missing_difference';
import EstimateFirstSubtraction from './components/practice/class-4/Elephants_Tigers_and_Leopards/Large_Number_Subtraction/estimation_before_subtraction';
import BalanceScaleComparison from './components/practice/class-4/Elephants_Tigers_and_Leopards/Comparison_and_Estimation/more_or_less_find_unknown';
import QuickCompare from './components/practice/class-4/Elephants_Tigers_and_Leopards/Comparison_and_Estimation/compare_without_calculating';
import SmartShortcuts from './components/practice/class-4/Elephants_Tigers_and_Leopards/Comparison_and_Estimation/near_hundred_add_subtract';
import CompensationStrategy from './components/practice/class-4/Elephants_Tigers_and_Leopards/Mental_Math_Strategies/compensation_strategy_questions';

// Grade 4 - Fun with Symmetry
import IdentifyLineOfSymmetry from './components/practice/class-4/Fun_with_Symmetry/Line_Symmetry/identify_line_of_symmetry';
import DrawLineOfSymmetry from './components/practice/class-4/Fun_with_Symmetry/Line_Symmetry/draw_line_of_symmetry';
import PaperFoldSymmetry from './components/practice/class-4/Fun_with_Symmetry/Symmetry_by_Folding_and_Mirror/paper_fold_symmetry';
import MirrorImageShapes from './components/practice/class-4/Fun_with_Symmetry/Symmetry_by_Folding_and_Mirror/mirror_image_shapes';
import CompleteHalfDesign from './components/practice/class-4/Fun_with_Symmetry/Completing_Symmetric_Figures/complete_half_design';
import SymmetryOnDotGrid from './components/practice/class-4/Fun_with_Symmetry/Completing_Symmetric_Figures/symmetry_on_dot_grid';
import LinesOfSymmetryInPolygons from './components/practice/class-4/Fun_with_Symmetry/Symmetry_in_Shapes_and_Characters/lines_of_symmetry_in_polygons';
import MirrorSymmetricNumbersLetters from './components/practice/class-4/Fun_with_Symmetry/Symmetry_in_Shapes_and_Characters/mirror_symmetric_numbers_letters';
import IdentifyRepeatingTile from './components/practice/class-4/Fun_with_Symmetry/Symmetry_in_Patterns_and_Tiling/identify_repeating_tile';
import CreateTilingWithoutGaps from './components/practice/class-4/Fun_with_Symmetry/Symmetry_in_Patterns_and_Tiling/create_tiling_without_gaps';
import ClassifySymmetricalObjects from './components/practice/class-4/Fun_with_Symmetry/Real_Life_Symmetry/classify_symmetrical_objects';
import FunWithSymmetryTest from './components/practice/class-4/Fun_with_Symmetry/FunWithSymmetryTest';
import ElephantsTest from './components/practice/class-4/Elephants_Tigers_and_Leopards/ElephantsTest';
import EqualGroupsTest from './components/practice/class-4/Equal_Groups/EqualGroupsTest';
import WeighItPourItTest from './components/practice/class-4/Weigh_It_Pour_It/WeighItPourItTest';

import TheTransportMuseum from './components/practice/class-4/The_Transport_Museum/TheTransportMuseum';
import MuseumIntro5W1H from './components/practice/class-4/The_Transport_Museum/Topics/5W1H/MuseumIntro5W1H';
import MuseumTerminology from './components/practice/class-4/The_Transport_Museum/Topics/Terminology/MuseumTerminology';
import MuseumSkills from './components/practice/class-4/The_Transport_Museum/Topics/Skills/MuseumSkills';

import MeasuringLengthDashboard from './components/practice/class-4/Measuring_Length/MeasuringLengthDashboard';
import MeasuringLengthIntro from './components/practice/class-4/Measuring_Length/Topics/5W1H/MeasuringLengthIntro';
import MeasuringLengthTerms from './components/practice/class-4/Measuring_Length/Topics/Terminology/MeasuringLengthTerms';
import MeasuringLengthSkills from './components/practice/class-4/Measuring_Length/Topics/Skills/InteractiveModules/MeasuringLengthSkills';

import DataHandlingClass4 from './components/practice/class-4/Data_Handling/DataHandlingClass4';
import DataHandlingIntro5W1HClass4 from './components/practice/class-4/Data_Handling/Topics/5W1H/DataHandlingIntro5W1HClass4';
import DataHandlingTerminologyClass4 from './components/practice/class-4/Data_Handling/Topics/Terminology/DataHandlingTerminologyClass4';
import DataHandlingSkillsClass4 from './components/practice/class-4/Data_Handling/Topics/Skills/DataHandlingSkillsClass4';
import ThousandsAroundUs from './components/practice/class-4/Thousands_Around_Us/ThousandsAroundUs';
import ThousandsAroundUsIntro from './components/practice/class-4/Thousands_Around_Us/Topics/5W1H/ThousandsAroundUsIntro';
import ThousandsAroundUsTerminology from './components/practice/class-4/Thousands_Around_Us/Topics/Terminology/ThousandsAroundUsTerminology';
import ThousandsAroundUsSkills from './components/practice/class-4/Thousands_Around_Us/Topics/Skills/ThousandsAroundUsSkills';
import DiagnosisLanding from './components/Diagnosis_test/DiagnosisLanding';
import DiagnosisTestRunner from './components/Diagnosis_test/DiagnosisTestRunner';

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
  // Initialize GA4 tracking
  useEffect(() => {
    // Add Google Analytics script
    const script1 = document.createElement('script');
    script1.async = true;
    script1.src = 'https://www.googletagmanager.com/gtag/js?id=G-DPVP197Z95';
    document.head.appendChild(script1);

    // Initialize gtag
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      window.dataLayer.push(arguments);
    }
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', 'G-DPVP197Z95');
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="learn-to-learn" element={<ContentPage topic="learn-to-learn" />} />
          <Route path="math" element={<MathSelection />} />
          <Route path="practice" element={<PracticePage />} />
          <Route path="diagnosis-test" element={<ProtectedRoute redirectTo="/login"><DiagnosisLanding /></ProtectedRoute>} />
          <Route path="math/grade/:grade" element={<GradeSyllabus />} />
          {/* Middle Routes (Grades 5-7 professional design) */}
          <Route path="middle/grade/:grade" element={<MiddleGradeSyllabus />} />
          {/* Senior Routes (Grades 8-10 professional design) */}
          <Route path="senior/grade/:grade" element={<SeniorGradeSyllabus />} />

          {/* Class 11 Biology */}
          <Route path="senior/grade/11/biology" element={<BiologyChapters />} />
          <Route path="senior/grade/11/biology/cell-structure" element={<CellStructureTest />} />
          <Route path="senior/grade/11/biology/the-cell" element={<TheCellDashboard />} />
          <Route path="senior/grade/11/biology/the-cell/introduction" element={<TheCellIntro />} />
          <Route path="senior/grade/11/biology/the-cell/terminology" element={<TheCellTerminology />} />
          <Route path="senior/grade/11/biology/the-cell/skills" element={<TheCellSkills />} />
          <Route path="senior/grade/11/biology/the-cell/connectomics" element={<TheCellConnectomics />} />
          <Route path="senior/grade/11/biology/the-cell/exam-edge" element={<TheCellExamEdge />} />

          {/* Class 11 Maths */}
          <Route path="senior/grade/11/maths" element={<MathsChapters />} />
          <Route path="senior/grade/11/maths/sets" element={<SetsDashboard />} />
          <Route path="senior/grade/11/maths/sets/introduction" element={<SetsIntro />} />
          <Route path="senior/grade/11/maths/sets/terminology" element={<SetsTerminology />} />
          <Route path="senior/grade/11/maths/sets/skills" element={<SetsSkills />} />
          <Route path="senior/grade/11/maths/sets/connectomics" element={<SetsConnectomics />} />
          <Route path="senior/grade/11/maths/sets/exam-edge" element={<SetsExamEdge />} />

          {/* Class 11 Physics */}
          <Route path="senior/grade/11/physics" element={<PhysicsChapters />} />
          <Route path="senior/grade/11/physics/laws-of-motion" element={<LawsOfMotionDashboard />} />
          <Route path="senior/grade/11/physics/laws-of-motion/introduction" element={<LawsOfMotionIntro />} />
          <Route path="senior/grade/11/physics/laws-of-motion/terminology" element={<LawsOfMotionTerminology />} />
          <Route path="senior/grade/11/physics/laws-of-motion/skills" element={<LawsOfMotionSkills />} />
          <Route path="senior/grade/11/physics/laws-of-motion/connectomics" element={<LawsOfMotionConnectomics />} />
          <Route path="senior/grade/11/physics/laws-of-motion/exam-edge" element={<LawsOfMotionExamEdge />} />
          <Route path="senior/grade/11/physics/work-energy-power" element={<WorkEnergyPowerDashboard />} />
          <Route path="senior/grade/11/physics/work-energy-power/introduction" element={<WorkEnergyPowerIntro />} />
          <Route path="senior/grade/11/physics/work-energy-power/terminology" element={<WorkEnergyPowerTerminology />} />
          <Route path="senior/grade/11/physics/work-energy-power/skills" element={<WorkEnergyPowerSkills />} />
          <Route path="senior/grade/11/physics/work-energy-power/connectomics" element={<WorkEnergyPowerConnectomics />} />
          <Route path="senior/grade/11/physics/work-energy-power/exam-edge" element={<WorkEnergyPowerExamEdge />} />
          <Route path="senior/grade/11/physics/work-energy-power/mind-map" element={<WorkEnergyPowerMindMap />} />
          <Route path="senior/grade/11/physics/work-energy-power/derivations" element={<WorkEnergyPowerDerivations />} />

          {/* Class 11 Chemistry */}
          <Route path="senior/grade/11/chemistry" element={<ChemistryChapters />} />
          <Route path="senior/grade/11/chemistry/structure-of-atom" element={<StructureOfAtomDashboard />} />
          <Route path="senior/grade/11/chemistry/structure-of-atom/introduction" element={<StructureOfAtomIntro />} />
          <Route path="senior/grade/11/chemistry/structure-of-atom/terminology" element={<StructureOfAtomTerminology />} />
          <Route path="senior/grade/11/chemistry/structure-of-atom/skills" element={<StructureOfAtomSkills />} />
          <Route path="senior/grade/11/chemistry/structure-of-atom/connectomics" element={<StructureOfAtomConnectomics />} />
          <Route path="senior/grade/11/chemistry/structure-of-atom/exam-edge" element={<StructureOfAtomExamEdge />} />
          
          {/* Grade 7 Science */}
          <Route path="/middle/grade/7/science/wonderful-world-science" element={<WonderfulWorldScienceDashboard />} />
          <Route path="/middle/grade/7/science/wonderful-world-science/introduction" element={<WonderfulWorldScienceIntro />} />
          <Route path="/middle/grade/7/science/wonderful-world-science/terminology" element={<WonderfulWorldScienceTerminology />} />
          <Route path="/middle/grade/7/science/wonderful-world-science/core-concepts" element={<WonderfulWorldScienceCoreConcepts />} />
          <Route path="/middle/grade/7/science/wonderful-world-science/connectomics" element={<WonderfulWorldScienceConnectomics />} />

          {/* Grade 10 Science */}
          <Route path="/senior/grade/10/science/chemical-reactions" element={<ChemicalReactionsDashboard />} />
          <Route path="/senior/grade/10/science/chemical-reactions/introduction" element={<ChemReactionsIntro />} />
          <Route path="/senior/grade/10/science/chemical-reactions/terminology" element={<ChemReactionsTerminology />} />
          <Route path="/senior/grade/10/science/chemical-reactions/core-concepts" element={<ChemReactionsCoreConcepts />} />
          <Route path="/senior/grade/10/science/chemical-reactions/connectomics" element={<ChemReactionsConnectomics />} />
          <Route path="/senior/grade/10/science/chemical-reactions/exam-edge" element={<ChemReactionsExamEdge />} />
          <Route path="/senior/grade/10/science/chemical-reactions/virtual-lab" element={<ChemReactionsVirtualLab />} />

          {/* Grade 6 Science */}
          <Route path="/middle/grade/6/science/wonderful-world-of-science" element={<WonderfulWorldOfScienceDashboard />} />
          <Route path="/middle/grade/6/science/wonderful-world-of-science/introduction" element={<WWSIntro />} />
          <Route path="/middle/grade/6/science/wonderful-world-of-science/terminology" element={<WWSTerminology />} />
          <Route path="/middle/grade/6/science/wonderful-world-of-science/core-concepts" element={<WWSCoreConcepts />} />
          <Route path="/middle/grade/6/science/wonderful-world-of-science/connectomics" element={<WWSConnectomics />} />
          <Route path="/middle/grade/6/science/wonderful-world-of-science/virtual-lab" element={<WWSVirtualLab />} />

          {/* Grade 5 Science */}
          <Route path="/middle/grade/5/science/water-essence-of-life" element={<WaterEssenceOfLifeDashboard />} />
          <Route path="/middle/grade/5/science/water-essence-of-life/introduction" element={<WELIntro />} />
          <Route path="/middle/grade/5/science/water-essence-of-life/terminology" element={<WELTerminology />} />
          <Route path="/middle/grade/5/science/water-essence-of-life/core-concepts" element={<WELCoreConcepts />} />
          <Route path="/middle/grade/5/science/water-essence-of-life/connectomics" element={<WELConnectomics />} />
          <Route path="/middle/grade/5/science/water-essence-of-life/virtual-lab" element={<WELVirtualLab />} />
          {/* Grade 8 Science */}
          <Route path="/senior/grade/8/science/investigative-science" element={<InvestigativeScienceDashboard />} />
          <Route path="/senior/grade/8/science/investigative-science/introduction" element={<ScienceIntro />} />
          <Route path="/senior/grade/8/science/investigative-science/terminology" element={<ScienceTerminology />} />
          <Route path="/senior/grade/8/science/investigative-science/core-concepts" element={<ScienceCoreConcepts />} />
          <Route path="/senior/grade/8/science/investigative-science/connectomics" element={<ScienceConnectomics />} />
          <Route path="/senior/grade/8/science/investigative-science/exam-edge" element={<ScienceExamEdge />} />
          <Route path="/senior/grade/8/science/investigative-science/virtual-lab" element={<ScienceVirtualLab />} />

          <Route path="ai" element={<ContentPage topic="ai" />} />
          <Route path="algebra" element={<ProtectedRoute redirectTo="/login"><Algebra /></ProtectedRoute>} />
          {/* Algebra Topic Pages */}
          <Route path="algebra/introduction" element={<ProtectedRoute redirectTo="/login"><AlgebraIntro5W1H onBack={() => window.history.back()} /></ProtectedRoute>} />
          <Route path="algebra/terminology" element={<ProtectedRoute redirectTo="/login"><AlgebraTerminology onBack={() => window.history.back()} /></ProtectedRoute>} />
          <Route path="algebra/skills" element={<ProtectedRoute redirectTo="/login"><AlgebraSkills onBack={() => window.history.back()} /></ProtectedRoute>} />
          <Route path="algebra-mastery" element={<ProtectedRoute redirectTo="/login"><AlgebraMasteryTest /></ProtectedRoute>} />
          {/* Calculus Master Dashboard */}
          <Route path="calculus" element={<ProtectedRoute redirectTo="/login"><CalculusMainDashboard /></ProtectedRoute>} />

          {/* Calculus: Functions */}
          <Route path="calculus/functions" element={<ProtectedRoute redirectTo="/login"><FunctionsDashboard /></ProtectedRoute>} />
          <Route path="calculus/functions/introduction" element={<ProtectedRoute redirectTo="/login"><FunctionsIntro5W1H /></ProtectedRoute>} />
          <Route path="calculus/functions/terminology" element={<ProtectedRoute redirectTo="/login"><FunctionsTerminology /></ProtectedRoute>} />
          <Route path="calculus/functions/skills" element={<ProtectedRoute redirectTo="/login"><FunctionsSkills /></ProtectedRoute>} />

          {/* Calculus: Limits */}
          <Route path="calculus/limits" element={<ProtectedRoute redirectTo="/login"><LimitsDashboard /></ProtectedRoute>} />
          <Route path="calculus/limits/introduction" element={<ProtectedRoute redirectTo="/login"><LimitsIntro5W1H /></ProtectedRoute>} />
          <Route path="calculus/limits/terminology" element={<ProtectedRoute redirectTo="/login"><LimitsTerminology /></ProtectedRoute>} />
          <Route path="calculus/limits/skills" element={<ProtectedRoute redirectTo="/login"><LimitsSkills /></ProtectedRoute>} />

          {/* Calculus: Differentiation */}
          <Route path="calculus/differentiation" element={<ProtectedRoute redirectTo="/login"><DiffDashboard /></ProtectedRoute>} />
          <Route path="calculus/differentiation/introduction" element={<ProtectedRoute redirectTo="/login"><DiffIntro5W1H /></ProtectedRoute>} />
          <Route path="calculus/differentiation/terminology" element={<ProtectedRoute redirectTo="/login"><DiffTerminology /></ProtectedRoute>} />
          <Route path="calculus/differentiation/skills" element={<ProtectedRoute redirectTo="/login"><DiffSkills /></ProtectedRoute>} />

          {/* Calculus: Integration */}
          <Route path="calculus/integration" element={<ProtectedRoute redirectTo="/login"><IntDashboard /></ProtectedRoute>} />
          <Route path="calculus/integration/introduction" element={<ProtectedRoute redirectTo="/login"><IntIntro5W1H /></ProtectedRoute>} />
          <Route path="calculus/integration/terminology" element={<ProtectedRoute redirectTo="/login"><IntTerminology /></ProtectedRoute>} />
          <Route path="calculus/integration/skills" element={<ProtectedRoute redirectTo="/login"><IntSkills /></ProtectedRoute>} />
          {/* The Fish Tale Topic Pages */}
          <Route path="the-fish-tale" element={<ProtectedRoute redirectTo="/login"><TheFishTaleLanding /></ProtectedRoute>} />
          <Route path="the-fish-tale/introduction" element={<ProtectedRoute redirectTo="/login"><FishTaleIntro5W1H /></ProtectedRoute>} />
          <Route path="the-fish-tale/terminology" element={<ProtectedRoute redirectTo="/login"><FishTaleTerminology /></ProtectedRoute>} />
          <Route path="the-fish-tale/skills" element={<ProtectedRoute redirectTo="/login"><FishTaleSkills /></ProtectedRoute>} />

          {/* Chapter 2: Shapes and Angles */}
          <Route path="shapes-and-angles" element={<ProtectedRoute redirectTo="/login"><ShapesAndAnglesLanding /></ProtectedRoute>} />
          <Route path="shapes-and-angles/introduction" element={<ProtectedRoute redirectTo="/login"><ShapesAndAnglesIntro /></ProtectedRoute>} />
          <Route path="shapes-and-angles/terminology" element={<ProtectedRoute redirectTo="/login"><ShapesAndAnglesTerminology /></ProtectedRoute>} />
          <Route path="shapes-and-angles/skills" element={<ProtectedRoute redirectTo="/login"><ShapesAndAnglesSkills /></ProtectedRoute>} />
          <Route path="middle/grade/5/shapes-angles/chapter-test" element={<ProtectedRoute redirectTo="/login"><ShapesAndAnglesTest /></ProtectedRoute>} />

          {/* Chapter 4: Parts and Wholes */}
          <Route path="/middle/grade/5/parts-and-wholes" element={<ProtectedRoute redirectTo="/login"><PartsAndWholesLanding /></ProtectedRoute>} />
          <Route path="/middle/grade/5/parts-and-wholes/introduction" element={<ProtectedRoute redirectTo="/login"><PartsAndWholesIntro /></ProtectedRoute>} />
          <Route path="/middle/grade/5/parts-and-wholes/terminology" element={<ProtectedRoute redirectTo="/login"><PartsAndWholesTerminology /></ProtectedRoute>} />
          <Route path="/middle/grade/5/parts-and-wholes/skills" element={<ProtectedRoute redirectTo="/login"><PartsAndWholesSkills /></ProtectedRoute>} />
          <Route path="/middle/grade/5/parts-and-wholes/chapter-test" element={<ProtectedRoute redirectTo="/login"><PartsAndWholesTest /></ProtectedRoute>} />

          {/* Surface Areas and Volumes Routes */}
          <Route path="surface-areas-and-volumes" element={<ProtectedRoute redirectTo="/login"><SurfaceAreasAndVolumes /></ProtectedRoute>} />
          <Route path="surface-areas-and-volumes/introduction" element={<ProtectedRoute redirectTo="/login"><SurfaceVolumesIntro /></ProtectedRoute>} />
          <Route path="surface-areas-and-volumes/terminology" element={<ProtectedRoute redirectTo="/login"><SurfaceVolumesTerminology /></ProtectedRoute>} />
          <Route path="surface-areas-and-volumes/skills" element={<ProtectedRoute redirectTo="/login"><SurfaceVolumesSkills /></ProtectedRoute>} />

          {/* Fallback for spaces in URL */}
          <Route path="surface areas and volumes" element={<ProtectedRoute redirectTo="/login"><SurfaceAreasAndVolumes /></ProtectedRoute>} />
          <Route path="surface areas and volumes/introduction" element={<ProtectedRoute redirectTo="/login"><SurfaceVolumesIntro /></ProtectedRoute>} />
          <Route path="surface areas and volumes/terminology" element={<ProtectedRoute redirectTo="/login"><SurfaceVolumesTerminology /></ProtectedRoute>} />
          <Route path="surface areas and volumes/skills" element={<ProtectedRoute redirectTo="/login"><SurfaceVolumesSkills /></ProtectedRoute>} />

          {/* Introduction to Trigonometry Routes */}
          <Route path="introduction-to-trigonometry" element={<ProtectedRoute redirectTo="/login"><IntroductionToTrignometry /></ProtectedRoute>} />
          <Route path="introduction-to-trigonometry/introduction" element={<ProtectedRoute redirectTo="/login"><TrignometryIntro5W1H /></ProtectedRoute>} />
          <Route path="introduction-to-trigonometry/terminology" element={<ProtectedRoute redirectTo="/login"><TrignometryTerminology /></ProtectedRoute>} />
          <Route path="introduction-to-trigonometry/skills" element={<ProtectedRoute redirectTo="/login"><TrignometrySkills /></ProtectedRoute>} />

          <Route path="ticking-clocks" element={<ProtectedRoute redirectTo="/login"><TickingClocks /></ProtectedRoute>} />
          <Route path="ticking-clocks/introduction" element={<ProtectedRoute redirectTo="/login"><TickingClocksIntro5W1H /></ProtectedRoute>} />
          <Route path="ticking-clocks/terminology" element={<ProtectedRoute redirectTo="/login"><TickingClocksTerminology /></ProtectedRoute>} />
          <Route path="ticking-clocks/skills" element={<ProtectedRoute redirectTo="/login"><TickingClocksSkills /></ProtectedRoute>} />
          <Route path="the-transport-museum" element={<ProtectedRoute redirectTo="/login"><TheTransportMuseum /></ProtectedRoute>} />
          <Route path="the-transport-museum/introduction" element={<ProtectedRoute redirectTo="/login"><MuseumIntro5W1H /></ProtectedRoute>} />
          <Route path="the-transport-museum/terminology" element={<ProtectedRoute redirectTo="/login"><MuseumTerminology /></ProtectedRoute>} />
          <Route path="the-transport-museum/skills" element={<ProtectedRoute redirectTo="/login"><MuseumSkills /></ProtectedRoute>} />
          <Route path="measuring-length" element={<ProtectedRoute redirectTo="/login"><MeasuringLengthDashboard /></ProtectedRoute>} />
          <Route path="measuring-length/introduction" element={<ProtectedRoute redirectTo="/login"><MeasuringLengthIntro /></ProtectedRoute>} />
          <Route path="measuring-length/terminology" element={<ProtectedRoute redirectTo="/login"><MeasuringLengthTerms /></ProtectedRoute>} />
          <Route path="measuring-length/skills" element={<ProtectedRoute redirectTo="/login"><MeasuringLengthSkills /></ProtectedRoute>} />
          <Route path="junior/grade/4/data-handling" element={<ProtectedRoute redirectTo="/login"><DataHandlingClass4 /></ProtectedRoute>} />
          <Route path="junior/grade/4/data-handling/introduction" element={<ProtectedRoute redirectTo="/login"><DataHandlingIntro5W1HClass4 /></ProtectedRoute>} />
          <Route path="junior/grade/4/data-handling/terminology" element={<ProtectedRoute redirectTo="/login"><DataHandlingTerminologyClass4 /></ProtectedRoute>} />
          <Route path="junior/grade/4/data-handling/skills" element={<ProtectedRoute redirectTo="/login"><DataHandlingSkillsClass4 /></ProtectedRoute>} />
          {/* Grade 4: Thousands Around Us Chapter Pages */}
          <Route path="junior/grade/4/thousands-around-us" element={<ProtectedRoute redirectTo="/login"><ThousandsAroundUs /></ProtectedRoute>} />
          <Route path="junior/grade/4/thousands-around-us/introduction" element={<ProtectedRoute redirectTo="/login"><ThousandsAroundUsIntro /></ProtectedRoute>} />
          <Route path="junior/grade/4/thousands-around-us/terminology" element={<ProtectedRoute redirectTo="/login"><ThousandsAroundUsTerminology /></ProtectedRoute>} />
          <Route path="junior/grade/4/thousands-around-us/skills" element={<ProtectedRoute redirectTo="/login"><ThousandsAroundUsSkills /></ProtectedRoute>} />
          {/* Grade 4: Patterns Around Us Chapter Pages */}
          <Route path="junior/grade/4/patterns-around-us" element={<ProtectedRoute redirectTo="/login"><PatternsAroundUs /></ProtectedRoute>} />
          <Route path="junior/grade/4/patterns-around-us/introduction" element={<ProtectedRoute redirectTo="/login"><PatternsIntro5W1H /></ProtectedRoute>} />
          <Route path="junior/grade/4/patterns-around-us/terminology" element={<ProtectedRoute redirectTo="/login"><PatternsTerminology /></ProtectedRoute>} />
          <Route path="junior/grade/4/patterns-around-us/skills" element={<ProtectedRoute redirectTo="/login"><PatternsSkills /></ProtectedRoute>} />
          {/* Grade 4: Shapes Around Us Chapter Pages */}
          <Route path="junior/grade/4/shapes-around-us" element={<ProtectedRoute redirectTo="/login"><ShapesAroundUs /></ProtectedRoute>} />
          <Route path="junior/grade/4/shapes-around-us/introduction" element={<ProtectedRoute redirectTo="/login"><ShapesAroundUsIntro /></ProtectedRoute>} />
          <Route path="junior/grade/4/shapes-around-us/terminology" element={<ProtectedRoute redirectTo="/login"><ShapesAroundUsTerminology /></ProtectedRoute>} />
          <Route path="junior/grade/4/shapes-around-us/skills" element={<ProtectedRoute redirectTo="/login"><ShapesAroundUsSkills /></ProtectedRoute>} />
          {/* Grade 4: Hide and Seek Chapter Pages */}
          <Route path="junior/grade/4/hide-and-seek" element={<ProtectedRoute redirectTo="/login"><HideAndSeek /></ProtectedRoute>} />
          <Route path="junior/grade/4/hide-and-seek/introduction" element={<ProtectedRoute redirectTo="/login"><HideAndSeekIntro5W1H /></ProtectedRoute>} />
          <Route path="junior/grade/4/hide-and-seek/terminology" element={<ProtectedRoute redirectTo="/login"><HideAndSeekTerminology /></ProtectedRoute>} />
          <Route path="junior/grade/4/hide-and-seek/skills" element={<ProtectedRoute redirectTo="/login"><HideAndSeekSkills /></ProtectedRoute>} />

          {/* Grade 4: Sharing and Measuring Chapter Pages */}
          <Route path="junior/grade/4/sharing-and-measuring" element={<ProtectedRoute redirectTo="/login"><SharingAndMeasuring /></ProtectedRoute>} />
          <Route path="junior/grade/4/sharing-and-measuring/introduction" element={<ProtectedRoute redirectTo="/login"><SharingAndMeasuringIntro /></ProtectedRoute>} />
          <Route path="junior/grade/4/sharing-and-measuring/terminology" element={<ProtectedRoute redirectTo="/login"><SharingAndMeasuringTerminology /></ProtectedRoute>} />
          <Route path="junior/grade/4/sharing-and-measuring/skills" element={<ProtectedRoute redirectTo="/login"><SharingAndMeasuringSkills /></ProtectedRoute>} />

          {/* Grade 8: Linear Equations Chapter Pages */}
          <Route path="senior/grade/8/linear-equations" element={<ProtectedRoute redirectTo="/login"><LinearEquations /></ProtectedRoute>} />
          <Route path="senior/grade/8/linear-equations/introduction" element={<ProtectedRoute redirectTo="/login"><LinearEquationsIntro5W1H /></ProtectedRoute>} />
          <Route path="senior/grade/8/linear-equations/terminology" element={<ProtectedRoute redirectTo="/login"><LinearEquationsTerminology /></ProtectedRoute>} />
          <Route path="senior/grade/8/linear-equations/skills" element={<ProtectedRoute redirectTo="/login"><LinearEquationsSkills /></ProtectedRoute>} />

          {/* Grade 8: Introduction to Graphs Chapter Pages */}
          <Route path="senior/grade/8/introduction-to-graphs" element={<ProtectedRoute redirectTo="/login"><IntroductionToGraphs /></ProtectedRoute>} />
          <Route path="senior/grade/8/introduction-to-graphs/introduction" element={<ProtectedRoute redirectTo="/login"><GraphsIntro5W1H /></ProtectedRoute>} />
          <Route path="senior/grade/8/introduction-to-graphs/terminology" element={<ProtectedRoute redirectTo="/login"><GraphsTerminology /></ProtectedRoute>} />
          <Route path="senior/grade/8/introduction-to-graphs/skills" element={<ProtectedRoute redirectTo="/login"><GraphsSkills /></ProtectedRoute>} />
          {/* Grade 8: Direct and Inverse Proportions Chapter Pages */}
          <Route path="senior/grade/8/direct-and-inverse-proportions" element={<ProtectedRoute redirectTo="/login"><DirectAndInverseProportions /></ProtectedRoute>} />
          <Route path="senior/grade/8/direct-and-inverse-proportions/introduction" element={<ProtectedRoute redirectTo="/login"><ProportionsIntro5W1H /></ProtectedRoute>} />
          <Route path="senior/grade/8/direct-and-inverse-proportions/terminology" element={<ProtectedRoute redirectTo="/login"><ProportionsTerminology /></ProtectedRoute>} />
          <Route path="senior/grade/8/direct-and-inverse-proportions/skills" element={<ProtectedRoute redirectTo="/login"><ProportionsSkills /></ProtectedRoute>} />

          {/* Grade 8: Data Handling Chapter Pages */}
          <Route path="senior/grade/8/data-handling" element={<ProtectedRoute redirectTo="/login"><Grade8DataHandling /></ProtectedRoute>} />
          <Route path="senior/grade/8/data-handling/introduction" element={<ProtectedRoute redirectTo="/login"><Grade8DataHandlingIntro5W1H /></ProtectedRoute>} />
          <Route path="senior/grade/8/data-handling/terminology" element={<ProtectedRoute redirectTo="/login"><Grade8DataHandlingTerminology /></ProtectedRoute>} />
          <Route path="senior/grade/8/data-handling/skills" element={<ProtectedRoute redirectTo="/login"><Grade8DataHandlingSkills /></ProtectedRoute>} />

          {/* Grade 8: Comparing Quantities Chapter Pages */}
          <Route path="senior/grade/8/comparing-quantities" element={<ProtectedRoute redirectTo="/login"><ComparingQuantities /></ProtectedRoute>} />
          <Route path="senior/grade/8/comparing-quantities/introduction" element={<ProtectedRoute redirectTo="/login"><ComparingQuantitiesIntro5W1H /></ProtectedRoute>} />
          <Route path="senior/grade/8/comparing-quantities/terminology" element={<ProtectedRoute redirectTo="/login"><ComparingQuantitiesTerminology /></ProtectedRoute>} />
          <Route path="senior/grade/8/comparing-quantities/skills" element={<ProtectedRoute redirectTo="/login"><ComparingQuantitiesSkills /></ProtectedRoute>} />

          {/* Class 12: Matrices — unified structure (inside MainLayout for navbar/footer) */}
          <Route path="senior/grade/12/matrices" element={<ProtectedRoute redirectTo="/login"><MatricesHub /></ProtectedRoute>} />
          <Route path="senior/grade/12/matrices/introduction" element={<ProtectedRoute redirectTo="/login"><MatricesIntro5W1H /></ProtectedRoute>} />
          <Route path="senior/grade/12/matrices/terminology" element={<ProtectedRoute redirectTo="/login"><MatricesTerminology /></ProtectedRoute>} />
          <Route path="senior/grade/12/matrices/skills" element={<ProtectedRoute redirectTo="/login"><MatricesSkills /></ProtectedRoute>} />
          <Route path="senior/grade/12/matrices/connectomics" element={<ProtectedRoute redirectTo="/login"><MatricesConnectomics /></ProtectedRoute>} />
          <Route path="senior/grade/12/matrices/exam-edge" element={<ProtectedRoute redirectTo="/login"><MatricesExamEdge /></ProtectedRoute>} />

          {/* Class 12: Matrices  canonical deep-dive routes */}
          <Route path="senior/grade/12/matrices/deep-dive/who-uses" element={<ProtectedRoute redirectTo="/login"><WhoUsesMatrices /></ProtectedRoute>} />
          <Route path="senior/grade/12/matrices/deep-dive/what-is" element={<ProtectedRoute redirectTo="/login"><WhatIsMatrix /></ProtectedRoute>} />
          <Route path="senior/grade/12/matrices/deep-dive/when-need" element={<ProtectedRoute redirectTo="/login"><WhenDoWeNeedMatrices /></ProtectedRoute>} />
          <Route path="senior/grade/12/matrices/deep-dive/how-operations" element={<ProtectedRoute redirectTo="/login"><HowOperationsWork /></ProtectedRoute>} />
          <Route path="senior/grade/12/matrices/deep-dive/why-rules" element={<ProtectedRoute redirectTo="/login"><WhyRulesWork /></ProtectedRoute>} />
          <Route path="senior/grade/12/matrices/deep-dive/where-applied" element={<ProtectedRoute redirectTo="/login"><WhereApplied /></ProtectedRoute>} />
          <Route path="senior/grade/12/matrices/deep-dive/invertible" element={<ProtectedRoute redirectTo="/login"><InvertibleMatrices /></ProtectedRoute>} />
          <Route path="senior/grade/12/matrices/deep-dive/test/matrix-order" element={<ProtectedRoute redirectTo="/login"><MatrixOrderTest /></ProtectedRoute>} />
          <Route path="senior/grade/12/matrices/deep-dive/test/matrix-types" element={<ProtectedRoute redirectTo="/login"><MatrixTypesTest /></ProtectedRoute>} />
          <Route path="senior/grade/12/matrices/deep-dive/test/matrix-equality" element={<ProtectedRoute redirectTo="/login"><MatrixEqualityTest /></ProtectedRoute>} />
          <Route path="senior/grade/12/matrices/deep-dive/test/matrix-operations" element={<ProtectedRoute redirectTo="/login"><MatrixOperationsTest /></ProtectedRoute>} />
          <Route path="senior/grade/12/matrices/deep-dive/test/matrix-transpose" element={<ProtectedRoute redirectTo="/login"><MatrixTransposeTest /></ProtectedRoute>} />
          <Route path="senior/grade/12/matrices/deep-dive/test/invertible-matrices" element={<ProtectedRoute redirectTo="/login"><InvertibleMatricesTest /></ProtectedRoute>} />
          <Route path="senior/grade/12/matrices/deep-dive/test" element={<ProtectedRoute redirectTo="/login"><MatricesChapterTest /></ProtectedRoute>} />

          {/* Class 10: Probability */}
          <Route path="senior/grade/10/probability" element={<ProtectedRoute redirectTo="/login"><Probability /></ProtectedRoute>} />
          <Route path="senior/grade/10/probability/introduction" element={<ProtectedRoute redirectTo="/login"><ProbabilityIntro5W1H /></ProtectedRoute>} />
          <Route path="senior/grade/10/probability/terminology" element={<ProtectedRoute redirectTo="/login"><ProbabilityTerminology /></ProtectedRoute>} />
          <Route path="senior/grade/10/probability/skills" element={<ProtectedRoute redirectTo="/login"><ProbabilitySkills /></ProtectedRoute>} />
          <Route path="senior/grade/10/probability/deep-dive/test/easy" element={<ProtectedRoute redirectTo="/login"><ProbabilityEasyTest /></ProtectedRoute>} />

          {/* Class 10: Real Numbers */}
          <Route path="senior/grade/10/real-numbers" element={<ProtectedRoute redirectTo="/login"><RealNumbersDashboard /></ProtectedRoute>} />
          <Route path="senior/grade/10/real-numbers/introduction" element={<ProtectedRoute redirectTo="/login"><RealNumbersIntro /></ProtectedRoute>} />
          <Route path="senior/grade/10/real-numbers/terminology" element={<ProtectedRoute redirectTo="/login"><RealNumbersTerminology /></ProtectedRoute>} />
          <Route path="senior/grade/10/real-numbers/skills" element={<ProtectedRoute redirectTo="/login"><RealNumbersSkills /></ProtectedRoute>} />
          <Route path="senior/grade/10/real-numbers/connectomics" element={<ProtectedRoute redirectTo="/login"><RealNumbersConnectomics /></ProtectedRoute>} />
          <Route path="senior/grade/10/real-numbers/exam-edge" element={<ProtectedRoute redirectTo="/login"><RealNumbersExamEdge /></ProtectedRoute>} />

          <Route path="senior/grade/10/triangles" element={<ProtectedRoute redirectTo="/login"><TrianglesDashboard /></ProtectedRoute>} />
          <Route path="senior/grade/10/triangles/introduction" element={<ProtectedRoute redirectTo="/login"><TrianglesIntro /></ProtectedRoute>} />
          <Route path="senior/grade/10/triangles/terminology" element={<ProtectedRoute redirectTo="/login"><TrianglesTerminology /></ProtectedRoute>} />
          <Route path="senior/grade/10/triangles/skills" element={<ProtectedRoute redirectTo="/login"><TrianglesSkills /></ProtectedRoute>} />
          <Route path="senior/grade/10/triangles/connectomics" element={<ProtectedRoute redirectTo="/login"><TrianglesConnectomics /></ProtectedRoute>} />

          {/* Class 10: Circles */}
          <Route path="senior/grade/10/circles" element={<ProtectedRoute redirectTo="/login"><CirclesDashboard /></ProtectedRoute>} />
          <Route path="senior/grade/10/circles/introduction" element={<ProtectedRoute redirectTo="/login"><CirclesIntro /></ProtectedRoute>} />
          <Route path="senior/grade/10/circles/terminology" element={<ProtectedRoute redirectTo="/login"><CirclesTerminology /></ProtectedRoute>} />
          <Route path="senior/grade/10/circles/skills" element={<ProtectedRoute redirectTo="/login"><CirclesSkills /></ProtectedRoute>} />
          <Route path="senior/grade/10/circles/connectomics" element={<ProtectedRoute redirectTo="/login"><CirclesConnectomics /></ProtectedRoute>} />

          {/* Class 10: Areas Related to Circles */}
          <Route path="senior/grade/10/areas-related-to-circles" element={<ProtectedRoute redirectTo="/login"><AreasRelatedToCirclesDashboard /></ProtectedRoute>} />
          <Route path="senior/grade/10/areas-related-to-circles/introduction" element={<ProtectedRoute redirectTo="/login"><AreasRelatedToCirclesIntro /></ProtectedRoute>} />
          <Route path="senior/grade/10/areas-related-to-circles/terminology" element={<ProtectedRoute redirectTo="/login"><AreasRelatedToCirclesTerminology /></ProtectedRoute>} />
          <Route path="senior/grade/10/areas-related-to-circles/skills" element={<ProtectedRoute redirectTo="/login"><AreasRelatedToCirclesSkills /></ProtectedRoute>} />
          <Route path="senior/grade/10/areas-related-to-circles/connectomics" element={<ProtectedRoute redirectTo="/login"><AreasRelatedToCirclesConnectomics /></ProtectedRoute>} />

          {/* Class 10: Coordinate Geometry */}
          <Route path="senior/grade/10/coordinate-geometry" element={<ProtectedRoute redirectTo="/login"><CoordinateGeometryDashboard /></ProtectedRoute>} />
          <Route path="senior/grade/10/coordinate-geometry/introduction" element={<ProtectedRoute redirectTo="/login"><CoordinateGeometryIntro /></ProtectedRoute>} />
          <Route path="senior/grade/10/coordinate-geometry/terminology" element={<ProtectedRoute redirectTo="/login"><CoordinateGeometryTerminology /></ProtectedRoute>} />
          <Route path="senior/grade/10/coordinate-geometry/skills" element={<ProtectedRoute redirectTo="/login"><CoordinateGeometrySkills /></ProtectedRoute>} />
          <Route path="senior/grade/10/coordinate-geometry/connectomics" element={<ProtectedRoute redirectTo="/login"><CoordinateGeometryConnectomics /></ProtectedRoute>} />

          <Route path="senior/grade/10/probability/deep-dive/test/medium" element={<ProtectedRoute redirectTo="/login"><ProbabilityMediumTest /></ProtectedRoute>} />
          <Route path="senior/grade/10/probability/deep-dive/test/hard" element={<ProtectedRoute redirectTo="/login"><ProbabilityHardTest /></ProtectedRoute>} />

          {/* Class 12: Determinants */}
          <Route path="senior/grade/12/determinants" element={<ProtectedRoute redirectTo="/login"><DeterminantsHub /></ProtectedRoute>} />
          <Route path="senior/grade/12/determinants/introduction" element={<ProtectedRoute redirectTo="/login"><DeterminantsIntro5W1H /></ProtectedRoute>} />
          <Route path="senior/grade/12/determinants/terminology" element={<ProtectedRoute redirectTo="/login"><DeterminantsTerminology /></ProtectedRoute>} />
          <Route path="senior/grade/12/determinants/skills" element={<ProtectedRoute redirectTo="/login"><DeterminantsSkills /></ProtectedRoute>} />
          <Route path="senior/grade/12/determinants/connectomics" element={<ProtectedRoute redirectTo="/login"><DeterminantsConnectomics /></ProtectedRoute>} />
          <Route path="senior/grade/12/determinants/exam-edge" element={<ProtectedRoute redirectTo="/login"><DeterminantsExamEdge /></ProtectedRoute>} />
          <Route path="senior/grade/12/determinants/deep-dive/test/easy" element={<ProtectedRoute redirectTo="/login"><DeterminantsEasyTest /></ProtectedRoute>} />
          <Route path="senior/grade/12/determinants/deep-dive/test/medium" element={<ProtectedRoute redirectTo="/login"><DeterminantsMediumTest /></ProtectedRoute>} />
          <Route path="senior/grade/12/determinants/deep-dive/test/hard" element={<ProtectedRoute redirectTo="/login"><DeterminantsHardTest /></ProtectedRoute>} />

          {/* Class 12: Relations */}
          <Route path="senior/grade/12/relations" element={<ProtectedRoute redirectTo="/login"><RelationsHub /></ProtectedRoute>} />
          <Route path="senior/grade/12/relations/introduction" element={<ProtectedRoute redirectTo="/login"><RelationsIntro5W1H /></ProtectedRoute>} />
          <Route path="senior/grade/12/relations/terminology" element={<ProtectedRoute redirectTo="/login"><RelationsTerminology /></ProtectedRoute>} />
          <Route path="senior/grade/12/relations/skills" element={<ProtectedRoute redirectTo="/login"><RelationsSkills /></ProtectedRoute>} />
          <Route path="senior/grade/12/relations/connectomics" element={<ProtectedRoute redirectTo="/login"><RelationsConnectomics /></ProtectedRoute>} />
          <Route path="senior/grade/12/relations/exam-edge" element={<ProtectedRoute redirectTo="/login"><RelationsExamEdge /></ProtectedRoute>} />

          {/* Class 7: Integers */}
          <Route path="middle/grade/7/integers" element={<ProtectedRoute redirectTo="/login"><IntegersHub /></ProtectedRoute>} />
          <Route path="middle/grade/7/integers/introduction" element={<ProtectedRoute redirectTo="/login"><IntegersIntro5W1H /></ProtectedRoute>} />
          <Route path="middle/grade/7/integers/terminology" element={<ProtectedRoute redirectTo="/login"><IntegersTerminology /></ProtectedRoute>} />
          <Route path="middle/grade/7/integers/skills" element={<ProtectedRoute redirectTo="/login"><IntegersSkills /></ProtectedRoute>} />
          <Route path="middle/grade/7/integers/deep-dive/test/easy" element={<ProtectedRoute redirectTo="/login"><IntegersEasyTest /></ProtectedRoute>} />
          <Route path="middle/grade/7/integers/deep-dive/test/medium" element={<ProtectedRoute redirectTo="/login"><IntegersMediumTest /></ProtectedRoute>} />
          <Route path="middle/grade/7/integers/deep-dive/test/hard" element={<ProtectedRoute redirectTo="/login"><IntegersHardTest /></ProtectedRoute>} />

          {/* Class 7: Fractions and Decimals */}
          <Route path="middle/grade/7/fractions-and-decimals" element={<ProtectedRoute redirectTo="/login"><FractionsAndDecimalsHub /></ProtectedRoute>} />
          <Route path="middle/grade/7/fractions-and-decimals/introduction" element={<ProtectedRoute redirectTo="/login"><FractionsAndDecimalsIntro5W1H /></ProtectedRoute>} />
          <Route path="middle/grade/7/fractions-and-decimals/terminology" element={<ProtectedRoute redirectTo="/login"><FractionsAndDecimalsTerminology /></ProtectedRoute>} />
          <Route path="middle/grade/7/fractions-and-decimals/skills" element={<ProtectedRoute redirectTo="/login"><FractionsAndDecimalsSkills /></ProtectedRoute>} />
          <Route path="middle/grade/7/fractions-and-decimals/deep-dive/test/easy" element={<ProtectedRoute redirectTo="/login"><FractionsAndDecimalsEasyTest /></ProtectedRoute>} />
          <Route path="middle/grade/7/fractions-and-decimals/deep-dive/test/medium" element={<ProtectedRoute redirectTo="/login"><FractionsAndDecimalsMediumTest /></ProtectedRoute>} />
          <Route path="middle/grade/7/fractions-and-decimals/deep-dive/test/hard" element={<ProtectedRoute redirectTo="/login"><FractionsAndDecimalsHardTest /></ProtectedRoute>} />
          <Route path="middle/grade/7/data-handling" element={<ProtectedRoute redirectTo="/login"><DataHandlingHub /></ProtectedRoute>} />
          <Route path="middle/grade/7/data-handling/introduction" element={<ProtectedRoute redirectTo="/login"><DataHandlingIntro5W1H /></ProtectedRoute>} />
          <Route path="middle/grade/7/data-handling/terminology" element={<ProtectedRoute redirectTo="/login"><DataHandlingTerminology /></ProtectedRoute>} />
          <Route path="middle/grade/7/data-handling/skills" element={<ProtectedRoute redirectTo="/login"><DataHandlingSkills /></ProtectedRoute>} />
          <Route path="middle/grade/7/data-handling/deep-dive/test/easy" element={<ProtectedRoute redirectTo="/login"><DataHandlingEasyTest /></ProtectedRoute>} />
          <Route path="middle/grade/7/data-handling/deep-dive/test/medium" element={<ProtectedRoute redirectTo="/login"><DataHandlingMediumTest /></ProtectedRoute>} />
          <Route path="middle/grade/7/data-handling/deep-dive/test/hard" element={<ProtectedRoute redirectTo="/login"><DataHandlingHardTest /></ProtectedRoute>} />

          {/* Class 9: Number System Routes */}
          <Route path="senior/grade/9/number-system" element={<ProtectedRoute redirectTo="/login"><NumberSystem /></ProtectedRoute>} />
          <Route path="senior/grade/9/number-system/introduction" element={<ProtectedRoute redirectTo="/login"><NumberSystemIntro5W1H /></ProtectedRoute>} />
          <Route path="senior/grade/9/number-system/terminology" element={<ProtectedRoute redirectTo="/login"><NumberSystemTerminology /></ProtectedRoute>} />
          <Route path="senior/grade/9/number-system/skills" element={<ProtectedRoute redirectTo="/login"><NumberSystemSkills /></ProtectedRoute>} />

          {/* Class 9: Polynomials Routes */}
          <Route path="senior/grade/9/polynomials" element={<ProtectedRoute redirectTo="/login"><PolynomialsGrade9 /></ProtectedRoute>} />
          <Route path="senior/grade/9/polynomials/introduction" element={<ProtectedRoute redirectTo="/login"><PolynomialsGrade9Intro /></ProtectedRoute>} />
          <Route path="senior/grade/9/polynomials/terminology" element={<ProtectedRoute redirectTo="/login"><PolynomialsGrade9Terminology /></ProtectedRoute>} />
          <Route path="senior/grade/9/polynomials/skills" element={<ProtectedRoute redirectTo="/login"><PolynomialsGrade9Skills /></ProtectedRoute>} />

          {/* Class 9: Coordinate Geometry Routes */}
          <Route path="practice/class-9/coordinate-geometry" element={<ProtectedRoute redirectTo="/login"><CoordinateGeometry9 /></ProtectedRoute>} />
          <Route path="practice/class-9/coordinate-geometry/intro" element={<ProtectedRoute redirectTo="/login"><CoordinateGeometry9Intro /></ProtectedRoute>} />
          <Route path="practice/class-9/coordinate-geometry/terminology" element={<ProtectedRoute redirectTo="/login"><CoordinateGeometry9Terminology /></ProtectedRoute>} />
          <Route path="practice/class-9/coordinate-geometry/skills" element={<ProtectedRoute redirectTo="/login"><CoordinateGeometry9Skills /></ProtectedRoute>} />

          {/* Legacy Classification/Direct Routes */}
          <Route path="practice/class-9/number-system" element={<ProtectedRoute redirectTo="/login"><NumberSystem /></ProtectedRoute>} />
          <Route path="practice/class-9/real-number-classification" element={<ProtectedRoute redirectTo="/login"><RealNumberClassification /></ProtectedRoute>} />
          <Route path="practice/class-9/decimal-expansion" element={<ProtectedRoute redirectTo="/login"><DecimalExpansion /></ProtectedRoute>} />
          <Route path="practice/class-9/operations-on-surds" element={<ProtectedRoute redirectTo="/login"><OperationsOnSurds /></ProtectedRoute>} />
          <Route path="practice/class-9/rationalisation" element={<ProtectedRoute redirectTo="/login"><Rationalisation /></ProtectedRoute>} />
          <Route path="practice/class-9/laws-of-exponents" element={<ProtectedRoute redirectTo="/login"><LawsOfExponents /></ProtectedRoute>} />
          <Route path="practice/class-9/chapter-test" element={<ProtectedRoute redirectTo="/login"><NumberSystemTest /></ProtectedRoute>} />


          {/* Grade 6 Patterns in Mathematics Module */}
          <Route path="middle/grade/6/patterns-in-mathematics" element={<Grade6PatternsInMathematics />} />
          <Route path="middle/grade/6/patterns-in-mathematics/introduction" element={<Grade6PatternsIntro5W1H />} />
          <Route path="middle/grade/6/patterns-in-mathematics/terminology" element={<Grade6PatternsTerminology />} />
          <Route path="middle/grade/6/patterns-in-mathematics/skills" element={<Grade6PatternsSkills />} />

        </Route>
        <Route path="/rapid-math" element={<RapidMathPage />} />
        <Route path="/internship" element={<Internship />} />
        <Route path="/neet" element={<NeetMockTest />} />

        {/* Junior Routes (Grades 1-4 child-friendly design) */}
        
        {/* Grade 3 EVS Routes */}
        <Route path="/junior/grade/3/science/our-families-and-communities" element={
          <ProtectedRoute redirectTo="/login">
            <OurFamiliesDashboard />
          </ProtectedRoute>
        } />
        <Route path="/junior/grade/3/science/our-families-and-communities/introduction" element={
          <ProtectedRoute redirectTo="/login">
            <OurFamiliesIntro />
          </ProtectedRoute>
        } />
        <Route path="/junior/grade/3/science/our-families-and-communities/terminology" element={
          <ProtectedRoute redirectTo="/login">
            <OurFamiliesTerminology />
          </ProtectedRoute>
        } />
        <Route path="/junior/grade/3/science/our-families-and-communities/skills" element={
          <ProtectedRoute redirectTo="/login">
            <OurFamiliesSkills />
          </ProtectedRoute>
        } />
        <Route path="/junior/grade/3/science/our-families-and-communities/virtual-lab" element={
          <ProtectedRoute redirectTo="/login">
            <OurFamiliesVirtualLab />
          </ProtectedRoute>
        } />

        {/* Grade 4 EVS Routes */}
        <Route path="/junior/grade/4/science/our-community" element={
          <ProtectedRoute redirectTo="/login">
            <OurCommunityDashboard />
          </ProtectedRoute>
        } />
        <Route path="/junior/grade/4/science/our-community/introduction" element={
          <ProtectedRoute redirectTo="/login">
            <OurCommunityIntro />
          </ProtectedRoute>
        } />
        <Route path="/junior/grade/4/science/our-community/terminology" element={
          <ProtectedRoute redirectTo="/login">
            <OurCommunityTerminology />
          </ProtectedRoute>
        } />
        <Route path="/junior/grade/4/science/our-community/skills" element={
          <ProtectedRoute redirectTo="/login">
            <OurCommunitySkills />
          </ProtectedRoute>
        } />
        <Route path="/junior/grade/4/science/our-community/virtual-lab" element={
          <ProtectedRoute redirectTo="/login">
            <OurCommunityVirtualLab />
          </ProtectedRoute>
        } />

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
        <Route path="/junior/grade/:grade/raksha-bandhan/chapter-test" element={
          <ProtectedRoute redirectTo="/login">
            <RakshaBandhanTest />
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
        <Route path="/junior/grade/:grade/fair-share/chapter-test" element={
          <ProtectedRoute redirectTo="/login">
            <FairShareTest />
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
        <Route path="/junior/grade/:grade/fun-at-class-party/chapter-test" element={
          <ProtectedRoute redirectTo="/login">
            <FunAtClassPartyTest />
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
        <Route path="/junior/grade/:grade/house-of-hundreds-ii/chapter-test" element={
          <ProtectedRoute redirectTo="/login">
            <HouseOfHundredsIITest />
          </ProtectedRoute>
        } />

        {/* Time Goes On Routes */}
        <Route path="/junior/grade/:grade/time-goes-on/reading-calendar" element={<ProtectedRoute redirectTo="/login"><ReadingCalendar /></ProtectedRoute>} />
        <Route path="/junior/grade/:grade/time-goes-on/future-past-dates" element={<ProtectedRoute redirectTo="/login"><FuturePastDates /></ProtectedRoute>} />
        <Route path="/junior/grade/:grade/time-goes-on/constructing-calendar" element={<ProtectedRoute redirectTo="/login"><ConstructingCalendar /></ProtectedRoute>} />
        <Route path="/junior/grade/:grade/time-goes-on/months-days-year" element={<ProtectedRoute redirectTo="/login"><MonthsDaysYear /></ProtectedRoute>} />
        <Route path="/junior/grade/:grade/time-goes-on/comparing-calendars" element={<ProtectedRoute redirectTo="/login"><ComparingCalendars /></ProtectedRoute>} />
        <Route path="/junior/grade/:grade/time-goes-on/age-problems" element={<ProtectedRoute redirectTo="/login"><AgeProblems /></ProtectedRoute>} />
        <Route path="/junior/grade/:grade/time-goes-on/reading-dates" element={<ProtectedRoute redirectTo="/login"><ReadingDates /></ProtectedRoute>} />
        <Route path="/junior/grade/:grade/time-goes-on/age-duration" element={<ProtectedRoute redirectTo="/login"><AgeDuration /></ProtectedRoute>} />
        <Route path="/junior/grade/:grade/time-goes-on/clock-time" element={<ProtectedRoute redirectTo="/login"><ClockTime /></ProtectedRoute>} />
        <Route path="/junior/grade/:grade/time-goes-on/time-durations" element={<ProtectedRoute redirectTo="/login"><TimeDurations /></ProtectedRoute>} />
        <Route path="/junior/grade/:grade/time-goes-on/chapter-test" element={<ProtectedRoute redirectTo="/login"><TimeGoesOnTest /></ProtectedRoute>} />

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

        {/* Grade 5 - The Fish Tale */}
        <Route path="/middle/grade/5/the-fish-tale/large-numbers-real-life" element={<ProtectedRoute redirectTo="/login"><LargeNumbersRealLife /></ProtectedRoute>} />
        <Route path="/middle/grade/5/the-fish-tale/place-value-lakhs" element={<ProtectedRoute redirectTo="/login"><PlaceValueLakhs /></ProtectedRoute>} />
        <Route path="/middle/grade/5/the-fish-tale/reading-writing-big-numbers" element={<ProtectedRoute redirectTo="/login"><ReadingWritingBigNumbers /></ProtectedRoute>} />
        <Route path="/middle/grade/5/the-fish-tale/comparison-of-numbers" element={<ProtectedRoute redirectTo="/login"><ComparisonOfNumbers /></ProtectedRoute>} />
        <Route path="/middle/grade/5/the-fish-tale/estimation-and-rounding" element={<ProtectedRoute redirectTo="/login"><EstimationAndRounding /></ProtectedRoute>} />
        <Route path="/middle/grade/5/the-fish-tale/number-sense-place-value" element={<ProtectedRoute redirectTo="/login"><NumberSensePlaceValue /></ProtectedRoute>} />
        <Route path="/middle/grade/5/the-fish-tale/estimation-skills" element={<ProtectedRoute redirectTo="/login"><EstimationSkills /></ProtectedRoute>} />
        <Route path="/middle/grade/5/the-fish-tale/interpreting-real-life-data" element={<ProtectedRoute redirectTo="/login"><InterpretingRealLifeData /></ProtectedRoute>} />
        <Route path="/middle/grade/5/the-fish-tale/chapter-test" element={<ProtectedRoute redirectTo="/login"><TheFishTaleTest /></ProtectedRoute>} />

        {/* Grade 5 - How Many Squares? */}
        <Route path="/middle/grade/5/how-many-squares" element={<ProtectedRoute redirectTo="/login"><HowManySquares /></ProtectedRoute>} />
        <Route path="/middle/grade/5/how-many-squares/introduction" element={<ProtectedRoute redirectTo="/login"><HowManySquaresIntro5W1H /></ProtectedRoute>} />
        <Route path="/middle/grade/5/how-many-squares/terminology" element={<ProtectedRoute redirectTo="/login"><HowManySquaresTerminology /></ProtectedRoute>} />
        <Route path="middle/grade/5/how-many-squares/skills" element={<HowManySquaresSkills />} />

        {/* Does it Look the Same? Routes */}
        <Route path="/middle/grade/5/does-it-look-same" element={<ProtectedRoute redirectTo="/login"><DoesItLookSameLanding /></ProtectedRoute>} />
        <Route path="/middle/grade/5/does-it-look-same/introduction" element={<ProtectedRoute redirectTo="/login"><DoesItLookSameIntro /></ProtectedRoute>} />
        <Route path="/middle/grade/5/does-it-look-same/terminology" element={<ProtectedRoute redirectTo="/login"><DoesItLookSameTerminology /></ProtectedRoute>} />
        <Route path="/middle/grade/5/does-it-look-same/skills" element={<ProtectedRoute redirectTo="/login"><DoesItLookSameSkills /></ProtectedRoute>} />
        <Route path="/middle/grade/5/does-it-look-same/chapter-test" element={<ProtectedRoute redirectTo="/login"><DoesItLookSameTest /></ProtectedRoute>} />
        <Route path="/middle/grade/5/how-many-squares/chapter-test" element={<ProtectedRoute redirectTo="/login"><HowManySquaresTest /></ProtectedRoute>} />

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
        <Route path="/junior/grade/:grade/the cleanest village/chapter test" element={
          <ProtectedRoute redirectTo="/login">
            <ChapterTest />
          </ProtectedRoute>
        } />

        {/* Elephants, Tigers, and Leopards Routes */}
        <Route path="/junior/grade/:grade/elephants-tigers-and-leopards/nim-game-strategy" element={
          <ProtectedRoute redirectTo="/login">
            <JungleNimGame />
          </ProtectedRoute>
        } />
        <Route path="/junior/grade/:grade/elephants-tigers-and-leopards/number-grid-patterns" element={
          <ProtectedRoute redirectTo="/login">
            <AdditionChartPatterns />
          </ProtectedRoute>
        } />
        <Route path="/junior/grade/:grade/elephants-tigers-and-leopards/magic-mirror-numbers" element={
          <ProtectedRoute redirectTo="/login">
            <MagicMirrorAddition />
          </ProtectedRoute>
        } />
        <Route path="/junior/grade/:grade/elephants-tigers-and-leopards/forest-restoration-addition" element={
          <ProtectedRoute redirectTo="/login">
            <ForestRestorationAddition />
          </ProtectedRoute>
        } />
        <Route path="/junior/grade/:grade/elephants-tigers-and-leopards/journey-sums" element={
          <ProtectedRoute redirectTo="/login">
            <JungleGatheringAddition />
          </ProtectedRoute>
        } />
        <Route path="/junior/grade/:grade/elephants-tigers-and-leopards/estimation-before-addition" element={
          <ProtectedRoute redirectTo="/login">
            <EstimateFirstAddition />
          </ProtectedRoute>
        } />
        <Route path="/junior/grade/:grade/elephants-tigers-and-leopards/river-crossing-subtraction" element={
          <ProtectedRoute redirectTo="/login">
            <RiverCrossingSubtraction />
          </ProtectedRoute>
        } />
        <Route path="/junior/grade/:grade/elephants-tigers-and-leopards/hidden-path-difference" element={
          <ProtectedRoute redirectTo="/login">
            <HiddenPathDifference />
          </ProtectedRoute>
        } />
        <Route path="/junior/grade/:grade/elephants-tigers-and-leopards/estimation-before-subtraction" element={
          <ProtectedRoute redirectTo="/login">
            <EstimateFirstSubtraction />
          </ProtectedRoute>
        } />
        <Route path="/junior/grade/:grade/elephants-tigers-and-leopards/balance-scale-estimation" element={
          <ProtectedRoute redirectTo="/login">
            <BalanceScaleComparison />
          </ProtectedRoute>
        } />
        <Route path="/junior/grade/:grade/elephants-tigers-and-leopards/quick-compare" element={
          <ProtectedRoute redirectTo="/login">
            <QuickCompare />
          </ProtectedRoute>
        } />
        <Route path="/junior/grade/:grade/elephants-tigers-and-leopards/smart-shortcuts" element={
          <ProtectedRoute redirectTo="/login">
            <SmartShortcuts />
          </ProtectedRoute>
        } />
        <Route path="/junior/grade/:grade/elephants-tigers-and-leopards/compensation-strategy" element={
          <ProtectedRoute redirectTo="/login">
            <CompensationStrategy />
          </ProtectedRoute>
        } />

        {/* Elephants, Tigers, and Leopards Chapter Test */}
        <Route path="/junior/grade/:grade/elephants-tigers-and-leopards/chapter-test" element={
          <ProtectedRoute redirectTo="/login">
            <ElephantsTest />
          </ProtectedRoute>
        } />

        {/* Fun with Symmetry Routes */}
        <Route path="/junior/grade/:grade/fun-with-symmetry/chapter-test" element={
          <ProtectedRoute redirectTo="/login">
            <FunWithSymmetryTest />
          </ProtectedRoute>
        } />
        <Route path="/junior/grade/:grade/fun with symmetry/chapter test" element={
          <ProtectedRoute redirectTo="/login">
            <FunWithSymmetryTest />
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

        {/* Equal Groups Chapter Test */}
        <Route path="/junior/grade/:grade/equal-groups/chapter-test" element={
          <ProtectedRoute redirectTo="/login">
            <EqualGroupsTest />
          </ProtectedRoute>
        } />

        {/* Weigh It, Pour It Routes */}
        <Route path="/junior/grade/:grade/weigh-it-pour-it/gram-to-kilogram-fractions" element={
          <ProtectedRoute redirectTo="/login">
            <GramToKilogramFractions />
          </ProtectedRoute>
        } />
        <Route path="/junior/grade/:grade/weigh-it-pour-it/make-one-kilogram-using-packets" element={
          <ProtectedRoute redirectTo="/login">
            <MakeOneKilogramUsingPackets />
          </ProtectedRoute>
        } />
        <Route path="/junior/grade/:grade/weigh-it-pour-it/millilitre-to-litre-fractions" element={
          <ProtectedRoute redirectTo="/login">
            <MillilitreToLitreFractions />
          </ProtectedRoute>
        } />
        <Route path="/junior/grade/:grade/weigh-it-pour-it/make-one-litre-using-bottles" element={
          <ProtectedRoute redirectTo="/login">
            <MakeOneLitreUsingBottles />
          </ProtectedRoute>
        } />
        <Route path="/junior/grade/:grade/weigh-it-pour-it/count-how-many-units-fit" element={
          <ProtectedRoute redirectTo="/login">
            <CountHowManyUnitsFit />
          </ProtectedRoute>
        } />
        <Route path="/junior/grade/:grade/weigh-it-pour-it/repeated-addition-to-one-whole" element={
          <ProtectedRoute redirectTo="/login">
            <RepeatedAdditionToOneWhole />
          </ProtectedRoute>
        } />
        <Route path="/junior/grade/:grade/weigh-it-pour-it/compare-weights-and-capacities" element={
          <ProtectedRoute redirectTo="/login">
            <CompareWeightsAndCapacities />
          </ProtectedRoute>
        } />
        <Route path="/junior/grade/:grade/weigh-it-pour-it/weight-and-capacity-word-problems" element={
          <ProtectedRoute redirectTo="/login">
            <WeightAndCapacityWordProblems />
          </ProtectedRoute>
        } />

        {/* Weigh It, Pour It Chapter Test */}
        <Route path="/junior/grade/:grade/weigh-it-pour-it/chapter-test" element={
          <ProtectedRoute redirectTo="/login">
            <WeighItPourItTest />
          </ProtectedRoute>
        } />

        {/* Fun with Symmetry Routes */}
        <Route path="/junior/grade/:grade/fun-with-symmetry/identify-line-of-symmetry" element={
          <ProtectedRoute redirectTo="/login">
            <IdentifyLineOfSymmetry />
          </ProtectedRoute>
        } />
        <Route path="/junior/grade/:grade/fun-with-symmetry/draw-line-of-symmetry" element={
          <ProtectedRoute redirectTo="/login">
            <DrawLineOfSymmetry />
          </ProtectedRoute>
        } />
        <Route path="/junior/grade/:grade/fun-with-symmetry/paper-fold-symmetry" element={
          <ProtectedRoute redirectTo="/login">
            <PaperFoldSymmetry />
          </ProtectedRoute>
        } />
        <Route path="/junior/grade/:grade/fun-with-symmetry/mirror-image-shapes" element={
          <ProtectedRoute redirectTo="/login">
            <MirrorImageShapes />
          </ProtectedRoute>
        } />
        <Route path="/junior/grade/:grade/fun-with-symmetry/complete-half-design" element={
          <ProtectedRoute redirectTo="/login">
            <CompleteHalfDesign />
          </ProtectedRoute>
        } />
        <Route path="/junior/grade/:grade/fun-with-symmetry/symmetry-on-dot-grid" element={
          <ProtectedRoute redirectTo="/login">
            <SymmetryOnDotGrid />
          </ProtectedRoute>
        } />
        <Route path="/junior/grade/:grade/fun-with-symmetry/lines-of-symmetry-in-polygons" element={
          <ProtectedRoute redirectTo="/login">
            <LinesOfSymmetryInPolygons />
          </ProtectedRoute>
        } />
        <Route path="/junior/grade/:grade/fun-with-symmetry/mirror-symmetric-numbers-letters" element={
          <ProtectedRoute redirectTo="/login">
            <MirrorSymmetricNumbersLetters />
          </ProtectedRoute>
        } />
        <Route path="/junior/grade/:grade/fun-with-symmetry/identify-repeating-tile" element={
          <ProtectedRoute redirectTo="/login">
            <IdentifyRepeatingTile />
          </ProtectedRoute>
        } />
        <Route path="/junior/grade/:grade/fun-with-symmetry/create-tiling-without-gaps" element={
          <ProtectedRoute redirectTo="/login">
            <CreateTilingWithoutGaps />
          </ProtectedRoute>
        } />
        <Route path="/junior/grade/:grade/fun-with-symmetry/classify-symmetrical-objects" element={
          <ProtectedRoute redirectTo="/login">
            <ClassifySymmetricalObjects />
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

        {/* Grade 8 Chapter Tests */}
        <Route path="/senior/grade/8/exponents-and-powers/chapter-test" element={<ProtectedRoute redirectTo="/login"><ExponentsAndPowersTest /></ProtectedRoute>} />
        <Route path="/senior/grade/8/rational-numbers/chapter-test" element={<ProtectedRoute redirectTo="/login"><Grade8RationalNumbersTest /></ProtectedRoute>} />
        <Route path="/senior/grade/8/mensuration/chapter-test" element={<ProtectedRoute redirectTo="/login"><MensurationTest /></ProtectedRoute>} />
        <Route path="/senior/grade/8/factorisation/chapter-test" element={<ProtectedRoute redirectTo="/login"><FactorisationTest /></ProtectedRoute>} />
        <Route path="/senior/grade/8/squares-and-square-roots/chapter-test" element={<ProtectedRoute redirectTo="/login"><SquaresAndSquareRootsTest /></ProtectedRoute>} />

        {/* Grade 8 Squares and Square Roots */}
        <Route path="/senior/grade/8/squares-and-square-roots/identify-perfect-squares" element={<ProtectedRoute redirectTo="/login"><IdentifyPerfectSquares /></ProtectedRoute>} />
        <Route path="/senior/grade/8/squares-and-square-roots/properties-of-square-numbers" element={<ProtectedRoute redirectTo="/login"><PropertiesOfSquareNumbers /></ProtectedRoute>} />
        <Route path="/senior/grade/8/squares-and-square-roots/square-using-identity-patterns" element={<ProtectedRoute redirectTo="/login"><SquareUsingIdentityPatterns /></ProtectedRoute>} />
        <Route path="/senior/grade/8/squares-and-square-roots/pythagorean-triplets" element={<ProtectedRoute redirectTo="/login"><PythagoreanTriplets /></ProtectedRoute>} />
        <Route path="/senior/grade/8/squares-and-square-roots/concept-of-square-root" element={<ProtectedRoute redirectTo="/login"><ConceptOfSquareRoot /></ProtectedRoute>} />
        <Route path="/senior/grade/8/squares-and-square-roots/square-root-prime-factorization" element={<ProtectedRoute redirectTo="/login"><SquareRootPrimeFactorization /></ProtectedRoute>} />
        <Route path="/senior/grade/8/squares-and-square-roots/square-root-long-division" element={<ProtectedRoute redirectTo="/login"><SquareRootLongDivision /></ProtectedRoute>} />
        <Route path="/senior/grade/8/squares-and-square-roots/square-root-of-decimals" element={<ProtectedRoute redirectTo="/login"><SquareRootOfDecimals /></ProtectedRoute>} />

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
        <Route path="/junior/grade/2/what-is-long-what-is-round" element={<ProtectedRoute redirectTo="/login"><Grade2WhatIsLongWhatIsRound /></ProtectedRoute>} />
        <Route path="/junior/grade/2/how-much-can-you-carry" element={<ProtectedRoute redirectTo="/login"><Grade2HowMuchCanYouCarry /></ProtectedRoute>} />
        <Route path="/junior/grade/2/counting-in-groups" element={<ProtectedRoute redirectTo="/login"><Grade2CountingInGroups /></ProtectedRoute>} />
        <Route path="/junior/grade/2/counting-in-tens" element={<ProtectedRoute redirectTo="/login"><Grade2CountingInTens /></ProtectedRoute>} />
        <Route path="/junior/grade/2/patterns" element={<ProtectedRoute redirectTo="/login"><Grade2Patterns /></ProtectedRoute>} />
        <Route path="/junior/grade/2/footprints" element={<ProtectedRoute redirectTo="/login"><Grade2Footprints /></ProtectedRoute>} />
        <Route path="/junior/grade/2/jugs-and-mugs" element={<ProtectedRoute redirectTo="/login"><Grade2JugsAndMugs /></ProtectedRoute>} />
        <Route path="/junior/grade/2/tens-and-ones" element={<ProtectedRoute redirectTo="/login"><Grade2TensAndOnes /></ProtectedRoute>} />
        <Route path="/junior/grade/2/my-funday" element={<ProtectedRoute redirectTo="/login"><Grade2MyFunday /></ProtectedRoute>} />
        <Route path="/junior/grade/2/add-our-points" element={<ProtectedRoute redirectTo="/login"><Grade2AddOurPoints /></ProtectedRoute>} />
        <Route path="/junior/grade/2/lines-and-lines" element={<ProtectedRoute redirectTo="/login"><Grade2LinesAndLines /></ProtectedRoute>} />
        <Route path="/junior/grade/2/give-and-take" element={<ProtectedRoute redirectTo="/login"><Grade2GiveAndTake /></ProtectedRoute>} />
        <Route path="/junior/grade/2/the-longest-step" element={<ProtectedRoute redirectTo="/login"><Grade2TheLongestStep /></ProtectedRoute>} />
        <Route path="/junior/grade/2/birds-come-birds-go" element={<ProtectedRoute redirectTo="/login"><Grade2BirdsComeBirdsGo /></ProtectedRoute>} />

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

        {/* Grade 6 Symmetry */}
        <Route path="/middle/grade/:grade/symmetry/intro" element={<IntroToSymmetry6 />} />
        <Route path="/middle/grade/:grade/symmetry/reflection" element={<ReflectionInALine6 />} />
        <Route path="/middle/grade/:grade/symmetry/rotational" element={<RotationalSymmetry6 />} />
        <Route path="/middle/grade/:grade/symmetry/order-rotational" element={<OrderOfRotationalSymmetry6 />} />
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
        <Route path="/middle/grade/7/algebraic-expressions/formation" element={<ProtectedRoute redirectTo="/login"><Formation /></ProtectedRoute>} />
        <Route path="/middle/grade/7/algebraic-expressions/terms-factors" element={<ProtectedRoute redirectTo="/login"><TermsFactors /></ProtectedRoute>} />
        <Route path="/middle/grade/7/algebraic-expressions/coefficients" element={<ProtectedRoute redirectTo="/login"><Coefficients /></ProtectedRoute>} />
        <Route path="/middle/grade/7/algebraic-expressions/like-unlike" element={<ProtectedRoute redirectTo="/login"><LikeUnlikeTerms /></ProtectedRoute>} />
        <Route path="/middle/grade/7/algebraic-expressions/polynomials" element={<ProtectedRoute redirectTo="/login"><Polynomials /></ProtectedRoute>} />
        <Route path="/middle/grade/7/algebraic-expressions/finding-value" element={<ProtectedRoute redirectTo="/login"><FindingValue /></ProtectedRoute>} />
        <Route path="/middle/grade/7/algebraic-expressions/chapter-test" element={<ProtectedRoute redirectTo="/login"><AlgebraicExpressionsTest /></ProtectedRoute>} />



        {/* Perimeter and Area */}
        <Route path="/middle/grade/7/perimeter-area/parallelogram" element={<AreaParallelogram />} />
        <Route path="/middle/grade/7/perimeter-area/triangle" element={<AreaTriangle />} />
        <Route path="/middle/grade/7/perimeter-area/circles" element={<Circles />} />
        <Route path="/middle/grade/7/perimeter-area/chapter-test" element={<PerimeterAreaTest />} />

        {/* Auth Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Role-Based Dashboards */}
        <Route path="/student-dashboard" element={<ProtectedRoute redirectTo="/login"><StudentDashboard /></ProtectedRoute>} />
        <Route path="/student/diagnosis-results" element={<ProtectedRoute redirectTo="/login"><StudentDiagnosisResultsPage /></ProtectedRoute>} />
        <Route path="/idm-dashboard" element={<ProtectedRoute redirectTo="/login"><IDMPage /></ProtectedRoute>} />

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
          <Route path="practice-results" element={<AdminPracticeResultsPage />} />
          <Route path="diagnosis-results" element={<AdminDiagnosisResultsPage />} />
          <Route path="alerts" element={<AdminAlertsPage />} />
          <Route path="analytics" element={<AdminAnalyticsPage />} />
          <Route path="system-health" element={<AdminSystemHealthPage />} />
          <Route path="activity-log" element={<AdminActivityLogPage />} />
          {/* Configuration */}
          <Route path="settings" element={<AdminSettingsPage />} />
        </Route>


        <Route path="/guest-dashboard" element={<GuestDashboard />} />
        <Route path="/mentor-dashboard" element={<ProtectedRoute redirectTo="/login"><MentorDashboard /></ProtectedRoute>} />

        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/uploader-login" element={<UploaderLogin />} />
        <Route path="/uploader-dashboard" element={<UploaderDashboard />} />

        <Route path="/assessment-uploader-login" element={<AssessmentUploaderLogin />} />
        <Route path="/assessment-uploader-dashboard" element={<AssessmentUploaderDashboard />} />
        <Route path="/assessment-access" element={<AssessmentAccessPage />} />
        <Route path="/assessment-student-dashboard" element={<AssessmentStudentDashboard />} />
        <Route path="/assessment-runner" element={<AssessmentRunner />} />

        {/* Full Screen Practice Sessions */}
        <Route path="/practice/:templateId" element={<ProtectedRoute redirectTo="/login"><PracticeSession /></ProtectedRoute>} />
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
        <Route path="/middle/grade/5/area-boundary/chapter-test" element={<AreaBoundaryTest />} />
        <Route path="/middle/grade/5/tenths-hundredths/chapter-test" element={<TenthsHundredthsTest />} />
        <Route path="/middle/grade/5/multiply-divide/chapter-test" element={<MultiplyDivideTest />} />
        <Route path="/middle/grade/5/how-big-how-heavy/chapter-test" element={<HowBigHowHeavyTest />} />
        <Route path="/middle/grade/5/can-you-see-the-pattern/chapter-test" element={<ChapterTestPatterns />} />

        <Route path="/middle/practice/:skillId" element={<ProtectedRoute redirectTo="/login"><MiddlePracticeSession /></ProtectedRoute>} />
        {/* Class 10: Pair of Linear Equations Routes */}
        <Route path="/high/practice/10011" element={<ProtectedRoute redirectTo="/login"><GraphicalMethod /></ProtectedRoute>} />
        <Route path="/high/practice/10012" element={<ProtectedRoute redirectTo="/login"><GraphicalMethod /></ProtectedRoute>} />
        <Route path="/high/practice/10021" element={<ProtectedRoute redirectTo="/login"><GraphicalMethod /></ProtectedRoute>} />
        <Route path="/high/practice/10022" element={<ProtectedRoute redirectTo="/login"><ConditionsForConsistency /></ProtectedRoute>} />
        <Route path="/high/practice/10031" element={<ProtectedRoute redirectTo="/login"><IntroductionToLinearEquations /></ProtectedRoute>} />
        <Route path="/high/practice/10041" element={<ProtectedRoute redirectTo="/login"><StandardFormEquations /></ProtectedRoute>} />
        <Route path="/high/practice/10051" element={<ProtectedRoute redirectTo="/login"><AlgebraicMethods /></ProtectedRoute>} />
        <Route path="/high/practice/10052" element={<ProtectedRoute redirectTo="/login"><AlgebraicMethods /></ProtectedRoute>} />
        <Route path="/high/practice/10053" element={<ProtectedRoute redirectTo="/login"><AlgebraicMethods /></ProtectedRoute>} />
        <Route path="/high/practice/10054" element={<ProtectedRoute redirectTo="/login"><AlgebraicMethods /></ProtectedRoute>} />
        <Route path="/high/practice/10055" element={<ProtectedRoute redirectTo="/login"><AlgebraicMethods /></ProtectedRoute>} />
        <Route path="/high/practice/1209" element={<ProtectedRoute redirectTo="/login"><PairOfLinearEquationsTest /></ProtectedRoute>} />
        {/* Class 10: Arithmetic Progressions Routes */}
        <Route path="/high/practice/1105" element={<ProtectedRoute redirectTo="/login"><RecognisingPatterns /></ProtectedRoute>} />
        <Route path="/high/practice/1106" element={<ProtectedRoute redirectTo="/login"><UnderstandingAP /></ProtectedRoute>} />
        <Route path="/high/practice/1107" element={<ProtectedRoute redirectTo="/login"><IdentifyingTerms /></ProtectedRoute>} />
        <Route path="/high/practice/1108" element={<ProtectedRoute redirectTo="/login"><FindingSpecificTerms /></ProtectedRoute>} />
        <Route path="/high/practice/1109" element={<ProtectedRoute redirectTo="/login"><SumOfTerms /></ProtectedRoute>} />
        <Route path="/high/practice/1110" element={<ProtectedRoute redirectTo="/login"><ArithmeticProgressionsTest /></ProtectedRoute>} />
        {/* Class 10: Quadratic Equations Routes */}
        <Route path="/high/practice/1120" element={<ProtectedRoute redirectTo="/login"><FoundationsQuadratic /></ProtectedRoute>} />
        <Route path="/high/practice/1121" element={<ProtectedRoute redirectTo="/login"><RepresentingSituations /></ProtectedRoute>} />
        <Route path="/high/practice/1122" element={<ProtectedRoute redirectTo="/login"><IdentifyingQuadratic /></ProtectedRoute>} />
        <Route path="/high/practice/1123" element={<ProtectedRoute redirectTo="/login"><RootsByFactorisation /></ProtectedRoute>} />
        <Route path="/high/practice/1124" element={<ProtectedRoute redirectTo="/login"><WordProblemsFactorisation /></ProtectedRoute>} />
        <Route path="/high/practice/1125" element={<ProtectedRoute redirectTo="/login"><NatureOfRoots /></ProtectedRoute>} />
        <Route path="/high/practice/1126" element={<ProtectedRoute redirectTo="/login"><DiscriminantAnalysis /></ProtectedRoute>} />
        <Route path="/high/practice/1127" element={<ProtectedRoute redirectTo="/login"><RealLifeApplications /></ProtectedRoute>} />
        <Route path="/high/practice/1128" element={<ProtectedRoute redirectTo="/login"><QuadraticEquationsTest /></ProtectedRoute>} />

        {/* Class 10: Polynomials Routes */}
        <Route path="/high/practice/1233" element={<ProtectedRoute redirectTo="/login"><TypesAndDegrees /></ProtectedRoute>} />
        <Route path="/high/practice/1234" element={<ProtectedRoute redirectTo="/login"><EvaluatingAndIdentifying /></ProtectedRoute>} />
        <Route path="/high/practice/1235" element={<ProtectedRoute redirectTo="/login"><GeometricalInterpretation /></ProtectedRoute>} />
        <Route path="/high/practice/1236" element={<ProtectedRoute redirectTo="/login"><NumberFromGraphicalBehaviour /></ProtectedRoute>} />
        <Route path="/high/practice/1237" element={<ProtectedRoute redirectTo="/login"><RelationshipQuadratic /></ProtectedRoute>} />
        <Route path="/high/practice/1238" element={<ProtectedRoute redirectTo="/login"><ConstructingQuadratic /></ProtectedRoute>} />
        <Route path="/high/practice/1239" element={<ProtectedRoute redirectTo="/login"><RelationshipCubic /></ProtectedRoute>} />
        <Route path="/high/practice/1240" element={<ProtectedRoute redirectTo="/login"><PolynomialsTest /></ProtectedRoute>} />

        <Route path="/high/practice/:skillId" element={<ProtectedRoute redirectTo="/login"><HighPracticeSession /></ProtectedRoute>} />


        {/* Class 12: Matrices � Legacy routes redirect to canonical deep-dive URLs */}
        <Route path="/senior/grade/12/matrices/who-uses" element={<ProtectedRoute redirectTo="/login"><Navigate to="/senior/grade/12/matrices/deep-dive/who-uses" replace /></ProtectedRoute>} />
        <Route path="/senior/grade/12/matrices/what-is" element={<ProtectedRoute redirectTo="/login"><Navigate to="/senior/grade/12/matrices/deep-dive/what-is" replace /></ProtectedRoute>} />
        <Route path="/senior/grade/12/matrices/when-need" element={<ProtectedRoute redirectTo="/login"><Navigate to="/senior/grade/12/matrices/deep-dive/when-need" replace /></ProtectedRoute>} />
        <Route path="/senior/grade/12/matrices/how-operations" element={<ProtectedRoute redirectTo="/login"><Navigate to="/senior/grade/12/matrices/deep-dive/how-operations" replace /></ProtectedRoute>} />
        <Route path="/senior/grade/12/matrices/why-rules" element={<ProtectedRoute redirectTo="/login"><Navigate to="/senior/grade/12/matrices/deep-dive/why-rules" replace /></ProtectedRoute>} />
        <Route path="/senior/grade/12/matrices/where-applied" element={<ProtectedRoute redirectTo="/login"><Navigate to="/senior/grade/12/matrices/deep-dive/where-applied" replace /></ProtectedRoute>} />
        <Route path="/senior/grade/12/matrices/invertible" element={<ProtectedRoute redirectTo="/login"><Navigate to="/senior/grade/12/matrices/deep-dive/invertible" replace /></ProtectedRoute>} />
        <Route path="/senior/grade/12/matrices/test/matrix-order" element={<ProtectedRoute redirectTo="/login"><Navigate to="/senior/grade/12/matrices/deep-dive/test/matrix-order" replace /></ProtectedRoute>} />
        <Route path="/senior/grade/12/matrices/test/matrix-types" element={<ProtectedRoute redirectTo="/login"><Navigate to="/senior/grade/12/matrices/deep-dive/test/matrix-types" replace /></ProtectedRoute>} />
        <Route path="/senior/grade/12/matrices/test/matrix-equality" element={<ProtectedRoute redirectTo="/login"><Navigate to="/senior/grade/12/matrices/deep-dive/test/matrix-equality" replace /></ProtectedRoute>} />
        <Route path="/senior/grade/12/matrices/test/matrix-operations" element={<ProtectedRoute redirectTo="/login"><Navigate to="/senior/grade/12/matrices/deep-dive/test/matrix-operations" replace /></ProtectedRoute>} />
        <Route path="/senior/grade/12/matrices/test/matrix-transpose" element={<ProtectedRoute redirectTo="/login"><Navigate to="/senior/grade/12/matrices/deep-dive/test/matrix-transpose" replace /></ProtectedRoute>} />
        <Route path="/senior/grade/12/matrices/test/invertible-matrices" element={<ProtectedRoute redirectTo="/login"><Navigate to="/senior/grade/12/matrices/deep-dive/test/invertible-matrices" replace /></ProtectedRoute>} />
        <Route path="/senior/grade/12/matrices/test" element={<ProtectedRoute redirectTo="/login"><Navigate to="/senior/grade/12/matrices/deep-dive/test" replace /></ProtectedRoute>} />

        {/* Fullscreen Routes (Outside MainLayout) */}
        <Route path="diagnosis-test/:grade" element={<ProtectedRoute redirectTo="/login"><DiagnosisTestRunner /></ProtectedRoute>} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
// Force rebuild



