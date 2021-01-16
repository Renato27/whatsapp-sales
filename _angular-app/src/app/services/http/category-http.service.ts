import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import { CategoryModel } from 'src/app/models/category-model';

@Injectable({
  providedIn: 'root'
})
export class CategoryHttpService {

  private baseUrl = 'http://127.0.0.1:8000/api/categories';

  constructor(private http: HttpClient) { }

  list(): Observable<{data: Array<CategoryModel>}>{
    const token = window.localStorage.getItem('token');
    return this.http.get<{data: Array<CategoryModel>}>(`${this.baseUrl}`, {
           headers:{
             'Authorization': `Bearer ${token}`
           }
         });
  }

  get(id : number): Observable<CategoryModel>{
    const token = window.localStorage.getItem('token');
    return this.http.get<{data: CategoryModel}>
          (`${this.baseUrl}/ ${id}`, {
           headers:{
             'Authorization': `Bearer ${token}`
           }
         })
         .pipe(
           map(response => response.data)
         )
  }

  create(data: CategoryModel): Observable<CategoryModel>{
    const token = window.localStorage.getItem('token');
    return this.http.post<{data: CategoryModel}>(`${this.baseUrl}`, data, {
           headers:{
             'Authorization': `Bearer ${token}`
           }
         })
         .pipe(
          map(response => response.data)
        )
  }

  update(id : number, data: CategoryModel){
    const token = window.localStorage.getItem('token');
    return this.http.put<{data: CategoryModel}>(`${this.baseUrl}/ ${id}`, data, {
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
