import { IEventCenter } from "../interface/IEventCenter";
import { IRoomEvent } from "../interface/IRoomEvent";

export class EventCenterImpl implements IEventCenter {
    public events: IRoomEvent[];

    constructor() {
        this.events = [];
    }

    public getList(lastID: number): {} {
        return {
            events: this.events.slice(lastID + 1),
            lastID: this.events.length - 1,
        };
    }

    public put(event: IRoomEvent) {
        this.events.push(event);
    }

}
