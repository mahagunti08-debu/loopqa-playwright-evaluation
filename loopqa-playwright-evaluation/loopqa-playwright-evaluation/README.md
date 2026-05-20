# LoopQA Playwright Evaluation

This project contains a data-driven Playwright TypeScript test suite for the LoopQA Automation Engineer technical evaluation.

## Tech Stack

- Playwright
- TypeScript
- JSON test data
- Page Object Model structure

## Test Objective

The suite logs into the demo app and validates task cards across Web Application and Mobile Application boards.
Each scenario is driven by `data/taskCards.json` to avoid duplicate test logic.

## Setup

```bash
npm install
npx playwright install
```

## Run Tests

```bash
npm test
```

## Run Tests in Headed Mode

```bash
npm run test:headed
```

## View Report

```bash
npm run report
```

## Project Structure

```text
data/taskCards.json          Test data for all acceptance criteria
pages/LoginPage.ts           Login page actions
pages/BoardPage.ts           Board and card validation actions
tests/asana-board.spec.ts    Data-driven test runner
playwright.config.ts         Playwright configuration
```

## Notes

- The framework uses a data-driven approach, so new card validations can be added by updating the JSON file.
- Reusable page classes keep test logic clean and maintainable.
- Assertions validate both task placement and expected tags.
