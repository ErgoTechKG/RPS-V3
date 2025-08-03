import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Checkbox, Card, Alert, Typography, Space, Modal } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts';
import './style.css';

const { Title, Text, Link } = Typography;

interface LoginFormValues {
  username: string;
  password: string;
  remember: boolean;
}

interface ForgotPasswordFormValues {
  email: string;
}

const MAX_LOGIN_ATTEMPTS = 5;
const LOCKOUT_DURATION = 15 * 60 * 1000; // 15 minutes in milliseconds

const LoginPage: React.FC = () => {
  const [form] = Form.useForm<LoginFormValues>();
  const [forgotPasswordForm] = Form.useForm<ForgotPasswordFormValues>();
  const navigate = useNavigate();
  const { login, loading, user } = useAuth();
  const [error, setError] = useState<string>('');
  const [loginAttempts, setLoginAttempts] = useState<number>(0);
  const [lockoutTime, setLockoutTime] = useState<number | null>(null);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotPasswordLoading, setForgotPasswordLoading] = useState(false);
  const [forgotPasswordSuccess, setForgotPasswordSuccess] = useState(false);

  // Check if account is locked
  useEffect(() => {
    const storedAttempts = localStorage.getItem('loginAttempts');
    const storedLockoutTime = localStorage.getItem('lockoutTime');
    
    if (storedAttempts) {
      setLoginAttempts(parseInt(storedAttempts));
    }
    
    if (storedLockoutTime) {
      const lockoutEndTime = parseInt(storedLockoutTime);
      if (Date.now() < lockoutEndTime) {
        setLockoutTime(lockoutEndTime);
      } else {
        // Clear lockout if time has passed
        localStorage.removeItem('lockoutTime');
        localStorage.removeItem('loginAttempts');
        setLoginAttempts(0);
      }
    }
  }, []);

  // Update lockout timer
  useEffect(() => {
    if (lockoutTime && Date.now() < lockoutTime) {
      const timer = setInterval(() => {
        if (Date.now() >= lockoutTime) {
          setLockoutTime(null);
          setLoginAttempts(0);
          localStorage.removeItem('lockoutTime');
          localStorage.removeItem('loginAttempts');
        }
      }, 1000);
      
      return () => clearInterval(timer);
    }
  }, [lockoutTime]);

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate(`/dashboard/${user.role}`);
    }
  }, [user, navigate]);

  const getRemainingLockoutTime = () => {
    if (!lockoutTime) return 0;
    const remaining = Math.max(0, lockoutTime - Date.now());
    return Math.ceil(remaining / 1000 / 60); // Convert to minutes
  };

  const handleLogin = async (values: LoginFormValues) => {
    if (lockoutTime && Date.now() < lockoutTime) {
      setError(`账户已锁定，请在 ${getRemainingLockoutTime()} 分钟后重试`);
      return;
    }

    try {
      setError('');
      
      // Check test mode credentials
      const testMode = import.meta.env.VITE_TEST_MODE === 'true';
      const validCredentials = testMode && checkTestCredentials(values.username, values.password);
      
      if (!testMode || validCredentials) {
        await login(values.username, values.password);
        
        // Clear login attempts on successful login
        setLoginAttempts(0);
        localStorage.removeItem('loginAttempts');
        
        // Handle remember me
        if (values.remember) {
          localStorage.setItem('rememberMe', 'true');
          localStorage.setItem('username', values.username);
        } else {
          localStorage.removeItem('rememberMe');
          localStorage.removeItem('username');
        }
        
        // Set token with expiration
        const tokenExpiry = values.remember ? 7 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000; // 7 days or 1 day
        const expiryTime = Date.now() + tokenExpiry;
        localStorage.setItem('tokenExpiry', expiryTime.toString());
        
        navigate('/');
      } else {
        throw new Error('用户名或密码错误');
      }
    } catch (err) {
      const attempts = loginAttempts + 1;
      setLoginAttempts(attempts);
      localStorage.setItem('loginAttempts', attempts.toString());
      
      if (attempts >= MAX_LOGIN_ATTEMPTS) {
        const lockoutEndTime = Date.now() + LOCKOUT_DURATION;
        setLockoutTime(lockoutEndTime);
        localStorage.setItem('lockoutTime', lockoutEndTime.toString());
        setError(`登录失败次数过多，账户已锁定 ${LOCKOUT_DURATION / 60 / 1000} 分钟`);
      } else {
        setError(`用户名或密码错误 (剩余尝试次数: ${MAX_LOGIN_ATTEMPTS - attempts})`);
      }
    }
  };

  const checkTestCredentials = (username: string, password: string): boolean => {
    const testAccounts = [
      { username: 'professor1', password: 'password123' },
      { username: 'student1', password: 'password123' },
      { username: 'secretary1', password: 'password123' },
      { username: 'leader1', password: 'password123' },
    ];
    
    return testAccounts.some(account => 
      account.username === username && account.password === password
    );
  };

  const handleForgotPassword = async (values: ForgotPasswordFormValues) => {
    setForgotPasswordLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In production, this would send an email
      console.log('Password reset email sent to:', values.email);
      
      setForgotPasswordSuccess(true);
      forgotPasswordForm.resetFields();
      
      // Auto close modal after success
      setTimeout(() => {
        setShowForgotPassword(false);
        setForgotPasswordSuccess(false);
      }, 3000);
    } catch (error) {
      setError('发送重置邮件失败，请稍后重试');
    } finally {
      setForgotPasswordLoading(false);
    }
  };

  // Load remembered username
  useEffect(() => {
    const rememberMe = localStorage.getItem('rememberMe');
    const username = localStorage.getItem('username');
    
    if (rememberMe === 'true' && username) {
      form.setFieldsValue({
        username,
        remember: true,
      });
    }
  }, [form]);

  const isAccountLocked = lockoutTime && Date.now() < lockoutTime;

  return (
    <div className="login-container">
      <Card className="login-card">
        <div className="login-header">
          <Title level={2}>本科生科研课程管理系统</Title>
          <Text type="secondary">请登录您的账户</Text>
        </div>

        {error && (
          <Alert
            message={error}
            type="error"
            showIcon
            closable
            onClose={() => setError('')}
            style={{ marginBottom: 16 }}
          />
        )}

        <Form
          form={form}
          name="login"
          onFinish={handleLogin}
          autoComplete="off"
          layout="vertical"
          size="large"
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: '请输入用户名!' }]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="用户名"
              disabled={isAccountLocked}
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: '请输入密码!' }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="密码"
              disabled={isAccountLocked}
            />
          </Form.Item>

          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox disabled={isAccountLocked}>记住我</Checkbox>
            </Form.Item>
            <Link
              style={{ float: 'right' }}
              onClick={() => setShowForgotPassword(true)}
              disabled={isAccountLocked}
            >
              忘记密码？
            </Link>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              loading={loading}
              disabled={isAccountLocked}
            >
              {isAccountLocked ? `账户已锁定 (${getRemainingLockoutTime()} 分钟)` : '登录'}
            </Button>
          </Form.Item>
        </Form>

        {import.meta.env.VITE_TEST_MODE === 'true' && (
          <Alert
            message="测试模式"
            description={
              <Space direction="vertical" size="small">
                <Text>测试账号：</Text>
                <Text code>教授: professor1 / password123</Text>
                <Text code>学生: student1 / password123</Text>
                <Text code>秘书: secretary1 / password123</Text>
                <Text code>领导: leader1 / password123</Text>
              </Space>
            }
            type="info"
            showIcon
          />
        )}
      </Card>

      <Modal
        title="找回密码"
        open={showForgotPassword}
        onCancel={() => {
          setShowForgotPassword(false);
          setForgotPasswordSuccess(false);
          forgotPasswordForm.resetFields();
        }}
        footer={null}
      >
        {forgotPasswordSuccess ? (
          <Alert
            message="重置邮件已发送"
            description="请检查您的邮箱并按照邮件中的说明重置密码"
            type="success"
            showIcon
          />
        ) : (
          <Form
            form={forgotPasswordForm}
            name="forgotPassword"
            onFinish={handleForgotPassword}
            layout="vertical"
          >
            <Form.Item
              name="email"
              rules={[
                { required: true, message: '请输入邮箱!' },
                { type: 'email', message: '请输入有效的邮箱地址!' }
              ]}
            >
              <Input
                prefix={<MailOutlined />}
                placeholder="请输入您的注册邮箱"
              />
            </Form.Item>

            <Form.Item>
              <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
                <Button onClick={() => setShowForgotPassword(false)}>
                  取消
                </Button>
                <Button type="primary" htmlType="submit" loading={forgotPasswordLoading}>
                  发送重置邮件
                </Button>
              </Space>
            </Form.Item>
          </Form>
        )}
      </Modal>
    </div>
  );
};

export default LoginPage;