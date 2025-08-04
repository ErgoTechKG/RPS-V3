import React from 'react';
import { Card, Statistic, Row, Col, Typography } from 'antd';
import { 
  UserOutlined, 
  BookOutlined, 
  FileTextOutlined, 
  PlusCircleOutlined 
} from '@ant-design/icons';

const { Text } = Typography;

interface StatItem {
  title: string;
  value: number;
  icon: React.ReactNode;
  trend?: string;
  color?: string;
}

interface RealtimeStatsProps {
  stats: {
    activeUsers: number;
    activeCourses: number;
    pendingReviews: number;
    newTasks: number;
    trends: {
      activeUsers: string;
      activeCourses: string;
      pendingReviews: string;
      newTasks: string;
    };
  };
}

const RealtimeStats: React.FC<RealtimeStatsProps> = ({ stats }) => {
  const statsData: StatItem[] = [
    {
      title: '活跃用户',
      value: stats.activeUsers,
      icon: <UserOutlined style={{ fontSize: '24px', color: '#1890ff' }} />,
      trend: stats.trends.activeUsers,
      color: '#1890ff'
    },
    {
      title: '进行中课程',
      value: stats.activeCourses,
      icon: <BookOutlined style={{ fontSize: '24px', color: '#52c41a' }} />,
      trend: stats.trends.activeCourses,
      color: '#52c41a'
    },
    {
      title: '待审核材料',
      value: stats.pendingReviews,
      icon: <FileTextOutlined style={{ fontSize: '24px', color: '#faad14' }} />,
      trend: stats.trends.pendingReviews,
      color: '#faad14'
    },
    {
      title: '今日新增任务',
      value: stats.newTasks,
      icon: <PlusCircleOutlined style={{ fontSize: '24px', color: '#eb2f96' }} />,
      trend: stats.trends.newTasks,
      color: '#eb2f96'
    }
  ];

  return (
    <Card title="实时数据" bordered={false}>
      <Row gutter={[16, 16]}>
        {statsData.map((stat, index) => (
          <Col xs={24} sm={12} lg={6} key={index}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center',
              padding: '12px',
              borderRadius: '8px',
              backgroundColor: '#fafafa'
            }}>
              <div style={{ marginRight: '16px' }}>{stat.icon}</div>
              <div style={{ flex: 1 }}>
                <Text type="secondary" style={{ fontSize: '14px' }}>
                  {stat.title}
                </Text>
                <div style={{ 
                  fontSize: '24px', 
                  fontWeight: 'bold',
                  color: stat.color,
                  marginTop: '4px'
                }}>
                  {stat.value}
                </div>
                {stat.trend && (
                  <Text 
                    type="secondary" 
                    style={{ 
                      fontSize: '12px',
                      color: stat.trend.startsWith('+') ? '#52c41a' : '#ff4d4f'
                    }}
                  >
                    {stat.trend.startsWith('+') ? '↑' : '↓'} {stat.trend}
                  </Text>
                )}
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </Card>
  );
};

export default RealtimeStats;