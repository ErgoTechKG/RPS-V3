# Ant Design Theme Implementation Guide

## Overview
This guide provides step-by-step instructions for implementing Ant Design's theme system in the research management platform, including ConfigProvider setup, design tokens configuration, and migration strategies from custom CSS to Ant Design components.

## 1. ConfigProvider Setup in App.jsx

### Basic Configuration
```jsx
import React from 'react';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { NotificationProvider } from './contexts/NotificationContext';
import { useAuth } from './contexts/AuthContext';

// Define role-based themes
const roleThemes = {
  professor: {
    token: {
      colorPrimary: '#1A73E8',      // Professor Blue
      colorSuccess: '#4CAF50',
      colorWarning: '#FF9800',
      colorError: '#F44336',
      colorInfo: '#2196F3',
      borderRadius: 8,
      fontFamily: "'Source Han Sans', 'PingFang SC', 'Microsoft YaHei', 'Roboto', 'Helvetica Neue', Arial, sans-serif",
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
    },
  },
};

function App() {
  const { user } = useAuth();
  const currentTheme = roleThemes[user?.role] || roleThemes.student;

  return (
    <ConfigProvider
      theme={currentTheme}
      locale={zhCN}
    >
      <AuthProvider>
        <NotificationProvider>
          <Router>
            {/* Your app routes */}
          </Router>
        </NotificationProvider>
      </AuthProvider>
    </ConfigProvider>
  );
}
```

## 2. Advanced Theme Configuration with Dark Mode

```jsx
import { theme } from 'antd';
import { useState, useEffect } from 'react';

function App() {
  const { user } = useAuth();
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Get role-specific theme
  const getRoleTheme = (role, isDark) => {
    const baseTheme = roleThemes[role] || roleThemes.student;
    
    return {
      ...baseTheme,
      algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
    };
  };

  const currentTheme = getRoleTheme(user?.role, isDarkMode);

  // Persist theme preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme-mode');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
    }
  }, []);

  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem('theme-mode', newMode ? 'dark' : 'light');
  };

  return (
    <ConfigProvider theme={currentTheme} locale={zhCN}>
      {/* App content */}
    </ConfigProvider>
  );
}
```

## 3. Design Tokens Reference

### Core Color Tokens
```javascript
const themeTokens = {
  // Primary Colors
  colorPrimary: '#1A73E8',        // Brand Blue
  colorPrimaryBg: '#E3F2FD',      // Light Blue Background
  colorPrimaryBgHover: '#BBDEFB', // Hover Background
  colorPrimaryBorder: '#90CAF9',  // Border Color
  colorPrimaryBorderHover: '#64B5F6',
  colorPrimaryHover: '#1557B0',
  colorPrimaryActive: '#0D47A1',
  
  // Functional Colors
  colorSuccess: '#4CAF50',
  colorWarning: '#FF9800',
  colorError: '#F44336',
  colorInfo: '#2196F3',
  
  // Neutral Colors
  colorTextBase: '#212121',
  colorBgBase: '#FFFFFF',
  colorBorder: '#E0E0E0',
};
```

### Typography Tokens
```javascript
const typographyTokens = {
  fontFamily: "'Source Han Sans', 'PingFang SC', 'Microsoft YaHei', 'Roboto', sans-serif",
  fontSize: 14,
  fontSizeSM: 12,
  fontSizeLG: 16,
  fontSizeXL: 20,
  fontSizeHeading1: 38,
  fontSizeHeading2: 30,
  fontSizeHeading3: 24,
  fontSizeHeading4: 20,
  fontSizeHeading5: 16,
  
  lineHeight: 1.5,
  lineHeightLG: 1.8,
  lineHeightSM: 1.3,
  
  fontWeightStrong: 600,
};
```

