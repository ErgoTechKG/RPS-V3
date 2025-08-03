import React, { createContext, useContext, useState, ReactNode } from 'react';
import type { User, AuthContextType } from '@/types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  const login = async (email: string, _password: string): Promise<void> => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data based on email for development
      const mockUser: User = {
        id: '1',
        name: email.split('@')[0],
        email,
        role: email.includes('professor') ? 'professor' 
             : email.includes('secretary') ? 'secretary'
             : email.includes('leader') ? 'leader'
             : 'student',
      };
      
      setUser(mockUser);
    } catch (error) {
      throw new Error('登录失败');
    } finally {
      setLoading(false);
    }
  };

  const logout = (): void => {
    setUser(null);
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
      {children}
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