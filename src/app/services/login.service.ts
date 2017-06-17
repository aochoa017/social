import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Cookie } from 'ng2-cookies/ng2-cookies';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class LoginService {

  private apiUrl = 'http://localhost:8888/api/login';  // URL to web API

  constructor( private _router: Router, private http: Http ){}

  postLogin(body: Object): Observable<any> {
    let data = JSON.stringify(body); // Stringify payload
    console.log(body);
    console.log(data);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl, data, options)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  checkCredentials(){
    var access_token = Cookie.get('access_token');
    if (access_token === null){
        this._router.navigate(['login']);
    } else if ( this._router.url == 'login' ){
      this._router.navigate(['dashboard']);
    }
  }

  logout() {
    Cookie.deleteAll();
    localStorage.removeItem("user");
    localStorage.removeItem("userId");
    this._router.navigate(['login']);
    return true;
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || { };
  }

  private handleError (error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}
