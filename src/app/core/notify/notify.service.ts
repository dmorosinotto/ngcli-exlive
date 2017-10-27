import { Observable } from "rxjs/Rx";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs/BehaviorSubject";

export interface Notify {
    id: number;
    title: string;
    message: string;
    color: string;
}

@Injectable()
export class NotifyService {
    private _lastId: number = 0;
    private _Alerts = new BehaviorSubject<Notify[]>([]);

    constructor() {}

    public get Alerts(): Observable<Notify[]> {
        return this._Alerts.asObservable();
    }

    show(
        title: string,
        message: string,
        color?: "warning" | "danger" | "info" | "success"
    ) {
        let curr = this._Alerts.getValue();
        curr.push({
            id: this._lastId++,
            title,
            message,
            color
        });
        console.log("NEW LIST", curr);
        this._Alerts.next(curr);
    }

    remove(idTOREMOVE: number) {
        let curr = this._Alerts.getValue();
        let newlist = curr.filter(not => not.id !== idTOREMOVE);
        this._Alerts.next(newlist);
    }
}
