import React, { useState } from 'react';
import { Card, Row, Col, Progress, Typography, Tag, Table, Divider, Radar, Statistic, Timeline, Button, Alert, Space } from 'antd';
import {
  TrophyOutlined,
  BarChartOutlined,
  UserOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  StarOutlined,
  RiseOutlined,
  FileTextOutlined,
  ExperimentOutlined,
  ProjectOutlined
} from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;

interface GradesQueryProps {}

const GradesQuery: React.FC<GradesQueryProps> = () => {
  const [selectedSemester, setSelectedSemester] = useState('2024春');

  // Mock grades data
  const gradesData = {
    overall: {
      totalScore: 88.5,
      grade: 'A',
      rank: 12,
      totalStudents: 120,
      gpa: 3.85
    },
    breakdown: {
      process: {
        score: 85,
        weight: 40,
        details: [
          { item: '考勤出席', score: 95, weight: 10, maxScore: 100 },
          { item: '作业完成', score: 88, weight: 15, maxScore: 100 },
          { item: '课堂表现', score: 78, weight: 15, maxScore: 100 }
        ]
      },
      achievement: {
        score: 91,
        weight: 60,
        details: [
          { item: '海报设计', score: 92, weight: 20, maxScore: 100 },
          { item: '研究报告', score: 89, weight: 25, maxScore: 100 },
          { item: '答辩表现', score: 93, weight: 15, maxScore: 100 }
        ]
      }
    },
    comparison: {
      personal: [88.5, 85.2, 91.8, 87.3, 88.5],
      classAverage: [82.1, 79.8, 85.6, 83.2, 82.4],
      labels: ['第1次', '第2次', '第3次', '第4次', '总成绩']
    },
    radarData: [
      { subject: '理论知识', personal: 85, average: 78, fullMark: 100 },
      { subject: '实践能力', personal: 92, average: 82, fullMark: 100 },
      { subject: '创新思维', personal: 88, average: 81, fullMark: 100 },
      { subject: '团队合作', personal: 90, average: 84, fullMark: 100 },
      { subject: '表达能力', personal: 87, average: 79, fullMark: 100 },
      { subject: '学习态度', personal: 95, average: 86, fullMark: 100 }
    ],
    timeline: [
      {
        time: '2024-05-20',
        title: '最终成绩公布',
        description: '总成绩 88.5分，等级A，排名 12/120',
        type: 'success',
        icon: <TrophyOutlined />
      },
      {
        time: '2024-05-15',
        title: '答辩完成',
        description: '答辩表现 93分，获得导师高度评价',
        type: 'success',
        icon: <ProjectOutlined />
      },
      {
        time: '2024-05-10',
        title: '研究报告提交',
        description: '研究报告 89分，内容完整，逻辑清晰',
        type: 'success',
        icon: <FileTextOutlined />
      },
      {
        time: '2024-04-25',
        title: '海报展示',
        description: '海报设计 92分，设计美观，内容丰富',
        type: 'success',
        icon: <ExperimentOutlined />
      },
      {
        time: '2024-03-15',
        title: '课程开始',
        description: '开始实验室轮转课程学习',
        type: 'info',
        icon: <ClockCircleOutlined />
      }
    ]
  };

  const professorsComments = [
    {
      professor: '张教授',
      course: '基于深度学习的图像识别',
      comment: '该学生在项目中表现优秀，具有扎实的理论基础和较强的实践能力。能够独立思考问题，积极参与讨论。建议继续深入研究相关领域。',
      rating: 5,
      date: '2024-05-20'
    }
  ];

  // Grade breakdown table data
  const gradeBreakdownColumns = [
    {
      title: '评价项目',
      dataIndex: 'item',
      key: 'item',
      render: (text: string, record: any) => (
        <div>
          <Text strong>{text}</Text>
          <div style={{ fontSize: '12px', color: '#8c8c8c' }}>
            权重: {record.weight}%
          </div>
        </div>
      )
    },
    {
      title: '得分',
      dataIndex: 'score',
      key: 'score',
      render: (score: number, record: any) => (
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#1890ff' }}>
            {score}
          </div>
          <div style={{ fontSize: '12px', color: '#8c8c8c' }}>
            / {record.maxScore}
          </div>
        </div>
      )
    },
    {
      title: '加权得分',
      key: 'weighted',
      render: (record: any) => (
        <div style={{ textAlign: 'center' }}>
          <Text strong style={{ fontSize: '16px', color: '#52c41a' }}>
            {(record.score * record.weight / 100).toFixed(1)}
          </Text>
        </div>
      )
    },
    {
      title: '表现',
      key: 'performance',
      render: (record: any) => {
        let color = '';
        let text = '';
        if (record.score >= 90) {
          color = '#52c41a';
          text = '优秀';
        } else if (record.score >= 80) {
          color = '#1890ff';
          text = '良好';
        } else if (record.score >= 70) {
          color = '#fa8c16';
          text = '中等';
        } else {
          color = '#ff4d4f';
          text = '需改进';
        }
        return <Tag color={color}>{text}</Tag>;
      }
    }
  ];

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'A': return '#52c41a';
      case 'B': return '#1890ff';
      case 'C': return '#fa8c16';
      case 'D': return '#ff4d4f';
      default: return '#d9d9d9';
    }
  };

  return (
    <div>
      {/* Overall Grade Card */}
      <Card style={{ marginBottom: '24px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', border: 'none' }}>
        <Row gutter={[24, 24]} align="middle">
          <Col xs={24} md={8}>
            <div style={{ textAlign: 'center', color: 'white' }}>
              <div style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '8px' }}>
                {gradesData.overall.totalScore}
              </div>
              <div style={{ fontSize: '20px', marginBottom: '4px' }}>
                等级: {gradesData.overall.grade}
              </div>
              <div style={{ fontSize: '14px', opacity: 0.9 }}>
                实验室轮转课程 - {selectedSemester}
              </div>
            </div>
          </Col>
          <Col xs={24} md={8}>
            <div style={{ color: 'white' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                <span>班级排名</span>
                <span style={{ fontWeight: 'bold' }}>
                  {gradesData.overall.rank} / {gradesData.overall.totalStudents}
                </span>
              </div>
              <Progress 
                percent={(1 - gradesData.overall.rank / gradesData.overall.totalStudents) * 100}
                strokeColor="#fff"
                trailColor="rgba(255,255,255,0.3)"
                showInfo={false}
                style={{ marginBottom: '16px' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>当前GPA</span>
                <span style={{ fontWeight: 'bold' }}>{gradesData.overall.gpa}</span>
              </div>
            </div>
          </Col>
          <Col xs={24} md={8}>
            <div style={{ color: 'white', textAlign: 'center' }}>
              <TrophyOutlined style={{ fontSize: '48px', marginBottom: '12px' }} />
              <div style={{ fontSize: '16px', fontWeight: 'bold' }}>成绩优秀</div>
              <div style={{ fontSize: '14px', opacity: 0.9 }}>
                超过{Math.round((1 - gradesData.overall.rank / gradesData.overall.totalStudents) * 100)}%同学
              </div>
            </div>
          </Col>
        </Row>
      </Card>

      <Row gutter={[24, 24]}>
        {/* Grade Breakdown */}
        <Col xs={24} lg={16}>
          <Card title="成绩详细分解" style={{ marginBottom: '24px' }}>
            <Row gutter={[24, 24]}>
              <Col xs={24} md={12}>
                <Card size="small" title={`过程考核 (${gradesData.breakdown.process.weight}%)`}>
                  <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                    <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#1890ff' }}>
                      {gradesData.breakdown.process.score}分
                    </div>
                    <Progress 
                      percent={gradesData.breakdown.process.score}
                      strokeColor="#1890ff"
                      size="small"
                    />
                  </div>
                  <Table
                    columns={gradeBreakdownColumns}
                    dataSource={gradesData.breakdown.process.details}
                    pagination={false}
                    size="small"
                    rowKey="item"
                  />
                </Card>
              </Col>
              <Col xs={24} md={12}>
                <Card size="small" title={`成果考核 (${gradesData.breakdown.achievement.weight}%)`}>
                  <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                    <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#52c41a' }}>
                      {gradesData.breakdown.achievement.score}分
                    </div>
                    <Progress 
                      percent={gradesData.breakdown.achievement.score}
                      strokeColor="#52c41a"
                      size="small"
                    />
                  </div>
                  <Table
                    columns={gradeBreakdownColumns}
                    dataSource={gradesData.breakdown.achievement.details}
                    pagination={false}
                    size="small"
                    rowKey="item"
                  />
                </Card>
              </Col>
            </Row>
          </Card>

          {/* Performance Analysis */}
          <Card title="能力雷达图">
            <div style={{ textAlign: 'center', height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div>
                <Text type="secondary">雷达图组件需要第三方图表库支持</Text>
                <div style={{ marginTop: '16px' }}>
                  <Row gutter={[16, 16]}>
                    {gradesData.radarData.map(item => (
                      <Col xs={12} md={8} key={item.subject}>
                        <div style={{ textAlign: 'center', padding: '8px' }}>
                          <div style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '4px' }}>
                            {item.subject}
                          </div>
                          <div style={{ fontSize: '18px', color: '#1890ff', fontWeight: 'bold' }}>
                            {item.personal}
                          </div>
                          <div style={{ fontSize: '12px', color: '#8c8c8c' }}>
                            平均: {item.average}
                          </div>
                        </div>
                      </Col>
                    ))}
                  </Row>
                </div>
              </div>
            </div>
          </Card>
        </Col>

        {/* Side Panel */}
        <Col xs={24} lg={8}>
          {/* Statistics */}
          <Card style={{ marginBottom: '24px' }}>
            <Row gutter={[16, 16]}>
              <Col xs={12}>
                <Statistic
                  title="最高分"
                  value={93}
                  precision={0}
                  valueStyle={{ color: '#3f8600', fontSize: '20px' }}
                  prefix={<RiseOutlined />}
                />
              </Col>
              <Col xs={12}>
                <Statistic
                  title="平均分"
                  value={88.5}
                  precision={1}
                  valueStyle={{ color: '#1890ff', fontSize: '20px' }}
                  prefix={<BarChartOutlined />}
                />
              </Col>
              <Col xs={12}>
                <Statistic
                  title="完成率"
                  value={100}
                  precision={0}
                  valueStyle={{ color: '#52c41a', fontSize: '20px' }}
                  suffix="%"
                  prefix={<CheckCircleOutlined />}
                />
              </Col>
              <Col xs={12}>
                <Statistic
                  title="班级排名"
                  value={12}
                  precision={0}
                  valueStyle={{ color: '#722ed1', fontSize: '20px' }}
                  suffix={`/${gradesData.overall.totalStudents}`}
                  prefix={<StarOutlined />}
                />
              </Col>
            </Row>
          </Card>

          {/* Professor Comments */}
          <Card title="导师评价" style={{ marginBottom: '24px' }}>
            {professorsComments.map((comment, index) => (
              <div key={index} style={{ marginBottom: index < professorsComments.length - 1 ? '16px' : 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <Text strong>{comment.professor}</Text>
                  <div>
                    {[...Array(5)].map((_, i) => (
                      <StarOutlined 
                        key={i} 
                        style={{ 
                          color: i < comment.rating ? '#faad14' : '#d9d9d9',
                          fontSize: '12px'
                        }} 
                      />
                    ))}
                  </div>
                </div>
                <div style={{ fontSize: '12px', color: '#8c8c8c', marginBottom: '8px' }}>
                  {comment.course} · {comment.date}
                </div>
                <Paragraph style={{ fontSize: '14px', marginBottom: 0 }}>
                  {comment.comment}
                </Paragraph>
              </div>
            ))}
          </Card>

          {/* Grade Timeline */}
          <Card title="成绩历程">
            <Timeline size="small">
              {gradesData.timeline.map((item, index) => (
                <Timeline.Item
                  key={index}
                  dot={item.icon}
                  color={item.type === 'success' ? 'green' : item.type === 'info' ? 'blue' : 'gray'}
                >
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '4px' }}>
                      {item.title}
                    </div>
                    <div style={{ fontSize: '12px', color: '#8c8c8c', marginBottom: '4px' }}>
                      {item.time}
                    </div>
                    <div style={{ fontSize: '13px' }}>
                      {item.description}
                    </div>
                  </div>
                </Timeline.Item>
              ))}
            </Timeline>
          </Card>
        </Col>
      </Row>

      {/* Improvement Suggestions */}
      <Card title="提升建议">
        <Alert
          message="学习建议"
          description="您在理论知识和实践能力方面表现优秀，建议继续加强创新思维的培养，多参与前沿技术的探索和应用。"
          type="success"
          showIcon
          style={{ marginBottom: '16px' }}
        />
        
        <Row gutter={[16, 16]}>
          <Col xs={24} md={8}>
            <Card size="small" title="优势项目" headStyle={{ backgroundColor: '#f6ffed' }}>
              <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '14px' }}>
                <li>学习态度积极 (95分)</li>
                <li>答辩表现出色 (93分)</li>
                <li>实践能力强 (92分)</li>
              </ul>
            </Card>
          </Col>
          <Col xs={24} md={8}>
            <Card size="small" title="改进空间" headStyle={{ backgroundColor: '#fff7e6' }}>
              <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '14px' }}>
                <li>课堂表现可以更活跃</li>
                <li>理论知识需要继续巩固</li>
                <li>团队协作技能有待提升</li>
              </ul>
            </Card>
          </Col>
          <Col xs={24} md={8}>
            <Card size="small" title="发展方向" headStyle={{ backgroundColor: '#f0f5ff' }}>
              <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '14px' }}>
                <li>深入学习深度学习理论</li>
                <li>参与更多实践项目</li>
                <li>考虑继续深造研究生</li>
              </ul>
            </Card>
          </Col>
        </Row>
      </Card>

      {/* Action Buttons */}
      <div style={{ textAlign: 'center', marginTop: '24px' }}>
        <Space>
          <Button icon={<FileTextOutlined />}>
            导出成绩单
          </Button>
          <Button icon={<UserOutlined />}>
            联系导师
          </Button>
          <Button type="primary" icon={<TrophyOutlined />}>
            申请荣誉证书
          </Button>
        </Space>
      </div>
    </div>
  );
};

export default GradesQuery;