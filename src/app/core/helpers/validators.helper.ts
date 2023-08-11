import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class ValidatorsHelper {
    static ownName(control: AbstractControl): ValidationErrors | null {
        if (ValidatorsHelper._checkCanValidate(control) === true) {
            const regex = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ ]*$/;
            const value = control.value;
            return !regex.test(value) ? { ownName: true } : null;
        }
        return null;
    }

    static phoneNumber(control: AbstractControl): ValidationErrors | null {
        if (ValidatorsHelper._checkCanValidate(control) === true) {
            const regex = /^[0-9]{10}$/;
            const value = control.value;
            return !regex.test(value) ? { phoneNumber: true } : null;
        }
        return null;
    }

    private static _checkCanValidate(control: AbstractControl): boolean {
        if (Object.keys(control).length > 0) {
            const validators: ValidationErrors | null = control.validator!(
                {} as AbstractControl
            );
            if (
                (validators === null ||
                    (validators !== null &&
                        typeof validators['required'] == 'undefined')) &&
                control.value === ''
            ) {
                return false;
            }
        }
        return true;
    }
}
