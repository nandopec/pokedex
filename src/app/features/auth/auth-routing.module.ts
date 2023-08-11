import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInPage } from './pages/sign-in/sign-in.page';
import { SignUpPage } from './pages/sign-up/sign-up.page';
import { VerifyEmailAddressPage } from './pages/verify-email-address/verify-email-address.page';
import { AuthLayout } from '@core/layouts/auth/auth.layout';

const routes: Routes = [
    {
        path: '',
        component: AuthLayout,
        children: [
            { path: 'sign-in', component: SignInPage },
            { path: 'sign-up', component: SignUpPage },
        ],
    },
    { path: 'verify-email-address', component: VerifyEmailAddressPage },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AuthRoutingModule {}
