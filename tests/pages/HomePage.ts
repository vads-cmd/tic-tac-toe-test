import type { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage.ts';

export enum ColorMode {
    DARK = '#0b0d12',
    LIGHT = '#f3f4fb',
    ERROR = '0'
}

export enum Language {
    ENGLISH = 'en',
    PERSIAN = 'fa'
}

export class HomePage extends BasePage {
    // Define strongly-typed locators
    readonly mainHeading: Locator;
    readonly subtitle: Locator;
    readonly themeChangeButton: Locator;
    readonly languageSelectDropdown: Locator;

    constructor(page: Page) {
        // Pass the page instance up to the BasePage
        super(page);

        // Initialize locators using Playwright's recommended locating strategies
        this.mainHeading = page.getByTestId("title");
        this.subtitle = page.getByTestId("subtitle");
        this.themeChangeButton = page.getByTestId("btn-theme");
        this.languageSelectDropdown = page.getByTestId("select-language");
    }

    async open(): Promise<void> {
        // Call the base method to load your root index.html
        await this.navigateToLocalFile('index.html');
    }

    async getBackgroundColor(): Promise<string> {
        return await this.page.locator("html").evaluate((element) => {
            return window.getComputedStyle(element).backgroundColor;
        });
    }

    async getCurrentColorMode(): Promise<ColorMode> {
        let color = await this.getBackgroundColor();
        if (color === ColorMode.DARK) {
            return ColorMode.DARK;
        } else if (color === ColorMode.LIGHT) {
            return ColorMode.LIGHT;
        }
        else return ColorMode.ERROR;
    }

    async getCurrentLanguage(): Promise<string | null> {
        return await this.languageSelectDropdown.inputValue();
    }

    async setLanguage(language: Language): Promise<void> {
        await this.languageSelectDropdown.selectOption(language);
    }

    async changeColorScheme(): Promise<void> {
        await this.themeChangeButton.click();
    }

    async getHeadlineText(): Promise<string | null> {
        return await this.mainHeading.textContent();
    }

    async getSubtitleText(): Promise<string | null> {
        return await this.subtitle.textContent();
    }
}