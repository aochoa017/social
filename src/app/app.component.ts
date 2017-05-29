import { Component, OnInit } from '@angular/core';

declare var jQuery: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app works!';

  ngOnInit(){
    console.log("llega");
    var button = jQuery(".button-collapse");
    button.sideNav();
  }

}
