import { Component, OnInit, AfterViewInit } from '@angular/core';
import { LoginService } from './services/login.service';
import {Router, ActivatedRoute} from '@angular/router';

import { AppGlobals } from './services/app-globals';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit,AfterViewInit {
  title = 'app works!';

  constructor( private _serviceLogin:LoginService, private _router: Router, private _googleAuth: AuthService, ) {}

  ngOnInit(){
    AppGlobals.GOOGLE_CLIENT_ID = '1919357779-jea4hdlq7dg5elcf0sos3196783ha7e0.apps.googleusercontent.com';
    // setTimeout(() => { this._serviceLogin.checkCredentials() }, 950);
      // this._serviceUser.checkCredentials(this._router.url);
    // Deleted. Only with test
    // localStorage.setItem("user", "pris");
    // localStorage.setItem("userId", "16");
    // localStorage.setItem("userName", "Priscila");
    // localStorage.setItem("userSurname", "Frugoni Backhaustren");
  }
  ngAfterViewInit() {
      // this._serviceLogin.checkCredentials();
    // this.getData();
    // setTimeout(() => { this.googleAuthenticate() }, 950);
  }

}
