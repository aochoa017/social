// import { Validator, AbstractControl } from '@angular/forms';
//
// export class ValidForms {
//
//   constructor(){}
//
//   validateEmail(c: AbstractControl): { [key: string]: any } {
//     let EMAIL_REGEXP = "[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$";
//
//     return EMAIL_REGEXP.match(c.value) ? null : {
//       validateEmail: {
//         valid: false
//       }
//     };
//   }
//
// }

import { Directive, forwardRef } from '@angular/core';
import { NG_VALIDATORS, AbstractControl, ValidatorFn, Validator, FormControl } from '@angular/forms';


// validation function
function validateEmailFactory() : ValidatorFn {
  return (c: AbstractControl) => {

    // let isValid = c.value === 'Juri';
    //
    // if(isValid) {
    //   return null;
    // } else {
    //   return {
    //     juriName: {
    //       valid: false
    //     }
    //   };
    // }

    let EMAIL_REGEXP = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

    return EMAIL_REGEXP.test(c.value) ? null : {
      emailCustom: {
        valid: false
      }
    };

  }
}


@Directive({
  selector: '[emailCustom][ngModel]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: CustomValidator, multi: true }
  ]
})
export class CustomValidator implements Validator {
  validator: ValidatorFn;

  constructor() {
    this.validator = validateEmailFactory();
  }

  validate(c: FormControl) {
    return this.validator(c);
  }

}
