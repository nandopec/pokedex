import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserCredential } from '@firebase/auth-types';
import { Router } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';
import { InputValidator } from '@core/classes/input-validator';
import { NotificationService } from '@core/services/notification.service';

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
        private _notificationService: NotificationService,
        private _router: Router
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

    private _handleSigninSuccess(userCredential: UserCredential): void {
        if (userCredential.user?.emailVerified) {
            this._goToPokemonList();
        } else {
            const error = { code: 'pkd/auth/unverified-email' };
            this._handleSigninError(error);
        }
    }

    private _handleSigninError(error: any): void {
        this.isLoading = false;

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

            case 'pkd/auth/unverified-email':
                this.form.controls['email'].setErrors({
                    unverifiedEmail: true,
                });
                break;

            default:
                this._notificationService.show('Error al iniciar sesión');
        }
    }

    private _signIn(): void {
        this._authService
            .signIn(this.form.value)
            .then((userCredential) => {
                this._handleSigninSuccess(userCredential);
            })
            .catch((error) => {
                this._handleSigninError(error);
            });
    }
}
