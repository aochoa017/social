import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Profile } from '../../entities/profile';
import { Labels } from '../../constants/labels';

import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit {

  labels: Labels = new Labels();

  boxTitle = this.labels.label["EDIT_PROFILE"];

  // name: String;
  // surname: String;
  // adress: String;
  // city: String;
  // country: String;
  // zipCode: String;
  // email: String;
  // phone: String;
  // biography: String;

  // profile: Profile[] = [];
  profile = new Profile;
  errorMsg = '';

  constructor( private _serviceProfile:ProfileService, private activatedRoute_: ActivatedRoute ) {
    activatedRoute_.params.subscribe( params => {
      this.profile.setUser( params['user'] );
    } );
  }

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
