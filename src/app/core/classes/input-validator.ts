import { AbstractControl, ValidationErrors } from '@angular/forms';

export abstract class InputValidator {
    getErrorMessage(control: AbstractControl | null): string {
        let message: string = '';
        if (!!control) {
            const error: ValidationErrors | null = control.errors;
            if (!!error) {
                switch (true) {
                    case typeof error['required'] !== 'undefined':
                        message = 'Por favor complete este campo.';
                        break;

                    case typeof error['minlength'] !== 'undefined':
                        message =
                            'Solo se permiten palabras con más de ' +
                            error['minlength'].requiredLength +
                            ' caracteres.';
                        break;
                    case typeof error['maxlength'] !== 'undefined':
                        message =
                            'Solo se permiten palabras con menos de ' +
                            error['maxlength'].requiredLength +
                            ' caracteres.';
                        break;

                    case typeof error['ownName'] !== 'undefined':
                        message = 'Por favor ingrese un nombre correcto.';
                        break;

                    case typeof error['phoneNumber'] !== 'undefined':
                        message = 'Por favor ingresa un número de 10 dígitos.';
                        break;

                    case typeof error['email'] !== 'undefined':
                        message = 'Por favor ingresa un correo válido.';
                        break;

                    case typeof error['emailExists'] !== 'undefined':
                        message = 'El correo ya existe en otra cuenta.';
                        break;

                    case typeof error['emailNoExists'] !== 'undefined':
                        message = 'Correo no encontrado.';
                        break;

                    case typeof error['invalidPassword'] !== 'undefined':
                        message = 'Contraseña incorrecta.';
                        break;

                    default:
                        message = '';
                }
            }
        }
        return message;
    }
}
