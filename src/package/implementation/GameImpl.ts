import { IGame } from "../interface/IGame";
import { IRoom } from "../interface/IRoom";

import { RoomImpl } from "./RoomImpl";

export class GameImpl implements IGame {
    private rooms: Map<number, IRoom>;
    private nextRoomID: number;

    constructor() {
        this.rooms = new Map<number, IRoom>();
        this.nextRoomID = 0;
    }

    public createRoom(): IRoom {
        const roomID: number = this.nextRoomID + 1;

        const room: RoomImpl = new RoomImpl(roomID);
        this.rooms.set(room.getID(), room);

        this.nextRoomID++;
        return room;
    }

    public getRoom(id: number): IRoom {
        const room = this.rooms.get(id);
        if (room === undefined) {
            throw new Error("Room is not found! Room ID: " + id);
        }
        return room;
    }

}
