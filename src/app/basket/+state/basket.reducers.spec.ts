import { BasketItemWithId } from '../../../models/basket';
import {
  addItemToBasket,
  deleteBasketItem,
  loadBasket,
  loadBasketFailure,
  loadBasketSuccess,
  updateBasketItem,
} from './basket.actions';
import { basketReducer, initialState } from './basket.reducers';

describe('BasketReducers', () => {
  it('should return the default state', () => {
    // Arrange
    const action = { type: 'Unknown' };
    // Act
    const result = basketReducer(initialState, action);
    // Assert
    expect(result).toEqual(initialState);
  });
  it('should set loading to true on loadBasket', () => {
    // Act
    const result = basketReducer(initialState, loadBasket());
    // Assert
    expect(result.loading).toBe(true);
    expect(result.error).toBeNull();
  });

  it('should receive basket on loadBasketSuccess', () => {
    // Arrange
    const items = [{ id: '1', dishId: '1', count: 2 } as BasketItemWithId];
    // Act
    const result = basketReducer(initialState, loadBasketSuccess({ items }));
    // Assert
    expect(result.items).toEqual(items);
    expect(result.loading).toBe(false);
    expect(result.error).toBeNull();
  });
  it('should set error on loadBasketFailure', () => {
    // Arrange
    const error = new Error('Error');
    // Act
    const result = basketReducer(initialState, loadBasketFailure({ error }));
    // Assert
    expect(result.error).toEqual(error);
    expect(result.loading).toBe(false);
  });
  it('should add item to basket on addItemToBasket', () => {
    // Arrange
    const item = { id: '', dishId: '1', count: 2 } as BasketItemWithId;
    // Act
    const result = basketReducer(initialState, addItemToBasket(item));
    // Assert
    expect(result.items).toEqual([item]);
  });
  it('should update item in basket on updateBasketItem', () => {
    // Arrange
    const item = { id: '1', dishId: '1', count: 2 } as BasketItemWithId;
    const state = { ...initialState, items: [item] };
    const updatedItem = { ...item, count: 1 };
    // Act
    const result = basketReducer(state, updateBasketItem(updatedItem));
    // Assert
    expect(result.items).toEqual([updatedItem]);
  });
  it('should delete item from basket on deleteBasketItem', () => {
    // Arrange
    const item = { id: '1', dishId: '1', count: 2 } as BasketItemWithId;
    const state = { ...initialState, items: [item] };
    // Act
    const result = basketReducer(state, deleteBasketItem({ id: item.id }));
    // Assert
    expect(result.items).toEqual([]);
  });
});
