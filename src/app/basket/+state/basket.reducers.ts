import { createReducer, on } from '@ngrx/store';
import { BasketItemWithId } from '../../../models/basket';
import { BasketStore } from '../../../models/basket.store';
import {
  addItemToBasket,
  addItemToBasketSuccess,
  deleteBasketItem,
  loadBasket,
  loadBasketFailure,
  loadBasketSuccess,
  updateBasketItem,
} from './basket.actions';

const initialState: BasketStore = {
  items: [],
  loading: false,
  error: null,
};

export const basketReducer = createReducer(
  initialState,
  on(loadBasket, (state) => ({ ...state, loading: true, error: null })),
  on(loadBasketSuccess, (state, { items }) => {
    return { ...state, items, loading: false };
  }),
  on(loadBasketFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(addItemToBasket, (state, item) => {
    const { dishId, count } = item;
    const newItem: BasketItemWithId = {
      id: '',
      dishId,
      count,
    };
    return {
      ...state,
      items: [...state.items, newItem],
    };
  }),
  on(addItemToBasketSuccess, (state, item) => {
    const filteredItems = state.items.filter((i) => i.dishId !== item.dishId);

    return {
      ...state,
      items: [...filteredItems, item],
    };
  }),
  on(updateBasketItem, (state, { dishId, count, id }) => {
    return {
      ...state,
      items: state.items.map((i) =>
        i.dishId === dishId ? { ...i, count } : i
      ),
    };
  }),
  on(deleteBasketItem, (state, { id }) => {
    return {
      ...state,
      items: state.items.filter((i) => i.id !== id),
    };
  })
);
