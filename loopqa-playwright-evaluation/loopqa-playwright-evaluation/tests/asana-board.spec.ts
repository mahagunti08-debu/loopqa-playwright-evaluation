import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { BoardPage } from '../pages/BoardPage';
import testCases from '../data/taskCards.json';

type TaskCardTestCase = {
  testName: string;
  project: string;
  column: string;
  task: string;
  tags: string[];
};

const credentials = {
  email: 'admin',
  password: 'password123'
};

test.describe('LoopQA Demo App - Data Driven Board Validation', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(credentials.email, credentials.password);
  });

  for (const testCase of testCases as TaskCardTestCase[]) {
    test(testCase.testName, async ({ page }) => {
      const boardPage = new BoardPage(page);

      await boardPage.openProject(testCase.project);
      await boardPage.verifyTaskTags(
        testCase.column,
        testCase.task,
        testCase.tags
      );
    });
  }
});
