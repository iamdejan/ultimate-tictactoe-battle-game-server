import { IGame } from "../interface/IGame";
import { IRoom } from "../interface/IRoom";

import { RoomImpl } from "./RoomImpl";
import { CustomError } from "../utilities/CustomError";

const MAXIMUM_JOIN_DURATION = 1 * 60 * 1000; // 1 min / sec * 60 sec / min * 1000 ms / sec

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

        setTimeout(() => {
            this.rooms.delete(roomID);
            console.log("Room " + roomID + " is deleted!");
        }, MAXIMUM_JOIN_DURATION);

        return room;
    }

    public getRoom(id: number): IRoom {
        const roomID = Number.parseInt(id + "", 10);
        const room: IRoom | undefined = this.rooms.get(roomID);
        if (room === undefined) {
            throw new CustomError("Room is not found! Room ID: " + id, 404);
        }
        return room;
    }

}
