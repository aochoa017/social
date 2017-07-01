import { Directive, forwardRef } from '@angular/core';
import { NG_VALIDATORS, AbstractControl, ValidatorFn, Validator, FormControl } from '@angular/forms';

// validation function
function validatePasswordFactory() : ValidatorFn {
  return (c: AbstractControl) => {

    // let PASSWORD_REGEXP = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{6,20})/;
    let PASSWORD_REGEXP = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20})/;

    return PASSWORD_REGEXP.test(c.value) ? null : {
      passwordCustom: {
        valid: false
      }
    };

  }
}

@Directive({
  selector: '[passwordCustom][ngModel]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: PasswordValidator, multi: true }
  ]
})
export class PasswordValidator implements Validator {
  validator: ValidatorFn;

  constructor() {
    this.validator = validatePasswordFactory();
  }

  validate(c: FormControl) {
    return this.validator(c);
  }

}
