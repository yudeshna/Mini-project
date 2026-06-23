import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import CandidateDashboard from './pages/CandidateDashboard';
import RecruiterDashboard from './pages/RecruiterDashboard';
import JobSearch from './pages/JobSearch';
import MyApplications from './pages/MyApplications';
import ApplicationsPage from './pages/ApplicationsPage';
import CandidateProfile from './pages/CandidateProfile';
import NotificationsPage from './pages/NotificationsPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/candidate/dashboard" element={<CandidateDashboard />} />
          <Route path="/recruiter/dashboard" element={<RecruiterDashboard />} />
          <Route path="/jobs" element={<JobSearch />} />
          <Route path="/candidate/applications" element={<MyApplications />} />
          <Route path="/recruiter/jobs/:jobId/applications" element={<ApplicationsPage />} />
          <Route path="/candidate/notifications" element={<NotificationsPage />} />
          <Route 
          path="/recruiter/candidates/:candidateId" 
           element={<CandidateProfile />}
           />
          <Route
           path="/candidate/profile" 
           element={<CandidateProfile />}
/>


        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;