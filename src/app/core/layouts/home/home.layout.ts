import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';

@Component({
    selector: 'pkd-home',
    templateUrl: './home.layout.html',
    styles: [],
})
export class HomeLayout {
    constructor(private _authService: AuthService, private _router: Router) {}

    logout(): void {
        this._authService.signOut().then(() => {
            this._goToSignIn();
        });
    }

    private _goToSignIn(): void {
        this._router.navigateByUrl('/auth/sign-in');
    }
}
