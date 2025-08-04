import React, { useState } from 'react';
import { Layout, Menu, Breadcrumb, Card, Row, Col, Progress, Button, Typography, Timeline, Badge, Divider } from 'antd';
import {
  HomeOutlined,
  ExperimentOutlined,
  FileTextOutlined,
  SearchOutlined,
  UserOutlined,
  CalendarOutlined,
  BarChartOutlined,
  TrophyOutlined,
  BellOutlined,
  ArrowRightOutlined
} from '@ant-design/icons';
import TopicBrowsing from './components/TopicBrowsing';
import TopicDetails from './components/TopicDetails';
import ApplicationManagement from './components/ApplicationManagement';
import LearningProcess from './components/LearningProcess';
import AchievementSubmission from './components/AchievementSubmission';
import GradesQuery from './components/GradesQuery';

const { Header, Content, Sider } = Layout;
const { Title, Text } = Typography;

interface LabRotationCourseProps {}

const LabRotationCourse: React.FC<LabRotationCourseProps> = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState('home');
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);

  // Mock data for the lab rotation course
  const mockData = {
    courseInfo: {
      name: '实验室轮转 - 2024春季',
      currentStage: '申请阶段',
      overallProgress: 35,
      totalParticipants: 120
    },
    quickNavCards: [
      {
        id: 'topics',
        title: '课题浏览',
        subtitle: '查看15个可选课题',
        icon: <SearchOutlined />,
        color: '#1890ff',
        action: '查看课题'
      },
      {
        id: 'applications',
        title: '我的申请',
        subtitle: '申请状态跟踪',
        icon: <FileTextOutlined />,
        color: '#52c41a',
        action: '查看进度'
      },
      {
        id: 'tasks',
        title: '学习任务',
        subtitle: '待完成3个',
        icon: <CalendarOutlined />,
        color: '#fa8c16',
        action: '查看任务'
      },
      {
        id: 'achievements',
        title: '成果提交',
        subtitle: '上传入口',
        icon: <TrophyOutlined />,
        color: '#722ed1',
        action: '开始上传'
      }
    ],
    timeline: [
      { stage: '申请', status: 'active', date: '3月1-15日' },
      { stage: '匹配', status: 'pending', date: '3月16-20日' },
      { stage: '学习', status: 'pending', date: '3月21日-5月15日' },
      { stage: '成果', status: 'pending', date: '5月16-30日' },
      { stage: '答辩', status: 'pending', date: '6月1-10日' }
    ],
    announcements: [
      {
        id: 1,
        title: '请在3月15日前完成课题申请',
        time: '刚刚',
        priority: 'high'
      },
      {
        id: 2,
        title: '新增AI方向课题5个',
        time: '2小时前',
        priority: 'medium'
      },
      {
        id: 3,
        title: '面试时间安排将于3月20日公布',
        time: '1天前',
        priority: 'low'
      }
    ]
  };

  const menuItems = [
    {
      key: 'home',
      icon: <HomeOutlined />,
      label: '课程主页',
    },
    {
      key: 'topics',
      icon: <SearchOutlined />,
      label: '课题浏览',
      children: [
        { key: 'topic-list', label: '课题列表' },
        { key: 'topic-details', label: '课题详情' },
        { key: 'professor-info', label: '导师信息' },
      ],
    },
    {
      key: 'applications',
      icon: <FileTextOutlined />,
      label: '申请管理',
      children: [
        { key: 'submit-application', label: '提交申请' },
        { key: 'volunteer-preference', label: '志愿填报' },
        { key: 'application-status', label: '申请状态' },
        { key: 'interview-booking', label: '面试预约' },
      ],
    },
    {
      key: 'learning',
      icon: <ExperimentOutlined />,
      label: '学习过程',
      children: [
        { key: 'task-list', label: '任务列表' },
        { key: 'submissions', label: '作业提交' },
        { key: 'meetings', label: '会议记录' },
      ],
    },
    {
      key: 'achievements',
      icon: <TrophyOutlined />,
      label: '成果提交',
      children: [
        { key: 'poster-upload', label: '海报上传' },
        { key: 'report-submission', label: '报告提交' },
      ],
    },
    {
      key: 'grades',
      icon: <BarChartOutlined />,
      label: '成绩查询',
    },
  ];

  const renderHomeContent = () => (
    <div>
      {/* Course Overview Banner */}
      <Card 
        style={{ 
          marginBottom: '24px',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          border: 'none'
        }}
        bodyStyle={{ padding: '32px' }}
      >
        <Row align="middle" justify="space-between">
          <Col>
            <Title level={2} style={{ color: 'white', margin: 0, marginBottom: '8px' }}>
              {mockData.courseInfo.name}
            </Title>
            <div style={{ color: 'rgba(255,255,255,0.9)', fontSize: '16px', marginBottom: '16px' }}>
              当前阶段: {mockData.courseInfo.currentStage} | 参与人数: {mockData.courseInfo.totalParticipants}人
            </div>
            <Progress 
              percent={mockData.courseInfo.overallProgress} 
              strokeColor="#fff"
              trailColor="rgba(255,255,255,0.3)"
              style={{ marginBottom: '8px' }}
            />
            <Text style={{ color: 'rgba(255,255,255,0.8)' }}>
              整体进度 {mockData.courseInfo.overallProgress}%
            </Text>
          </Col>
        </Row>
      </Card>

      {/* Quick Navigation Cards */}
      <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
        {mockData.quickNavCards.map(card => (
          <Col xs={12} lg={6} key={card.id}>
            <Card
              hoverable
              style={{ 
                textAlign: 'center',
                height: '160px',
                borderRadius: '12px',
                border: `2px solid ${card.color}20`
              }}
              bodyStyle={{ 
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                height: '100%'
              }}
            >
              <div style={{ 
                fontSize: '32px', 
                color: card.color, 
                marginBottom: '12px' 
              }}>
                {card.icon}
              </div>
              <Title level={4} style={{ margin: '0 0 8px 0', color: '#262626' }}>
                {card.title}
              </Title>
              <Text type="secondary" style={{ fontSize: '12px', marginBottom: '12px' }}>
                {card.subtitle}
              </Text>
              <Button 
                type="primary" 
                size="small"
                style={{ backgroundColor: card.color, borderColor: card.color }}
                onClick={() => {
                  switch (card.id) {
                    case 'topics':
                      setSelectedMenuItem('topic-list');
                      break;
                    case 'applications':
                      setSelectedMenuItem('application-status');
                      break;
                    case 'tasks':
                      setSelectedMenuItem('task-list');
                      break;
                    case 'achievements':
                      setSelectedMenuItem('poster-upload');
                      break;
                  }
                }}
              >
                {card.action} <ArrowRightOutlined />
              </Button>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Timeline Progress */}
      <Card title="课程时间线" style={{ marginBottom: '24px' }}>
        <div style={{ padding: '20px 0' }}>
          <Row gutter={[16, 16]} justify="space-between">
            {mockData.timeline.map((stage, index) => (
              <Col key={stage.stage} flex="1" style={{ textAlign: 'center' }}>
                <div style={{ position: 'relative' }}>
                  {/* Stage Circle */}
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: stage.status === 'active' ? '#1890ff' : '#d9d9d9',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 12px auto',
                    fontSize: '14px',
                    fontWeight: 'bold'
                  }}>
                    {index + 1}
                  </div>
                  
                  {/* Connection Line */}
                  {index < mockData.timeline.length - 1 && (
                    <div style={{
                      position: 'absolute',
                      top: '20px',
                      left: 'calc(50% + 20px)',
                      right: 'calc(-50% + 20px)',
                      height: '2px',
                      backgroundColor: '#d9d9d9',
                      zIndex: -1
                    }} />
                  )}
                  
                  {/* Stage Info */}
                  <div>
                    <div style={{ 
                      fontWeight: 'bold', 
                      color: stage.status === 'active' ? '#1890ff' : '#8c8c8c',
                      marginBottom: '4px'
                    }}>
                      {stage.stage}
                    </div>
                    <div style={{ fontSize: '12px', color: '#8c8c8c' }}>
                      {stage.date}
                    </div>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </div>
      </Card>

      {/* Latest Announcements */}
      <Card 
        title={
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <BellOutlined style={{ marginRight: '8px', color: '#fa8c16' }} />
            最新公告
          </div>
        }
      >
        <div>
          {mockData.announcements.map(announcement => (
            <div key={announcement.id} style={{ 
              padding: '12px 0',
              borderBottom: '1px solid #f0f0f0'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '4px' }}>
                    <Badge 
                      color={
                        announcement.priority === 'high' ? '#ff4d4f' :
                        announcement.priority === 'medium' ? '#fa8c16' : '#52c41a'
                      }
                      style={{ marginRight: '8px' }}
                    />
                    <Text strong>{announcement.title}</Text>
                  </div>
                  <Text type="secondary" style={{ fontSize: '12px' }}>
                    {announcement.time}
                  </Text>
                </div>
                <Button type="link" size="small">
                  查看详情
                </Button>
              </div>
            </div>
          ))}
        </div>
        <Divider />
        <div style={{ textAlign: 'center' }}>
          <Button type="link">查看全部公告</Button>
        </div>
      </Card>
    </div>
  );

  const renderContent = () => {
    switch (selectedMenuItem) {
      case 'home':
        return renderHomeContent();
      
      // Topic Browsing
      case 'topic-list':
        return <TopicBrowsing onTopicSelect={(topicId) => {
          setSelectedTopicId(topicId);
          setSelectedMenuItem('topic-details');
        }} />;
      case 'topic-details':
        return <TopicDetails 
          topicId={selectedTopicId || '1'} 
          onBack={() => setSelectedMenuItem('topic-list')}
          onApply={() => setSelectedMenuItem('submit-application')}
        />;
      case 'professor-info':
        return (
          <Card>
            <div style={{ textAlign: 'center', padding: '40px' }}>
              <Text type="secondary">导师信息页面正在开发中...</Text>
            </div>
          </Card>
        );
      
      // Application Management
      case 'submit-application':
        return <ApplicationManagement activeView="submit" />;
      case 'volunteer-preference':
        return <ApplicationManagement activeView="preferences" />;
      case 'application-status':
        return <ApplicationManagement activeView="status" />;
      case 'interview-booking':
        return <ApplicationManagement activeView="interview" />;
      
      // Learning Process
      case 'task-list':
        return <LearningProcess activeView="tasks" />;
      case 'submissions':
        return <LearningProcess activeView="submissions" />;
      case 'meetings':
        return <LearningProcess activeView="meetings" />;
      
      // Achievement Submission
      case 'poster-upload':
        return <AchievementSubmission activeView="poster" />;
      case 'report-submission':
        return <AchievementSubmission activeView="report" />;
      
      // Grades Query
      case 'grades':
        return <GradesQuery />;
      
      default:
        return (
          <Card>
            <div style={{ textAlign: 'center', padding: '40px' }}>
              <Text type="secondary">此功能正在开发中...</Text>
            </div>
          </Card>
        );
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* Header */}
      <Header style={{ 
        background: '#fff', 
        padding: '0 24px',
        borderBottom: '1px solid #e8e8e8'
      }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          height: '100%'
        }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <ExperimentOutlined style={{ fontSize: '24px', color: '#1890ff', marginRight: '12px' }} />
            <Title level={3} style={{ margin: 0, color: '#262626' }}>
              实验室轮转课程
            </Title>
          </div>
          <Button type="primary">返回学习中心</Button>
        </div>
      </Header>

      <Layout>
        {/* Sidebar */}
        <Sider 
          width={240} 
          style={{ background: '#fff' }}
          breakpoint="lg"
          collapsedWidth="0"
        >
          <Menu
            mode="inline"
            selectedKeys={[selectedMenuItem]}
            onSelect={({ key }) => setSelectedMenuItem(key)}
            style={{ height: '100%', borderRight: 0 }}
            items={menuItems}
          />
        </Sider>

        {/* Main Content */}
        <Layout style={{ padding: '0 24px 24px' }}>
          {/* Breadcrumb */}
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>首页</Breadcrumb.Item>
            <Breadcrumb.Item>实验室轮转</Breadcrumb.Item>
            <Breadcrumb.Item>课程主页</Breadcrumb.Item>
          </Breadcrumb>

          {/* Content */}
          <Content
            style={{
              background: '#fff',
              padding: 24,
              margin: 0,
              minHeight: 280,
              borderRadius: '8px'
            }}
          >
            {renderContent()}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default LabRotationCourse;