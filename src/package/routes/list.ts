import { Express } from "express";
import * as func from "./functions";

import { GameImpl } from "../implementation/GameImpl";
import { IGame } from "../interface/IGame";

export function registerRoute(app: Express) {
    registerDebugRoute(app);

    const game: IGame = new GameImpl();
}

function registerDebugRoute(app: Express) {
    app.get("/", (request, response) => {
        func.helloWorld(request, response);
    });

    app.get("/id/:id", (request, response) => {
        func.showID(request, response);
    });

    app.get("/id/:id/name/:name", (request, response) => {
        func.showIDAndName(request, response);
    });

    app.post("/id/:id", (request, response) => {
        func.showNameFromBody(request, response);
    });
}
