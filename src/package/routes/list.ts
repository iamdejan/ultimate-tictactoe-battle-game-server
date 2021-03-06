import { Express } from "express";
import * as func from "./functions";

import { GameImpl } from "../implementation/GameImpl";
import { IGame } from "../interface/IGame";

export function registerRoute(app: Express) {
    registerDebugRoute(app);

    const game: IGame = new GameImpl();

    app.get("/room/create", (request, response) => {
        func.createRoom(request, response, game);
    });

    app.post("/room/:roomID/join", (request, response) => {
        func.joinRoom(request, response, game);
    });

    app.delete("/room/:roomID/player/:playerSign/leave", (request, response) => {
        func.leaveRoom(request, response, game);
    });

    app.get("/room/:roomID/events/:lastID", (request, response) => {
        func.getRoomEventList(request, response, game);
    });

    app.post("/room/:roomID/player/:playerSign/move", (request, response) => {
        func.recordPlayerMove(request, response, game);
    });
}

function registerDebugRoute(app: Express) {
    app.get("/", (request, response) => {
        response.send(JSON.stringify({
            message: "Hello world",
        }));
    });

    app.get("/id/:id", (request, response) => {
        response.send(request.params);
    });

    app.get("/id/:id/name/:name", (request, response) => {
        response.send(JSON.stringify({
            id: request.params.id,
            name: request.params.name,
        }));
    });

    app.post("/id/:id", (request, response) => {
        response.send(request.body);
    });
}
