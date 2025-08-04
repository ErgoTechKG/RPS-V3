import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import type { 
  Notification, 
  NotificationSettings, 
  NotificationContextType, 
  UserRole 
} from '@/types';
import { useAuth } from './AuthContext';

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

interface NotificationProviderProps {
  children: ReactNode;
}

// Default notification settings
const defaultSettings: NotificationSettings = {
  system_notifications: true,
  email_notifications: true,
  sms_notifications: false,
  wechat_notifications: false,
  course_related: {
    new_course: true,
    assignment_deadline: true,
    grade_published: true,
    schedule_change: true,
    peer_activities: false,
  },
  teacher_interaction: {
    teacher_reply: true,
    interview_invitation: true,
    evaluation_feedback: true,
    mentor_activities: false,
    research_group_notifications: false,
  },
  system_messages: {
    system_updates: true,
    security_alerts: true,
    feature_introductions: false,
    maintenance_notices: true,
    marketing_messages: false,
  },
  quiet_hours: {
    weekdays: "22:00-08:00",
    weekends: "20:00-09:00",
    urgent_exception: true,
  },
};

// Mock notification data for different roles
const generateMockNotifications = (role: UserRole): Notification[] => {
  const baseTime = Date.now();
  
  const studentNotifications: Notification[] = [
    {
      id: '1',
      type: 'urgent_alert',
      priority: 'high',
      title: '紧急通知',
      content: '实验室轮转课程选课即将截止，请抓紧时间提交申请',
      action_buttons: [
        { text: '查看详情', action: 'view_detail', url: '/courses/lab-rotation' },
        { text: '标记已读', action: 'mark_read' }
      ],
      metadata: {
        sender: '系统',
        related_course: 'lab-rotation-2024',
        expire_time: new Date(baseTime + 24 * 60 * 60 * 1000).toISOString(),
      },
      created_at: new Date(baseTime - 60 * 1000).toISOString(),
      read_status: false,
    },
    {
      id: '2',
      type: 'task_reminder',
      priority: 'medium',
      title: '任务提醒',
      content: '张教授回复了你的问题："关于文献综述的写法"',
      action_buttons: [
        { text: '查看回复', action: 'view_reply', url: '/messages/professor-zhang' },
        { text: '标记已读', action: 'mark_read' }
      ],
      metadata: {
        sender: '张教授',
        related_user: 'professor-zhang',
      },
      created_at: new Date(baseTime - 2 * 60 * 1000).toISOString(),
      read_status: false,
    },
    {
      id: '3',
      type: 'system_message',
      priority: 'low',
      title: '系统消息',
      content: '综合素质评价系统已更新，新增AI辅助评分功能',
      action_buttons: [
        { text: '了解详情', action: 'view_detail', url: '/evaluation/system-update' },
        { text: '标记已读', action: 'mark_read' }
      ],
      metadata: {
        sender: '系统',
      },
      created_at: new Date(baseTime - 60 * 60 * 1000).toISOString(),
      read_status: false,
    },
    {
      id: '4',
      type: 'success_info',
      priority: 'low',
      title: '成功消息',
      content: '你的实验报告已成功提交，正在等待教授审核',
      action_buttons: [
        { text: '查看状态', action: 'view_status', url: '/assignments/lab-report-status' },
        { text: '标记已读', action: 'mark_read' }
      ],
      metadata: {
        sender: '系统',
        related_course: 'mechanical-design',
      },
      created_at: new Date(baseTime - 3 * 60 * 60 * 1000).toISOString(),
      read_status: true,
    },
  ];

  const professorNotifications: Notification[] = [
    {
      id: 'p1',
      type: 'task_reminder',
      priority: 'high',
      title: '待审核任务',
      content: '您有15份学生实验报告待审核，请及时处理',
      action_buttons: [
        { text: '开始审核', action: 'start_review', url: '/professor/review-queue' },
        { text: '标记已读', action: 'mark_read' }
      ],
      metadata: {
        sender: '系统',
        related_course: 'mechanical-design',
      },
      created_at: new Date(baseTime - 30 * 60 * 1000).toISOString(),
      read_status: false,
    },
    {
      id: 'p2',
      type: 'system_message',
      priority: 'medium',
      title: 'AI检测结果',
      content: '本周批改的作业中，AI检测发现3份疑似抄袭的作业',
      action_buttons: [
        { text: '查看详情', action: 'view_ai_results', url: '/professor/ai-detection' },
        { text: '标记已读', action: 'mark_read' }
      ],
      metadata: {
        sender: '系统',
      },
      created_at: new Date(baseTime - 2 * 60 * 60 * 1000).toISOString(),
      read_status: false,
    }
  ];

  const secretaryNotifications: Notification[] = [
    {
      id: 's1',
      type: 'urgent_alert',
      priority: 'high',
      title: '数据同步异常',
      content: '学生成绩数据同步出现异常，需要立即处理',
      action_buttons: [
        { text: '查看详情', action: 'view_sync_error', url: '/secretary/data-sync' },
        { text: '标记已读', action: 'mark_read' }
      ],
      metadata: {
        sender: '系统',
      },
      created_at: new Date(baseTime - 15 * 60 * 1000).toISOString(),
      read_status: false,
    },
    {
      id: 's2',
      type: 'task_reminder',
      priority: 'medium',
      title: '月度报告提醒',
      content: '本月教学质量报告即将截止，请完成数据收集和分析',
      action_buttons: [
        { text: '生成报告', action: 'generate_report', url: '/secretary/monthly-report' },
        { text: '标记已读', action: 'mark_read' }
      ],
      metadata: {
        sender: '系统',
      },
      created_at: new Date(baseTime - 6 * 60 * 60 * 1000).toISOString(),
      read_status: false,
    }
  ];

  const leaderNotifications: Notification[] = [
    {
      id: 'l1',
      type: 'system_message',
      priority: 'high',
      title: '战略数据报告',
      content: '本季度教学效果分析报告已生成，整体教学质量提升12%',
      action_buttons: [
        { text: '查看报告', action: 'view_report', url: '/leader/quarterly-report' },
        { text: '标记已读', action: 'mark_read' }
      ],
      metadata: {
        sender: '系统',
      },
      created_at: new Date(baseTime - 4 * 60 * 60 * 1000).toISOString(),
      read_status: false,
    },
    {
      id: 'l2',
      type: 'task_reminder',
      priority: 'medium',
      title: '预算审批',
      content: '机械工程学院设备采购预算申请待您审批',
      action_buttons: [
        { text: '审批', action: 'approve_budget', url: '/leader/budget-approval' },
        { text: '标记已读', action: 'mark_read' }
      ],
      metadata: {
        sender: '财务部',
      },
      created_at: new Date(baseTime - 8 * 60 * 60 * 1000).toISOString(),
      read_status: false,
    }
  ];

  switch (role) {
    case 'professor':
      return professorNotifications;
    case 'secretary':
      return secretaryNotifications;
    case 'leader':
      return leaderNotifications;
    case 'student':
    default:
      return studentNotifications;
  }
};

