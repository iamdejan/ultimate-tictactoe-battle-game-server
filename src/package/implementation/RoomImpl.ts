import {IEventCenter} from "../interface/IEventCenter";
import {IPlayer} from "../interface/IPlayer";
import {IRoom} from "../interface/IRoom";

import {EventCenterImpl} from "./EventCenterImpl";
import {PlayerImpl} from "./PlayerImpl";

import * as builder from "../event/builder";
import {CustomError} from "../utilities/CustomError";
import {Position} from "../utilities/Position";

const EMPTY: string = "-";
const MAXIMUM_CAPACITY: number = 2;

export class RoomImpl implements IRoom {

    public eventCenter: IEventCenter;
    private players: Map<number, IPlayer>;
    private id: number;

    // board representation
    private globalBoard: string[][];
    private localBoard: string[][];

    constructor(id: number) {
        this.players = new Map();

        this.globalBoard = this.generateEmptyBoard(3);
        this.localBoard = this.generateEmptyBoard(3 * 3);

        this.eventCenter = new EventCenterImpl();

        this.id = id;
    }

    public getID(): number {
        return this.id;
    }

    public addNewPlayer(data: { id: number, name: string }): void {
        if (this.isFull()) {
            throw new CustomError("Room is full", 403);
        }

        const player: IPlayer = new PlayerImpl(data.id, data.name);
        if (this.isEmpty()) {
            player.sign = "X";
        } else {
            player.sign = "O";
        }
        this.players.set(data.id, player);
        this.eventCenter.put(builder.buildJoinRoomEvent(player));

        if (this.isFull()) {
            this.startGame();
        }

    }

    public removePlayer(playerID: number): void {
        playerID = Number.parseInt(playerID + "", 10);
        if (this.doesGameStart()) {
            throw new CustomError("Game already starts!", 403);
        }

        const player = this.players.get(playerID);
        if (player === undefined) {
            throw new CustomError("Player isn't found!", 404);
        }

        this.players.delete(playerID);
        this.eventCenter.put(builder.buildLeaveRoomEvent(player));
    }

    public registerUserMove(playerID: number, positionData: { row: number, column: number }): void {
        playerID = Number.parseInt(playerID + "", 10);
        if (this.players.has(playerID) !== true) {
            throw new CustomError("Player is not found!", 404);
        }

        const position: Position = new Position(positionData);

        if (this.isValidPosition(playerID, position)) {
            this.move(playerID, position);
        } else {
            this.eventCenter.put(builder.buildInvalidMoveGameEvent(playerID, position));
            return;
        }

        this.evaluateLocalBoard(position);
    }

    private move(playerID: number, position: Position): void {
        this.eventCenter.put(builder.buildValidMoveGameEvent(playerID, position));

        const row = Number.parseInt(position.row + "", 10);
        const column = Number.parseInt(position.column + "", 10);

        const player = this.players.get(playerID);
        if (player !== undefined) {
            this.localBoard[row][column] = player.sign + "";
        }
    }

    private findCenter(position: Position): Position {

        let row = position.row % 3; // e.g. 5 % 3 = 1
        let column = position.column % 3; // e.g. 4 % 3 = 1

        row *= 3;
        row++;

        column *= 3;
        column++;

        return new Position({ row, column });
    }

    private isWinningCondition(center: Position): boolean {
        const row = center.row;
        const column = center.column;

        return  (this.localBoard[row - 1][column] === this.localBoard[row][column] && this.localBoard[row][column] === this.localBoard[row + 1][column]) ||
                (this.localBoard[row][column - 1] === this.localBoard[row][column] && this.localBoard[row][column] === this.localBoard[row][column + 1]) ||
                (this.localBoard[row - 1][column - 1] === this.localBoard[row][column] && this.localBoard[row][column] === this.localBoard[row + 1][column + 1]) ||
                (this.localBoard[row - 1][column + 1] === this.localBoard[row][column] && this.localBoard[row][column] === this.localBoard[row + 1][column - 1]);
    }

    private decideWinnerOnLocalBoard(center: Position): number {
        if (this.isWinningCondition(center)) {
            const row = center.row;
            const column = center.column;
            if (this.localBoard[row][column] === EMPTY) {
                return 0;
            } else {
                let winnerID: number = 0;
                this.players.forEach(((value, key) => {
                    if (this.localBoard[row][column] === value.sign) {
                        winnerID = key;
                    }
                }));
                return winnerID;
            }
        }
        return 0;
    }

    private evaluateLocalBoard(position: Position) {
        const center: Position = this.findCenter(position);

        const winnerID = this.decideWinnerOnLocalBoard(center);
        if (winnerID !== 0) {
            const globalPosition: Position = center.clone();
            globalPosition.row--;
            globalPosition.row /= 3;

            globalPosition.column--;
            globalPosition.column /= 3;

            const player = this.players.get(winnerID);
            if (player !== undefined) {
                this.globalBoard[globalPosition.row][globalPosition.column] = player.sign;
                this.eventCenter.put(builder.buildWinLocalBoardGameEvent(winnerID, player.sign, globalPosition));

                // TODO: check global board
            }
        }
    }

    private isValidPosition(playerID: number, position: Position): boolean {
        const row = Number.parseInt(position.row + "", 10);
        const column = Number.parseInt(position.column + "", 10);
        return this.localBoard[row][column] === EMPTY;
    }

    private doesGameStart(): boolean {
        return this.isFull();
    }

    private generateEmptyBoard(dimension: number): string[][] {
        if (dimension <= 0) {
            throw new CustomError("Dimension is not valid! Dimension: " + dimension, 500);
        }
        const board: string[][] = [];
        for (let i = 0; i < dimension; i++) {
            const row: string[] = [];
            for (let j = 0; j < dimension; j++) {
                row.push(EMPTY);
            }
            board.push(row);
        }
        return board;
    }

    private isEmpty() {
        return this.players.size === 0;
    }

    private isFull() {
        return this.players.size === MAXIMUM_CAPACITY;
    }

    private startGame() {
        this.eventCenter.put(builder.buildGameBeginEvent());
    }
}
