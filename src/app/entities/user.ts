export class User {

  id: String;

  user: String;

  password: String;

  /**
   * Construct
   */
  // constructor( public id: String = "16" ) {
  //   // this.id = id;
  // }

  // id: String = "43";
  // user: String = "user43";

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
