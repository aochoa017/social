import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { environment } from '../../environments/environment';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

@Injectable()
export class LoginService {

  private apiUrl = environment.apiUrl + '/api/login';  // URL to web API
  private apiRegisterUrl = environment.apiUrl + '/api/user/new';  // URL to web API

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

  postNewUser(body: Object): Observable<any> {
    let data = JSON.stringify(body); // Stringify payload
    console.log(body);
    console.log(data);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiRegisterUrl, data, options)
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
    let body;

    if (error._body != "") {
      if (error instanceof Response) {
        body = error.json() || '';
        const err = body.error || JSON.stringify(body);
        errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
      } else {
        errMsg = error.message ? error.message : error.toString();
      }
    } else {
      body = "";
    }

    let content = (body != "") ? body.error_description : 'Logeate de nuevo';
    let array = {
      content: content,
      // content: 'El usuario no tiene los permisos suficientes para realizar la operación',
    };

    if (error.status === 401) {
      array['title'] = 'Unauthorized / No autorizado';
      return Observable.throw(array);

    } else if(error.status === 400) {
      array['title'] = 'Bad Request';
      return Observable.throw(array);
    } else {
      return Observable.throw(errMsg);
    }
  }

}
