import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  trigger,
  transition,
  style,
  animate,
} from '@angular/animations';

import { PokemonNamePipe } from '../../common/pipes/pokemon-name.pipe';
import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'app-pokemon-favorite',
  standalone: true,
  imports: [
    CommonModule,
    PokemonNamePipe,
  ],
  templateUrl: './pokemon-favorite.component.html',
  styleUrls: ['./pokemon-favorite.component.scss'],
  animations: [
    trigger('dialogAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.8)' }),
        animate(
          '300ms ease-out',
          style({ opacity: 1, transform: 'scale(1)' })
        ),
      ]),
    ]),
  ],
})
export class PokemonFavoriteComponent implements OnInit {
  pokemonDetails: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { name: string },
    private pokemonService: PokemonService
  ) { }

  ngOnInit(): void {
    this.pokemonService.getPokemonDetails(this.data.name).subscribe((data) => {
      this.pokemonDetails = data;
    });
  }
}
