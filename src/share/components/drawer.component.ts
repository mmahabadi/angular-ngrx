import { Component, Input, inject } from '@angular/core';
import { DrawerService } from '../services/drawer.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-drawer',
  standalone: true,
  imports: [AsyncPipe],
  styles: `
        .drawer {
        @apply fixed top-0 right-0 w-96 h-full bg-white shadow-lg z-50;
        transform: translateX(100%);
        transition: transform 0.3s;
        }
        .drawer.open {
        transform: translateX(0);
        }
    `,
  template: `
    <div class="drawer" [class.open]="open$ | async">
      <button
        type="button"
        (click)="toggle()"
        class="fixed top-6 right-6 p-4.5 text-center inline-flex items-center me-2"
      >
        <img src="/assets/images/close-icon.svg" alt="Basket icon" />
      </button>
      <ng-content></ng-content>
    </div>

    <button
      type="button"
      (click)="toggle()"
      class="fixed bottom-6 right-6 p-8 text-white bg-orange-600 hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-full text-sm p-4.5 text-center inline-flex items-center me-2"
    >
      <img src="/assets/images/basket-icon.svg" alt="Basket icon" />
      @if(!!badgeCount) {
      <div
        class="badge absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-black bg-white rounded-full top-4 end-4 dark:border-gray-900"
      >
        {{ badgeCount }}
      </div>
      }
    </button>
  `,
})
export class DrawerComponent {
  protected readonly drawerService = inject(DrawerService);

  @Input() badgeCount: number | null = 0;

  open$ = this.drawerService.open$;
  toggle() {
    this.drawerService.toggle();
  }
}
