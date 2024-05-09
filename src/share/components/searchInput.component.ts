import { Component } from '@angular/core';
import { AbstractControlValueAccessor } from '../directives/abstract-control-value-accessor';
import { FormsModule, NgControl } from '@angular/forms';

@Component({
  selector: 'app-search-input',
  standalone: true,
  imports: [FormsModule],
  styles: `
  .search-input{
      @apply block p-2 ps-10 text-sm text-black rounded-full bg-gray-50
    }
  `,
  template: `<div class="relative">
    <div
      class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"
    >
      <svg
        class="w-4 h-4 text-gray-700"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 20 20"
      >
        <path
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
        />
      </svg>
    </div>
    <input
      type="text"
      [(ngModel)]="value"
      class="search-input"
      placeholder="Search..."
    />
  </div>`,
})
export class SearchInputComponent extends AbstractControlValueAccessor {
  formControl: NgControl;

  constructor(private ngControl: NgControl) {
    super();
    this.formControl = ngControl;
    this.formControl.valueAccessor = this;

    if (!this.formControl) {
      throw new Error('NgControl is not available');
    }
  }
}
