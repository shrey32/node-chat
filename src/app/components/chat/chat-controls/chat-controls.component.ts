import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { debounceTime, filter, throttleTime } from 'rxjs/operators';

@Component({
  selector: 'app-chat-controls',
  templateUrl: './chat-controls.component.html'
})
export class ChatControlsComponent implements OnInit {

  messageControl: FormControl;
  chatForm: FormGroup;

  constructor(
    private fb: FormBuilder
  ) {
    this.messageControl = new FormControl();
    this.chatForm = this.fb.group({ message: this.messageControl });
  }

  ngOnInit() {
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
    /*this.chatService.sendMessage(this.chatId, msg).then();
    this.attachmentService.uploadAttachments().subscribe(
      res => console.log(res),
      err => console.log(err)
    );*/
    this.messageControl.reset();
    this.scrollBottom();
  }

  private scrollBottom(): void {
    setTimeout(() => window.scrollTo(0, document.body.scrollHeight), 500);
  }

  setSelectedFiles(event): void {
    //this.attachmentService.setSelectedFiles(event);
  }

  deleteAttachment(file): void {
    //return this.attachmentService.deleteFile(file);
  }

  getAttachments(): File[] {
    return []//this.attachmentService.getFiles();
  }

  hasAttachments() {
    return false;//this.attachmentService.getFiles().length > 0;
  }
}
