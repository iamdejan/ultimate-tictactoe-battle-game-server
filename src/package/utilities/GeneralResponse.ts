export class GeneralResponse {
    public success: boolean;
    public DTO: {};
    public message: string;

    constructor() {
        this.success = false;
        this.DTO = {};
        this.message = "";
    }
}
