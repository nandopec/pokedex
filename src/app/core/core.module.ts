import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from '@env/environment';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthLayout } from './layouts/auth/auth.layout';
import { RouterModule } from '@angular/router';
import { HomeLayout } from './layouts/home/home.layout';

@NgModule({
    declarations: [AuthLayout, HomeLayout],
    exports: [AuthLayout, HomeLayout],
    imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAuthModule,
        AngularFireDatabaseModule,
        CommonModule,
        BrowserAnimationsModule,
        RouterModule,
    ],
})
export class CoreModule {}
