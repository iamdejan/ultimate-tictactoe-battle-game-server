import { IRoomEvent } from "../interface/IRoomEvent";
import { RoomEventTypeEnum } from "../enum/RoomEventTypeEnum";

export class RoomEventNoData implements IRoomEvent {
    public type: RoomEventTypeEnum;
    constructor(eventType: RoomEventTypeEnum) {
        this.type = eventType;
    }
}
