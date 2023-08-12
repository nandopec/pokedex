import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth/services/auth.service';
import { User } from '@user/interfaces/user.interface';
import { User as FirebaseUser } from '@firebase/auth-types';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NotificationService } from '@core/services/notification.service';

@Component({
    selector: 'pkd-verify-email-address',
    templateUrl: './verify-email-address.page.html',
    styles: [],
})
export class VerifyEmailAddressPage {
    firebaseUser: FirebaseUser | null = this._authService.firebaseUser;
    isLoading = false;

    constructor(
        private _authService: AuthService,
        private _notificationService: NotificationService
    ) {}

    sendVerificationEmail(): void {
        this.isLoading = true;
        this._authService.sendVerificationEmail().then(() => {
            this.isLoading = false;
            this._notificationService.show('Correo enviado.');
        });
    }
}
