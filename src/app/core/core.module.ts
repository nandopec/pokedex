import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';

@NgModule({
    declarations: [],
    imports: [
        AngularFireModule.initializeApp(environment.firebase),
        CommonModule,
    ],
})
export class CoreModule {}
