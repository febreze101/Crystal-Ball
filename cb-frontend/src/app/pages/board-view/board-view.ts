import { Component, inject, signal } from '@angular/core';
import { Message } from '../../objects/message';
import { MessageService } from '../../services/message-service';

@Component({
  selector: 'app-board-view',
  imports: [],
  templateUrl: './board-view.html',
  styleUrl: './board-view.scss',
})
export class BoardView {
  public messageList = signal([] as Message[]);
  private messageService = inject(MessageService);

  constructor() {
    this.messageList.set(this.messageService.GetMessages());
  }
}
