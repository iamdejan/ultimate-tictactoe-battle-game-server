import { Express, Request, Response } from "express";

export async function helloWorld(request: Request, response: Response) {
    response.send(JSON.stringify({
        message: "Hello world",
    }));
}

export async function showID(request: Request, response: Response) {
    response.send(request.params);
}

export async function showIDAndName(request: Request, response: Response) {
    response.send(JSON.stringify({
        id: request.params.id,
        name: request.params.name,
    }));
}

export async function showNameFromBody(request: Request, response: Response) {
    response.send(request.body);
}
