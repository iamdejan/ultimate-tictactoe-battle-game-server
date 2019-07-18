import { IRoom } from "./IRoom";

export interface IGame {
    createRoom(): IRoom;

    getRoom(id: number): IRoom;

}
