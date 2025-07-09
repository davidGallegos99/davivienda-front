import { AbstractControl, ValidationErrors } from '@angular/forms';

class InputValidator {
  onlyLetters(abstractControl: AbstractControl): ValidationErrors | null {
    const regex: RegExp = new RegExp(/^[/\p{L}\s]+$/gu);
    return regex.test(abstractControl.value) ? null : { onlyLetters: true };
  }

  // Valida que el valor contenga un número
  numberRequired(abstractControl: AbstractControl): ValidationErrors | null {
    const regex: RegExp = new RegExp(/\d/);
    return regex.test(abstractControl.value) ? null : { numberRequired: true };
  }

  // Valida que el valor contenga solo números
  onlyNumbers(abstractControl: AbstractControl): ValidationErrors | null {
    const regex: RegExp = /^\d+$/;
    return regex.test(abstractControl.value) ? null : { onlyNumbers: true };
  }
  // Valida que solo sea dinero
  currency(abstractControl: AbstractControl): ValidationErrors | null {
    const regex: RegExp = new RegExp(/^\d+(\.\d{1,2})?$/);
    return regex.test(abstractControl.value) &&
      Number(abstractControl.value) > 0
      ? null
      : { currency: true };
  }

  alphanumeric(abstractControl: AbstractControl): ValidationErrors | null {
    const regex: RegExp = new RegExp(/^[a-zA-Z0-9\s]*$/);
    return regex.test(abstractControl.value) ? null : { alphanumeric: true };
  }

  duiNumber(abstractControl: AbstractControl): ValidationErrors | null {
    const regex: RegExp = /^\d{8}-\d?$/;
    return regex.test(abstractControl.value) ? null : { duiNumber: true };
  }
}

export const InputValidators = new InputValidator();
