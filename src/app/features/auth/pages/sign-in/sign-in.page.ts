import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';
import { InputValidator } from '@core/classes/input-validator';

@Component({
    selector: 'pkd-sign-in',
    templateUrl: './sign-in.page.html',
    styles: [],
})
export class SignInPage extends InputValidator {
    canShowPassword = false;
    form = this._buildForm();
    isLoading = false;

    constructor(
        private _authService: AuthService,
        private _formBuilder: FormBuilder,
        private _router: Router,
        private _snackBar: MatSnackBar
    ) {
        super();
    }

    get passwordType(): string {
        return this.canShowPassword ? 'text' : 'password';
    }

    get passwordIcon(): string {
        return this.canShowPassword ? 'visibility_off' : 'visibility';
    }

    togglePasswordVisibility(): void {
        this.canShowPassword = !this.canShowPassword;
    }

    validateForm(): void {
        if (this.form.valid) {
            this.isLoading = true;
            this._signIn();
        }
    }

    private _buildForm(): FormGroup {
        return this._formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required]],
        });
    }

    private _goToPokemonList(): void {
        this._router.navigateByUrl('/home/pokemons');
    }

    private _handleSigninError(error: any): void {
        this.isLoading = false;
        console.log(error.code);

        switch (error.code) {
            case 'auth/user-not-found':
                this.form.controls['email'].setErrors({
                    emailNoExists: true,
                });
                break;

            case 'auth/wrong-password':
                this.form.controls['password'].setErrors({
                    invalidPassword: true,
                });
                break;

            default:
                this._showNotification('Error al iniciar sesión');
        }
    }

    private _signIn(): void {
        this._authService
            .signIn(this.form.value)
            .then(() => {
                this._goToPokemonList();
            })
            .catch((error) => {
                this._handleSigninError(error);
            });
    }

    private _showNotification(message: string): void {
        this._snackBar.open(message, 'Cerrar', {
            horizontalPosition: 'end',
            verticalPosition: 'bottom',
        });
    }
}
