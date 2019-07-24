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
    private players: Map<string, IPlayer>;
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
        this.setSignToPlayer(player);
        this.players.set(player.sign, player);
        this.eventCenter.put(builder.buildJoinRoomEvent(player));

        if (this.isFull()) {
            this.startGame();
        }

    }

    public removePlayer(playerSign: string): void {
        if (this.doesGameStart()) {
            throw new CustomError("Game already starts!", 403);
        }

        const player = this.players.get(playerSign);
        if (player === undefined) {
            throw new CustomError("Player isn't found!", 404);
        }

        this.players.delete(playerSign);
        this.eventCenter.put(builder.buildLeaveRoomEvent(player));
    }

    public registerUserMove(playerSign: string, positionData: { row: number, column: number }): void {
        if (this.players.has(playerSign) !== true) {
            throw new CustomError("Player is not found!", 404);
        }

        const position: Position = new Position(positionData);

        if (this.isValidPosition(position) !== true) {
            this.eventCenter.put(builder.buildInvalidMoveGameEvent(playerSign, position, this.decideOtherSign(playerSign)));
            return;
        }

        this.move(playerSign, position);
        this.evaluateLocalBoard(playerSign, position);
    }

    private setSignToPlayer(player: IPlayer) {
        if (this.isEmpty()) {
            player.sign = "X";
        } else {
            player.sign = "O";
        }
    }

    private move(playerSign: string, position: Position): void {
        const row = Number.parseInt(position.row + "", 10);
        const column = Number.parseInt(position.column + "", 10);

        const player = this.players.get(playerSign);
        if (player !== undefined) {
            this.localBoard[row][column] = player.sign + "";
            const nextPlayerSign = this.decideOtherSign(playerSign);
            this.eventCenter.put(builder.buildValidMoveGameEvent(playerSign, position, nextPlayerSign));
        }
    }

    private decideOtherSign(playerSign: string): string {
        let nextPlayerSign: string = EMPTY;
        if (playerSign === "X") {
            nextPlayerSign = "O";
        } else if (playerSign === "O") {
            nextPlayerSign = "X";
        }
        return nextPlayerSign;
    }

    private findCenter(position: Position): Position {

        let row = Math.floor(position.row / 3); // e.g. 5 / 3 = 1
        let column = Math.floor(position.column / 3); // e.g. 4 / 3 = 1

        row *= 3;
        row++;

        column *= 3;
        column++;

        return new Position({ row, column });
    }

    private isWinningCondition(center: Position, board: string[][]): boolean {
        const row = center.row;
        const column = center.column;

        if (board[row - 1][column] === board[row][column] && board[row][column] === board[row + 1][column]) {
            if (board[row][column] !== EMPTY) {
                return true;
            }
        }
        if (board[row][column - 1] === board[row][column] && board[row][column] === board[row][column + 1]) {
            if (board[row][column] !== EMPTY) {
                return true;
            }
        }
        if (board[row - 1][column - 1] === board[row][column] && board[row][column] === board[row + 1][column + 1]) {
            if (board[row][column] !== EMPTY) {
                return true;
            }
        }
        if (board[row - 1][column + 1] === board[row][column] && board[row][column] === board[row + 1][column - 1]) {
            if (board[row][column] !== EMPTY) {
                return true;
            }
        }
        if (board[row - 1][column - 1] === board[row - 1][column] && board[row - 1][column] === board[row - 1][column + 1]) {
            if (board[row - 1][column] !== EMPTY) {
                return true;
            }
        }
        if (board[row + 1][column - 1] === board[row + 1][column] && board[row + 1][column] === board[row + 1][column + 1]) {
            if (board[row + 1][column] !== EMPTY) {
                return true;
            }
        }
        if (board[row - 1][column - 1] === board[row][column - 1] && board[row][column - 1] === board[row + 1][column - 1]) {
            if (board[row][column - 1] !== EMPTY) {
                return true;
            }
        }
        if (board[row - 1][column + 1] === board[row][column + 1] && board[row][column + 1] === board[row + 1][column + 1]) {
            if (board[row][column + 1] !== EMPTY) {
                return true;
            }
        }

        return false;
    }

    private fillFinishedLocalBoard(playerSign: string, center: Position) {
        for (let i = center.row - 1; i < 3; i++) {
            let row: string = "";
            for (let j = center.column - 1; j < 3; j++) {
                this.localBoard[i][j] = playerSign;
                row += this.localBoard[i][j] + " ";
            }
            console.log(row);
        }
    }

    private evaluateLocalBoard(playerSign: string, position: Position) {
        const center: Position = this.findCenter(position);

        if (this.isWinningCondition(center, this.localBoard)) {
            const globalPosition = this.convertToGlobalBoard(center);

            if (this.players.has(playerSign)) {
                this.globalBoard[globalPosition.row][globalPosition.column] = playerSign;
                this.eventCenter.put(builder.buildWinLocalBoardGameEvent(playerSign, globalPosition));

                this.fillFinishedLocalBoard(playerSign, center);

                this.evaluateGlobalBoard(playerSign, globalPosition);
            }
        }
    }

    private convertToGlobalBoard(center: Position) {
        const globalPosition: Position = center.clone();
        globalPosition.row--;
        globalPosition.row /= 3;

        globalPosition.column--;
        globalPosition.column /= 3;
        return globalPosition;
    }

    private evaluateGlobalBoard(playerSign: string, position: Position) {
        const center: Position = this.findCenter(position);
        const player = this.players.get(playerSign);
        if (this.isWinningCondition(center, this.globalBoard) && player !== undefined) {
            this.eventCenter.put(builder.buildGameEndEvent(player));
        }
    }

    private isValidPosition(position: Position): boolean {
        const row = Number.parseInt(position.row + "", 10);
        const column = Number.parseInt(position.column + "", 10);

        if (row < 0 || row >= 9) {
            return false;
        }
        if (column < 0 || column >= 9) {
            return false;
        }

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
