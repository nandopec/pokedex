import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';

export const notAuthenticatedGuard: CanActivateFn = (route, state) => {
    if (inject(AuthService).isLoggedIn === true) {
        inject(Router).navigateByUrl('/home');
        return false;
    }

    return true;
};
