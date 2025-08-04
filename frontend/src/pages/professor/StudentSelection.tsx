import React, { useState } from 'react';
import { 
  Card, 
  Row, 
  Col, 
  Select, 
  Button, 
  Tag, 
  Space, 
  Avatar, 
  Progress,
  Checkbox,
  message,
  Modal,
  Descriptions,
  Timeline,
  Badge
} from 'antd';
import { 
  UserOutlined, 
  ClockCircleOutlined, 
  CheckCircleOutlined,
  CloseCircleOutlined,
  VideoCameraOutlined,
  FileTextOutlined,
  TrophyOutlined,
  RobotOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import MainLayout from '@/components/MainLayout';
import styles from './LabRotation.module.css';

interface Applicant {
  id: string;
  name: string;
  major: string;
  year: string;
  gpa: number;
  matchScore: number;
  applyTime: string;
  status: 'pending' | 'interview' | 'accepted' | 'rejected';
  skills: string[];
  projects: string[];
  awards: string[];
  statement: string;
}

const StudentSelection: React.FC = () => {
  const navigate = useNavigate();
  const [selectedApplicants, setSelectedApplicants] = useState<string[]>([]);
  const [filterMajor, setFilterMajor] = useState<string>('all');
  const [filterYear, setFilterYear] = useState<string>('all');
  const [filterGPA, setFilterGPA] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('pending');
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [currentApplicant, setCurrentApplicant] = useState<Applicant | null>(null);

  // Mock applicants data
  const applicants: Applicant[] = [
    {
      id: '1',
      name: '李明',
      major: '机械工程',
      year: '大三',
      gpa: 3.85,
      matchScore: 95,
      applyTime: '3天前',
      status: 'pending',
      skills: ['Python', 'SolidWorks', '机器学习'],
      projects: ['智能机器人设计', '机械臂控制系统'],
      awards: ['全国大学生机器人大赛一等奖', '数学建模竞赛二等奖'],
      statement: '我对机器人控制系统研究充满热情，具有扎实的编程基础和机械设计能力...'
    },
    {
      id: '2',
      name: '王芳',
      major: '自动化',
      year: '大三',
      gpa: 3.72,
      matchScore: 88,
      applyTime: '5天前',
      status: 'pending',
      skills: ['C++', 'MATLAB', '控制理论'],
      projects: ['无人机飞控系统', 'PID控制器设计'],
      awards: ['电子设计竞赛省级一等奖'],
      statement: '我希望能够深入学习机器人控制理论，将理论知识应用于实践...'
    },
    {
      id: '3',
      name: '张强',
      major: '计算机科学',
      year: '大三',
      gpa: 3.90,
      matchScore: 86,
      applyTime: '1天前',
      status: 'pending',
      skills: ['Java', 'Python', '深度学习'],
      projects: ['图像识别系统', '自然语言处理'],
      awards: ['ACM程序设计竞赛银奖', '校级优秀学生'],
      statement: '我擅长算法设计和软件开发，希望将AI技术应用于机器人领域...'
    },
    {
      id: '4',
      name: '赵丽',
      major: '电子工程',
      year: '大三',
      gpa: 3.68,
      matchScore: 82,
      applyTime: '2天前',
      status: 'interview',
      skills: ['嵌入式开发', '电路设计', 'FPGA'],
      projects: ['智能家居控制系统', '信号处理器设计'],
      awards: ['电子设计大赛二等奖'],
      statement: '我对嵌入式系统开发有浓厚兴趣，希望参与机器人硬件设计...'
    }
  ];

  const filteredApplicants = applicants.filter(applicant => {
    if (filterMajor !== 'all' && !applicant.major.includes(filterMajor)) return false;
    if (filterYear !== 'all' && applicant.year !== filterYear) return false;
    if (filterGPA !== 'all') {
      const gpaThreshold = parseFloat(filterGPA);
      if (applicant.gpa < gpaThreshold) return false;
    }
    if (filterStatus !== 'all' && applicant.status !== filterStatus) return false;
    return true;
  });

  const handleSelectApplicant = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedApplicants([...selectedApplicants, id]);
    } else {
      setSelectedApplicants(selectedApplicants.filter(aid => aid !== id));
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedApplicants(filteredApplicants.map(a => a.id));
    } else {
      setSelectedApplicants([]);
    }
  };

  const handleBatchAccept = () => {
    if (selectedApplicants.length === 0) {
      message.warning('请先选择学生');
      return;
    }
    Modal.confirm({
      title: '批量通过确认',
      content: `确定要通过 ${selectedApplicants.length} 名学生的申请吗？`,
      onOk: () => {
        message.success(`已通过 ${selectedApplicants.length} 名学生的申请`);
        setSelectedApplicants([]);
      }
    });
  };

  const handleBatchReject = () => {
    if (selectedApplicants.length === 0) {
      message.warning('请先选择学生');
      return;
    }
    Modal.confirm({
      title: '批量拒绝确认',
      content: `确定要拒绝 ${selectedApplicants.length} 名学生的申请吗？`,
      onOk: () => {
        message.success(`已拒绝 ${selectedApplicants.length} 名学生的申请`);
        setSelectedApplicants([]);
      }
    });
  };

  const showApplicantDetail = (applicant: Applicant) => {
    setCurrentApplicant(applicant);
    setDetailModalVisible(true);
  };

  const getMatchScoreColor = (score: number) => {
    if (score >= 90) return '#52c41a';
    if (score >= 80) return '#1890ff';
    if (score >= 70) return '#faad14';
    return '#ff4d4f';
  };

  const renderApplicantCard = (applicant: Applicant) => {
    const isSelected = selectedApplicants.includes(applicant.id);
    
    return (
      <Col xs={24} sm={12} lg={8} key={applicant.id}>
        <Card 
          className={styles.applicantCard}
          style={{ borderColor: isSelected ? '#1890ff' : undefined }}
        >
          <div className={styles.applicantHeader}>
            <Checkbox
              checked={isSelected}
              onChange={e => handleSelectApplicant(applicant.id, e.target.checked)}
            />
            <Avatar size={64} icon={<UserOutlined />} className={styles.applicantAvatar} />
            <h3 className={styles.applicantName}>{applicant.name}</h3>
            <p className={styles.applicantInfo}>{applicant.major} {applicant.year}</p>
            <p className={styles.applicantInfo}>GPA: {applicant.gpa}</p>
          </div>

          <div className={styles.matchScore}>
            <p className={styles.matchLabel}>AI匹配度</p>
            <Progress 
              percent={applicant.matchScore} 
              strokeColor={getMatchScoreColor(applicant.matchScore)}
              format={percent => (
                <span style={{ color: getMatchScoreColor(applicant.matchScore) }}>
                  {percent}%
                </span>
              )}
            />
          </div>

          <div className={styles.applicationTime}>
            <ClockCircleOutlined /> 申请时间: {applicant.applyTime}
          </div>

          <div className={styles.cardActions}>
            <Button size="small" onClick={() => showApplicantDetail(applicant)}>
              查看详情
            </Button>
            <div className={styles.actionGroup}>
              <Button 
                size="small" 
                icon={<VideoCameraOutlined />}
                onClick={() => navigate(`/professor/lab-rotation/interview/${applicant.id}`)}
              >
                面试
              </Button>
              <Button 
                size="small" 
                type="primary" 
                icon={<CheckCircleOutlined />}
                onClick={() => {
                  message.success(`已通过 ${applicant.name} 的申请`);
                }}
              >
                通过
              </Button>
              <Button 
                size="small" 
                danger 
                icon={<CloseCircleOutlined />}
                onClick={() => {
                  message.info(`已拒绝 ${applicant.name} 的申请`);
                }}
              >
                拒绝
              </Button>
            </div>
          </div>
        </Card>
      </Col>
    );
  };

  return (
    <MainLayout>
      <div className={styles.selectionContainer}>
        <div className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>学生选拔管理</h1>
        </div>

        {/* Filter Bar */}
        <Card className={styles.filterBar}>
          <Row gutter={[16, 16]} align="middle">
            <Col flex="auto">
              <Space size="middle">
                <span>筛选:</span>
                <Select
                  value={filterMajor}
                  onChange={setFilterMajor}
                  style={{ width: 120 }}
                  options={[
                    { value: 'all', label: '全部专业' },
                    { value: '机械', label: '机械工程' },
                    { value: '自动化', label: '自动化' },
                    { value: '计算机', label: '计算机' },
                    { value: '电子', label: '电子工程' }
                  ]}
                />
                <Select
                  value={filterYear}
                  onChange={setFilterYear}
                  style={{ width: 100 }}
                  options={[
                    { value: 'all', label: '全部年级' },
                    { value: '大二', label: '大二' },
                    { value: '大三', label: '大三' },
                    { value: '大四', label: '大四' }
                  ]}
                />
                <Select
                  value={filterGPA}
                  onChange={setFilterGPA}
                  style={{ width: 100 }}
                  options={[
                    { value: 'all', label: '全部GPA' },
                    { value: '3.0', label: '3.0+' },
                    { value: '3.5', label: '3.5+' },
                    { value: '3.8', label: '3.8+' }
                  ]}
                />
                <Select
                  value={filterStatus}
                  onChange={setFilterStatus}
                  style={{ width: 100 }}
                  options={[
                    { value: 'all', label: '全部状态' },
                    { value: 'pending', label: '待审核' },
                    { value: 'interview', label: '面试中' },
                    { value: 'accepted', label: '已通过' },
                    { value: 'rejected', label: '已拒绝' }
                  ]}
                />
              </Space>
            </Col>
            <Col>
              <Space>
                <span>排序:</span>
                <Select
                  defaultValue="match"
                  style={{ width: 120 }}
                  options={[
                    { value: 'match', label: 'AI匹配度' },
                    { value: 'gpa', label: 'GPA' },
                    { value: 'time', label: '申请时间' }
                  ]}
                />
              </Space>
            </Col>
          </Row>
        </Card>

        {/* Applicant Stats */}
        <Row gutter={16} style={{ marginBottom: 24 }}>
          <Col>
            <Checkbox 
              onChange={e => handleSelectAll(e.target.checked)}
              checked={selectedApplicants.length === filteredApplicants.length && filteredApplicants.length > 0}
              indeterminate={selectedApplicants.length > 0 && selectedApplicants.length < filteredApplicants.length}
            >
              全选
            </Checkbox>
          </Col>
          <Col flex="auto">
            <Space>
              <Badge count={filteredApplicants.length} showZero>
                <Tag>申请学生</Tag>
              </Badge>
              <span style={{ color: '#8c8c8c' }}>
                已选择 {selectedApplicants.length} 名学生
              </span>
            </Space>
          </Col>
        </Row>

        {/* Applicant Grid */}
        <Row gutter={[16, 16]} className={styles.applicantGrid}>
          {filteredApplicants.map(applicant => renderApplicantCard(applicant))}
        </Row>

        {/* Batch Actions */}
        {selectedApplicants.length > 0 && (
          <div className={styles.batchActions}>
            <span className={styles.selectedCount}>
              已选择 {selectedApplicants.length} 名学生
            </span>
            <Button onClick={() => setSelectedApplicants([])}>取消选择</Button>
            <Button type="primary" onClick={handleBatchAccept}>批量通过</Button>
            <Button danger onClick={handleBatchReject}>批量拒绝</Button>
          </div>
        )}

        {/* Detail Modal */}
        <Modal
          title={`申请详情 - ${currentApplicant?.name}`}
          visible={detailModalVisible}
          onCancel={() => setDetailModalVisible(false)}
          width={800}
          footer={[
            <Button key="close" onClick={() => setDetailModalVisible(false)}>
              关闭
            </Button>,
            <Button key="interview" icon={<VideoCameraOutlined />}>
              安排面试
            </Button>,
            <Button key="accept" type="primary" icon={<CheckCircleOutlined />}>
              通过申请
            </Button>
          ]}
        >
          {currentApplicant && (
            <>
              <Descriptions bordered column={2}>
                <Descriptions.Item label="姓名">{currentApplicant.name}</Descriptions.Item>
                <Descriptions.Item label="专业">{currentApplicant.major}</Descriptions.Item>
                <Descriptions.Item label="年级">{currentApplicant.year}</Descriptions.Item>
                <Descriptions.Item label="GPA">{currentApplicant.gpa}</Descriptions.Item>
                <Descriptions.Item label="AI匹配度" span={2}>
                  <Progress 
                    percent={currentApplicant.matchScore} 
                    strokeColor={getMatchScoreColor(currentApplicant.matchScore)}
                  />
                </Descriptions.Item>
                <Descriptions.Item label="技能特长" span={2}>
                  <Space wrap>
                    {currentApplicant.skills.map(skill => (
                      <Tag key={skill} color="blue">{skill}</Tag>
                    ))}
                  </Space>
                </Descriptions.Item>
              </Descriptions>

              <Card title="个人陈述" style={{ marginTop: 16 }}>
                <p>{currentApplicant.statement}</p>
              </Card>

              <Row gutter={16} style={{ marginTop: 16 }}>
                <Col span={12}>
                  <Card title={<><TrophyOutlined /> 获奖情况</>}>
                    <Timeline>
                      {currentApplicant.awards.map((award, index) => (
                        <Timeline.Item key={index} color="green">
                          {award}
                        </Timeline.Item>
                      ))}
                    </Timeline>
                  </Card>
                </Col>
                <Col span={12}>
                  <Card title={<><FileTextOutlined /> 项目经历</>}>
                    <Timeline>
                      {currentApplicant.projects.map((project, index) => (
                        <Timeline.Item key={index} color="blue">
                          {project}
                        </Timeline.Item>
                      ))}
                    </Timeline>
                  </Card>
                </Col>
              </Row>

              <Card 
                title={<><RobotOutlined /> AI分析报告</>} 
                style={{ marginTop: 16 }}
              >
                <p><strong>匹配理由：</strong>该学生的技能背景与课题需求高度匹配，特别是在编程和机械设计方面。</p>
                <p><strong>优势分析：</strong>具有丰富的竞赛经验和项目实践，展现出较强的创新能力和团队协作能力。</p>
                <p><strong>建议：</strong>建议优先考虑，可重点考察其在控制理论方面的基础。</p>
              </Card>
            </>
          )}
        </Modal>
      </div>
    </MainLayout>
  );
};

export default StudentSelection;