import { Component, OnInit } from '@angular/core';
import * as u from '../utils';
@Component({
  selector: 'eos-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  saySomething() {
    u.after( u.say("I know howto handle clicks in Angular!"))
  }

}
