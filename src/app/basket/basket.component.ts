import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonComponent } from '../../share/components/button.component';
import { DrawerService } from '../../share/services/drawer.service';

@Component({
  selector: 'app-basket',
  imports: [RouterModule, ButtonComponent],
  standalone: true,
  template: `<div class="p-6 overflow-auto h-screen">
    <router-outlet></router-outlet>
    <app-button (click)="onClose()" classes="mt-3 text-3xl" fullwidth>
      Continue shopping
    </app-button>
  </div>`,
})
export class BasketComponent {
  drawer = inject(DrawerService);

  onClose() {
    this.drawer.toggle();
  }
}
