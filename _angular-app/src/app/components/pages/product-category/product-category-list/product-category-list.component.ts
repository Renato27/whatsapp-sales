import { ProductCategoryHttpService } from './../../../../services/http/product-category-http.service';
import { Product, ProductCategory } from './../../../../model';
import { ProductHttpService } from './../../../../services/http/product-http.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-category-list',
  templateUrl: './product-category-list.component.html',
  styleUrls: ['./product-category-list.component.css']
})
export class ProductCategoryListComponent implements OnInit {

  productId!: number;
  product!: Product;
  productCategory!: ProductCategory;

  constructor(private route: ActivatedRoute,
    private productHttp: ProductHttpService,
    private productCategoryHttp: ProductCategoryHttpService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.productId = params.product;
      this.getProduct();
      this.getProductCategory()
    });
  }

  getProduct(){
    this.productHttp
      .get(this.productId)
      .subscribe(product => this.product = product)
  }

  getProductCategory(){
    this.productCategoryHttp
    .list(this.productId)
    .subscribe(productCategory => {
      this.productCategory = productCategory;
      console.log(this.productCategory);
    })
  }

}
