import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputComponent } from '../../share/components/input.component';
import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { ButtonComponent } from '../../share/components/button.component';
import { Store } from '@ngrx/store';
import { selectTotalCount } from './+state/basket.selectors';

@Component({
  selector: 'app-payment',
  imports: [
    ReactiveFormsModule,
    InputComponent,
    CurrencyPipe,
    AsyncPipe,
    ButtonComponent,
  ],
  standalone: true,
  template: `
    <div class="payment">
      <h2 class="text-xl font-semibold">Payment</h2>

      <form [formGroup]="form" class="mt-8">
        <p class="font-bold text-sm mb-2">Contact information</p>
        <app-input
          label="Name"
          formControlName="name"
          placeholder="Enter your full name"
        ></app-input>

        <app-input
          label="Contact phone number"
          formControlName="phone"
          placeholder="+44 xxx xxx xxx"
        ></app-input>

        <app-input
          label="Email"
          formControlName="email"
          placeholder="mail@mail.com"
        ></app-input>

        <p class="font-bold text-sm mt-4 mb-2">Deliver to</p>

        <app-input
          label="Address"
          formControlName="address"
          placeholder="Enter address to deliver here"
        ></app-input>

        <app-input
          label="City"
          formControlName="city"
          placeholder="Enter city"
        ></app-input>

        <div class="flex items-start mb-6">
          <div class="flex items-center h-5">
            <input
              id="call"
              type="checkbox"
              formControlName="call"
              value=""
              class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-30"
            />
          </div>
          <label for="call" class="ms-2 text-sm font-medium text-gray-900 ">
            You can do not call me to confirm the order
          </label>
        </div>

        <app-button
          fullwidth
          classes="bg-orange-600 text-white hover:bg-orange-700 text-3xl"
          (click)="onPlaceOrder()"
        >
          Order ({{ total$ | async | currency }})
        </app-button>
      </form>
    </div>
  `,
})
export class PaymentComponent {
  store = inject(Store);
  total$ = this.store.select(selectTotalCount);
  form = new FormGroup({
    name: new FormControl('', Validators.compose([Validators.required])),
    phone: new FormControl('', Validators.compose([Validators.required])),
    email: new FormControl('', Validators.compose([Validators.required])),
    address: new FormControl('', Validators.compose([Validators.required])),
    city: new FormControl('', Validators.compose([Validators.required])),
    call: new FormControl(false, Validators.compose([Validators.required])),
  });

  onPlaceOrder() {
    alert(JSON.stringify(this.form.value));
  }
}
