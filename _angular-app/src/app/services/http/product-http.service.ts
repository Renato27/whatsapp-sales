import { HttpResource } from './http-resource';
import { Product } from './../../model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductHttpService implements HttpResource<Product> {

  private baseUrl = 'http://127.0.0.1:8000/api/products';

  constructor(private http: HttpClient) { }

  list(page: number): Observable<{data: Array<Product>, meta: any}>{
    const token = window.localStorage.getItem('token');
    const params = new HttpParams({
      fromObject: {
        page: page + ""
      }
  })
    return this.http.get<{data: Array<Product>, meta: any}>(`${this.baseUrl}`, {
           params,
           headers:{
             'Authorization': `Bearer ${token}`
           }
         });
  }

  get(id : number): Observable<Product>{
    const token = window.localStorage.getItem('token');
    return this.http.get<{data: Product}>
          (`${this.baseUrl}/ ${id}`, {
           headers:{
             'Authorization': `Bearer ${token}`
           }
         })
         .pipe(
           map(response => response.data)
         )
  }

  create(data: Product): Observable<Product>{
    const token = window.localStorage.getItem('token');
    return this.http.post<{data: Product}>(`${this.baseUrl}`, data, {
           headers:{
             'Authorization': `Bearer ${token}`
           }
         })
         .pipe(
          map(response => response.data)
        )
  }

  update(id : number, data: Product): Observable<Product>{
    const token = window.localStorage.getItem('token');
    return this.http.put<{data: Product}>(`${this.baseUrl}/ ${id}`, data, {
           headers:{
             'Authorization': `Bearer ${token}`
           }
         })
         .pipe(
          map(response => response.data)
        )
  }

  destroy(id : number): Observable<any>{
    const token = window.localStorage.getItem('token');
    return this.http
    .delete(`${this.baseUrl}/ ${id}`, {
      headers:{
        'Authorization': `Bearer ${token}`
      }
    })

  }
}