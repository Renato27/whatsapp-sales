import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { ProductCategory } from './../../model';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductCategoryHttpService {

  constructor(private http: HttpClient) { }

  list(productId: number): Observable<ProductCategory>{
    const token = window.localStorage.getItem('token');
    return this.http.get<{data:ProductCategory}>
    (`http://127.0.0.1:8000/api/products/${productId}/categories`, {
           headers:{
             'Authorization': `Bearer ${token}`
           }
         })
         .pipe(
           map(response => response.data)
         )
  }
}