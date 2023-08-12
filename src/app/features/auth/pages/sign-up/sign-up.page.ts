import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';
import { InputValidator } from '@core/classes/input-validator';
import { FormatterHelper } from '@core/helpers/formatter.helper';
import { ValidatorsHelper } from '@core/helpers/validators.helper';
import { UserService } from '@user/services/user.service';

@Component({
    selector: 'pkd-sign-up',
    templateUrl: './sign-up.page.html',
    styles: [],
})
export class SignUpPage extends InputValidator {
    canShowPassword = false;
    form = this._buildForm();
    isLoading = false;

    constructor(
        private _authService: AuthService,
        private _formBuilder: FormBuilder,
        private _router: Router,
        private _snackBar: MatSnackBar,
        private _userService: UserService
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
            this._signUp();
        }
    }

    private _buildForm(): FormGroup {
        return this._formBuilder.group({
            name: [
                '',
                [
                    Validators.required,
                    Validators.minLength(3),
                    Validators.maxLength(100),
                    ValidatorsHelper.ownName,
                ],
            ],
            birthdate: ['', [Validators.required]],
            phoneNumber: [
                '',
                [Validators.required, ValidatorsHelper.phoneNumber],
            ],
            email: ['', [Validators.required, Validators.email]],
            password: [
                '',
                [
                    Validators.required,
                    Validators.minLength(4),
                    Validators.maxLength(25),
                ],
            ],
        });
    }

    private _goToVerifyEmailAddress(): void {
        this._router.navigateByUrl('/auth/verify-email-address');
    }

    private _handleSignupError(error: any): void {
        this.isLoading = false;
        switch (error.code) {
            case 'auth/email-already-in-use':
                this.form.controls['email'].setErrors({
                    emailExists: true,
                });
                break;

            default:
                this._showNotification('Error al crear cuenta');
        }
    }

    private _saveUser(userId: string): void {
        const requestBody = {
            userId,
            name: this.form.value.name,
            birthdate: FormatterHelper.formatShortDate(
                this.form.value.birthdate
            ),
            phoneNumber: this.form.value.phoneNumber,
            email: this.form.value.email,
        };
        this._userService.createUser(requestBody).then(() => {
            this._sendVerificationEmail();
        });
    }

    private _sendVerificationEmail(): void {
        this._authService.sendVerificationEmail().then(() => {
            this._goToVerifyEmailAddress();
        });
    }

    private _showNotification(message: string): void {
        this._snackBar.open(message, 'Cerrar', {
            horizontalPosition: 'end',
            verticalPosition: 'bottom',
        });
    }

    private _signUp(): void {
        const requestBody = {
            email: this.form.value.email,
            password: this.form.value.password,
        };
        this._authService
            .signUp(requestBody)
            .then((userCredential) => {
                this._saveUser(userCredential.user!.uid);
            })
            .catch((error) => this._handleSignupError(error));
    }
}
