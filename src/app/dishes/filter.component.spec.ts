import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { DishFilterCategory } from '../../models/diesh-category';
import { filterDishes } from './+state/dishes.actions';
import { FilterComponent } from './filter.component';

describe('FilterComponent', () => {
  let component: FilterComponent;
  let fixture: ComponentFixture<FilterComponent>;
  let store: MockStore;

  const initialState = {};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, FilterComponent],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();

    store = TestBed.inject(Store) as MockStore;
    fixture = TestBed.createComponent(FilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch filterDishes action when changing filter', () => {
    const filterType = DishFilterCategory.Burgers;

    const dispatchSpy = spyOn(store, 'dispatch');

    component.onChangeFilter(filterType);

    expect(component.selectedFilter).toEqual(filterType);
    expect(dispatchSpy).toHaveBeenCalledWith(
      filterDishes({ filterType, searchQuery: '' })
    );
  });

  it('should dispatch filterDishes action when changing search query', () => {
    const searchQuery = 'burger';

    const dispatchSpy = spyOn(store, 'dispatch');

    component.onChangeQuery({
      target: { value: searchQuery },
    } as any);

    fixture.detectChanges();

    expect(component.query).toEqual(searchQuery);
    expect(dispatchSpy).toHaveBeenCalledWith(
      filterDishes({
        filterType: DishFilterCategory.Popular,
        searchQuery,
      })
    );
  });
});
