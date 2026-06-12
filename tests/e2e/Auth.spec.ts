import {expect, test} from '@playwright/test';
import {LoginPage, StartPageType} from "../pages/LoginPage.ts";
import {Player} from "../helpers/Player.ts";
import {PlayPage} from "../pages/PlayPage.ts";

test.describe('Flow A: Authentication & Registration Tests', () => {
    let loginPage: LoginPage;

    test.beforeEach(async ({page}) => {
        console.log('Preparing page object and navigating to the app...');
        loginPage = new LoginPage(page);
        await loginPage.open(); // Automatically opens your index.html before each test
    });

    test('Player registration for new user and login after registration',
        {tag: ['@auth', '@critical', '@smoke', '@acceptance', '@TC-AUTH-001', '@TC-AUTH-002']},
        async ({page}) => {

            let player = new Player(8);
            let playPage: PlayPage;

            if (await loginPage.checkPageType() != StartPageType.REGISTER) {
                await loginPage.switchPageMode();
            }
            await loginPage.enterName(player.name)
            playPage = await loginPage.register();

            await expect(playPage.board).toBeVisible();
            await expect(playPage.mainMenu.userAvatar).toBeVisible();
            await expect(playPage.mainMenu.userName).toBeVisible();
            expect(await playPage.mainMenu.getUserGreeting()).toContain(player.name);

            loginPage = await playPage.mainMenu.logout();
            await loginPage.switchPageMode();
            await loginPage.enterName(player.name);
            await loginPage.login();

            await expect(playPage.board).toBeVisible();
            await expect(playPage.mainMenu.userAvatar).toBeVisible();
            await expect(playPage.mainMenu.userName).toBeVisible();
            expect(await playPage.mainMenu.getUserGreeting()).toContain(player.name);
        });

    test('Switching between Registration and Login modes',
        {tag: ['@auth', '@critical', '@smoke', '@acceptance', '@TC-AUTH-003']},
        async ({page}) => {

            expect(await loginPage.checkPageType()).toEqual(StartPageType.REGISTER);

            await loginPage.switchPageMode();

            expect(await loginPage.checkPageType()).toEqual(StartPageType.LOGIN);
        });

    test('Player registration for existing user',
        {tag: ['@auth', '@critical', '@smoke', '@acceptance', '@TC-AUTH-004']},
        async ({page}) => {

            let player = new Player(8);
            let playPage: PlayPage;

            if (await loginPage.checkPageType() != StartPageType.REGISTER) {
                await loginPage.switchPageMode();
            }
            await loginPage.enterName(player.name);
            playPage = await loginPage.register();
            loginPage = await playPage.mainMenu.logout();
            if (await loginPage.checkPageType() != StartPageType.REGISTER) {
                await loginPage.switchPageMode();
            }
            await loginPage.enterName(player.name);
            await loginPage.register();

            expect(await loginPage.getErrorMessage()).toEqual("This name is already taken. Try logging in.")
            expect(await loginPage.getNameInputText()).toEqual("");

        });

    test('Player login for unregistered user',
        {tag: ['@auth', '@critical', '@smoke', '@acceptance', '@TC-AUTH-005']},
        async ({page}) => {
            let player = new Player(8);

            await loginPage.open();
            if (await loginPage.checkPageType() != StartPageType.LOGIN) {
                await loginPage.switchPageMode();
            }
            await loginPage.enterName(player.name);
            await loginPage.login();

            expect(await loginPage.getErrorMessage()).toEqual("No account with this name. Please register.")
            expect(await loginPage.getNameInputText()).toEqual("");
        });
});