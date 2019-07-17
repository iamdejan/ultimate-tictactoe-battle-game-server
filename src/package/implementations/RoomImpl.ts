import { IPlayer } from "../interfaces/Player";
import { IRoom } from "../interfaces/Room";
import { Position } from "../utilities/Position";

const EMPTY: string = "-";
const PlayerX: string = "X";
const PlayerO: string = "O";

class RoomImpl implements IRoom {
    private players: Set<IPlayer>;
    private capacity: number;

    // board representation
    private globalBoard: string[][];
    private localBoard: string[][];

    constructor(capacity: number) {
        this.players = new Set<IPlayer>();
        this.capacity = capacity;

        // later
        this.globalBoard = this.generateEmptyBoard(3);
        this.localBoard = this.generateEmptyBoard(3 * 3);
    }

    public getPlayers(): Set<IPlayer> {
        return this.players;
    }

    public doesGameStart(): boolean {
        return this.isFull();
    }

    public addNewPlayer(player: IPlayer): boolean {
        if (this.doesGameStart()) {
            return false;
        }

        this.players.add(player);
        return true;
    }

    public removePlayer(player: IPlayer): boolean {
        if (this.doesGameStart()) {
            return false;
        }

        this.players.delete(player);
        return true;
    }

    // TODO: to be implemented
    public registerUserMark(playerID: number, position: Position): boolean {
        return true;
    }

    private generateEmptyBoard(dimension: number): string[][] {
        if (dimension <= 0) {
            throw new Error("Dimension is not valid! Dimension: " + dimension);
        }

        const board: string[][] = [];
        for (let i = 0; i < dimension; i++) {
            const row: string[] = [];
            for (let j = 0; i < dimension; j++) {
                row.push(EMPTY);
            }
            board.push(row);
        }

        return board;
    }

    private isFull() {
        return this.players.size === this.capacity;
    }
}
