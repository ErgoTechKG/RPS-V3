import React from 'react';
import { Card, Row, Col, Progress, Tag, Space, Typography } from 'antd';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const { Text, Title } = Typography;

interface TaskData {
  pending: number;
  inProgress: number;
  overdue: number;
  completed: number;
}

interface TaskMonitorProps {
  taskData: TaskData;
}

const TaskMonitor: React.FC<TaskMonitorProps> = ({ taskData }) => {
  const pieData = [
    { name: '待处理', value: taskData.pending, color: '#faad14' },
    { name: '进行中', value: taskData.inProgress, color: '#1890ff' },
    { name: '已逾期', value: taskData.overdue, color: '#ff4d4f' },
    { name: '已完成', value: taskData.completed, color: '#52c41a' },
  ];

  const totalTasks = Object.values(taskData).reduce((sum, val) => sum + val, 0);
  const completionRate = totalTasks > 0 ? Math.round((taskData.completed / totalTasks) * 100) : 0;
  const overdueRate = totalTasks > 0 ? Math.round((taskData.overdue / totalTasks) * 100) : 0;

  return (
    <Card title="任务监控" bordered={false}>
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend 
                verticalAlign="middle" 
                align="right"
                layout="vertical"
                iconType="circle"
              />
            </PieChart>
          </ResponsiveContainer>
        </Col>
        
        <Col xs={24} lg={12}>
          <Space direction="vertical" style={{ width: '100%' }} size="middle">
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text>任务完成率</Text>
                <Tag color={completionRate >= 80 ? 'success' : completionRate >= 60 ? 'warning' : 'error'}>
                  {completionRate}%
                </Tag>
              </div>
              <Progress 
                percent={completionRate} 
                strokeColor={{
                  '0%': '#108ee9',
                  '100%': '#87d068',
                }}
                showInfo={false}
              />
            </div>
            
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text>逾期率</Text>
                <Tag color={overdueRate <= 5 ? 'success' : overdueRate <= 10 ? 'warning' : 'error'}>
                  {overdueRate}%
                </Tag>
              </div>
              <Progress 
                percent={overdueRate} 
                strokeColor="#ff4d4f"
                showInfo={false}
              />
            </div>

            <div style={{ marginTop: '16px' }}>
              <Title level={5}>任务统计</Title>
              <Space size="small" wrap>
                <Tag icon={<span style={{ marginRight: '4px' }}>⭕</span>} color="orange">
                  待处理: {taskData.pending}
                </Tag>
                <Tag icon={<span style={{ marginRight: '4px' }}>⏱️</span>} color="blue">
                  进行中: {taskData.inProgress}
                </Tag>
                <Tag icon={<span style={{ marginRight: '4px' }}>⚠️</span>} color="red">
                  已逾期: {taskData.overdue}
                </Tag>
                <Tag icon={<span style={{ marginRight: '4px' }}>✅</span>} color="green">
                  已完成: {taskData.completed}
                </Tag>
              </Space>
            </div>
          </Space>
        </Col>
      </Row>
    </Card>
  );
};

export default TaskMonitor;