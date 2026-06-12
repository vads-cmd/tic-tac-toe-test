import {expect, test} from "@playwright/test";
import {LoginPage, StartPageType} from "../pages/LoginPage.ts";
import {Player} from "../helpers/Player.ts";
import {DifficultyOptions, PlayPage} from "../pages/PlayPage.ts";

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

    test('Game win condition',
        {tag: ['@game', '@critical', '@smoke', '@acceptance', '@TC-GAME-001']},
        async ({page}) => {
            await playPage.winGame();

            expect(await playPage.getStatusBarInfo()).toEqual("You win!");
            expect(await playPage.CheckWinStatus()).toBe(true);
        });

    test('Cell overwrite prevention by player',
        {tag: ['@game', '@critical', '@smoke', '@acceptance', '@TC-GAME-005']},
        async ({page}) => {
            let saveState;
            let compCellNumber;
            await playPage.markCell(0);
            await playPage.waitCompMove();
            saveState = await playPage.saveGameState();
            compCellNumber = await playPage.findComputerMove();

            expect(await playPage.getCellValue(compCellNumber)).toBe('o')
            expect(await playPage.saveGameState()).toEqual(saveState);
        });

    test('Cell overwrite prevention by computer',
        {tag: ['@game', '@critical', '@smoke', '@acceptance', '@TC-GAME-006']},
        async ({page}) => {
            await playPage.selectDifficulty(DifficultyOptions.HARD)
            await playPage.markCell(0);
            await playPage.waitCompMove();

            expect(await playPage.getCellValue(0)).toBe('x')
        });
});