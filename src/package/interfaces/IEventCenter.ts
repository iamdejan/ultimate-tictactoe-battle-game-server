import { IRoomEvent } from "./IRoomEvent";

export interface IEventCenter {
    events: IRoomEvent[];

    getList(lastID: number): {};
}
