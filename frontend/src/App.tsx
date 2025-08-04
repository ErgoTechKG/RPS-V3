import React, { useEffect } from 'react';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider, ThemeProvider, NotificationProvider, useThemeConfig, useAuth } from '@/contexts';
import Homepage from '@/pages/Homepage';
import LoginPage from '@/pages/auth/LoginPage';
import DesignSystemDemo from '@/pages/DesignSystemDemo';
import { WelcomePage } from '@/pages/welcome';
import { StudentDashboard, ProfessorDashboard, SecretaryDashboard, LeaderDashboard } from '@/pages/dashboard';
import NotificationPage from '@/pages/shared/NotificationPage';
import LabRotationCourse from '@/pages/student/LabRotationCourse';
import EvaluationHome from '@/pages/student/EvaluationHome';
import EvaluationNotifications from '@/pages/student/EvaluationNotifications';
import EvaluationSubmission from '@/pages/student/EvaluationSubmission';
import EvaluationResults from '@/pages/student/EvaluationResults';
import CollaborationCenter from '@/pages/student/CollaborationCenter';
import DiscussionDetail from '@/pages/student/DiscussionDetail';
import StudyGroups from '@/pages/student/StudyGroups';
import { 
  LabRotationOverview, 
  TopicManagement, 
  StudentSelection, 
  ProcessManagement, 
  AssessmentManagement 
} from '@/pages/professor';
import ProtectedRoute from '@/components/ProtectedRoute';
import './App.css';

// Main App component with theme configuration
const AppContent: React.FC = () => {
  const themeConfig = useThemeConfig();
  const { setUser } = useAuth();

  // Expose env for testing
  useEffect(() => {
    // @ts-ignore
    window.__APP_ENV__ = import.meta.env;
    
    // Listen for auth changes in tests
    const handleAuthChange = (event: CustomEvent) => {
      if (event.detail?.user) {
        setUser(event.detail.user);
      }
    };
    
    window.addEventListener('auth-change', handleAuthChange as EventListener);
    return () => {
      window.removeEventListener('auth-change', handleAuthChange as EventListener);
    };
  }, [setUser]);

  return (
    <ConfigProvider theme={themeConfig} locale={zhCN}>
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/design-system" element={<DesignSystemDemo />} />
          
          {/* Welcome pages - Protected */}
          <Route path="/welcome/student" element={
            <ProtectedRoute requiredRole="student">
              <WelcomePage />
            </ProtectedRoute>
          } />
          <Route path="/welcome/professor" element={
            <ProtectedRoute requiredRole="professor">
              <WelcomePage />
            </ProtectedRoute>
          } />
          <Route path="/welcome/secretary" element={
            <ProtectedRoute requiredRole="secretary">
              <WelcomePage />
            </ProtectedRoute>
          } />
          <Route path="/welcome/leader" element={
            <ProtectedRoute requiredRole="leader">
              <WelcomePage />
            </ProtectedRoute>
          } />
          
          {/* Dashboard pages - Protected */}
          <Route path="/dashboard/student" element={
            <ProtectedRoute requiredRole="student">
              <StudentDashboard />
            </ProtectedRoute>
          } />
          <Route path="/dashboard/professor" element={
            <ProtectedRoute requiredRole="professor">
              <ProfessorDashboard />
            </ProtectedRoute>
          } />
          <Route path="/dashboard/secretary" element={
            <ProtectedRoute requiredRole="secretary">
              <SecretaryDashboard />
            </ProtectedRoute>
          } />
          <Route path="/dashboard/leader" element={
            <ProtectedRoute requiredRole="leader">
              <LeaderDashboard />
            </ProtectedRoute>
          } />
          
          {/* Notification Page - Accessible to all authenticated users */}
          <Route path="/notifications" element={
            <ProtectedRoute>
              <NotificationPage />
            </ProtectedRoute>
          } />
          
          {/* Student Lab Rotation Course */}
          <Route path="/student/lab-rotation" element={
            <ProtectedRoute requiredRole="student">
              <LabRotationCourse />
            </ProtectedRoute>
          } />
          
          {/* Student Comprehensive Evaluation */}
          <Route path="/student/evaluation" element={
            <ProtectedRoute requiredRole="student">
              <EvaluationHome />
            </ProtectedRoute>
          } />
          <Route path="/student/evaluation/notifications" element={
            <ProtectedRoute requiredRole="student">
              <EvaluationNotifications />
            </ProtectedRoute>
          } />
          <Route path="/student/evaluation/submission" element={
            <ProtectedRoute requiredRole="student">
              <EvaluationSubmission />
            </ProtectedRoute>
          } />
          <Route path="/student/evaluation/results" element={
            <ProtectedRoute requiredRole="student">
              <EvaluationResults />
            </ProtectedRoute>
          } />
          
          {/* Student Collaboration and Study Groups */}
          <Route path="/student/collaboration" element={
            <ProtectedRoute requiredRole="student">
              <CollaborationCenter />
            </ProtectedRoute>
          } />
          <Route path="/student/discussion/:id" element={
            <ProtectedRoute requiredRole="student">
              <DiscussionDetail />
            </ProtectedRoute>
          } />
          <Route path="/student/study-groups" element={
            <ProtectedRoute requiredRole="student">
              <StudyGroups />
            </ProtectedRoute>
          } />
          
          {/* Professor Lab Rotation Course */}
          <Route path="/professor/lab-rotation" element={
            <ProtectedRoute requiredRole="professor">
              <LabRotationOverview />
            </ProtectedRoute>
          } />
          <Route path="/professor/lab-rotation/topics" element={
            <ProtectedRoute requiredRole="professor">
              <TopicManagement />
            </ProtectedRoute>
          } />
          <Route path="/professor/lab-rotation/selection" element={
            <ProtectedRoute requiredRole="professor">
              <StudentSelection />
            </ProtectedRoute>
          } />
          <Route path="/professor/lab-rotation/process" element={
            <ProtectedRoute requiredRole="professor">
              <ProcessManagement />
            </ProtectedRoute>
          } />
          <Route path="/professor/lab-rotation/assessment" element={
            <ProtectedRoute requiredRole="professor">
              <AssessmentManagement />
            </ProtectedRoute>
          } />
        </Routes>
      </Router>
    </ConfigProvider>
  );
};

// Root App component with providers
const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <NotificationProvider>
          <AppContent />
        </NotificationProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;