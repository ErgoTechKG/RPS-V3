import React, { useState, useEffect } from 'react';
import { 
  Layout, Card, Typography, Button, Space, Row, Col, Avatar, Statistic, 
  Progress, Divider, Select, Tag, Tooltip, Badge, notification, Dropdown, Menu 
} from 'antd';
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
  SettingOutlined,
  ExportOutlined,
  SyncOutlined,
  CalendarOutlined,
  DashboardOutlined,
  AreaChartOutlined,
  PieChartOutlined,
  FundProjectionScreenOutlined,
  UserOutlined,
  RightOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  MinusOutlined,
  GlobalOutlined,
  BookFilled,
  BellOutlined,
  InfoCircleOutlined,
  CheckCircleOutlined,
  WarningOutlined,
  CloseCircleOutlined
} from '@ant-design/icons';

const { Header, Content } = Layout;
const { Title, Text, Paragraph } = Typography;
const { Option } = Select;

// 自定义环形进度组件
const CircularProgress: React.FC<{ percent: number; title: string }> = ({ percent, title }) => {
  return (
    <div style={{ textAlign: 'center' }}>
      <Progress
        type="circle"
        percent={percent}
        width={120}
        strokeColor={{
          '0%': '#108ee9',
          '100%': '#87d068',
        }}
        format={(percent) => (
          <div>
            <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{percent}%</div>
            <div style={{ fontSize: '12px', color: '#666' }}>{title}</div>
          </div>
        )}
      />
    </div>
  );
};

// 迷你柱状图组件
const MiniBarChart: React.FC<{ data: number[]; color: string }> = ({ data, color }) => {
  const maxValue = Math.max(...data);
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', height: '40px', gap: '4px' }}>
      {data.map((value, index) => (
        <div
          key={index}
          style={{
            width: '8px',
            height: `${(value / maxValue) * 40}px`,
            backgroundColor: color,
            borderRadius: '2px',
          }}
        />
      ))}
    </div>
  );
};

const LeaderDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [selectedTimeRange, setSelectedTimeRange] = useState('2024 Q1');
  const [refreshing, setRefreshing] = useState(false);

  // 模拟数据刷新
  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      notification.success({
        message: '数据已更新',
        description: '所有指标已刷新至最新状态',
      });
    }, 1500);
  };

  const mockData = {
    kpis: [
      { 
        title: '学生满意度', 
        value: 92.5, 
        target: 90, 
        trend: 'up', 
        change: 3.2,
        icon: <UserOutlined />,
        color: '#52c41a',
        details: {
          course: 94.2,
          service: 91.8,
          environment: 91.5
        }
      },
      { 
        title: '教师参与度', 
        value: 87.3, 
        target: 85, 
        trend: 'stable', 
        change: 0,
        icon: <TeamOutlined />,
        color: '#1890ff',
        isPercent: true,
        ringChart: true
      },
      { 
        title: '课程完成率', 
        value: 78.6, 
        target: 80, 
        trend: 'up', 
        change: 2.1,
        icon: <BookFilled />,
        color: '#fa8c16',
        barChart: true,
        barData: [65, 70, 72, 75, 78.6]
      }
    ],
    strategicGoals: [
      { 
        id: 1, 
        name: '培养创新人才', 
        progress: 85, 
        status: 'on-track',
        metrics: {
          researchClass: 120,
          innovationProjects: 45,
          studentAwards: 32,
          employmentQuality: 92
        }
      },
      { 
        id: 2, 
        name: '提升教学质量', 
        progress: 65, 
        status: 'at-risk',
        metrics: {
          teachingScore: 88,
          curriculumOptimization: 60,
          facultyDevelopment: 70,
          facilityImprovement: 65
        }
      },
      { 
        id: 3, 
        name: '国际化发展', 
        progress: 40, 
        status: 'behind',
        metrics: {
          internationalProjects: 15,
          internationalStudents: 85,
          facultyExchange: 12,
          bilingualCourses: 8
        }
      },
      { 
        id: 4, 
        name: '产学研结合', 
        progress: 72, 
        status: 'on-track',
        metrics: {
          industryProjects: 28,
          techTransfer: 18,
          internshipBases: 35,
          commercialization: 12
        }
      }
    ],
    aiSuggestions: [
      {
        id: 1,
        icon: '📊',
        title: '优化课程结构',
        description: '基于学生反馈和就业数据分析',
        details: [
          '建议增加实践课程比重至40%',
          '推荐新增人工智能基础课程',
          '优化课程时间安排，减少冲突'
        ],
        impact: '预计提升学生满意度5-8%',
        priority: 'high'
      },
      {
        id: 2,
        icon: '👥',
        title: '加强师资培训',
        description: '基于教学质量评估结果',
        details: [
          '识别需要培训的教师群体',
          '制定个性化培训计划',
          '引入国际先进教学方法'
        ],
        impact: '预计提升教学质量10%',
        priority: 'medium'
      },
      {
        id: 3,
        icon: '🎯',
        title: '聚焦重点项目',
        description: '基于资源分配效率分析',
        details: [
          '识别高价值科研项目',
          '优化资源配置策略',
          '建立项目评估机制'
        ],
        impact: 'ROI提升预计20%',
        priority: 'high'
      }
    ],
    alerts: [
      { id: 1, type: 'error', title: '国际化进展缓慢', description: '国际合作项目进度落后于年度目标' },
      { id: 2, type: 'warning', title: '教学质量波动', description: '部分核心课程评分下降需关注' },
      { id: 3, type: 'success', title: '科研成果突破', description: '本季度专利申请数量创历史新高' },
      { id: 4, type: 'info', title: '预算执行正常', description: '当前预算执行率78%，符合预期' }
    ]
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'error':
        return <CloseCircleOutlined style={{ color: '#ff4d4f' }} />;
      case 'warning':
        return <WarningOutlined style={{ color: '#faad14' }} />;
      case 'success':
        return <CheckCircleOutlined style={{ color: '#52c41a' }} />;
      default:
        return <InfoCircleOutlined style={{ color: '#1890ff' }} />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'on-track':
        return '#52c41a';
      case 'at-risk':
        return '#faad14';
      case 'behind':
        return '#ff4d4f';
      default:
        return '#1890ff';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'on-track':
        return '进展顺利';
      case 'at-risk':
        return '需要关注';
      case 'behind':
        return '进度落后';
      default:
        return '进行中';
    }
  };

  const exportMenu = (
    <Menu>
      <Menu.Item key="pdf" icon={<FileTextOutlined />}>
        导出PDF报告
      </Menu.Item>
      <Menu.Item key="excel" icon={<BarChartOutlined />}>
        导出Excel数据
      </Menu.Item>
      <Menu.Item key="ppt" icon={<FundProjectionScreenOutlined />}>
        生成汇报PPT
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout style={{ minHeight: '100vh', background: '#f0f2f5' }}>
      <Header style={{ 
        background: '#fff', 
        padding: '0 24px', 
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '64px' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img src="/logo.png" alt="学院标识" style={{ height: '32px', marginRight: '16px' }} />
            <Divider type="vertical" style={{ height: '24px', margin: '0 16px' }} />
            <Space size="large">
              <Text strong style={{ fontSize: '16px' }}>{user?.name}</Text>
              <Tag color="gold">院长</Tag>
            </Space>
          </div>
          
          <Space size="middle">
            <Button type="link" icon={<DashboardOutlined />}>总览</Button>
            <Button type="link" icon={<BookOutlined />}>课程</Button>
            <Button type="link" icon={<BarChartOutlined />}>数据</Button>
            <Button type="link" icon={<FileTextOutlined />}>报告</Button>
            <Divider type="vertical" style={{ height: '24px' }} />
            <Select 
              value={selectedTimeRange} 
              onChange={setSelectedTimeRange}
              style={{ width: 120 }}
              suffixIcon={<CalendarOutlined />}
            >
              <Option value="2024 Q1">2024 Q1</Option>
              <Option value="2023 Q4">2023 Q4</Option>
              <Option value="2023 Q3">2023 Q3</Option>
              <Option value="2023 全年">2023 全年</Option>
            </Select>
            <Button 
              icon={<SyncOutlined spin={refreshing} />} 
              onClick={handleRefresh}
              loading={refreshing}
            >
              刷新
            </Button>
            <Dropdown overlay={exportMenu} placement="bottomRight">
              <Button icon={<ExportOutlined />}>导出</Button>
            </Dropdown>
            <Badge count={5} offset={[-5, 5]}>
              <Button type="text" icon={<BellOutlined />} />
            </Badge>
            <Button type="text" icon={<LogoutOutlined />} onClick={handleLogout}>
              退出
            </Button>
          </Space>
        </div>
      </Header>

      <Content style={{ padding: '24px', maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
        {/* 页面标题 */}
        <div style={{ marginBottom: '24px' }}>
          <Title level={2} style={{ marginBottom: '8px' }}>
            学院战略决策仪表板
          </Title>
          <Text type="secondary">实时掌握学院运行状态，数据驱动战略决策</Text>
        </div>

        {/* 关键业绩指标 */}
        <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
          {mockData.kpis.map((kpi, index) => (
            <Col xs={24} sm={12} lg={8} key={index}>
              <Card 
                hoverable
                style={{ height: '100%' }}
                bodyStyle={{ padding: '24px' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ flex: 1 }}>
                    <Space align="center" style={{ marginBottom: '12px' }}>
                      <Avatar 
                        icon={kpi.icon} 
                        style={{ backgroundColor: kpi.color }}
                        size={40}
                      />
                      <Text strong style={{ fontSize: '16px' }}>{kpi.title}</Text>
                    </Space>
                    
                    <div style={{ marginBottom: '16px' }}>
                      <span style={{ fontSize: '36px', fontWeight: 'bold', color: '#1A365D' }}>
                        {kpi.value}%
                      </span>
                      <span style={{ 
                        marginLeft: '12px',
                        fontSize: '14px',
                        color: kpi.trend === 'up' ? '#52c41a' : kpi.trend === 'down' ? '#ff4d4f' : '#666'
                      }}>
                        {kpi.trend === 'up' && <ArrowUpOutlined />}
                        {kpi.trend === 'down' && <ArrowDownOutlined />}
                        {kpi.trend === 'stable' && <MinusOutlined />}
                        {kpi.change > 0 ? '+' : ''}{kpi.change}%
                      </span>
                    </div>

                    {kpi.ringChart && (
                      <CircularProgress percent={kpi.value} title="" />
                    )}

                    {kpi.barChart && kpi.barData && (
                      <div>
                        <MiniBarChart data={kpi.barData} color={kpi.color} />
                        <Text type="secondary" style={{ fontSize: '12px' }}>
                          近5个季度趋势
                        </Text>
                      </div>
                    )}

                    <Progress 
                      percent={(kpi.value / kpi.target) * 100} 
                      showInfo={false}
                      strokeColor={kpi.color}
                      style={{ marginBottom: '8px' }}
                    />
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Text type="secondary" style={{ fontSize: '12px' }}>
                        与上期对比: {kpi.change > 0 ? '+' : ''}{kpi.change}%
                      </Text>
                      <Text type="secondary" style={{ fontSize: '12px' }}>
                        目标: {kpi.target}%
                      </Text>
                    </div>

                    {kpi.details && (
                      <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid #f0f0f0' }}>
                        <Text type="secondary" style={{ fontSize: '12px' }}>细分维度</Text>
                        <div style={{ marginTop: '8px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                            <Text style={{ fontSize: '12px' }}>课程满意度</Text>
                            <Text style={{ fontSize: '12px', color: '#52c41a' }}>{kpi.details.course}%</Text>
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                            <Text style={{ fontSize: '12px' }}>服务满意度</Text>
                            <Text style={{ fontSize: '12px', color: '#1890ff' }}>{kpi.details.service}%</Text>
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Text style={{ fontSize: '12px' }}>环境满意度</Text>
                            <Text style={{ fontSize: '12px', color: '#fa8c16' }}>{kpi.details.environment}%</Text>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            </Col>
          ))}
        </Row>

        {/* 战略目标追踪和智能决策建议 */}
        <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
          <Col xs={24} lg={14}>
            <Card 
              title={
                <Space>
                  <AimOutlined style={{ color: '#1A365D' }} />
                  <span>战略目标追踪</span>
                </Space>
              }
              extra={
                <Button type="link" icon={<SettingOutlined />}>
                  目标管理
                </Button>
              }
              style={{ height: '100%' }}
            >
              <Space direction="vertical" style={{ width: '100%' }} size="middle">
                {mockData.strategicGoals.map((goal) => (
                  <div key={goal.id} style={{ 
                    padding: '16px',
                    background: '#fafafa',
                    borderRadius: '8px',
                    border: `1px solid ${getStatusColor(goal.status)}20`
                  }}>
                    <div style={{ marginBottom: '12px' }}>
                      <Space style={{ width: '100%', justifyContent: 'space-between' }}>
                        <Text strong style={{ fontSize: '16px' }}>{goal.name}</Text>
                        <Tag color={getStatusColor(goal.status)}>
                          {getStatusText(goal.status)}
                        </Tag>
                      </Space>
                    </div>
                    
                    <Progress 
                      percent={goal.progress} 
                      strokeColor={getStatusColor(goal.status)}
                      style={{ marginBottom: '12px' }}
                    />
                    
                    <Row gutter={[16, 8]}>
                      {Object.entries(goal.metrics).map(([key, value]) => (
                        <Col span={12} key={key}>
                          <Text type="secondary" style={{ fontSize: '12px' }}>
                            {key === 'researchClass' && '科研实验班'}
                            {key === 'innovationProjects' && '创新项目'}
                            {key === 'studentAwards' && '学生获奖'}
                            {key === 'employmentQuality' && '就业质量'}
                            {key === 'teachingScore' && '教学评分'}
                            {key === 'curriculumOptimization' && '课程优化'}
                            {key === 'facultyDevelopment' && '师资建设'}
                            {key === 'facilityImprovement' && '设施改善'}
                            {key === 'internationalProjects' && '国际项目'}
                            {key === 'internationalStudents' && '留学生'}
                            {key === 'facultyExchange' && '教师交流'}
                            {key === 'bilingualCourses' && '双语课程'}
                            {key === 'industryProjects' && '企业项目'}
                            {key === 'techTransfer' && '技术转化'}
                            {key === 'internshipBases' && '实习基地'}
                            {key === 'commercialization' && '产业化'}
                            : <Text strong style={{ fontSize: '14px', marginLeft: '4px' }}>{value}</Text>
                          </Text>
                        </Col>
                      ))}
                    </Row>
                  </div>
                ))}
              </Space>
            </Card>
          </Col>

          <Col xs={24} lg={10}>
            <Card 
              title={
                <Space>
                  <BulbOutlined style={{ color: '#D69E2E' }} />
                  <span>智能决策建议</span>
                </Space>
              }
              extra={
                <Button type="link">查看全部</Button>
              }
              style={{ height: '100%' }}
            >
              <Space direction="vertical" style={{ width: '100%' }} size="middle">
                {mockData.aiSuggestions.map((suggestion) => (
                  <Card 
                    key={suggestion.id}
                    size="small"
                    style={{ 
                      borderLeft: `4px solid ${suggestion.priority === 'high' ? '#ff4d4f' : '#faad14'}` 
                    }}
                    hoverable
                  >
                    <Space align="start">
                      <span style={{ fontSize: '24px' }}>{suggestion.icon}</span>
                      <div style={{ flex: 1 }}>
                        <Title level={5} style={{ marginBottom: '4px' }}>
                          {suggestion.title}
                        </Title>
                        <Text type="secondary" style={{ fontSize: '12px', display: 'block', marginBottom: '8px' }}>
                          {suggestion.description}
                        </Text>
                        <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '12px' }}>
                          {suggestion.details.map((detail, idx) => (
                            <li key={idx} style={{ marginBottom: '4px' }}>
                              <Text>{detail}</Text>
                            </li>
                          ))}
                        </ul>
                        <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px solid #f0f0f0' }}>
                          <Text strong style={{ fontSize: '12px', color: '#52c41a' }}>
                            预期效果: {suggestion.impact}
                          </Text>
                        </div>
                      </div>
                    </Space>
                  </Card>
                ))}
              </Space>
            </Card>
          </Col>
        </Row>

        {/* 预警信息 */}
        <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
          <Col span={24}>
            <Card 
              title={
                <Space>
                  <WarningOutlined style={{ color: '#ff4d4f' }} />
                  <span>预警信息</span>
                  <Badge count={mockData.alerts.length} style={{ backgroundColor: '#ff4d4f' }} />
                </Space>
              }
              bodyStyle={{ padding: '12px' }}
            >
              <Row gutter={[12, 12]}>
                {mockData.alerts.map((alert) => (
                  <Col xs={24} sm={12} lg={6} key={alert.id}>
                    <Card 
                      size="small"
                      hoverable
                      style={{ 
                        borderTop: `3px solid ${
                          alert.type === 'error' ? '#ff4d4f' : 
                          alert.type === 'warning' ? '#faad14' : 
                          alert.type === 'success' ? '#52c41a' : '#1890ff'
                        }` 
                      }}
                    >
                      <Space align="start">
                        {getAlertIcon(alert.type)}
                        <div>
                          <Text strong style={{ display: 'block', marginBottom: '4px' }}>
                            {alert.title}
                          </Text>
                          <Text type="secondary" style={{ fontSize: '12px' }}>
                            {alert.description}
                          </Text>
                        </div>
                      </Space>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Card>
          </Col>
        </Row>

        {/* 分析工具栏 */}
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Card>
              <Row gutter={[16, 16]}>
                <Col xs={24} sm={12} md={6}>
                  <Card 
                    hoverable
                    style={{ textAlign: 'center', cursor: 'pointer' }}
                    onClick={() => notification.info({ message: '趋势分析', description: '功能开发中...' })}
                  >
                    <LineChartOutlined style={{ fontSize: '36px', color: '#1890ff', marginBottom: '12px' }} />
                    <Title level={5}>趋势分析</Title>
                    <Text type="secondary">历史数据趋势和预测</Text>
                  </Card>
                </Col>
                <Col xs={24} sm={12} md={6}>
                  <Card 
                    hoverable
                    style={{ textAlign: 'center', cursor: 'pointer' }}
                    onClick={() => notification.info({ message: '对比分析', description: '功能开发中...' })}
                  >
                    <AreaChartOutlined style={{ fontSize: '36px', color: '#52c41a', marginBottom: '12px' }} />
                    <Title level={5}>对比分析</Title>
                    <Text type="secondary">同期对比和标杆对比</Text>
                  </Card>
                </Col>
                <Col xs={24} sm={12} md={6}>
                  <Card 
                    hoverable
                    style={{ textAlign: 'center', cursor: 'pointer' }}
                    onClick={() => notification.info({ message: '预测分析', description: '功能开发中...' })}
                  >
                    <AimOutlined style={{ fontSize: '36px', color: '#fa8c16', marginBottom: '12px' }} />
                    <Title level={5}>预测分析</Title>
                    <Text type="secondary">未来发展趋势预测</Text>
                  </Card>
                </Col>
                <Col xs={24} sm={12} md={6}>
                  <Card 
                    hoverable
                    style={{ textAlign: 'center', cursor: 'pointer' }}
                    onClick={() => notification.info({ message: '报告中心', description: '功能开发中...' })}
                  >
                    <FileTextOutlined style={{ fontSize: '36px', color: '#722ed1', marginBottom: '12px' }} />
                    <Title level={5}>报告中心</Title>
                    <Text type="secondary">各类报告和文档管理</Text>
                  </Card>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default LeaderDashboard;