import { RecentlyMessagedUser } from './../../models/recent-messaged-users';
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
  templateUrl: './chat.component.html'
})
export class ChatComponent implements OnInit, ChatListener {

  senderName: string = '';
  receiverName: string = '';
  selectedRecentMessagedUser: RecentlyMessagedUser = <RecentlyMessagedUser>{};
  messages: Message[] = [];
  messageText: string = '';
  message: Message = <Message>{};

  constructor(
    public loggedInUserService: LoggedInUserService,
    public messageService: MessageService,
    public socketService: SocketService
  ) { }

  ngOnInit() {
    this.init();
    this.messageService.onRecentMessageUserSelection.subscribe((rmu: RecentlyMessagedUser) => {
      this.init();
    });
  }

  init = (): void => {
    this.selectedRecentMessagedUser = this.messageService.getSelectedRecentMessageUser();
    this.senderName = this.loggedInUser().getFullName();
    this.receiverName = this.selectedRecentMessagedUser.getFullName();
    this.messages = this.getMessages();
  }

  loggedInUser = (): User => {
    return this.loggedInUserService.getLoggedInUser();
  }

  getMessages = (): Message[] => {
    return this.messageService.retrieveMessages(this.selectedRecentMessagedUser.getId());
  }

  onRecievingMessage(message: Message) {
    message.setMine(false);
    this.messages.push(message);
    this.scrollBottom();
  }

  send = () => {
    const senderId: number = this.loggedInUser().getId();
    const receiverId: number = this.selectedRecentMessagedUser.getId();
    const msg: Message = new Message(new Date().getTime(), this.messageText, senderId, receiverId, true,);
    this.messages.push(msg);
    this.scrollBottom();
    this.socketService.sendMessage(this.messageText);
    this.messageText = '';
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
