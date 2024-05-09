import { Dish } from './dish';

export interface BasketItem {
  dishId: string;
  count: number;
}

export type BasketItemWithId = BasketItem & { id: string };

export type BasketItemWithDish = BasketItem & { dish: Dish };

export type BasketItemWithDishAndId = BasketItem & { dish: Dish; id: string };
