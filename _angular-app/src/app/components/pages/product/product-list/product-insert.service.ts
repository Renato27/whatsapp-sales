import { ProductListComponent } from './product-list.component';
import { HttpErrorResponse } from '@angular/common/http';
import { NotifyMessageService } from './../../../../services/notify-message.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ProductInsertservice{

  //@ts-ignore
  private _productListComponent: ProductListComponent;

  constructor(private notifyMessage: NotifyMessageService) {}

  set productListComponent(value: ProductListComponent){
    this._productListComponent = value;
  }

  showModalInsert(){
    this._productListComponent.productNewModal.showModal();
  }

  onInsertSuccess($event: any){
    this.notifyMessage.success('Produto cadastrado com sucesso.');
    console.log($event);
    this._productListComponent.getProducts();
  }

  onInsertError($event: HttpErrorResponse){
    console.log($event);
  }

}
