import React, { useState } from 'react';
import { Card, Row, Col, Progress, List, Timeline, Tag, Statistic, Space, Button } from 'antd';
import { 
  EditOutlined, 
  TeamOutlined, 
  ProjectOutlined, 
  TrophyOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  UserOutlined,
  CalendarOutlined,
  FileTextOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import MainLayout from '@/components/MainLayout';
import styles from './LabRotation.module.css';

interface TodoItem {
  id: string;
  title: string;
  description: string;
  deadline: string;
  priority: 'high' | 'medium' | 'low';
  type: 'review' | 'interview' | 'grade' | 'meeting';
  count?: number;
}

interface Activity {
  id: string;
  time: string;
  content: string;
  type: 'submission' | 'application' | 'system' | 'reminder';
}

const LabRotationOverview: React.FC = () => {
  const navigate = useNavigate();
  const [currentStage] = useState<'application' | 'matching' | 'learning' | 'achievement'>('application');

  // Mock data for todos
  const todos: TodoItem[] = [
    {
      id: '1',
      title: '审核学生申请',
      description: '5个新的学生申请需要审核',
      deadline: '2天后',
      priority: 'high',
      type: 'review',
      count: 5
    },
    {
      id: '2',
      title: '安排面试时间',
      description: '3名学生等待面试安排',
      deadline: '3天后',
      priority: 'medium',
      type: 'interview',
      count: 3
    },
    {
      id: '3',
      title: '批改作业',
      description: '实验报告待批改',
      deadline: '1周后',
      priority: 'low',
      type: 'grade',
      count: 8
    }
  ];

  // Mock data for activities
  const activities: Activity[] = [
    {
      id: '1',
      time: '10分钟前',
      content: '李明提交了实验报告',
      type: 'submission'
    },
    {
      id: '2',
      time: '2小时前',
      content: '王芳申请了"机器人控制系统研究"课题',
      type: 'application'
    },
    {
      id: '3',
      time: '5小时前',
      content: '系统提醒：明天下午2点有组会',
      type: 'reminder'
    },
    {
      id: '4',
      time: '1天前',
      content: '新功能上线：AI智能匹配学生',
      type: 'system'
    }
  ];

  const getStageProgress = () => {
    switch (currentStage) {
      case 'application':
        return 25;
      case 'matching':
        return 50;
      case 'learning':
        return 75;
      case 'achievement':
        return 100;
      default:
        return 0;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'red';
      case 'medium':
        return 'orange';
      case 'low':
        return 'green';
      default:
        return 'default';
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'submission':
        return <FileTextOutlined style={{ color: '#52c41a' }} />;
      case 'application':
        return <UserOutlined style={{ color: '#1890ff' }} />;
      case 'reminder':
        return <CalendarOutlined style={{ color: '#fa8c16' }} />;
      case 'system':
        return <ExclamationCircleOutlined style={{ color: '#722ed1' }} />;
      default:
        return <ClockCircleOutlined />;
    }
  };

  return (
    <MainLayout>
      <div className={styles.overviewContainer}>
        {/* Course Header */}
        <Card className={styles.courseHeader}>
          <Row align="middle" justify="space-between">
            <Col>
              <h1 className={styles.courseTitle}>实验室轮转 - 2024春季班</h1>
              <Space size="large">
                <Tag color="blue">当前阶段：申请阶段</Tag>
                <span>已报名：120人</span>
                <span>已录取：25人</span>
              </Space>
            </Col>
            <Col>
              <Progress 
                type="circle" 
                percent={getStageProgress()} 
                width={80}
                format={() => `${getStageProgress()}%`}
              />
            </Col>
          </Row>
        </Card>

        {/* Quick Access Grid */}
        <Row gutter={[16, 16]} className={styles.quickAccess}>
          <Col xs={24} sm={12} md={6}>
            <Card 
              className={styles.quickCard}
              hoverable
              onClick={() => navigate('/professor/lab-rotation/topics')}
            >
              <Statistic
                title="课题管理"
                value={5}
                suffix="个已发布"
                prefix={<EditOutlined style={{ color: '#1890ff' }} />}
              />
              <p className={styles.quickDesc}>发布/编辑课题</p>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card 
              className={styles.quickCard}
              hoverable
              onClick={() => navigate('/professor/lab-rotation/selection')}
            >
              <Statistic
                title="学生选拔"
                value={15}
                suffix="个待审核"
                prefix={<TeamOutlined style={{ color: '#52c41a' }} />}
              />
              <p className={styles.quickDesc}>查看申请/面试</p>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card 
              className={styles.quickCard}
              hoverable
              onClick={() => navigate('/professor/lab-rotation/process')}
            >
              <Statistic
                title="过程管理"
                value={8}
                suffix="个进行中"
                prefix={<ProjectOutlined style={{ color: '#fa8c16' }} />}
              />
              <p className={styles.quickDesc}>任务/会议/里程碑</p>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card 
              className={styles.quickCard}
              hoverable
              onClick={() => navigate('/professor/lab-rotation/assessment')}
            >
              <Statistic
                title="成果评估"
                value={3}
                suffix="个待评审"
                prefix={<TrophyOutlined style={{ color: '#722ed1' }} />}
              />
              <p className={styles.quickDesc}>作业/报告/答辩</p>
            </Card>
          </Col>
        </Row>

        <Row gutter={[16, 16]}>
          {/* Todo List */}
          <Col xs={24} lg={14}>
            <Card 
              title="待办事项" 
              extra={<Button type="link">查看全部</Button>}
              className={styles.todoCard}
            >
              <List
                dataSource={todos}
                renderItem={item => (
                  <List.Item
                    actions={[
                      <Button type="link" size="small">处理</Button>,
                      <Button type="link" size="small">延期</Button>
                    ]}
                  >
                    <List.Item.Meta
                      avatar={
                        <Tag color={getPriorityColor(item.priority)}>
                          {item.priority === 'high' ? '紧急' : item.priority === 'medium' ? '重要' : '一般'}
                        </Tag>
                      }
                      title={
                        <Space>
                          {item.title}
                          {item.count && <Tag>{item.count}</Tag>}
                        </Space>
                      }
                      description={
                        <Space>
                          <span>{item.description}</span>
                          <span style={{ color: '#ff4d4f' }}>
                            <ClockCircleOutlined /> {item.deadline}
                          </span>
                        </Space>
                      }
                    />
                  </List.Item>
                )}
              />
            </Card>
          </Col>

          {/* Recent Activities */}
          <Col xs={24} lg={10}>
            <Card 
              title="最新动态" 
              extra={<Button type="link">查看更多</Button>}
              className={styles.activityCard}
            >
              <Timeline>
                {activities.map(activity => (
                  <Timeline.Item 
                    key={activity.id}
                    dot={getActivityIcon(activity.type)}
                  >
                    <p>{activity.content}</p>
                    <p style={{ color: '#8c8c8c', fontSize: '12px' }}>{activity.time}</p>
                  </Timeline.Item>
                ))}
              </Timeline>
            </Card>
          </Col>
        </Row>

        {/* Stage Progress */}
        <Card title="课程进度" className={styles.progressCard}>
          <div className={styles.stageProgress}>
            <div className={styles.stageLine}>
              <div 
                className={styles.stageLineActive} 
                style={{ width: `${getStageProgress()}%` }}
              />
            </div>
            <Row justify="space-between" className={styles.stages}>
              <Col>
                <div className={`${styles.stage} ${currentStage === 'application' ? styles.active : ''}`}>
                  <CheckCircleOutlined />
                  <span>申请阶段</span>
                </div>
              </Col>
              <Col>
                <div className={`${styles.stage} ${currentStage === 'matching' ? styles.active : ''}`}>
                  <CheckCircleOutlined />
                  <span>匹配阶段</span>
                </div>
              </Col>
              <Col>
                <div className={`${styles.stage} ${currentStage === 'learning' ? styles.active : ''}`}>
                  <CheckCircleOutlined />
                  <span>学习阶段</span>
                </div>
              </Col>
              <Col>
                <div className={`${styles.stage} ${currentStage === 'achievement' ? styles.active : ''}`}>
                  <CheckCircleOutlined />
                  <span>成果阶段</span>
                </div>
              </Col>
            </Row>
          </div>
        </Card>
      </div>
    </MainLayout>
  );
};

export default LabRotationOverview;