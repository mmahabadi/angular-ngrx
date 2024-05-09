import { Component, Input, inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { Dish } from '../../models/dish';
import { QuantityInputComponent } from '../../share/components/quantityInput.component';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { deleteBasketItem, updateBasketItem } from './+state/basket.actions';

@Component({
  selector: 'app-basket-item',
  standalone: true,
  imports: [CurrencyPipe, QuantityInputComponent, FormsModule],
  template: `
    @if(!!dish){
    <div class="p-2 my-4 bg-gray-100 border border-gray-200 rounded-lg">
      <div class="p-4">
        <h3
          class="mb-2 text-md font-bold text-gray-900 flex flex-row justify-between"
        >
          <div>{{ dish.name }}</div>
        </h3>
        <p>Price per item: {{ dish.price | currency }}</p>

        <div class="flex items-center justify-between">
          <span class="text-xl text-orange-500 font-bold">
            Total: {{ dish.price * count | currency }}
          </span>
          <app-quantity-input
            [(ngModel)]="count"
            (onChangeCount)="onChangeCount()"
          />
        </div>
      </div>
    </div>
    }
  `,
})
export class BasketItemComponent {
  @Input({ required: true }) basketId!: string | undefined;
  @Input({ required: true }) dish!: Dish | undefined;
  @Input({ required: true }) count!: number;

  private readonly store = inject(Store);

  onChangeCount() {
    if (this.count === 0) {
      this.store.dispatch(
        deleteBasketItem({
          id: this.basketId ?? '',
        })
      );
    } else {
      this.store.dispatch(
        updateBasketItem({
          dishId: this.dish?.id || '',
          count: this.count,
          id: this.basketId ?? '',
        })
      );
    }
  }
}
