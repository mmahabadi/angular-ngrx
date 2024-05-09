import { Component, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadBasket } from './basket/+state/basket.actions';
import { selectBasketCount } from './basket/+state/basket.selectors';
import { loadDishes } from './dishes/+state/dishes.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  store = inject(Store);
  totalItemsInBasket$ = this.store.select(selectBasketCount);

  ngOnInit() {
    this.store.dispatch(loadDishes());
    this.store.dispatch(loadBasket());
  }
}
