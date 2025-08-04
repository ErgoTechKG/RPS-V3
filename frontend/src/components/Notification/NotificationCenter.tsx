import React, { useState } from 'react';
import { 
  Card, 
  List, 
  Button, 
  Space, 
  Select, 
  Input, 
  Typography, 
  Empty, 
  Tag,
  Dropdown,
  message
} from 'antd';
import {
  BellOutlined,
  SettingOutlined,
  ClearOutlined,
  SearchOutlined,
  ExclamationCircleOutlined,
  InfoCircleOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  MoreOutlined
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { useNotifications } from '@/contexts';
import type { Notification, NotificationType, NotificationPriority } from '@/types';
import './NotificationCenter.css';

const { Title } = Typography;
const { Search } = Input;

interface NotificationCenterProps {
  onSettingsClick?: () => void;
}

const NotificationCenter: React.FC<NotificationCenterProps> = ({ onSettingsClick }) => {
  const { 
    notifications, 
    unreadCount, 
    markAsRead, 
    markAllAsRead, 
    deleteNotification, 
    clearAllNotifications 
  } = useNotifications();

  const [filterType, setFilterType] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterPriority, setFilterPriority] = useState<string>('all');
  const [searchText, setSearchText] = useState<string>('');

  // Filter notifications based on current filters
  const filteredNotifications = notifications.filter(notification => {
    const matchesType = filterType === 'all' || notification.type === filterType;
    const matchesStatus = filterStatus === 'all' || 
      (filterStatus === 'unread' && !notification.read_status) ||
      (filterStatus === 'read' && notification.read_status);
    const matchesPriority = filterPriority === 'all' || notification.priority === filterPriority;
    const matchesSearch = searchText === '' || 
      notification.title.toLowerCase().includes(searchText.toLowerCase()) ||
      notification.content.toLowerCase().includes(searchText.toLowerCase());

    return matchesType && matchesStatus && matchesPriority && matchesSearch;
  });

  // Get icon for notification type
  const getNotificationIcon = (type: NotificationType, priority: NotificationPriority) => {
    const iconStyle = { fontSize: '16px' };
    
    switch (type) {
      case 'urgent_alert':
        return <ExclamationCircleOutlined style={{ ...iconStyle, color: '#F44336' }} />;
      case 'task_reminder':
        return <ClockCircleOutlined style={{ ...iconStyle, color: '#FF9800' }} />;
      case 'success_info':
        return <CheckCircleOutlined style={{ ...iconStyle, color: '#4CAF50' }} />;
      case 'system_message':
      default:
        return <InfoCircleOutlined style={{ ...iconStyle, color: '#2196F3' }} />;
    }
  };

  // Get priority color
  const getPriorityColor = (priority: NotificationPriority): string => {
    switch (priority) {
      case 'high':
        return '#F44336';
      case 'medium':
        return '#FF9800';
      case 'low':
        return '#4CAF50';
      default:
        return '#757575';
    }
  };

  // Get type text
  const getTypeText = (type: NotificationType): string => {
    switch (type) {
      case 'urgent_alert':
        return '紧急通知';
      case 'task_reminder':
        return '任务提醒';
      case 'success_info':
        return '成功消息';
      case 'system_message':
        return '系统消息';
      default:
        return '通知';
    }
  };

  // Format relative time
  const formatRelativeTime = (dateString: string): string => {
    const now = new Date();
    const notificationTime = new Date(dateString);
    const diffMs = now.getTime() - notificationTime.getTime();
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMinutes < 1) {
      return '刚刚';
    } else if (diffMinutes < 60) {
      return `${diffMinutes}分钟前`;
    } else if (diffHours < 24) {
      return `${diffHours}小时前`;
    } else if (diffDays < 7) {
      return `${diffDays}天前`;
    } else {
      return notificationTime.toLocaleDateString('zh-CN');
    }
  };

  // Handle notification action
  const handleNotificationAction = (notification: Notification, action: string, url?: string) => {
    switch (action) {
      case 'mark_read':
        markAsRead(notification.id);
        message.success('已标记为已读');
        break;
      case 'view_detail':
      case 'view_reply':
      case 'view_status':
        if (url) {
          // Mark as read when viewing
          if (!notification.read_status) {
            markAsRead(notification.id);
          }
          // In a real app, navigate to the URL
          message.info(`导航到: ${url}`);
        }
        break;
      default:
        message.info(`执行操作: ${action}`);
    }
  };

  // Notification item dropdown menu
  const getNotificationMenu = (notification: Notification): MenuProps => ({
    items: [
      {
        key: 'mark_read',
        label: notification.read_status ? '标记为未读' : '标记为已读',
        icon: <CheckCircleOutlined />,
        onClick: () => markAsRead(notification.id),
      },
      {
        key: 'delete',
        label: '删除通知',
        icon: <ClearOutlined />,
        danger: true,
        onClick: () => {
          deleteNotification(notification.id);
          message.success('通知已删除');
        },
      },
    ],
  });

  const handleClearAll = () => {
    clearAllNotifications();
    message.success('已清除所有通知');
  };

  const handleMarkAllRead = () => {
    markAllAsRead();
    message.success('已标记所有通知为已读');
  };

  return (
    <div className="notification-center">
      {/* Header */}
      <div className="notification-center__header">
        <Space align="center">
          <BellOutlined style={{ fontSize: '20px', color: '#1A73E8' }} />
          <Title level={3} style={{ margin: 0 }}>
            通知中心
          </Title>
          {unreadCount > 0 && (
            <Tag color="error">
              {unreadCount}
            </Tag>
          )}
        </Space>
        
        <Space>
          <Button 
            icon={<SettingOutlined />} 
            onClick={onSettingsClick}
          >
            设置
          </Button>
          <Button 
            icon={<ClearOutlined />} 
            onClick={handleClearAll}
          >
            清除全部
          </Button>
        </Space>
      </div>

      {/* Filters */}
      <div className="notification-center__filters">
        <Space wrap>
          <Select
            value={filterStatus}
            onChange={setFilterStatus}
            style={{ minWidth: 100 }}
            options={[
              { label: '全部', value: 'all' },
              { label: '未读', value: 'unread' },
              { label: '已读', value: 'read' },
            ]}
          />
          <Select
            value={filterPriority}
            onChange={setFilterPriority}
            style={{ minWidth: 100 }}
            options={[
              { label: '全部', value: 'all' },
              { label: '重要', value: 'high' },
              { label: '一般', value: 'medium' },
              { label: '较低', value: 'low' },
            ]}
          />
          <Select
            value={filterType}
            onChange={setFilterType}
            style={{ minWidth: 120 }}
            options={[
              { label: '全部类型', value: 'all' },
              { label: '紧急通知', value: 'urgent_alert' },
              { label: '任务提醒', value: 'task_reminder' },
              { label: '系统消息', value: 'system_message' },
              { label: '成功消息', value: 'success_info' },
            ]}
          />
          <Search
            placeholder="搜索通知..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ width: 200 }}
            allowClear
          />
        </Space>
      </div>

      {/* Notifications List */}
      <div className="notification-center__content">
        {filteredNotifications.length === 0 ? (
          <Empty 
            description="暂无通知"
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          />
        ) : (
          <List
            dataSource={filteredNotifications}
            renderItem={(notification) => (
              <List.Item className="notification-center__item">
                <Card 
                  className={`notification-card ${!notification.read_status ? 'notification-card--unread' : ''}`}
                  size="small"
                >
                  <div className="notification-card__content">
                    <div className="notification-card__header">
                      <Space>
                        {getNotificationIcon(notification.type, notification.priority)}
                        <span className="notification-card__type">
                          {getTypeText(notification.type)}
                        </span>
                        <Tag 
                          color={getPriorityColor(notification.priority)}
                        >
                          {notification.priority === 'high' ? '重要' : 
                           notification.priority === 'medium' ? '一般' : '较低'}
                        </Tag>
                      </Space>
                      
                      <Space>
                        <span className="notification-card__time">
                          {formatRelativeTime(notification.created_at)}
                        </span>
                        <Dropdown menu={getNotificationMenu(notification)} placement="bottomRight">
                          <Button type="text" icon={<MoreOutlined />} size="small" />
                        </Dropdown>
                      </Space>
                    </div>
                    
                    <div className="notification-card__body">
                      <h4 className="notification-card__title">
                        {notification.title}
                      </h4>
                      <p className="notification-card__description">
                        {notification.content}
                      </p>
                      
                      {notification.action_buttons && notification.action_buttons.length > 0 && (
                        <div className="notification-card__actions">
                          <Space>
                            {notification.action_buttons.map((action, index) => (
                              <Button
                                key={index}
                                type={action.action === 'mark_read' ? 'default' : 'primary'}
                                size="small"
                                onClick={() => handleNotificationAction(
                                  notification, 
                                  action.action, 
                                  action.url
                                )}
                              >
                                {action.text}
                              </Button>
                            ))}
                          </Space>
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              </List.Item>
            )}
          />
        )}
        
        {filteredNotifications.length > 0 && (
          <div className="notification-center__footer">
            <Space>
              <Button onClick={handleMarkAllRead}>
                标记全部已读
              </Button>
              <span className="notification-center__count">
                已显示 {filteredNotifications.length}/{notifications.length} 条消息
              </span>
            </Space>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationCenter;