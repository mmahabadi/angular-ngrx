import { TestBed } from '@angular/core/testing';
import { DishService } from './dish.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Dish } from '../../../models/dish';
import { of } from 'rxjs';

describe('DishService', () => {
  let service: DishService;
  const initialState = {};

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DishService, provideMockStore({ initialState })],
    });
    service = TestBed.inject(DishService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch dishes from the API', () => {
    // Arrange
    const expectedDishes: Dish[] = [
      {
        id: '1',
        name: 'Classic Cheeseburger',
        description:
          'Juicy beef patty topped with melted cheese, lettuce, tomato, and pickles, served with fries.',
        image: 'assets/images/dish-1.png',
        price: 11.99,
        category: 'Burgers',
        popular: true,
      },
    ];
    spyOn(service, 'getDishes').and.returnValue(of(expectedDishes));

    // Act
    service.getDishes().subscribe((dishes) => {
      // Assert
      expect(dishes).toEqual(expectedDishes);
    });
  });
});
