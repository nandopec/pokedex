import { NgModule } from '@angular/core';

import { PokemonRoutingModule } from './pokemon-routing.module';
import { PokemonListPage } from './pages/pokemon-list/pokemon-list.page';
import { SharedModule } from '@shared/shared.module';

@NgModule({
    declarations: [PokemonListPage],
    imports: [PokemonRoutingModule, SharedModule],
})
export class PokemonModule {}
