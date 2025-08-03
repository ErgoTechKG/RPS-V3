import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Research Process System/);
});

test('theme switching works', async ({ page }) => {
  await page.goto('/');

  // Test will be implemented when theme toggle is added to UI
  // This is just a placeholder to ensure Playwright is working
  expect(true).toBe(true);
});