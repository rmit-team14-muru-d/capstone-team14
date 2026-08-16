# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: flow.spec.ts >> valid login redirects to team page and renders members
- Location: tests\e2e\flow.spec.ts:5:5

# Error details

```
Error: expect(page).toHaveURL(expected) failed

Expected pattern: /.*\/team/
Received string:  "https://capstone-team14-production.up.railway.app/auth/signin"
Timeout: 5000ms

Call log:
  - Expect "toHaveURL" with timeout 5000ms
    14 × locator resolved to <html lang="en" class="geist_a71539c9-module__T19VSG__variable geist_mono_8d43a2aa-module__8Li5zG__variable h-full antialiased">…</html>
       - unexpected value "https://capstone-team14-production.up.railway.app/auth/signin"

```

```yaml
- heading "Sign in to Telstra-muru-D — Team 2" [level=1]
- paragraph: Agentic AI workflows for automated startup evaluation in Telstra's muru-D innovation lab
- heading "Welcome back!" [level=2]
- paragraph: Sign in to access Teampage
- heading "Telstra-Muru-D" [level=3]
- paragraph: Sign in to Team 14' teampage
- button "Continue with Google"
- text: or Email or Username
- textbox "Email or Username" [invalid]:
  - /placeholder: name@domain.com
- alert: Please enter a valid email address
- text: Password
- textbox "Password" [invalid]:
  - /placeholder: ••••••••••••
- alert: Password is required
- button "Sign In"
- paragraph:
  - text: Don't have an account?
  - link "Create one":
    - /url: /auth/signup
- region "Notifications alt+T"
- alert
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test'
  2  | 
  3  | const BASE_URL = 'https://capstone-team14-production.up.railway.app'
  4  | 
  5  | test('valid login redirects to team page and renders members', async ({ page }) => {
  6  |   await page.goto(`${BASE_URL}/auth/signin`)
  7  | 
  8  |   await page.fill('#email', process.env.TEST_USER_EMAIL ?? '')
  9  |   await page.fill('#password', process.env.TEST_USER_PASSWORD ?? '')
  10 |   await page.click('button[type="submit"]')
  11 | 
> 12 |   await expect(page).toHaveURL(/.*\/team/)
     |                      ^ Error: expect(page).toHaveURL(expected) failed
  13 | })
```