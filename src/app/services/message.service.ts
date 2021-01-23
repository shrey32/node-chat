import { ChatService } from 'src/app/services/chat.service';
import { Message } from 'src/app/models/message';
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class MessageService {


  constructor(public chatService: ChatService) {

  }

  retrieveMessages = (id: number): Message[] => {
    let messages: Message[] = [];
    if (id === 1234) {
      messages.push(new Message(new Date().getTime(), 'Hello', 1234, 12345, false));
      messages.push(new Message(new Date().getTime(), 'Hi', 12345, 1234, true));
      messages.push(new Message(new Date().getTime(), 'How\'re you?', 1234, 12345, false));
      messages.push(new Message(new Date().getTime(), 'All set for work?', 1234, 12345, false));
      messages.push(new Message(new Date().getTime(), 'I am good thanks, how\'re you?', 12345, 1234, true));
      messages.push(new Message(new Date().getTime(), 'I am well too. Thanks!', 1234, 12345, false));
      messages.push(new Message(new Date().getTime(), 'So, How can I help you?', 12345, 1234, true));
      messages.push(new Message(new Date().getTime(), 'Need some help', 12345, 1234, true));
      messages.push(new Message(new Date().getTime(), 'Nothing, just wanted to have a catchup', 1234, 12345, false));
      messages.push(new Message(new Date().getTime(), 'about the last project', 1234, 12345, false));
    } else if (id === 12345) {
      messages.push(new Message(new Date().getTime(), 'Hello', 1234, 12345, true));
      messages.push(new Message(new Date().getTime(), 'Hi', 12345, 1234, false));
      messages.push(new Message(new Date().getTime(), 'How\'re you?', 1234, 12345, true));
      messages.push(new Message(new Date().getTime(), 'All set for work?', 1234, 12345, true));
      messages.push(new Message(new Date().getTime(), 'I am good thanks, how\'re you?', 12345, 1234, false));
      messages.push(new Message(new Date().getTime(), 'I am well too. Thanks!', 1234, 12345, true));
      messages.push(new Message(new Date().getTime(), 'So, How can I help you?', 12345, 1234, false));
      messages.push(new Message(new Date().getTime(), 'Need some help', 12345, 1234, false));
      messages.push(new Message(new Date().getTime(), 'Nothing, just wanted to have a catchup', 1234, 12345, true));
      messages.push(new Message(new Date().getTime(), 'about the last project', 1234, 12345, true));
    } else if (id === 123456) {
      messages.push();
    } else if (id === 123457) {
      messages.push();
    } else if (id === 123458) {
      messages.push();
    }
    return messages;
  }

}
