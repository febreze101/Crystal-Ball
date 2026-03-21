export class Message {
    public timestamp: Date;
    public message: String;

    constructor(message: String, timestamp: Date) {
        this.message = message;
        this.timestamp = timestamp;
    }
}