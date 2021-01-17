import { ProductListComponent } from './product-list.component';
import { HttpErrorResponse } from '@angular/common/http';
import { NotifyMessageService } from './../../../../services/notify-message.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ProductEditservice{

  //@ts-ignore
  private _productListComponent: ProductListComponent;

  constructor(private notifyMessage: NotifyMessageService) {}

  set productListComponent(value: ProductListComponent){
    this._productListComponent = value;
  }

  showModalEdit(categoryId: any){
    this._productListComponent.productId = categoryId;
    this._productListComponent.productEditModal.showModal();
  }

  onEditSuccess($event: any){
    console.log($event);
    this._productListComponent.getProducts();
  }

  onEditError($event: HttpErrorResponse){
    console.log($event);
    // if($event.status == 400){

    // }
    this.notifyMessage.error(`Não foi possível excluir a categoria.
    Verifique se a mesma está relacionada com produtos.`)
  }

}
