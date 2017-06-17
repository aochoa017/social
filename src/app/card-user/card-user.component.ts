import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card-user',
  templateUrl: './card-user.component.html',
  styleUrls: ['./card-user.component.css']
})
export class CardUserComponent implements OnInit {

  @Input()
  profile: any;

  avatarNotFoundWoman = "assets/images/avatar-not-found-woman.png";
  avatarNotFoundMan = "assets/images/avatar-not-found-man.png";

  constructor() {
  }

  ngOnInit() {
  }

}
