import { Route, RouterModule } from '@angular/router';
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

const ROUTES: Route[] = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'oper', component: OperComponent},
  {path: 'echo', component: EchoComponent},
  {path: 'chat', component: ChatComponent},
  {path: 'ajax', component: AjaxComponent}
]

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
    HttpModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
