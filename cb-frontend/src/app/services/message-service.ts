import { Injectable } from '@angular/core';
import { Message } from '../objects/message';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private messages: Message[] = [];

  constructor() {
    this.messages.push(new Message("Sample Message 1"));
    this.messages.push(new Message("Sample Message 2"));
    this.messages.push(new Message("Sample Message 3"));
  }

  public GetMessages() {
    return this.messages;
  }
}
