import { Component, OnInit, inject } from '@angular/core';
import { FilterComponent } from './filter.component';
import { DishCardComponent } from './dish-card.component';
import { Store } from '@ngrx/store';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

import { Dish } from '../../models/dish';
import {
  selectDieshes,
  selectDishesError,
  selectDishesLoading,
} from './+state/dishes.selectors';
import { AlertComponent } from '../../share/components/alert.component';

@Component({
  selector: 'app-dishes-list',
  standalone: true,
  imports: [
    AsyncPipe,
    CommonModule,
    FilterComponent,
    DishCardComponent,
    AlertComponent,
  ],
  template: `
    <div>
      <app-filter></app-filter>
      @if (loading$ | async) {
      <div class="text-center">Loading...</div>
      } @if (error$ | async) {
      <app-alert class="text-center">{{ error$ | async }}</app-alert>
      }

      <div class="flex flex-wrap">
        @for (item of dieshes$|async; track item.id) {
        <app-dish-card class="lg:w-1/2" [dish]="item" />
        }
      </div>
    </div>
  `,
})
export class DishesListComponent implements OnInit {
  store = inject(Store);
  dieshes$!: Observable<Dish[]>;
  loading$!: Observable<boolean>;
  error$!: Observable<unknown>;

  ngOnInit() {
    this.dieshes$ = this.store.select(selectDieshes);
    this.loading$ = this.store.select(selectDishesLoading);
    this.error$ = this.store.select(selectDishesError);
  }
}
