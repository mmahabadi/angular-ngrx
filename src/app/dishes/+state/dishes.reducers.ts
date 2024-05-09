import { createReducer, on } from '@ngrx/store';
import {
  filterDishes,
  loadDishes,
  loadDishesFailure,
  loadDishesSuccess,
} from './dishes.actions';
import { DishStore } from '../../../models/dish.store';

const initialState: DishStore = {
  dishes: [],
  loading: false,
  error: null,
};

export const dishesReducer = createReducer(
  initialState,
  on(loadDishes, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(loadDishesSuccess, (state, { dishes }) => ({
    ...state,
    dishes,
    loading: false,
  })),
  on(loadDishesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(filterDishes, (state, { filterType, searchQuery }) => ({
    ...state,
    filterType,
    searchQuery,
  }))
);
