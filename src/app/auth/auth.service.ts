import { Injectable } from '@angular/core';

import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

const BASEURL = "http://localhost:3000"

interface AuthCred {
    user: string,
    pwd: string
}

@Injectable()
export class AuthService {

  constructor(private http: Http) { }

  public register(cred: AuthCred): Promise<boolean> {
    return this.http.post(BASEURL + "/auth", cred)
              .map(res => res.json())
              .map( ok => ok.user === cred.user )
              .toPromise()
  }

  public justUsed(email: string): Promise<boolean> {
    return this.http.get(BASEURL + "/auth?user="+email)
      .map(res => res.json())
      .map(arr => Boolean(arr && arr.length) )
      .toPromise()
  }
}
