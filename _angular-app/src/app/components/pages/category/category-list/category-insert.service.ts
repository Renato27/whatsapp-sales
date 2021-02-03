import { HttpErrorResponse } from '@angular/common/http';
import { CategoryListComponent } from './category-list.component';
import { NotifyMessageService } from './../../../../services/notify-message.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class CategoryInsertservice{

  //@ts-ignore
  private _categoryListComponent: CategoryListComponent;

  constructor(private notifyMessage: NotifyMessageService) {}

  set categoryListComponent(value: CategoryListComponent){
    this._categoryListComponent = value;
  }

  showModalInsert(){
    this._categoryListComponent.categoryNewModal.showModal();
  }

  onInsertSuccess($event: any){
    this.notifyMessage.success('Categoria cadastrada com sucesso.');
    console.log($event);
    this._categoryListComponent.getCategories();
  }

  onInsertError($event: HttpErrorResponse){
    console.log($event);
  }
}
