import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OrdersComponent } from './basket/orders.component';

const routes = [
  {
    path: '',
    component: OrdersComponent,
  },
  {
    path: 'payment',
    loadComponent: () =>
      import('./basket/payment.component').then((m) => m.PaymentComponent),
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRouterModule {}
