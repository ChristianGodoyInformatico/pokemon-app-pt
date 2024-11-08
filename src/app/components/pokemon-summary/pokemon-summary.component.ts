import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pokemon-summary',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './pokemon-summary.component.html',
  styleUrls: ['./pokemon-summary.component.scss'],
})
export class PokemonSummaryComponent implements OnInit {
  summaryData: { letter: string; count: number }[] = [];

  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.pokemonService.getPokemonList(0, 1118).subscribe((response) => {
      const counts: { [key: string]: number } = {};
      response.results.forEach((pokemon) => {
        const initial = pokemon.name.charAt(0).toUpperCase();
        counts[initial] = (counts[initial] || 0) + 1;
      });

      this.summaryData = Object.keys(counts)
        .map((key) => ({
          letter: key,
          count: counts[key],
        }))
        .sort((a, b) => (a.letter > b.letter ? 1 : -1));
    });
  }
}
