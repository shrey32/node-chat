import { Observable } from 'rxjs';
import { SocketService } from 'src/app/services/socket.service';
import { UserService } from './user.service';
import { EventEmitter, Injectable, Output } from "@angular/core";
import { RecentChat } from "../models/recent-chat";
import { User } from '../models/user';
import { Message } from '../models/message';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  @Output() onRecentChatSelection: EventEmitter<RecentChat> = new EventEmitter();
  @Output() onSend: EventEmitter<Message> = new EventEmitter<Message>();

  recentChat: RecentChat = <RecentChat>{};

  constructor(public userService: UserService, public socketService: SocketService) {

  }

  init = (): void => {
    this.socketService.init();
  }

  receive = (): Observable<Message> => {
    return this.socketService.receive();
  }

  receiveTyping = (): Observable<any> => {
    return this.socketService.receiveTyping();
  }

  receiveDeleting = (): Observable<any> => {
    return this.socketService.receiveDeleting();
  }

  send = (message: Message): void => {
    this.socketService.send(message, this.onSend);
  }

  sendTyping = (data: any): void => {
    this.socketService.sendTyping(data);
  }

  sendDeleting = (data: any): void => {
    this.socketService.sendDeleting(data);
  }

  getRecentChatList = (loggedInUserId?: number, limit?: number): RecentChat[] => {
    const recentChatList: RecentChat[] = [];
    const users: User[] = this.userService.getUsers();
    for (let user of users) {
      recentChatList.push(new RecentChat(user));
    }
    return recentChatList
  }


  setSelectedRecentChat = (recentChat: RecentChat): void => {
    this.recentChat = recentChat;
    this.onRecentChatSelection.emit(this.recentChat);
  }

  getSelectedRecentChat = (): RecentChat => {
    return this.recentChat;
  }

}
