import React from 'react';
import {
  Card,
  Switch,
  Typography,
  Space,
  Divider,
  TimePicker,
  Button,
  message,
  Row,
  Col
} from 'antd';
import {
  BellOutlined,
  MailOutlined,
  MessageOutlined,
  WechatOutlined,
  BookOutlined,
  UserOutlined,
  SettingOutlined,
  ClockCircleOutlined
} from '@ant-design/icons';
import { useNotifications } from '@/contexts';
import type { NotificationSettings } from '@/types';
import dayjs from 'dayjs';
import './NotificationSettings.css';

const { Title, Text } = Typography;

interface NotificationSettingsProps {
  onBack?: () => void;
}

const NotificationSettings: React.FC<NotificationSettingsProps> = ({ onBack }) => {
  const { settings, updateSettings } = useNotifications();

  const handleSettingChange = (path: string, value: boolean) => {
    const pathParts = path.split('.');
    
    if (pathParts.length === 1) {
      updateSettings({ [pathParts[0]]: value });
    } else if (pathParts.length === 2) {
      updateSettings({
        [pathParts[0]]: {
          ...settings[pathParts[0] as keyof NotificationSettings],
          [pathParts[1]]: value
        }
      });
    }
  };

  const handleTimeChange = (field: 'weekdays' | 'weekends', time: string) => {
    updateSettings({
      quiet_hours: {
        ...settings.quiet_hours,
        [field]: time
      }
    });
  };

  const handleSaveSettings = () => {
    message.success('通知设置已保存');
  };

  const handleResetSettings = () => {
    // Reset to default settings
    const defaultSettings: NotificationSettings = {
      system_notifications: true,
      email_notifications: true,
      sms_notifications: false,
      wechat_notifications: false,
      course_related: {
        new_course: true,
        assignment_deadline: true,
        grade_published: true,
        schedule_change: true,
        peer_activities: false,
      },
      teacher_interaction: {
        teacher_reply: true,
        interview_invitation: true,
        evaluation_feedback: true,
        mentor_activities: false,
        research_group_notifications: false,
      },
      system_messages: {
        system_updates: true,
        security_alerts: true,
        feature_introductions: false,
        maintenance_notices: true,
        marketing_messages: false,
      },
      quiet_hours: {
        weekdays: "22:00-08:00",
        weekends: "20:00-09:00",
        urgent_exception: true,
      },
    };
    
    updateSettings(defaultSettings);
    message.success('已恢复默认设置');
  };

  const parseTimeRange = (timeRange: string) => {
    const [start, end] = timeRange.split('-');
    return {
      start: dayjs(start, 'HH:mm'),
      end: dayjs(end, 'HH:mm')
    };
  };

  const formatTimeRange = (start: dayjs.Dayjs, end: dayjs.Dayjs) => {
    return `${start.format('HH:mm')}-${end.format('HH:mm')}`;
  };

  const weekdayTimes = parseTimeRange(settings.quiet_hours.weekdays);
  const weekendTimes = parseTimeRange(settings.quiet_hours.weekends);

  return (
    <div className="notification-settings">
      <div className="notification-settings__header">
        <Space align="center">
          <SettingOutlined style={{ fontSize: '20px', color: '#1A73E8' }} />
          <Title level={3} style={{ margin: 0 }}>
            通知设置
          </Title>
        </Space>
        
        {onBack && (
          <Button onClick={onBack}>
            返回
          </Button>
        )}
      </div>

      <div className="notification-settings__content">
        {/* Notification Methods */}
        <Card className="settings-card">
          <Title level={4}>
            <BellOutlined style={{ marginRight: 8, color: '#1A73E8' }} />
            通知方式设置
          </Title>
          
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12}>
              <div className="setting-item">
                <div className="setting-item__content">
                  <BellOutlined style={{ marginRight: 8 }} />
                  <div>
                    <div className="setting-item__title">系统内通知</div>
                    <div className="setting-item__description">在平台内显示通知消息</div>
                  </div>
                </div>
                <Switch
                  checked={settings.system_notifications}
                  onChange={(checked) => handleSettingChange('system_notifications', checked)}
                />
              </div>
            </Col>
            
            <Col xs={24} sm={12}>
              <div className="setting-item">
                <div className="setting-item__content">
                  <MailOutlined style={{ marginRight: 8 }} />
                  <div>
                    <div className="setting-item__title">邮件通知</div>
                    <div className="setting-item__description">发送邮件到注册邮箱</div>
                  </div>
                </div>
                <Switch
                  checked={settings.email_notifications}
                  onChange={(checked) => handleSettingChange('email_notifications', checked)}
                />
              </div>
            </Col>
            
            <Col xs={24} sm={12}>
              <div className="setting-item">
                <div className="setting-item__content">
                  <MessageOutlined style={{ marginRight: 8 }} />
                  <div>
                    <div className="setting-item__title">短信通知</div>
                    <div className="setting-item__description">发送短信到手机号码</div>
                  </div>
                </div>
                <Switch
                  checked={settings.sms_notifications}
                  onChange={(checked) => handleSettingChange('sms_notifications', checked)}
                />
              </div>
            </Col>
            
            <Col xs={24} sm={12}>
              <div className="setting-item">
                <div className="setting-item__content">
                  <WechatOutlined style={{ marginRight: 8 }} />
                  <div>
                    <div className="setting-item__title">微信推送</div>
                    <div className="setting-item__description">推送到微信公众号</div>
                  </div>
                </div>
                <Switch
                  checked={settings.wechat_notifications}
                  onChange={(checked) => handleSettingChange('wechat_notifications', checked)}
                />
              </div>
            </Col>
          </Row>
        </Card>

        {/* Course Related Notifications */}
        <Card className="settings-card">
          <Title level={4}>
            <BookOutlined style={{ marginRight: 8, color: '#4CAF50' }} />
            课程相关
          </Title>
          
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12}>
              <div className="setting-item">
                <div className="setting-item__content">
                  <div>
                    <div className="setting-item__title">新课程发布</div>
                    <div className="setting-item__description">有新课程发布时通知</div>
                  </div>
                </div>
                <Switch
                  checked={settings.course_related.new_course}
                  onChange={(checked) => handleSettingChange('course_related.new_course', checked)}
                />
              </div>
            </Col>
            
            <Col xs={24} sm={12}>
              <div className="setting-item">
                <div className="setting-item__content">
                  <div>
                    <div className="setting-item__title">作业截止提醒</div>
                    <div className="setting-item__description">作业即将截止时提醒</div>
                  </div>
                </div>
                <Switch
                  checked={settings.course_related.assignment_deadline}
                  onChange={(checked) => handleSettingChange('course_related.assignment_deadline', checked)}
                />
              </div>
            </Col>
            
            <Col xs={24} sm={12}>
              <div className="setting-item">
                <div className="setting-item__content">
                  <div>
                    <div className="setting-item__title">成绩公布</div>
                    <div className="setting-item__description">成绩发布时通知</div>
                  </div>
                </div>
                <Switch
                  checked={settings.course_related.grade_published}
                  onChange={(checked) => handleSettingChange('course_related.grade_published', checked)}
                />
              </div>
            </Col>
            
            <Col xs={24} sm={12}>
              <div className="setting-item">
                <div className="setting-item__content">
                  <div>
                    <div className="setting-item__title">课程安排变更</div>
                    <div className="setting-item__description">课程时间地点变更通知</div>
                  </div>
                </div>
                <Switch
                  checked={settings.course_related.schedule_change}
                  onChange={(checked) => handleSettingChange('course_related.schedule_change', checked)}
                />
              </div>
            </Col>
            
            <Col xs={24} sm={12}>
              <div className="setting-item">
                <div className="setting-item__content">
                  <div>
                    <div className="setting-item__title">同学动态</div>
                    <div className="setting-item__description">同学完成作业等动态</div>
                  </div>
                </div>
                <Switch
                  checked={settings.course_related.peer_activities}
                  onChange={(checked) => handleSettingChange('course_related.peer_activities', checked)}
                />
              </div>
            </Col>
          </Row>
        </Card>

        {/* Teacher Interaction */}
        <Card className="settings-card">
          <Title level={4}>
            <UserOutlined style={{ marginRight: 8, color: '#FF9800' }} />
            教师互动
          </Title>
          
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12}>
              <div className="setting-item">
                <div className="setting-item__content">
                  <div>
                    <div className="setting-item__title">教师回复</div>
                    <div className="setting-item__description">教师回复问题时通知</div>
                  </div>
                </div>
                <Switch
                  checked={settings.teacher_interaction.teacher_reply}
                  onChange={(checked) => handleSettingChange('teacher_interaction.teacher_reply', checked)}
                />
              </div>
            </Col>
            
            <Col xs={24} sm={12}>
              <div className="setting-item">
                <div className="setting-item__content">
                  <div>
                    <div className="setting-item__title">面试邀请</div>
                    <div className="setting-item__description">收到面试邀请时通知</div>
                  </div>
                </div>
                <Switch
                  checked={settings.teacher_interaction.interview_invitation}
                  onChange={(checked) => handleSettingChange('teacher_interaction.interview_invitation', checked)}
                />
              </div>
            </Col>
            
            <Col xs={24} sm={12}>
              <div className="setting-item">
                <div className="setting-item__content">
                  <div>
                    <div className="setting-item__title">评价反馈</div>
                    <div className="setting-item__description">收到评价反馈时通知</div>
                  </div>
                </div>
                <Switch
                  checked={settings.teacher_interaction.evaluation_feedback}
                  onChange={(checked) => handleSettingChange('teacher_interaction.evaluation_feedback', checked)}
                />
              </div>
            </Col>
            
            <Col xs={24} sm={12}>
              <div className="setting-item">
                <div className="setting-item__content">
                  <div>
                    <div className="setting-item__title">导师动态</div>
                    <div className="setting-item__description">导师发布动态时通知</div>
                  </div>
                </div>
                <Switch
                  checked={settings.teacher_interaction.mentor_activities}
                  onChange={(checked) => handleSettingChange('teacher_interaction.mentor_activities', checked)}
                />
              </div>
            </Col>
            
            <Col xs={24} sm={12}>
              <div className="setting-item">
                <div className="setting-item__content">
                  <div>
                    <div className="setting-item__title">研究组通知</div>
                    <div className="setting-item__description">研究组相关通知</div>
                  </div>
                </div>
                <Switch
                  checked={settings.teacher_interaction.research_group_notifications}
                  onChange={(checked) => handleSettingChange('teacher_interaction.research_group_notifications', checked)}
                />
              </div>
            </Col>
          </Row>
        </Card>

        {/* System Messages */}
        <Card className="settings-card">
          <Title level={4}>
            <SettingOutlined style={{ marginRight: 8, color: '#7C4DFF' }} />
            系统消息
          </Title>
          
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12}>
              <div className="setting-item">
                <div className="setting-item__content">
                  <div>
                    <div className="setting-item__title">系统更新</div>
                    <div className="setting-item__description">系统功能更新通知</div>
                  </div>
                </div>
                <Switch
                  checked={settings.system_messages.system_updates}
                  onChange={(checked) => handleSettingChange('system_messages.system_updates', checked)}
                />
              </div>
            </Col>
            
            <Col xs={24} sm={12}>
              <div className="setting-item">
                <div className="setting-item__content">
                  <div>
                    <div className="setting-item__title">安全提醒</div>
                    <div className="setting-item__description">账户安全相关提醒</div>
                  </div>
                </div>
                <Switch
                  checked={settings.system_messages.security_alerts}
                  onChange={(checked) => handleSettingChange('system_messages.security_alerts', checked)}
                />
              </div>
            </Col>
            
            <Col xs={24} sm={12}>
              <div className="setting-item">
                <div className="setting-item__content">
                  <div>
                    <div className="setting-item__title">功能介绍</div>
                    <div className="setting-item__description">新功能介绍和使用指南</div>
                  </div>
                </div>
                <Switch
                  checked={settings.system_messages.feature_introductions}
                  onChange={(checked) => handleSettingChange('system_messages.feature_introductions', checked)}
                />
              </div>
            </Col>
            
            <Col xs={24} sm={12}>
              <div className="setting-item">
                <div className="setting-item__content">
                  <div>
                    <div className="setting-item__title">维护通知</div>
                    <div className="setting-item__description">系统维护时间通知</div>
                  </div>
                </div>
                <Switch
                  checked={settings.system_messages.maintenance_notices}
                  onChange={(checked) => handleSettingChange('system_messages.maintenance_notices', checked)}
                />
              </div>
            </Col>
            
            <Col xs={24} sm={12}>
              <div className="setting-item">
                <div className="setting-item__content">
                  <div>
                    <div className="setting-item__title">营销信息</div>
                    <div className="setting-item__description">活动推广等营销信息</div>
                  </div>
                </div>
                <Switch
                  checked={settings.system_messages.marketing_messages}
                  onChange={(checked) => handleSettingChange('system_messages.marketing_messages', checked)}
                />
              </div>
            </Col>
          </Row>
        </Card>

        {/* Quiet Hours */}
        <Card className="settings-card">
          <Title level={4}>
            <ClockCircleOutlined style={{ marginRight: 8, color: '#F44336' }} />
            免打扰时间
          </Title>
          
          <div className="quiet-hours-settings">
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={12}>
                <div className="time-setting">
                  <Text strong>周一至周五:</Text>
                  <Space>
                    <TimePicker
                      value={weekdayTimes.start}
                      format="HH:mm"
                      onChange={(time) => {
                        if (time) {
                          const newRange = formatTimeRange(time, weekdayTimes.end);
                          handleTimeChange('weekdays', newRange);
                        }
                      }}
                    />
                    <Text>至</Text>
                    <TimePicker
                      value={weekdayTimes.end}
                      format="HH:mm"
                      onChange={(time) => {
                        if (time) {
                          const newRange = formatTimeRange(weekdayTimes.start, time);
                          handleTimeChange('weekdays', newRange);
                        }
                      }}
                    />
                  </Space>
                </div>
              </Col>
              
              <Col xs={24} sm={12}>
                <div className="time-setting">
                  <Text strong>周末节假日:</Text>
                  <Space>
                    <TimePicker
                      value={weekendTimes.start}
                      format="HH:mm"
                      onChange={(time) => {
                        if (time) {
                          const newRange = formatTimeRange(time, weekendTimes.end);
                          handleTimeChange('weekends', newRange);
                        }
                      }}
                    />
                    <Text>至</Text>
                    <TimePicker
                      value={weekendTimes.end}
                      format="HH:mm"
                      onChange={(time) => {
                        if (time) {
                          const newRange = formatTimeRange(weekendTimes.start, time);
                          handleTimeChange('weekends', newRange);
                        }
                      }}
                    />
                  </Space>
                </div>
              </Col>
            </Row>
            
            <div className="setting-item" style={{ marginTop: 16 }}>
              <div className="setting-item__content">
                <div>
                  <div className="setting-item__title">紧急通知除外</div>
                  <div className="setting-item__description">即使在免打扰时间也接收紧急通知</div>
                </div>
              </div>
              <Switch
                checked={settings.quiet_hours.urgent_exception}
                onChange={(checked) => handleSettingChange('quiet_hours.urgent_exception', checked)}
              />
            </div>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="notification-settings__actions">
          <Space>
            <Button type="primary" onClick={handleSaveSettings}>
              保存设置
            </Button>
            <Button onClick={handleResetSettings}>
              恢复默认
            </Button>
          </Space>
        </div>
      </div>
    </div>
  );
};

export default NotificationSettings;