### Spacing Tokens
```javascript
const spacingTokens = {
  // Margin tokens
  marginXXS: 4,
  marginXS: 8,
  marginSM: 12,
  marginMD: 16,
  marginLG: 24,
  marginXL: 32,
  marginXXL: 48,
  
  // Padding tokens
  paddingXXS: 4,
  paddingXS: 8,
  paddingSM: 12,
  paddingMD: 16,
  paddingLG: 24,
  paddingXL: 32,
};
```

## 4. Component Migration Examples

### Before: Custom Button CSS
```jsx
// Old implementation
<button className="primary-button">Submit</button>

// CSS
.primary-button {
  background-color: #1A73E8;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.primary-button:hover {
  background-color: #1557B0;
}
```

### After: Ant Design Button
```jsx
import { Button } from 'antd';

// New implementation
<Button type="primary">Submit</Button>
```

### Before: Custom Card CSS
```jsx
// Old implementation
<div className="dashboard-card">
  <h3 className="card-title">Title</h3>
  <div className="card-content">Content</div>
</div>
```

### After: Ant Design Card
```jsx
import { Card } from 'antd';

// New implementation
<Card title="Title">
  Content
</Card>
```

## 5. Gradual Migration Strategy

### Phase 1: Setup ConfigProvider
1. Install Ant Design if not already installed: `npm install antd`
2. Wrap App component with ConfigProvider
3. Configure basic theme tokens and locale

### Phase 2: Replace Common Components
1. Start with buttons, forms, and modals
2. Replace custom tables with Ant Design Table
3. Update navigation to use Ant Design Menu

### Phase 3: Update Complex Components
1. Migrate custom dashboards to use Ant Design layouts
2. Replace custom date pickers and selects
3. Update notification system to use Ant Design notifications

### Phase 4: Remove Custom CSS
1. Identify and remove obsolete CSS files
2. Convert remaining custom styles to use design tokens
3. Ensure all components use theme tokens

## 6. Best Practices

### DO:
- Use design tokens for all colors, spacing, and typography
- Leverage Ant Design's built-in responsive utilities
- Follow Ant Design's component composition patterns
- Test theme changes across all user roles

### DON'T:
- Override Ant Design styles with !important
- Mix custom CSS with Ant Design components unnecessarily
- Hard-code colors or spacing values
- Ignore accessibility features built into Ant Design

## 7. Theme Context Implementation

```jsx
// contexts/ThemeContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { theme } from 'antd';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [themeMode, setThemeMode] = useState('light');
  const [customTokens, setCustomTokens] = useState({});

  const updateTheme = (mode) => {
    setThemeMode(mode);
    localStorage.setItem('theme-mode', mode);
  };

  const updateTokens = (tokens) => {
    setCustomTokens(tokens);
    localStorage.setItem('custom-tokens', JSON.stringify(tokens));
  };

  useEffect(() => {
    const savedMode = localStorage.getItem('theme-mode') || 'light';
    const savedTokens = localStorage.getItem('custom-tokens');
    
    setThemeMode(savedMode);
    if (savedTokens) {
      setCustomTokens(JSON.parse(savedTokens));
    }
  }, []);

  const value = {
    themeMode,
    customTokens,
    updateTheme,
    updateTokens,
    algorithm: themeMode === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
```

## 8. Testing Theme Implementation

### Unit Tests
```javascript
import { render } from '@testing-library/react';
import { ConfigProvider } from 'antd';
import App from './App';

test('renders with correct theme', () => {
  const theme = {
    token: {
      colorPrimary: '#1A73E8',
    },
  };

  const { container } = render(
    <ConfigProvider theme={theme}>
      <App />
    </ConfigProvider>
  );

  // Test theme application
  expect(container.querySelector('.ant-btn-primary')).toHaveStyle({
    backgroundColor: '#1A73E8',
  });
});
```

### Accessibility Testing
```javascript
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

test('theme meets accessibility standards', async () => {
  const { container } = render(<App />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

## Conclusion

By following this implementation guide, you can successfully integrate Ant Design's theme system into the research management platform, providing a consistent, accessible, and maintainable UI across all user roles. The gradual migration approach ensures minimal disruption while improving the overall user experience.