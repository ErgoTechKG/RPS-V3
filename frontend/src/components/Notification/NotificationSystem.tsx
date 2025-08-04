import React from 'react';
import { message, notification } from 'antd';
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  InfoCircleOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import './style.css';

export interface NotificationConfig {
  title?: string;
  description?: string;
  duration?: number;
  placement?: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';
}

class NotificationSystem {
  // Message notifications (simple, auto-dismiss)
  static success(content: string, duration?: number) {
    message.success({
      content,
      duration: duration || 3,
      className: 'custom-message custom-message--success',
      icon: <CheckCircleOutlined />,
    });
  }

  static error(content: string, duration?: number) {
    message.error({
      content,
      duration: duration || 3,
      className: 'custom-message custom-message--error',
      icon: <CloseCircleOutlined />,
    });
  }

  static warning(content: string, duration?: number) {
    message.warning({
      content,
      duration: duration || 3,
      className: 'custom-message custom-message--warning',
      icon: <ExclamationCircleOutlined />,
    });
  }

  static info(content: string, duration?: number) {
    message.info({
      content,
      duration: duration || 3,
      className: 'custom-message custom-message--info',
      icon: <InfoCircleOutlined />,
    });
  }

  // Notification (more complex, with title and description)
  static showNotification(
    type: 'success' | 'error' | 'warning' | 'info',
    config: NotificationConfig
  ) {
    const icons = {
      success: <CheckCircleOutlined style={{ color: '#4CAF50' }} />,
      error: <CloseCircleOutlined style={{ color: '#F44336' }} />,
      warning: <ExclamationCircleOutlined style={{ color: '#FF9800' }} />,
      info: <InfoCircleOutlined style={{ color: '#2196F3' }} />,
    };

    notification[type]({
      message: config.title,
      description: config.description,
      duration: config.duration || 4.5,
      placement: config.placement || 'topRight',
      className: `custom-notification custom-notification--${type}`,
      icon: icons[type],
    });
  }

  // Destroy all notifications
  static destroy() {
    message.destroy();
    notification.destroy();
  }
}

// Badge component for notification indicators
export interface BadgeProps {
  count: number;
  dot?: boolean;
  maxCount?: number;
  showZero?: boolean;
  children?: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  count,
  dot = false,
  maxCount = 99,
  showZero = false,
  children,
}) => {
  const displayCount = count > maxCount ? `${maxCount}+` : count;
  const shouldShow = count > 0 || showZero;

  if (!shouldShow && !dot) return <>{children}</>;

  return (
    <div className="custom-badge">
      {children}
      {dot ? (
        <span className="custom-badge__dot" />
      ) : (
        <span className="custom-badge__count">{displayCount}</span>
      )}
    </div>
  );
};

export default NotificationSystem;