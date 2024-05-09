import { CurrencyPipe, NgIf } from '@angular/common';
import {
  Component,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  inject,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { Dish } from '../../models/dish';
import { ButtonComponent } from '../../share/components/button.component';
import { CardComponent } from '../../share/components/card.component';
import { QuantityInputComponent } from '../../share/components/quantityInput.component';
import { selectBasketItemQuantity } from '../basket/+state/basket.selectors';
import { DishService } from './+state/dish.service';
import { selectBasketId } from './+state/dishes.selectors';

@Component({
  selector: 'app-dish-card',
  standalone: true,
  imports: [
    CardComponent,
    ButtonComponent,
    CurrencyPipe,
    QuantityInputComponent,
    NgIf,
    FormsModule,
  ],
  template: `
    <div
      class="flex cursor-pointer h-54 p-2 mx-4 my-4 items-start bg-white border border-gray-200 rounded-lg shadow flex-row  hover:bg-gray-100"
    >
      <img
        class="object-cover w-full rounded-lg h-full sm:h-auto sm:w-48"
        [src]="dish.image"
        alt=""
      />
      <div
        class="flex flex-col md:h-auto lg:h-48 sm:h-full justify-between p-4"
      >
        <div>
          <h3
            class="mb-2 text-2xl font-bold text-gray-900 flex flex-row justify-between"
          >
            <div class="dish-name">{{ dish.name }}</div>
            <div><img src="/assets/images/info-icon.svg" /></div>
          </h3>
          <p class="mb-3 font-normal text-gray-700 dish-description">
            {{ dish.description }}
          </p>
        </div>

        <div class="flex items-center">
          @if(showQuantityField || quantity > 0){
          <app-quantity-input
            [ngModel]="quantity"
            (onChangeCount)="onChangeCount($event)"
          />
          } @else {
          <app-button [active]="true">Add to card</app-button>
          }

          <span class="mx-4 text-2xl dish-price">{{
            dish.price | currency
          }}</span>
        </div>
      </div>
    </div>
  `,
})
export class DishCardComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  private readonly store = inject(Store);
  private readonly dishService = inject(DishService);

  @Input({ required: true }) dish!: Dish;

  showQuantityField = false;
  quantity = 0;
  basketId = '';

  @HostListener('mouseenter')
  onHover(): void {
    this.showQuantityField = true;
  }
  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.showQuantityField = false;
  }

  ngOnInit(): void {
    this.store
      .select(selectBasketItemQuantity(this.dish?.id))
      .pipe(takeUntil(this.destroy$))
      .subscribe((quantity) => {
        this.quantity = quantity;
      });
    this.store
      .select(selectBasketId(this.dish?.id))
      .pipe(takeUntil(this.destroy$))
      .subscribe((id) => {
        this.basketId = id;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  onChangeCount(value: number) {
    this.dishService.updateDishQuantity(this.basketId, this.dish.id, value);
  }
}
