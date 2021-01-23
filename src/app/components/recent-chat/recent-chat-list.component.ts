import { Component, OnInit } from "@angular/core";
import { Message } from 'src/app/models/message';
import { RecentChat } from 'src/app/models/recent-chat';
import { ChatService } from './../../services/chat.service';


@Component({
  selector: 'app-recent-chat-list',
  templateUrl: 'recent-chat-list.component.html'
})
export class RecentChatListComponent implements OnInit {

  recentChatList: RecentChat[] = [];
  recentGroups: [] = [];

  constructor(public chatService: ChatService) {
  }

  ngOnInit(): void {

    this.recentChatList = this.chatService.getRecentChatList();
    if (this.recentChatList.length > 0) {
      this.chatService.setSelectedRecentChat(this.recentChatList[0]);
    }
    this.chatService.receive().subscribe((message: Message) => {
      this.chatService.getSelectedRecentChat().setLastMessage(message);
    });
    this.chatService.receiveTyping().subscribe((data: any) => {
      const recentChat: RecentChat = this.findTypingUser(data.senderId);
      recentChat.setTypingStatus('Typing...');
    });

    this.chatService.receiveDeleting().subscribe((data: any) => {
      const recentChat: RecentChat = this.findTypingUser(data.senderId);
      setTimeout(() => recentChat.setTypingStatus(''), 1000);
    });
  }

  findTypingUser = (userId: number): RecentChat => {
    const filtered = this.recentChatList.filter((chat: RecentChat) => chat.getUser().getId() === userId);
    return filtered.length > 0 ? filtered[0] : RecentChat.blankRecentChat();
  }

  onSelect = (recentChat: RecentChat): void => {
    this.chatService.setSelectedRecentChat(recentChat);
  }

  lastMessage = (recentChat: RecentChat): string => {
    if (recentChat.getTypingStatus() == '')
      return (recentChat.getLastMessage()) ? recentChat.getLastMessage().getMessage() : '';
    return recentChat.getTypingStatus();
  }

}
