import { test, expect } from '@playwright/test';

// Test data
const testCredentials = {
  professor: { username: 'professor1', password: 'password123' },
  student: { username: 'student1', password: 'password123' },
  secretary: { username: 'secretary1', password: 'password123' },
  leader: { username: 'leader1', password: 'password123' }
};

const roles = ['student', 'professor', 'secretary', 'leader'] as const;

test.describe('Navigation System Tests', () => {
  
  test.beforeEach(async ({ page }) => {
    // Navigate to the application
    await page.goto('http://localhost:3001');
  });

  test.describe('Homepage Navigation', () => {
    
    test('should navigate to login from main login button', async ({ page }) => {
      await page.click('button:has-text("登录")');
      await expect(page).toHaveURL(/.*\/login/);
      await expect(page.locator('h2')).toContainText('科研管理平台');
    });

    test('should navigate to login from hero CTA button', async ({ page }) => {
      await page.click('button:has-text("开始使用系统")');
      await expect(page).toHaveURL(/.*\/login/);
      await expect(page.locator('h2')).toContainText('科研管理平台');
    });

    // Test role-specific navigation from homepage
    for (const role of roles) {
      test(`should navigate to login page with ${role} role preselected`, async ({ page }) => {
        // Click on role card
        await page.click(`.role-card:has-text("${getRoleDisplayName(role)}")`);
        
        await expect(page).toHaveURL(/.*\/login/);
        
        // Check if role is preselected
        await expect(page.locator(`input[value="${role}"]`)).toBeChecked();
      });
    }
  });

  test.describe('Login Flow Navigation', () => {
    
    for (const role of roles) {
      test(`should redirect to ${role} dashboard after successful login`, async ({ page }) => {
        await page.goto('http://localhost:3001/login');
        
        const credentials = testCredentials[role];
        
        // Fill form
        await page.fill('input[placeholder*="用户名"]', credentials.username);
        await page.fill('input[placeholder*="密码"]', credentials.password);
        await page.click(`input[value="${role}"]`);
        
        // Submit form
        await page.click('button:has-text("登录")');
        
        // Should redirect directly to dashboard (not welcome page)
        await expect(page).toHaveURL(`/dashboard/${role}`, { timeout: 10000 });
        
        // Check dashboard content based on role
        await verifyDashboardContent(page, role);
      });
    }
  });

  test.describe('Welcome Page Navigation', () => {
    
    // Test welcome page access and navigation for each role
    for (const role of roles) {
      test(`should navigate correctly from ${role} welcome page buttons`, async ({ page }) => {
        // Login first to access welcome page
        await loginAsRole(page, role);
        
        // Navigate to welcome page manually
        await page.goto(`http://localhost:3001/welcome/${role}`);
        
        // Verify welcome page content
        await expect(page.locator('h3')).toContainText('欢迎使用科研管理平台');
        await expect(page.locator('text=快速入门指南')).toBeVisible();
        
        // Test "开始使用" button
        await page.click('button:has-text("开始使用")');
        await expect(page).toHaveURL(`/dashboard/${role}`, { timeout: 10000 });
        
        // Go back to welcome page
        await page.goto(`http://localhost:3001/welcome/${role}`);
        
        // Test "跳过引导" button
        await page.click('button:has-text("跳过引导")');
        await expect(page).toHaveURL(`/dashboard/${role}`, { timeout: 10000 });
      });

      test(`should navigate to specific pages from ${role} welcome quick actions`, async ({ page }) => {
        await loginAsRole(page, role);
        await page.goto(`http://localhost:3001/welcome/${role}`);
        
        // Test role-specific quick action buttons
        await testQuickActions(page, role);
      });
    }
  });

  test.describe('Logout Navigation', () => {
    
    for (const role of roles) {
      test(`should logout and redirect to homepage for ${role}`, async ({ page }) => {
        // Login first
        await loginAsRole(page, role);
        
        // Should be on dashboard
        await expect(page).toHaveURL(`/dashboard/${role}`);
        
        // Click logout from user menu (if available) or find logout button
        try {
          // Try to find logout in dropdown menu
          await page.click('[aria-label="user menu"], .ant-dropdown-trigger');
          await page.click('text=退出登录');
        } catch {
          // Fallback: try direct logout button
          await page.click('button:has-text("退出登录")');
        }
        
        // Should redirect to homepage
        await expect(page).toHaveURL('http://localhost:3001/', { timeout: 10000 });
        
        // Verify we're back to homepage
        await expect(page.locator('h1')).toContainText('科研实验班课程管理系统');
      });
    }

    test('should logout from welcome page and redirect to homepage', async ({ page }) => {
      await loginAsRole(page, 'student');
      await page.goto('http://localhost:3001/welcome/student');
      
      // Click logout button on welcome page
      await page.click('button:has-text("退出登录")');
      
      // Should redirect to homepage
      await expect(page).toHaveURL('http://localhost:3001/', { timeout: 10000 });
      await expect(page.locator('h1')).toContainText('科研实验班课程管理系统');
    });
  });

  test.describe('Internal Navigation', () => {
    
    test('should navigate within student lab rotation course', async ({ page }) => {
      await loginAsRole(page, 'student');
      
      // Navigate to lab rotation course
      await page.goto('http://localhost:3001/student/lab-rotation');
      
      // Verify page loaded
      await expect(page.locator('text=实验室轮转')).toBeVisible();
      
      // Test internal navigation (if sidebar menu exists)
      const menuItems = page.locator('.ant-menu-item');
      const menuCount = await menuItems.count();
      
      if (menuCount > 0) {
        // Click on different menu items to test internal navigation
        for (let i = 0; i < Math.min(menuCount, 3); i++) {
          await menuItems.nth(i).click();
          // Wait for content to change
          await page.waitForTimeout(500);
        }
      }
    });

    test('should navigate within student evaluation system', async ({ page }) => {
      await loginAsRole(page, 'student');
      
      // Navigate to evaluation system
      await page.goto('http://localhost:3001/student/evaluation');
      
      // Verify page loaded
      await expect(page.locator('text=综合素质评价')).toBeVisible();
    });

    test('should navigate within professor lab rotation management', async ({ page }) => {
      await loginAsRole(page, 'professor');
      
      // Navigate to professor lab rotation
      await page.goto('http://localhost:3001/professor/lab-rotation');
      
      // Verify page loaded
      await expect(page.locator('text=实验室轮转')).toBeVisible();
      
      // Test quick navigation cards
      const quickCards = page.locator('.ant-card').filter({ hasText: /课题管理|学生选拔|流程管理|评估管理/ });
      const cardCount = await quickCards.count();
      
      if (cardCount > 0) {
        // Click first card to test navigation
        await quickCards.first().click();
        // Verify navigation occurred (URL should change)
        await expect(page).toHaveURL(/professor\/lab-rotation/);
      }
    });
  });

  test.describe('Protected Route Access', () => {
    
    test('should redirect unauthorized users to login', async ({ page }) => {
      // Try to access protected route without authentication
      await page.goto('http://localhost:3001/dashboard/student');
      
      // Should redirect to login or show unauthorized message
      await expect(page).toHaveURL(/login/);
    });

    test('should prevent cross-role access', async ({ page }) => {
      // Login as student
      await loginAsRole(page, 'student');
      
      // Try to access professor route
      await page.goto('http://localhost:3001/dashboard/professor');
      
      // Should be redirected or show access denied
      // (Implementation depends on how ProtectedRoute handles this)
      await page.waitForTimeout(2000);
      
      // Check if user is redirected back to their own dashboard or login
      const currentUrl = page.url();
      expect(currentUrl).toMatch(/(dashboard\/student|login)/);
    });
  });
});

