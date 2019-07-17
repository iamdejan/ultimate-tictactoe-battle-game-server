import { Position } from "../utilities/Position";
import { IPlayer } from "./IPlayer";

export interface IRoom {
    getPlayers(): IPlayer;
    addNewPlayer(player: IPlayer): boolean;
    doesGameStart(): boolean;
    registerUserMark(playerID: number, position: Position): boolean;
}
