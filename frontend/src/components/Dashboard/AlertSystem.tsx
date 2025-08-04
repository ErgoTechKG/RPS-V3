import React from 'react';
import { Card, List, Tag, Typography, Button, Space, Badge } from 'antd';
import { 
  ExclamationCircleOutlined,
  WarningOutlined,
  InfoCircleOutlined,
  RightOutlined
} from '@ant-design/icons';

const { Text, Title } = Typography;

export interface Alert {
  id: string;
  level: 'urgent' | 'important' | 'normal';
  title: string;
  description: string;
  time: string;
  handled: boolean;
}

interface AlertSystemProps {
  alerts: Alert[];
  onHandleAlert?: (alertId: string) => void;
  onViewAll?: () => void;
}

const AlertSystem: React.FC<AlertSystemProps> = ({ alerts, onHandleAlert, onViewAll }) => {
  const getAlertIcon = (level: Alert['level']) => {
    switch (level) {
      case 'urgent':
        return <ExclamationCircleOutlined style={{ color: '#ff4d4f' }} />;
      case 'important':
        return <WarningOutlined style={{ color: '#faad14' }} />;
      case 'normal':
        return <InfoCircleOutlined style={{ color: '#1890ff' }} />;
    }
  };

  const getAlertColor = (level: Alert['level']) => {
    switch (level) {
      case 'urgent':
        return '#ff4d4f';
      case 'important':
        return '#faad14';
      case 'normal':
        return '#1890ff';
    }
  };

  const unhandledCount = alerts.filter(alert => !alert.handled).length;

  return (
    <Card 
      title={
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>
            预警信息
            {unhandledCount > 0 && (
              <Badge 
                count={unhandledCount} 
                style={{ marginLeft: '8px' }}
                overflowCount={99}
              />
            )}
          </span>
          {onViewAll && (
            <Button 
              type="link" 
              size="small" 
              onClick={onViewAll}
              style={{ padding: 0 }}
            >
              查看全部 <RightOutlined />
            </Button>
          )}
        </div>
      }
      bordered={false}
      bodyStyle={{ padding: '0 24px' }}
    >
      <List
        dataSource={alerts.slice(0, 5)}
        renderItem={(alert) => (
          <List.Item
            style={{ 
              borderLeft: `4px solid ${getAlertColor(alert.level)}`,
              paddingLeft: '12px',
              marginBottom: '8px',
              backgroundColor: alert.handled ? '#fafafa' : 'transparent'
            }}
            actions={[
              !alert.handled && onHandleAlert && (
                <Button 
                  type="link" 
                  size="small"
                  onClick={() => onHandleAlert(alert.id)}
                >
                  处理
                </Button>
              )
            ].filter(Boolean)}
          >
            <List.Item.Meta
              avatar={getAlertIcon(alert.level)}
              title={
                <Space>
                  <Text style={{ fontWeight: 500 }}>{alert.title}</Text>
                  {alert.level === 'urgent' && (
                    <Tag color="red" style={{ margin: 0 }}>紧急</Tag>
                  )}
                  {alert.level === 'important' && (
                    <Tag color="orange" style={{ margin: 0 }}>重要</Tag>
                  )}
                </Space>
              }
              description={
                <div>
                  <Text type="secondary" style={{ fontSize: '13px' }}>
                    {alert.description}
                  </Text>
                  <div style={{ marginTop: '4px' }}>
                    <Text type="secondary" style={{ fontSize: '12px' }}>
                      {alert.time}
                    </Text>
                  </div>
                </div>
              }
            />
          </List.Item>
        )}
      />
      
      {alerts.length === 0 && (
        <div style={{ textAlign: 'center', padding: '32px 0', color: '#999' }}>
          <InfoCircleOutlined style={{ fontSize: '32px', marginBottom: '8px' }} />
          <div>暂无预警信息</div>
        </div>
      )}
    </Card>
  );
};

export default AlertSystem;