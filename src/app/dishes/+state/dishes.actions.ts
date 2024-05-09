import { createAction, props } from '@ngrx/store';
import { Dish } from '../../../models/dish';
import { DishFilterCategory } from '../../../models/diesh-category';

export const loadDishes = createAction('[Dishes] Load Dishes');

export const loadDishesSuccess = createAction(
  '[Dishes] Load Dishes Success',
  props<{ dishes: Dish[] }>()
);

export const loadDishesFailure = createAction(
  '[Dishes] Load Dishes Failure',
  props<{ error: Error }>()
);

export const filterDishes = createAction(
  '[Dishes] Filter Dishes',
  props<{ filterType: DishFilterCategory; searchQuery: string }>()
);
