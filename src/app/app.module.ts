import { AngularMaterialModule } from './angular-material/angular-material.module';

import { SocketService } from './socket.service';

import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { FlexLayoutModule } from '@angular/flex-layout';
@NgModule({
  declarations: [
    AppComponent
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
    SocketService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
