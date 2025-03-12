import { test, expect } from '@playwright/test';
// import path from 'path';
// const authFileGit = path.join(__dirname, '../playwright/.auth/userGit.json');



test('sauce deom', async ({ page }) => {
  await page.goto(process.env.SAUCE_DEMO_URL+'/inventory.html');
  await page.screenshot({ path: './screenshots/sauce.png' });
  await expect(page).toHaveTitle(/Swag Labs/);
});

test('cart', async ({ page }) => {
  await page.goto(process.env.SAUCE_DEMO_URL+'/inventory.html');
  await page.locator('[data-test="shopping-cart-link"]').click();
  await expect(page).toHaveURL(process.env.SAUCE_DEMO_URL!+'/cart.html');
  await page.screenshot({ path: './screenshots/cart.png' });
});

