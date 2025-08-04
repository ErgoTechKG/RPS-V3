import React, { useState } from 'react';
import { Layout, Card, Typography, Button, Space, Row, Col, Progress, Tag, Statistic, Table, List, Modal, Form, Input, Rate, Alert, Tabs, Timeline, Divider, Select, Upload } from 'antd';
import { useNavigate } from 'react-router-dom';
import './EvaluationResults.css';
import {
  ArrowLeftOutlined,
  TrophyOutlined,
  BarChartOutlined,
  FileTextOutlined,
  EyeOutlined,
  ExclamationCircleOutlined,
  StarOutlined,
  TeamOutlined,
  UserOutlined,
  BookOutlined,
  DownloadOutlined,
  PrinterOutlined,
  ShareAltOutlined,
  InfoCircleOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined
} from '@ant-design/icons';

const { Header, Content } = Layout;
const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;
const { TextArea } = Input;
const { Option } = Select;

const EvaluationResults: React.FC = () => {
  const navigate = useNavigate();
  const [appealModalVisible, setAppealModalVisible] = useState(false);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [appealForm] = Form.useForm();

  // Mock data for evaluation results
  const evaluationResults = {
    overallScore: 92.5,
    overallGrade: 'A',
    rank: 5,
    totalStudents: 120,
    evaluationPeriod: '2024春季学期',
    publishDate: '2024-05-30',
    status: 'published' // published, pending, reviewing, appealing
  };

  // Mock data for category scores
  const categoryScores = [
    {
      id: '1',
      category: '学术能力',
      score: 95.0,
      grade: 'A',
      weight: 40,
      weightedScore: 38.0,
      rank: 3,
      description: '学术研究能力突出，发表高质量论文',
      details: [
        { item: '学术论文', score: 95, maxScore: 100, description: 'SCI一区论文1篇，影响因子较高' },
        { item: '学术专利', score: 90, maxScore: 100, description: '发明专利1项，技术创新性强' },
        { item: '学术获奖', score: 100, maxScore: 100, description: '获得校级优秀论文奖' }
      ]
    },
    {
      id: '2',
      category: '创新能力',
      score: 88.5,
      grade: 'B+',
      weight: 25,
      weightedScore: 22.1,
      rank: 8,
      description: '创新思维活跃，有一定的创新成果',
      details: [
        { item: '创新项目', score: 85, maxScore: 100, description: '参与创新创业项目，担任技术负责人' },
        { item: '技术创新', score: 90, maxScore: 100, description: '提出新的算法改进方案' },
        { item: '创新竞赛', score: 90, maxScore: 100, description: '获得数学建模竞赛国家一等奖' }
      ]
    },
    {
      id: '3',
      category: '社会实践',
      score: 92.0,
      grade: 'A-',
      weight: 20,
      weightedScore: 18.4,
      rank: 4,
      description: '积极参与社会实践，社会责任感强',
      details: [
        { item: '志愿服务', score: 95, maxScore: 100, description: '累计志愿服务时长80小时' },
        { item: '社会调研', score: 88, maxScore: 100, description: '参与社会调研项目，提交高质量报告' },
        { item: '实习实践', score: 93, maxScore: 100, description: '企业实习表现优秀，获得好评' }
      ]
    },
    {
      id: '4',
      category: '综合素养',
      score: 90.0,
      grade: 'A-',
      weight: 15,
      weightedScore: 13.5,
      rank: 6,
      description: '综合素质全面，团队协作能力强',
      details: [
        { item: '团队合作', score: 92, maxScore: 100, description: '在团队项目中表现出色' },
        { item: '沟通交流', score: 88, maxScore: 100, description: '学术交流和演讲能力良好' },
        { item: '领导能力', score: 90, maxScore: 100, description: '担任学生组织干部，组织能力强' }
      ]
    }
  ];

  // Mock data for ranking information
  const rankingData = [
    { rank: 1, name: '王同学', score: 96.8, grade: 'A+', highlight: false },
    { rank: 2, name: '张同学', score: 95.2, grade: 'A+', highlight: false },
    { rank: 3, name: '刘同学', score: 94.1, grade: 'A', highlight: false },
    { rank: 4, name: '陈同学', score: 93.7, grade: 'A', highlight: false },
    { rank: 5, name: '李同学', score: 92.5, grade: 'A', highlight: true }, // 本人
    { rank: 6, name: '赵同学', score: 91.8, grade: 'A-', highlight: false },
    { rank: 7, name: '孙同学', score: 90.9, grade: 'A-', highlight: false }
  ];

  // Mock data for evaluation timeline
  const evaluationTimeline = [
    {
      date: '2024-03-01',
      title: '评价启动',
      description: '2024春季综合素质评价开始',
      status: 'completed'
    },
    {
      date: '2024-04-30',
      title: '材料提交截止',
      description: '所有学生完成材料提交',
      status: 'completed'
    },
    {
      date: '2024-05-15',
      title: '审核完成',
      description: '导师和评审委员会完成审核',
      status: 'completed'
    },
    {
      date: '2024-05-30',
      title: '结果公布',
      description: '综合素质评价结果正式发布',
      status: 'current'
    },
    {
      date: '2024-06-05',
      title: '申诉期开始',
      description: '学生可提交申诉申请',
      status: 'pending'
    },
    {
      date: '2024-06-15',
      title: '申诉期结束',
      description: '申诉处理完成，结果最终确定',
      status: 'pending'
    }
  ];

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'A+':
      case 'A':
        return '#52c41a';
      case 'A-':
      case 'B+':
        return '#1890ff';
      case 'B':
        return '#fa8c16';
      case 'B-':
      case 'C':
        return '#f5222d';
      default:
        return '#8c8c8c';
    }
  };

  const handleAppealSubmit = async (values: any) => {
    console.log('Appeal submitted:', values);
    setAppealModalVisible(false);
    Modal.success({
      title: '申诉提交成功',
      content: '您的申诉申请已提交，申诉编号为 #AP20240001。评审委员会将在5个工作日内处理您的申诉。'
    });
  };

  const handleShowDetails = (category: string) => {
    setSelectedCategory(category);
    setDetailModalVisible(true);
  };

  const columns = [
    {
      title: '排名',
      dataIndex: 'rank',
      key: 'rank',
      width: 60,
      render: (rank: number, record: any) => (
        <div style={{ 
          fontWeight: record.highlight ? 'bold' : 'normal',
          color: record.highlight ? '#1890ff' : undefined
        }}>
          {rank}
        </div>
      )
    },
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      render: (name: string, record: any) => (
        <Text strong={record.highlight} style={{ color: record.highlight ? '#1890ff' : undefined }}>
          {name}
        </Text>
      )
    },
    {
      title: '总分',
      dataIndex: 'score',
      key: 'score',
      render: (score: number, record: any) => (
        <Text strong={record.highlight} style={{ color: record.highlight ? '#1890ff' : undefined }}>
          {score}
        </Text>
      )
    },
    {
      title: '等级',
      dataIndex: 'grade',
      key: 'grade',
      render: (grade: string, record: any) => (
        <Tag color={getGradeColor(grade)}>
          {grade}
        </Tag>
      )
    }
  ];

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
            <BarChartOutlined style={{ fontSize: '24px', color: '#1890ff', marginRight: '12px' }} />
            <Title level={3} style={{ margin: 0, color: '#262626' }}>
              结果查询
            </Title>
          </div>
          <Space>
            <Button icon={<DownloadOutlined />}>导出报告</Button>
            <Button icon={<PrinterOutlined />}>打印结果</Button>
            <Button type="primary" icon={<ShareAltOutlined />}>分享结果</Button>
          </Space>
        </div>
      </Header>

      <Content style={{ padding: '24px', background: '#f5f5f5' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {/* 总体结果展示 */}
          <Card 
            style={{ 
              marginBottom: '24px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              border: 'none'
            }}
            bodyStyle={{ padding: '32px' }}
          >
            <Row align="middle">
              <Col xs={24} md={16}>
                <div style={{ color: 'white' }}>
                  <Title level={2} style={{ color: 'white', marginBottom: '8px' }}>
                    {evaluationResults.evaluationPeriod} 综合素质评价结果
                  </Title>
                  <div style={{ fontSize: '18px', marginBottom: '16px' }}>
                    <Text style={{ color: 'rgba(255,255,255,0.9)' }}>
                      发布时间: {evaluationResults.publishDate}
                    </Text>
                  </div>
                  <Space size="large">
                    <div>
                      <div style={{ fontSize: '32px', fontWeight: 'bold' }}>
                        {evaluationResults.overallScore}
                      </div>
                      <div style={{ fontSize: '14px', opacity: 0.8 }}>综合得分</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '32px', fontWeight: 'bold' }}>
                        {evaluationResults.overallGrade}
                      </div>
                      <div style={{ fontSize: '14px', opacity: 0.8 }}>综合等级</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '32px', fontWeight: 'bold' }}>
                        {evaluationResults.rank}
                      </div>
                      <div style={{ fontSize: '14px', opacity: 0.8 }}>年级排名</div>
                    </div>
                  </Space>
                </div>
              </Col>
              <Col xs={24} md={8} style={{ textAlign: 'center' }}>
                <div style={{ color: 'white', marginTop: '16px' }}>
                  <TrophyOutlined style={{ fontSize: '80px', marginBottom: '16px' }} />
                  <div style={{ fontSize: '16px' }}>
                    排名前 {Math.round(evaluationResults.rank / evaluationResults.totalStudents * 100)}%
                  </div>
                  <div style={{ fontSize: '14px', opacity: 0.8 }}>
                    共 {evaluationResults.totalStudents} 名学生
                  </div>
                </div>
              </Col>
            </Row>
          </Card>

          {/* 标签页内容 */}
          <Tabs defaultActiveKey="scores" size="large">
            <TabPane tab={
              <span>
                <BarChartOutlined />
                分项得分
              </span>
            } key="scores">
              <Row gutter={[24, 24]}>
                {/* 分项得分卡片 */}
                {categoryScores.map(category => (
                  <Col xs={24} lg={12} key={category.id}>
                    <Card 
                      title={
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span>{category.category}</span>
                          <Tag color={getGradeColor(category.grade)}>
                            {category.grade}
                          </Tag>
                        </div>
                      }
                      extra={
                        <Button 
                          type="link" 
                          size="small" 
                          icon={<EyeOutlined />}
                          onClick={() => handleShowDetails(category.category)}
                        >
                          详情
                        </Button>
                      }
                    >
                      <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                        <Progress
                          type="circle"
                          percent={category.score}
                          format={() => <span style={{ fontSize: '18px', fontWeight: 'bold' }}>{category.score}</span>}
                          strokeColor={getGradeColor(category.grade)}
                          size={120}
                        />
                      </div>
                      
                      <Row gutter={[16, 8]}>
                        <Col xs={12}>
                          <Statistic 
                            title="权重占比" 
                            value={category.weight} 
                            suffix="%" 
                            valueStyle={{ fontSize: '16px' }}
                          />
                        </Col>
                        <Col xs={12}>
                          <Statistic 
                            title="加权得分" 
                            value={category.weightedScore} 
                            valueStyle={{ fontSize: '16px', color: getGradeColor(category.grade) }}
                          />
                        </Col>
                        <Col xs={12}>
                          <Statistic 
                            title="类别排名" 
                            value={category.rank} 
                            valueStyle={{ fontSize: '16px' }}
                          />
                        </Col>
                        <Col xs={12}>
                          <Statistic 
                            title="评价等级" 
                            value={category.grade} 
                            valueStyle={{ fontSize: '16px', color: getGradeColor(category.grade) }}
                          />
                        </Col>
                      </Row>
                      
                      <Divider style={{ margin: '12px 0' }} />
                      
                      <Paragraph style={{ fontSize: '13px', color: '#666', margin: 0 }}>
                        {category.description}
                      </Paragraph>
                    </Card>
                  </Col>
                ))}
              </Row>
            </TabPane>

            <TabPane tab={
              <span>
                <TrophyOutlined />
                排名信息
              </span>
            } key="ranking">
              <Row gutter={[24, 24]}>
                <Col xs={24} lg={16}>
                  <Card title="年级排名情况">
                    <Table
                      columns={columns}
                      dataSource={rankingData}
                      pagination={false}
                      size="middle"
                      rowKey="rank"
                      rowClassName={(record) => record.highlight ? 'highlight-row' : ''}
                    />
                    
                    <Alert
                      message="排名说明"
                      description="排名基于综合得分计算，相同分数按提交时间先后排序。本次评价共有120名学生参与。"
                      type="info"
                      showIcon
                      style={{ marginTop: '16px' }}
                    />
                  </Card>
                </Col>
                
                <Col xs={24} lg={8}>
                  <Card title="排名分析">
                    <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                      <div style={{ fontSize: '48px', fontWeight: 'bold', color: '#1890ff', marginBottom: '8px' }}>
                        TOP 5
                      </div>
                      <div style={{ fontSize: '16px', color: '#666' }}>
                        年级排名
                      </div>
                    </div>
                    
                    <List size="small">
                      <List.Item>
                        <Text strong>总分:</Text>
                        <Text style={{ float: 'right' }}>{evaluationResults.overallScore}</Text>
                      </List.Item>
                      <List.Item>
                        <Text strong>排名:</Text>
                        <Text style={{ float: 'right' }}>{evaluationResults.rank}/{evaluationResults.totalStudents}</Text>
                      </List.Item>
                      <List.Item>
                        <Text strong>百分位:</Text>
                        <Text style={{ float: 'right' }}>前{Math.round(evaluationResults.rank / evaluationResults.totalStudents * 100)}%</Text>
                      </List.Item>
                      <List.Item>
                        <Text strong>等级:</Text>
                        <Tag color={getGradeColor(evaluationResults.overallGrade)} style={{ float: 'right' }}>
                          {evaluationResults.overallGrade}
                        </Tag>
                      </List.Item>
                    </List>
                    
                    <Divider />
                    
                    <Paragraph style={{ fontSize: '13px', color: '#666' }}>
                      您的综合素质评价成绩优秀，在年级中表现突出。建议继续保持学术研究的积极性，同时加强创新能力的培养。
                    </Paragraph>
                  </Card>
                </Col>
              </Row>
            </TabPane>

            <TabPane tab={
              <span>
                <FileTextOutlined />
                评价详情
              </span>
            } key="details">
              <Row gutter={[24, 24]}>
                <Col xs={24} lg={16}>
                  <Card title="评价过程时间线">
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
                            <CheckCircleOutlined style={{ fontSize: '16px' }} /> : 
                            item.status === 'pending' ?
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
                </Col>
                
                <Col xs={24} lg={8}>
                  <Card title="申诉通道">
                    <Alert
                      message="申诉期开放"
                      description="如对评价结果有异议，可在6月5日-15日期间提交申诉申请。"
                      type="info"
                      showIcon
                      style={{ marginBottom: '16px' }}
                    />
                    
                    <Button 
                      type="primary" 
                      block 
                      icon={<ExclamationCircleOutlined />}
                      onClick={() => setAppealModalVisible(true)}
                    >
                      提交申诉
                    </Button>
                    
                    <Divider />
                    
                    <div style={{ fontSize: '13px', color: '#666' }}>
                      <div style={{ marginBottom: '8px' }}>
                        <Text strong>申诉条件:</Text>
                      </div>
                      <ul style={{ paddingLeft: '16px', margin: 0 }}>
                        <li>评价程序不规范</li>
                        <li>评价标准不公平</li>
                        <li>材料审核有误</li>
                        <li>其他合理异议</li>
                      </ul>
                    </div>
                  </Card>
                </Col>
              </Row>
            </TabPane>
          </Tabs>

          {/* 申诉对话框 */}
          <Modal
            title="提交申诉申请"
            visible={appealModalVisible}
            onCancel={() => setAppealModalVisible(false)}
            footer={null}
            width={600}
          >
            <Form form={appealForm} layout="vertical" onFinish={handleAppealSubmit}>
              <Alert
                message="申诉须知"
                description="请详细说明申诉理由，并提供相关证据材料。申诉期间原评价结果保持有效。"
                type="warning"
                showIcon
                style={{ marginBottom: '24px' }}
              />
              
              <Form.Item
                label="申诉类别"
                name="category"
                rules={[{ required: true, message: '请选择申诉类别' }]}
              >
                <Select placeholder="请选择申诉类别">
                  <Option value="procedure">评价程序问题</Option>
                  <Option value="standard">评价标准问题</Option>
                  <Option value="material">材料审核问题</Option>
                  <Option value="score">分数计算问题</Option>
                  <Option value="other">其他问题</Option>
                </Select>
              </Form.Item>
              
              <Form.Item
                label="申诉理由"
                name="reason"
                rules={[{ required: true, message: '请详细说明申诉理由' }]}
              >
                <TextArea 
                  rows={6} 
                  placeholder="请详细描述您认为不合理的地方，并说明具体原因..."
                  showCount
                  maxLength={1000}
                />
              </Form.Item>
              
              <Form.Item label="证据材料">
                <Upload.Dragger
                  name="evidence"
                  multiple={true}
                  accept=".pdf,.doc,.docx,.jpg,.png"
                >
                  <p className="ant-upload-drag-icon">
                    <FileTextOutlined />
                  </p>
                  <p className="ant-upload-text">上传相关证据材料</p>
                  <p className="ant-upload-hint">
                    支持PDF、Word、图片格式
                  </p>
                </Upload.Dragger>
              </Form.Item>
              
              <Form.Item>
                <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
                  <Button onClick={() => setAppealModalVisible(false)}>
                    取消
                  </Button>
                  <Button type="primary" htmlType="submit">
                    提交申诉
                  </Button>
                </Space>
              </Form.Item>
            </Form>
          </Modal>

          {/* 详情对话框 */}
          <Modal
            title={`${selectedCategory} - 详细评分`}
            visible={detailModalVisible}
            onCancel={() => setDetailModalVisible(false)}
            footer={[
              <Button key="close" onClick={() => setDetailModalVisible(false)}>
                关闭
              </Button>
            ]}
            width={700}
          >
            {selectedCategory && (
              <div>
                {categoryScores
                  .filter(cat => cat.category === selectedCategory)[0]
                  ?.details.map((detail, index) => (
                    <Card key={index} size="small" style={{ marginBottom: '12px' }}>
                      <Row gutter={16} align="middle">
                        <Col xs={24} sm={8}>
                          <Text strong>{detail.item}</Text>
                        </Col>
                        <Col xs={24} sm={8}>
                          <Progress 
                            percent={(detail.score / detail.maxScore) * 100} 
                            format={() => `${detail.score}/${detail.maxScore}`}
                            size="small"
                          />
                        </Col>
                        <Col xs={24} sm={8}>
                          <Rate disabled value={detail.score / 20} allowHalf />
                        </Col>
                        <Col xs={24} style={{ marginTop: '8px' }}>
                          <Text type="secondary" style={{ fontSize: '12px' }}>
                            {detail.description}
                          </Text>
                        </Col>
                      </Row>
                    </Card>
                  ))}
              </div>
            )}
          </Modal>
        </div>
      </Content>
    </Layout>
  );
};

export default EvaluationResults;