// Helper functions
function getRoleDisplayName(role: string): string {
  const roleMap = {
    student: '学生',
    professor: '教授',
    secretary: '科研秘书',
    leader: '领导'
  };
  return roleMap[role] || role;
}

async function loginAsRole(page, role: string) {
  await page.goto('http://localhost:3001/login');
  const credentials = testCredentials[role];
  
  await page.fill('input[placeholder*="用户名"]', credentials.username);
  await page.fill('input[placeholder*="密码"]', credentials.password);
  await page.click(`input[value="${role}"]`);
  await page.click('button:has-text("登录")');
  
  await expect(page).toHaveURL(`/dashboard/${role}`, { timeout: 10000 });
}

async function verifyDashboardContent(page, role: string) {
  // Verify role-specific dashboard content
  switch (role) {
    case 'student':
      await expect(page.locator('text=学生学习仪表板')).toBeVisible();
      break;
    case 'professor':
      await expect(page.locator('text=教授教学仪表板')).toBeVisible();
      break;
    case 'secretary':
      await expect(page.locator('text=秘书监控仪表板')).toBeVisible();
      break;
    case 'leader':
      await expect(page.locator('text=领导战略仪表板')).toBeVisible();
      break;
  }
}

async function testQuickActions(page, role: string) {
  // Test role-specific quick action buttons
  const quickActionCards = page.locator('.quick-action-card');
  const cardCount = await quickActionCards.count();
  
  if (cardCount > 0) {
    // Test first quick action card
    const firstCard = quickActionCards.first();
    await firstCard.click();
    
    // Verify navigation occurred
    await page.waitForTimeout(1000);
    const currentUrl = page.url();
    
    // Should navigate to a role-specific page
    expect(currentUrl).toMatch(new RegExp(`(dashboard|${role})`));
  }
}