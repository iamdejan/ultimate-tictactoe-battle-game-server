import { IRoomEvent } from "../interface/IRoomEvent";
import { RoomEventTypeEnum } from "../enum/RoomEventTypeEnum";

export class RoomEventWithData implements IRoomEvent {
    public type: RoomEventTypeEnum;
    public DTO: {};
    constructor(eventCode: RoomEventTypeEnum, data: {}) {
        this.DTO = data;
        this.type = eventCode;
    }
}
