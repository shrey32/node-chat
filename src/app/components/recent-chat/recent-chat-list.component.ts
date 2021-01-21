import { ChatService } from './../../services/chat.service';
import { RecentChat } from '../../models/recent-chat';
import { MessageService } from '../../services/message.service';


import { Component, OnInit } from "@angular/core";


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
  }

  onSelect = (recentChat: RecentChat): void => {
    this.chatService.setSelectedRecentChat(recentChat);
  }

}
