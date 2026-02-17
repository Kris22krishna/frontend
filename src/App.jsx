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
import RakshaBandhanIntro from './components/practice/class-3/Raksha-Bandhan/fill-in-the-blanks';
import RakshaBandhanMultiplication from './components/practice/class-3/Raksha-Bandhan/multiplication';
import RakshaBandhanDivision from './components/practice/class-3/Raksha-Bandhan/division';
import PowersWithNegativeExponents from './components/practice/class-8/exponents and powers/powers_with_negative_exponents';
import LawsOfExponents from './components/practice/class-8/exponents and powers/laws_of_exponents';
import LawsOfExponentsApplication from './components/practice/class-8/exponents and powers/laws_of_exponents_application';
import StandardFormSmallNumbers from './components/practice/class-8/exponents and powers/standard_form_small_numbers';
import ComparingLargeSmallNumbers from './components/practice/class-8/exponents and powers/comparing_large_small_numbers';
import FairShareCutting from './components/practice/class-3/fair-share/cutting';
import FairShareHalvesDoubles from './components/practice/class-3/fair-share/halves&doubles';
import FairShareDraw from './components/practice/class-3/fair-share/draw-halves';
import FairShareGuesswho from './components/practice/class-3/fair-share/guess-who-am-i';

// Class 4 - The Cleanest Village
import RepeatedAddition from './components/practice/class-4/The_Cleanest_Village/Equal_Groups_and_Repeated_Addition/repeated_addition';
import RepeatedSubtraction from './components/practice/class-4/The_Cleanest_Village/Equal_Groups_and_Repeated_Addition/repeated_subtraction';
import AdditionWithRegrouping from './components/practice/class-4/The_Cleanest_Village/Addition_with_Regrouping/addition_with_regrouping';
import SubtractionWithRegrouping from './components/practice/class-4/The_Cleanest_Village/Subtraction_with_Regrouping/subtraction_with_regrouping';
import FindMissingAddend from './components/practice/class-4/The_Cleanest_Village/Missing_Value_and_Balance/find_missing_addend';
import FindMissingSubtrahend from './components/practice/class-4/The_Cleanest_Village/Missing_Value_and_Balance/find_missing_subtrahend';
import FindHowManyMoreOrLess from './components/practice/class-4/The_Cleanest_Village/Comparison_and_Difference/find_how_many_more_or_less';
import ChapterSceneMixedOperations from './components/practice/class-4/The_Cleanest_Village/Word_Problems/chapter_scene_mixed_operations';
import LetUsPlay from './components/practice/class-4/The_Cleanest_Village/Let_Us_Play/let_us_play';
import Commutativity from './components/practice/class-8/rational-numbers/commutativity';
import Associativity from './components/practice/class-8/rational-numbers/associativity';
import AdditiveMultiplicativeIdentity from './components/practice/class-8/rational-numbers/additive_multiplicative_identity';
import Distributivity from './components/practice/class-8/rational-numbers/distributivity';

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

// Senior Pages (Grades 8-10 professional design)
import SeniorGradeSyllabus from './pages/high/SeniorGradeSyllabus';
import HighPracticeSession from './pages/high/HighPracticeSession';
import IntroductionToLinearEquations from './components/practice/class-10/Pair of linear equations in two variables/IntroductionToLinearEquations';
import GraphicalMethod from './components/practice/class-10/Pair of linear equations in two variables/GraphicalMethod';
import AlgebraicMethods from './components/practice/class-10/Pair of linear equations in two variables/AlgebraicMethods';
import ConditionsForConsistency from './components/practice/class-10/Pair of linear equations in two variables/ConditionsForConsistency';
import ApplicationProblems from './components/practice/class-10/Pair of linear equations in two variables/ApplicationProblems';
import StandardFormEquations from './components/practice/class-10/Pair of linear equations in two variables/StandardFormEquations';

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

        {/* Grade 8 Exponents and Powers - Negative Exponents */}
        <Route path="/senior/grade/8/exponents-powers/negative-exponents" element={
          <ProtectedRoute redirectTo="/login">
            <PowersWithNegativeExponents />
          </ProtectedRoute>
        } />

        {/* Grade 8 Exponents and Powers - Laws of Exponents */}
        <Route path="/senior/grade/8/exponents-powers/laws-of-exponents" element={
          <ProtectedRoute redirectTo="/login">
            <LawsOfExponents />
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
        <Route path="/junior/grade/:grade/the-cleanest-village/subtraction-with-regrouping" element={
          <ProtectedRoute redirectTo="/login">
            <SubtractionWithRegrouping />
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

        {/* Grade 1 Specialized Routes */}
        <Route path="/junior/grade/1/shapes-and-space" element={<ProtectedRoute redirectTo="/login"><Grade1ShapesAndSpace /></ProtectedRoute>} />
        <Route path="/junior/grade/1/numbers-from-one-to-nine" element={<ProtectedRoute redirectTo="/login"><Grade1Numbers1to9 /></ProtectedRoute>} />
        <Route path="/junior/grade/1/addition" element={<ProtectedRoute redirectTo="/login"><Grade1Addition /></ProtectedRoute>} />
        <Route path="/junior/grade/1/subtraction" element={<ProtectedRoute redirectTo="/login"><Grade1Subtraction /></ProtectedRoute>} />
        <Route path="/junior/grade/1/numbers-from-ten-to-twenty" element={<ProtectedRoute redirectTo="/login"><Grade1Numbers10to20 /></ProtectedRoute>} />
        <Route path="/junior/grade/1/time" element={<ProtectedRoute redirectTo="/login"><Grade1Time /></ProtectedRoute>} />
        <Route path="/junior/grade/1/measurement" element={<ProtectedRoute redirectTo="/login"><Grade1Measurement /></ProtectedRoute>} />
        <Route path="/junior/grade/1/numbers-from-twenty-one-to-fifty" element={<ProtectedRoute redirectTo="/login"><Grade1Numbers21to50 /></ProtectedRoute>} />
        <Route path="/junior/grade/1/data-handling" element={<ProtectedRoute redirectTo="/login"><Grade1DataHandling /></ProtectedRoute>} />
        <Route path="/junior/grade/1/patterns" element={<ProtectedRoute redirectTo="/login"><Grade1Patterns /></ProtectedRoute>} />
        <Route path="/junior/grade/1/numbers-51-to-100" element={<ProtectedRoute redirectTo="/login"><Grade1Numbers51to100 /></ProtectedRoute>} />

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
        <Route path="/high/practice/:skillId" element={<HighPracticeSession />} />
      </Routes>
    </Router>
  );
}

export default App;
// Force rebuild

