import { IEventCenter } from "../interface/IEventCenter";
import { IPlayer } from "../interface/IPlayer";
import { IRoom } from "../interface/IRoom";

import { Position } from "../utilities/Position";
import { EventCenterImpl } from "./EventCenterImpl";
import { PlayerImpl } from "./PlayerImpl";

import * as builder from "../event/builder";

const EMPTY: string = "-";
const PlayerX: string = "X";
const PlayerO: string = "O";

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

    public getPlayers(): Map<number, IPlayer> {
        return this.players;
    }

    public doesGameStart(): boolean {
        return this.isFull();
    }

    public addNewPlayer(data: { id: number, name: string }): void {
        const player: IPlayer = new PlayerImpl(data.id, data.name);

        if (this.isFull()) {
            throw new Error("Room is full");
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
            throw new Error("Game already starts!");
        }

        const player = this.players.get(playerID);
        if (player === undefined) {
            throw new Error("Player isn't found!");
        }

        this.players.delete(playerID);
        this.eventCenter.put(builder.buildLeaveRoomEvent(player));

        if (this.isEmpty()) {
            // TODO: implement automatic delete room
        }
    }

    // TODO: to be implemented
    public registerUserMark(playerID: number, positionData: { row: number; column: number; }): boolean {
        throw new Error("Method not implemented.");
    }

    private generateEmptyBoard(dimension: number): string[][] {
        if (dimension <= 0) {
            throw new Error("Dimension is not valid! Dimension: " + dimension);
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
