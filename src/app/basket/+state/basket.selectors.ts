import { createSelector } from '@ngrx/store';
import { AppStore } from '../../../models/app.store';
import {
  BasketItemWithDishAndId,
  BasketItemWithId,
} from '../../../models/basket';

const DELIVERY_FEE = 3;

export const selectItemsInBasket = (
  state: AppStore
): BasketItemWithDishAndId[] => {
  const dishes = state.dishes.dishes;
  const basketItems = state.basket.items;
  return basketItems.map((basketItem: BasketItemWithId) => {
    const dish = dishes.find((d) => d.id === basketItem.dishId);
    return {
      ...basketItem,
      dish,
    } as BasketItemWithDishAndId;
  });
};

export const selectSubtotalCount = createSelector(
  selectItemsInBasket,
  (items) => {
    return items.reduce((acc, basket) => {
      const price = basket.dish.price || 0;
      return acc + basket.count * price;
    }, 0);
  }
);

export const selectDeliveryFee = createSelector(
  selectSubtotalCount,
  (subtotal) => (subtotal === 0 ? 0 : DELIVERY_FEE)
);

export const selectTotalCount = createSelector(
  selectSubtotalCount,
  (subtotal) => (subtotal === 0 ? 0 : subtotal + DELIVERY_FEE)
);

export const selectBasketItemQuantity = (dishId: string) =>
  createSelector(
    selectItemsInBasket,
    (items) => items.find((basket) => basket.dish.id === dishId)?.count || 0
  );

export const selectBasketCount = createSelector(selectItemsInBasket, (items) =>
  items.reduce((acc, item) => acc + item.count, 0)
);
