import { ChatListener } from '../models/chat.listener';
import { environment } from '../../environments/environment';
import { Injectable } from "@angular/core";
import { io } from 'socket.io-client';

@Injectable({ providedIn: 'root' })
export class SocketService {

  private socket: any;

  constructor() {
  }

  init = (listener: ChatListener): void => {
    this.socket = io(environment.SOCKET_ENDPOINT);

    this.socket.on('message', (data: string) => {
      if (data)
        listener.onRecievingMessage(data);
    });
  }

  sendMessage = (message: string) => {
    this.socket.emit('message', message);
  }

}
