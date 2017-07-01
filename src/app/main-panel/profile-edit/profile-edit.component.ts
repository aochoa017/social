import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UploadOutput, UploadInput, UploadFile, humanizeBytes } from 'ngx-uploader';
import {MaterializeAction} from 'angular2-materialize';

import { Password } from '../../entities/password';
import { Profile } from '../../entities/profile';
import { Labels } from '../../constants/labels';

import { ProfileService } from '../../services/profile.service';

declare var jQuery: any;

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})

export class ProfileEditComponent implements OnInit {

  labels: Labels = new Labels();

  boxTitle = this.labels.label["EDIT_PROFILE"];
  boxPasswordTitle = this.labels.label["EDIT_PROFILE_PASSWORD"];

  myUserId: String;
  profile = new Profile;

  changePassword = new Password;

  errorMsg = '';

  constructor( private _serviceProfile:ProfileService ) {
    console.log("constructor profile-edit");
    this.myUserId = localStorage.getItem("userId");
    this.getProfile(this.myUserId);

    // activatedRoute_.params.subscribe( params => {
    //   // this.profile.setUser( params['user'] );
    // } );

    this.files = []; // local uploading files array
    this.uploadInput = new EventEmitter<UploadInput>(); // input events, we use this to emit data to ngx-uploader
    this.humanizeBytes = humanizeBytes;
  }

  ngOnInit() {
    console.log("ngOninit profile-edit");
  }

  modalActions = new EventEmitter<string|MaterializeAction>();
  openModal() {
    this.modalActions.emit({action:"modal",params:['open']});
  }
  closeModal() {
    this.modalActions.emit({action:"modal",params:['close']});
  }

  getProfile( id ) {
    this._serviceProfile.getProfile(id)
                     .subscribe(
                       res => {
                         this.profile = res;
                       },
                       error =>  this.errorMsg = <any>error);
  }

  putProfile(id) {
    this._serviceProfile.putProfile(id, this.profile)
                     .subscribe(
                       res => {
                         console.log(res);
                       },
                       error =>  this.errorMsg = <any>error);
  }

  submitted = false;
  onSubmit() {
    this.submitted = true;
    console.log( this.profile );
    this.putProfile( this.myUserId );
  }


  formData: FormData;
  files: UploadFile[];
  uploadInput: EventEmitter<UploadInput>;
  humanizeBytes: Function;
  dragOver: boolean;

  onUploadOutput(output: UploadOutput): void {
    console.log(output); // lets output to see what's going on in the console

    console.log("==============");
    switch (output.type){
      case "start":
        console.log("Ha salido Start = " + output.type);
        break;
      case "uploading":
        console.log("Ha salido Uploading = " + output.type);
        break;
      case "done":
        // console.log("Ha salido Done = " + output.type);
        console.log(output.file.response.fileName);
        this.profile.avatar = output.file.response.fileName;
        break;
      default:
        console.log("No ha salido nada");
    }
    console.log("==============");

    if (output.type === 'allAddedToQueue') { // when all files added in queue
      // uncomment this if you want to auto upload files when added
      // const event: UploadInput = {
      //   type: 'uploadAll',
      //   url: '/upload',
      //   method: 'POST',
      //   data: { foo: 'bar' },
      //   concurrency: 0
      // };
      // this.uploadInput.emit(event);
    } else if (output.type === 'addedToQueue') {
      this.files.push(output.file); // add file to array when added
    } else if (output.type === 'uploading') {
      // update current data in files array for uploading file
      const index = this.files.findIndex(file => file.id === output.file.id);
      this.files[index] = output.file;
    } else if (output.type === 'removed') {
      // remove file from array when removed
      this.files = this.files.filter((file: UploadFile) => file !== output.file);
    } else if (output.type === 'dragOver') { // drag over event
      this.dragOver = true;
    } else if (output.type === 'dragOut') { // drag out event
      this.dragOver = false;
    } else if (output.type === 'drop') { // on drop event
      this.dragOver = false;
    }
  }

  startUpload(): void {  // manually start uploading
    const event: UploadInput = {
      type: 'uploadAll',
      url: 'http://localhost:8888/api/profile/avatar/' + this.myUserId,
      method: 'POST',
      fieldName: 'avatar',
      data: { foo: 'bar' },
      concurrency: 1 // set sequential uploading of files with concurrency 1
    }

    this.uploadInput.emit(event);
  }

  cancelUpload(id: string): void {
    this.uploadInput.emit({ type: 'cancel', id: id });
  }

}
