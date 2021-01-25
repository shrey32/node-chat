import { RecentChat } from './../../../models/recent-chat';
import { Component, Input } from "@angular/core";
import { MessageService } from 'src/app/services/message.service';
import { ChatService } from 'src/app/services/chat.service';


@Component({
  selector: 'app-chat-header',
  templateUrl: 'chat-header.component.html',
  styleUrls: ['chat-header.component.scss']
})
export class ChatHeaderComponent {

  selectedRecentChat: RecentChat = <RecentChat>{};
  subtitle: string = '';

  constructor(
    public messageService: MessageService,
    public chatService: ChatService
  ) { }

  ngOnInit() {
    this.selectedRecentChat = this.chatService.getSelectedRecentChat();
    this.chatService.onRecentChatSelection.subscribe((recentChat: RecentChat) => {
      this.selectedRecentChat = recentChat;
    });

    this.chatService.receiveTyping().subscribe((data: any) => {
      if (data.senderId == this.selectedRecentChat.getUser().getId())
        this.subtitle = 'Typing...';
    });

    this.chatService.receiveDeleting().subscribe((data: any) => {
      if (data.senderId == this.selectedRecentChat.getUser().getId())
        setTimeout(() => this.subtitle = '', 1000);
    });
  }

}
