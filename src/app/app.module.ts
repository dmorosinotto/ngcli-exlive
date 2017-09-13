import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { OperComponent } from './oper/oper.component';
import { EchoComponent } from './echo/echo.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    OperComponent,
    EchoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
