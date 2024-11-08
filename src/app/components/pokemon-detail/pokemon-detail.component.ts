import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { PokemonService } from '../../services/pokemon.service';
import { PokemonNamePipe } from '../../common/pipes/pokemon-name.pipe';
import { AppState } from '../../store/app.state';
import { selectPokemon, setFavoritePokemon } from '../../store/app.actions';

@Component({
  selector: 'app-pokemon-detail',
  standalone: true,
  imports: [
    PokemonNamePipe,
    CommonModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss'],
  animations: [
    trigger('favoriteAnimation', [
      state(
        'selected',
        style({
          transform: 'scale(1.4)',
        })
      ),
      state(
        'deselected',
        style({
          transform: 'scale(1)',
        })
      ),
      transition('deselected => selected', [animate('200ms ease-in')]),
      transition('selected => deselected', [animate('200ms ease-out')]),
    ]),
  ],
})
export class PokemonDetailComponent implements OnInit {
  @Input() pokemonName!: string;
  pokemonDetails: any;

  favoritePokemonName$!: Observable<string | null>;

  constructor(private pokemonService: PokemonService, private store: Store<{ app: AppState }>) {
    this.favoritePokemonName$ = this.store.pipe(select((state) => state.app.favoritePokemonName));
  }

  ngOnInit(): void {
    this.pokemonService.getPokemonDetails(this.pokemonName).subscribe((data) => {
      this.pokemonDetails = data;
    });
  }

  markAsFavorite(name: string): void {
    this.store.dispatch(setFavoritePokemon({ name }));
  }

  closeDetail(): void {
    this.store.dispatch(selectPokemon({ name: null }));
  }
}
