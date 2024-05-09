import { Injectable, inject, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DrawerService implements OnDestroy {
  router = inject(Router);
  openSource$ = new BehaviorSubject<boolean>(false);
  open$ = this.openSource$.asObservable();

  toggle() {
    if (!!this.openSource$.value) {
      this.router.navigate(['/']);
    }
    this.openSource$.next(!this.openSource$.value);
  }

  ngOnDestroy() {
    this.openSource$.complete();
  }
}
