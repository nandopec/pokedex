import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundPage } from './pages/not-found/not-found.page';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'not-found',
        pathMatch: 'full',
    },
    {
        path: 'not-found',
        component: NotFoundPage,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ErrorRoutingModule {}
