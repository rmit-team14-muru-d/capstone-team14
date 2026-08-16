import { test, expect } from '@playwright/test'

const BASE_URL = 'https://capstone-team14-production.up.railway.app'

test('valid login redirects to team page and renders members', async ({ page }) => {
  await page.goto(`${BASE_URL}/auth/signin`)

  await page.fill('#email', process.env.TEST_USER_EMAIL ?? '')
  await page.fill('#password', process.env.TEST_USER_PASSWORD ?? '')
  await page.click('button[type="submit"]')

  await expect(page).toHaveURL(/.*\/team/)
})