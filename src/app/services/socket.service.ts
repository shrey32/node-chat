import { LoggedInUserService } from './logged-in-user.service';
import { environment } from '../../environments/environment';
import { EventEmitter, Injectable, Output } from "@angular/core";
import { io } from 'socket.io-client';
import { Message } from '../models/message';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SocketService {

  private socket: any;
  private receiver: Observable<Message>;
  @Output() onSend: EventEmitter<Message> = new EventEmitter<Message>();

  constructor(public loggedInUserService: LoggedInUserService) {
  }

  init = (): void => {
    this.socket = io(environment.SOCKET_ENDPOINT, { query: 'chatID=' + this.loggedInUserService.getLoggedInUser().getId() });
    this.socket.on("connect", () => {
      console.log("connected to the chat server", +this.socket.id)
    });

    this.receiver = new Observable<Message>(observer => {
      this.socket.on('receive_message', (message: Message) => {
        console.log("received", message);
        observer.next(message);
      });
    });

  }

  receive = (): Observable<Message> => {
    return this.receiver;
  }

  send = (message: Message): void => {
    this.socket.emit('send_message', message);
    this.onSend.emit(message);
  }

}
