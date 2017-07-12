import { Component, OnInit, Input, EventEmitter, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { UploadOutput, UploadInput, UploadFile, humanizeBytes } from 'ngx-uploader';
import { MaterializeAction } from 'angular2-materialize';

import { Modal } from '../../entities/modal';
import { Password } from '../../entities/password';
import { Profile } from '../../entities/profile';
import { Labels } from '../../constants/labels';
import { Messages } from '../../constants/messages';

import { ProfileService } from '../../services/profile.service';
import { UserService } from '../../services/user.service';

declare var jQuery: any;
declare var Materialize:any;

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})

export class ProfileEditComponent implements OnInit {

  apiUrl = environment.apiUrl;

  labels: Labels = new Labels();
  message: Messages = new Messages();

  boxTitle = this.labels.label["EDIT_PROFILE"];
  boxPasswordTitle = this.labels.label["EDIT_PROFILE_PASSWORD"];

  myUserId: String;
  profile = new Profile;
  @ViewChild("profileForm") profileForm: NgForm;
  loadingProfileForm:boolean = false;

  changePassword = new Password;
  @ViewChild("passwordForm") passwordForm: NgForm;
  loadingPasswordForm:boolean = false;
  changePasswordError: any = [];

  loadModal:boolean = false;
  modalCustom:Modal = new Modal();

  errorMsg = '';

  constructor( private _serviceProfile:ProfileService, private _serviceUser:UserService,  ) {
    this.changePasswordError['success'] = true;
    this.changePasswordError['value'] = this.message.error["PASSWORD_RULES"];
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
  onLoadModalEmit(bbbb:boolean) {
    this.loadModal = bbbb;
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
                         this.loadingProfileForm = false;
                         this.profileForm.form.markAsPristine();
                         console.log(res);
                         Materialize.toast('Perfil actualizado', 4000, 'light-blue');
                       },
                       error => {
                         this.loadingProfileForm = false;
                         this.errorMsg = <any>error;
                         console.log("Pasas por el error del component");
                         console.log(error);
                        //  this.openModal();
                        // this.modalCustom = error;
                        this.modalCustom.setTitle(error.title);
                        this.modalCustom.setContent(error.content);
                        this.loadModal = true;
                        this.getProfile(this.myUserId);
                       });
  }

  putUserPassword(id,body) {
    this._serviceUser.putUserPassword(id, body)
                     .subscribe(
                       res => {
                         this.loadingPasswordForm = false;
                        //  this.passwordForm.form.markAsPristine();
                         this.passwordForm.form.reset();
                         console.log(res);
                         Materialize.toast('Contraseña actualizada', 4000, 'light-blue');
                       },
                       error => {
                         this.loadingPasswordForm = false;
                         console.log(error);
                         this.loadingProfileForm = false;
                         this.errorMsg = <any>error;
                        this.modalCustom.setTitle(error.title);
                        this.modalCustom.setContent(error.content);
                        this.loadModal = true;
                       });
  }

  onSubmitProfile() {
    this.loadingProfileForm = true;
    console.log( this.profile );
    this.putProfile( this.myUserId );
  }

  onSubmitChangePassword(passwrodForm, isValid) {
    this.loadingPasswordForm = true;
    if ( isValid ) {
      console.log(passwrodForm);
      // Check New password
      if ( passwrodForm.newPassword == passwrodForm.newPasswordRepeat ) {
        this.changePasswordError['success'] = true;
        this.changePasswordError['value'] = this.labels.label["EDIT_PROFILE_PASSWORD"];
        let body: Object = {};
        body['oldPassword'] = passwrodForm.password;
        body['newPassword'] = passwrodForm.newPassword;
        console.log(body);
        this.putUserPassword(this.myUserId,body);
      } else {
        this.loadingPasswordForm = false;
        this.changePasswordError['success'] = false;
        this.changePasswordError['value'] = "La contraseña repetida no es la misma";
      }
    }
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
      url: environment.apiUrl + '/api/profile/avatar/' + this.myUserId,
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
