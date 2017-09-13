import { Component, OnInit } from '@angular/core';
import * as u from './utils';

@Component({
  selector: 'app-root',
  template: `
    <div>
      <!-- YOUR COMPONENTS GOES HERE -->
      <eos-home></eos-home>
    </div>
  `,
  styles: []
})
export class AppComponent implements OnInit {

  constructor() {
    console.log("FIRST ANGULAR COMPONENT CREATED");
  }

  public ngOnInit(): void {
    u.after(2, u.say("Hello World"))
  }
}
