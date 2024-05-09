import { Component } from '@angular/core';

@Component({
  selector: 'app-alert',
  standalone: true,
  template: ` <div
    class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50"
    role="alert"
  >
    <ng-content></ng-content>
  </div>`,
})
export class AlertComponent {}
