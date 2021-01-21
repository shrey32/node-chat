import { ChatService } from 'src/app/services/chat.service';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(public chatService: ChatService) {

  }

  ngOnInit() {
    console.log('App is initialized');
    this.chatService.init();
  }

}
