import { Component, OnInit } from '@angular/core';

import { User } from '../../entities/user';
import { Messages } from '../../constants/messages';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { UserService } from '../../services/user.service';
import { LoginService } from '../../services/login.service';

import { CustomValidators } from '../../validators/custom-validators';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.css']
})
export class LoginRegisterComponent implements OnInit {

  title = "Last step";
  errorLoginUI = [];
  isRegisterShow = true;
  public user: User = new User();
  loadingForm = false;

  constructor() { }

  ngOnInit() {
  }

}
