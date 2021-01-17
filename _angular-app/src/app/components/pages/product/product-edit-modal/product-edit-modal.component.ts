import { ProductHttpService } from './../../../../services/http/product-http.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ModalComponent } from 'src/app/components/bootstrap/modal/modal.component';
import { Product } from './../../../../model';

@Component({
  selector: 'product-edit-modal',
  templateUrl: './product-edit-modal.component.html',
  styleUrls: ['./product-edit-modal.component.css']
})
export class ProductEditModalComponent implements OnInit {

  product: Product = {
    name: '',
    description: '',
    price: 0,
    active: true
  };

  _productId!: number;

  @ViewChild(ModalComponent) modal!: ModalComponent;
  @Output() onSuccess: EventEmitter<any> = new EventEmitter<any>();
  @Output() OnError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>();

  constructor(private productHttp: ProductHttpService) { }

  ngOnInit(): void {
  }

  @Input()
  set productId(value: number) {
    this._productId = value

    if (this._productId) {
      this.productHttp
        .get(this._productId)
        .subscribe(product => this.product = product)
    }

  }

  submit(){
    this.productHttp
    .update(this._productId, this.product)
    .subscribe((product) => {
        console.log(product);
        this.onSuccess.emit(product);
        this.modal.hide();
      }, error => this.OnError.emit(error));
  }

  showModal(){
    this.modal.show();
  }

  hideModal($event: any){
    console.log($event)
  }

}
