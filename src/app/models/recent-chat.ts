import { Message } from 'src/app/models/message';
import { User } from './user';

export class RecentChat {

  private user: User = <User>{};
  private lastMessage: Message = <Message>{};

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

}
