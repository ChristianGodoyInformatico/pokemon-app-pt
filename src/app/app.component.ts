import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HeaderComponent } from './components/header/header.component';
import { CommonModule } from '@angular/common';
import { PokemonDetailComponent } from './components/pokemon-detail/pokemon-detail.component';
import { PokemonSummaryComponent } from './components/pokemon-summary/pokemon-summary.component';
import { PokemonFavoriteComponent } from './components/pokemon-favorite/pokemon-favorite.component';
import { PokemonListComponent } from './components/pokemon-list/pokemon-list.component';
import { firstValueFrom, Observable } from 'rxjs';
import { AppState } from './store/app.state';
import { select, Store } from '@ngrx/store';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HeaderComponent,
    CommonModule,
    PokemonDetailComponent,
    PokemonSummaryComponent,
    PokemonListComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  favoritePokemonName$!: Observable<string | null>;
  selectedPokemonName$!: Observable<string | null>;

  constructor(private dialog: MatDialog, private store: Store<{ app: AppState }>) {
    this.favoritePokemonName$ = this.store.pipe(select((state) => state.app.favoritePokemonName));
    this.selectedPokemonName$ = this.store.pipe(select((state) => state.app.selectedPokemonName));
  }

  async openFavoriteDialog(): Promise<void> {
    const name = await firstValueFrom(this.favoritePokemonName$);
    if (name) {
      this.dialog.open(PokemonFavoriteComponent, {
        data: { name },
      });
    }
  }
}
