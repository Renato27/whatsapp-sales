import { ModalComponent } from 'src/app/components/bootstrap/modal/modal.component';
import { HttpErrorResponse } from '@angular/common/http';
import { ProductHttpService } from './../../../../services/http/product-http.service';
import { Product } from './../../../../model';
import { Component, OnInit, EventEmitter, ViewChild, Output } from '@angular/core';

@Component({
  selector: 'product-new-modal',
  templateUrl: './product-new-modal.component.html',
  styleUrls: ['./product-new-modal.component.css']
})
export class ProductNewModalComponent implements OnInit {

  product: Product = {
    name: '',
    description: '',
    price: 0,
    active: true
  };

  @ViewChild(ModalComponent) modal!: ModalComponent;

  @Output() onSuccess: EventEmitter<any> = new EventEmitter<any>();
  @Output() OnError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>();

  constructor(private ProductHttp: ProductHttpService) { }

  ngOnInit(): void {
  }

  showModal(){
    this.modal.show();
  }

  hideModal($event: any){
    console.log($event)
  }

  submit(){
    this.ProductHttp.create(this.product)
    .subscribe((Product) => {
        console.log(Product);
        this.onSuccess.emit(Product);
        this.modal.hide();
        //this.getCategories();
      }, error => this.OnError.emit(error));
  }

}
