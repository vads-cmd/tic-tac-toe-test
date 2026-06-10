import type { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage.ts';

export class HomePage extends BasePage {
    // Define strongly-typed locators
    readonly loginButton: Locator;
    readonly mainHeading: Locator;

    constructor(page: Page) {
        // Pass the page instance up to the BasePage
        super(page);

        // Initialize locators using Playwright's recommended locating strategies
        this.loginButton = page.getByTestId("btn-register");
        this.mainHeading = page.getByTestId("title");
    }

    async open(): Promise<void> {
        // Call the base method to load your root index.html
        await this.navigateToLocalFile('index.html');
    }

    async clickLogin(): Promise<void> {
        await this.loginButton.click();
    }
}