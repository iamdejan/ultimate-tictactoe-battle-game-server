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

        response.statusCode = 500;
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
        response.statusCode = 500;
    }
    response.json(result);
}

async function delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

async function untilEventExists(room: IRoom, lastID: number) {
    let data = room.eventCenter.getList(lastID);
    while (data.events.length < 1) {
        await delay(50);
        data = room.eventCenter.getList(lastID);
    }

    return data;
}

export async function getRoomEventList(request: Request, response: Response, game: IGame) {
    const result: GeneralResponse = new GeneralResponse();
    try {
        const room: IRoom = game.getRoom(request.params.roomID);
        const data = await untilEventExists(room, request.params.lastID);
        result.result = data;
        result.success = true;
    } catch (error) {
        result.result = {};
        result.success = false;
        result.message = error.message;

        response.statusCode = 403;
    }
    response.json(result);
}
