import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Product, ProductInput, ProductList } from './product.model';

@Injectable({ providedIn: 'root' })
export class ProductsService {
  private readonly http = inject(HttpClient);
  private readonly base = '/api/products';

  list(page = 1, limit = 20, q = ''): Observable<ProductList> {
    let params = new HttpParams().set('page', page).set('limit', limit);
    if (q.trim()) {
      params = params.set('q', q.trim());
    }
    return this.http.get<ProductList>(this.base, { params });
  }

  get(id: number): Observable<Product> {
    return this.http.get<{ data: Product }>(`${this.base}/${id}`).pipe(map((r) => r.data));
  }

  create(input: ProductInput): Observable<Product> {
    return this.http.post<{ data: Product }>(this.base, input).pipe(map((r) => r.data));
  }

  update(id: number, changes: Partial<ProductInput>): Observable<Product> {
    return this.http.patch<{ data: Product }>(`${this.base}/${id}`, changes).pipe(map((r) => r.data));
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.base}/${id}`);
  }
}
