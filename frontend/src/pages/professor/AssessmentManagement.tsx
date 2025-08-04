import React, { useState } from 'react';
import {
  Card,
  Tabs,
  Table,
  Button,
  Space,
  Tag,
  Avatar,
  Progress,
  Modal,
  Form,
  Input,
  InputNumber,
  Select,
  message,
  Row,
  Col,
  List,
  Divider,
  Rate,
  Tooltip,
  Badge,
  Alert,
  Statistic
} from 'antd';
import {
  FileTextOutlined,
  FileDoneOutlined,
  TeamOutlined,
  CalculatorOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  WarningOutlined,
  RobotOutlined,
  DownloadOutlined,
  EyeOutlined,
  EditOutlined,
  ExportOutlined,
  CalendarOutlined
} from '@ant-design/icons';
import MainLayout from '@/components/MainLayout';
import styles from './LabRotation.module.css';

const { TabPane } = Tabs;
const { TextArea } = Input;

interface Homework {
  id: string;
  studentName: string;
  title: string;
  submitTime: string;
  status: 'pending' | 'reviewing' | 'graded';
  aiCheck: {
    plagiarism: number;
    aiGenerated: number;
  };
  score?: number;
  attachments: string[];
}

interface Report {
  id: string;
  studentName: string;
  title: string;
  submitTime: string;
  status: 'pending' | 'reviewing' | 'graded';
  sections: {
    background: boolean;
    methods: boolean;
    results: boolean;
    conclusion: boolean;
  };
  score?: number;
}

interface Defense {
  id: string;
  studentName: string;
  date: string;
  time: string;
  status: 'scheduled' | 'completed';
  scores?: {
    presentation: number;
    content: number;
    qa: number;
    overall: number;
  };
}

interface GradeWeight {
  homework: number;
  report: number;
  defense: number;
  participation: number;
}

const AssessmentManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState('homework');
  const [selectedHomework, setSelectedHomework] = useState<Homework | null>(null);
  const [gradingModalVisible, setGradingModalVisible] = useState(false);
  const [batchGradeModalVisible, setBatchGradeModalVisible] = useState(false);
  const [gradeWeightModalVisible, setGradeWeightModalVisible] = useState(false);
  const [gradingForm] = Form.useForm();
  const [batchGradeForm] = Form.useForm();
  const [gradeWeightForm] = Form.useForm();

  // Mock data
  const homeworks: Homework[] = [
    {
      id: '1',
      studentName: '李明',
      title: '机器人运动学分析',
      submitTime: '2024-03-20 14:30',
      status: 'pending',
      aiCheck: {
        plagiarism: 5,
        aiGenerated: 2
      },
      attachments: ['analysis.pdf', 'code.py']
    },
    {
      id: '2',
      studentName: '王芳',
      title: '控制算法设计',
      submitTime: '2024-03-19 22:45',
      status: 'reviewing',
      aiCheck: {
        plagiarism: 8,
        aiGenerated: 15
      },
      attachments: ['report.pdf', 'simulation.m']
    },
    {
      id: '3',
      studentName: '张强',
      title: '传感器数据处理',
      submitTime: '2024-03-18 16:20',
      status: 'graded',
      aiCheck: {
        plagiarism: 3,
        aiGenerated: 5
      },
      score: 88,
      attachments: ['document.pdf']
    }
  ];

  const reports: Report[] = [
    {
      id: '1',
      studentName: '李明',
      title: '智能机器人控制系统研究中期报告',
      submitTime: '2024-04-10 09:00',
      status: 'reviewing',
      sections: {
        background: true,
        methods: true,
        results: true,
        conclusion: false
      }
    },
    {
      id: '2',
      studentName: '王芳',
      title: '机器视觉在工业检测中的应用',
      submitTime: '2024-04-09 15:30',
      status: 'graded',
      sections: {
        background: true,
        methods: true,
        results: true,
        conclusion: true
      },
      score: 92
    }
  ];

  const defenses: Defense[] = [
    {
      id: '1',
      studentName: '张强',
      date: '2024-05-10',
      time: '14:00-14:30',
      status: 'scheduled'
    },
    {
      id: '2',
      studentName: '赵丽',
      date: '2024-05-10',
      time: '14:30-15:00',
      status: 'scheduled'
    }
  ];

  const gradeWeights: GradeWeight = {
    homework: 30,
    report: 40,
    defense: 20,
    participation: 10
  };

  const getAICheckColor = (value: number) => {
    if (value < 10) return '#52c41a';
    if (value < 20) return '#faad14';
    return '#ff4d4f';
  };

  const handleGradeSubmit = () => {
    gradingForm.validateFields().then(values => {
      message.success('评分已保存');
      setGradingModalVisible(false);
      gradingForm.resetFields();
    });
  };

  const handleBatchGrade = () => {
    batchGradeForm.validateFields().then(values => {
      message.success('批量评分已完成');
      setBatchGradeModalVisible(false);
      batchGradeForm.resetFields();
    });
  };

  const handleWeightUpdate = () => {
    gradeWeightForm.validateFields().then(values => {
      const total = values.homework + values.report + values.defense + values.participation;
      if (total !== 100) {
        message.error('权重总和必须为100%');
        return;
      }
      message.success('成绩权重已更新');
      setGradeWeightModalVisible(false);
    });
  };

  const homeworkColumns = [
    {
      title: '学生',
      dataIndex: 'studentName',
      key: 'studentName',
      render: (name: string) => (
        <Space>
          <Avatar style={{ backgroundColor: '#1890ff' }}>{name[0]}</Avatar>
          {name}
        </Space>
      )
    },
    {
      title: '作业标题',
      dataIndex: 'title',
      key: 'title'
    },
    {
      title: '提交时间',
      dataIndex: 'submitTime',
      key: 'submitTime',
      render: (time: string) => (
        <Space>
          <ClockCircleOutlined />
          {time}
        </Space>
      )
    },
    {
      title: 'AI检测',
      key: 'aiCheck',
      render: (record: Homework) => (
        <Space>
          <Tooltip title="抄袭率">
            <Tag color={getAICheckColor(record.aiCheck.plagiarism)}>
              抄袭 {record.aiCheck.plagiarism}%
            </Tag>
          </Tooltip>
          <Tooltip title="AI生成率">
            <Tag color={getAICheckColor(record.aiCheck.aiGenerated)}>
              AI {record.aiCheck.aiGenerated}%
            </Tag>
          </Tooltip>
        </Space>
      )
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string, record: Homework) => {
        if (status === 'graded') {
          return <Tag color="success">已评分 ({record.score}分)</Tag>;
        } else if (status === 'reviewing') {
          return <Tag color="processing">批改中</Tag>;
        }
        return <Tag color="default">待批改</Tag>;
      }
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: Homework) => (
        <Space>
          <Button 
            size="small" 
            icon={<EyeOutlined />}
            onClick={() => {
              setSelectedHomework(record);
              setGradingModalVisible(true);
            }}
          >
            {record.status === 'graded' ? '查看' : '批改'}
          </Button>
          <Button size="small" icon={<DownloadOutlined />}>下载</Button>
        </Space>
      )
    }
  ];

  const reportColumns = [
    {
      title: '学生',
      dataIndex: 'studentName',
      key: 'studentName',
      render: (name: string) => (
        <Space>
          <Avatar style={{ backgroundColor: '#52c41a' }}>{name[0]}</Avatar>
          {name}
        </Space>
      )
    },
    {
      title: '报告标题',
      dataIndex: 'title',
      key: 'title'
    },
    {
      title: '完整性',
      key: 'sections',
      render: (record: Report) => {
        const completed = Object.values(record.sections).filter(v => v).length;
        return (
          <Progress 
            percent={(completed / 4) * 100} 
            steps={4} 
            strokeColor="#52c41a"
            format={() => `${completed}/4`}
          />
        );
      }
    },
    {
      title: '提交时间',
      dataIndex: 'submitTime',
      key: 'submitTime'
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string, record: Report) => {
        if (status === 'graded') {
          return <Tag color="success">已评审 ({record.score}分)</Tag>;
        } else if (status === 'reviewing') {
          return <Tag color="processing">评审中</Tag>;
        }
        return <Tag color="default">待评审</Tag>;
      }
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: Report) => (
        <Space>
          <Button size="small" icon={<EditOutlined />}>评审</Button>
          <Button size="small" icon={<FileTextOutlined />}>查看</Button>
        </Space>
      )
    }
  ];

  const renderHomeworkTab = () => (
    <>
      <div style={{ marginBottom: 16 }}>
        <Row justify="space-between" align="middle">
          <Col>
            <Space>
              <Select defaultValue="all" style={{ width: 120 }}>
                <Select.Option value="all">全部状态</Select.Option>
                <Select.Option value="pending">待批改</Select.Option>
                <Select.Option value="reviewing">批改中</Select.Option>
                <Select.Option value="graded">已评分</Select.Option>
              </Select>
              <Select defaultValue="all" style={{ width: 120 }}>
                <Select.Option value="all">全部学生</Select.Option>
                <Select.Option value="student1">李明</Select.Option>
                <Select.Option value="student2">王芳</Select.Option>
                <Select.Option value="student3">张强</Select.Option>
              </Select>
            </Space>
          </Col>
          <Col>
            <Space>
              <Button onClick={() => setBatchGradeModalVisible(true)}>批量评分</Button>
              <Button icon={<RobotOutlined />}>AI辅助批改</Button>
            </Space>
          </Col>
        </Row>
      </div>

      <Alert
        message="AI检测提示"
        description="系统已自动检测作业的抄袭率和AI生成率，请在批改时重点关注异常数据。"
        type="info"
        showIcon
        closable
        style={{ marginBottom: 16 }}
      />

      <Table
        columns={homeworkColumns}
        dataSource={homeworks}
        rowKey="id"
      />
    </>
  );

  const renderReportsTab = () => (
    <>
      <div style={{ marginBottom: 16 }}>
        <Space>
          <Button type="primary" icon={<FileDoneOutlined />}>评审模板</Button>
          <Button icon={<ExportOutlined />}>导出报告</Button>
        </Space>
      </div>

      <Table
        columns={reportColumns}
        dataSource={reports}
        rowKey="id"
      />

      <Card title="评审标准参考" style={{ marginTop: 16 }}>
        <Row gutter={[16, 16]}>
          <Col span={6}>
            <h4>研究背景 (25%)</h4>
            <ul style={{ fontSize: 14, color: '#8c8c8c' }}>
              <li>文献综述完整性</li>
              <li>研究问题明确性</li>
              <li>创新点描述</li>
            </ul>
          </Col>
          <Col span={6}>
            <h4>研究方法 (25%)</h4>
            <ul style={{ fontSize: 14, color: '#8c8c8c' }}>
              <li>方法选择合理性</li>
              <li>实验设计科学性</li>
              <li>技术路线清晰度</li>
            </ul>
          </Col>
          <Col span={6}>
            <h4>结果分析 (30%)</h4>
            <ul style={{ fontSize: 14, color: '#8c8c8c' }}>
              <li>数据处理准确性</li>
              <li>结果展示规范性</li>
              <li>分析深度</li>
            </ul>
          </Col>
          <Col span={6}>
            <h4>结论展望 (20%)</h4>
            <ul style={{ fontSize: 14, color: '#8c8c8c' }}>
              <li>结论合理性</li>
              <li>创新性总结</li>
              <li>未来工作规划</li>
            </ul>
          </Col>
        </Row>
      </Card>
    </>
  );

  const renderDefenseTab = () => (
    <>
      <Row gutter={[16, 16]}>
        <Col span={16}>
          <Card title="答辩安排">
            <List
              dataSource={defenses}
              renderItem={defense => (
                <List.Item
                  actions={[
                    <Button size="small" type="primary">开始评分</Button>,
                    <Button size="small">调整时间</Button>
                  ]}
                >
                  <List.Item.Meta
                    avatar={<Avatar style={{ backgroundColor: '#722ed1' }}>{defense.studentName[0]}</Avatar>}
                    title={defense.studentName}
                    description={
                      <Space>
                        <CalendarOutlined /> {defense.date}
                        <ClockCircleOutlined /> {defense.time}
                      </Space>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card title="评分维度">
            <Space direction="vertical" style={{ width: '100%' }}>
              <div>
                <p style={{ marginBottom: 8 }}>演讲表达 (30%)</p>
                <Rate disabled defaultValue={0} />
              </div>
              <Divider />
              <div>
                <p style={{ marginBottom: 8 }}>内容质量 (40%)</p>
                <Rate disabled defaultValue={0} />
              </div>
              <Divider />
              <div>
                <p style={{ marginBottom: 8 }}>问答表现 (30%)</p>
                <Rate disabled defaultValue={0} />
              </div>
            </Space>
          </Card>
        </Col>
      </Row>
    </>
  );

  const renderFinalGradesTab = () => {
    const finalGrades = [
      { name: '李明', homework: 85, report: 88, defense: 90, participation: 95, final: 88 },
      { name: '王芳', homework: 90, report: 92, defense: 88, participation: 90, final: 90 },
      { name: '张强', homework: 88, report: 85, defense: 92, participation: 88, final: 88 },
      { name: '赵丽', homework: 82, report: 86, defense: 85, participation: 92, final: 85 }
    ];

    return (
      <>
        <div style={{ marginBottom: 16 }}>
          <Row justify="space-between">
            <Col>
              <Space>
                <span>成绩权重设置:</span>
                <Tag>作业 {gradeWeights.homework}%</Tag>
                <Tag>报告 {gradeWeights.report}%</Tag>
                <Tag>答辩 {gradeWeights.defense}%</Tag>
                <Tag>平时 {gradeWeights.participation}%</Tag>
              </Space>
            </Col>
            <Col>
              <Space>
                <Button onClick={() => setGradeWeightModalVisible(true)}>调整权重</Button>
                <Button type="primary" icon={<ExportOutlined />}>发布成绩</Button>
              </Space>
            </Col>
          </Row>
        </div>

        <Table
          dataSource={finalGrades}
          rowKey="name"
          columns={[
            {
              title: '学生姓名',
              dataIndex: 'name',
              key: 'name',
              render: (name: string) => (
                <Space>
                  <Avatar style={{ backgroundColor: '#1890ff' }}>{name[0]}</Avatar>
                  {name}
                </Space>
              )
            },
            {
              title: '作业成绩',
              dataIndex: 'homework',
              key: 'homework',
              render: (score: number) => <span>{score}</span>
            },
            {
              title: '报告成绩',
              dataIndex: 'report',
              key: 'report',
              render: (score: number) => <span>{score}</span>
            },
            {
              title: '答辩成绩',
              dataIndex: 'defense',
              key: 'defense',
              render: (score: number) => <span>{score}</span>
            },
            {
              title: '平时成绩',
              dataIndex: 'participation',
              key: 'participation',
              render: (score: number) => <span>{score}</span>
            },
            {
              title: '最终成绩',
              dataIndex: 'final',
              key: 'final',
              render: (score: number) => (
                <Tag color={score >= 90 ? 'success' : score >= 80 ? 'processing' : score >= 70 ? 'warning' : 'error'}>
                  {score} ({score >= 90 ? 'A' : score >= 80 ? 'B' : score >= 70 ? 'C' : 'D'})
                </Tag>
              )
            },
            {
              title: '操作',
              key: 'action',
              render: () => (
                <Space>
                  <Button size="small" type="link">调整</Button>
                  <Button size="small" type="link">详情</Button>
                </Space>
              )
            }
          ]}
        />

        <Card title="成绩分布统计" style={{ marginTop: 16 }}>
          <Row gutter={16}>
            <Col span={6}>
              <Statistic title="优秀 (90-100)" value={1} suffix="人" />
            </Col>
            <Col span={6}>
              <Statistic title="良好 (80-89)" value={2} suffix="人" />
            </Col>
            <Col span={6}>
              <Statistic title="中等 (70-79)" value={1} suffix="人" />
            </Col>
            <Col span={6}>
              <Statistic title="及格 (60-69)" value={0} suffix="人" />
            </Col>
          </Row>
        </Card>
      </>
    );
  };

  return (
    <MainLayout>
      <div className={styles.topicContainer}>
        <div className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>成果评估</h1>
        </div>

        <Card>
          <Tabs activeKey={activeTab} onChange={setActiveTab}>
            <TabPane tab={<span><FileTextOutlined /> 作业批改</span>} key="homework">
              {renderHomeworkTab()}
            </TabPane>
            <TabPane tab={<span><FileDoneOutlined /> 报告评审</span>} key="reports">
              {renderReportsTab()}
            </TabPane>
            <TabPane tab={<span><TeamOutlined /> 答辩评分</span>} key="defense">
              {renderDefenseTab()}
            </TabPane>
            <TabPane tab={<span><CalculatorOutlined /> 最终成绩</span>} key="final">
              {renderFinalGradesTab()}
            </TabPane>
          </Tabs>
        </Card>

        {/* Grading Modal */}
        <Modal
          title={`批改作业 - ${selectedHomework?.studentName}`}
          visible={gradingModalVisible}
          onOk={handleGradeSubmit}
          onCancel={() => setGradingModalVisible(false)}
          width={800}
        >
          <Form form={gradingForm} layout="vertical">
            <Alert
              message="AI检测结果"
              description={`抄袭率: ${selectedHomework?.aiCheck.plagiarism}% | AI生成率: ${selectedHomework?.aiCheck.aiGenerated}%`}
              type={selectedHomework?.aiCheck.plagiarism! > 20 || selectedHomework?.aiCheck.aiGenerated! > 20 ? 'warning' : 'info'}
              showIcon
              style={{ marginBottom: 16 }}
            />
            
            <Form.Item
              name="score"
              label="分数"
              rules={[{ required: true, message: '请输入分数' }]}
            >
              <InputNumber min={0} max={100} style={{ width: '100%' }} />
            </Form.Item>
            
            <Form.Item
              name="comments"
              label="评语"
              rules={[{ required: true, message: '请输入评语' }]}
            >
              <TextArea rows={4} placeholder="请输入批改评语" />
            </Form.Item>
            
            <Form.Item label="快速评语">
              <Space wrap>
                <Button size="small">论述清晰</Button>
                <Button size="small">分析深入</Button>
                <Button size="small">创新性强</Button>
                <Button size="small">需要改进</Button>
                <Button size="small">格式规范</Button>
              </Space>
            </Form.Item>
          </Form>
        </Modal>

        {/* Batch Grade Modal */}
        <Modal
          title="批量评分"
          visible={batchGradeModalVisible}
          onOk={handleBatchGrade}
          onCancel={() => setBatchGradeModalVisible(false)}
        >
          <Form form={batchGradeForm} layout="vertical">
            <Form.Item
              name="students"
              label="选择学生"
              rules={[{ required: true, message: '请选择学生' }]}
            >
              <Select mode="multiple" placeholder="请选择要批量评分的学生">
                <Select.Option value="1">李明</Select.Option>
                <Select.Option value="2">王芳</Select.Option>
                <Select.Option value="3">张强</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="score"
              label="统一分数"
              rules={[{ required: true, message: '请输入分数' }]}
            >
              <InputNumber min={0} max={100} style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item
              name="comments"
              label="统一评语"
            >
              <TextArea rows={3} placeholder="请输入统一评语（可选）" />
            </Form.Item>
          </Form>
        </Modal>

        {/* Grade Weight Modal */}
        <Modal
          title="调整成绩权重"
          visible={gradeWeightModalVisible}
          onOk={handleWeightUpdate}
          onCancel={() => setGradeWeightModalVisible(false)}
        >
          <Form 
            form={gradeWeightForm} 
            layout="vertical"
            initialValues={gradeWeights}
          >
            <Form.Item
              name="homework"
              label="作业成绩权重 (%)"
              rules={[{ required: true, message: '请输入权重' }]}
            >
              <InputNumber min={0} max={100} style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item
              name="report"
              label="报告成绩权重 (%)"
              rules={[{ required: true, message: '请输入权重' }]}
            >
              <InputNumber min={0} max={100} style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item
              name="defense"
              label="答辩成绩权重 (%)"
              rules={[{ required: true, message: '请输入权重' }]}
            >
              <InputNumber min={0} max={100} style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item
              name="participation"
              label="平时成绩权重 (%)"
              rules={[{ required: true, message: '请输入权重' }]}
            >
              <InputNumber min={0} max={100} style={{ width: '100%' }} />
            </Form.Item>
            <Alert
              message="提示"
              description="所有权重之和必须等于100%"
              type="info"
              showIcon
            />
          </Form>
        </Modal>
      </div>
    </MainLayout>
  );
};

export default AssessmentManagement;