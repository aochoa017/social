import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { environment } from '../../environments/environment';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
// import { Md5 } from 'ts-md5/dist/md5';

import { User } from '../entities/user';

@Injectable()
export class UserService {

  private apiUrl = environment.apiUrl + '/api/user';  // URL to web API
  // private user: String;

  constructor( private _router: Router, private http: Http ){}

  getUserId(id: number): Observable<User[]> {
    return this.http.get(this.apiUrl + '/' + id)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  getUser(user: String): Observable<User> {
    return this.http.get(this.apiUrl + '/find/' + user)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  putUserPassword(id: number, body: Object): Observable<User> {
    let data = JSON.stringify(body); // Stringify payload
    console.log(body);
    console.log(data);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', 'Bearer ' + Cookie.get('access_token'));
    let options = new RequestOptions({ headers: headers });
    return this.http.put(this.apiUrl + '/' + id, data, options)
    .map(this.extractData)
    .catch(this.handleError);
  }

/*
  login(user){
    // console.log(user.user);
    var isUserLog = this.getUser(user.user).subscribe( res => {
      // console.log(res);
      if ( res.user == user.user && res.password === user.password ){//Md5.hashStr(user.password) ){
        localStorage.setItem("user", String(res.user) );
        localStorage.setItem("userId", String(res.id) );
        // localStorage.setItem("userName", String(res.name) );
        // localStorage.setItem("userSurname", String(res.surname) );
        this._router.navigate(['profile']);
        // console.log('true');
        return true;
      }
      // console.log('false');
      return false;
    } );
    return isUserLog;
  }
*/

  // putProfile(id: number, body: Object): Observable<Profile> {
  //   let data = JSON.stringify(body); // Stringify payload
  //   console.log(body);
  //   console.log(data);
  //   let headers = new Headers({ 'Content-Type': 'application/json' });
  //   let options = new RequestOptions({ headers: headers });
  //   return this.http.put(this.apiUrl + '/' + id, data, options)
  //                   .map(this.extractData)
  //                   .catch(this.handleError);
  // }

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
