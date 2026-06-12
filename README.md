# 🎮 Tic-Tac-Toe Test Automation Suite
This repository contains the end-to-end automation test suite for the Tic-Tac-Toe game, built using **Playwright** and **TypeScript**. The tests validate core game loops, player turn alternation, random computer AI behavior, win/loss evaluation algorithms, and UI state changes.

---

## 🚀 Running the Tests

Playwright provides multiple execution modes. Below are the commands to run tests using the Interactive UI and filtering by specialized Tags.

### 1. Interactive UI Mode (Recommended for Development)
Playwright's UI Mode provides a fully interactive desktop application. It allows you to step through actions frame-by-frame, watch tests execute in real time, inspect the live DOM, and trace console/network logs at any exact millisecond.

```bash
npx playwright test --ui
```

### 2. Filtering Tests Using Tags
Tests are tagged with metadata strings (like @smoke, @acceptance or by test case tag) inside their title definitions to help you target specific execution scopes.
#### Run all Smoke tests:

```bash
npx playwright test --grep @smoke
```
or 
```bash
npx playwright test --grep @TC_GAME_001
```

#### Run tests excluding a specific tag (e.g., skip slow tests):

```bash
npx playwright test --grep-invert @slow
```

#### Run multiple specific tags (OR condition):
```bash
npx playwright test --grep "@smoke|@ui"
```

### 3. Other Useful Execution Commands

#### Headed Mode (Watch a real browser instance open up directly):
```bash
npx playwright test --headed
```

#### Run a single specific test suite file:
```bash
npx playwright test tests/Game.spec.ts
```

## 🛠️ Other documents
#### Test Cases (Test_Cases.md)
#### Bug Report (Bug_Report.md)

## 🔮 Future Enhancements & Roadmap
#### Game Engine for tests (allows to run game with necessary win/lose conditions)
#### Major tests automation
#### Correct handling of browser-based prompts and alerts
#### Advanced logging and reporting tools
#### Usage of Faker.js for generating test data
#### Localisation tests
