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
    { provide: NG_VALIDATORS, useExisting: EmailValidator, multi: true }
  ]
})
export class EmailValidator implements Validator {
  validator: ValidatorFn;

  constructor() {
    this.validator = validateEmailFactory();
  }

  validate(c: FormControl) {
    return this.validator(c);
  }

}
