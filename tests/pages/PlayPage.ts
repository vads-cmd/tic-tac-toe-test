import type { Locator, Page } from '@playwright/test';
import {HomePage} from "./HomePage.ts";
import {MainMenu} from "./MainMenu.ts";

export enum DifficultyOptions {
    EASY = 'easy',
    MEDIUM = 'medium',
    HARD = 'hard'
}

export class PlayPage extends HomePage {
    // Define strongly-typed locators
    readonly difficultyLabel: Locator;
    readonly difficultyDropdown: Locator;
    readonly statusBar: Locator;
    readonly board: Locator;
    readonly newGameButton: Locator;
    readonly hintButton: Locator;
    readonly resetButton: Locator;
    readonly cells: Locator;
    readonly mainMenu: MainMenu;

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
        this.mainMenu = new MainMenu(page);
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

    async waitForText(text: string): Promise<void> {
        await this.statusBar.filter({ hasText:text}).waitFor();
    }

    async waitCompMove(): Promise<void> {
        await this.waitForText("Your turn (X)");
    }

    async waitWinGame(): Promise<void> {
        await this.waitForText("You win!");
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

    async markCell(number: number): Promise<PlayPage> {
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

    async saveGameState(): Promise<string[]> {
        let gameState: string[] = ['','','','','','','','',''];
        for (let i = 0; i < gameState.length; i++) {
            gameState[i] = <string>await this.getCellValue(i);
        }
        return gameState;
    }

    async CheckWinStatus(): Promise<boolean> {
        let winCell = 0;
        let cells = await this.cells.all();
        for (const cell of cells) {
            const classValue = await cell.getAttribute('class');
            if (classValue?.includes('is-win')) {
                winCell++;
            }
        }
        return winCell === 3;
    }

    async winGame(): Promise<PlayPage> {
        //Temporary solution
        let saveState;
        let cellNumber = 0;
        await this.markCell(cellNumber);
        await this.waitCompMove();
        saveState = await this.saveGameState();
        if (saveState[2] != 'o') {
            cellNumber = 2;
            await this.markCell(cellNumber);
        } else {
            cellNumber = 6;
            await this.markCell(cellNumber);
        }
        await this.waitCompMove();
        saveState = await this.saveGameState();
        if (saveState[2] === 'x' && saveState[1] != 'o') {
            cellNumber = 1;
            await this.markCell(cellNumber);
            return this;
        } else if (saveState[6] === 'x' && saveState[3] != 'o') {
            cellNumber = 3;
            await this.markCell(cellNumber);
            return this;
        } else {
            console.log("Error!!!!");
        }
        await this.waitWinGame();
        return this;
    }

    async findComputerMove(): Promise<number> {
        await this.waitCompMove();
        let cells = await this.saveGameState();
        for (const cell of cells) {
            if (cell === 'o') {
                return cells.indexOf(cell);
            }
        }
        return -1;
    }
}