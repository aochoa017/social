import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { environment } from '../../../environments/environment';

import { Profile } from '../../entities/profile';
import { Labels } from '../../constants/labels';

import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  apiUrl = environment.apiUrl;

  labels: Labels = new Labels();

  boxTitle = this.labels.label["EDIT_PROFILE"];

  profile = new Profile;
  errorMsg = '';

  constructor( private _serviceProfile:ProfileService, private activatedRoute_: ActivatedRoute ) {
    activatedRoute_.params.subscribe( params => {
      this.findProfile( params['user'] );
    } );
  }

  ngOnInit() {
  }

  findProfile( user ) {
    this._serviceProfile.findProfile(user)
                     .subscribe(
                       res => {
                         this.profile = res;
                       },
                       error =>  this.errorMsg = <any>error);
  }

}
