import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'eos-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  showValue(f: NgForm) {
    alert(JSON.stringify(f.value));    
  }

}
