import { Component, OnInit } from '@angular/core';

declare var jQuery: any;

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  title = 'app works!';

  isCollapsibleOpen = false;

  ngOnInit(){
    console.log("llega");
    jQuery(".button-collapse").sideNav({
      menuWidth: 300, // Default is 300
      edge: 'left', // Choose the horizontal origin
      closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
      draggable: true // Choose whether you can drag to open on touch screens
    });
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
