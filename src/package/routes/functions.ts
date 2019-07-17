import { Express, Request, Response } from "express";
import { IGame } from "../interface/IGame";
import { IRoom } from "../interface/IRoom";

export async function createRoom(request: Request, response: Response, game: IGame) {
    const room: IRoom = game.createRoom();
    response.json(JSON.stringify(room));
}
