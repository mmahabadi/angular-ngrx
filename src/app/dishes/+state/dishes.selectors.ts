import { state } from '@angular/animations';
import { AppStore } from '../../../models/app.store';
import { DishFilterCategory } from '../../../models/diesh-category';

export const selectDieshes = (state: AppStore) => {
  const { dishes, filterType, searchQuery } = state.dishes;
  let filteredDishes = [...dishes];

  if (!!filterType) {
    if (filterType === DishFilterCategory.Popular) {
      filteredDishes = dishes?.filter((dish) => dish.popular);
    } else {
      filteredDishes = dishes?.filter((dish) => dish.category === filterType);
    }
  }
  if (searchQuery !== undefined) {
    filteredDishes = filteredDishes.filter((dish) =>
      dish.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }
  return filteredDishes;
};

export const selectDishesLoading = (state: AppStore) => state.dishes.loading;

export const selectDishesError = (state: AppStore) =>
  state.dishes.error?.message;

export const selectBasketId = (dishId: string) => (state: AppStore) => {
  const basketItem = state.basket.items.find((item) => item.dishId === dishId);
  return basketItem?.id || '';
};
