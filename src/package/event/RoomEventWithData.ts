import { IRoomEvent } from "../interface/IRoomEvent";
import { RoomEventTypeEnum } from "../enum/RoomEventTypeEnum";

export class RoomEventWithData implements IRoomEvent {
    public type: RoomEventTypeEnum;
    public data: {};
    constructor(eventCode: RoomEventTypeEnum, data: {}) {
        this.data = data;
        this.type = eventCode;
    }
}
