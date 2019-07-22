import { RoomEventTypeEnum } from "../enum/RoomEventTypeEnum";
import { RoomEventWithData } from "./RoomEventWithData";
import { IPlayer } from "../interface/IPlayer";
import { Position } from "../utilities/Position";

export function buildGameBeginEvent(): RoomEventWithData {
    return new RoomEventWithData(RoomEventTypeEnum.GAME_START, {
        nextPlayerSign: "X",
    });
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

export function buildValidMoveGameEvent(playerSign: string, position: Position, nextPlayerSign: string): RoomEventWithData {
    return new RoomEventWithData(RoomEventTypeEnum.VALID_MOVE, {
        nextPlayerSign: nextPlayerSign,
        playerSign: playerSign,
        position: position,
    });
}

export function buildInvalidMoveGameEvent(playerSign: string, position: Position): RoomEventWithData {
    return new RoomEventWithData(RoomEventTypeEnum.INVALID_MOVE, {
        playerSign: playerSign,
        position: position,
    });
}

export function buildWinLocalBoardGameEvent(playerSign: string, globalPosition: Position): RoomEventWithData {
    return new RoomEventWithData(RoomEventTypeEnum.WIN_LOCAL_BOARD, {
        globalPosition: globalPosition,
        playerSign: playerSign,
        sign: playerSign,
    });
}
