import { IEventCenter } from "./IEventCenter";

export interface IRoom {
    eventCenter: IEventCenter;

    getID(): number;
    addNewPlayer(data: { id: number, name: string }): void;
    removePlayer(playerSign: string): void;
    registerUserMove(playerSign: string, positionData: { row: number, column: number }): void;
}
