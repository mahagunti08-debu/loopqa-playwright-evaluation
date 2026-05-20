import { Page, expect } from '@playwright/test';

export class LoginPage {
  constructor(private readonly page: Page) {}

  async goto() {
    await this.page.goto('/');
  }

  async login(email: string, password: string) {
    const usernameInput = this.page.getByLabel(/email|username/i)
      .or(this.page.getByPlaceholder(/email|username/i))
      .or(this.page.locator('input[type="text"], input[name*="email" i], input[name*="user" i]').first());

    const passwordInput = this.page.getByLabel(/password/i)
      .or(this.page.getByPlaceholder(/password/i))
      .or(this.page.locator('input[type="password"]').first());

    await usernameInput.fill(email);
    await passwordInput.fill(password);

    await this.page.getByRole('button', { name: /login|sign in|submit/i }).click();

    // Login is considered successful when one of the known project areas becomes visible.
    await expect(this.page.getByText(/Web Application|Mobile Application/i).first()).toBeVisible();
  }
}
