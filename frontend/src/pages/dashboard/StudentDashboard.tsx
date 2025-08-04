import React from 'react';
import { Layout, Card, Typography, Button, Space, Row, Col, Progress, Avatar, List, Tag } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts';
import {
  UserOutlined,
  BookOutlined,
  ExperimentOutlined,
  TrophyOutlined,
  BellOutlined,
  LogoutOutlined,
  BulbOutlined
} from '@ant-design/icons';

const { Header, Content, Sider } = Layout;
const { Title, Text } = Typography;

const StudentDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const mockData = {
    currentCourses: [
      { id: 1, name: '机器学习基础', progress: 75, deadline: '2024-03-15', status: 'active' },
      { id: 2, name: '实验室轮转A', progress: 45, deadline: '2024-03-20', status: 'active' },
      { id: 3, name: '综合素质评价', progress: 60, deadline: '2024-03-25', status: 'pending' }
    ],
    recentActivities: [
      { id: 1, title: '张教授回复了你的问题', time: '2小时前', type: 'message' },
      { id: 2, title: '实验报告已提交成功', time: '1天前', type: 'success' },
      { id: 3, title: '新的作业发布：机器学习作业3', time: '2天前', type: 'assignment' }
    ],
    upcomingDeadlines: [
      { id: 1, title: '机器学习作业3', date: '2024-03-10', days: 3 },
      { id: 2, title: '实验室轮转中期报告', date: '2024-03-15', days: 8 },
      { id: 3, title: '综合素质自评', date: '2024-03-20', days: 13 }
    ]
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ background: '#fff', padding: '0 24px', borderBottom: '1px solid #f0f0f0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <BulbOutlined style={{ fontSize: '24px', color: '#1890ff', marginRight: '12px' }} />
            <span style={{ fontSize: '18px', fontWeight: 600 }}>学生学习仪表板</span>
          </div>
          <Space>
            <Avatar style={{ backgroundColor: '#4CAF50' }} icon={<UserOutlined />} />
            <Text>{user?.name}</Text>
            <Button type="text" icon={<LogoutOutlined />} onClick={handleLogout}>
              退出
            </Button>
          </Space>
        </div>
      </Header>

      <Layout>
        <Sider width={200} style={{ background: '#fff', borderRight: '1px solid #f0f0f0' }}>
          <div style={{ padding: '16px' }}>
            <Space direction="vertical" style={{ width: '100%' }}>
              <Button type="text" icon={<BookOutlined />} block style={{ textAlign: 'left' }}>
                我的课程
              </Button>
              <Button type="text" icon={<ExperimentOutlined />} block style={{ textAlign: 'left' }}>
                实验室轮转
              </Button>
              <Button type="text" icon={<TrophyOutlined />} block style={{ textAlign: 'left' }}>
                素质评价
              </Button>
              <Button type="text" icon={<BellOutlined />} block style={{ textAlign: 'left' }}>
                通知消息
              </Button>
            </Space>
          </div>
        </Sider>

        <Content style={{ padding: '24px', background: '#f5f5f5' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <Title level={2} style={{ marginBottom: '24px' }}>
              欢迎回来，{user?.name}! 👋
            </Title>

            <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
              <Col xs={24} sm={8}>
                <Card size="small">
                  <div style={{ textAlign: 'center' }}>
                    <Text type="secondary">活跃课程</Text>
                    <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#4CAF50' }}>3</div>
                  </div>
                </Card>
              </Col>
              <Col xs={24} sm={8}>
                <Card size="small">
                  <div style={{ textAlign: 'center' }}>
                    <Text type="secondary">待提交作业</Text>
                    <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#ff9800' }}>2</div>
                  </div>
                </Card>
              </Col>
              <Col xs={24} sm={8}>
                <Card size="small">
                  <div style={{ textAlign: 'center' }}>
                    <Text type="secondary">平均进度</Text>
                    <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#1890ff' }}>60%</div>
                  </div>
                </Card>
              </Col>
            </Row>

            <Row gutter={[16, 16]}>
              <Col xs={24} lg={12}>
                <Card title="当前课程" style={{ height: '300px' }}>
                  <Space direction="vertical" style={{ width: '100%' }}>
                    {mockData.currentCourses.map(course => (
                      <div key={course.id}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                          <Text strong>{course.name}</Text>
                          <Tag color={course.status === 'active' ? 'green' : 'orange'}>
                            {course.status === 'active' ? '进行中' : '待处理'}
                          </Tag>
                        </div>
                        <Progress percent={course.progress} size="small" />
                        <Text type="secondary" style={{ fontSize: '12px' }}>
                          截止时间: {course.deadline}
                        </Text>
                      </div>
                    ))}
                  </Space>
                </Card>
              </Col>

              <Col xs={24} lg={12}>
                <Card title="最近活动" style={{ height: '300px' }}>
                  <List
                    size="small"
                    dataSource={mockData.recentActivities}
                    renderItem={item => (
                      <List.Item>
                        <List.Item.Meta
                          title={<Text style={{ fontSize: '14px' }}>{item.title}</Text>}
                          description={<Text type="secondary" style={{ fontSize: '12px' }}>{item.time}</Text>}
                        />
                      </List.Item>
                    )}
                  />
                </Card>
              </Col>
            </Row>

            <Row gutter={[16, 16]} style={{ marginTop: '16px' }}>
              <Col xs={24}>
                <Card title="即将到期的任务">
                  <Row gutter={[16, 16]}>
                    {mockData.upcomingDeadlines.map(item => (
                      <Col xs={24} sm={8} key={item.id}>
                        <Card size="small" style={{ textAlign: 'center' }}>
                          <Text strong>{item.title}</Text>
                          <div style={{ margin: '8px 0' }}>
                            <Text type="secondary">{item.date}</Text>
                          </div>
                          <Tag color={item.days <= 5 ? 'red' : 'blue'}>
                            {item.days}天后截止
                          </Tag>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                </Card>
              </Col>
            </Row>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default StudentDashboard;