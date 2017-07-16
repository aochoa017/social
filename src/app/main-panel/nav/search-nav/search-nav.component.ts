import { Component, OnInit } from '@angular/core';

declare var jQuery: any;
declare var Materialize:any;

@Component({
  selector: 'app-search-nav',
  templateUrl: './search-nav.component.html',
  styleUrls: ['./search-nav.component.css']
})
export class SearchNavComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  autocompleteInit = {
    'data': {'Apple': null, 'Google': null},
    onAutocomplete: (val) => {
      console.log(val);
    },
  };

}
