import type { UserRole } from '@/types';

// Application constants
export const APP_NAME = 'Research Process System';
export const APP_VERSION = __APP_VERSION__;

// User roles
export const USER_ROLES: Record<UserRole, string> = {
  professor: '教授',
  student: '学生',
  secretary: '研究秘书',
  leader: '领导',
};

// Theme constants
export const THEME_STORAGE_KEY = 'rps-theme-mode';
export const USER_ROLE_STORAGE_KEY = 'rps-user-role';

// Default theme mode
export const DEFAULT_THEME_MODE = 'light';
export const DEFAULT_USER_ROLE: UserRole = 'student';

// Route paths
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
  PROFILE: '/profile',
} as const;