import { ChatService } from './../../../services/chat.service';
import { RecentChat } from '../../../models/recent-chat';
import { MessageService } from './../../../services/message.service';
import { Component, Input } from "@angular/core";
import { Message } from "src/app/models/message";
import { User } from "src/app/models/user";
import * as moment from 'moment';
import { LoggedInUserService } from "src/app/services/logged-in-user.service";


@Component({
  selector: 'app-chat-message',
  templateUrl: 'chat-message.component.html'
})
export class ChatMessageComponent {

  @Input() message: Message = <Message>{};
  @Input() previousMessage: Message = <Message>{};
  @Input() allowsReply = false;
  loggedInUser: User = <User>{};
  receiver: RecentChat = <RecentChat>{};

  constructor(public loggedInUserService: LoggedInUserService, public chatService: ChatService, public messageService: MessageService) { }

  ngOnInit() {
    this.loggedInUser = this.getUser();
    this.receiver = this.getReceiver();
    this.chatService.onRecentChatSelection.subscribe((recentChat: RecentChat) => {
      this.receiver = this.getReceiver();
    });
  }

  getReceiver(): RecentChat {
    return this.chatService.getSelectedRecentChat();
  }

  getUser(): User {
    return this.loggedInUserService.getLoggedInUser();
  }

  getDateDivider(msg: Message): string {
    return msg.createdAt.format('l');
  }

  getUserName(user: User): string {
    return user.getFullName();
  }

  getCreatedDate(msg: Message): string {
    return msg.createdAt.format('LT');
  }

  isPredecessorSameAuthor(): boolean {
    if (!this.previousMessage) {
      return false;
    }
    return this.previousMessage.getSenderId() === this.message.getSenderId();
  }

  isTemporalClose(): boolean {
    if (!this.previousMessage) {
      return true;
    }

    const duration = moment.duration(
      this.message.createdAt.diff(this.previousMessage.createdAt)
    );
    return duration.asMinutes() <= 1;
  }

  isPreviousMessageFromOtherDay() {
    if (!this.previousMessage) {
      return true;
    }
    const prevDate = this.previousMessage.createdAt.day();
    const date = this.message.createdAt.day();
    return prevDate !== date;
  }
}
