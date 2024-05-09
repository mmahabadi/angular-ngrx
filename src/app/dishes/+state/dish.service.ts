import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Dish } from '../../../models/dish';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import {
  addItemToBasket,
  deleteBasketItem,
  updateBasketItem,
} from '../../basket/+state/basket.actions';

@Injectable({
  providedIn: 'root',
})
export class DishService {
  private readonly http = inject(HttpClient);
  private readonly store = inject(Store);

  getDishes(): Observable<Dish[]> {
    return this.http.get<Dish[]>('/api/dishes/');
  }

  updateDishQuantity(basketId: string, dishId: string, quantity: number): void {
    if (quantity === 0) {
      this.removeItem(basketId);
    } else if (quantity === 1) {
      this.addItem(dishId);
    } else if (quantity > 1) {
      this.updateItem(basketId, dishId, quantity);
    }
  }

  private addItem(dishId: string) {
    this.store.dispatch(addItemToBasket({ dishId, count: 1 }));
  }

  private removeItem(basketId: string) {
    this.store.dispatch(
      deleteBasketItem({
        id: basketId ?? '',
      })
    );
  }

  private updateItem(basketId: string, dishId: string, value: number) {
    this.store.dispatch(
      updateBasketItem({
        dishId: dishId || '',
        count: value,
        id: basketId ?? '',
      })
    );
  }
}
