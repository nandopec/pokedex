import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth/services/auth.service';
import { SmartComponent } from '@core/classes/smart-component';
import { User } from '@user/interfaces/user.interface';
import { UserService } from '@user/services/user.service';

@Component({
    selector: 'pkd-user-menu',
    templateUrl: './user-menu.component.html',
    styleUrls: ['./user-menu.component.scss'],
})
export class UserMenuComponent extends SmartComponent implements OnInit {
    authenticatedUser: User | undefined = undefined;

    constructor(
        private _authService: AuthService,
        private _userService: UserService
    ) {
        super();
    }

    ngOnInit(): void {
        this._loadAuthenticatedUser();
    }

    get avatarUrl(): string {
        return this.authenticatedUser && this.authenticatedUser.avatarUrl
            ? this.authenticatedUser.avatarUrl
            : 'https://material.angular.io/assets/img/homepage/github-circle-white-transparent.svg';
    }

    get userName(): string {
        return this.authenticatedUser ? this._generateUserName() : '';
    }

    logout(): void {
        this._authService.signOut();
    }

    private _generateUserName(): string {
        const arrUserName = this.authenticatedUser!.name.split(' ');
        const firstName = arrUserName.length > 0 ? arrUserName[0] : '';
        const secondName =
            arrUserName.length > 1 ? arrUserName[1].charAt(0) + '.' : '';
        return firstName + ' ' + secondName;
    }

    private _loadAuthenticatedUser(): void {
        this._userService
            .getUser(this._authService.currentUser!.uid)
            .pipe(this.untilComponentDestroy())
            .subscribe((user) => {
                this.authenticatedUser = user;
            });
    }
}
