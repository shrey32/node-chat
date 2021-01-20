import { Moment } from 'moment';
import { Message } from './message';

export interface Chat {
  id?: string;
  uid?: string;
  createdAt: Moment;
  count: number;
  messages: Message[];
  participants: string[];
  ownerId: string;
  typing: string[];
}
