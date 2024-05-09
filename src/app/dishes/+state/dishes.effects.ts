import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { Dish } from '../../../models/dish';
import { DishService } from './dish.service';
import {
  loadDishes,
  loadDishesFailure,
  loadDishesSuccess,
} from './dishes.actions';

@Injectable()
export class DishesEffects {
  private readonly actions$ = inject(Actions);
  private readonly dishService = inject(DishService);

  loadDishes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadDishes),
      exhaustMap(() =>
        this.dishService.getDishes().pipe(
          map((dishes: Dish[]) => loadDishesSuccess({ dishes })),
          catchError((error: Error) => of(loadDishesFailure({ error })))
        )
      )
    )
  );
}
