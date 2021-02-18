import { Category } from './../../../../model';
import { CategoryDeleteservice } from './category-delete.service';
import { CategoryEditservice } from './category-edit.service';
import { CategoryInsertservice } from './category-insert.service';
import { Component, OnInit, ViewChild } from '@angular/core';
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

  categories: Array<Category> = [];

  pagination = {
    page: 1,
    totalItems: 0,
    itemsPerPage: 15
  };

  sortColumn = {column: 'created_at', sort: 'desc'};

  @ViewChild(CategotyNewModalComponent) categoryNewModal!: CategotyNewModalComponent;
  @ViewChild(CategotyEditModalComponent) categoryEditModal!: CategotyEditModalComponent;
  @ViewChild(CategotyDeleteModalComponent) categoryDeleteModal!: CategotyDeleteModalComponent;

  categoryId!: number;
  searchText!: string;

  constructor(private categoryHttp: CategoryHttpService,
    public categoryInsertService: CategoryInsertservice,
    public categoryEditService: CategoryEditservice,
    public categoryDeleteService: CategoryDeleteservice) {

    this.categoryInsertService.categoryListComponent = this;
    this.categoryEditService.categoryListComponent = this;
    this.categoryDeleteService.categoryListComponent = this;
  }

  ngOnInit(): void {
   this.getCategories();
  }

  getCategories(){
    this.categoryHttp.list({
      page: this.pagination.page,
      sort: this.sortColumn.column === '' ? undefined : this.sortColumn,
      search: this.searchText
    })
    .subscribe(response => {
      this.categories = response.data;
      this.pagination.totalItems = response.meta.total
      this.pagination.itemsPerPage = response.meta.per_page
    });
  }

  pageChanged(page: any){
    this.pagination.page = page;
    this.getCategories()
  }

  sort(sortColumn: any){
    this.getCategories();
  }

  search(search: string){
    this.searchText = search;
    this.getCategories()
  }

}
