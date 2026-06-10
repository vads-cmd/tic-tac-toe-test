import type {Locator, Page} from '@playwright/test';
import {HomePage} from './HomePage.ts';
import {PlayPage} from "./PlayPage.ts";
import {LoginPage} from "./LoginPage.ts";

export class MainMenu extends HomePage {
    // Define strongly-typed locators
    readonly userAvatar: Locator;
    readonly userName: Locator;
    readonly playButton: Locator;
    readonly profileButton: Locator;
    readonly historyButton: Locator;
    readonly logoutButton: Locator;

    constructor(page: Page) {
        // Pass the page instance up to the BasePage
        super(page);

        // Initialize locators using Playwright's recommended locating strategies
        this.userAvatar = page.getByTestId("avatar");
        this.userName = page.getByTestId("hello-user");
        this.playButton = page.getByTestId("nav-play");
        this.profileButton = page.getByTestId("nav-profile");
        this.historyButton = page.getByTestId("nav-history");
        this.logoutButton = page.getByTestId("btn-logout");
    }

    async getUserGreeting(): Promise<string | null> {
        return await this.userName.textContent();
    }

    async openPlayTab(): Promise<PlayPage> {
        await this.playButton.click();
        return new PlayPage(this.page);
    }

    async logout(): Promise<LoginPage> {
        await this.logoutButton.click();
        return new LoginPage(this.page);
    }
}