import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AngularFireModule } from '@angular/fire/compat';
import { MAT_DATE_LOCALE } from '@angular/material/core';

import { SharedModule } from '@shared/shared.module';
import { environment } from '@env/environment';

import { AuthLayout } from './layouts/auth/auth.layout';
import { HomeLayout } from './layouts/home/home.layout';
import { BlankLayout } from './layouts/blank/blank.layout';
import { HeaderComponent } from './components/header/header.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { UserMenuComponent } from './components/user-menu/user-menu.component';

@NgModule({
    declarations: [
        AuthLayout,
        BlankLayout,
        HomeLayout,
        HeaderComponent,
        SideBarComponent,
        UserMenuComponent,
    ],
    exports: [AuthLayout, BlankLayout, HomeLayout],
    imports: [
        AngularFireModule.initializeApp(environment.firebase),
        BrowserAnimationsModule,
        //CommonModule,
        SharedModule,
    ],
    providers: [{ provide: MAT_DATE_LOCALE, useValue: 'es' }],
})
export class CoreModule {}
