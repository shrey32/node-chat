import { Message } from './message';
import { ChatListener } from './chat.listener';
import { Component, OnInit } from '@angular/core';
import { SocketService } from './socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, ChatListener {

  socket: any;
  message: string = ''
  messageList: Message[] = [];

  constructor(public socketService: SocketService) {

  }


  onRecievingMessage = (data: any): void => {
    this.messageList.push(new Message(data, false));
  }

  ngOnInit() {
    console.log('App is initialized');
    this.socketService.init(this);
  }

  send = () => {
    this.messageList.push(new Message(this.message, true));
    this.socketService.sendMessage(this.message);
    this.message = '';
  }

}
