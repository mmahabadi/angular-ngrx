import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';
import { RouterOutlet } from '@angular/router';

import { AppComponent } from './app.component';
import { DrawerComponent } from '../share/components/drawer.component';
import { LayoutComponent } from '../share/components/layout.component';
import { DishesListComponent } from './dishes/dishes-list.component';
import { dishesReducer } from './dishes/+state/dishes.reducers';
import { DishesEffects } from './dishes/+state/dishes.effects';
import { BasketComponent } from './basket/basket.component';
import { AppRouterModule } from './app.router.module';
import { basketReducer } from './basket/+state/basket.reducers';
import { BasketEffects } from './basket/+state/basket.effects';
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    HttpClientModule,
    RouterOutlet,
    DrawerComponent,
    LayoutComponent,
    DishesListComponent,
    BasketComponent,
    StoreModule.forRoot({
      dishes: dishesReducer,
      basket: basketReducer,
    }),
    EffectsModule.forRoot([DishesEffects, BasketEffects]),
    AppRouterModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
