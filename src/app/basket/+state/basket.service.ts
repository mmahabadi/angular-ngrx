import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { BasketItem, BasketItemWithId } from '../../../models/basket';

@Injectable({
  providedIn: 'root',
})
export class BasketService {
  private readonly baseUrl = '/api/basket';
  private readonly http = inject(HttpClient);

  getBasket(): Observable<BasketItemWithId[]> {
    return this.http.get<BasketItemWithId[]>(this.baseUrl);
  }

  addItem(basket: BasketItem): Observable<BasketItemWithId> {
    const entry = {
      dishId: basket.dishId,
      count: basket.count,
    };
    return this.http.post<BasketItemWithId>(this.baseUrl, entry);
  }

  updateItem(basket: BasketItemWithId): Observable<BasketItemWithId> {
    return this.http.put<BasketItemWithId>(
      `${this.baseUrl}/${basket.id}`,
      basket
    );
  }

  removeItem(id: string): Observable<BasketItemWithId> {
    return this.http.delete<BasketItemWithId>(`${this.baseUrl}/${id}`);
  }
}
