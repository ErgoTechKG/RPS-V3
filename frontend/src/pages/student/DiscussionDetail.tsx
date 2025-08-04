import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Layout,
  Card,
  Avatar,
  Space,
  Typography,
  Tag,
  Button,
  Divider,
  List,
  Input,
  message,
  Tooltip,
  Dropdown,
  Menu,
  Badge
} from 'antd';
import {
  ArrowLeftOutlined,
  LikeOutlined,
  LikeFilled,
  StarOutlined,
  StarFilled,
  ShareAltOutlined,
  MoreOutlined,
  CheckCircleOutlined,
  UserOutlined,
  ClockCircleOutlined,
  EyeOutlined,
  MessageOutlined
} from '@ant-design/icons';
import './DiscussionDetail.css';

const { Content } = Layout;
const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;

interface Reply {
  id: string;
  author: string;
  avatar?: string;
  content: string;
  time: string;
  likes: number;
  isLiked?: boolean;
  isBestAnswer?: boolean;
  replies?: Reply[];
}

const DiscussionDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [replyContent, setReplyContent] = useState('');
  const [isLiked, setIsLiked] = useState(false);
  const [isStarred, setIsStarred] = useState(false);
  const [likedReplies, setLikedReplies] = useState<Set<string>>(new Set());

  // 模拟数据
  const discussion = {
    id: '1',
    title: '实验室轮转选题求建议',
    author: '李明',
    major: '机械工程',
    avatar: 'LM',
    content: `大家好，我是机械工程专业的大三学生，最近在为实验室轮转选题纠结。

目前有两个选择：
1. 张教授的AI项目：主要研究深度学习在机械故障诊断中的应用
2. 王教授的机器人项目：专注于协作机器人的控制算法研究

我的情况：
- 有一定的编程基础（Python、C++）
- 对AI很感兴趣，但深度学习经验不多
- 动手能力较强，参加过机器人竞赛

请问有经验的同学能给些建议吗？这两个方向哪个更适合本科生？哪个对未来发展更有帮助？`,
    tags: ['选题建议', '实验室轮转', 'AI', '机器人'],
    time: '2024-03-15 14:30',
    views: 102,
    replies: 15,
    isSolved: false
  };

  const replies: Reply[] = [
    {
      id: '1',
      author: '王芳',
      avatar: 'WF',
      content: '我去年选的是张教授的项目，体验很好！张教授很有耐心，会从基础开始教。而且AI方向确实是未来趋势，建议你可以考虑。',
      time: '2小时前',
      likes: 8,
      isBestAnswer: true
    },
    {
      id: '2',
      author: '赵云',
      avatar: 'ZY',
      content: '两个方向都不错，关键看你的兴趣和职业规划。如果你想深造读研，AI方向发论文相对容易一些。如果偏向就业，机器人项目的实践经验可能更受企业欢迎。',
      time: '1小时前',
      likes: 12,
      replies: [
        {
          id: '2-1',
          author: '李明',
          content: '谢谢学长的建议！我确实在考虑读研，看来AI方向可能更适合。',
          time: '30分钟前',
          likes: 2
        }
      ]
    },
    {
      id: '3',
      author: '陈老师',
      avatar: 'C',
      content: '作为指导老师，我建议你可以先和两位教授都聊聊，了解具体的研究内容和要求。选择适合自己的才是最重要的。',
      time: '45分钟前',
      likes: 15
    }
  ];

  const handleReply = () => {
    if (!replyContent.trim()) {
      message.warning('请输入回复内容');
      return;
    }
    message.success('回复成功');
    setReplyContent('');
  };

  const handleLikeReply = (replyId: string) => {
    const newLikedReplies = new Set(likedReplies);
    if (newLikedReplies.has(replyId)) {
      newLikedReplies.delete(replyId);
    } else {
      newLikedReplies.add(replyId);
    }
    setLikedReplies(newLikedReplies);
  };

  const renderReply = (reply: Reply, isNested = false) => (
    <div className={`reply-item ${isNested ? 'nested' : ''}`} key={reply.id}>
      <Space align="start" style={{ width: '100%' }}>
        <Avatar size={isNested ? 32 : 40}>{reply.avatar || reply.author[0]}</Avatar>
        <div style={{ flex: 1 }}>
          <div className="reply-header">
            <Space>
              <Text strong>{reply.author}</Text>
              {reply.isBestAnswer && (
                <Badge
                  count="最佳答案"
                  style={{ backgroundColor: '#52c41a' }}
                />
              )}
              <Text type="secondary">{reply.time}</Text>
            </Space>
            <Space>
              <Tooltip title={likedReplies.has(reply.id) ? '取消点赞' : '点赞'}>
                <Button
                  type="text"
                  icon={likedReplies.has(reply.id) ? <LikeFilled /> : <LikeOutlined />}
                  onClick={() => handleLikeReply(reply.id)}
                  style={{ color: likedReplies.has(reply.id) ? '#1890ff' : undefined }}
                >
                  {reply.likes + (likedReplies.has(reply.id) ? 1 : 0)}
                </Button>
              </Tooltip>
              <Button type="text" icon={<MessageOutlined />}>
                回复
              </Button>
            </Space>
          </div>
          <Paragraph style={{ marginTop: 8, marginBottom: 8 }}>
            {reply.content}
          </Paragraph>
          {reply.replies && reply.replies.length > 0 && (
            <div className="nested-replies">
              {reply.replies.map(nestedReply => renderReply(nestedReply, true))}
            </div>
          )}
        </div>
      </Space>
    </div>
  );

  const moreMenu = (
    <Menu>
      <Menu.Item key="report">举报</Menu.Item>
      <Menu.Item key="block">屏蔽此用户</Menu.Item>
    </Menu>
  );

  return (
    <Layout className="discussion-detail">
      <Content>
        <Button
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate(-1)}
          style={{ marginBottom: 16 }}
        >
          返回讨论列表
        </Button>

        <Card className="discussion-main">
          <div className="discussion-header">
            <Title level={4} style={{ margin: 0 }}>
              {discussion.title}
            </Title>
            <Space>
              <Tooltip title={isLiked ? '取消点赞' : '点赞'}>
                <Button
                  type="text"
                  icon={isLiked ? <LikeFilled /> : <LikeOutlined />}
                  onClick={() => setIsLiked(!isLiked)}
                  style={{ color: isLiked ? '#1890ff' : undefined }}
                />
              </Tooltip>
              <Tooltip title={isStarred ? '取消收藏' : '收藏'}>
                <Button
                  type="text"
                  icon={isStarred ? <StarFilled /> : <StarOutlined />}
                  onClick={() => setIsStarred(!isStarred)}
                  style={{ color: isStarred ? '#faad14' : undefined }}
                />
              </Tooltip>
              <Tooltip title="分享">
                <Button type="text" icon={<ShareAltOutlined />} />
              </Tooltip>
              <Dropdown overlay={moreMenu} placement="bottomRight">
                <Button type="text" icon={<MoreOutlined />} />
              </Dropdown>
            </Space>
          </div>

          <div className="discussion-meta">
            <Space size="large">
              <Space>
                <Avatar size={48}>{discussion.avatar}</Avatar>
                <div>
                  <Text strong>{discussion.author}</Text>
                  <br />
                  <Text type="secondary">{discussion.major}</Text>
                </div>
              </Space>
              <Space split={<Divider type="vertical" />}>
                <Space>
                  <ClockCircleOutlined />
                  <Text type="secondary">{discussion.time}</Text>
                </Space>
                <Space>
                  <EyeOutlined />
                  <Text type="secondary">{discussion.views} 浏览</Text>
                </Space>
                <Space>
                  <MessageOutlined />
                  <Text type="secondary">{discussion.replies} 回复</Text>
                </Space>
              </Space>
            </Space>
          </div>

          <Divider />

          <div className="discussion-content">
            <Paragraph style={{ whiteSpace: 'pre-wrap' }}>
              {discussion.content}
            </Paragraph>
            <Space size={[0, 8]} wrap style={{ marginTop: 16 }}>
              {discussion.tags.map(tag => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </Space>
          </div>

          {discussion.isSolved && (
            <div className="solved-banner">
              <CheckCircleOutlined style={{ marginRight: 8 }} />
              该问题已解决
            </div>
          )}
        </Card>

        <Card title={`${discussion.replies} 条回复`} className="replies-section">
          <List
            dataSource={replies}
            renderItem={(reply) => renderReply(reply)}
          />
        </Card>

        <Card title="发表回复" className="reply-section">
          <TextArea
            rows={4}
            placeholder="写下你的回复..."
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
          />
          <div style={{ marginTop: 16, textAlign: 'right' }}>
            <Space>
              <Button>取消</Button>
              <Button type="primary" onClick={handleReply}>
                发布回复
              </Button>
            </Space>
          </div>
        </Card>
      </Content>
    </Layout>
  );
};

export default DiscussionDetail;