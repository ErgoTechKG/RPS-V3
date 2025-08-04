import React, { useState } from 'react';
import { Card, Tabs, Row, Col, Button, Tag, Avatar, Rate, Divider, Progress, Timeline, List, Typography, Space, Descriptions, Alert } from 'antd';
import {
  UserOutlined,
  HeartOutlined,
  HeartFilled,
  ShareAltOutlined,
  MessageOutlined,
  ClockCircleOutlined,
  TeamOutlined,
  BookOutlined,
  ExperimentOutlined,
  TrophyOutlined,
  LinkOutlined,
  FileTextOutlined,
  StarOutlined,
  SafetyOutlined
} from '@ant-design/icons';

const { TabPane } = Tabs;
const { Title, Text, Paragraph } = Typography;

interface TopicDetailsProps {
  topicId: string;
  onBack?: () => void;
  onApply?: () => void;
}

const TopicDetails: React.FC<TopicDetailsProps> = ({ topicId, onBack, onApply }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [activeTab, setActiveTab] = useState('introduction');

  // Mock data for topic details
  const topicData = {
    id: topicId,
    title: '基于深度学习的图像识别算法研究',
    subtitle: '探索卷积神经网络在医学图像分析中的应用前景',
    coverImage: '/api/placeholder/800/300',
    professor: {
      name: '张教授',
      title: '教授/博导',
      department: '计算机科学与技术学院',
      rating: 4.8,
      avatar: '',
      researchAreas: ['机器学习', '计算机视觉', '医学图像处理'],
      achievements: ['发表SCI论文60余篇', '主持国家自然科学基金3项', '获省科技进步一等奖'],
      guidingStyle: '注重理论与实践结合，鼓励学生独立思考，提供充分的学术指导'
    },
    basicInfo: {
      field: '人工智能',
      difficulty: 'advanced',
      duration: '8周',
      applicants: 3,
      maxApplicants: 5,
      deadline: '2024年3月15日',
      matchScore: 92,
      isPopular: true
    },
    introduction: {
      background: '随着人工智能技术的快速发展，深度学习在医学图像分析领域展现出巨大潜力。医学图像识别对提高诊断准确率、降低误诊率具有重要意义。',
      objectives: ['掌握卷积神经网络的基本原理和实现方法', '学习医学图像预处理和特征提取技术', '设计并实现高精度的图像识别模型', '评估模型性能并进行优化改进'],
      methods: '采用卷积神经网络(CNN)架构，结合迁移学习和数据增强技术，使用Python和TensorFlow框架进行模型开发。',
      innovation: ['提出新的网络架构优化方案', '结合多模态医学图像信息', '开发实时诊断辅助系统']
    },
    requirements: {
      academic: ['计算机科学、软件工程或相关专业背景', '具备良好的数学基础，熟悉线性代数和概率统计'],
      technical: ['熟练掌握Python编程语言', '了解深度学习基础概念', '具备基本的图像处理知识', '熟悉Linux操作系统'],
      personal: ['每周投入时间不少于15小时', '具备良好的英文文献阅读能力', '有团队合作精神和沟通能力'],
      capacity: '招收2-3人，组建研究小组'
    },
    outcomes: {
      academic: ['发表1-2篇会议论文或期刊论文', '申请相关技术专利1项', '完成高质量的研究报告'],
      practical: ['开发完整的图像识别系统原型', '建立医学图像数据集', '制作项目展示海报和演示视频'],
      skills: ['深度学习模型设计与实现能力', '科研论文写作和学术表达能力', '项目管理和团队协作能力'],
      presentation: '期末进行15分钟的研究成果汇报，包括技术方案、实验结果和应用前景分析'
    },
    resources: {
      literature: [
        { title: 'Deep Learning for Medical Image Analysis', type: '教材', url: '#' },
        { title: 'Convolutional Neural Networks for Visual Recognition', type: '在线课程', url: '#' },
        { title: 'Medical Image Computing and Computer Assisted Intervention', type: '会议论文集', url: '#' }
      ],
      tools: [
        { name: 'Python', description: '主要编程语言', level: '必需' },
        { name: 'TensorFlow/PyTorch', description: '深度学习框架', level: '必需' },
        { name: 'OpenCV', description: '图像处理库', level: '推荐' },
        { name: 'MATLAB', description: '科学计算工具', level: '可选' }
      ],
      datasets: [
        { name: 'MIMIC-CXR', description: '胸部X光图像数据集', access: '已获取' },
        { name: 'NIH Chest X-rays', description: '胸部疾病诊断数据集', access: '已获取' },
        { name: 'COVID-19 Image Data Collection', description: 'COVID-19相关医学图像', access: '可申请' }
      ]
    },
    studentReviews: [
      {
        id: 1,
        student: '学生A',
        year: '2023年',
        rating: 5,
        comment: '张教授非常负责，每周都会安排固定时间讨论进度，给出的建议很有针对性。项目内容前沿，收获很大。',
        skills: ['学到了完整的深度学习项目流程', '提高了论文写作能力', '增强了编程实践能力']
      },
      {
        id: 2,
        student: '学生B',
        year: '2022年',
        rating: 5,
        comment: '导师很耐心，会根据每个学生的特点给出个性化指导。实验室氛围很好，同学之间互帮互助。',
        skills: ['掌握了TensorFlow框架的使用', '学会了科研论文的阅读方法', '培养了独立解决问题的能力']
      }
    ]
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return '#52c41a';
      case 'intermediate': return '#fa8c16';
      case 'advanced': return '#ff4d4f';
      default: return '#d9d9d9';
    }
  };

  const getDifficultyText = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return '入门级';
      case 'intermediate': return '中级';
      case 'advanced': return '高级';
      default: return '未知';
    }
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  return (
    <div>
      {/* Header Section */}
      <Card
        style={{ 
          marginBottom: '24px',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          border: 'none'
        }}
        bodyStyle={{ padding: '32px' }}
      >
        <Row gutter={[24, 24]} align="middle">
          <Col xs={24} lg={16}>
            <div style={{ color: 'white' }}>
              {topicData.basicInfo.isPopular && (
                <Tag color="red" style={{ marginBottom: '12px' }}>
                  🔥 热门课题
                </Tag>
              )}
              <Title level={2} style={{ color: 'white', margin: '0 0 8px 0' }}>
                {topicData.title}
              </Title>
              <Text style={{ color: 'rgba(255,255,255,0.9)', fontSize: '16px' }}>
                {topicData.subtitle}
              </Text>
              <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar 
                    size={40} 
                    style={{ backgroundColor: 'rgba(255,255,255,0.2)', marginRight: '8px' }}
                    icon={<UserOutlined />}
                  />
                  <div>
                    <div style={{ fontWeight: 'bold' }}>{topicData.professor.name}</div>
                    <div style={{ fontSize: '12px', opacity: 0.8 }}>{topicData.professor.title}</div>
                  </div>
                </div>
                <Divider type="vertical" style={{ borderColor: 'rgba(255,255,255,0.3)', height: '40px' }} />
                <div>
                  <Rate disabled defaultValue={topicData.professor.rating} style={{ fontSize: '16px' }} />
                  <div style={{ fontSize: '12px', opacity: 0.8 }}>导师评分</div>
                </div>
              </div>
            </div>
          </Col>
          <Col xs={24} lg={8}>
            <Card style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#1890ff', marginBottom: '8px' }}>
                {topicData.basicInfo.matchScore}%
              </div>
              <div style={{ color: '#8c8c8c', marginBottom: '16px' }}>AI推荐匹配度</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <Text type="secondary">申请人数</Text>
                <Text strong>{topicData.basicInfo.applicants}/{topicData.basicInfo.maxApplicants}</Text>
              </div>
              <Progress 
                percent={(topicData.basicInfo.applicants / topicData.basicInfo.maxApplicants) * 100}
                strokeColor={topicData.basicInfo.applicants >= topicData.basicInfo.maxApplicants ? '#ff4d4f' : '#1890ff'}
                style={{ marginBottom: '16px' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text type="secondary">申请截止</Text>
                <Text strong style={{ color: '#fa8c16' }}>{topicData.basicInfo.deadline}</Text>
              </div>
            </Card>
          </Col>
        </Row>
      </Card>

      <Row gutter={[24, 24]}>
        {/* Main Content */}
        <Col xs={24} lg={16}>
          <Card>
            <Tabs activeKey={activeTab} onChange={setActiveTab}>
              <TabPane tab={<span><BookOutlined />课题介绍</span>} key="introduction">
                <div>
                  <Title level={4}>研究背景</Title>
                  <Paragraph>{topicData.introduction.background}</Paragraph>
                  
                  <Title level={4}>研究目标</Title>
                  <ul>
                    {topicData.introduction.objectives.map((objective, index) => (
                      <li key={index} style={{ marginBottom: '8px' }}>{objective}</li>
                    ))}
                  </ul>
                  
                  <Title level={4}>研究方法</Title>
                  <Paragraph>{topicData.introduction.methods}</Paragraph>
                  
                  <Title level={4}>创新点</Title>
                  <ul>
                    {topicData.introduction.innovation.map((point, index) => (
                      <li key={index} style={{ marginBottom: '8px' }}>{point}</li>
                    ))}
                  </ul>
                </div>
              </TabPane>

              <TabPane tab={<span><SafetyOutlined />招生要求</span>} key="requirements">
                <div>
                  <Title level={4}>专业要求</Title>
                  <ul>
                    {topicData.requirements.academic.map((req, index) => (
                      <li key={index} style={{ marginBottom: '8px' }}>{req}</li>
                    ))}
                  </ul>
                  
                  <Title level={4}>技能要求</Title>
                  <ul>
                    {topicData.requirements.technical.map((skill, index) => (
                      <li key={index} style={{ marginBottom: '8px' }}>{skill}</li>
                    ))}
                  </ul>
                  
                  <Title level={4}>个人要求</Title>
                  <ul>
                    {topicData.requirements.personal.map((req, index) => (
                      <li key={index} style={{ marginBottom: '8px' }}>{req}</li>
                    ))}
                  </ul>
                  
                  <Alert
                    message="招生说明"
                    description={topicData.requirements.capacity}
                    type="info"
                    showIcon
                    style={{ marginTop: '16px' }}
                  />
                </div>
              </TabPane>

              <TabPane tab={<span><TrophyOutlined />预期成果</span>} key="outcomes">
                <div>
                  <Title level={4}>学术成果</Title>
                  <ul>
                    {topicData.outcomes.academic.map((outcome, index) => (
                      <li key={index} style={{ marginBottom: '8px' }}>{outcome}</li>
                    ))}
                  </ul>
                  
                  <Title level={4}>实践成果</Title>
                  <ul>
                    {topicData.outcomes.practical.map((outcome, index) => (
                      <li key={index} style={{ marginBottom: '8px' }}>{outcome}</li>
                    ))}
                  </ul>
                  
                  <Title level={4}>能力提升</Title>
                  <ul>
                    {topicData.outcomes.skills.map((skill, index) => (
                      <li key={index} style={{ marginBottom: '8px' }}>{skill}</li>
                    ))}
                  </ul>
                  
                  <Alert
                    message="答辩要求"
                    description={topicData.outcomes.presentation}
                    type="success"
                    showIcon
                    style={{ marginTop: '16px' }}
                  />
                </div>
              </TabPane>

              <TabPane tab={<span><LinkOutlined />学习资源</span>} key="resources">
                <div>
                  <Title level={4}>参考文献</Title>
                  <List
                    dataSource={topicData.resources.literature}
                    renderItem={(item) => (
                      <List.Item
                        actions={[
                          <Button type="link" icon={<LinkOutlined />}>
                            查看
                          </Button>
                        ]}
                      >
                        <List.Item.Meta
                          title={item.title}
                          description={<Tag color="blue">{item.type}</Tag>}
                        />
                      </List.Item>
                    )}
                  />
                  
                  <Title level={4}>软件工具</Title>
                  <List
                    dataSource={topicData.resources.tools}
                    renderItem={(item) => (
                      <List.Item>
                        <List.Item.Meta
                          title={
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <span>{item.name}</span>
                              <Tag color={
                                item.level === '必需' ? 'red' :
                                item.level === '推荐' ? 'orange' : 'default'
                              }>
                                {item.level}
                              </Tag>
                            </div>
                          }
                          description={item.description}
                        />
                      </List.Item>
                    )}
                  />
                  
                  <Title level={4}>数据集</Title>
                  <List
                    dataSource={topicData.resources.datasets}
                    renderItem={(item) => (
                      <List.Item>
                        <List.Item.Meta
                          title={item.name}
                          description={
                            <div>
                              <div>{item.description}</div>
                              <Tag color={item.access === '已获取' ? 'green' : 'orange'} style={{ marginTop: '4px' }}>
                                {item.access}
                              </Tag>
                            </div>
                          }
                        />
                      </List.Item>
                    )}
                  />
                </div>
              </TabPane>
            </Tabs>
          </Card>
        </Col>

        {/* Sidebar */}
        <Col xs={24} lg={8}>
          {/* Application Actions */}
          <Card style={{ marginBottom: '24px' }}>
            <div style={{ textAlign: 'center' }}>
              <Button 
                type="primary" 
                size="large" 
                block
                style={{ marginBottom: '12px' }}
                onClick={onApply}
                disabled={topicData.basicInfo.applicants >= topicData.basicInfo.maxApplicants}
              >
                {topicData.basicInfo.applicants >= topicData.basicInfo.maxApplicants ? '申请已满' : '立即申请'}
              </Button>
              <Space style={{ width: '100%', justifyContent: 'center' }}>
                <Button 
                  icon={isBookmarked ? <HeartFilled /> : <HeartOutlined />}
                  onClick={handleBookmark}
                  style={{ color: isBookmarked ? '#ff4d4f' : undefined }}
                >
                  {isBookmarked ? '已收藏' : '收藏课题'}
                </Button>
                <Button icon={<ShareAltOutlined />}>
                  分享
                </Button>
                <Button icon={<MessageOutlined />}>
                  咨询导师
                </Button>
              </Space>
            </div>
          </Card>

          {/* Topic Stats */}
          <Card title="课题信息" style={{ marginBottom: '24px' }}>
            <Descriptions column={1} size="small">
              <Descriptions.Item label="研究方向">
                <Tag color="blue">{topicData.basicInfo.field}</Tag>
              </Descriptions.Item>
              <Descriptions.Item label="难度等级">
                <Tag color={getDifficultyColor(topicData.basicInfo.difficulty)}>
                  {getDifficultyText(topicData.basicInfo.difficulty)}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="项目周期">
                <span><ClockCircleOutlined style={{ marginRight: '4px' }} />{topicData.basicInfo.duration}</span>
              </Descriptions.Item>
              <Descriptions.Item label="招生人数">
                <span><TeamOutlined style={{ marginRight: '4px' }} />{topicData.basicInfo.maxApplicants}人</span>
              </Descriptions.Item>
              <Descriptions.Item label="申请截止">
                <span style={{ color: '#fa8c16' }}>{topicData.basicInfo.deadline}</span>
              </Descriptions.Item>
            </Descriptions>
          </Card>

          {/* Professor Info */}
          <Card title="导师信息" style={{ marginBottom: '24px' }}>
            <div style={{ textAlign: 'center', marginBottom: '16px' }}>
              <Avatar size={64} style={{ backgroundColor: '#1890ff' }} icon={<UserOutlined />} />
              <div style={{ marginTop: '8px' }}>
                <div style={{ fontSize: '16px', fontWeight: 'bold' }}>{topicData.professor.name}</div>
                <div style={{ color: '#8c8c8c', fontSize: '12px' }}>{topicData.professor.department}</div>
                <Rate disabled defaultValue={topicData.professor.rating} style={{ fontSize: '12px', marginTop: '4px' }} />
              </div>
            </div>
            
            <div style={{ marginBottom: '12px' }}>
              <Text strong>研究方向:</Text>
              <div style={{ marginTop: '4px' }}>
                {topicData.professor.researchAreas.map(area => (
                  <Tag key={area} style={{ marginBottom: '4px' }}>{area}</Tag>
                ))}
              </div>
            </div>
            
            <Button type="link" block>查看导师详细信息</Button>
          </Card>

          {/* Student Reviews */}
          <Card title="学生评价" style={{ marginBottom: '24px' }}>
            {topicData.studentReviews.map(review => (
              <div key={review.id} style={{ marginBottom: '16px', paddingBottom: '16px', borderBottom: '1px solid #f0f0f0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <Text strong>{review.student} · {review.year}</Text>
                  <Rate disabled defaultValue={review.rating} style={{ fontSize: '12px' }} />
                </div>
                <Paragraph style={{ fontSize: '12px', marginBottom: '8px' }}>
                  {review.comment}
                </Paragraph>
                <div>
                  <Text type="secondary" style={{ fontSize: '11px' }}>主要收获: </Text>
                  {review.skills.map((skill, index) => (
                    <Tag key={index} style={{ fontSize: '10px' }}>
                      {skill}
                    </Tag>
                  ))}
                </div>
              </div>
            ))}
          </Card>
        </Col>
      </Row>

      {/* Back Button */}
      <div style={{ marginTop: '24px', textAlign: 'center' }}>
        <Button onClick={onBack}>返回课题列表</Button>
      </div>
    </div>
  );
};

export default TopicDetails;