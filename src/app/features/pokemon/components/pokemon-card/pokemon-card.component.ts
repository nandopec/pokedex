import { Component, Input } from '@angular/core';
import { Pokemon } from '@pokemon/interfaces/pokemon.interface';

@Component({
    selector: 'pkd-pokemon-card',
    templateUrl: './pokemon-card.component.html',
    styles: [],
})
export class PokemonCardComponent {
    @Input() pokemon: Pokemon | undefined = undefined;
}
