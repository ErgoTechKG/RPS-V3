import React, { useState } from 'react';
import { Card, Row, Col, Upload, Button, Progress, Form, Input, Select, Typography, Alert, Tag, List, Space, Divider, Steps, Modal } from 'antd';
import {
  InboxOutlined,
  FileTextOutlined,
  PictureOutlined,
  DownloadOutlined,
  EyeOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  UploadOutlined,
  DeleteOutlined,
  EditOutlined
} from '@ant-design/icons';

const { Dragger } = Upload;
const { TextArea } = Input;
const { Title, Text, Paragraph } = Typography;
const { Step } = Steps;

interface AchievementSubmissionProps {
  activeView: 'poster' | 'report';
}

const AchievementSubmission: React.FC<AchievementSubmissionProps> = ({ activeView }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [form] = Form.useForm();

  // Mock data for poster requirements
  const posterRequirements = {
    size: 'A0 (841mm × 1189mm) 或 A1 (594mm × 841mm)',
    format: 'PDF, PNG, JPG (高分辨率)',
    maxSize: '50MB',
    content: [
      '研究背景和意义',
      '研究目标和方法',
      '实验设计和实施',
      '主要结果和发现',
      '结论和展望',
      '参考文献'
    ],
    design: [
      '清晰的标题和作者信息',
      '合理的版面布局',
      '高质量的图表和图像',
      '简洁明了的文字说明',
      '统一的字体和颜色风格'
    ]
  };

  // Mock data for report requirements
  const reportRequirements = {
    structure: [
      '摘要 (300-500字)',
      '引言和文献综述',
      '研究方法和实验设计',
      '结果与分析',
      '讨论',
      '结论',
      '参考文献',
      '附录 (可选)'
    ],
    format: [
      '字数要求: 8000-12000字',
      '格式: PDF或Word文档',
      '字体: 宋体或Times New Roman',
      '行距: 1.5倍行距',
      '页边距: 上下2.5cm，左右2cm'
    ],
    citation: 'APA格式，至少引用15篇相关文献'
  };

  // Mock submission history
  const submissionHistory = [
    {
      id: '1',
      type: 'poster',
      title: '深度学习图像识别研究海报 v2.0',
      uploadTime: '2024-03-20 14:30',
      status: 'approved',
      feedback: '海报设计美观，内容清晰完整。建议在结果部分添加更多的对比数据。',
      grade: 'A',
      files: ['research_poster_v2.pdf'],
      version: 2
    },
    {
      id: '2',
      type: 'report',
      title: '基于CNN的医学图像识别算法研究报告',
      uploadTime: '2024-03-18 09:15',
      status: 'revision_needed',
      feedback: '研究内容扎实，但文献综述部分需要补充更多最新研究。实验部分的数据分析可以更深入。',
      grade: null,
      files: ['research_report_v1.pdf'],
      version: 1
    }
  ];

  // Template downloads
  const templates = [
    {
      id: '1',
      name: 'A0海报模板',
      type: 'poster',
      format: 'PowerPoint',
      size: '2.5MB',
      downloads: 1250,
      description: '标准学术海报模板，包含完整的布局结构'
    },
    {
      id: '2',
      name: 'A1海报模板',
      type: 'poster', 
      format: 'PowerPoint',
      size: '1.8MB',
      downloads: 890,
      description: '紧凑型海报模板，适合内容较少的项目'
    },
    {
      id: '3',
      name: '研究报告模板',
      type: 'report',
      format: 'Word',
      size: '156KB',
      downloads: 2100,
      description: '符合学院要求的标准研究报告格式模板'
    },
    {
      id: '4',
      name: '优秀海报示例',
      type: 'poster',
      format: 'PDF',
      size: '3.2MB',
      downloads: 567,
      description: '往年优秀学生海报作品集，供参考学习'
    }
  ];

  // Poster upload interface
  const renderPosterUpload = () => (
    <div>
      <Row gutter={[24, 24]}>
        <Col xs={24} lg={16}>
          <Card title="海报上传">
            <Steps current={currentStep} style={{ marginBottom: '24px' }}>
              <Step title="了解要求" />
              <Step title="上传文件" />
              <Step title="预览确认" />
              <Step title="提交完成" />
            </Steps>

            {currentStep === 0 && (
              <div>
                <Alert
                  message="海报制作要求"
                  description="请仔细阅读以下要求，确保您的海报符合所有标准。"
                  type="info"
                  showIcon
                  style={{ marginBottom: '24px' }}
                />
                
                <Card size="small" title="尺寸和格式要求" style={{ marginBottom: '16px' }}>
                  <Row gutter={[16, 16]}>
                    <Col xs={24} md={12}>
                      <div style={{ marginBottom: '8px' }}>
                        <Text strong>尺寸规格:</Text>
                      </div>
                      <div style={{ fontSize: '14px', color: '#595959' }}>
                        {posterRequirements.size}
                      </div>
                    </Col>
                    <Col xs={24} md={12}>
                      <div style={{ marginBottom: '8px' }}>
                        <Text strong>文件格式:</Text>
                      </div>
                      <div style={{ fontSize: '14px', color: '#595959' }}>
                        {posterRequirements.format}
                      </div>
                    </Col>
                  </Row>
                </Card>

                <Card size="small" title="内容要求" style={{ marginBottom: '16px' }}>
                  <ul style={{ marginLeft: '16px', fontSize: '14px' }}>
                    {posterRequirements.content.map((item, index) => (
                      <li key={index} style={{ marginBottom: '4px' }}>{item}</li>
                    ))}
                  </ul>
                </Card>

                <Card size="small" title="设计规范">
                  <ul style={{ marginLeft: '16px', fontSize: '14px' }}>
                    {posterRequirements.design.map((item, index) => (
                      <li key={index} style={{ marginBottom: '4px' }}>{item}</li>
                    ))}
                  </ul>
                </Card>

                <div style={{ textAlign: 'center', marginTop: '24px' }}>
                  <Button type="primary" onClick={() => setCurrentStep(1)}>
                    我已了解要求，开始上传
                  </Button>
                </div>
              </div>
            )}

            {currentStep === 1 && (
              <div>
                <Form form={form} layout="vertical">
                  <Form.Item 
                    label="海报标题" 
                    name="title" 
                    required
                    rules={[{ required: true, message: '请输入海报标题' }]}
                  >
                    <Input placeholder="请输入海报标题" />
                  </Form.Item>
                  
                  <Form.Item label="作者信息" name="authors">
                    <Input placeholder="请输入作者姓名，多个作者用逗号分隔" />
                  </Form.Item>
                  
                  <Form.Item label="指导教师" name="supervisor">
                    <Input placeholder="请输入指导教师姓名" />
                  </Form.Item>
                  
                  <Form.Item 
                    label="海报文件" 
                    required
                    extra="支持 PDF、PNG、JPG 格式，文件大小不超过 50MB"
                  >
                    <Dragger
                      name="poster"
                      multiple={false}
                      accept=".pdf,.png,.jpg,.jpeg"
                      beforeUpload={(file) => {
                        const isValidSize = file.size / 1024 / 1024 < 50;
                        if (!isValidSize) {
                          Modal.error({
                            title: '文件过大',
                            content: '文件大小不能超过50MB',
                          });
                        }
                        return isValidSize;
                      }}
                    >
                      <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                      </p>
                      <p className="ant-upload-text">点击或拖拽文件到此区域上传</p>
                      <p className="ant-upload-hint">
                        请上传高分辨率的海报文件
                      </p>
                    </Dragger>
                  </Form.Item>
                  
                  <Form.Item label="海报摘要" name="abstract">
                    <TextArea 
                      rows={4} 
                      placeholder="请简要描述海报的主要内容（300字以内）"
                      showCount
                      maxLength={300}
                    />
                  </Form.Item>
                </Form>

                <div style={{ textAlign: 'center', marginTop: '24px' }}>
                  <Space>
                    <Button onClick={() => setCurrentStep(0)}>
                      上一步
                    </Button>
                    <Button type="primary" onClick={() => setCurrentStep(2)}>
                      下一步
                    </Button>
                  </Space>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div>
                <Alert
                  message="预览确认"
                  description="请仔细检查您的海报信息，确认无误后提交。"
                  type="warning"
                  showIcon
                  style={{ marginBottom: '24px' }}
                />
                
                <Card size="small">
                  <div style={{ marginBottom: '16px' }}>
                    <Text strong>海报标题: </Text>
                    <Text>深度学习在医学图像识别中的应用研究</Text>
                  </div>
                  <div style={{ marginBottom: '16px' }}>
                    <Text strong>作者: </Text>
                    <Text>李同学</Text>
                  </div>
                  <div style={ {marginBottom: '16px' }}>
                    <Text strong>指导教师: </Text>
                    <Text>张教授</Text>
                  </div>
                  <div style={{ marginBottom: '16px' }}>
                    <Text strong>上传文件: </Text>
                    <Tag icon={<FileTextOutlined />} color="blue">
                      research_poster.pdf (12.5MB)
                    </Tag>
                  </div>
                  <div>
                    <Text strong>摘要: </Text>
                    <Paragraph style={{ marginTop: '8px' }}>
                      本研究探索了卷积神经网络在医学图像分析中的应用，通过深度学习技术提高了诊断准确率...
                    </Paragraph>
                  </div>
                </Card>

                <div style={{ textAlign: 'center', marginTop: '24px' }}>
                  <Space>
                    <Button onClick={() => setCurrentStep(1)}>
                      上一步
                    </Button>
                    <Button type="primary" onClick={() => setCurrentStep(3)}>
                      确认提交
                    </Button>
                  </Space>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div style={{ textAlign: 'center', padding: '40px' }}>
                <CheckCircleOutlined style={{ fontSize: '48px', color: '#52c41a', marginBottom: '16px' }} />
                <Title level={3}>海报提交成功！</Title>
                <Paragraph>
                  您的海报已成功提交，系统已分配提交编号 #P20240001。
                  导师将在3个工作日内完成审核，审核结果将通过邮件和系统通知您。
                </Paragraph>
                <div style={{ marginTop: '24px' }}>
                  <Space>
                    <Button onClick={() => setCurrentStep(0)}>
                      提交新海报
                    </Button>
                    <Button type="primary">
                      查看提交记录
                    </Button>
                  </Space>
                </div>
              </div>
            )}
          </Card>
        </Col>

        <Col xs={24} lg={8}>
          {/* Templates and Resources */}
          <Card title="模板下载" style={{ marginBottom: '24px' }}>
            <List
              dataSource={templates.filter(t => t.type === 'poster')}
              renderItem={(template) => (
                <List.Item
                  actions={[
                    <Button 
                      type="link" 
                      size="small" 
                      icon={<DownloadOutlined />}
                    >
                      下载
                    </Button>
                  ]}
                >
                  <List.Item.Meta
                    avatar={<PictureOutlined style={{ fontSize: '24px', color: '#1890ff' }} />}
                    title={template.name}
                    description={
                      <div>
                        <div style={{ fontSize: '12px', color: '#8c8c8c' }}>
                          {template.format} · {template.size} · {template.downloads} 次下载
                        </div>
                        <div style={{ fontSize: '12px', marginTop: '4px' }}>
                          {template.description}
                        </div>
                      </div>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>

          {/* Tips */}
          <Card title="制作提示">
            <div style={{ fontSize: '14px' }}>
              <div style={{ marginBottom: '12px' }}>
                <Text strong>🎨 设计原则:</Text>
                <ul style={{ marginLeft: '16px', marginTop: '8px' }}>
                  <li>保持简洁，突出重点</li>
                  <li>使用高对比度的颜色搭配</li>
                  <li>确保从3米外能清楚阅读</li>
                </ul>
              </div>
              <div style={{ marginBottom: '12px' }}>
                <Text strong>📊 内容建议:</Text>
                <ul style={{ marginLeft: '16px', marginTop: '8px' }}>
                  <li>用图表代替大段文字</li>
                  <li>突出核心发现和创新点</li>
                  <li>包含清晰的研究流程图</li>
                </ul>
              </div>
              <div>
                <Text strong>🔧 技术要求:</Text>
                <ul style={{ marginLeft: '16px', marginTop: '8px' }}>
                  <li>分辨率至少300DPI</li>
                  <li>使用矢量图形</li>
                  <li>确保文字清晰可读</li>
                </ul>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );

  // Report submission interface
  const renderReportSubmission = () => (
    <div>
      <Row gutter={[24, 24]}>
        <Col xs={24} lg={16}>
          <Card title="研究报告提交">
            <Alert
              message="报告撰写指南"
              description="请按照学院标准格式撰写研究报告，确保内容完整、逻辑清晰。"
              type="info"
              showIcon
              style={{ marginBottom: '24px' }}
            />

            <Form layout="vertical">
              <Form.Item 
                label="报告标题" 
                required
                rules={[{ required: true, message: '请输入报告标题' }]}
              >
                <Input placeholder="请输入研究报告标题" />
              </Form.Item>
              
              <Form.Item label="关键词">
                <Input placeholder="请输入3-5个关键词，用逗号分隔" />
              </Form.Item>
              
              <Form.Item 
                label="报告摘要" 
                required
                rules={[{ required: true, message: '请输入报告摘要' }]}
              >
                <TextArea 
                  rows={6} 
                  placeholder="请输入报告摘要（300-500字）"
                  showCount
                  maxLength={500}
                />
              </Form.Item>
              
              <Form.Item 
                label="上传报告文件"
                required
                extra="支持 PDF、Word 格式，文件大小不超过 20MB"
              >
                <Dragger
                  name="report"
                  multiple={false}
                  accept=".pdf,.doc,.docx"
                  beforeUpload={(file) => {
                    const isValidSize = file.size / 1024 / 1024 < 20;
                    if (!isValidSize) {
                      Modal.error({
                        title: '文件过大',
                        content: '文件大小不能超过20MB',
                      });
                    }
                    return isValidSize;
                  }}
                >
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">点击或拖拽文件到此区域上传</p>
                  <p className="ant-upload-hint">
                    请上传完整的研究报告文档
                  </p>
                </Dragger>
              </Form.Item>
              
              <Form.Item label="补充材料（可选）">
                <Dragger
                  name="supplements"
                  multiple={true}
                  accept=".pdf,.doc,.docx,.xls,.xlsx,.zip"
                >
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">上传补充材料</p>
                  <p className="ant-upload-hint">
                    如数据文件、代码、图表等
                  </p>
                </Dragger>
              </Form.Item>
              
              <Form.Item label="提交说明">
                <TextArea 
                  rows={3} 
                  placeholder="请简要说明本次提交的主要内容和改进点..."
                />
              </Form.Item>
              
              <Form.Item>
                <Button type="primary" size="large" icon={<UploadOutlined />}>
                  提交研究报告
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>

        <Col xs={24} lg={8}>
          {/* Report Requirements */}
          <Card title="报告要求" style={{ marginBottom: '24px' }}>
            <div style={{ fontSize: '14px' }}>
              <div style={{ marginBottom: '16px' }}>
                <Text strong>📝 结构要求:</Text>
                <ul style={{ marginLeft: '16px', marginTop: '8px' }}>
                  {reportRequirements.structure.map((item, index) => (
                    <li key={index} style={{ marginBottom: '2px' }}>{item}</li>
                  ))}
                </ul>
              </div>
              
              <div style={{ marginBottom: '16px' }}>
                <Text strong>📄 格式要求:</Text>
                <ul style={{ marginLeft: '16px', marginTop: '8px' }}>
                  {reportRequirements.format.map((item, index) => (
                    <li key={index} style={{ marginBottom: '2px' }}>{item}</li>
                  ))}
                </ul>
              </div>
              
              <div>
                <Text strong>📚 引用要求:</Text>
                <div style={{ marginLeft: '16px', marginTop: '8px' }}>
                  {reportRequirements.citation}
                </div>
              </div>
            </div>
          </Card>

          {/* Writing Tools */}
          <Card title="写作工具">
            <List
              size="small"
              dataSource={templates.filter(t => t.type === 'report')}
              renderItem={(template) => (
                <List.Item
                  actions={[
                    <Button 
                      type="link" 
                      size="small" 
                      icon={<DownloadOutlined />}
                    >
                      下载
                    </Button>
                  ]}
                >
                  <List.Item.Meta
                    avatar={<FileTextOutlined style={{ fontSize: '20px', color: '#52c41a' }} />}
                    title={template.name}
                    description={
                      <div style={{ fontSize: '12px', color: '#8c8c8c' }}>
                        {template.format} · {template.size}
                      </div>
                    }
                  />
                </List.Item>
              )}
            />
            
            <Divider style={{ margin: '12px 0' }} />
            
            <div style={{ fontSize: '14px' }}>
              <Text strong>推荐工具:</Text>
              <ul style={{ marginLeft: '16px', marginTop: '8px', fontSize: '12px' }}>
                <li>Grammarly - 英文语法检查</li>
                <li>Zotero - 文献管理</li>
                <li>Mendeley - 论文引用</li>
                <li>LaTeX - 专业排版</li>
              </ul>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );

  // Submission history
  const renderSubmissionHistory = () => (
    <Card title="提交历史" style={{ marginTop: '24px' }}>
      <List
        dataSource={submissionHistory}
        renderItem={(submission) => (
          <List.Item
            actions={[
              <Button size="small" icon={<EyeOutlined />}>
                查看
              </Button>,
              submission.status === 'revision_needed' && (
                <Button size="small" type="primary" icon={<EditOutlined />}>
                  修改
                </Button>
              ),
              <Button size="small" icon={<DownloadOutlined />}>
                下载
              </Button>
            ].filter(Boolean)}
          >
            <List.Item.Meta
              avatar={
                <div style={{ textAlign: 'center' }}>
                  {submission.type === 'poster' ? 
                    <PictureOutlined style={{ fontSize: '24px', color: '#1890ff' }} /> :
                    <FileTextOutlined style={{ fontSize: '24px', color: '#52c41a' }} />
                  }
                  <div style={{ fontSize: '10px', color: '#8c8c8c', marginTop: '4px' }}>
                    v{submission.version}
                  </div>
                </div>
              }
              title={
                <div>
                  <Text strong>{submission.title}</Text>
                  <Tag 
                    color={
                      submission.status === 'approved' ? 'green' :
                      submission.status === 'revision_needed' ? 'orange' :
                      submission.status === 'pending' ? 'blue' : 'default'
                    }
                    style={{ marginLeft: '8px' }}
                  >
                    {submission.status === 'approved' ? '已通过' :
                     submission.status === 'revision_needed' ? '需修改' :
                     submission.status === 'pending' ? '待审核' : submission.status}
                  </Tag>
                  {submission.grade && (
                    <Tag color="green" style={{ marginLeft: '4px' }}>
                      {submission.grade}
                    </Tag>
                  )}
                </div>
              }
              description={
                <div>
                  <div style={{ fontSize: '12px', color: '#8c8c8c', marginBottom: '8px' }}>
                    提交时间: {submission.uploadTime}
                  </div>
                  {submission.feedback && (
                    <div style={{ fontSize: '13px', lineHeight: '18px' }}>
                      <Text strong>导师反馈: </Text>
                      <Text>{submission.feedback}</Text>
                    </div>
                  )}
                  <div style={{ marginTop: '8px' }}>
                    {submission.files.map((file, index) => (
                      <Tag key={index} style={{ marginBottom: '4px' }}>
                        {file}
                      </Tag>
                    ))}
                  </div>
                </div>
              }
            />
          </List.Item>
        )}
      />
    </Card>
  );

  return (
    <div>
      {activeView === 'poster' ? renderPosterUpload() : renderReportSubmission()}
      {renderSubmissionHistory()}
    </div>
  );
};

export default AchievementSubmission;