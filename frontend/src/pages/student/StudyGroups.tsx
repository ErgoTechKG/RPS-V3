import React, { useState } from 'react';
import {
  Layout,
  Card,
  Row,
  Col,
  Button,
  Tag,
  Space,
  Avatar,
  Typography,
  Progress,
  Tabs,
  List,
  Badge,
  Empty,
  Modal,
  Form,
  Input,
  Select,
  InputNumber,
  Radio,
  message
} from 'antd';
import {
  TeamOutlined,
  PlusOutlined,
  UserOutlined,
  ClockCircleOutlined,
  FileTextOutlined,
  CheckCircleOutlined,
  CommentOutlined,
  FolderOutlined,
  CalendarOutlined,
  LockOutlined,
  GlobalOutlined
} from '@ant-design/icons';
import './StudyGroups.css';

const { Content } = Layout;
const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;
const { Option } = Select;

interface StudyGroup {
  id: string;
  name: string;
  description: string;
  type: string;
  members: number;
  maxMembers: number;
  status: 'open' | 'closed' | 'full';
  tags: string[];
  createdTime: string;
  creator: string;
  joinType: 'open' | 'approval' | 'invite';
  activities: {
    discussions: number;
    resources: number;
    tasks: number;
    announcements: number;
  };
  recentActivity?: string;
}

