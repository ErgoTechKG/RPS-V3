import React, { useState } from 'react';
import { 
  Card, 
  Tabs, 
  Table, 
  Button, 
  Space, 
  Tag, 
  Progress, 
  Avatar,
  DatePicker,
  Select,
  Input,
  Modal,
  Form,
  message,
  Timeline,
  Badge,
  Tooltip,
  Row,
  Col,
  Statistic
} from 'antd';
import {
  PlusOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  UserOutlined,
  CalendarOutlined,
  TeamOutlined,
  FileDoneOutlined,
  ExclamationCircleOutlined,
  MessageOutlined
} from '@ant-design/icons';
import MainLayout from '@/components/MainLayout';
import styles from './LabRotation.module.css';

const { TabPane } = Tabs;
const { TextArea } = Input;

interface Task {
  id: string;
  title: string;
  description: string;
  assignedTo: string[];
  deadline: string;
  status: 'pending' | 'in-progress' | 'completed' | 'overdue';
  priority: 'high' | 'medium' | 'low';
  type: 'assignment' | 'reading' | 'experiment' | 'report';
}

interface Meeting {
  id: string;
  title: string;
  date: string;
  time: string;
  type: 'weekly' | 'milestone' | 'special';
  participants: string[];
  location: string;
  agenda: string[];
  status: 'scheduled' | 'completed' | 'cancelled';
}

interface Milestone {
  id: string;
  name: string;
  description: string;
  dueDate: string;
  progress: number;
  submissions: number;
  totalStudents: number;
  status: 'pending' | 'in-progress' | 'completed';
}

const ProcessManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState('tasks');
  const [taskModalVisible, setTaskModalVisible] = useState(false);
  const [meetingModalVisible, setMeetingModalVisible] = useState(false);
  const [selectedTasks, setSelectedTasks] = useState<string[]>([]);
  const [taskForm] = Form.useForm();
  const [meetingForm] = Form.useForm();

  // Mock data
  const tasks: Task[] = [
    {
      id: '1',
      title: '文献综述',
      description: '阅读相关领域的5篇核心论文并撰写综述',
      assignedTo: ['李明', '王芳', '张强'],
      deadline: '2024-03-25',
      status: 'in-progress',
      priority: 'high',
      type: 'reading'
    },
    {
      id: '2',
      title: '实验设计方案',
      description: '完成实验设计方案并提交初稿',
      assignedTo: ['李明', '张强'],
      deadline: '2024-03-28',
      status: 'pending',
      priority: 'medium',
      type: 'assignment'
    },
    {
      id: '3',
      title: '数据采集',
      description: '按照实验方案采集第一批数据',
      assignedTo: ['王芳'],
      deadline: '2024-04-01',
      status: 'pending',
      priority: 'medium',
      type: 'experiment'
    }
  ];

  const meetings: Meeting[] = [
    {
      id: '1',
      title: '第5周组会',
      date: '2024-03-22',
      time: '14:00-16:00',
      type: 'weekly',
      participants: ['李明', '王芳', '张强', '赵丽'],
      location: 'A301会议室',
      agenda: ['进度汇报', '问题讨论', '下周计划'],
      status: 'scheduled'
    },
    {
      id: '2',
      title: '中期检查',
      date: '2024-04-15',
      time: '09:00-12:00',
      type: 'milestone',
      participants: ['全体学生'],
      location: '报告厅',
      agenda: ['PPT汇报', '专家提问', '导师点评'],
      status: 'scheduled'
    }
  ];

  const milestones: Milestone[] = [
    {
      id: '1',
      name: '文献调研',
      description: '完成相关领域的文献调研和综述',
      dueDate: '2024-03-25',
      progress: 75,
      submissions: 3,
      totalStudents: 4,
      status: 'in-progress'
    },
    {
      id: '2',
      name: '实验设计',
      description: '完成实验方案设计和可行性分析',
      dueDate: '2024-04-01',
      progress: 40,
      submissions: 1,
      totalStudents: 4,
      status: 'in-progress'
    },
    {
      id: '3',
      name: '中期报告',
      description: '提交中期研究报告',
      dueDate: '2024-04-15',
      progress: 0,
      submissions: 0,
      totalStudents: 4,
      status: 'pending'
    }
  ];

  const students = ['李明', '王芳', '张强', '赵丽'];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'red';
      case 'medium': return 'orange';
      case 'low': return 'green';
      default: return 'default';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'success';
      case 'in-progress': return 'processing';
      case 'overdue': return 'error';
      case 'pending': return 'default';
      default: return 'default';
    }
  };

  const getTaskIcon = (type: string) => {
    switch (type) {
      case 'assignment': return '📝';
      case 'reading': return '📚';
      case 'experiment': return '🔬';
      case 'report': return '📊';
      default: return '📋';
    }
  };

  const handleCreateTask = () => {
    taskForm.validateFields().then(values => {
      message.success('任务创建成功');
      setTaskModalVisible(false);
      taskForm.resetFields();
    });
  };

  const handleCreateMeeting = () => {
    meetingForm.validateFields().then(values => {
      message.success('会议安排成功');
      setMeetingModalVisible(false);
      meetingForm.resetFields();
    });
  };

  const taskColumns = [
    {
      title: '任务',
      dataIndex: 'title',
      key: 'title',
      render: (text: string, record: Task) => (
        <Space>
          <span style={{ fontSize: 18 }}>{getTaskIcon(record.type)}</span>
          <span>{text}</span>
        </Space>
      )
    },
    {
      title: '分配给',
      dataIndex: 'assignedTo',
      key: 'assignedTo',
      render: (assignedTo: string[]) => (
        <Avatar.Group maxCount={3}>
          {assignedTo.map(name => (
            <Tooltip key={name} title={name}>
              <Avatar style={{ backgroundColor: '#1890ff' }}>
                {name[0]}
              </Avatar>
            </Tooltip>
          ))}
        </Avatar.Group>
      )
    },
    {
      title: '截止时间',
      dataIndex: 'deadline',
      key: 'deadline',
      render: (deadline: string) => (
        <Space>
          <ClockCircleOutlined />
          {deadline}
        </Space>
      )
    },
    {
      title: '优先级',
      dataIndex: 'priority',
      key: 'priority',
      render: (priority: string) => (
        <Tag color={getPriorityColor(priority)}>
          {priority === 'high' ? '高' : priority === 'medium' ? '中' : '低'}
        </Tag>
      )
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Badge status={getStatusColor(status)} text={
          status === 'completed' ? '已完成' :
          status === 'in-progress' ? '进行中' :
          status === 'overdue' ? '已逾期' : '待开始'
        } />
      )
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: Task) => (
        <Space>
          <Button size="small" type="link">编辑</Button>
          <Button size="small" type="link">提醒</Button>
          <Button size="small" type="link" danger>删除</Button>
        </Space>
      )
    }
  ];

  const meetingColumns = [
    {
      title: '会议',
      dataIndex: 'title',
      key: 'title',
      render: (text: string, record: Meeting) => (
        <Space>
          <Tag color={record.type === 'weekly' ? 'blue' : record.type === 'milestone' ? 'purple' : 'orange'}>
            {record.type === 'weekly' ? '周会' : record.type === 'milestone' ? '里程碑' : '特殊'}
          </Tag>
          {text}
        </Space>
      )
    },
    {
      title: '时间',
      key: 'datetime',
      render: (record: Meeting) => (
        <Space>
          <CalendarOutlined />
          {record.date} {record.time}
        </Space>
      )
    },
    {
      title: '参与人',
      dataIndex: 'participants',
      key: 'participants',
      render: (participants: string[]) => (
        <Space>
          <TeamOutlined />
          {participants.length === students.length ? '全体学生' : `${participants.length}人`}
        </Space>
      )
    },
    {
      title: '地点',
      dataIndex: 'location',
      key: 'location'
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Badge 
          status={status === 'completed' ? 'success' : status === 'scheduled' ? 'processing' : 'default'} 
          text={status === 'completed' ? '已完成' : status === 'scheduled' ? '已安排' : '已取消'} 
        />
      )
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: Meeting) => (
        <Space>
          <Button size="small" type="link">查看详情</Button>
          <Button size="small" type="link">会议纪要</Button>
          <Button size="small" type="link" danger>取消</Button>
        </Space>
      )
    }
  ];

  const renderTasksTab = () => (
    <>
      <div style={{ marginBottom: 16 }}>
        <Row gutter={16}>
          <Col flex="auto">
            <Space>
              <Select defaultValue="all" style={{ width: 120 }}>
                <Select.Option value="all">全部任务</Select.Option>
                <Select.Option value="pending">待开始</Select.Option>
                <Select.Option value="in-progress">进行中</Select.Option>
                <Select.Option value="completed">已完成</Select.Option>
                <Select.Option value="overdue">已逾期</Select.Option>
              </Select>
              <Select defaultValue="all" style={{ width: 120 }}>
                <Select.Option value="all">全部学生</Select.Option>
                {students.map(student => (
                  <Select.Option key={student} value={student}>{student}</Select.Option>
                ))}
              </Select>
            </Space>
          </Col>
          <Col>
            <Button type="primary" icon={<PlusOutlined />} onClick={() => setTaskModalVisible(true)}>
              创建任务
            </Button>
          </Col>
        </Row>
      </div>

      <Table
        columns={taskColumns}
        dataSource={tasks}
        rowKey="id"
        rowSelection={{
          selectedRowKeys: selectedTasks,
          onChange: (selectedRowKeys) => setSelectedTasks(selectedRowKeys as string[])
        }}
      />

      {selectedTasks.length > 0 && (
        <div className={styles.batchActions}>
          <span className={styles.selectedCount}>已选择 {selectedTasks.length} 个任务</span>
          <Button onClick={() => setSelectedTasks([])}>取消选择</Button>
          <Button>批量提醒</Button>
          <Button danger>批量删除</Button>
        </div>
      )}
    </>
  );

  const renderMeetingsTab = () => (
    <>
      <div style={{ marginBottom: 16 }}>
        <Row justify="space-between">
          <Col>
            <Space>
              <DatePicker.RangePicker />
              <Select defaultValue="all" style={{ width: 120 }}>
                <Select.Option value="all">全部类型</Select.Option>
                <Select.Option value="weekly">周会</Select.Option>
                <Select.Option value="milestone">里程碑</Select.Option>
                <Select.Option value="special">特殊会议</Select.Option>
              </Select>
            </Space>
          </Col>
          <Col>
            <Button type="primary" icon={<PlusOutlined />} onClick={() => setMeetingModalVisible(true)}>
              安排会议
            </Button>
          </Col>
        </Row>
      </div>

      <Table
        columns={meetingColumns}
        dataSource={meetings}
        rowKey="id"
      />
    </>
  );

  const renderMilestonesTab = () => (
    <Row gutter={[16, 16]}>
      {milestones.map(milestone => (
        <Col xs={24} lg={8} key={milestone.id}>
          <Card
            title={
              <Space>
                <FileDoneOutlined />
                {milestone.name}
              </Space>
            }
            extra={
              <Tag color={milestone.status === 'completed' ? 'success' : milestone.status === 'in-progress' ? 'processing' : 'default'}>
                {milestone.status === 'completed' ? '已完成' : milestone.status === 'in-progress' ? '进行中' : '待开始'}
              </Tag>
            }
          >
            <p>{milestone.description}</p>
            <p><ClockCircleOutlined /> 截止日期: {milestone.dueDate}</p>
            
            <div style={{ margin: '16px 0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span>完成进度</span>
                <span>{milestone.progress}%</span>
              </div>
              <Progress percent={milestone.progress} strokeColor="#1890ff" />
            </div>

            <Row gutter={16} style={{ marginTop: 16 }}>
              <Col span={12}>
                <Statistic
                  title="已提交"
                  value={milestone.submissions}
                  suffix={`/ ${milestone.totalStudents}`}
                  prefix={<CheckCircleOutlined />}
                />
              </Col>
              <Col span={12}>
                <Statistic
                  title="未提交"
                  value={milestone.totalStudents - milestone.submissions}
                  valueStyle={{ color: '#ff4d4f' }}
                  prefix={<ExclamationCircleOutlined />}
                />
              </Col>
            </Row>

            <div style={{ marginTop: 16 }}>
              <Space>
                <Button size="small" type="primary">查看提交</Button>
                <Button size="small">发送提醒</Button>
              </Space>
            </div>
          </Card>
        </Col>
      ))}
    </Row>
  );

  const renderQATab = () => (
    <Row gutter={[16, 16]}>
      <Col xs={24} lg={16}>
        <Card title="最新问题">
          <Timeline>
            <Timeline.Item dot={<MessageOutlined style={{ fontSize: '16px' }} />} color="blue">
              <p><strong>李明:</strong> 关于实验设计中的控制变量问题</p>
              <p style={{ color: '#8c8c8c', fontSize: 12 }}>2小时前</p>
              <Button size="small" type="link">回复</Button>
            </Timeline.Item>
            <Timeline.Item dot={<MessageOutlined style={{ fontSize: '16px' }} />} color="green">
              <p><strong>王芳:</strong> 文献综述的格式要求是什么？</p>
              <p style={{ color: '#8c8c8c', fontSize: 12 }}>5小时前 - 已回复</p>
            </Timeline.Item>
            <Timeline.Item dot={<MessageOutlined style={{ fontSize: '16px' }} />} color="orange">
              <p><strong>张强:</strong> 数据分析使用什么软件比较好？</p>
              <p style={{ color: '#8c8c8c', fontSize: 12 }}>1天前</p>
              <Button size="small" type="link">回复</Button>
            </Timeline.Item>
          </Timeline>
        </Card>
      </Col>
      <Col xs={24} lg={8}>
        <Card title="快速回复模板">
          <Space direction="vertical" style={{ width: '100%' }}>
            <Button block>实验设计指导</Button>
            <Button block>文献综述要求</Button>
            <Button block>数据分析方法</Button>
            <Button block>报告撰写规范</Button>
            <Button block type="dashed">+ 添加模板</Button>
          </Space>
        </Card>
      </Col>
    </Row>
  );

  return (
    <MainLayout>
      <div className={styles.topicContainer}>
        <div className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>过程管理</h1>
        </div>

        <Card>
          <Tabs activeKey={activeTab} onChange={setActiveTab}>
            <TabPane tab={<span><ClockCircleOutlined /> 任务管理</span>} key="tasks">
              {renderTasksTab()}
            </TabPane>
            <TabPane tab={<span><CalendarOutlined /> 会议安排</span>} key="meetings">
              {renderMeetingsTab()}
            </TabPane>
            <TabPane tab={<span><FileDoneOutlined /> 里程碑</span>} key="milestones">
              {renderMilestonesTab()}
            </TabPane>
            <TabPane tab={<span><MessageOutlined /> 答疑互动</span>} key="qa">
              {renderQATab()}
            </TabPane>
          </Tabs>
        </Card>

        {/* Task Creation Modal */}
        <Modal
          title="创建任务"
          visible={taskModalVisible}
          onOk={handleCreateTask}
          onCancel={() => setTaskModalVisible(false)}
          width={600}
        >
          <Form form={taskForm} layout="vertical">
            <Form.Item
              name="title"
              label="任务标题"
              rules={[{ required: true, message: '请输入任务标题' }]}
            >
              <Input placeholder="请输入任务标题" />
            </Form.Item>
            <Form.Item
              name="type"
              label="任务类型"
              rules={[{ required: true, message: '请选择任务类型' }]}
            >
              <Select placeholder="请选择任务类型">
                <Select.Option value="assignment">作业</Select.Option>
                <Select.Option value="reading">阅读</Select.Option>
                <Select.Option value="experiment">实验</Select.Option>
                <Select.Option value="report">报告</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="description"
              label="任务描述"
              rules={[{ required: true, message: '请输入任务描述' }]}
            >
              <TextArea rows={3} placeholder="请输入任务描述" />
            </Form.Item>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="assignedTo"
                  label="分配给"
                  rules={[{ required: true, message: '请选择学生' }]}
                >
                  <Select mode="multiple" placeholder="请选择学生">
                    {students.map(student => (
                      <Select.Option key={student} value={student}>{student}</Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="deadline"
                  label="截止时间"
                  rules={[{ required: true, message: '请选择截止时间' }]}
                >
                  <DatePicker style={{ width: '100%' }} />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item
              name="priority"
              label="优先级"
              rules={[{ required: true, message: '请选择优先级' }]}
            >
              <Select placeholder="请选择优先级">
                <Select.Option value="high">高</Select.Option>
                <Select.Option value="medium">中</Select.Option>
                <Select.Option value="low">低</Select.Option>
              </Select>
            </Form.Item>
          </Form>
        </Modal>

        {/* Meeting Creation Modal */}
        <Modal
          title="安排会议"
          visible={meetingModalVisible}
          onOk={handleCreateMeeting}
          onCancel={() => setMeetingModalVisible(false)}
          width={600}
        >
          <Form form={meetingForm} layout="vertical">
            <Form.Item
              name="title"
              label="会议主题"
              rules={[{ required: true, message: '请输入会议主题' }]}
            >
              <Input placeholder="请输入会议主题" />
            </Form.Item>
            <Form.Item
              name="type"
              label="会议类型"
              rules={[{ required: true, message: '请选择会议类型' }]}
            >
              <Select placeholder="请选择会议类型">
                <Select.Option value="weekly">周会</Select.Option>
                <Select.Option value="milestone">里程碑检查</Select.Option>
                <Select.Option value="special">特殊会议</Select.Option>
              </Select>
            </Form.Item>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="date"
                  label="会议日期"
                  rules={[{ required: true, message: '请选择日期' }]}
                >
                  <DatePicker style={{ width: '100%' }} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="time"
                  label="会议时间"
                  rules={[{ required: true, message: '请选择时间' }]}
                >
                  <Input placeholder="如: 14:00-16:00" />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item
              name="participants"
              label="参与人员"
              rules={[{ required: true, message: '请选择参与人员' }]}
            >
              <Select mode="multiple" placeholder="请选择参与人员">
                <Select.Option value="all">全体学生</Select.Option>
                {students.map(student => (
                  <Select.Option key={student} value={student}>{student}</Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name="location"
              label="会议地点"
              rules={[{ required: true, message: '请输入会议地点' }]}
            >
              <Input placeholder="请输入会议地点或在线会议链接" />
            </Form.Item>
            <Form.Item
              name="agenda"
              label="会议议程"
            >
              <Select mode="tags" placeholder="请输入议程项，按回车添加" />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </MainLayout>
  );
};

export default ProcessManagement;