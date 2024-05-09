import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule, NgControl } from '@angular/forms';
import { AbstractControlValueAccessor } from '../directives/abstract-control-value-accessor';

@Component({
  selector: 'app-quantity-input',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="relative flex items-center max-w-[5rem]">
      <button
        type="button"
        (click)="onDecrease()"
        class="bg-gray-200 hover:bg-gray-300 rounded-lg p-2 h-8 focus:ring-gray-100 focus:ring-2 focus:outline-none"
      >
        <svg
          class="w-3 h-3 text-gray-900 "
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 18 2"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M1 1h16"
          />
        </svg>
      </button>
      <input
        type="text"
        class="bg-transparent h-11 text-center text-black block w-full"
        placeholder="0"
        [(ngModel)]="value"
        required
      />
      <button
        type="button"
        (click)="onIncrease()"
        class="bg-gray-200  hover:bg-gray-300 rounded-lg p-2 h-8 focus:ring-gray-100 focus:ring-2 focus:outline-none"
      >
        <svg
          class="w-3 h-3 text-gray-900"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 18 18"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 1v16M1 9h16"
          />
        </svg>
      </button>
    </div>
  `,
})
export class QuantityInputComponent extends AbstractControlValueAccessor {
  @Output() onChangeCount = new EventEmitter<number>();

  formControl: NgControl;

  constructor(private ngControl: NgControl) {
    super();
    this.formControl = ngControl;
    this.formControl.valueAccessor = this;

    if (!this.formControl) {
      throw new Error('NgControl is not available');
    }
  }

  onIncrease(): void {
    this.value = this.value + 1;
    this.onChangeCount.emit(this.value);
  }

  onDecrease(): void {
    this.value = this.value > 1 ? this.value - 1 : 0;
    this.onChangeCount.emit(this.value);
  }
}
