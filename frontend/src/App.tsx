import React, { useEffect } from 'react';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider, ThemeProvider, NotificationProvider, useThemeConfig, useTheme, useAuth } from '@/contexts';
import Homepage from '@/pages/Homepage';
import LoginPage from '@/pages/auth/LoginPage';
import DesignSystemDemo from '@/pages/DesignSystemDemo';
import { WelcomePage } from '@/pages/welcome';
import { StudentDashboard, ProfessorDashboard, SecretaryDashboard, LeaderDashboard } from '@/pages/dashboard';
import NotificationPage from '@/pages/shared/NotificationPage';
import LabRotationCourse from '@/pages/student/LabRotationCourse';
import ProtectedRoute from '@/components/ProtectedRoute';
import './App.css';

// Main App component with theme configuration
const AppContent: React.FC = () => {
  const themeConfig = useThemeConfig();
  const { toggleTheme, isDarkMode } = useTheme();
  const { user, setUser } = useAuth();

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