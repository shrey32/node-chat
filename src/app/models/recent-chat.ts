import { Message } from 'src/app/models/message';
import { User } from './user';

export class RecentChat {

  private user: User = <User>{};
  private newMessages: Message[] = [];
  private typingStatus: string = '';

  constructor(user: User) {
    this.user = user;
  }

  getUser = (): User => {
    return this.user;
  }

  setTypingStatus = (typingStatus: string): void => {
    this.typingStatus = typingStatus;
  }

  getTypingStatus = (): string => {
    return this.typingStatus;
  }

  setNewMessages = (newMessages: Message[]): void => {
    this.newMessages = newMessages;
  }

  getNewMessages = (): Message[] => {
    return this.newMessages;
  }

  static blankRecentChat = (): RecentChat => {
    return new RecentChat(User.blankUser());
  }

}
