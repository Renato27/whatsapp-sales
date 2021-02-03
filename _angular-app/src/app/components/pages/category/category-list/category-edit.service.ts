import { HttpErrorResponse } from '@angular/common/http';
import { CategoryListComponent } from './category-list.component';
import { NotifyMessageService } from './../../../../services/notify-message.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class CategoryEditservice{

  //@ts-ignore
  private _categoryListComponent: CategoryListComponent;

  constructor(private notifyMessage: NotifyMessageService) {}

  set categoryListComponent(value: CategoryListComponent){
    this._categoryListComponent = value;
  }

  showModalEdit(categoryId: any){
    this._categoryListComponent.categoryId = categoryId;
    this._categoryListComponent.categoryEditModal.showModal();
  }

  onEditSuccess($event: any){
    console.log($event);
    this._categoryListComponent.getCategories();
  }

  onEditError($event: HttpErrorResponse){
    console.log($event);
  }

}
