import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { ButtonComponent } from '../../share/components/button.component';
import {
  selectDeliveryFee,
  selectItemsInBasket,
  selectSubtotalCount,
  selectTotalCount,
} from './+state/basket.selectors';
import { BasketItemComponent } from './basket-item.component';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [
    RouterModule,
    AsyncPipe,
    BasketItemComponent,
    CurrencyPipe,
    ButtonComponent,
  ],
  template: `
    <h2 class="text-xl font-semibold">Your Order</h2>

    @for (basket of items$ | async; track basket.id) {
    <app-basket-item
      [basketId]="basket.id"
      [dish]="basket.dish"
      [count]="basket.count"
    />
    } @if((items$ | async)?.length === 0) {
    <div class="empty-basket text-center text-2xl mt-8">
      Your basket is empty
    </div>
    } @else {
    <div class="my-8">
      <div class="flex items-center justify-between">
        <span>Subtotal</span>
        <span class="subtotal">{{ subtotal$ | async | currency }}</span>
      </div>
      <div class="flex items-center justify-between">
        <span>Delivery fee</span>
        <span class="delivery">{{ delivery$ | async | currency }}</span>
      </div>
      <div class="flex items-center justify-between">
        <span>Total</span>
        <span class="total">{{ total$ | async | currency }}</span>
      </div>
    </div>

    <app-button
      fullwidth
      classes="bg-orange-600 text-white hover:bg-orange-700 text-3xl"
      (click)="onPay()"
    >
      Order ({{ total$ | async | currency }})
    </app-button>
    }
  `,
})
export class OrdersComponent {
  store = inject(Store);
  router = inject(Router);

  items$ = this.store.select(selectItemsInBasket);
  subtotal$ = this.store.select(selectSubtotalCount);
  delivery$ = this.store.select(selectDeliveryFee);
  total$ = this.store.select(selectTotalCount);

  onPay() {
    this.router.navigate(['payment']);
  }
}
