import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import type { User, AuthContextType } from '@/types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Check token expiration on mount and periodically
  useEffect(() => {
    const checkTokenExpiry = () => {
      const tokenExpiry = localStorage.getItem('tokenExpiry');
      const savedUser = localStorage.getItem('user');
      
      if (tokenExpiry && savedUser) {
        const expiryTime = parseInt(tokenExpiry);
        
        if (Date.now() < expiryTime) {
          // Token is still valid
          setUser(JSON.parse(savedUser));
        } else {
          // Token has expired
          logout();
        }
      }
      
      setIsInitialized(true);
    };

    checkTokenExpiry();

    // Check token expiry every minute
    const interval = setInterval(checkTokenExpiry, 60000);

    return () => clearInterval(interval);
  }, []);

  const login = async (username: string, password: string): Promise<void> => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In test mode, determine role from username
      const testMode = import.meta.env.VITE_TEST_MODE === 'true';
      let role: User['role'] = 'student';
      
      if (testMode) {
        if (username.includes('professor')) role = 'professor';
        else if (username.includes('secretary')) role = 'secretary';
        else if (username.includes('leader')) role = 'leader';
      }
      
      // Mock user data for development
      const mockUser: User = {
        id: `user-${Date.now()}`,
        name: username,
        email: `${username}@university.edu`,
        role,
      };
      
      setUser(mockUser);
      
      // Save user to localStorage
      localStorage.setItem('user', JSON.stringify(mockUser));
      
      // Token expiry is set in LoginPage based on remember me option
    } catch (error) {
      throw new Error('登录失败');
    } finally {
      setLoading(false);
    }
  };

  const logout = (): void => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('tokenExpiry');
    localStorage.removeItem('rememberMe');
  };

  const contextValue: AuthContextType = {
    user,
    login,
    logout,
    loading,
    setUser,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {isInitialized && children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};