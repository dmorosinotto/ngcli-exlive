import { NgForm } from '@angular/forms/src/directives';
import { Component, OnInit } from '@angular/core';

const enum People {
  Pippo = "bg-info text-left",
  Pluto = "bg-success text-right"
}

interface chatMsg {
  who: People;
  msg: string;
}

@Component({
  selector: 'eos-chat',
  templateUrl: './chat.component.html',
  styles: [`input.ng-invalid.ng-dirty { border-left: 2px red solid }`]
})
export class ChatComponent implements OnInit {
  public chatLog: chatMsg[];
  public preselect: People;
  constructor() { 
    this.chatLog = [
      { who: People.Pippo, msg: "Ciao come va?" },
      { who: People.Pluto, msg: "bene e tu" }
    ];
  }

  ngOnInit() {
    this.preselect = People.Pippo;
  }

  add(f: NgForm) {
    this.chatLog.push(Object.assign({}, f.value));
    //f.form.patchValue({ msg: "" });
    f.resetForm({msg: "", who: f.value.who });
  }

}
