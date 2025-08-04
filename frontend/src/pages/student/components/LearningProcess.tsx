import React, { useState } from 'react';
import { Card, Tabs, Row, Col, Button, Progress, Tag, List, Avatar, Badge, Timeline, Form, Input, Upload, Table, Space, Divider, Typography, Alert, Checkbox } from 'antd';
import {
  FileTextOutlined,
  ExperimentOutlined,
  BookOutlined,
  BarChartOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  UserOutlined,
  UploadOutlined,
  InboxOutlined,
  CalendarOutlined,
  MessageOutlined,
  BellOutlined,
  PlusOutlined,
  EditOutlined
} from '@ant-design/icons';

const { TabPane } = Tabs;
const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;
const { Dragger } = Upload;

interface LearningProcessProps {
  activeView: 'tasks' | 'submissions' | 'meetings';
}

const LearningProcess: React.FC<LearningProcessProps> = ({ activeView }) => {
  const [selectedTasks, setSelectedTasks] = useState<string[]>([]);
  const [taskFilter, setTaskFilter] = useState('all');

  // Mock data for tasks
  const tasks = [
    {
      id: '1',
      title: '阅读相关文献',
      description: '阅读深度学习和医学图像处理相关的经典论文，整理读书笔记',
      type: 'reading',
      priority: 'high',
      deadline: '2024-03-20',
      status: 'pending',
      progress: 30,
      estimatedHours: 12,
      actualHours: 4,
      course: '基于深度学习的图像识别',
      professor: '张教授'
    },
    {
      id: '2',
      title: '环境配置和代码调试',
      description: '配置深度学习开发环境，包括Python、TensorFlow等工具的安装和测试',
      type: 'experiment',
      priority: 'high',
      deadline: '2024-03-18',
      status: 'in_progress',
      progress: 80,
      estimatedHours: 8,
      actualHours: 6,
      course: '基于深度学习的图像识别',
      professor: '张教授'
    },
    {
      id: '3',
      title: '数据预处理脚本开发',
      description: '编写医学图像数据预处理代码，包括图像增强、标准化等',
      type: 'assignment',
      priority: 'medium',
      deadline: '2024-03-25',
      status: 'completed',
      progress: 100,
      estimatedHours: 16,
      actualHours: 18,
      course: '基于深度学习的图像识别',
      professor: '张教授'
    },
    {
      id: '4',
      title: '周报撰写',
      description: '总结本周学习进展，记录遇到的问题和解决方案',
      type: 'report',
      priority: 'medium',
      deadline: '2024-03-22',
      status: 'pending',
      progress: 0,
      estimatedHours: 2,
      actualHours: 0,
      course: '基于深度学习的图像识别',
      professor: '张教授'
    }
  ];

  // Mock submission data
  const submissions = [
    {
      id: '1',
      title: '文献阅读报告',
      description: '深度学习在医学图像分析中的应用综述',
      dueDate: '2024-03-20',
      submissionDate: '2024-03-19',
      status: 'submitted',
      grade: null,
      feedback: '',
      files: ['literature_review.pdf'],
      version: 2
    },
    {
      id: '2',
      title: '数据预处理代码',
      description: '医学图像数据预处理Python脚本',
      dueDate: '2024-03-25',
      submissionDate: '2024-03-24',
      status: 'graded',
      grade: 'A',
      feedback: '代码结构清晰，注释详细。建议进一步优化数据增强算法的效率。',
      files: ['preprocessing.py', 'utils.py', 'requirements.txt'],
      version: 3
    },
    {
      id: '3',
      title: '实验设计方案',
      description: 'CNN模型设计和实验方案',
      dueDate: '2024-04-01',
      submissionDate: null,
      status: 'pending',
      grade: null,
      feedback: '',
      files: [],
      version: 1
    }
  ];

  // Mock meeting data
  const meetings = [
    {
      id: '1',
      title: '项目启动会',
      date: '2024-03-10',
      time: '14:00-15:30',
      type: 'kick_off',
      status: 'completed',
      attendees: ['张教授', '李同学', '王同学'],
      location: '线上会议（腾讯会议）',
      agenda: ['项目背景介绍', '研究目标确定', '时间安排讨论', '分工协作'],
      notes: '确定了项目的整体框架和时间节点，分配了初期任务。下周开始文献调研工作。',
      actions: ['李同学负责深度学习相关文献调研', '王同学负责医学图像数据收集']
    },
    {
      id: '2',
      title: '进度汇报会',
      date: '2024-03-17',
      time: '10:00-11:00',
      type: 'progress',
      status: 'completed',
      attendees: ['张教授', '李同学'],
      location: '实验室A308',
      agenda: ['上周进展汇报', '遇到问题讨论', '下周计划制定'],
      notes: '汇报了文献调研成果，讨论了数据预处理中的技术难点。教授给出了针对性建议。',
      actions: ['完善数据预处理算法', '准备实验环境配置', '下周三提交预处理代码']
    },
    {
      id: '3',
      title: '技术讨论会',
      date: '2024-03-24',
      time: '15:00-16:00',
      type: 'technical',
      status: 'scheduled',
      attendees: ['张教授', '李同学', '博士生A'],
      location: '线上会议（腾讯会议）',
      agenda: ['CNN架构设计讨论', '训练策略制定', '评估指标确定'],
      notes: '',
      actions: []
    }
  ];

  const getTaskTypeIcon = (type: string) => {
    switch (type) {
      case 'reading': return <BookOutlined />;
      case 'experiment': return <ExperimentOutlined />;
      case 'assignment': return <FileTextOutlined />;
      case 'report': return <BarChartOutlined />;
      default: return <FileTextOutlined />;
    }
  };

  const getTaskTypeColor = (type: string) => {
    switch (type) {
      case 'reading': return '#52c41a';
      case 'experiment': return '#1890ff';
      case 'assignment': return '#fa8c16';
      case 'report': return '#722ed1';
      default: return '#d9d9d9';
    }
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
      case 'completed': return '#52c41a';
      case 'in_progress': return '#1890ff';
      case 'pending': return '#fa8c16';
      case 'overdue': return '#ff4d4f';
      default: return '#d9d9d9';
    }
  };

  // Task list management
  const renderTaskList = () => {
    const filteredTasks = tasks.filter(task => {
      if (taskFilter === 'all') return true;
      if (taskFilter === 'pending') return task.status === 'pending';
      if (taskFilter === 'in_progress') return task.status === 'in_progress';
      if (taskFilter === 'completed') return task.status === 'completed';
      return true;
    });

    return (
      <div>
        {/* Filter Tabs */}
        <Card size="small" style={{ marginBottom: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Space>
              <Button 
                type={taskFilter === 'all' ? 'primary' : 'default'}
                size="small"
                onClick={() => setTaskFilter('all')}
              >
                全部 ({tasks.length})
              </Button>
              <Button 
                type={taskFilter === 'pending' ? 'primary' : 'default'}
                size="small"
                onClick={() => setTaskFilter('pending')}
              >
                待完成 ({tasks.filter(t => t.status === 'pending').length})
              </Button>
              <Button 
                type={taskFilter === 'in_progress' ? 'primary' : 'default'}
                size="small"
                onClick={() => setTaskFilter('in_progress')}
              >
                进行中 ({tasks.filter(t => t.status === 'in_progress').length})
              </Button>
              <Button 
                type={taskFilter === 'completed' ? 'primary' : 'default'}
                size="small"
                onClick={() => setTaskFilter('completed')}
              >
                已完成 ({tasks.filter(t => t.status === 'completed').length})
              </Button>
            </Space>
            <Space>
              <Button size="small">批量操作</Button>
              <Button type="primary" size="small" icon={<PlusOutlined />}>
                新建任务
              </Button>
            </Space>
          </div>
        </Card>

        {/* Task Cards */}
        <div>
          {filteredTasks.map(task => (
            <Card 
              key={task.id}
              style={{ 
                marginBottom: '16px',
                borderLeft: `4px solid ${getTaskTypeColor(task.type)}`
              }}
              size="small"
            >
              <Row gutter={[16, 16]}>
                <Col xs={24} lg={16}>
                  <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                    <Checkbox
                      checked={selectedTasks.includes(task.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedTasks([...selectedTasks, task.id]);
                        } else {
                          setSelectedTasks(selectedTasks.filter(id => id !== task.id));
                        }
                      }}
                      style={{ marginRight: '12px', marginTop: '4px' }}
                    />
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                        <span style={{ color: getTaskTypeColor(task.type), marginRight: '8px' }}>
                          {getTaskTypeIcon(task.type)}
                        </span>
                        <Text strong>{task.title}</Text>
                        <Tag 
                          color={getPriorityColor(task.priority)} 
                          style={{ marginLeft: '8px' }}
                        >
                          {task.priority === 'high' ? '高' : task.priority === 'medium' ? '中' : '低'}
                        </Tag>
                        <Tag 
                          color={getStatusColor(task.status)}
                        >
                          {task.status === 'completed' ? '已完成' : 
                           task.status === 'in_progress' ? '进行中' : '待完成'}
                        </Tag>
                      </div>
                      <Paragraph 
                        style={{ fontSize: '14px', color: '#595959', marginBottom: '12px' }}
                        ellipsis={{ rows: 2 }}
                      >
                        {task.description}
                      </Paragraph>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '12px', color: '#8c8c8c' }}>
                        <span>
                          <ClockCircleOutlined style={{ marginRight: '4px' }} />
                          截止: {task.deadline}
                        </span>
                        <span>
                          课程: {task.course}
                        </span>
                        <span>
                          导师: {task.professor}
                        </span>
                      </div>
                    </div>
                  </div>
                </Col>
                <Col xs={24} lg={8}>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ marginBottom: '8px' }}>
                      <Text type="secondary" style={{ fontSize: '12px' }}>
                        进度: {task.progress}%
                      </Text>
                    </div>
                    <Progress 
                      percent={task.progress}
                      size="small"
                      strokeColor={getStatusColor(task.status)}
                      style={{ marginBottom: '8px' }}
                    />
                    <div style={{ fontSize: '11px', color: '#8c8c8c', marginBottom: '8px' }}>
                      预计: {task.estimatedHours}h | 实际: {task.actualHours}h
                    </div>
                    <Space size="small">
                      <Button size="small" icon={<EditOutlined />}>
                        编辑
                      </Button>
                      <Button size="small" type="primary">
                        查看
                      </Button>
                    </Space>
                  </div>
                </Col>
              </Row>
            </Card>
          ))}
        </div>
      </div>
    );
  };

  // Assignment submissions
  const renderSubmissions = () => {
    const columns = [
      {
        title: '作业名称',
        dataIndex: 'title',
        key: 'title',
        render: (text: string, record: any) => (
          <div>
            <div style={{ fontWeight: 'bold' }}>{text}</div>
            <div style={{ fontSize: '12px', color: '#8c8c8c' }}>{record.description}</div>
          </div>
        )
      },
      {
        title: '截止时间',
        dataIndex: 'dueDate',
        key: 'dueDate',
        render: (date: string) => (
          <div style={{ fontSize: '12px' }}>
            {date}
          </div>
        )
      },
      {
        title: '提交状态',
        dataIndex: 'status',
        key: 'status',
        render: (status: string, record: any) => {
          let color = '';
          let text = '';
          switch (status) {
            case 'pending':
              color = 'orange';
              text = '待提交';
              break;
            case 'submitted':
              color = 'blue';
              text = '已提交';
              break;
            case 'graded':
              color = 'green';
              text = '已批改';
              break;
            default:
              color = 'default';
              text = status;
          }
          return (
            <div>
              <Tag color={color}>{text}</Tag>
              {record.submissionDate && (
                <div style={{ fontSize: '11px', color: '#8c8c8c', marginTop: '2px' }}>
                  {record.submissionDate}
                </div>
              )}
            </div>
          );
        }
      },
      {
        title: '成绩',
        dataIndex: 'grade',
        key: 'grade',
        render: (grade: string, record: any) => (
          <div>
            {grade ? (
              <Tag color="green" style={{ fontSize: '14px', fontWeight: 'bold' }}>
                {grade}
              </Tag>
            ) : (
              <Text type="secondary">-</Text>
            )}
          </div>
        )
      },
      {
        title: '操作',
        key: 'actions',
        render: (record: any) => (
          <Space size="small">
            {record.status === 'pending' && (
              <Button type="primary" size="small">
                提交
              </Button>
            )}
            <Button size="small">
              查看
            </Button>
            {record.feedback && (
              <Button size="small">
                反馈
              </Button>
            )}
          </Space>
        )
      }
    ];

    return (
      <div>
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <Title level={4} style={{ margin: 0 }}>作业提交记录</Title>
            <Button type="primary" icon={<UploadOutlined />}>
              新作业提交
            </Button>
          </div>
          
          <Table
            columns={columns}
            dataSource={submissions}
            rowKey="id"
            size="small"
            expandable={{
              expandedRowRender: (record) => (
                <div style={{ padding: '16px', backgroundColor: '#fafafa' }}>
                  {record.feedback && (
                    <div style={{ marginBottom: '12px' }}>
                      <Text strong>导师反馈：</Text>
                      <div style={{ marginTop: '4px', fontSize: '14px' }}>
                        {record.feedback}
                      </div>
                    </div>
                  )}
                  {record.files && record.files.length > 0 && (
                    <div>
                      <Text strong>提交文件：</Text>
                      <div style={{ marginTop: '4px' }}>
                        {record.files.map((file: string, index: number) => (
                          <Tag key={index} style={{ marginBottom: '4px' }}>
                            <FileTextOutlined style={{ marginRight: '4px' }} />
                            {file}
                          </Tag>
                        ))}
                      </div>
                    </div>
                  )}
                  <div style={{ marginTop: '8px', fontSize: '12px', color: '#8c8c8c' }}>
                    版本: v{record.version}
                  </div>
                </div>
              ),
              rowExpandable: (record) => record.feedback || (record.files && record.files.length > 0)
            }}
          />
        </Card>
        
        {/* Quick Submit Form */}
        <Card title="快速提交" style={{ marginTop: '24px' }}>
          <Form layout="vertical">
            <Row gutter={[16, 16]}>
              <Col xs={24} md={12}>
                <Form.Item label="选择作业" required>
                  <select style={{ width: '100%', padding: '8px', border: '1px solid #d9d9d9', borderRadius: '4px' }}>
                    <option>请选择要提交的作业</option>
                    {submissions.filter(s => s.status === 'pending').map(s => (
                      <option key={s.id} value={s.id}>{s.title}</option>
                    ))}
                  </select>
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item label="提交说明">
                  <TextArea rows={2} placeholder="请简要说明本次提交的内容..." />
                </Form.Item>
              </Col>
              <Col xs={24}>
                <Form.Item label="上传文件">
                  <Dragger
                    name="files"
                    multiple={true}
                    action="/upload"
                    accept=".pdf,.doc,.docx,.py,.zip"
                  >
                    <p className="ant-upload-drag-icon">
                      <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">点击或拖拽文件到此区域上传</p>
                    <p className="ant-upload-hint">
                      支持单个或批量上传，支持 PDF、Word、代码文件等格式
                    </p>
                  </Dragger>
                </Form.Item>
              </Col>
            </Row>
            <Form.Item>
              <Button type="primary" size="large">
                提交作业
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    );
  };

  // Meeting records
  const renderMeetings = () => (
    <div>
      <Row gutter={[24, 24]}>
        <Col xs={24} lg={16}>
          <Card 
            title="会议记录"
            extra={<Button type="primary" icon={<PlusOutlined />}>安排新会议</Button>}
          >
            <Timeline>
              {meetings.map(meeting => (
                <Timeline.Item
                  key={meeting.id}
                  color={meeting.status === 'completed' ? 'green' : 
                         meeting.status === 'scheduled' ? 'blue' : 'gray'}
                  dot={
                    meeting.status === 'completed' ? <CheckCircleOutlined /> :
                    meeting.status === 'scheduled' ? <CalendarOutlined /> : <ClockCircleOutlined />
                  }
                >
                  <Card size="small" style={{ marginBottom: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                      <div>
                        <Text strong style={{ fontSize: '16px' }}>{meeting.title}</Text>
                        <div style={{ fontSize: '12px', color: '#8c8c8c', marginTop: '4px' }}>
                          {meeting.date} {meeting.time}
                        </div>
                      </div>
                      <div>
                        <Tag color={
                          meeting.type === 'kick_off' ? 'red' :
                          meeting.type === 'progress' ? 'blue' :
                          meeting.type === 'technical' ? 'green' : 'default'
                        }>
                          {meeting.type === 'kick_off' ? '启动会' :
                           meeting.type === 'progress' ? '进度会' :
                           meeting.type === 'technical' ? '技术讨论' : meeting.type}
                        </Tag>
                        <Tag color={
                          meeting.status === 'completed' ? 'green' :
                          meeting.status === 'scheduled' ? 'blue' : 'orange'
                        }>
                          {meeting.status === 'completed' ? '已完成' :
                           meeting.status === 'scheduled' ? '已安排' : '待安排'}
                        </Tag>
                      </div>
                    </div>
                    
                    <div style={{ marginBottom: '12px' }}>
                      <Text strong>参会人员: </Text>
                      <Space size="small">
                        {meeting.attendees.map(attendee => (
                          <Tag key={attendee} icon={<UserOutlined />}>
                            {attendee}
                          </Tag>
                        ))}
                      </Space>
                    </div>
                    
                    <div style={{ marginBottom: '12px' }}>
                      <Text strong>地点: </Text>
                      <Text>{meeting.location}</Text>
                    </div>
                    
                    <div style={{ marginBottom: '12px' }}>
                      <Text strong>议程: </Text>
                      <ul style={{ margin: '4px 0 0 16px', fontSize: '14px' }}>
                        {meeting.agenda.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </div>
                    
                    {meeting.notes && (
                      <div style={{ marginBottom: '12px' }}>
                        <Text strong>会议纪要: </Text>
                        <Paragraph style={{ fontSize: '14px', marginTop: '4px' }}>
                          {meeting.notes}
                        </Paragraph>
                      </div>
                    )}
                    
                    {meeting.actions && meeting.actions.length > 0 && (
                      <div>
                        <Text strong>行动计划: </Text>
                        <ul style={{ margin: '4px 0 0 16px', fontSize: '14px' }}>
                          {meeting.actions.map((action, index) => (
                            <li key={index}>{action}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    <Divider style={{ margin: '12px 0' }} />
                    <Space size="small">
                      <Button size="small" icon={<EditOutlined />}>
                        编辑记录
                      </Button>
                      {meeting.status === 'scheduled' && (
                        <Button size="small" icon={<MessageOutlined />}>
                          发送提醒
                        </Button>
                      )}
                    </Space>
                  </Card>
                </Timeline.Item>
              ))}
            </Timeline>
          </Card>
        </Col>
        
        <Col xs={24} lg={8}>
          <Card title="即将到来的会议" style={{ marginBottom: '24px' }}>
            <List
              dataSource={meetings.filter(m => m.status === 'scheduled')}
              renderItem={(meeting) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar icon={<CalendarOutlined />} />}
                    title={meeting.title}
                    description={
                      <div>
                        <div>{meeting.date} {meeting.time}</div>
                        <div style={{ fontSize: '12px', color: '#8c8c8c' }}>
                          {meeting.location}
                        </div>
                      </div>
                    }
                  />
                  <Button size="small" type="primary">
                    参加
                  </Button>
                </List.Item>
              )}
            />
          </Card>
          
          <Card title="会议统计">
            <div style={{ textAlign: 'center' }}>
              <Row gutter={[16, 16]}>
                <Col xs={12}>
                  <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#1890ff' }}>
                    {meetings.filter(m => m.status === 'completed').length}
                  </div>
                  <div style={{ fontSize: '12px', color: '#8c8c8c' }}>已完成</div>
                </Col>
                <Col xs={12}>
                  <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#52c41a' }}>
                    {meetings.filter(m => m.status === 'scheduled').length}
                  </div>
                  <div style={{ fontSize: '12px', color: '#8c8c8c' }}>已安排</div>
                </Col>
              </Row>
            </div>
            
            <Divider />
            
            <div>
              <Text strong>本月会议频率</Text>
              <Progress percent={75} size="small" style={{ marginTop: '8px' }} />
              <div style={{ fontSize: '12px', color: '#8c8c8c', marginTop: '4px' }}>
                平均每周 1.5 次会议
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );

  // Render content based on active view
  const renderContent = () => {
    switch (activeView) {
      case 'tasks':
        return renderTaskList();
      case 'submissions':
        return renderSubmissions();
      case 'meetings':
        return renderMeetings();
      default:
        return <div>Invalid view</div>;
    }
  };

  return (
    <div>
      {renderContent()}
    </div>
  );
};

export default LearningProcess;