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

  // constructor(
  //   public id: String,
  //   public name: String,
  //   public adress: String,
  //   public city: String,
  //   public country: String,
  //   public zipCode: String,
  //   public email: String,
  //   public phone: String,
  //   public biography: String ) {
  //   super(id);
  //   // this.name = name;
  // }

  constructor(){
    super();
    // this.setUser("elquesea");
    this.name = "Aitor";
    this.surname = "";
    this.adress = "";
    this.city = "";
    this.country = "";
    this.zipCode = "";
    this.email = "";
    this.phone = "";
    this.biography = "";
  }

}
