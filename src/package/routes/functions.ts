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
        console.log(room.getPlayers());
        result.result = {
            id: roomID,
            members: Array.from(room.getPlayers()),
        };

    } catch (error) {
        result.result = {};
        result.success = false;
        result.message = error.message;
    }
    response.json(result);
}
