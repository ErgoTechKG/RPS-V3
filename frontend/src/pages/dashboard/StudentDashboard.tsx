import React, { useState } from 'react';
import { Layout, Card, Typography, Button, Space, Row, Col, Progress, Avatar, List, Tag, Badge, Checkbox, Timeline, Statistic } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts';
import {
  UserOutlined,
  BookOutlined,
  ExperimentOutlined,
  TrophyOutlined,
  BellOutlined,
  LogoutOutlined,
  BulbOutlined,
  FileTextOutlined,
  TeamOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  EditOutlined,
  MessageOutlined,
  RobotOutlined,
  CalendarOutlined,
  FireOutlined,
  BookFilled
} from '@ant-design/icons';

const { Header, Content, Sider } = Layout;
const { Title, Text } = Typography;

const StudentDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [completedTasks, setCompletedTasks] = useState<number[]>([]);

  const handleTaskComplete = (taskId: number) => {
    setCompletedTasks(prev => 
      prev.includes(taskId) 
        ? prev.filter(id => id !== taskId)
        : [...prev, taskId]
    );
  };

  const mockData = {
    // 今日任务数据
    todayTasks: [
      { 
        id: 1, 
        title: '提交实验报告', 
        course: '机器学习基础',
        deadline: '今晚11:59', 
        priority: 'high',
        type: 'assignment',
        icon: <FileTextOutlined />,
        color: '#ff4d4f'
      },
      { 
        id: 2, 
        title: '参加组会', 
        course: '实验室轮转',
        deadline: '今天14:00', 
        priority: 'medium',
        type: 'meeting',
        icon: <TeamOutlined />,
        color: '#fa8c16'
      },
      { 
        id: 3, 
        title: 'AI课程学习', 
        course: '人工智能导论',
        deadline: '本周完成40%', 
        priority: 'normal',
        type: 'study',
        icon: <BookFilled />,
        color: '#52c41a'
      }
    ],
    // 学习进度数据
    learningProgress: {
      overall: 65,
      currentStage: '实验阶段',
      nextStep: '数据分析',
      stages: [
        { name: '理论学习', status: 'completed', progress: 100 },
        { name: '实验阶段', status: 'current', progress: 65 },
        { name: '数据分析', status: 'pending', progress: 0 },
        { name: '论文撰写', status: 'pending', progress: 0 }
      ]
    },
    // 动态更新数据
    recentUpdates: [
      { 
        id: 1, 
        title: '张教授回复了你的问题', 
        time: '2分钟前', 
        type: 'reply',
        avatar: '张',
        color: '#1890ff'
      },
      { 
        id: 2, 
        title: '新作业: 文献阅读', 
        time: '1小时前', 
        type: 'assignment',
        avatar: '作',
        color: '#fa8c16'
      },
      { 
        id: 3, 
        title: '同学王明完成了答辩', 
        time: '3小时前', 
        type: 'milestone',
        avatar: '王',
        color: '#52c41a'
      },
      { 
        id: 4, 
        title: '实验室安全培训提醒', 
        time: '5小时前', 
        type: 'reminder',
        avatar: '提',
        color: '#722ed1'
      }
    ],
    // 底部功能区数据
    courseCards: [
      { 
        id: 1, 
        title: '实验室轮转', 
        status: '进行中', 
        progress: 45,
        icon: <ExperimentOutlined />,
        color: '#1890ff'
      },
      { 
        id: 2, 
        title: '综合素质评价', 
        status: '准备中', 
        progress: 20,
        icon: <TrophyOutlined />,
        color: '#fa8c16'
      }
    ],
    stats: {
      gpa: 3.85,
      totalCourses: 6,
      completedAssignments: 24,
      currentRank: 15
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Layout style={{ minHeight: '100vh', background: '#f5f5f5' }}>
      {/* 顶部导航栏 - 64px高度 */}
      <Header style={{ 
        background: '#fff', 
        padding: '0 24px', 
        borderBottom: '1px solid #e8e8e8',
        height: '64px',
        lineHeight: '64px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '100%' }}>
          {/* 左侧用户信息 */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Avatar 
              size={40} 
              style={{ backgroundColor: '#4CAF50', marginRight: '12px' }} 
              icon={<UserOutlined />} 
            />
            <div>
              <div style={{ fontSize: '16px', fontWeight: 600, color: '#262626' }}>
                {user?.name || '李同学'}
              </div>
              <div style={{ fontSize: '12px', color: '#8c8c8c' }}>
                机械设计制造及其自动化
              </div>
            </div>
          </div>
          
          {/* 右侧快速导航 */}
          <Space size="large">
            <Button type="text" icon={<BookOutlined />}>课程</Button>
            <Button type="text" icon={<CalendarOutlined />}>任务</Button>
            <Badge count={5} size="small">
              <Button type="text" icon={<MessageOutlined />}>消息</Button>
            </Badge>
            <Button type="text" icon={<RobotOutlined />}>AI助手</Button>
            <Button type="text" icon={<LogoutOutlined />} onClick={handleLogout}>
              退出
            </Button>
          </Space>
        </div>
      </Header>

      <Content style={{ padding: '24px', background: '#f5f5f5' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {/* 页面标题 */}
          <div style={{ marginBottom: '24px' }}>
            <Title level={2} style={{ margin: 0, color: '#262626' }}>
              个人学习中心 - 2024春季学期
            </Title>
          </div>

          {/* 三栏布局 */}
          <Row gutter={[24, 24]} style={{ marginBottom: '24px' }}>
            {/* 左栏 - 今日任务 */}
            <Col xs={24} lg={8}>
              <Card 
                title={
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <CalendarOutlined style={{ marginRight: '8px', color: '#1890ff' }} />
                    今日任务
                  </div>
                }
                style={{ height: '400px' }}
                bodyStyle={{ padding: '16px', height: 'calc(100% - 57px)', overflowY: 'auto' }}
              >
                <Space direction="vertical" style={{ width: '100%' }} size="middle">
                  {mockData.todayTasks.map(task => (
                    <Card 
                      key={task.id}
                      size="small"
                      style={{ 
                        borderLeft: `4px solid ${task.color}`,
                        borderRadius: '8px',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.12)'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'flex-start', flex: 1 }}>
                          <Checkbox
                            checked={completedTasks.includes(task.id)}
                            onChange={() => handleTaskComplete(task.id)}
                            style={{ marginRight: '12px', marginTop: '2px' }}
                          />
                          <div style={{ flex: 1 }}>
                            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '4px' }}>
                              <span style={{ color: task.color, marginRight: '6px' }}>
                                {task.icon}
                              </span>
                              <Text 
                                strong 
                                style={{ 
                                  textDecoration: completedTasks.includes(task.id) ? 'line-through' : 'none',
                                  color: completedTasks.includes(task.id) ? '#8c8c8c' : '#262626'
                                }}
                              >
                                {task.title}
                              </Text>
                            </div>
                            <div style={{ fontSize: '12px', color: '#8c8c8c', marginBottom: '4px' }}>
                              {task.course}
                            </div>
                            <div style={{ fontSize: '12px', color: task.color }}>
                              <ClockCircleOutlined style={{ marginRight: '4px' }} />
                              {task.deadline}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </Space>
              </Card>
            </Col>

            {/* 中栏 - 学习进度 */}
            <Col xs={24} lg={8}>
              <Card 
                title={
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <FireOutlined style={{ marginRight: '8px', color: '#fa8c16' }} />
                    学习进度
                  </div>
                }
                style={{ height: '400px' }}
                bodyStyle={{ padding: '16px', textAlign: 'center' }}
              >
                <div style={{ marginBottom: '24px' }}>
                  <Progress
                    type="circle"
                    percent={mockData.learningProgress.overall}
                    strokeColor={{
                      '0%': '#108ee9',
                      '100%': '#87d068',
                    }}
                    size={120}
                    strokeWidth={8}
                  />
                </div>
                
                <div style={{ marginBottom: '16px' }}>
                  <div style={{ fontSize: '16px', fontWeight: 600, color: '#262626', marginBottom: '4px' }}>
                    当前: {mockData.learningProgress.currentStage}
                  </div>
                  <div style={{ fontSize: '14px', color: '#8c8c8c' }}>
                    下步: {mockData.learningProgress.nextStep}
                  </div>
                </div>

                <div style={{ textAlign: 'left' }}>
                  {mockData.learningProgress.stages.map((stage, index) => (
                    <div key={index} style={{ marginBottom: '8px', display: 'flex', alignItems: 'center' }}>
                      <div style={{ 
                        width: '8px', 
                        height: '8px', 
                        borderRadius: '50%',
                        backgroundColor: stage.status === 'completed' ? '#52c41a' : 
                                      stage.status === 'current' ? '#1890ff' : '#d9d9d9',
                        marginRight: '8px'
                      }} />
                      <Text style={{ 
                        fontSize: '12px',
                        color: stage.status === 'current' ? '#1890ff' : '#8c8c8c'
                      }}>
                        {stage.name}
                      </Text>
                    </div>
                  ))}
                </div>
              </Card>
            </Col>

            {/* 右栏 - 动态更新 */}
            <Col xs={24} lg={8}>
              <Card 
                title={
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <BellOutlined style={{ marginRight: '8px', color: '#52c41a' }} />
                    动态更新
                  </div>
                }
                style={{ height: '400px' }}
                bodyStyle={{ padding: '16px', height: 'calc(100% - 57px)', overflowY: 'auto' }}
              >
                <Timeline>
                  {mockData.recentUpdates.map(update => (
                    <Timeline.Item 
                      key={update.id}
                      dot={
                        <Avatar size={24} style={{ backgroundColor: update.color, fontSize: '12px' }}>
                          {update.avatar}
                        </Avatar>
                      }
                    >
                      <div style={{ marginLeft: '8px' }}>
                        <div style={{ fontSize: '14px', color: '#262626', marginBottom: '2px' }}>
                          {update.title}
                        </div>
                        <div style={{ fontSize: '12px', color: '#8c8c8c' }}>
                          {update.time}
                        </div>
                      </div>
                    </Timeline.Item>
                  ))}
                </Timeline>
              </Card>
            </Col>
          </Row>

          {/* 底部功能区 */}
          <Row gutter={[24, 24]}>
            {/* 课程卡片 */}
            <Col xs={24} lg={8}>
              <Row gutter={[12, 12]}>
                {mockData.courseCards.map(card => (
                  <Col xs={12} key={card.id}>
                    <Card 
                      size="small"
                      style={{ textAlign: 'center', borderRadius: '8px', cursor: 'pointer' }}
                      bodyStyle={{ padding: '16px' }}
                      hoverable
                      onClick={() => {
                        if (card.title === '实验室轮转') {
                          navigate('/student/lab-rotation');
                        }
                      }}
                    >
                      <div style={{ color: card.color, fontSize: '24px', marginBottom: '8px' }}>
                        {card.icon}
                      </div>
                      <div style={{ fontSize: '14px', fontWeight: 600, marginBottom: '4px' }}>
                        {card.title}
                      </div>
                      <Tag color={card.status === '进行中' ? 'blue' : 'orange'} style={{ marginBottom: '8px' }}>
                        {card.status}
                      </Tag>
                      <Progress percent={card.progress} size="small" />
                    </Card>
                  </Col>
                ))}
              </Row>
            </Col>

            {/* 成绩统计 */}
            <Col xs={24} lg={8}>
              <Card 
                title="成绩统计"
                style={{ height: '200px' }}
                bodyStyle={{ padding: '16px' }}
              >
                <Row gutter={[16, 16]}>
                  <Col xs={12}>
                    <Statistic 
                      title="GPA" 
                      value={mockData.stats.gpa} 
                      precision={2}
                      valueStyle={{ color: '#3f8600', fontSize: '24px' }}
                    />
                  </Col>
                  <Col xs={12}>
                    <Statistic 
                      title="总课程数" 
                      value={mockData.stats.totalCourses}
                      valueStyle={{ color: '#1890ff', fontSize: '24px' }}
                    />
                  </Col>
                  <Col xs={12}>
                    <Statistic 
                      title="已完成作业" 
                      value={mockData.stats.completedAssignments}
                      valueStyle={{ color: '#fa8c16', fontSize: '16px' }}
                    />
                  </Col>
                  <Col xs={12}>
                    <Statistic 
                      title="班级排名" 
                      value={mockData.stats.currentRank}
                      valueStyle={{ color: '#722ed1', fontSize: '16px' }}
                    />
                  </Col>
                </Row>
              </Card>
            </Col>

            {/* AI学习助手 */}
            <Col xs={24} lg={8}>
              <Card 
                title={
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <RobotOutlined style={{ marginRight: '8px', color: '#722ed1' }} />
                    AI学习助手
                  </div>
                }
                style={{ height: '200px' }}
                bodyStyle={{ padding: '16px' }}
              >
                <div style={{ 
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  borderRadius: '8px',
                  padding: '16px',
                  color: 'white',
                  textAlign: 'center',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center'
                }}>
                  <div style={{ fontSize: '16px', marginBottom: '8px' }}>
                    💡 今日建议
                  </div>
                  <div style={{ fontSize: '14px', opacity: 0.9 }}>
                    "建议重点复习机器学习的线性回归部分，为明天的实验做准备"
                  </div>
                  <Button 
                    type="primary" 
                    ghost 
                    size="small" 
                    style={{ marginTop: '12px', width: 'fit-content', alignSelf: 'center' }}
                  >
                    查看更多
                  </Button>
                </div>
              </Card>
            </Col>
          </Row>
        </div>
      </Content>
    </Layout>
  );
};

export default StudentDashboard;