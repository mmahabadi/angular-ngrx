import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of, switchMap } from 'rxjs';
import { BasketService } from './basket.service';
import {
  addItemToBasket,
  addItemToBasketSuccess,
  deleteBasketItem,
  loadBasket,
  loadBasketFailure,
  loadBasketSuccess,
  updateBasketItem,
} from './basket.actions';
import {  BasketItemWithId } from '../../../models/basket';

@Injectable()
export class BasketEffects {
  private readonly actions$ = inject(Actions);
  private readonly basketService = inject(BasketService);

  loadBasket$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadBasket),
      exhaustMap(() =>
        this.basketService.getBasket().pipe(
          map((items: BasketItemWithId[]) => loadBasketSuccess({ items })),
          catchError((error: Error) => of(loadBasketFailure({ error })))
        )
      )
    )
  );

  addBasketItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addItemToBasket),
      switchMap((res) =>
        this.basketService.addItem(res).pipe(
          map((basketItem: BasketItemWithId) => {
            return addItemToBasketSuccess(basketItem);
          })
        )
      )
    )
  );

  updateBasketItem$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(updateBasketItem),
        switchMap((res: BasketItemWithId) => this.basketService.updateItem(res))
      ),
    {
      dispatch: false,
    }
  );

  deleteBasketItem$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(deleteBasketItem),
        switchMap(({ id }) => this.basketService.removeItem(id))
      ),
    {
      dispatch: false,
    }
  );
}
