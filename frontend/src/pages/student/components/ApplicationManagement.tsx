import React, { useState } from 'react';
import { Card, Steps, Form, Input, Select, Upload, Button, Row, Col, Typography, Divider, Timeline, Tag, Progress, Alert, Space, Checkbox, Calendar, List, Avatar, Badge } from 'antd';
import {
  InboxOutlined,
  UserOutlined,
  FileTextOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  EyeOutlined,
  PhoneOutlined,
  MailOutlined,
  CalendarOutlined,
  DragOutlined
} from '@ant-design/icons';

const { Step } = Steps;
const { TextArea } = Input;
const { Title, Text, Paragraph } = Typography;
const { Dragger } = Upload;

interface ApplicationManagementProps {
  activeView: 'submit' | 'preferences' | 'status' | 'interview';
}

const ApplicationManagement: React.FC<ApplicationManagementProps> = ({ activeView }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [form] = Form.useForm();
  const [volunteerOrder, setVolunteerOrder] = useState([
    { id: '1', title: '基于深度学习的图像识别算法研究', professor: '张教授', match: 92 },
    { id: '2', title: '智能机器人路径规划算法优化', professor: '李教授', match: 85 },
    { id: '3', title: '生物信息学中的数据挖掘方法', professor: '赵教授', match: 88 }
  ]);

  // Mock application status data
  const applicationStatus = {
    submitted: { status: 'completed', time: '2024-03-10 14:30', details: '申请材料已提交成功，系统已分配申请编号 #20240001' },
    reviewed: { status: 'completed', time: '2024-03-12 09:15', details: '导师已查看申请材料，查看次数: 3次' },
    screened: { status: 'active', time: '2024-03-13 16:20', details: '初筛通过，符合基本要求' },
    interview: { status: 'pending', time: '', details: '面试邀请将于3月15日发送' },
    result: { status: 'pending', time: '', details: '最终结果将于3月25日公布' }
  };

  // Application submission form
  const renderSubmissionForm = () => {
    const steps = [
      { title: '个人信息', content: 'personal' },
      { title: '学术背景', content: 'academic' },
      { title: '项目经历', content: 'experience' },
      { title: '技能特长', content: 'skills' },
      { title: '材料上传', content: 'upload' }
    ];

    const renderStepContent = () => {
      switch (currentStep) {
        case 0:
          return (
            <div>
              <Title level={4}>个人信息确认</Title>
              <Form layout="vertical">
                <Row gutter={[16, 16]}>
                  <Col xs={24} md={12}>
                    <Form.Item label="姓名" required>
                      <Input placeholder="请输入姓名" defaultValue="李同学" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={12}>
                    <Form.Item label="学号" required>
                      <Input placeholder="请输入学号" defaultValue="2021001234" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={12}>
                    <Form.Item label="专业" required>
                      <Input placeholder="请输入专业" defaultValue="机械设计制造及其自动化" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={12}>
                    <Form.Item label="年级" required>
                      <Select placeholder="请选择年级" defaultValue="大三">
                        <Select.Option value="大一">大一</Select.Option>
                        <Select.Option value="大二">大二</Select.Option>
                        <Select.Option value="大三">大三</Select.Option>
                        <Select.Option value="大四">大四</Select.Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={12}>
                    <Form.Item label="联系电话" required>
                      <Input placeholder="请输入联系电话" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={12}>
                    <Form.Item label="邮箱地址" required>
                      <Input placeholder="请输入邮箱地址" />
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
            </div>
          );
        case 1:
          return (
            <div>
              <Title level={4}>学术背景</Title>
              <Form layout="vertical">
                <Form.Item label="GPA" required>
                  <Input placeholder="请输入GPA" />
                </Form.Item>
                <Form.Item label="相关课程成绩" required>
                  <TextArea 
                    rows={4} 
                    placeholder="请列出与申请课题相关的课程及成绩，如：高等数学 A+, 线性代数 A, Python程序设计 A..." 
                  />
                </Form.Item>
                <Form.Item label="学术奖励">
                  <TextArea 
                    rows={3} 
                    placeholder="请描述获得的学术奖励，如奖学金、学科竞赛获奖等..." 
                  />
                </Form.Item>
              </Form>
            </div>
          );
        case 2:
          return (
            <div>
              <Title level={4}>项目经历</Title>
              <Form layout="vertical">
                <Form.Item label="个人陈述" required>
                  <TextArea 
                    rows={6} 
                    placeholder="请详细说明为什么选择此课题、个人兴趣动机、预期学习目标和个人优势（500-1000字）" 
                    showCount
                    maxLength={1000}
                  />
                </Form.Item>
                <Form.Item label="项目经历">
                  <TextArea 
                    rows={4} 
                    placeholder="请描述参与过的学术或实践项目，包括项目名称、角色、主要工作和收获..." 
                  />
                </Form.Item>
                <Form.Item label="竞赛经历">
                  <TextArea 
                    rows={3} 
                    placeholder="请描述参加过的学科竞赛，包括竞赛名称、获奖情况等..." 
                  />
                </Form.Item>
              </Form>
            </div>
          );
        case 3:
          return (
            <div>
              <Title level={4}>技能特长</Title>
              <Form layout="vertical">
                <Form.Item label="编程语言" required>
                  <Checkbox.Group>
                    <Row gutter={[16, 8]}>
                      <Col><Checkbox value="python">Python</Checkbox></Col>
                      <Col><Checkbox value="java">Java</Checkbox></Col>
                      <Col><Checkbox value="cpp">C++</Checkbox></Col>
                      <Col><Checkbox value="javascript">JavaScript</Checkbox></Col>
                      <Col><Checkbox value="matlab">MATLAB</Checkbox></Col>
                      <Col><Checkbox value="r">R</Checkbox></Col>
                    </Row>
                  </Checkbox.Group>
                </Form.Item>
                <Form.Item label="技能水平描述">
                  <TextArea 
                    rows={4} 
                    placeholder="请详细描述各项技能的掌握程度和相关经验..." 
                  />
                </Form.Item>
                <Form.Item label="时间安排" required>
                  <TextArea 
                    rows={3} 
                    placeholder="请说明每周可投入的时间、时间段安排、是否有其他课程冲突等..." 
                  />
                </Form.Item>
                <Form.Item label="其他特长">
                  <TextArea 
                    rows={2} 
                    placeholder="请描述其他相关特长或能力..." 
                  />
                </Form.Item>
              </Form>
            </div>
          );
        case 4:
          return (
            <div>
              <Title level={4}>材料上传</Title>
              <Row gutter={[16, 16]}>
                <Col xs={24} md={12}>
                  <Card title="必需材料" size="small">
                    <div style={{ marginBottom: '16px' }}>
                      <Text strong>个人简历</Text>
                      <Tag color="red" style={{ marginLeft: '8px' }}>必需</Tag>
                    </div>
                    <Dragger
                      name="resume"
                      multiple={false}
                      accept=".pdf,.doc,.docx"
                      style={{ marginBottom: '16px' }}
                    >
                      <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                      </p>
                      <p className="ant-upload-text">点击或拖拽上传PDF/Word文件</p>
                      <p className="ant-upload-hint">文件大小不超过10MB</p>
                    </Dragger>

                    <div style={{ marginBottom: '16px' }}>
                      <Text strong>成绩单</Text>
                      <Tag color="red" style={{ marginLeft: '8px' }}>必需</Tag>
                    </div>
                    <Dragger
                      name="transcript"
                      multiple={false}
                      accept=".pdf,.jpg,.png"
                    >
                      <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                      </p>
                      <p className="ant-upload-text">上传官方成绩单</p>
                      <p className="ant-upload-hint">支持PDF或图片格式</p>
                    </Dragger>
                  </Card>
                </Col>
                <Col xs={24} md={12}>
                  <Card title="可选材料" size="small">
                    <div style={{ marginBottom: '16px' }}>
                      <Text strong>作品集</Text>
                      <Tag color="blue" style={{ marginLeft: '8px' }}>可选</Tag>
                    </div>
                    <Dragger
                      name="portfolio"
                      multiple={true}
                      accept=".pdf,.jpg,.png,.zip"
                      style={{ marginBottom: '16px' }}
                    >
                      <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                      </p>
                      <p className="ant-upload-text">上传项目截图或代码</p>
                      <p className="ant-upload-hint">可上传多个文件</p>
                    </Dragger>

                    <div style={{ marginBottom: '16px' }}>
                      <Text strong>推荐信</Text>
                      <Tag color="blue" style={{ marginLeft: '8px' }}>可选</Tag>
                    </div>
                    <Dragger
                      name="recommendation"
                      multiple={false}
                      accept=".pdf"
                    >
                      <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                      </p>
                      <p className="ant-upload-text">上传推荐信PDF</p>
                    </Dragger>
                  </Card>
                </Col>
              </Row>
            </div>
          );
        default:
          return null;
      }
    };

    return (
      <Card>
        <Steps current={currentStep} style={{ marginBottom: '32px' }}>
          {steps.map(step => (
            <Step key={step.content} title={step.title} />
          ))}
        </Steps>
        
        <div style={{ minHeight: '400px' }}>
          {renderStepContent()}
        </div>
        
        <Divider />
        <div style={{ textAlign: 'center' }}>
          <Space>
            {currentStep > 0 && (
              <Button onClick={() => setCurrentStep(currentStep - 1)}>
                上一步
              </Button>
            )}
            {currentStep < steps.length - 1 && (
              <Button type="primary" onClick={() => setCurrentStep(currentStep + 1)}>
                下一步
              </Button>
            )}
            {currentStep === steps.length - 1 && (
              <Button type="primary" size="large">
                提交申请
              </Button>
            )}
          </Space>
        </div>
      </Card>
    );
  };

  // Volunteer preferences management
  const renderVolunteerPreferences = () => (
    <Card title="志愿填报" extra={<Button type="primary">保存志愿顺序</Button>}>
      <Alert
        message="志愿填报说明"
        description="最多可选择3个志愿，请按照个人偏好拖拽调整顺序。系统将根据您的志愿顺序和匹配度进行分配。"
        type="info"
        showIcon
        style={{ marginBottom: '24px' }}
      />
      
      <div>
        {volunteerOrder.map((volunteer, index) => (
          <Card 
            key={volunteer.id}
            size="small"
            style={{ 
              marginBottom: '16px',
              border: `2px solid ${index === 0 ? '#1890ff' : index === 1 ? '#52c41a' : '#fa8c16'}`,
              borderRadius: '8px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ 
                  width: '32px', 
                  height: '32px', 
                  borderRadius: '50%', 
                  backgroundColor: index === 0 ? '#1890ff' : index === 1 ? '#52c41a' : '#fa8c16',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '12px',
                  fontWeight: 'bold'
                }}>
                  {index + 1}
                </div>
                <div>
                  <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>
                    {volunteer.title}
                  </div>
                  <div style={{ fontSize: '12px', color: '#8c8c8c' }}>
                    导师: {volunteer.professor} | 匹配度: {volunteer.match}%
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Tag color={index === 0 ? 'blue' : index === 1 ? 'green' : 'orange'}>
                  {index === 0 ? '第一志愿' : index === 1 ? '第二志愿' : '第三志愿'}
                </Tag>
                <Button type="text" icon={<DragOutlined />} style={{ cursor: 'move' }}>
                  拖拽
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
      
      <Card style={{ background: '#f9f9f9', border: '2px dashed #d9d9d9' }}>
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <Button type="dashed" size="large">
            + 添加更多志愿（最多3个）
          </Button>
        </div>
      </Card>
      
      <div style={{ marginTop: '24px' }}>
        <Title level={4}>AI建议</Title>
        <Alert
          message="志愿填报建议"
          description="根据您的背景分析，建议将'基于深度学习的图像识别'作为第一志愿，成功率预计92%。建议适当分散风险，选择不同难度等级的课题。"
          type="success"
          showIcon
        />
      </div>
    </Card>
  );

  // Application status tracking
  const renderApplicationStatus = () => (
    <Card title="申请状态跟踪">
      <Timeline style={{ marginTop: '24px' }}>
        <Timeline.Item
          color="green"
          dot={<CheckCircleOutlined style={{ fontSize: '16px' }} />}
        >
          <div style={{ paddingBottom: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <Text strong>申请已提交</Text>
              <Text type="secondary">2024-03-10 14:30</Text>
            </div>
            <Text type="secondary">
              申请材料已提交成功，系统已分配申请编号 #20240001
            </Text>
            <div style={{ marginTop: '8px' }}>
              <Badge status="success" text="材料完整性: 100%" />
            </div>
          </div>
        </Timeline.Item>
        
        <Timeline.Item
          color="green"
          dot={<EyeOutlined style={{ fontSize: '16px' }} />}
        >
          <div style={{ paddingBottom: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <Text strong>导师已查看</Text>
              <Text type="secondary">2024-03-12 09:15</Text>
            </div>
            <Text type="secondary">
              张教授已查看您的申请材料
            </Text>
            <div style={{ marginTop: '8px' }}>
              <Badge status="processing" text="查看次数: 3次" />
              <Badge status="success" text="重点关注" style={{ marginLeft: '8px' }} />
            </div>
          </div>
        </Timeline.Item>
        
        <Timeline.Item
          color="blue"
          dot={<ExclamationCircleOutlined style={{ fontSize: '16px' }} />}
        >
          <div style={{ paddingBottom: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <Text strong>初筛通过</Text>
              <Text type="secondary">2024-03-13 16:20</Text>
            </div>
            <Text type="secondary">
              恭喜！您已通过初筛，符合课题的基本要求
            </Text>
            <div style={{ marginTop: '8px' }}>
              <Badge status="success" text="学术背景匹配" />
              <Badge status="success" text="技能要求符合" style={{ marginLeft: '8px' }} />
            </div>
          </div>
        </Timeline.Item>
        
        <Timeline.Item
          color="gray"
          dot={<ClockCircleOutlined style={{ fontSize: '16px' }} />}
        >
          <div style={{ paddingBottom: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <Text strong>面试邀请</Text>
              <Text type="secondary">待通知</Text>
            </div>
            <Text type="secondary">
              面试邀请将于3月15日通过邮件发送，请注意查收
            </Text>
            <div style={{ marginTop: '8px' }}>
              <Badge status="default" text="预计3月15日发送" />
            </div>
          </div>
        </Timeline.Item>
        
        <Timeline.Item
          color="gray"
          dot={<TrophyOutlined style={{ fontSize: '16px' }} />}
        >
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <Text strong>最终结果</Text>
              <Text type="secondary">待公布</Text>
            </div>
            <Text type="secondary">
              最终录取结果将于3月25日在系统中公布
            </Text>
            <div style={{ marginTop: '8px' }}>
              <Badge status="default" text="预计3月25日公布" />
            </div>
          </div>
        </Timeline.Item>
      </Timeline>
      
      <Alert
        message="下一步行动"
        description="请保持邮箱和手机畅通，面试通知将通过邮件和短信发送。建议提前准备面试材料和自我介绍。"
        type="info"
        showIcon
        style={{ marginTop: '24px' }}
      />
    </Card>
  );

  // Interview booking
  const renderInterviewBooking = () => (
    <Row gutter={[24, 24]}>
      <Col xs={24} lg={12}>
        <Card title="面试预约">
          <Alert
            message="面试通知"
            description="恭喜您通过初筛！请在下方选择合适的面试时间，面试形式为线上面试（腾讯会议）。"
            type="success"
            showIcon
            style={{ marginBottom: '24px' }}
          />
          
          <div style={{ marginBottom: '16px' }}>
            <Text strong>可选时间段：</Text>
          </div>
          
          <List
            dataSource={[
              { time: '3月18日 09:00-09:30', status: 'available', professor: '张教授' },
              { time: '3月18日 14:00-14:30', status: 'available', professor: '张教授' },
              { time: '3月19日 10:00-10:30', status: 'booked', professor: '张教授' },
              { time: '3月19日 15:00-15:30', status: 'available', professor: '张教授' },
              { time: '3月20日 09:30-10:00', status: 'available', professor: '张教授' }
            ]}
            renderItem={(item) => (
              <List.Item
                actions={[
                  item.status === 'available' ? 
                    <Button type="primary" size="small">选择</Button> :
                    <Button disabled size="small">已预约</Button>
                ]}
              >
                <List.Item.Meta
                  avatar={<Avatar icon={<CalendarOutlined />} />}
                  title={item.time}
                  description={
                    <div>
                      <Text type="secondary">面试官: {item.professor}</Text>
                      <Tag 
                        color={item.status === 'available' ? 'green' : 'red'} 
                        style={{ marginLeft: '8px' }}
                      >
                        {item.status === 'available' ? '可预约' : '已预约'}
                      </Tag>
                    </div>
                  }
                />
              </List.Item>
            )}
          />
        </Card>
      </Col>
      
      <Col xs={24} lg={12}>
        <Card title="面试信息" style={{ marginBottom: '24px' }}>
          <div style={{ marginBottom: '16px' }}>
            <Text strong>面试形式: </Text>
            <Tag color="blue">线上面试</Tag>
          </div>
          <div style={{ marginBottom: '16px' }}>
            <Text strong>面试时长: </Text>
            <Text>约30分钟</Text>
          </div>
          <div style={{ marginBottom: '16px' }}>
            <Text strong>面试内容: </Text>
            <ul style={{ marginTop: '8px', paddingLeft: '20px' }}>
              <li>个人背景介绍</li>
              <li>研究兴趣和动机</li>
              <li>技术能力评估</li>
              <li>时间安排确认</li>
            </ul>
          </div>
          <div style={{ marginBottom: '16px' }}>
            <Text strong>准备建议: </Text>
            <ul style={{ marginTop: '8px', paddingLeft: '20px' }}>
              <li>准备3-5分钟自我介绍</li>
              <li>熟悉申请课题的相关背景</li>
              <li>准备技术问题的回答</li>
              <li>测试网络和设备</li>
            </ul>
          </div>
        </Card>
        
        <Card title="联系方式">
          <div style={{ marginBottom: '12px' }}>
            <PhoneOutlined style={{ marginRight: '8px', color: '#1890ff' }} />
            <Text>面试技术支持: 400-123-4567</Text>
          </div>
          <div>
            <MailOutlined style={{ marginRight: '8px', color: '#1890ff' }} />
            <Text>导师邮箱: zhang.prof@university.edu</Text>
          </div>
        </Card>
      </Col>
    </Row>
  );

  // Render content based on active view
  const renderContent = () => {
    switch (activeView) {
      case 'submit':
        return renderSubmissionForm();
      case 'preferences':
        return renderVolunteerPreferences();
      case 'status':
        return renderApplicationStatus();
      case 'interview':
        return renderInterviewBooking();
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

export default ApplicationManagement;