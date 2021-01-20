import { Message } from 'src/app/models/message';
import { Status } from "../enums/status";

export class RecentlyMessagedUser {

  private id: number;
  private fullName: string = '';
  private status: Status = Status.ONLINE;
  private avatar: string = '';
  private lastMessage: Message = <Message>{};

  constructor(id: number, fullName: string, avatar: string) {
    this.id = id;
    this.fullName = fullName;
    this.avatar = avatar;
  }

  getId = (): number => {
    return this.id;
  }

  getFullName = (): string => {
    return this.fullName;
  }

  getStatus = (): Status => {
    return this.status;
  }

  getAvatar = (): string => {
    return this.avatar;
  }

  setLastMessage = (lastMessage: Message): void => {
    this.lastMessage = lastMessage;
  }

  getLastMessage = (): Message => {
    return this.getLastMessage();
  }
}
