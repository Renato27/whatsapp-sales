import { Injectable } from '@angular/core';
import { UserListComponent } from './user-list.component';
import { NotifyMessageService } from './../../../../services/notify-message.service';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserEditService {

  //@ts-ignore
  private _userListComponent: UserListComponent;

  constructor(private notifyMessage: NotifyMessageService) {}

  set userListComponent(value: UserListComponent){
    this._userListComponent = value;
  }

  showModalEdit(categoryId: any){
    this._userListComponent.userId = categoryId;
    this._userListComponent.userEditModal.showModal();
  }

  onEditSuccess($event: any){
    console.log($event);
    this._userListComponent.getUsers();
  }

  onEditError($event: HttpErrorResponse){
    console.log($event);
    // if($event.status == 400){

    // }
    this.notifyMessage.error(`Não foi possível excluir a categoria.
    Verifique se a mesma está relacionada com produtos.`)
  }
}
