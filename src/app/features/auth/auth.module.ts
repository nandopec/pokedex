import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';

import { AuthRoutingModule } from './auth-routing.module';
import { SignInPage } from './pages/sign-in/sign-in.page';
import { SignUpPage } from './pages/sign-up/sign-up.page';
import { VerifyEmailAddressPage } from './pages/verify-email-address/verify-email-address.page';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [SignInPage, SignUpPage, VerifyEmailAddressPage],
    imports: [
        CommonModule,
        AuthRoutingModule,
        FormsModule,
        MatButtonModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatNativeDateModule,
        MatProgressSpinnerModule,
        ReactiveFormsModule,
    ],
    providers: [{ provide: MAT_DATE_LOCALE, useValue: 'es' }],
})
export class AuthModule {}
