import { Injectable } from '@angular/core';
import { Message } from '../objects/message';
import { Globals } from '../../globals';
import { MessageContract } from '../contracts/message-contract';

@Injectable({
  providedIn: 'root',
})
export class MessageService {

  constructor() {

  }

  public async GetMessages() {
    let result: Message[] = [];
    try {
      const response = await fetch(Globals.BASE_API_URL + "boards/1/messages/", {
        method: 'GET',
        headers: {
          Accept: 'application/json'
        }
      })

      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }

      //console.log(await response.json())
      const mResponse = (await response.json()) as MessageContract[];

      mResponse.forEach(element => {
        console.log(element)
        let m: Message = new Message(element.content, new Date(Date.parse(element.created_at)));
        result.push(m);
      });
      
      return result;
    }
    catch (error) {
      if (error instanceof Error) {
        console.log('error message: ', error.message);
        return [];
      } else {
        console.log('unexpected error: ', error);
        return [];
      }
    }
  }
}
