import { Component, OnInit, Input } from '@angular/core';

import { Profile } from '../../entities/profile';
import { User } from '../../entities/user';

import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  // name: String;
  // surname: String;
  // adress: String;
  // city: String;
  // country: String;
  // zipCode: String;
  // email: String;
  // phone: String;
  // biography: String;

  profile: Profile[] = [];
  errorMsg = '';

  constructor( private _serviceProfile:ProfileService ) {}

  ngOnInit() {
    this.getProfile( localStorage.getItem("userId") );
  }

  getProfile( id ) {
    this._serviceProfile.getProfile(id)
                     .subscribe(
                       res => {
                         this.profile = res;
                        //  console.log("==========");
                        //  console.log("==========");
                         console.log(res);
                       },
                       error =>  this.errorMsg = <any>error);
  }

  putProfile(id) {
    this._serviceProfile.putProfile(id, this.profile)
                     .subscribe(
                       res => {
                         console.log(res);
                       },
                       error =>  this.errorMsg = <any>error);
  }

  submitted = false;
  onSubmit() {
    this.submitted = true;
    console.log( this.profile );
    this.putProfile( localStorage.getItem("userId") );
  }

}
