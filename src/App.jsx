import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/WebsiteLayout';
import Home from './pages/Home';
import AdminLogin from './pages/AdminLogin';
import MathSelection from './pages/MathSelection';
import GradeSyllabus from './pages/GradeSyllabus';
import ContentPage from './pages/ContentPage';
import DynamicQuestionsDashboard from './pages/DynamicQuestionsDashboard';
import PracticeSession from './pages/PracticeSession';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="learn-to-learn" element={<ContentPage topic="learn-to-learn" />} />
          <Route path="math" element={<MathSelection />} />
          <Route path="math/:grade" element={<GradeSyllabus />} />
          <Route path="ai" element={<ContentPage topic="ai" />} />
        </Route>
        <Route path="/admin-login" element={<AdminLogin />} />
        {/* Add more standalone routes here */}
        <Route path="/uploading-dynamic-questions" element={<DynamicQuestionsDashboard />} />
        <Route path="/practice/:templateId" element={<PracticeSession />} />
      </Routes>
    </Router>
  );
}

export default App;
