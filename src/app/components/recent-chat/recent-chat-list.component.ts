import { Component, OnInit } from "@angular/core";
import { Message } from 'src/app/models/message';
import { User } from 'src/app/models/user';
import { RecentChat } from 'src/app/models/recent-chat';
import { ChatService } from './../../services/chat.service';
import { UserService } from "src/app/services/user.service";


@Component({
  selector: 'app-recent-chat-list',
  templateUrl: 'recent-chat-list.component.html',
  styleUrls: ['recent-chat-list.component.scss']
})
export class RecentChatListComponent implements OnInit {

  recentChatList: RecentChat[] = [];
  recentGroups: [] = [];

  constructor(public chatService: ChatService, public userService: UserService) {
  }

  ngOnInit(): void {

    this.recentChatList = this.chatService.getRecentChatList();
    if (this.recentChatList.length > 0) {
      this.chatService.setSelectedRecentChat(this.recentChatList[0]);
    }

    //on receiving message
    this.chatService.receive().subscribe((message: Message) => {
      this.updateRecentChatListForMessage(message.getSenderId(), message);
    });

    //Typing event
    this.chatService.receiveTyping().subscribe((data: any) => {
      this.updateRecentChatListTypingEvents(data.senderId, 'Typing...');
    });

    //deleting event
    this.chatService.receiveDeleting().subscribe((data: any) => {
      setTimeout(() => this.updateRecentChatListTypingEvents(data.senderId, ''), 1000);
    });
  }

  /**
   *
   * @param userId
   * @param msg
   */
  updateRecentChatListForMessage = (userId: number, msg: Message): void => {
    const filtered = this.recentChatList.filter((chat: RecentChat) => chat.getUser().getId() === userId);
    if (filtered.length > 0) {
      if (this.chatService.getSelectedRecentChat() && this.chatService.getSelectedRecentChat().getUser().getId() !== userId) {
        filtered[0].getNewMessages().push(msg);
      }
    } else {
      this.userService.getUserDetailsById(userId).subscribe((user: User) => {
        const recentChat: RecentChat = new RecentChat(user);
        this.recentChatList.push(recentChat);
        if (!this.chatService.getSelectedRecentChat()) {
          this.chatService.setSelectedRecentChat(recentChat);
          const newMessages: Message[] = [];
          newMessages.push(msg);
          recentChat.setNewMessages(newMessages);
        } else {
          recentChat.getNewMessages().push(msg);
        }

      }, error => {
        console.log(error);
      });
    }
  }

  getUnreadMessageCount = (recentChat: RecentChat): number => {
    if (!recentChat || recentChat.getNewMessages().length == 0)
      return 0;
    return recentChat.getNewMessages().length;
  }

  /**
   *
   * @param userId
   * @param msg
   */
  updateRecentChatListTypingEvents = (userId: number, msg: string): void => {
    const filtered = this.recentChatList.filter((chat: RecentChat) => chat.getUser().getId() === userId);
    if (filtered.length > 0)
      filtered[0].setTypingStatus(msg);
  }

  onSelect = (recentChat: RecentChat): void => {
    this.chatService.setSelectedRecentChat(recentChat);
  }

  lastMessage = (recentChat: RecentChat): string => {
    if (recentChat.getTypingStatus() !== '')
      return recentChat.getTypingStatus();
    const len = recentChat.getNewMessages().length;
    return (len > 0) ? recentChat.getNewMessages()[len - 1].getMessage() : '';
  }

}
