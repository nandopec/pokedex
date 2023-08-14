import { Injectable } from '@angular/core';
import { ApiHttp } from '@core/services/api.http';
import { environment } from '@env/environment';
import { PokemonResponse } from '@pokemon/interfaces/pokemon-response.interface';
import { Pokemon } from '@pokemon/interfaces/pokemon.interface';
import { Observable, map } from 'rxjs';

const ENDPOINTS: any = {
    pokemon: (query: string) => `${environment.pokemon.api}/pokemon/${query}`,
    pokemons: `${environment.pokemon.api}/pokemon`,
};

@Injectable({
    providedIn: 'root',
})
export class PokemonService {
    constructor(private _apiHttp: ApiHttp) {}

    getPokemon(query: string): Observable<Pokemon> {
        return this._apiHttp.get(ENDPOINTS.pokemon(query));
    }

    getPokemons(page: number, perPage: number): Observable<PokemonResponse> {
        const offset = (page - 1) * perPage;
        return this._apiHttp
            .param('limit', perPage.toString())
            .param('offset', offset.toString())
            .get(ENDPOINTS.pokemons)
            .pipe(
                map((res: PokemonResponse) => {
                    res.results.map((element: Pokemon) => {
                        element.id = this._generateId(element.url);
                        return element;
                    });
                    return res;
                })
            );
    }

    private _generateId(url: string): number {
        const splitUrl = url.split('/');
        return +splitUrl[splitUrl.length - 2];
    }
}
