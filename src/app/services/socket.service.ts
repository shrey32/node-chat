import { LoggedInUserService } from './logged-in-user.service';
import { environment } from '../../environments/environment';
import { EventEmitter, Injectable, Output } from "@angular/core";
import { io } from 'socket.io-client';
import { Message } from '../models/message';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SocketService {

  private socket: any;
  private receiver: Observable<Message> = <Observable<Message>>{};
  private typingObservable: Observable<any> = <Observable<any>>{};
  private deletingObservable: Observable<any> = <Observable<any>>{};

  constructor(public loggedInUserService: LoggedInUserService) {
  }

  init = (): void => {
    this.socket = io(environment.SOCKET_ENDPOINT, { query: 'chatID=' + this.loggedInUserService.getLoggedInUser().getId() });
    this.socket.on("connect", () => {
      console.log("connected to the chat server", +this.socket.id)
    });

    this.receiver = new Observable<Message>(observer => {
      this.socket.on('receive_message', (msg: any) => {
        console.log("received", msg);
        const msgObj: Message = new Message(msg.id, msg.message, msg.senderId, msg.receiverId, false);
        observer.next(msgObj);
      });
    });

    this.typingObservable = new Observable<any>(observer => {
      this.socket.on('typing_to', (data: any) => {
        observer.next(data);
      });
    });

    this.deletingObservable = new Observable<any>(observer => {
      this.socket.on('deleting_to', (data: any) => {
        observer.next(data);
      });
    });
  }

  receive = (): Observable<Message> => {
    return this.receiver;
  }

  send = (message: Message, onSend: EventEmitter<Message>): void => {
    this.socket.emit('send_message', message);
    onSend.emit(message);
  }

  receiveTyping = (): Observable<any> => {
    return this.typingObservable;
  }

  receiveDeleting = (): Observable<any> => {
    return this.typingObservable;
  }

  sendTyping = (event: any): void => {
    this.socket.emit('typing_from', event);
  }

  sendDeleting = (event: any): void => {
    this.socket.emit('deleting_from', event);
  }

}
