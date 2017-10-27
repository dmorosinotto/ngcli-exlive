import { Component, OnInit } from "@angular/core";
import * as u from "./utils";

@Component({
    selector: "app-root",
    template: `
<nav>
  <ul class="nav nav-tabs">
      <li role="presentation" routerLinkActive="active"><a routerLink="/home" >Home</a></li>
      <li role="presentation" routerLinkActive="active"><a routerLink="/oper" >Oper</a></li>
      <li role="presentation" routerLinkActive="active"><a routerLink="/echo" >Echo</a></li>
      <li role="presentation" routerLinkActive="active"><a routerLink="/chat" >Chat</a></li>
      <li role="presentation" routerLinkActive="active"><a routerLink="/ajax" >Ajax</a></li>
      <li role="presentation" routerLinkActive="active"><a routerLinkActive="custom" routerLink="/login" >Login</a></li>
      <li role="presentation" routerLinkActive="active"><a routerLinkActive="custom" routerLink="/signin" >Sign In</a></li>
      <li role="presentation" routerLinkActive="active"><a routerLinkActive="custom" routerLink="/contact" >Contact</a></li>
      <li role="presentation" routerLinkActive="active"><a routerLinkActive="custom" routerLink="/dynform" >DynForm</a></li>
      <li role="presentation" routerLinkActive="active"><a routerLinkActive="custom" routerLink="/cmparch" >CmpArch</a></li>
  </ul>
  <router-outlet></router-outlet>
  <notify-container defaultColor="danger"></notify-container>
  </nav>
  `,
    styles: [".custom { color: red }"]
})
export class AppComponent implements OnInit {
    constructor() {
        console.log("FIRST ANGULAR COMPONENT CREATED");
    }

    public ngOnInit(): void {
        u.after(2, u.say("Hello World"));
    }
}
