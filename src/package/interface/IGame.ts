import { IRoom } from "./IRoom";

export interface IGame {
    createRoom(): boolean;

    getRoom(id: number): IRoom;

}
