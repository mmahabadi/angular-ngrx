import { BasketStore } from './basket.store';
import { DishStore } from './dish.store';

export interface AppStore {
  dishes: DishStore;
  basket: BasketStore;
}
