import React from 'react';
import { Card, Row, Col, Progress, Typography, Space } from 'antd';

const { Text, Title } = Typography;

interface CourseStage {
  name: string;
  progress: number;
  participants?: number;
  status: 'completed' | 'active' | 'pending';
}

interface Course {
  name: string;
  overallProgress: number;
  stages: CourseStage[];
}

interface CourseProgressProps {
  courses: Course[];
}

const CourseProgress: React.FC<CourseProgressProps> = ({ courses }) => {
  const getStageColor = (status: CourseStage['status'], progress: number) => {
    if (status === 'completed' || progress === 100) return '#52c41a';
    if (status === 'active') return '#1890ff';
    return '#d9d9d9';
  };

  return (
    <Card title="课程进度监控" bordered={false}>
      <Row gutter={[24, 24]}>
        {courses.map((course, index) => (
          <Col xs={24} lg={12} key={index}>
            <div style={{ 
              padding: '16px',
              border: '1px solid #f0f0f0',
              borderRadius: '8px',
              backgroundColor: '#fafafa'
            }}>
              <div style={{ marginBottom: '16px' }}>
                <Title level={5} style={{ margin: 0 }}>{course.name}</Title>
                <Text type="secondary">整体完成度: {course.overallProgress}%</Text>
              </div>
              
              <Space direction="vertical" style={{ width: '100%' }} size="middle">
                {course.stages.map((stage, stageIndex) => (
                  <div key={stageIndex}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                      <Text strong>{stage.name}</Text>
                      <Text type="secondary">{stage.progress}%</Text>
                    </div>
                    <Progress
                      percent={stage.progress}
                      strokeColor={getStageColor(stage.status, stage.progress)}
                      showInfo={false}
                      size="small"
                    />
                    {stage.participants && (
                      <Text type="secondary" style={{ fontSize: '12px' }}>
                        {stage.participants} 人参与
                      </Text>
                    )}
                  </div>
                ))}
              </Space>
            </div>
          </Col>
        ))}
      </Row>
    </Card>
  );
};

export default CourseProgress;