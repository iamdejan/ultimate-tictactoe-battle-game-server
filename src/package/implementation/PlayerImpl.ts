import { IPlayer } from "../interface/IPlayer";

export class PlayerImpl implements IPlayer {

    public sign!: string;
    private id: number;
    private name: string;

    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }

    public getID(): number {
        return this.id;
    }

    public getName(): string {
        return this.name;
    }

}
