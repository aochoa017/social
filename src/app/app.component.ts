import { Component, OnInit } from '@angular/core';
import { LoginService } from './services/login.service';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app works!';

  constructor( private _serviceLogin:LoginService, private _router: Router ) {}

  ngOnInit(){
    this._serviceLogin.checkCredentials();
      // this._serviceUser.checkCredentials(this._router.url);
    // Deleted. Only with test
    // localStorage.setItem("user", "pris");
    // localStorage.setItem("userId", "16");
    // localStorage.setItem("userName", "Priscila");
    // localStorage.setItem("userSurname", "Frugoni Backhaustren");
  }

}
