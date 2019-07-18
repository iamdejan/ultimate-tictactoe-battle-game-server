import { RoomEventNoData } from "./RoomEventNoData";
import { RoomEventTypeEnum } from "../enum/RoomEventTypeEnum";
import { RoomEventWithData } from "./RoomEventWithData";
import { IPlayer } from "../interface/IPlayer";

export function buildGameBeginEvent(): RoomEventNoData {
    return new RoomEventNoData(RoomEventTypeEnum.GAME_START);
}

export function buildJoinRoomEvent(player: IPlayer): RoomEventWithData {
    return new RoomEventWithData(RoomEventTypeEnum.JOIN_ROOM, {
        player: {
            id: player.getID(),
            name: player.getName(),
        },
    });
}

export function buildLeaveRoomEvent(player: IPlayer): RoomEventWithData {
    return new RoomEventWithData(RoomEventTypeEnum.LEAVE_ROOM, {
        player: {
            id: player.getID(),
            name: player.getName(),
        },
    });
}
