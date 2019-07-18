import { IGame } from "../interface/IGame";
import { IRoom } from "../interface/IRoom";

import { RoomImpl } from "./RoomImpl";

export class GameImpl implements IGame {
    private rooms: Map<number, IRoom>;
    private nextRoomID: number;

    constructor() {
        this.rooms = new Map();
        this.nextRoomID = 0;
    }

    public createRoom(): IRoom {
        const roomID: number = ++this.nextRoomID;
        const room: RoomImpl = new RoomImpl(roomID);
        this.rooms.set(roomID, room);

        return room;
    }

    public getRoom(id: number): IRoom {
        const roomID = Number.parseInt(id + "", 10);
        const room: IRoom | undefined = this.rooms.get(roomID);
        if (room === undefined) {
            throw new Error("Room is not found! Room ID: " + id);
        }
        return room;
    }

}
