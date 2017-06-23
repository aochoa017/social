import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class ContactService {

  private apiUrl = 'http://localhost:8888/api/contacts';  // URL to web API

  constructor( private http: Http ){}

  getContact(id: number): Observable<any> {
    return this.http.get(this.apiUrl + '/' + id)
    .map(this.extractData)
    .catch(this.handleError);
  }

  getContactRequests(id: number): Observable<any> {
    return this.http.get(this.apiUrl + '/requests/' + id)
    .map(this.extractData)
    .catch(this.handleError);
  }

  getContactPetitions(id: number): Observable<any> {
    return this.http.get(this.apiUrl + '/petitions/' + id)
    .map(this.extractData)
    .catch(this.handleError);
  }

  putContact(id: number, body: Object): Observable<any> {
    let data = JSON.stringify(body);
    console.log(body);
    console.log(data);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.put(this.apiUrl + '/' + id, data, options)
    .map(this.extractData)
    .catch(this.handleError);
  }

  postContact(id: number, body: Object): Observable<any> {
    let data = JSON.stringify(body);
    console.log(body);
    console.log(data);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + '/accept/' + id, data, options)
    .map(this.extractData)
    .catch(this.handleError);
  }

  deleteContact(id: number, body: Object): Observable<any> {
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
