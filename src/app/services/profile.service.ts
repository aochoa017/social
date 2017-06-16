import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

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
    return this.http.get(this.apiUrl + 's')
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
