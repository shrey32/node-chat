import { RecentlyMessagedUser } from '../../models/recent-messaged-users';
import { MessageService } from '../../services/message.service';


import { Component, OnInit } from "@angular/core";


@Component({
  selector: 'app-recent-chat-list',
  templateUrl: 'recent-chat-list.component.html'
})
export class RecentChatListComponent implements OnInit {

  recentMessagedUserList: RecentlyMessagedUser[] = [];
  recentGroups: [] = [];

  constructor(public messageService: MessageService) {

  }

  ngOnInit(): void {
    this.recentMessagedUserList = this.messageService.getRecentlyMessagedUsers();
    if (this.recentMessagedUserList.length > 0) {
      this.messageService.setSelectedRecentMessageUser(this.recentMessagedUserList[0]);
    }
  }

  onSelect = (recentlyMessagedUser: RecentlyMessagedUser): void => {
    this.messageService.setSelectedRecentMessageUser(recentlyMessagedUser);
  }

}
