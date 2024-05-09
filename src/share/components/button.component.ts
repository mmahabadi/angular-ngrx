import { Attribute, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  styles: `
  .button{
    @apply inline-flex items-center px-3 py-2 text-sm font-semibold shadow-sm rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 mx-1;

    &.active{
      @apply text-white bg-black;
    }
    &.rounded{
      @apply rounded-full;
    }
    &.fullwidth{
      @apply w-full justify-center;
    }
  }`,
  template: `<button
    [type]="type"
    class="button text-black bg-gray-200 hover:bg-gray-300 focus-visible:outline-gray-500 {{
      classes
    }}"
    [ngClass]="{
      active: !!active,
      rounded: rounded !== null,
      fullwidth: fullwidth !== null,
    }"
  >
    <ng-content></ng-content>
  </button>`,
})
export class ButtonComponent {
  @Input() active = false;
  @Input() disabled = false;
  @Input() classes = '';

  // classNames = ['text-white', 'bg-black', ...this.classes];

  constructor(
    @Attribute('type')
    public type: 'button' | 'submit' | 'reset' = 'button',
    @Attribute('rounded')
    public rounded: boolean = false,
    @Attribute('fullwidth')
    public fullwidth: boolean = false
  ) {}
}
