import { Message } from 'src/app/models/message';
import { RecentlyMessagedUser } from './../models/recent-messaged-users';
import { Injectable, Output } from "@angular/core";
import { EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  @Output() onRecentMessageUserSelection: EventEmitter<RecentlyMessagedUser> = new EventEmitter();

  recentlyMessagedUser: RecentlyMessagedUser = <RecentlyMessagedUser>{};

  constructor() {

  }

  getRecentlyMessagedUsers = () => {
    const recentlyMessagedUsers: RecentlyMessagedUser[] = [];
    recentlyMessagedUsers.push(new RecentlyMessagedUser(12345, "Adam Driver", '../../assets/adam_driver.jpg'));
    recentlyMessagedUsers.push(new RecentlyMessagedUser(123456, "Tom Hanks", '../../assets/tom_hanks.jpg'));
    recentlyMessagedUsers.push(new RecentlyMessagedUser(123457, "Robert Dinero", '../../assets/robert_deniro.jpg'));
    recentlyMessagedUsers.push(new RecentlyMessagedUser(123458, "Dwayne Johnson", '../../assets/dwayne_jhonson.jpeg'));
    return recentlyMessagedUsers
  }


  setSelectedRecentMessageUser = (recentlyMessagedUser: RecentlyMessagedUser): void => {
    this.recentlyMessagedUser = recentlyMessagedUser;
    this.onRecentMessageUserSelection.emit(this.recentlyMessagedUser);
  }

  getSelectedRecentMessageUser = (): RecentlyMessagedUser => {
    return this.recentlyMessagedUser;
  }

  retrieveMessages = (id: number, limt?: number): Message[] => {
    let messages: Message[] = [];
    if (id === 12345) {
      messages.push(new Message('Hello', 1234, 12345, true));
      messages.push(new Message('Hi', 12345, 1234, false));
      messages.push(new Message('How\'re you?', 1234, 12345, true));
      messages.push(new Message('All set for work?', 1234, 12345, true));
      messages.push(new Message('I am good thanks, how\'re you?', 12345, 1234, false));
      messages.push(new Message('I am well too. Thanks!', 1234, 12345, true));
      messages.push(new Message('So, How can I help you?', 12345, 1234, false));
      messages.push(new Message('Need some help', 12345, 1234, false));
      messages.push(new Message('Nothing, just wanted to have a catchup', 1234, 12345, true));
      messages.push(new Message('about the last project', 1234, 12345, true));
    } else if (id === 123456) {
      messages.push();
    } else if (id === 123457) {
      messages.push();
    } else if (id === 123458) {
      messages.push();
    }
    return messages;
  }

}
