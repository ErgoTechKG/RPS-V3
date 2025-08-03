import React, { useEffect } from 'react';
import { ConfigProvider, Button, Space } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider, ThemeProvider, useThemeConfig, useTheme, useAuth } from '@/contexts';
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
        <div className="app">
          <div className="app-content">
            <h1>本科科研实验班课程管理系统</h1>
            <p>华中科技大学机械科学与工程学院</p>
            <p>主题系统和路由配置已完成。</p>
            <Space direction="vertical" size="middle" style={{ marginTop: 24 }}>
              <Button 
                type="primary" 
                onClick={toggleTheme}
                aria-label="Toggle theme"
              >
                切换到{isDarkMode ? '浅色' : '深色'}模式
              </Button>
              {user && (
                <p>当前角色: {user.role} ({user.name})</p>
              )}
              <Button type="primary">
                主要按钮
              </Button>
            </Space>
          </div>
        </div>
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