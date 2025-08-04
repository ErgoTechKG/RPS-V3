import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { theme } from 'antd';
import type { ThemeConfig } from 'antd';
import type { UserRole, ThemeMode, ThemeContextType } from '@/types';
import { storage } from '@/utils';
import { THEME_STORAGE_KEY, USER_ROLE_STORAGE_KEY, DEFAULT_THEME_MODE, DEFAULT_USER_ROLE } from '@/constants';

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Role-based theme configurations
const roleThemes: Record<UserRole, ThemeConfig> = {
  professor: {
    token: {
      colorPrimary: '#1A73E8',      // Professor Blue
      colorSuccess: '#4CAF50',
      colorWarning: '#FF9800',
      colorError: '#F44336',
      colorInfo: '#2196F3',
      borderRadius: 8,
      fontFamily: "'Source Han Sans', 'PingFang SC', 'Microsoft YaHei', 'Roboto', 'Helvetica Neue', Arial, sans-serif",
      fontSize: 14,
      lineHeight: 1.5,
      fontSizeHeading1: 32,
      fontSizeHeading2: 24,
      fontSizeHeading3: 20,
      fontSizeHeading4: 16,
      fontSizeHeading5: 14,
    },
  },
  student: {
    token: {
      colorPrimary: '#4CAF50',      // Student Green
      colorSuccess: '#4CAF50',
      colorWarning: '#FF9800',
      colorError: '#F44336',
      colorInfo: '#2196F3',
      borderRadius: 8,
      fontFamily: "'Source Han Sans', 'PingFang SC', 'Microsoft YaHei', 'Roboto', 'Helvetica Neue', Arial, sans-serif",
      fontSize: 14,
      lineHeight: 1.5,
      fontSizeHeading1: 32,
      fontSizeHeading2: 24,
      fontSizeHeading3: 20,
      fontSizeHeading4: 16,
      fontSizeHeading5: 14,
    },
  },
  secretary: {
    token: {
      colorPrimary: '#7C4DFF',      // Secretary Purple
      colorSuccess: '#4CAF50',
      colorWarning: '#FF9800',
      colorError: '#F44336',
      colorInfo: '#2196F3',
      borderRadius: 8,
      fontFamily: "'Source Han Sans', 'PingFang SC', 'Microsoft YaHei', 'Roboto', 'Helvetica Neue', Arial, sans-serif",
      fontSize: 14,
      lineHeight: 1.5,
      fontSizeHeading1: 32,
      fontSizeHeading2: 24,
      fontSizeHeading3: 20,
      fontSizeHeading4: 16,
      fontSizeHeading5: 14,
    },
  },
  leader: {
    token: {
      colorPrimary: '#FF9800',      // Leader Gold
      colorSuccess: '#4CAF50',
      colorWarning: '#FF9800',
      colorError: '#F44336',
      colorInfo: '#2196F3',
      borderRadius: 8,
      fontFamily: "'Source Han Sans', 'PingFang SC', 'Microsoft YaHei', 'Roboto', 'Helvetica Neue', Arial, sans-serif",
      fontSize: 14,
      lineHeight: 1.5,
      fontSizeHeading1: 32,
      fontSizeHeading2: 24,
      fontSizeHeading3: 20,
      fontSizeHeading4: 16,
      fontSizeHeading5: 14,
    },
  },
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [themeMode, setThemeMode] = useState<ThemeMode>(DEFAULT_THEME_MODE);
  const [userRole, setUserRole] = useState<UserRole>(DEFAULT_USER_ROLE);

  // Load saved preferences on mount
  useEffect(() => {
    const savedThemeMode = storage.get(THEME_STORAGE_KEY) as ThemeMode;
    const savedUserRole = storage.get(USER_ROLE_STORAGE_KEY) as UserRole;

    if (savedThemeMode && ['light', 'dark'].includes(savedThemeMode)) {
      setThemeMode(savedThemeMode);
    }

    if (savedUserRole && ['professor', 'student', 'secretary', 'leader'].includes(savedUserRole)) {
      setUserRole(savedUserRole);
    }
  }, []);

  const toggleTheme = () => {
    const newMode: ThemeMode = themeMode === 'light' ? 'dark' : 'light';
    setThemeMode(newMode);
    storage.set(THEME_STORAGE_KEY, newMode);
  };

  const handleSetUserRole = (role: UserRole) => {
    setUserRole(role);
    storage.set(USER_ROLE_STORAGE_KEY, role);
  };

  const contextValue: ThemeContextType = {
    themeMode,
    userRole,
    toggleTheme,
    setUserRole: handleSetUserRole,
    isDarkMode: themeMode === 'dark',
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// Hook to get current theme configuration
export const useThemeConfig = (): ThemeConfig => {
  const { themeMode, userRole } = useTheme();
  const baseTheme = roleThemes[userRole] || roleThemes.student;

  return {
    ...baseTheme,
    algorithm: themeMode === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm,
  };
};