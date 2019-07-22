import { IEventCenter } from "./IEventCenter";

export interface IRoom {
    eventCenter: IEventCenter;

    getID(): number;
    addNewPlayer(data: { id: number, name: string }): void;
    removePlayer(playerID: number): void;
    registerUserMove(playerID: number, positionData: { row: number, column: number }): void;
}
