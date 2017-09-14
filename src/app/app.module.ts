import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { OperComponent } from './oper/oper.component';
import { EchoComponent } from './echo/echo.component';
import { ChatComponent } from './chat/chat.component';
import { AjaxComponent } from './ajax/ajax.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    OperComponent,
    EchoComponent,
    ChatComponent,
    AjaxComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
