import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Angular Material
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatNativeDateModule } from '@angular/material/core';

// Forms
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Http Client
import { HttpClientModule } from '@angular/common/http';

// Firebase
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';

// Router
import { RouterModule } from '@angular/router';

import { SearcherComponent } from './components/searcher/searcher.component';

@NgModule({
    declarations: [SearcherComponent],
    exports: [
        AngularFireAuthModule,
        AngularFireDatabaseModule,
        CommonModule,
        FormsModule,
        HttpClientModule,
        MatButtonModule,
        MatCardModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatMenuModule,
        MatNativeDateModule,
        MatProgressSpinnerModule,
        MatSidenavModule,
        MatSnackBarModule,
        MatToolbarModule,
        ReactiveFormsModule,
        RouterModule,
        SearcherComponent,
    ],
    imports: [
        CommonModule,
        MatButtonModule,
        MatCardModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        ReactiveFormsModule,
    ],
})
export class SharedModule {}
