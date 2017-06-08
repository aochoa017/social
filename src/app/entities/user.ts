export class User {

  id: String;

  user: String;

  password: String;

  /**
   * Construct
   */
  constructor(){
    this.id = "";
    this.user = "";
    this.password = "";
  }

  public getUser(){
    return this.user;
  }

  public setUser(user){
    this.user = user;
  }

}
