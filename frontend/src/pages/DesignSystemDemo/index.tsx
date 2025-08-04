import React, { useState } from 'react';
import { Typography, Space, Divider, Switch, message } from 'antd';
import {
  Button,
  Card,
  Input,
  Select,
  Modal,
  Table,
  ResponsiveLayout,
  NotificationSystem,
  Badge,
} from '@/components';
import { useTheme } from '@/contexts';
import {
  HomeOutlined,
  UserOutlined,
  SettingOutlined,
  FileOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import './style.css';

const { Title, Paragraph, Text } = Typography;

const DesignSystemDemo: React.FC = () => {
  const { toggleTheme, isDarkMode } = useTheme();
  const [modalVisible, setModalVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [selectValue, setSelectValue] = useState<string | undefined>(undefined);

  // Sample data for table
  const tableData = [
    { key: '1', name: '张三', role: '学生', status: '活跃', score: 95 },
    { key: '2', name: '李四', role: '教授', status: '活跃', score: 88 },
    { key: '3', name: '王五', role: '秘书', status: '离线', score: 92 },
  ];

  const tableColumns = [
    { title: '姓名', dataIndex: 'name', key: 'name' },
    { title: '角色', dataIndex: 'role', key: 'role' },
    { title: '状态', dataIndex: 'status', key: 'status' },
    { title: '评分', dataIndex: 'score', key: 'score' },
  ];

  // Navigation menu items
  const topNavMenuItems = [
    { key: 'home', label: '首页' },
    { key: 'courses', label: '课程' },
    { key: 'about', label: '关于' },
  ];

  const sideNavMenuItems = [
    { key: '1', icon: <HomeOutlined />, label: '仪表板' },
    { key: '2', icon: <UserOutlined />, label: '用户管理' },
    { key: '3', icon: <FileOutlined />, label: '文档中心' },
    { key: '4', icon: <TeamOutlined />, label: '团队协作' },
    { key: '5', icon: <SettingOutlined />, label: '系统设置' },
  ];

  return (
    <ResponsiveLayout
      topNavProps={{
        logo: <span className="demo-logo">设计系统演示</span>,
        menuItems: topNavMenuItems,
        onMenuClick: (key) => message.info(`点击了菜单: ${key}`),
      }}
      sideNavProps={{
        menuItems: sideNavMenuItems,
        defaultSelectedKey: '1',
        onMenuClick: (key) => message.info(`点击了侧边栏: ${key}`),
      }}
      showSidebar={true}
    >
      <div className="design-system-demo">
        <div className="demo-header">
          <Title level={1}>科研管理平台设计系统</Title>
          <Paragraph>
            这是故事 000 的实现演示，展示了统一的设计系统基础，包括色彩规范、字体系统、间距网格、基础组件库等。
          </Paragraph>
          <Space>
            <Text>主题切换:</Text>
            <Switch
              checked={isDarkMode}
              onChange={toggleTheme}
              checkedChildren="暗"
              unCheckedChildren="亮"
            />
          </Space>
        </div>

        <Divider />

        {/* Color System */}
        <section className="demo-section">
          <Title level={2}>色彩系统</Title>
          <div className="color-grid">
            <div className="color-group">
              <Title level={4}>角色专属色彩</Title>
              <div className="color-swatches">
                <div className="color-swatch" style={{ backgroundColor: '#1A73E8' }}>
                  <span>教授蓝</span>
                  <span>#1A73E8</span>
                </div>
                <div className="color-swatch" style={{ backgroundColor: '#4CAF50' }}>
                  <span>学生绿</span>
                  <span>#4CAF50</span>
                </div>
                <div className="color-swatch" style={{ backgroundColor: '#7C4DFF' }}>
                  <span>秘书紫</span>
                  <span>#7C4DFF</span>
                </div>
                <div className="color-swatch" style={{ backgroundColor: '#FF9800' }}>
                  <span>领导金</span>
                  <span>#FF9800</span>
                </div>
              </div>
            </div>

            <div className="color-group">
              <Title level={4}>功能色彩</Title>
              <div className="color-swatches">
                <div className="color-swatch" style={{ backgroundColor: '#4CAF50' }}>
                  <span>成功</span>
                  <span>#4CAF50</span>
                </div>
                <div className="color-swatch" style={{ backgroundColor: '#FF9800' }}>
                  <span>警告</span>
                  <span>#FF9800</span>
                </div>
                <div className="color-swatch" style={{ backgroundColor: '#F44336' }}>
                  <span>错误</span>
                  <span>#F44336</span>
                </div>
                <div className="color-swatch" style={{ backgroundColor: '#2196F3' }}>
                  <span>信息</span>
                  <span>#2196F3</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Divider />

        {/* Typography */}
        <section className="demo-section">
          <Title level={2}>字体与排版</Title>
          <Card>
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
              <div>
                <Title level={1}>标题 H1 (32px)</Title>
                <Text type="secondary">思源黑体 / Source Han Sans</Text>
              </div>
              <div>
                <Title level={2}>标题 H2 (24px)</Title>
                <Text type="secondary">用于页面主要区块标题</Text>
              </div>
              <div>
                <Title level={3}>标题 H3 (20px)</Title>
                <Text type="secondary">用于子区块标题</Text>
              </div>
              <div>
                <Title level={4}>标题 H4 (16px)</Title>
                <Text type="secondary">用于卡片标题</Text>
              </div>
              <div>
                <Title level={5}>标题 H5 (14px)</Title>
                <Text type="secondary">用于列表项标题</Text>
              </div>
              <Paragraph>
                正文文本示例 (14px/22px行高)：科研管理平台致力于为高校科研实验班提供全方位的数字化管理解决方案，
                通过智能化的课程管理、师生匹配、成绩评定等功能，提升教学质量和管理效率。
              </Paragraph>
            </Space>
          </Card>
        </section>

        <Divider />

        {/* Buttons */}
        <section className="demo-section">
          <Title level={2}>按钮组件</Title>
          <Card>
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
              <div>
                <Title level={4}>按钮类型</Title>
                <Space wrap>
                  <Button variant="primary">主按钮</Button>
                  <Button variant="secondary">次按钮</Button>
                  <Button variant="text">文字按钮</Button>
                  <Button variant="danger">危险按钮</Button>
                  <Button variant="primary" disabled>禁用按钮</Button>
                </Space>
              </div>
              <div>
                <Title level={4}>按钮尺寸</Title>
                <Space wrap align="center">
                  <Button size="large">大号按钮 (40px)</Button>
                  <Button size="middle">中号按钮 (32px)</Button>
                  <Button size="small">小号按钮 (24px)</Button>
                </Space>
              </div>
              <div>
                <Title level={4}>带图标按钮</Title>
                <Space wrap>
                  <Button icon={<UserOutlined />}>用户管理</Button>
                  <Button icon={<SettingOutlined />} variant="text">设置</Button>
                  <Button variant="primary" icon={<UserOutlined />} />
                </Space>
              </div>
            </Space>
          </Card>
        </section>

        <Divider />

        {/* Form Components */}
        <section className="demo-section">
          <Title level={2}>表单组件</Title>
          <Card>
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
              <div>
                <Title level={4}>输入框</Title>
                <Space direction="vertical" style={{ width: '100%' }}>
                  <Input
                    placeholder="标准输入框"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                  />
                  <Input
                    placeholder="带辅助文本的输入框"
                    helperText="请输入您的用户名"
                  />
                  <Input
                    placeholder="错误状态输入框"
                    error
                    helperText="用户名已存在"
                  />
                  <Input.Password placeholder="密码输入框" />
                </Space>
              </div>
              <div>
                <Title level={4}>选择器</Title>
                <Space direction="vertical" style={{ width: '100%' }}>
                  <Select
                    placeholder="请选择角色"
                    style={{ width: '100%' }}
                    value={selectValue}
                    onChange={setSelectValue}
                    options={[
                      { value: 'professor', label: '教授' },
                      { value: 'student', label: '学生' },
                      { value: 'secretary', label: '秘书' },
                      { value: 'leader', label: '领导' },
                    ]}
                  />
                  <Select
                    placeholder="带辅助文本的选择器"
                    style={{ width: '100%' }}
                    helperText="选择您的用户角色"
                    options={[
                      { value: 'option1', label: '选项1' },
                      { value: 'option2', label: '选项2' },
                    ]}
                  />
                </Space>
              </div>
            </Space>
          </Card>
        </section>

        <Divider />

        {/* Cards */}
        <section className="demo-section">
          <Title level={2}>卡片组件</Title>
          <div className="card-grid">
            <Card variant="default" title="默认卡片">
              <Paragraph>
                白色背景，圆角 8px，阴影 0 2px 8px rgba(0,0,0,0.1)
              </Paragraph>
            </Card>
            <Card variant="elevated" title="悬浮卡片">
              <Paragraph>
                增强阴影效果，hover 时阴影加深
              </Paragraph>
            </Card>
            <Card variant="outlined" title="边框卡片">
              <Paragraph>
                无阴影，使用边框定义卡片边界
              </Paragraph>
            </Card>
          </div>
        </section>

        <Divider />

        {/* Notification System */}
        <section className="demo-section">
          <Title level={2}>通知系统</Title>
          <Card>
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
              <div>
                <Title level={4}>消息提示</Title>
                <Space wrap>
                  <Button onClick={() => NotificationSystem.success('操作成功')}>
                    成功消息
                  </Button>
                  <Button onClick={() => NotificationSystem.error('操作失败')}>
                    错误消息
                  </Button>
                  <Button onClick={() => NotificationSystem.warning('请注意')}>
                    警告消息
                  </Button>
                  <Button onClick={() => NotificationSystem.info('提示信息')}>
                    信息消息
                  </Button>
                </Space>
              </div>
              <div>
                <Title level={4}>通知</Title>
                <Space wrap>
                  <Button
                    onClick={() =>
                      NotificationSystem.showNotification('success', {
                        title: '提交成功',
                        description: '您的作业已成功提交，请等待教授审批。',
                      })
                    }
                  >
                    成功通知
                  </Button>
                  <Button
                    onClick={() =>
                      NotificationSystem.showNotification('error', {
                        title: '提交失败',
                        description: '网络连接异常，请稍后重试。',
                      })
                    }
                  >
                    错误通知
                  </Button>
                </Space>
              </div>
              <div>
                <Title level={4}>徽标</Title>
                <Space size="large">
                  <Badge count={5}>
                    <Button>消息</Button>
                  </Badge>
                  <Badge count={99}>
                    <Button>通知</Button>
                  </Badge>
                  <Badge count={200} maxCount={99}>
                    <Button>任务</Button>
                  </Badge>
                  <Badge dot>
                    <Button>新功能</Button>
                  </Badge>
                </Space>
              </div>
            </Space>
          </Card>
        </section>

        <Divider />

        {/* Modal */}
        <section className="demo-section">
          <Title level={2}>模态框</Title>
          <Card>
            <Space>
              <Button onClick={() => setModalVisible(true)}>打开模态框</Button>
            </Space>
            <Modal
              title="模态框标题"
              open={modalVisible}
              onOk={() => setModalVisible(false)}
              onCancel={() => setModalVisible(false)}
              size="medium"
            >
              <Paragraph>
                这是一个中等尺寸的模态框（600px宽）。模态框支持三种尺寸：
              </Paragraph>
              <ul>
                <li>小号 (400px)</li>
                <li>中号 (600px)</li>
                <li>大号 (800px)</li>
              </ul>
            </Modal>
          </Card>
        </section>

        <Divider />

        {/* Table */}
        <section className="demo-section">
          <Title level={2}>数据表格</Title>
          <Card>
            <Table
              dataSource={tableData}
              columns={tableColumns}
              pagination={{ pageSize: 5 }}
            />
          </Card>
        </section>

        <Divider />

        {/* Responsive Grid */}
        <section className="demo-section">
          <Title level={2}>响应式网格</Title>
          <Card>
            <div className="grid-demo">
              <div className="row">
                <div className="col col-6 col-md-4 col-lg-3">
                  <div className="grid-item">Col 1</div>
                </div>
                <div className="col col-6 col-md-4 col-lg-3">
                  <div className="grid-item">Col 2</div>
                </div>
                <div className="col col-6 col-md-4 col-lg-3">
                  <div className="grid-item">Col 3</div>
                </div>
                <div className="col col-6 col-md-4 col-lg-3">
                  <div className="grid-item">Col 4</div>
                </div>
              </div>
            </div>
            <Paragraph>
              基于 8px 网格系统，支持桌面端 12 列、平板端 8 列的响应式布局
            </Paragraph>
          </Card>
        </section>

        <Divider />

        {/* Accessibility */}
        <section className="demo-section">
          <Title level={2}>无障碍访问</Title>
          <Card>
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
              <div>
                <Title level={4}>键盘导航</Title>
                <Paragraph>
                  所有交互元素支持 Tab 键导航，焦点状态明显可见（2px 蓝色边框）
                </Paragraph>
              </div>
              <div>
                <Title level={4}>颜色对比度</Title>
                <Paragraph>
                  文本与背景的对比度符合 WCAG 2.1 AA 标准：
                </Paragraph>
                <ul>
                  <li>正常文本：至少 4.5:1</li>
                  <li>大号文本：至少 3:1</li>
                  <li>交互元素：至少 3:1</li>
                </ul>
              </div>
            </Space>
          </Card>
        </section>
      </div>
    </ResponsiveLayout>
  );
};

export default DesignSystemDemo;