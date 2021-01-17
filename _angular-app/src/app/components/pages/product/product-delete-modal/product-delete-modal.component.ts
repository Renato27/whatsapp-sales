import { ProductHttpService } from './../../../../services/http/product-http.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ModalComponent } from 'src/app/components/bootstrap/modal/modal.component';
import { Product } from './../../../../model';

@Component({
  selector: 'product-delete-modal',
  templateUrl: './product-delete-modal.component.html',
  styleUrls: ['./product-delete-modal.component.css']
})
export class ProductDeleteModalComponent implements OnInit {

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

  destroy() {
    this.productHttp
      .destroy(this._productId)
      .subscribe((product) => {
        console.log(product);
        this.onSuccess.emit(product);
        this.modal.hide();
      }, error => this.OnError.emit(error));
  }

  showModal() {
    this.modal.show();
  }

  hideModal($event: any) {
    console.log($event)
  }

}
