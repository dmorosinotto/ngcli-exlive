import { AuthService } from '../core/auth.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'eos-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(private auth: AuthService) { }

  ngOnInit() {
  }

  showValue(f: NgForm) {
    let cred = f.value;
    delete cred.confirm;
    console.log("CRED",cred);
    this.auth.register(cred)
      .then(ok => alert("REGISTRATION " + ok))
      .catch(err => alert("ERROR" + err));
    f.reset();
  }

}
