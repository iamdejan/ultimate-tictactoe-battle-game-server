export class Position {
    public row: number;
    public column: number;

    constructor(data: { row: number, column: number }) {
        this.row = data.row;
        this.column = data.column;
    }

    public clone(): Position {
        return new Position({ row: this.row, column: this.column });
    }
}
