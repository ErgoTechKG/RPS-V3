import { test, expect } from '@playwright/test';

// Test data
const testCredentials = {
  professor: { username: 'professor1', password: 'password123' },
  student: { username: 'student1', password: 'password123' },
  secretary: { username: 'secretary1', password: 'password123' },
  leader: { username: 'leader1', password: 'password123' }
};

const roles = ['student', 'professor', 'secretary', 'leader'] as const;

test.describe('Authentication System Tests', () => {
  
  test.beforeEach(async ({ page }) => {
    // Navigate to the application
    await page.goto('http://localhost:3001');
  });

  test('should display homepage correctly', async ({ page }) => {
    // Check main elements are visible
    await expect(page.locator('h1')).toContainText('科研实验班课程管理系统');
    await expect(page.locator('button', { hasText: '登录' })).toBeVisible();
    
    // Check role cards are present
    await expect(page.locator('text=选择您的角色')).toBeVisible();
    await expect(page.locator('text=教授')).toBeVisible();
    await expect(page.locator('text=学生')).toBeVisible();
    await expect(page.locator('text=科研秘书')).toBeVisible();
    await expect(page.locator('text=领导')).toBeVisible();
  });

  test('should navigate to login page from homepage', async ({ page }) => {
    await page.click('button:has-text("登录")');
    await expect(page).toHaveURL(/.*\/login/);
    await expect(page.locator('h2')).toContainText('科研管理平台');
  });

  test('should navigate to login page with role preselected', async ({ page }) => {
    // Click on student role card
    await page.click('[data-testid="role-card-student"], .role-card:has-text("学生")');
    
    await expect(page).toHaveURL(/.*\/login/);
    
    // Check if student role is preselected
    await expect(page.locator('input[value="student"]')).toBeChecked();
  });

  test('should show login form with all required fields', async ({ page }) => {
    await page.goto('http://localhost:3001/login');
    
    // Check form elements
    await expect(page.locator('input[placeholder*="用户名"]')).toBeVisible();
    await expect(page.locator('input[placeholder*="密码"]')).toBeVisible();
    
    // Check role selection
    await expect(page.locator('input[value="student"]')).toBeVisible();
    await expect(page.locator('input[value="professor"]')).toBeVisible();
    await expect(page.locator('input[value="secretary"]')).toBeVisible();
    await expect(page.locator('input[value="leader"]')).toBeVisible();
    
    // Check checkboxes
    await expect(page.locator('text=记住我')).toBeVisible();
    await expect(page.locator('text=同意用户协议和隐私政策')).toBeVisible();
    
    // Check third-party login buttons
    await expect(page.locator('button:has-text("微信")')).toBeVisible();
    await expect(page.locator('button:has-text("钉钉")')).toBeVisible();
    await expect(page.locator('button:has-text("统一认证")')).toBeVisible();
  });

  test('should show validation errors for empty form', async ({ page }) => {
    await page.goto('http://localhost:3001/login');
    
    // Try to submit empty form
    await page.click('button:has-text("登录")');
    
    // Check validation messages
    await expect(page.locator('text=请输入用户名或工号')).toBeVisible();
    await expect(page.locator('text=请输入密码')).toBeVisible();
    await expect(page.locator('text=请选择您的角色')).toBeVisible();
  });

  test('should show validation errors for invalid input', async ({ page }) => {
    await page.goto('http://localhost:3001/login');
    
    // Enter invalid short values
    await page.fill('input[placeholder*="用户名"]', 'ab');
    await page.fill('input[placeholder*="密码"]', '123');
    
    await page.click('button:has-text("登录")');
    
    // Check validation messages
    await expect(page.locator('text=用户名至少3个字符')).toBeVisible();
    await expect(page.locator('text=密码至少6个字符')).toBeVisible();
  });

  // Test login for each role
  for (const role of roles) {
    test(`should login successfully as ${role}`, async ({ page }) => {
      await page.goto('http://localhost:3001/login');
      
      const credentials = testCredentials[role];
      
      // Fill form
      await page.fill('input[placeholder*="用户名"]', credentials.username);
      await page.fill('input[placeholder*="密码"]', credentials.password);
      await page.click(`input[value="${role}"]`);
      
      // Submit form
      await page.click('button:has-text("登录")');
      
      // Should redirect to welcome page
      await expect(page).toHaveURL(`/welcome/${role}`, { timeout: 10000 });
      
      // Check welcome page content
      await expect(page.locator('h3')).toContainText('欢迎使用科研管理平台');
      await expect(page.locator('text=快速入门指南')).toBeVisible();
    });

    test(`should redirect to dashboard from welcome page for ${role}`, async ({ page }) => {
      // Login first
      await page.goto('http://localhost:3001/login');
      const credentials = testCredentials[role];
      
      await page.fill('input[placeholder*="用户名"]', credentials.username);
      await page.fill('input[placeholder*="密码"]', credentials.password);
      await page.click(`input[value="${role}"]`);
      await page.click('button:has-text("登录")');
      
      await expect(page).toHaveURL(`/welcome/${role}`, { timeout: 10000 });
      
      // Click "开始使用" button
      await page.click('button:has-text("开始使用")');
      
      // Should redirect to dashboard
      await expect(page).toHaveURL(`/dashboard/${role}`, { timeout: 10000 });
      
      // Check dashboard content based on role
      if (role === 'student') {
        await expect(page.locator('text=学生学习仪表板')).toBeVisible();
        await expect(page.locator('text=我的课程')).toBeVisible();
      } else if (role === 'professor') {
        await expect(page.locator('text=教授教学仪表板')).toBeVisible();
        await expect(page.locator('text=课程管理')).toBeVisible();
      } else if (role === 'secretary') {
        await expect(page.locator('text=秘书监控仪表板')).toBeVisible();
        await expect(page.locator('text=系统监控')).toBeVisible();
      } else if (role === 'leader') {
        await expect(page.locator('text=领导战略仪表板')).toBeVisible();
        await expect(page.locator('text=战略分析')).toBeVisible();
      }
    });
  }

  test('should handle login failure correctly', async ({ page }) => {
    await page.goto('http://localhost:3001/login');
    
    // Enter invalid credentials
    await page.fill('input[placeholder*="用户名"]', 'wronguser');
    await page.fill('input[placeholder*="密码"]', 'wrongpass');
    await page.click('input[value="student"]');
    
    await page.click('button:has-text("登录")');
    
    // Check error message
    await expect(page.locator('.ant-alert-error')).toBeVisible();
    await expect(page.locator('text=用户名或密码错误')).toBeVisible();
  });

  test('should handle account lockout after multiple failures', async ({ page }) => {
    await page.goto('http://localhost:3001/login');
    
    // Try to login with wrong credentials multiple times
    for (let i = 0; i < 5; i++) {
      await page.fill('input[placeholder*="用户名"]', 'wronguser');
      await page.fill('input[placeholder*="密码"]', 'wrongpass');
      await page.click('input[value="student"]');
      await page.click('button:has-text("登录")');
      
      // Wait for error message
      await page.waitForSelector('.ant-alert-error');
      
      // Clear error before next attempt
      if (i < 4) {
        await page.click('.ant-alert-close-icon');
      }
    }
    
    // Check lockout message
    await expect(page.locator('text=登录失败次数过多，账户已锁定')).toBeVisible();
    await expect(page.locator('button:disabled:has-text("账户已锁定")')).toBeVisible();
  });

  test('should remember login credentials when checked', async ({ page }) => {
    await page.goto('http://localhost:3001/login');
    
    // Fill form and check "记住我"
    await page.fill('input[placeholder*="用户名"]', testCredentials.student.username);
    await page.fill('input[placeholder*="密码"]', testCredentials.student.password);
    await page.click('input[value="student"]');
    await page.check('input[type="checkbox"]:near(:text("记住我"))');
    
    await page.click('button:has-text("登录")');
    
    // Wait for redirect
    await expect(page).toHaveURL(/welcome/, { timeout: 10000 });
    
    // Go back to login page
    await page.goto('http://localhost:3001/login');
    
    // Check if username is remembered
    await expect(page.locator('input[placeholder*="用户名"]')).toHaveValue(testCredentials.student.username);
    await expect(page.locator('input[type="checkbox"]:near(:text("记住我"))')).toBeChecked();
  });

  test('should logout successfully', async ({ page }) => {
    // Login first
    await page.goto('http://localhost:3001/login');
    const credentials = testCredentials.student;
    
    await page.fill('input[placeholder*="用户名"]', credentials.username);
    await page.fill('input[placeholder*="密码"]', credentials.password);
    await page.click('input[value="student"]');
    await page.click('button:has-text("登录")');
    
    await expect(page).toHaveURL('/welcome/student', { timeout: 10000 });
    
    // Logout
    await page.click('button:has-text("退出登录")');
    
    // Should redirect to homepage
    await expect(page).toHaveURL('/', { timeout: 10000 });
    await expect(page.locator('h1')).toContainText('科研实验班课程管理系统');
  });

  test('should protect routes and redirect unauthorized users', async ({ page }) => {
    // Try to access protected route without login
    await page.goto('http://localhost:3001/dashboard/student');
    
    // Should redirect to login
    await expect(page).toHaveURL('/login', { timeout: 10000 });
  });

  test('should redirect users to correct role dashboard', async ({ page }) => {
    // Login as student
    await page.goto('http://localhost:3001/login');
    const credentials = testCredentials.student;
    
    await page.fill('input[placeholder*="用户名"]', credentials.username);
    await page.fill('input[placeholder*="密码"]', credentials.password);
    await page.click('input[value="student"]');
    await page.click('button:has-text("登录")');
    
    await expect(page).toHaveURL('/welcome/student', { timeout: 10000 });
    
    // Try to access professor dashboard
    await page.goto('http://localhost:3001/dashboard/professor');
    
    // Should redirect to student dashboard
    await expect(page).toHaveURL('/dashboard/student', { timeout: 10000 });
  });

  test('should show forgot password modal', async ({ page }) => {
    await page.goto('http://localhost:3001/login');
    
    await page.click('button:has-text("忘记密码")');
    
    // Check modal appears
    await expect(page.locator('.ant-modal-title:has-text("找回密码")')).toBeVisible();
    await expect(page.locator('input[placeholder*="注册邮箱"]')).toBeVisible();
    
    // Test email validation
    await page.click('button:has-text("发送重置邮件")');
    await expect(page.locator('text=请输入邮箱')).toBeVisible();
    
    // Test invalid email
    await page.fill('input[placeholder*="注册邮箱"]', 'invalid-email');
    await page.click('button:has-text("发送重置邮件")');
    await expect(page.locator('text=请输入有效的邮箱地址')).toBeVisible();
    
    // Test valid email
    await page.fill('input[placeholder*="注册邮箱"]', 'test@example.com');
    await page.click('button:has-text("发送重置邮件")');
    
    // Should show success message
    await expect(page.locator('text=重置邮件已发送')).toBeVisible();
  });

  test('should show test mode credentials in development', async ({ page }) => {
    await page.goto('http://localhost:3001/login');
    
    // Check if test mode alert is visible
    await expect(page.locator('.ant-alert:has-text("测试模式")')).toBeVisible();
    await expect(page.locator('text=professor1 / password123')).toBeVisible();
    await expect(page.locator('text=student1 / password123')).toBeVisible();
  });

  test('should handle third-party login buttons', async ({ page }) => {
    await page.goto('http://localhost:3001/login');
    
    // Test WeChat login
    await page.click('button:has-text("微信")');
    await expect(page.locator('text=微信登录功能开发中')).toBeVisible();
    
    // Clear error and test DingTalk
    await page.click('.ant-alert-close-icon');
    await page.click('button:has-text("钉钉")');
    await expect(page.locator('text=钉钉登录功能开发中')).toBeVisible();
    
    // Clear error and test SSO
    await page.click('.ant-alert-close-icon');
    await page.click('button:has-text("统一认证")');
    await expect(page.locator('text=统一认证登录功能开发中')).toBeVisible();
  });

  test('should be responsive on different screen sizes', async ({ page }) => {
    await page.goto('http://localhost:3001/login');
    
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Check elements are still visible and accessible
    await expect(page.locator('input[placeholder*="用户名"]')).toBeVisible();
    await expect(page.locator('input[placeholder*="密码"]')).toBeVisible();
    await expect(page.locator('button:has-text("登录")')).toBeVisible();
    
    // Test tablet viewport  
    await page.setViewportSize({ width: 768, height: 1024 });
    await expect(page.locator('input[placeholder*="用户名"]')).toBeVisible();
    
    // Test desktop viewport
    await page.setViewportSize({ width: 1200, height: 800 });
    await expect(page.locator('input[placeholder*="用户名"]')).toBeVisible();
  });
});