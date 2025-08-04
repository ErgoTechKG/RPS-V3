import React, { useState } from 'react';
import { Layout, Card, Typography, Button, Space, Row, Col, Steps, Form, Input, Upload, Select, DatePicker, Checkbox, Alert, Modal, Progress, Tag, List, Divider, Rate, Table } from 'antd';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeftOutlined,
  UploadOutlined,
  InboxOutlined,
  FileTextOutlined,
  UserOutlined,
  TrophyOutlined,
  TeamOutlined,
  EditOutlined,
  CheckCircleOutlined,
  SaveOutlined,
  SendOutlined,
  PlusOutlined,
  DeleteOutlined,
  EyeOutlined,
  SignatureOutlined
} from '@ant-design/icons';

const { Header, Content } = Layout;
const { Title, Text, Paragraph } = Typography;
const { Step } = Steps;
const { TextArea } = Input;
const { Dragger } = Upload;
const { Option } = Select;

const EvaluationSubmission: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [submitModalVisible, setSubmitModalVisible] = useState(false);

  // Mock data for achievements
  const [achievements, setAchievements] = useState([
    {
      id: '1',
      type: 'paper',
      title: '深度学习在图像识别中的应用研究',
      journal: 'IEEE Transaction on AI',
      date: '2024-03-15',
      level: 'SCI一区',
      status: 'published',
      files: ['paper1.pdf']
    },
    {
      id: '2',
      type: 'patent',
      title: '基于CNN的医学图像智能诊断系统',
      number: 'CN202410001234.5',
      date: '2024-02-20',
      level: '发明专利',
      status: 'pending',
      files: ['patent_certificate.pdf']
    }
  ]);

  // Mock data for social activities
  const [socialActivities, setSocialActivities] = useState([
    {
      id: '1',
      type: 'volunteer',
      name: '春节志愿服务活动',
      organization: '校团委',
      startDate: '2024-02-01',
      endDate: '2024-02-15',
      role: '志愿者',
      hours: 40,
      description: '参与校园春节期间的志愿服务工作',
      certificates: ['volunteer_cert.pdf']
    },
    {
      id: '2',
      type: 'competition',
      name: '全国大学生数学建模竞赛',
      organization: '教育部',
      date: '2023-09-15',
      role: '队长',
      award: '全国一等奖',
      description: '带领团队完成数学建模项目并获得全国一等奖',
      certificates: ['modeling_award.pdf']
    }
  ]);

  const stepComponents = [
    {
      title: '基本信息',
      content: (
        <Card title="个人基本信息确认">
          <Form form={form} layout="vertical" initialValues={{
            name: '李同学',
            studentId: '2021001234',
            major: '计算机科学与技术',
            grade: '2021级',
            email: 'student@university.edu.cn',
            phone: '13800138000'
          }}>
            <Row gutter={[16, 16]}>
              <Col xs={24} md={12}>
                <Form.Item label="姓名" name="name" rules={[{ required: true }]}>
                  <Input disabled />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item label="学号" name="studentId" rules={[{ required: true }]}>
                  <Input disabled />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item label="专业" name="major" rules={[{ required: true }]}>
                  <Input />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item label="年级" name="grade" rules={[{ required: true }]}>
                  <Select>
                    <Option value="2021级">2021级</Option>
                    <Option value="2022级">2022级</Option>
                    <Option value="2023级">2023级</Option>
                    <Option value="2024级">2024级</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item label="邮箱" name="email" rules={[{ required: true, type: 'email' }]}>
                  <Input />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item label="联系电话" name="phone" rules={[{ required: true }]}>
                  <Input />
                </Form.Item>
              </Col>
              <Col xs={24}>
                <Form.Item label="个人简介" name="introduction">
                  <TextArea rows={4} placeholder="请简要介绍您的学习经历和个人特长..." />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>
      )
    },
    {
      title: '学术成果',
      content: (
        <div>
          <Card title="学术成果管理" extra={
            <Button type="primary" icon={<PlusOutlined />} onClick={() => {/* 添加成果逻辑 */}}>
              添加成果
            </Button>
          }>
            <List
              dataSource={achievements}
              renderItem={(achievement) => (
                <List.Item
                  actions={[
                    <Button size="small" icon={<EyeOutlined />}>查看</Button>,
                    <Button size="small" icon={<EditOutlined />}>编辑</Button>,
                    <Button size="small" danger icon={<DeleteOutlined />}>删除</Button>
                  ]}
                >
                  <List.Item.Meta
                    avatar={
                      <div style={{ textAlign: 'center' }}>
                        {achievement.type === 'paper' ? 
                          <FileTextOutlined style={{ fontSize: '24px', color: '#1890ff' }} /> :
                          <TrophyOutlined style={{ fontSize: '24px', color: '#fa8c16' }} />
                        }
                      </div>
                    }
                    title={
                      <div>
                        <Text strong>{achievement.title}</Text>
                        <Tag color="blue" style={{ marginLeft: '8px' }}>
                          {achievement.level}
                        </Tag>
                        <Tag color={achievement.status === 'published' ? 'green' : 'orange'}>
                          {achievement.status === 'published' ? '已发表' : '待发表'}
                        </Tag>
                      </div>
                    }
                    description={
                      <div>
                        <div style={{ marginBottom: '4px' }}>
                          <Text type="secondary">
                            {achievement.type === 'paper' ? `期刊: ${achievement.journal}` : `专利号: ${achievement.number}`}
                          </Text>
                        </div>
                        <div style={{ marginBottom: '8px' }}>
                          <Text type="secondary">时间: {achievement.date}</Text>
                        </div>
                        <Space size="small">
                          {achievement.files.map((file, index) => (
                            <Tag key={index} icon={<FileTextOutlined />}>
                              {file}
                            </Tag>
                          ))}
                        </Space>
                      </div>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>

          <Card title="上传新的学术成果" style={{ marginTop: '16px' }}>
            <Form layout="vertical">
              <Row gutter={[16, 16]}>
                <Col xs={24} md={12}>
                  <Form.Item label="成果类型" required>
                    <Select placeholder="请选择成果类型">
                      <Option value="paper">学术论文</Option>
                      <Option value="patent">专利</Option>
                      <Option value="software">软件著作权</Option>
                      <Option value="award">学术奖项</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item label="成果等级" required>
                    <Select placeholder="请选择成果等级">
                      <Option value="sci1">SCI一区</Option>
                      <Option value="sci2">SCI二区</Option>
                      <Option value="ei">EI检索</Option>
                      <Option value="core">中文核心</Option>
                      <Option value="national">国家级</Option>
                      <Option value="provincial">省级</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col xs={24}>
                  <Form.Item label="成果标题" required>
                    <Input placeholder="请输入成果标题" />
                  </Form.Item>
                </Col>
                <Col xs={24}>
                  <Form.Item label="成果描述">
                    <TextArea rows={3} placeholder="请详细描述成果内容、创新点等..." />
                  </Form.Item>
                </Col>
                <Col xs={24}>
                  <Form.Item label="相关文件" required>
                    <Dragger
                      name="files"
                      multiple={true}
                      accept=".pdf,.doc,.docx,.jpg,.png"
                    >
                      <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                      </p>
                      <p className="ant-upload-text">点击或拖拽文件到此区域上传</p>
                      <p className="ant-upload-hint">
                        支持论文、证书、专利文件等，支持PDF、Word、图片格式
                      </p>
                    </Dragger>
                  </Form.Item>
                </Col>
              </Row>
              <Button type="dashed" icon={<PlusOutlined />}>
                添加学术成果
              </Button>
            </Form>
          </Card>
        </div>
      )
    },
    {
      title: '社会活动',
      content: (
        <div>
          <Card title="社会活动记录" extra={
            <Button type="primary" icon={<PlusOutlined />}>
              添加活动
            </Button>
          }>
            <List
              dataSource={socialActivities}
              renderItem={(activity) => (
                <List.Item
                  actions={[
                    <Button size="small" icon={<EyeOutlined />}>查看</Button>,
                    <Button size="small" icon={<EditOutlined />}>编辑</Button>,
                    <Button size="small" danger icon={<DeleteOutlined />}>删除</Button>
                  ]}
                >
                  <List.Item.Meta
                    avatar={
                      <div style={{ textAlign: 'center' }}>
                        <TeamOutlined style={{ fontSize: '24px', color: '#52c41a' }} />
                      </div>
                    }
                    title={
                      <div>
                        <Text strong>{activity.name}</Text>
                        <Tag color="green" style={{ marginLeft: '8px' }}>
                          {activity.type === 'volunteer' ? '志愿服务' :
                           activity.type === 'competition' ? '竞赛活动' :
                           activity.type === 'organization' ? '组织工作' : '其他活动'}
                        </Tag>
                        {activity.award && (
                          <Tag color="gold">
                            {activity.award}
                          </Tag>
                        )}
                      </div>
                    }
                    description={
                      <div>
                        <div style={{ marginBottom: '4px' }}>
                          <Text type="secondary">组织单位: {activity.organization}</Text>
                        </div>
                        <div style={{ marginBottom: '4px' }}>
                          <Text type="secondary">担任角色: {activity.role}</Text>
                        </div>
                        <div style={{ marginBottom: '4px' }}>
                          <Text type="secondary">
                            时间: {activity.startDate ? `${activity.startDate} 至 ${activity.endDate}` : activity.date}
                          </Text>
                        </div>
                        {activity.hours && (
                          <div style={{ marginBottom: '8px' }}>
                            <Text type="secondary">服务时长: {activity.hours}小时</Text>
                          </div>
                        )}
                        <div style={{ marginBottom: '8px' }}>
                          <Text>{activity.description}</Text>
                        </div>
                        <Space size="small">
                          {activity.certificates?.map((cert, index) => (
                            <Tag key={index} icon={<FileTextOutlined />}>
                              {cert}
                            </Tag>
                          ))}
                        </Space>
                      </div>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>

          <Card title="添加社会活动" style={{ marginTop: '16px' }}>
            <Form layout="vertical">
              <Row gutter={[16, 16]}>
                <Col xs={24} md={12}>
                  <Form.Item label="活动类型" required>
                    <Select placeholder="请选择活动类型">
                      <Option value="volunteer">志愿服务</Option>
                      <Option value="competition">学科竞赛</Option>
                      <Option value="organization">学生组织</Option>
                      <Option value="practice">社会实践</Option>
                      <Option value="research">科研项目</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item label="活动级别" required>
                    <Select placeholder="请选择活动级别">
                      <Option value="international">国际级</Option>
                      <Option value="national">国家级</Option>
                      <Option value="provincial">省级</Option>
                      <Option value="city">市级</Option>
                      <Option value="school">校级</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col xs={24}>
                  <Form.Item label="活动名称" required>
                    <Input placeholder="请输入活动名称" />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item label="组织单位" required>
                    <Input placeholder="请输入组织单位" />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item label="担任角色" required>
                    <Select placeholder="请选择担任角色">
                      <Option value="leader">负责人/队长</Option>
                      <Option value="member">主要成员</Option>
                      <Option value="participant">参与者</Option>
                      <Option value="volunteer">志愿者</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item label="开始时间" required>
                    <DatePicker style={{ width: '100%' }} />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item label="结束时间">
                    <DatePicker style={{ width: '100%' }} />
                  </Form.Item>
                </Col>
                <Col xs={24}>
                  <Form.Item label="活动描述" required>
                    <TextArea rows={4} placeholder="请详细描述活动内容、您的贡献和收获..." />
                  </Form.Item>
                </Col>
                <Col xs={24}>
                  <Form.Item label="证明材料">
                    <Dragger
                      name="certificates"
                      multiple={true}
                      accept=".pdf,.doc,.docx,.jpg,.png"
                    >
                      <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                      </p>
                      <p className="ant-upload-text">上传相关证明文件</p>
                      <p className="ant-upload-hint">
                        如获奖证书、参与证明、活动照片等
                      </p>
                    </Dragger>
                  </Form.Item>
                </Col>
              </Row>
              <Button type="dashed" icon={<PlusOutlined />}>
                添加社会活动
              </Button>
            </Form>
          </Card>
        </div>
      )
    },
    {
      title: '自我评价',
      content: (
        <Card title="综合素质自我评价">
          <Form form={form} layout="vertical">
            <Alert
              message="评价说明"
              description="请客观、真实地进行自我评价，结合具体事例和数据支撑您的评价内容。"
              type="info"
              showIcon
              style={{ marginBottom: '24px' }}
            />

            <Form.Item label="学术能力自评" required>
              <Row gutter={[16, 16]}>
                <Col xs={24} md={12}>
                  <Form.Item label="学术研究能力" name="academicResearch">
                    <Rate allowHalf />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item label="创新思维能力" name="innovation">
                    <Rate allowHalf />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item label="专业技能水平" name="professionalSkills">
                    <Rate allowHalf />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item label="学术交流能力" name="academicCommunication">
                    <Rate allowHalf />
                  </Form.Item>
                </Col>
              </Row>
            </Form.Item>

            <Form.Item label="综合素质自评" required>
              <Row gutter={[16, 16]}>
                <Col xs={24} md={12}>
                  <Form.Item label="团队协作能力" name="teamwork">
                    <Rate allowHalf />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item label="领导组织能力" name="leadership">
                    <Rate allowHalf />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item label="社会责任感" name="socialResponsibility">
                    <Rate allowHalf />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item label="实践应用能力" name="practicalApplication">
                    <Rate allowHalf />
                  </Form.Item>
                </Col>
              </Row>
            </Form.Item>

            <Divider />

            <Form.Item 
              label="学术成就总结" 
              name="academicSummary"
              rules={[{ required: true, message: '请填写学术成就总结' }]}
            >
              <TextArea 
                rows={6} 
                placeholder="请总结您在学术方面的主要成就，包括论文发表、专利申请、学术获奖等，并分析这些成就对您学术发展的意义..."
                showCount
                maxLength={1000}
              />
            </Form.Item>

            <Form.Item 
              label="社会实践总结" 
              name="socialSummary"
              rules={[{ required: true, message: '请填写社会实践总结' }]}
            >
              <TextArea 
                rows={6} 
                placeholder="请总结您参与的主要社会实践活动，包括志愿服务、社会调研、实习实践等，并阐述这些经历对您的成长价值..."
                showCount
                maxLength={1000}
              />
            </Form.Item>

            <Form.Item 
              label="个人发展规划" 
              name="developmentPlan"
              rules={[{ required: true, message: '请填写个人发展规划' }]}
            >
              <TextArea 
                rows={6} 
                placeholder="请描述您未来的学术和职业发展规划，包括短期目标、长期愿景以及实现路径..."
                showCount
                maxLength={1000}
              />
            </Form.Item>

            <Form.Item 
              label="综合评价总结" 
              name="overallSummary"
              rules={[{ required: true, message: '请填写综合评价总结' }]}
            >
              <TextArea 
                rows={8} 
                placeholder="请对自己的综合素质进行全面总结，包括优势特长、不足之处、改进计划等..."
                showCount
                maxLength={1500}
              />
            </Form.Item>
          </Form>
        </Card>
      )
    },
    {
      title: '审核提交',
      content: (
        <div>
          <Card title="材料审核" style={{ marginBottom: '16px' }}>
            <Alert
              message="提交前请仔细检查"
              description="一旦提交后，您将无法修改已提交的材料。请确保所有信息准确无误。"
              type="warning"
              showIcon
              style={{ marginBottom: '24px' }}
            />

            <div style={{ marginBottom: '24px' }}>
              <Title level={4}>材料完整性检查</Title>
              <List size="small">
                <List.Item>
                  <Checkbox checked>基本信息已完善</Checkbox>
                </List.Item>
                <List.Item>
                  <Checkbox checked>学术成果已上传（2项）</Checkbox>
                </List.Item>
                <List.Item>
                  <Checkbox checked>社会活动已记录（2项）</Checkbox>
                </List.Item>
                <List.Item>
                  <Checkbox checked>自我评价已完成</Checkbox>
                </List.Item>
                <List.Item>
                  <Checkbox>所有必需的证明材料已上传</Checkbox>
                </List.Item>
              </List>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <Title level={4}>提交统计</Title>
              <Row gutter={[16, 16]}>
                <Col xs={12} md={6}>
                  <Card size="small">
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#1890ff' }}>2</div>
                      <div style={{ fontSize: '12px', color: '#8c8c8c' }}>学术成果</div>
                    </div>
                  </Card>
                </Col>
                <Col xs={12} md={6}>
                  <Card size="small">
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#52c41a' }}>2</div>
                      <div style={{ fontSize: '12px', color: '#8c8c8c' }}>社会活动</div>
                    </div>
                  </Card>
                </Col>
                <Col xs={12} md={6}>
                  <Card size="small">
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#fa8c16' }}>8</div>
                      <div style={{ fontSize: '12px', color: '#8c8c8c' }}>上传文件</div>
                    </div>
                  </Card>
                </Col>
                <Col xs={12} md={6}>
                  <Card size="small">
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#722ed1' }}>95%</div>
                      <div style={{ fontSize: '12px', color: '#8c8c8c' }}>完成度</div>
                    </div>
                  </Card>
                </Col>
              </Row>
            </div>

            <Form layout="vertical">
              <Form.Item>
                <Checkbox>
                  我确认所提交的所有材料真实有效，愿意承担相应责任
                </Checkbox>
              </Form.Item>
              <Form.Item>
                <Checkbox>
                  我已仔细阅读并理解综合素质评价相关规定
                </Checkbox>
              </Form.Item>
              <Form.Item>
                <Checkbox>
                  我同意学校对提交材料进行审核和使用
                </Checkbox>
              </Form.Item>
            </Form>

            <div style={{ textAlign: 'center', marginTop: '24px' }}>
              <Space size="large">
                <Button size="large" icon={<SaveOutlined />}>
                  保存草稿
                </Button>
                <Button 
                  type="primary" 
                  size="large" 
                  icon={<SendOutlined />}
                  onClick={() => setSubmitModalVisible(true)}
                >
                  正式提交
                </Button>
              </Space>
            </div>
          </Card>
        </div>
      )
    }
  ];

  const handleNext = () => {
    if (currentStep < stepComponents.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    // 模拟提交过程
    setTimeout(() => {
      setLoading(false);
      setSubmitModalVisible(false);
      Modal.success({
        title: '提交成功！',
        content: '您的综合素质评价材料已成功提交，系统已分配提交编号 #EVA20240001。导师将在5个工作日内完成审核。',
        onOk: () => navigate('/student/evaluation')
      });
    }, 2000);
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
            <Button 
              type="text" 
              icon={<ArrowLeftOutlined />} 
              onClick={() => navigate('/student/evaluation')}
              style={{ marginRight: '16px' }}
            >
              返回
            </Button>
            <UploadOutlined style={{ fontSize: '24px', color: '#52c41a', marginRight: '12px' }} />
            <Title level={3} style={{ margin: 0, color: '#262626' }}>
              提交中心
            </Title>
          </div>
          <div>
            <Progress 
              percent={Math.round((currentStep + 1) / stepComponents.length * 100)} 
              size="small" 
              style={{ width: '120px', marginRight: '16px' }} 
            />
            <Text type="secondary">
              {currentStep + 1}/{stepComponents.length}
            </Text>
          </div>
        </div>
      </Header>

      <Content style={{ padding: '24px', background: '#f5f5f5' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          {/* 步骤导航 */}
          <Card style={{ marginBottom: '24px' }}>
            <Steps current={currentStep} type="navigation">
              {stepComponents.map((step, index) => (
                <Step key={index} title={step.title} />
              ))}
            </Steps>
          </Card>

          {/* 步骤内容 */}
          <div style={{ marginBottom: '24px' }}>
            {stepComponents[currentStep].content}
          </div>

          {/* 底部操作按钮 */}
          <Card>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button 
                size="large"
                onClick={handlePrevious}
                disabled={currentStep === 0}
              >
                上一步
              </Button>
              
              <Space>
                <Button size="large" icon={<SaveOutlined />}>
                  保存
                </Button>
                {currentStep < stepComponents.length - 1 ? (
                  <Button type="primary" size="large" onClick={handleNext}>
                    下一步
                  </Button>
                ) : (
                  <Button 
                    type="primary" 
                    size="large" 
                    icon={<SendOutlined />}
                    onClick={() => setSubmitModalVisible(true)}
                  >
                    提交评价
                  </Button>
                )}
              </Space>
            </div>
          </Card>

          {/* 提交确认对话框 */}
          <Modal
            title={
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <SignatureOutlined style={{ marginRight: '8px', color: '#fa8c16' }} />
                数字签名确认
              </div>
            }
            visible={submitModalVisible}
            onCancel={() => setSubmitModalVisible(false)}
            footer={[
              <Button key="cancel" onClick={() => setSubmitModalVisible(false)}>
                取消
              </Button>,
              <Button key="submit" type="primary" loading={loading} onClick={handleSubmit}>
                确认提交
              </Button>
            ]}
          >
            <div style={{ textAlign: 'center', padding: '20px' }}>
              <SignatureOutlined style={{ fontSize: '48px', color: '#fa8c16', marginBottom: '16px' }} />
              <Title level={4}>即将正式提交</Title>
              <Paragraph>
                您即将提交综合素质评价材料，提交后将无法修改。
                请确认所有信息准确无误。
              </Paragraph>
              <Alert
                message="重要提醒"
                description="提交即表示您同意使用数字签名，并对提交内容的真实性负责。"
                type="warning"
                showIcon
                style={{ textAlign: 'left' }}
              />
            </div>
          </Modal>
        </div>
      </Content>
    </Layout>
  );
};

export default EvaluationSubmission;