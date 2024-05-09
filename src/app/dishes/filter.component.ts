import { Component, OnInit, inject } from '@angular/core';
import { ButtonComponent } from '../../share/components/button.component';
import { Store } from '@ngrx/store';
import { filterDishes } from './+state/dishes.actions';
import { DishFilterCategory } from '../../models/diesh-category';
import { FormsModule } from '@angular/forms';
import { SearchInputComponent } from '../../share/components/searchInput.component';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [ButtonComponent, FormsModule, SearchInputComponent],
  styles: `
  .filters{
    @apply my-6 flex justify-between items-center;
  }
  `,
  template: `<div class="filters">
    <div class="buttons">
      <app-button
        rounded
        (click)="onChangeFilter(FilterCategory.Popular)"
        [active]="selectedFilter == FilterCategory.Popular"
        >{{ FilterCategory.Popular }}</app-button
      >
      <app-button
        rounded
        (click)="onChangeFilter(FilterCategory.Burgers)"
        [active]="selectedFilter == FilterCategory.Burgers"
        >{{ FilterCategory.Burgers }}</app-button
      >
      <app-button
        rounded
        (click)="onChangeFilter(FilterCategory.Steaks)"
        [active]="selectedFilter == FilterCategory.Steaks"
        >{{ FilterCategory.Steaks }}</app-button
      >
    </div>

    <app-search-input [(ngModel)]="query" (keyup)="onChangeQuery($event)" />
  </div>`,
})
export class FilterComponent implements OnInit {
  private readonly store = inject(Store);
  selectedFilter = DishFilterCategory.Popular;
  FilterCategory = DishFilterCategory;
  query = '';

  ngOnInit(): void {
    this.filter();
  }

  onChangeFilter(filter: DishFilterCategory): void {
    this.selectedFilter = filter;
    this.filter();
  }

  onChangeQuery(event: KeyboardEvent): void {
    this.query = (event.target as HTMLInputElement).value;
    this.filter();
  }

  filter(): void {
    this.store.dispatch(
      filterDishes({ filterType: this.selectedFilter, searchQuery: this.query })
    );
  }
}
