import { formattedDate } from './../utils/date';
import { Moment } from 'moment';
import * as moment from 'moment';

export class Message {

  private id: number;
  private message: string = '';
  private mine: boolean = false;
  private senderId: number;
  private receiverId: number;
  private time: Date;
  public createdAt: Moment;
  public attachments: [] = [];
  public isRead: boolean = false;

  constructor(id: number, message: string, senderId: number, receiverId: number, mine: boolean) {
    this.id = id;
    this.message = message;
    this.senderId = senderId;
    this.receiverId = receiverId;
    this.mine = mine;
    this.time = new Date();
    this.createdAt = moment(new Date(), 'DD/MM/YYYY')
  }

  setId = (id: number): void => {
    this.id = id;
  }

  getId = (): number => {
    return this.id;
  }

  getMessage = (): string => {
    return this.message;
  }

  isMine = (): boolean => {
    return this.mine;
  }

  setMine = (isMine: boolean): void => {
    this.mine = isMine;
  }

  getTime = (): Date => {
    return this.time;
  }

  getFormattedTime = (): string => {
    return formattedDate(this.getTime());
  }

  getSenderId = (): number => {
    return this.senderId;
  }

  getReceiverId = (): number => {
    return this.receiverId;
  }

  static blankMessage = (): Message => {
    return new Message(-1, '', -1, -1, false);
  }

}