const StudyGroups: React.FC = () => {
  const [activeTab, setActiveTab] = useState('joined');
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [form] = Form.useForm();

  // 模拟数据
  const myGroups: StudyGroup[] = [
    {
      id: '1',
      name: '机器学习研究小组',
      description: '一起学习深度学习和机器学习算法',
      type: '兴趣小组',
      members: 5,
      maxMembers: 8,
      status: 'open',
      tags: ['机器学习', '深度学习'],
      createdTime: '2024-03-01',
      creator: '李明',
      joinType: 'approval',
      activities: {
        discussions: 23,
        resources: 15,
        tasks: 8,
        announcements: 3
      },
      recentActivity: '李明上传了新资源《深度学习入门》'
    },
    {
      id: '2',
      name: 'ACM竞赛备战队',
      description: '为ACM-ICPC竞赛做准备',
      type: '竞赛团队',
      members: 4,
      maxMembers: 5,
      status: 'full',
      tags: ['ACM', '算法竞赛'],
      createdTime: '2024-02-15',
      creator: '王芳',
      joinType: 'invite',
      activities: {
        discussions: 45,
        resources: 32,
        tasks: 12,
        announcements: 5
      },
      recentActivity: '新任务：完成本周算法练习题'
    }
  ];

  const recommendedGroups: StudyGroup[] = [
    {
      id: '3',
      name: '数据分析实战',
      description: '通过实际项目学习数据分析技能',
      type: '项目小组',
      members: 3,
      maxMembers: 6,
      status: 'open',
      tags: ['数据分析', 'Python'],
      createdTime: '2024-03-10',
      creator: '张强',
      joinType: 'open',
      activities: {
        discussions: 12,
        resources: 8,
        tasks: 5,
        announcements: 2
      }
    },
    {
      id: '4',
      name: '英语口语练习组',
      description: '每周定期进行英语口语练习',
      type: '学习小组',
      members: 7,
      maxMembers: 10,
      status: 'open',
      tags: ['英语', '口语'],
      createdTime: '2024-03-05',
      creator: '陈晓',
      joinType: 'approval',
      activities: {
        discussions: 18,
        resources: 6,
        tasks: 10,
        announcements: 4
      }
    }
  ];

  const handleCreateGroup = (values: any) => {
    console.log('创建小组:', values);
    message.success('小组创建成功');
    setCreateModalVisible(false);
    form.resetFields();
  };

  const handleJoinGroup = (groupId: string) => {
    message.info(`申请加入小组 ${groupId}`);
  };

  const renderGroupCard = (group: StudyGroup, isJoined = false) => (
    <Card
      key={group.id}
      className="group-card"
      hoverable
      actions={[
        isJoined ? (
          <Button type="link" key="enter">
            进入小组
          </Button>
        ) : (
          <Button
            type="link"
            key="join"
            disabled={group.status === 'full'}
            onClick={() => handleJoinGroup(group.id)}
          >
            {group.status === 'full' ? '已满' : '申请加入'}
          </Button>
        )
      ]}
    >
      <div className="group-header">
        <Space>
          <Avatar size={48} icon={<TeamOutlined />} />
          <div>
            <Title level={5} style={{ margin: 0 }}>
              {group.name}
            </Title>
            <Space>
              <Tag>{group.type}</Tag>
              {group.joinType === 'invite' && <LockOutlined />}
              {group.joinType === 'open' && <GlobalOutlined />}
            </Space>
          </div>
        </Space>
      </div>

      <Paragraph ellipsis={{ rows: 2 }} style={{ marginTop: 12 }}>
        {group.description}
      </Paragraph>

      <div className="group-stats">
        <Row gutter={16}>
          <Col span={12}>
            <Text type="secondary">成员</Text>
            <div>
              <Text strong>{group.members}/{group.maxMembers}</Text>
              <Progress
                percent={(group.members / group.maxMembers) * 100}
                showInfo={false}
                size="small"
                status={group.status === 'full' ? 'exception' : 'active'}
              />
            </div>
          </Col>
          <Col span={12}>
            <Text type="secondary">活跃度</Text>
            <div style={{ marginTop: 4 }}>
              <Space size={4}>
                <Badge count={group.activities.discussions} size="small" />
                <CommentOutlined />
                <Badge count={group.activities.resources} size="small" />
                <FolderOutlined />
              </Space>
            </div>
          </Col>
        </Row>
      </div>

      {group.recentActivity && (
        <div className="recent-activity">
          <ClockCircleOutlined style={{ marginRight: 8 }} />
          <Text type="secondary" ellipsis>
            {group.recentActivity}
          </Text>
        </div>
      )}

      <div style={{ marginTop: 12 }}>
        <Space size={[0, 8]} wrap>
          {group.tags.map(tag => (
            <Tag key={tag} color="blue">
              {tag}
            </Tag>
          ))}
        </Space>
      </div>
    </Card>
  );

  return (
    <Layout className="study-groups">
      <Content>
        <div className="page-header">
          <Title level={3}>学习小组</Title>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setCreateModalVisible(true)}
          >
            创建小组
          </Button>
        </div>

        <Tabs activeKey={activeTab} onChange={setActiveTab}>
          <TabPane
            tab={
              <span>
                <TeamOutlined />
                我的小组 ({myGroups.length})
              </span>
            }
            key="joined"
          >
            <Row gutter={[16, 16]}>
              {myGroups.map(group => (
                <Col xs={24} sm={12} lg={8} xl={6} key={group.id}>
                  {renderGroupCard(group, true)}
                </Col>
              ))}
            </Row>
          </TabPane>

          <TabPane
            tab={
              <span>
                <GlobalOutlined />
                推荐小组
              </span>
            }
            key="recommended"
          >
            <Row gutter={[16, 16]}>
              {recommendedGroups.map(group => (
                <Col xs={24} sm={12} lg={8} xl={6} key={group.id}>
                  {renderGroupCard(group, false)}
                </Col>
              ))}
            </Row>
          </TabPane>

          <TabPane
            tab={
              <span>
                <UserOutlined />
                我创建的
              </span>
            }
            key="created"
          >
            <Empty description="你还没有创建小组" />
          </TabPane>
        </Tabs>

        <Modal
          title="创建学习小组"
          visible={createModalVisible}
          onCancel={() => setCreateModalVisible(false)}
          footer={null}
          width={600}
        >
          <Form
            form={form}
            layout="vertical"
            onFinish={handleCreateGroup}
          >
            <Form.Item
              name="name"
              label="小组名称"
              rules={[{ required: true, message: '请输入小组名称' }]}
            >
              <Input placeholder="给小组起个响亮的名字" />
            </Form.Item>

            <Form.Item
              name="description"
              label="小组简介"
              rules={[{ required: true, message: '请输入小组简介' }]}
            >
              <Input.TextArea
                rows={3}
                placeholder="介绍一下小组的目标和计划"
              />
            </Form.Item>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="type"
                  label="小组类型"
                  rules={[{ required: true }]}
                >
                  <Select placeholder="选择小组类型">
                    <Option value="course">课程项目</Option>
                    <Option value="interest">兴趣小组</Option>
                    <Option value="competition">竞赛团队</Option>
                    <Option value="study">学习小组</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="maxMembers"
                  label="人数限制"
                  rules={[{ required: true }]}
                >
                  <InputNumber
                    min={2}
                    max={20}
                    placeholder="2-20人"
                    style={{ width: '100%' }}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              name="joinType"
              label="加入方式"
              rules={[{ required: true }]}
            >
              <Radio.Group>
                <Radio value="open">开放加入</Radio>
                <Radio value="approval">需要审核</Radio>
                <Radio value="invite">仅限邀请</Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item
              name="tags"
              label="小组标签"
            >
              <Select
                mode="tags"
                placeholder="添加标签，便于其他同学发现"
                maxTagCount={5}
              />
            </Form.Item>

            <Form.Item>
              <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
                <Button onClick={() => setCreateModalVisible(false)}>
                  取消
                </Button>
                <Button type="primary" htmlType="submit">
                  创建小组
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Modal>
      </Content>
    </Layout>
  );
};

export default StudyGroups;