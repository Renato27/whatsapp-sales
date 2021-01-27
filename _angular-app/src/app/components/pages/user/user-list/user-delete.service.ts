import { Injectable } from '@angular/core';
import { NotifyMessageService } from './../../../../services/notify-message.service';
import { HttpErrorResponse } from '@angular/common/http';
import { UserListComponent } from './user-list.component';

@Injectable({
  providedIn: 'root'
})
export class UserDeleteService {

//@ts-ignore
private _userListComponent: UserListComponent;

constructor(private notifyMessage: NotifyMessageService) {}

set userListComponent(value: UserListComponent){
  this._userListComponent = value;
}

showModalDelete(categoryId: any){
  this._userListComponent.userId = categoryId;
  this._userListComponent.userDeleteModal.showModal();
}

onDeleteSuccess($event: any){
  console.log($event);
  this._userListComponent.getUsers();
}

onDeleteError($event: HttpErrorResponse){
  console.log($event);
  // if($event.status == 400){

  // }
  this.notifyMessage.error(`Não foi possível excluir a categoria.
  Verifique se a mesma está relacionada com produtos.`)
}

}
