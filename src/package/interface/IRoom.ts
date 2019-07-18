import { Position } from "../utilities/Position";
import { IEventCenter } from "./IEventCenter";
import { IPlayer } from "./IPlayer";

export interface IRoom {
    eventCenter: IEventCenter;

    getID(): number;
    getPlayers(): Set<IPlayer>;
    addNewPlayer(data: { id: number, name: string }): void;
    doesGameStart(): boolean;
    registerUserMark(playerID: number, positionData: { row: number, column: number }): boolean;
}
