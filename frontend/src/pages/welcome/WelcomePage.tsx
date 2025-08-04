import React, { useState } from 'react';
import { Layout, Card, Button, Typography, Space, Steps, Row, Col, Alert, Avatar, Statistic } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '@/contexts';
import type { UserRole } from '@/types';
import {
  UserOutlined,
  TeamOutlined,
  SolutionOutlined,
  BarChartOutlined,
  BookOutlined,
  ExperimentOutlined,
  TrophyOutlined,
  SettingOutlined,
  ArrowRightOutlined,
  CheckCircleOutlined,
  BulbOutlined,
  RocketOutlined
} from '@ant-design/icons';
import './style.css';

const { Header, Content, Footer } = Layout;
const { Title, Paragraph, Text } = Typography;
const { Step } = Steps;

interface RoleConfig {
  icon: React.ReactNode;
  color: string;
  title: string;
  position: string;
  department: string;
  description: string;
  quickStart: Array<{
    icon: React.ReactNode;
    title: string;
    description: string;
    action: string;
  }>;
  announcements: Array<{
    type: 'info' | 'warning' | 'success';
    title: string;
    content: string;
  }>;
}

const WelcomePage: React.FC = () => {
  const navigate = useNavigate();
  const { role } = useParams<{ role: string }>();
  const { user, logout } = useAuth();
  const [currentStep, setCurrentStep] = useState(0);

  const roleConfigs: Record<UserRole, RoleConfig> = {
    student: {
      icon: <UserOutlined />,
      color: '#4CAF50',
      title: '学生',
      position: '本科生',
      department: '机械科学与工程学院',
      description: '欢迎来到科研管理平台！在这里您可以参与实验室轮转课程、提交作业、与导师互动交流。',
      quickStart: [
        {
          icon: <BookOutlined />,
          title: '查看学习仪表板',
          description: '了解您的课程安排、作业状态和学习进度',
          action: 'dashboard'
        },
        {
          icon: <ExperimentOutlined />,
          title: '浏览实验室轮转课程',
          description: '发现感兴趣的实验室并申请参与轮转',
          action: 'courses'
        },
        {
          icon: <TrophyOutlined />,
          title: '查看综合素质评价',
          description: '了解评价标准和当前表现状态',
          action: 'evaluation'
        },
        {
          icon: <SettingOutlined />,
          title: '设置个人偏好',
          description: '配置通知设置和个人资料信息',
          action: 'settings'
        }
      ],
      announcements: [
        {
          type: 'warning',
          title: '2024年春季实验室轮转课程即将开始',
          content: '请在3月1日前完成课程选择，名额有限，先到先得！'
        },
        {
          type: 'info',
          title: '综合素质评价系统已更新',
          content: '新增AI辅助评分功能，请查看新的评价标准和要求。'
        },
        {
          type: 'success',
          title: '学习助手功能上线',
          content: 'AI学习助手现已可用，可以帮助您制定学习计划和答疑解惑。'
        }
      ]
    },
    professor: {
      icon: <TeamOutlined />,
      color: '#1A73E8',
      title: '教授',
      position: '教授/博导',
      department: '机械科学与工程学院',
      description: '欢迎来到教学管理平台！您可以在这里管理课程、指导学生、使用AI辅助教学工具。',
      quickStart: [
        {
          icon: <BookOutlined />,
          title: '查看教学仪表板',
          description: '管理您的课程、查看学生表现和教学数据',
          action: 'dashboard'
        },
        {
          icon: <TeamOutlined />,
          title: '学生选拔与匹配',
          description: '查看申请学生并进行智能匹配推荐',
          action: 'students'
        },
        {
          icon: <RocketOutlined />,
          title: '体验AI辅助教学',
          description: '使用AI工具进行作业批改和教学分析',
          action: 'ai-tools'
        },
        {
          icon: <SettingOutlined />,
          title: '课程设置管理',
          description: '配置课程参数和评价标准',
          action: 'settings'
        }
      ],
      announcements: [
        {
          type: 'info',
          title: '新学期课程规划开始',
          content: '请及时更新课程大纲和教学计划，截止时间为2月28日。'
        },
        {
          type: 'success',
          title: 'AI教学助手功能升级',
          content: '新增智能作业批改和学生表现分析功能，提升教学效率。'
        },
        {
          type: 'warning',
          title: '学生申请审核提醒',
          content: '目前有15名学生申请加入您的实验室，请及时处理申请。'
        }
      ]
    },
    secretary: {
      icon: <SolutionOutlined />,
      color: '#7C4DFF',
      title: '科研秘书',
      position: '科研秘书/教学管理员',
      department: '机械科学与工程学院',
      description: '欢迎来到管理监控平台！您可以监督教学流程、管理系统数据、生成各类报告。',
      quickStart: [
        {
          icon: <BarChartOutlined />,
          title: '查看监控仪表板',
          description: '实时监控教学进度和系统运行状态',
          action: 'dashboard'
        },
        {
          icon: <SolutionOutlined />,
          title: '数据管理与同步',
          description: '管理用户权限和系统数据同步',
          action: 'data-management'
        },
        {
          icon: <BookOutlined />,
          title: '生成教学报告',
          description: '自动生成各类统计报告和分析文档',
          action: 'reports'
        },
        {
          icon: <SettingOutlined />,
          title: '系统配置维护',
          description: '配置系统参数和维护功能设置',
          action: 'settings'
        }
      ],
      announcements: [
        {
          type: 'info',
          title: '月度数据备份提醒',
          content: '本月数据备份将在3月5日进行，预计耗时2小时。'
        },
        {
          type: 'warning',
          title: '系统权限审核',
          content: '发现部分用户权限配置异常，请及时进行权限审核和调整。'
        },
        {
          type: 'success',
          title: '自动化报告功能上线',
          content: '新增自动生成周报和月报功能，减少手工操作时间。'
        }
      ]
    },
    leader: {
      icon: <BarChartOutlined />,
      color: '#FF9800',
      title: '领导',
      position: '学院院长/学科带头人',
      department: '机械科学与工程学院',
      description: '欢迎来到战略决策平台！您可以查看全局数据分析、制定教学策略、监控治理效果。',
      quickStart: [
        {
          icon: <BarChartOutlined />,
          title: '查看战略仪表板',
          description: '获得全局数据洞察和决策支持信息',
          action: 'dashboard'
        },
        {
          icon: <BookOutlined />,
          title: '了解课程体系规划工具',
          description: '使用AI辅助进行课程体系设计和优化',
          action: 'planning'
        },
        {
          icon: <RocketOutlined />,
          title: '体验AI报告生成功能',
          description: '自动生成战略分析报告和决策建议',
          action: 'ai-reports'
        },
        {
          icon: <SettingOutlined />,
          title: '设置个人偏好',
          description: '配置决策仪表板和关键指标监控',
          action: 'settings'
        }
      ],
      announcements: [
        {
          type: 'success',
          title: '年度教学质量报告已生成',
          content: '2023年度教学质量分析报告已完成，整体教学效果良好。'
        },
        {
          type: 'info',
          title: '新学期战略规划会议',
          content: '2024春季学期战略规划会议定于3月10日召开，请提前准备。'
        },
        {
          type: 'warning',
          title: '关键指标预警',
          content: '部分课程参与度下降，建议关注并制定改进措施。'
        }
      ]
    }
  };

  const currentRole = (role as UserRole) || user?.role || 'student';
  const config = roleConfigs[currentRole];

  const handleQuickAction = (action: string) => {
    // Navigate to specific pages based on action
    switch (action) {
      case 'dashboard':
        navigate(`/dashboard/${currentRole}`);
        break;
      case 'courses':
        // Student: 浏览实验室轮转课程
        navigate('/student/lab-rotation');
        break;
      case 'evaluation':
        // Student: 查看综合素质评价
        navigate('/student/evaluation');
        break;
      case 'students':
        // Professor: 学生选拔与匹配
        navigate('/professor/lab-rotation/selection');
        break;
      case 'ai-tools':
        // Professor: 体验AI辅助教学
        navigate('/professor/lab-rotation');
        break;
      case 'data-management':
        // Secretary: 数据管理与同步
        navigate(`/dashboard/${currentRole}`);
        break;
      case 'reports':
        // Secretary: 生成教学报告
        navigate(`/dashboard/${currentRole}`);
        break;
      case 'planning':
        // Leader: 了解课程体系规划工具
        navigate(`/dashboard/${currentRole}`);
        break;
      case 'ai-reports':
        // Leader: 体验AI报告生成功能
        navigate(`/dashboard/${currentRole}`);
        break;
      case 'settings':
        navigate('/settings');
        break;
      default:
        // For any unhandled actions, navigate to dashboard
        navigate(`/dashboard/${currentRole}`);
    }
  };

  const handleSkipGuide = () => {
    navigate(`/dashboard/${currentRole}`);
  };

  const handleStartUsing = () => {
    navigate(`/dashboard/${currentRole}`);
  };

  return (
    <Layout className="welcome-layout">
      <Header className="welcome-header">
        <div className="header-content">
          <div className="logo-section">
            <BulbOutlined className="logo-icon" />
            <span className="logo-text">科研管理平台</span>
          </div>
          <Space>
            <Avatar 
              style={{ backgroundColor: config.color }} 
              icon={config.icon}
            />
            <Text>{user?.name || '用户'}</Text>
            <Button type="text" onClick={() => {
              logout();
              navigate('/');
            }}>
              退出登录
            </Button>
          </Space>
        </div>
      </Header>

      <Content className="welcome-content">
        <div className="welcome-container">
          <Row gutter={[24, 24]}>
            {/* Left Column - Personal Info */}
            <Col xs={24} lg={10}>
              <Card className="profile-card">
                <div className="profile-header">
                  <Avatar 
                    size={64} 
                    style={{ backgroundColor: config.color }} 
                    icon={config.icon}
                  />
                  <div className="profile-info">
                    <Title level={3}>欢迎使用科研管理平台 - {user?.name || '用户'}</Title>
                    <Space direction="vertical" size="small">
                      <Text><strong>姓名:</strong> {user?.name || '用户名'}</Text>
                      <Text><strong>职位:</strong> {config.position}</Text>
                      <Text><strong>部门:</strong> {config.department}</Text>
                      <Text><strong>权限:</strong> {config.title}权限</Text>
                    </Space>
                  </div>
                </div>
                <Paragraph className="profile-description">
                  {config.description}
                </Paragraph>
                <Button 
                  type="primary" 
                  onClick={() => navigate('/profile')}
                  style={{ marginRight: 8 }}
                >
                  编辑资料
                </Button>
              </Card>
            </Col>

            {/* Right Column - Quick Start Guide */}
            <Col xs={24} lg={14}>
              <Card className="guide-card">
                <Title level={4}>
                  <BulbOutlined style={{ color: config.color }} />
                  快速入门指南
                </Title>
                <Row gutter={[16, 16]}>
                  {config.quickStart.map((item, index) => (
                    <Col xs={24} sm={12} key={index}>
                      <Card 
                        className="quick-action-card"
                        hoverable
                        onClick={() => handleQuickAction(item.action)}
                      >
                        <div className="quick-action-icon" style={{ color: config.color }}>
                          {item.icon}
                        </div>
                        <Title level={5}>{item.title}</Title>
                        <Paragraph className="quick-action-desc">
                          {item.description}
                        </Paragraph>
                        <Button 
                          type="link" 
                          icon={<ArrowRightOutlined />}
                          style={{ padding: 0, color: config.color }}
                        >
                          开始使用
                        </Button>
                      </Card>
                    </Col>
                  ))}
                </Row>
                <div className="guide-actions">
                  <Button 
                    type="primary" 
                    size="large"
                    onClick={handleStartUsing}
                    style={{ backgroundColor: config.color, borderColor: config.color }}
                  >
                    开始使用
                  </Button>
                  <Button size="large" onClick={handleSkipGuide}>
                    跳过引导
                  </Button>
                </div>
              </Card>
            </Col>
          </Row>

          {/* System Announcements */}
          <Card className="announcements-card" title="系统公告">
            <Space direction="vertical" style={{ width: '100%' }} size="middle">
              {config.announcements.map((announcement, index) => (
                <Alert
                  key={index}
                  message={announcement.title}
                  description={announcement.content}
                  type={announcement.type}
                  showIcon
                  closable
                />
              ))}
            </Space>
          </Card>
        </div>
      </Content>

      <Footer className="welcome-footer">
        <Text>© 2024 科研管理平台 | 帮助中心 | 技术支持</Text>
      </Footer>
    </Layout>
  );
};

export default WelcomePage;