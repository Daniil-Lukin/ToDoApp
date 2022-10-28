import { AbstractControl, ValidatorFn } from '@angular/forms';

export function passwordRepeatValidator(string): ValidatorFn {
  return (control: AbstractControl) => {
    if (control.value === control.parent?.get(string)) {
      return null;
    }

    return { validatePasswordRepeat: false };
  };
}
