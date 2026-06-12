import {expect, test} from "@playwright/test";
import {LoginPage, StartPageType} from "../pages/LoginPage.ts";
import {Player} from "../helpers/Player.ts";
import {PlayPage} from "../pages/PlayPage.ts";
import type {ProfilePage} from "../pages/ProfilePage.ts";

test.describe('Flow A: Authentication & Registration Tests', () => {
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

    test('Update player name successfully',
        {tag: ['@data', '@critical', '@smoke', '@acceptance', '@TC-DATA-001']},
        async ({page}) => {

            let newPlayer = new Player(8);
            let profilePage: ProfilePage = await playPage.mainMenu.openProfileTab();
            await profilePage.fillUserNameInput(newPlayer.name);
            await profilePage.saveData();

            expect(await profilePage.mainMenu.getUserGreeting()).toContain(newPlayer.name);
            expect(await profilePage.getAlertMessageText()).toContain('Saved');
            expect(await profilePage.userNameInput.inputValue()).toContain(newPlayer.name);
    });

    test('Fail updating player name with 1 symbol name',
        {tag: ['@data', '@critical', '@smoke', '@acceptance', '@TC-DATA-002']},
        async ({page}) => {

            let newPlayer = 'a';
            let profilePage: ProfilePage = await playPage.mainMenu.openProfileTab();
            await profilePage.fillUserNameInput(newPlayer);
            await profilePage.saveData();

            expect(await profilePage.mainMenu.getUserGreeting()).toContain(player.name);
            expect(await profilePage.getAlertMessageText()).toContain('Please enter a name with at least 2 characters');
            expect(await profilePage.userNameInput.inputValue()).toContain(newPlayer);
        });

    test('Fail updating player name with [blank] name',
        {tag: ['@data', '@critical', '@smoke', '@acceptance', '@TC-DATA-003']},
        async ({page}) => {

            let newPlayer = '';
            let profilePage: ProfilePage = await playPage.mainMenu.openProfileTab();
            await profilePage.fillUserNameInput(newPlayer);
            await profilePage.saveData();

            expect(await profilePage.mainMenu.getUserGreeting()).toContain(player.name);
            expect(await profilePage.getAlertMessageText()).toContain('Please enter a name with at least 2 characters');
            expect(await profilePage.userNameInput.inputValue()).toContain(newPlayer);
        });

    test('Delete account functionality',
        {tag: ['@data', '@critical', '@smoke', '@acceptance', '@TC-DATA-010']},
        async ({page}) => {

            let profilePage: ProfilePage = await playPage.mainMenu.openProfileTab();
            await profilePage.deleteAccount();
            await profilePage.cancelDeletion();

            expect(await profilePage.mainMenu.getUserGreeting()).toContain(player.name);
            expect(await profilePage.getProfilePageTitleText()).toContain("Your Profile");

            await profilePage.deleteAccount();
            loginPage = await profilePage.confirmDeletion();

            await expect(loginPage.authTitle).toBeVisible();
            await expect(loginPage.registerButton).toBeVisible();

            await loginPage.switchPageMode();
            await loginPage.enterName(player.name);
            await loginPage.login();

            expect(await loginPage.getErrorMessage()).toEqual("No account with this name. Please register.")
            expect(await loginPage.getNameInputText()).toEqual("");

            await loginPage.switchPageMode();
            await loginPage.enterName(player.name);
            await loginPage.register();

            await expect(playPage.board).toBeVisible();
            await expect(playPage.mainMenu.userAvatar).toBeVisible();
            await expect(playPage.mainMenu.userName).toBeVisible();
            expect(await playPage.mainMenu.getUserGreeting()).toContain(player.name);
        });
});