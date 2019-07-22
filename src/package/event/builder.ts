import { RoomEventNoData } from "./RoomEventNoData";
import { RoomEventTypeEnum } from "../enum/RoomEventTypeEnum";
import { RoomEventWithData } from "./RoomEventWithData";
import { IPlayer } from "../interface/IPlayer";
import { Position } from "../utilities/Position";

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

export function buildValidMoveGameEvent(playerID: number, position: Position): RoomEventWithData {
    return new RoomEventWithData(RoomEventTypeEnum.VALID_MOVE, {
        playerID: playerID,
        position: position,
    });
}

export function buildInvalidMoveGameEvent(playerID: number, position: Position): RoomEventWithData {
    return new RoomEventWithData(RoomEventTypeEnum.INVALID_MOVE, {
        playerID: playerID,
        position: position,
    });
}

export function buildWinLocalBoardGameEvent(playerID: number, playerSign: string, globalPosition: Position): RoomEventWithData {
    return new RoomEventWithData(RoomEventTypeEnum.WIN_LOCAL_BOARD, {
        globalPosition: globalPosition,
        playerID: playerID,
        sign: playerSign,
    });
}
