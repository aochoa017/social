import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import {MaterializeAction} from 'angular2-materialize';

import { Modal } from '../../entities/modal';

@Component({
  selector: 'app-alert-modal',
  templateUrl: './alert-modal.component.html',
  styleUrls: ['./alert-modal.component.css']
})
export class AlertModalComponent implements OnInit {

  errorMsg: String = "cambiar";

  @Input()
  modalCustom:Modal;

  constructor() { }

  ngOnInit() {
  }

  modalActions = new EventEmitter<string|MaterializeAction>();
  openModal() {
    this.modalActions.emit({action:"modal",params:['open']});
  }
  closeModal() {
    this.modalActions.emit({action:"modal",params:['close']});
  }

}
