import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';
import { environment } from '@env/environment';

import { AuthLayout } from './layouts/auth/auth.layout';
import { HomeLayout } from './layouts/home/home.layout';
import { BlankLayout } from './layouts/blank/blank.layout';

@NgModule({
    declarations: [AuthLayout, BlankLayout, HomeLayout],
    exports: [AuthLayout, BlankLayout, HomeLayout],
    imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAuthModule,
        AngularFireDatabaseModule,
        BrowserAnimationsModule,
        CommonModule,
        MatSnackBarModule,
        RouterModule,
    ],
})
export class CoreModule {}
