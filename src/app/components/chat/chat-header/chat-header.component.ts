import { RecentlyMessagedUser } from './../../../models/recent-messaged-users';
import { Component, Input } from "@angular/core";
import { MessageService } from 'src/app/services/message.service';


@Component({
  selector: 'app-chat-header',
  templateUrl: 'chat-header.component.html'
})
export class ChatHeaderComponent {

  selectedRecentlyMessagedUser: RecentlyMessagedUser = <RecentlyMessagedUser>{};

  constructor(
    public messageService: MessageService
  ) { }

  ngOnInit() {
    this.selectedRecentlyMessagedUser = this.messageService.getSelectedRecentMessageUser();
    this.messageService.onRecentMessageUserSelection.subscribe((rmu: RecentlyMessagedUser) => {
      this.selectedRecentlyMessagedUser = rmu;
    });
  }

}
