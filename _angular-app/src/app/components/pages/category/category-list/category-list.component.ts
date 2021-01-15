import { Component, OnInit, ViewChild } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { CategotyNewModalComponent } from '../categoty-new-modal/categoty-new-modal.component';
import { CategotyEditModalComponent } from '../categoty-edit-modal/categoty-edit-modal.component';
import { CategotyDeleteModalComponent } from '../categoty-delete-modal/categoty-delete-modal.component';
import { CategoryHttpService } from 'src/app/services/http/category-http.service';
import { CategoryModel } from 'src/app/models/category-model';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  categories: Array<CategoryModel> = [];

  @ViewChild(CategotyNewModalComponent) categoryNewModal!: CategotyNewModalComponent;
  @ViewChild(CategotyEditModalComponent) categoryEditModal!: CategotyEditModalComponent;
  @ViewChild(CategotyDeleteModalComponent) categoryDeleteModal!: CategotyDeleteModalComponent;

  categoryId!: number;


  constructor(private http: HttpClient, public categoryHttp: CategoryHttpService) { }

  ngOnInit(): void {
   this.getCategories();
  }

  getCategories(){
    this.categoryHttp.list()
    .subscribe(response => {
      this.categories = response.data
    });
  }

  showModalInsert(){
    this.categoryNewModal.showModal();
  }

  showModalEdit(categoryId: number){
    this.categoryId = categoryId;
    this.categoryEditModal.showModal();
  }
  showModalDelete(categoryId: number){
    this.categoryId = categoryId;
    this.categoryDeleteModal.showModal();
  }

  onInsertSuccess($event: any){
    console.log($event);
    this.getCategories();
  }

  onInsertError($event: HttpErrorResponse){
    console.log($event);
  }

  onEditSuccess($event: any){
    console.log($event);
    this.getCategories();
  }

  onEditError($event: HttpErrorResponse){
    console.log($event);
  }

  onDeleteSuccess($event: any){
    console.log($event);
    this.getCategories();
  }

  onDeleteError($event: HttpErrorResponse){
    console.log($event);
  }
}
