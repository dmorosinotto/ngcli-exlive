import { Route, RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { OperComponent } from './oper/oper.component';
import { EchoComponent } from './echo/echo.component';
import { ChatComponent } from './chat/chat.component';
import { AjaxComponent } from './ajax/ajax.component';
import { LoginComponent } from './login/login.component';
import { SigninComponent } from './signin/signin.component';
import { MatchDirective } from './core/match.directive';
import { AsyncJustUsedDirective } from './core/async-just-used.directive';
import { AuthService } from './core/auth.service';
import { ContactComponent } from './contact/contact.component';
import { InputNumComponent } from './core/input-num.component';

const ROUTES: Route[] = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'oper', component: OperComponent},
  {path: 'echo', component: EchoComponent},
  {path: 'chat', component: ChatComponent},
  {path: 'login', component: LoginComponent},
  {path: 'signin', component: SigninComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'ajax', component: AjaxComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    OperComponent,
    EchoComponent,
    ChatComponent,
    AjaxComponent,
    LoginComponent,
    SigninComponent,
    MatchDirective,
    AsyncJustUsedDirective,
    ContactComponent,
    InputNumComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
