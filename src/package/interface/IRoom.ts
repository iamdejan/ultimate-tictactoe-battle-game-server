import { Position } from "../utilities/Position";
import { IEventCenter } from "./IEventCenter";
import { IPlayer } from "./IPlayer";

export interface IRoom {
    eventCenter: IEventCenter;

    getID(): number;
    getPlayers(): IPlayer;
    addNewPlayer(player: IPlayer): boolean;
    doesGameStart(): boolean;
    registerUserMark(playerID: number, position: Position): boolean;
}
