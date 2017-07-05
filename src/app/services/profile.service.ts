import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Cookie } from 'ng2-cookies/ng2-cookies';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import { Profile } from '../entities/profile';

@Injectable()
export class ProfileService {

  private apiUrl = 'http://localhost:8888/api/profile';  // URL to web API
  // private myProfile: Profile;

  constructor( private http: Http ){}

  getProfile(id: number): Observable<Profile> {
    return this.http.get(this.apiUrl + '/' + id)
    .map(this.extractData)
    .catch(this.handleError);
  }

  getAllProfiles(): Observable<Profile> {
    let data = JSON.stringify([]);
    let token_type = Cookie.get('token_type');;
    let access_token = Cookie.get('access_token');;
    let headers = new Headers();
    headers.append( 'authorization', token_type + " " + access_token );
    let options = new RequestOptions({ headers: headers });
    return this.http.get(this.apiUrl + 's', options)
    .map(this.extractData)
    .catch(this.handleError);
  }

  /*
  setMyProfile(myProfile) {
    this.myProfile = myProfile;
  }
  getMyProfile() {
    console.log(this.myProfile);
    return this.myProfile;
  }
  */

  findProfile(user): Observable<Profile> {
    return this.http.get(this.apiUrl + '/find/' + user)
    .map(this.extractData)
    .catch(this.handleError);
  }

  putProfile(id: number, body: Object): Observable<Profile> {
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

    if (error.status === 401) {
      let content = (body != "") ? body.error_description : 'Logeate de nuevo';
      let array = {
        title: 'Unauthorized / No autorizado ',
        content: content,
        // content: 'El usuario no tiene los permisos suficientes para realizar la operación',
      };
      return Observable.throw(array);

    } else {
      return Observable.throw(errMsg);
    }
  }

}
