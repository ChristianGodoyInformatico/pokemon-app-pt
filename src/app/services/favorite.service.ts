import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Pokemon } from '../models/pokemon.model';

@Injectable({
  providedIn: 'root',
})
export class FavoriteService {
  private favoritePokemonSubject = new BehaviorSubject<Pokemon | null>(null);
  favoritePokemon$ = this.favoritePokemonSubject.asObservable();

  setFavorite(pokemon: Pokemon) {
    this.favoritePokemonSubject.next(pokemon);
  }
}
