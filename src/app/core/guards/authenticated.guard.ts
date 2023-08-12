import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';

export const authenticatedGuard: CanActivateFn = (route, state) => {
    if (inject(AuthService).isLoggedIn === true) {
        return true;
    }
    inject(Router).navigateByUrl('/auth/sign-in');
    return false;
};
