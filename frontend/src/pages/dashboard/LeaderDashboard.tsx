import React from 'react';
import { Layout, Card, Typography, Button, Space, Row, Col, Avatar, Statistic, Progress, Divider } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts';
import {
  BarChartOutlined,
  TrophyOutlined,
  TeamOutlined,
  BookOutlined,
  RiseOutlined,
  FallOutlined,
  LogoutOutlined,
  BulbOutlined,
  AimOutlined,
  LineChartOutlined,
  FileTextOutlined,
  SettingOutlined
} from '@ant-design/icons';

const { Header, Content, Sider } = Layout;
const { Title, Text } = Typography;

const LeaderDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const mockData = {
    kpis: [
      { title: '整体教学质量', value: 92.5, target: 90, trend: 'up', change: '+2.3%' },
      { title: '学生满意度', value: 88.7, target: 85, trend: 'up', change: '+1.8%' },
      { title: '课程完成率', value: 94.2, target: 95, trend: 'down', change: '-0.5%' },
      { title: '师生比例', value: 12.5, target: 15, trend: 'up', change: '+0.8' }
    ],
    trends: [
      { period: '2024Q1', quality: 92.5, satisfaction: 88.7, completion: 94.2 },
      { period: '2023Q4', quality: 90.2, satisfaction: 86.9, completion: 94.7 },
      { period: '2023Q3', quality: 89.8, satisfaction: 85.1, completion: 93.8 }
    ],
    alerts: [
      { id: 1, type: 'warning', title: '课程参与度下降', description: '部分实验室轮转课程参与度较上月下降5%' },
      { id: 2, type: 'success', title: 'AI教学效果显著', description: 'AI辅助教学工具使用率提升30%，效果显著' },
      { id: 3, type: 'info', title: '新学期规划启动', description: '2024春季学期课程规划已启动，请关注进展' }
    ],
    departments: [
      { name: '机械设计', students: 45, courses: 8, quality: 91.2 },
      { name: '制造工程', students: 38, courses: 6, quality: 89.8 },
      { name: '自动化', students: 32, courses: 5, quality: 93.1 }
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
            <span style={{ fontSize: '18px', fontWeight: 600 }}>领导战略仪表板</span>
          </div>
          <Space>
            <Avatar style={{ backgroundColor: '#FF9800' }} icon={<BarChartOutlined />} />
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
                战略分析
              </Button>
              <Button type="text" icon={<AimOutlined />} block style={{ textAlign: 'left' }}>
                目标管理
              </Button>
              <Button type="text" icon={<FileTextOutlined />} block style={{ textAlign: 'left' }}>
                决策报告
              </Button>
              <Button type="text" icon={<SettingOutlined />} block style={{ textAlign: 'left' }}>
                系统治理
              </Button>
            </Space>
          </div>
        </Sider>

        <Content style={{ padding: '24px', background: '#f5f5f5' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <Title level={2} style={{ marginBottom: '24px' }}>
              战略决策中心 🎯
            </Title>

            {/* KPI Overview */}
            <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
              {mockData.kpis.map((kpi, index) => (
                <Col xs={24} sm={6} key={index}>
                  <Card size="small">
                    <Statistic
                      title={kpi.title}
                      value={kpi.value}
                      suffix={kpi.title.includes('比例') ? ':1' : (kpi.title.includes('率') || kpi.title.includes('度') ? '%' : '')}
                      valueStyle={{ 
                        color: kpi.value >= kpi.target ? '#3f8600' : '#cf1322',
                        fontSize: '20px'
                      }}
                    />
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px' }}>
                      <Space>
                        {kpi.trend === 'up' ? 
                          <RiseOutlined style={{ color: '#3f8600' }} /> : 
                          <FallOutlined style={{ color: '#cf1322' }} />
                        }
                        <Text style={{ 
                          color: kpi.trend === 'up' ? '#3f8600' : '#cf1322',
                          fontSize: '12px'
                        }}>
                          {kpi.change}
                        </Text>
                      </Space>
                      <Text type="secondary" style={{ fontSize: '12px' }}>
                        目标: {kpi.target}{kpi.title.includes('比例') ? ':1' : (kpi.title.includes('率') || kpi.title.includes('度') ? '%' : '')}
                      </Text>
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>

            {/* Alerts */}
            <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
              <Col xs={24}>
                <Card title="重要提醒" size="small">
                  <Row gutter={[8, 8]}>
                    {mockData.alerts.map(alert => (
                      <Col xs={24} sm={8} key={alert.id}>
                        <Card 
                          size="small" 
                          style={{ 
                            borderLeft: `4px solid ${
                              alert.type === 'warning' ? '#faad14' : 
                              alert.type === 'success' ? '#52c41a' : '#1890ff'
                            }`
                          }}
                        >
                          <Title level={5} style={{ marginBottom: '4px' }}>{alert.title}</Title>
                          <Text type="secondary" style={{ fontSize: '12px' }}>
                            {alert.description}
                          </Text>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                </Card>
              </Col>
            </Row>

            <Row gutter={[16, 16]}>
              <Col xs={24} lg={14}>
                <Card title="关键指标趋势" style={{ height: '350px' }}>
                  <div style={{ textAlign: 'center', paddingTop: '60px' }}>
                    <LineChartOutlined style={{ fontSize: '64px', color: '#d9d9d9' }} />
                    <div style={{ marginTop: '16px' }}>
                      <Text type="secondary">趋势图表将在此显示</Text>
                    </div>
                    <div style={{ marginTop: '32px' }}>
                      <Space>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <div style={{ width: '12px', height: '12px', backgroundColor: '#1890ff', marginRight: '8px' }}></div>
                          <Text style={{ fontSize: '12px' }}>教学质量</Text>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <div style={{ width: '12px', height: '12px', backgroundColor: '#52c41a', marginRight: '8px' }}></div>
                          <Text style={{ fontSize: '12px' }}>满意度</Text>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <div style={{ width: '12px', height: '12px', backgroundColor: '#faad14', marginRight: '8px' }}></div>
                          <Text style={{ fontSize: '12px' }}>完成率</Text>
                        </div>
                      </Space>
                    </div>
                  </div>
                </Card>
              </Col>

              <Col xs={24} lg={10}>
                <Card title="院系表现对比" style={{ height: '350px' }}>
                  <Space direction="vertical" style={{ width: '100%' }}>
                    {mockData.departments.map((dept, index) => (
                      <div key={index} style={{ padding: '12px', border: '1px solid #f0f0f0', borderRadius: '6px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                          <Text strong>{dept.name}</Text>
                          <Text style={{ 
                            color: dept.quality >= 90 ? '#52c41a' : dept.quality >= 85 ? '#faad14' : '#ff4d4f',
                            fontWeight: 'bold'
                          }}>
                            {dept.quality}%
                          </Text>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                          <Text type="secondary" style={{ fontSize: '12px' }}>
                            学生: {dept.students}人
                          </Text>
                          <Text type="secondary" style={{ fontSize: '12px' }}>
                            课程: {dept.courses}门
                          </Text>
                        </div>
                        <Progress 
                          percent={dept.quality} 
                          size="small" 
                          strokeColor={dept.quality >= 90 ? '#52c41a' : dept.quality >= 85 ? '#faad14' : '#ff4d4f'}
                          showInfo={false}
                        />
                      </div>
                    ))}
                  </Space>
                </Card>
              </Col>
            </Row>

            <Row gutter={[16, 16]} style={{ marginTop: '16px' }}>
              <Col xs={24}>
                <Card title="AI决策辅助工具">
                  <Row gutter={[16, 16]}>
                    <Col xs={24} sm={6}>
                      <Card size="small" style={{ textAlign: 'center' }}>
                        <BarChartOutlined style={{ fontSize: '32px', color: '#1890ff', marginBottom: '8px' }} />
                        <Title level={5}>数据分析</Title>
                        <Text type="secondary">全局数据深度分析</Text>
                        <div style={{ marginTop: '8px' }}>
                          <Button type="primary" size="small">分析</Button>
                        </div>
                      </Card>
                    </Col>
                    <Col xs={24} sm={6}>
                      <Card size="small" style={{ textAlign: 'center' }}>
                        <FileTextOutlined style={{ fontSize: '32px', color: '#52c41a', marginBottom: '8px' }} />
                        <Title level={5}>战略报告</Title>
                        <Text type="secondary">AI生成决策报告</Text>
                        <div style={{ marginTop: '8px' }}>
                          <Button type="primary" size="small">生成</Button>
                        </div>
                      </Card>
                    </Col>
                    <Col xs={24} sm={6}>
                      <Card size="small" style={{ textAlign: 'center' }}>
                        <AimOutlined style={{ fontSize: '32px', color: '#fa8c16', marginBottom: '8px' }} />
                        <Title level={5}>目标规划</Title>
                        <Text type="secondary">智能目标制定建议</Text>
                        <div style={{ marginTop: '8px' }}>
                          <Button type="primary" size="small">规划</Button>
                        </div>
                      </Card>
                    </Col>
                    <Col xs={24} sm={6}>
                      <Card size="small" style={{ textAlign: 'center' }}>
                        <TrophyOutlined style={{ fontSize: '32px', color: '#eb2f96', marginBottom: '8px' }} />
                        <Title level={5}>优化建议</Title>
                        <Text type="secondary">系统优化改进建议</Text>
                        <div style={{ marginTop: '8px' }}>
                          <Button type="primary" size="small">查看</Button>
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

export default LeaderDashboard;