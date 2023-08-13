import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';
import { SideBarService } from '@core/components/side-bar/side-bar.service';

@Component({
    selector: 'pkd-home',
    templateUrl: './home.layout.html',
    styleUrls: ['./home.layout.scss'],
})
export class HomeLayout implements OnInit {
    isSidebarOpen = false;

    constructor(
        private _authService: AuthService,
        private _router: Router,
        private _sideBarService: SideBarService
    ) {}

    ngOnInit(): void {
        this._sideBarService.isOpen$.subscribe((status) => {
            this.isSidebarOpen = status;
        });
    }

    closeSidebar(): void {
        if (this.isSidebarOpen) {
            this._sideBarService.toggle();
        }
    }

    logout(): void {
        this._authService.signOut().then(() => {
            this._goToSignIn();
        });
    }

    private _goToSignIn(): void {
        this._router.navigateByUrl('/auth/sign-in');
    }
}
