import { Route } from "react-router-dom";
import ProtectedRoute from '../components/ProtectedRoute';

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

function adminRoutes() {
    return (
        <>
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
                <Route path="alerts" element={<AdminAlertsPage />} />
                <Route path="analytics" element={<AdminAnalyticsPage />} />
                <Route path="system-health" element={<AdminSystemHealthPage />} />
                <Route path="activity-log" element={<AdminActivityLogPage />} />
                {/* Configuration */}
                <Route path="settings" element={<AdminSettingsPage />} />
            </Route>
        </>
    );
}

export default adminRoutes;