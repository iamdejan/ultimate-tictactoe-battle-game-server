import test from "ava";

import { IGame } from "../package/interface/IGame";
import { IRoom } from "../package/interface/IRoom";

import { GameImpl } from "../package/implementation/GameImpl";
import { RoomImpl } from "../package/implementation/RoomImpl";

let game: IGame;

test.before((t) => {
    game = new GameImpl();
    const room = game.createRoom();

    t.notDeepEqual(room, undefined);
    t.notDeepEqual(room, null);
});

test("Get Room", (t) => {
    const room: IRoom = game.getRoom(1);
    const expectedRoom = new RoomImpl(1);

    t.deepEqual(room, expectedRoom, "Room isn't same!");
});
