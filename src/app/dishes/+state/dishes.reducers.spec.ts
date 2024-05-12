import { DishFilterCategory } from '../../../models/diesh-category';
import { Dish } from '../../../models/dish';
import {
  filterDishes,
  loadDishes,
  loadDishesFailure,
  loadDishesSuccess,
} from './dishes.actions';
import { dishesReducer, initialState } from './dishes.reducers';

describe('DishReducers', () => {
  it('should return the default state', () => {
    // Arrange
    const action = { type: 'Unknown' };
    // Act
    const result = dishesReducer(initialState, action);
    // Assert
    expect(result).toEqual(initialState);
  });
  it('should set loading to true on loadDishes', () => {
    // Act
    const result = dishesReducer(initialState, loadDishes());
    // Assert
    expect(result.loading).toBe(true);
    expect(result.error).toBeNull();
  });

  it('should receive dishes on loadDishesSuccess', () => {
    // Arrange
    const dishes = [
      {
        id: '1',
        name: 'Classic Cheeseburger',
        description:
          'Juicy beef patty topped with melted cheese, lettuce, tomato, and pickles, served with fries.',
        image: 'assets/images/dish-1.png',
        price: 11.99,
        category: 'Burgers',
        popular: true,
      } as Dish,
    ];
    // Act
    const result = dishesReducer(initialState, loadDishesSuccess({ dishes }));
    // Assert
    expect(result.dishes).toEqual(dishes);
    expect(result.loading).toBe(false);
    expect(result.error).toBeNull();
  });
  it('should set error on loadDishesFailure', () => {
    // Arrange
    const error = new Error('Error');
    // Act
    const result = dishesReducer(initialState, loadDishesFailure({ error }));
    // Assert
    expect(result.error).toEqual(error);
    expect(result.loading).toBe(false);
  });
  it('should set filterType and searchQuery on filterDishes', () => {
    // Arrange
    const filterType = DishFilterCategory.Burgers;
    const searchQuery = 'Cheeseburger';
    // Act
    const result = dishesReducer(
      initialState,
      filterDishes({ filterType, searchQuery })
    );
    // Assert
    expect(result.filterType).toEqual(DishFilterCategory.Burgers);
    expect(result.searchQuery).toEqual(searchQuery);
  });
});
