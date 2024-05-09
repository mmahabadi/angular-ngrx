import {
  BasketItem,
  BasketItemWithDish,
  BasketItemWithDishAndId,
  BasketItemWithId,
} from './basket';

export interface BasketStore {
  items: BasketItemWithId[];
  loading: boolean;
  error: Error | null;
}
