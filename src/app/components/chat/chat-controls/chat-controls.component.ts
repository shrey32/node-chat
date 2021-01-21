import { Message } from './../../../models/message';
import { RecentChat } from './../../../models/recent-chat';
import { SocketService } from 'src/app/services/socket.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { debounceTime, filter, throttleTime } from 'rxjs/operators';
import { ChatService } from 'src/app/services/chat.service';
import { MessageService } from 'src/app/services/message.service';
import { LoggedInUserService } from 'src/app/services/logged-in-user.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-chat-controls',
  templateUrl: 'chat-controls.component.html'
})
export class ChatControlsComponent implements OnInit {

  messageControl: FormControl;
  chatForm: FormGroup;
  selectedRecentChat: RecentChat = <RecentChat>{};
  loggedInUser: User = <User>{};

  constructor(
    private fb: FormBuilder,
    public loggedInUserService: LoggedInUserService,
    public messageService: MessageService,
    public chatService: ChatService
  ) {
    this.messageControl = new FormControl();
    this.chatForm = this.fb.group({ message: this.messageControl });
  }

  ngOnInit() {
    this.selectedRecentChat = this.chatService.getSelectedRecentChat();
    this.loggedInUser = this.loggedInUserService.getLoggedInUser();
    this.chatService.onRecentChatSelection.subscribe((recentChat: RecentChat) => {
      this.selectedRecentChat = recentChat;
    });
    this.scrollBottom();

    this.messageControl.valueChanges
      .pipe(
        filter(data => data !== ''),
        throttleTime(1400)
      )
      .subscribe(data => {
        //this.chatService.sendIsTyping(this.chatId).then();
      });

    this.messageControl.valueChanges
      .pipe(
        filter(data => data !== ''),
        debounceTime(1500)
      )
      .subscribe(data => {
        //this.chatService.deleteIsTyping(this.chatId).then();
      });
  }

  submit(): void {
    const msg = this.messageControl.value;
    if (!msg) {
      return alert('Please enter a message.');
    }
    this.chatService.send(new Message(new Date().getTime(), msg, this.loggedInUser.getId(), this.selectedRecentChat.getUser().getId(), true));
    this.messageControl.reset();
    this.scrollBottom();
  }

  private scrollBottom(): void {
    setTimeout(() => window.scrollTo(0, document.body.scrollHeight), 500);
  }

  setSelectedFiles(event: any): void {
    //this.attachmentService.setSelectedFiles(event);
  }

  deleteAttachment(file: any): void {
    //return this.attachmentService.deleteFile(file);
  }

  getAttachments(): File[] {
    return []//this.attachmentService.getFiles();
  }

  hasAttachments() {
    return false;//this.attachmentService.getFiles().length > 0;
  }
}
