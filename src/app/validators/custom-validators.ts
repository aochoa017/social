import {Injectable} from '@angular/core';

@Injectable()
export class CustomValidators {

  noSpaceValidator(value:string): boolean {
    let re = / /;
    if (value && value.match(re)) {
      return true;
    } else {
      return false;
    }
  }

  noCapitalLettersValidator(value:string): boolean {
    let re = /[A-Z]/;
    if (value && value.match(re)) {
      return true;
    } else {
      return false;
    }
  }

  noSpecialCharactersValidator(value:string): boolean {
    let re = /[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/;
    if (value && value.match(re)) {
      return true;
    } else {
      return false;
    }
  }

}
