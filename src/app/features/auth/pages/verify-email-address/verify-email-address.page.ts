import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth/services/auth.service';
import { User } from '@user/interfaces/user.interface';
import { User as FirebaseUser } from '@firebase/auth-types';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
    selector: 'pkd-verify-email-address',
    templateUrl: './verify-email-address.page.html',
    styles: [],
})
export class VerifyEmailAddressPage implements OnInit {
    firebaseUser: FirebaseUser | null = this._authService.firebaseUser;
    isLoading = false;

    constructor(
        private _authService: AuthService,
        private _router: Router,
        private _snackBar: MatSnackBar
    ) {}

    ngOnInit(): void {
        if (this.firebaseUser === null) {
            this._router.navigateByUrl('/auth/sign-in');
        }
    }

    sendVerificationEmail(): void {
        this.isLoading = true;
        this._authService.sendVerificationEmail().then(() => {
            this.isLoading = false;
            this._snackBar.open('Correo enviado.', 'Cerrar', {
                horizontalPosition: 'end',
                verticalPosition: 'bottom',
            });
        });
    }
}
