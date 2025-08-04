import React, { useState } from 'react';
import { Layout, Card, Typography, Button, Space, Row, Col, List, Badge, Tag, Timeline, Tabs, Alert, Input, Select, DatePicker, Empty } from 'antd';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeftOutlined,
  BellOutlined,
  ExclamationCircleOutlined,
  InfoCircleOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  SearchOutlined,
  FilterOutlined,
  NotificationOutlined,
  CalendarOutlined,
  FileTextOutlined,
  SettingOutlined,
  EyeOutlined,
  StarOutlined,
  StarFilled
} from '@ant-design/icons';

const { Header, Content } = Layout;
const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;
const { Search } = Input;
const { Option } = Select;
const { RangePicker } = DatePicker;

const EvaluationNotifications: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');
  const [searchText, setSearchText] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [starredItems, setStarredItems] = useState<string[]>(['1', '3']);

  // Mock data for notifications
  const notifications = [
    {
      id: '1',
      type: 'urgent',
      category: 'deadline',
      title: '提交截止日期提醒',
      content: '综合素质评价材料提交将于4月30日24:00截止，请确保在截止时间前完成所有材料的提交和审核。逾期提交将影响评价结果。',
      fullContent: '综合素质评价材料提交将于4月30日24:00截止，请确保在截止时间前完成所有材料的提交和审核。逾期提交将影响评价结果。\n\n请注意以下要点：\n1. 学术成果材料需要导师签字确认\n2. 社会活动证明材料需要盖章\n3. 自我评价需要完整填写\n4. 所有材料需要通过系统审核',
      time: '2024-04-05 10:00',
      isRead: false,
      isImportant: true,
      sender: '系统通知',
      attachments: []
    },
    {
      id: '2',
      type: 'info',
      category: 'announcement',
      title: '评价标准更新通知',
      content: '2024年综合素质评价标准已更新，新增了科研创新能力评价指标，请及时查看最新的评价指南。',
      fullContent: '2024年综合素质评价标准已更新，新增了科研创新能力评价指标，请及时查看最新的评价指南。\n\n主要更新内容：\n1. 新增科研创新能力评价维度\n2. 调整学术成果权重分配\n3. 完善社会实践评价标准\n4. 优化综合评价算法\n\n请登录系统查看详细的评价标准文档。',
      time: '2024-04-03 14:30',
      isRead: true,
      isImportant: false,
      sender: '教务处',
      attachments: ['评价标准2024.pdf']
    },
    {
      id: '3',
      type: 'success',
      category: 'approval',
      title: '学术成果审核通过',
      content: '您提交的论文《深度学习在图像识别中的应用》已通过导师审核，现已计入学术成果评价。',
      fullContent: '您提交的论文《深度学习在图像识别中的应用》已通过导师审核，现已计入学术成果评价。\n\n审核详情：\n- 审核导师：张教授\n- 审核时间：2024-04-02 09:15\n- 评价等级：A级\n- 审核意见：研究内容新颖，方法科学合理，具有较高的学术价值\n\n该成果将为您的综合评价加分。',
      time: '2024-04-02 09:15',
      isRead: true,
      isImportant: false,
      sender: '张教授',
      attachments: ['审核意见.pdf']
    },
    {
      id: '4',
      type: 'warning',
      category: 'reminder',
      title: '材料补充提醒',
      content: '您的社会活动部分缺少相关证明材料，请及时补充上传活动证书或证明文件。',
      fullContent: '您的社会活动部分缺少相关证明材料，请及时补充上传活动证书或证明文件。\n\n缺少材料清单：\n1. 志愿服务活动证明\n2. 学生组织任职证明\n3. 社会实践活动报告\n\n请在4月15日前完成材料补充，否则将影响该部分的评价结果。',
      time: '2024-04-01 16:20',
      isRead: false,
      isImportant: false,
      sender: '系统提醒',
      attachments: []
    },
    {
      id: '5',
      type: 'info',
      category: 'system',
      title: '系统维护通知',
      content: '评价系统将于4月10日凌晨2:00-4:00进行系统维护，维护期间暂停服务。',
      fullContent: '评价系统将于4月10日凌晨2:00-4:00进行系统维护，维护期间暂停服务。\n\n维护内容：\n1. 系统性能优化\n2. 新功能上线\n3. 安全补丁更新\n4. 数据库维护\n\n请提前安排好材料提交时间，避免在维护期间进行重要操作。',
      time: '2024-03-30 11:45',
      isRead: true,
      isImportant: false,
      sender: '系统管理员',
      attachments: []
    }
  ];

  // Mock data for evaluation timeline
  const evaluationTimeline = [
    {
      date: '2024-03-01',
      title: '评价启动',
      description: '2024春季学期综合素质评价正式开始',
      status: 'completed'
    },
    {
      date: '2024-03-15',
      title: '材料准备期',
      description: '学生开始准备和整理评价材料',
      status: 'completed'
    },
    {
      date: '2024-04-01',
      title: '提交阶段',
      description: '学生提交综合素质评价材料',
      status: 'current'
    },
    {
      date: '2024-04-30',
      title: '提交截止',
      description: '所有材料提交截止',
      status: 'pending'
    },
    {
      date: '2024-05-15',
      title: '审核阶段',
      description: '导师和评审委员会进行材料审核',
      status: 'pending'
    },
    {
      date: '2024-05-30',
      title: '结果公布',
      description: '综合素质评价结果正式公布',
      status: 'pending'
    }
  ];

  const handleStarToggle = (id: string) => {
    setStarredItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'urgent':
        return <ExclamationCircleOutlined style={{ color: '#ff4d4f' }} />;
      case 'success':
        return <CheckCircleOutlined style={{ color: '#52c41a' }} />;
      case 'warning':
        return <ExclamationCircleOutlined style={{ color: '#fa8c16' }} />;
      default:
        return <InfoCircleOutlined style={{ color: '#1890ff' }} />;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'urgent':
        return '#ff4d4f';
      case 'success':
        return '#52c41a';
      case 'warning':
        return '#fa8c16';
      default:
        return '#1890ff';
    }
  };

  const filteredNotifications = notifications.filter(notification => {
    const matchesSearch = notification.title.toLowerCase().includes(searchText.toLowerCase()) ||
                         notification.content.toLowerCase().includes(searchText.toLowerCase());
    const matchesType = filterType === 'all' || notification.type === filterType;
    const matchesTab = activeTab === 'all' || 
                      (activeTab === 'unread' && !notification.isRead) ||
                      (activeTab === 'important' && notification.isImportant) ||
                      (activeTab === 'starred' && starredItems.includes(notification.id));
    
    return matchesSearch && matchesType && matchesTab;
  });

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
            <Button 
              type="text" 
              icon={<ArrowLeftOutlined />} 
              onClick={() => navigate('/student/evaluation')}
              style={{ marginRight: '16px' }}
            >
              返回
            </Button>
            <BellOutlined style={{ fontSize: '24px', color: '#fa8c16', marginRight: '12px' }} />
            <Title level={3} style={{ margin: 0, color: '#262626' }}>
              通知中心
            </Title>
          </div>
          <Button type="text" icon={<SettingOutlined />}>
            通知设置
          </Button>
        </div>
      </Header>

      <Content style={{ padding: '24px', background: '#f5f5f5' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <Row gutter={[24, 24]}>
            {/* 左侧主要内容 */}
            <Col xs={24} lg={16}>
              <Card>
                {/* 搜索和筛选 */}
                <div style={{ marginBottom: '16px' }}>
                  <Row gutter={[16, 16]} align="middle">
                    <Col xs={24} sm={12}>
                      <Search
                        placeholder="搜索通知内容..."
                        allowClear
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        style={{ width: '100%' }}
                      />
                    </Col>
                    <Col xs={24} sm={8}>
                      <Select
                        value={filterType}
                        onChange={setFilterType}
                        style={{ width: '100%' }}
                        suffixIcon={<FilterOutlined />}
                      >
                        <Option value="all">全部类型</Option>
                        <Option value="urgent">紧急通知</Option>
                        <Option value="info">一般信息</Option>
                        <Option value="success">成功提醒</Option>
                        <Option value="warning">警告提醒</Option>
                      </Select>
                    </Col>
                  </Row>
                </div>

                {/* 标签页 */}
                <Tabs activeKey={activeTab} onChange={setActiveTab}>
                  <TabPane 
                    tab={
                      <span>
                        <NotificationOutlined />
                        全部通知
                        <Badge count={notifications.length} size="small" style={{ marginLeft: '8px' }} />
                      </span>
                    } 
                    key="all"
                  >
                    <List
                      itemLayout="vertical"
                      dataSource={filteredNotifications}
                      locale={{ emptyText: <Empty description="暂无通知" /> }}
                      renderItem={(notification) => (
                        <List.Item
                          style={{
                            background: notification.isRead ? '#fff' : '#f6ffed',
                            border: `1px solid ${notification.isRead ? '#f0f0f0' : '#b7eb8f'}`,
                            borderRadius: '8px',
                            marginBottom: '12px',
                            padding: '16px'
                          }}
                          actions={[
                            <Button 
                              type="text" 
                              size="small" 
                              icon={starredItems.includes(notification.id) ? <StarFilled /> : <StarOutlined />}
                              onClick={() => handleStarToggle(notification.id)}
                              style={{ color: starredItems.includes(notification.id) ? '#fa8c16' : undefined }}
                            >
                              {starredItems.includes(notification.id) ? '已收藏' : '收藏'}
                            </Button>,
                            <Button type="text" size="small" icon={<EyeOutlined />}>
                              详情
                            </Button>
                          ]}
                        >
                          <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                            <div style={{ marginRight: '12px', marginTop: '4px' }}>
                              {getNotificationIcon(notification.type)}
                            </div>
                            <div style={{ flex: 1 }}>
                              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                                <Text strong style={{ fontSize: '16px', marginRight: '8px' }}>
                                  {notification.title}
                                </Text>
                                {notification.isImportant && (
                                  <Tag color="red">重要</Tag>
                                )}
                                {!notification.isRead && (
                                  <Badge status="processing" text="未读" />
                                )}
                              </div>
                              <Paragraph 
                                style={{ marginBottom: '12px', color: '#595959' }}
                                ellipsis={{ rows: 2, expandable: true, symbol: '展开' }}
                              >
                                {notification.content}
                              </Paragraph>
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Space size="small">
                                  <Text type="secondary" style={{ fontSize: '12px' }}>
                                    <ClockCircleOutlined style={{ marginRight: '4px' }} />
                                    {notification.time}
                                  </Text>
                                  <Text type="secondary" style={{ fontSize: '12px' }}>
                                    发送者: {notification.sender}
                                  </Text>
                                </Space>
                                {notification.attachments.length > 0 && (
                                  <Space size="small">
                                    {notification.attachments.map((attachment, index) => (
                                      <Tag key={index} icon={<FileTextOutlined />} color="blue" style={{ cursor: 'pointer' }}>
                                        {attachment}
                                      </Tag>
                                    ))}
                                  </Space>
                                )}
                              </div>
                            </div>
                          </div>
                        </List.Item>
                      )}
                    />
                  </TabPane>

                  <TabPane 
                    tab={
                      <span>
                        <Badge count={notifications.filter(n => !n.isRead).length} size="small">
                          未读通知
                        </Badge>
                      </span>
                    } 
                    key="unread"
                  >
                    {/* 未读通知内容 */}
                  </TabPane>

                  <TabPane 
                    tab={
                      <span>
                        <ExclamationCircleOutlined />
                        重要通知
                        <Badge count={notifications.filter(n => n.isImportant).length} size="small" style={{ marginLeft: '8px' }} />
                      </span>
                    } 
                    key="important"
                  >
                    {/* 重要通知内容 */}
                  </TabPane>

                  <TabPane 
                    tab={
                      <span>
                        <StarOutlined />
                        收藏通知
                        <Badge count={starredItems.length} size="small" style={{ marginLeft: '8px' }} />
                      </span>
                    } 
                    key="starred"
                  >
                    {/* 收藏通知内容 */}
                  </TabPane>
                </Tabs>
              </Card>
            </Col>

            {/* 右侧边栏 */}
            <Col xs={24} lg={8}>
              {/* 评价时间线 */}
              <Card title={
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <CalendarOutlined style={{ marginRight: '8px', color: '#1890ff' }} />
                    评价时间线
                  </div>
                } 
                style={{ marginBottom: '24px' }}
              >
                <Timeline>
                  {evaluationTimeline.map((item, index) => (
                    <Timeline.Item
                      key={index}
                      color={
                        item.status === 'completed' ? 'green' :
                        item.status === 'current' ? 'blue' : 'gray'
                      }
                      dot={
                        item.status === 'current' ? 
                        <ClockCircleOutlined style={{ fontSize: '16px' }} /> : 
                        undefined
                      }
                    >
                      <div>
                        <Text strong>{item.title}</Text>
                        <div style={{ fontSize: '12px', color: '#8c8c8c', marginTop: '4px' }}>
                          {item.date}
                        </div>
                        <div style={{ fontSize: '13px', marginTop: '4px' }}>
                          {item.description}
                        </div>
                      </div>
                    </Timeline.Item>
                  ))}
                </Timeline>
              </Card>

              {/* 快速操作 */}
              <Card title="快速操作">
                <Space direction="vertical" style={{ width: '100%' }} size="middle">
                  <Button 
                    type="primary" 
                    block 
                    icon={<FileTextOutlined />}
                    onClick={() => navigate('/student/evaluation/submission')}
                  >
                    继续完善材料
                  </Button>
                  <Button 
                    block 
                    icon={<EyeOutlined />}
                    onClick={() => navigate('/student/evaluation/results')}
                  >
                    查看评价进度
                  </Button>
                  <Button 
                    block 
                    icon={<InfoCircleOutlined />}
                    onClick={() => navigate('/student/evaluation/guide')}
                  >
                    评价指南
                  </Button>
                </Space>

                <Alert
                  message="温馨提示"
                  description="距离材料提交截止还有25天，请合理安排时间完成材料准备。"
                  type="info"
                  showIcon
                  style={{ marginTop: '16px' }}
                />
              </Card>
            </Col>
          </Row>
        </div>
      </Content>
    </Layout>
  );
};

export default EvaluationNotifications;