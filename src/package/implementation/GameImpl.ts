import { IGame } from "../interface/IGame";
import { IRoom } from "../interface/IRoom";

import { EventCenterImpl } from "./EventCenterImpl";
import { RoomImpl } from "./RoomImpl";

export class GameImpl implements IGame {
    private rooms: Map<number, IRoom>;
    private nextRoomID: number;

    constructor() {
        this.rooms = new Map();
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
        throw new Error("Method not implemented.");
    }

}
