import { Express, Request, Response } from "express";
import { IGame } from "../interface/IGame";
import { IRoom } from "../interface/IRoom";
import { GeneralResponse } from "../utilities/GeneralResponse";

export async function createRoom(request: Request, response: Response, game: IGame) {
    const result: GeneralResponse = new GeneralResponse();
    try {
        const room: IRoom = game.createRoom();
        result.result = room;
        result.success = true;
    } catch (error) {
        result.result = {};
        result.success = false;
        result.message = error.message;
    }
    response.json(result);
}
