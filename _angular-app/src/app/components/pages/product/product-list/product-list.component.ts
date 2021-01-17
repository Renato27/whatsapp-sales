import { ProductHttpService } from './../../../../services/http/product-http.service';
import { Product } from './../../../../model';
import { ProductDeleteModalComponent } from './../product-delete-modal/product-delete-modal.component';
import { ProductEditModalComponent } from './../product-edit-modal/product-edit-modal.component';
import { ProductNewModalComponent } from './../product-new-modal/product-new-modal.component';
import { ProductInsertservice } from './product-insert.service';
import { ProductEditservice } from './product-edit.service';
import { ProductDeleteservice } from './product-delete.service';
import { Component, OnInit, ViewChild } from '@angular/core';


@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Array<Product> = [];

  pagination = {
    page: 1,
    totalItems: 0,
    itemsPerPage: 10
  };

  @ViewChild(ProductNewModalComponent) productNewModal!: ProductNewModalComponent;
  @ViewChild(ProductEditModalComponent) productEditModal!: ProductEditModalComponent;
  @ViewChild(ProductDeleteModalComponent) productDeleteModal!: ProductDeleteModalComponent;

  productId!: number;

  constructor(private productHttp: ProductHttpService,
    public productInsertService: ProductInsertservice,
    public productEditService: ProductEditservice,
    public productDeleteService: ProductDeleteservice) {

    this.productInsertService.productListComponent = this;
    this.productEditService.productListComponent = this;
    this.productDeleteService.productListComponent = this;
  }

  ngOnInit(): void {
    this.getProducts();
   }

   getProducts(){
     this.productHttp.list(this.pagination.page)
     .subscribe(response => {
       this.products = response.data;
       this.pagination.totalItems = response.meta.total
       this.pagination.itemsPerPage = response.meta.per_page
     });
   }

   pageChanged(page: any){
     this.pagination.page = page;
     this.getProducts()
   }

}
