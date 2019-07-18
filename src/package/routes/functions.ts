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

export async function joinRoom(request: Request, response: Response, game: IGame) {
    const result: GeneralResponse = new GeneralResponse();
    try {
        const roomID = request.params.roomID;
        const room: IRoom = game.getRoom(roomID);

        const data: { id: number, name: string } = request.body;
        room.addNewPlayer(data);
        result.result = {};
        result.success = true;

    } catch (error) {
        result.result = {};
        result.success = false;
        result.message = error.message;

        response.statusCode = 403;
    }
    response.json(result);
}

export async function getRoomEventList(request: Request, response: Response, game: IGame) {
    const result: GeneralResponse = new GeneralResponse();
    try {
        const room: IRoom = game.getRoom(request.params.roomID);
        result.result = room.eventCenter.getList(request.params.lastID);
        result.success = true;
    } catch (error) {
        result.result = {};
        result.success = false;
        result.message = error.message;

        response.statusCode = 403;
    }
    response.json(result);
}
