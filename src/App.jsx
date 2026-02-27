import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom';
import MainLayout from './layouts/WebsiteLayout';
import Home from './pages/Home';
import AdminLogin from './pages/AdminLogin';
import MathSelection from './pages/MathSelection';
import GradeSyllabus from './pages/GradeSyllabus';
import PracticePage from './pages/PracticePage';
import ContentPage from './pages/ContentPage';
// import DynamicQuestionsDashboard from './pages/DynamicQuestionsDashboard';
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
import Grade4PracticeSession from './pages/juniors/class-4/Grade4PracticeSession';











// Middle Pages (Grades 5-7 professional design)
import MiddleGradeSyllabus from './pages/middle/MiddleGradeSyllabus';
import MiddlePracticeSession from './pages/middle/MiddlePracticeSession';



// Senior Pages (Grades 8-10 professional design)
import SeniorGradeSyllabus from './pages/high/SeniorGradeSyllabus';
import HighPracticeSession from './pages/high/HighPracticeSession';






import grade1Routes from './routes/grade1Routes';
import grade2Routes from './routes/grade2Routes';
import grade3Routes from './routes/grade3Routes';
import grade4Routes from './routes/grade4Routes';
import grade5Routes from './routes/grade5Routes';
import grade6Routes from './routes/grade6Routes';
import grade7Routes from './routes/grade7Routes';
import grade8Routes from './routes/grade8Routes';
import grade10Routes from './routes/grade10Routes';
import grade11Routes from './routes/grade11Routes';
import grade12Routes from './routes/grade12Routes';

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


        {grade1Routes()}
        {grade2Routes()}
        {grade3Routes()}
        {grade4Routes()}
        {grade5Routes()}
        {grade6Routes()}
        {grade7Routes()}
        {grade8Routes()}
        {grade10Routes()}
        {grade11Routes()}
        {grade12Routes()}



        <Route path="/junior/grade/:grade" element={<JuniorGradeSyllabus />} />
        <Route path="/junior/grade/:grade/topic/:topic" element={<JuniorSubtopics />} />
        <Route path="/junior/grade/:grade/practice" element={
          <ProtectedRoute redirectTo="/login">
            <PracticeRouteWrapper />
          </ProtectedRoute>
        } />


















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


        <Route path="/middle/practice/:skillId" element={<MiddlePracticeSession />} />
        <Route path="/high/practice/:skillId" element={<HighPracticeSession />} />



      </Routes>
    </Router>
  );
}

function PracticeRouteWrapper() {
  const { grade } = useParams();
  const isGrade4 = String(grade).replace(/\D/g, '') === '4';
  return isGrade4 ? <Grade4PracticeSession /> : <JuniorPracticeSession />;
}

export default App;
// Force rebuild

