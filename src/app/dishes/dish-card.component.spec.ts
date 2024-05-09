import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DishCardComponent } from './dish-card.component';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { DishService } from './+state/dish.service';
import { of, Subject } from 'rxjs';
import { Dish } from '../../models/dish';

describe('DishCardComponent', () => {
  let component: DishCardComponent;
  let fixture: ComponentFixture<DishCardComponent>;
  let storeMock: any;
  let dishServiceMock: any;
  const destroySubject: Subject<void> = new Subject<void>();

  beforeEach(async () => {
    storeMock = {
      select: jasmine.createSpy().and.returnValue(of(0)),
    };

    dishServiceMock = {
      updateDishQuantity: jasmine.createSpy(),
    };

    await TestBed.configureTestingModule({
      imports: [FormsModule, DishCardComponent],
      providers: [
        { provide: Store, useValue: storeMock },
        { provide: DishService, useValue: dishServiceMock },
        CurrencyPipe,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DishCardComponent);
    component = fixture.componentInstance;
    component.dish = {
      id: '1',
      name: 'Test Dish',
      description: 'Test Description',
      price: 10,
      image: 'test.jpg',
    } as Dish;
    fixture.detectChanges();
  });

  afterEach(() => {
    destroySubject.next();
    destroySubject.complete();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the template correctly', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.dish-name').textContent).toContain(
      'Test Dish'
    );
    expect(compiled.querySelector('.dish-description').textContent).toContain(
      'Test Description'
    );
    expect(compiled.querySelector('.dish-price').textContent).toContain(
      '$10.00'
    );
  });

  it('should call updateDishQuantity method on quantity change', () => {
    component.quantity = 0;
    component.basketId = '123';
    component.onChangeCount(2);
    expect(dishServiceMock.updateDishQuantity).toHaveBeenCalledWith(
      '123',
      '1',
      2
    );
  });

  it('should show quantity field on mouse enter', () => {
    component.onHover();
    expect(component.showQuantityField).toBeTruthy();
  });

  it('should hide quantity field on mouse leave', () => {
    component.showQuantityField = true;
    component.onMouseLeave();
    expect(component.showQuantityField).toBeFalsy();
  });
});
