import {DataGenerator} from "./DataGenerator.ts";

export class Player {
    // Define our strongly-typed fields
    public readonly name: string;
    public readonly wins: number;
    public readonly losses: number;
    public readonly draws: number;

    constructor(
        nameLength: number = 8,
        wins: number = 0,
        losses: number = 0,
        draws: number = 0
    ) {
        // Generate the random string field name
        this.name = `Item_${DataGenerator.generateRandomString(nameLength)}`;
        this.wins = wins;
        this.losses = losses;
        this.draws = draws;
    }
}