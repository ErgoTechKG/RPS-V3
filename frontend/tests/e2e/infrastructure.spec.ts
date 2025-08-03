import { test, expect } from '@playwright/test';

test.describe('Frontend Infrastructure', () => {
  test('app loads successfully', async ({ page }) => {
    await page.goto('/');
    
    // Check that the page loads without errors
    await expect(page).toHaveTitle(/研究生过程管理系统/);
    
    // Check that Ant Design ConfigProvider is working
    const appContainer = page.locator('#root');
    await expect(appContainer).toBeVisible();
  });

  test('theme system is initialized', async ({ page }) => {
    await page.goto('/');
    
    // Check that Ant Design styles are loaded
    const antStyles = await page.locator('style[data-antd-cssinjs]').count();
    expect(antStyles).toBeGreaterThan(0);
    
    // Check that the app renders with Chinese locale
    const title = page.locator('h1');
    await expect(title).toContainText('研究生过程管理系统');
  });

  test('dark mode toggle works', async ({ page }) => {
    await page.goto('/');
    
    // Get initial theme
    const initialBodyClass = await page.locator('body').getAttribute('class');
    
    // Click theme toggle button
    const themeToggle = page.locator('button[aria-label="Toggle theme"]');
    await themeToggle.click();
    
    // Wait for theme to change
    await page.waitForTimeout(500);
    
    // Check that theme changed
    const updatedBodyClass = await page.locator('body').getAttribute('class');
    expect(initialBodyClass).not.toBe(updatedBodyClass);
    
    // Verify localStorage is updated
    const themeMode = await page.evaluate(() => localStorage.getItem('theme-mode'));
    expect(themeMode).toBeTruthy();
  });

  test('role-based themes apply correctly', async ({ page }) => {
    await page.goto('/');
    
    // Check professor theme (blue)
    await page.evaluate(() => {
      const event = new CustomEvent('auth-change', { 
        detail: { user: { role: 'professor', name: 'Test Professor' } } 
      });
      window.dispatchEvent(event);
    });
    await page.waitForTimeout(500);
    
    // Verify primary color changed
    const professorButton = page.locator('.ant-btn-primary').first();
    const professorBgColor = await professorButton.evaluate(el => 
      window.getComputedStyle(el).backgroundColor
    );
    expect(professorBgColor).toContain('rgb('); // Should have color applied
    
    // Check student theme (green)
    await page.evaluate(() => {
      const event = new CustomEvent('auth-change', { 
        detail: { user: { role: 'student', name: 'Test Student' } } 
      });
      window.dispatchEvent(event);
    });
    await page.waitForTimeout(500);
    
    const studentButton = page.locator('.ant-btn-primary').first();
    const studentBgColor = await studentButton.evaluate(el => 
      window.getComputedStyle(el).backgroundColor
    );
    expect(studentBgColor).not.toBe(professorBgColor); // Colors should be different
  });

  test('environment variables are loaded', async ({ page }) => {
    await page.goto('/');
    
    // Check that Vite env variables are accessible
    const testMode = await page.evaluate(() => {
      // @ts-ignore
      return window.__APP_ENV__?.VITE_TEST_MODE;
    });
    
    // In development, this should be defined
    expect(testMode).toBeDefined();
  });

  test('no console errors on load', async ({ page }) => {
    const consoleErrors: string[] = [];
    
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // There should be no console errors
    expect(consoleErrors).toHaveLength(0);
  });

  test('page is responsive', async ({ page }) => {
    await page.goto('/');
    
    // Test desktop view
    await page.setViewportSize({ width: 1920, height: 1080 });
    await expect(page.locator('#root')).toBeVisible();
    
    // Test tablet view
    await page.setViewportSize({ width: 768, height: 1024 });
    await expect(page.locator('#root')).toBeVisible();
    
    // Test mobile view
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.locator('#root')).toBeVisible();
  });

  test('CSP headers allow Ant Design styles', async ({ page }) => {
    const response = await page.goto('/');
    
    // If CSP headers exist, they should allow inline styles for Ant Design
    const cspHeader = response?.headers()['content-security-policy'];
    if (cspHeader) {
      expect(cspHeader).toMatch(/style-src[^;]*'unsafe-inline'/);
    }
  });
});