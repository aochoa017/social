import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';

import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  pageTitle: String;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _serviceLogin: LoginService
  ) {}

  ngOnInit() {
    // const myData = this.route.snapshot.children;
    // console.log( myData );
    this.pageTitle = this.route.snapshot.data['title'];
  }

  onClickLogout(){
    console.log("onClickLogout");
    this._serviceLogin.logout();
  }

}
