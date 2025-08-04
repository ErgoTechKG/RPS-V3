import React, { useState } from 'react';
import { Layout } from 'antd';
import TopNav from '@/components/Navigation/TopNav';
import NotificationCenter from '@/components/Notification/NotificationCenter';
import NotificationSettings from '@/components/Notification/NotificationSettings';
import { useAuth } from '@/contexts';
import './NotificationPage.css';

const { Content } = Layout;

const NotificationPage: React.FC = () => {
  const { user } = useAuth();
  const [showSettings, setShowSettings] = useState(false);

  const menuItems = [
    {
      key: 'notifications',
      label: '通知中心',
    },
  ];

  const handleMenuClick = (key: string) => {
    if (key === 'notifications') {
      setShowSettings(false);
    }
  };

  const handleSettingsClick = () => {
    setShowSettings(true);
  };

  const handleBackToNotifications = () => {
    setShowSettings(false);
  };

  return (
    <Layout className="notification-page">
      <TopNav 
        logo={<span>科研管理平台</span>}
        menuItems={menuItems}
        onMenuClick={handleMenuClick}
      />
      
      <Content className="notification-page__content">
        {showSettings ? (
          <NotificationSettings onBack={handleBackToNotifications} />
        ) : (
          <NotificationCenter onSettingsClick={handleSettingsClick} />
        )}
      </Content>
    </Layout>
  );
};

export default NotificationPage;