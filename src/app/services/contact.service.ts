import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { environment } from '../../environments/environment';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { User } from '../entities/user';

@Injectable()
export class ContactService {

  private apiUrl = environment.apiUrl + '/api/contacts';  // URL to web API

  constructor( private http: Http ){}

  getContacts(id: String): Observable<any> {
    return this.http.get(this.apiUrl + '/' + id)
    .map(this.extractData)
    .catch(this.handleError);
  }

  getContactRequests(id: String): Observable<any> {
    return this.http.get(this.apiUrl + '/requests/' + id)
    .map(this.extractData)
    .catch(this.handleError);
  }

  getContactPetitions(id: String): Observable<User> {
    return this.http.get(this.apiUrl + '/petitions/' + id)
    .map(this.extractData)
    .catch(this.handleError);
  }

  putContact(id: String, body: Object): Observable<any> {
    let data = JSON.stringify(body);
    console.log(body);
    console.log(data);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.put(this.apiUrl + '/' + id, data, options)
    .map(this.extractData)
    .catch(this.handleError);
  }

  postContact(id: String, body: User): Observable<any> {
    let data = JSON.stringify(body);
    console.log(body);
    console.log(data);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + '/accept/' + id, data, options)
    .map(this.extractData)
    .catch(this.handleError);
  }

  deleteContact(id: String, body: Object): Observable<any> {
    let data = JSON.stringify(body);
    console.log(body);
    console.log(data);
    let headers = new Headers({ 'Content-Type': 'application/json', 'body': data });
    let options = new RequestOptions({ headers: headers });
    return this.http.delete(this.apiUrl + '/' + id, options)
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
