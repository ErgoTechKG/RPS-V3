import React, { useEffect } from 'react';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider, ThemeProvider, useThemeConfig, useTheme, useAuth } from '@/contexts';
import Homepage from '@/pages/Homepage';
import LoginPage from '@/pages/auth/LoginPage';
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
          <Route path="/dashboard/professor" element={<div>Professor Dashboard (To be implemented)</div>} />
          <Route path="/dashboard/student" element={<div>Student Dashboard (To be implemented)</div>} />
          <Route path="/dashboard/secretary" element={<div>Secretary Dashboard (To be implemented)</div>} />
          <Route path="/dashboard/leader" element={<div>Leader Dashboard (To be implemented)</div>} />
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
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;