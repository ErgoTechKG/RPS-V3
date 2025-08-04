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

// Notification types
export type NotificationType = 'task_reminder' | 'system_message' | 'urgent_alert' | 'success_info';
export type NotificationPriority = 'high' | 'medium' | 'low';

export interface NotificationAction {
  text: string;
  action: string;
  url?: string;
}

export interface NotificationMetadata {
  sender?: string;
  related_course?: string;
  related_user?: string;
  expire_time?: string;
}

export interface Notification {
  id: string;
  type: NotificationType;
  priority: NotificationPriority;
  title: string;
  content: string;
  action_buttons?: NotificationAction[];
  metadata: NotificationMetadata;
  created_at: string;
  read_status: boolean;
}

export interface NotificationSettings {
  system_notifications: boolean;
  email_notifications: boolean;
  sms_notifications: boolean;
  wechat_notifications: boolean;
  course_related: {
    new_course: boolean;
    assignment_deadline: boolean;
    grade_published: boolean;
    schedule_change: boolean;
    peer_activities: boolean;
  };
  teacher_interaction: {
    teacher_reply: boolean;
    interview_invitation: boolean;
    evaluation_feedback: boolean;
    mentor_activities: boolean;
    research_group_notifications: boolean;
  };
  system_messages: {
    system_updates: boolean;
    security_alerts: boolean;
    feature_introductions: boolean;
    maintenance_notices: boolean;
    marketing_messages: boolean;
  };
  quiet_hours: {
    weekdays: string; // "22:00-08:00"
    weekends: string; // "20:00-09:00"
    urgent_exception: boolean;
  };
}

export interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  settings: NotificationSettings;
  markAsRead: (notificationId: string) => void;
  markAllAsRead: () => void;
  deleteNotification: (notificationId: string) => void;
  clearAllNotifications: () => void;
  updateSettings: (settings: Partial<NotificationSettings>) => void;
  addNotification: (notification: Omit<Notification, 'id' | 'created_at'>) => void;
}

// Environment variables
export interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  readonly VITE_TEST_MODE: string;
  readonly VITE_APP_TITLE: string;
}