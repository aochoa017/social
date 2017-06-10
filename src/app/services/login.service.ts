import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
// import { Md5 } from 'ts-md5/dist/md5';

@Injectable()
export class LoginService {

  private apiUrl = 'http://localhost:8888/api/log';  // URL to web API
  // private user: String;

  constructor( private _router: Router, private http: Http ){}

  // getUserId(id: number): Observable<User[]> {
  //   return this.http.get(this.apiUrl + '/' + id)
  //                   .map(this.extractData)
  //                   .catch(this.handleError);
  // }
  //
  // getUser(user: String): Observable<User> {
  //   return this.http.get(this.apiUrl + '/find/' + user)
  //                   .map(this.extractData)
  //                   .catch(this.handleError);
  // }

  // login(user){
  //   console.log(user.user);
  //   var isUserLog = this.getUser(user.user).subscribe( res => {
  //     // console.log(res);
  //     if ( res.user == user.user && res.password === user.password ){//Md5.hashStr(user.password) ){
  //       localStorage.setItem("user", String(res.user) );
  //       localStorage.setItem("userId", String(res.id) );
  //       // localStorage.setItem("userName", String(res.name) );
  //       // localStorage.setItem("userSurname", String(res.surname) );
  //       this._router.navigate(['profile']);
  //       console.log('true');
  //       return true;
  //     }
  //     console.log('false');
  //     return false;
  //   } );
  //   return isUserLog;
  // }

  checkCredentials(){
    if (localStorage.getItem("user") === null){
        this._router.navigate(['login']);
    } else{
      // this._router.navigate(['profile']);
    }
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