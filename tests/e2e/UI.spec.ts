import {test, expect} from '@playwright/test';
import {LoginPage, StartPageType} from "../pages/LoginPage.ts";
import {Player} from "../helpers/Player.ts";
import {PlayPage} from "../pages/PlayPage.ts";
import type {ProfilePage} from "../pages/ProfilePage.ts";
import type {HistoryPage} from "../pages/HistoryPage.ts";

test.describe('Flow D: UI/UX & shared elements', () => {
    let loginPage: LoginPage;
    let player = new Player(8);
    let playPage: PlayPage;

    test.beforeEach(async ({page}) => {
        console.log('Preparing page object and navigating to the app...');
        loginPage = new LoginPage(page);
        await loginPage.open(); // Automatically opens your index.html before each test

        if (await loginPage.checkPageType() != StartPageType.REGISTER) {
            await loginPage.switchPageMode();
        }
        await loginPage.enterName(player.name);
        playPage = await loginPage.register();
    });

    test('Navigation: play button functionality',
        {tag: ['@ui', '@critical', '@smoke', '@acceptance', '@TC-UI-002']},
        async ({page}) => {
            let profilePage: ProfilePage = await playPage.mainMenu.openProfileTab();
            let gameSave: string[];
            playPage = await profilePage.mainMenu.openPlayTab();

            await expect(playPage.board).toBeVisible();
            await expect(playPage.mainMenu.playButton).toHaveAttribute("data-active", "true");

            await playPage.markCell(0);
            gameSave = await playPage.saveGameState();
            let historyPage: HistoryPage = await playPage.mainMenu.openHistoryTab();
            playPage = await historyPage.mainMenu.openPlayTab();

            await expect(playPage.board).toBeVisible();
            await expect(playPage.mainMenu.playButton).toHaveAttribute("data-active", "true");
            expect(await playPage.saveGameState()).toEqual(gameSave);
        });

    test('Navigation: profile button functionality',
        {tag: ['@ui', '@critical', '@smoke', '@acceptance', '@TC-UI-003']},
        async ({page}) => {
            let profilePage: ProfilePage = await playPage.mainMenu.openProfileTab();

            await expect(profilePage.profilePageTitle).toBeVisible();
            await expect(profilePage.mainMenu.profileButton).toHaveAttribute("data-active", "true");

            let historyPage: HistoryPage = await profilePage.mainMenu.openHistoryTab();
            profilePage = await historyPage.mainMenu.openProfileTab();

            await expect(profilePage.profilePageTitle).toBeVisible();
            await expect(profilePage.mainMenu.profileButton).toHaveAttribute("data-active", "true");
        });

    test('Navigation: history button functionality',
        {tag: ['@ui', '@critical', '@smoke', '@acceptance', '@TC-UI-004']},
        async ({page}) => {
            let historyPage: HistoryPage = await playPage.mainMenu.openHistoryTab();

            await expect(historyPage.historyPageTitle).toBeVisible();
            await expect(historyPage.mainMenu.historyButton).toHaveAttribute("data-active", "true");

            let profilePage: ProfilePage = await historyPage.mainMenu.openProfileTab();
            historyPage = await profilePage.mainMenu.openHistoryTab();

            await expect(historyPage.historyPageTitle).toBeVisible();
            await expect(historyPage.mainMenu.historyButton).toHaveAttribute("data-active", "true");
        });

    test('Logout button functionality',
        {tag: ['@ui', '@critical', '@smoke', '@acceptance', '@TC-UI-005']},
        async ({page}) => {
            loginPage = await playPage.mainMenu.logout();

            await expect(loginPage.authTitle).toBeVisible();
            await expect(loginPage.registerButton).toBeVisible();
    });
});