import { Component, OnInit, Input } from '@angular/core';
import { environment } from '../../environments/environment';

import { User } from '../entities/user';
import { Profile } from '../entities/profile';
import { ProfileService } from '../services/profile.service';
import { ContactService } from '../services/contact.service';

@Component({
  selector: 'app-card-user',
  templateUrl: './card-user.component.html',
  styleUrls: ['./card-user.component.css']
})
export class CardUserComponent implements OnInit {

  apiUrl = environment.apiUrl;

  @Input()
  profileId: String;
  profile: Profile = new Profile();
  @Input()
  type: String;
  errorMsg = '';

  avatarNotFoundWoman = "assets/images/avatar-not-found-woman.png";
  avatarNotFoundMan = "assets/images/avatar-not-found-man.png";

  myUser: User = new User();

  constructor( private _serviceProfile:ProfileService, private _serviceContact:ContactService ) {
    this.myUser.setId( localStorage.getItem("userId") );
  }

  ngOnInit() {
    this.getProfile(this.profileId);
  }

  onClickAddContact(event,id) {
    console.log("onClickAddContact");
    console.log(id);
    this.addContact(id,this.myUser);
  }
  onClickAcceptContact(event,id) {
    this.acceptContact(id,this.myUser);
  }

  getProfile(id) {
    this._serviceProfile.getProfile(id)
                     .subscribe(
                       res => {
                         this.profile = res;
                       },
                       error =>  this.errorMsg = <any>error);
  }

  addContact(id,newContact) {
    this._serviceContact.putContact(id, newContact)
                     .subscribe(
                       res => {
                         console.log(res);
                       },
                       error =>  this.errorMsg = <any>error);
  }

  acceptContact(id,newContact) {
    this._serviceContact.postContact(id, newContact)
                     .subscribe(
                       res => {
                         console.log(res);
                       },
                       error =>  this.errorMsg = <any>error);
  }

}
