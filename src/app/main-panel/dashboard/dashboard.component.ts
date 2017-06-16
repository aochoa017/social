import { Component, OnInit } from '@angular/core';

import { Profile } from '../../entities/profile';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  profiles: any;
  errorMsg = '';

  constructor( private _serviceProfile:ProfileService ) {
    this.getAllProfiles();
  }

  ngOnInit() {
  }

  getAllProfiles() {
    this._serviceProfile.getAllProfiles()
                     .subscribe(
                       res => {
                         this.profiles = res;
                       },
                       error =>  this.errorMsg = <any>error);
  }

}
