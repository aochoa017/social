import { User } from './user';

export class Password extends User {

   newPassword: String;

   newPasswordRepeat: String;

  constructor(){
    super();
    this.newPassword = "";
    this.newPasswordRepeat = "";
  }

  public getNewPasswordRepeat() {
    return this.newPasswordRepeat;
  }

  public setNewPasswordRepeat(newPasswordRepeat) {
    this.newPasswordRepeat = newPasswordRepeat;
  }

  public getNewPassword() {
    return this.newPassword;
  }

  public setNewPassword(newPassword) {
    this.newPassword = newPassword;
  }

}
