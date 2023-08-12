import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokemonListPage } from './pages/pokemon-list/pokemon-list.page';

const routes: Routes = [
    {
        path: '',
        component: PokemonListPage,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PokemonRoutingModule {}
