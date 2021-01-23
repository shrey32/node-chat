import { Message } from 'src/app/models/message';
import { User } from './user';

export class RecentChat {

  private user: User = <User>{};
  private lastMessage: Message = <Message>{};
  private typingStatus: string = '';

  constructor(user: User, lastMessage: Message) {
    this.user = user;
    this.lastMessage = lastMessage;
  }

  getUser = (): User => {
    return this.user;
  }

  getLastMessage = (): Message => {
    return this.lastMessage;
  }

  setLastMessage = (message: Message): void => {
    this.lastMessage = message;
  }

  setTypingStatus = (typingStatus: string): void => {
    this.typingStatus = typingStatus;
  }

  getTypingStatus = (): string => {
    return this.typingStatus;
  }

  static blankRecentChat = (): RecentChat => {
    return new RecentChat(User.blankUser(), Message.blankMessage());
  }

}
