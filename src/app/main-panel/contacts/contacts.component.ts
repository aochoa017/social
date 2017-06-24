import { Component, OnInit } from '@angular/core';

import { Profile } from '../../entities/profile';
import { ProfileService } from '../../services/profile.service';
import { ContactService } from '../../services/contact.service';

declare var jQuery: any;

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {

  profiles: any;
  myContacts: any;
  myContactsTotal: number;
  myContactsRequests: any;
  myContactsRequestsTotal: number;
  myContactsPetitions: any;
  myContactsPetitionsTotal: number;
  allUsersTotal: number;
  errorMsg = '';

  constructor( private _serviceProfile:ProfileService, private _serviceContact:ContactService ) {
  }

  ngOnInit() {
    this.getAllProfiles();
    this.getMyContacts();
    this.getContactRequests();
    this.getContactPetitions();

    jQuery('ul.tabs').tabs();
  }

  getAllProfiles() {
    this._serviceProfile.getAllProfiles()
                     .subscribe(
                       res => {
                         this.profiles = res;
                         this.allUsersTotal = this.profiles.length;
                       },
                       error =>  this.errorMsg = <any>error);
  }

  getMyContacts() {
    this._serviceContact.getContacts(localStorage.getItem("userId"))
                     .subscribe(
                       res => {
                        console.log(res);
                        this.myContacts = res;
                        console.log(res.length);
                        this.myContactsTotal = res.length;
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
