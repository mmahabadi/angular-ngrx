import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { BasketService } from './basket.service';
import { BasketItem, BasketItemWithId } from '../../../models/basket';

describe('BasketService', () => {
  let service: BasketService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BasketService],
    });
    service = TestBed.inject(BasketService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve basket items', () => {
    const mockBasket: BasketItemWithId[] = []; // Define mock basket items here
    service.getBasket().subscribe((basketItems) => {
      expect(basketItems).toEqual(mockBasket);
    });
    const req = httpMock.expectOne('/api/basket');
    expect(req.request.method).toBe('GET');
    req.flush(mockBasket);
  });

  it('should add a basket item', () => {
    const mockBasketItem: BasketItem = { dishId: '1', count: 2 }; // Define mock basket item here
    const mockBasketItemWithId: BasketItemWithId = {
      id: '1',
      ...mockBasketItem,
    }; // Define expected response here
    service.addItem(mockBasketItem).subscribe((basketItem) => {
      expect(basketItem).toEqual(mockBasketItemWithId);
    });
    const req = httpMock.expectOne('/api/basket');
    expect(req.request.method).toBe('POST');
    req.flush(mockBasketItemWithId);
  });

  it('should update a basket item', () => {
    const mockBasketItemWithId: BasketItemWithId = {
      id: '1',
      dishId: '1',
      count: 2,
    }; // Define mock basket item with ID here
    service.updateItem(mockBasketItemWithId).subscribe((basketItem) => {
      expect(basketItem).toEqual(mockBasketItemWithId);
    });
    const req = httpMock.expectOne(`/api/basket/${mockBasketItemWithId.id}`);
    expect(req.request.method).toBe('PUT');
    req.flush(mockBasketItemWithId);
  });

  it('should remove a basket item', () => {
    const itemId = '1'; // Define item ID to remove
    service.removeItem(itemId).subscribe((basketItem) => {
      expect(basketItem).toBeNull(); // Expect null response for delete operation
    });
    const req = httpMock.expectOne(`/api/basket/${itemId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});
