import { Component, OnInit } from '@angular/core';
import { Pokemon } from '@pokemon/interfaces/pokemon.interface';
import { PokemonService } from '@pokemon/services/pokemon.service';

@Component({
    selector: 'pkd-pokemon-list',
    templateUrl: './pokemon-list.page.html',
    styles: [],
})
export class PokemonListPage implements OnInit {
    isLoading = false;
    page = 1;
    perPage = 20;
    pokemons: Pokemon[] = [];
    totalItems = 0;

    constructor(private _pokemonService: PokemonService) {}

    ngOnInit(): void {
        this._loadPokemons();
    }

    loadMore(): void {
        this.page++;
        this._loadPokemons();
    }

    searchPokemon(query: string): void {
        this.isLoading;
        this._resetPokemons();
        this._pokemonService.getPokemon(query).subscribe((pokemon) => {
            this.pokemons.push(pokemon);
            this.isLoading = false;
        });
    }

    private _loadPokemons(): void {
        this.isLoading = true;
        this._pokemonService
            .getPokemons(this.page, this.perPage)
            .subscribe((response) => {
                this.totalItems = response.count;
                this.pokemons = this.pokemons.concat(response.results);
                this.isLoading = false;
            });
    }

    private _resetPokemons(): void {
        this.page = 0;
        this.pokemons = [];
    }
}
