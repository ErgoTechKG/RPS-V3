// User role types
export type UserRole = 'professor' | 'student' | 'secretary' | 'leader';

// User interface
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

// Theme mode type
export type ThemeMode = 'light' | 'dark';

// Auth context types
export interface AuthContextType {
  user: User | null;
  login: (username: string, password: string, role?: UserRole) => Promise<void>;
  logout: () => void;
  loading: boolean;
  setUser: (user: User | null) => void;
}

// Theme context types
export interface ThemeContextType {
  themeMode: ThemeMode;
  userRole: UserRole;
  toggleTheme: () => void;
  setUserRole: (role: UserRole) => void;
}

// Environment variables
export interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  readonly VITE_TEST_MODE: string;
  readonly VITE_APP_TITLE: string;
}