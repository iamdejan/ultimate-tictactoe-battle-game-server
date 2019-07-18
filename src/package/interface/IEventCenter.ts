import { IRoomEvent } from "./IRoomEvent";

export interface IEventCenter {

    put(event: IRoomEvent): void;

    getList(lastID: number): { events: IRoomEvent[], newLastID: number };
}
