import { test, expect, chromium } from '@playwright/test';
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

test('backpack test in slow motion', async () => {
  const browser = await chromium.launch({ slowMo: 1000 }); // Slow down by 1000ms
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto(process.env.SAUCE_DEMO_URL+'/inventory.html');
  await page.locator("[data-test=\"item-4-img-link\"]").click();
  await expect(page.locator("[data-test=\"inventory-item-price\"]")).toBeVisible();

  await browser.close();
});

