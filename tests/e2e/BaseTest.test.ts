import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage.ts';

test.describe('E2E Local Web App Tests', () => {

    test('should load the local index.html and verify elements', async ({ page }) => {
        // 1. Instantiate the page object with Playwright's page fixture
        const homePage = new HomePage(page);

        // 2. Interact with the page via the POM methods
        await homePage.open();

        // 3. Assertions
        await expect(homePage.mainHeading).toBeVisible();
        await expect(homePage.loginButton).toBeEnabled();
    });

});