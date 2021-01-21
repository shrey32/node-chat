import { RecentChat } from './../../../models/recent-chat';
import { Component, Input } from "@angular/core";
import { MessageService } from 'src/app/services/message.service';
import { ChatService } from 'src/app/services/chat.service';


@Component({
  selector: 'app-chat-header',
  templateUrl: 'chat-header.component.html'
})
export class ChatHeaderComponent {

  selectedRecentChat: RecentChat = <RecentChat>{};

  constructor(
    public messageService: MessageService,
    public chatService: ChatService
  ) { }

  ngOnInit() {
    this.selectedRecentChat = this.chatService.getSelectedRecentChat();
    this.chatService.onRecentChatSelection.subscribe((recentChat: RecentChat) => {
      this.selectedRecentChat = recentChat;
    });
  }

}
