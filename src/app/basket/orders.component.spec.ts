import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Store, StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import { BasketItemWithDishAndId } from '../../models/basket';
import { OrdersComponent } from './orders.component';

describe('OrdersComponent', () => {
  let component: OrdersComponent;
  let fixture: ComponentFixture<OrdersComponent>;
  let store: Store<any>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        OrdersComponent,
        StoreModule.forRoot({}), // Set up the store
      ],
    }).compileComponents();

    store = TestBed.inject(Store);
    fixture = TestBed.createComponent(OrdersComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render empty basket message when basket is empty', () => {
    component.items$ = of([]);

    fixture.detectChanges();

    const element = fixture.nativeElement;
    expect(element.querySelector('.empty-basket').textContent).toContain(
      'Your basket is empty'
    );
  });

  it('should render basket items and total when basket has items', () => {
    const items: BasketItemWithDishAndId[] = [
      {
        id: '1',
        dish: { name: 'Dish 1', price: 10 },
        count: 2,
      } as BasketItemWithDishAndId,
      {
        id: '2',
        dish: { name: 'Dish 2', price: 15 },
        count: 1,
      } as BasketItemWithDishAndId,
    ];
    component.items$ = of(items);
    component.subtotal$ = of(35);
    component.delivery$ = of(3);
    component.total$ = of(38);

    fixture.detectChanges();

    const element = fixture.nativeElement;
    expect(element.querySelector('.subtotal').textContent).toContain('$35.00');
    expect(element.querySelector('.delivery').textContent).toContain('$3.00');
    expect(element.querySelector('.total').textContent).toContain('$38.00');
  });
});
