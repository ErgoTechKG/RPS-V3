import React, { useState } from 'react';
import { 
  Card, 
  Form, 
  Input, 
  Select, 
  InputNumber, 
  DatePicker, 
  Button, 
  Steps, 
  Row, 
  Col, 
  Tag, 
  Space,
  message,
  Upload,
  Progress
} from 'antd';
import { 
  PlusOutlined, 
  SaveOutlined, 
  CheckCircleOutlined,
  InboxOutlined 
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import MainLayout from '@/components/MainLayout';
import styles from './LabRotation.module.css';

const { Step } = Steps;
const { TextArea } = Input;
const { Dragger } = Upload;

interface TopicFormData {
  title: string;
  brief: string;
  direction: string;
  keywords: string[];
  background: string;
  objectives: string[];
  requirements: string;
  expectedResults: string;
  labs: string[];
  equipment: string[];
  budget: number;
  otherResources: string;
  studentCount: number;
  majors: string[];
  skills: string[];
  deadline: any;
}

const TopicManagement: React.FC = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Partial<TopicFormData>>({});
  const [previewData, setPreviewData] = useState<Partial<TopicFormData>>({});

  const researchDirections = [
    { value: 'ai', label: '人工智能' },
    { value: 'robotics', label: '机器人' },
    { value: 'materials', label: '材料科学' },
    { value: 'biology', label: '生物工程' },
    { value: 'electronics', label: '电子工程' }
  ];

  const majorOptions = [
    { value: 'cs', label: '计算机科学' },
    { value: 'me', label: '机械工程' },
    { value: 'ee', label: '电子工程' },
    { value: 'auto', label: '自动化' },
    { value: 'math', label: '数学' }
  ];

  const skillOptions = [
    { value: 'python', label: 'Python' },
    { value: 'java', label: 'Java' },
    { value: 'cpp', label: 'C++' },
    { value: 'ml', label: '机器学习' },
    { value: 'cv', label: '计算机视觉' },
    { value: 'electronics', label: '电路设计' },
    { value: 'mechanics', label: '机械设计' }
  ];

  const labOptions = [
    { value: 'ai-lab', label: 'AI实验室' },
    { value: 'robotics-lab', label: '机器人实验室' },
    { value: 'materials-lab', label: '材料实验室' },
    { value: 'bio-lab', label: '生物实验室' }
  ];

  const steps = [
    {
      title: '基本信息',
      content: 'basic'
    },
    {
      title: '详细说明',
      content: 'details'
    },
    {
      title: '资源配置',
      content: 'resources'
    },
    {
      title: '招生设置',
      content: 'recruitment'
    }
  ];

  const handleNext = async () => {
    try {
      const values = await form.validateFields();
      const newFormData = { ...formData, ...values };
      setFormData(newFormData);
      setPreviewData(newFormData);
      
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        // Submit the form
        message.success('课题发布成功！');
        navigate('/professor/lab-rotation/topics');
      }
    } catch (error) {
      message.error('请填写所有必填项');
    }
  };

  const handlePrev = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSaveDraft = () => {
    const values = form.getFieldsValue();
    const newFormData = { ...formData, ...values };
    setFormData(newFormData);
    message.success('草稿已保存');
  };

  const handleFormChange = () => {
    const values = form.getFieldsValue();
    setPreviewData({ ...formData, ...values });
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0: // Basic Info
        return (
          <div className={styles.formSection}>
            <h3 className={styles.sectionTitle}>步骤1: 基本信息</h3>
            <Form.Item
              label="课题标题"
              name="title"
              rules={[{ required: true, message: '请输入课题标题' }, { max: 50, message: '标题不超过50字' }]}
            >
              <Input placeholder="请输入课题标题" onChange={handleFormChange} />
            </Form.Item>
            <Form.Item
              label="课题简介"
              name="brief"
              rules={[{ required: true, message: '请输入课题简介' }, { max: 200, message: '简介不超过200字' }]}
            >
              <TextArea 
                rows={4} 
                placeholder="请简要介绍课题内容，200字以内" 
                showCount 
                maxLength={200}
                onChange={handleFormChange}
              />
            </Form.Item>
            <Form.Item
              label="研究方向"
              name="direction"
              rules={[{ required: true, message: '请选择研究方向' }]}
            >
              <Select 
                placeholder="请选择研究方向" 
                options={researchDirections}
                onChange={handleFormChange}
              />
            </Form.Item>
            <Form.Item
              label="关键词标签"
              name="keywords"
              rules={[{ required: true, message: '请添加关键词' }]}
            >
              <Select
                mode="tags"
                placeholder="添加关键词，最多5个"
                maxTagCount={5}
                onChange={handleFormChange}
              />
            </Form.Item>
          </div>
        );

      case 1: // Details
        return (
          <div className={styles.formSection}>
            <h3 className={styles.sectionTitle}>步骤2: 详细说明</h3>
            <Form.Item
              label="研究背景"
              name="background"
              rules={[{ required: true, message: '请输入研究背景' }]}
            >
              <TextArea 
                rows={6} 
                placeholder="请详细说明研究背景和意义"
                onChange={handleFormChange}
              />
            </Form.Item>
            <Form.Item
              label="研究目标"
              name="objectives"
              rules={[{ required: true, message: '请输入研究目标' }]}
            >
              <Select
                mode="tags"
                placeholder="请输入研究目标，按回车添加"
                onChange={handleFormChange}
              />
            </Form.Item>
            <Form.Item
              label="技术路线"
              name="requirements"
              rules={[{ required: true, message: '请输入技术路线' }]}
            >
              <TextArea 
                rows={4} 
                placeholder="请说明技术路线和实施方案"
                onChange={handleFormChange}
              />
            </Form.Item>
            <Form.Item
              label="预期成果"
              name="expectedResults"
              rules={[{ required: true, message: '请输入预期成果' }]}
            >
              <TextArea 
                rows={4} 
                placeholder="请说明预期的研究成果"
                onChange={handleFormChange}
              />
            </Form.Item>
          </div>
        );

      case 2: // Resources
        return (
          <div className={styles.formSection}>
            <h3 className={styles.sectionTitle}>步骤3: 资源配置</h3>
            <Form.Item
              label="实验室"
              name="labs"
              rules={[{ required: true, message: '请选择实验室' }]}
            >
              <Select
                mode="multiple"
                placeholder="请选择使用的实验室"
                options={labOptions}
                onChange={handleFormChange}
              />
            </Form.Item>
            <Form.Item
              label="设备需求"
              name="equipment"
            >
              <Select
                mode="tags"
                placeholder="请输入所需设备，按回车添加"
                onChange={handleFormChange}
              />
            </Form.Item>
            <Form.Item
              label="经费预算"
              name="budget"
              rules={[{ required: true, message: '请输入经费预算' }]}
            >
              <InputNumber
                style={{ width: '100%' }}
                placeholder="请输入预算金额"
                formatter={value => `¥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={value => value!.replace(/\¥\s?|(,*)/g, '')}
                onChange={handleFormChange}
              />
            </Form.Item>
            <Form.Item
              label="其他资源"
              name="otherResources"
            >
              <TextArea 
                rows={3} 
                placeholder="请说明其他所需资源"
                onChange={handleFormChange}
              />
            </Form.Item>
          </div>
        );

      case 3: // Recruitment
        return (
          <div className={styles.formSection}>
            <h3 className={styles.sectionTitle}>步骤4: 招生设置</h3>
            <Form.Item
              label="招生人数"
              name="studentCount"
              rules={[{ required: true, message: '请输入招生人数' }]}
            >
              <InputNumber
                min={1}
                max={5}
                style={{ width: '100%' }}
                placeholder="请输入招生人数（1-5人）"
                onChange={handleFormChange}
              />
            </Form.Item>
            <Form.Item
              label="专业要求"
              name="majors"
              rules={[{ required: true, message: '请选择专业要求' }]}
            >
              <Select
                mode="multiple"
                placeholder="请选择相关专业"
                options={majorOptions}
                onChange={handleFormChange}
              />
            </Form.Item>
            <Form.Item
              label="技能要求"
              name="skills"
            >
              <Select
                mode="multiple"
                placeholder="请选择所需技能"
                options={skillOptions}
                onChange={handleFormChange}
              />
            </Form.Item>
            <Form.Item
              label="申请截止时间"
              name="deadline"
              rules={[{ required: true, message: '请选择截止时间' }]}
            >
              <DatePicker 
                style={{ width: '100%' }} 
                placeholder="请选择申请截止时间"
                onChange={handleFormChange}
              />
            </Form.Item>
          </div>
        );

      default:
        return null;
    }
  };

  const renderPreview = () => {
    const { title, brief, direction, keywords, studentCount, deadline } = previewData;
    const directionLabel = researchDirections.find(d => d.value === direction)?.label;

    return (
      <div className={styles.previewPanel}>
        <h3 className={styles.previewTitle}>预览</h3>
        <div className={styles.previewCard}>
          <h3>{title || '课题标题'}</h3>
          <p>研究方向: {directionLabel || '未设置'}</p>
          <p>导师: 张教授</p>
          <p>{brief || '课题简介...'}</p>
          <Space wrap>
            {keywords?.map((keyword: string) => (
              <Tag key={keyword} color="blue">#{keyword}</Tag>
            ))}
          </Space>
          {studentCount && <p style={{ marginTop: 12 }}>招生人数: {studentCount}人</p>}
          {deadline && <p>申请截止: {deadline.format('YYYY-MM-DD')}</p>}
        </div>
        <div className={styles.autoSaveInfo}>
          <CheckCircleOutlined /> 自动保存于 {new Date().toLocaleTimeString()}
        </div>
      </div>
    );
  };

  return (
    <MainLayout>
      <div className={styles.topicContainer}>
        <div className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>发布新课题</h1>
        </div>

        <Row gutter={24}>
          <Col xs={24} lg={14}>
            <Card className={styles.publishForm}>
              <Steps current={currentStep} style={{ marginBottom: 32 }}>
                {steps.map(item => (
                  <Step key={item.title} title={item.title} />
                ))}
              </Steps>

              <Form
                form={form}
                layout="vertical"
                initialValues={formData}
              >
                {renderStepContent()}
              </Form>

              <div className={styles.formActions}>
                <Space>
                  <Button onClick={handleSaveDraft} icon={<SaveOutlined />}>
                    保存草稿
                  </Button>
                  {currentStep > 0 && (
                    <Button onClick={handlePrev}>
                      上一步
                    </Button>
                  )}
                  <Button type="primary" onClick={handleNext}>
                    {currentStep === steps.length - 1 ? '发布课题' : '下一步'}
                  </Button>
                </Space>
              </div>
            </Card>
          </Col>

          <Col xs={24} lg={10}>
            {renderPreview()}
          </Col>
        </Row>
      </div>
    </MainLayout>
  );
};

export default TopicManagement;