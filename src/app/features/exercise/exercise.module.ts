import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExerciseRoutingModule } from './exercise-routing.module';
import { OrderingPage } from './pages/ordering/ordering.page';
import { SharedModule } from '@shared/shared.module';

@NgModule({
    declarations: [OrderingPage],
    imports: [CommonModule, ExerciseRoutingModule, SharedModule],
})
export class ExerciseModule {}
