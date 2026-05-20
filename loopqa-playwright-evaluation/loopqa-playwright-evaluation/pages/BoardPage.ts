import { Page, Locator, expect } from '@playwright/test';

export class BoardPage {
  constructor(private readonly page: Page) {}

  async openProject(projectName: string) {
    await this.page.getByText(projectName, { exact: true }).click();
    await expect(this.page.getByText(projectName, { exact: true })).toBeVisible();
  }

  private column(columnName: string): Locator {
    return this.page.locator('section, div, article').filter({
      has: this.page.getByText(columnName, { exact: true })
    }).first();
  }

  private taskCard(columnName: string, taskName: string): Locator {
    return this.column(columnName).locator('div, article, li').filter({
      has: this.page.getByText(taskName, { exact: true })
    }).first();
  }

  async verifyTaskInColumn(columnName: string, taskName: string) {
    const card = this.taskCard(columnName, taskName);
    await expect(card, `Expected task "${taskName}" to be visible in "${columnName}" column`).toBeVisible();
    await expect(card.getByText(taskName, { exact: true })).toBeVisible();
    return card;
  }

  async verifyTaskTags(columnName: string, taskName: string, expectedTags: string[]) {
    const card = await this.verifyTaskInColumn(columnName, taskName);

    for (const tag of expectedTags) {
      await expect(
        card.getByText(tag, { exact: true }),
        `Expected tag "${tag}" to be visible on task "${taskName}"`
      ).toBeVisible();
    }
  }
}
