import React from 'react';
import { Layout, Button, Card, Space, Typography, Row, Col, Statistic } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@/contexts';
import {
  TeamOutlined,
  UserOutlined,
  SolutionOutlined,
  BarChartOutlined,
  ExperimentOutlined,
  RocketOutlined,
  SafetyOutlined,
  ApiOutlined,
  BulbOutlined,
  MoonOutlined,
  SunOutlined,
  LoginOutlined
} from '@ant-design/icons';
import './style.css';

const { Header, Content, Footer } = Layout;
const { Title, Paragraph, Text } = Typography;

const Homepage: React.FC = () => {
  const navigate = useNavigate();
  const { toggleTheme, isDarkMode } = useTheme();

  const roleCards = [
    {
      role: 'professor',
      title: '教授',
      icon: <TeamOutlined />,
      color: '#1A73E8',
      description: '课程管理、学生选拔、成绩评定',
      features: ['课程设计与管理', '学生选拔与匹配', '成绩评定与反馈', 'AI辅助教学'],
      loginText: '教授登录'
    },
    {
      role: 'student',
      title: '学生',
      icon: <UserOutlined />,
      color: '#4CAF50',
      description: '课程报名、任务完成、作业提交',
      features: ['课程浏览与报名', '作业提交与管理', '学习进度追踪', 'AI学习助手'],
      loginText: '学生登录'
    },
    {
      role: 'secretary',
      title: '科研秘书',
      icon: <SolutionOutlined />,
      color: '#7C4DFF',
      description: '系统管理、数据收集、流程监督',
      features: ['用户权限管理', '数据收集分析', '流程监控优化', '系统配置维护'],
      loginText: '秘书登录'
    },
    {
      role: 'leader',
      title: '领导',
      icon: <BarChartOutlined />,
      color: '#FF9800',
      description: '战略监督、数据分析、决策支持',
      features: ['战略规划制定', '数据分析洞察', '质量监控评估', 'AI决策辅助'],
      loginText: '领导登录'
    }
  ];

  const features = [
    {
      icon: <RocketOutlined />,
      title: '智能匹配系统',
      description: '基于AI的师生双向选择匹配'
    },
    {
      icon: <ApiOutlined />,
      title: '流程自动化',
      description: '全流程数字化管理与自动化'
    },
    {
      icon: <BarChartOutlined />,
      title: '数据分析',
      description: '实时数据分析与可视化报表'
    },
    {
      icon: <SafetyOutlined />,
      title: '权限管控',
      description: '细粒度权限管理与安全保障'
    }
  ];

  const statistics = [
    { title: '活跃用户', value: '500+', suffix: '人' },
    { title: '开设课程', value: '100+', suffix: '门' },
    { title: '合作导师', value: '50+', suffix: '位' },
    { title: '满意度', value: '95', suffix: '%' }
  ];

  return (
    <Layout className="homepage">
      <Header className="homepage-header">
        <div className="header-content">
          <div className="logo-section">
            <BulbOutlined className="logo-icon" />
            <span className="logo-text">科研实验班课程管理系统</span>
          </div>
          <Space>
            <Button
              type="text"
              icon={isDarkMode ? <SunOutlined /> : <MoonOutlined />}
              onClick={toggleTheme}
            />
            <Button
              type="primary"
              icon={<LoginOutlined />}
              onClick={() => navigate('/login')}
            >
              登录
            </Button>
          </Space>
        </div>
      </Header>

      <Content>
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-content">
            <Title level={1} className="hero-title">
              科研实验班课程管理系统
            </Title>
            <Title level={4} className="hero-subtitle">
              华中科技大学机械科学与工程学院
            </Title>
            <Paragraph className="hero-description">
              创新型人才培养平台，融合数字化管理与智能化教学，
              为科研实验班提供全方位的课程管理解决方案
            </Paragraph>
            <Button
              type="primary"
              size="large"
              onClick={() => navigate('/login')}
              className="hero-cta"
            >
              开始使用系统
            </Button>
          </div>
          <div className="hero-background" />
        </section>

        {/* Role Cards Section */}
        <section className="role-section">
          <div className="container">
            <Title level={2} className="section-title">选择您的角色</Title>
            <Row gutter={[24, 24]}>
              {roleCards.map((card) => (
                <Col xs={24} sm={12} lg={6} key={card.role}>
                  <Card
                    className="role-card"
                    hoverable
                    onClick={() => navigate('/login', { state: { role: card.role } })}
                    style={{ borderTopColor: card.color }}
                  >
                    <div className="role-card-header" style={{ color: card.color }}>
                      {card.icon}
                      <Title level={4}>{card.title}</Title>
                    </div>
                    <Paragraph className="role-description">
                      {card.description}
                    </Paragraph>
                    <ul className="role-features">
                      {card.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                    <Button
                      type="primary"
                      block
                      style={{ backgroundColor: card.color, borderColor: card.color }}
                    >
                      {card.loginText}
                    </Button>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        </section>

        {/* Course Types Section */}
        <section className="course-types-section">
          <div className="container">
            <Title level={2} className="section-title">课程体系</Title>
            <Row gutter={[48, 48]}>
              <Col xs={24} md={12}>
                <Card className="course-type-card">
                  <ExperimentOutlined className="course-icon" />
                  <Title level={3}>实验室轮转课程</Title>
                  <Paragraph>
                    跨学科研究体验，培养创新思维。学生可在多个实验室进行科研实践，
                    接触前沿研究领域，培养综合研究能力。
                  </Paragraph>
                </Card>
              </Col>
              <Col xs={24} md={12}>
                <Card className="course-type-card">
                  <BarChartOutlined className="course-icon" />
                  <Title level={3}>综合素质评价课程</Title>
                  <Paragraph>
                    全方位能力评估，促进全面发展。通过多维度评价体系，
                    帮助学生发现潜能，实现个性化成长。
                  </Paragraph>
                </Card>
              </Col>
            </Row>
          </div>
        </section>

        {/* Key Features Grid */}
        <section className="features-section">
          <div className="container">
            <Title level={2} className="section-title">核心功能</Title>
            <Row gutter={[24, 24]}>
              {features.map((feature, index) => (
                <Col xs={24} sm={12} lg={6} key={index}>
                  <Card className="feature-card" hoverable>
                    <div className="feature-icon">{feature.icon}</div>
                    <Title level={4}>{feature.title}</Title>
                    <Paragraph>{feature.description}</Paragraph>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        </section>

        {/* Institution Credibility Section */}
        <section className="credibility-section">
          <div className="container">
            <div className="institution-info">
              <Title level={2}>华中科技大学</Title>
              <Title level={4}>机械科学与工程学院</Title>
            </div>
            <Row gutter={[48, 48]} className="statistics-row">
              {statistics.map((stat, index) => (
                <Col xs={12} sm={6} key={index}>
                  <Statistic
                    title={stat.title}
                    value={stat.value}
                    suffix={stat.suffix}
                    className="statistic-item"
                  />
                </Col>
              ))}
            </Row>
          </div>
        </section>
      </Content>

      <Footer className="homepage-footer">
        <div className="footer-content">
          <div className="footer-section">
            <Title level={5}>快速链接</Title>
            <Space direction="vertical">
              <a href="#about">关于系统</a>
              <a href="#help">帮助文档</a>
              <a href="#contact">联系我们</a>
            </Space>
          </div>
          <div className="footer-section">
            <Title level={5}>技术支持</Title>
            <Paragraph>
              Email: support@hust.edu.cn<br />
              电话: 027-87542xxx
            </Paragraph>
          </div>
          <div className="footer-section">
            <Title level={5}>法律信息</Title>
            <Space direction="vertical">
              <a href="#privacy">隐私政策</a>
              <a href="#terms">服务条款</a>
            </Space>
          </div>
        </div>
        <div className="footer-bottom">
          <Text>© 2025 华中科技大学机械科学与工程学院 版权所有</Text>
        </div>
      </Footer>
    </Layout>
  );
};

export default Homepage;