export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [settings, setSettings] = useState<NotificationSettings>(defaultSettings);

  // Load notifications when user changes
  useEffect(() => {
    if (user?.role) {
      const mockNotifications = generateMockNotifications(user.role);
      setNotifications(mockNotifications);

      // Load settings from localStorage
      const savedSettings = localStorage.getItem(`notification-settings-${user.role}`);
      if (savedSettings) {
        setSettings(JSON.parse(savedSettings));
      }
    }
  }, [user?.role]);

  const unreadCount = notifications.filter(n => !n.read_status).length;

  const markAsRead = (notificationId: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === notificationId 
          ? { ...notification, read_status: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read_status: true }))
    );
  };

  const deleteNotification = (notificationId: string) => {
    setNotifications(prev => 
      prev.filter(notification => notification.id !== notificationId)
    );
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const updateSettings = (newSettings: Partial<NotificationSettings>) => {
    const updatedSettings = { ...settings, ...newSettings };
    setSettings(updatedSettings);
    
    // Save to localStorage
    if (user?.role) {
      localStorage.setItem(
        `notification-settings-${user.role}`, 
        JSON.stringify(updatedSettings)
      );
    }
  };

  const addNotification = (notification: Omit<Notification, 'id' | 'created_at'>) => {
    const newNotification: Notification = {
      ...notification,
      id: `notification-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      created_at: new Date().toISOString(),
    };
    setNotifications(prev => [newNotification, ...prev]);
  };

  const contextValue: NotificationContextType = {
    notifications,
    unreadCount,
    settings,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearAllNotifications,
    updateSettings,
    addNotification,
  };

  return (
    <NotificationContext.Provider value={contextValue}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = (): NotificationContextType => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};