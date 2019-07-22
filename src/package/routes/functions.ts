import { Request, Response } from "express";
import { IGame } from "../interface/IGame";
import { IRoom } from "../interface/IRoom";
import { GeneralResponse } from "../utilities/GeneralResponse";
import { CustomError } from "../utilities/CustomError";

export async function createRoom(request: Request, response: Response, game: IGame) {
    const result: GeneralResponse = new GeneralResponse();
    try {
        const room: IRoom = game.createRoom();
        result.DTO = {
            id: room.getID(),
        };
        result.success = true;
    } catch (error) {
        result.DTO = {};
        result.success = false;
        result.message = error.message;

        if (error instanceof CustomError) {
            response.statusCode = error.statusCode;
        }
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
        result.DTO = {};
        result.success = true;

    } catch (error) {
        result.DTO = {};
        result.success = false;
        result.message = error.message;

        if (error instanceof CustomError) {
            response.statusCode = error.statusCode;
        }
    }
    response.json(result);
}

export async function leaveRoom(request: Request, response: Response, game: IGame) {
    const result: GeneralResponse = new GeneralResponse();
    try {
        const roomID = request.params.roomID;
        const room: IRoom = game.getRoom(roomID);

        const playerID = request.params.playerID;
        room.removePlayer(playerID);

        result.success = true;
    } catch (error) {
        result.DTO = {};
        result.success = false;
        result.message = error.message;

        if (error instanceof CustomError) {
            response.statusCode = error.statusCode;
        }
    }
    response.json(result);
}

async function delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

async function untilEventExists(room: IRoom, lastID: number) {
    let data = room.eventCenter.getList(lastID);
    while (data.events.length < 1) {
        await delay(20);
        data = room.eventCenter.getList(lastID);
    }

    return data;
}

export async function getRoomEventList(request: Request, response: Response, game: IGame) {
    const result: GeneralResponse = new GeneralResponse();
    try {
        const room: IRoom = game.getRoom(request.params.roomID);
        const data = await untilEventExists(room, request.params.lastID);
        result.DTO = data;
        result.success = true;
    } catch (error) {
        result.DTO = {};
        result.success = false;
        result.message = error.message;

        if (error instanceof CustomError) {
            response.statusCode = error.statusCode;
        }
    }
    response.json(result);
}

export async function recordPlayerMove(request: Request, response: Response, game: IGame) {
    const result: GeneralResponse = new GeneralResponse();
    try {
        const room: IRoom = game.getRoom(request.params.roomID);
        const data: { row: number, column: number } = request.body;
        const playerID = request.params.playerID;
        room.registerUserMove(playerID, data);

        result.success = true;
        result.DTO = {};
    } catch (error) {
        result.success = false;
        result.DTO = {};
        result.message = error.message;

        if (error instanceof CustomError) {
            response.statusCode = error.statusCode;
        }
    }
    response.json(result);
}
