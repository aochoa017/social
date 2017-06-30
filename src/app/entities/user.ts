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

  public getId(){
    return this.id;
  }

  public getUser(){
    return this.user;
  }

  public getPassword(){
    return this.password;
  }

  public setId(id){
    this.id = id;
  }

  public setUser(user){
    this.user = user;
  }

  public setUPassword(password){
    this.password = password;
  }

}
