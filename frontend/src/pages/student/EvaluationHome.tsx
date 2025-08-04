import React, { useState } from 'react';
import { Layout, Card, Typography, Button, Space, Row, Col, Progress, Tag, List, Badge, Timeline, Statistic, Alert, Divider } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts';
import {
  CalendarOutlined,
  TrophyOutlined,
  FileTextOutlined,
  BellOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  BookOutlined,
  UserOutlined,
  StarOutlined,
  BarChartOutlined,
  NotificationOutlined,
  EditOutlined,
  EyeOutlined,
  InfoCircleOutlined,
  UploadOutlined,
  FormOutlined,
  SearchOutlined
} from '@ant-design/icons';

const { Header, Content } = Layout;
const { Title, Text, Paragraph } = Typography;

const EvaluationHome: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  // Mock data for evaluation period
  const evaluationPeriod = {
    name: '2024春季学期综合素质评价',
    startDate: '2024-03-01',
    endDate: '2024-04-30',
    currentPhase: '提交阶段',
    daysLeft: 25,
    isActive: true
  };

  // Mock data for progress overview
  const progressData = {
    overallProgress: 60,
    sections: [
      { name: '基本信息', progress: 100, status: 'completed' },
      { name: '学术成果', progress: 75, status: 'in_progress' },
      { name: '社会活动', progress: 50, status: 'in_progress' },
      { name: '自我评价', progress: 0, status: 'pending' },
      { name: '审核提交', progress: 0, status: 'pending' }
    ]
  };

  // Mock data for quick navigation cards
  const navigationCards = [
    {
      id: 1,
      title: '通知中心',
      icon: <NotificationOutlined />,
      color: '#1890ff',
      description: '查看评价相关通知',
      badge: 5,
      path: '/student/evaluation/notifications'
    },
    {
      id: 2,
      title: '提交中心',
      icon: <UploadOutlined />,
      color: '#52c41a',
      description: '完善评价材料',
      badge: null,
      path: '/student/evaluation/submission'
    },
    {
      id: 3,
      title: '结果查询',
      icon: <SearchOutlined />,
      color: '#fa8c16',
      description: '查看评价结果',
      badge: null,
      path: '/student/evaluation/results'
    },
    {
      id: 4,
      title: '评价指南',
      icon: <BookOutlined />,
      color: '#722ed1',
      description: '了解评价标准',
      badge: null,
      path: '/student/evaluation/guide'
    }
  ];

  // Mock data for important notifications
  const importantNotifications = [
    {
      id: 1,
      type: 'urgent',
      title: '提交截止日期提醒',
      content: '综合素质评价材料提交将于4月30日截止，请及时完成相关内容。',
      time: '2024-04-05 10:00',
      icon: <ExclamationCircleOutlined />,
      color: '#ff4d4f'
    },
    {
      id: 2,
      type: 'info',
      title: '评价标准更新',
      content: '2024年综合素质评价标准已更新，请查看最新的评价指南。',
      time: '2024-04-03 14:30',
      icon: <InfoCircleOutlined />,
      color: '#1890ff'
    },
    {
      id: 3,
      type: 'success',
      title: '学术成果审核通过',
      content: '您提交的论文《深度学习在图像识别中的应用》已通过审核。',
      time: '2024-04-02 09:15',
      icon: <CheckCircleOutlined />,
      color: '#52c41a'
    }
  ];

  // Mock data for recent activities
  const recentActivities = [
    {
      id: 1,
      action: '更新了学术成果',
      description: '添加了2篇期刊论文',
      time: '2小时前',
      type: 'update'
    },
    {
      id: 2,
      action: '完成了基本信息填写',
      description: '个人基本信息已完善',
      time: '1天前',
      type: 'complete'
    },
    {
      id: 3,
      action: '上传了获奖证书',
      description: '全国大学生数学建模竞赛一等奖',
      time: '2天前',
      type: 'upload'
    },
    {
      id: 4,
      action: '查看了评价指南',
      description: '阅读了学术成果评价标准',
      time: '3天前',
      type: 'view'
    }
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <Layout style={{ minHeight: '100vh', background: '#f5f5f5' }}>
      {/* 顶部导航栏 */}
      <Header style={{ 
        background: '#fff', 
        padding: '0 24px', 
        borderBottom: '1px solid #e8e8e8',
        height: '64px',
        lineHeight: '64px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <TrophyOutlined style={{ fontSize: '24px', color: '#fa8c16', marginRight: '12px' }} />
            <Title level={3} style={{ margin: 0, color: '#262626' }}>
              综合素质评价
            </Title>
          </div>
          <Button type="text" onClick={() => navigate('/dashboard/student')}>
            返回主页
          </Button>
        </div>
      </Header>

      <Content style={{ padding: '24px', background: '#f5f5f5' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {/* 欢迎横幅 */}
          <Card 
            style={{ 
              marginBottom: '24px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              border: 'none'
            }}
            bodyStyle={{ padding: '32px' }}
          >
            <Row align="middle">
              <Col xs={24} md={16}>
                <div style={{ color: 'white' }}>
                  <Title level={2} style={{ color: 'white', marginBottom: '8px' }}>
                    欢迎参加 {evaluationPeriod.name}
                  </Title>
                  <Paragraph style={{ color: 'rgba(255,255,255,0.9)', fontSize: '16px', marginBottom: '16px' }}>
                    当前阶段：{evaluationPeriod.currentPhase} | 距离截止还有 {evaluationPeriod.daysLeft} 天
                  </Paragraph>
                  <Space>
                    <Button type="primary" ghost size="large" onClick={() => handleNavigation('/student/evaluation/submission')}>
                      继续完善
                    </Button>
                    <Button type="default" ghost onClick={() => handleNavigation('/student/evaluation/guide')}>
                      查看指南
                    </Button>
                  </Space>
                </div>
              </Col>
              <Col xs={24} md={8} style={{ textAlign: 'center' }}>
                <div style={{ color: 'white', marginTop: '16px' }}>
                  <Progress
                    type="circle"
                    percent={progressData.overallProgress}
                    strokeColor={{
                      '0%': '#108ee9',
                      '100%': '#87d068',
                    }}
                    size={120}
                    strokeWidth={8}
                    format={(percent) => <span style={{ color: 'white', fontSize: '18px', fontWeight: 'bold' }}>{percent}%</span>}
                  />
                  <div style={{ marginTop: '12px', fontSize: '16px', fontWeight: 'bold' }}>
                    整体完成度
                  </div>
                </div>
              </Col>
            </Row>
          </Card>

          {/* 三栏布局 */}
          <Row gutter={[24, 24]} style={{ marginBottom: '24px' }}>
            {/* 左栏 - 进度概览 */}
            <Col xs={24} lg={8}>
              <Card 
                title={
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <BarChartOutlined style={{ marginRight: '8px', color: '#1890ff' }} />
                    进度概览
                  </div>
                }
                style={{ height: '400px' }}
                bodyStyle={{ padding: '16px', height: 'calc(100% - 57px)', overflowY: 'auto' }}
              >
                <Space direction="vertical" style={{ width: '100%' }} size="middle">
                  {progressData.sections.map((section, index) => (
                    <Card 
                      key={index}
                      size="small"
                      style={{ 
                        borderLeft: `4px solid ${
                          section.status === 'completed' ? '#52c41a' :
                          section.status === 'in_progress' ? '#1890ff' : '#d9d9d9'
                        }`,
                        borderRadius: '8px'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                        <Text strong>{section.name}</Text>
                        <Tag color={
                          section.status === 'completed' ? 'green' :
                          section.status === 'in_progress' ? 'blue' : 'default'
                        }>
                          {section.status === 'completed' ? '已完成' :
                           section.status === 'in_progress' ? '进行中' : '待开始'}
                        </Tag>
                      </div>
                      <Progress 
                        percent={section.progress} 
                        size="small"
                        strokeColor={
                          section.status === 'completed' ? '#52c41a' :
                          section.status === 'in_progress' ? '#1890ff' : '#d9d9d9'
                        }
                      />
                    </Card>
                  ))}
                </Space>
              </Card>
            </Col>

            {/* 中栏 - 快速导航 */}
            <Col xs={24} lg={8}>
              <Card 
                title={
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <FormOutlined style={{ marginRight: '8px', color: '#52c41a' }} />
                    快速导航
                  </div>
                }
                style={{ height: '400px' }}
                bodyStyle={{ padding: '16px' }}
              >
                <Row gutter={[12, 12]}>
                  {navigationCards.map(card => (
                    <Col xs={12} key={card.id}>
                      <Card 
                        size="small"
                        style={{ 
                          textAlign: 'center', 
                          borderRadius: '8px', 
                          cursor: 'pointer',
                          height: '140px',
                          display: 'flex',
                          flexDirection: 'column'
                        }}
                        bodyStyle={{ 
                          padding: '16px', 
                          height: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center'
                        }}
                        hoverable
                        onClick={() => handleNavigation(card.path)}
                      >
                        <Badge count={card.badge} offset={[10, -10]}>
                          <div style={{ color: card.color, fontSize: '28px', marginBottom: '8px' }}>
                            {card.icon}
                          </div>
                        </Badge>
                        <div style={{ fontSize: '14px', fontWeight: 600, marginBottom: '4px' }}>
                          {card.title}
                        </div>
                        <div style={{ fontSize: '12px', color: '#8c8c8c' }}>
                          {card.description}
                        </div>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </Card>
            </Col>

            {/* 右栏 - 重要通知 */}
            <Col xs={24} lg={8}>
              <Card 
                title={
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <BellOutlined style={{ marginRight: '8px', color: '#fa8c16' }} />
                    重要通知
                  </div>
                }
                style={{ height: '400px' }}
                bodyStyle={{ padding: '16px', height: 'calc(100% - 57px)', overflowY: 'auto' }}
                extra={
                  <Button type="link" size="small" onClick={() => handleNavigation('/student/evaluation/notifications')}>
                    查看全部
                  </Button>
                }
              >
                <Space direction="vertical" style={{ width: '100%' }} size="middle">
                  {importantNotifications.map(notification => (
                    <Alert
                      key={notification.id}
                      message={notification.title}
                      description={
                        <div>
                          <div style={{ marginBottom: '8px' }}>
                            {notification.content}
                          </div>
                          <div style={{ fontSize: '12px', color: '#8c8c8c' }}>
                            <ClockCircleOutlined style={{ marginRight: '4px' }} />
                            {notification.time}
                          </div>
                        </div>
                      }
                      type={
                        notification.type === 'urgent' ? 'error' :
                        notification.type === 'success' ? 'success' : 'info'
                      }
                      showIcon
                      style={{ borderRadius: '8px' }}
                    />
                  ))}
                </Space>
              </Card>
            </Col>
          </Row>

          {/* 底部统计和活动 */}
          <Row gutter={[24, 24]}>
            {/* 评价统计 */}
            <Col xs={24} lg={12}>
              <Card title="评价统计" style={{ height: '300px' }}>
                <Row gutter={[16, 16]}>
                  <Col xs={12}>
                    <Statistic 
                      title="已提交材料" 
                      value={12}
                      suffix="项"
                      valueStyle={{ color: '#3f8600', fontSize: '24px' }}
                      prefix={<FileTextOutlined />}
                    />
                  </Col>
                  <Col xs={12}>
                    <Statistic 
                      title="待完善内容" 
                      value={3}
                      suffix="项"
                      valueStyle={{ color: '#fa8c16', fontSize: '24px' }}
                      prefix={<EditOutlined />}
                    />
                  </Col>
                  <Col xs={12}>
                    <Statistic 
                      title="获得成就" 
                      value={8}
                      suffix="个"
                      valueStyle={{ color: '#722ed1', fontSize: '20px' }}
                      prefix={<TrophyOutlined />}
                    />
                  </Col>
                  <Col xs={12}>
                    <Statistic 
                      title="预估评级" 
                      value="A"
                      valueStyle={{ color: '#1890ff', fontSize: '20px' }}
                      prefix={<StarOutlined />}
                    />
                  </Col>
                </Row>
                
                <Divider />
                
                <div style={{ textAlign: 'center' }}>
                  <Button type="primary" onClick={() => handleNavigation('/student/evaluation/results')}>
                    查看详细统计
                  </Button>
                </div>
              </Card>
            </Col>

            {/* 最近活动 */}
            <Col xs={24} lg={12}>
              <Card 
                title="最近活动" 
                style={{ height: '300px' }}
                bodyStyle={{ height: 'calc(100% - 57px)', overflowY: 'auto' }}
              >
                <Timeline>
                  {recentActivities.map(activity => (
                    <Timeline.Item 
                      key={activity.id}
                      color={
                        activity.type === 'complete' ? 'green' :
                        activity.type === 'update' ? 'blue' :
                        activity.type === 'upload' ? 'orange' : 'gray'
                      }
                    >
                      <div>
                        <div style={{ fontSize: '14px', fontWeight: 600, marginBottom: '4px' }}>
                          {activity.action}
                        </div>
                        <div style={{ fontSize: '12px', color: '#8c8c8c', marginBottom: '4px' }}>
                          {activity.description}
                        </div>
                        <div style={{ fontSize: '12px', color: '#999' }}>
                          {activity.time}
                        </div>
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
  );
};

export default EvaluationHome;