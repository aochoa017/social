import { Component, OnInit } from '@angular/core';

declare var jQuery: any;

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  user: String;
  userName: String;
  userSurname: String;

  isCollapsibleOpen = false;

  menu = {};

  ngOnInit(){

    this.user = localStorage.getItem("user");
    this.userName = localStorage.getItem("userName");
    this.userSurname = localStorage.getItem("userSurname");

    // this.menu.push();
    // this.menu.push();
    this.menu = {
      "profile": "/profile/" + this.user,
      "editProfile": "/profile/me/edit"
    }

    // console.log("llega");
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

}
