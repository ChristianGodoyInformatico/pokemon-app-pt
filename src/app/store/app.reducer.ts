import { createReducer, on } from '@ngrx/store';
import { AppState } from './app.state';
import { selectPokemon, setFavoritePokemon } from './app.actions';

export const initialState: AppState = {
  selectedPokemonName: null,
  favoritePokemonName: null,
};

export const appReducer = createReducer(
  initialState,
  on(selectPokemon, (state, { name }) => ({
    ...state,
    selectedPokemonName: state.selectedPokemonName === name ? null : name,
  })),
  on(setFavoritePokemon, (state, { name }) => ({
    ...state,
    favoritePokemonName: state.favoritePokemonName === name ? null : name,
  }))
);