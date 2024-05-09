import { Component } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: true,
  template: `
    <div
      class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow"
    >
      <ng-content></ng-content>
    </div>
  `,
})
export class CardComponent {}
