import type {Locator, Page} from '@playwright/test';
import {MainMenu} from './MainMenu.ts';
import {LoginPage} from "./LoginPage.ts";
import {HomePage} from "./HomePage.ts";

export class ProfilePage extends HomePage {
    // Define strongly-typed locators
    readonly profilePageTitle: Locator;
    readonly userNameLabel: Locator;
    readonly userNameInput: Locator;
    readonly saveButton: Locator;
    readonly profileStatsList: Locator;
    readonly profileCreatedData: Locator;
    readonly profileWinData: Locator;
    readonly profileLossData: Locator;
    readonly profileDrawData: Locator;
    readonly profileSaveAlert: Locator;
    readonly deleteAccountButton: Locator;
    readonly emptyHistory: Locator;
    readonly mainMenu: MainMenu;

    constructor(page: Page) {
        // Pass the page instance up to the BasePage
        super(page);

        // Initialize locators using Playwright's recommended locating strategies
        this.profilePageTitle = page.getByTestId("profile-title");
        this.userNameLabel = page.locator("section.panel .form .field span");
        this.userNameInput = page.getByTestId("input-profile-name");
        this.saveButton = page.getByTestId("btn-save-profile");
        this.profileStatsList = page.getByTestId("profile-stats");
        this.profileCreatedData = page.getByTestId("profile-created");
        this.profileWinData = page.getByTestId("profile-wins");
        this.profileLossData = page.getByTestId("profile-losses");
        this.profileDrawData = page.getByTestId("profile-draws");
        this.profileSaveAlert = page.getByTestId("profile-message");
        this.deleteAccountButton = page.getByTestId("btn-delete-account");
        this.emptyHistory = page.getByTestId("history-empty");
        this.mainMenu = new MainMenu(page);
    }

    async getProfilePageTitleText(): Promise<string | null> {
        return await this.profilePageTitle.textContent();
    }

    async getUserNameLabelText(): Promise<string | null> {
        return await this.userNameLabel.textContent();
    }

    async fillUserNameInput(username: string): Promise<ProfilePage> {
        await this.userNameInput.fill(username);
        return this;
    }

    async saveData(): Promise<ProfilePage> {
        await this.saveButton.click();
        return this;
    }

    async deleteAccount(): Promise<void> {
        await this.deleteAccountButton.click();
    }

    async cancelDeletion(): Promise<ProfilePage> {
        this.page.once("dialog", (dialog) => {
            dialog.dismiss();
        });
        return this;
    }

    async confirmDeletion(): Promise<LoginPage> {
        this.page.once("dialog", (dialog) => {
            dialog.accept();
        });
        return new LoginPage(this.page);
    }

    async getAlertMessageText(): Promise<string | null> {
        return await this.profileSaveAlert.textContent();
    }

    async getProfileWins(): Promise<string | null> {
        return await this.profileWinData.textContent();
    }

    async getProfileLosses(): Promise<string | null> {
        return await this.profileLossData.textContent();
    }

    async getProfileDraws(): Promise<string | null> {
        return await this.profileDrawData.textContent();
    }

    async getProfileCreated(): Promise<string | null> {
        return await this.profileCreatedData.textContent();
    }

    async getEmptyHistoryText(): Promise<string | null> {
        return await this.emptyHistory.textContent();
    }
}