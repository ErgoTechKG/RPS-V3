import React, { useState, useEffect, useCallback } from 'react';
import { Layout, Typography, Button, Space, Avatar, Row, Col, Dropdown, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts';
import {
  SolutionOutlined,
  LogoutOutlined,
  ReloadOutlined,
  FileTextOutlined,
  SendOutlined,
  DownloadOutlined,
  SettingOutlined,
  ClockCircleOutlined
} from '@ant-design/icons';
import RealtimeStats from '@/components/Dashboard/RealtimeStats';
import TaskMonitor from '@/components/Dashboard/TaskMonitor';
import AlertSystem, { Alert } from '@/components/Dashboard/AlertSystem';
import CourseProgress from '@/components/Dashboard/CourseProgress';
import dayjs from 'dayjs';

const { Header, Content } = Layout;
const { Title, Text } = Typography;

const SecretaryDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [currentTime, setCurrentTime] = useState(dayjs());
  const [lastRefresh, setLastRefresh] = useState(Date.now());
  const [isAutoRefresh, setIsAutoRefresh] = useState(true);

  // Mock data state - in real app, this would come from API
  const [dashboardData, setDashboardData] = useState({
    stats: {
      activeUsers: 156,
      activeCourses: 8,
      pendingReviews: 12,
      newTasks: 7,
      trends: {
        activeUsers: '+12',
        activeCourses: '+3',
        pendingReviews: '-2',
        newTasks: '+5'
      }
    },
    tasks: {
      pending: 23,
      inProgress: 45,
      overdue: 5,
      completed: 78
    },
    alerts: [
      {
        id: '1',
        level: 'urgent' as const,
        title: '教授A未提交成绩',
        description: '超期2天，请立即处理',
        time: '2分钟前',
        handled: false
      },
      {
        id: '2',
        level: 'important' as const,
        title: '学生申请截止临近',
        description: '实验室轮转申请将在12小时后截止',
        time: '15分钟前',
        handled: false
      },
      {
        id: '3',
        level: 'normal' as const,
        title: '场地冲突需协调',
        description: '下周三的实验室预约存在冲突',
        time: '1小时前',
        handled: false
      }
    ],
    courses: [
      {
        name: '实验室轮转',
        overallProgress: 65,
        stages: [
          { name: '申请阶段', progress: 100, participants: 120, status: 'completed' as const },
          { name: '匹配阶段', progress: 100, participants: 118, status: 'completed' as const },
          { name: '学习阶段', progress: 60, participants: 78, status: 'active' as const },
          { name: '成果阶段', progress: 20, participants: 0, status: 'pending' as const }
        ]
      },
      {
        name: '综合素质评价',
        overallProgress: 45,
        stages: [
          { name: '准备阶段', progress: 100, participants: 450, status: 'completed' as const },
          { name: '提交阶段', progress: 60, participants: 270, status: 'active' as const },
          { name: '评审阶段', progress: 0, participants: 0, status: 'pending' as const },
          { name: '公示阶段', progress: 0, participants: 0, status: 'pending' as const }
        ]
      }
    ]
  });

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(dayjs());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Auto refresh data every 30 seconds
  useEffect(() => {
    if (!isAutoRefresh) return;

    const refreshData = () => {
      // Simulate data refresh - in real app, this would fetch from API
      setLastRefresh(Date.now());
      // Simulate some data changes
      setDashboardData(prev => ({
        ...prev,
        stats: {
          ...prev.stats,
          activeUsers: prev.stats.activeUsers + Math.floor(Math.random() * 5) - 2,
          newTasks: prev.stats.newTasks + Math.floor(Math.random() * 3)
        }
      }));
      message.success('数据已刷新', 1);
    };

    const interval = setInterval(refreshData, 30000);
    return () => clearInterval(interval);
  }, [isAutoRefresh]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleManualRefresh = () => {
    setLastRefresh(Date.now());
    message.success('数据已刷新');
  };

  const handleGenerateReport = () => {
    message.loading('正在生成报告...', 2).then(() => {
      message.success('报告生成成功！');
    });
  };

  const handleBatchReminder = () => {
    message.loading('正在发送批量提醒...', 2).then(() => {
      message.success('已发送5个任务提醒');
    });
  };

  const handleExportData = () => {
    message.loading('正在导出数据...', 2).then(() => {
      message.success('数据导出成功！');
    });
  };

  const handleAlertAction = useCallback((alertId: string) => {
    setDashboardData(prev => ({
      ...prev,
      alerts: prev.alerts.map(alert =>
        alert.id === alertId ? { ...alert, handled: true } : alert
      )
    }));
    message.success('预警已处理');
  }, []);

  const quickActions = [
    {
      key: 'report',
      label: '生成报告',
      icon: <FileTextOutlined />,
      onClick: handleGenerateReport
    },
    {
      key: 'reminder',
      label: '批量催收',
      icon: <SendOutlined />,
      onClick: handleBatchReminder
    },
    {
      key: 'export',
      label: '导出数据',
      icon: <DownloadOutlined />,
      onClick: handleExportData
    }
  ];

  return (
    <Layout style={{ minHeight: '100vh', backgroundColor: '#f0f2f5' }}>
      <Header style={{ 
        background: '#001529', 
        padding: '0 24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', color: 'white' }}>
          <Title level={4} style={{ margin: 0, color: 'white' }}>
            科研管理监控中心
          </Title>
          <Text style={{ marginLeft: '24px', color: 'rgba(255,255,255,0.85)' }}>
            {user?.name} (科研秘书)
          </Text>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <Text style={{ color: 'rgba(255,255,255,0.85)', fontSize: '16px' }}>
            <ClockCircleOutlined /> {currentTime.format('YYYY-MM-DD HH:mm:ss')}
          </Text>
          
          <Space>
            <Dropdown menu={{ items: quickActions }} placement="bottomRight">
              <Button type="primary" icon={<FileTextOutlined />}>
                快捷操作
              </Button>
            </Dropdown>
            
            <Button 
              icon={<ReloadOutlined spin={!isAutoRefresh} />} 
              onClick={() => {
                setIsAutoRefresh(!isAutoRefresh);
                if (!isAutoRefresh) {
                  message.info('已开启自动刷新');
                } else {
                  message.info('已关闭自动刷新');
                }
              }}
            >
              {isAutoRefresh ? '自动刷新' : '手动模式'}
            </Button>
            
            <Button icon={<SettingOutlined />}>设置</Button>
            
            <Button type="text" icon={<LogoutOutlined />} onClick={handleLogout} style={{ color: 'white' }}>
              退出
            </Button>
          </Space>
        </div>
      </Header>

      <Content style={{ padding: '24px' }}>
        <div style={{ maxWidth: '1600px', margin: '0 auto' }}>
          {/* Top row - Real-time stats, Task monitor, Alerts */}
          <Row gutter={[16, 16]} style={{ marginBottom: '16px' }}>
            <Col xs={24} lg={8}>
              <RealtimeStats stats={dashboardData.stats} />
            </Col>
            <Col xs={24} lg={8}>
              <TaskMonitor taskData={dashboardData.tasks} />
            </Col>
            <Col xs={24} lg={8}>
              <AlertSystem 
                alerts={dashboardData.alerts} 
                onHandleAlert={handleAlertAction}
                onViewAll={() => message.info('查看全部预警')}
              />
            </Col>
          </Row>

          {/* Bottom row - Course progress */}
          <Row gutter={[16, 16]}>
            <Col xs={24}>
              <CourseProgress courses={dashboardData.courses} />
            </Col>
          </Row>

          {/* Last refresh indicator */}
          <div style={{ 
            textAlign: 'center', 
            marginTop: '24px',
            color: '#999',
            fontSize: '12px'
          }}>
            <Space>
              <Text type="secondary">
                最后刷新: {dayjs(lastRefresh).format('HH:mm:ss')}
              </Text>
              <Button 
                type="link" 
                size="small" 
                onClick={handleManualRefresh}
                icon={<ReloadOutlined />}
              >
                立即刷新
              </Button>
            </Space>
          </div>
        </div>
      </Content>
    </Layout>
  );
};

export default SecretaryDashboard;