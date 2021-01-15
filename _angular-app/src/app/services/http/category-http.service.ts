import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryModel } from 'src/app/models/category-model';

@Injectable({
  providedIn: 'root'
})
export class CategoryHttpService {

  constructor(private http: HttpClient) { }

  list(): Observable<{data: Array<CategoryModel>}>{
    const token = window.localStorage.getItem('token');
    return this.http.get<{data: Array<CategoryModel>}>('http://127.0.0.1:8000/api/categories', {
           headers:{
             'Authorization': `Bearer ${token}`
           }
         });
  }

  get(){

  }

  create(){

  }

  update(){

  }

  destroy(){

  }


}
