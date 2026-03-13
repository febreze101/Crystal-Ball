export class Message {
    public timestamp: Date;
    public message: String;

    constructor(message: String) {
        this.message = message;
        this.timestamp = new Date();
    }
}