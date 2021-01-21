import { ChatService } from './../../services/chat.service';
import { RecentChat } from '../../models/recent-chat';
import { ChatListener } from './../../models/chat.listener';
import { SocketService } from 'src/app/services/socket.service';
import { MessageService } from './../../services/message.service';
import { LoggedInUserService } from './../../services/logged-in-user.service';
import { Component, OnInit, Input } from '@angular/core';
import { Message } from 'src/app/models/message';
import { Moment } from 'moment';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-chat',
  templateUrl: 'chat.component.html'
})
export class ChatComponent implements OnInit {

  senderName: string = '';
  receiverName: string = '';
  selectedRecentChat: RecentChat = <RecentChat>{};
  messages: Message[] = [];
  messageText: string = '';
  message: Message = <Message>{};

  constructor(
    public loggedInUserService: LoggedInUserService,
    public messageService: MessageService,
    public chatService: ChatService
  ) { }

  ngOnInit() {
    this.init();
    this.chatService.onRecentChatSelection.subscribe((recentChat: RecentChat) => {
      this.init();
    });
  }

  init = (): void => {
    this.selectedRecentChat = this.chatService.getSelectedRecentChat();
    this.senderName = this.loggedInUser().getFullName();
    this.receiverName = this.selectedRecentChat.getUser().getFullName();
    this.messages = this.getMessages();
    this.chatService.receive().subscribe((message: Message) => {
      this.messages.push(message);
    });
  }

  loggedInUser = (): User => {
    return this.loggedInUserService.getLoggedInUser();
  }

  getMessages = (): Message[] => {
    return this.messageService.retrieveMessages(this.selectedRecentChat.getUser().getId());
  }

  private isSameMessage(message: Message, newMessage: Message): boolean {
    return (
      message.getMessage() === newMessage.getMessage() &&
      message.getId() === newMessage.getId() &&
      message.createdAt.isSame(newMessage.createdAt)
    );
  }

  trackByCreated = (message: Message): Moment => {
    return message.createdAt;
  }

  private scrollBottom() {
    setTimeout(() => window.scrollTo(0, document.body.scrollHeight), 500);
  }
}
