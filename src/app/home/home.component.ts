import { NotifyService } from "../core/notify/notify.service";
import { Component, OnInit, Optional } from "@angular/core";
import * as u from "../utils";
@Component({
    selector: "eos-home",
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.css"]
})
export class HomeComponent {
    constructor(private notify: NotifyService) {}

    saySomething() {
        u.after(u.say("I know howto handle clicks in Angular!"));
        if (this.notify)
            this.notify.show("HELLO WORLD!", "My first notify!", "success");
    }
}
