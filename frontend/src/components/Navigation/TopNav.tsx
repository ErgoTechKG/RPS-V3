import React from 'react';
import { Layout, Menu, Avatar, Dropdown, Space, Button } from 'antd';
import { UserOutlined, LogoutOutlined, SettingOutlined, BellOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { useAuth, useNotifications } from '@/contexts';
import { Badge } from '@/components/Notification/NotificationSystem';
import { useNavigate } from 'react-router-dom';
import './style.css';

const { Header } = Layout;

export interface TopNavProps {
  logo?: React.ReactNode;
  menuItems?: MenuProps['items'];
  onMenuClick?: (key: string) => void;
}

const TopNav: React.FC<TopNavProps> = ({ logo, menuItems, onMenuClick }) => {
  const { user, logout } = useAuth();
  const { unreadCount } = useNotifications();
  const navigate = useNavigate();

  const userMenuItems: MenuProps['items'] = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: '个人资料',
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: '设置',
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: '退出登录',
      onClick: logout,
    },
  ];

  return (
    <Header className="top-nav">
      <div className="top-nav__container">
        <div className="top-nav__left">
          {logo && <div className="top-nav__logo">{logo}</div>}
          {menuItems && (
            <Menu
              mode="horizontal"
              items={menuItems}
              className="top-nav__menu"
              onClick={({ key }) => onMenuClick?.(key)}
            />
          )}
        </div>
        
        <div className="top-nav__right">
          <Space size={16}>
            {/* Notification Bell */}
            <Badge count={unreadCount} maxCount={99}>
              <Button 
                type="text" 
                icon={<BellOutlined />} 
                className="top-nav__notification-btn"
                onClick={() => navigate('/notifications')}
                aria-label={`通知中心，${unreadCount}条未读消息`}
              />
            </Badge>
            
            {/* User Menu */}
            <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
              <Space className="top-nav__user" size={12}>
                <Avatar 
                  size="small" 
                  icon={<UserOutlined />}
                  style={{ backgroundColor: getRoleColor(user?.role) }}
                >
                  {user?.name?.charAt(0)}
                </Avatar>
                <span className="top-nav__username">{user?.name || '用户'}</span>
              </Space>
            </Dropdown>
          </Space>
        </div>
      </div>
    </Header>
  );
};

// Helper function to get role-based color
const getRoleColor = (role?: string): string => {
  switch (role) {
    case 'professor':
      return '#1A73E8';
    case 'student':
      return '#4CAF50';
    case 'secretary':
      return '#7C4DFF';
    case 'leader':
      return '#FF9800';
    default:
      return '#1A73E8';
  }
};

export default TopNav;