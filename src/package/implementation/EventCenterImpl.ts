import { IEventCenter } from "../interface/IEventCenter";
import { IRoomEvent } from "../interface/IRoomEvent";

export class EventCenterImpl implements IEventCenter {
    private events: IRoomEvent[];

    constructor() {
        this.events = [];
    }

    public getList(lastID: number): { events: IRoomEvent[], newLastID: number } {
        lastID = Number.parseInt(lastID + "", 10);
        return {
            events: this.events.slice(lastID + 1),
            newLastID: this.events.length - 1,
        };
    }

    public put(event: IRoomEvent): void {
        this.events.push(event);
    }

}
