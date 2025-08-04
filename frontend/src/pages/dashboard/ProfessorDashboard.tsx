import React from 'react';
import { Layout, Card, Typography, Button, Space, Row, Col, Avatar, List, Tag, Statistic } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts';
import {
  TeamOutlined,
  BookOutlined,
  UserOutlined,
  RocketOutlined,
  LogoutOutlined,
  BulbOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined
} from '@ant-design/icons';

const { Header, Content, Sider } = Layout;
const { Title, Text } = Typography;

const ProfessorDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const mockData = {
    courses: [
      { id: 1, name: '机器学习基础', students: 25, pending: 3, status: 'active' },
      { id: 2, name: '实验室轮转指导', students: 8, pending: 1, status: 'active' }
    ],
    pendingTasks: [
      { id: 1, title: '审核学生申请', count: 5, type: 'review' },
      { id: 2, title: '批改作业', count: 12, type: 'grade' },
      { id: 3, title: '面试安排', count: 3, type: 'interview' }
    ],
    recentStudents: [
      { id: 1, name: '李同学', course: '机器学习基础', status: '优秀', avatar: '' },
      { id: 2, name: '王同学', course: '实验室轮转', status: '良好', avatar: '' },
      { id: 3, name: '张同学', course: '机器学习基础', status: '需关注', avatar: '' }
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
            <span style={{ fontSize: '18px', fontWeight: 600 }}>教授教学仪表板</span>
          </div>
          <Space>
            <Avatar style={{ backgroundColor: '#1A73E8' }} icon={<TeamOutlined />} />
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
                课程管理
              </Button>
              <Button type="text" icon={<TeamOutlined />} block style={{ textAlign: 'left' }}>
                学生管理
              </Button>
              <Button type="text" icon={<RocketOutlined />} block style={{ textAlign: 'left' }}>
                AI助手
              </Button>
              <Button type="text" icon={<UserOutlined />} block style={{ textAlign: 'left' }}>
                个人设置
              </Button>
            </Space>
          </div>
        </Sider>

        <Content style={{ padding: '24px', background: '#f5f5f5' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <Title level={2} style={{ marginBottom: '24px' }}>
              欢迎回来，{user?.name} 教授! 📚
            </Title>

            <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
              {mockData.pendingTasks.map(task => (
                <Col xs={24} sm={8} key={task.id}>
                  <Card size="small">
                    <Statistic
                      title={task.title}
                      value={task.count}
                      prefix={task.type === 'review' ? <ClockCircleOutlined /> : <CheckCircleOutlined />}
                      valueStyle={{ color: task.count > 0 ? '#ff4d4f' : '#3f8600' }}
                    />
                  </Card>
                </Col>
              ))}
            </Row>

            <Row gutter={[16, 16]}>
              <Col xs={24} lg={12}>
                <Card title="我的课程" style={{ height: '300px' }}>
                  <Space direction="vertical" style={{ width: '100%' }}>
                    {mockData.courses.map(course => (
                      <div key={course.id} style={{ padding: '12px', border: '1px solid #f0f0f0', borderRadius: '6px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div>
                            <Text strong>{course.name}</Text>
                            <div style={{ marginTop: '4px' }}>
                              <Text type="secondary">学生数: {course.students}</Text>
                              {course.pending > 0 && (
                                <Tag color="orange" style={{ marginLeft: '8px' }}>
                                  {course.pending}个待处理
                                </Tag>
                              )}
                            </div>
                          </div>
                          <Button type="primary" size="small">管理</Button>
                        </div>
                      </div>
                    ))}
                  </Space>
                </Card>
              </Col>

              <Col xs={24} lg={12}>
                <Card title="最近学生动态" style={{ height: '300px' }}>
                  <List
                    dataSource={mockData.recentStudents}
                    renderItem={student => (
                      <List.Item>
                        <List.Item.Meta
                          avatar={<Avatar icon={<UserOutlined />} />}
                          title={student.name}
                          description={
                            <div>
                              <div>课程: {student.course}</div>
                              <Tag color={
                                student.status === '优秀' ? 'green' : 
                                student.status === '良好' ? 'blue' : 'orange'
                              }>
                                {student.status}
                              </Tag>
                            </div>
                          }
                        />
                      </List.Item>
                    )}
                  />
                </Card>
              </Col>
            </Row>

            <Row gutter={[16, 16]} style={{ marginTop: '16px' }}>
              <Col xs={24}>
                <Card title="AI教学助手">
                  <Row gutter={[16, 16]}>
                    <Col xs={24} sm={8}>
                      <Card size="small" style={{ textAlign: 'center' }}>
                        <RocketOutlined style={{ fontSize: '32px', color: '#1890ff', marginBottom: '8px' }} />
                        <Title level={5}>智能批改</Title>
                        <Text type="secondary">AI辅助作业批改</Text>
                        <div style={{ marginTop: '8px' }}>
                          <Button type="primary" size="small">使用</Button>
                        </div>
                      </Card>
                    </Col>
                    <Col xs={24} sm={8}>
                      <Card size="small" style={{ textAlign: 'center' }}>
                        <TeamOutlined style={{ fontSize: '32px', color: '#52c41a', marginBottom: '8px' }} />
                        <Title level={5}>学生匹配</Title>
                        <Text type="secondary">智能师生匹配推荐</Text>
                        <div style={{ marginTop: '8px' }}>
                          <Button type="primary" size="small">查看</Button>
                        </div>
                      </Card>
                    </Col>
                    <Col xs={24} sm={8}>
                      <Card size="small" style={{ textAlign: 'center' }}>
                        <BookOutlined style={{ fontSize: '32px', color: '#fa8c16', marginBottom: '8px' }} />
                        <Title level={5}>教学分析</Title>
                        <Text type="secondary">课程效果分析报告</Text>
                        <div style={{ marginTop: '8px' }}>
                          <Button type="primary" size="small">生成</Button>
                        </div>
                      </Card>
                    </Col>
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

export default ProfessorDashboard;