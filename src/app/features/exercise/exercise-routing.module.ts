import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderingPage } from './pages/ordering/ordering.page';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'ordering',
        pathMatch: 'full',
    },
    {
        path: 'ordering',
        component: OrderingPage,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ExerciseRoutingModule {}
