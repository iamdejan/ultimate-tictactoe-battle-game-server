import { IEventCenter } from "../interfaces/IEventCenter";
import { IPlayer } from "../interfaces/IPlayer";
import { IRoom } from "../interfaces/IRoom";
import { Position } from "../utilities/Position";

const EMPTY: string = "-";
const PlayerX: string = "X";
const PlayerO: string = "O";

const MAXIMUM_CAPACITY: number = 2;

class RoomImpl implements IRoom {
    public eventCenter: IEventCenter;
    private players: Set<IPlayer>;

    // board representation
    private globalBoard: string[][];
    private localBoard: string[][];

    constructor(eventCenter: IEventCenter) {
        this.players = new Set<IPlayer>();

        this.globalBoard = this.generateEmptyBoard(3);
        this.localBoard = this.generateEmptyBoard(3 * 3);

        this.eventCenter = eventCenter;
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
        return this.players.size === MAXIMUM_CAPACITY;
    }
}
