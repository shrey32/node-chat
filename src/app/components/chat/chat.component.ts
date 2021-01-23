import { ChatService } from './../../services/chat.service';
import { RecentChat } from '../../models/recent-chat';
import { MessageService } from './../../services/message.service';
import { LoggedInUserService } from './../../services/logged-in-user.service';
import { Component, OnInit } from '@angular/core';
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
    this.chatService.onRecentChatSelection.subscribe(() => {
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
      this.scrollBottom();
    });
    this.chatService.onSend.subscribe((message: Message) => {
      this.messages.push(message);
      this.scrollBottom();
    });
  }

  private scrollBottom(): void {
    setTimeout(() => window.scrollTo(0, document.body.scrollHeight), 500);
  }

  loggedInUser = (): User => {
    return this.loggedInUserService.getLoggedInUser();
  }

  getMessages = (): Message[] => {
    return this.messageService.retrieveMessages(this.selectedRecentChat.getUser().getId());
  }


  trackByCreated = (message: Message): Moment => {
    return message.createdAt;
  }

}
