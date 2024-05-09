import { Component, Input } from '@angular/core';
import { FormsModule, NgControl } from '@angular/forms';
import { AbstractControlValueAccessor } from '../directives/abstract-control-value-accessor';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [FormsModule],
  template: `
    <label
      [for]="label.toLowerCase()"
      class="block mb-1 text-sm font-medium text-gray-900"
    >
      {{ label }} @if( !!formControl.errors &&
      !!formControl.errors['required']){
      <span class="asterix mr-1 text-red-600">*</span>
      }
    </label>
    <input
      type="text"
      [id]="label.toLowerCase()"
      class="bg-gray-100 mb-4 text-gray-900 text-sm rounded-lg block w-full p-2.5 "
      [placeholder]="placeholder"
      [(ngModel)]="value"
    />
  `,
})
export class InputComponent extends AbstractControlValueAccessor {
  @Input() label: string = '';
  @Input() placeholder: string = '';

  formControl!: NgControl;

  constructor(private ngControl: NgControl) {
    super();
    this.formControl = ngControl;
    this.formControl.valueAccessor = this;

    if (!this.formControl) {
      throw new Error('NgControl is not available');
    }
  }
}
