import { AbstractControl, ValidatorFn } from '@angular/forms';

export function passwordRepeatValidator(password): ValidatorFn {
  return (control: AbstractControl) => {
    if (control.value === password) {
      return null;
    }

    return { validatePasswordRepeat: false };
  };
}
