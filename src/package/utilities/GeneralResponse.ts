export class GeneralResponse {
    public success: boolean;
    public result: {};
    public message: string;

    constructor() {
        this.success = false;
        this.result = {};
        this.message = "";
    }
}
