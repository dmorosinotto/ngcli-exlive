//import { Subscription } from "rxjs/Rx";
import { Notify, NotifyService } from "./notify.service";
import { Component, Input, OnDestroy, OnInit } from "@angular/core";

@Component({
    selector: "notify-container",
    templateUrl: "./notify-container.component.html",
    styleUrls: ["./notify-container.component.css"]
    //provders: [NotifyService]
})
export class NotifyContainerComponent {
    //implements OnInit , OnDestroy {
    constructor(public notSvc: NotifyService) {}

    @Input() defaultColor: string;
    //private sub: Subscription;
    //private _notArr: Notify[];

    //ngOnInit() {
    //  this.sub = this.notSvc.Alerts.subscribe(arr => (this._notArr = arr));
    //}

    close(not: Notify) {
        this.notSvc.remove(not.id);
    }

    //public ngOnDestroy(): void {
    //  this.sub.unsubscribe();
    //}
}
