import React, { useState } from 'react';
import { 
  Layout, Card, Typography, Button, Space, Row, Col, Avatar, List, Tag, 
  Statistic, Progress, Timeline, Select, Breadcrumb, Menu
} from 'antd';
import { useNavigate } from 'react-router-dom';
import { useAuth, useNotifications } from '@/contexts';
import TopNav from '@/components/Navigation/TopNav';
import type { MenuProps } from 'antd';
import {
  TeamOutlined,
  BookOutlined,
  UserOutlined,
  RocketOutlined,
  LogoutOutlined,
  BulbOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  EditOutlined,
  ExportOutlined,
  SearchOutlined,
  CalendarOutlined,
  BarChartOutlined,
  HomeOutlined,
  AlertOutlined,
  TrophyOutlined,
  LineChartOutlined,
  FileTextOutlined,
  VideoCameraOutlined,
  StarOutlined
} from '@ant-design/icons';

const { Content, Sider } = Layout;
const { Title, Text, Paragraph } = Typography;
const { Option } = Select;

const ProfessorDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [selectedCourse, setSelectedCourse] = useState('all');

  // Mock data matching story requirements
  const mockData = {
    quickActions: [
      {
        id: 1,
        title: '发布新课题',
        icon: <EditOutlined />,
        color: '#1A73E8',
        description: '创建并发布新的课程课题',
        action: () => navigate('/professor/lab-rotation/topics')
      },
      {
        id: 2,
        title: '批量评分',
        icon: <CheckCircleOutlined />,
        color: '#52c41a',
        description: '批量处理学生作业评分',
        pendingCount: 12,
        action: () => console.log('批量评分')
      },
      {
        id: 3,
        title: '导出数据',
        icon: <ExportOutlined />,
        color: '#fa8c16',
        description: '导出学生成绩和统计数据',
        action: () => console.log('导出数据')
      },
      {
        id: 4,
        title: 'AI检测',
        icon: <SearchOutlined />,
        color: '#7c4dff',
        description: '作业抄袭和AI生成内容检测',
        action: () => console.log('AI检测')
      }
    ],
    pendingTasks: [
      {
        id: 1,
        title: '学生申请审核',
        count: 5,
        type: 'review',
        icon: <UserOutlined />,
        deadline: '今天 18:00',
        priority: 'high',
        description: '5名学生申请加入实验室轮转课程'
      },
      {
        id: 2,
        title: '作业批改',
        count: 12,
        type: 'grade',
        icon: <FileTextOutlined />,
        deadline: '明天 12:00',
        priority: 'medium',
        description: '机器学习基础课程第3次作业待批改'
      },
      {
        id: 3,
        title: '面试安排',
        count: 3,
        type: 'interview',
        icon: <CalendarOutlined />,
        deadline: '后天 16:00',
        priority: 'medium',
        description: '3名学生申请面试，需安排具体时间'
      },
      {
        id: 4,
        title: '课程反馈',
        count: 2,
        type: 'feedback',
        icon: <StarOutlined />,
        deadline: '本周五',
        priority: 'low',
        description: '处理学生课程评价和建议反馈'
      }
    ],
    courses: [
      {
        id: 1,
        name: '机器学习基础',
        code: 'CS301',
        students: 25,
        pending: 3,
        status: 'active',
        progress: 65,
        currentPhase: '实验阶段',
        nextMilestone: '期中考试',
        satisfaction: 4.2
      },
      {
        id: 2,
        name: '实验室轮转指导',
        code: 'CS401',
        students: 8,
        pending: 1,
        status: 'active',
        progress: 40,
        currentPhase: '项目启动',
        nextMilestone: '中期汇报',
        satisfaction: 4.5
      },
      {
        id: 3,
        name: '深度学习应用',
        code: 'CS402',
        students: 15,
        pending: 0,
        status: 'planning',
        progress: 20,
        currentPhase: '课程准备',
        nextMilestone: '开课',
        satisfaction: null
      }
    ],
    statistics: {
      totalStudents: 48,
      activeCourses: 2,
      avgSatisfaction: 4.35,
      completionRate: 85,
      studentDistribution: {
        excellent: 15, // 优秀 31%
        good: 20,      // 良好 42%
        attention: 13  // 需关注 27%
      }
    },
    weeklyEvents: [
      {
        date: '2024-03-15',
        time: '10:00',
        title: '实验室轮转课程答辩',
        type: 'defense',
        participants: 8
      },
      {
        date: '2024-03-16',
        time: '14:00',
        title: '机器学习基础期中考试',
        type: 'exam',
        participants: 25
      },
      {
        date: '2024-03-18',
        time: '16:00',
        title: '新生面试安排',
        type: 'interview',
        participants: 3
      }
    ]
  };

  // Top navigation menu items
  const topMenuItems: MenuProps['items'] = [
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
    // Handle navigation based on menu key
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return '#ff4d4f';
      case 'medium': return '#fa8c16';
      case 'low': return '#52c41a';
      default: return '#d9d9d9';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case '优秀': return 'green';
      case '良好': return 'blue';
      case '需关注': return 'orange';
      case 'active': return 'green';
      case 'planning': return 'blue';
      default: return 'default';
    }
  };

  return (
    <Layout style={{ minHeight: '100vh', background: '#f5f5f5' }}>
      {/* Top Navigation */}
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

      {/* Breadcrumb */}
      <div style={{ background: '#fff', padding: '12px 24px', borderBottom: '1px solid #f0f0f0' }}>
        <Breadcrumb>
          <Breadcrumb.Item>
            <HomeOutlined />
            <span>首页</span>
          </Breadcrumb.Item>
          <Breadcrumb.Item>教授工作台</Breadcrumb.Item>
        </Breadcrumb>
      </div>

      <Layout>
        {/* Left Sidebar - Quick Actions */}
        <Sider width={250} style={{ background: '#fff', borderRight: '1px solid #f0f0f0' }}>
          <div style={{ padding: '24px 16px' }}>
            <Title level={5} style={{ marginBottom: '16px', color: '#1A73E8' }}>快捷操作</Title>
            
            <Space direction="vertical" style={{ width: '100%' }} size={16}>
              {mockData.quickActions.map(action => (
                <Card 
                  key={action.id}
                  size="small" 
                  hoverable
                  onClick={action.action}
                  style={{ 
                    cursor: 'pointer',
                    border: `1px solid ${action.color}20`,
                    background: `${action.color}08`
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                    <div style={{ 
                      padding: '8px', 
                      background: action.color, 
                      borderRadius: '6px',
                      color: '#fff',
                      fontSize: '16px'
                    }}>
                      {action.icon}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <Text strong style={{ display: 'block', marginBottom: '4px' }}>
                        {action.title}
                      </Text>
                      <Text type="secondary" style={{ fontSize: '12px', lineHeight: '16px' }}>
                        {action.description}
                      </Text>
                      {action.pendingCount && (
                        <Tag 
                          color="orange" 
                          style={{ marginTop: '6px', padding: '2px 6px', fontSize: '11px' }}
                        >
                          {action.pendingCount}个待处理
                        </Tag>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </Space>
          </div>
        </Sider>

        {/* Main Content Area */}
        <Content style={{ padding: '24px', background: '#f5f5f5' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            {/* Welcome Header */}
            <div style={{ marginBottom: '24px' }}>
              <Title level={2} style={{ marginBottom: '8px', color: '#1A73E8' }}>
                欢迎回来，{user?.name} 教授 👨‍🏫
              </Title>
              <Text type="secondary">今天是 {new Date().toLocaleDateString('zh-CN', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric',
                weekday: 'long'
              })}</Text>
            </div>

            <Row gutter={[16, 16]}>
              {/* Pending Tasks Area (Left) */}
              <Col xs={24} lg={12}>
                <Card 
                  title={
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span>待处理任务</span>
                      <Select
                        size="small"
                        value={selectedCourse}
                        onChange={setSelectedCourse}
                        style={{ width: 120 }}
                      >
                        <Option value="all">全部课程</Option>
                        <Option value="1">机器学习基础</Option>
                        <Option value="2">实验室轮转</Option>
                      </Select>
                    </div>
                  }
                  style={{ height: '400px' }}
                  bodyStyle={{ padding: '16px', height: 'calc(100% - 57px)', overflowY: 'auto' }}
                >
                  <Space direction="vertical" style={{ width: '100%' }} size={12}>
                    {mockData.pendingTasks.map(task => (
                      <Card
                        key={task.id}
                        size="small"
                        style={{ 
                          border: `1px solid ${getPriorityColor(task.priority)}30`,
                          borderLeft: `4px solid ${getPriorityColor(task.priority)}`
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                          <div style={{ display: 'flex', gap: '12px', flex: 1 }}>
                            <div style={{ 
                              padding: '6px', 
                              background: `${getPriorityColor(task.priority)}15`, 
                              borderRadius: '4px',
                              color: getPriorityColor(task.priority)
                            }}>
                              {task.icon}
                            </div>
                            <div style={{ flex: 1 }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                                <Text strong>{task.title}</Text>
                                <Tag color={getPriorityColor(task.priority)} size="small">
                                  {task.count}
                                </Tag>
                              </div>
                              <Text type="secondary" style={{ fontSize: '12px', display: 'block', marginBottom: '4px' }}>
                                {task.description}
                              </Text>
                              <Text type="secondary" style={{ fontSize: '11px' }}>
                                <ClockCircleOutlined style={{ marginRight: '4px' }} />
                                截止: {task.deadline}
                              </Text>
                            </div>
                          </div>
                          <Button type="primary" size="small">
                            处理
                          </Button>
                        </div>
                      </Card>
                    ))}
                  </Space>
                </Card>
              </Col>

              {/* Data Statistics Area (Right) */}
              <Col xs={24} lg={12}>
                <Row gutter={[16, 16]}>
                  {/* Course Overview */}
                  <Col span={24}>
                    <Card title="课程概览" style={{ height: '200px' }}>
                      <Row gutter={16}>
                        <Col span={6}>
                          <Statistic
                            title="总学生数"
                            value={mockData.statistics.totalStudents}
                            prefix={<TeamOutlined />}
                            valueStyle={{ color: '#1A73E8' }}
                          />
                        </Col>
                        <Col span={6}>
                          <Statistic
                            title="活跃课程"
                            value={mockData.statistics.activeCourses}
                            prefix={<BookOutlined />}
                            valueStyle={{ color: '#52c41a' }}
                          />
                        </Col>
                        <Col span={6}>
                          <Statistic
                            title="平均满意度"
                            value={mockData.statistics.avgSatisfaction}
                            precision={2}
                            prefix={<StarOutlined />}
                            valueStyle={{ color: '#fa8c16' }}
                          />
                        </Col>
                        <Col span={6}>
                          <Statistic
                            title="完成率"
                            value={mockData.statistics.completionRate}
                            suffix="%"
                            prefix={<TrophyOutlined />}
                            valueStyle={{ color: '#7c4dff' }}
                          />
                        </Col>
                      </Row>
                    </Card>
                  </Col>

                  {/* Student Status Distribution */}
                  <Col span={24}>
                    <Card title="学生状态分析" style={{ height: '186px' }}>
                      <Row gutter={16}>
                        <Col span={8}>
                          <div style={{ textAlign: 'center' }}>
                            <Progress
                              type="circle"
                              size={60}
                              percent={Math.round((mockData.statistics.studentDistribution.excellent / mockData.statistics.totalStudents) * 100)}
                              strokeColor="#52c41a"
                              format={() => mockData.statistics.studentDistribution.excellent}
                            />
                            <div style={{ marginTop: '8px' }}>
                              <Text strong style={{ color: '#52c41a' }}>优秀</Text>
                            </div>
                          </div>
                        </Col>
                        <Col span={8}>
                          <div style={{ textAlign: 'center' }}>
                            <Progress
                              type="circle"
                              size={60}
                              percent={Math.round((mockData.statistics.studentDistribution.good / mockData.statistics.totalStudents) * 100)}
                              strokeColor="#1890ff"
                              format={() => mockData.statistics.studentDistribution.good}
                            />
                            <div style={{ marginTop: '8px' }}>
                              <Text strong style={{ color: '#1890ff' }}>良好</Text>
                            </div>
                          </div>
                        </Col>
                        <Col span={8}>
                          <div style={{ textAlign: 'center' }}>
                            <Progress
                              type="circle"
                              size={60}
                              percent={Math.round((mockData.statistics.studentDistribution.attention / mockData.statistics.totalStudents) * 100)}
                              strokeColor="#fa8c16"
                              format={() => mockData.statistics.studentDistribution.attention}
                            />
                            <div style={{ marginTop: '8px' }}>
                              <Text strong style={{ color: '#fa8c16' }}>需关注</Text>
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </Card>
                  </Col>
                </Row>
              </Col>
            </Row>

            {/* Course Progress Tracking Area (Bottom) */}
            <Row gutter={[16, 16]} style={{ marginTop: '16px' }}>
              <Col span={24}>
                <Card title="课程进度追踪">
                  <Row gutter={[16, 16]}>
                    {mockData.courses.map(course => (
                      <Col xs={24} md={8} key={course.id}>
                        <Card
                          size="small"
                          style={{ 
                            border: '1px solid #f0f0f0',
                            borderLeft: `4px solid ${course.status === 'active' ? '#52c41a' : '#1890ff'}`
                          }}
                        >
                          <div style={{ marginBottom: '12px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                              <Text strong style={{ fontSize: '14px' }}>{course.name}</Text>
                              <Tag color={getStatusColor(course.status)} size="small">
                                {course.status === 'active' ? '进行中' : '规划中'}
                              </Tag>
                            </div>
                            <Text type="secondary" style={{ fontSize: '12px' }}>
                              课程代码: {course.code} | 学生: {course.students}人
                            </Text>
                          </div>
                          
                          <div style={{ marginBottom: '12px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                              <Text style={{ fontSize: '12px' }}>整体进度</Text>
                              <Text style={{ fontSize: '12px' }}>{course.progress}%</Text>
                            </div>
                            <Progress 
                              percent={course.progress} 
                              size="small" 
                              strokeColor={course.status === 'active' ? '#52c41a' : '#1890ff'}
                              showInfo={false}
                            />
                          </div>
                          
                          <div style={{ marginBottom: '12px' }}>
                            <Text type="secondary" style={{ fontSize: '11px', display: 'block' }}>
                              当前阶段: {course.currentPhase}
                            </Text>
                            <Text type="secondary" style={{ fontSize: '11px', display: 'block' }}>
                              下个里程碑: {course.nextMilestone}
                            </Text>
                            {course.satisfaction && (
                              <Text type="secondary" style={{ fontSize: '11px', display: 'block' }}>
                                满意度: {course.satisfaction}/5.0 ⭐
                              </Text>
                            )}
                          </div>
                          
                          <div style={{ display: 'flex', gap: '8px' }}>
                            <Button 
                              type="primary" 
                              size="small" 
                              style={{ flex: 1 }}
                              onClick={() => {
                                if (course.name === '实验室轮转指导') {
                                  navigate('/professor/lab-rotation');
                                }
                              }}
                            >
                              管理
                            </Button>
                            <Button size="small">详情</Button>
                          </div>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                </Card>
              </Col>
            </Row>

            {/* Weekly Important Events */}
            <Row gutter={[16, 16]} style={{ marginTop: '16px' }}>
              <Col span={24}>
                <Card title="本周重要事项">
                  <Timeline>
                    {mockData.weeklyEvents.map((event, index) => (
                      <Timeline.Item
                        key={index}
                        color={event.type === 'exam' ? 'red' : event.type === 'defense' ? 'blue' : 'green'}
                        dot={<CalendarOutlined />}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div>
                            <Text strong>{event.title}</Text>
                            <br />
                            <Text type="secondary" style={{ fontSize: '12px' }}>
                              {event.date} {event.time} | 参与人数: {event.participants}人
                            </Text>
                          </div>
                          <Button size="small">查看详情</Button>
                        </div>
                      </Timeline.Item>
                    ))}
                  </Timeline>
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