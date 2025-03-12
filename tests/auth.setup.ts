import { test as setup, expect } from '@playwright/test';
import path from 'path';

const authFile = path.join(__dirname, '../playwright/.auth/user.json');


setup('authenticate for source demo', async ({ page, context }) => {
    // Log in
    await page.goto(process.env.SAUCE_DEMO_URL!);
    page.locator('[data-test="username"]').fill(process.env.SAUCE_DEMO_LOGIN!)
    await page.screenshot({ path: './screenshots/sauceUsername.png' });
    page.locator('#password').fill(process.env.SAUCE_DEMO_PASSWORD!)
    await page.screenshot({ path: './screenshots/saucePassword.png' });
    page.locator('#login-button').click()
  
    // Verify login
    await expect(page).toHaveURL(process.env.SAUCE_DEMO_URL!+'/inventory.html');
    
    // Store authentication state
    await context.storageState({ path: authFile });
    
  });


