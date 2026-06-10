import type { Page } from '@playwright/test';
import path from 'node:path';

export class BasePage {
  protected readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Navigates to a local file relative to the project root
   * @param relativePath e.g., 'index.html'
   */
  async navigateToLocalFile(relativePath: string): Promise<void> {
    // Resolves the absolute path to your root file
    const absolutePath = path.resolve(process.cwd(), relativePath);

    // Local files must be prefixed with the 'file://' protocol
    await this.page.goto(`file://${absolutePath}`);
  }
}