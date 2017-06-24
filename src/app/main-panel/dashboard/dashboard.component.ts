import { Component, OnInit } from '@angular/core';

import { Profile } from '../../entities/profile';
import { ProfileService } from '../../services/profile.service';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  profiles: any;
  myContacts: any;
  myContactsRequests: any;
  myContactsPetitions: any;
  errorMsg = '';

  constructor( private _serviceProfile:ProfileService, private _serviceContact:ContactService ) {
    this.getAllProfiles();
    this.getMyContacts();
    this.getContactRequests();
    this.getContactPetitions();
  }

  ngOnInit() {
  }

  getAllProfiles() {
    this._serviceProfile.getAllProfiles()
                     .subscribe(
                       res => {
                         this.profiles = res;
                         console.log(res);
                       },
                       error =>  this.errorMsg = <any>error);
  }

  getMyContacts() {
    this._serviceContact.getContacts(localStorage.getItem("userId"))
                     .subscribe(
                       res => {
                        console.log(res);
                        this.myContacts = res;
                       },
                       error =>  this.errorMsg = <any>error);
  }

  getContactPetitions() {
    this._serviceContact.getContactPetitions(localStorage.getItem("userId"))
                     .subscribe(
                       res => {
                        this.myContactsPetitions = res;
                        console.log("getContactPetitions");
                       },
                       error =>  this.errorMsg = <any>error);
  }

  getContactRequests() {
    this._serviceContact.getContactRequests(localStorage.getItem("userId"))
                     .subscribe(
                       res => {
                        this.myContactsRequests = res;
                        console.log("getContactPetitions");
                        console.log(res);
                       },
                       error =>  this.errorMsg = <any>error);
  }

}
