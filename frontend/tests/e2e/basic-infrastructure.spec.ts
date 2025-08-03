import { test, expect } from '@playwright/test';

test.describe('Basic Frontend Infrastructure', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173');
  });

  test('app loads successfully', async ({ page }) => {
    // Check that the page loads
    await expect(page).toHaveTitle(/研究生过程管理系统/);
    
    // Check that the app container is visible
    const appContainer = page.locator('#root');
    await expect(appContainer).toBeVisible();
  });

  test('Chinese localization is working', async ({ page }) => {
    // Check that the Chinese title is displayed
    const title = page.locator('h1');
    await expect(title).toContainText('研究生过程管理系统');
    
    // Check Chinese button text
    const button = page.locator('button').filter({ hasText: /切换到/ });
    await expect(button).toBeVisible();
  });

  test('Ant Design is loaded', async ({ page }) => {
    // Check that Ant Design styles are loaded
    const antStyles = await page.locator('style[data-antd-cssinjs]').count();
    expect(antStyles).toBeGreaterThan(0);
    
    // Check that Ant Design button has proper classes
    const button = page.locator('.ant-btn-primary').first();
    await expect(button).toBeVisible();
  });

  test('theme toggle button works', async ({ page }) => {
    // Find and click the theme toggle button
    const themeToggle = page.locator('button').filter({ hasText: /切换到/ });
    await expect(themeToggle).toBeVisible();
    
    // Get initial text
    const initialText = await themeToggle.textContent();
    
    // Click to toggle theme
    await themeToggle.click();
    
    // Wait for theme to change
    await page.waitForTimeout(500);
    
    // Check that button text changed
    const newText = await themeToggle.textContent();
    expect(newText).not.toBe(initialText);
  });

  test('no console errors on load', async ({ page }) => {
    const consoleErrors: string[] = [];
    
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });
    
    await page.reload();
    await page.waitForLoadState('networkidle');
    
    // Filter out expected dev warnings
    const realErrors = consoleErrors.filter(error => 
      !error.includes('Download the React DevTools')
    );
    
    expect(realErrors).toHaveLength(0);
  });

  test('page is responsive', async ({ page }) => {
    // Test desktop view
    await page.setViewportSize({ width: 1920, height: 1080 });
    await expect(page.locator('h1')).toBeVisible();
    
    // Test mobile view
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.locator('h1')).toBeVisible();
  });
});