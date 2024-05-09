import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { loadBasket } from './basket/+state/basket.actions';
import { loadDishes } from './dishes/+state/dishes.actions';
import { selectBasketCount } from './basket/+state/basket.selectors';
import { BasketComponent } from './basket/basket.component';
import { LayoutComponent } from '../share/components/layout.component';
import { DishesListComponent } from './dishes/dishes-list.component';
import { DrawerComponent } from '../share/components/drawer.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let store: MockStore;
  const initialState = {};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LayoutComponent,
        DrawerComponent,
        DishesListComponent,
        BasketComponent,
      ],
      declarations: [AppComponent],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();

    store = TestBed.inject(Store) as MockStore;
    store.overrideSelector(selectBasketCount, 10);

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should dispatch loadDishes actions on component creation', () => {
    const loadDishesSpy = spyOn(store, 'dispatch').and.callThrough();

    fixture.detectChanges();

    expect(loadDishesSpy).toHaveBeenCalled();
  });

  it('should initialize totalItemsInBasket$ with basket count from store', () => {
    const expectedBasketCount = 10;
    component.totalItemsInBasket$.subscribe((count) => {
      expect(count).toBe(expectedBasketCount);
    });
  });
});
