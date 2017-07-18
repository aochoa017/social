import { Component, OnInit, NgZone, AfterViewInit } from '@angular/core';
import {Router} from '@angular/router';
// import { AuthService, AppGlobals } from 'angular2-google-login';

import { User } from '../../entities/user';
import { Messages } from '../../constants/messages';
import { Cookie } from 'ng2-cookies/ng2-cookies';

import { UserService } from '../../services/user.service';
import { LoginService } from '../../services/login.service';

import { CustomValidators } from '../../validators/custom-validators';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
  // providers: [AuthService]
})
export class LoginFormComponent implements AfterViewInit {

  public user: User = new User();
  private daysToSeconds: number = 86400;// 24h * 60m * 60s
  errorMsg = '';

  isLoginValid = false;
  loadingForm:boolean = false;
  msg: Messages = new Messages();
  errorLoginUI = [];

  title: String;
  isSignInShow: boolean;
  isSignUpShow: boolean;

  imageURL: string;
  email: string;
  name: string;
  token: string;

  constructor(
    private _router: Router,
    private _serviceUser:UserService,
    private _serviceLogin:LoginService,
    // private _googleAuth: AuthService,
    private _zone: NgZone,
    private customValidators:CustomValidators
  ) {
    this.onSignIn();
  }

  ngAfterViewInit() {
    // AppGlobals.GOOGLE_CLIENT_ID = '1919357779-jea4hdlq7dg5elcf0sos3196783ha7e0.apps.googleusercontent.com';
    // this.getData();
    // setTimeout(() => { this.googleAuthenticate() }, 950);
  }

  /**
   * Calling Google Authentication service
   */
  googleAuthenticate() {
    // this._googleAuth.authenticateUser((result) => {
    //   console.log(result);
    //   //Using Angular2 Zone dependency to manage the scope of variables
    //   this._zone.run(() => {
    //     this.getData();
    //   });
    // });
  }

  /**
   * Getting data from browser's local storage
   */
  getData() {
    this.token = localStorage.getItem('token');
    this.imageURL = localStorage.getItem('image');
    this.name = localStorage.getItem('name');
    this.email = localStorage.getItem('email');
  }

  /**
   * Logout user and calls function to clear the localstorage
   */
  // logout() {
  //   let scopeReference = this;
  //   this._googleAuth.userLogout(function () {
  //     scopeReference.clearLocalStorage();
  //   });
  // }

  /**
   * Clearing Localstorage of browser
   */
  clearLocalStorage() {
    localStorage.removeItem('token');
    localStorage.removeItem('image');
    localStorage.removeItem('name');
    localStorage.removeItem('email');
  }

  onSignIn() {
    this.title = "Login";
    this.isSignInShow = true;
    this.isSignUpShow = false;
  }

  onSignUp() {
    this.title = "Sign Up";
    this.isSignInShow = false;
    this.isSignUpShow = true;
  }

  login(user){
    var isUserLog = this._serviceLogin.postLogin(user).subscribe(
      res => {
        console.log(res);
        this.errorLoginUI = [];
        if ( res.success ){//Md5.hashStr(user.password) ){
          console.log("SUCCESS");
          console.log("expira en " + res.token.expires_in/this.daysToSeconds);
          // Save session i cookies
          Cookie.set('access_token', res.token.access_token);//, res.token.expires_in/this.daysToSeconds);
          Cookie.set('scope', res.token.scope);
          Cookie.set('token_type', res.token.token_type);
          Cookie.set('refresh_token', res.token.refresh_token);
          console.log(Cookie.get('access_token'));
          console.log(Cookie.get('refresh_token'));

          // Save user info en localStorage
          localStorage.setItem("user", String(res.user.user) );
          localStorage.setItem("userId", String(res.user.id) );
          localStorage.setItem("userName", String(res.user.name) );
          localStorage.setItem("userSurname", String(res.user.surname) );
          localStorage.setItem("userAvatar", String(res.user.avatar) );
          this.loadingForm = false;
          this._router.navigate(['profile']);
          return true;
        } else {
          this.loadingForm = false;
          console.log("FAIL");
          console.log(res);
          this.errorLoginUI.push( this.msg.error["LOGIN_FAIL"] );
          return false;
        }
      },
      error => {
        this.loadingForm = false;
        this.errorLoginUI.push( this.msg.error["LOGIN_FAIL"] );
      },
      function() { console.log("the subscription is completed")}
    );
    return isUserLog;
  }

  onSubmit() {
    this.loadingForm = true;
    this.formLoginValidation();
    if( this.isLoginValid ) {
      this.login( this.user );
    } else {
      this.loadingForm = false;
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

  private isSignUpValid:boolean = false;
  private isRegisterShow:boolean = false;
  public errorSignUpUI = [];
  public msgRegisterShow = [];
  public newUser = {
    'user': "",
    'email': ""
  };
  onSignUpSubmit() {
    console.log("Registro init");
    console.log(this.newUser);
    this.loadingForm = true;
    this.formSignUpValidation();
    if( this.isSignUpValid ) {
      this.postNewUser( this.newUser );
    } else {
      this.isSignUpValid = false;
      this.loadingForm = false;
    }
  }

  formSignUpValidation(){
    this.errorSignUpUI = [];
    this.msgRegisterShow = [];
    var errorUser = true;
    var errorEmail = true;

    if(this.newUser.user == "") {
      this.errorSignUpUI.push( this.msg.error["USER_REQUIRED"] );
    } else {
      if(this.customValidators.noSpaceValidator(this.newUser.user)) {
        this.errorSignUpUI.push( this.msg.error["USER_NO_WHITE_SPACE"] );
      }
      // if(this.customValidators.noCapitalLettersValidator(this.newUser.user)){
      //   this.errorSignUpUI.push( this.msg.error["USER_NO_CAPITAL_LETTERS"] );
      // }
      if(this.customValidators.noSpecialCharactersValidator(this.newUser.user)) {
        this.errorSignUpUI.push( this.msg.error["USER_NO_SPECIAL_CHARACTERS"] );
      }
      else {
        errorUser = false;
      }
    }

    if(this.newUser.email == "") {
      this.errorSignUpUI.push( this.msg.error["EMAIL_REQUIRED"] );
    } else {
      errorEmail = false;
    }

    if( !errorUser && !errorEmail ) {
      this.isSignUpValid = true;
    }
  }

  postNewUser(user){
    var isNewUser = this._serviceLogin.postNewUser(user).subscribe(
      res => {
        console.log(res);
        this.errorSignUpUI = [];
        this.msgRegisterShow = [];
        if ( res.success ){
          this.loadingForm = false;
          this.isSignUpShow = false;
          this.isRegisterShow = true;
          this.msgRegisterShow.push(res.message);
          return true;

        } else {
          this.loadingForm = false;
          this.isSignUpValid = false;
          console.log("postNewUser FAIL");
          console.log(res);
          this.errorSignUpUI.push( this.msg.error["LOGIN_FAIL"] );
          return false;
        }
      },
      error => {
        this.loadingForm = false;
        this.isSignUpValid = false;
        this.errorSignUpUI.push( error.content );
      },
      function() { console.log("the subscription is completed")}
    );
    return isNewUser;
  }

}
