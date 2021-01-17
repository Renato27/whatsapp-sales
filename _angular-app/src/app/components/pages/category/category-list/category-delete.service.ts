import { HttpErrorResponse } from '@angular/common/http';
import { CategoryListComponent } from './category-list.component';
import { NotifyMessageService } from './../../../../services/notify-message.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class CategoryDeleteservice{

  //@ts-ignore
  private _categoryListComponent: CategoryListComponent;

  constructor(private notifyMessage: NotifyMessageService) {}

  set categoryListComponent(value: CategoryListComponent){
    this._categoryListComponent = value;
  }

  showModalDelete(categoryId: any){
    this._categoryListComponent.categoryId = categoryId;
    this._categoryListComponent.categoryDeleteModal.showModal();
  }

  onDeleteSuccess($event: any){
    console.log($event);
    this._categoryListComponent.getCategories();
  }

  onDeleteError($event: HttpErrorResponse){
    console.log($event);
    // if($event.status == 400){

    // }
    this.notifyMessage.error(`Não foi possível excluir a categoria.
    Verifique se a mesma está relacionada com produtos.`)
  }

}
