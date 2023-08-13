import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';

import { AuthRoutingModule } from './auth-routing.module';
import { SignInPage } from './pages/sign-in/sign-in.page';
import { SignUpPage } from './pages/sign-up/sign-up.page';
import { VerifyEmailAddressPage } from './pages/verify-email-address/verify-email-address.page';

@NgModule({
    declarations: [SignInPage, SignUpPage, VerifyEmailAddressPage],
    imports: [AuthRoutingModule, SharedModule],
})
export class AuthModule {}
