import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app works!';

  ngOnInit(){

    // Deleted. Only with test
    localStorage.setItem("user", "pris");
    localStorage.setItem("userId", "16");
    localStorage.setItem("userName", "Priscila");
    localStorage.setItem("userSurname", "Frugoni Backhaustren");
  }

}
