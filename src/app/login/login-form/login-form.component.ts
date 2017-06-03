import { Component, OnInit } from '@angular/core';
import { User } from '../../entities/user';
import { Messages } from '../../constants/messages';

import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  public user: User = new User();
  // user: User[] = [];
  errorMsg = '';

  isLoginValid = false;
  msg: Messages = new Messages();
  errorLoginUI = [];

  constructor( private _serviceUser:UserService ) {}

  ngOnInit() {
  }

  login( user: User ) {
    var retVal = this._serviceUser.login(user);
    if(!retVal){
        this.errorMsg = 'Failed to login';
    } else{
      this.errorMsg = '';
    }
    return retVal;
  }

  onSubmit() {
    // console.log( this.user );
    this.formLoginValidation();
    if( this.isLoginValid ) {
      console.log(this.login( this.user ));
      if( !this.login( this.user ) ) {
        this.errorLoginUI.push( this.msg.error["LOGIN_FAIL"] );
      }
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
