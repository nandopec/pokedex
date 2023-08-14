import { NgModule } from '@angular/core';

import { PokemonRoutingModule } from './pokemon-routing.module';
import { PokemonListPage } from './pages/pokemon-list/pokemon-list.page';
import { SharedModule } from '@shared/shared.module';
import { PokemonCardComponent } from './components/pokemon-card/pokemon-card.component';
import { ResultsCardComponent } from './components/results-card/results-card.component';

@NgModule({
    declarations: [PokemonListPage, PokemonCardComponent, ResultsCardComponent],
    imports: [PokemonRoutingModule, SharedModule],
})
export class PokemonModule {}
