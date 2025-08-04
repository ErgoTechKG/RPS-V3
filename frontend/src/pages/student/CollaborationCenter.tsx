import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Layout, 
  Input, 
  Button, 
  Select, 
  Card, 
  List, 
  Tag, 
  Space, 
  Avatar,
  Typography,
  Badge,
  Row,
  Col,
  Divider,
  Empty,
  message
} from 'antd';
import { 
  SearchOutlined, 
  CommentOutlined, 
  TeamOutlined,
  BulbOutlined,
  StarOutlined,
  FireOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  EyeOutlined,
  MessageOutlined
} from '@ant-design/icons';
import './CollaborationCenter.css';

const { Sider, Content } = Layout;
const { Search } = Input;
const { Option } = Select;
const { Title, Text, Paragraph } = Typography;

interface Discussion {
  id: string;
  title: string;
  author: string;
  major: string;
  content: string;
  category: string;
  tags: string[];
  replies: number;
  views: number;
  time: string;
  isHot?: boolean;
  isSolved?: boolean;
}

const CollaborationCenter: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchValue, setSearchValue] = useState('');
  const [filterType, setFilterType] = useState('latest');

  // 模拟数据
  const discussions: Discussion[] = [
    {
      id: '1',
      title: '实验室轮转选题求建议',
      author: '李明',
      major: '机械工程',
      content: '大家好，我在纠结选择张教授的AI项目还是王教授的机器人项目，有经验的同学能给些建议吗？',
      category: 'course',
      tags: ['选题建议', '实验室轮转'],
      replies: 15,
      views: 102,
      time: '3小时前',
      isHot: true
    },
    {
      id: '2',
      title: 'Python数据分析代码问题',
      author: '王芳',
      major: '计算机科学',
      content: '感谢大家帮助，问题已解决！附解决方案供后来人参考...',
      category: 'help',
      tags: ['Python', '数据分析', '已解决'],
      replies: 8,
      views: 56,
      time: '5小时前',
      isSolved: true
    },
    {
      id: '3',
      title: '寻找深度学习项目队友',
      author: '张强',
      major: '人工智能',
      content: '计划参加今年的AI竞赛，需要2-3名队友，最好有深度学习基础...',
      category: 'team',
      tags: ['找队友', 'AI竞赛', '深度学习'],
      replies: 12,
      views: 89,
      time: '1天前'
    },
    {
      id: '4',
      title: '我的科研入门经验分享',
      author: '陈晓',
      major: '生物工程',
      content: '作为一个刚完成第一个科研项目的学生，想分享一些心得体会...',
      category: 'experience',
      tags: ['经验分享', '科研入门'],
      replies: 23,
      views: 234,
      time: '2天前',
      isHot: true
    }
  ];

  const categories = [
    { key: 'all', icon: <CommentOutlined />, label: '全部话题', count: 156 },
    { key: 'course', icon: <BookOutlined />, label: '课程讨论', count: 45 },
    { key: 'help', icon: <BulbOutlined />, label: '学习互助', count: 38 },
    { key: 'team', icon: <TeamOutlined />, label: '小组协作', count: 23 },
    { key: 'experience', icon: <StarOutlined />, label: '经验分享', count: 50 }
  ];

  const handleStartDiscussion = () => {
    message.info('发起讨论功能开发中...');
  };

  const filteredDiscussions = discussions.filter(d => {
    const matchCategory = selectedCategory === 'all' || d.category === selectedCategory;
    const matchSearch = searchValue === '' || 
      d.title.toLowerCase().includes(searchValue.toLowerCase()) ||
      d.content.toLowerCase().includes(searchValue.toLowerCase()) ||
      d.tags.some(tag => tag.toLowerCase().includes(searchValue.toLowerCase()));
    return matchCategory && matchSearch;
  });

  const renderDiscussionItem = (item: Discussion) => (
    <Card 
      className="discussion-card" 
      hoverable
      style={{ marginBottom: 16 }}
      onClick={() => navigate(`/student/discussion/${item.id}`)}
    >
      <div className="discussion-header">
        <Space>
          {item.isHot && <FireOutlined style={{ color: '#ff4d4f' }} />}
          {item.isSolved && <CheckCircleOutlined style={{ color: '#52c41a' }} />}
          <Title level={5} style={{ margin: 0 }}>
            {item.title}
          </Title>
        </Space>
        <Text type="secondary">{item.time}</Text>
      </div>
      
      <div className="discussion-meta">
        <Space split={<Divider type="vertical" />}>
          <Space>
            <Avatar size="small">{item.author[0]}</Avatar>
            <Text>{item.author}</Text>
          </Space>
          <Text type="secondary">{item.major}</Text>
          <Space>
            <MessageOutlined />
            <Text>{item.replies}回复</Text>
          </Space>
          <Space>
            <EyeOutlined />
            <Text>{item.views}浏览</Text>
          </Space>
        </Space>
      </div>
      
      <Paragraph 
        ellipsis={{ rows: 2 }} 
        style={{ marginTop: 12, marginBottom: 12 }}
      >
        {item.content}
      </Paragraph>
      
      <Space size={[0, 8]} wrap>
        {item.tags.map(tag => (
          <Tag key={tag} color={tag === '已解决' ? 'success' : 'default'}>
            #{tag}
          </Tag>
        ))}
      </Space>
    </Card>
  );

  return (
    <Layout className="collaboration-center">
      <div className="page-header">
        <Row justify="space-between" align="middle">
          <Col>
            <Title level={3} style={{ margin: 0 }}>学生协作中心</Title>
          </Col>
          <Col>
            <Space>
              <Search
                placeholder="搜索讨论内容"
                allowClear
                enterButton={<SearchOutlined />}
                size="large"
                style={{ width: 300 }}
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
              <Button 
                type="primary" 
                size="large"
                onClick={handleStartDiscussion}
              >
                发起讨论
              </Button>
            </Space>
          </Col>
        </Row>
        
        <Space style={{ marginTop: 16 }}>
          <Text>筛选：</Text>
          <Select 
            defaultValue="latest" 
            style={{ width: 120 }}
            onChange={setFilterType}
          >
            <Option value="all">全部话题</Option>
            <Option value="latest">最新发布</Option>
            <Option value="hot">热门讨论</Option>
            <Option value="unsolved">待解决</Option>
            <Option value="following">我的关注</Option>
          </Select>
        </Space>
      </div>

      <Layout style={{ marginTop: 24 }}>
        <Sider width={200} className="category-sider" theme="light">
          <div className="category-title">话题分类</div>
          <List
            dataSource={categories}
            renderItem={item => (
              <List.Item
                className={`category-item ${selectedCategory === item.key ? 'active' : ''}`}
                onClick={() => setSelectedCategory(item.key)}
                style={{ cursor: 'pointer' }}
              >
                <Space>
                  {item.icon}
                  <Text>{item.label}</Text>
                  <Badge count={item.count} showZero />
                </Space>
              </List.Item>
            )}
          />
        </Sider>

        <Content className="discussion-content">
          {filteredDiscussions.length > 0 ? (
            <>
              <List
                dataSource={filteredDiscussions}
                renderItem={renderDiscussionItem}
              />
              <div style={{ textAlign: 'center', marginTop: 24 }}>
                <Button>加载更多讨论...</Button>
              </div>
            </>
          ) : (
            <Empty description="暂无相关讨论" />
          )}
        </Content>
      </Layout>
    </Layout>
  );
};

export default CollaborationCenter;

// 补充缺失的图标导入
const BookOutlined = () => (
  <span role="img" aria-label="book" style={{ fontSize: 16 }}>📚</span>
);