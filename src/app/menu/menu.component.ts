import { Component, OnInit, Input } from '@angular/core';

import { Profile } from '../entities/profile';
import { ProfileService } from '../services/profile.service';

declare var jQuery: any;

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  myUserId: String;
  myUser: String;
  myUserName: String;
  myUserSurname: String;

  isCollapsibleOpen = false;


  profile = new Profile;
  errorMsg = '';

  menu = {};

  constructor( private _serviceProfile:ProfileService ) {

    console.log("constructor menu");
    this.myUserId = localStorage.getItem("userId");
    this.myUser = localStorage.getItem("user");
    this.myUserName = localStorage.getItem("userName");
    this.myUserSurname = localStorage.getItem("userSurname");
    this.getProfile(this.myUserId);

  }

  ngOnInit(){

    console.log("ngOnInit menu");

    this.menu = {
      "dashboard": "/dashboard",
      "profile": "/profile/" + this.myUser,
      "editProfile": "/profile/me/edit"
    }

    jQuery(".button-collapse").sideNav({
      menuWidth: 300, // Default is 300
      edge: 'left', // Choose the horizontal origin
      closeOnClick: false, // Closes side-nav on <a> clicks, useful for Angular/Meteor
      draggable: true // Choose whether you can drag to open on touch screens
    });

    jQuery('.collapsible').collapsible();
  }

  onClickCollapsible(event: any){
    console.log("onClickCollapsible");
    this.isCollapsibleOpen = !this.isCollapsibleOpen;
    var thisIcon = jQuery(event.target);
    if( !thisIcon.hasClass("rotate") ){
      thisIcon = thisIcon.find("i.rotate");
    }
    console.log(thisIcon);
    if( this.isCollapsibleOpen ){
      thisIcon.addClass("rotate-180");
    } else {
      thisIcon.removeClass("rotate-180");
    }

  }

  getProfile( id ) {
    this._serviceProfile.getProfile(id)
                     .subscribe(
                       res => {
                         this.profile = res;
                        //  console.log(res);
                       },
                       error =>  this.errorMsg = <any>error);
  }

}
