import type {Locator, Page} from '@playwright/test';
import {MainMenu} from './MainMenu.ts';
import {HomePage} from "./HomePage.ts";

export enum TableHeaders {
    DATE = 0,
    DIFFICULTY = 1,
    RESULT = 2
}

export class HistoryPage extends HomePage {
    // Define strongly-typed locators
    readonly historyPageTitle: Locator;
    readonly historyTable: Locator;
    readonly historyTableHeaders: Locator;
    readonly historyTableRows: Locator;
    readonly clearHistoryButton: Locator;
    readonly mainMenu: MainMenu;

    constructor(page: Page) {
        // Pass the page instance up to the BasePage
        super(page);

        // Initialize locators using Playwright's recommended locating strategies
        this.historyPageTitle = page.getByTestId("history-title");
        this.historyTable = page.getByTestId("history-table");
        this.historyTableHeaders = page.locator(".table tr th");
        this.historyTableRows = page.locator(".table tbody tr");
        this.clearHistoryButton = page.getByTestId("btn-clear-history");
        this.mainMenu = new MainMenu(page);
    }

    async getHistoryPageTitleText(): Promise<string | null> {
        return await this.historyPageTitle.textContent();
    }

    async getHistoryTableHeaderByNumber(column: TableHeaders): Promise<string | null> {
        return await this.historyTableHeaders.nth(column).textContent();
    }

    async getHistoryTableRowByNumber(rowNumber: number): Promise<Locator> {
        return this.historyTableRows.nth(rowNumber);
    }

    async getHistoryTableData(rowNumber: number, column: TableHeaders): Promise<string | null> {
        let rowData = await this.getHistoryTableRowByNumber(rowNumber);
        return rowData.nth(column).textContent();
    }

    async clearHistory(): Promise<HistoryPage> {
        await this.clearHistoryButton.click();
        return this;
    }

    async confirmClearHistory(): Promise<HistoryPage> {
        this.page.once("dialog", (dialog) => {
            dialog.accept();
        });
        return this;
    }

    async cancelClearHistory(): Promise<HistoryPage> {
        this.page.once("dialog", (dialog) => {
            dialog.dismiss();
        });
        return this;
    }
}