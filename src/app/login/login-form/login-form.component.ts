import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

import { User } from '../../entities/user';
import { Messages } from '../../constants/messages';
import { Cookie } from 'ng2-cookies/ng2-cookies';

import { UserService } from '../../services/user.service';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  public user: User = new User();
  private daysToSeconds: number = 86400;// 24h * 60m * 60s
  errorMsg = '';

  isLoginValid = false;
  msg: Messages = new Messages();
  errorLoginUI = [];

  constructor( private _router: Router, private _serviceUser:UserService, private _serviceLogin:LoginService ) {}

  ngOnInit() {
  }

  login(user){
    var isUserLog = this._serviceLogin.postLogin(user).subscribe(
      res => {
        console.log(res);
        if ( res.success ){//Md5.hashStr(user.password) ){
          console.log("SUCCESS");
          console.log("expira en " + res.token.expires_in/this.daysToSeconds);
          // Save session i cookies
          Cookie.set('access_token', res.token.access_token, res.token.expires_in/this.daysToSeconds);
          Cookie.set('scope', res.token.scope);
          Cookie.set('token_type', res.token.token_type);
          console.log(Cookie.get('access_token'));

          // Save user info en localStorage
          localStorage.setItem("user", String(res.user.user) );
          localStorage.setItem("userId", String(res.user.id) );

          this._router.navigate(['profile']);
          return true;
        } else {
          console.log("FAIL");
          this.errorLoginUI.push( this.msg.error["LOGIN_FAIL"] );
          return false;
        }
      },
      function(error) { console.log("Error happened" + error)},
      function() { console.log("the subscription is completed")}
    );
    return isUserLog;
  }

  onSubmit() {
    this.formLoginValidation();
    if( this.isLoginValid ) {
      this.login( this.user );
    }
  }

  formLoginValidation() {
    this.errorLoginUI = [];
    var errorUser = true;
    var errorPassword = true;
    switch (this.user.user){
      case "":
        this.errorLoginUI.push( this.msg.error["USER_REQUIRED"] );
        break;
      default:
        errorUser = false;
    }
    switch (this.user.password){
      case "":
        this.errorLoginUI.push( this.msg.error["PASSWORD_REQUIRED"] );
        break;
      default:
        errorPassword = false;
    }

    if( !errorUser && !errorPassword ) {
      this.isLoginValid = true;
    }
  }

}
