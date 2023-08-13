import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth/services/auth.service';
import { User as FirebaseUser } from '@firebase/auth-types';
import { NotificationService } from '@core/services/notification.service';

@Component({
    selector: 'pkd-verify-email-address',
    templateUrl: './verify-email-address.page.html',
    styles: [],
})
export class VerifyEmailAddressPage {
    firebaseUser: FirebaseUser | null = this._authService.currentUser;
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
