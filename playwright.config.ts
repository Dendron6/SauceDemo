import { defineConfig, devices, PlaywrightTestConfig } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  testDir: './tests',
  testMatch: '**/*.spec.ts',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['list'],
    ['junit', {
      outputFile: 'test-results/results.xml',
      stripANSI: true, // Удаляет ANSI-цвета из вывода
      includeProjectInTestName: true // Добавляет имя проекта в имена тестов
    }],
    ['playwright-zephyr/lib/src/cloud', {
      projectKey: 'SCRUM',
      authorizationToken: process.env.ZEPHYR_TOKEN,
      autoCreateTestCases: process.env.JIRA_PROJECT_KEY,
      testCycle: {
        name: `Cycle ${new Date().toLocaleDateString()}`, // Имя цикла
      }
    }]
  ],
  use: {
    // baseURL: process.env.BASE_URL,
    baseURL: process.env.BASE_URL,
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://127.0.0.1:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    video: 'on-first-retry',
    screenshot: 'only-on-failure',
    headless: false,
    browserName: 'chromium',
    launchOptions: {
      slowMo: 3000, // Добавляем замедление здесь
    },
  },

  projects: [
    // Setup project
    { name: 'setup', testMatch: /.*\.setup\.ts/ },

    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        // Use prepared auth state.
        storageState: 'playwright/.auth/user.json',
      },
      dependencies: ['setup'],
    },

    // {
    //   name: 'firefox',
    //   use: {
    //     ...devices['Desktop Firefox'],
    //     // Use prepared auth state.
    //     storageState: 'playwright/.auth/user.json',
    //   },
    //   dependencies: ['setup'],
    // },
  ],
});