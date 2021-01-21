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

  recentChat: RecentChat = <RecentChat>{};

  constructor(public userService: UserService, public socketService: SocketService) {

  }

  init = (): void => {
    this.socketService.init();
  }

  receive = (): Observable<Message> => {
    return this.socketService.receive();
  }

  send = (message: Message): void => {
    this.socketService.send(message);
  }

  getRecentChatList = (loggedInUserId?: number, limit?: number): RecentChat[] => {
    const recentChatList: RecentChat[] = [];
    const users: User[] = this.userService.getUsers();
    for (let user of users) {
      recentChatList.push(new RecentChat(user, <Message>{}));
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
