import { Pokemon } from './pokemon.interface';

export interface PokemonResponse {
    count: number;
    results: Pokemon[];
}
