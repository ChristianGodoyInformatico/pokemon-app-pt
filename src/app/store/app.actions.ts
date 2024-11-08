import { createAction, props } from '@ngrx/store';

export const selectPokemon = createAction(
  '[Pokemon List] Select Pokemon',
  props<{ name: string | null }>()
);

export const setFavoritePokemon = createAction(
  '[Pokemon List] Set Favorite Pokemon',
  props<{ name: string | null }>()
);
