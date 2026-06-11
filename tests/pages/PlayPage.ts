import type { Locator, Page } from '@playwright/test';
import { AppMainPage } from './AppMainPage.ts';

export enum DifficultyOptions {
    EASY = 'easy',
    MEDIUM = 'medium',
    HARD = 'hard'
}

export class PlayPage extends AppMainPage {
    // Define strongly-typed locators
    readonly difficultyLabel: Locator;
    readonly difficultyDropdown: Locator;
    readonly statusBar: Locator;
    readonly board: Locator;
    readonly newGameButton: Locator;
    readonly hintButton: Locator;
    readonly resetButton: Locator;
    readonly cells: Locator;

    constructor(page: Page) {
        // Pass the page instance up to the BasePage
        super(page);

        // Initialize locators using Playwright's recommended locating strategies
        this.difficultyLabel = page.getByTestId("label-difficulty");
        this.difficultyDropdown = page.getByTestId("select-difficulty");
        this.statusBar = page.getByTestId("status");
        this.board = page.getByTestId("board");
        this.newGameButton = page.getByTestId("btn-new");
        this.hintButton = page.getByTestId("btn-hint");
        this.resetButton = page.getByTestId("btn-reset");
        this.cells = page.locator("button.cell");
    }

    async getDifficultyLabelText(): Promise<string | null> {
        return await this.difficultyLabel.textContent();
    }

    async selectDifficulty(difficulty: DifficultyOptions): Promise<PlayPage> {
        await this.difficultyDropdown.selectOption(difficulty);
        return this;
    }

    async getCurrentDifficulty(): Promise<string> {
        return await this.difficultyDropdown.inputValue();
    }

    async getStatusBarInfo(): Promise<string | null> {
        return await this.statusBar.textContent();
    }

    async resetGame(): Promise<PlayPage> {
        await this.resetButton.click();
        return this;
    }

    async startNewGame(): Promise<PlayPage> {
        await this.newGameButton.click();
        return this;
    }

    async askHint(): Promise<PlayPage> {
        await this.hintButton.click();
        return this;
    }

    async getCellValue(number: number): Promise<string | null> {
        return await this.cells.nth(number).getAttribute('data-state');
    }

    async selectCell(number: number): Promise<PlayPage> {
        await this.cells.nth(number).click();
        return this;
    }

    async confirmNewGame(): Promise<PlayPage> {
        this.page.once("dialog", (dialog) => {
            dialog.accept();
        });
        return new PlayPage(this.page);
    }

    async cancelNewGame(): Promise<PlayPage> {
        this.page.once("dialog", (dialog) => {
            dialog.dismiss();
        });
        return this;
    }
}