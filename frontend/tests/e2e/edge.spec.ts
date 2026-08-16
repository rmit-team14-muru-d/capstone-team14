import { test, expect } from '@playwright/test'

test.describe('Edge cases', () => {
  test('invalid login shows error toast', async ({ page }) => {
    await page.goto('/auth/signin')
    await page.fill('#email', 'notreal@example.com')
    await page.fill('#password', 'wrongpassword123')
    await page.click('button[type="submit"]')

    await expect(page.locator('text=Invalid email or password')).toBeVisible()
  })

  test('direct /team access without auth redirects to signin', async ({ page }) => {
    await page.goto('/team')
    await expect(page).toHaveURL(/.*\/auth\/signin/)
  })
})