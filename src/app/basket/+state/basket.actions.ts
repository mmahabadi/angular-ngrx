import { createAction, props } from '@ngrx/store';
import { BasketItem, BasketItemWithId } from '../../../models/basket';

export const loadBasket = createAction('[Basket] Load Basket');

export const loadBasketSuccess = createAction(
  '[Basket] Load Basket Success',
  props<{ items: BasketItemWithId[] }>()
);

export const loadBasketFailure = createAction(
  '[Basket] Load Basket Failure',
  props<{ error: Error }>()
);

export const addItemToBasket = createAction(
  '[Basket] Add Item',
  props<BasketItem>()
);

export const addItemToBasketSuccess = createAction(
  '[Basket] Add Item Success',
  props<BasketItemWithId>()
);

export const updateBasketItem = createAction(
  '[Basket] Update Item',
  props<BasketItemWithId>()
);

export const deleteBasketItem = createAction(
  '[Basket] Delete Item',
  props<{ id: string }>()
);
