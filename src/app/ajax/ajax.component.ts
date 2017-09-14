import { Http } from '@angular/http';
import { Component } from '@angular/core';
import { environment } from '../../environments/environment';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/Observable/of';
import 'rxjs/add/operator/toPromise';

interface INumber {
  text: string;
  number: number | null;
  found: boolean;
}

@Component({
  selector: 'eos-ajax',
  templateUrl: './ajax.component.html',
  styles: []
})
export class AjaxComponent {

  public logs: Array<{when: Date, what: string}>;
  constructor(private http: Http) { 
    this.logs = [];
  }

/* HELPER httpGET -INIZIO-*/
  private _log(msg:any, prefix:string="") {
    this.logs.push({
      when: new Date(), 
      what: prefix + JSON.stringify(msg)
    });
  }

  private _err2def<T>(err:any, def:T): Observable<T> {
    this._log({ERROR: err.message || err});
    return Observable.of(def);
  }

  private httpGET<T>(apiUrl: string, getDatatFromJSON: (data:any)=>T, def:T): Promise<T> {
    this._log(`GET >> ${apiUrl}`);
    return this.http.get(apiUrl)
            .map( res => res.json())
            .map( getDatatFromJSON )
            .do( data => this._log(data,"RET << "))
            .catch( err => this._err2def(err, def))
            .toPromise()
  }
/* HELPER httpGET -FINE-*/


  public rnd() {
    this._getRandom().then( n => alert(n));
  }

  public fact() {
    this._getFactOf().then( f => alert(f));
  }

  public clr() {
    if (confirm("Do you want to clear Log?")) {
      this.logs = [];
    }
  }
  
  
  private _getRandom(max:number=31): Promise<number> {
    return this.httpGET(
        `${environment.BASEURL}/random?max=10&json`, 
        (data:INumber) => data.number, -1);
  }
  
  private _getFactOf(): Promise<string> {
    return Promise.all([ this._getRandom(), this._getRandom(12) ])
            .then( ([day, month]) => 
                    this.httpGET(
                        `${environment.BASEURL}/${month}/${day}/date?json`
                        , (data:INumber) => data.text
                        , "?") );
  }
  

}
