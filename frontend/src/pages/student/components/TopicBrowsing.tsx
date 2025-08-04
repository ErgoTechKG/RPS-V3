import React, { useState } from 'react';
import { Card, Row, Col, Input, Select, Button, Tag, Avatar, Progress, Space, Divider, Rate, Tooltip } from 'antd';
import { 
  SearchOutlined, 
  UserOutlined, 
  HeartOutlined, 
  HeartFilled,
  ThunderboltOutlined,
  ClockCircleOutlined,
  TeamOutlined,
  StarOutlined
} from '@ant-design/icons';

const { Search } = Input;
const { Option } = Select;

interface Topic {
  id: string;
  title: string;
  description: string;
  professor: {
    name: string;
    avatar?: string;
    rating: number;
  };
  field: string;
  keywords: string[];
  applicants: number;
  maxApplicants: number;
  matchScore: number;
  deadline: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  isBookmarked: boolean;
  isPopular: boolean;
}

interface TopicBrowsingProps {
  onTopicSelect?: (topicId: string) => void;
}

const TopicBrowsing: React.FC<TopicBrowsingProps> = ({ onTopicSelect }) => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedField, setSelectedField] = useState<string>('all');
  const [selectedProfessor, setSelectedProfessor] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('latest');
  const [bookmarkedTopics, setBookmarkedTopics] = useState<Set<string>>(new Set(['1', '3']));

  // Mock data for topics
  const mockTopics: Topic[] = [
    {
      id: '1',
      title: '基于深度学习的图像识别算法研究',
      description: '探索卷积神经网络在医学图像分析中的应用，研究如何提高诊断准确率并降低误诊率。项目将涉及数据预处理、模型训练、性能优化等多个环节。',
      professor: {
        name: '张教授',
        rating: 4.8
      },
      field: 'AI',
      keywords: ['深度学习', '图像识别', '医学影像', 'CNN'],
      applicants: 3,
      maxApplicants: 5,
      matchScore: 92,
      deadline: '3月15日',
      difficulty: 'advanced',
      isBookmarked: true,
      isPopular: true
    },
    {
      id: '2',
      title: '智能机器人路径规划算法优化',
      description: '研究移动机器人在复杂环境下的自主导航问题，重点关注动态障碍物避障和路径优化策略，提升机器人的智能化水平。',
      professor: {
        name: '李教授',
        rating: 4.6
      },
      field: '机器人',
      keywords: ['路径规划', '避障算法', '移动机器人', 'ROS'],
      applicants: 2,
      maxApplicants: 3,
      matchScore: 85,
      deadline: '3月12日',
      difficulty: 'intermediate',
      isBookmarked: false,
      isPopular: false
    },
    {
      id: '3',
      title: '新型纳米材料的制备与表征',
      description: '合成新型功能纳米材料，研究其物理化学性质，探索在能源存储和环境治理方面的应用潜力。',
      professor: {
        name: '王教授',
        rating: 4.9
      },
      field: '材料',
      keywords: ['纳米材料', '材料表征', '能源应用', '绿色化学'],
      applicants: 4,
      maxApplicants: 4,
      matchScore: 78,
      deadline: '3月18日',
      difficulty: 'advanced',
      isBookmarked: true,
      isPopular: true
    },
    {
      id: '4',
      title: '生物信息学中的数据挖掘方法',
      description: '利用机器学习和统计方法分析基因组数据，发现疾病相关的生物标志物，为精准医疗提供数据支持。',
      professor: {
        name: '赵教授',
        rating: 4.7
      },
      field: '生物',
      keywords: ['生物信息学', '数据挖掘', '基因组学', '精准医疗'],
      applicants: 1,
      maxApplicants: 2,
      matchScore: 88,
      deadline: '3月20日',
      difficulty: 'intermediate',
      isBookmarked: false,
      isPopular: false
    },
    {
      id: '5',
      title: '区块链技术在供应链管理中的应用',
      description: '研究区块链技术如何改善供应链的透明度和可追溯性，设计并实现一个去中心化的供应链管理系统原型。',
      professor: {
        name: '陈教授',
        rating: 4.5
      },
      field: 'AI',
      keywords: ['区块链', '供应链', '去中心化', '智能合约'],
      applicants: 0,
      maxApplicants: 3,
      matchScore: 75,
      deadline: '3月25日',
      difficulty: 'beginner',
      isBookmarked: false,
      isPopular: false
    }
  ];

  const fields = [
    { value: 'all', label: '全部方向' },
    { value: 'AI', label: '人工智能' },
    { value: '机器人', label: '机器人技术' },
    { value: '材料', label: '材料科学' },
    { value: '生物', label: '生物技术' }
  ];

  const professors = [
    { value: 'all', label: '全部导师' },
    { value: '张教授', label: '张教授' },
    { value: '李教授', label: '李教授' },
    { value: '王教授', label: '王教授' },
    { value: '赵教授', label: '赵教授' },
    { value: '陈教授', label: '陈教授' }
  ];

  const sortOptions = [
    { value: 'latest', label: '最新发布' },
    { value: 'popular', label: '热门程度' },
    { value: 'match', label: 'AI推荐匹配度' },
    { value: 'deadline', label: '截止时间' }
  ];

  const handleBookmark = (topicId: string) => {
    const newBookmarks = new Set(bookmarkedTopics);
    if (newBookmarks.has(topicId)) {
      newBookmarks.delete(topicId);
    } else {
      newBookmarks.add(topicId);
    }
    setBookmarkedTopics(newBookmarks);
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
      case 'beginner': return '入门';
      case 'intermediate': return '中级';
      case 'advanced': return '高级';
      default: return '未知';
    }
  };

  const filteredTopics = mockTopics.filter(topic => {
    const matchesSearch = topic.title.toLowerCase().includes(searchKeyword.toLowerCase()) ||
                          topic.description.toLowerCase().includes(searchKeyword.toLowerCase()) ||
                          topic.keywords.some(keyword => keyword.toLowerCase().includes(searchKeyword.toLowerCase()));
    const matchesField = selectedField === 'all' || topic.field === selectedField;
    const matchesProfessor = selectedProfessor === 'all' || topic.professor.name === selectedProfessor;
    
    return matchesSearch && matchesField && matchesProfessor;
  });

  return (
    <div>
      {/* Search and Filter Bar */}
      <Card style={{ marginBottom: '24px' }}>
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} md={8}>
            <Search
              placeholder="搜索课题名称、关键词..."
              allowClear
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              style={{ width: '100%' }}
            />
          </Col>
          <Col xs={12} md={4}>
            <Select
              value={selectedField}
              onChange={setSelectedField}
              style={{ width: '100%' }}
              placeholder="研究方向"
            >
              {fields.map(field => (
                <Option key={field.value} value={field.value}>
                  {field.label}
                </Option>
              ))}
            </Select>
          </Col>
          <Col xs={12} md={4}>
            <Select
              value={selectedProfessor}
              onChange={setSelectedProfessor}
              style={{ width: '100%' }}
              placeholder="导师选择"
            >
              {professors.map(prof => (
                <Option key={prof.value} value={prof.value}>
                  {prof.label}
                </Option>
              ))}
            </Select>
          </Col>
          <Col xs={12} md={4}>
            <Select
              value={sortBy}
              onChange={setSortBy}
              style={{ width: '100%' }}
              placeholder="排序方式"
            >
              {sortOptions.map(option => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>
          </Col>
          <Col xs={12} md={4}>
            <Button type="primary" icon={<SearchOutlined />} style={{ width: '100%' }}>
              高级筛选
            </Button>
          </Col>
        </Row>
      </Card>

      {/* Topic Results Summary */}
      <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ color: '#8c8c8c' }}>
          找到 {filteredTopics.length} 个匹配的课题
        </span>
        <Space>
          <Button size="small">网格视图</Button>
          <Button size="small" type="primary">卡片视图</Button>
        </Space>
      </div>

      {/* Topic Cards */}
      <Row gutter={[16, 24]}>
        {filteredTopics.map(topic => (
          <Col xs={24} lg={12} key={topic.id}>
            <Card
              hoverable
              style={{ 
                height: '100%',
                borderRadius: '12px',
                border: topic.isPopular ? '2px solid #ff4d4f' : '1px solid #e8e8e8'
              }}
              bodyStyle={{ padding: '20px' }}
              actions={[
                <Button 
                  type="primary" 
                  size="small"
                  onClick={() => onTopicSelect?.(topic.id)}
                >
                  查看详情
                </Button>,
                <Button 
                  type="default" 
                  size="small"
                  disabled={topic.applicants >= topic.maxApplicants}
                >
                  立即申请
                </Button>,
                <Button
                  type="text"
                  size="small"
                  icon={bookmarkedTopics.has(topic.id) ? <HeartFilled /> : <HeartOutlined />}
                  onClick={() => handleBookmark(topic.id)}
                  style={{ 
                    color: bookmarkedTopics.has(topic.id) ? '#ff4d4f' : '#8c8c8c' 
                  }}
                >
                  {bookmarkedTopics.has(topic.id) ? '已收藏' : '收藏'}
                </Button>
              ]}
            >
              {/* Header with badges */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                <div style={{ flex: 1 }}>
                  {topic.isPopular && (
                    <Tag color="red" style={{ marginBottom: '8px' }}>
                      <ThunderboltOutlined /> 热门
                    </Tag>
                  )}
                  <div style={{ 
                    fontSize: '16px', 
                    fontWeight: 'bold', 
                    lineHeight: '24px',
                    marginBottom: '8px',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}>
                    {topic.title}
                  </div>
                </div>
                <div style={{ textAlign: 'right', minWidth: '80px' }}>
                  <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#1890ff' }}>
                    {topic.matchScore}%
                  </div>
                  <div style={{ fontSize: '12px', color: '#8c8c8c' }}>
                    AI匹配度
                  </div>
                </div>
              </div>

              {/* Professor Info */}
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
                <Avatar 
                  size={32} 
                  style={{ backgroundColor: '#1890ff', marginRight: '8px' }}
                  icon={<UserOutlined />}
                />
                <div>
                  <div style={{ fontWeight: 'bold', fontSize: '14px' }}>
                    {topic.professor.name}
                  </div>
                  <Rate 
                    disabled 
                    defaultValue={topic.professor.rating} 
                    style={{ fontSize: '12px' }}
                  />
                </div>
              </div>

              {/* Description */}
              <div style={{ 
                color: '#595959',
                fontSize: '14px',
                lineHeight: '20px',
                marginBottom: '12px',
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden'
              }}>
                {topic.description}
              </div>

              {/* Keywords */}
              <div style={{ marginBottom: '12px' }}>
                {topic.keywords.map(keyword => (
                  <Tag key={keyword} style={{ marginBottom: '4px' }}>
                    #{keyword}
                  </Tag>
                ))}
              </div>

              <Divider style={{ margin: '12px 0' }} />

              {/* Footer Stats */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <Tooltip title="申请人数">
                    <div style={{ display: 'flex', alignItems: 'center', fontSize: '12px', color: '#8c8c8c' }}>
                      <TeamOutlined style={{ marginRight: '4px' }} />
                      {topic.applicants}/{topic.maxApplicants}
                    </div>
                  </Tooltip>
                  <Tooltip title="截止时间">
                    <div style={{ display: 'flex', alignItems: 'center', fontSize: '12px', color: '#8c8c8c' }}>
                      <ClockCircleOutlined style={{ marginRight: '4px' }} />
                      {topic.deadline}
                    </div>
                  </Tooltip>
                </div>
                <Tag color={getDifficultyColor(topic.difficulty)}>
                  {getDifficultyText(topic.difficulty)}
                </Tag>
              </div>

              {/* Application Progress */}
              <div style={{ marginTop: '8px' }}>
                <Progress 
                  percent={(topic.applicants / topic.maxApplicants) * 100}
                  size="small"
                  strokeColor={topic.applicants >= topic.maxApplicants ? '#ff4d4f' : '#1890ff'}
                  showInfo={false}
                />
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Load More */}
      <div style={{ textAlign: 'center', marginTop: '32px' }}>
        <Button size="large">加载更多课题</Button>
      </div>
    </div>
  );
};

export default TopicBrowsing;