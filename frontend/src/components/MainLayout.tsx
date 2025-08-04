import React from 'react';
import { Layout } from 'antd';
import TopNav from '@/components/Navigation/TopNav';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts';
import { 
  BookOutlined, 
  TeamOutlined, 
  ClockCircleOutlined, 
  BarChartOutlined,
  BulbOutlined,
  HomeOutlined
} from '@ant-design/icons';
import type { MenuProps } from 'antd';

const { Content } = Layout;

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  // Top navigation menu items
  const topMenuItems: MenuProps['items'] = [
    {
      key: 'home',
      label: '首页',
      icon: <HomeOutlined />,
      onClick: () => navigate(`/dashboard/${user?.role}`)
    },
    {
      key: 'courses',
      label: '课程',
      icon: <BookOutlined />
    },
    {
      key: 'students',
      label: '学生',
      icon: <TeamOutlined />
    },
    {
      key: 'tasks',
      label: '任务',
      icon: <ClockCircleOutlined />
    },
    {
      key: 'data',
      label: '数据',
      icon: <BarChartOutlined />
    }
  ];

  const handleMenuClick = (key: string) => {
    console.log('Menu clicked:', key);
  };

  return (
    <Layout style={{ minHeight: '100vh', background: '#f5f5f5' }}>
      <TopNav
        logo={
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <BulbOutlined style={{ fontSize: '24px', color: '#1A73E8', marginRight: '8px' }} />
            <span style={{ fontSize: '16px', fontWeight: 600, color: '#1A73E8' }}>科研管理平台</span>
          </div>
        }
        menuItems={topMenuItems}
        onMenuClick={handleMenuClick}
      />
      <Content style={{ padding: 0, background: '#f5f5f5' }}>
        {children}
      </Content>
    </Layout>
  );
};

export default MainLayout;