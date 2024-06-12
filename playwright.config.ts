import { defineConfig, devices } from '@playwright/test'
import { config } from 'dotenv'

/* This allows you to pass in a `test_env` environment variable 
to specify which environment you want to run the tests against */
if (process.env.TEST_ENV) {
  config({
    path: `.env.${process.env.TEST_ENV}`,
    override: true,
  })
} else {
  config()
}

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 1,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    // Headers to be used for all the APIs
    extraHTTPHeaders: {
      Accept: '*/*',
      Connection: 'keep-alive',
      'Accept-Encoding': 'gzip, deflate, br',
    },
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: process.env.PARTNER_URL,

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  // projects: [
  //   {
  //     name: 'Live person',
  //     use: {baseURL: process.env.PARTNER_URL },
  //   }

  // ],
})
