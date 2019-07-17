import { Express } from "express";
import * as func from "./functions";

export function registerRoute(app: Express) {
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
