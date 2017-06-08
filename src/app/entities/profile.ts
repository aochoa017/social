import { User } from './user';

export class Profile extends User {

   name: String;

   surname: String;

   adress: String;

   city: String;

   country: String;

   zipCode: String;

   email: String;

   phone: String;

   biography: String;

   avatar: String;

  constructor(){
    super();
    // this.setUser("elquesea");
    this.name = "";
    this.surname = "";
    this.adress = "";
    this.city = "";
    this.country = "";
    this.zipCode = "";
    this.email = "";
    this.phone = "";
    this.biography = "";
    this.avatar = "";
  }

  public getName() {
    return this.name;
  }

  public setName(name) {
    this.name = name;
  }

}
