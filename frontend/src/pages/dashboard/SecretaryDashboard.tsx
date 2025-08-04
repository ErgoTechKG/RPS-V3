import React from 'react';
import { Layout, Card, Typography, Button, Space, Row, Col, Avatar, Statistic, Progress, Alert } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts';
import {
  SolutionOutlined,
  BarChartOutlined,
  DatabaseOutlined,
  FileTextOutlined,
  SettingOutlined,
  LogoutOutlined,
  BulbOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  SyncOutlined
} from '@ant-design/icons';

const { Header, Content, Sider } = Layout;
const { Title, Text } = Typography;

const SecretaryDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const mockData = {
    systemStats: [
      { title: '总用户数', value: 156, trend: '+12' },
      { title: '活跃课程', value: 23, trend: '+3' },
      { title: '待审核申请', value: 8, trend: '-2' },
      { title: '数据同步率', value: 98.5, trend: '+0.3%' }
    ],
    recentTasks: [
      { id: 1, title: '用户权限审核', status: 'pending', priority: 'high' },
      { id: 2, title: '课程数据同步', status: 'processing', priority: 'medium' },
      { id: 3, title: '月度报告生成', status: 'completed', priority: 'low' },
      { id: 4, title: '系统维护检查', status: 'pending', priority: 'high' }
    ],
    dataSync: {
      courses: { status: 'success', lastSync: '2024-03-01 10:30', progress: 100 },
      users: { status: 'syncing', lastSync: '2024-03-01 10:15', progress: 75 },
      grades: { status: 'error', lastSync: '2024-03-01 09:45', progress: 0 }
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return '#52c41a';
      case 'processing': return '#1890ff';
      case 'pending': return '#faad14';
      default: return '#d9d9d9';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return '#ff4d4f';
      case 'medium': return '#faad14';
      case 'low': return '#52c41a';
      default: return '#d9d9d9';
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ background: '#fff', padding: '0 24px', borderBottom: '1px solid #f0f0f0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <BulbOutlined style={{ fontSize: '24px', color: '#1890ff', marginRight: '12px' }} />
            <span style={{ fontSize: '18px', fontWeight: 600 }}>秘书监控仪表板</span>
          </div>
          <Space>
            <Avatar style={{ backgroundColor: '#7C4DFF' }} icon={<SolutionOutlined />} />
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
              <Button type="text" icon={<BarChartOutlined />} block style={{ textAlign: 'left' }}>
                系统监控
              </Button>
              <Button type="text" icon={<DatabaseOutlined />} block style={{ textAlign: 'left' }}>
                数据管理
              </Button>
              <Button type="text" icon={<FileTextOutlined />} block style={{ textAlign: 'left' }}>
                报告生成
              </Button>
              <Button type="text" icon={<SettingOutlined />} block style={{ textAlign: 'left' }}>
                系统设置
              </Button>
            </Space>
          </div>
        </Sider>

        <Content style={{ padding: '24px', background: '#f5f5f5' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <Title level={2} style={{ marginBottom: '24px' }}>
              系统监控总览 📊
            </Title>

            {/* System Status Alert */}
            <Alert
              message="系统运行状态良好"
              description="所有核心服务正常运行，数据同步进行中"
              type="success"
              showIcon
              style={{ marginBottom: '24px' }}
            />

            <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
              {mockData.systemStats.map((stat, index) => (
                <Col xs={24} sm={6} key={index}>
                  <Card size="small">
                    <Statistic
                      title={stat.title}
                      value={stat.value}
                      suffix={stat.title.includes('率') ? '%' : ''}
                      valueStyle={{ 
                        color: stat.title.includes('待审核') && stat.value > 0 ? '#ff4d4f' : '#3f8600' 
                      }}
                    />
                    <Text type="secondary" style={{ fontSize: '12px' }}>
                      {stat.trend.startsWith('+') ? '↗' : '↘'} {stat.trend}
                    </Text>
                  </Card>
                </Col>
              ))}
            </Row>

            <Row gutter={[16, 16]}>
              <Col xs={24} lg={12}>
                <Card title="数据同步状态" style={{ height: '300px' }}>
                  <Space direction="vertical" style={{ width: '100%' }}>
                    {Object.entries(mockData.dataSync).map(([key, data]) => (
                      <div key={key} style={{ padding: '12px', border: '1px solid #f0f0f0', borderRadius: '6px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                          <Text strong>
                            {key === 'courses' ? '课程数据' : key === 'users' ? '用户数据' : '成绩数据'}
                          </Text>
                          {data.status === 'success' && <CheckCircleOutlined style={{ color: '#52c41a' }} />}
                          {data.status === 'syncing' && <SyncOutlined spin style={{ color: '#1890ff' }} />}
                          {data.status === 'error' && <ExclamationCircleOutlined style={{ color: '#ff4d4f' }} />}
                        </div>
                        <Progress 
                          percent={data.progress} 
                          size="small" 
                          status={data.status === 'error' ? 'exception' : data.status === 'syncing' ? 'active' : 'success'}
                        />
                        <Text type="secondary" style={{ fontSize: '12px' }}>
                          最后同步: {data.lastSync}
                        </Text>
                      </div>
                    ))}
                  </Space>
                </Card>
              </Col>

              <Col xs={24} lg={12}>
                <Card title="待处理任务" style={{ height: '300px' }}>
                  <Space direction="vertical" style={{ width: '100%' }}>
                    {mockData.recentTasks.map(task => (
                      <div key={task.id} style={{ 
                        padding: '12px', 
                        border: '1px solid #f0f0f0', 
                        borderRadius: '6px',
                        borderLeft: `4px solid ${getPriorityColor(task.priority)}`
                      }}>
                        <div style={{ display: 'flex', justifyContent: 'between', alignItems: 'center' }}>
                          <div style={{ flex: 1 }}>
                            <Text strong>{task.title}</Text>
                            <div style={{ marginTop: '4px' }}>
                              <Space>
                                <span style={{ 
                                  padding: '2px 8px', 
                                  borderRadius: '4px', 
                                  backgroundColor: getStatusColor(task.status),
                                  color: 'white',
                                  fontSize: '12px'
                                }}>
                                  {task.status === 'completed' ? '已完成' : 
                                   task.status === 'processing' ? '处理中' : '待处理'}
                                </span>
                                <span style={{ 
                                  padding: '2px 8px', 
                                  borderRadius: '4px', 
                                  backgroundColor: getPriorityColor(task.priority),
                                  color: 'white',
                                  fontSize: '12px'
                                }}>
                                  {task.priority === 'high' ? '高优先级' : 
                                   task.priority === 'medium' ? '中优先级' : '低优先级'}
                                </span>
                              </Space>
                            </div>
                          </div>
                          {task.status === 'pending' && (
                            <Button type="primary" size="small">处理</Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </Space>
                </Card>
              </Col>
            </Row>

            <Row gutter={[16, 16]} style={{ marginTop: '16px' }}>
              <Col xs={24}>
                <Card title="快速操作">
                  <Row gutter={[16, 16]}>
                    <Col xs={24} sm={6}>
                      <Card size="small" style={{ textAlign: 'center' }}>
                        <DatabaseOutlined style={{ fontSize: '32px', color: '#1890ff', marginBottom: '8px' }} />
                        <Title level={5}>数据备份</Title>
                        <Text type="secondary">执行系统数据备份</Text>
                        <div style={{ marginTop: '8px' }}>
                          <Button type="primary" size="small">开始备份</Button>
                        </div>
                      </Card>
                    </Col>
                    <Col xs={24} sm={6}>
                      <Card size="small" style={{ textAlign: 'center' }}>
                        <FileTextOutlined style={{ fontSize: '32px', color: '#52c41a', marginBottom: '8px' }} />
                        <Title level={5}>生成报告</Title>
                        <Text type="secondary">生成系统运行报告</Text>
                        <div style={{ marginTop: '8px' }}>
                          <Button type="primary" size="small">生成</Button>
                        </div>
                      </Card>
                    </Col>
                    <Col xs={24} sm={6}>
                      <Card size="small" style={{ textAlign: 'center' }}>
                        <SettingOutlined style={{ fontSize: '32px', color: '#fa8c16', marginBottom: '8px' }} />
                        <Title level={5}>系统配置</Title>
                        <Text type="secondary">管理系统配置参数</Text>
                        <div style={{ marginTop: '8px' }}>
                          <Button type="primary" size="small">配置</Button>
                        </div>
                      </Card>
                    </Col>
                    <Col xs={24} sm={6}>
                      <Card size="small" style={{ textAlign: 'center' }}>
                        <SolutionOutlined style={{ fontSize: '32px', color: '#eb2f96', marginBottom: '8px' }} />
                        <Title level={5}>用户管理</Title>
                        <Text type="secondary">管理用户权限和角色</Text>
                        <div style={{ marginTop: '8px' }}>
                          <Button type="primary" size="small">管理</Button>
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

export default SecretaryDashboard;