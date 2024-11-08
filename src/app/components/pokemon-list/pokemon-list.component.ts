import { Component, OnInit, ViewChild, OnDestroy, AfterViewInit } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { MatSort } from '@angular/material/sort';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';

import { PokemonService } from '../../services/pokemon.service';
import { PokemonNamePipe } from '../../common/pipes/pokemon-name.pipe';
import { HighlightFavoriteDirective } from '../../common/directives/highlight-favorite.directive';
import { AppState } from '../../store/app.state';
import { selectPokemon, setFavoritePokemon } from '../../store/app.actions';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatPaginatorModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    PokemonNamePipe,
    HighlightFavoriteDirective,
  ],
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss'],
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
      transition('deselected => selected', [
        animate('200ms ease-in'),
      ]),
      transition('selected => deselected', [
        animate('200ms ease-out'),
      ]),
    ]),
  ],
})
export class PokemonListComponent implements OnInit, AfterViewInit, OnDestroy {
  displayedColumns: string[] = ['name', 'favorite'];
  dataSource = new MatTableDataSource<{ name: string }>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  favoritePokemonName$!: Observable<string | null>;
  selectedPokemonName$!: Observable<string | null>;

  totalPokemons = 0;
  totalFilterPokemons = 0;
  isFiltered = false;

  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions: Array<number> = [5, 10, 20];

  searchControl = new FormControl('');
  subscriptions: Subscription[] = [];


  color = '#3f51b5';

  constructor(private pokemonService: PokemonService, private store: Store<{ app: AppState }>) {
    this.favoritePokemonName$ = this.store.pipe(select((state) => state.app.favoritePokemonName));
    this.selectedPokemonName$ = this.store.pipe(select((state) => state.app.selectedPokemonName));
  }

  ngOnInit(): void {
    this.loadAllPokemons();

    this.dataSource.filterPredicate = (data: any, filter: string) => {
      const name = data.name.toLowerCase();
      return name.includes(filter);
    };

    const searchSub = this.searchControl.valueChanges
    .pipe(
      debounceTime(300),
      distinctUntilChanged()
    )
    .subscribe((value: any) => {
      this.applyFilter(value);
    });
    this.subscriptions.push(searchSub);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  loadAllPokemons(): void {
    this.pokemonService.getPokemonList(0, 1118).subscribe((response: any) => {
      this.totalPokemons = response.count;
      this.dataSource.data = response.results;
      this.totalFilterPokemons = this.totalPokemons;
      this.isFiltered = false;
  
      if (this.dataSource.paginator) {
        this.dataSource.paginator.length = this.totalPokemons;
      }
    });
  }

  applyFilter(filterValue: string): void {
    filterValue = filterValue.trim().toLowerCase();
    this.dataSource.filter = filterValue;
    this.isFiltered = filterValue.length > 0;
  
    if (this.isFiltered) {
      this.totalFilterPokemons = this.dataSource.filteredData.length;
      this.dataSource.paginator!.length = this.totalFilterPokemons;
    } else {
      this.totalFilterPokemons = this.totalPokemons;
      this.dataSource.paginator!.length = this.totalPokemons;
    }
  
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  selectPokemon(name: string): void {
    this.store.dispatch(selectPokemon({ name }));
  }

  markAsFavorite(name: string): void {
    this.store.dispatch(setFavoritePokemon({ name }));
  }

}
