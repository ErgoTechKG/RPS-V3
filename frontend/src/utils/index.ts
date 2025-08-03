import type { UserRole } from '@/types';

/**
 * Get localized role name
 */
export const getRoleName = (role: UserRole): string => {
  const roleNames = {
    professor: '教授',
    student: '学生',
    secretary: '研究秘书',
    leader: '领导',
  };
  return roleNames[role] || role;
};

/**
 * Storage utilities
 */
export const storage = {
  get: (key: string): string | null => {
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  },
  
  set: (key: string, value: string): void => {
    try {
      localStorage.setItem(key, value);
    } catch {
      // Silent fail
    }
  },
  
  remove: (key: string): void => {
    try {
      localStorage.removeItem(key);
    } catch {
      // Silent fail
    }
  },
};

/**
 * Environment utilities
 */
export const isTestMode = (): boolean => {
  return import.meta.env.VITE_TEST_MODE === 'true';
};

export const getApiBaseUrl = (): string => {
  return import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
};