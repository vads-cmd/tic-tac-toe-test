import type {Locator, Page} from '@playwright/test';
import {HomePage} from './HomePage.ts';
import {PlayPage} from "./PlayPage.ts";

export class LoginPage extends HomePage {
    // Define strongly-typed locators
    readonly authTitle: Locator;
    readonly authSubtitle: Locator;
    readonly fieldNameLabel: Locator;
    readonly nameInput: Locator;
    readonly loginButton: Locator;
    readonly registerButton: Locator;
    readonly pageModeSwitch: Locator;

    constructor(page: Page) {
        // Pass the page instance up to the BasePage
        super(page);

        // Initialize locators using Playwright's recommended locating strategies
        this.authTitle = page.getByTestId("auth-title");
        this.authSubtitle = page.getByTestId("auth-subtitle");
        this.fieldNameLabel = page.locator('.auth .field span');
        this.nameInput = page.getByTestId("input-name");
        this.loginButton = page.getByTestId("btn-login");
        this.registerButton = page.getByTestId("btn-register");
        this.pageModeSwitch = page.getByTestId("btn-switch-mode");
    }

    async getAuthTitleText(): Promise<string | null> {
        return await this.authTitle.textContent();
    }

    async getAuthSubtitleText(): Promise<string | null> {
        return await this.authSubtitle.textContent();
    }

    async getFieldNameLabelText(): Promise<string | null> {
        return await this.fieldNameLabel.textContent();
    }

    async switchPageMode(): Promise<LoginPage> {
        await this.pageModeSwitch.click();
        return this;
    }

    async enterName(name: string): Promise<LoginPage> {
        await this.nameInput.fill(name);
        return this;
    }

    async register(): Promise<PlayPage> {
        await this.registerButton.click();
        return new PlayPage(this.page);
    }

    async login(): Promise<PlayPage> {
        await this.loginButton.click();
        return new PlayPage(this.page);
    }
}