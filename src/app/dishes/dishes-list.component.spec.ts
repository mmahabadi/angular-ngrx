import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { DishCardComponent } from './dish-card.component';
import { DishesListComponent } from './dishes-list.component';
import { FilterComponent } from './filter.component';

describe('DishesListComponent', () => {
  let component: DishesListComponent;
  let fixture: ComponentFixture<DishesListComponent>;
  let store: MockStore;

  const initialState = {};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        DishesListComponent,
        FilterComponent,
        DishCardComponent,
        HttpClientTestingModule,
      ],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();

    store = TestBed.inject(Store) as MockStore;
    fixture = TestBed.createComponent(DishesListComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
