import { ChatControlsComponent } from './components/chat/chat-controls/chat-controls.component';
import { ChatHeaderComponent } from './components/chat/chat-header/chat-header.component';
import { ChatComponent } from './components/chat/chat.component';
import { MessageService } from './services/message.service';
import { UserService } from './services/user.service';
import { LoggedInUserService } from './services/logged-in-user.service';
import { RecentChatListComponent } from './components/recent-chat/recent-chat-list.component';

import { HeaderComponent } from './components/header/header.component';
import { AngularMaterialModule } from './angular-material/angular-material.module';

import { SocketService } from './services/socket.service';

import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ChatMessageComponent } from './components/chat/chat-message/chat-message.component';
import { ChatService } from './services/chat.service';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RecentChatListComponent,
    ChatComponent,
    ChatHeaderComponent,
    ChatMessageComponent,
    ChatControlsComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    AngularMaterialModule,
    MatGridListModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    SocketService,
    LoggedInUserService,
    UserService,
    MessageService,
    ChatService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
