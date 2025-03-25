import { test, expect } from '@playwright/test';
import { InventoryPage } from './pages/inventoryPage';

test('[T4]sauce demo aka api test', async ({ page }) => {
  await page.goto(process.env.SAUCE_DEMO_URL+'/inventory.html');
  await page.screenshot({ path: './screenshots/sauce.png' });
  await expect(page).toHaveTitle(/Swag Labs/);
});

test('[T2]verify cart exists', async ({ page }) => {
  await page.goto(process.env.SAUCE_DEMO_URL+'/inventory.html');
  await page.locator('[data-test="shopping-cart-link"]').click();
  await expect(page).toHaveURL(process.env.SAUCE_DEMO_URL!+'/cart.html');
  await page.screenshot({ path: './screenshots/cart.png' });
});

test('[T3]Sauce Labs Backpack test', async ({ page }) => {
  await page.goto(process.env.SAUCE_DEMO_URL+'/inventory.html');
  const inventoryPage = new InventoryPage(page);
  await inventoryPage.sauceLabsBackpack.click();
  await expect(page.locator("[data-test=\"inventory-item-price\"]")).toBeVisible();
});

test('[T6]should load products', async ({ page }) => {
  await page.goto(process.env.SAUCE_DEMO_URL+'/inventory.html');
  const inventoryPage = new InventoryPage(page);
  const products = await inventoryPage.getProducts();
  expect(products.length).toBeGreaterThan(0);
});

test('[T5] fleece jacket test image to be visible!', async ({ page }) => {
  await page.goto(process.env.SAUCE_DEMO_URL+'/inventory.html');
  const inventoryPage = new InventoryPage(page);
  await inventoryPage.fleeceJacket.click();
  await expect(page.locator("[data-test=\"item-sauce-labs-fleece-jacket-img\"]")).toBeVisible();
});